import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import App from './main';
import store from './store';

const root = createRoot(document.getElementById('root')!);
root.render(
  <StrictMode>
    <App store={store} />
  </StrictMode>,
);

(async () => {
  // await store.init();
  await store.load();
  store.ready = true;
})();
