import localforage from 'localforage';
import { autoRun, manage } from 'manate';

import { Store } from './models';

const store = manage(new Store());

const autoRunner = autoRun(store, () => {
  if (store.token) {
    console.log('save token');
    localforage.setItem('token', Object.assign({}, store.token));
  }
});
autoRunner.start();

export default store;
