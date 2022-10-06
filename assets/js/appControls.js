/* eslint-disable linebreak-style */
/* eslint-disable no-console */
/* eslint-disable linebreak-style */
/* eslint-disable no-undef */

import MenuElement from './menu';
import ContentContainer from './content';
import SwitchElement from './switch';
import GameControls from './gameControls';

class AppControls {
  constructor(topicsArr, cardsArr) {
    this.topicsArr = topicsArr;
    this.cardsArr = cardsArr;

    this.menu = new MenuElement(this.topicsArr)
      .addToDoc();

    this.activePage = this.menu.activePage;

    this.switchObj = new SwitchElement()
      .addToDoc();

    this.activeMode = this.switchObj.activeMode;

    this.gameControl = new GameControls()
      .addToDoc();

    this.content = new ContentContainer(this)
      .addToDoc();
  }
}

export default AppControls;
