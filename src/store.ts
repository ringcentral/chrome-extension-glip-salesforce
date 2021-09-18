import localforage from 'localforage';
import {useProxy, autoRun} from '@tylerlong/use-proxy';
import {classToPlain} from 'class-transformer';

import {Store} from './models';

const store = useProxy(new Store());

const autoRunner = autoRun(store, () => {
  if (store.token) {
    localforage.setItem('token', classToPlain(store.token));
  }
});
autoRunner.start();

export default store;
