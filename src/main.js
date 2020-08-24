import React from 'react'
import { Component } from 'react-subx'
import * as R from 'ramda'
import { Spin, Button } from 'antd'
import { ReloadOutlined } from '@ant-design/icons'

import './index.css'
import Icon from '../icons/icon16.png'

class App extends Component {
  render () {
    const store = this.props.store
    return (
      <>
        <img src={Icon} id='glip-icon' />
        {store.ready ? <Main store={store} /> : <Spin size='small' />}
      </>
    )
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
    return <a href={store.authorizeUri} target='_parent'><Button size='small' type='primary'>Login Glip</Button></a>
  }
}

class Home extends Component {
  render () {
    const store = this.props.store
    return (
      <>
        {store.existingTeams.length > 0 ? <Teams store={store} /> : <CreateTeam store={store} />}
        <a onClick={e => store.reload()}>
          <ReloadOutlined id='reload-icon' />
        </a>
      </>
    )
  }
}

class Teams extends Component {
  render () {
    const store = this.props.store
    return store.existingTeams.slice(0, 1).map(team => <Team key={team.id} team={team} store={store} />)
  }
}

class Team extends Component {
  render () {
    const { team, store } = this.props
    return (
      <>
        {team.name}
        &nbsp;[<a rel='noopener noreferrer' onClick={() => store.openTeam(team.id, 'https://app.glip.com/chat/r?groupid=')}>Open in Glip</a>]
        &nbsp;[<a rel='noopener noreferrer' onClick={() => store.openTeam(team.id, 'https://app.ringcentral.com/messages/')}>Open in Jupiter</a>]
      </>
    )
  }
}

class CreateTeam extends Component {
  render () {
    const store = this.props.store
    return <Button size='small' type='primary' onClick={e => store.createTeam(store.teamName)}>Create a Glip team with name "{store.teamName}"</Button>
  }
}

export default App
