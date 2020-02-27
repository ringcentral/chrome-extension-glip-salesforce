import React from 'react'
import { Component } from 'react-subx'
import * as R from 'ramda'

class App extends Component {
  render () {
    const store = this.props.store
    return store.ready ? <Main store={store} /> : <img src='https://chuntaoliu.com/chrome-extension-glip-salesforce/spinner.gif' />
  }
}

class Main extends Component {
  render () {
    const store = this.props.store
    return R.isNil(store.token) ? <Login store={store} /> : 'You are logged in'
  }
}

class Login extends Component {
  render () {
    const store = this.props.store
    return <a href={store.authorizeUri}>Login Glip</a>
  }
}

export default App
