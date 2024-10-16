import React from 'react';
import ReactDOM from 'react-dom';

import App from './main';
import store from './store';

const container = document.createElement('div');
document.body.appendChild(container);
ReactDOM.render(<App store={store} />, container);
(async () => {
  await store.init();
  await store.load();
  store.ready = true;
})();

let count = 0;
setInterval(() => {
  const message = {type: 'resize', height: count % 2 === 0 ? 300 : 24};
  window.parent.postMessage(message, '*');
  console.log('postMessage', JSON.stringify(message));
  count += 1;
}, 3000);
