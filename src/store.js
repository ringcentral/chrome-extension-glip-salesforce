import SubX from 'subx'
import RingCentral from 'ringcentral-js-concise'
import localforage from 'localforage'

const redirectUri = window.location.origin + window.location.pathname
const rc = new RingCentral(process.env.RINGCENTRAL_CLIENT_ID, process.env.RINGCENTRAL_CLIENT_SECRET, RingCentral.PRODUCTION_SERVER)

const store = SubX.create({
  ready: false,
  token: undefined,
  async init () {
    const urlSearchParams = new URLSearchParams(new URL(window.location.href).search)
    const code = urlSearchParams.get('code')
    if (code) {
      await rc.authorize({ code, redirectUri })
      this.token = rc.token()
      await localforage.setItem('ringcentral-token', store.token)
    }
  },
  async load () {
    this.token = await localforage.getItem('ringcentral-token')
  }
})

export default store
