import Cookies from 'js-cookie'
import * as R from 'ramda'
import RingCentral from 'ringcentral-js-concise'

// const redirectUri = 'http://localhost:8080'
const redirectUri = 'https://chuntaoliu.com/chrome-extension-glip-salesforce'

const urlSearchParams = new URLSearchParams(new URL(window.location.href).search)
const caseId = urlSearchParams.get('caseId')
const accountName = urlSearchParams.get('accountName')
const subject = urlSearchParams.get('subject')
const code = urlSearchParams.get('code')
console.log('Case ID:', caseId)
console.log('Account name:', accountName)
console.log('Subject:', subject)
console.log('Code:', code)

const rc = new RingCentral(process.env.RINGCENTRAL_CLIENT_ID, process.env.RINGCENTRAL_CLIENT_SECRET, RingCentral.PRODUCTION_SERVER)

;(async () => {
  if (code) {
    await rc.authorize({ code, redirectUri })
    Cookies.set('ringcentral-token', rc.token(), { expires: 365 })
  }
  const token = Cookies.getJSON('ringcentral-token')
  if (R.isNil(token)) {
    const authorizeUri = rc.authorizeUri(redirectUri)
    const div = document.createElement('div')
    div.innerHTML = `<a href="${authorizeUri}">Login Glip</a>`
    document.body.appendChild(div)
  } else {
    rc.token(token)
    try {
      await rc.get('/restapi/v1.0/account/~/extension/~')
    } catch (e) {
      if (e.response && (e.response.data.errors || []).some(error => /\btoken\b/i.test(error.message))) { // invalid token
        Cookies.remove('ringcentral-token')
        window.location.reload(false)
      }
    }
    const div = document.createElement('div')
    div.innerHTML = '<span>You have logged into Glip</span>'
    document.body.appendChild(div)
  }
})()
