import React from 'react';
import {Component} from 'react-subx';
import {Spin, Button} from 'antd';
import {ReloadOutlined} from '@ant-design/icons';
import {SubxObj} from 'subx/build/src/types';
import {GlipTeamInfo} from '@rc-ex/core/lib/definitions';

import './index.css';
import Icon from '../icons/icon16.png';
import {authorizeUri} from './store';

export interface Props {
  store: SubxObj;
}

class App extends Component<Props> {
  render() {
    const store = this.props.store;
    return (
      <>
        <img src={Icon} id="glip-icon" />
        {store.ready ? <Main store={store} /> : <Spin size="small" />}
      </>
    );
  }
}

class Main extends Component<Props> {
  render() {
    const store = this.props.store;
    return !store.token ? <Login store={store} /> : <Home store={store} />;
  }
}

class Login extends Component<Props> {
  render() {
    return (
      <a href={authorizeUri} target="_parent">
        <Button size="small" type="primary">
          Login RingCentral Team Messaging
        </Button>
      </a>
    );
  }
}

class Home extends Component<Props> {
  render() {
    const store = this.props.store;
    return (
      <>
        {store.existingTeams.length > 0 ? (
          <Teams store={store} />
        ) : (
          <CreateTeam store={store} />
        )}
        <a onClick={() => store.reload()}>
          <ReloadOutlined id="reload-icon" />
        </a>
      </>
    );
  }
}

class Teams extends Component<Props> {
  render() {
    const store = this.props.store;
    return store.existingTeams
      .map((team: GlipTeamInfo) => (
        <Team key={team.id} team={team} store={store} />
      ))
      .reduce((prev: Team, curr: Team) => [prev, ' | ', curr]);
  }
}

export interface TeamProps {
  store: SubxObj;
  team: GlipTeamInfo;
}
class Team extends Component<TeamProps> {
  render() {
    const {team, store} = this.props;
    return (
      <>
        {team.name}
        &nbsp;[
        <a
          rel="noopener noreferrer"
          onClick={() => store.openTeam(team.id, 'rcapp://chat/r?groupid=')}
        >
          App
        </a>
        ] &nbsp;[
        <a
          rel="noopener noreferrer"
          onClick={() =>
            store.openTeam(team.id, 'https://app.ringcentral.com/messages/')
          }
        >
          Web
        </a>
        ]
      </>
    );
  }
}

class CreateTeam extends Component<Props> {
  render() {
    const store = this.props.store;
    return (
      <Button
        size="small"
        type="primary"
        onClick={() => store.createTeam(store.teamName)}
      >
        Create a RingCentral Team Messaging team with name &quot;
        {store.teamName}&quot;
      </Button>
    );
  }
}

export default App;
