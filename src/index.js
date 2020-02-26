import Cookies from 'js-cookie'
import * as R from 'ramda'

const urlSearchParams = new URLSearchParams(new URL(window.location.href).search)
const caseId = urlSearchParams.get('caseId')
const accountName = urlSearchParams.get('accountName')
const subject = urlSearchParams.get('subject')
const code = urlSearchParams.get('code')
console.log('Case ID:', caseId)
console.log('Account name:', accountName)
console.log('Subject:', subject)
console.log('Code:', code)

if (code) {
  // exchange code for token, save it into cookie
}

const token = Cookies.getJSON('ringcentral-token')
if (R.isNil(token)) {
  const div = document.createElement('div')
  div.innerHTML = '<a href="">Login Glip</a>'
  document.body.appendChild(div)
} else {
  const div = document.createElement('div')
  div.innerHTML = '<span>You have logged into Glip</span>'
  document.body.appendChild(div)
}
