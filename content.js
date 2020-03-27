const sectionHeader = document.getElementById('section_header')
const containerNode = document.createElement('div')
sectionHeader.parentNode.insertBefore(containerNode, sectionHeader)

const caseId = document.getElementsByClassName('pageDescription')[0].textContent.trim()
console.log(caseId)
const accountName = Array.from(document.getElementsByClassName('labelCol')).filter(ele => ele.textContent.trim() === 'Account Name')[0].nextSibling.textContent.trim()
console.log(accountName)
const subject = Array.from(document.getElementsByClassName('labelCol')).filter(ele => ele.textContent.trim() === 'Subject')[0].nextSibling.textContent.trim()
console.log(subject)
const urlSearchParams = new URLSearchParams()
urlSearchParams.append('keyword', caseId)
urlSearchParams.append('teamName', `${accountName}: Case ${caseId} ${subject}`) // Dolby Labs: Case 09681148 China/India GW solution pricing
containerNode.innerHTML = `<iframe frameBorder="0" width="100%" height="64" src="https://chuntaoliu.com/chrome-extension-glip-salesforce/?${urlSearchParams.toString()}"></iframe>`
