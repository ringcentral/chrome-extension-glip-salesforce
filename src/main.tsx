import { ReloadOutlined } from '@ant-design/icons';
import AuthorizeUriExtension from '@rc-ex/authorize-uri';
import RingCentral from '@rc-ex/core';
import TMTeamInfo from '@rc-ex/core/lib/definitions/TMTeamInfo';
import Rest from '@rc-ex/core/lib/Rest';
import { Button, Spin } from 'antd';
import localforage from 'localforage';
import { auto } from 'manate/react';
import React, { ReactElement } from 'react';

import Icon from '../icons/icon16.png';
import { Store } from './models';

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
  const login = () => {
    const rc = new RingCentral({
      clientId: process.env.RINGCENTRAL_CLIENT_ID_SALESFORCE_GLIP_EXTENSION,
      server: Rest.productionServer,
    });
    const authorizeUriExtension = new AuthorizeUriExtension();
    rc.installExtension(authorizeUriExtension);
    const redirectUri = window.location.origin + window.location.pathname;
    const authorizeUri = authorizeUriExtension.buildUri({
      redirect_uri: redirectUri,
      code_challenge_method: 'S256',
    });
    const codeVerifier = authorizeUriExtension.codeVerifier;
    const popupWindow = window.open(
      authorizeUri,
      'LoginPopup',
      'width=600,height=600',
    );
    const handle = setInterval(async () => {
      if (popupWindow.closed) {
        clearInterval(handle);
        return;
      }
      // Parse the URL and check if it contains the "code" parameter
      const urlParams = new URLSearchParams(popupWindow.location.search);
      const code = urlParams.get('code');
      if (code) {
        clearInterval(handle);
        popupWindow.close();
        const token = await rc.authorize({
          code,
          redirect_uri: redirectUri,
          code_verifier: codeVerifier,
        });
        await localforage.setItem('token', token);
        window.location.reload();
      }
    }, 100);
  };
  return (
    <Button type="primary" onClick={() => login()}>
      Login RingCentral Team Messaging
    </Button>
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
