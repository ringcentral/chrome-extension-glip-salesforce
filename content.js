let intervalHandle = undefined

const f = () => {
  if(document.getElementsByTagName('title') === null) {
    return; // wait for page ready
  }
  if(document.getElementsByTagName('title')[0].text.match(/\d{6,10}/) === null) {
    return // wait for page ready
  }


  let accountName = ''
  let subject = ''
  const containerNode = document.createElement('div')
  const caseId = document.getElementsByTagName('title')[0].text.match(/\d{6,10}/)[0]

  const sectionHeader = document.getElementById('section_header')
  if(sectionHeader === null) {
    // lightning
    const flexPage = document.querySelector('one-record-home-flexipage2');
    const text = flexPage.innerText
    if(text.match(/\nSubject\n(.+?)\n/) === null) {
      console.log('wait for ready')
      return // wait for page ready
    }
    clearInterval(intervalHandle)
    subject = text.match(/\nSubject\n(.+?)\n/)[1]
    accountName = text.match(/\nAccount Name\n(.+?)\n/)[1]
    flexPage.prepend(containerNode);
  } else {
    clearInterval(intervalHandle)
    // classic
    sectionHeader.parentNode.insertBefore(containerNode, sectionHeader)
    accountName = Array.from(document.getElementsByClassName('labelCol')).filter(ele => ele.textContent.trim() === 'Account Name')[0].nextSibling.textContent.trim()
    subject = Array.from(document.getElementsByClassName('labelCol')).filter(ele => ele.textContent.trim() === 'Subject')[0].nextSibling.textContent.trim()
  }

  const urlSearchParams = new URLSearchParams()
  urlSearchParams.append('keyword', caseId)
  urlSearchParams.append('teamName', `${accountName}: Case ${caseId} ${subject}`) // Dolby Labs: Case 09681148 China/India GW solution pricing
  urlSearchParams.append('sfTicketUri', window.location.origin + window.location.pathname)
  containerNode.innerHTML = `<iframe frameBorder="0" width="100%" height="24" src="https://chuntaoliu.com/chrome-extension-glip-salesforce/?${urlSearchParams.toString()}"></iframe>`
}

intervalHandle = setInterval(() => f(), 1000)
