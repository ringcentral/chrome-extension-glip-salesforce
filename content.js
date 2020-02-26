const sectionHeader = document.getElementById('section_header')
const containerNode = document.createElement('div')
containerNode.style.cssText = 'float: right;'
sectionHeader.parentNode.insertBefore(containerNode, sectionHeader)

const caseId = document.getElementsByClassName('pageDescription')[0].textContent.trim()
console.log(caseId)
const accountName = Array.from(document.getElementsByClassName('labelCol')).filter(ele => ele.textContent.trim() === 'Account Name')[0].nextSibling.textContent.trim()
console.log(accountName)
const subject = Array.from(document.getElementsByClassName('labelCol')).filter(ele => ele.textContent.trim() === 'Subject')[0].nextSibling.textContent.trim()
console.log(subject)
const urlSearchParams = new URLSearchParams()
urlSearchParams.append('caseId', caseId)
urlSearchParams.append('accountName', accountName)
urlSearchParams.append('subject', subject)
containerNode.innerHTML = `<a target="_blank" href="https://chuntaoliu.com/chrome-extension-glip-salesforce/index.html?${urlSearchParams.toString()}">Go to Glip team</a>`
