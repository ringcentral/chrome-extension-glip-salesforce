/* global chrome  */
const sectionHeader = document.getElementById('section_header')
var textNode = document.createTextNode('This is my caption.')
sectionHeader.parentNode.insertBefore(textNode, sectionHeader)

chrome.storage.sync.set({ temp: 'hello' }, () => {
})

chrome.storage.sync.get('temp', dict => {
  console.log('before')
  console.log(dict)
  console.log('after')
})

chrome.storage.sync.clear(() => {
})

chrome.storage.sync.get('temp', dict => {
  console.log('before')
  console.log(dict)
  console.log('after')
})
