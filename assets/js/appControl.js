/* eslint-disable linebreak-style */
/* eslint-disable no-console */
/* eslint-disable linebreak-style */
/* eslint-disable no-undef */

import MenuElement from './menu';
import ContentContainer from './content';
import SwitchElement from './switch';
import GameControl from './gameControl';

class AppControl {
  constructor(topicsArr, cardsArr) {
    this.topicsArr = topicsArr;
    this.cardsArr = cardsArr;

    this.menu = new MenuElement(this.topicsArr)
      .addToDoc();

    this.activePage = this.menu.activePage;

    this.switchObj = new SwitchElement()
      .addToDoc();

    this.activeMode = this.switchObj.activeMode;

    this.gameControl = new GameControl(this)
      .addToDoc();

    this.content = new ContentContainer(this)
      .addToDoc();
  }

  get activePage() {
    return this.menu.activePage;
  }

  set activePage(value) {
    this.menu.activePage = value;
  }

  get activeMode() {
    return this.switchObj.activeMode;
  }

  set activeMode(value) {
    this.switchObj.activeMode = value;
  }

  get activeArrCardsObj() {
    const i = this.topicsArr.findIndex((item) => item.toLowerCase() === this.activePage);
    return this.cardsArr[i];
  }

  set activeArrCardsObj(arrCardsObj) {
    this.activeArrCardsObj = arrCardsObj;
  }

  playCardSound(cardObj) {
    console.log(`Play "${cardObj.audioSrc}"`);
    const audioElement = new Audio(`../assets/${cardObj.audioSrc}`);
    audioElement.play();
    return this;
  }

  playAppSound(soundName) {
    /*
    const filename = this.getCardObjByWord(soundName);
    const audioElement = new Audio(`../assets/audio/app/${filename}`);
    audioElement.play();
    */
    console.log(soundName);
    return this;
  }
}

export default AppControl;
