import { autoRun, useProxy } from '@tylerlong/use-proxy';
import { classToPlain } from 'class-transformer';
import localforage from 'localforage';

import { Store } from './models';

const store = useProxy(new Store());

const autoRunner = autoRun(store, () => {
  if (store.token) {
    localforage.setItem('token', classToPlain(store.token));
    window.parent.postMessage({ type: 'resize', height: 24 }, '*');
  } else {
    window.parent.postMessage({ type: 'resize', height: 300 }, '*');
  }
});
autoRunner.start();

export default store;
