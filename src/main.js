import React from 'react'
import { Component } from 'react-subx'

class Main extends Component {
  render () {
    const store = this.props.store
    return store.loading ? <img src='https://chuntaoliu.com/chrome-extension-glip-salesforce/spinner.gif' /> : ''
  }
}

export default Main
