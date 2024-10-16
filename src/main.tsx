import React, {ReactElement} from 'react';
import {Component} from '@tylerlong/use-proxy/build/react';
import {Spin, Button} from 'antd';
import {ReloadOutlined} from '@ant-design/icons';

import './index.css';
import Icon from '../icons/icon16.png';
import {authorizeUri, Store, Team} from './models';

class App extends Component<{store: Store}> {
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

class Main extends Component<{store: Store}> {
  render() {
    const store = this.props.store;
    return !store.token ? <Login store={store} /> : <Home store={store} />;
  }
}

class Login extends Component<{store: Store}> {
  render() {
    return (
      <a href={authorizeUri} target="_parent">
        <Button size="large" type="primary" block>
          Login RingCentral Team Messaging
        </Button>
      </a>
    );
  }
}

class Home extends Component<{store: Store}> {
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

class Teams extends Component<{store: Store}> {
  render() {
    const store = this.props.store;
    const components: (ReactElement | string)[] = [];
    store.existingTeams.forEach(team => {
      components.push(<TeamComponent key={team.id} team={team} />);
      components.push('  ');
    });
    components.pop();
    return components;
  }
}

class TeamComponent extends Component<{team: Team}> {
  render() {
    const {team} = this.props;
    return (
      <>
        {team.name}
        &nbsp;[
        <a rel="noopener noreferrer" onClick={() => team.open('app')}>
          App
        </a>
        ] &nbsp;[
        <a rel="noopener noreferrer" onClick={() => team.open('web')}>
          Web
        </a>
        ]
      </>
    );
  }
}

class CreateTeam extends Component<{store: Store}> {
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
