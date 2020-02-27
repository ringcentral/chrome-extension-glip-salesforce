import React from 'react'
import { Component } from 'react-subx'
import * as R from 'ramda'
import { Spin } from 'antd'

class App extends Component {
  render () {
    const store = this.props.store
    return store.ready ? <Main store={store} /> : <Spin size='large' />
  }
}

class Main extends Component {
  render () {
    const store = this.props.store
    return R.isNil(store.token) ? <Login store={store} /> : <Home store={store} />
  }
}

class Login extends Component {
  render () {
    const store = this.props.store
    return <a href={store.authorizeUri}>Login Glip</a>
  }
}

class Home extends Component {
  render () {
    return 'Home page'
  }
}

export default App
