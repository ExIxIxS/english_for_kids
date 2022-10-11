/* eslint-disable linebreak-style */
/* eslint-disable no-console */
/* eslint-disable linebreak-style */
/* eslint-disable no-undef */

import { createCustomElement } from './commonFunct';

class Switch {
  constructor(appCtrlObj) {
    this.validModes = ['train', 'play'];
    this.activeMode = 'train';
    this.appControl = appCtrlObj;
    this.element = null;
    this.build();
  }

  build() {
    const classNames = 'button switch';
    const template = `
                    <p class="switch-trigger">Train</p>
                    <div class="switch-rail">
                      <div class="switch-roller">
                      </div>
                    </div>
                    <p class="switch-trigger">Play</p>
                    `;

    this.element = createCustomElement('div', classNames, template);
    return this;
  }

  addToDoc() {
    document.querySelector('.main-controls').append(this.element);
    return this;
  }

  toggle() {
    this.element.classList.toggle('switch-on');
    this.activeMode = (this.activeMode === 'play') ? 'train' : 'play';
  }

  train() {
    this.element.classList.remove('switch-on');
    this.activeMode = 'train';
  }

  enable() {
    this.element.classList.remove('disabled');
  }

  disable() {
    this.element.classList.add('disabled');
  }
}

export default Switch;
