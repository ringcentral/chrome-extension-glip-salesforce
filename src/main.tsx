import { ReloadOutlined } from '@ant-design/icons';
import TMTeamInfo from '@rc-ex/core/lib/definitions/TMTeamInfo';
import { Button, Spin } from 'antd';
import { auto } from 'manate/react';
import React, { ReactElement } from 'react';

import Icon from '../icons/icon16.png';
import { authorizeUri, Store } from './models';

const App = auto((props: { store: Store }) => {
  const store = props.store;
  return (
    <>
      <img src={Icon} id="glip-icon" />
      {store.ready ? <Main store={store} /> : <Spin size="small" />}
    </>
  );
});

const Main = auto((props: { store: Store }) => {
  const store = props.store;
  return !store.token ? <Login /> : <Home store={store} />;
});

const Login = auto(() => {
  return (
    <a href={authorizeUri}>
      <Button type="primary">Login RingCentral Team Messaging</Button>
    </a>
  );
});

const Home = auto((props: { store: Store }) => {
  const store = props.store;
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
});

const Teams = auto((props: { store: Store }) => {
  const store = props.store;
  const components: (ReactElement | string)[] = [];
  store.existingTeams.forEach((team) => {
    components.push(<TeamComponent key={team.id} store={store} team={team} />);
    components.push('  ');
  });
  components.pop();
  return components;
});

const TeamComponent = auto((props: { store: Store; team: TMTeamInfo }) => {
  const { store, team } = props;
  const openTeam = async (teamId: string, target: 'app' | 'web') => {
    await store.joinTeam(teamId);
    window.open(
      target === 'app'
        ? `rcapp://chat/r?groupid=${teamId}`
        : `https://app.ringcentral.com/messages/${teamId}`,
      '_blank',
    );
  };
  return (
    <>
      {team.name}
      &nbsp;[
      <a rel="noopener noreferrer" onClick={() => openTeam(team.id, 'app')}>
        App
      </a>
      ] &nbsp;[
      <a rel="noopener noreferrer" onClick={() => openTeam(team.id, 'web')}>
        Web
      </a>
      ]
    </>
  );
});

const CreateTeam = auto((props: { store: Store }) => {
  const store = props.store;
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
});

export default App;
