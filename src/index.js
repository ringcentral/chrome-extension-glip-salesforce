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

// const urlSearchParams = new URLSearchParams(new URL(window.location.href).search)
// const keyword = urlSearchParams.get('keyword')
// const teamName = urlSearchParams.get('teamName')
// console.log('Keyword:', keyword)
// console.log('Team name:', teamName)

// const saveTeams = async newTeams => {
//   const teams = await localforage.getItem('teams') || {}
//   for (const team of newTeams) {
//     teams[team.id] = team
//   }
//   await localforage.setItem('teams', teams)
// }

// ;(async () => {
//   const token = await localforage.getItem('ringcentral-token')
//   if (R.isNil(token)) {
//     const authorizeUri = rc.authorizeUri(redirectUri)
//     const div = document.createElement('div')
//     div.innerHTML = `<a href="${authorizeUri}">Login Glip</a>`
//     document.body.appendChild(div)
//   } else {
//     rc.token(token)
//     try {
//       await rc.get('/restapi/v1.0/account/~/extension/~')
//     } catch (e) {
//       if (e.data && (e.data.errors || []).some(error => /\btoken\b/i.test(error.message))) { // invalid token
//         await localforage.clear()
//         window.location.reload(false)
//       }
//     }
//     const prevPageToken = await localforage.getItem('prevPageToken')
//     let r = await rc.get('/restapi/v1.0/glip/teams', { params: { recordCount: 250, pageToken: prevPageToken } })
//     console.log(r.data)
//     await saveTeams(r.data.records)
//     while (r.data.navigation.prevPageToken) {
//       await localforage.setItem('prevPageToken', r.data.navigation.prevPageToken)
//       r = await rc.get('/restapi/v1.0/glip/teams', { params: { recordCount: 250, pageToken: r.data.navigation.prevPageToken } })
//       console.log(r.data)
//       await saveTeams(r.data.records)
//     }
//     const teams = await localforage.getItem('teams')
//     console.log(teams)
//     const existingTeams = []
//     if (!R.isNil(keyword)) {
//       const regex = new RegExp(`\\b${keyword}\\b`, 'i')
//       for (const key of Object.keys(teams)) {
//         if (regex.test(teams[key].name)) {
//           console.log(teams[key])
//           existingTeams.push(teams[key])
//         }
//       }
//     }
//     console.log(existingTeams)
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
