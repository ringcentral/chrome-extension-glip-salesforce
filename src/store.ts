import SubX from 'subx';
import RingCentral from '@rc-ex/core';
import localforage from 'localforage';
import * as R from 'ramda';
import {message} from 'antd';
import Rest from '@rc-ex/core/lib/Rest';
import {GlipTeamInfo, TokenInfo} from '@rc-ex/core/lib/definitions';
import AuthorizeUriExtension from '@rc-ex/authorize-uri';

let urlSearchParams = new URLSearchParams(new URL(window.location.href).search);
const code = urlSearchParams.get('code');
if (code !== null && !R.isNil(urlSearchParams.get('state'))) {
  urlSearchParams = new URLSearchParams(urlSearchParams.get('state')!);
  urlSearchParams.set('code', code);
}

const redirectUri = window.location.origin + window.location.pathname;
const rc = new RingCentral({
  clientId: process.env.RINGCENTRAL_CLIENT_ID,
  server: Rest.productionServer,
});
export let authorizeUri = '';
if (code === null) {
  const authorizeUriExtension = new AuthorizeUriExtension();
  rc.installExtension(authorizeUriExtension);
  authorizeUri = authorizeUriExtension.buildUri({
    redirect_uri: redirectUri,
    code_challenge_method: 'S256',
  });
  const codeVerifier = authorizeUriExtension.codeVerifier;
  localforage.setItem('code_verifier', codeVerifier);
}

const store = SubX.create({
  ready: false,
  token: undefined,
  existingTeams: [],
  keyword: urlSearchParams.get('keyword'),
  teamName: urlSearchParams.get('teamName'),
  sfTicketUri: urlSearchParams.get('sfTicketUri'),
  async init() {
    if (code !== null) {
      this.token = await rc.authorize({
        code,
        redirect_uri: redirectUri,
        code_verifier: (await localforage.getItem('code_verifier')) as string,
      });
    }
  },
  async reload() {
    // remove all data except token
    const token = await localforage.getItem('token');
    await localforage.clear();
    await localforage.setItem('token', token);
    window.location.reload(true);
  },
  async load() {
    const token = await localforage.getItem<TokenInfo>('token');
    if (token === null) {
      return;
    }
    rc.token = token;
    try {
      this.token = await rc.refresh(); // refresh token
    } catch (e) {
      // invalid token
      await localforage.clear();
      window.location.reload(false);
    }
    try {
      // make sure token is still usable
      await rc.get('/restapi/v1.0/account/~/extension/~');
    } catch (e) {
      if (
        e.data &&
        (e.data.errors || []).some((error: any) =>
          /\btoken\b/i.test(error.message)
        )
      ) {
        // invalid token
        await localforage.clear();
        window.location.reload(false);
      }
    }
    const teams: {[key: string]: GlipTeamInfo} =
      (await localforage.getItem('teams')) || {};
    const prevPageToken = await localforage.getItem('prevPageToken');
    let r = await rc.get('/restapi/v1.0/glip/teams', {
      recordCount: 250,
      pageToken: prevPageToken,
    });
    console.log(r.data);
    for (const team of r.data.records as GlipTeamInfo[]) {
      teams[team.id!] = team;
    }
    while (r.data.navigation.prevPageToken) {
      await localforage.setItem(
        'prevPageToken',
        r.data.navigation.prevPageToken
      );
      r = await rc.get('/restapi/v1.0/glip/teams', {
        recordCount: 250,
        pageToken: r.data.navigation.prevPageToken,
      });
      console.log(r.data);
      for (const team of r.data.records) {
        teams[team.id] = team;
      }
      await localforage.setItem('teams', teams);
    }
    const existingTeams = [];
    if (!R.isNil(this.keyword)) {
      const regex = new RegExp(`\\b${this.keyword}\\b`, 'i');
      for (const key of Object.keys(teams)) {
        if (regex.test(teams[key].name ?? '')) {
          existingTeams.push(teams[key]);
        }
      }
    }
    this.existingTeams = existingTeams;
  },
  async createTeam(teamName: string) {
    try {
      const r = await rc.post('/restapi/v1.0/glip/teams', {
        public: true,
        name: teamName,
        description: teamName,
      });
      await rc.post(`/restapi/v1.0/glip/chats/${r.data.id}/posts`, {
        text: `This Team is created for [Salesforce ticket #${this.keyword}](${this.sfTicketUri}) by [RingCentral Team Messaging Salesforce Chrome extension](https://chrome.google.com/webstore/detail/glip-salesforce/gcmccmiceedebolmgjddhklghkaejbei).`,
      });
      window.location.reload(false);
    } catch (e) {
      console.log(e);
      if (
        e.data &&
        e.data.errors &&
        e.data.errors[0].message.includes('already used by another team')
      ) {
        message.error(
          'Some one else already created this team but it is private, please ask the creator to add you.',
          0
        );
      }
    }
  },
  async openTeam(teamId: string, uriPrefix: string) {
    try {
      await rc.post(`/restapi/v1.0/glip/teams/${teamId}/join`);
    } catch (e) {
      // Join team failed, the team is private. And you are already a member, otherwise you won't see the team at all.
    } finally {
      window.window.open(`${uriPrefix}${teamId}`, '_blank');
    }
  },
});

SubX.autoRun(store, async () => {
  if (store.token) {
    await localforage.setItem('token', store.token.toJSON());
  }
});

export default store;
