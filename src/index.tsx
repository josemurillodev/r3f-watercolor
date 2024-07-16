import React from 'react';
import ReactDOM from 'react-dom/client';
import { registerSW } from 'virtual:pwa-register';

import Root from './root';
import { isInStandalone, isMobile } from './helpers/helper-useragent';
import './assets/images/share.png';
import './styles/index.scss';

let updateSW: (reloadPage?: boolean | undefined) => Promise<void>;

if (isInStandalone) {
  document.body.classList.add('app__standalone');
  const root = document.getElementsByTagName('html')[0];
  root.classList.add('class', 'app__standalone');
}

const onNeedRefresh = () => {
  // eslint-disable-next-line no-restricted-globals, no-alert
  const conf = confirm('New version available. Refresh?');
  if (conf && updateSW) {
    updateSW();
  }
};

updateSW = registerSW({
  onNeedRefresh,
  onOfflineReady() {
    console.log('Ready to work offline');
  },
});

if (isMobile) {
  document.body.classList.add('is-mobile');
} else {
  document.body.classList.add('not-mobile');
}

ReactDOM.createRoot(document.getElementById('Root') as HTMLElement).render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>
);
