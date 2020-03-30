import React from 'react'
import { Component } from 'react-subx'
import * as R from 'ramda'
import { Spin, Button, Tooltip } from 'antd'
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
          <Tooltip title='Reload Glip team data' placement='bottomRight'>
            <ReloadOutlined id='reload-icon' />
          </Tooltip>
        </a>
      </>
    )
  }
}

class Teams extends Component {
  render () {
    const store = this.props.store
    return store.existingTeams.slice(0, 1).map(team => <Team key={team.id} team={team} />)
  }
}

class Team extends Component {
  render () {
    const { team } = this.props
    return (
      <>
        {team.name}
        &nbsp;[<a href={`https://app.glip.com/chat/r?groupid=${team.id}`} target='_blank' rel='noopener noreferrer'>Open in Glip</a>]
        &nbsp;[<a href={`https://jupiter.fiji.gliprc.com/messages/${team.id}`} target='_blank' rel='noopener noreferrer'>Open in Jupiter</a>]
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
