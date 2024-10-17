import { ConfigProvider } from 'antd';
import React from 'react';
import { createRoot } from 'react-dom/client';

import App from './main';
import store from './store';

const root = createRoot(document.getElementById('root')!);
root.render(
  <ConfigProvider
    theme={{
      token: {
        colorPrimary: '#00b96b',
      },
    }}
  >
    <App store={store} />
  </ConfigProvider>,
);

(async () => {
  await store.load();
  store.ready = true;
})();
