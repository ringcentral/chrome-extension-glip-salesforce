const sectionHeader = document.getElementById('section_header')
const containerNode = document.createElement('div')
sectionHeader.parentNode.insertBefore(containerNode, sectionHeader)

let caseId = ''
let accountName = ''
let subject = ''

caseId = document.getElementsByTagName('title')[0].text.match(/\d{6,10}/)[0]
accountName = Array.from(document.getElementsByClassName('labelCol')).filter(ele => ele.textContent.trim() === 'Account Name')[0].nextSibling.textContent.trim()
subject = Array.from(document.getElementsByClassName('labelCol')).filter(ele => ele.textContent.trim() === 'Subject')[0].nextSibling.textContent.trim()

const urlSearchParams = new URLSearchParams()
urlSearchParams.append('keyword', caseId)
urlSearchParams.append('teamName', `${accountName}: Case ${caseId} ${subject}`) // Dolby Labs: Case 09681148 China/India GW solution pricing
urlSearchParams.append('sfTicketUri', window.location.origin + window.location.pathname)
containerNode.innerHTML = `<iframe frameBorder="0" width="100%" height="24" src="https://chuntaoliu.com/chrome-extension-glip-salesforce/?${urlSearchParams.toString()}"></iframe>`
