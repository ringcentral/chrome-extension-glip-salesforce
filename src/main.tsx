import { ReloadOutlined } from '@ant-design/icons';
import AuthorizeUriExtension from '@rc-ex/authorize-uri';
import RingCentral from '@rc-ex/core';
import TMTeamInfo from '@rc-ex/core/lib/definitions/TMTeamInfo';
import Rest from '@rc-ex/core/lib/Rest';
import { Button, Spin } from 'antd';
import localforage from 'localforage';
import { auto } from 'manate/react';
import React from 'react';

import Icon from '../icons/icon16.png';
import { Store } from './models';

const App = auto((props: { store: Store }) => {
  console.log('render App');
  const store = props.store;
  return (
    <>
      <img src={Icon} id="glip-icon" />
      {store.ready ? <Main store={store} /> : <Spin size="small" />}
    </>
  );
});

const Main = auto((props: { store: Store }) => {
  console.log('render Main');
  const store = props.store;
  return !store.token ? <Login /> : <Home store={store} />;
});

const Login = auto(() => {
  console.log('render Login');
  let eventHandler: (event: MessageEvent) => void;
  const login = () => {
    const rc = new RingCentral({
      clientId: process.env.RINGCENTRAL_CLIENT_ID_SALESFORCE_GLIP_EXTENSION,
      server: Rest.productionServer,
    });
    const authorizeUriExtension = new AuthorizeUriExtension();
    rc.installExtension(authorizeUriExtension);
    const redirectUri =
      window.location.origin + window.location.pathname + 'callback.html';
    const authorizeUri = authorizeUriExtension.buildUri({
      redirect_uri: redirectUri,
      code_challenge_method: 'S256',
    });
    const codeVerifier = authorizeUriExtension.codeVerifier;
    window.open(authorizeUri, 'LoginPopup', 'width=600,height=600');
    if (eventHandler) {
      window.removeEventListener('message', eventHandler);
    }
    eventHandler = async (event: MessageEvent) => {
      if (event.data.type === 'code') {
        window.removeEventListener('message', eventHandler);
        eventHandler = undefined;
        const token = await rc.authorize({
          code: event.data.code,
          redirect_uri: redirectUri,
          code_verifier: codeVerifier,
        });
        await localforage.setItem('token', token);
        window.location.reload();
      }
    };
    window.addEventListener('message', eventHandler);
  };
  return (
    <Button type="primary" onClick={() => login()} size="small">
      Login RingCentral Team Messaging
    </Button>
  );
});

const Home = auto((props: { store: Store }) => {
  console.log('render Home');
  const store = props.store;
  if (store.keyword === '') {
    return 'Please specify a keyword in the URL query parameter';
  }
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
  console.log('render Teams');
  const store = props.store;
  return store.existingTeams
    .slice(0, 10)
    .map((t) => <TeamComponent key={t.id} store={store} team={t} />);
});

const TeamComponent = auto((props: { store: Store; team: TMTeamInfo }) => {
  console.log('render TeamComponent');
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
      <Button onClick={() => openTeam(team.id, 'app')} size="small">
        App
      </Button>{' '}
      <Button onClick={() => openTeam(team.id, 'web')} size="small">
        Web
      </Button>
      <br />
    </>
  );
});

const CreateTeam = auto((props: { store: Store }) => {
  console.log('render CreateTeam');
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
