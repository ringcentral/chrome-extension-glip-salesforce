import localforage from 'localforage';
import { autoRun, manage } from 'manate';

import { Store } from './models';

const store = manage(new Store());

const autoRunner = autoRun(store, () => {
  if (store.token) {
    localforage.setItem('token', JSON.stringify(store.token));
  }
});
autoRunner.start();

export default store;
