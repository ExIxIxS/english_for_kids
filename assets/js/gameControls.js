/* eslint-disable linebreak-style */
/* eslint-disable no-console */
/* eslint-disable linebreak-style */
/* eslint-disable no-undef */

import { createCustomElement } from './commonFunct';

class gameControls {
  constructor() {
    this.element = null;
    this.build();
  }

  build() {
    const classNames = 'game-controls inactive';
    const template = `
                    <div class="button game-button start-button">

                    </div>
                    <div class="game-stat">
                      <p>Game Statistic</p>
                    </div>
                    `;
    this.element = createCustomElement('div', classNames, template);
    return this;
  }

  addToDoc() {
    document.querySelector('header').append(this.element);
    return this;
  }
}

export default gameControls;
