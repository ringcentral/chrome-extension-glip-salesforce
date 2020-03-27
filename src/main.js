import React from 'react'
import { Component } from 'react-subx'
import * as R from 'ramda'
import { Spin, Button } from 'antd'

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
    return <a href={store.authorizeUri}><Button type='primary'>Login Glip</Button></a>
  }
}

class Home extends Component {
  render () {
    const store = this.props.store
    return store.existingTeams.length > 0 ? <Teams store={store} /> : <CreateTeam store={store} />
  }
}

class Teams extends Component {
  render () {
    const store = this.props.store
    return (
      <ul>
        {store.existingTeams.map(team => <Team key={team.id} team={team} />)}
      </ul>
    )
  }
}

class Team extends Component {
  render () {
    const { team } = this.props
    return (
      <li>
        {team.name}
        [<a href={`https://app.glip.com/chat/r?groupid=${team.id}`} target='_blank' rel='noopener noreferrer'>Open in Glip</a>]
        [<a href={`https://jupiter.fiji.gliprc.com/messages/${team.id}`} target='_blank' rel='noopener noreferrer'>Open in Jupiter</a>]
      </li>
    )
  }
}

class CreateTeam extends Component {
  render () {
    const store = this.props.store
    return <Button type='primary' onClick={e => store.createTeam(store.teamName)}>Create a Glip team with name "{store.teamName}"</Button>
  }
}

export default App
