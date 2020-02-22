/* global chrome  */
const sectionHeader = document.getElementById('section_header')
const containerNode = document.createElement('div')
containerNode.style.cssText = 'float: right;'
sectionHeader.parentNode.insertBefore(containerNode, sectionHeader)

chrome.storage.sync.get('RingCentralToken', dict => {
  if (!dict.RingCentralToken) {
    containerNode.innerText = 'No RC token'
  } else {
    containerNode.innerText = 'Has RC token'
  }
})

chrome.storage.sync.set({ RingCentralToken: 'world' }, () => {
})
