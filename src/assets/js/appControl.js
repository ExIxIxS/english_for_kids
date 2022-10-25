import MenuElement from './menu';
import ContentContainer from './content';
import SwitchElement from './switch';
import GameControl from './gameControl';
import Statistic from './statistic';

class AppControl {
  constructor(topicsArr, cardsArr, mainCards) {
    this.topicsArr = topicsArr;
    this.cardsArr = cardsArr;
    this.mainCards = mainCards;

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

    this.stat = new Statistic(this);
  }

  get activePage() {
    return this.menu.activePage;
  }

  set activePage(value) {
    if (value) {
      this.menu.activePage = value.toLowerCase();
    }
  }

  get activeMode() {
    return this.switchObj.activeMode;
  }

  set activeMode(value) {
    if (value) {
      this.switchObj.activeMode = value;
    }
  }

  get activeArrCardsObj() {
    const i = this.topicsArr.findIndex((item) => item.toLowerCase() === this.activePage);
    return this.cardsArr[i];
  }

  set activeArrCardsObj(arrCardsObj) {
    if (value) {
      this.activeArrCardsObj = arrCardsObj;
    }
  }

  changePage(pageName) {
    this.menu.setActiveTopic(pageName);
    this.content.changeContent(pageName);
    if (this.activeMode === 'play' && (this.content.getValidTopicType(this.activePage) === 'topic')) {
      this.gameControl.show();
    } else {
      this.gameControl.hide();
    }
    return this;
  }

  playCardSound(cardObj) {
    const audioElement = new Audio(`./assets/${cardObj.audioSrc}`);
    audioElement.play();
    return this;
  }

  playAppSound(soundName) {
    const soundsLibrary = {
      correct: 'app/correct.mp3',
      wrong: 'app/error.mp3',
      success: 'app/success.mp3',
      failure: 'app/failure.mp3',
      switch: 'app/switch-button.mp3',
    };

    const audioElement = new Audio(`./assets/audio/${soundsLibrary[soundName]}`);
    audioElement.play();
    return this;
  }
}

export default AppControl;
