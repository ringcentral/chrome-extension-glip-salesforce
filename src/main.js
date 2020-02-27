import React from 'react'
import { Component } from 'react-subx'

class App extends Component {
  render () {
    const store = this.props.store
    return store.ready ? <Main /> : <img src='https://chuntaoliu.com/chrome-extension-glip-salesforce/spinner.gif' />
  }
}

class Main extends Component {
  render () {
    return 'Hello world'
  }
}

export default App
