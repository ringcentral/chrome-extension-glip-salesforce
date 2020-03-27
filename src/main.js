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
    return <a href={store.authorizeUri}><Button>Login Glip</Button></a>
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
      <>
        We have found teams matching keyword "{store.keyword}":
        <ul>
          {store.existingTeams.map(team => <Team key={team.id} team={team} />)}
        </ul>
      </>
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
    return (
      <>
        <div>There is no team matching "{store.keyword}"</div>
        <button onClick={e => store.createTeam(store.teamName)}>Create a team</button> with name "{store.teamName}"
      </>
    )
  }
}

export default App
