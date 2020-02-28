import SubX from 'subx'
import RingCentral from 'ringcentral-js-concise'
import localforage from 'localforage'
import * as R from 'ramda'

let urlSearchParams = new URLSearchParams(new URL(window.location.href).search)
if (!R.isNil(urlSearchParams.get('code')) && !R.isNil(urlSearchParams.get('state'))) {
  const code = urlSearchParams.get('code')
  urlSearchParams = new URLSearchParams(urlSearchParams.get('state'))
  urlSearchParams.set('code', code)
}
const redirectUri = window.location.origin + window.location.pathname
const rc = new RingCentral(process.env.RINGCENTRAL_CLIENT_ID, process.env.RINGCENTRAL_CLIENT_SECRET, RingCentral.PRODUCTION_SERVER)

const store = SubX.create({
  ready: false,
  token: undefined,
  authorizeUri: rc.authorizeUri(redirectUri, { state: urlSearchParams.toString() }),
  existingTeams: [],
  keyword: urlSearchParams.get('keyword'),
  teamName: urlSearchParams.get('teamName'),
  async init () {
    rc.on('tokenChanged', token => {
      this.token = token
    })
    const code = urlSearchParams.get('code')
    if (code) {
      await rc.authorize({ code, redirectUri })
      await localforage.setItem('token', rc.token())
    }
  },
  async load () {
    rc.token(await localforage.getItem('token'))
    if (R.isNil(rc.token())) {
      return
    }
    try { // make sure token is still usable
      await rc.get('/restapi/v1.0/account/~/extension/~')
    } catch (e) {
      if (e.data && (e.data.errors || []).some(error => /\btoken\b/i.test(error.message))) { // invalid token
        await localforage.clear()
        window.location.reload(false)
      }
    }
    const teams = await localforage.getItem('teams') || {}
    const prevPageToken = await localforage.getItem('prevPageToken')
    let r = await rc.get('/restapi/v1.0/glip/teams', { params: { recordCount: 250, pageToken: prevPageToken } })
    console.log(r.data)
    for (const team of r.data.records) {
      teams[team.id] = team
    }
    while (r.data.navigation.prevPageToken) {
      await localforage.setItem('prevPageToken', r.data.navigation.prevPageToken)
      r = await rc.get('/restapi/v1.0/glip/teams', { params: { recordCount: 250, pageToken: r.data.navigation.prevPageToken } })
      console.log(r.data)
      for (const team of r.data.records) {
        teams[team.id] = team
      }
      await localforage.setItem('teams', teams)
    }
    const existingTeams = []
    if (!R.isNil(this.keyword)) {
      const regex = new RegExp(`\\b${this.keyword}\\b`, 'i')
      for (const key of Object.keys(teams)) {
        if (regex.test(teams[key].name)) {
          existingTeams.push(teams[key])
        }
      }
    }
    this.existingTeams = existingTeams
  },
  async createTeam (teamName) {
    try {
      await rc.post('/restapi/v1.0/glip/teams', {
        public: true,
        name: teamName,
        description: teamName
      })
      window.location.reload(false)
    } catch (e) {
      console.log(e)
    }
  }
})

SubX.autoRun(store, async () => {
  if (store.token) {
    await localforage.setItem('token', store.token.toJSON())
  }
})

export default store
