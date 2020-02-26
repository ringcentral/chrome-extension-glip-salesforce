import Cookies from 'js-cookie'
import * as R from 'ramda'
import RingCentral from 'ringcentral-js-concise'

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

if (code) {
  // exchange code for token, save it into cookie
}

const token = Cookies.getJSON('ringcentral-token')
if (R.isNil(token)) {
  const authorizeUri = rc.authorizeUri('http://localhost:8080')
  const div = document.createElement('div')
  div.innerHTML = `<a href="${authorizeUri}">Login Glip</a>`
  document.body.appendChild(div)
} else {
  const div = document.createElement('div')
  div.innerHTML = '<span>You have logged into Glip</span>'
  document.body.appendChild(div)
}
