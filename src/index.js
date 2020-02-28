import React from 'react'
import ReactDOM from 'react-dom'

import App from './main'
import store from './store'

const container = document.createElement('div')
document.body.appendChild(container)
ReactDOM.render(<App store={store} />, container)

;(async () => {
  await store.init()
  await store.load()
  store.ready = true
})()

// ;(async () => {
//     if (existingTeams.length > 0) {
//       const div = document.createElement('div')
//       div.innerHTML = `<span>We have found the following Glip teams:<ul>${existingTeams.map(t => `<li>${t.name} [<a href=" https://app.glip.com/chat/r?groupid=${t.id}">Open in Glip</a>] [<a href="https://jupiter.fiji.gliprc.com/messages/${t.id}">Open in Jupiter</a>]</li>`).join('')}</ul></span>`
//       document.body.appendChild(div)
//     } else {
//       const div = document.createElement('div')
//       div.innerHTML = '<span>We didn\'t find the team you requested. <a href="">Create a new team</a></span>'
//       document.body.appendChild(div)
//     }
//   }
// })()
