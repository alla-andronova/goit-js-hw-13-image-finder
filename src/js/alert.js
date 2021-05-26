import '@pnotify/core/dist/PNotify.css';

import '@pnotify/core/dist/Angeler.css';
import { alert, defaults } from '@pnotify/core';

defaults.styling = 'angeler';
defaults.icons = 'angeler';

export const showAlertNotFound = () => {
  alert({
    type: 'notice',
    text: 'There are not such images!',
    delay: 1000,
    sticker: false,
    animateSpeed: 'slow',
  });
};
