import {message} from 'antd';
import {GlipTeamInfo, TokenInfo} from '@rc-ex/core/lib/definitions';
import RestException from '@rc-ex/core/lib/RestException';
import localforage from 'localforage';
import RingCentral from '@rc-ex/core';
import Rest from '@rc-ex/core/lib/Rest';
import AuthorizeUriExtension from '@rc-ex/authorize-uri';
import {plainToClass} from 'class-transformer';

let urlSearchParams = new URLSearchParams(new URL(window.location.href).search);
const code = urlSearchParams.get('code');
const state = urlSearchParams.get('state');
if (code !== null && state !== null) {
  urlSearchParams = new URLSearchParams(state);
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

export class Team extends GlipTeamInfo {
  async open(target: 'app' | 'web') {
    try {
      await rc.post(`/restapi/v1.0/glip/teams/${this.id}/join`);
    } catch (e) {
      // Join team failed, the team is private. And you are already a member, otherwise you won't see the team at all.
    } finally {
      switch (target) {
        case 'app': {
          window.window.open(`rcapp://chat/r?groupid=${this.id}`, '_blank');
          break;
        }
        case 'web': {
          window.window.open(
            `https://app.ringcentral.com/messages/${this.id}`,
            '_blank'
          );
          break;
        }
      }
    }
  }
}

export class Store {
  ready = false;
  token?: TokenInfo = undefined;
  existingTeams: Team[] = [];
  keyword = urlSearchParams.get('keyword') ?? '';
  teamName = urlSearchParams.get('teamName') ?? '';
  sfTicketUri = urlSearchParams.get('sfTicketUri') ?? '';

  async init() {
    if (code !== null) {
      this.token = await rc.authorize({
        code,
        redirect_uri: redirectUri,
        code_verifier: (await localforage.getItem('code_verifier')) as string,
      });
    }
  }

  async reload() {
    // remove all data except token
    const token = await localforage.getItem('token');
    await localforage.clear();
    await localforage.setItem('token', token);
    window.location.reload();
  }

  async load() {
    const token = await localforage.getItem<TokenInfo>('token');
    if (token === null) {
      return;
    }
    rc.token = token;
    try {
      this.token = await rc.refresh(); // refresh token
    } catch (e) {
      console.log(e);
      // invalid token
      await localforage.clear();
      window.location.reload();
    }
    try {
      // make sure token is still usable
      await rc.get('/restapi/v1.0/account/~/extension/~');
    } catch (e) {
      console.log(e);
      // invalid token
      await localforage.clear();
      window.location.reload();
    }
    const teams: {[key: string]: Team} =
      (await localforage.getItem('teams')) || {};
    const prevPageToken = await localforage.getItem('prevPageToken');
    let r = await rc.get('/restapi/v1.0/glip/teams', {
      recordCount: 250,
      pageToken: prevPageToken,
    });
    console.log(r.data);
    for (const team of r.data.records) {
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
    if (this.keyword !== null) {
      const regex = new RegExp(`\\b${this.keyword}\\b`, 'i');
      for (const key of Object.keys(teams)) {
        if (regex.test(teams[key].name ?? '')) {
          existingTeams.push(teams[key]);
        }
      }
    }
    this.existingTeams = plainToClass(Team, existingTeams);
  }

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
      window.location.reload();
    } catch (e) {
      console.log(e);
      const re = e as RestException;
      const data = re.response.data;
      if (
        data &&
        data.errors &&
        data.errors[0].message.includes('already used by another team')
      ) {
        message.error(
          'Some one else already created this team but it is private, please ask the creator to add you.',
          0
        );
      }
    }
  }
}
