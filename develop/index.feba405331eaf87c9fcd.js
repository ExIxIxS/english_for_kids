/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./assets/js/appControl.js":
/*!*********************************!*\
  !*** ./assets/js/appControl.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _menu__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./menu */ "./assets/js/menu.js");
/* harmony import */ var _content__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./content */ "./assets/js/content.js");
/* harmony import */ var _switch__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./switch */ "./assets/js/switch.js");
/* harmony import */ var _gameControl__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./gameControl */ "./assets/js/gameControl.js");
/* harmony import */ var _statistic__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./statistic */ "./assets/js/statistic.js");
/* eslint-disable linebreak-style */
/* eslint-disable no-console */
/* eslint-disable linebreak-style */
/* eslint-disable no-undef */







class AppControl {
  constructor(topicsArr, cardsArr, mainCards) {
    this.topicsArr = topicsArr;
    this.cardsArr = cardsArr;
    this.mainCards = mainCards;

    this.menu = new _menu__WEBPACK_IMPORTED_MODULE_0__["default"](this.topicsArr)
      .addToDoc();

    this.activePage = this.menu.activePage;

    this.switchObj = new _switch__WEBPACK_IMPORTED_MODULE_2__["default"]()
      .addToDoc();

    this.activeMode = this.switchObj.activeMode;

    this.gameControl = new _gameControl__WEBPACK_IMPORTED_MODULE_3__["default"](this)
      .addToDoc();

    this.content = new _content__WEBPACK_IMPORTED_MODULE_1__["default"](this)
      .addToDoc();

    this.stat = new _statistic__WEBPACK_IMPORTED_MODULE_4__["default"](this);
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
    const audioElement = new Audio(`../assets/${cardObj.audioSrc}`);
    audioElement.play();
    return this;
  }

  playAppSound(soundName) {
    const soundsLibrary = {
      correct: 'app/correct.mp3',
      wrong: 'app/error.mp3',
      success: 'app/success.mp3',
      failure: 'app/failure.mp3',
    };

    const audioElement = new Audio(`../assets/audio/${soundsLibrary[soundName]}`);
    audioElement.play();
    return this;
  }
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (AppControl);


/***/ }),

/***/ "./assets/js/card.js":
/*!***************************!*\
  !*** ./assets/js/card.js ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _commonFunct__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./commonFunct */ "./assets/js/commonFunct.js");
/* eslint-disable linebreak-style */


class Card {
  constructor(appCtrlObj, cardObj, type = 'main page') {
    this.appCtrlObj = appCtrlObj;
    this.type = type;
    this.validTypes = ['main page', 'topic'];
    this.element = null;
    this.build(cardObj);
  }

  build(cardObj) {
    let template;
    let classNames = 'card button';
    switch (this.type) {
      case 'main page':
        template = `
                    <div class="card-content">
                        <div class="graphic card-graphic">
                            <img class="card-image" src="../assets/${cardObj.image}" alt="Section ${cardObj.cardName}" width="390" height="260">
                        </div>
                        <p class="card-text">${cardObj.cardName}</p>
                    </div>
                  `;
        classNames += ' card-main-page';
        break;
      case 'topic':
        if (this.appCtrlObj.activeMode === 'train') {
          template = `
                    <div class="card-content">
                        <div class="graphic card-graphic">
                            <img class="card-image" src="../assets/${cardObj.image}" alt="${cardObj.word}" width="390" height="260">
                        </div>
                        <p class="card-text">${cardObj.word}</p>
                        <div class="button card-flip-button">
                        </div>
                    </div>
                    `;
        } else {
          template = `
                    <div class="card-content">
                        <div class="graphic card-graphic">
                            <img class="card-image" src="../assets/${cardObj.image}" alt="${cardObj.word}" width="390" height="260">
                        </div>
                    </div>
                    `;
          classNames += ' game-card';
        }
        classNames += ' card-topic';
        break;
      default:
        break;
    }

    this.element = (0,_commonFunct__WEBPACK_IMPORTED_MODULE_0__.createCustomElement)('div', classNames, template);
    return this;
  }
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Card);


/***/ }),

/***/ "./assets/js/cards.js":
/*!****************************!*\
  !*** ./assets/js/cards.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* eslint-disable linebreak-style */
const cards = [
  ['Action (set A)', 'Action (set B)', 'Animal (set A)', 'Animal (set B)', 'Clothes', 'Emotions'],
  [
    {
      word: 'cry',
      translation: 'плакать',
      image: 'img/cry.jpg',
      audioSrc: 'audio/cry.mp3',
    },
    {
      word: 'dance',
      translation: 'танцевать',
      image: 'img/dance.jpg',
      audioSrc: 'audio/dance.mp3',
    },
    {
      word: 'dive',
      translation: 'нырять',
      image: 'img/dive.jpg',
      audioSrc: 'audio/dive.mp3',
    },
    {
      word: 'draw',
      translation: 'рисовать',
      image: 'img/draw.jpg',
      audioSrc: 'audio/draw.mp3',
    },
    {
      word: 'fish',
      translation: 'ловить рыбу',
      image: 'img/fish.jpg',
      audioSrc: 'audio/fish.mp3',
    },
    {
      word: 'fly',
      translation: 'летать',
      image: 'img/fly.jpg',
      audioSrc: 'audio/fly.mp3',
    },
    {
      word: 'hug',
      translation: 'обнимать',
      image: 'img/hug.jpg',
      audioSrc: 'audio/hug.mp3',
    },
    {
      word: 'jump',
      translation: 'прыгать',
      image: 'img/jump.jpg',
      audioSrc: 'audio/jump.mp3',
    },
  ],
  [
    {
      word: 'open',
      translation: 'открывать',
      image: 'img/open.jpg',
      audioSrc: 'audio/open.mp3',
    },
    {
      word: 'play',
      translation: 'играть',
      image: 'img/play.jpg',
      audioSrc: 'audio/play.mp3',
    },
    {
      word: 'point',
      translation: 'указывать',
      image: 'img/point.jpg',
      audioSrc: 'audio/point.mp3',
    },
    {
      word: 'ride',
      translation: 'ездить',
      image: 'img/ride.jpg',
      audioSrc: 'audio/ride.mp3',
    },
    {
      word: 'run',
      translation: 'бегать',
      image: 'img/run.jpg',
      audioSrc: 'audio/run.mp3',
    },
    {
      word: 'sing',
      translation: 'петь',
      image: 'img/sing.jpg',
      audioSrc: 'audio/sing.mp3',
    },
    {
      word: 'skip',
      translation: 'пропускать, прыгать',
      image: 'img/skip.jpg',
      audioSrc: 'audio/skip.mp3',
    },
    {
      word: 'swim',
      translation: 'плавать',
      image: 'img/swim.jpg',
      audioSrc: 'audio/swim.mp3',
    },
  ],
  [
    {
      word: 'cat',
      translation: 'кот',
      image: 'img/cat.jpg',
      audioSrc: 'audio/cat.mp3',
    },
    {
      word: 'chick',
      translation: 'цыплёнок',
      image: 'img/chick.jpg',
      audioSrc: 'audio/chick.mp3',
    },
    {
      word: 'chicken',
      translation: 'курица',
      image: 'img/chicken.jpg',
      audioSrc: 'audio/chicken.mp3',
    },
    {
      word: 'dog',
      translation: 'собака',
      image: 'img/dog.jpg',
      audioSrc: 'audio/dog.mp3',
    },
    {
      word: 'horse',
      translation: 'лошадь',
      image: 'img/horse.jpg',
      audioSrc: 'audio/horse.mp3',
    },
    {
      word: 'pig',
      translation: 'свинья',
      image: 'img/pig.jpg',
      audioSrc: 'audio/pig.mp3',
    },
    {
      word: 'rabbit',
      translation: 'кролик',
      image: 'img/rabbit.jpg',
      audioSrc: 'audio/rabbit.mp3',
    },
    {
      word: 'sheep',
      translation: 'овца',
      image: 'img/sheep.jpg',
      audioSrc: 'audio/sheep.mp3',
    },
  ],
  [
    {
      word: 'bird',
      translation: 'птица',
      image: 'img/bird.jpg',
      audioSrc: 'audio/bird.mp3',
    },
    {
      word: 'fish',
      translation: 'рыба',
      image: 'img/fish1.jpg',
      audioSrc: 'audio/fish.mp3',
    },
    {
      word: 'frog',
      translation: 'жаба',
      image: 'img/frog.jpg',
      audioSrc: 'audio/frog.mp3',
    },
    {
      word: 'giraffe',
      translation: 'жирафа',
      image: 'img/giraffe.jpg',
      audioSrc: 'audio/giraffe.mp3',
    },
    {
      word: 'lion',
      translation: 'лев',
      image: 'img/lion.jpg',
      audioSrc: 'audio/lion.mp3',
    },
    {
      word: 'mouse',
      translation: 'мышь',
      image: 'img/mouse.jpg',
      audioSrc: 'audio/mouse.mp3',
    },
    {
      word: 'turtle',
      translation: 'черепаха',
      image: 'img/turtle.jpg',
      audioSrc: 'audio/turtle.mp3',
    },
    {
      word: 'dolphin',
      translation: 'дельфин',
      image: 'img/dolphin.jpg',
      audioSrc: 'audio/dolphin.mp3',
    },
  ],
  [
    {
      word: 'skirt',
      translation: 'юбка',
      image: 'img/skirt.jpg',
      audioSrc: 'audio/skirt.mp3',
    },
    {
      word: 'pants',
      translation: 'брюки',
      image: 'img/pants.jpg',
      audioSrc: 'audio/pants.mp3',
    },
    {
      word: 'blouse',
      translation: 'блузка',
      image: 'img/blouse.jpg',
      audioSrc: 'audio/blouse.mp3',
    },
    {
      word: 'dress',
      translation: 'платье',
      image: 'img/dress.jpg',
      audioSrc: 'audio/dress.mp3',
    },
    {
      word: 'boot',
      translation: 'ботинок',
      image: 'img/boot.jpg',
      audioSrc: 'audio/boot.mp3',
    },
    {
      word: 'shirt',
      translation: 'рубашка',
      image: 'img/shirt.jpg',
      audioSrc: 'audio/shirt.mp3',
    },
    {
      word: 'coat',
      translation: 'пальто',
      image: 'img/coat.jpg',
      audioSrc: 'audio/coat.mp3',
    },
    {
      word: 'shoe',
      translation: 'туфли',
      image: 'img/shoe.jpg',
      audioSrc: 'audio/shoe.mp3',
    },
  ],
  [
    {
      word: 'sad',
      translation: 'грустный',
      image: 'img/sad.jpg',
      audioSrc: 'audio/sad.mp3',
    },
    {
      word: 'angry',
      translation: 'сердитый',
      image: 'img/angry.jpg',
      audioSrc: 'audio/angry.mp3',
    },
    {
      word: 'happy',
      translation: 'счастливый',
      image: 'img/happy.jpg',
      audioSrc: 'audio/happy.mp3',
    },
    {
      word: 'tired',
      translation: 'уставший',
      image: 'img/tired.jpg',
      audioSrc: 'audio/tired.mp3',
    },
    {
      word: 'surprised',
      translation: 'удивлённый',
      image: 'img/surprised.jpg',
      audioSrc: 'audio/surprised.mp3',
    },
    {
      word: 'scared',
      translation: 'испуганный',
      image: 'img/scared.jpg',
      audioSrc: 'audio/scared.mp3',
    },
    {
      word: 'smile',
      translation: 'улыбка',
      image: 'img/smile.jpg',
      audioSrc: 'audio/smile.mp3',
    },
    {
      word: 'laugh',
      translation: 'смех',
      image: 'img/laugh.jpg',
      audioSrc: 'audio/laugh.mp3',
    },
  ],
];

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (cards);


/***/ }),

/***/ "./assets/js/clickUserInteractive.js":
/*!*******************************************!*\
  !*** ./assets/js/clickUserInteractive.js ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* eslint-disable linebreak-style */
/* eslint-disable prefer-destructuring */
/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
/* eslint-disable no-undef */

function clickUserInteractive(event, appCtrlObj) {
  const appControl = appCtrlObj;
  const menu = appControl.menu;
  const gameControl = appControl.gameControl;
  const switchObj = appControl.switchObj;
  const content = appControl.content;
  const targetClassList = Array.from(event.target.classList);
  const isGameMode = (appControl.activeMode === 'play');
  let cardElement;
  let activeMenuElement;

  switch (true) {
    //  clicking on menu burger button
    case (targetClassList.includes('menu-button')):
      menu.toggle();
      break;

    //  clicking anywhere else when burger menu opened
    case (document.querySelector('body').classList.contains('opened-menu') && !targetClassList.includes('menu')):
      menu.close();
      if (targetClassList.includes('menu-item')) {
        activeMenuElement = event.target;
        appControl.changePage(activeMenuElement.innerHTML);
        appControl.switchObj.enable();
      }
      break;

    //  clicking on switch button
    case (targetClassList.includes('switch-trigger')
          && !switchObj.element.classList.contains('disabled')): {
      switchObj.toggle();
      appControl.changePage(appControl.activePage);
      break;
    }

    //  clicking on start game button
    case (targetClassList.includes('start-button')): {
      gameControl.startGame(appControl.activeArrCardsObj);
      break;
    }

    //  clicking on start game button
    case (targetClassList.includes('repeat-button')): {
      gameControl.repeatQuestion();
      break;
    }

    //  clicking on card flip button
    case (targetClassList.includes('card-flip-button')):
      cardElement = content.getCardElementByTarget(event.target);
      content.flipCard(cardElement);
      break;

    //  clicking on card
    case (targetClassList.some((className) => content.validCardClasses.includes(className))): {
      let cardObj;
      cardElement = content.getCardElementByTarget(event.target);

      if (!cardElement.classList.contains('card-main-page')) {
        const cardImageName = content.getCardImageName(cardElement);
        cardObj = content.getCardObjByImageName(cardImageName);
      }

      if (isGameMode && gameControl.isGameStarted && !cardElement.classList.contains('disabled')) {
        gameControl.processAnswer(cardObj, cardElement);
        break;
      } else if (cardElement.classList.contains('card-main-page')) {
        const pageName = content.getCardInnerText(cardElement);
        activeMenuElement = menu.getMenuItemByName(pageName);
        appControl.changePage(pageName);
      } else if (!cardElement.classList.contains('flipped') && !cardElement.classList.contains('game-card')) {
        appControl.playCardSound(cardObj);
        appControl.stat.storage.add('click', cardObj);
      }
      break;
    }

    //  clicking on table header
    case (targetClassList.includes('sortable')):
      appControl.stat.sortTable(event.target);
      content.changeContent('statistic');
      break;

    //  clicking on reset button
    case (targetClassList.includes('reset-stat')):
      appControl.stat.storage.cleanStorage();
      if (appControl.content.type === 'statistic') {
        content.changeContent('statistic');
      } else {
        content.changeContent('train diff');
      }

      break;

    //  clicking on train diff. words button
    case (targetClassList.includes('train-diff')):
      switchObj.train();
      switchObj.disable();
      appControl.stat.storage.getDiffWordsArr();
      content.changeContent('train diff');
      break;

    default:
      break;
  }
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (clickUserInteractive);


/***/ }),

/***/ "./assets/js/commonFunct.js":
/*!**********************************!*\
  !*** ./assets/js/commonFunct.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "createCustomElement": () => (/* binding */ createCustomElement),
/* harmony export */   "getRandomInt": () => (/* binding */ getRandomInt)
/* harmony export */ });
/* eslint-disable linebreak-style */
/* eslint-disable import/prefer-default-export */
/* eslint-disable no-undef */

function createCustomElement(type, className = '', innerHTML = '') {
  const element = document.createElement(type);
  element.className = className;
  element.innerHTML = innerHTML;
  return element;
}

function getRandomInt(maxInt, minInt = 0) {
  //  max and min inclusive
  return Math.floor(Math.random() * (maxInt - minInt + 1)) + minInt;
}




/***/ }),

/***/ "./assets/js/content.js":
/*!******************************!*\
  !*** ./assets/js/content.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _card__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./card */ "./assets/js/card.js");
/* harmony import */ var _commonFunct__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./commonFunct */ "./assets/js/commonFunct.js");
/* eslint-disable linebreak-style */
/* eslint-disable no-restricted-syntax */
/* eslint-disable linebreak-style */
/* eslint-disable no-console */
/* eslint-disable linebreak-style */
/* eslint-disable class-methods-use-this */
/* eslint-disable no-undef */




class ContentContainer {
  constructor(appCtrlObj, type = 'main page') {
    this.appControl = appCtrlObj;
    this.topicsArr = appCtrlObj.topicsArr;
    this.cardsArr = appCtrlObj.cardsArr;
    this.menu = appCtrlObj.menu;
    this.validTypes = ['main page', 'topic', 'statistic', 'train diff'];
    this.validCardClasses = ['card', 'card-content', 'card-text', 'card-graphic', 'card-image'];
    this.type = this.getValidType(type);
    [this.headerElement] = document.getElementsByClassName('container-centered');
    this.cardsCollection = null;
    this.gameCatdsCollection = null;
    this.element = null;
    this.build();
  }

  build() {
    const contentWrapper = (0,_commonFunct__WEBPACK_IMPORTED_MODULE_1__.createCustomElement)('div', 'content-wrapper');
    let contentElement;

    switch (this.type) {
      case 'statistic':
        if (!this.appControl.stat.sorted) {
          this.appControl.stat.build();
        } else {
          this.appControl.stat.sorted = false;
        }
        contentElement = this.appControl.stat.element;
        break;
      case 'train diff':
        this.appControl.stat.build();
        contentElement = this.appControl.stat.element;
        break;
      case 'main page':
        contentElement = this.createMainCardsContainer();
        break;
      case 'topic': {
        contentElement = this.createTopicCardsContent();
        break;
      }
      default:
        break;
    }

    if (this.type === 'main page') {
      this.headerElement.classList.add('main-page');
    } else {
      this.headerElement.classList.remove('main-page');
    }

    contentWrapper.append(contentElement);
    this.element = contentWrapper;

    return this;
  }

  createMainCardsContainer() {
    const mainContainerElement = (0,_commonFunct__WEBPACK_IMPORTED_MODULE_1__.createCustomElement)('div', 'card-container');
    this.topicsArr.forEach((topic, index) => {
      const cardObj = {
        cardName: topic,
        image: this.appControl.mainCards[index].image,
      };
      mainContainerElement.append(new _card__WEBPACK_IMPORTED_MODULE_0__["default"](this.appControl, cardObj).element);
    });

    return mainContainerElement;
  }

  createTopicCardsContent() {
    const contentFragment = new DocumentFragment();
    const cardsContainerElement = (0,_commonFunct__WEBPACK_IMPORTED_MODULE_1__.createCustomElement)('div', 'card-container');
    const cardIndex = this.topicsArr.findIndex((item) => {
      const result = item.toLowerCase() === this.appControl.activePage;
      return result;
    });
    const topicName = this.topicsArr[cardIndex];

    this.cardsArr[cardIndex].forEach((cardObj) => {
      cardsContainerElement.append(new _card__WEBPACK_IMPORTED_MODULE_0__["default"](this.appControl, cardObj, this.type).element);
    });

    contentFragment.append((0,_commonFunct__WEBPACK_IMPORTED_MODULE_1__.createCustomElement)('h2', 'topic-name', topicName));
    contentFragment.append(cardsContainerElement);

    return contentFragment;
  }

  addToDoc() {
    document.querySelector('main').append(this.element);
    [this.element] = document.getElementsByClassName('content-wrapper');
    this.cardsCollection = document.getElementsByClassName('card');
    this.gameCardsCollection = document.getElementsByClassName('game-card');
    return this;
  }

  clear() {
    document.querySelector('.content-wrapper').remove();
    return this;
  }

  changeContent(menuTopicName) {
    this.type = this.getValidTopicType(menuTopicName);
    this.appControl.gameControl
      .endGame();

    this
      .build()
      .clear()
      .addToDoc();
    return this;
  }

  isElementInCard(element) {
    return (this.validCardClasses.some((className) => element.classList.contains(className)));
  }

  getValidType(type) {
    if (this.validTypes.includes(type)) {
      return type;
    }
    throw new Error('wrong type of Object');
  }

  getValidTopicType(menuTopicName) {
    const curentMenuTopicName = menuTopicName.toLowerCase();
    if (this.validTypes.includes(curentMenuTopicName)) {
      return curentMenuTopicName;
    } if (this.topicsArr.map((item) => item.toLowerCase()).includes(curentMenuTopicName)) {
      return 'topic';
    }
    throw new Error('wrong menu topic Name');
  }

  getCardObjByWord(word) {
    return this.cardsArr.flat().find((cardObj) => cardObj.word === word);
  }

  getCardObjByImageName(imageName) {
    return this.cardsArr.flat().find((cardObj) => cardObj.image === `img/${imageName}.jpg`);
  }

  getCardObjByTranslation(translation) {
    return this.cardsArr.flat().find((cardObj) => cardObj.translation === translation);
  }

  getCardElementByTarget(targetElement) {
    let searchElement = targetElement;
    while (!searchElement.classList.contains('card')) {
      searchElement = searchElement.parentElement;
    }
    return searchElement;
  }

  getCardInnerText(cardElement) {
    return cardElement.querySelector('p').innerHTML;
  }

  getCardImageName(cardElement) {
    const imageSrc = cardElement.querySelector('.card-image').src;
    const imageName = imageSrc.match(/(?<=\/)\w+(?=\.png|.svg|.jpg|.jpeg|.gif)/)[0];
    return imageName;
  }

  flipCard(cardElement) {
    const cardParagraph = cardElement.querySelector('p');
    const cardFlipButton = cardElement.querySelector('.card-flip-button');
    const cardImageName = this.getCardImageName(cardElement);
    const cardObj = this.getCardObjByImageName(cardImageName);

    cardElement.classList.remove('unflipped');
    cardElement.classList.add('flipped');
    cardElement.addEventListener(
      'pointerleave',
      () => {
        setTimeout(() => {
          this.unflipCard(cardElement);
        }, 500);
      },
      { once: true },
    );

    setTimeout(() => {
      cardParagraph.innerHTML = cardObj.translation;
      cardFlipButton.hidden = true;
    }, 500);

    return this;
  }

  unflipCard(cardElement) {
    cardElement.removeEventListener('pointerleave', (event) => unhoverCard(event, cardElement, this));

    if (cardElement.classList.contains('flipped')) {
      const cardParagraph = cardElement.querySelector('p');
      const cardFlipButton = cardElement.querySelector('.card-flip-button');
      const cardWord = cardParagraph.innerHTML;
      const cardObj = this.getCardObjByTranslation(cardWord);

      cardElement.classList.remove('flipped');
      cardElement.classList.add('unflipped');
      setTimeout(() => {
        cardParagraph.innerHTML = cardObj.word;
        cardFlipButton.hidden = false;
      }, 500);
    }

    return this;
  }

  removeCards() {
    document.querySelector('.card-container').remove();
    return this;
  }

  playFinalClip(wrongAnswers) {
    const clipType = (wrongAnswers === 0) ? 'success' : 'failure';
    const classNames = 'final-clip';
    const imageSrc = `app/${clipType}.jpg`;

    const template = `
                            <div class="graphic">
                              <img src="../assets/img/${imageSrc}" alt="image ${clipType}" width="400" height="400">
                            </div>
                            `;

    const finalClipElement = (0,_commonFunct__WEBPACK_IMPORTED_MODULE_1__.createCustomElement)('div', classNames, template);
    if (clipType === 'failure') {
      finalClipElement.innerHTML += `<p class="mistakes-number">Mistakes: ${wrongAnswers}</p>`;
    }

    this.appControl.playAppSound(clipType);
    this.removeCards();
    this.element.append(finalClipElement);

    return this;
  }
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ContentContainer);


/***/ }),

/***/ "./assets/js/gameControl.js":
/*!**********************************!*\
  !*** ./assets/js/gameControl.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _star__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./star */ "./assets/js/star.js");
/* harmony import */ var _commonFunct__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./commonFunct */ "./assets/js/commonFunct.js");
/* eslint-disable linebreak-style */
/* eslint-disable no-restricted-syntax */
/* eslint-disable linebreak-style */
/* eslint-disable no-console */
/* eslint-disable linebreak-style */
/* eslint-disable no-undef */




class gameControl {
  constructor(appControl) {
    this.appControl = appControl;
    this.questionsBundle = [];
    this.isGameStarted = false;
    this.correctStarElement = new _star__WEBPACK_IMPORTED_MODULE_0__["default"]().element;
    this.wrongStarElement = new _star__WEBPACK_IMPORTED_MODULE_0__["default"]('wrong').element;

    this.activeQuestion = null;
    this.element = null;
    this.liveElement = null;
    this.liveButtonElement = null;
    this.liveIndicatorElement = null;
    this.liveCorrectPrElement = null;
    this.liveWrongPrElement = null;
    this.liveStarsCollection = null;
    this.correctAnswers = null;
    this.wrongAnswers = null;

    this.build();
  }

  build() {
    const classNames = 'game-controls inactive';
    const template = `
                    <div class="button game-button start-button">
                    </div>
                    <div class="game-progress inactive">
                      <div class="game-indicator">
                      </div>
                      <p class="game-score">
                        <span class="progress correct">0</span> | <span class="progress wrong">0</span>
                      </p>
                    </div>
                    `;
    this.element = (0,_commonFunct__WEBPACK_IMPORTED_MODULE_1__.createCustomElement)('div', classNames, template);
    return this;
  }

  addToDoc() {
    document.querySelector('header').append(this.element);
    [this.liveElement] = document.getElementsByClassName('game-controls');
    [this.liveButtonElement] = this.liveElement.getElementsByClassName('game-button');
    [this.liveIndicatorElement] = this.liveElement.getElementsByClassName('game-indicator');
    [this.liveCorrectPrElement, this.liveWrongPrElement] = this.liveElement.getElementsByClassName('progress');
    this.liveStarsCollection = this.liveElement.getElementsByClassName('star');

    return this;
  }

  show() {
    this.liveElement.classList.remove('inactive');
    return this;
  }

  hide() {
    this.liveElement.classList.add('inactive');
    return this;
  }

  showGameProgress() {
    document.querySelector('.game-progress').classList.remove('inactive');
    return this;
  }

  hideGameProgress() {
    document.querySelector('.game-progress').classList.add('inactive');
    return this;
  }

  createRandomQuestionsBundle(arrOptions) {
    this.questionsBundle = [];
    const workArr = arrOptions.map((item) => item);
    while (this.questionsBundle.length < arrOptions.length) {
      const randomIndex = (0,_commonFunct__WEBPACK_IMPORTED_MODULE_1__.getRandomInt)(workArr.length - 1);
      this.questionsBundle.push(...workArr.splice(randomIndex, 1));
    }
    return this;
  }

  startGame(arrOptions) {
    this.isGameStarted = true;
    this.correctAnswers = 0;
    this.wrongAnswers = 0;
    this.showGameProgress();
    this.createRandomQuestionsBundle(arrOptions);
    this.askQuestion();
    this.changeButtonClass('repeat-button');
    return this;
  }

  endGame() {
    this.isGameStarted = false;
    this.activeQuestion = null;
    this.hideGameProgress();
    this.changeButtonClass('start-button');

    if (this.correctAnswers === this.appControl.content.gameCardsCollection.length
        && this.correctAnswers !== 0) {
      this.appControl.content.playFinalClip(this.wrongAnswers);
      this.correctAnswers = 0;
      this.wrongAnswers = 0;

      setTimeout(() => {
        this.appControl.changePage('Main page');
      }, 3000);

      this.correctAnswers = 0;
      this.wrongAnswers = 0;
    }

    this.liveCorrectPrElement.innerHTML = '0';
    this.liveWrongPrElement.innerHTML = '0';
    this.liveIndicatorElement.innerHTML = '';
    return this;
  }

  askQuestion() {
    if (this.questionsBundle.length !== 0) {
      this.activeQuestion = this.questionsBundle.pop();
      this.appControl.playCardSound(this.activeQuestion);
    } else {
      this.endGame();
    }
    return this;
  }

  processAnswer(cardObj, cardElement) {
    if (this.liveStarsCollection.length >= 5) {
      this.liveIndicatorElement.firstElementChild.remove();
    }

    if (Object.entries(this.activeQuestion).every(([key, value]) => value === cardObj[key])) {
      this.correctAnswer(this.activeQuestion);
      cardElement.classList.add('disabled');
    } else {
      this.wrongAnswer(this.activeQuestion);
    }

    return this;
  }

  correctAnswer(cardObj) {
    this.appControl.playAppSound('correct');
    this.correctAnswers += 1;
    this.appControl.stat.storage.add('correct', cardObj);
    this.liveCorrectPrElement.innerHTML = this.correctAnswers;
    this.liveIndicatorElement.append(new _star__WEBPACK_IMPORTED_MODULE_0__["default"]().element);
    setTimeout(() => {
      this.askQuestion();
    }, 1000);

    return this;
  }

  wrongAnswer(cardObj) {
    this.appControl.playAppSound('wrong');
    this.wrongAnswers += 1;
    this.appControl.stat.storage.add('wrong', cardObj);
    this.liveWrongPrElement.innerHTML = this.wrongAnswers;
    this.liveIndicatorElement.append(new _star__WEBPACK_IMPORTED_MODULE_0__["default"]('wrong').element);
    return this;
  }

  repeatQuestion() {
    this.appControl.playCardSound(this.activeQuestion);
    return this;
  }

  changeButtonClass(buttonClassName) {
    const removedClassName = (buttonClassName === 'start-button') ? 'repeat-button' : 'start-button';
    this.liveButtonElement.classList.add(buttonClassName);
    this.liveButtonElement.classList.remove(removedClassName);
    return this;
  }
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (gameControl);


/***/ }),

/***/ "./assets/js/mainCards.js":
/*!********************************!*\
  !*** ./assets/js/mainCards.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* eslint-disable linebreak-style */
const mainCards = [
  {
    topic: 'Action (set A)',
    image: 'img/app/main-001.png',
  },
  {
    topic: 'Action (set B)',
    image: 'img/app/main-002.png',
  },
  {
    topic: 'Animal (set A)',
    image: 'img/app/main-003.png',
  },
  {
    topic: 'Animal (set B)',
    image: 'img/app/main-004.png',
  },
  {
    topic: 'Clothes',
    image: 'img/app/main-005.png',
  },
  {
    topic: 'Emotions',
    image: 'img/app/main-006.png',
  },
];

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (mainCards);


/***/ }),

/***/ "./assets/js/menu.js":
/*!***************************!*\
  !*** ./assets/js/menu.js ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ MenuElement)
/* harmony export */ });
/* harmony import */ var _commonFunct__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./commonFunct */ "./assets/js/commonFunct.js");
/* eslint-disable linebreak-style */
/* eslint-disable no-console */
/* eslint-disable linebreak-style */
/* eslint-disable consistent-return */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-undef */



class MenuElement {
  constructor(topicsArr, startMenu = 'Main page', endMenu = 'Statistic') {
    this.openedMenuCollections = [
      document.getElementsByTagName('body'),
      document.getElementsByClassName('menu'),
      document.getElementsByClassName('menu-button'),
    ];
    this.topicsArr = topicsArr;
    this.startMenu = startMenu;
    this.endMenu = endMenu;
    this.activePage = this.startMenu.toLowerCase();
    this.menuItemsElements = null;
    this.element = null;

    this.build();
  }

  build() {
    function createLi(topicName = '') {
      const element = document.createElement('li');
      element.className = 'button menu-item';
      element.innerHTML = topicName;
      return element;
    }

    const ulElement = document.createElement('ul');
    ulElement.className = 'menu-list';

    ulElement.append(createLi(this.startMenu));
    this.topicsArr.forEach((topicName) => ulElement.append(createLi(topicName)));
    ulElement.append(createLi(this.endMenu));

    const buttonTemplate = `
                            <div class="button close-menu"></div>
                            `;

    const menuElement = (0,_commonFunct__WEBPACK_IMPORTED_MODULE_0__.createCustomElement)('nav', 'menu', buttonTemplate);
    menuElement.append(ulElement);
    this.element = menuElement;
    return this;
  }

  addToDoc() {
    document.querySelector('.main-controls').prepend(this.element);
    this.menuItemsElements = document.getElementsByClassName('menu-item');
    this.setActiveTopic(this.menuItemsElements[0].innerHTML);
    return this;
  }

  toggle() {
    this.openedMenuCollections.map((htmlCollection) => htmlCollection[0].classList.toggle('opened-menu'));
    return this;
  }

  close() {
    this.openedMenuCollections.map((htmlCollection) => htmlCollection[0].classList.remove('opened-menu'));
  }

  setActiveTopic(topicName) {
    const className = 'active-page';
    const topicElement = this.getMenuItemByName(topicName);
    this.activePage = topicName.toLowerCase();
    for (const menuItemElement of this.menuItemsElements) {
      menuItemElement.classList.remove(className);
    }
    topicElement.classList.add(className);

    return this;
  }

  getMenuItemByName(itemName) {
    for (const element of this.menuItemsElements) {
      if (element.innerHTML.toLowerCase() === itemName.toLowerCase()) {
        return element;
      }
    }
  }
}


/***/ }),

/***/ "./assets/js/star.js":
/*!***************************!*\
  !*** ./assets/js/star.js ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _commonFunct__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./commonFunct */ "./assets/js/commonFunct.js");
/* eslint-disable linebreak-style */



class Star {
  constructor(type = 'correct') {
    this.type = (type === 'correct') ? type : 'wrong';
    const classNames = `graphic star star-${this.type}`;
    let imageSrc;

    if (this.type === 'correct') {
      imageSrc = 'app/star-win.svg';
    } else {
      imageSrc = 'app/star.svg';
    }

    const template = `
                      <img class="star-image" src="../assets/img/${imageSrc}" alt="${this.type} star" width="40" height="40">
                      `;
    this.element = (0,_commonFunct__WEBPACK_IMPORTED_MODULE_0__.createCustomElement)('div', classNames, template);
  }
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Star);


/***/ }),

/***/ "./assets/js/statStorage.js":
/*!**********************************!*\
  !*** ./assets/js/statStorage.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* eslint-disable linebreak-style */
/* eslint-disable no-console */
/* eslint-disable linebreak-style */
/* eslint-disable no-undef */
/* eslint-disable linebreak-style */

class StatStorage {
  constructor(topicsArr, cardsArr) {
    this.topicsArr = topicsArr;
    this.cardsArr = cardsArr;
    this.statArr = JSON.parse(localStorage.getItem('EnglishForKids') || []);
    if (!this.statArr) {
      this
        .build()
        .updateStorage();
    }
  }

  build() {
    const statDataArr = [];
    this.topicsArr.forEach((topiName, index) => {
      const topicCardsArr = this.cardsArr[index];

      topicCardsArr.forEach((wordObj) => {
        const statWordObj = {
          topic: topiName,
          word: wordObj.word,
          translation: wordObj.translation,
          trainClick: 0,
          correctAnswers: 0,
          mistakes: 0,
          percentage: 0,
          image: wordObj.image,
          audioSrc: wordObj.audioSrc,
        };
        statDataArr.push(statWordObj);
      });
    });
    this.statArr = statDataArr;
    return this;
  }

  updateStorage() {
    localStorage.setItem('EnglishForKids', JSON.stringify(this.statArr));
    return this;
  }

  cleanStorage() {
    localStorage.setItem('EnglishForKids', JSON.stringify(''));
    this
      .build()
      .updateStorage();
    return this;
  }

  add(type, cardObj) {
    const objIndex = this.statArr.findIndex((wordObj) => {
      const result = (wordObj.word === cardObj.word)
            && (wordObj.translation === cardObj.translation);
      return result;
    });

    switch (type) {
      case 'click': {
        this.statArr[objIndex].trainClick += 1;
        break;
      }
      case 'correct': {
        this.statArr[objIndex].correctAnswers += 1;
        break;
      }
      case 'wrong': {
        this.statArr[objIndex].mistakes += 1;
        break;
      }
      default:
        break;
    }

    const corrAnsw = this.statArr[objIndex].correctAnswers;
    const wrongAnsw = this.statArr[objIndex].mistakes;
    if (corrAnsw && wrongAnsw) {
      this.statArr[objIndex].percentage = Math.round((corrAnsw / (corrAnsw + wrongAnsw)) * 100);
    } else if (corrAnsw) {
      this.statArr[objIndex].percentage = 100;
    }

    this.updateStorage();
    return this;
  }

  getSortedArrByProp(property, sortType = 'down') {
    const sortedArr = [];
    this.statArr.forEach((item) => sortedArr.push(item));

    function compareFunction(objA, objB) {
      if (objA[property] > objB[property]) {
        return 1;
      }
      if (objA[property] < objB[property]) {
        return -1;
      }
      return 0;
    }

    if (sortType === 'down') {
      sortedArr.sort((a, b) => compareFunction(a, b));
    } else {
      sortedArr.sort((a, b) => compareFunction(b, a));
    }
    return sortedArr;
  }

  getDiffWordsArr() {
    const sortedArr = this.getSortedArrByProp('percentage', 'down');
    const resultArr = sortedArr.filter((item) => item.percentage > 0 && item.percentage < 100);
    return resultArr;
  }
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (StatStorage);


/***/ }),

/***/ "./assets/js/statistic.js":
/*!********************************!*\
  !*** ./assets/js/statistic.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _statStorage__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./statStorage */ "./assets/js/statStorage.js");
/* harmony import */ var _card__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./card */ "./assets/js/card.js");
/* harmony import */ var _commonFunct__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./commonFunct */ "./assets/js/commonFunct.js");
/* eslint-disable linebreak-style */
/* eslint-disable class-methods-use-this */
/* eslint-disable linebreak-style */
/* eslint-disable no-console */
/* eslint-disable linebreak-style */
/* eslint-disable no-undef */
/* eslint-disable linebreak-style */






class Statistic {
  constructor(appControl) {
    this.appControl = appControl;
    this.storage = new _statStorage__WEBPACK_IMPORTED_MODULE_0__["default"](appControl.topicsArr, appControl.cardsArr);
    this.sorted = false;
    this.sortType = null;
    this.sortProperty = null;
    this.element = null;
    this.propsLib = {
      Category: 'topic',
      Word: 'word',
      Translation: 'translation',
      Train: 'trainClick',
      Correct: 'correctAnswers',
      Mistakes: 'mistakes',
      '%': 'percentage',
    };
    this.build();
  }

  build(dataArr = this.storage.statArr) {
    const classNames = 'stat-container';
    const statContentElement = (this.appControl.content.type === 'statistic')
      ? this.createTableElement(dataArr)
      : this.createTrainDiffContainer();

    const template = `
                      <h2>Game Statistic</h2>
                      <div class="stat-buttons-wrapper">
                        <div class="button stat-button train-diff">Train difficult words</div>
                        <div class="button stat-button reset-stat">Reset stats</div>
                      </div>
                    `;

    const statElement = (0,_commonFunct__WEBPACK_IMPORTED_MODULE_2__.createCustomElement)('div', classNames, template);

    statElement.append(statContentElement);
    this.element = statElement;
    return this;
  }

  createTableElement(dataArr) {
    const tableElement = (0,_commonFunct__WEBPACK_IMPORTED_MODULE_2__.createCustomElement)('div', 'table-wrapper');

    let tableBodyInner = '';
    dataArr.forEach((wordObj) => {
      const rowTemplate = `
                          <tr>
                            <td>${wordObj.topic}</th>
                            <td>${wordObj.word}</th>
                            <td>${wordObj.translation}</th>
                            <td>${wordObj.trainClick}</th>
                            <td>${wordObj.correctAnswers}</th>
                            <td>${wordObj.mistakes}</th>
                            <td>${wordObj.percentage}&nbsp;%</th>
                          </tr>
                          `;
      tableBodyInner += rowTemplate;
    });

    const thClassNames = 'button sortable';
    const thTitle = 'sort';
    let theadRowInner = '';

    Object.entries(this.propsLib).forEach(([columnName, propName]) => {
      let sortClassName = '';
      let imageHTML = '';

      if (this.sorted && (this.sortProperty === propName)) {
        sortClassName = ` sorted-${this.sortType}`;
        const imageName = (this.sortType === 'down') ? 'sort-asc' : 'sort-desc';
        imageHTML = `
                    <img class="sort-icon button sortable" src=../assets/icons/${imageName}.png alt="sort icon" width="51" height="51"></img>
                    `;
      }

      theadRowInner += `
                        <th class="thead ${thClassNames}${sortClassName}" title="${thTitle}">
                          <span class="thName button sortable">${columnName}</span>
                          ${imageHTML}
                        </th>
                        `;
    });

    const tableInnerHTML = `
                          <table class="stat-table">
                            <thead>
                              <tr>
                                ${theadRowInner}
                              </tr>
                            </thead>
                            <tbody>
                              ${tableBodyInner}
                            </tbody>
                          </table>
                        `;

    tableElement.innerHTML = tableInnerHTML;

    return tableElement;
  }

  createTrainDiffContainer() {
    let resultElement;
    const diffWordsArr = this.storage.getDiffWordsArr();
    const diffWordsAmount = diffWordsArr.length;

    switch (diffWordsAmount) {
      case 0: {
        const template = `
                          <div class="graphic">
                            <img src="../assets/img/app/super.png" alt="super result" width="753" height="553">
                          </div>
                          <p>Nothing difficult!</p>
                        `;

        resultElement = (0,_commonFunct__WEBPACK_IMPORTED_MODULE_2__.createCustomElement)('div', 'nothing-diff', template);
        break;
      }
      default: {
        const cardsContainerElement = (0,_commonFunct__WEBPACK_IMPORTED_MODULE_2__.createCustomElement)('div', 'card-container');
        const maxCardsAmount = 8;
        const cardsAmount = (diffWordsArr.length < maxCardsAmount)
          ? diffWordsAmount
          : maxCardsAmount;

        for (let i = 0; i < cardsAmount; i += 1) {
          const cardObj = diffWordsArr[i];
          const cardElement = new _card__WEBPACK_IMPORTED_MODULE_1__["default"](this.appControl, cardObj, 'topic').element;
          cardsContainerElement.append(cardElement);
        }

        resultElement = cardsContainerElement;
        break;
      }
    }

    return resultElement;
  }

  sortTable(targetElement) {
    const thHeadElement = this.getTheadByTarget(targetElement);
    this.sorted = true;
    this.sortType = (!thHeadElement.classList.contains('sorted-down')) ? 'down' : 'up';
    const thName = thHeadElement.querySelector('.thName').innerHTML;
    this.sortProperty = this.propsLib[thName];
    const sortedArr = this.storage.getSortedArrByProp(this.sortProperty, this.sortType);
    this.build(sortedArr);
    return this;
  }

  getTheadByTarget(targetElement) {
    let searchElement = targetElement;
    while (!searchElement.classList.contains('thead')) {
      searchElement = searchElement.parentElement;
    }
    return searchElement;
  }
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Statistic);


/***/ }),

/***/ "./assets/js/switch.js":
/*!*****************************!*\
  !*** ./assets/js/switch.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _commonFunct__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./commonFunct */ "./assets/js/commonFunct.js");
/* eslint-disable linebreak-style */
/* eslint-disable no-console */
/* eslint-disable linebreak-style */
/* eslint-disable no-undef */



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

    this.element = (0,_commonFunct__WEBPACK_IMPORTED_MODULE_0__.createCustomElement)('div', classNames, template);
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

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Switch);


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./assets/styles/normalize.css":
/*!***************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./assets/styles/normalize.css ***!
  \***************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/sourceMaps.js */ "./node_modules/css-loader/dist/runtime/sourceMaps.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, "/*! normalize.css v8.0.1 | MIT License | github.com/necolas/normalize.css */\r\n\r\n/* Document\r\n   ========================================================================== */\r\n\r\n/**\r\n * 1. Correct the line height in all browsers.\r\n * 2. Prevent adjustments of font size after orientation changes in iOS.\r\n */\r\n\r\nhtml {\r\n  line-height: 1.15; /* 1 */\r\n  -webkit-text-size-adjust: 100%; /* 2 */\r\n}\r\n\r\n/* Sections\r\n   ========================================================================== */\r\n\r\n/**\r\n * Remove the margin in all browsers.\r\n */\r\n\r\nbody {\r\n  margin: 0;\r\n}\r\n\r\n/**\r\n * Render the `main` element consistently in IE.\r\n */\r\n\r\nmain {\r\n  display: block;\r\n}\r\n\r\n/**\r\n * Correct the font size and margin on `h1` elements within `section` and\r\n * `article` contexts in Chrome, Firefox, and Safari.\r\n */\r\n\r\nh1 {\r\n  font-size: 2em;\r\n  margin: 0.67em 0;\r\n}\r\n\r\n/* Grouping content\r\n   ========================================================================== */\r\n\r\n/**\r\n * 1. Add the correct box sizing in Firefox.\r\n * 2. Show the overflow in Edge and IE.\r\n */\r\n\r\nhr {\r\n  box-sizing: content-box; /* 1 */\r\n  height: 0; /* 1 */\r\n  overflow: visible; /* 2 */\r\n}\r\n\r\n/**\r\n * 1. Correct the inheritance and scaling of font size in all browsers.\r\n * 2. Correct the odd `em` font sizing in all browsers.\r\n */\r\n\r\npre {\r\n  font-family: monospace, monospace; /* 1 */\r\n  font-size: 1em; /* 2 */\r\n}\r\n\r\n/* Text-level semantics\r\n   ========================================================================== */\r\n\r\n/**\r\n * Remove the gray background on active links in IE 10.\r\n */\r\n\r\na {\r\n  background-color: transparent;\r\n}\r\n\r\n/**\r\n * 1. Remove the bottom border in Chrome 57-\r\n * 2. Add the correct text decoration in Chrome, Edge, IE, Opera, and Safari.\r\n */\r\n\r\nabbr[title] {\r\n  border-bottom: none; /* 1 */\r\n  text-decoration: underline; /* 2 */\r\n  text-decoration: underline dotted; /* 2 */\r\n}\r\n\r\n/**\r\n * Add the correct font weight in Chrome, Edge, and Safari.\r\n */\r\n\r\nb,\r\nstrong {\r\n  font-weight: bolder;\r\n}\r\n\r\n/**\r\n * 1. Correct the inheritance and scaling of font size in all browsers.\r\n * 2. Correct the odd `em` font sizing in all browsers.\r\n */\r\n\r\ncode,\r\nkbd,\r\nsamp {\r\n  font-family: monospace, monospace; /* 1 */\r\n  font-size: 1em; /* 2 */\r\n}\r\n\r\n/**\r\n * Add the correct font size in all browsers.\r\n */\r\n\r\nsmall {\r\n  font-size: 80%;\r\n}\r\n\r\n/**\r\n * Prevent `sub` and `sup` elements from affecting the line height in\r\n * all browsers.\r\n */\r\n\r\nsub,\r\nsup {\r\n  font-size: 75%;\r\n  line-height: 0;\r\n  position: relative;\r\n  vertical-align: baseline;\r\n}\r\n\r\nsub {\r\n  bottom: -0.25em;\r\n}\r\n\r\nsup {\r\n  top: -0.5em;\r\n}\r\n\r\n/* Embedded content\r\n   ========================================================================== */\r\n\r\n/**\r\n * Remove the border on images inside links in IE 10.\r\n */\r\n\r\nimg {\r\n  border-style: none;\r\n}\r\n\r\n/* Forms\r\n   ========================================================================== */\r\n\r\n/**\r\n * 1. Change the font styles in all browsers.\r\n * 2. Remove the margin in Firefox and Safari.\r\n */\r\n\r\nbutton,\r\ninput,\r\noptgroup,\r\nselect,\r\ntextarea {\r\n  font-family: inherit; /* 1 */\r\n  font-size: 100%; /* 1 */\r\n  line-height: 1.15; /* 1 */\r\n  margin: 0; /* 2 */\r\n}\r\n\r\n/**\r\n * Show the overflow in IE.\r\n * 1. Show the overflow in Edge.\r\n */\r\n\r\nbutton,\r\ninput { /* 1 */\r\n  overflow: visible;\r\n}\r\n\r\n/**\r\n * Remove the inheritance of text transform in Edge, Firefox, and IE.\r\n * 1. Remove the inheritance of text transform in Firefox.\r\n */\r\n\r\nbutton,\r\nselect { /* 1 */\r\n  text-transform: none;\r\n}\r\n\r\n/**\r\n * Correct the inability to style clickable types in iOS and Safari.\r\n */\r\n\r\nbutton,\r\n[type=\"button\"],\r\n[type=\"reset\"],\r\n[type=\"submit\"] {\r\n  -webkit-appearance: button;\r\n}\r\n\r\n/**\r\n * Remove the inner border and padding in Firefox.\r\n */\r\n\r\nbutton::-moz-focus-inner,\r\n[type=\"button\"]::-moz-focus-inner,\r\n[type=\"reset\"]::-moz-focus-inner,\r\n[type=\"submit\"]::-moz-focus-inner {\r\n  border-style: none;\r\n  padding: 0;\r\n}\r\n\r\n/**\r\n * Restore the focus styles unset by the previous rule.\r\n */\r\n\r\nbutton:-moz-focusring,\r\n[type=\"button\"]:-moz-focusring,\r\n[type=\"reset\"]:-moz-focusring,\r\n[type=\"submit\"]:-moz-focusring {\r\n  outline: 1px dotted ButtonText;\r\n}\r\n\r\n/**\r\n * Correct the padding in Firefox.\r\n */\r\n\r\nfieldset {\r\n  padding: 0.35em 0.75em 0.625em;\r\n}\r\n\r\n/**\r\n * 1. Correct the text wrapping in Edge and IE.\r\n * 2. Correct the color inheritance from `fieldset` elements in IE.\r\n * 3. Remove the padding so developers are not caught out when they zero out\r\n *    `fieldset` elements in all browsers.\r\n */\r\n\r\nlegend {\r\n  box-sizing: border-box; /* 1 */\r\n  color: inherit; /* 2 */\r\n  display: table; /* 1 */\r\n  max-width: 100%; /* 1 */\r\n  padding: 0; /* 3 */\r\n  white-space: normal; /* 1 */\r\n}\r\n\r\n/**\r\n * Add the correct vertical alignment in Chrome, Firefox, and Opera.\r\n */\r\n\r\nprogress {\r\n  vertical-align: baseline;\r\n}\r\n\r\n/**\r\n * Remove the default vertical scrollbar in IE 10+.\r\n */\r\n\r\ntextarea {\r\n  overflow: auto;\r\n}\r\n\r\n/**\r\n * 1. Add the correct box sizing in IE 10.\r\n * 2. Remove the padding in IE 10.\r\n */\r\n\r\n[type=\"checkbox\"],\r\n[type=\"radio\"] {\r\n  box-sizing: border-box; /* 1 */\r\n  padding: 0; /* 2 */\r\n}\r\n\r\n/**\r\n * Correct the cursor style of increment and decrement buttons in Chrome.\r\n */\r\n\r\n[type=\"number\"]::-webkit-inner-spin-button,\r\n[type=\"number\"]::-webkit-outer-spin-button {\r\n  height: auto;\r\n}\r\n\r\n/**\r\n * 1. Correct the odd appearance in Chrome and Safari.\r\n * 2. Correct the outline style in Safari.\r\n */\r\n\r\n[type=\"search\"] {\r\n  -webkit-appearance: textfield; /* 1 */\r\n  outline-offset: -2px; /* 2 */\r\n}\r\n\r\n/**\r\n * Remove the inner padding in Chrome and Safari on macOS.\r\n */\r\n\r\n[type=\"search\"]::-webkit-search-decoration {\r\n  -webkit-appearance: none;\r\n}\r\n\r\n/**\r\n * 1. Correct the inability to style clickable types in iOS and Safari.\r\n * 2. Change font properties to `inherit` in Safari.\r\n */\r\n\r\n::-webkit-file-upload-button {\r\n  -webkit-appearance: button; /* 1 */\r\n  font: inherit; /* 2 */\r\n}\r\n\r\n/* Interactive\r\n   ========================================================================== */\r\n\r\n/*\r\n * Add the correct display in Edge, IE 10+, and Firefox.\r\n */\r\n\r\ndetails {\r\n  display: block;\r\n}\r\n\r\n/*\r\n * Add the correct display in all browsers.\r\n */\r\n\r\nsummary {\r\n  display: list-item;\r\n}\r\n\r\n/* Misc\r\n   ========================================================================== */\r\n\r\n/**\r\n * Add the correct display in IE 10+.\r\n */\r\n\r\ntemplate {\r\n  display: none;\r\n}\r\n\r\n/**\r\n * Add the correct display in IE 10.\r\n */\r\n\r\n[hidden] {\r\n  display: none;\r\n}\r\n", "",{"version":3,"sources":["webpack://./assets/styles/normalize.css"],"names":[],"mappings":"AAAA,2EAA2E;;AAE3E;+EAC+E;;AAE/E;;;EAGE;;AAEF;EACE,iBAAiB,EAAE,MAAM;EACzB,8BAA8B,EAAE,MAAM;AACxC;;AAEA;+EAC+E;;AAE/E;;EAEE;;AAEF;EACE,SAAS;AACX;;AAEA;;EAEE;;AAEF;EACE,cAAc;AAChB;;AAEA;;;EAGE;;AAEF;EACE,cAAc;EACd,gBAAgB;AAClB;;AAEA;+EAC+E;;AAE/E;;;EAGE;;AAEF;EACE,uBAAuB,EAAE,MAAM;EAC/B,SAAS,EAAE,MAAM;EACjB,iBAAiB,EAAE,MAAM;AAC3B;;AAEA;;;EAGE;;AAEF;EACE,iCAAiC,EAAE,MAAM;EACzC,cAAc,EAAE,MAAM;AACxB;;AAEA;+EAC+E;;AAE/E;;EAEE;;AAEF;EACE,6BAA6B;AAC/B;;AAEA;;;EAGE;;AAEF;EACE,mBAAmB,EAAE,MAAM;EAC3B,0BAA0B,EAAE,MAAM;EAClC,iCAAiC,EAAE,MAAM;AAC3C;;AAEA;;EAEE;;AAEF;;EAEE,mBAAmB;AACrB;;AAEA;;;EAGE;;AAEF;;;EAGE,iCAAiC,EAAE,MAAM;EACzC,cAAc,EAAE,MAAM;AACxB;;AAEA;;EAEE;;AAEF;EACE,cAAc;AAChB;;AAEA;;;EAGE;;AAEF;;EAEE,cAAc;EACd,cAAc;EACd,kBAAkB;EAClB,wBAAwB;AAC1B;;AAEA;EACE,eAAe;AACjB;;AAEA;EACE,WAAW;AACb;;AAEA;+EAC+E;;AAE/E;;EAEE;;AAEF;EACE,kBAAkB;AACpB;;AAEA;+EAC+E;;AAE/E;;;EAGE;;AAEF;;;;;EAKE,oBAAoB,EAAE,MAAM;EAC5B,eAAe,EAAE,MAAM;EACvB,iBAAiB,EAAE,MAAM;EACzB,SAAS,EAAE,MAAM;AACnB;;AAEA;;;EAGE;;AAEF;QACQ,MAAM;EACZ,iBAAiB;AACnB;;AAEA;;;EAGE;;AAEF;SACS,MAAM;EACb,oBAAoB;AACtB;;AAEA;;EAEE;;AAEF;;;;EAIE,0BAA0B;AAC5B;;AAEA;;EAEE;;AAEF;;;;EAIE,kBAAkB;EAClB,UAAU;AACZ;;AAEA;;EAEE;;AAEF;;;;EAIE,8BAA8B;AAChC;;AAEA;;EAEE;;AAEF;EACE,8BAA8B;AAChC;;AAEA;;;;;EAKE;;AAEF;EACE,sBAAsB,EAAE,MAAM;EAC9B,cAAc,EAAE,MAAM;EACtB,cAAc,EAAE,MAAM;EACtB,eAAe,EAAE,MAAM;EACvB,UAAU,EAAE,MAAM;EAClB,mBAAmB,EAAE,MAAM;AAC7B;;AAEA;;EAEE;;AAEF;EACE,wBAAwB;AAC1B;;AAEA;;EAEE;;AAEF;EACE,cAAc;AAChB;;AAEA;;;EAGE;;AAEF;;EAEE,sBAAsB,EAAE,MAAM;EAC9B,UAAU,EAAE,MAAM;AACpB;;AAEA;;EAEE;;AAEF;;EAEE,YAAY;AACd;;AAEA;;;EAGE;;AAEF;EACE,6BAA6B,EAAE,MAAM;EACrC,oBAAoB,EAAE,MAAM;AAC9B;;AAEA;;EAEE;;AAEF;EACE,wBAAwB;AAC1B;;AAEA;;;EAGE;;AAEF;EACE,0BAA0B,EAAE,MAAM;EAClC,aAAa,EAAE,MAAM;AACvB;;AAEA;+EAC+E;;AAE/E;;EAEE;;AAEF;EACE,cAAc;AAChB;;AAEA;;EAEE;;AAEF;EACE,kBAAkB;AACpB;;AAEA;+EAC+E;;AAE/E;;EAEE;;AAEF;EACE,aAAa;AACf;;AAEA;;EAEE;;AAEF;EACE,aAAa;AACf","sourcesContent":["/*! normalize.css v8.0.1 | MIT License | github.com/necolas/normalize.css */\r\n\r\n/* Document\r\n   ========================================================================== */\r\n\r\n/**\r\n * 1. Correct the line height in all browsers.\r\n * 2. Prevent adjustments of font size after orientation changes in iOS.\r\n */\r\n\r\nhtml {\r\n  line-height: 1.15; /* 1 */\r\n  -webkit-text-size-adjust: 100%; /* 2 */\r\n}\r\n\r\n/* Sections\r\n   ========================================================================== */\r\n\r\n/**\r\n * Remove the margin in all browsers.\r\n */\r\n\r\nbody {\r\n  margin: 0;\r\n}\r\n\r\n/**\r\n * Render the `main` element consistently in IE.\r\n */\r\n\r\nmain {\r\n  display: block;\r\n}\r\n\r\n/**\r\n * Correct the font size and margin on `h1` elements within `section` and\r\n * `article` contexts in Chrome, Firefox, and Safari.\r\n */\r\n\r\nh1 {\r\n  font-size: 2em;\r\n  margin: 0.67em 0;\r\n}\r\n\r\n/* Grouping content\r\n   ========================================================================== */\r\n\r\n/**\r\n * 1. Add the correct box sizing in Firefox.\r\n * 2. Show the overflow in Edge and IE.\r\n */\r\n\r\nhr {\r\n  box-sizing: content-box; /* 1 */\r\n  height: 0; /* 1 */\r\n  overflow: visible; /* 2 */\r\n}\r\n\r\n/**\r\n * 1. Correct the inheritance and scaling of font size in all browsers.\r\n * 2. Correct the odd `em` font sizing in all browsers.\r\n */\r\n\r\npre {\r\n  font-family: monospace, monospace; /* 1 */\r\n  font-size: 1em; /* 2 */\r\n}\r\n\r\n/* Text-level semantics\r\n   ========================================================================== */\r\n\r\n/**\r\n * Remove the gray background on active links in IE 10.\r\n */\r\n\r\na {\r\n  background-color: transparent;\r\n}\r\n\r\n/**\r\n * 1. Remove the bottom border in Chrome 57-\r\n * 2. Add the correct text decoration in Chrome, Edge, IE, Opera, and Safari.\r\n */\r\n\r\nabbr[title] {\r\n  border-bottom: none; /* 1 */\r\n  text-decoration: underline; /* 2 */\r\n  text-decoration: underline dotted; /* 2 */\r\n}\r\n\r\n/**\r\n * Add the correct font weight in Chrome, Edge, and Safari.\r\n */\r\n\r\nb,\r\nstrong {\r\n  font-weight: bolder;\r\n}\r\n\r\n/**\r\n * 1. Correct the inheritance and scaling of font size in all browsers.\r\n * 2. Correct the odd `em` font sizing in all browsers.\r\n */\r\n\r\ncode,\r\nkbd,\r\nsamp {\r\n  font-family: monospace, monospace; /* 1 */\r\n  font-size: 1em; /* 2 */\r\n}\r\n\r\n/**\r\n * Add the correct font size in all browsers.\r\n */\r\n\r\nsmall {\r\n  font-size: 80%;\r\n}\r\n\r\n/**\r\n * Prevent `sub` and `sup` elements from affecting the line height in\r\n * all browsers.\r\n */\r\n\r\nsub,\r\nsup {\r\n  font-size: 75%;\r\n  line-height: 0;\r\n  position: relative;\r\n  vertical-align: baseline;\r\n}\r\n\r\nsub {\r\n  bottom: -0.25em;\r\n}\r\n\r\nsup {\r\n  top: -0.5em;\r\n}\r\n\r\n/* Embedded content\r\n   ========================================================================== */\r\n\r\n/**\r\n * Remove the border on images inside links in IE 10.\r\n */\r\n\r\nimg {\r\n  border-style: none;\r\n}\r\n\r\n/* Forms\r\n   ========================================================================== */\r\n\r\n/**\r\n * 1. Change the font styles in all browsers.\r\n * 2. Remove the margin in Firefox and Safari.\r\n */\r\n\r\nbutton,\r\ninput,\r\noptgroup,\r\nselect,\r\ntextarea {\r\n  font-family: inherit; /* 1 */\r\n  font-size: 100%; /* 1 */\r\n  line-height: 1.15; /* 1 */\r\n  margin: 0; /* 2 */\r\n}\r\n\r\n/**\r\n * Show the overflow in IE.\r\n * 1. Show the overflow in Edge.\r\n */\r\n\r\nbutton,\r\ninput { /* 1 */\r\n  overflow: visible;\r\n}\r\n\r\n/**\r\n * Remove the inheritance of text transform in Edge, Firefox, and IE.\r\n * 1. Remove the inheritance of text transform in Firefox.\r\n */\r\n\r\nbutton,\r\nselect { /* 1 */\r\n  text-transform: none;\r\n}\r\n\r\n/**\r\n * Correct the inability to style clickable types in iOS and Safari.\r\n */\r\n\r\nbutton,\r\n[type=\"button\"],\r\n[type=\"reset\"],\r\n[type=\"submit\"] {\r\n  -webkit-appearance: button;\r\n}\r\n\r\n/**\r\n * Remove the inner border and padding in Firefox.\r\n */\r\n\r\nbutton::-moz-focus-inner,\r\n[type=\"button\"]::-moz-focus-inner,\r\n[type=\"reset\"]::-moz-focus-inner,\r\n[type=\"submit\"]::-moz-focus-inner {\r\n  border-style: none;\r\n  padding: 0;\r\n}\r\n\r\n/**\r\n * Restore the focus styles unset by the previous rule.\r\n */\r\n\r\nbutton:-moz-focusring,\r\n[type=\"button\"]:-moz-focusring,\r\n[type=\"reset\"]:-moz-focusring,\r\n[type=\"submit\"]:-moz-focusring {\r\n  outline: 1px dotted ButtonText;\r\n}\r\n\r\n/**\r\n * Correct the padding in Firefox.\r\n */\r\n\r\nfieldset {\r\n  padding: 0.35em 0.75em 0.625em;\r\n}\r\n\r\n/**\r\n * 1. Correct the text wrapping in Edge and IE.\r\n * 2. Correct the color inheritance from `fieldset` elements in IE.\r\n * 3. Remove the padding so developers are not caught out when they zero out\r\n *    `fieldset` elements in all browsers.\r\n */\r\n\r\nlegend {\r\n  box-sizing: border-box; /* 1 */\r\n  color: inherit; /* 2 */\r\n  display: table; /* 1 */\r\n  max-width: 100%; /* 1 */\r\n  padding: 0; /* 3 */\r\n  white-space: normal; /* 1 */\r\n}\r\n\r\n/**\r\n * Add the correct vertical alignment in Chrome, Firefox, and Opera.\r\n */\r\n\r\nprogress {\r\n  vertical-align: baseline;\r\n}\r\n\r\n/**\r\n * Remove the default vertical scrollbar in IE 10+.\r\n */\r\n\r\ntextarea {\r\n  overflow: auto;\r\n}\r\n\r\n/**\r\n * 1. Add the correct box sizing in IE 10.\r\n * 2. Remove the padding in IE 10.\r\n */\r\n\r\n[type=\"checkbox\"],\r\n[type=\"radio\"] {\r\n  box-sizing: border-box; /* 1 */\r\n  padding: 0; /* 2 */\r\n}\r\n\r\n/**\r\n * Correct the cursor style of increment and decrement buttons in Chrome.\r\n */\r\n\r\n[type=\"number\"]::-webkit-inner-spin-button,\r\n[type=\"number\"]::-webkit-outer-spin-button {\r\n  height: auto;\r\n}\r\n\r\n/**\r\n * 1. Correct the odd appearance in Chrome and Safari.\r\n * 2. Correct the outline style in Safari.\r\n */\r\n\r\n[type=\"search\"] {\r\n  -webkit-appearance: textfield; /* 1 */\r\n  outline-offset: -2px; /* 2 */\r\n}\r\n\r\n/**\r\n * Remove the inner padding in Chrome and Safari on macOS.\r\n */\r\n\r\n[type=\"search\"]::-webkit-search-decoration {\r\n  -webkit-appearance: none;\r\n}\r\n\r\n/**\r\n * 1. Correct the inability to style clickable types in iOS and Safari.\r\n * 2. Change font properties to `inherit` in Safari.\r\n */\r\n\r\n::-webkit-file-upload-button {\r\n  -webkit-appearance: button; /* 1 */\r\n  font: inherit; /* 2 */\r\n}\r\n\r\n/* Interactive\r\n   ========================================================================== */\r\n\r\n/*\r\n * Add the correct display in Edge, IE 10+, and Firefox.\r\n */\r\n\r\ndetails {\r\n  display: block;\r\n}\r\n\r\n/*\r\n * Add the correct display in all browsers.\r\n */\r\n\r\nsummary {\r\n  display: list-item;\r\n}\r\n\r\n/* Misc\r\n   ========================================================================== */\r\n\r\n/**\r\n * Add the correct display in IE 10+.\r\n */\r\n\r\ntemplate {\r\n  display: none;\r\n}\r\n\r\n/**\r\n * Add the correct display in IE 10.\r\n */\r\n\r\n[hidden] {\r\n  display: none;\r\n}\r\n"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./assets/styles/reset.css":
/*!***********************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./assets/styles/reset.css ***!
  \***********************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/sourceMaps.js */ "./node_modules/css-loader/dist/runtime/sourceMaps.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, "/* http://meyerweb.com/eric/tools/css/reset/\r\n   v2.0 | 20110126\r\n   License: none (public domain)\r\n*/\r\n\r\nhtml, body, div, span, applet, object, iframe,\r\nh1, h2, h3, h4, h5, h6, p, blockquote, pre,\r\na, abbr, acronym, address, big, cite, code,\r\ndel, dfn, em, img, ins, kbd, q, s, samp,\r\nsmall, strike, strong, sub, sup, tt, var,\r\nb, u, i, center,\r\ndl, dt, dd, ol, ul, li,\r\nfieldset, form, label, legend,\r\ntable, caption, tbody, tfoot, thead, tr, th, td,\r\narticle, aside, canvas, details, embed,\r\nfigure, figcaption, footer, header, hgroup,\r\nmenu, nav, output, ruby, section, summary,\r\ntime, mark, audio, video {\r\n\tmargin: 0;\r\n\tpadding: 0;\r\n\tborder: 0;\r\n\tfont-size: 100%;\r\n\tfont: inherit;\r\n\tvertical-align: baseline;\r\n}\r\n/* HTML5 display-role reset for older browsers */\r\narticle, aside, details, figcaption, figure,\r\nfooter, header, hgroup, menu, nav, section {\r\n\tdisplay: block;\r\n}\r\nbody {\r\n\tline-height: 1;\r\n}\r\nol, ul {\r\n\tlist-style: none;\r\n}\r\nblockquote, q {\r\n\tquotes: none;\r\n}\r\nblockquote:before, blockquote:after,\r\nq:before, q:after {\r\n\tcontent: '';\r\n\tcontent: none;\r\n}\r\ntable {\r\n\tborder-collapse: collapse;\r\n\tborder-spacing: 0;\r\n}", "",{"version":3,"sources":["webpack://./assets/styles/reset.css"],"names":[],"mappings":"AAAA;;;CAGC;;AAED;;;;;;;;;;;;;CAaC,SAAS;CACT,UAAU;CACV,SAAS;CACT,eAAe;CACf,aAAa;CACb,wBAAwB;AACzB;AACA,gDAAgD;AAChD;;CAEC,cAAc;AACf;AACA;CACC,cAAc;AACf;AACA;CACC,gBAAgB;AACjB;AACA;CACC,YAAY;AACb;AACA;;CAEC,WAAW;CACX,aAAa;AACd;AACA;CACC,yBAAyB;CACzB,iBAAiB;AAClB","sourcesContent":["/* http://meyerweb.com/eric/tools/css/reset/\r\n   v2.0 | 20110126\r\n   License: none (public domain)\r\n*/\r\n\r\nhtml, body, div, span, applet, object, iframe,\r\nh1, h2, h3, h4, h5, h6, p, blockquote, pre,\r\na, abbr, acronym, address, big, cite, code,\r\ndel, dfn, em, img, ins, kbd, q, s, samp,\r\nsmall, strike, strong, sub, sup, tt, var,\r\nb, u, i, center,\r\ndl, dt, dd, ol, ul, li,\r\nfieldset, form, label, legend,\r\ntable, caption, tbody, tfoot, thead, tr, th, td,\r\narticle, aside, canvas, details, embed,\r\nfigure, figcaption, footer, header, hgroup,\r\nmenu, nav, output, ruby, section, summary,\r\ntime, mark, audio, video {\r\n\tmargin: 0;\r\n\tpadding: 0;\r\n\tborder: 0;\r\n\tfont-size: 100%;\r\n\tfont: inherit;\r\n\tvertical-align: baseline;\r\n}\r\n/* HTML5 display-role reset for older browsers */\r\narticle, aside, details, figcaption, figure,\r\nfooter, header, hgroup, menu, nav, section {\r\n\tdisplay: block;\r\n}\r\nbody {\r\n\tline-height: 1;\r\n}\r\nol, ul {\r\n\tlist-style: none;\r\n}\r\nblockquote, q {\r\n\tquotes: none;\r\n}\r\nblockquote:before, blockquote:after,\r\nq:before, q:after {\r\n\tcontent: '';\r\n\tcontent: none;\r\n}\r\ntable {\r\n\tborder-collapse: collapse;\r\n\tborder-spacing: 0;\r\n}"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./assets/styles/style.css":
/*!***********************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./assets/styles/style.css ***!
  \***********************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/sourceMaps.js */ "./node_modules/css-loader/dist/runtime/sourceMaps.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/getUrl.js */ "./node_modules/css-loader/dist/runtime/getUrl.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2__);
// Imports



var ___CSS_LOADER_URL_IMPORT_0___ = new URL(/* asset import */ __webpack_require__(/*! ../fonts/gloria-hallelujah-v17-latin-regular.woff2 */ "./assets/fonts/gloria-hallelujah-v17-latin-regular.woff2"), __webpack_require__.b);
var ___CSS_LOADER_URL_IMPORT_1___ = new URL(/* asset import */ __webpack_require__(/*! ../fonts/gloria-hallelujah-v17-latin-regular.woff */ "./assets/fonts/gloria-hallelujah-v17-latin-regular.woff"), __webpack_require__.b);
var ___CSS_LOADER_URL_IMPORT_2___ = new URL(/* asset import */ __webpack_require__(/*! ../fonts/neucha-v17-latin-regular.woff2 */ "./assets/fonts/neucha-v17-latin-regular.woff2"), __webpack_require__.b);
var ___CSS_LOADER_URL_IMPORT_3___ = new URL(/* asset import */ __webpack_require__(/*! ../fonts/neucha-v17-latin-regular.woff */ "./assets/fonts/neucha-v17-latin-regular.woff"), __webpack_require__.b);
var ___CSS_LOADER_URL_IMPORT_4___ = new URL(/* asset import */ __webpack_require__(/*! ../img/app/watercolor-blue-bg-left.jpg */ "./assets/img/app/watercolor-blue-bg-left.jpg"), __webpack_require__.b);
var ___CSS_LOADER_URL_IMPORT_5___ = new URL(/* asset import */ __webpack_require__(/*! ../img/app/watercolor-blue-bg-right.jpg */ "./assets/img/app/watercolor-blue-bg-right.jpg"), __webpack_require__.b);
var ___CSS_LOADER_URL_IMPORT_6___ = new URL(/* asset import */ __webpack_require__(/*! ../img/app/watercolor-waves-01-up.png */ "./assets/img/app/watercolor-waves-01-up.png"), __webpack_require__.b);
var ___CSS_LOADER_URL_IMPORT_7___ = new URL(/* asset import */ __webpack_require__(/*! ../img/app/watercolor-waves-01-down.png */ "./assets/img/app/watercolor-waves-01-down.png"), __webpack_require__.b);
var ___CSS_LOADER_URL_IMPORT_8___ = new URL(/* asset import */ __webpack_require__(/*! ../img/app/watercolor-menu-button-01.png */ "./assets/img/app/watercolor-menu-button-01.png"), __webpack_require__.b);
var ___CSS_LOADER_URL_IMPORT_9___ = new URL(/* asset import */ __webpack_require__(/*! ../img/app/watercolor-red-cross-button-01.jpg */ "./assets/img/app/watercolor-red-cross-button-01.jpg"), __webpack_require__.b);
var ___CSS_LOADER_URL_IMPORT_10___ = new URL(/* asset import */ __webpack_require__(/*! ../img/app/watercolor-button-start-01.png */ "./assets/img/app/watercolor-button-start-01.png"), __webpack_require__.b);
var ___CSS_LOADER_URL_IMPORT_11___ = new URL(/* asset import */ __webpack_require__(/*! ../img/app/watercolor-button-repeat-01.png */ "./assets/img/app/watercolor-button-repeat-01.png"), __webpack_require__.b);
var ___CSS_LOADER_URL_IMPORT_12___ = new URL(/* asset import */ __webpack_require__(/*! ../img/app/watercolor-kytes-01.jpg */ "./assets/img/app/watercolor-kytes-01.jpg"), __webpack_require__.b);
var ___CSS_LOADER_URL_IMPORT_13___ = new URL(/* asset import */ __webpack_require__(/*! ../img/app/watercolor-buterfly-01.jpg */ "./assets/img/app/watercolor-buterfly-01.jpg"), __webpack_require__.b);
var ___CSS_LOADER_URL_IMPORT_14___ = new URL(/* asset import */ __webpack_require__(/*! ../img/app/watercolor-line-02-right.png */ "./assets/img/app/watercolor-line-02-right.png"), __webpack_require__.b);
var ___CSS_LOADER_URL_IMPORT_15___ = new URL(/* asset import */ __webpack_require__(/*! ../img/app/watercolor-line-02.png */ "./assets/img/app/watercolor-line-02.png"), __webpack_require__.b);
var ___CSS_LOADER_URL_IMPORT_16___ = new URL(/* asset import */ __webpack_require__(/*! ../img/app/watercolor-line-01.png */ "./assets/img/app/watercolor-line-01.png"), __webpack_require__.b);
var ___CSS_LOADER_URL_IMPORT_17___ = new URL(/* asset import */ __webpack_require__(/*! ../img/app/watercolor-blue-card-bg-01.jpg */ "./assets/img/app/watercolor-blue-card-bg-01.jpg"), __webpack_require__.b);
var ___CSS_LOADER_URL_IMPORT_18___ = new URL(/* asset import */ __webpack_require__(/*! ../img/app/watercolor-flip-button-01.png */ "./assets/img/app/watercolor-flip-button-01.png"), __webpack_require__.b);
var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
var ___CSS_LOADER_URL_REPLACEMENT_0___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(___CSS_LOADER_URL_IMPORT_0___);
var ___CSS_LOADER_URL_REPLACEMENT_1___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(___CSS_LOADER_URL_IMPORT_1___);
var ___CSS_LOADER_URL_REPLACEMENT_2___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(___CSS_LOADER_URL_IMPORT_2___);
var ___CSS_LOADER_URL_REPLACEMENT_3___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(___CSS_LOADER_URL_IMPORT_3___);
var ___CSS_LOADER_URL_REPLACEMENT_4___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(___CSS_LOADER_URL_IMPORT_4___);
var ___CSS_LOADER_URL_REPLACEMENT_5___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(___CSS_LOADER_URL_IMPORT_5___);
var ___CSS_LOADER_URL_REPLACEMENT_6___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(___CSS_LOADER_URL_IMPORT_6___);
var ___CSS_LOADER_URL_REPLACEMENT_7___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(___CSS_LOADER_URL_IMPORT_7___);
var ___CSS_LOADER_URL_REPLACEMENT_8___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(___CSS_LOADER_URL_IMPORT_8___);
var ___CSS_LOADER_URL_REPLACEMENT_9___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(___CSS_LOADER_URL_IMPORT_9___);
var ___CSS_LOADER_URL_REPLACEMENT_10___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(___CSS_LOADER_URL_IMPORT_10___);
var ___CSS_LOADER_URL_REPLACEMENT_11___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(___CSS_LOADER_URL_IMPORT_11___);
var ___CSS_LOADER_URL_REPLACEMENT_12___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(___CSS_LOADER_URL_IMPORT_12___);
var ___CSS_LOADER_URL_REPLACEMENT_13___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(___CSS_LOADER_URL_IMPORT_13___);
var ___CSS_LOADER_URL_REPLACEMENT_14___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(___CSS_LOADER_URL_IMPORT_14___);
var ___CSS_LOADER_URL_REPLACEMENT_15___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(___CSS_LOADER_URL_IMPORT_15___);
var ___CSS_LOADER_URL_REPLACEMENT_16___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(___CSS_LOADER_URL_IMPORT_16___);
var ___CSS_LOADER_URL_REPLACEMENT_17___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(___CSS_LOADER_URL_IMPORT_17___);
var ___CSS_LOADER_URL_REPLACEMENT_18___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(___CSS_LOADER_URL_IMPORT_18___);
// Module
___CSS_LOADER_EXPORT___.push([module.id, "/* gloria-hallelujah-regular - latin */\r\n@font-face {\r\n    font-family: 'Gloria Hallelujah';\r\n    font-style: normal;\r\n    font-weight: 400;\r\n    src: local(''),\r\n         url(" + ___CSS_LOADER_URL_REPLACEMENT_0___ + ") format('woff2'), /* Chrome 26+, Opera 23+, Firefox 39+ */\r\n         url(" + ___CSS_LOADER_URL_REPLACEMENT_1___ + ") format('woff'); /* Chrome 6+, Firefox 3.6+, IE 9+, Safari 5.1+ */\r\n  }\r\n\r\n/* neucha-regular - latin */\r\n@font-face {\r\n    font-family: 'Neucha';\r\n    font-style: normal;\r\n    font-weight: 400;\r\n    src: local(''),\r\n         url(" + ___CSS_LOADER_URL_REPLACEMENT_2___ + ") format('woff2'), /* Chrome 26+, Opera 23+, Firefox 39+ */\r\n         url(" + ___CSS_LOADER_URL_REPLACEMENT_3___ + ") format('woff'); /* Chrome 6+, Firefox 3.6+, IE 9+, Safari 5.1+ */\r\n  }\r\n\r\n/* border-box model for all elements */\r\n\r\nhtml {\r\n    box-sizing: border-box;\r\n}\r\n\r\n*, *::before, *::after {\r\n    box-sizing: inherit;\r\n}\r\n\r\n/* --- Page color styling --- */\r\n\r\n:root {\r\n    --color-bg-main-1: #ffffff;\r\n    --color-bg-main-2: #dbf5f8;\r\n    --color-bg-main-3: #e9f5ff;\r\n    --color-bg-main-4: #f0c2cd63;\r\n    --color-font-1: #3070a6;\r\n}\r\n\r\n/* ---------------------------------- */\r\n\r\nbody {\r\n    width: 100%;\r\n    display: flex;\r\n    flex-direction: column;\r\n    align-items: center;\r\n    background-color: var(--color-bg-main-1);\r\n    background-image: url(" + ___CSS_LOADER_URL_REPLACEMENT_4___ + "), url(" + ___CSS_LOADER_URL_REPLACEMENT_5___ + ");\r\n    background-attachment: fixed;\r\n    background-position: left top, right bottom;\r\n    background-repeat: repeat-y;\r\n    background-size: 15% auto;\r\n    font-family: 'Neucha', cursive;\r\n    color: var(--color-font-1);\r\n}\r\n\r\nbody.opened-menu {\r\n    overflow-y: hidden;\r\n}\r\n\r\n.inactive {\r\n    visibility: hidden;\r\n    position: fixed;\r\n    top: 0;\r\n}\r\n\r\n.graphic, img {\r\n    width: 100%;\r\n    height: auto;\r\n    padding: 0;\r\n    margin: 0;\r\n}\r\n\r\n.container-centered {\r\n    max-width: 1440px;\r\n    min-width: 1440px;\r\n    margin: 0 auto;\r\n}\r\n\r\nheader.container-centered {\r\n    display: flex;\r\n    flex-direction: column;\r\n    justify-content: center;\r\n    align-items: center;\r\n    position: -webkit-sticky;\r\n    position: sticky;\r\n    top: 0;\r\n    z-index: 8;\r\n    margin-top: 0;\r\n    transition: margin 1s;\r\n}\r\n\r\nheader.main-page {\r\n    margin-top: 380px;\r\n}\r\n\r\nheader .header-image {\r\n    width: 70%;\r\n    position: absolute;\r\n    top: -376px;\r\n}\r\n\r\n.main-controls {\r\n    width: 80%;\r\n    min-height: 150px;\r\n    display: flex;\r\n    justify-content: space-around;\r\n    align-items: center;\r\n    border-radius: 35px;\r\n    background-color: white;\r\n    background-image: url(" + ___CSS_LOADER_URL_REPLACEMENT_6___ + "), url(" + ___CSS_LOADER_URL_REPLACEMENT_7___ + ");\r\n    background-position: 100% 0, 0 100%;\r\n    background-repeat: repeat-x;\r\n    background-size: auto 28%;\r\n    z-index: 5;\r\n}\r\n\r\n.game-controls {\r\n    width: 100vw;\r\n    border-radius: 10px;\r\n    min-height: 100px;\r\n    padding: 10px 0;\r\n    display: flex;\r\n    justify-content: space-around;\r\n    align-items: center;\r\n    background-color: white;\r\n    border-radius: 0;\r\n    background-image: url(" + ___CSS_LOADER_URL_REPLACEMENT_4___ + "), url(" + ___CSS_LOADER_URL_REPLACEMENT_5___ + ");\r\n    background-attachment: fixed;\r\n    background-position: left top, right bottom;\r\n    background-repeat: repeat-y;\r\n    background-size: 15% auto;\r\n}\r\n\r\nh1 {\r\n    text-align: center;\r\n    font-family: 'Gloria Hallelujah', cursive;\r\n}\r\n\r\n.button:hover {\r\n    cursor: pointer;\r\n}\r\n\r\n.menu-button {\r\n    z-index: 10;\r\n    width: 36px;\r\n    height: 36px;\r\n    background-image: url(" + ___CSS_LOADER_URL_REPLACEMENT_8___ + ");\r\n    background-size: cover;\r\n    transition: transform 1s;\r\n}\r\n\r\n.menu-button.opened-menu {\r\n    transform: rotate(180deg);\r\n}\r\n\r\n.button.close-menu {\r\n    position: absolute;\r\n    top: 20px;\r\n    right: 20px;\r\n    width: 50px;\r\n    height: 50px;\r\n    border-radius: 50%;\r\n    background-image: url(" + ___CSS_LOADER_URL_REPLACEMENT_9___ + ");\r\n    background-size: cover;\r\n\r\n}\r\n\r\n.switch {\r\n    width: 110px;\r\n    background-color: #faf8fd;\r\n    display: flex;\r\n    justify-content: space-between;\r\n    border-radius: 60px;\r\n    position: relative;\r\n    border: 2px var(--color-font-1) solid;\r\n}\r\n\r\n.switch-rail {\r\n    position: absolute;\r\n    left: 0;\r\n    width: 100%;\r\n    height: 100%;\r\n    border-radius: inherit;\r\n}\r\n\r\n.switch-roller {\r\n    width: 55px;\r\n    height: 100%;\r\n    position: absolute;\r\n    left: 0;\r\n    border-radius: inherit;\r\n    background-color: #3271a74d;\r\n    z-index: 10;\r\n    transition: left 0.7s;\r\n    border: 1px var(--color-font-1) solid;\r\n}\r\n\r\n.switch.switch-on .switch-roller {\r\n    left: 53px;\r\n}\r\n\r\n.switch-trigger {\r\n    margin: 0 10px;\r\n    height: 40px;\r\n    z-index: 9;\r\n    padding: 10px 0;\r\n    text-align: center;\r\n    font-size: 20px;\r\n}\r\n\r\n.game-button {\r\n    width: 100px;\r\n    height: 100px;\r\n    border-radius: 50px;\r\n    background-position: center;\r\n    background-repeat: no-repeat;\r\n    background-size: cover;\r\n}\r\n\r\n.game-button.start-button {\r\n    background-color: #039227;\r\n    background-image: url(" + ___CSS_LOADER_URL_REPLACEMENT_10___ + ");\r\n}\r\n\r\n.game-button.repeat-button {\r\n    background-color: #394cf5;\r\n    background-image: url(" + ___CSS_LOADER_URL_REPLACEMENT_11___ + ");\r\n}\r\n\r\n.game-progress {\r\n    width: 220px;\r\n    display: flex;\r\n    justify-content: space-around;\r\n    align-items: center;\r\n}\r\n\r\n.game-indicator {\r\n    width: 150px;\r\n    height: 40px;\r\n    border-radius: 18px;\r\n    display: flex;\r\n    justify-content: flex-start;\r\n    align-items: center;\r\n    background-color: #faf8fd;\r\n    border: 1px var(--color-font-1) solid;\r\n}\r\n\r\n.star {\r\n    width: 30px;\r\n}\r\n\r\n.game-score {\r\n    text-align: center;\r\n}\r\n\r\n.game-score .correct {\r\n    color: #008000;\r\n}\r\n\r\n.game-score .wrong {\r\n    color: #ff0000;\r\n}\r\n\r\nnav {\r\n    left: -320px;\r\n    position: fixed;\r\n    top: 0;\r\n    width: 320px;\r\n    height: 100%;\r\n    overflow-y: auto;\r\n    background-color: var(--color-bg-main-1);\r\n    z-index: 11;\r\n    background-image: url(" + ___CSS_LOADER_URL_REPLACEMENT_12___ + "), url(" + ___CSS_LOADER_URL_REPLACEMENT_13___ + ");\r\n    background-size: 450px auto, 179px auto;\r\n    background-position: 0px 0px, 122px 100%;\r\n    background-repeat: no-repeat, no-repeat;\r\n    box-shadow: none;\r\n    transition-property: left, background-position, box-shadow;\r\n    transition-duration: 1.2s,5s;\r\n}\r\n\r\nnav.opened-menu {\r\n    left: 0;\r\n    box-shadow: 0px 0 20px 1px #94ca68, 0px 0 80px 20px #f0e080, 50px 0 250px 50px var(--color-font-1);\r\n}\r\n\r\n.menu-list {\r\n    height: 500px;\r\n    margin-top: calc(50vh - 250px);\r\n}\r\n\r\n.menu-list li {\r\n    padding: 10px 0;\r\n    text-align: center;\r\n    font-size: 2em;\r\n    background-color: var(--color-bg-main-1);\r\n}\r\n\r\n.menu-list li:hover {\r\n    background-color: var(--color-bg-main-2);\r\n    background-image: url(" + ___CSS_LOADER_URL_REPLACEMENT_14___ + ");\r\n    background-size: 100% 100%;\r\n    color: white;\r\n    padding: 15px 0;\r\n}\r\n\r\n.menu-list li:nth-child(even):hover {\r\n    background-color: var(--color-bg-main-2);\r\n    background-image: url(" + ___CSS_LOADER_URL_REPLACEMENT_15___ + ");\r\n}\r\n\r\n.menu-list li.active-page, .menu-list li.active-page:hover {\r\n    background-color: var(--color-bg-main-2);\r\n    background-image: url(" + ___CSS_LOADER_URL_REPLACEMENT_16___ + ");\r\n    background-size: 100% 100%;\r\n    color: white;\r\n    padding: 15px 0;\r\n}\r\n\r\nmain.container-centered {\r\n    margin-top: 20px;\r\n    padding-bottom: 35px;\r\n}\r\n\r\n.content-wrapper {\r\n    width: 100%;\r\n    margin: auto;\r\n    display: flex;\r\n    flex-direction: column;\r\n    align-items: center;\r\n}\r\n\r\nh2.topic-name {\r\n    font-size: 34px;\r\n    margin: 30px 0;\r\n}\r\n\r\n.card-container {\r\n    display: flex;\r\n    justify-content: space-around;\r\n    align-items: center;\r\n    flex-wrap: wrap;\r\n    width: 78%;\r\n    margin: auto;\r\n}\r\n\r\n.card {\r\n    margin: 15px;\r\n    position: relative;\r\n}\r\n\r\n.card-main-page {\r\n    width: 256px;\r\n    height: 240px;\r\n    margin-top: 20px;\r\n    padding: 45px;\r\n    border-radius: 50%;\r\n    background-color: #ffffff;\r\n    background-image: url(" + ___CSS_LOADER_URL_REPLACEMENT_17___ + ");\r\n    background-size: 100% 83%;\r\n    background-repeat: no-repeat;\r\n}\r\n\r\n.card-topic {\r\n    width: 226px;\r\n    height: 270px;\r\n}\r\n\r\n.card.disabled {\r\n    filter: blur(3px);\r\n}\r\n\r\n.card-content {\r\n    width: 100%;\r\n    height: 100%;\r\n    position: relative;\r\n}\r\n\r\n.card-topic .card-content {\r\n    border: 2px var(--color-font-1) solid;\r\n    box-shadow: 0 0 15px 1px var(--color-font-1);\r\n}\r\n\r\n.card-topic .card-content:hover {\r\n    box-shadow: 0 0 15px 3px var(--color-font-1);\r\n}\r\n\r\n.card.disabled .card-content {\r\n    box-shadow: none;\r\n}\r\n\r\n.card-main-page .card-content, .card-main-page img {\r\n    border-radius: 50px;\r\n}\r\n\r\n.card-content, .card-content img {\r\n    transition: border-radius 1s;\r\n}\r\n\r\n.card-topic .card-content {\r\n    border-radius: 50px 0;\r\n}\r\n\r\n.card-topic.flipped .card-content {\r\n    border-radius: 0 50px;\r\n}\r\n\r\n.card-topic img {\r\n    border-radius: 50px 0 0 0;\r\n}\r\n\r\n.card-topic.flipped img {\r\n    border-radius: 0 50px 0 0;\r\n}\r\n\r\n.card p {\r\n    margin-top: 15px;\r\n    font-size: 32px;\r\n    text-align: center;\r\n}\r\n\r\n.card-main-page p {\r\n    position: relative;\r\n    top: 32px;\r\n    border-radius: 20px;\r\n    font-size: 32px;\r\n}\r\n\r\n.card-flip-button {\r\n    width: 35px;\r\n    height: 35px;\r\n    position: absolute;\r\n    bottom: 20px;\r\n    right: 20px;\r\n    border-radius: 50%;\r\n    background-image: url(" + ___CSS_LOADER_URL_REPLACEMENT_18___ + ");\r\n    background-size: cover;\r\n}\r\n\r\n.card-flip-button:hover {\r\n    animation-name: rotation;\r\n    animation-duration: 2s;\r\n    animation-timing-function: linear;\r\n    animation-iteration-count: infinite;\r\n}\r\n\r\n.flipped .card-content {\r\n    animation-name: flip-card;\r\n    animation-duration: 1s;\r\n}\r\n\r\n.unflipped .card-content {\r\n    animation-name: unflip-card;\r\n    animation-duration: 1s;\r\n}\r\n\r\n.final-clip {\r\n    display: flex;\r\n    flex-direction: column;\r\n    width: 320px;\r\n    margin: auto;\r\n    justify-content: center;\r\n    align-items: center;\r\n    padding: 50px 0;\r\n}\r\n\r\n.final-clip p {\r\n    color: red;\r\n    font-size: 36px;\r\n    margin-top: 30px;\r\n}\r\n\r\n.stat-container {\r\n    width: 74%;\r\n    display: flex;\r\n    flex-direction: column;\r\n    justify-content: center;\r\n    align-items: center;\r\n    font-size: 2em;\r\n}\r\n\r\n.table-wrapper {\r\n    width: 100%;\r\n    overflow-x: auto;\r\n}\r\n\r\n.stat-table {\r\n    width: 100%;\r\n    border-collapse: collapse;\r\n    font-size: 0.5em;\r\n\r\n}\r\n\r\nthead {\r\n    background-color: aliceblue;\r\n}\r\n\r\nth {\r\n    height: 30px;\r\n}\r\n\r\ntr {\r\n    height: 25px;\r\n    background-color: azure;\r\n}\r\n\r\nth, td {\r\n    padding: 0 4px;\r\n    border: 1px solid black;\r\n    text-align: center;\r\n    vertical-align: middle;\r\n}\r\n\r\ntr:nth-child(even) {\r\n    background-color: #fdfdde;\r\n}\r\n\r\n.sorted-down, .sorted-up {\r\n    background-color: #d0fa81;\r\n}\r\n\r\n.sort-icon {\r\n    width: 16px;\r\n    height: auto;\r\n    position: relative;\r\n    left: 10px;\r\n    top: 2px;\r\n}\r\n\r\n.stat-buttons-wrapper {\r\n    width: 100%;\r\n    display: flex;\r\n    justify-content: space-around;\r\n    flex-wrap: wrap;\r\n}\r\n\r\n.stat-button {\r\n    width: 300px;\r\n    height: 70px;\r\n    margin: 20px 0;\r\n    padding: 15px;\r\n    border-radius: 50px;\r\n    border: 1px solid rgb(0, 0, 0);\r\n    color: azure;\r\n    text-align: center;\r\n}\r\n\r\n.button.train-diff {\r\n    background-color: rgb(7, 160, 96);\r\n}\r\n\r\n.button.reset-stat {\r\n    background-color: rgb(189, 45, 45);\r\n}\r\n\r\n.nothing-diff {\r\n    width: 100%;\r\n}\r\n\r\n.nothing-diff p {\r\n    position: absolute;\r\n    top: 20%;\r\n}\r\n\r\n.disabled:hover {\r\n    cursor:auto;\r\n}\r\n\r\n/* --- Animation --- */\r\n\r\n@keyframes flip-card {\r\n    0% {}\r\n    50% {transform: rotateY(89deg)}\r\n}\r\n\r\n@keyframes unflip-card {\r\n    0% {}\r\n    50% {transform: rotateY(89deg)}\r\n}\r\n\r\n@keyframes rotation {\r\n    0% {}\r\n    100% {transform: rotate(360deg)}\r\n}\r\n\r\n/* --- RESPONSIVE LAYOUTS --- */\r\n\r\n@media (max-width: 1439px) {\r\n    .container-centered {\r\n        min-width: calc(1440vw*100/1440 - 20px);\r\n    }\r\n\r\n    header.main-page {\r\n        margin-top:  calc(380vw*100/1440);\r\n    }\r\n\r\n    header .graphic {\r\n        top: calc(-370vw*100/1440 + 5px);\r\n    }\r\n}\r\n\r\n@media (max-width: 559px) {\r\n    .main-controls {\r\n        width: 100vw;\r\n        border-radius: 0;\r\n    }\r\n\r\n    .game-controls {\r\n        justify-content: center;\r\n    }\r\n\r\n    .game-button {\r\n        width: 70px;\r\n        height: 70px;\r\n    }\r\n\r\n    h1 {\r\n        max-width: 75px;\r\n        font-size: 24px;\r\n    }\r\n\r\n    h2.topic-name {\r\n        font-size: 32px;\r\n        margin: 10px 0;\r\n    }\r\n\r\n    .card-main-page {\r\n        width: 230px;\r\n        height: 220px;\r\n        margin: 10px 0;\r\n    }\r\n\r\n    .card-main-page p {\r\n        font-size: 28px;\r\n    }\r\n\r\n    .stat-buttons-wrapper {\r\n        width: 78%;\r\n    }\r\n\r\n    .stat-button {\r\n        width: 190px;\r\n        height: 52px;\r\n        font-size: 21px;\r\n        margin: 5px 0;\r\n    }\r\n\r\n    main.container-centered {\r\n        width: 100vw;\r\n    }\r\n\r\n    .stat-container {\r\n        width: 100%;\r\n    }\r\n\r\n    .table-wrapper {\r\n        width: 72%;\r\n    }\r\n}\r\n\r\n@media (max-height: 970px) {\r\n    .menu-list {\r\n        margin-top: 235px;\r\n    }\r\n}", "",{"version":3,"sources":["webpack://./assets/styles/style.css"],"names":[],"mappings":"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","sourcesContent":["/* gloria-hallelujah-regular - latin */\r\n@font-face {\r\n    font-family: 'Gloria Hallelujah';\r\n    font-style: normal;\r\n    font-weight: 400;\r\n    src: local(''),\r\n         url('../fonts/gloria-hallelujah-v17-latin-regular.woff2') format('woff2'), /* Chrome 26+, Opera 23+, Firefox 39+ */\r\n         url('../fonts/gloria-hallelujah-v17-latin-regular.woff') format('woff'); /* Chrome 6+, Firefox 3.6+, IE 9+, Safari 5.1+ */\r\n  }\r\n\r\n/* neucha-regular - latin */\r\n@font-face {\r\n    font-family: 'Neucha';\r\n    font-style: normal;\r\n    font-weight: 400;\r\n    src: local(''),\r\n         url('../fonts/neucha-v17-latin-regular.woff2') format('woff2'), /* Chrome 26+, Opera 23+, Firefox 39+ */\r\n         url('../fonts/neucha-v17-latin-regular.woff') format('woff'); /* Chrome 6+, Firefox 3.6+, IE 9+, Safari 5.1+ */\r\n  }\r\n\r\n/* border-box model for all elements */\r\n\r\nhtml {\r\n    box-sizing: border-box;\r\n}\r\n\r\n*, *::before, *::after {\r\n    box-sizing: inherit;\r\n}\r\n\r\n/* --- Page color styling --- */\r\n\r\n:root {\r\n    --color-bg-main-1: #ffffff;\r\n    --color-bg-main-2: #dbf5f8;\r\n    --color-bg-main-3: #e9f5ff;\r\n    --color-bg-main-4: #f0c2cd63;\r\n    --color-font-1: #3070a6;\r\n}\r\n\r\n/* ---------------------------------- */\r\n\r\nbody {\r\n    width: 100%;\r\n    display: flex;\r\n    flex-direction: column;\r\n    align-items: center;\r\n    background-color: var(--color-bg-main-1);\r\n    background-image: url(\"../img/app/watercolor-blue-bg-left.jpg\"), url(\"../img/app/watercolor-blue-bg-right.jpg\");\r\n    background-attachment: fixed;\r\n    background-position: left top, right bottom;\r\n    background-repeat: repeat-y;\r\n    background-size: 15% auto;\r\n    font-family: 'Neucha', cursive;\r\n    color: var(--color-font-1);\r\n}\r\n\r\nbody.opened-menu {\r\n    overflow-y: hidden;\r\n}\r\n\r\n.inactive {\r\n    visibility: hidden;\r\n    position: fixed;\r\n    top: 0;\r\n}\r\n\r\n.graphic, img {\r\n    width: 100%;\r\n    height: auto;\r\n    padding: 0;\r\n    margin: 0;\r\n}\r\n\r\n.container-centered {\r\n    max-width: 1440px;\r\n    min-width: 1440px;\r\n    margin: 0 auto;\r\n}\r\n\r\nheader.container-centered {\r\n    display: flex;\r\n    flex-direction: column;\r\n    justify-content: center;\r\n    align-items: center;\r\n    position: -webkit-sticky;\r\n    position: sticky;\r\n    top: 0;\r\n    z-index: 8;\r\n    margin-top: 0;\r\n    transition: margin 1s;\r\n}\r\n\r\nheader.main-page {\r\n    margin-top: 380px;\r\n}\r\n\r\nheader .header-image {\r\n    width: 70%;\r\n    position: absolute;\r\n    top: -376px;\r\n}\r\n\r\n.main-controls {\r\n    width: 80%;\r\n    min-height: 150px;\r\n    display: flex;\r\n    justify-content: space-around;\r\n    align-items: center;\r\n    border-radius: 35px;\r\n    background-color: white;\r\n    background-image: url(../img/app/watercolor-waves-01-up.png), url(../img/app/watercolor-waves-01-down.png);\r\n    background-position: 100% 0, 0 100%;\r\n    background-repeat: repeat-x;\r\n    background-size: auto 28%;\r\n    z-index: 5;\r\n}\r\n\r\n.game-controls {\r\n    width: 100vw;\r\n    border-radius: 10px;\r\n    min-height: 100px;\r\n    padding: 10px 0;\r\n    display: flex;\r\n    justify-content: space-around;\r\n    align-items: center;\r\n    background-color: white;\r\n    border-radius: 0;\r\n    background-image: url(\"../img/app/watercolor-blue-bg-left.jpg\"), url(\"../img/app/watercolor-blue-bg-right.jpg\");\r\n    background-attachment: fixed;\r\n    background-position: left top, right bottom;\r\n    background-repeat: repeat-y;\r\n    background-size: 15% auto;\r\n}\r\n\r\nh1 {\r\n    text-align: center;\r\n    font-family: 'Gloria Hallelujah', cursive;\r\n}\r\n\r\n.button:hover {\r\n    cursor: pointer;\r\n}\r\n\r\n.menu-button {\r\n    z-index: 10;\r\n    width: 36px;\r\n    height: 36px;\r\n    background-image: url(\"../img/app/watercolor-menu-button-01.png\");\r\n    background-size: cover;\r\n    transition: transform 1s;\r\n}\r\n\r\n.menu-button.opened-menu {\r\n    transform: rotate(180deg);\r\n}\r\n\r\n.button.close-menu {\r\n    position: absolute;\r\n    top: 20px;\r\n    right: 20px;\r\n    width: 50px;\r\n    height: 50px;\r\n    border-radius: 50%;\r\n    background-image: url(\"../img/app/watercolor-red-cross-button-01.jpg\");\r\n    background-size: cover;\r\n\r\n}\r\n\r\n.switch {\r\n    width: 110px;\r\n    background-color: #faf8fd;\r\n    display: flex;\r\n    justify-content: space-between;\r\n    border-radius: 60px;\r\n    position: relative;\r\n    border: 2px var(--color-font-1) solid;\r\n}\r\n\r\n.switch-rail {\r\n    position: absolute;\r\n    left: 0;\r\n    width: 100%;\r\n    height: 100%;\r\n    border-radius: inherit;\r\n}\r\n\r\n.switch-roller {\r\n    width: 55px;\r\n    height: 100%;\r\n    position: absolute;\r\n    left: 0;\r\n    border-radius: inherit;\r\n    background-color: #3271a74d;\r\n    z-index: 10;\r\n    transition: left 0.7s;\r\n    border: 1px var(--color-font-1) solid;\r\n}\r\n\r\n.switch.switch-on .switch-roller {\r\n    left: 53px;\r\n}\r\n\r\n.switch-trigger {\r\n    margin: 0 10px;\r\n    height: 40px;\r\n    z-index: 9;\r\n    padding: 10px 0;\r\n    text-align: center;\r\n    font-size: 20px;\r\n}\r\n\r\n.game-button {\r\n    width: 100px;\r\n    height: 100px;\r\n    border-radius: 50px;\r\n    background-position: center;\r\n    background-repeat: no-repeat;\r\n    background-size: cover;\r\n}\r\n\r\n.game-button.start-button {\r\n    background-color: #039227;\r\n    background-image: url(\"../img/app/watercolor-button-start-01.png\");\r\n}\r\n\r\n.game-button.repeat-button {\r\n    background-color: #394cf5;\r\n    background-image: url(\"../img/app/watercolor-button-repeat-01.png\");\r\n}\r\n\r\n.game-progress {\r\n    width: 220px;\r\n    display: flex;\r\n    justify-content: space-around;\r\n    align-items: center;\r\n}\r\n\r\n.game-indicator {\r\n    width: 150px;\r\n    height: 40px;\r\n    border-radius: 18px;\r\n    display: flex;\r\n    justify-content: flex-start;\r\n    align-items: center;\r\n    background-color: #faf8fd;\r\n    border: 1px var(--color-font-1) solid;\r\n}\r\n\r\n.star {\r\n    width: 30px;\r\n}\r\n\r\n.game-score {\r\n    text-align: center;\r\n}\r\n\r\n.game-score .correct {\r\n    color: #008000;\r\n}\r\n\r\n.game-score .wrong {\r\n    color: #ff0000;\r\n}\r\n\r\nnav {\r\n    left: -320px;\r\n    position: fixed;\r\n    top: 0;\r\n    width: 320px;\r\n    height: 100%;\r\n    overflow-y: auto;\r\n    background-color: var(--color-bg-main-1);\r\n    z-index: 11;\r\n    background-image: url(\"../img/app/watercolor-kytes-01.jpg\"), url(\"../img/app/watercolor-buterfly-01.jpg\");\r\n    background-size: 450px auto, 179px auto;\r\n    background-position: 0px 0px, 122px 100%;\r\n    background-repeat: no-repeat, no-repeat;\r\n    box-shadow: none;\r\n    transition-property: left, background-position, box-shadow;\r\n    transition-duration: 1.2s,5s;\r\n}\r\n\r\nnav.opened-menu {\r\n    left: 0;\r\n    box-shadow: 0px 0 20px 1px #94ca68, 0px 0 80px 20px #f0e080, 50px 0 250px 50px var(--color-font-1);\r\n}\r\n\r\n.menu-list {\r\n    height: 500px;\r\n    margin-top: calc(50vh - 250px);\r\n}\r\n\r\n.menu-list li {\r\n    padding: 10px 0;\r\n    text-align: center;\r\n    font-size: 2em;\r\n    background-color: var(--color-bg-main-1);\r\n}\r\n\r\n.menu-list li:hover {\r\n    background-color: var(--color-bg-main-2);\r\n    background-image: url(\"../img/app/watercolor-line-02-right.png\");\r\n    background-size: 100% 100%;\r\n    color: white;\r\n    padding: 15px 0;\r\n}\r\n\r\n.menu-list li:nth-child(even):hover {\r\n    background-color: var(--color-bg-main-2);\r\n    background-image: url(\"../img/app/watercolor-line-02.png\");\r\n}\r\n\r\n.menu-list li.active-page, .menu-list li.active-page:hover {\r\n    background-color: var(--color-bg-main-2);\r\n    background-image: url(\"../img/app/watercolor-line-01.png\");\r\n    background-size: 100% 100%;\r\n    color: white;\r\n    padding: 15px 0;\r\n}\r\n\r\nmain.container-centered {\r\n    margin-top: 20px;\r\n    padding-bottom: 35px;\r\n}\r\n\r\n.content-wrapper {\r\n    width: 100%;\r\n    margin: auto;\r\n    display: flex;\r\n    flex-direction: column;\r\n    align-items: center;\r\n}\r\n\r\nh2.topic-name {\r\n    font-size: 34px;\r\n    margin: 30px 0;\r\n}\r\n\r\n.card-container {\r\n    display: flex;\r\n    justify-content: space-around;\r\n    align-items: center;\r\n    flex-wrap: wrap;\r\n    width: 78%;\r\n    margin: auto;\r\n}\r\n\r\n.card {\r\n    margin: 15px;\r\n    position: relative;\r\n}\r\n\r\n.card-main-page {\r\n    width: 256px;\r\n    height: 240px;\r\n    margin-top: 20px;\r\n    padding: 45px;\r\n    border-radius: 50%;\r\n    background-color: #ffffff;\r\n    background-image: url(\"../img/app/watercolor-blue-card-bg-01.jpg\");\r\n    background-size: 100% 83%;\r\n    background-repeat: no-repeat;\r\n}\r\n\r\n.card-topic {\r\n    width: 226px;\r\n    height: 270px;\r\n}\r\n\r\n.card.disabled {\r\n    filter: blur(3px);\r\n}\r\n\r\n.card-content {\r\n    width: 100%;\r\n    height: 100%;\r\n    position: relative;\r\n}\r\n\r\n.card-topic .card-content {\r\n    border: 2px var(--color-font-1) solid;\r\n    box-shadow: 0 0 15px 1px var(--color-font-1);\r\n}\r\n\r\n.card-topic .card-content:hover {\r\n    box-shadow: 0 0 15px 3px var(--color-font-1);\r\n}\r\n\r\n.card.disabled .card-content {\r\n    box-shadow: none;\r\n}\r\n\r\n.card-main-page .card-content, .card-main-page img {\r\n    border-radius: 50px;\r\n}\r\n\r\n.card-content, .card-content img {\r\n    transition: border-radius 1s;\r\n}\r\n\r\n.card-topic .card-content {\r\n    border-radius: 50px 0;\r\n}\r\n\r\n.card-topic.flipped .card-content {\r\n    border-radius: 0 50px;\r\n}\r\n\r\n.card-topic img {\r\n    border-radius: 50px 0 0 0;\r\n}\r\n\r\n.card-topic.flipped img {\r\n    border-radius: 0 50px 0 0;\r\n}\r\n\r\n.card p {\r\n    margin-top: 15px;\r\n    font-size: 32px;\r\n    text-align: center;\r\n}\r\n\r\n.card-main-page p {\r\n    position: relative;\r\n    top: 32px;\r\n    border-radius: 20px;\r\n    font-size: 32px;\r\n}\r\n\r\n.card-flip-button {\r\n    width: 35px;\r\n    height: 35px;\r\n    position: absolute;\r\n    bottom: 20px;\r\n    right: 20px;\r\n    border-radius: 50%;\r\n    background-image: url(\"../img/app/watercolor-flip-button-01.png\");\r\n    background-size: cover;\r\n}\r\n\r\n.card-flip-button:hover {\r\n    animation-name: rotation;\r\n    animation-duration: 2s;\r\n    animation-timing-function: linear;\r\n    animation-iteration-count: infinite;\r\n}\r\n\r\n.flipped .card-content {\r\n    animation-name: flip-card;\r\n    animation-duration: 1s;\r\n}\r\n\r\n.unflipped .card-content {\r\n    animation-name: unflip-card;\r\n    animation-duration: 1s;\r\n}\r\n\r\n.final-clip {\r\n    display: flex;\r\n    flex-direction: column;\r\n    width: 320px;\r\n    margin: auto;\r\n    justify-content: center;\r\n    align-items: center;\r\n    padding: 50px 0;\r\n}\r\n\r\n.final-clip p {\r\n    color: red;\r\n    font-size: 36px;\r\n    margin-top: 30px;\r\n}\r\n\r\n.stat-container {\r\n    width: 74%;\r\n    display: flex;\r\n    flex-direction: column;\r\n    justify-content: center;\r\n    align-items: center;\r\n    font-size: 2em;\r\n}\r\n\r\n.table-wrapper {\r\n    width: 100%;\r\n    overflow-x: auto;\r\n}\r\n\r\n.stat-table {\r\n    width: 100%;\r\n    border-collapse: collapse;\r\n    font-size: 0.5em;\r\n\r\n}\r\n\r\nthead {\r\n    background-color: aliceblue;\r\n}\r\n\r\nth {\r\n    height: 30px;\r\n}\r\n\r\ntr {\r\n    height: 25px;\r\n    background-color: azure;\r\n}\r\n\r\nth, td {\r\n    padding: 0 4px;\r\n    border: 1px solid black;\r\n    text-align: center;\r\n    vertical-align: middle;\r\n}\r\n\r\ntr:nth-child(even) {\r\n    background-color: #fdfdde;\r\n}\r\n\r\n.sorted-down, .sorted-up {\r\n    background-color: #d0fa81;\r\n}\r\n\r\n.sort-icon {\r\n    width: 16px;\r\n    height: auto;\r\n    position: relative;\r\n    left: 10px;\r\n    top: 2px;\r\n}\r\n\r\n.stat-buttons-wrapper {\r\n    width: 100%;\r\n    display: flex;\r\n    justify-content: space-around;\r\n    flex-wrap: wrap;\r\n}\r\n\r\n.stat-button {\r\n    width: 300px;\r\n    height: 70px;\r\n    margin: 20px 0;\r\n    padding: 15px;\r\n    border-radius: 50px;\r\n    border: 1px solid rgb(0, 0, 0);\r\n    color: azure;\r\n    text-align: center;\r\n}\r\n\r\n.button.train-diff {\r\n    background-color: rgb(7, 160, 96);\r\n}\r\n\r\n.button.reset-stat {\r\n    background-color: rgb(189, 45, 45);\r\n}\r\n\r\n.nothing-diff {\r\n    width: 100%;\r\n}\r\n\r\n.nothing-diff p {\r\n    position: absolute;\r\n    top: 20%;\r\n}\r\n\r\n.disabled:hover {\r\n    cursor:auto;\r\n}\r\n\r\n/* --- Animation --- */\r\n\r\n@keyframes flip-card {\r\n    0% {}\r\n    50% {transform: rotateY(89deg)}\r\n}\r\n\r\n@keyframes unflip-card {\r\n    0% {}\r\n    50% {transform: rotateY(89deg)}\r\n}\r\n\r\n@keyframes rotation {\r\n    0% {}\r\n    100% {transform: rotate(360deg)}\r\n}\r\n\r\n/* --- RESPONSIVE LAYOUTS --- */\r\n\r\n@media (max-width: 1439px) {\r\n    .container-centered {\r\n        min-width: calc(1440vw*100/1440 - 20px);\r\n    }\r\n\r\n    header.main-page {\r\n        margin-top:  calc(380vw*100/1440);\r\n    }\r\n\r\n    header .graphic {\r\n        top: calc(-370vw*100/1440 + 5px);\r\n    }\r\n}\r\n\r\n@media (max-width: 559px) {\r\n    .main-controls {\r\n        width: 100vw;\r\n        border-radius: 0;\r\n    }\r\n\r\n    .game-controls {\r\n        justify-content: center;\r\n    }\r\n\r\n    .game-button {\r\n        width: 70px;\r\n        height: 70px;\r\n    }\r\n\r\n    h1 {\r\n        max-width: 75px;\r\n        font-size: 24px;\r\n    }\r\n\r\n    h2.topic-name {\r\n        font-size: 32px;\r\n        margin: 10px 0;\r\n    }\r\n\r\n    .card-main-page {\r\n        width: 230px;\r\n        height: 220px;\r\n        margin: 10px 0;\r\n    }\r\n\r\n    .card-main-page p {\r\n        font-size: 28px;\r\n    }\r\n\r\n    .stat-buttons-wrapper {\r\n        width: 78%;\r\n    }\r\n\r\n    .stat-button {\r\n        width: 190px;\r\n        height: 52px;\r\n        font-size: 21px;\r\n        margin: 5px 0;\r\n    }\r\n\r\n    main.container-centered {\r\n        width: 100vw;\r\n    }\r\n\r\n    .stat-container {\r\n        width: 100%;\r\n    }\r\n\r\n    .table-wrapper {\r\n        width: 72%;\r\n    }\r\n}\r\n\r\n@media (max-height: 970px) {\r\n    .menu-list {\r\n        margin-top: 235px;\r\n    }\r\n}"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/api.js":
/*!*****************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/api.js ***!
  \*****************************************************/
/***/ ((module) => {



/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
module.exports = function (cssWithMappingToString) {
  var list = []; // return the list of modules as css string

  list.toString = function toString() {
    return this.map(function (item) {
      var content = "";
      var needLayer = typeof item[5] !== "undefined";

      if (item[4]) {
        content += "@supports (".concat(item[4], ") {");
      }

      if (item[2]) {
        content += "@media ".concat(item[2], " {");
      }

      if (needLayer) {
        content += "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {");
      }

      content += cssWithMappingToString(item);

      if (needLayer) {
        content += "}";
      }

      if (item[2]) {
        content += "}";
      }

      if (item[4]) {
        content += "}";
      }

      return content;
    }).join("");
  }; // import a list of modules into the list


  list.i = function i(modules, media, dedupe, supports, layer) {
    if (typeof modules === "string") {
      modules = [[null, modules, undefined]];
    }

    var alreadyImportedModules = {};

    if (dedupe) {
      for (var k = 0; k < this.length; k++) {
        var id = this[k][0];

        if (id != null) {
          alreadyImportedModules[id] = true;
        }
      }
    }

    for (var _k = 0; _k < modules.length; _k++) {
      var item = [].concat(modules[_k]);

      if (dedupe && alreadyImportedModules[item[0]]) {
        continue;
      }

      if (typeof layer !== "undefined") {
        if (typeof item[5] === "undefined") {
          item[5] = layer;
        } else {
          item[1] = "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {").concat(item[1], "}");
          item[5] = layer;
        }
      }

      if (media) {
        if (!item[2]) {
          item[2] = media;
        } else {
          item[1] = "@media ".concat(item[2], " {").concat(item[1], "}");
          item[2] = media;
        }
      }

      if (supports) {
        if (!item[4]) {
          item[4] = "".concat(supports);
        } else {
          item[1] = "@supports (".concat(item[4], ") {").concat(item[1], "}");
          item[4] = supports;
        }
      }

      list.push(item);
    }
  };

  return list;
};

/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/getUrl.js":
/*!********************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/getUrl.js ***!
  \********************************************************/
/***/ ((module) => {



module.exports = function (url, options) {
  if (!options) {
    options = {};
  }

  if (!url) {
    return url;
  }

  url = String(url.__esModule ? url.default : url); // If url is already wrapped in quotes, remove them

  if (/^['"].*['"]$/.test(url)) {
    url = url.slice(1, -1);
  }

  if (options.hash) {
    url += options.hash;
  } // Should url be wrapped?
  // See https://drafts.csswg.org/css-values-3/#urls


  if (/["'() \t\n]|(%20)/.test(url) || options.needQuotes) {
    return "\"".concat(url.replace(/"/g, '\\"').replace(/\n/g, "\\n"), "\"");
  }

  return url;
};

/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/sourceMaps.js":
/*!************************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/sourceMaps.js ***!
  \************************************************************/
/***/ ((module) => {



module.exports = function (item) {
  var content = item[1];
  var cssMapping = item[3];

  if (!cssMapping) {
    return content;
  }

  if (typeof btoa === "function") {
    var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(cssMapping))));
    var data = "sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(base64);
    var sourceMapping = "/*# ".concat(data, " */");
    var sourceURLs = cssMapping.sources.map(function (source) {
      return "/*# sourceURL=".concat(cssMapping.sourceRoot || "").concat(source, " */");
    });
    return [content].concat(sourceURLs).concat([sourceMapping]).join("\n");
  }

  return [content].join("\n");
};

/***/ }),

/***/ "./assets/styles/normalize.css":
/*!*************************************!*\
  !*** ./assets/styles/normalize.css ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/styleDomAPI.js */ "./node_modules/style-loader/dist/runtime/styleDomAPI.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/insertBySelector.js */ "./node_modules/style-loader/dist/runtime/insertBySelector.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js */ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/insertStyleElement.js */ "./node_modules/style-loader/dist/runtime/insertStyleElement.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/styleTagTransform.js */ "./node_modules/style-loader/dist/runtime/styleTagTransform.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_normalize_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../../node_modules/css-loader/dist/cjs.js!./normalize.css */ "./node_modules/css-loader/dist/cjs.js!./assets/styles/normalize.css");

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());

      options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
    
options.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_normalize_css__WEBPACK_IMPORTED_MODULE_6__["default"], options);




       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_normalize_css__WEBPACK_IMPORTED_MODULE_6__["default"] && _node_modules_css_loader_dist_cjs_js_normalize_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals ? _node_modules_css_loader_dist_cjs_js_normalize_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals : undefined);


/***/ }),

/***/ "./assets/styles/reset.css":
/*!*********************************!*\
  !*** ./assets/styles/reset.css ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/styleDomAPI.js */ "./node_modules/style-loader/dist/runtime/styleDomAPI.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/insertBySelector.js */ "./node_modules/style-loader/dist/runtime/insertBySelector.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js */ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/insertStyleElement.js */ "./node_modules/style-loader/dist/runtime/insertStyleElement.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/styleTagTransform.js */ "./node_modules/style-loader/dist/runtime/styleTagTransform.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_reset_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../../node_modules/css-loader/dist/cjs.js!./reset.css */ "./node_modules/css-loader/dist/cjs.js!./assets/styles/reset.css");

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());

      options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
    
options.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_reset_css__WEBPACK_IMPORTED_MODULE_6__["default"], options);




       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_reset_css__WEBPACK_IMPORTED_MODULE_6__["default"] && _node_modules_css_loader_dist_cjs_js_reset_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals ? _node_modules_css_loader_dist_cjs_js_reset_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals : undefined);


/***/ }),

/***/ "./assets/styles/style.css":
/*!*********************************!*\
  !*** ./assets/styles/style.css ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/styleDomAPI.js */ "./node_modules/style-loader/dist/runtime/styleDomAPI.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/insertBySelector.js */ "./node_modules/style-loader/dist/runtime/insertBySelector.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js */ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/insertStyleElement.js */ "./node_modules/style-loader/dist/runtime/insertStyleElement.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/styleTagTransform.js */ "./node_modules/style-loader/dist/runtime/styleTagTransform.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../../node_modules/css-loader/dist/cjs.js!./style.css */ "./node_modules/css-loader/dist/cjs.js!./assets/styles/style.css");

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());

      options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
    
options.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__["default"], options);




       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__["default"] && _node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals ? _node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals : undefined);


/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js":
/*!****************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js ***!
  \****************************************************************************/
/***/ ((module) => {



var stylesInDOM = [];

function getIndexByIdentifier(identifier) {
  var result = -1;

  for (var i = 0; i < stylesInDOM.length; i++) {
    if (stylesInDOM[i].identifier === identifier) {
      result = i;
      break;
    }
  }

  return result;
}

function modulesToDom(list, options) {
  var idCountMap = {};
  var identifiers = [];

  for (var i = 0; i < list.length; i++) {
    var item = list[i];
    var id = options.base ? item[0] + options.base : item[0];
    var count = idCountMap[id] || 0;
    var identifier = "".concat(id, " ").concat(count);
    idCountMap[id] = count + 1;
    var indexByIdentifier = getIndexByIdentifier(identifier);
    var obj = {
      css: item[1],
      media: item[2],
      sourceMap: item[3],
      supports: item[4],
      layer: item[5]
    };

    if (indexByIdentifier !== -1) {
      stylesInDOM[indexByIdentifier].references++;
      stylesInDOM[indexByIdentifier].updater(obj);
    } else {
      var updater = addElementStyle(obj, options);
      options.byIndex = i;
      stylesInDOM.splice(i, 0, {
        identifier: identifier,
        updater: updater,
        references: 1
      });
    }

    identifiers.push(identifier);
  }

  return identifiers;
}

function addElementStyle(obj, options) {
  var api = options.domAPI(options);
  api.update(obj);

  var updater = function updater(newObj) {
    if (newObj) {
      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap && newObj.supports === obj.supports && newObj.layer === obj.layer) {
        return;
      }

      api.update(obj = newObj);
    } else {
      api.remove();
    }
  };

  return updater;
}

module.exports = function (list, options) {
  options = options || {};
  list = list || [];
  var lastIdentifiers = modulesToDom(list, options);
  return function update(newList) {
    newList = newList || [];

    for (var i = 0; i < lastIdentifiers.length; i++) {
      var identifier = lastIdentifiers[i];
      var index = getIndexByIdentifier(identifier);
      stylesInDOM[index].references--;
    }

    var newLastIdentifiers = modulesToDom(newList, options);

    for (var _i = 0; _i < lastIdentifiers.length; _i++) {
      var _identifier = lastIdentifiers[_i];

      var _index = getIndexByIdentifier(_identifier);

      if (stylesInDOM[_index].references === 0) {
        stylesInDOM[_index].updater();

        stylesInDOM.splice(_index, 1);
      }
    }

    lastIdentifiers = newLastIdentifiers;
  };
};

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertBySelector.js":
/*!********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertBySelector.js ***!
  \********************************************************************/
/***/ ((module) => {



var memo = {};
/* istanbul ignore next  */

function getTarget(target) {
  if (typeof memo[target] === "undefined") {
    var styleTarget = document.querySelector(target); // Special case to return head of iframe instead of iframe itself

    if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
      try {
        // This will throw an exception if access to iframe is blocked
        // due to cross-origin restrictions
        styleTarget = styleTarget.contentDocument.head;
      } catch (e) {
        // istanbul ignore next
        styleTarget = null;
      }
    }

    memo[target] = styleTarget;
  }

  return memo[target];
}
/* istanbul ignore next  */


function insertBySelector(insert, style) {
  var target = getTarget(insert);

  if (!target) {
    throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");
  }

  target.appendChild(style);
}

module.exports = insertBySelector;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertStyleElement.js":
/*!**********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertStyleElement.js ***!
  \**********************************************************************/
/***/ ((module) => {



/* istanbul ignore next  */
function insertStyleElement(options) {
  var element = document.createElement("style");
  options.setAttributes(element, options.attributes);
  options.insert(element, options.options);
  return element;
}

module.exports = insertStyleElement;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js":
/*!**********************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js ***!
  \**********************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {



/* istanbul ignore next  */
function setAttributesWithoutAttributes(styleElement) {
  var nonce =  true ? __webpack_require__.nc : 0;

  if (nonce) {
    styleElement.setAttribute("nonce", nonce);
  }
}

module.exports = setAttributesWithoutAttributes;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleDomAPI.js":
/*!***************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleDomAPI.js ***!
  \***************************************************************/
/***/ ((module) => {



/* istanbul ignore next  */
function apply(styleElement, options, obj) {
  var css = "";

  if (obj.supports) {
    css += "@supports (".concat(obj.supports, ") {");
  }

  if (obj.media) {
    css += "@media ".concat(obj.media, " {");
  }

  var needLayer = typeof obj.layer !== "undefined";

  if (needLayer) {
    css += "@layer".concat(obj.layer.length > 0 ? " ".concat(obj.layer) : "", " {");
  }

  css += obj.css;

  if (needLayer) {
    css += "}";
  }

  if (obj.media) {
    css += "}";
  }

  if (obj.supports) {
    css += "}";
  }

  var sourceMap = obj.sourceMap;

  if (sourceMap && typeof btoa !== "undefined") {
    css += "\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), " */");
  } // For old IE

  /* istanbul ignore if  */


  options.styleTagTransform(css, styleElement, options.options);
}

function removeStyleElement(styleElement) {
  // istanbul ignore if
  if (styleElement.parentNode === null) {
    return false;
  }

  styleElement.parentNode.removeChild(styleElement);
}
/* istanbul ignore next  */


function domAPI(options) {
  var styleElement = options.insertStyleElement(options);
  return {
    update: function update(obj) {
      apply(styleElement, options, obj);
    },
    remove: function remove() {
      removeStyleElement(styleElement);
    }
  };
}

module.exports = domAPI;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleTagTransform.js":
/*!*********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleTagTransform.js ***!
  \*********************************************************************/
/***/ ((module) => {



/* istanbul ignore next  */
function styleTagTransform(css, styleElement) {
  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = css;
  } else {
    while (styleElement.firstChild) {
      styleElement.removeChild(styleElement.firstChild);
    }

    styleElement.appendChild(document.createTextNode(css));
  }
}

module.exports = styleTagTransform;

/***/ }),

/***/ "./assets/img/app/watercolor-blue-bg-left.jpg":
/*!****************************************************!*\
  !*** ./assets/img/app/watercolor-blue-bg-left.jpg ***!
  \****************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "188bcd4eb40b6580f385.jpg";

/***/ }),

/***/ "./assets/img/app/watercolor-blue-bg-right.jpg":
/*!*****************************************************!*\
  !*** ./assets/img/app/watercolor-blue-bg-right.jpg ***!
  \*****************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "20b0d160d20f98d848a3.jpg";

/***/ }),

/***/ "./assets/img/app/watercolor-blue-card-bg-01.jpg":
/*!*******************************************************!*\
  !*** ./assets/img/app/watercolor-blue-card-bg-01.jpg ***!
  \*******************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "c3f428254b75e06f98fa.jpg";

/***/ }),

/***/ "./assets/img/app/watercolor-buterfly-01.jpg":
/*!***************************************************!*\
  !*** ./assets/img/app/watercolor-buterfly-01.jpg ***!
  \***************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "8c0359852dc6f8ed3537.jpg";

/***/ }),

/***/ "./assets/img/app/watercolor-button-repeat-01.png":
/*!********************************************************!*\
  !*** ./assets/img/app/watercolor-button-repeat-01.png ***!
  \********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "58b725616acc4feebcd0.png";

/***/ }),

/***/ "./assets/img/app/watercolor-button-start-01.png":
/*!*******************************************************!*\
  !*** ./assets/img/app/watercolor-button-start-01.png ***!
  \*******************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "b45f4ac3f9750187becc.png";

/***/ }),

/***/ "./assets/img/app/watercolor-flip-button-01.png":
/*!******************************************************!*\
  !*** ./assets/img/app/watercolor-flip-button-01.png ***!
  \******************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "7ebb5fc7014c004bafdd.png";

/***/ }),

/***/ "./assets/img/app/watercolor-kytes-01.jpg":
/*!************************************************!*\
  !*** ./assets/img/app/watercolor-kytes-01.jpg ***!
  \************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "c8a2e5cc42f3bbccc484.jpg";

/***/ }),

/***/ "./assets/img/app/watercolor-line-01.png":
/*!***********************************************!*\
  !*** ./assets/img/app/watercolor-line-01.png ***!
  \***********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "d1ad5b7e82d67be50865.png";

/***/ }),

/***/ "./assets/img/app/watercolor-line-02-right.png":
/*!*****************************************************!*\
  !*** ./assets/img/app/watercolor-line-02-right.png ***!
  \*****************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "7f8e8b4eecdcc094d164.png";

/***/ }),

/***/ "./assets/img/app/watercolor-line-02.png":
/*!***********************************************!*\
  !*** ./assets/img/app/watercolor-line-02.png ***!
  \***********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "0786abced622947a6f80.png";

/***/ }),

/***/ "./assets/img/app/watercolor-menu-button-01.png":
/*!******************************************************!*\
  !*** ./assets/img/app/watercolor-menu-button-01.png ***!
  \******************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "2ab7371aad39becbec4a.png";

/***/ }),

/***/ "./assets/img/app/watercolor-red-cross-button-01.jpg":
/*!***********************************************************!*\
  !*** ./assets/img/app/watercolor-red-cross-button-01.jpg ***!
  \***********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "391da27acaf39f62285f.jpg";

/***/ }),

/***/ "./assets/img/app/watercolor-waves-01-down.png":
/*!*****************************************************!*\
  !*** ./assets/img/app/watercolor-waves-01-down.png ***!
  \*****************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "0db6f3722e177680a6c0.png";

/***/ }),

/***/ "./assets/img/app/watercolor-waves-01-up.png":
/*!***************************************************!*\
  !*** ./assets/img/app/watercolor-waves-01-up.png ***!
  \***************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "b472553b3502e59eaa40.png";

/***/ }),

/***/ "./assets/fonts/gloria-hallelujah-v17-latin-regular.woff":
/*!***************************************************************!*\
  !*** ./assets/fonts/gloria-hallelujah-v17-latin-regular.woff ***!
  \***************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "fde54c3fb84d047fde5c.woff";

/***/ }),

/***/ "./assets/fonts/gloria-hallelujah-v17-latin-regular.woff2":
/*!****************************************************************!*\
  !*** ./assets/fonts/gloria-hallelujah-v17-latin-regular.woff2 ***!
  \****************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "46e5af6a235f8f3ecbc4.woff2";

/***/ }),

/***/ "./assets/fonts/neucha-v17-latin-regular.woff":
/*!****************************************************!*\
  !*** ./assets/fonts/neucha-v17-latin-regular.woff ***!
  \****************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "a25bc72bc3184aa13d76.woff";

/***/ }),

/***/ "./assets/fonts/neucha-v17-latin-regular.woff2":
/*!*****************************************************!*\
  !*** ./assets/fonts/neucha-v17-latin-regular.woff2 ***!
  \*****************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "252c1be327d81ca97242.woff2";

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/global */
/******/ 	(() => {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/publicPath */
/******/ 	(() => {
/******/ 		var scriptUrl;
/******/ 		if (__webpack_require__.g.importScripts) scriptUrl = __webpack_require__.g.location + "";
/******/ 		var document = __webpack_require__.g.document;
/******/ 		if (!scriptUrl && document) {
/******/ 			if (document.currentScript)
/******/ 				scriptUrl = document.currentScript.src
/******/ 			if (!scriptUrl) {
/******/ 				var scripts = document.getElementsByTagName("script");
/******/ 				if(scripts.length) scriptUrl = scripts[scripts.length - 1].src
/******/ 			}
/******/ 		}
/******/ 		// When supporting browsers where an automatic publicPath is not supported you must specify an output.publicPath manually via configuration
/******/ 		// or pass an empty string ("") and set the __webpack_public_path__ variable from your code to use your own logic.
/******/ 		if (!scriptUrl) throw new Error("Automatic publicPath is not supported in this browser");
/******/ 		scriptUrl = scriptUrl.replace(/#.*$/, "").replace(/\?.*$/, "").replace(/\/[^\/]+$/, "/");
/******/ 		__webpack_require__.p = scriptUrl;
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	(() => {
/******/ 		__webpack_require__.b = document.baseURI || self.location.href;
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = {
/******/ 			"index": 0
/******/ 		};
/******/ 		
/******/ 		// no chunk on demand loading
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 		
/******/ 		// no on chunks loaded
/******/ 		
/******/ 		// no jsonp function
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/nonce */
/******/ 	(() => {
/******/ 		__webpack_require__.nc = undefined;
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _assets_styles_reset_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../assets/styles/reset.css */ "./assets/styles/reset.css");
/* harmony import */ var _assets_styles_normalize_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../assets/styles/normalize.css */ "./assets/styles/normalize.css");
/* harmony import */ var _assets_styles_style_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../assets/styles/style.css */ "./assets/styles/style.css");
/* harmony import */ var _assets_js_cards__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../assets/js/cards */ "./assets/js/cards.js");
/* harmony import */ var _assets_js_appControl__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../assets/js/appControl */ "./assets/js/appControl.js");
/* harmony import */ var _assets_js_clickUserInteractive__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../assets/js/clickUserInteractive */ "./assets/js/clickUserInteractive.js");
/* harmony import */ var _assets_js_mainCards__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../assets/js/mainCards */ "./assets/js/mainCards.js");
/* eslint-disable linebreak-style */

/* eslint-disable no-undef */







var _ref = [_assets_js_cards__WEBPACK_IMPORTED_MODULE_3__["default"][0], _assets_js_cards__WEBPACK_IMPORTED_MODULE_3__["default"].slice(1)],
    topics = _ref[0],
    cards = _ref[1];
var appControl = new _assets_js_appControl__WEBPACK_IMPORTED_MODULE_4__["default"](topics, cards, _assets_js_mainCards__WEBPACK_IMPORTED_MODULE_6__["default"]);
document.querySelector('body').addEventListener('click', function (event) {
  return (0,_assets_js_clickUserInteractive__WEBPACK_IMPORTED_MODULE_5__["default"])(event, appControl);
});
})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguZmViYTQwNTMzMWVhZjg3YzlmY2QuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDaUM7QUFDUTtBQUNKO0FBQ0c7QUFDSjtBQUNwQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9CQUFvQiw2Q0FBVztBQUMvQjtBQUNBO0FBQ0E7QUFDQTtBQUNBLHlCQUF5QiwrQ0FBYTtBQUN0QztBQUNBO0FBQ0E7QUFDQTtBQUNBLDJCQUEyQixvREFBVztBQUN0QztBQUNBO0FBQ0EsdUJBQXVCLGdEQUFnQjtBQUN2QztBQUNBO0FBQ0Esb0JBQW9CLGtEQUFTO0FBQzdCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0RBQWdELGlCQUFpQjtBQUNqRTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxzREFBc0QseUJBQXlCO0FBQy9FO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpRUFBZSxVQUFVLEVBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7QUM1RjFCO0FBQ29EO0FBQ3BEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFFQUFxRSxjQUFjLGlCQUFpQixpQkFBaUI7QUFDckg7QUFDQSwrQ0FBK0MsaUJBQWlCO0FBQ2hFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFFQUFxRSxjQUFjLFNBQVMsYUFBYTtBQUN6RztBQUNBLCtDQUErQyxhQUFhO0FBQzVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBVTtBQUNWO0FBQ0E7QUFDQTtBQUNBLHFFQUFxRSxjQUFjLFNBQVMsYUFBYTtBQUN6RztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUJBQW1CLGlFQUFtQjtBQUN0QztBQUNBO0FBQ0E7QUFDQTtBQUNBLGlFQUFlLElBQUksRUFBQzs7Ozs7Ozs7Ozs7Ozs7O0FDNURwQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsaUVBQWUsS0FBSyxFQUFDOzs7Ozs7Ozs7Ozs7Ozs7QUNqVHJCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQVE7QUFDUjtBQUNBO0FBQ0E7QUFDQSxRQUFRO0FBQ1I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQVE7QUFDUjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpRUFBZSxvQkFBb0IsRUFBQzs7Ozs7Ozs7Ozs7Ozs7OztBQ2pIcEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNB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QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1CQUFtQixpRUFBbUI7QUFDdEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDBCQUEwQiwwREFBWTtBQUN0QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx5Q0FBeUMsNkNBQUk7QUFDN0M7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx5Q0FBeUMsNkNBQUk7QUFDN0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpRUFBZSxXQUFXLEVBQUM7Ozs7Ozs7Ozs7Ozs7OztBQzlMM0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtB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VUFBVSxZQUFZLFdBQVcsWUFBWSxhQUFhLGFBQWEsYUFBYSxPQUFPLEtBQUssWUFBWSxXQUFXLFVBQVUsVUFBVSxZQUFZLE9BQU8sS0FBSyxVQUFVLFVBQVUsWUFBWSxXQUFXLFlBQVksYUFBYSxXQUFXLFlBQVksYUFBYSxPQUFPLEtBQUssVUFBVSxNQUFNLEtBQUssVUFBVSxVQUFVLFVBQVUsVUFBVSxZQUFZLFdBQVcsT0FBTyxLQUFLLFVBQVUsVUFBVSxZQUFZLGFBQWEsYUFBYSxhQUFhLE9BQU8sS0FBSyxZQUFZLGFBQWEsT0FBTyxLQUFLLFlBQVksYUFBYSxPQUFPLEtBQUssVUFBVSxVQUFVLFlBQVksYUFBYSxPQUFPLEtBQUssVUFBVSxVQUFVLFlBQVksV0FBVyxZQUFZLGFBQWEsYUFBYSxhQUFhLE9BQU8sS0FBSyxVQUFVLE1BQU0sS0FBSyxZQUFZLE9BQU8sS0FBSyxVQUFVLE9BQU8sS0FBSyxVQUFVLE9BQU8sS0FBSyxVQUFVLFVBQVUsVUFBVSxVQUFVLFVBQVUsWUFBWSxhQUFhLFdBQVcsWUFBWSxhQUFhLGFBQWEsYUFBYSxhQUFhLGFBQWEsYUFBYSxPQUFPLEtBQUssVUFBVSxZQUFZLE9BQU8sS0FBSyxVQUFVLFlBQVksT0FBTyxLQUFLLFVBQVUsWUFBWSxXQUFXLFlBQVksT0FBTyxLQUFLLFlBQVksYUFBYSxhQUFhLFdBQVcsVUFBVSxPQUFPLEtBQUssWUFBWSxhQUFhLE9BQU8sS0FBSyxZQUFZLGFBQWEsYUFBYSxXQUFXLFVBQVUsT0FBTyxLQUFLLFlBQVksYUFBYSxPQUFPLEtBQUssVUFBVSxVQUFVLFVBQVUsWUFBWSxhQUFhLE9BQU8sS0FBSyxVQUFVLFVBQVUsT0FBTyxLQUFLLFVBQVUsWUFBWSxhQUFhLFdBQVcsVUFBVSxVQUFVLE9BQU8sS0FBSyxVQUFVLFlBQVksT0FBTyxLQUFLLFVBQVUsVUFBVSxZQUFZLFdBQVcsWUFBWSxhQUFhLGFBQWEsYUFBYSxhQUFhLE9BQU8sS0FBSyxVQUFVLFVBQVUsT0FBTyxLQUFLLFlBQVksT0FBTyxLQUFLLFVBQVUsVUFBVSxZQUFZLE9BQU8sS0FBSyxZQUFZLGFBQWEsT0FBTyxLQUFLLFlBQVksT0FBTyxLQUFLLFlBQVksT0FBTyxLQUFLLFlBQVksT0FBTyxLQUFLLFlBQVksT0FBTyxLQUFLLFlBQVksT0FBTyxLQUFLLFlBQVksT0FBTyxLQUFLLFlBQVksT0FBTyxLQUFLLFlBQVksT0FBTyxLQUFLLFlBQVksV0FBVyxZQUFZLE9BQU8sS0FBSyxZQUFZLFdBQVcsWUFBWSxXQUFXLE9BQU8sS0FBSyxVQUFVLFVBQVUsWUFBWSxXQUFXLFVBQVUsWUFBWSxhQUFhLGFBQWEsT0FBTyxLQUFLLFlBQVksYUFBYSxhQUFhLGFBQWEsT0FBTyxLQUFLLFlBQVksYUFBYSxPQUFPLEtBQUssWUFBWSxhQUFhLE9BQU8sS0FBSyxVQUFVLFlBQVksV0FBVyxVQUFVLFlBQVksYUFBYSxXQUFXLE9BQU8sS0FBSyxVQUFVLFVBQVUsWUFBWSxPQUFPLEtBQUssVUFBVSxVQUFVLFlBQVksYUFBYSxhQUFhLFdBQVcsT0FBTyxLQUFLLFVBQVUsWUFBWSxPQUFPLEtBQUssVUFBVSxZQUFZLGNBQWMsT0FBTyxLQUFLLFlBQVksT0FBTyxLQUFLLFVBQVUsT0FBTyxLQUFLLFVBQVUsWUFBWSxPQUFPLEtBQUssVUFBVSxZQUFZLGFBQWEsYUFBYSxPQUFPLEtBQUssWUFBWSxPQUFPLEtBQUssWUFBWSxPQUFPLEtBQUssVUFBVSxVQUFVLFlBQVksV0FBVyxVQUFVLE1BQU0sS0FBSyxVQUFVLFVBQVUsWUFBWSxXQUFXLE9BQU8sS0FBSyxVQUFVLFVBQVUsVUFBVSxVQUFVLFlBQVksYUFBYSxXQUFXLFlBQVksT0FBTyxLQUFLLFlBQVksT0FBTyxLQUFLLFlBQVksT0FBTyxLQUFLLFVBQVUsTUFBTSxLQUFLLFlBQVksV0FBVyxNQUFNLEtBQUssVUFBVSxNQUFNLGFBQWEsTUFBTSxVQUFVLGlCQUFpQixPQUFPLEtBQUssVUFBVSxpQkFBaUIsT0FBTyxLQUFLLFVBQVUsaUJBQWlCLE9BQU8sYUFBYSxNQUFNLEtBQUssWUFBWSxPQUFPLEtBQUssWUFBWSxPQUFPLEtBQUssWUFBWSxNQUFN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ekQsRSIsInNvdXJjZXMiOlsid2VicGFjazovL2VuZ2xpc2hfZm9yX2tpZHMvLi9hc3NldHMvanMvYXBwQ29udHJvbC5qcyIsIndlYnBhY2s6Ly9lbmdsaXNoX2Zvcl9raWRzLy4vYXNzZXRzL2pzL2NhcmQuanMiLCJ3ZWJwYWNrOi8vZW5nbGlzaF9mb3Jfa2lkcy8uL2Fzc2V0cy9qcy9jYXJkcy5qcyIsIndlYnBhY2s6Ly9lbmdsaXNoX2Zvcl9raWRzLy4vYXNzZXRzL2pzL2NsaWNrVXNlckludGVyYWN0aXZlLmpzIiwid2VicGFjazovL2VuZ2xpc2hfZm9yX2tpZHMvLi9hc3NldHMvanMvY29tbW9uRnVuY3QuanMiLCJ3ZWJwYWNrOi8vZW5nbGlzaF9mb3Jfa2lkcy8uL2Fzc2V0cy9qcy9jb250ZW50LmpzIiwid2VicGFjazovL2VuZ2xpc2hfZm9yX2tpZHMvLi9hc3NldHMvanMvZ2FtZUNvbnRyb2wuanMiLCJ3ZWJwYWNrOi8vZW5nbGlzaF9mb3Jfa2lkcy8uL2Fzc2V0cy9qcy9tYWluQ2FyZHMuanMiLCJ3ZWJwYWNrOi8vZW5nbGlzaF9mb3Jfa2lkcy8uL2Fzc2V0cy9qcy9tZW51LmpzIiwid2VicGFjazovL2VuZ2xpc2hfZm9yX2tpZHMvLi9hc3NldHMvanMvc3Rhci5qcyIsIndlYnBhY2s6Ly9lbmdsaXNoX2Zvcl9raWRzLy4vYXNzZXRzL2pzL3N0YXRTdG9yYWdlLmpzIiwid2VicGFjazovL2VuZ2xpc2hfZm9yX2tpZHMvLi9hc3NldHMvanMvc3RhdGlzdGljLmpzIiwid2VicGFjazovL2VuZ2xpc2hfZm9yX2tpZHMvLi9hc3NldHMvanMvc3dpdGNoLmpzIiwid2VicGFjazovL2VuZ2xpc2hfZm9yX2tpZHMvLi9hc3NldHMvc3R5bGVzL25vcm1hbGl6ZS5jc3MiLCJ3ZWJwYWNrOi8vZW5nbGlzaF9mb3Jfa2lkcy8uL2Fzc2V0cy9zdHlsZXMvcmVzZXQuY3NzIiwid2VicGFjazovL2VuZ2xpc2hfZm9yX2tpZHMvLi9hc3NldHMvc3R5bGVzL3N0eWxlLmNzcyIsIndlYnBhY2s6Ly9lbmdsaXNoX2Zvcl9raWRzLy4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL2FwaS5qcyIsIndlYnBhY2s6Ly9lbmdsaXNoX2Zvcl9raWRzLy4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL2dldFVybC5qcyIsIndlYnBhY2s6Ly9lbmdsaXNoX2Zvcl9raWRzLy4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL3NvdXJjZU1hcHMuanMiLCJ3ZWJwYWNrOi8vZW5nbGlzaF9mb3Jfa2lkcy8uL2Fzc2V0cy9zdHlsZXMvbm9ybWFsaXplLmNzcz8zOGVlIiwid2VicGFjazovL2VuZ2xpc2hfZm9yX2tpZHMvLi9hc3NldHMvc3R5bGVzL3Jlc2V0LmNzcz85YjdhIiwid2VicGFjazovL2VuZ2xpc2hfZm9yX2tpZHMvLi9hc3NldHMvc3R5bGVzL3N0eWxlLmNzcz85YmJlIiwid2VicGFjazovL2VuZ2xpc2hfZm9yX2tpZHMvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbmplY3RTdHlsZXNJbnRvU3R5bGVUYWcuanMiLCJ3ZWJwYWNrOi8vZW5nbGlzaF9mb3Jfa2lkcy8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydEJ5U2VsZWN0b3IuanMiLCJ3ZWJwYWNrOi8vZW5nbGlzaF9mb3Jfa2lkcy8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydFN0eWxlRWxlbWVudC5qcyIsIndlYnBhY2s6Ly9lbmdsaXNoX2Zvcl9raWRzLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzLmpzIiwid2VicGFjazovL2VuZ2xpc2hfZm9yX2tpZHMvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZURvbUFQSS5qcyIsIndlYnBhY2s6Ly9lbmdsaXNoX2Zvcl9raWRzLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVUYWdUcmFuc2Zvcm0uanMiLCJ3ZWJwYWNrOi8vZW5nbGlzaF9mb3Jfa2lkcy93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9lbmdsaXNoX2Zvcl9raWRzL3dlYnBhY2svcnVudGltZS9jb21wYXQgZ2V0IGRlZmF1bHQgZXhwb3J0Iiwid2VicGFjazovL2VuZ2xpc2hfZm9yX2tpZHMvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL2VuZ2xpc2hfZm9yX2tpZHMvd2VicGFjay9ydW50aW1lL2dsb2JhbCIsIndlYnBhY2s6Ly9lbmdsaXNoX2Zvcl9raWRzL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vZW5nbGlzaF9mb3Jfa2lkcy93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL2VuZ2xpc2hfZm9yX2tpZHMvd2VicGFjay9ydW50aW1lL3B1YmxpY1BhdGgiLCJ3ZWJwYWNrOi8vZW5nbGlzaF9mb3Jfa2lkcy93ZWJwYWNrL3J1bnRpbWUvanNvbnAgY2h1bmsgbG9hZGluZyIsIndlYnBhY2s6Ly9lbmdsaXNoX2Zvcl9raWRzL3dlYnBhY2svcnVudGltZS9ub25jZSIsIndlYnBhY2s6Ly9lbmdsaXNoX2Zvcl9raWRzLy4vc3JjL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbIi8qIGVzbGludC1kaXNhYmxlIGxpbmVicmVhay1zdHlsZSAqL1xyXG4vKiBlc2xpbnQtZGlzYWJsZSBuby1jb25zb2xlICovXHJcbi8qIGVzbGludC1kaXNhYmxlIGxpbmVicmVhay1zdHlsZSAqL1xyXG4vKiBlc2xpbnQtZGlzYWJsZSBuby11bmRlZiAqL1xyXG5cclxuaW1wb3J0IE1lbnVFbGVtZW50IGZyb20gJy4vbWVudSc7XHJcbmltcG9ydCBDb250ZW50Q29udGFpbmVyIGZyb20gJy4vY29udGVudCc7XHJcbmltcG9ydCBTd2l0Y2hFbGVtZW50IGZyb20gJy4vc3dpdGNoJztcclxuaW1wb3J0IEdhbWVDb250cm9sIGZyb20gJy4vZ2FtZUNvbnRyb2wnO1xyXG5pbXBvcnQgU3RhdGlzdGljIGZyb20gJy4vc3RhdGlzdGljJztcclxuXHJcbmNsYXNzIEFwcENvbnRyb2wge1xyXG4gIGNvbnN0cnVjdG9yKHRvcGljc0FyciwgY2FyZHNBcnIsIG1haW5DYXJkcykge1xyXG4gICAgdGhpcy50b3BpY3NBcnIgPSB0b3BpY3NBcnI7XHJcbiAgICB0aGlzLmNhcmRzQXJyID0gY2FyZHNBcnI7XHJcbiAgICB0aGlzLm1haW5DYXJkcyA9IG1haW5DYXJkcztcclxuXHJcbiAgICB0aGlzLm1lbnUgPSBuZXcgTWVudUVsZW1lbnQodGhpcy50b3BpY3NBcnIpXHJcbiAgICAgIC5hZGRUb0RvYygpO1xyXG5cclxuICAgIHRoaXMuYWN0aXZlUGFnZSA9IHRoaXMubWVudS5hY3RpdmVQYWdlO1xyXG5cclxuICAgIHRoaXMuc3dpdGNoT2JqID0gbmV3IFN3aXRjaEVsZW1lbnQoKVxyXG4gICAgICAuYWRkVG9Eb2MoKTtcclxuXHJcbiAgICB0aGlzLmFjdGl2ZU1vZGUgPSB0aGlzLnN3aXRjaE9iai5hY3RpdmVNb2RlO1xyXG5cclxuICAgIHRoaXMuZ2FtZUNvbnRyb2wgPSBuZXcgR2FtZUNvbnRyb2wodGhpcylcclxuICAgICAgLmFkZFRvRG9jKCk7XHJcblxyXG4gICAgdGhpcy5jb250ZW50ID0gbmV3IENvbnRlbnRDb250YWluZXIodGhpcylcclxuICAgICAgLmFkZFRvRG9jKCk7XHJcblxyXG4gICAgdGhpcy5zdGF0ID0gbmV3IFN0YXRpc3RpYyh0aGlzKTtcclxuICB9XHJcblxyXG4gIGdldCBhY3RpdmVQYWdlKCkge1xyXG4gICAgcmV0dXJuIHRoaXMubWVudS5hY3RpdmVQYWdlO1xyXG4gIH1cclxuXHJcbiAgc2V0IGFjdGl2ZVBhZ2UodmFsdWUpIHtcclxuICAgIHRoaXMubWVudS5hY3RpdmVQYWdlID0gdmFsdWU7XHJcbiAgfVxyXG5cclxuICBnZXQgYWN0aXZlTW9kZSgpIHtcclxuICAgIHJldHVybiB0aGlzLnN3aXRjaE9iai5hY3RpdmVNb2RlO1xyXG4gIH1cclxuXHJcbiAgc2V0IGFjdGl2ZU1vZGUodmFsdWUpIHtcclxuICAgIHRoaXMuc3dpdGNoT2JqLmFjdGl2ZU1vZGUgPSB2YWx1ZTtcclxuICB9XHJcblxyXG4gIGdldCBhY3RpdmVBcnJDYXJkc09iaigpIHtcclxuICAgIGNvbnN0IGkgPSB0aGlzLnRvcGljc0Fyci5maW5kSW5kZXgoKGl0ZW0pID0+IGl0ZW0udG9Mb3dlckNhc2UoKSA9PT0gdGhpcy5hY3RpdmVQYWdlKTtcclxuICAgIHJldHVybiB0aGlzLmNhcmRzQXJyW2ldO1xyXG4gIH1cclxuXHJcbiAgc2V0IGFjdGl2ZUFyckNhcmRzT2JqKGFyckNhcmRzT2JqKSB7XHJcbiAgICB0aGlzLmFjdGl2ZUFyckNhcmRzT2JqID0gYXJyQ2FyZHNPYmo7XHJcbiAgfVxyXG5cclxuICBjaGFuZ2VQYWdlKHBhZ2VOYW1lKSB7XHJcbiAgICB0aGlzLm1lbnUuc2V0QWN0aXZlVG9waWMocGFnZU5hbWUpO1xyXG4gICAgdGhpcy5jb250ZW50LmNoYW5nZUNvbnRlbnQocGFnZU5hbWUpO1xyXG4gICAgaWYgKHRoaXMuYWN0aXZlTW9kZSA9PT0gJ3BsYXknICYmICh0aGlzLmNvbnRlbnQuZ2V0VmFsaWRUb3BpY1R5cGUodGhpcy5hY3RpdmVQYWdlKSA9PT0gJ3RvcGljJykpIHtcclxuICAgICAgdGhpcy5nYW1lQ29udHJvbC5zaG93KCk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLmdhbWVDb250cm9sLmhpZGUoKTtcclxuICAgIH1cclxuICAgIHJldHVybiB0aGlzO1xyXG4gIH1cclxuXHJcbiAgcGxheUNhcmRTb3VuZChjYXJkT2JqKSB7XHJcbiAgICBjb25zdCBhdWRpb0VsZW1lbnQgPSBuZXcgQXVkaW8oYC4uL2Fzc2V0cy8ke2NhcmRPYmouYXVkaW9TcmN9YCk7XHJcbiAgICBhdWRpb0VsZW1lbnQucGxheSgpO1xyXG4gICAgcmV0dXJuIHRoaXM7XHJcbiAgfVxyXG5cclxuICBwbGF5QXBwU291bmQoc291bmROYW1lKSB7XHJcbiAgICBjb25zdCBzb3VuZHNMaWJyYXJ5ID0ge1xyXG4gICAgICBjb3JyZWN0OiAnYXBwL2NvcnJlY3QubXAzJyxcclxuICAgICAgd3Jvbmc6ICdhcHAvZXJyb3IubXAzJyxcclxuICAgICAgc3VjY2VzczogJ2FwcC9zdWNjZXNzLm1wMycsXHJcbiAgICAgIGZhaWx1cmU6ICdhcHAvZmFpbHVyZS5tcDMnLFxyXG4gICAgfTtcclxuXHJcbiAgICBjb25zdCBhdWRpb0VsZW1lbnQgPSBuZXcgQXVkaW8oYC4uL2Fzc2V0cy9hdWRpby8ke3NvdW5kc0xpYnJhcnlbc291bmROYW1lXX1gKTtcclxuICAgIGF1ZGlvRWxlbWVudC5wbGF5KCk7XHJcbiAgICByZXR1cm4gdGhpcztcclxuICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IEFwcENvbnRyb2w7XHJcbiIsIi8qIGVzbGludC1kaXNhYmxlIGxpbmVicmVhay1zdHlsZSAqL1xyXG5pbXBvcnQgeyBjcmVhdGVDdXN0b21FbGVtZW50IH0gZnJvbSAnLi9jb21tb25GdW5jdCc7XHJcblxyXG5jbGFzcyBDYXJkIHtcclxuICBjb25zdHJ1Y3RvcihhcHBDdHJsT2JqLCBjYXJkT2JqLCB0eXBlID0gJ21haW4gcGFnZScpIHtcclxuICAgIHRoaXMuYXBwQ3RybE9iaiA9IGFwcEN0cmxPYmo7XHJcbiAgICB0aGlzLnR5cGUgPSB0eXBlO1xyXG4gICAgdGhpcy52YWxpZFR5cGVzID0gWydtYWluIHBhZ2UnLCAndG9waWMnXTtcclxuICAgIHRoaXMuZWxlbWVudCA9IG51bGw7XHJcbiAgICB0aGlzLmJ1aWxkKGNhcmRPYmopO1xyXG4gIH1cclxuXHJcbiAgYnVpbGQoY2FyZE9iaikge1xyXG4gICAgbGV0IHRlbXBsYXRlO1xyXG4gICAgbGV0IGNsYXNzTmFtZXMgPSAnY2FyZCBidXR0b24nO1xyXG4gICAgc3dpdGNoICh0aGlzLnR5cGUpIHtcclxuICAgICAgY2FzZSAnbWFpbiBwYWdlJzpcclxuICAgICAgICB0ZW1wbGF0ZSA9IGBcclxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiY2FyZC1jb250ZW50XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJncmFwaGljIGNhcmQtZ3JhcGhpY1wiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGltZyBjbGFzcz1cImNhcmQtaW1hZ2VcIiBzcmM9XCIuLi9hc3NldHMvJHtjYXJkT2JqLmltYWdlfVwiIGFsdD1cIlNlY3Rpb24gJHtjYXJkT2JqLmNhcmROYW1lfVwiIHdpZHRoPVwiMzkwXCIgaGVpZ2h0PVwiMjYwXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8cCBjbGFzcz1cImNhcmQtdGV4dFwiPiR7Y2FyZE9iai5jYXJkTmFtZX08L3A+XHJcbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgIGA7XHJcbiAgICAgICAgY2xhc3NOYW1lcyArPSAnIGNhcmQtbWFpbi1wYWdlJztcclxuICAgICAgICBicmVhaztcclxuICAgICAgY2FzZSAndG9waWMnOlxyXG4gICAgICAgIGlmICh0aGlzLmFwcEN0cmxPYmouYWN0aXZlTW9kZSA9PT0gJ3RyYWluJykge1xyXG4gICAgICAgICAgdGVtcGxhdGUgPSBgXHJcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImNhcmQtY29udGVudFwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiZ3JhcGhpYyBjYXJkLWdyYXBoaWNcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxpbWcgY2xhc3M9XCJjYXJkLWltYWdlXCIgc3JjPVwiLi4vYXNzZXRzLyR7Y2FyZE9iai5pbWFnZX1cIiBhbHQ9XCIke2NhcmRPYmoud29yZH1cIiB3aWR0aD1cIjM5MFwiIGhlaWdodD1cIjI2MFwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPHAgY2xhc3M9XCJjYXJkLXRleHRcIj4ke2NhcmRPYmoud29yZH08L3A+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJidXR0b24gY2FyZC1mbGlwLWJ1dHRvblwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICBgO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICB0ZW1wbGF0ZSA9IGBcclxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiY2FyZC1jb250ZW50XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJncmFwaGljIGNhcmQtZ3JhcGhpY1wiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGltZyBjbGFzcz1cImNhcmQtaW1hZ2VcIiBzcmM9XCIuLi9hc3NldHMvJHtjYXJkT2JqLmltYWdlfVwiIGFsdD1cIiR7Y2FyZE9iai53b3JkfVwiIHdpZHRoPVwiMzkwXCIgaGVpZ2h0PVwiMjYwXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgIGA7XHJcbiAgICAgICAgICBjbGFzc05hbWVzICs9ICcgZ2FtZS1jYXJkJztcclxuICAgICAgICB9XHJcbiAgICAgICAgY2xhc3NOYW1lcyArPSAnIGNhcmQtdG9waWMnO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBkZWZhdWx0OlxyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMuZWxlbWVudCA9IGNyZWF0ZUN1c3RvbUVsZW1lbnQoJ2RpdicsIGNsYXNzTmFtZXMsIHRlbXBsYXRlKTtcclxuICAgIHJldHVybiB0aGlzO1xyXG4gIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgQ2FyZDtcclxuIiwiLyogZXNsaW50LWRpc2FibGUgbGluZWJyZWFrLXN0eWxlICovXHJcbmNvbnN0IGNhcmRzID0gW1xyXG4gIFsnQWN0aW9uIChzZXQgQSknLCAnQWN0aW9uIChzZXQgQiknLCAnQW5pbWFsIChzZXQgQSknLCAnQW5pbWFsIChzZXQgQiknLCAnQ2xvdGhlcycsICdFbW90aW9ucyddLFxyXG4gIFtcclxuICAgIHtcclxuICAgICAgd29yZDogJ2NyeScsXHJcbiAgICAgIHRyYW5zbGF0aW9uOiAn0L/Qu9Cw0LrQsNGC0YwnLFxyXG4gICAgICBpbWFnZTogJ2ltZy9jcnkuanBnJyxcclxuICAgICAgYXVkaW9TcmM6ICdhdWRpby9jcnkubXAzJyxcclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgIHdvcmQ6ICdkYW5jZScsXHJcbiAgICAgIHRyYW5zbGF0aW9uOiAn0YLQsNC90YbQtdCy0LDRgtGMJyxcclxuICAgICAgaW1hZ2U6ICdpbWcvZGFuY2UuanBnJyxcclxuICAgICAgYXVkaW9TcmM6ICdhdWRpby9kYW5jZS5tcDMnLFxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgd29yZDogJ2RpdmUnLFxyXG4gICAgICB0cmFuc2xhdGlvbjogJ9C90YvRgNGP0YLRjCcsXHJcbiAgICAgIGltYWdlOiAnaW1nL2RpdmUuanBnJyxcclxuICAgICAgYXVkaW9TcmM6ICdhdWRpby9kaXZlLm1wMycsXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICB3b3JkOiAnZHJhdycsXHJcbiAgICAgIHRyYW5zbGF0aW9uOiAn0YDQuNGB0L7QstCw0YLRjCcsXHJcbiAgICAgIGltYWdlOiAnaW1nL2RyYXcuanBnJyxcclxuICAgICAgYXVkaW9TcmM6ICdhdWRpby9kcmF3Lm1wMycsXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICB3b3JkOiAnZmlzaCcsXHJcbiAgICAgIHRyYW5zbGF0aW9uOiAn0LvQvtCy0LjRgtGMINGA0YvQsdGDJyxcclxuICAgICAgaW1hZ2U6ICdpbWcvZmlzaC5qcGcnLFxyXG4gICAgICBhdWRpb1NyYzogJ2F1ZGlvL2Zpc2gubXAzJyxcclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgIHdvcmQ6ICdmbHknLFxyXG4gICAgICB0cmFuc2xhdGlvbjogJ9C70LXRgtCw0YLRjCcsXHJcbiAgICAgIGltYWdlOiAnaW1nL2ZseS5qcGcnLFxyXG4gICAgICBhdWRpb1NyYzogJ2F1ZGlvL2ZseS5tcDMnLFxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgd29yZDogJ2h1ZycsXHJcbiAgICAgIHRyYW5zbGF0aW9uOiAn0L7QsdC90LjQvNCw0YLRjCcsXHJcbiAgICAgIGltYWdlOiAnaW1nL2h1Zy5qcGcnLFxyXG4gICAgICBhdWRpb1NyYzogJ2F1ZGlvL2h1Zy5tcDMnLFxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgd29yZDogJ2p1bXAnLFxyXG4gICAgICB0cmFuc2xhdGlvbjogJ9C/0YDRi9Cz0LDRgtGMJyxcclxuICAgICAgaW1hZ2U6ICdpbWcvanVtcC5qcGcnLFxyXG4gICAgICBhdWRpb1NyYzogJ2F1ZGlvL2p1bXAubXAzJyxcclxuICAgIH0sXHJcbiAgXSxcclxuICBbXHJcbiAgICB7XHJcbiAgICAgIHdvcmQ6ICdvcGVuJyxcclxuICAgICAgdHJhbnNsYXRpb246ICfQvtGC0LrRgNGL0LLQsNGC0YwnLFxyXG4gICAgICBpbWFnZTogJ2ltZy9vcGVuLmpwZycsXHJcbiAgICAgIGF1ZGlvU3JjOiAnYXVkaW8vb3Blbi5tcDMnLFxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgd29yZDogJ3BsYXknLFxyXG4gICAgICB0cmFuc2xhdGlvbjogJ9C40LPRgNCw0YLRjCcsXHJcbiAgICAgIGltYWdlOiAnaW1nL3BsYXkuanBnJyxcclxuICAgICAgYXVkaW9TcmM6ICdhdWRpby9wbGF5Lm1wMycsXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICB3b3JkOiAncG9pbnQnLFxyXG4gICAgICB0cmFuc2xhdGlvbjogJ9GD0LrQsNC30YvQstCw0YLRjCcsXHJcbiAgICAgIGltYWdlOiAnaW1nL3BvaW50LmpwZycsXHJcbiAgICAgIGF1ZGlvU3JjOiAnYXVkaW8vcG9pbnQubXAzJyxcclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgIHdvcmQ6ICdyaWRlJyxcclxuICAgICAgdHJhbnNsYXRpb246ICfQtdC30LTQuNGC0YwnLFxyXG4gICAgICBpbWFnZTogJ2ltZy9yaWRlLmpwZycsXHJcbiAgICAgIGF1ZGlvU3JjOiAnYXVkaW8vcmlkZS5tcDMnLFxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgd29yZDogJ3J1bicsXHJcbiAgICAgIHRyYW5zbGF0aW9uOiAn0LHQtdCz0LDRgtGMJyxcclxuICAgICAgaW1hZ2U6ICdpbWcvcnVuLmpwZycsXHJcbiAgICAgIGF1ZGlvU3JjOiAnYXVkaW8vcnVuLm1wMycsXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICB3b3JkOiAnc2luZycsXHJcbiAgICAgIHRyYW5zbGF0aW9uOiAn0L/QtdGC0YwnLFxyXG4gICAgICBpbWFnZTogJ2ltZy9zaW5nLmpwZycsXHJcbiAgICAgIGF1ZGlvU3JjOiAnYXVkaW8vc2luZy5tcDMnLFxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgd29yZDogJ3NraXAnLFxyXG4gICAgICB0cmFuc2xhdGlvbjogJ9C/0YDQvtC/0YPRgdC60LDRgtGMLCDQv9GA0YvQs9Cw0YLRjCcsXHJcbiAgICAgIGltYWdlOiAnaW1nL3NraXAuanBnJyxcclxuICAgICAgYXVkaW9TcmM6ICdhdWRpby9za2lwLm1wMycsXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICB3b3JkOiAnc3dpbScsXHJcbiAgICAgIHRyYW5zbGF0aW9uOiAn0L/Qu9Cw0LLQsNGC0YwnLFxyXG4gICAgICBpbWFnZTogJ2ltZy9zd2ltLmpwZycsXHJcbiAgICAgIGF1ZGlvU3JjOiAnYXVkaW8vc3dpbS5tcDMnLFxyXG4gICAgfSxcclxuICBdLFxyXG4gIFtcclxuICAgIHtcclxuICAgICAgd29yZDogJ2NhdCcsXHJcbiAgICAgIHRyYW5zbGF0aW9uOiAn0LrQvtGCJyxcclxuICAgICAgaW1hZ2U6ICdpbWcvY2F0LmpwZycsXHJcbiAgICAgIGF1ZGlvU3JjOiAnYXVkaW8vY2F0Lm1wMycsXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICB3b3JkOiAnY2hpY2snLFxyXG4gICAgICB0cmFuc2xhdGlvbjogJ9GG0YvQv9C70ZHQvdC+0LonLFxyXG4gICAgICBpbWFnZTogJ2ltZy9jaGljay5qcGcnLFxyXG4gICAgICBhdWRpb1NyYzogJ2F1ZGlvL2NoaWNrLm1wMycsXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICB3b3JkOiAnY2hpY2tlbicsXHJcbiAgICAgIHRyYW5zbGF0aW9uOiAn0LrRg9GA0LjRhtCwJyxcclxuICAgICAgaW1hZ2U6ICdpbWcvY2hpY2tlbi5qcGcnLFxyXG4gICAgICBhdWRpb1NyYzogJ2F1ZGlvL2NoaWNrZW4ubXAzJyxcclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgIHdvcmQ6ICdkb2cnLFxyXG4gICAgICB0cmFuc2xhdGlvbjogJ9GB0L7QsdCw0LrQsCcsXHJcbiAgICAgIGltYWdlOiAnaW1nL2RvZy5qcGcnLFxyXG4gICAgICBhdWRpb1NyYzogJ2F1ZGlvL2RvZy5tcDMnLFxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgd29yZDogJ2hvcnNlJyxcclxuICAgICAgdHJhbnNsYXRpb246ICfQu9C+0YjQsNC00YwnLFxyXG4gICAgICBpbWFnZTogJ2ltZy9ob3JzZS5qcGcnLFxyXG4gICAgICBhdWRpb1NyYzogJ2F1ZGlvL2hvcnNlLm1wMycsXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICB3b3JkOiAncGlnJyxcclxuICAgICAgdHJhbnNsYXRpb246ICfRgdCy0LjQvdGM0Y8nLFxyXG4gICAgICBpbWFnZTogJ2ltZy9waWcuanBnJyxcclxuICAgICAgYXVkaW9TcmM6ICdhdWRpby9waWcubXAzJyxcclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgIHdvcmQ6ICdyYWJiaXQnLFxyXG4gICAgICB0cmFuc2xhdGlvbjogJ9C60YDQvtC70LjQuicsXHJcbiAgICAgIGltYWdlOiAnaW1nL3JhYmJpdC5qcGcnLFxyXG4gICAgICBhdWRpb1NyYzogJ2F1ZGlvL3JhYmJpdC5tcDMnLFxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgd29yZDogJ3NoZWVwJyxcclxuICAgICAgdHJhbnNsYXRpb246ICfQvtCy0YbQsCcsXHJcbiAgICAgIGltYWdlOiAnaW1nL3NoZWVwLmpwZycsXHJcbiAgICAgIGF1ZGlvU3JjOiAnYXVkaW8vc2hlZXAubXAzJyxcclxuICAgIH0sXHJcbiAgXSxcclxuICBbXHJcbiAgICB7XHJcbiAgICAgIHdvcmQ6ICdiaXJkJyxcclxuICAgICAgdHJhbnNsYXRpb246ICfQv9GC0LjRhtCwJyxcclxuICAgICAgaW1hZ2U6ICdpbWcvYmlyZC5qcGcnLFxyXG4gICAgICBhdWRpb1NyYzogJ2F1ZGlvL2JpcmQubXAzJyxcclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgIHdvcmQ6ICdmaXNoJyxcclxuICAgICAgdHJhbnNsYXRpb246ICfRgNGL0LHQsCcsXHJcbiAgICAgIGltYWdlOiAnaW1nL2Zpc2gxLmpwZycsXHJcbiAgICAgIGF1ZGlvU3JjOiAnYXVkaW8vZmlzaC5tcDMnLFxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgd29yZDogJ2Zyb2cnLFxyXG4gICAgICB0cmFuc2xhdGlvbjogJ9C20LDQsdCwJyxcclxuICAgICAgaW1hZ2U6ICdpbWcvZnJvZy5qcGcnLFxyXG4gICAgICBhdWRpb1NyYzogJ2F1ZGlvL2Zyb2cubXAzJyxcclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgIHdvcmQ6ICdnaXJhZmZlJyxcclxuICAgICAgdHJhbnNsYXRpb246ICfQttC40YDQsNGE0LAnLFxyXG4gICAgICBpbWFnZTogJ2ltZy9naXJhZmZlLmpwZycsXHJcbiAgICAgIGF1ZGlvU3JjOiAnYXVkaW8vZ2lyYWZmZS5tcDMnLFxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgd29yZDogJ2xpb24nLFxyXG4gICAgICB0cmFuc2xhdGlvbjogJ9C70LXQsicsXHJcbiAgICAgIGltYWdlOiAnaW1nL2xpb24uanBnJyxcclxuICAgICAgYXVkaW9TcmM6ICdhdWRpby9saW9uLm1wMycsXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICB3b3JkOiAnbW91c2UnLFxyXG4gICAgICB0cmFuc2xhdGlvbjogJ9C80YvRiNGMJyxcclxuICAgICAgaW1hZ2U6ICdpbWcvbW91c2UuanBnJyxcclxuICAgICAgYXVkaW9TcmM6ICdhdWRpby9tb3VzZS5tcDMnLFxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgd29yZDogJ3R1cnRsZScsXHJcbiAgICAgIHRyYW5zbGF0aW9uOiAn0YfQtdGA0LXQv9Cw0YXQsCcsXHJcbiAgICAgIGltYWdlOiAnaW1nL3R1cnRsZS5qcGcnLFxyXG4gICAgICBhdWRpb1NyYzogJ2F1ZGlvL3R1cnRsZS5tcDMnLFxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgd29yZDogJ2RvbHBoaW4nLFxyXG4gICAgICB0cmFuc2xhdGlvbjogJ9C00LXQu9GM0YTQuNC9JyxcclxuICAgICAgaW1hZ2U6ICdpbWcvZG9scGhpbi5qcGcnLFxyXG4gICAgICBhdWRpb1NyYzogJ2F1ZGlvL2RvbHBoaW4ubXAzJyxcclxuICAgIH0sXHJcbiAgXSxcclxuICBbXHJcbiAgICB7XHJcbiAgICAgIHdvcmQ6ICdza2lydCcsXHJcbiAgICAgIHRyYW5zbGF0aW9uOiAn0Y7QsdC60LAnLFxyXG4gICAgICBpbWFnZTogJ2ltZy9za2lydC5qcGcnLFxyXG4gICAgICBhdWRpb1NyYzogJ2F1ZGlvL3NraXJ0Lm1wMycsXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICB3b3JkOiAncGFudHMnLFxyXG4gICAgICB0cmFuc2xhdGlvbjogJ9Cx0YDRjtC60LgnLFxyXG4gICAgICBpbWFnZTogJ2ltZy9wYW50cy5qcGcnLFxyXG4gICAgICBhdWRpb1NyYzogJ2F1ZGlvL3BhbnRzLm1wMycsXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICB3b3JkOiAnYmxvdXNlJyxcclxuICAgICAgdHJhbnNsYXRpb246ICfQsdC70YPQt9C60LAnLFxyXG4gICAgICBpbWFnZTogJ2ltZy9ibG91c2UuanBnJyxcclxuICAgICAgYXVkaW9TcmM6ICdhdWRpby9ibG91c2UubXAzJyxcclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgIHdvcmQ6ICdkcmVzcycsXHJcbiAgICAgIHRyYW5zbGF0aW9uOiAn0L/Qu9Cw0YLRjNC1JyxcclxuICAgICAgaW1hZ2U6ICdpbWcvZHJlc3MuanBnJyxcclxuICAgICAgYXVkaW9TcmM6ICdhdWRpby9kcmVzcy5tcDMnLFxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgd29yZDogJ2Jvb3QnLFxyXG4gICAgICB0cmFuc2xhdGlvbjogJ9Cx0L7RgtC40L3QvtC6JyxcclxuICAgICAgaW1hZ2U6ICdpbWcvYm9vdC5qcGcnLFxyXG4gICAgICBhdWRpb1NyYzogJ2F1ZGlvL2Jvb3QubXAzJyxcclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgIHdvcmQ6ICdzaGlydCcsXHJcbiAgICAgIHRyYW5zbGF0aW9uOiAn0YDRg9Cx0LDRiNC60LAnLFxyXG4gICAgICBpbWFnZTogJ2ltZy9zaGlydC5qcGcnLFxyXG4gICAgICBhdWRpb1NyYzogJ2F1ZGlvL3NoaXJ0Lm1wMycsXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICB3b3JkOiAnY29hdCcsXHJcbiAgICAgIHRyYW5zbGF0aW9uOiAn0L/QsNC70YzRgtC+JyxcclxuICAgICAgaW1hZ2U6ICdpbWcvY29hdC5qcGcnLFxyXG4gICAgICBhdWRpb1NyYzogJ2F1ZGlvL2NvYXQubXAzJyxcclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgIHdvcmQ6ICdzaG9lJyxcclxuICAgICAgdHJhbnNsYXRpb246ICfRgtGD0YTQu9C4JyxcclxuICAgICAgaW1hZ2U6ICdpbWcvc2hvZS5qcGcnLFxyXG4gICAgICBhdWRpb1NyYzogJ2F1ZGlvL3Nob2UubXAzJyxcclxuICAgIH0sXHJcbiAgXSxcclxuICBbXHJcbiAgICB7XHJcbiAgICAgIHdvcmQ6ICdzYWQnLFxyXG4gICAgICB0cmFuc2xhdGlvbjogJ9Cz0YDRg9GB0YLQvdGL0LknLFxyXG4gICAgICBpbWFnZTogJ2ltZy9zYWQuanBnJyxcclxuICAgICAgYXVkaW9TcmM6ICdhdWRpby9zYWQubXAzJyxcclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgIHdvcmQ6ICdhbmdyeScsXHJcbiAgICAgIHRyYW5zbGF0aW9uOiAn0YHQtdGA0LTQuNGC0YvQuScsXHJcbiAgICAgIGltYWdlOiAnaW1nL2FuZ3J5LmpwZycsXHJcbiAgICAgIGF1ZGlvU3JjOiAnYXVkaW8vYW5ncnkubXAzJyxcclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgIHdvcmQ6ICdoYXBweScsXHJcbiAgICAgIHRyYW5zbGF0aW9uOiAn0YHRh9Cw0YHRgtC70LjQstGL0LknLFxyXG4gICAgICBpbWFnZTogJ2ltZy9oYXBweS5qcGcnLFxyXG4gICAgICBhdWRpb1NyYzogJ2F1ZGlvL2hhcHB5Lm1wMycsXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICB3b3JkOiAndGlyZWQnLFxyXG4gICAgICB0cmFuc2xhdGlvbjogJ9GD0YHRgtCw0LLRiNC40LknLFxyXG4gICAgICBpbWFnZTogJ2ltZy90aXJlZC5qcGcnLFxyXG4gICAgICBhdWRpb1NyYzogJ2F1ZGlvL3RpcmVkLm1wMycsXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICB3b3JkOiAnc3VycHJpc2VkJyxcclxuICAgICAgdHJhbnNsYXRpb246ICfRg9C00LjQstC70ZHQvdC90YvQuScsXHJcbiAgICAgIGltYWdlOiAnaW1nL3N1cnByaXNlZC5qcGcnLFxyXG4gICAgICBhdWRpb1NyYzogJ2F1ZGlvL3N1cnByaXNlZC5tcDMnLFxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgd29yZDogJ3NjYXJlZCcsXHJcbiAgICAgIHRyYW5zbGF0aW9uOiAn0LjRgdC/0YPQs9Cw0L3QvdGL0LknLFxyXG4gICAgICBpbWFnZTogJ2ltZy9zY2FyZWQuanBnJyxcclxuICAgICAgYXVkaW9TcmM6ICdhdWRpby9zY2FyZWQubXAzJyxcclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgIHdvcmQ6ICdzbWlsZScsXHJcbiAgICAgIHRyYW5zbGF0aW9uOiAn0YPQu9GL0LHQutCwJyxcclxuICAgICAgaW1hZ2U6ICdpbWcvc21pbGUuanBnJyxcclxuICAgICAgYXVkaW9TcmM6ICdhdWRpby9zbWlsZS5tcDMnLFxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgd29yZDogJ2xhdWdoJyxcclxuICAgICAgdHJhbnNsYXRpb246ICfRgdC80LXRhScsXHJcbiAgICAgIGltYWdlOiAnaW1nL2xhdWdoLmpwZycsXHJcbiAgICAgIGF1ZGlvU3JjOiAnYXVkaW8vbGF1Z2gubXAzJyxcclxuICAgIH0sXHJcbiAgXSxcclxuXTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNhcmRzO1xyXG4iLCIvKiBlc2xpbnQtZGlzYWJsZSBsaW5lYnJlYWstc3R5bGUgKi9cclxuLyogZXNsaW50LWRpc2FibGUgcHJlZmVyLWRlc3RydWN0dXJpbmcgKi9cclxuLyogZXNsaW50LWRpc2FibGUgbm8tdW51c2VkLXZhcnMgKi9cclxuLyogZXNsaW50LWRpc2FibGUgbm8tY29uc29sZSAqL1xyXG4vKiBlc2xpbnQtZGlzYWJsZSBuby11bmRlZiAqL1xyXG5cclxuZnVuY3Rpb24gY2xpY2tVc2VySW50ZXJhY3RpdmUoZXZlbnQsIGFwcEN0cmxPYmopIHtcclxuICBjb25zdCBhcHBDb250cm9sID0gYXBwQ3RybE9iajtcclxuICBjb25zdCBtZW51ID0gYXBwQ29udHJvbC5tZW51O1xyXG4gIGNvbnN0IGdhbWVDb250cm9sID0gYXBwQ29udHJvbC5nYW1lQ29udHJvbDtcclxuICBjb25zdCBzd2l0Y2hPYmogPSBhcHBDb250cm9sLnN3aXRjaE9iajtcclxuICBjb25zdCBjb250ZW50ID0gYXBwQ29udHJvbC5jb250ZW50O1xyXG4gIGNvbnN0IHRhcmdldENsYXNzTGlzdCA9IEFycmF5LmZyb20oZXZlbnQudGFyZ2V0LmNsYXNzTGlzdCk7XHJcbiAgY29uc3QgaXNHYW1lTW9kZSA9IChhcHBDb250cm9sLmFjdGl2ZU1vZGUgPT09ICdwbGF5Jyk7XHJcbiAgbGV0IGNhcmRFbGVtZW50O1xyXG4gIGxldCBhY3RpdmVNZW51RWxlbWVudDtcclxuXHJcbiAgc3dpdGNoICh0cnVlKSB7XHJcbiAgICAvLyAgY2xpY2tpbmcgb24gbWVudSBidXJnZXIgYnV0dG9uXHJcbiAgICBjYXNlICh0YXJnZXRDbGFzc0xpc3QuaW5jbHVkZXMoJ21lbnUtYnV0dG9uJykpOlxyXG4gICAgICBtZW51LnRvZ2dsZSgpO1xyXG4gICAgICBicmVhaztcclxuXHJcbiAgICAvLyAgY2xpY2tpbmcgYW55d2hlcmUgZWxzZSB3aGVuIGJ1cmdlciBtZW51IG9wZW5lZFxyXG4gICAgY2FzZSAoZG9jdW1lbnQucXVlcnlTZWxlY3RvcignYm9keScpLmNsYXNzTGlzdC5jb250YWlucygnb3BlbmVkLW1lbnUnKSAmJiAhdGFyZ2V0Q2xhc3NMaXN0LmluY2x1ZGVzKCdtZW51JykpOlxyXG4gICAgICBtZW51LmNsb3NlKCk7XHJcbiAgICAgIGlmICh0YXJnZXRDbGFzc0xpc3QuaW5jbHVkZXMoJ21lbnUtaXRlbScpKSB7XHJcbiAgICAgICAgYWN0aXZlTWVudUVsZW1lbnQgPSBldmVudC50YXJnZXQ7XHJcbiAgICAgICAgYXBwQ29udHJvbC5jaGFuZ2VQYWdlKGFjdGl2ZU1lbnVFbGVtZW50LmlubmVySFRNTCk7XHJcbiAgICAgICAgYXBwQ29udHJvbC5zd2l0Y2hPYmouZW5hYmxlKCk7XHJcbiAgICAgIH1cclxuICAgICAgYnJlYWs7XHJcblxyXG4gICAgLy8gIGNsaWNraW5nIG9uIHN3aXRjaCBidXR0b25cclxuICAgIGNhc2UgKHRhcmdldENsYXNzTGlzdC5pbmNsdWRlcygnc3dpdGNoLXRyaWdnZXInKVxyXG4gICAgICAgICAgJiYgIXN3aXRjaE9iai5lbGVtZW50LmNsYXNzTGlzdC5jb250YWlucygnZGlzYWJsZWQnKSk6IHtcclxuICAgICAgc3dpdGNoT2JqLnRvZ2dsZSgpO1xyXG4gICAgICBhcHBDb250cm9sLmNoYW5nZVBhZ2UoYXBwQ29udHJvbC5hY3RpdmVQYWdlKTtcclxuICAgICAgYnJlYWs7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gIGNsaWNraW5nIG9uIHN0YXJ0IGdhbWUgYnV0dG9uXHJcbiAgICBjYXNlICh0YXJnZXRDbGFzc0xpc3QuaW5jbHVkZXMoJ3N0YXJ0LWJ1dHRvbicpKToge1xyXG4gICAgICBnYW1lQ29udHJvbC5zdGFydEdhbWUoYXBwQ29udHJvbC5hY3RpdmVBcnJDYXJkc09iaik7XHJcbiAgICAgIGJyZWFrO1xyXG4gICAgfVxyXG5cclxuICAgIC8vICBjbGlja2luZyBvbiBzdGFydCBnYW1lIGJ1dHRvblxyXG4gICAgY2FzZSAodGFyZ2V0Q2xhc3NMaXN0LmluY2x1ZGVzKCdyZXBlYXQtYnV0dG9uJykpOiB7XHJcbiAgICAgIGdhbWVDb250cm9sLnJlcGVhdFF1ZXN0aW9uKCk7XHJcbiAgICAgIGJyZWFrO1xyXG4gICAgfVxyXG5cclxuICAgIC8vICBjbGlja2luZyBvbiBjYXJkIGZsaXAgYnV0dG9uXHJcbiAgICBjYXNlICh0YXJnZXRDbGFzc0xpc3QuaW5jbHVkZXMoJ2NhcmQtZmxpcC1idXR0b24nKSk6XHJcbiAgICAgIGNhcmRFbGVtZW50ID0gY29udGVudC5nZXRDYXJkRWxlbWVudEJ5VGFyZ2V0KGV2ZW50LnRhcmdldCk7XHJcbiAgICAgIGNvbnRlbnQuZmxpcENhcmQoY2FyZEVsZW1lbnQpO1xyXG4gICAgICBicmVhaztcclxuXHJcbiAgICAvLyAgY2xpY2tpbmcgb24gY2FyZFxyXG4gICAgY2FzZSAodGFyZ2V0Q2xhc3NMaXN0LnNvbWUoKGNsYXNzTmFtZSkgPT4gY29udGVudC52YWxpZENhcmRDbGFzc2VzLmluY2x1ZGVzKGNsYXNzTmFtZSkpKToge1xyXG4gICAgICBsZXQgY2FyZE9iajtcclxuICAgICAgY2FyZEVsZW1lbnQgPSBjb250ZW50LmdldENhcmRFbGVtZW50QnlUYXJnZXQoZXZlbnQudGFyZ2V0KTtcclxuXHJcbiAgICAgIGlmICghY2FyZEVsZW1lbnQuY2xhc3NMaXN0LmNvbnRhaW5zKCdjYXJkLW1haW4tcGFnZScpKSB7XHJcbiAgICAgICAgY29uc3QgY2FyZEltYWdlTmFtZSA9IGNvbnRlbnQuZ2V0Q2FyZEltYWdlTmFtZShjYXJkRWxlbWVudCk7XHJcbiAgICAgICAgY2FyZE9iaiA9IGNvbnRlbnQuZ2V0Q2FyZE9iakJ5SW1hZ2VOYW1lKGNhcmRJbWFnZU5hbWUpO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBpZiAoaXNHYW1lTW9kZSAmJiBnYW1lQ29udHJvbC5pc0dhbWVTdGFydGVkICYmICFjYXJkRWxlbWVudC5jbGFzc0xpc3QuY29udGFpbnMoJ2Rpc2FibGVkJykpIHtcclxuICAgICAgICBnYW1lQ29udHJvbC5wcm9jZXNzQW5zd2VyKGNhcmRPYmosIGNhcmRFbGVtZW50KTtcclxuICAgICAgICBicmVhaztcclxuICAgICAgfSBlbHNlIGlmIChjYXJkRWxlbWVudC5jbGFzc0xpc3QuY29udGFpbnMoJ2NhcmQtbWFpbi1wYWdlJykpIHtcclxuICAgICAgICBjb25zdCBwYWdlTmFtZSA9IGNvbnRlbnQuZ2V0Q2FyZElubmVyVGV4dChjYXJkRWxlbWVudCk7XHJcbiAgICAgICAgYWN0aXZlTWVudUVsZW1lbnQgPSBtZW51LmdldE1lbnVJdGVtQnlOYW1lKHBhZ2VOYW1lKTtcclxuICAgICAgICBhcHBDb250cm9sLmNoYW5nZVBhZ2UocGFnZU5hbWUpO1xyXG4gICAgICB9IGVsc2UgaWYgKCFjYXJkRWxlbWVudC5jbGFzc0xpc3QuY29udGFpbnMoJ2ZsaXBwZWQnKSAmJiAhY2FyZEVsZW1lbnQuY2xhc3NMaXN0LmNvbnRhaW5zKCdnYW1lLWNhcmQnKSkge1xyXG4gICAgICAgIGFwcENvbnRyb2wucGxheUNhcmRTb3VuZChjYXJkT2JqKTtcclxuICAgICAgICBhcHBDb250cm9sLnN0YXQuc3RvcmFnZS5hZGQoJ2NsaWNrJywgY2FyZE9iaik7XHJcbiAgICAgIH1cclxuICAgICAgYnJlYWs7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gIGNsaWNraW5nIG9uIHRhYmxlIGhlYWRlclxyXG4gICAgY2FzZSAodGFyZ2V0Q2xhc3NMaXN0LmluY2x1ZGVzKCdzb3J0YWJsZScpKTpcclxuICAgICAgYXBwQ29udHJvbC5zdGF0LnNvcnRUYWJsZShldmVudC50YXJnZXQpO1xyXG4gICAgICBjb250ZW50LmNoYW5nZUNvbnRlbnQoJ3N0YXRpc3RpYycpO1xyXG4gICAgICBicmVhaztcclxuXHJcbiAgICAvLyAgY2xpY2tpbmcgb24gcmVzZXQgYnV0dG9uXHJcbiAgICBjYXNlICh0YXJnZXRDbGFzc0xpc3QuaW5jbHVkZXMoJ3Jlc2V0LXN0YXQnKSk6XHJcbiAgICAgIGFwcENvbnRyb2wuc3RhdC5zdG9yYWdlLmNsZWFuU3RvcmFnZSgpO1xyXG4gICAgICBpZiAoYXBwQ29udHJvbC5jb250ZW50LnR5cGUgPT09ICdzdGF0aXN0aWMnKSB7XHJcbiAgICAgICAgY29udGVudC5jaGFuZ2VDb250ZW50KCdzdGF0aXN0aWMnKTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBjb250ZW50LmNoYW5nZUNvbnRlbnQoJ3RyYWluIGRpZmYnKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgYnJlYWs7XHJcblxyXG4gICAgLy8gIGNsaWNraW5nIG9uIHRyYWluIGRpZmYuIHdvcmRzIGJ1dHRvblxyXG4gICAgY2FzZSAodGFyZ2V0Q2xhc3NMaXN0LmluY2x1ZGVzKCd0cmFpbi1kaWZmJykpOlxyXG4gICAgICBzd2l0Y2hPYmoudHJhaW4oKTtcclxuICAgICAgc3dpdGNoT2JqLmRpc2FibGUoKTtcclxuICAgICAgYXBwQ29udHJvbC5zdGF0LnN0b3JhZ2UuZ2V0RGlmZldvcmRzQXJyKCk7XHJcbiAgICAgIGNvbnRlbnQuY2hhbmdlQ29udGVudCgndHJhaW4gZGlmZicpO1xyXG4gICAgICBicmVhaztcclxuXHJcbiAgICBkZWZhdWx0OlxyXG4gICAgICBicmVhaztcclxuICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsaWNrVXNlckludGVyYWN0aXZlO1xyXG4iLCIvKiBlc2xpbnQtZGlzYWJsZSBsaW5lYnJlYWstc3R5bGUgKi9cclxuLyogZXNsaW50LWRpc2FibGUgaW1wb3J0L3ByZWZlci1kZWZhdWx0LWV4cG9ydCAqL1xyXG4vKiBlc2xpbnQtZGlzYWJsZSBuby11bmRlZiAqL1xyXG5cclxuZnVuY3Rpb24gY3JlYXRlQ3VzdG9tRWxlbWVudCh0eXBlLCBjbGFzc05hbWUgPSAnJywgaW5uZXJIVE1MID0gJycpIHtcclxuICBjb25zdCBlbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCh0eXBlKTtcclxuICBlbGVtZW50LmNsYXNzTmFtZSA9IGNsYXNzTmFtZTtcclxuICBlbGVtZW50LmlubmVySFRNTCA9IGlubmVySFRNTDtcclxuICByZXR1cm4gZWxlbWVudDtcclxufVxyXG5cclxuZnVuY3Rpb24gZ2V0UmFuZG9tSW50KG1heEludCwgbWluSW50ID0gMCkge1xyXG4gIC8vICBtYXggYW5kIG1pbiBpbmNsdXNpdmVcclxuICByZXR1cm4gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogKG1heEludCAtIG1pbkludCArIDEpKSArIG1pbkludDtcclxufVxyXG5cclxuZXhwb3J0IHsgY3JlYXRlQ3VzdG9tRWxlbWVudCwgZ2V0UmFuZG9tSW50IH07XHJcbiIsIi8qIGVzbGludC1kaXNhYmxlIGxpbmVicmVhay1zdHlsZSAqL1xyXG4vKiBlc2xpbnQtZGlzYWJsZSBuby1yZXN0cmljdGVkLXN5bnRheCAqL1xyXG4vKiBlc2xpbnQtZGlzYWJsZSBsaW5lYnJlYWstc3R5bGUgKi9cclxuLyogZXNsaW50LWRpc2FibGUgbm8tY29uc29sZSAqL1xyXG4vKiBlc2xpbnQtZGlzYWJsZSBsaW5lYnJlYWstc3R5bGUgKi9cclxuLyogZXNsaW50LWRpc2FibGUgY2xhc3MtbWV0aG9kcy11c2UtdGhpcyAqL1xyXG4vKiBlc2xpbnQtZGlzYWJsZSBuby11bmRlZiAqL1xyXG5cclxuaW1wb3J0IENhcmQgZnJvbSAnLi9jYXJkJztcclxuaW1wb3J0IHsgY3JlYXRlQ3VzdG9tRWxlbWVudCB9IGZyb20gJy4vY29tbW9uRnVuY3QnO1xyXG5cclxuY2xhc3MgQ29udGVudENvbnRhaW5lciB7XHJcbiAgY29uc3RydWN0b3IoYXBwQ3RybE9iaiwgdHlwZSA9ICdtYWluIHBhZ2UnKSB7XHJcbiAgICB0aGlzLmFwcENvbnRyb2wgPSBhcHBDdHJsT2JqO1xyXG4gICAgdGhpcy50b3BpY3NBcnIgPSBhcHBDdHJsT2JqLnRvcGljc0FycjtcclxuICAgIHRoaXMuY2FyZHNBcnIgPSBhcHBDdHJsT2JqLmNhcmRzQXJyO1xyXG4gICAgdGhpcy5tZW51ID0gYXBwQ3RybE9iai5tZW51O1xyXG4gICAgdGhpcy52YWxpZFR5cGVzID0gWydtYWluIHBhZ2UnLCAndG9waWMnLCAnc3RhdGlzdGljJywgJ3RyYWluIGRpZmYnXTtcclxuICAgIHRoaXMudmFsaWRDYXJkQ2xhc3NlcyA9IFsnY2FyZCcsICdjYXJkLWNvbnRlbnQnLCAnY2FyZC10ZXh0JywgJ2NhcmQtZ3JhcGhpYycsICdjYXJkLWltYWdlJ107XHJcbiAgICB0aGlzLnR5cGUgPSB0aGlzLmdldFZhbGlkVHlwZSh0eXBlKTtcclxuICAgIFt0aGlzLmhlYWRlckVsZW1lbnRdID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnY29udGFpbmVyLWNlbnRlcmVkJyk7XHJcbiAgICB0aGlzLmNhcmRzQ29sbGVjdGlvbiA9IG51bGw7XHJcbiAgICB0aGlzLmdhbWVDYXRkc0NvbGxlY3Rpb24gPSBudWxsO1xyXG4gICAgdGhpcy5lbGVtZW50ID0gbnVsbDtcclxuICAgIHRoaXMuYnVpbGQoKTtcclxuICB9XHJcblxyXG4gIGJ1aWxkKCkge1xyXG4gICAgY29uc3QgY29udGVudFdyYXBwZXIgPSBjcmVhdGVDdXN0b21FbGVtZW50KCdkaXYnLCAnY29udGVudC13cmFwcGVyJyk7XHJcbiAgICBsZXQgY29udGVudEVsZW1lbnQ7XHJcblxyXG4gICAgc3dpdGNoICh0aGlzLnR5cGUpIHtcclxuICAgICAgY2FzZSAnc3RhdGlzdGljJzpcclxuICAgICAgICBpZiAoIXRoaXMuYXBwQ29udHJvbC5zdGF0LnNvcnRlZCkge1xyXG4gICAgICAgICAgdGhpcy5hcHBDb250cm9sLnN0YXQuYnVpbGQoKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgdGhpcy5hcHBDb250cm9sLnN0YXQuc29ydGVkID0gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNvbnRlbnRFbGVtZW50ID0gdGhpcy5hcHBDb250cm9sLnN0YXQuZWxlbWVudDtcclxuICAgICAgICBicmVhaztcclxuICAgICAgY2FzZSAndHJhaW4gZGlmZic6XHJcbiAgICAgICAgdGhpcy5hcHBDb250cm9sLnN0YXQuYnVpbGQoKTtcclxuICAgICAgICBjb250ZW50RWxlbWVudCA9IHRoaXMuYXBwQ29udHJvbC5zdGF0LmVsZW1lbnQ7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIGNhc2UgJ21haW4gcGFnZSc6XHJcbiAgICAgICAgY29udGVudEVsZW1lbnQgPSB0aGlzLmNyZWF0ZU1haW5DYXJkc0NvbnRhaW5lcigpO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBjYXNlICd0b3BpYyc6IHtcclxuICAgICAgICBjb250ZW50RWxlbWVudCA9IHRoaXMuY3JlYXRlVG9waWNDYXJkc0NvbnRlbnQoKTtcclxuICAgICAgICBicmVhaztcclxuICAgICAgfVxyXG4gICAgICBkZWZhdWx0OlxyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgfVxyXG5cclxuICAgIGlmICh0aGlzLnR5cGUgPT09ICdtYWluIHBhZ2UnKSB7XHJcbiAgICAgIHRoaXMuaGVhZGVyRWxlbWVudC5jbGFzc0xpc3QuYWRkKCdtYWluLXBhZ2UnKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMuaGVhZGVyRWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKCdtYWluLXBhZ2UnKTtcclxuICAgIH1cclxuXHJcbiAgICBjb250ZW50V3JhcHBlci5hcHBlbmQoY29udGVudEVsZW1lbnQpO1xyXG4gICAgdGhpcy5lbGVtZW50ID0gY29udGVudFdyYXBwZXI7XHJcblxyXG4gICAgcmV0dXJuIHRoaXM7XHJcbiAgfVxyXG5cclxuICBjcmVhdGVNYWluQ2FyZHNDb250YWluZXIoKSB7XHJcbiAgICBjb25zdCBtYWluQ29udGFpbmVyRWxlbWVudCA9IGNyZWF0ZUN1c3RvbUVsZW1lbnQoJ2RpdicsICdjYXJkLWNvbnRhaW5lcicpO1xyXG4gICAgdGhpcy50b3BpY3NBcnIuZm9yRWFjaCgodG9waWMsIGluZGV4KSA9PiB7XHJcbiAgICAgIGNvbnN0IGNhcmRPYmogPSB7XHJcbiAgICAgICAgY2FyZE5hbWU6IHRvcGljLFxyXG4gICAgICAgIGltYWdlOiB0aGlzLmFwcENvbnRyb2wubWFpbkNhcmRzW2luZGV4XS5pbWFnZSxcclxuICAgICAgfTtcclxuICAgICAgbWFpbkNvbnRhaW5lckVsZW1lbnQuYXBwZW5kKG5ldyBDYXJkKHRoaXMuYXBwQ29udHJvbCwgY2FyZE9iaikuZWxlbWVudCk7XHJcbiAgICB9KTtcclxuXHJcbiAgICByZXR1cm4gbWFpbkNvbnRhaW5lckVsZW1lbnQ7XHJcbiAgfVxyXG5cclxuICBjcmVhdGVUb3BpY0NhcmRzQ29udGVudCgpIHtcclxuICAgIGNvbnN0IGNvbnRlbnRGcmFnbWVudCA9IG5ldyBEb2N1bWVudEZyYWdtZW50KCk7XHJcbiAgICBjb25zdCBjYXJkc0NvbnRhaW5lckVsZW1lbnQgPSBjcmVhdGVDdXN0b21FbGVtZW50KCdkaXYnLCAnY2FyZC1jb250YWluZXInKTtcclxuICAgIGNvbnN0IGNhcmRJbmRleCA9IHRoaXMudG9waWNzQXJyLmZpbmRJbmRleCgoaXRlbSkgPT4ge1xyXG4gICAgICBjb25zdCByZXN1bHQgPSBpdGVtLnRvTG93ZXJDYXNlKCkgPT09IHRoaXMuYXBwQ29udHJvbC5hY3RpdmVQYWdlO1xyXG4gICAgICByZXR1cm4gcmVzdWx0O1xyXG4gICAgfSk7XHJcbiAgICBjb25zdCB0b3BpY05hbWUgPSB0aGlzLnRvcGljc0FycltjYXJkSW5kZXhdO1xyXG5cclxuICAgIHRoaXMuY2FyZHNBcnJbY2FyZEluZGV4XS5mb3JFYWNoKChjYXJkT2JqKSA9PiB7XHJcbiAgICAgIGNhcmRzQ29udGFpbmVyRWxlbWVudC5hcHBlbmQobmV3IENhcmQodGhpcy5hcHBDb250cm9sLCBjYXJkT2JqLCB0aGlzLnR5cGUpLmVsZW1lbnQpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgY29udGVudEZyYWdtZW50LmFwcGVuZChjcmVhdGVDdXN0b21FbGVtZW50KCdoMicsICd0b3BpYy1uYW1lJywgdG9waWNOYW1lKSk7XHJcbiAgICBjb250ZW50RnJhZ21lbnQuYXBwZW5kKGNhcmRzQ29udGFpbmVyRWxlbWVudCk7XHJcblxyXG4gICAgcmV0dXJuIGNvbnRlbnRGcmFnbWVudDtcclxuICB9XHJcblxyXG4gIGFkZFRvRG9jKCkge1xyXG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignbWFpbicpLmFwcGVuZCh0aGlzLmVsZW1lbnQpO1xyXG4gICAgW3RoaXMuZWxlbWVudF0gPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdjb250ZW50LXdyYXBwZXInKTtcclxuICAgIHRoaXMuY2FyZHNDb2xsZWN0aW9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnY2FyZCcpO1xyXG4gICAgdGhpcy5nYW1lQ2FyZHNDb2xsZWN0aW9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnZ2FtZS1jYXJkJyk7XHJcbiAgICByZXR1cm4gdGhpcztcclxuICB9XHJcblxyXG4gIGNsZWFyKCkge1xyXG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmNvbnRlbnQtd3JhcHBlcicpLnJlbW92ZSgpO1xyXG4gICAgcmV0dXJuIHRoaXM7XHJcbiAgfVxyXG5cclxuICBjaGFuZ2VDb250ZW50KG1lbnVUb3BpY05hbWUpIHtcclxuICAgIHRoaXMudHlwZSA9IHRoaXMuZ2V0VmFsaWRUb3BpY1R5cGUobWVudVRvcGljTmFtZSk7XHJcbiAgICB0aGlzLmFwcENvbnRyb2wuZ2FtZUNvbnRyb2xcclxuICAgICAgLmVuZEdhbWUoKTtcclxuXHJcbiAgICB0aGlzXHJcbiAgICAgIC5idWlsZCgpXHJcbiAgICAgIC5jbGVhcigpXHJcbiAgICAgIC5hZGRUb0RvYygpO1xyXG4gICAgcmV0dXJuIHRoaXM7XHJcbiAgfVxyXG5cclxuICBpc0VsZW1lbnRJbkNhcmQoZWxlbWVudCkge1xyXG4gICAgcmV0dXJuICh0aGlzLnZhbGlkQ2FyZENsYXNzZXMuc29tZSgoY2xhc3NOYW1lKSA9PiBlbGVtZW50LmNsYXNzTGlzdC5jb250YWlucyhjbGFzc05hbWUpKSk7XHJcbiAgfVxyXG5cclxuICBnZXRWYWxpZFR5cGUodHlwZSkge1xyXG4gICAgaWYgKHRoaXMudmFsaWRUeXBlcy5pbmNsdWRlcyh0eXBlKSkge1xyXG4gICAgICByZXR1cm4gdHlwZTtcclxuICAgIH1cclxuICAgIHRocm93IG5ldyBFcnJvcignd3JvbmcgdHlwZSBvZiBPYmplY3QnKTtcclxuICB9XHJcblxyXG4gIGdldFZhbGlkVG9waWNUeXBlKG1lbnVUb3BpY05hbWUpIHtcclxuICAgIGNvbnN0IGN1cmVudE1lbnVUb3BpY05hbWUgPSBtZW51VG9waWNOYW1lLnRvTG93ZXJDYXNlKCk7XHJcbiAgICBpZiAodGhpcy52YWxpZFR5cGVzLmluY2x1ZGVzKGN1cmVudE1lbnVUb3BpY05hbWUpKSB7XHJcbiAgICAgIHJldHVybiBjdXJlbnRNZW51VG9waWNOYW1lO1xyXG4gICAgfSBpZiAodGhpcy50b3BpY3NBcnIubWFwKChpdGVtKSA9PiBpdGVtLnRvTG93ZXJDYXNlKCkpLmluY2x1ZGVzKGN1cmVudE1lbnVUb3BpY05hbWUpKSB7XHJcbiAgICAgIHJldHVybiAndG9waWMnO1xyXG4gICAgfVxyXG4gICAgdGhyb3cgbmV3IEVycm9yKCd3cm9uZyBtZW51IHRvcGljIE5hbWUnKTtcclxuICB9XHJcblxyXG4gIGdldENhcmRPYmpCeVdvcmQod29yZCkge1xyXG4gICAgcmV0dXJuIHRoaXMuY2FyZHNBcnIuZmxhdCgpLmZpbmQoKGNhcmRPYmopID0+IGNhcmRPYmoud29yZCA9PT0gd29yZCk7XHJcbiAgfVxyXG5cclxuICBnZXRDYXJkT2JqQnlJbWFnZU5hbWUoaW1hZ2VOYW1lKSB7XHJcbiAgICByZXR1cm4gdGhpcy5jYXJkc0Fyci5mbGF0KCkuZmluZCgoY2FyZE9iaikgPT4gY2FyZE9iai5pbWFnZSA9PT0gYGltZy8ke2ltYWdlTmFtZX0uanBnYCk7XHJcbiAgfVxyXG5cclxuICBnZXRDYXJkT2JqQnlUcmFuc2xhdGlvbih0cmFuc2xhdGlvbikge1xyXG4gICAgcmV0dXJuIHRoaXMuY2FyZHNBcnIuZmxhdCgpLmZpbmQoKGNhcmRPYmopID0+IGNhcmRPYmoudHJhbnNsYXRpb24gPT09IHRyYW5zbGF0aW9uKTtcclxuICB9XHJcblxyXG4gIGdldENhcmRFbGVtZW50QnlUYXJnZXQodGFyZ2V0RWxlbWVudCkge1xyXG4gICAgbGV0IHNlYXJjaEVsZW1lbnQgPSB0YXJnZXRFbGVtZW50O1xyXG4gICAgd2hpbGUgKCFzZWFyY2hFbGVtZW50LmNsYXNzTGlzdC5jb250YWlucygnY2FyZCcpKSB7XHJcbiAgICAgIHNlYXJjaEVsZW1lbnQgPSBzZWFyY2hFbGVtZW50LnBhcmVudEVsZW1lbnQ7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gc2VhcmNoRWxlbWVudDtcclxuICB9XHJcblxyXG4gIGdldENhcmRJbm5lclRleHQoY2FyZEVsZW1lbnQpIHtcclxuICAgIHJldHVybiBjYXJkRWxlbWVudC5xdWVyeVNlbGVjdG9yKCdwJykuaW5uZXJIVE1MO1xyXG4gIH1cclxuXHJcbiAgZ2V0Q2FyZEltYWdlTmFtZShjYXJkRWxlbWVudCkge1xyXG4gICAgY29uc3QgaW1hZ2VTcmMgPSBjYXJkRWxlbWVudC5xdWVyeVNlbGVjdG9yKCcuY2FyZC1pbWFnZScpLnNyYztcclxuICAgIGNvbnN0IGltYWdlTmFtZSA9IGltYWdlU3JjLm1hdGNoKC8oPzw9XFwvKVxcdysoPz1cXC5wbmd8LnN2Z3wuanBnfC5qcGVnfC5naWYpLylbMF07XHJcbiAgICByZXR1cm4gaW1hZ2VOYW1lO1xyXG4gIH1cclxuXHJcbiAgZmxpcENhcmQoY2FyZEVsZW1lbnQpIHtcclxuICAgIGNvbnN0IGNhcmRQYXJhZ3JhcGggPSBjYXJkRWxlbWVudC5xdWVyeVNlbGVjdG9yKCdwJyk7XHJcbiAgICBjb25zdCBjYXJkRmxpcEJ1dHRvbiA9IGNhcmRFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJy5jYXJkLWZsaXAtYnV0dG9uJyk7XHJcbiAgICBjb25zdCBjYXJkSW1hZ2VOYW1lID0gdGhpcy5nZXRDYXJkSW1hZ2VOYW1lKGNhcmRFbGVtZW50KTtcclxuICAgIGNvbnN0IGNhcmRPYmogPSB0aGlzLmdldENhcmRPYmpCeUltYWdlTmFtZShjYXJkSW1hZ2VOYW1lKTtcclxuXHJcbiAgICBjYXJkRWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKCd1bmZsaXBwZWQnKTtcclxuICAgIGNhcmRFbGVtZW50LmNsYXNzTGlzdC5hZGQoJ2ZsaXBwZWQnKTtcclxuICAgIGNhcmRFbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoXHJcbiAgICAgICdwb2ludGVybGVhdmUnLFxyXG4gICAgICAoKSA9PiB7XHJcbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICB0aGlzLnVuZmxpcENhcmQoY2FyZEVsZW1lbnQpO1xyXG4gICAgICAgIH0sIDUwMCk7XHJcbiAgICAgIH0sXHJcbiAgICAgIHsgb25jZTogdHJ1ZSB9LFxyXG4gICAgKTtcclxuXHJcbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgY2FyZFBhcmFncmFwaC5pbm5lckhUTUwgPSBjYXJkT2JqLnRyYW5zbGF0aW9uO1xyXG4gICAgICBjYXJkRmxpcEJ1dHRvbi5oaWRkZW4gPSB0cnVlO1xyXG4gICAgfSwgNTAwKTtcclxuXHJcbiAgICByZXR1cm4gdGhpcztcclxuICB9XHJcblxyXG4gIHVuZmxpcENhcmQoY2FyZEVsZW1lbnQpIHtcclxuICAgIGNhcmRFbGVtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3BvaW50ZXJsZWF2ZScsIChldmVudCkgPT4gdW5ob3ZlckNhcmQoZXZlbnQsIGNhcmRFbGVtZW50LCB0aGlzKSk7XHJcblxyXG4gICAgaWYgKGNhcmRFbGVtZW50LmNsYXNzTGlzdC5jb250YWlucygnZmxpcHBlZCcpKSB7XHJcbiAgICAgIGNvbnN0IGNhcmRQYXJhZ3JhcGggPSBjYXJkRWxlbWVudC5xdWVyeVNlbGVjdG9yKCdwJyk7XHJcbiAgICAgIGNvbnN0IGNhcmRGbGlwQnV0dG9uID0gY2FyZEVsZW1lbnQucXVlcnlTZWxlY3RvcignLmNhcmQtZmxpcC1idXR0b24nKTtcclxuICAgICAgY29uc3QgY2FyZFdvcmQgPSBjYXJkUGFyYWdyYXBoLmlubmVySFRNTDtcclxuICAgICAgY29uc3QgY2FyZE9iaiA9IHRoaXMuZ2V0Q2FyZE9iakJ5VHJhbnNsYXRpb24oY2FyZFdvcmQpO1xyXG5cclxuICAgICAgY2FyZEVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZSgnZmxpcHBlZCcpO1xyXG4gICAgICBjYXJkRWxlbWVudC5jbGFzc0xpc3QuYWRkKCd1bmZsaXBwZWQnKTtcclxuICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgY2FyZFBhcmFncmFwaC5pbm5lckhUTUwgPSBjYXJkT2JqLndvcmQ7XHJcbiAgICAgICAgY2FyZEZsaXBCdXR0b24uaGlkZGVuID0gZmFsc2U7XHJcbiAgICAgIH0sIDUwMCk7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHRoaXM7XHJcbiAgfVxyXG5cclxuICByZW1vdmVDYXJkcygpIHtcclxuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5jYXJkLWNvbnRhaW5lcicpLnJlbW92ZSgpO1xyXG4gICAgcmV0dXJuIHRoaXM7XHJcbiAgfVxyXG5cclxuICBwbGF5RmluYWxDbGlwKHdyb25nQW5zd2Vycykge1xyXG4gICAgY29uc3QgY2xpcFR5cGUgPSAod3JvbmdBbnN3ZXJzID09PSAwKSA/ICdzdWNjZXNzJyA6ICdmYWlsdXJlJztcclxuICAgIGNvbnN0IGNsYXNzTmFtZXMgPSAnZmluYWwtY2xpcCc7XHJcbiAgICBjb25zdCBpbWFnZVNyYyA9IGBhcHAvJHtjbGlwVHlwZX0uanBnYDtcclxuXHJcbiAgICBjb25zdCB0ZW1wbGF0ZSA9IGBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJncmFwaGljXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxpbWcgc3JjPVwiLi4vYXNzZXRzL2ltZy8ke2ltYWdlU3JjfVwiIGFsdD1cImltYWdlICR7Y2xpcFR5cGV9XCIgd2lkdGg9XCI0MDBcIiBoZWlnaHQ9XCI0MDBcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYDtcclxuXHJcbiAgICBjb25zdCBmaW5hbENsaXBFbGVtZW50ID0gY3JlYXRlQ3VzdG9tRWxlbWVudCgnZGl2JywgY2xhc3NOYW1lcywgdGVtcGxhdGUpO1xyXG4gICAgaWYgKGNsaXBUeXBlID09PSAnZmFpbHVyZScpIHtcclxuICAgICAgZmluYWxDbGlwRWxlbWVudC5pbm5lckhUTUwgKz0gYDxwIGNsYXNzPVwibWlzdGFrZXMtbnVtYmVyXCI+TWlzdGFrZXM6ICR7d3JvbmdBbnN3ZXJzfTwvcD5gO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMuYXBwQ29udHJvbC5wbGF5QXBwU291bmQoY2xpcFR5cGUpO1xyXG4gICAgdGhpcy5yZW1vdmVDYXJkcygpO1xyXG4gICAgdGhpcy5lbGVtZW50LmFwcGVuZChmaW5hbENsaXBFbGVtZW50KTtcclxuXHJcbiAgICByZXR1cm4gdGhpcztcclxuICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IENvbnRlbnRDb250YWluZXI7XHJcbiIsIi8qIGVzbGludC1kaXNhYmxlIGxpbmVicmVhay1zdHlsZSAqL1xyXG4vKiBlc2xpbnQtZGlzYWJsZSBuby1yZXN0cmljdGVkLXN5bnRheCAqL1xyXG4vKiBlc2xpbnQtZGlzYWJsZSBsaW5lYnJlYWstc3R5bGUgKi9cclxuLyogZXNsaW50LWRpc2FibGUgbm8tY29uc29sZSAqL1xyXG4vKiBlc2xpbnQtZGlzYWJsZSBsaW5lYnJlYWstc3R5bGUgKi9cclxuLyogZXNsaW50LWRpc2FibGUgbm8tdW5kZWYgKi9cclxuXHJcbmltcG9ydCBTdGFyIGZyb20gJy4vc3Rhcic7XHJcbmltcG9ydCB7XHJcbiAgY3JlYXRlQ3VzdG9tRWxlbWVudCxcclxuICBnZXRSYW5kb21JbnQsXHJcbn0gZnJvbSAnLi9jb21tb25GdW5jdCc7XHJcblxyXG5jbGFzcyBnYW1lQ29udHJvbCB7XHJcbiAgY29uc3RydWN0b3IoYXBwQ29udHJvbCkge1xyXG4gICAgdGhpcy5hcHBDb250cm9sID0gYXBwQ29udHJvbDtcclxuICAgIHRoaXMucXVlc3Rpb25zQnVuZGxlID0gW107XHJcbiAgICB0aGlzLmlzR2FtZVN0YXJ0ZWQgPSBmYWxzZTtcclxuICAgIHRoaXMuY29ycmVjdFN0YXJFbGVtZW50ID0gbmV3IFN0YXIoKS5lbGVtZW50O1xyXG4gICAgdGhpcy53cm9uZ1N0YXJFbGVtZW50ID0gbmV3IFN0YXIoJ3dyb25nJykuZWxlbWVudDtcclxuXHJcbiAgICB0aGlzLmFjdGl2ZVF1ZXN0aW9uID0gbnVsbDtcclxuICAgIHRoaXMuZWxlbWVudCA9IG51bGw7XHJcbiAgICB0aGlzLmxpdmVFbGVtZW50ID0gbnVsbDtcclxuICAgIHRoaXMubGl2ZUJ1dHRvbkVsZW1lbnQgPSBudWxsO1xyXG4gICAgdGhpcy5saXZlSW5kaWNhdG9yRWxlbWVudCA9IG51bGw7XHJcbiAgICB0aGlzLmxpdmVDb3JyZWN0UHJFbGVtZW50ID0gbnVsbDtcclxuICAgIHRoaXMubGl2ZVdyb25nUHJFbGVtZW50ID0gbnVsbDtcclxuICAgIHRoaXMubGl2ZVN0YXJzQ29sbGVjdGlvbiA9IG51bGw7XHJcbiAgICB0aGlzLmNvcnJlY3RBbnN3ZXJzID0gbnVsbDtcclxuICAgIHRoaXMud3JvbmdBbnN3ZXJzID0gbnVsbDtcclxuXHJcbiAgICB0aGlzLmJ1aWxkKCk7XHJcbiAgfVxyXG5cclxuICBidWlsZCgpIHtcclxuICAgIGNvbnN0IGNsYXNzTmFtZXMgPSAnZ2FtZS1jb250cm9scyBpbmFjdGl2ZSc7XHJcbiAgICBjb25zdCB0ZW1wbGF0ZSA9IGBcclxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiYnV0dG9uIGdhbWUtYnV0dG9uIHN0YXJ0LWJ1dHRvblwiPlxyXG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJnYW1lLXByb2dyZXNzIGluYWN0aXZlXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiZ2FtZS1pbmRpY2F0b3JcIj5cclxuICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICAgPHAgY2xhc3M9XCJnYW1lLXNjb3JlXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwicHJvZ3Jlc3MgY29ycmVjdFwiPjA8L3NwYW4+IHwgPHNwYW4gY2xhc3M9XCJwcm9ncmVzcyB3cm9uZ1wiPjA8L3NwYW4+XHJcbiAgICAgICAgICAgICAgICAgICAgICA8L3A+XHJcbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgYDtcclxuICAgIHRoaXMuZWxlbWVudCA9IGNyZWF0ZUN1c3RvbUVsZW1lbnQoJ2RpdicsIGNsYXNzTmFtZXMsIHRlbXBsYXRlKTtcclxuICAgIHJldHVybiB0aGlzO1xyXG4gIH1cclxuXHJcbiAgYWRkVG9Eb2MoKSB7XHJcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdoZWFkZXInKS5hcHBlbmQodGhpcy5lbGVtZW50KTtcclxuICAgIFt0aGlzLmxpdmVFbGVtZW50XSA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ2dhbWUtY29udHJvbHMnKTtcclxuICAgIFt0aGlzLmxpdmVCdXR0b25FbGVtZW50XSA9IHRoaXMubGl2ZUVsZW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnZ2FtZS1idXR0b24nKTtcclxuICAgIFt0aGlzLmxpdmVJbmRpY2F0b3JFbGVtZW50XSA9IHRoaXMubGl2ZUVsZW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnZ2FtZS1pbmRpY2F0b3InKTtcclxuICAgIFt0aGlzLmxpdmVDb3JyZWN0UHJFbGVtZW50LCB0aGlzLmxpdmVXcm9uZ1ByRWxlbWVudF0gPSB0aGlzLmxpdmVFbGVtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ3Byb2dyZXNzJyk7XHJcbiAgICB0aGlzLmxpdmVTdGFyc0NvbGxlY3Rpb24gPSB0aGlzLmxpdmVFbGVtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ3N0YXInKTtcclxuXHJcbiAgICByZXR1cm4gdGhpcztcclxuICB9XHJcblxyXG4gIHNob3coKSB7XHJcbiAgICB0aGlzLmxpdmVFbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUoJ2luYWN0aXZlJyk7XHJcbiAgICByZXR1cm4gdGhpcztcclxuICB9XHJcblxyXG4gIGhpZGUoKSB7XHJcbiAgICB0aGlzLmxpdmVFbGVtZW50LmNsYXNzTGlzdC5hZGQoJ2luYWN0aXZlJyk7XHJcbiAgICByZXR1cm4gdGhpcztcclxuICB9XHJcblxyXG4gIHNob3dHYW1lUHJvZ3Jlc3MoKSB7XHJcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZ2FtZS1wcm9ncmVzcycpLmNsYXNzTGlzdC5yZW1vdmUoJ2luYWN0aXZlJyk7XHJcbiAgICByZXR1cm4gdGhpcztcclxuICB9XHJcblxyXG4gIGhpZGVHYW1lUHJvZ3Jlc3MoKSB7XHJcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZ2FtZS1wcm9ncmVzcycpLmNsYXNzTGlzdC5hZGQoJ2luYWN0aXZlJyk7XHJcbiAgICByZXR1cm4gdGhpcztcclxuICB9XHJcblxyXG4gIGNyZWF0ZVJhbmRvbVF1ZXN0aW9uc0J1bmRsZShhcnJPcHRpb25zKSB7XHJcbiAgICB0aGlzLnF1ZXN0aW9uc0J1bmRsZSA9IFtdO1xyXG4gICAgY29uc3Qgd29ya0FyciA9IGFyck9wdGlvbnMubWFwKChpdGVtKSA9PiBpdGVtKTtcclxuICAgIHdoaWxlICh0aGlzLnF1ZXN0aW9uc0J1bmRsZS5sZW5ndGggPCBhcnJPcHRpb25zLmxlbmd0aCkge1xyXG4gICAgICBjb25zdCByYW5kb21JbmRleCA9IGdldFJhbmRvbUludCh3b3JrQXJyLmxlbmd0aCAtIDEpO1xyXG4gICAgICB0aGlzLnF1ZXN0aW9uc0J1bmRsZS5wdXNoKC4uLndvcmtBcnIuc3BsaWNlKHJhbmRvbUluZGV4LCAxKSk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gdGhpcztcclxuICB9XHJcblxyXG4gIHN0YXJ0R2FtZShhcnJPcHRpb25zKSB7XHJcbiAgICB0aGlzLmlzR2FtZVN0YXJ0ZWQgPSB0cnVlO1xyXG4gICAgdGhpcy5jb3JyZWN0QW5zd2VycyA9IDA7XHJcbiAgICB0aGlzLndyb25nQW5zd2VycyA9IDA7XHJcbiAgICB0aGlzLnNob3dHYW1lUHJvZ3Jlc3MoKTtcclxuICAgIHRoaXMuY3JlYXRlUmFuZG9tUXVlc3Rpb25zQnVuZGxlKGFyck9wdGlvbnMpO1xyXG4gICAgdGhpcy5hc2tRdWVzdGlvbigpO1xyXG4gICAgdGhpcy5jaGFuZ2VCdXR0b25DbGFzcygncmVwZWF0LWJ1dHRvbicpO1xyXG4gICAgcmV0dXJuIHRoaXM7XHJcbiAgfVxyXG5cclxuICBlbmRHYW1lKCkge1xyXG4gICAgdGhpcy5pc0dhbWVTdGFydGVkID0gZmFsc2U7XHJcbiAgICB0aGlzLmFjdGl2ZVF1ZXN0aW9uID0gbnVsbDtcclxuICAgIHRoaXMuaGlkZUdhbWVQcm9ncmVzcygpO1xyXG4gICAgdGhpcy5jaGFuZ2VCdXR0b25DbGFzcygnc3RhcnQtYnV0dG9uJyk7XHJcblxyXG4gICAgaWYgKHRoaXMuY29ycmVjdEFuc3dlcnMgPT09IHRoaXMuYXBwQ29udHJvbC5jb250ZW50LmdhbWVDYXJkc0NvbGxlY3Rpb24ubGVuZ3RoXHJcbiAgICAgICAgJiYgdGhpcy5jb3JyZWN0QW5zd2VycyAhPT0gMCkge1xyXG4gICAgICB0aGlzLmFwcENvbnRyb2wuY29udGVudC5wbGF5RmluYWxDbGlwKHRoaXMud3JvbmdBbnN3ZXJzKTtcclxuICAgICAgdGhpcy5jb3JyZWN0QW5zd2VycyA9IDA7XHJcbiAgICAgIHRoaXMud3JvbmdBbnN3ZXJzID0gMDtcclxuXHJcbiAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgIHRoaXMuYXBwQ29udHJvbC5jaGFuZ2VQYWdlKCdNYWluIHBhZ2UnKTtcclxuICAgICAgfSwgMzAwMCk7XHJcblxyXG4gICAgICB0aGlzLmNvcnJlY3RBbnN3ZXJzID0gMDtcclxuICAgICAgdGhpcy53cm9uZ0Fuc3dlcnMgPSAwO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMubGl2ZUNvcnJlY3RQckVsZW1lbnQuaW5uZXJIVE1MID0gJzAnO1xyXG4gICAgdGhpcy5saXZlV3JvbmdQckVsZW1lbnQuaW5uZXJIVE1MID0gJzAnO1xyXG4gICAgdGhpcy5saXZlSW5kaWNhdG9yRWxlbWVudC5pbm5lckhUTUwgPSAnJztcclxuICAgIHJldHVybiB0aGlzO1xyXG4gIH1cclxuXHJcbiAgYXNrUXVlc3Rpb24oKSB7XHJcbiAgICBpZiAodGhpcy5xdWVzdGlvbnNCdW5kbGUubGVuZ3RoICE9PSAwKSB7XHJcbiAgICAgIHRoaXMuYWN0aXZlUXVlc3Rpb24gPSB0aGlzLnF1ZXN0aW9uc0J1bmRsZS5wb3AoKTtcclxuICAgICAgdGhpcy5hcHBDb250cm9sLnBsYXlDYXJkU291bmQodGhpcy5hY3RpdmVRdWVzdGlvbik7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLmVuZEdhbWUoKTtcclxuICAgIH1cclxuICAgIHJldHVybiB0aGlzO1xyXG4gIH1cclxuXHJcbiAgcHJvY2Vzc0Fuc3dlcihjYXJkT2JqLCBjYXJkRWxlbWVudCkge1xyXG4gICAgaWYgKHRoaXMubGl2ZVN0YXJzQ29sbGVjdGlvbi5sZW5ndGggPj0gNSkge1xyXG4gICAgICB0aGlzLmxpdmVJbmRpY2F0b3JFbGVtZW50LmZpcnN0RWxlbWVudENoaWxkLnJlbW92ZSgpO1xyXG4gICAgfVxyXG5cclxuICAgIGlmIChPYmplY3QuZW50cmllcyh0aGlzLmFjdGl2ZVF1ZXN0aW9uKS5ldmVyeSgoW2tleSwgdmFsdWVdKSA9PiB2YWx1ZSA9PT0gY2FyZE9ialtrZXldKSkge1xyXG4gICAgICB0aGlzLmNvcnJlY3RBbnN3ZXIodGhpcy5hY3RpdmVRdWVzdGlvbik7XHJcbiAgICAgIGNhcmRFbGVtZW50LmNsYXNzTGlzdC5hZGQoJ2Rpc2FibGVkJyk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLndyb25nQW5zd2VyKHRoaXMuYWN0aXZlUXVlc3Rpb24pO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiB0aGlzO1xyXG4gIH1cclxuXHJcbiAgY29ycmVjdEFuc3dlcihjYXJkT2JqKSB7XHJcbiAgICB0aGlzLmFwcENvbnRyb2wucGxheUFwcFNvdW5kKCdjb3JyZWN0Jyk7XHJcbiAgICB0aGlzLmNvcnJlY3RBbnN3ZXJzICs9IDE7XHJcbiAgICB0aGlzLmFwcENvbnRyb2wuc3RhdC5zdG9yYWdlLmFkZCgnY29ycmVjdCcsIGNhcmRPYmopO1xyXG4gICAgdGhpcy5saXZlQ29ycmVjdFByRWxlbWVudC5pbm5lckhUTUwgPSB0aGlzLmNvcnJlY3RBbnN3ZXJzO1xyXG4gICAgdGhpcy5saXZlSW5kaWNhdG9yRWxlbWVudC5hcHBlbmQobmV3IFN0YXIoKS5lbGVtZW50KTtcclxuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICB0aGlzLmFza1F1ZXN0aW9uKCk7XHJcbiAgICB9LCAxMDAwKTtcclxuXHJcbiAgICByZXR1cm4gdGhpcztcclxuICB9XHJcblxyXG4gIHdyb25nQW5zd2VyKGNhcmRPYmopIHtcclxuICAgIHRoaXMuYXBwQ29udHJvbC5wbGF5QXBwU291bmQoJ3dyb25nJyk7XHJcbiAgICB0aGlzLndyb25nQW5zd2VycyArPSAxO1xyXG4gICAgdGhpcy5hcHBDb250cm9sLnN0YXQuc3RvcmFnZS5hZGQoJ3dyb25nJywgY2FyZE9iaik7XHJcbiAgICB0aGlzLmxpdmVXcm9uZ1ByRWxlbWVudC5pbm5lckhUTUwgPSB0aGlzLndyb25nQW5zd2VycztcclxuICAgIHRoaXMubGl2ZUluZGljYXRvckVsZW1lbnQuYXBwZW5kKG5ldyBTdGFyKCd3cm9uZycpLmVsZW1lbnQpO1xyXG4gICAgcmV0dXJuIHRoaXM7XHJcbiAgfVxyXG5cclxuICByZXBlYXRRdWVzdGlvbigpIHtcclxuICAgIHRoaXMuYXBwQ29udHJvbC5wbGF5Q2FyZFNvdW5kKHRoaXMuYWN0aXZlUXVlc3Rpb24pO1xyXG4gICAgcmV0dXJuIHRoaXM7XHJcbiAgfVxyXG5cclxuICBjaGFuZ2VCdXR0b25DbGFzcyhidXR0b25DbGFzc05hbWUpIHtcclxuICAgIGNvbnN0IHJlbW92ZWRDbGFzc05hbWUgPSAoYnV0dG9uQ2xhc3NOYW1lID09PSAnc3RhcnQtYnV0dG9uJykgPyAncmVwZWF0LWJ1dHRvbicgOiAnc3RhcnQtYnV0dG9uJztcclxuICAgIHRoaXMubGl2ZUJ1dHRvbkVsZW1lbnQuY2xhc3NMaXN0LmFkZChidXR0b25DbGFzc05hbWUpO1xyXG4gICAgdGhpcy5saXZlQnV0dG9uRWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKHJlbW92ZWRDbGFzc05hbWUpO1xyXG4gICAgcmV0dXJuIHRoaXM7XHJcbiAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBnYW1lQ29udHJvbDtcclxuIiwiLyogZXNsaW50LWRpc2FibGUgbGluZWJyZWFrLXN0eWxlICovXHJcbmNvbnN0IG1haW5DYXJkcyA9IFtcclxuICB7XHJcbiAgICB0b3BpYzogJ0FjdGlvbiAoc2V0IEEpJyxcclxuICAgIGltYWdlOiAnaW1nL2FwcC9tYWluLTAwMS5wbmcnLFxyXG4gIH0sXHJcbiAge1xyXG4gICAgdG9waWM6ICdBY3Rpb24gKHNldCBCKScsXHJcbiAgICBpbWFnZTogJ2ltZy9hcHAvbWFpbi0wMDIucG5nJyxcclxuICB9LFxyXG4gIHtcclxuICAgIHRvcGljOiAnQW5pbWFsIChzZXQgQSknLFxyXG4gICAgaW1hZ2U6ICdpbWcvYXBwL21haW4tMDAzLnBuZycsXHJcbiAgfSxcclxuICB7XHJcbiAgICB0b3BpYzogJ0FuaW1hbCAoc2V0IEIpJyxcclxuICAgIGltYWdlOiAnaW1nL2FwcC9tYWluLTAwNC5wbmcnLFxyXG4gIH0sXHJcbiAge1xyXG4gICAgdG9waWM6ICdDbG90aGVzJyxcclxuICAgIGltYWdlOiAnaW1nL2FwcC9tYWluLTAwNS5wbmcnLFxyXG4gIH0sXHJcbiAge1xyXG4gICAgdG9waWM6ICdFbW90aW9ucycsXHJcbiAgICBpbWFnZTogJ2ltZy9hcHAvbWFpbi0wMDYucG5nJyxcclxuICB9LFxyXG5dO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgbWFpbkNhcmRzO1xyXG4iLCIvKiBlc2xpbnQtZGlzYWJsZSBsaW5lYnJlYWstc3R5bGUgKi9cclxuLyogZXNsaW50LWRpc2FibGUgbm8tY29uc29sZSAqL1xyXG4vKiBlc2xpbnQtZGlzYWJsZSBsaW5lYnJlYWstc3R5bGUgKi9cclxuLyogZXNsaW50LWRpc2FibGUgY29uc2lzdGVudC1yZXR1cm4gKi9cclxuLyogZXNsaW50LWRpc2FibGUgbm8tcmVzdHJpY3RlZC1zeW50YXggKi9cclxuLyogZXNsaW50LWRpc2FibGUgbm8tdW5kZWYgKi9cclxuXHJcbmltcG9ydCB7XHJcbiAgY3JlYXRlQ3VzdG9tRWxlbWVudCxcclxufSBmcm9tICcuL2NvbW1vbkZ1bmN0JztcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE1lbnVFbGVtZW50IHtcclxuICBjb25zdHJ1Y3Rvcih0b3BpY3NBcnIsIHN0YXJ0TWVudSA9ICdNYWluIHBhZ2UnLCBlbmRNZW51ID0gJ1N0YXRpc3RpYycpIHtcclxuICAgIHRoaXMub3BlbmVkTWVudUNvbGxlY3Rpb25zID0gW1xyXG4gICAgICBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZSgnYm9keScpLFxyXG4gICAgICBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdtZW51JyksXHJcbiAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ21lbnUtYnV0dG9uJyksXHJcbiAgICBdO1xyXG4gICAgdGhpcy50b3BpY3NBcnIgPSB0b3BpY3NBcnI7XHJcbiAgICB0aGlzLnN0YXJ0TWVudSA9IHN0YXJ0TWVudTtcclxuICAgIHRoaXMuZW5kTWVudSA9IGVuZE1lbnU7XHJcbiAgICB0aGlzLmFjdGl2ZVBhZ2UgPSB0aGlzLnN0YXJ0TWVudS50b0xvd2VyQ2FzZSgpO1xyXG4gICAgdGhpcy5tZW51SXRlbXNFbGVtZW50cyA9IG51bGw7XHJcbiAgICB0aGlzLmVsZW1lbnQgPSBudWxsO1xyXG5cclxuICAgIHRoaXMuYnVpbGQoKTtcclxuICB9XHJcblxyXG4gIGJ1aWxkKCkge1xyXG4gICAgZnVuY3Rpb24gY3JlYXRlTGkodG9waWNOYW1lID0gJycpIHtcclxuICAgICAgY29uc3QgZWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xpJyk7XHJcbiAgICAgIGVsZW1lbnQuY2xhc3NOYW1lID0gJ2J1dHRvbiBtZW51LWl0ZW0nO1xyXG4gICAgICBlbGVtZW50LmlubmVySFRNTCA9IHRvcGljTmFtZTtcclxuICAgICAgcmV0dXJuIGVsZW1lbnQ7XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgdWxFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndWwnKTtcclxuICAgIHVsRWxlbWVudC5jbGFzc05hbWUgPSAnbWVudS1saXN0JztcclxuXHJcbiAgICB1bEVsZW1lbnQuYXBwZW5kKGNyZWF0ZUxpKHRoaXMuc3RhcnRNZW51KSk7XHJcbiAgICB0aGlzLnRvcGljc0Fyci5mb3JFYWNoKCh0b3BpY05hbWUpID0+IHVsRWxlbWVudC5hcHBlbmQoY3JlYXRlTGkodG9waWNOYW1lKSkpO1xyXG4gICAgdWxFbGVtZW50LmFwcGVuZChjcmVhdGVMaSh0aGlzLmVuZE1lbnUpKTtcclxuXHJcbiAgICBjb25zdCBidXR0b25UZW1wbGF0ZSA9IGBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJidXR0b24gY2xvc2UtbWVudVwiPjwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYDtcclxuXHJcbiAgICBjb25zdCBtZW51RWxlbWVudCA9IGNyZWF0ZUN1c3RvbUVsZW1lbnQoJ25hdicsICdtZW51JywgYnV0dG9uVGVtcGxhdGUpO1xyXG4gICAgbWVudUVsZW1lbnQuYXBwZW5kKHVsRWxlbWVudCk7XHJcbiAgICB0aGlzLmVsZW1lbnQgPSBtZW51RWxlbWVudDtcclxuICAgIHJldHVybiB0aGlzO1xyXG4gIH1cclxuXHJcbiAgYWRkVG9Eb2MoKSB7XHJcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubWFpbi1jb250cm9scycpLnByZXBlbmQodGhpcy5lbGVtZW50KTtcclxuICAgIHRoaXMubWVudUl0ZW1zRWxlbWVudHMgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdtZW51LWl0ZW0nKTtcclxuICAgIHRoaXMuc2V0QWN0aXZlVG9waWModGhpcy5tZW51SXRlbXNFbGVtZW50c1swXS5pbm5lckhUTUwpO1xyXG4gICAgcmV0dXJuIHRoaXM7XHJcbiAgfVxyXG5cclxuICB0b2dnbGUoKSB7XHJcbiAgICB0aGlzLm9wZW5lZE1lbnVDb2xsZWN0aW9ucy5tYXAoKGh0bWxDb2xsZWN0aW9uKSA9PiBodG1sQ29sbGVjdGlvblswXS5jbGFzc0xpc3QudG9nZ2xlKCdvcGVuZWQtbWVudScpKTtcclxuICAgIHJldHVybiB0aGlzO1xyXG4gIH1cclxuXHJcbiAgY2xvc2UoKSB7XHJcbiAgICB0aGlzLm9wZW5lZE1lbnVDb2xsZWN0aW9ucy5tYXAoKGh0bWxDb2xsZWN0aW9uKSA9PiBodG1sQ29sbGVjdGlvblswXS5jbGFzc0xpc3QucmVtb3ZlKCdvcGVuZWQtbWVudScpKTtcclxuICB9XHJcblxyXG4gIHNldEFjdGl2ZVRvcGljKHRvcGljTmFtZSkge1xyXG4gICAgY29uc3QgY2xhc3NOYW1lID0gJ2FjdGl2ZS1wYWdlJztcclxuICAgIGNvbnN0IHRvcGljRWxlbWVudCA9IHRoaXMuZ2V0TWVudUl0ZW1CeU5hbWUodG9waWNOYW1lKTtcclxuICAgIHRoaXMuYWN0aXZlUGFnZSA9IHRvcGljTmFtZS50b0xvd2VyQ2FzZSgpO1xyXG4gICAgZm9yIChjb25zdCBtZW51SXRlbUVsZW1lbnQgb2YgdGhpcy5tZW51SXRlbXNFbGVtZW50cykge1xyXG4gICAgICBtZW51SXRlbUVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZShjbGFzc05hbWUpO1xyXG4gICAgfVxyXG4gICAgdG9waWNFbGVtZW50LmNsYXNzTGlzdC5hZGQoY2xhc3NOYW1lKTtcclxuXHJcbiAgICByZXR1cm4gdGhpcztcclxuICB9XHJcblxyXG4gIGdldE1lbnVJdGVtQnlOYW1lKGl0ZW1OYW1lKSB7XHJcbiAgICBmb3IgKGNvbnN0IGVsZW1lbnQgb2YgdGhpcy5tZW51SXRlbXNFbGVtZW50cykge1xyXG4gICAgICBpZiAoZWxlbWVudC5pbm5lckhUTUwudG9Mb3dlckNhc2UoKSA9PT0gaXRlbU5hbWUudG9Mb3dlckNhc2UoKSkge1xyXG4gICAgICAgIHJldHVybiBlbGVtZW50O1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG59XHJcbiIsIi8qIGVzbGludC1kaXNhYmxlIGxpbmVicmVhay1zdHlsZSAqL1xyXG5cclxuaW1wb3J0IHsgY3JlYXRlQ3VzdG9tRWxlbWVudCB9IGZyb20gJy4vY29tbW9uRnVuY3QnO1xyXG5cclxuY2xhc3MgU3RhciB7XHJcbiAgY29uc3RydWN0b3IodHlwZSA9ICdjb3JyZWN0Jykge1xyXG4gICAgdGhpcy50eXBlID0gKHR5cGUgPT09ICdjb3JyZWN0JykgPyB0eXBlIDogJ3dyb25nJztcclxuICAgIGNvbnN0IGNsYXNzTmFtZXMgPSBgZ3JhcGhpYyBzdGFyIHN0YXItJHt0aGlzLnR5cGV9YDtcclxuICAgIGxldCBpbWFnZVNyYztcclxuXHJcbiAgICBpZiAodGhpcy50eXBlID09PSAnY29ycmVjdCcpIHtcclxuICAgICAgaW1hZ2VTcmMgPSAnYXBwL3N0YXItd2luLnN2Zyc7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBpbWFnZVNyYyA9ICdhcHAvc3Rhci5zdmcnO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IHRlbXBsYXRlID0gYFxyXG4gICAgICAgICAgICAgICAgICAgICAgPGltZyBjbGFzcz1cInN0YXItaW1hZ2VcIiBzcmM9XCIuLi9hc3NldHMvaW1nLyR7aW1hZ2VTcmN9XCIgYWx0PVwiJHt0aGlzLnR5cGV9IHN0YXJcIiB3aWR0aD1cIjQwXCIgaGVpZ2h0PVwiNDBcIj5cclxuICAgICAgICAgICAgICAgICAgICAgIGA7XHJcbiAgICB0aGlzLmVsZW1lbnQgPSBjcmVhdGVDdXN0b21FbGVtZW50KCdkaXYnLCBjbGFzc05hbWVzLCB0ZW1wbGF0ZSk7XHJcbiAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBTdGFyO1xyXG4iLCIvKiBlc2xpbnQtZGlzYWJsZSBsaW5lYnJlYWstc3R5bGUgKi9cclxuLyogZXNsaW50LWRpc2FibGUgbm8tY29uc29sZSAqL1xyXG4vKiBlc2xpbnQtZGlzYWJsZSBsaW5lYnJlYWstc3R5bGUgKi9cclxuLyogZXNsaW50LWRpc2FibGUgbm8tdW5kZWYgKi9cclxuLyogZXNsaW50LWRpc2FibGUgbGluZWJyZWFrLXN0eWxlICovXHJcblxyXG5jbGFzcyBTdGF0U3RvcmFnZSB7XHJcbiAgY29uc3RydWN0b3IodG9waWNzQXJyLCBjYXJkc0Fycikge1xyXG4gICAgdGhpcy50b3BpY3NBcnIgPSB0b3BpY3NBcnI7XHJcbiAgICB0aGlzLmNhcmRzQXJyID0gY2FyZHNBcnI7XHJcbiAgICB0aGlzLnN0YXRBcnIgPSBKU09OLnBhcnNlKGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdFbmdsaXNoRm9yS2lkcycpIHx8IFtdKTtcclxuICAgIGlmICghdGhpcy5zdGF0QXJyKSB7XHJcbiAgICAgIHRoaXNcclxuICAgICAgICAuYnVpbGQoKVxyXG4gICAgICAgIC51cGRhdGVTdG9yYWdlKCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBidWlsZCgpIHtcclxuICAgIGNvbnN0IHN0YXREYXRhQXJyID0gW107XHJcbiAgICB0aGlzLnRvcGljc0Fyci5mb3JFYWNoKCh0b3BpTmFtZSwgaW5kZXgpID0+IHtcclxuICAgICAgY29uc3QgdG9waWNDYXJkc0FyciA9IHRoaXMuY2FyZHNBcnJbaW5kZXhdO1xyXG5cclxuICAgICAgdG9waWNDYXJkc0Fyci5mb3JFYWNoKCh3b3JkT2JqKSA9PiB7XHJcbiAgICAgICAgY29uc3Qgc3RhdFdvcmRPYmogPSB7XHJcbiAgICAgICAgICB0b3BpYzogdG9waU5hbWUsXHJcbiAgICAgICAgICB3b3JkOiB3b3JkT2JqLndvcmQsXHJcbiAgICAgICAgICB0cmFuc2xhdGlvbjogd29yZE9iai50cmFuc2xhdGlvbixcclxuICAgICAgICAgIHRyYWluQ2xpY2s6IDAsXHJcbiAgICAgICAgICBjb3JyZWN0QW5zd2VyczogMCxcclxuICAgICAgICAgIG1pc3Rha2VzOiAwLFxyXG4gICAgICAgICAgcGVyY2VudGFnZTogMCxcclxuICAgICAgICAgIGltYWdlOiB3b3JkT2JqLmltYWdlLFxyXG4gICAgICAgICAgYXVkaW9TcmM6IHdvcmRPYmouYXVkaW9TcmMsXHJcbiAgICAgICAgfTtcclxuICAgICAgICBzdGF0RGF0YUFyci5wdXNoKHN0YXRXb3JkT2JqKTtcclxuICAgICAgfSk7XHJcbiAgICB9KTtcclxuICAgIHRoaXMuc3RhdEFyciA9IHN0YXREYXRhQXJyO1xyXG4gICAgcmV0dXJuIHRoaXM7XHJcbiAgfVxyXG5cclxuICB1cGRhdGVTdG9yYWdlKCkge1xyXG4gICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ0VuZ2xpc2hGb3JLaWRzJywgSlNPTi5zdHJpbmdpZnkodGhpcy5zdGF0QXJyKSk7XHJcbiAgICByZXR1cm4gdGhpcztcclxuICB9XHJcblxyXG4gIGNsZWFuU3RvcmFnZSgpIHtcclxuICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdFbmdsaXNoRm9yS2lkcycsIEpTT04uc3RyaW5naWZ5KCcnKSk7XHJcbiAgICB0aGlzXHJcbiAgICAgIC5idWlsZCgpXHJcbiAgICAgIC51cGRhdGVTdG9yYWdlKCk7XHJcbiAgICByZXR1cm4gdGhpcztcclxuICB9XHJcblxyXG4gIGFkZCh0eXBlLCBjYXJkT2JqKSB7XHJcbiAgICBjb25zdCBvYmpJbmRleCA9IHRoaXMuc3RhdEFyci5maW5kSW5kZXgoKHdvcmRPYmopID0+IHtcclxuICAgICAgY29uc3QgcmVzdWx0ID0gKHdvcmRPYmoud29yZCA9PT0gY2FyZE9iai53b3JkKVxyXG4gICAgICAgICAgICAmJiAod29yZE9iai50cmFuc2xhdGlvbiA9PT0gY2FyZE9iai50cmFuc2xhdGlvbik7XHJcbiAgICAgIHJldHVybiByZXN1bHQ7XHJcbiAgICB9KTtcclxuXHJcbiAgICBzd2l0Y2ggKHR5cGUpIHtcclxuICAgICAgY2FzZSAnY2xpY2snOiB7XHJcbiAgICAgICAgdGhpcy5zdGF0QXJyW29iakluZGV4XS50cmFpbkNsaWNrICs9IDE7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIH1cclxuICAgICAgY2FzZSAnY29ycmVjdCc6IHtcclxuICAgICAgICB0aGlzLnN0YXRBcnJbb2JqSW5kZXhdLmNvcnJlY3RBbnN3ZXJzICs9IDE7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIH1cclxuICAgICAgY2FzZSAnd3JvbmcnOiB7XHJcbiAgICAgICAgdGhpcy5zdGF0QXJyW29iakluZGV4XS5taXN0YWtlcyArPSAxO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICB9XHJcbiAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgY29yckFuc3cgPSB0aGlzLnN0YXRBcnJbb2JqSW5kZXhdLmNvcnJlY3RBbnN3ZXJzO1xyXG4gICAgY29uc3Qgd3JvbmdBbnN3ID0gdGhpcy5zdGF0QXJyW29iakluZGV4XS5taXN0YWtlcztcclxuICAgIGlmIChjb3JyQW5zdyAmJiB3cm9uZ0Fuc3cpIHtcclxuICAgICAgdGhpcy5zdGF0QXJyW29iakluZGV4XS5wZXJjZW50YWdlID0gTWF0aC5yb3VuZCgoY29yckFuc3cgLyAoY29yckFuc3cgKyB3cm9uZ0Fuc3cpKSAqIDEwMCk7XHJcbiAgICB9IGVsc2UgaWYgKGNvcnJBbnN3KSB7XHJcbiAgICAgIHRoaXMuc3RhdEFycltvYmpJbmRleF0ucGVyY2VudGFnZSA9IDEwMDtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLnVwZGF0ZVN0b3JhZ2UoKTtcclxuICAgIHJldHVybiB0aGlzO1xyXG4gIH1cclxuXHJcbiAgZ2V0U29ydGVkQXJyQnlQcm9wKHByb3BlcnR5LCBzb3J0VHlwZSA9ICdkb3duJykge1xyXG4gICAgY29uc3Qgc29ydGVkQXJyID0gW107XHJcbiAgICB0aGlzLnN0YXRBcnIuZm9yRWFjaCgoaXRlbSkgPT4gc29ydGVkQXJyLnB1c2goaXRlbSkpO1xyXG5cclxuICAgIGZ1bmN0aW9uIGNvbXBhcmVGdW5jdGlvbihvYmpBLCBvYmpCKSB7XHJcbiAgICAgIGlmIChvYmpBW3Byb3BlcnR5XSA+IG9iakJbcHJvcGVydHldKSB7XHJcbiAgICAgICAgcmV0dXJuIDE7XHJcbiAgICAgIH1cclxuICAgICAgaWYgKG9iakFbcHJvcGVydHldIDwgb2JqQltwcm9wZXJ0eV0pIHtcclxuICAgICAgICByZXR1cm4gLTE7XHJcbiAgICAgIH1cclxuICAgICAgcmV0dXJuIDA7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKHNvcnRUeXBlID09PSAnZG93bicpIHtcclxuICAgICAgc29ydGVkQXJyLnNvcnQoKGEsIGIpID0+IGNvbXBhcmVGdW5jdGlvbihhLCBiKSk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBzb3J0ZWRBcnIuc29ydCgoYSwgYikgPT4gY29tcGFyZUZ1bmN0aW9uKGIsIGEpKTtcclxuICAgIH1cclxuICAgIHJldHVybiBzb3J0ZWRBcnI7XHJcbiAgfVxyXG5cclxuICBnZXREaWZmV29yZHNBcnIoKSB7XHJcbiAgICBjb25zdCBzb3J0ZWRBcnIgPSB0aGlzLmdldFNvcnRlZEFyckJ5UHJvcCgncGVyY2VudGFnZScsICdkb3duJyk7XHJcbiAgICBjb25zdCByZXN1bHRBcnIgPSBzb3J0ZWRBcnIuZmlsdGVyKChpdGVtKSA9PiBpdGVtLnBlcmNlbnRhZ2UgPiAwICYmIGl0ZW0ucGVyY2VudGFnZSA8IDEwMCk7XHJcbiAgICByZXR1cm4gcmVzdWx0QXJyO1xyXG4gIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgU3RhdFN0b3JhZ2U7XHJcbiIsIi8qIGVzbGludC1kaXNhYmxlIGxpbmVicmVhay1zdHlsZSAqL1xyXG4vKiBlc2xpbnQtZGlzYWJsZSBjbGFzcy1tZXRob2RzLXVzZS10aGlzICovXHJcbi8qIGVzbGludC1kaXNhYmxlIGxpbmVicmVhay1zdHlsZSAqL1xyXG4vKiBlc2xpbnQtZGlzYWJsZSBuby1jb25zb2xlICovXHJcbi8qIGVzbGludC1kaXNhYmxlIGxpbmVicmVhay1zdHlsZSAqL1xyXG4vKiBlc2xpbnQtZGlzYWJsZSBuby11bmRlZiAqL1xyXG4vKiBlc2xpbnQtZGlzYWJsZSBsaW5lYnJlYWstc3R5bGUgKi9cclxuXHJcbmltcG9ydCBTdGF0U3RvcmFnZSBmcm9tICcuL3N0YXRTdG9yYWdlJztcclxuaW1wb3J0IENhcmQgZnJvbSAnLi9jYXJkJztcclxuXHJcbmltcG9ydCB7XHJcbiAgY3JlYXRlQ3VzdG9tRWxlbWVudCxcclxufSBmcm9tICcuL2NvbW1vbkZ1bmN0JztcclxuXHJcbmNsYXNzIFN0YXRpc3RpYyB7XHJcbiAgY29uc3RydWN0b3IoYXBwQ29udHJvbCkge1xyXG4gICAgdGhpcy5hcHBDb250cm9sID0gYXBwQ29udHJvbDtcclxuICAgIHRoaXMuc3RvcmFnZSA9IG5ldyBTdGF0U3RvcmFnZShhcHBDb250cm9sLnRvcGljc0FyciwgYXBwQ29udHJvbC5jYXJkc0Fycik7XHJcbiAgICB0aGlzLnNvcnRlZCA9IGZhbHNlO1xyXG4gICAgdGhpcy5zb3J0VHlwZSA9IG51bGw7XHJcbiAgICB0aGlzLnNvcnRQcm9wZXJ0eSA9IG51bGw7XHJcbiAgICB0aGlzLmVsZW1lbnQgPSBudWxsO1xyXG4gICAgdGhpcy5wcm9wc0xpYiA9IHtcclxuICAgICAgQ2F0ZWdvcnk6ICd0b3BpYycsXHJcbiAgICAgIFdvcmQ6ICd3b3JkJyxcclxuICAgICAgVHJhbnNsYXRpb246ICd0cmFuc2xhdGlvbicsXHJcbiAgICAgIFRyYWluOiAndHJhaW5DbGljaycsXHJcbiAgICAgIENvcnJlY3Q6ICdjb3JyZWN0QW5zd2VycycsXHJcbiAgICAgIE1pc3Rha2VzOiAnbWlzdGFrZXMnLFxyXG4gICAgICAnJSc6ICdwZXJjZW50YWdlJyxcclxuICAgIH07XHJcbiAgICB0aGlzLmJ1aWxkKCk7XHJcbiAgfVxyXG5cclxuICBidWlsZChkYXRhQXJyID0gdGhpcy5zdG9yYWdlLnN0YXRBcnIpIHtcclxuICAgIGNvbnN0IGNsYXNzTmFtZXMgPSAnc3RhdC1jb250YWluZXInO1xyXG4gICAgY29uc3Qgc3RhdENvbnRlbnRFbGVtZW50ID0gKHRoaXMuYXBwQ29udHJvbC5jb250ZW50LnR5cGUgPT09ICdzdGF0aXN0aWMnKVxyXG4gICAgICA/IHRoaXMuY3JlYXRlVGFibGVFbGVtZW50KGRhdGFBcnIpXHJcbiAgICAgIDogdGhpcy5jcmVhdGVUcmFpbkRpZmZDb250YWluZXIoKTtcclxuXHJcbiAgICBjb25zdCB0ZW1wbGF0ZSA9IGBcclxuICAgICAgICAgICAgICAgICAgICAgIDxoMj5HYW1lIFN0YXRpc3RpYzwvaDI+XHJcbiAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwic3RhdC1idXR0b25zLXdyYXBwZXJcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImJ1dHRvbiBzdGF0LWJ1dHRvbiB0cmFpbi1kaWZmXCI+VHJhaW4gZGlmZmljdWx0IHdvcmRzPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJidXR0b24gc3RhdC1idXR0b24gcmVzZXQtc3RhdFwiPlJlc2V0IHN0YXRzPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICBgO1xyXG5cclxuICAgIGNvbnN0IHN0YXRFbGVtZW50ID0gY3JlYXRlQ3VzdG9tRWxlbWVudCgnZGl2JywgY2xhc3NOYW1lcywgdGVtcGxhdGUpO1xyXG5cclxuICAgIHN0YXRFbGVtZW50LmFwcGVuZChzdGF0Q29udGVudEVsZW1lbnQpO1xyXG4gICAgdGhpcy5lbGVtZW50ID0gc3RhdEVsZW1lbnQ7XHJcbiAgICByZXR1cm4gdGhpcztcclxuICB9XHJcblxyXG4gIGNyZWF0ZVRhYmxlRWxlbWVudChkYXRhQXJyKSB7XHJcbiAgICBjb25zdCB0YWJsZUVsZW1lbnQgPSBjcmVhdGVDdXN0b21FbGVtZW50KCdkaXYnLCAndGFibGUtd3JhcHBlcicpO1xyXG5cclxuICAgIGxldCB0YWJsZUJvZHlJbm5lciA9ICcnO1xyXG4gICAgZGF0YUFyci5mb3JFYWNoKCh3b3JkT2JqKSA9PiB7XHJcbiAgICAgIGNvbnN0IHJvd1RlbXBsYXRlID0gYFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIDx0cj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0ZD4ke3dvcmRPYmoudG9waWN9PC90aD5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0ZD4ke3dvcmRPYmoud29yZH08L3RoPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRkPiR7d29yZE9iai50cmFuc2xhdGlvbn08L3RoPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRkPiR7d29yZE9iai50cmFpbkNsaWNrfTwvdGg+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dGQ+JHt3b3JkT2JqLmNvcnJlY3RBbnN3ZXJzfTwvdGg+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dGQ+JHt3b3JkT2JqLm1pc3Rha2VzfTwvdGg+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dGQ+JHt3b3JkT2JqLnBlcmNlbnRhZ2V9Jm5ic3A7JTwvdGg+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgPC90cj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICBgO1xyXG4gICAgICB0YWJsZUJvZHlJbm5lciArPSByb3dUZW1wbGF0ZTtcclxuICAgIH0pO1xyXG5cclxuICAgIGNvbnN0IHRoQ2xhc3NOYW1lcyA9ICdidXR0b24gc29ydGFibGUnO1xyXG4gICAgY29uc3QgdGhUaXRsZSA9ICdzb3J0JztcclxuICAgIGxldCB0aGVhZFJvd0lubmVyID0gJyc7XHJcblxyXG4gICAgT2JqZWN0LmVudHJpZXModGhpcy5wcm9wc0xpYikuZm9yRWFjaCgoW2NvbHVtbk5hbWUsIHByb3BOYW1lXSkgPT4ge1xyXG4gICAgICBsZXQgc29ydENsYXNzTmFtZSA9ICcnO1xyXG4gICAgICBsZXQgaW1hZ2VIVE1MID0gJyc7XHJcblxyXG4gICAgICBpZiAodGhpcy5zb3J0ZWQgJiYgKHRoaXMuc29ydFByb3BlcnR5ID09PSBwcm9wTmFtZSkpIHtcclxuICAgICAgICBzb3J0Q2xhc3NOYW1lID0gYCBzb3J0ZWQtJHt0aGlzLnNvcnRUeXBlfWA7XHJcbiAgICAgICAgY29uc3QgaW1hZ2VOYW1lID0gKHRoaXMuc29ydFR5cGUgPT09ICdkb3duJykgPyAnc29ydC1hc2MnIDogJ3NvcnQtZGVzYyc7XHJcbiAgICAgICAgaW1hZ2VIVE1MID0gYFxyXG4gICAgICAgICAgICAgICAgICAgIDxpbWcgY2xhc3M9XCJzb3J0LWljb24gYnV0dG9uIHNvcnRhYmxlXCIgc3JjPS4uL2Fzc2V0cy9pY29ucy8ke2ltYWdlTmFtZX0ucG5nIGFsdD1cInNvcnQgaWNvblwiIHdpZHRoPVwiNTFcIiBoZWlnaHQ9XCI1MVwiPjwvaW1nPlxyXG4gICAgICAgICAgICAgICAgICAgIGA7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHRoZWFkUm93SW5uZXIgKz0gYFxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8dGggY2xhc3M9XCJ0aGVhZCAke3RoQ2xhc3NOYW1lc30ke3NvcnRDbGFzc05hbWV9XCIgdGl0bGU9XCIke3RoVGl0bGV9XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJ0aE5hbWUgYnV0dG9uIHNvcnRhYmxlXCI+JHtjb2x1bW5OYW1lfTwvc3Bhbj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAke2ltYWdlSFRNTH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgPC90aD5cclxuICAgICAgICAgICAgICAgICAgICAgICAgYDtcclxuICAgIH0pO1xyXG5cclxuICAgIGNvbnN0IHRhYmxlSW5uZXJIVE1MID0gYFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIDx0YWJsZSBjbGFzcz1cInN0YXQtdGFibGVcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0aGVhZD5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRyPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICR7dGhlYWRSb3dJbm5lcn1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC90cj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvdGhlYWQ+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dGJvZHk+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICR7dGFibGVCb2R5SW5uZXJ9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3Rib2R5PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIDwvdGFibGU+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGA7XHJcblxyXG4gICAgdGFibGVFbGVtZW50LmlubmVySFRNTCA9IHRhYmxlSW5uZXJIVE1MO1xyXG5cclxuICAgIHJldHVybiB0YWJsZUVsZW1lbnQ7XHJcbiAgfVxyXG5cclxuICBjcmVhdGVUcmFpbkRpZmZDb250YWluZXIoKSB7XHJcbiAgICBsZXQgcmVzdWx0RWxlbWVudDtcclxuICAgIGNvbnN0IGRpZmZXb3Jkc0FyciA9IHRoaXMuc3RvcmFnZS5nZXREaWZmV29yZHNBcnIoKTtcclxuICAgIGNvbnN0IGRpZmZXb3Jkc0Ftb3VudCA9IGRpZmZXb3Jkc0Fyci5sZW5ndGg7XHJcblxyXG4gICAgc3dpdGNoIChkaWZmV29yZHNBbW91bnQpIHtcclxuICAgICAgY2FzZSAwOiB7XHJcbiAgICAgICAgY29uc3QgdGVtcGxhdGUgPSBgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImdyYXBoaWNcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxpbWcgc3JjPVwiLi4vYXNzZXRzL2ltZy9hcHAvc3VwZXIucG5nXCIgYWx0PVwic3VwZXIgcmVzdWx0XCIgd2lkdGg9XCI3NTNcIiBoZWlnaHQ9XCI1NTNcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICA8cD5Ob3RoaW5nIGRpZmZpY3VsdCE8L3A+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGA7XHJcblxyXG4gICAgICAgIHJlc3VsdEVsZW1lbnQgPSBjcmVhdGVDdXN0b21FbGVtZW50KCdkaXYnLCAnbm90aGluZy1kaWZmJywgdGVtcGxhdGUpO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICB9XHJcbiAgICAgIGRlZmF1bHQ6IHtcclxuICAgICAgICBjb25zdCBjYXJkc0NvbnRhaW5lckVsZW1lbnQgPSBjcmVhdGVDdXN0b21FbGVtZW50KCdkaXYnLCAnY2FyZC1jb250YWluZXInKTtcclxuICAgICAgICBjb25zdCBtYXhDYXJkc0Ftb3VudCA9IDg7XHJcbiAgICAgICAgY29uc3QgY2FyZHNBbW91bnQgPSAoZGlmZldvcmRzQXJyLmxlbmd0aCA8IG1heENhcmRzQW1vdW50KVxyXG4gICAgICAgICAgPyBkaWZmV29yZHNBbW91bnRcclxuICAgICAgICAgIDogbWF4Q2FyZHNBbW91bnQ7XHJcblxyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgY2FyZHNBbW91bnQ7IGkgKz0gMSkge1xyXG4gICAgICAgICAgY29uc3QgY2FyZE9iaiA9IGRpZmZXb3Jkc0FycltpXTtcclxuICAgICAgICAgIGNvbnN0IGNhcmRFbGVtZW50ID0gbmV3IENhcmQodGhpcy5hcHBDb250cm9sLCBjYXJkT2JqLCAndG9waWMnKS5lbGVtZW50O1xyXG4gICAgICAgICAgY2FyZHNDb250YWluZXJFbGVtZW50LmFwcGVuZChjYXJkRWxlbWVudCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXN1bHRFbGVtZW50ID0gY2FyZHNDb250YWluZXJFbGVtZW50O1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHJlc3VsdEVsZW1lbnQ7XHJcbiAgfVxyXG5cclxuICBzb3J0VGFibGUodGFyZ2V0RWxlbWVudCkge1xyXG4gICAgY29uc3QgdGhIZWFkRWxlbWVudCA9IHRoaXMuZ2V0VGhlYWRCeVRhcmdldCh0YXJnZXRFbGVtZW50KTtcclxuICAgIHRoaXMuc29ydGVkID0gdHJ1ZTtcclxuICAgIHRoaXMuc29ydFR5cGUgPSAoIXRoSGVhZEVsZW1lbnQuY2xhc3NMaXN0LmNvbnRhaW5zKCdzb3J0ZWQtZG93bicpKSA/ICdkb3duJyA6ICd1cCc7XHJcbiAgICBjb25zdCB0aE5hbWUgPSB0aEhlYWRFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJy50aE5hbWUnKS5pbm5lckhUTUw7XHJcbiAgICB0aGlzLnNvcnRQcm9wZXJ0eSA9IHRoaXMucHJvcHNMaWJbdGhOYW1lXTtcclxuICAgIGNvbnN0IHNvcnRlZEFyciA9IHRoaXMuc3RvcmFnZS5nZXRTb3J0ZWRBcnJCeVByb3AodGhpcy5zb3J0UHJvcGVydHksIHRoaXMuc29ydFR5cGUpO1xyXG4gICAgdGhpcy5idWlsZChzb3J0ZWRBcnIpO1xyXG4gICAgcmV0dXJuIHRoaXM7XHJcbiAgfVxyXG5cclxuICBnZXRUaGVhZEJ5VGFyZ2V0KHRhcmdldEVsZW1lbnQpIHtcclxuICAgIGxldCBzZWFyY2hFbGVtZW50ID0gdGFyZ2V0RWxlbWVudDtcclxuICAgIHdoaWxlICghc2VhcmNoRWxlbWVudC5jbGFzc0xpc3QuY29udGFpbnMoJ3RoZWFkJykpIHtcclxuICAgICAgc2VhcmNoRWxlbWVudCA9IHNlYXJjaEVsZW1lbnQucGFyZW50RWxlbWVudDtcclxuICAgIH1cclxuICAgIHJldHVybiBzZWFyY2hFbGVtZW50O1xyXG4gIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgU3RhdGlzdGljO1xyXG4iLCIvKiBlc2xpbnQtZGlzYWJsZSBsaW5lYnJlYWstc3R5bGUgKi9cclxuLyogZXNsaW50LWRpc2FibGUgbm8tY29uc29sZSAqL1xyXG4vKiBlc2xpbnQtZGlzYWJsZSBsaW5lYnJlYWstc3R5bGUgKi9cclxuLyogZXNsaW50LWRpc2FibGUgbm8tdW5kZWYgKi9cclxuXHJcbmltcG9ydCB7IGNyZWF0ZUN1c3RvbUVsZW1lbnQgfSBmcm9tICcuL2NvbW1vbkZ1bmN0JztcclxuXHJcbmNsYXNzIFN3aXRjaCB7XHJcbiAgY29uc3RydWN0b3IoYXBwQ3RybE9iaikge1xyXG4gICAgdGhpcy52YWxpZE1vZGVzID0gWyd0cmFpbicsICdwbGF5J107XHJcbiAgICB0aGlzLmFjdGl2ZU1vZGUgPSAndHJhaW4nO1xyXG4gICAgdGhpcy5hcHBDb250cm9sID0gYXBwQ3RybE9iajtcclxuICAgIHRoaXMuZWxlbWVudCA9IG51bGw7XHJcbiAgICB0aGlzLmJ1aWxkKCk7XHJcbiAgfVxyXG5cclxuICBidWlsZCgpIHtcclxuICAgIGNvbnN0IGNsYXNzTmFtZXMgPSAnYnV0dG9uIHN3aXRjaCc7XHJcbiAgICBjb25zdCB0ZW1wbGF0ZSA9IGBcclxuICAgICAgICAgICAgICAgICAgICA8cCBjbGFzcz1cInN3aXRjaC10cmlnZ2VyXCI+VHJhaW48L3A+XHJcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInN3aXRjaC1yYWlsXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwic3dpdGNoLXJvbGxlclwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgPHAgY2xhc3M9XCJzd2l0Y2gtdHJpZ2dlclwiPlBsYXk8L3A+XHJcbiAgICAgICAgICAgICAgICAgICAgYDtcclxuXHJcbiAgICB0aGlzLmVsZW1lbnQgPSBjcmVhdGVDdXN0b21FbGVtZW50KCdkaXYnLCBjbGFzc05hbWVzLCB0ZW1wbGF0ZSk7XHJcbiAgICByZXR1cm4gdGhpcztcclxuICB9XHJcblxyXG4gIGFkZFRvRG9jKCkge1xyXG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm1haW4tY29udHJvbHMnKS5hcHBlbmQodGhpcy5lbGVtZW50KTtcclxuICAgIHJldHVybiB0aGlzO1xyXG4gIH1cclxuXHJcbiAgdG9nZ2xlKCkge1xyXG4gICAgdGhpcy5lbGVtZW50LmNsYXNzTGlzdC50b2dnbGUoJ3N3aXRjaC1vbicpO1xyXG4gICAgdGhpcy5hY3RpdmVNb2RlID0gKHRoaXMuYWN0aXZlTW9kZSA9PT0gJ3BsYXknKSA/ICd0cmFpbicgOiAncGxheSc7XHJcbiAgfVxyXG5cclxuICB0cmFpbigpIHtcclxuICAgIHRoaXMuZWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKCdzd2l0Y2gtb24nKTtcclxuICAgIHRoaXMuYWN0aXZlTW9kZSA9ICd0cmFpbic7XHJcbiAgfVxyXG5cclxuICBlbmFibGUoKSB7XHJcbiAgICB0aGlzLmVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZSgnZGlzYWJsZWQnKTtcclxuICB9XHJcblxyXG4gIGRpc2FibGUoKSB7XHJcbiAgICB0aGlzLmVsZW1lbnQuY2xhc3NMaXN0LmFkZCgnZGlzYWJsZWQnKTtcclxuICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IFN3aXRjaDtcclxuIiwiLy8gSW1wb3J0c1xuaW1wb3J0IF9fX0NTU19MT0FERVJfQVBJX1NPVVJDRU1BUF9JTVBPUlRfX18gZnJvbSBcIi4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9zb3VyY2VNYXBzLmpzXCI7XG5pbXBvcnQgX19fQ1NTX0xPQURFUl9BUElfSU1QT1JUX19fIGZyb20gXCIuLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvYXBpLmpzXCI7XG52YXIgX19fQ1NTX0xPQURFUl9FWFBPUlRfX18gPSBfX19DU1NfTE9BREVSX0FQSV9JTVBPUlRfX18oX19fQ1NTX0xPQURFUl9BUElfU09VUkNFTUFQX0lNUE9SVF9fXyk7XG4vLyBNb2R1bGVcbl9fX0NTU19MT0FERVJfRVhQT1JUX19fLnB1c2goW21vZHVsZS5pZCwgXCIvKiEgbm9ybWFsaXplLmNzcyB2OC4wLjEgfCBNSVQgTGljZW5zZSB8IGdpdGh1Yi5jb20vbmVjb2xhcy9ub3JtYWxpemUuY3NzICovXFxyXFxuXFxyXFxuLyogRG9jdW1lbnRcXHJcXG4gICA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PSAqL1xcclxcblxcclxcbi8qKlxcclxcbiAqIDEuIENvcnJlY3QgdGhlIGxpbmUgaGVpZ2h0IGluIGFsbCBicm93c2Vycy5cXHJcXG4gKiAyLiBQcmV2ZW50IGFkanVzdG1lbnRzIG9mIGZvbnQgc2l6ZSBhZnRlciBvcmllbnRhdGlvbiBjaGFuZ2VzIGluIGlPUy5cXHJcXG4gKi9cXHJcXG5cXHJcXG5odG1sIHtcXHJcXG4gIGxpbmUtaGVpZ2h0OiAxLjE1OyAvKiAxICovXFxyXFxuICAtd2Via2l0LXRleHQtc2l6ZS1hZGp1c3Q6IDEwMCU7IC8qIDIgKi9cXHJcXG59XFxyXFxuXFxyXFxuLyogU2VjdGlvbnNcXHJcXG4gICA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PSAqL1xcclxcblxcclxcbi8qKlxcclxcbiAqIFJlbW92ZSB0aGUgbWFyZ2luIGluIGFsbCBicm93c2Vycy5cXHJcXG4gKi9cXHJcXG5cXHJcXG5ib2R5IHtcXHJcXG4gIG1hcmdpbjogMDtcXHJcXG59XFxyXFxuXFxyXFxuLyoqXFxyXFxuICogUmVuZGVyIHRoZSBgbWFpbmAgZWxlbWVudCBjb25zaXN0ZW50bHkgaW4gSUUuXFxyXFxuICovXFxyXFxuXFxyXFxubWFpbiB7XFxyXFxuICBkaXNwbGF5OiBibG9jaztcXHJcXG59XFxyXFxuXFxyXFxuLyoqXFxyXFxuICogQ29ycmVjdCB0aGUgZm9udCBzaXplIGFuZCBtYXJnaW4gb24gYGgxYCBlbGVtZW50cyB3aXRoaW4gYHNlY3Rpb25gIGFuZFxcclxcbiAqIGBhcnRpY2xlYCBjb250ZXh0cyBpbiBDaHJvbWUsIEZpcmVmb3gsIGFuZCBTYWZhcmkuXFxyXFxuICovXFxyXFxuXFxyXFxuaDEge1xcclxcbiAgZm9udC1zaXplOiAyZW07XFxyXFxuICBtYXJnaW46IDAuNjdlbSAwO1xcclxcbn1cXHJcXG5cXHJcXG4vKiBHcm91cGluZyBjb250ZW50XFxyXFxuICAgPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0gKi9cXHJcXG5cXHJcXG4vKipcXHJcXG4gKiAxLiBBZGQgdGhlIGNvcnJlY3QgYm94IHNpemluZyBpbiBGaXJlZm94LlxcclxcbiAqIDIuIFNob3cgdGhlIG92ZXJmbG93IGluIEVkZ2UgYW5kIElFLlxcclxcbiAqL1xcclxcblxcclxcbmhyIHtcXHJcXG4gIGJveC1zaXppbmc6IGNvbnRlbnQtYm94OyAvKiAxICovXFxyXFxuICBoZWlnaHQ6IDA7IC8qIDEgKi9cXHJcXG4gIG92ZXJmbG93OiB2aXNpYmxlOyAvKiAyICovXFxyXFxufVxcclxcblxcclxcbi8qKlxcclxcbiAqIDEuIENvcnJlY3QgdGhlIGluaGVyaXRhbmNlIGFuZCBzY2FsaW5nIG9mIGZvbnQgc2l6ZSBpbiBhbGwgYnJvd3NlcnMuXFxyXFxuICogMi4gQ29ycmVjdCB0aGUgb2RkIGBlbWAgZm9udCBzaXppbmcgaW4gYWxsIGJyb3dzZXJzLlxcclxcbiAqL1xcclxcblxcclxcbnByZSB7XFxyXFxuICBmb250LWZhbWlseTogbW9ub3NwYWNlLCBtb25vc3BhY2U7IC8qIDEgKi9cXHJcXG4gIGZvbnQtc2l6ZTogMWVtOyAvKiAyICovXFxyXFxufVxcclxcblxcclxcbi8qIFRleHQtbGV2ZWwgc2VtYW50aWNzXFxyXFxuICAgPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0gKi9cXHJcXG5cXHJcXG4vKipcXHJcXG4gKiBSZW1vdmUgdGhlIGdyYXkgYmFja2dyb3VuZCBvbiBhY3RpdmUgbGlua3MgaW4gSUUgMTAuXFxyXFxuICovXFxyXFxuXFxyXFxuYSB7XFxyXFxuICBiYWNrZ3JvdW5kLWNvbG9yOiB0cmFuc3BhcmVudDtcXHJcXG59XFxyXFxuXFxyXFxuLyoqXFxyXFxuICogMS4gUmVtb3ZlIHRoZSBib3R0b20gYm9yZGVyIGluIENocm9tZSA1Ny1cXHJcXG4gKiAyLiBBZGQgdGhlIGNvcnJlY3QgdGV4dCBkZWNvcmF0aW9uIGluIENocm9tZSwgRWRnZSwgSUUsIE9wZXJhLCBhbmQgU2FmYXJpLlxcclxcbiAqL1xcclxcblxcclxcbmFiYnJbdGl0bGVdIHtcXHJcXG4gIGJvcmRlci1ib3R0b206IG5vbmU7IC8qIDEgKi9cXHJcXG4gIHRleHQtZGVjb3JhdGlvbjogdW5kZXJsaW5lOyAvKiAyICovXFxyXFxuICB0ZXh0LWRlY29yYXRpb246IHVuZGVybGluZSBkb3R0ZWQ7IC8qIDIgKi9cXHJcXG59XFxyXFxuXFxyXFxuLyoqXFxyXFxuICogQWRkIHRoZSBjb3JyZWN0IGZvbnQgd2VpZ2h0IGluIENocm9tZSwgRWRnZSwgYW5kIFNhZmFyaS5cXHJcXG4gKi9cXHJcXG5cXHJcXG5iLFxcclxcbnN0cm9uZyB7XFxyXFxuICBmb250LXdlaWdodDogYm9sZGVyO1xcclxcbn1cXHJcXG5cXHJcXG4vKipcXHJcXG4gKiAxLiBDb3JyZWN0IHRoZSBpbmhlcml0YW5jZSBhbmQgc2NhbGluZyBvZiBmb250IHNpemUgaW4gYWxsIGJyb3dzZXJzLlxcclxcbiAqIDIuIENvcnJlY3QgdGhlIG9kZCBgZW1gIGZvbnQgc2l6aW5nIGluIGFsbCBicm93c2Vycy5cXHJcXG4gKi9cXHJcXG5cXHJcXG5jb2RlLFxcclxcbmtiZCxcXHJcXG5zYW1wIHtcXHJcXG4gIGZvbnQtZmFtaWx5OiBtb25vc3BhY2UsIG1vbm9zcGFjZTsgLyogMSAqL1xcclxcbiAgZm9udC1zaXplOiAxZW07IC8qIDIgKi9cXHJcXG59XFxyXFxuXFxyXFxuLyoqXFxyXFxuICogQWRkIHRoZSBjb3JyZWN0IGZvbnQgc2l6ZSBpbiBhbGwgYnJvd3NlcnMuXFxyXFxuICovXFxyXFxuXFxyXFxuc21hbGwge1xcclxcbiAgZm9udC1zaXplOiA4MCU7XFxyXFxufVxcclxcblxcclxcbi8qKlxcclxcbiAqIFByZXZlbnQgYHN1YmAgYW5kIGBzdXBgIGVsZW1lbnRzIGZyb20gYWZmZWN0aW5nIHRoZSBsaW5lIGhlaWdodCBpblxcclxcbiAqIGFsbCBicm93c2Vycy5cXHJcXG4gKi9cXHJcXG5cXHJcXG5zdWIsXFxyXFxuc3VwIHtcXHJcXG4gIGZvbnQtc2l6ZTogNzUlO1xcclxcbiAgbGluZS1oZWlnaHQ6IDA7XFxyXFxuICBwb3NpdGlvbjogcmVsYXRpdmU7XFxyXFxuICB2ZXJ0aWNhbC1hbGlnbjogYmFzZWxpbmU7XFxyXFxufVxcclxcblxcclxcbnN1YiB7XFxyXFxuICBib3R0b206IC0wLjI1ZW07XFxyXFxufVxcclxcblxcclxcbnN1cCB7XFxyXFxuICB0b3A6IC0wLjVlbTtcXHJcXG59XFxyXFxuXFxyXFxuLyogRW1iZWRkZWQgY29udGVudFxcclxcbiAgID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09ICovXFxyXFxuXFxyXFxuLyoqXFxyXFxuICogUmVtb3ZlIHRoZSBib3JkZXIgb24gaW1hZ2VzIGluc2lkZSBsaW5rcyBpbiBJRSAxMC5cXHJcXG4gKi9cXHJcXG5cXHJcXG5pbWcge1xcclxcbiAgYm9yZGVyLXN0eWxlOiBub25lO1xcclxcbn1cXHJcXG5cXHJcXG4vKiBGb3Jtc1xcclxcbiAgID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09ICovXFxyXFxuXFxyXFxuLyoqXFxyXFxuICogMS4gQ2hhbmdlIHRoZSBmb250IHN0eWxlcyBpbiBhbGwgYnJvd3NlcnMuXFxyXFxuICogMi4gUmVtb3ZlIHRoZSBtYXJnaW4gaW4gRmlyZWZveCBhbmQgU2FmYXJpLlxcclxcbiAqL1xcclxcblxcclxcbmJ1dHRvbixcXHJcXG5pbnB1dCxcXHJcXG5vcHRncm91cCxcXHJcXG5zZWxlY3QsXFxyXFxudGV4dGFyZWEge1xcclxcbiAgZm9udC1mYW1pbHk6IGluaGVyaXQ7IC8qIDEgKi9cXHJcXG4gIGZvbnQtc2l6ZTogMTAwJTsgLyogMSAqL1xcclxcbiAgbGluZS1oZWlnaHQ6IDEuMTU7IC8qIDEgKi9cXHJcXG4gIG1hcmdpbjogMDsgLyogMiAqL1xcclxcbn1cXHJcXG5cXHJcXG4vKipcXHJcXG4gKiBTaG93IHRoZSBvdmVyZmxvdyBpbiBJRS5cXHJcXG4gKiAxLiBTaG93IHRoZSBvdmVyZmxvdyBpbiBFZGdlLlxcclxcbiAqL1xcclxcblxcclxcbmJ1dHRvbixcXHJcXG5pbnB1dCB7IC8qIDEgKi9cXHJcXG4gIG92ZXJmbG93OiB2aXNpYmxlO1xcclxcbn1cXHJcXG5cXHJcXG4vKipcXHJcXG4gKiBSZW1vdmUgdGhlIGluaGVyaXRhbmNlIG9mIHRleHQgdHJhbnNmb3JtIGluIEVkZ2UsIEZpcmVmb3gsIGFuZCBJRS5cXHJcXG4gKiAxLiBSZW1vdmUgdGhlIGluaGVyaXRhbmNlIG9mIHRleHQgdHJhbnNmb3JtIGluIEZpcmVmb3guXFxyXFxuICovXFxyXFxuXFxyXFxuYnV0dG9uLFxcclxcbnNlbGVjdCB7IC8qIDEgKi9cXHJcXG4gIHRleHQtdHJhbnNmb3JtOiBub25lO1xcclxcbn1cXHJcXG5cXHJcXG4vKipcXHJcXG4gKiBDb3JyZWN0IHRoZSBpbmFiaWxpdHkgdG8gc3R5bGUgY2xpY2thYmxlIHR5cGVzIGluIGlPUyBhbmQgU2FmYXJpLlxcclxcbiAqL1xcclxcblxcclxcbmJ1dHRvbixcXHJcXG5bdHlwZT1cXFwiYnV0dG9uXFxcIl0sXFxyXFxuW3R5cGU9XFxcInJlc2V0XFxcIl0sXFxyXFxuW3R5cGU9XFxcInN1Ym1pdFxcXCJdIHtcXHJcXG4gIC13ZWJraXQtYXBwZWFyYW5jZTogYnV0dG9uO1xcclxcbn1cXHJcXG5cXHJcXG4vKipcXHJcXG4gKiBSZW1vdmUgdGhlIGlubmVyIGJvcmRlciBhbmQgcGFkZGluZyBpbiBGaXJlZm94LlxcclxcbiAqL1xcclxcblxcclxcbmJ1dHRvbjo6LW1vei1mb2N1cy1pbm5lcixcXHJcXG5bdHlwZT1cXFwiYnV0dG9uXFxcIl06Oi1tb3otZm9jdXMtaW5uZXIsXFxyXFxuW3R5cGU9XFxcInJlc2V0XFxcIl06Oi1tb3otZm9jdXMtaW5uZXIsXFxyXFxuW3R5cGU9XFxcInN1Ym1pdFxcXCJdOjotbW96LWZvY3VzLWlubmVyIHtcXHJcXG4gIGJvcmRlci1zdHlsZTogbm9uZTtcXHJcXG4gIHBhZGRpbmc6IDA7XFxyXFxufVxcclxcblxcclxcbi8qKlxcclxcbiAqIFJlc3RvcmUgdGhlIGZvY3VzIHN0eWxlcyB1bnNldCBieSB0aGUgcHJldmlvdXMgcnVsZS5cXHJcXG4gKi9cXHJcXG5cXHJcXG5idXR0b246LW1vei1mb2N1c3JpbmcsXFxyXFxuW3R5cGU9XFxcImJ1dHRvblxcXCJdOi1tb3otZm9jdXNyaW5nLFxcclxcblt0eXBlPVxcXCJyZXNldFxcXCJdOi1tb3otZm9jdXNyaW5nLFxcclxcblt0eXBlPVxcXCJzdWJtaXRcXFwiXTotbW96LWZvY3VzcmluZyB7XFxyXFxuICBvdXRsaW5lOiAxcHggZG90dGVkIEJ1dHRvblRleHQ7XFxyXFxufVxcclxcblxcclxcbi8qKlxcclxcbiAqIENvcnJlY3QgdGhlIHBhZGRpbmcgaW4gRmlyZWZveC5cXHJcXG4gKi9cXHJcXG5cXHJcXG5maWVsZHNldCB7XFxyXFxuICBwYWRkaW5nOiAwLjM1ZW0gMC43NWVtIDAuNjI1ZW07XFxyXFxufVxcclxcblxcclxcbi8qKlxcclxcbiAqIDEuIENvcnJlY3QgdGhlIHRleHQgd3JhcHBpbmcgaW4gRWRnZSBhbmQgSUUuXFxyXFxuICogMi4gQ29ycmVjdCB0aGUgY29sb3IgaW5oZXJpdGFuY2UgZnJvbSBgZmllbGRzZXRgIGVsZW1lbnRzIGluIElFLlxcclxcbiAqIDMuIFJlbW92ZSB0aGUgcGFkZGluZyBzbyBkZXZlbG9wZXJzIGFyZSBub3QgY2F1Z2h0IG91dCB3aGVuIHRoZXkgemVybyBvdXRcXHJcXG4gKiAgICBgZmllbGRzZXRgIGVsZW1lbnRzIGluIGFsbCBicm93c2Vycy5cXHJcXG4gKi9cXHJcXG5cXHJcXG5sZWdlbmQge1xcclxcbiAgYm94LXNpemluZzogYm9yZGVyLWJveDsgLyogMSAqL1xcclxcbiAgY29sb3I6IGluaGVyaXQ7IC8qIDIgKi9cXHJcXG4gIGRpc3BsYXk6IHRhYmxlOyAvKiAxICovXFxyXFxuICBtYXgtd2lkdGg6IDEwMCU7IC8qIDEgKi9cXHJcXG4gIHBhZGRpbmc6IDA7IC8qIDMgKi9cXHJcXG4gIHdoaXRlLXNwYWNlOiBub3JtYWw7IC8qIDEgKi9cXHJcXG59XFxyXFxuXFxyXFxuLyoqXFxyXFxuICogQWRkIHRoZSBjb3JyZWN0IHZlcnRpY2FsIGFsaWdubWVudCBpbiBDaHJvbWUsIEZpcmVmb3gsIGFuZCBPcGVyYS5cXHJcXG4gKi9cXHJcXG5cXHJcXG5wcm9ncmVzcyB7XFxyXFxuICB2ZXJ0aWNhbC1hbGlnbjogYmFzZWxpbmU7XFxyXFxufVxcclxcblxcclxcbi8qKlxcclxcbiAqIFJlbW92ZSB0aGUgZGVmYXVsdCB2ZXJ0aWNhbCBzY3JvbGxiYXIgaW4gSUUgMTArLlxcclxcbiAqL1xcclxcblxcclxcbnRleHRhcmVhIHtcXHJcXG4gIG92ZXJmbG93OiBhdXRvO1xcclxcbn1cXHJcXG5cXHJcXG4vKipcXHJcXG4gKiAxLiBBZGQgdGhlIGNvcnJlY3QgYm94IHNpemluZyBpbiBJRSAxMC5cXHJcXG4gKiAyLiBSZW1vdmUgdGhlIHBhZGRpbmcgaW4gSUUgMTAuXFxyXFxuICovXFxyXFxuXFxyXFxuW3R5cGU9XFxcImNoZWNrYm94XFxcIl0sXFxyXFxuW3R5cGU9XFxcInJhZGlvXFxcIl0ge1xcclxcbiAgYm94LXNpemluZzogYm9yZGVyLWJveDsgLyogMSAqL1xcclxcbiAgcGFkZGluZzogMDsgLyogMiAqL1xcclxcbn1cXHJcXG5cXHJcXG4vKipcXHJcXG4gKiBDb3JyZWN0IHRoZSBjdXJzb3Igc3R5bGUgb2YgaW5jcmVtZW50IGFuZCBkZWNyZW1lbnQgYnV0dG9ucyBpbiBDaHJvbWUuXFxyXFxuICovXFxyXFxuXFxyXFxuW3R5cGU9XFxcIm51bWJlclxcXCJdOjotd2Via2l0LWlubmVyLXNwaW4tYnV0dG9uLFxcclxcblt0eXBlPVxcXCJudW1iZXJcXFwiXTo6LXdlYmtpdC1vdXRlci1zcGluLWJ1dHRvbiB7XFxyXFxuICBoZWlnaHQ6IGF1dG87XFxyXFxufVxcclxcblxcclxcbi8qKlxcclxcbiAqIDEuIENvcnJlY3QgdGhlIG9kZCBhcHBlYXJhbmNlIGluIENocm9tZSBhbmQgU2FmYXJpLlxcclxcbiAqIDIuIENvcnJlY3QgdGhlIG91dGxpbmUgc3R5bGUgaW4gU2FmYXJpLlxcclxcbiAqL1xcclxcblxcclxcblt0eXBlPVxcXCJzZWFyY2hcXFwiXSB7XFxyXFxuICAtd2Via2l0LWFwcGVhcmFuY2U6IHRleHRmaWVsZDsgLyogMSAqL1xcclxcbiAgb3V0bGluZS1vZmZzZXQ6IC0ycHg7IC8qIDIgKi9cXHJcXG59XFxyXFxuXFxyXFxuLyoqXFxyXFxuICogUmVtb3ZlIHRoZSBpbm5lciBwYWRkaW5nIGluIENocm9tZSBhbmQgU2FmYXJpIG9uIG1hY09TLlxcclxcbiAqL1xcclxcblxcclxcblt0eXBlPVxcXCJzZWFyY2hcXFwiXTo6LXdlYmtpdC1zZWFyY2gtZGVjb3JhdGlvbiB7XFxyXFxuICAtd2Via2l0LWFwcGVhcmFuY2U6IG5vbmU7XFxyXFxufVxcclxcblxcclxcbi8qKlxcclxcbiAqIDEuIENvcnJlY3QgdGhlIGluYWJpbGl0eSB0byBzdHlsZSBjbGlja2FibGUgdHlwZXMgaW4gaU9TIGFuZCBTYWZhcmkuXFxyXFxuICogMi4gQ2hhbmdlIGZvbnQgcHJvcGVydGllcyB0byBgaW5oZXJpdGAgaW4gU2FmYXJpLlxcclxcbiAqL1xcclxcblxcclxcbjo6LXdlYmtpdC1maWxlLXVwbG9hZC1idXR0b24ge1xcclxcbiAgLXdlYmtpdC1hcHBlYXJhbmNlOiBidXR0b247IC8qIDEgKi9cXHJcXG4gIGZvbnQ6IGluaGVyaXQ7IC8qIDIgKi9cXHJcXG59XFxyXFxuXFxyXFxuLyogSW50ZXJhY3RpdmVcXHJcXG4gICA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PSAqL1xcclxcblxcclxcbi8qXFxyXFxuICogQWRkIHRoZSBjb3JyZWN0IGRpc3BsYXkgaW4gRWRnZSwgSUUgMTArLCBhbmQgRmlyZWZveC5cXHJcXG4gKi9cXHJcXG5cXHJcXG5kZXRhaWxzIHtcXHJcXG4gIGRpc3BsYXk6IGJsb2NrO1xcclxcbn1cXHJcXG5cXHJcXG4vKlxcclxcbiAqIEFkZCB0aGUgY29ycmVjdCBkaXNwbGF5IGluIGFsbCBicm93c2Vycy5cXHJcXG4gKi9cXHJcXG5cXHJcXG5zdW1tYXJ5IHtcXHJcXG4gIGRpc3BsYXk6IGxpc3QtaXRlbTtcXHJcXG59XFxyXFxuXFxyXFxuLyogTWlzY1xcclxcbiAgID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09ICovXFxyXFxuXFxyXFxuLyoqXFxyXFxuICogQWRkIHRoZSBjb3JyZWN0IGRpc3BsYXkgaW4gSUUgMTArLlxcclxcbiAqL1xcclxcblxcclxcbnRlbXBsYXRlIHtcXHJcXG4gIGRpc3BsYXk6IG5vbmU7XFxyXFxufVxcclxcblxcclxcbi8qKlxcclxcbiAqIEFkZCB0aGUgY29ycmVjdCBkaXNwbGF5IGluIElFIDEwLlxcclxcbiAqL1xcclxcblxcclxcbltoaWRkZW5dIHtcXHJcXG4gIGRpc3BsYXk6IG5vbmU7XFxyXFxufVxcclxcblwiLCBcIlwiLHtcInZlcnNpb25cIjozLFwic291cmNlc1wiOltcIndlYnBhY2s6Ly8uL2Fzc2V0cy9zdHlsZXMvbm9ybWFsaXplLmNzc1wiXSxcIm5hbWVzXCI6W10sXCJtYXBwaW5nc1wiOlwiQUFBQSwyRUFBMkU7O0FBRTNFOytFQUMrRTs7QUFFL0U7OztFQUdFOztBQUVGO0VBQ0UsaUJBQWlCLEVBQUUsTUFBTTtFQUN6Qiw4QkFBOEIsRUFBRSxNQUFNO0FBQ3hDOztBQUVBOytFQUMrRTs7QUFFL0U7O0VBRUU7O0FBRUY7RUFDRSxTQUFTO0FBQ1g7O0FBRUE7O0VBRUU7O0FBRUY7RUFDRSxjQUFjO0FBQ2hCOztBQUVBOzs7RUFHRTs7QUFFRjtFQUNFLGNBQWM7RUFDZCxnQkFBZ0I7QUFDbEI7O0FBRUE7K0VBQytFOztBQUUvRTs7O0VBR0U7O0FBRUY7RUFDRSx1QkFBdUIsRUFBRSxNQUFNO0VBQy9CLFNBQVMsRUFBRSxNQUFNO0VBQ2pCLGlCQUFpQixFQUFFLE1BQU07QUFDM0I7O0FBRUE7OztFQUdFOztBQUVGO0VBQ0UsaUNBQWlDLEVBQUUsTUFBTTtFQUN6QyxjQUFjLEVBQUUsTUFBTTtBQUN4Qjs7QUFFQTsrRUFDK0U7O0FBRS9FOztFQUVFOztBQUVGO0VBQ0UsNkJBQTZCO0FBQy9COztBQUVBOzs7RUFHRTs7QUFFRjtFQUNFLG1CQUFtQixFQUFFLE1BQU07RUFDM0IsMEJBQTBCLEVBQUUsTUFBTTtFQUNsQyxpQ0FBaUMsRUFBRSxNQUFNO0FBQzNDOztBQUVBOztFQUVFOztBQUVGOztFQUVFLG1CQUFtQjtBQUNyQjs7QUFFQTs7O0VBR0U7O0FBRUY7OztFQUdFLGlDQUFpQyxFQUFFLE1BQU07RUFDekMsY0FBYyxFQUFFLE1BQU07QUFDeEI7O0FBRUE7O0VBRUU7O0FBRUY7RUFDRSxjQUFjO0FBQ2hCOztBQUVBOzs7RUFHRTs7QUFFRjs7RUFFRSxjQUFjO0VBQ2QsY0FBYztFQUNkLGtCQUFrQjtFQUNsQix3QkFBd0I7QUFDMUI7O0FBRUE7RUFDRSxlQUFlO0FBQ2pCOztBQUVBO0VBQ0UsV0FBVztBQUNiOztBQUVBOytFQUMrRTs7QUFFL0U7O0VBRUU7O0FBRUY7RUFDRSxrQkFBa0I7QUFDcEI7O0FBRUE7K0VBQytFOztBQUUvRTs7O0VBR0U7O0FBRUY7Ozs7O0VBS0Usb0JBQW9CLEVBQUUsTUFBTTtFQUM1QixlQUFlLEVBQUUsTUFBTTtFQUN2QixpQkFBaUIsRUFBRSxNQUFNO0VBQ3pCLFNBQVMsRUFBRSxNQUFNO0FBQ25COztBQUVBOzs7RUFHRTs7QUFFRjtRQUNRLE1BQU07RUFDWixpQkFBaUI7QUFDbkI7O0FBRUE7OztFQUdFOztBQUVGO1NBQ1MsTUFBTTtFQUNiLG9CQUFvQjtBQUN0Qjs7QUFFQTs7RUFFRTs7QUFFRjs7OztFQUlFLDBCQUEwQjtBQUM1Qjs7QUFFQTs7RUFFRTs7QUFFRjs7OztFQUlFLGtCQUFrQjtFQUNsQixVQUFVO0FBQ1o7O0FBRUE7O0VBRUU7O0FBRUY7Ozs7RUFJRSw4QkFBOEI7QUFDaEM7O0FBRUE7O0VBRUU7O0FBRUY7RUFDRSw4QkFBOEI7QUFDaEM7O0FBRUE7Ozs7O0VBS0U7O0FBRUY7RUFDRSxzQkFBc0IsRUFBRSxNQUFNO0VBQzlCLGNBQWMsRUFBRSxNQUFNO0VBQ3RCLGNBQWMsRUFBRSxNQUFNO0VBQ3RCLGVBQWUsRUFBRSxNQUFNO0VBQ3ZCLFVBQVUsRUFBRSxNQUFNO0VBQ2xCLG1CQUFtQixFQUFFLE1BQU07QUFDN0I7O0FBRUE7O0VBRUU7O0FBRUY7RUFDRSx3QkFBd0I7QUFDMUI7O0FBRUE7O0VBRUU7O0FBRUY7RUFDRSxjQUFjO0FBQ2hCOztBQUVBOzs7RUFHRTs7QUFFRjs7RUFFRSxzQkFBc0IsRUFBRSxNQUFNO0VBQzlCLFVBQVUsRUFBRSxNQUFNO0FBQ3BCOztBQUVBOztFQUVFOztBQUVGOztFQUVFLFlBQVk7QUFDZDs7QUFFQTs7O0VBR0U7O0FBRUY7RUFDRSw2QkFBNkIsRUFBRSxNQUFNO0VBQ3JDLG9CQUFvQixFQUFFLE1BQU07QUFDOUI7O0FBRUE7O0VBRUU7O0FBRUY7RUFDRSx3QkFBd0I7QUFDMUI7O0FBRUE7OztFQUdFOztBQUVGO0VBQ0UsMEJBQTBCLEVBQUUsTUFBTTtFQUNsQyxhQUFhLEVBQUUsTUFBTTtBQUN2Qjs7QUFFQTsrRUFDK0U7O0FBRS9FOztFQUVFOztBQUVGO0VBQ0UsY0FBYztBQUNoQjs7QUFFQTs7RUFFRTs7QUFFRjtFQUNFLGtCQUFrQjtBQUNwQjs7QUFFQTsrRUFDK0U7O0FBRS9FOztFQUVFOztBQUVGO0VBQ0UsYUFBYTtBQUNmOztBQUVBOztFQUVFOztBQUVGO0VBQ0UsYUFBYTtBQUNmXCIsXCJzb3VyY2VzQ29udGVudFwiOltcIi8qISBub3JtYWxpemUuY3NzIHY4LjAuMSB8IE1JVCBMaWNlbnNlIHwgZ2l0aHViLmNvbS9uZWNvbGFzL25vcm1hbGl6ZS5jc3MgKi9cXHJcXG5cXHJcXG4vKiBEb2N1bWVudFxcclxcbiAgID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09ICovXFxyXFxuXFxyXFxuLyoqXFxyXFxuICogMS4gQ29ycmVjdCB0aGUgbGluZSBoZWlnaHQgaW4gYWxsIGJyb3dzZXJzLlxcclxcbiAqIDIuIFByZXZlbnQgYWRqdXN0bWVudHMgb2YgZm9udCBzaXplIGFmdGVyIG9yaWVudGF0aW9uIGNoYW5nZXMgaW4gaU9TLlxcclxcbiAqL1xcclxcblxcclxcbmh0bWwge1xcclxcbiAgbGluZS1oZWlnaHQ6IDEuMTU7IC8qIDEgKi9cXHJcXG4gIC13ZWJraXQtdGV4dC1zaXplLWFkanVzdDogMTAwJTsgLyogMiAqL1xcclxcbn1cXHJcXG5cXHJcXG4vKiBTZWN0aW9uc1xcclxcbiAgID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09ICovXFxyXFxuXFxyXFxuLyoqXFxyXFxuICogUmVtb3ZlIHRoZSBtYXJnaW4gaW4gYWxsIGJyb3dzZXJzLlxcclxcbiAqL1xcclxcblxcclxcbmJvZHkge1xcclxcbiAgbWFyZ2luOiAwO1xcclxcbn1cXHJcXG5cXHJcXG4vKipcXHJcXG4gKiBSZW5kZXIgdGhlIGBtYWluYCBlbGVtZW50IGNvbnNpc3RlbnRseSBpbiBJRS5cXHJcXG4gKi9cXHJcXG5cXHJcXG5tYWluIHtcXHJcXG4gIGRpc3BsYXk6IGJsb2NrO1xcclxcbn1cXHJcXG5cXHJcXG4vKipcXHJcXG4gKiBDb3JyZWN0IHRoZSBmb250IHNpemUgYW5kIG1hcmdpbiBvbiBgaDFgIGVsZW1lbnRzIHdpdGhpbiBgc2VjdGlvbmAgYW5kXFxyXFxuICogYGFydGljbGVgIGNvbnRleHRzIGluIENocm9tZSwgRmlyZWZveCwgYW5kIFNhZmFyaS5cXHJcXG4gKi9cXHJcXG5cXHJcXG5oMSB7XFxyXFxuICBmb250LXNpemU6IDJlbTtcXHJcXG4gIG1hcmdpbjogMC42N2VtIDA7XFxyXFxufVxcclxcblxcclxcbi8qIEdyb3VwaW5nIGNvbnRlbnRcXHJcXG4gICA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PSAqL1xcclxcblxcclxcbi8qKlxcclxcbiAqIDEuIEFkZCB0aGUgY29ycmVjdCBib3ggc2l6aW5nIGluIEZpcmVmb3guXFxyXFxuICogMi4gU2hvdyB0aGUgb3ZlcmZsb3cgaW4gRWRnZSBhbmQgSUUuXFxyXFxuICovXFxyXFxuXFxyXFxuaHIge1xcclxcbiAgYm94LXNpemluZzogY29udGVudC1ib3g7IC8qIDEgKi9cXHJcXG4gIGhlaWdodDogMDsgLyogMSAqL1xcclxcbiAgb3ZlcmZsb3c6IHZpc2libGU7IC8qIDIgKi9cXHJcXG59XFxyXFxuXFxyXFxuLyoqXFxyXFxuICogMS4gQ29ycmVjdCB0aGUgaW5oZXJpdGFuY2UgYW5kIHNjYWxpbmcgb2YgZm9udCBzaXplIGluIGFsbCBicm93c2Vycy5cXHJcXG4gKiAyLiBDb3JyZWN0IHRoZSBvZGQgYGVtYCBmb250IHNpemluZyBpbiBhbGwgYnJvd3NlcnMuXFxyXFxuICovXFxyXFxuXFxyXFxucHJlIHtcXHJcXG4gIGZvbnQtZmFtaWx5OiBtb25vc3BhY2UsIG1vbm9zcGFjZTsgLyogMSAqL1xcclxcbiAgZm9udC1zaXplOiAxZW07IC8qIDIgKi9cXHJcXG59XFxyXFxuXFxyXFxuLyogVGV4dC1sZXZlbCBzZW1hbnRpY3NcXHJcXG4gICA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PSAqL1xcclxcblxcclxcbi8qKlxcclxcbiAqIFJlbW92ZSB0aGUgZ3JheSBiYWNrZ3JvdW5kIG9uIGFjdGl2ZSBsaW5rcyBpbiBJRSAxMC5cXHJcXG4gKi9cXHJcXG5cXHJcXG5hIHtcXHJcXG4gIGJhY2tncm91bmQtY29sb3I6IHRyYW5zcGFyZW50O1xcclxcbn1cXHJcXG5cXHJcXG4vKipcXHJcXG4gKiAxLiBSZW1vdmUgdGhlIGJvdHRvbSBib3JkZXIgaW4gQ2hyb21lIDU3LVxcclxcbiAqIDIuIEFkZCB0aGUgY29ycmVjdCB0ZXh0IGRlY29yYXRpb24gaW4gQ2hyb21lLCBFZGdlLCBJRSwgT3BlcmEsIGFuZCBTYWZhcmkuXFxyXFxuICovXFxyXFxuXFxyXFxuYWJiclt0aXRsZV0ge1xcclxcbiAgYm9yZGVyLWJvdHRvbTogbm9uZTsgLyogMSAqL1xcclxcbiAgdGV4dC1kZWNvcmF0aW9uOiB1bmRlcmxpbmU7IC8qIDIgKi9cXHJcXG4gIHRleHQtZGVjb3JhdGlvbjogdW5kZXJsaW5lIGRvdHRlZDsgLyogMiAqL1xcclxcbn1cXHJcXG5cXHJcXG4vKipcXHJcXG4gKiBBZGQgdGhlIGNvcnJlY3QgZm9udCB3ZWlnaHQgaW4gQ2hyb21lLCBFZGdlLCBhbmQgU2FmYXJpLlxcclxcbiAqL1xcclxcblxcclxcbmIsXFxyXFxuc3Ryb25nIHtcXHJcXG4gIGZvbnQtd2VpZ2h0OiBib2xkZXI7XFxyXFxufVxcclxcblxcclxcbi8qKlxcclxcbiAqIDEuIENvcnJlY3QgdGhlIGluaGVyaXRhbmNlIGFuZCBzY2FsaW5nIG9mIGZvbnQgc2l6ZSBpbiBhbGwgYnJvd3NlcnMuXFxyXFxuICogMi4gQ29ycmVjdCB0aGUgb2RkIGBlbWAgZm9udCBzaXppbmcgaW4gYWxsIGJyb3dzZXJzLlxcclxcbiAqL1xcclxcblxcclxcbmNvZGUsXFxyXFxua2JkLFxcclxcbnNhbXAge1xcclxcbiAgZm9udC1mYW1pbHk6IG1vbm9zcGFjZSwgbW9ub3NwYWNlOyAvKiAxICovXFxyXFxuICBmb250LXNpemU6IDFlbTsgLyogMiAqL1xcclxcbn1cXHJcXG5cXHJcXG4vKipcXHJcXG4gKiBBZGQgdGhlIGNvcnJlY3QgZm9udCBzaXplIGluIGFsbCBicm93c2Vycy5cXHJcXG4gKi9cXHJcXG5cXHJcXG5zbWFsbCB7XFxyXFxuICBmb250LXNpemU6IDgwJTtcXHJcXG59XFxyXFxuXFxyXFxuLyoqXFxyXFxuICogUHJldmVudCBgc3ViYCBhbmQgYHN1cGAgZWxlbWVudHMgZnJvbSBhZmZlY3RpbmcgdGhlIGxpbmUgaGVpZ2h0IGluXFxyXFxuICogYWxsIGJyb3dzZXJzLlxcclxcbiAqL1xcclxcblxcclxcbnN1YixcXHJcXG5zdXAge1xcclxcbiAgZm9udC1zaXplOiA3NSU7XFxyXFxuICBsaW5lLWhlaWdodDogMDtcXHJcXG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcXHJcXG4gIHZlcnRpY2FsLWFsaWduOiBiYXNlbGluZTtcXHJcXG59XFxyXFxuXFxyXFxuc3ViIHtcXHJcXG4gIGJvdHRvbTogLTAuMjVlbTtcXHJcXG59XFxyXFxuXFxyXFxuc3VwIHtcXHJcXG4gIHRvcDogLTAuNWVtO1xcclxcbn1cXHJcXG5cXHJcXG4vKiBFbWJlZGRlZCBjb250ZW50XFxyXFxuICAgPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0gKi9cXHJcXG5cXHJcXG4vKipcXHJcXG4gKiBSZW1vdmUgdGhlIGJvcmRlciBvbiBpbWFnZXMgaW5zaWRlIGxpbmtzIGluIElFIDEwLlxcclxcbiAqL1xcclxcblxcclxcbmltZyB7XFxyXFxuICBib3JkZXItc3R5bGU6IG5vbmU7XFxyXFxufVxcclxcblxcclxcbi8qIEZvcm1zXFxyXFxuICAgPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0gKi9cXHJcXG5cXHJcXG4vKipcXHJcXG4gKiAxLiBDaGFuZ2UgdGhlIGZvbnQgc3R5bGVzIGluIGFsbCBicm93c2Vycy5cXHJcXG4gKiAyLiBSZW1vdmUgdGhlIG1hcmdpbiBpbiBGaXJlZm94IGFuZCBTYWZhcmkuXFxyXFxuICovXFxyXFxuXFxyXFxuYnV0dG9uLFxcclxcbmlucHV0LFxcclxcbm9wdGdyb3VwLFxcclxcbnNlbGVjdCxcXHJcXG50ZXh0YXJlYSB7XFxyXFxuICBmb250LWZhbWlseTogaW5oZXJpdDsgLyogMSAqL1xcclxcbiAgZm9udC1zaXplOiAxMDAlOyAvKiAxICovXFxyXFxuICBsaW5lLWhlaWdodDogMS4xNTsgLyogMSAqL1xcclxcbiAgbWFyZ2luOiAwOyAvKiAyICovXFxyXFxufVxcclxcblxcclxcbi8qKlxcclxcbiAqIFNob3cgdGhlIG92ZXJmbG93IGluIElFLlxcclxcbiAqIDEuIFNob3cgdGhlIG92ZXJmbG93IGluIEVkZ2UuXFxyXFxuICovXFxyXFxuXFxyXFxuYnV0dG9uLFxcclxcbmlucHV0IHsgLyogMSAqL1xcclxcbiAgb3ZlcmZsb3c6IHZpc2libGU7XFxyXFxufVxcclxcblxcclxcbi8qKlxcclxcbiAqIFJlbW92ZSB0aGUgaW5oZXJpdGFuY2Ugb2YgdGV4dCB0cmFuc2Zvcm0gaW4gRWRnZSwgRmlyZWZveCwgYW5kIElFLlxcclxcbiAqIDEuIFJlbW92ZSB0aGUgaW5oZXJpdGFuY2Ugb2YgdGV4dCB0cmFuc2Zvcm0gaW4gRmlyZWZveC5cXHJcXG4gKi9cXHJcXG5cXHJcXG5idXR0b24sXFxyXFxuc2VsZWN0IHsgLyogMSAqL1xcclxcbiAgdGV4dC10cmFuc2Zvcm06IG5vbmU7XFxyXFxufVxcclxcblxcclxcbi8qKlxcclxcbiAqIENvcnJlY3QgdGhlIGluYWJpbGl0eSB0byBzdHlsZSBjbGlja2FibGUgdHlwZXMgaW4gaU9TIGFuZCBTYWZhcmkuXFxyXFxuICovXFxyXFxuXFxyXFxuYnV0dG9uLFxcclxcblt0eXBlPVxcXCJidXR0b25cXFwiXSxcXHJcXG5bdHlwZT1cXFwicmVzZXRcXFwiXSxcXHJcXG5bdHlwZT1cXFwic3VibWl0XFxcIl0ge1xcclxcbiAgLXdlYmtpdC1hcHBlYXJhbmNlOiBidXR0b247XFxyXFxufVxcclxcblxcclxcbi8qKlxcclxcbiAqIFJlbW92ZSB0aGUgaW5uZXIgYm9yZGVyIGFuZCBwYWRkaW5nIGluIEZpcmVmb3guXFxyXFxuICovXFxyXFxuXFxyXFxuYnV0dG9uOjotbW96LWZvY3VzLWlubmVyLFxcclxcblt0eXBlPVxcXCJidXR0b25cXFwiXTo6LW1vei1mb2N1cy1pbm5lcixcXHJcXG5bdHlwZT1cXFwicmVzZXRcXFwiXTo6LW1vei1mb2N1cy1pbm5lcixcXHJcXG5bdHlwZT1cXFwic3VibWl0XFxcIl06Oi1tb3otZm9jdXMtaW5uZXIge1xcclxcbiAgYm9yZGVyLXN0eWxlOiBub25lO1xcclxcbiAgcGFkZGluZzogMDtcXHJcXG59XFxyXFxuXFxyXFxuLyoqXFxyXFxuICogUmVzdG9yZSB0aGUgZm9jdXMgc3R5bGVzIHVuc2V0IGJ5IHRoZSBwcmV2aW91cyBydWxlLlxcclxcbiAqL1xcclxcblxcclxcbmJ1dHRvbjotbW96LWZvY3VzcmluZyxcXHJcXG5bdHlwZT1cXFwiYnV0dG9uXFxcIl06LW1vei1mb2N1c3JpbmcsXFxyXFxuW3R5cGU9XFxcInJlc2V0XFxcIl06LW1vei1mb2N1c3JpbmcsXFxyXFxuW3R5cGU9XFxcInN1Ym1pdFxcXCJdOi1tb3otZm9jdXNyaW5nIHtcXHJcXG4gIG91dGxpbmU6IDFweCBkb3R0ZWQgQnV0dG9uVGV4dDtcXHJcXG59XFxyXFxuXFxyXFxuLyoqXFxyXFxuICogQ29ycmVjdCB0aGUgcGFkZGluZyBpbiBGaXJlZm94LlxcclxcbiAqL1xcclxcblxcclxcbmZpZWxkc2V0IHtcXHJcXG4gIHBhZGRpbmc6IDAuMzVlbSAwLjc1ZW0gMC42MjVlbTtcXHJcXG59XFxyXFxuXFxyXFxuLyoqXFxyXFxuICogMS4gQ29ycmVjdCB0aGUgdGV4dCB3cmFwcGluZyBpbiBFZGdlIGFuZCBJRS5cXHJcXG4gKiAyLiBDb3JyZWN0IHRoZSBjb2xvciBpbmhlcml0YW5jZSBmcm9tIGBmaWVsZHNldGAgZWxlbWVudHMgaW4gSUUuXFxyXFxuICogMy4gUmVtb3ZlIHRoZSBwYWRkaW5nIHNvIGRldmVsb3BlcnMgYXJlIG5vdCBjYXVnaHQgb3V0IHdoZW4gdGhleSB6ZXJvIG91dFxcclxcbiAqICAgIGBmaWVsZHNldGAgZWxlbWVudHMgaW4gYWxsIGJyb3dzZXJzLlxcclxcbiAqL1xcclxcblxcclxcbmxlZ2VuZCB7XFxyXFxuICBib3gtc2l6aW5nOiBib3JkZXItYm94OyAvKiAxICovXFxyXFxuICBjb2xvcjogaW5oZXJpdDsgLyogMiAqL1xcclxcbiAgZGlzcGxheTogdGFibGU7IC8qIDEgKi9cXHJcXG4gIG1heC13aWR0aDogMTAwJTsgLyogMSAqL1xcclxcbiAgcGFkZGluZzogMDsgLyogMyAqL1xcclxcbiAgd2hpdGUtc3BhY2U6IG5vcm1hbDsgLyogMSAqL1xcclxcbn1cXHJcXG5cXHJcXG4vKipcXHJcXG4gKiBBZGQgdGhlIGNvcnJlY3QgdmVydGljYWwgYWxpZ25tZW50IGluIENocm9tZSwgRmlyZWZveCwgYW5kIE9wZXJhLlxcclxcbiAqL1xcclxcblxcclxcbnByb2dyZXNzIHtcXHJcXG4gIHZlcnRpY2FsLWFsaWduOiBiYXNlbGluZTtcXHJcXG59XFxyXFxuXFxyXFxuLyoqXFxyXFxuICogUmVtb3ZlIHRoZSBkZWZhdWx0IHZlcnRpY2FsIHNjcm9sbGJhciBpbiBJRSAxMCsuXFxyXFxuICovXFxyXFxuXFxyXFxudGV4dGFyZWEge1xcclxcbiAgb3ZlcmZsb3c6IGF1dG87XFxyXFxufVxcclxcblxcclxcbi8qKlxcclxcbiAqIDEuIEFkZCB0aGUgY29ycmVjdCBib3ggc2l6aW5nIGluIElFIDEwLlxcclxcbiAqIDIuIFJlbW92ZSB0aGUgcGFkZGluZyBpbiBJRSAxMC5cXHJcXG4gKi9cXHJcXG5cXHJcXG5bdHlwZT1cXFwiY2hlY2tib3hcXFwiXSxcXHJcXG5bdHlwZT1cXFwicmFkaW9cXFwiXSB7XFxyXFxuICBib3gtc2l6aW5nOiBib3JkZXItYm94OyAvKiAxICovXFxyXFxuICBwYWRkaW5nOiAwOyAvKiAyICovXFxyXFxufVxcclxcblxcclxcbi8qKlxcclxcbiAqIENvcnJlY3QgdGhlIGN1cnNvciBzdHlsZSBvZiBpbmNyZW1lbnQgYW5kIGRlY3JlbWVudCBidXR0b25zIGluIENocm9tZS5cXHJcXG4gKi9cXHJcXG5cXHJcXG5bdHlwZT1cXFwibnVtYmVyXFxcIl06Oi13ZWJraXQtaW5uZXItc3Bpbi1idXR0b24sXFxyXFxuW3R5cGU9XFxcIm51bWJlclxcXCJdOjotd2Via2l0LW91dGVyLXNwaW4tYnV0dG9uIHtcXHJcXG4gIGhlaWdodDogYXV0bztcXHJcXG59XFxyXFxuXFxyXFxuLyoqXFxyXFxuICogMS4gQ29ycmVjdCB0aGUgb2RkIGFwcGVhcmFuY2UgaW4gQ2hyb21lIGFuZCBTYWZhcmkuXFxyXFxuICogMi4gQ29ycmVjdCB0aGUgb3V0bGluZSBzdHlsZSBpbiBTYWZhcmkuXFxyXFxuICovXFxyXFxuXFxyXFxuW3R5cGU9XFxcInNlYXJjaFxcXCJdIHtcXHJcXG4gIC13ZWJraXQtYXBwZWFyYW5jZTogdGV4dGZpZWxkOyAvKiAxICovXFxyXFxuICBvdXRsaW5lLW9mZnNldDogLTJweDsgLyogMiAqL1xcclxcbn1cXHJcXG5cXHJcXG4vKipcXHJcXG4gKiBSZW1vdmUgdGhlIGlubmVyIHBhZGRpbmcgaW4gQ2hyb21lIGFuZCBTYWZhcmkgb24gbWFjT1MuXFxyXFxuICovXFxyXFxuXFxyXFxuW3R5cGU9XFxcInNlYXJjaFxcXCJdOjotd2Via2l0LXNlYXJjaC1kZWNvcmF0aW9uIHtcXHJcXG4gIC13ZWJraXQtYXBwZWFyYW5jZTogbm9uZTtcXHJcXG59XFxyXFxuXFxyXFxuLyoqXFxyXFxuICogMS4gQ29ycmVjdCB0aGUgaW5hYmlsaXR5IHRvIHN0eWxlIGNsaWNrYWJsZSB0eXBlcyBpbiBpT1MgYW5kIFNhZmFyaS5cXHJcXG4gKiAyLiBDaGFuZ2UgZm9udCBwcm9wZXJ0aWVzIHRvIGBpbmhlcml0YCBpbiBTYWZhcmkuXFxyXFxuICovXFxyXFxuXFxyXFxuOjotd2Via2l0LWZpbGUtdXBsb2FkLWJ1dHRvbiB7XFxyXFxuICAtd2Via2l0LWFwcGVhcmFuY2U6IGJ1dHRvbjsgLyogMSAqL1xcclxcbiAgZm9udDogaW5oZXJpdDsgLyogMiAqL1xcclxcbn1cXHJcXG5cXHJcXG4vKiBJbnRlcmFjdGl2ZVxcclxcbiAgID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09ICovXFxyXFxuXFxyXFxuLypcXHJcXG4gKiBBZGQgdGhlIGNvcnJlY3QgZGlzcGxheSBpbiBFZGdlLCBJRSAxMCssIGFuZCBGaXJlZm94LlxcclxcbiAqL1xcclxcblxcclxcbmRldGFpbHMge1xcclxcbiAgZGlzcGxheTogYmxvY2s7XFxyXFxufVxcclxcblxcclxcbi8qXFxyXFxuICogQWRkIHRoZSBjb3JyZWN0IGRpc3BsYXkgaW4gYWxsIGJyb3dzZXJzLlxcclxcbiAqL1xcclxcblxcclxcbnN1bW1hcnkge1xcclxcbiAgZGlzcGxheTogbGlzdC1pdGVtO1xcclxcbn1cXHJcXG5cXHJcXG4vKiBNaXNjXFxyXFxuICAgPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0gKi9cXHJcXG5cXHJcXG4vKipcXHJcXG4gKiBBZGQgdGhlIGNvcnJlY3QgZGlzcGxheSBpbiBJRSAxMCsuXFxyXFxuICovXFxyXFxuXFxyXFxudGVtcGxhdGUge1xcclxcbiAgZGlzcGxheTogbm9uZTtcXHJcXG59XFxyXFxuXFxyXFxuLyoqXFxyXFxuICogQWRkIHRoZSBjb3JyZWN0IGRpc3BsYXkgaW4gSUUgMTAuXFxyXFxuICovXFxyXFxuXFxyXFxuW2hpZGRlbl0ge1xcclxcbiAgZGlzcGxheTogbm9uZTtcXHJcXG59XFxyXFxuXCJdLFwic291cmNlUm9vdFwiOlwiXCJ9XSk7XG4vLyBFeHBvcnRzXG5leHBvcnQgZGVmYXVsdCBfX19DU1NfTE9BREVSX0VYUE9SVF9fXztcbiIsIi8vIEltcG9ydHNcbmltcG9ydCBfX19DU1NfTE9BREVSX0FQSV9TT1VSQ0VNQVBfSU1QT1JUX19fIGZyb20gXCIuLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvc291cmNlTWFwcy5qc1wiO1xuaW1wb3J0IF9fX0NTU19MT0FERVJfQVBJX0lNUE9SVF9fXyBmcm9tIFwiLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL2FwaS5qc1wiO1xudmFyIF9fX0NTU19MT0FERVJfRVhQT1JUX19fID0gX19fQ1NTX0xPQURFUl9BUElfSU1QT1JUX19fKF9fX0NTU19MT0FERVJfQVBJX1NPVVJDRU1BUF9JTVBPUlRfX18pO1xuLy8gTW9kdWxlXG5fX19DU1NfTE9BREVSX0VYUE9SVF9fXy5wdXNoKFttb2R1bGUuaWQsIFwiLyogaHR0cDovL21leWVyd2ViLmNvbS9lcmljL3Rvb2xzL2Nzcy9yZXNldC9cXHJcXG4gICB2Mi4wIHwgMjAxMTAxMjZcXHJcXG4gICBMaWNlbnNlOiBub25lIChwdWJsaWMgZG9tYWluKVxcclxcbiovXFxyXFxuXFxyXFxuaHRtbCwgYm9keSwgZGl2LCBzcGFuLCBhcHBsZXQsIG9iamVjdCwgaWZyYW1lLFxcclxcbmgxLCBoMiwgaDMsIGg0LCBoNSwgaDYsIHAsIGJsb2NrcXVvdGUsIHByZSxcXHJcXG5hLCBhYmJyLCBhY3JvbnltLCBhZGRyZXNzLCBiaWcsIGNpdGUsIGNvZGUsXFxyXFxuZGVsLCBkZm4sIGVtLCBpbWcsIGlucywga2JkLCBxLCBzLCBzYW1wLFxcclxcbnNtYWxsLCBzdHJpa2UsIHN0cm9uZywgc3ViLCBzdXAsIHR0LCB2YXIsXFxyXFxuYiwgdSwgaSwgY2VudGVyLFxcclxcbmRsLCBkdCwgZGQsIG9sLCB1bCwgbGksXFxyXFxuZmllbGRzZXQsIGZvcm0sIGxhYmVsLCBsZWdlbmQsXFxyXFxudGFibGUsIGNhcHRpb24sIHRib2R5LCB0Zm9vdCwgdGhlYWQsIHRyLCB0aCwgdGQsXFxyXFxuYXJ0aWNsZSwgYXNpZGUsIGNhbnZhcywgZGV0YWlscywgZW1iZWQsXFxyXFxuZmlndXJlLCBmaWdjYXB0aW9uLCBmb290ZXIsIGhlYWRlciwgaGdyb3VwLFxcclxcbm1lbnUsIG5hdiwgb3V0cHV0LCBydWJ5LCBzZWN0aW9uLCBzdW1tYXJ5LFxcclxcbnRpbWUsIG1hcmssIGF1ZGlvLCB2aWRlbyB7XFxyXFxuXFx0bWFyZ2luOiAwO1xcclxcblxcdHBhZGRpbmc6IDA7XFxyXFxuXFx0Ym9yZGVyOiAwO1xcclxcblxcdGZvbnQtc2l6ZTogMTAwJTtcXHJcXG5cXHRmb250OiBpbmhlcml0O1xcclxcblxcdHZlcnRpY2FsLWFsaWduOiBiYXNlbGluZTtcXHJcXG59XFxyXFxuLyogSFRNTDUgZGlzcGxheS1yb2xlIHJlc2V0IGZvciBvbGRlciBicm93c2VycyAqL1xcclxcbmFydGljbGUsIGFzaWRlLCBkZXRhaWxzLCBmaWdjYXB0aW9uLCBmaWd1cmUsXFxyXFxuZm9vdGVyLCBoZWFkZXIsIGhncm91cCwgbWVudSwgbmF2LCBzZWN0aW9uIHtcXHJcXG5cXHRkaXNwbGF5OiBibG9jaztcXHJcXG59XFxyXFxuYm9keSB7XFxyXFxuXFx0bGluZS1oZWlnaHQ6IDE7XFxyXFxufVxcclxcbm9sLCB1bCB7XFxyXFxuXFx0bGlzdC1zdHlsZTogbm9uZTtcXHJcXG59XFxyXFxuYmxvY2txdW90ZSwgcSB7XFxyXFxuXFx0cXVvdGVzOiBub25lO1xcclxcbn1cXHJcXG5ibG9ja3F1b3RlOmJlZm9yZSwgYmxvY2txdW90ZTphZnRlcixcXHJcXG5xOmJlZm9yZSwgcTphZnRlciB7XFxyXFxuXFx0Y29udGVudDogJyc7XFxyXFxuXFx0Y29udGVudDogbm9uZTtcXHJcXG59XFxyXFxudGFibGUge1xcclxcblxcdGJvcmRlci1jb2xsYXBzZTogY29sbGFwc2U7XFxyXFxuXFx0Ym9yZGVyLXNwYWNpbmc6IDA7XFxyXFxufVwiLCBcIlwiLHtcInZlcnNpb25cIjozLFwic291cmNlc1wiOltcIndlYnBhY2s6Ly8uL2Fzc2V0cy9zdHlsZXMvcmVzZXQuY3NzXCJdLFwibmFtZXNcIjpbXSxcIm1hcHBpbmdzXCI6XCJBQUFBOzs7Q0FHQzs7QUFFRDs7Ozs7Ozs7Ozs7OztDQWFDLFNBQVM7Q0FDVCxVQUFVO0NBQ1YsU0FBUztDQUNULGVBQWU7Q0FDZixhQUFhO0NBQ2Isd0JBQXdCO0FBQ3pCO0FBQ0EsZ0RBQWdEO0FBQ2hEOztDQUVDLGNBQWM7QUFDZjtBQUNBO0NBQ0MsY0FBYztBQUNmO0FBQ0E7Q0FDQyxnQkFBZ0I7QUFDakI7QUFDQTtDQUNDLFlBQVk7QUFDYjtBQUNBOztDQUVDLFdBQVc7Q0FDWCxhQUFhO0FBQ2Q7QUFDQTtDQUNDLHlCQUF5QjtDQUN6QixpQkFBaUI7QUFDbEJcIixcInNvdXJjZXNDb250ZW50XCI6W1wiLyogaHR0cDovL21leWVyd2ViLmNvbS9lcmljL3Rvb2xzL2Nzcy9yZXNldC9cXHJcXG4gICB2Mi4wIHwgMjAxMTAxMjZcXHJcXG4gICBMaWNlbnNlOiBub25lIChwdWJsaWMgZG9tYWluKVxcclxcbiovXFxyXFxuXFxyXFxuaHRtbCwgYm9keSwgZGl2LCBzcGFuLCBhcHBsZXQsIG9iamVjdCwgaWZyYW1lLFxcclxcbmgxLCBoMiwgaDMsIGg0LCBoNSwgaDYsIHAsIGJsb2NrcXVvdGUsIHByZSxcXHJcXG5hLCBhYmJyLCBhY3JvbnltLCBhZGRyZXNzLCBiaWcsIGNpdGUsIGNvZGUsXFxyXFxuZGVsLCBkZm4sIGVtLCBpbWcsIGlucywga2JkLCBxLCBzLCBzYW1wLFxcclxcbnNtYWxsLCBzdHJpa2UsIHN0cm9uZywgc3ViLCBzdXAsIHR0LCB2YXIsXFxyXFxuYiwgdSwgaSwgY2VudGVyLFxcclxcbmRsLCBkdCwgZGQsIG9sLCB1bCwgbGksXFxyXFxuZmllbGRzZXQsIGZvcm0sIGxhYmVsLCBsZWdlbmQsXFxyXFxudGFibGUsIGNhcHRpb24sIHRib2R5LCB0Zm9vdCwgdGhlYWQsIHRyLCB0aCwgdGQsXFxyXFxuYXJ0aWNsZSwgYXNpZGUsIGNhbnZhcywgZGV0YWlscywgZW1iZWQsXFxyXFxuZmlndXJlLCBmaWdjYXB0aW9uLCBmb290ZXIsIGhlYWRlciwgaGdyb3VwLFxcclxcbm1lbnUsIG5hdiwgb3V0cHV0LCBydWJ5LCBzZWN0aW9uLCBzdW1tYXJ5LFxcclxcbnRpbWUsIG1hcmssIGF1ZGlvLCB2aWRlbyB7XFxyXFxuXFx0bWFyZ2luOiAwO1xcclxcblxcdHBhZGRpbmc6IDA7XFxyXFxuXFx0Ym9yZGVyOiAwO1xcclxcblxcdGZvbnQtc2l6ZTogMTAwJTtcXHJcXG5cXHRmb250OiBpbmhlcml0O1xcclxcblxcdHZlcnRpY2FsLWFsaWduOiBiYXNlbGluZTtcXHJcXG59XFxyXFxuLyogSFRNTDUgZGlzcGxheS1yb2xlIHJlc2V0IGZvciBvbGRlciBicm93c2VycyAqL1xcclxcbmFydGljbGUsIGFzaWRlLCBkZXRhaWxzLCBmaWdjYXB0aW9uLCBmaWd1cmUsXFxyXFxuZm9vdGVyLCBoZWFkZXIsIGhncm91cCwgbWVudSwgbmF2LCBzZWN0aW9uIHtcXHJcXG5cXHRkaXNwbGF5OiBibG9jaztcXHJcXG59XFxyXFxuYm9keSB7XFxyXFxuXFx0bGluZS1oZWlnaHQ6IDE7XFxyXFxufVxcclxcbm9sLCB1bCB7XFxyXFxuXFx0bGlzdC1zdHlsZTogbm9uZTtcXHJcXG59XFxyXFxuYmxvY2txdW90ZSwgcSB7XFxyXFxuXFx0cXVvdGVzOiBub25lO1xcclxcbn1cXHJcXG5ibG9ja3F1b3RlOmJlZm9yZSwgYmxvY2txdW90ZTphZnRlcixcXHJcXG5xOmJlZm9yZSwgcTphZnRlciB7XFxyXFxuXFx0Y29udGVudDogJyc7XFxyXFxuXFx0Y29udGVudDogbm9uZTtcXHJcXG59XFxyXFxudGFibGUge1xcclxcblxcdGJvcmRlci1jb2xsYXBzZTogY29sbGFwc2U7XFxyXFxuXFx0Ym9yZGVyLXNwYWNpbmc6IDA7XFxyXFxufVwiXSxcInNvdXJjZVJvb3RcIjpcIlwifV0pO1xuLy8gRXhwb3J0c1xuZXhwb3J0IGRlZmF1bHQgX19fQ1NTX0xPQURFUl9FWFBPUlRfX187XG4iLCIvLyBJbXBvcnRzXG5pbXBvcnQgX19fQ1NTX0xPQURFUl9BUElfU09VUkNFTUFQX0lNUE9SVF9fXyBmcm9tIFwiLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL3NvdXJjZU1hcHMuanNcIjtcbmltcG9ydCBfX19DU1NfTE9BREVSX0FQSV9JTVBPUlRfX18gZnJvbSBcIi4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9hcGkuanNcIjtcbmltcG9ydCBfX19DU1NfTE9BREVSX0dFVF9VUkxfSU1QT1JUX19fIGZyb20gXCIuLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvZ2V0VXJsLmpzXCI7XG52YXIgX19fQ1NTX0xPQURFUl9VUkxfSU1QT1JUXzBfX18gPSBuZXcgVVJMKFwiLi4vZm9udHMvZ2xvcmlhLWhhbGxlbHVqYWgtdjE3LWxhdGluLXJlZ3VsYXIud29mZjJcIiwgaW1wb3J0Lm1ldGEudXJsKTtcbnZhciBfX19DU1NfTE9BREVSX1VSTF9JTVBPUlRfMV9fXyA9IG5ldyBVUkwoXCIuLi9mb250cy9nbG9yaWEtaGFsbGVsdWphaC12MTctbGF0aW4tcmVndWxhci53b2ZmXCIsIGltcG9ydC5tZXRhLnVybCk7XG52YXIgX19fQ1NTX0xPQURFUl9VUkxfSU1QT1JUXzJfX18gPSBuZXcgVVJMKFwiLi4vZm9udHMvbmV1Y2hhLXYxNy1sYXRpbi1yZWd1bGFyLndvZmYyXCIsIGltcG9ydC5tZXRhLnVybCk7XG52YXIgX19fQ1NTX0xPQURFUl9VUkxfSU1QT1JUXzNfX18gPSBuZXcgVVJMKFwiLi4vZm9udHMvbmV1Y2hhLXYxNy1sYXRpbi1yZWd1bGFyLndvZmZcIiwgaW1wb3J0Lm1ldGEudXJsKTtcbnZhciBfX19DU1NfTE9BREVSX1VSTF9JTVBPUlRfNF9fXyA9IG5ldyBVUkwoXCIuLi9pbWcvYXBwL3dhdGVyY29sb3ItYmx1ZS1iZy1sZWZ0LmpwZ1wiLCBpbXBvcnQubWV0YS51cmwpO1xudmFyIF9fX0NTU19MT0FERVJfVVJMX0lNUE9SVF81X19fID0gbmV3IFVSTChcIi4uL2ltZy9hcHAvd2F0ZXJjb2xvci1ibHVlLWJnLXJpZ2h0LmpwZ1wiLCBpbXBvcnQubWV0YS51cmwpO1xudmFyIF9fX0NTU19MT0FERVJfVVJMX0lNUE9SVF82X19fID0gbmV3IFVSTChcIi4uL2ltZy9hcHAvd2F0ZXJjb2xvci13YXZlcy0wMS11cC5wbmdcIiwgaW1wb3J0Lm1ldGEudXJsKTtcbnZhciBfX19DU1NfTE9BREVSX1VSTF9JTVBPUlRfN19fXyA9IG5ldyBVUkwoXCIuLi9pbWcvYXBwL3dhdGVyY29sb3Itd2F2ZXMtMDEtZG93bi5wbmdcIiwgaW1wb3J0Lm1ldGEudXJsKTtcbnZhciBfX19DU1NfTE9BREVSX1VSTF9JTVBPUlRfOF9fXyA9IG5ldyBVUkwoXCIuLi9pbWcvYXBwL3dhdGVyY29sb3ItbWVudS1idXR0b24tMDEucG5nXCIsIGltcG9ydC5tZXRhLnVybCk7XG52YXIgX19fQ1NTX0xPQURFUl9VUkxfSU1QT1JUXzlfX18gPSBuZXcgVVJMKFwiLi4vaW1nL2FwcC93YXRlcmNvbG9yLXJlZC1jcm9zcy1idXR0b24tMDEuanBnXCIsIGltcG9ydC5tZXRhLnVybCk7XG52YXIgX19fQ1NTX0xPQURFUl9VUkxfSU1QT1JUXzEwX19fID0gbmV3IFVSTChcIi4uL2ltZy9hcHAvd2F0ZXJjb2xvci1idXR0b24tc3RhcnQtMDEucG5nXCIsIGltcG9ydC5tZXRhLnVybCk7XG52YXIgX19fQ1NTX0xPQURFUl9VUkxfSU1QT1JUXzExX19fID0gbmV3IFVSTChcIi4uL2ltZy9hcHAvd2F0ZXJjb2xvci1idXR0b24tcmVwZWF0LTAxLnBuZ1wiLCBpbXBvcnQubWV0YS51cmwpO1xudmFyIF9fX0NTU19MT0FERVJfVVJMX0lNUE9SVF8xMl9fXyA9IG5ldyBVUkwoXCIuLi9pbWcvYXBwL3dhdGVyY29sb3Ita3l0ZXMtMDEuanBnXCIsIGltcG9ydC5tZXRhLnVybCk7XG52YXIgX19fQ1NTX0xPQURFUl9VUkxfSU1QT1JUXzEzX19fID0gbmV3IFVSTChcIi4uL2ltZy9hcHAvd2F0ZXJjb2xvci1idXRlcmZseS0wMS5qcGdcIiwgaW1wb3J0Lm1ldGEudXJsKTtcbnZhciBfX19DU1NfTE9BREVSX1VSTF9JTVBPUlRfMTRfX18gPSBuZXcgVVJMKFwiLi4vaW1nL2FwcC93YXRlcmNvbG9yLWxpbmUtMDItcmlnaHQucG5nXCIsIGltcG9ydC5tZXRhLnVybCk7XG52YXIgX19fQ1NTX0xPQURFUl9VUkxfSU1QT1JUXzE1X19fID0gbmV3IFVSTChcIi4uL2ltZy9hcHAvd2F0ZXJjb2xvci1saW5lLTAyLnBuZ1wiLCBpbXBvcnQubWV0YS51cmwpO1xudmFyIF9fX0NTU19MT0FERVJfVVJMX0lNUE9SVF8xNl9fXyA9IG5ldyBVUkwoXCIuLi9pbWcvYXBwL3dhdGVyY29sb3ItbGluZS0wMS5wbmdcIiwgaW1wb3J0Lm1ldGEudXJsKTtcbnZhciBfX19DU1NfTE9BREVSX1VSTF9JTVBPUlRfMTdfX18gPSBuZXcgVVJMKFwiLi4vaW1nL2FwcC93YXRlcmNvbG9yLWJsdWUtY2FyZC1iZy0wMS5qcGdcIiwgaW1wb3J0Lm1ldGEudXJsKTtcbnZhciBfX19DU1NfTE9BREVSX1VSTF9JTVBPUlRfMThfX18gPSBuZXcgVVJMKFwiLi4vaW1nL2FwcC93YXRlcmNvbG9yLWZsaXAtYnV0dG9uLTAxLnBuZ1wiLCBpbXBvcnQubWV0YS51cmwpO1xudmFyIF9fX0NTU19MT0FERVJfRVhQT1JUX19fID0gX19fQ1NTX0xPQURFUl9BUElfSU1QT1JUX19fKF9fX0NTU19MT0FERVJfQVBJX1NPVVJDRU1BUF9JTVBPUlRfX18pO1xudmFyIF9fX0NTU19MT0FERVJfVVJMX1JFUExBQ0VNRU5UXzBfX18gPSBfX19DU1NfTE9BREVSX0dFVF9VUkxfSU1QT1JUX19fKF9fX0NTU19MT0FERVJfVVJMX0lNUE9SVF8wX19fKTtcbnZhciBfX19DU1NfTE9BREVSX1VSTF9SRVBMQUNFTUVOVF8xX19fID0gX19fQ1NTX0xPQURFUl9HRVRfVVJMX0lNUE9SVF9fXyhfX19DU1NfTE9BREVSX1VSTF9JTVBPUlRfMV9fXyk7XG52YXIgX19fQ1NTX0xPQURFUl9VUkxfUkVQTEFDRU1FTlRfMl9fXyA9IF9fX0NTU19MT0FERVJfR0VUX1VSTF9JTVBPUlRfX18oX19fQ1NTX0xPQURFUl9VUkxfSU1QT1JUXzJfX18pO1xudmFyIF9fX0NTU19MT0FERVJfVVJMX1JFUExBQ0VNRU5UXzNfX18gPSBfX19DU1NfTE9BREVSX0dFVF9VUkxfSU1QT1JUX19fKF9fX0NTU19MT0FERVJfVVJMX0lNUE9SVF8zX19fKTtcbnZhciBfX19DU1NfTE9BREVSX1VSTF9SRVBMQUNFTUVOVF80X19fID0gX19fQ1NTX0xPQURFUl9HRVRfVVJMX0lNUE9SVF9fXyhfX19DU1NfTE9BREVSX1VSTF9JTVBPUlRfNF9fXyk7XG52YXIgX19fQ1NTX0xPQURFUl9VUkxfUkVQTEFDRU1FTlRfNV9fXyA9IF9fX0NTU19MT0FERVJfR0VUX1VSTF9JTVBPUlRfX18oX19fQ1NTX0xPQURFUl9VUkxfSU1QT1JUXzVfX18pO1xudmFyIF9fX0NTU19MT0FERVJfVVJMX1JFUExBQ0VNRU5UXzZfX18gPSBfX19DU1NfTE9BREVSX0dFVF9VUkxfSU1QT1JUX19fKF9fX0NTU19MT0FERVJfVVJMX0lNUE9SVF82X19fKTtcbnZhciBfX19DU1NfTE9BREVSX1VSTF9SRVBMQUNFTUVOVF83X19fID0gX19fQ1NTX0xPQURFUl9HRVRfVVJMX0lNUE9SVF9fXyhfX19DU1NfTE9BREVSX1VSTF9JTVBPUlRfN19fXyk7XG52YXIgX19fQ1NTX0xPQURFUl9VUkxfUkVQTEFDRU1FTlRfOF9fXyA9IF9fX0NTU19MT0FERVJfR0VUX1VSTF9JTVBPUlRfX18oX19fQ1NTX0xPQURFUl9VUkxfSU1QT1JUXzhfX18pO1xudmFyIF9fX0NTU19MT0FERVJfVVJMX1JFUExBQ0VNRU5UXzlfX18gPSBfX19DU1NfTE9BREVSX0dFVF9VUkxfSU1QT1JUX19fKF9fX0NTU19MT0FERVJfVVJMX0lNUE9SVF85X19fKTtcbnZhciBfX19DU1NfTE9BREVSX1VSTF9SRVBMQUNFTUVOVF8xMF9fXyA9IF9fX0NTU19MT0FERVJfR0VUX1VSTF9JTVBPUlRfX18oX19fQ1NTX0xPQURFUl9VUkxfSU1QT1JUXzEwX19fKTtcbnZhciBfX19DU1NfTE9BREVSX1VSTF9SRVBMQUNFTUVOVF8xMV9fXyA9IF9fX0NTU19MT0FERVJfR0VUX1VSTF9JTVBPUlRfX18oX19fQ1NTX0xPQURFUl9VUkxfSU1QT1JUXzExX19fKTtcbnZhciBfX19DU1NfTE9BREVSX1VSTF9SRVBMQUNFTUVOVF8xMl9fXyA9IF9fX0NTU19MT0FERVJfR0VUX1VSTF9JTVBPUlRfX18oX19fQ1NTX0xPQURFUl9VUkxfSU1QT1JUXzEyX19fKTtcbnZhciBfX19DU1NfTE9BREVSX1VSTF9SRVBMQUNFTUVOVF8xM19fXyA9IF9fX0NTU19MT0FERVJfR0VUX1VSTF9JTVBPUlRfX18oX19fQ1NTX0xPQURFUl9VUkxfSU1QT1JUXzEzX19fKTtcbnZhciBfX19DU1NfTE9BREVSX1VSTF9SRVBMQUNFTUVOVF8xNF9fXyA9IF9fX0NTU19MT0FERVJfR0VUX1VSTF9JTVBPUlRfX18oX19fQ1NTX0xPQURFUl9VUkxfSU1QT1JUXzE0X19fKTtcbnZhciBfX19DU1NfTE9BREVSX1VSTF9SRVBMQUNFTUVOVF8xNV9fXyA9IF9fX0NTU19MT0FERVJfR0VUX1VSTF9JTVBPUlRfX18oX19fQ1NTX0xPQURFUl9VUkxfSU1QT1JUXzE1X19fKTtcbnZhciBfX19DU1NfTE9BREVSX1VSTF9SRVBMQUNFTUVOVF8xNl9fXyA9IF9fX0NTU19MT0FERVJfR0VUX1VSTF9JTVBPUlRfX18oX19fQ1NTX0xPQURFUl9VUkxfSU1QT1JUXzE2X19fKTtcbnZhciBfX19DU1NfTE9BREVSX1VSTF9SRVBMQUNFTUVOVF8xN19fXyA9IF9fX0NTU19MT0FERVJfR0VUX1VSTF9JTVBPUlRfX18oX19fQ1NTX0xPQURFUl9VUkxfSU1QT1JUXzE3X19fKTtcbnZhciBfX19DU1NfTE9BREVSX1VSTF9SRVBMQUNFTUVOVF8xOF9fXyA9IF9fX0NTU19MT0FERVJfR0VUX1VSTF9JTVBPUlRfX18oX19fQ1NTX0xPQURFUl9VUkxfSU1QT1JUXzE4X19fKTtcbi8vIE1vZHVsZVxuX19fQ1NTX0xPQURFUl9FWFBPUlRfX18ucHVzaChbbW9kdWxlLmlkLCBcIi8qIGdsb3JpYS1oYWxsZWx1amFoLXJlZ3VsYXIgLSBsYXRpbiAqL1xcclxcbkBmb250LWZhY2Uge1xcclxcbiAgICBmb250LWZhbWlseTogJ0dsb3JpYSBIYWxsZWx1amFoJztcXHJcXG4gICAgZm9udC1zdHlsZTogbm9ybWFsO1xcclxcbiAgICBmb250LXdlaWdodDogNDAwO1xcclxcbiAgICBzcmM6IGxvY2FsKCcnKSxcXHJcXG4gICAgICAgICB1cmwoXCIgKyBfX19DU1NfTE9BREVSX1VSTF9SRVBMQUNFTUVOVF8wX19fICsgXCIpIGZvcm1hdCgnd29mZjInKSwgLyogQ2hyb21lIDI2KywgT3BlcmEgMjMrLCBGaXJlZm94IDM5KyAqL1xcclxcbiAgICAgICAgIHVybChcIiArIF9fX0NTU19MT0FERVJfVVJMX1JFUExBQ0VNRU5UXzFfX18gKyBcIikgZm9ybWF0KCd3b2ZmJyk7IC8qIENocm9tZSA2KywgRmlyZWZveCAzLjYrLCBJRSA5KywgU2FmYXJpIDUuMSsgKi9cXHJcXG4gIH1cXHJcXG5cXHJcXG4vKiBuZXVjaGEtcmVndWxhciAtIGxhdGluICovXFxyXFxuQGZvbnQtZmFjZSB7XFxyXFxuICAgIGZvbnQtZmFtaWx5OiAnTmV1Y2hhJztcXHJcXG4gICAgZm9udC1zdHlsZTogbm9ybWFsO1xcclxcbiAgICBmb250LXdlaWdodDogNDAwO1xcclxcbiAgICBzcmM6IGxvY2FsKCcnKSxcXHJcXG4gICAgICAgICB1cmwoXCIgKyBfX19DU1NfTE9BREVSX1VSTF9SRVBMQUNFTUVOVF8yX19fICsgXCIpIGZvcm1hdCgnd29mZjInKSwgLyogQ2hyb21lIDI2KywgT3BlcmEgMjMrLCBGaXJlZm94IDM5KyAqL1xcclxcbiAgICAgICAgIHVybChcIiArIF9fX0NTU19MT0FERVJfVVJMX1JFUExBQ0VNRU5UXzNfX18gKyBcIikgZm9ybWF0KCd3b2ZmJyk7IC8qIENocm9tZSA2KywgRmlyZWZveCAzLjYrLCBJRSA5KywgU2FmYXJpIDUuMSsgKi9cXHJcXG4gIH1cXHJcXG5cXHJcXG4vKiBib3JkZXItYm94IG1vZGVsIGZvciBhbGwgZWxlbWVudHMgKi9cXHJcXG5cXHJcXG5odG1sIHtcXHJcXG4gICAgYm94LXNpemluZzogYm9yZGVyLWJveDtcXHJcXG59XFxyXFxuXFxyXFxuKiwgKjo6YmVmb3JlLCAqOjphZnRlciB7XFxyXFxuICAgIGJveC1zaXppbmc6IGluaGVyaXQ7XFxyXFxufVxcclxcblxcclxcbi8qIC0tLSBQYWdlIGNvbG9yIHN0eWxpbmcgLS0tICovXFxyXFxuXFxyXFxuOnJvb3Qge1xcclxcbiAgICAtLWNvbG9yLWJnLW1haW4tMTogI2ZmZmZmZjtcXHJcXG4gICAgLS1jb2xvci1iZy1tYWluLTI6ICNkYmY1Zjg7XFxyXFxuICAgIC0tY29sb3ItYmctbWFpbi0zOiAjZTlmNWZmO1xcclxcbiAgICAtLWNvbG9yLWJnLW1haW4tNDogI2YwYzJjZDYzO1xcclxcbiAgICAtLWNvbG9yLWZvbnQtMTogIzMwNzBhNjtcXHJcXG59XFxyXFxuXFxyXFxuLyogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAqL1xcclxcblxcclxcbmJvZHkge1xcclxcbiAgICB3aWR0aDogMTAwJTtcXHJcXG4gICAgZGlzcGxheTogZmxleDtcXHJcXG4gICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXHJcXG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXHJcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0tY29sb3ItYmctbWFpbi0xKTtcXHJcXG4gICAgYmFja2dyb3VuZC1pbWFnZTogdXJsKFwiICsgX19fQ1NTX0xPQURFUl9VUkxfUkVQTEFDRU1FTlRfNF9fXyArIFwiKSwgdXJsKFwiICsgX19fQ1NTX0xPQURFUl9VUkxfUkVQTEFDRU1FTlRfNV9fXyArIFwiKTtcXHJcXG4gICAgYmFja2dyb3VuZC1hdHRhY2htZW50OiBmaXhlZDtcXHJcXG4gICAgYmFja2dyb3VuZC1wb3NpdGlvbjogbGVmdCB0b3AsIHJpZ2h0IGJvdHRvbTtcXHJcXG4gICAgYmFja2dyb3VuZC1yZXBlYXQ6IHJlcGVhdC15O1xcclxcbiAgICBiYWNrZ3JvdW5kLXNpemU6IDE1JSBhdXRvO1xcclxcbiAgICBmb250LWZhbWlseTogJ05ldWNoYScsIGN1cnNpdmU7XFxyXFxuICAgIGNvbG9yOiB2YXIoLS1jb2xvci1mb250LTEpO1xcclxcbn1cXHJcXG5cXHJcXG5ib2R5Lm9wZW5lZC1tZW51IHtcXHJcXG4gICAgb3ZlcmZsb3cteTogaGlkZGVuO1xcclxcbn1cXHJcXG5cXHJcXG4uaW5hY3RpdmUge1xcclxcbiAgICB2aXNpYmlsaXR5OiBoaWRkZW47XFxyXFxuICAgIHBvc2l0aW9uOiBmaXhlZDtcXHJcXG4gICAgdG9wOiAwO1xcclxcbn1cXHJcXG5cXHJcXG4uZ3JhcGhpYywgaW1nIHtcXHJcXG4gICAgd2lkdGg6IDEwMCU7XFxyXFxuICAgIGhlaWdodDogYXV0bztcXHJcXG4gICAgcGFkZGluZzogMDtcXHJcXG4gICAgbWFyZ2luOiAwO1xcclxcbn1cXHJcXG5cXHJcXG4uY29udGFpbmVyLWNlbnRlcmVkIHtcXHJcXG4gICAgbWF4LXdpZHRoOiAxNDQwcHg7XFxyXFxuICAgIG1pbi13aWR0aDogMTQ0MHB4O1xcclxcbiAgICBtYXJnaW46IDAgYXV0bztcXHJcXG59XFxyXFxuXFxyXFxuaGVhZGVyLmNvbnRhaW5lci1jZW50ZXJlZCB7XFxyXFxuICAgIGRpc3BsYXk6IGZsZXg7XFxyXFxuICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxyXFxuICAgIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcclxcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xcclxcbiAgICBwb3NpdGlvbjogLXdlYmtpdC1zdGlja3k7XFxyXFxuICAgIHBvc2l0aW9uOiBzdGlja3k7XFxyXFxuICAgIHRvcDogMDtcXHJcXG4gICAgei1pbmRleDogODtcXHJcXG4gICAgbWFyZ2luLXRvcDogMDtcXHJcXG4gICAgdHJhbnNpdGlvbjogbWFyZ2luIDFzO1xcclxcbn1cXHJcXG5cXHJcXG5oZWFkZXIubWFpbi1wYWdlIHtcXHJcXG4gICAgbWFyZ2luLXRvcDogMzgwcHg7XFxyXFxufVxcclxcblxcclxcbmhlYWRlciAuaGVhZGVyLWltYWdlIHtcXHJcXG4gICAgd2lkdGg6IDcwJTtcXHJcXG4gICAgcG9zaXRpb246IGFic29sdXRlO1xcclxcbiAgICB0b3A6IC0zNzZweDtcXHJcXG59XFxyXFxuXFxyXFxuLm1haW4tY29udHJvbHMge1xcclxcbiAgICB3aWR0aDogODAlO1xcclxcbiAgICBtaW4taGVpZ2h0OiAxNTBweDtcXHJcXG4gICAgZGlzcGxheTogZmxleDtcXHJcXG4gICAganVzdGlmeS1jb250ZW50OiBzcGFjZS1hcm91bmQ7XFxyXFxuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxyXFxuICAgIGJvcmRlci1yYWRpdXM6IDM1cHg7XFxyXFxuICAgIGJhY2tncm91bmQtY29sb3I6IHdoaXRlO1xcclxcbiAgICBiYWNrZ3JvdW5kLWltYWdlOiB1cmwoXCIgKyBfX19DU1NfTE9BREVSX1VSTF9SRVBMQUNFTUVOVF82X19fICsgXCIpLCB1cmwoXCIgKyBfX19DU1NfTE9BREVSX1VSTF9SRVBMQUNFTUVOVF83X19fICsgXCIpO1xcclxcbiAgICBiYWNrZ3JvdW5kLXBvc2l0aW9uOiAxMDAlIDAsIDAgMTAwJTtcXHJcXG4gICAgYmFja2dyb3VuZC1yZXBlYXQ6IHJlcGVhdC14O1xcclxcbiAgICBiYWNrZ3JvdW5kLXNpemU6IGF1dG8gMjglO1xcclxcbiAgICB6LWluZGV4OiA1O1xcclxcbn1cXHJcXG5cXHJcXG4uZ2FtZS1jb250cm9scyB7XFxyXFxuICAgIHdpZHRoOiAxMDB2dztcXHJcXG4gICAgYm9yZGVyLXJhZGl1czogMTBweDtcXHJcXG4gICAgbWluLWhlaWdodDogMTAwcHg7XFxyXFxuICAgIHBhZGRpbmc6IDEwcHggMDtcXHJcXG4gICAgZGlzcGxheTogZmxleDtcXHJcXG4gICAganVzdGlmeS1jb250ZW50OiBzcGFjZS1hcm91bmQ7XFxyXFxuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxyXFxuICAgIGJhY2tncm91bmQtY29sb3I6IHdoaXRlO1xcclxcbiAgICBib3JkZXItcmFkaXVzOiAwO1xcclxcbiAgICBiYWNrZ3JvdW5kLWltYWdlOiB1cmwoXCIgKyBfX19DU1NfTE9BREVSX1VSTF9SRVBMQUNFTUVOVF80X19fICsgXCIpLCB1cmwoXCIgKyBfX19DU1NfTE9BREVSX1VSTF9SRVBMQUNFTUVOVF81X19fICsgXCIpO1xcclxcbiAgICBiYWNrZ3JvdW5kLWF0dGFjaG1lbnQ6IGZpeGVkO1xcclxcbiAgICBiYWNrZ3JvdW5kLXBvc2l0aW9uOiBsZWZ0IHRvcCwgcmlnaHQgYm90dG9tO1xcclxcbiAgICBiYWNrZ3JvdW5kLXJlcGVhdDogcmVwZWF0LXk7XFxyXFxuICAgIGJhY2tncm91bmQtc2l6ZTogMTUlIGF1dG87XFxyXFxufVxcclxcblxcclxcbmgxIHtcXHJcXG4gICAgdGV4dC1hbGlnbjogY2VudGVyO1xcclxcbiAgICBmb250LWZhbWlseTogJ0dsb3JpYSBIYWxsZWx1amFoJywgY3Vyc2l2ZTtcXHJcXG59XFxyXFxuXFxyXFxuLmJ1dHRvbjpob3ZlciB7XFxyXFxuICAgIGN1cnNvcjogcG9pbnRlcjtcXHJcXG59XFxyXFxuXFxyXFxuLm1lbnUtYnV0dG9uIHtcXHJcXG4gICAgei1pbmRleDogMTA7XFxyXFxuICAgIHdpZHRoOiAzNnB4O1xcclxcbiAgICBoZWlnaHQ6IDM2cHg7XFxyXFxuICAgIGJhY2tncm91bmQtaW1hZ2U6IHVybChcIiArIF9fX0NTU19MT0FERVJfVVJMX1JFUExBQ0VNRU5UXzhfX18gKyBcIik7XFxyXFxuICAgIGJhY2tncm91bmQtc2l6ZTogY292ZXI7XFxyXFxuICAgIHRyYW5zaXRpb246IHRyYW5zZm9ybSAxcztcXHJcXG59XFxyXFxuXFxyXFxuLm1lbnUtYnV0dG9uLm9wZW5lZC1tZW51IHtcXHJcXG4gICAgdHJhbnNmb3JtOiByb3RhdGUoMTgwZGVnKTtcXHJcXG59XFxyXFxuXFxyXFxuLmJ1dHRvbi5jbG9zZS1tZW51IHtcXHJcXG4gICAgcG9zaXRpb246IGFic29sdXRlO1xcclxcbiAgICB0b3A6IDIwcHg7XFxyXFxuICAgIHJpZ2h0OiAyMHB4O1xcclxcbiAgICB3aWR0aDogNTBweDtcXHJcXG4gICAgaGVpZ2h0OiA1MHB4O1xcclxcbiAgICBib3JkZXItcmFkaXVzOiA1MCU7XFxyXFxuICAgIGJhY2tncm91bmQtaW1hZ2U6IHVybChcIiArIF9fX0NTU19MT0FERVJfVVJMX1JFUExBQ0VNRU5UXzlfX18gKyBcIik7XFxyXFxuICAgIGJhY2tncm91bmQtc2l6ZTogY292ZXI7XFxyXFxuXFxyXFxufVxcclxcblxcclxcbi5zd2l0Y2gge1xcclxcbiAgICB3aWR0aDogMTEwcHg7XFxyXFxuICAgIGJhY2tncm91bmQtY29sb3I6ICNmYWY4ZmQ7XFxyXFxuICAgIGRpc3BsYXk6IGZsZXg7XFxyXFxuICAgIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjtcXHJcXG4gICAgYm9yZGVyLXJhZGl1czogNjBweDtcXHJcXG4gICAgcG9zaXRpb246IHJlbGF0aXZlO1xcclxcbiAgICBib3JkZXI6IDJweCB2YXIoLS1jb2xvci1mb250LTEpIHNvbGlkO1xcclxcbn1cXHJcXG5cXHJcXG4uc3dpdGNoLXJhaWwge1xcclxcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XFxyXFxuICAgIGxlZnQ6IDA7XFxyXFxuICAgIHdpZHRoOiAxMDAlO1xcclxcbiAgICBoZWlnaHQ6IDEwMCU7XFxyXFxuICAgIGJvcmRlci1yYWRpdXM6IGluaGVyaXQ7XFxyXFxufVxcclxcblxcclxcbi5zd2l0Y2gtcm9sbGVyIHtcXHJcXG4gICAgd2lkdGg6IDU1cHg7XFxyXFxuICAgIGhlaWdodDogMTAwJTtcXHJcXG4gICAgcG9zaXRpb246IGFic29sdXRlO1xcclxcbiAgICBsZWZ0OiAwO1xcclxcbiAgICBib3JkZXItcmFkaXVzOiBpbmhlcml0O1xcclxcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjMzI3MWE3NGQ7XFxyXFxuICAgIHotaW5kZXg6IDEwO1xcclxcbiAgICB0cmFuc2l0aW9uOiBsZWZ0IDAuN3M7XFxyXFxuICAgIGJvcmRlcjogMXB4IHZhcigtLWNvbG9yLWZvbnQtMSkgc29saWQ7XFxyXFxufVxcclxcblxcclxcbi5zd2l0Y2guc3dpdGNoLW9uIC5zd2l0Y2gtcm9sbGVyIHtcXHJcXG4gICAgbGVmdDogNTNweDtcXHJcXG59XFxyXFxuXFxyXFxuLnN3aXRjaC10cmlnZ2VyIHtcXHJcXG4gICAgbWFyZ2luOiAwIDEwcHg7XFxyXFxuICAgIGhlaWdodDogNDBweDtcXHJcXG4gICAgei1pbmRleDogOTtcXHJcXG4gICAgcGFkZGluZzogMTBweCAwO1xcclxcbiAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XFxyXFxuICAgIGZvbnQtc2l6ZTogMjBweDtcXHJcXG59XFxyXFxuXFxyXFxuLmdhbWUtYnV0dG9uIHtcXHJcXG4gICAgd2lkdGg6IDEwMHB4O1xcclxcbiAgICBoZWlnaHQ6IDEwMHB4O1xcclxcbiAgICBib3JkZXItcmFkaXVzOiA1MHB4O1xcclxcbiAgICBiYWNrZ3JvdW5kLXBvc2l0aW9uOiBjZW50ZXI7XFxyXFxuICAgIGJhY2tncm91bmQtcmVwZWF0OiBuby1yZXBlYXQ7XFxyXFxuICAgIGJhY2tncm91bmQtc2l6ZTogY292ZXI7XFxyXFxufVxcclxcblxcclxcbi5nYW1lLWJ1dHRvbi5zdGFydC1idXR0b24ge1xcclxcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjMDM5MjI3O1xcclxcbiAgICBiYWNrZ3JvdW5kLWltYWdlOiB1cmwoXCIgKyBfX19DU1NfTE9BREVSX1VSTF9SRVBMQUNFTUVOVF8xMF9fXyArIFwiKTtcXHJcXG59XFxyXFxuXFxyXFxuLmdhbWUtYnV0dG9uLnJlcGVhdC1idXR0b24ge1xcclxcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjMzk0Y2Y1O1xcclxcbiAgICBiYWNrZ3JvdW5kLWltYWdlOiB1cmwoXCIgKyBfX19DU1NfTE9BREVSX1VSTF9SRVBMQUNFTUVOVF8xMV9fXyArIFwiKTtcXHJcXG59XFxyXFxuXFxyXFxuLmdhbWUtcHJvZ3Jlc3Mge1xcclxcbiAgICB3aWR0aDogMjIwcHg7XFxyXFxuICAgIGRpc3BsYXk6IGZsZXg7XFxyXFxuICAgIGp1c3RpZnktY29udGVudDogc3BhY2UtYXJvdW5kO1xcclxcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xcclxcbn1cXHJcXG5cXHJcXG4uZ2FtZS1pbmRpY2F0b3Ige1xcclxcbiAgICB3aWR0aDogMTUwcHg7XFxyXFxuICAgIGhlaWdodDogNDBweDtcXHJcXG4gICAgYm9yZGVyLXJhZGl1czogMThweDtcXHJcXG4gICAgZGlzcGxheTogZmxleDtcXHJcXG4gICAganVzdGlmeS1jb250ZW50OiBmbGV4LXN0YXJ0O1xcclxcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xcclxcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjZmFmOGZkO1xcclxcbiAgICBib3JkZXI6IDFweCB2YXIoLS1jb2xvci1mb250LTEpIHNvbGlkO1xcclxcbn1cXHJcXG5cXHJcXG4uc3RhciB7XFxyXFxuICAgIHdpZHRoOiAzMHB4O1xcclxcbn1cXHJcXG5cXHJcXG4uZ2FtZS1zY29yZSB7XFxyXFxuICAgIHRleHQtYWxpZ246IGNlbnRlcjtcXHJcXG59XFxyXFxuXFxyXFxuLmdhbWUtc2NvcmUgLmNvcnJlY3Qge1xcclxcbiAgICBjb2xvcjogIzAwODAwMDtcXHJcXG59XFxyXFxuXFxyXFxuLmdhbWUtc2NvcmUgLndyb25nIHtcXHJcXG4gICAgY29sb3I6ICNmZjAwMDA7XFxyXFxufVxcclxcblxcclxcbm5hdiB7XFxyXFxuICAgIGxlZnQ6IC0zMjBweDtcXHJcXG4gICAgcG9zaXRpb246IGZpeGVkO1xcclxcbiAgICB0b3A6IDA7XFxyXFxuICAgIHdpZHRoOiAzMjBweDtcXHJcXG4gICAgaGVpZ2h0OiAxMDAlO1xcclxcbiAgICBvdmVyZmxvdy15OiBhdXRvO1xcclxcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1jb2xvci1iZy1tYWluLTEpO1xcclxcbiAgICB6LWluZGV4OiAxMTtcXHJcXG4gICAgYmFja2dyb3VuZC1pbWFnZTogdXJsKFwiICsgX19fQ1NTX0xPQURFUl9VUkxfUkVQTEFDRU1FTlRfMTJfX18gKyBcIiksIHVybChcIiArIF9fX0NTU19MT0FERVJfVVJMX1JFUExBQ0VNRU5UXzEzX19fICsgXCIpO1xcclxcbiAgICBiYWNrZ3JvdW5kLXNpemU6IDQ1MHB4IGF1dG8sIDE3OXB4IGF1dG87XFxyXFxuICAgIGJhY2tncm91bmQtcG9zaXRpb246IDBweCAwcHgsIDEyMnB4IDEwMCU7XFxyXFxuICAgIGJhY2tncm91bmQtcmVwZWF0OiBuby1yZXBlYXQsIG5vLXJlcGVhdDtcXHJcXG4gICAgYm94LXNoYWRvdzogbm9uZTtcXHJcXG4gICAgdHJhbnNpdGlvbi1wcm9wZXJ0eTogbGVmdCwgYmFja2dyb3VuZC1wb3NpdGlvbiwgYm94LXNoYWRvdztcXHJcXG4gICAgdHJhbnNpdGlvbi1kdXJhdGlvbjogMS4ycyw1cztcXHJcXG59XFxyXFxuXFxyXFxubmF2Lm9wZW5lZC1tZW51IHtcXHJcXG4gICAgbGVmdDogMDtcXHJcXG4gICAgYm94LXNoYWRvdzogMHB4IDAgMjBweCAxcHggIzk0Y2E2OCwgMHB4IDAgODBweCAyMHB4ICNmMGUwODAsIDUwcHggMCAyNTBweCA1MHB4IHZhcigtLWNvbG9yLWZvbnQtMSk7XFxyXFxufVxcclxcblxcclxcbi5tZW51LWxpc3Qge1xcclxcbiAgICBoZWlnaHQ6IDUwMHB4O1xcclxcbiAgICBtYXJnaW4tdG9wOiBjYWxjKDUwdmggLSAyNTBweCk7XFxyXFxufVxcclxcblxcclxcbi5tZW51LWxpc3QgbGkge1xcclxcbiAgICBwYWRkaW5nOiAxMHB4IDA7XFxyXFxuICAgIHRleHQtYWxpZ246IGNlbnRlcjtcXHJcXG4gICAgZm9udC1zaXplOiAyZW07XFxyXFxuICAgIGJhY2tncm91bmQtY29sb3I6IHZhcigtLWNvbG9yLWJnLW1haW4tMSk7XFxyXFxufVxcclxcblxcclxcbi5tZW51LWxpc3QgbGk6aG92ZXIge1xcclxcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1jb2xvci1iZy1tYWluLTIpO1xcclxcbiAgICBiYWNrZ3JvdW5kLWltYWdlOiB1cmwoXCIgKyBfX19DU1NfTE9BREVSX1VSTF9SRVBMQUNFTUVOVF8xNF9fXyArIFwiKTtcXHJcXG4gICAgYmFja2dyb3VuZC1zaXplOiAxMDAlIDEwMCU7XFxyXFxuICAgIGNvbG9yOiB3aGl0ZTtcXHJcXG4gICAgcGFkZGluZzogMTVweCAwO1xcclxcbn1cXHJcXG5cXHJcXG4ubWVudS1saXN0IGxpOm50aC1jaGlsZChldmVuKTpob3ZlciB7XFxyXFxuICAgIGJhY2tncm91bmQtY29sb3I6IHZhcigtLWNvbG9yLWJnLW1haW4tMik7XFxyXFxuICAgIGJhY2tncm91bmQtaW1hZ2U6IHVybChcIiArIF9fX0NTU19MT0FERVJfVVJMX1JFUExBQ0VNRU5UXzE1X19fICsgXCIpO1xcclxcbn1cXHJcXG5cXHJcXG4ubWVudS1saXN0IGxpLmFjdGl2ZS1wYWdlLCAubWVudS1saXN0IGxpLmFjdGl2ZS1wYWdlOmhvdmVyIHtcXHJcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0tY29sb3ItYmctbWFpbi0yKTtcXHJcXG4gICAgYmFja2dyb3VuZC1pbWFnZTogdXJsKFwiICsgX19fQ1NTX0xPQURFUl9VUkxfUkVQTEFDRU1FTlRfMTZfX18gKyBcIik7XFxyXFxuICAgIGJhY2tncm91bmQtc2l6ZTogMTAwJSAxMDAlO1xcclxcbiAgICBjb2xvcjogd2hpdGU7XFxyXFxuICAgIHBhZGRpbmc6IDE1cHggMDtcXHJcXG59XFxyXFxuXFxyXFxubWFpbi5jb250YWluZXItY2VudGVyZWQge1xcclxcbiAgICBtYXJnaW4tdG9wOiAyMHB4O1xcclxcbiAgICBwYWRkaW5nLWJvdHRvbTogMzVweDtcXHJcXG59XFxyXFxuXFxyXFxuLmNvbnRlbnQtd3JhcHBlciB7XFxyXFxuICAgIHdpZHRoOiAxMDAlO1xcclxcbiAgICBtYXJnaW46IGF1dG87XFxyXFxuICAgIGRpc3BsYXk6IGZsZXg7XFxyXFxuICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxyXFxuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxyXFxufVxcclxcblxcclxcbmgyLnRvcGljLW5hbWUge1xcclxcbiAgICBmb250LXNpemU6IDM0cHg7XFxyXFxuICAgIG1hcmdpbjogMzBweCAwO1xcclxcbn1cXHJcXG5cXHJcXG4uY2FyZC1jb250YWluZXIge1xcclxcbiAgICBkaXNwbGF5OiBmbGV4O1xcclxcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWFyb3VuZDtcXHJcXG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXHJcXG4gICAgZmxleC13cmFwOiB3cmFwO1xcclxcbiAgICB3aWR0aDogNzglO1xcclxcbiAgICBtYXJnaW46IGF1dG87XFxyXFxufVxcclxcblxcclxcbi5jYXJkIHtcXHJcXG4gICAgbWFyZ2luOiAxNXB4O1xcclxcbiAgICBwb3NpdGlvbjogcmVsYXRpdmU7XFxyXFxufVxcclxcblxcclxcbi5jYXJkLW1haW4tcGFnZSB7XFxyXFxuICAgIHdpZHRoOiAyNTZweDtcXHJcXG4gICAgaGVpZ2h0OiAyNDBweDtcXHJcXG4gICAgbWFyZ2luLXRvcDogMjBweDtcXHJcXG4gICAgcGFkZGluZzogNDVweDtcXHJcXG4gICAgYm9yZGVyLXJhZGl1czogNTAlO1xcclxcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjZmZmZmZmO1xcclxcbiAgICBiYWNrZ3JvdW5kLWltYWdlOiB1cmwoXCIgKyBfX19DU1NfTE9BREVSX1VSTF9SRVBMQUNFTUVOVF8xN19fXyArIFwiKTtcXHJcXG4gICAgYmFja2dyb3VuZC1zaXplOiAxMDAlIDgzJTtcXHJcXG4gICAgYmFja2dyb3VuZC1yZXBlYXQ6IG5vLXJlcGVhdDtcXHJcXG59XFxyXFxuXFxyXFxuLmNhcmQtdG9waWMge1xcclxcbiAgICB3aWR0aDogMjI2cHg7XFxyXFxuICAgIGhlaWdodDogMjcwcHg7XFxyXFxufVxcclxcblxcclxcbi5jYXJkLmRpc2FibGVkIHtcXHJcXG4gICAgZmlsdGVyOiBibHVyKDNweCk7XFxyXFxufVxcclxcblxcclxcbi5jYXJkLWNvbnRlbnQge1xcclxcbiAgICB3aWR0aDogMTAwJTtcXHJcXG4gICAgaGVpZ2h0OiAxMDAlO1xcclxcbiAgICBwb3NpdGlvbjogcmVsYXRpdmU7XFxyXFxufVxcclxcblxcclxcbi5jYXJkLXRvcGljIC5jYXJkLWNvbnRlbnQge1xcclxcbiAgICBib3JkZXI6IDJweCB2YXIoLS1jb2xvci1mb250LTEpIHNvbGlkO1xcclxcbiAgICBib3gtc2hhZG93OiAwIDAgMTVweCAxcHggdmFyKC0tY29sb3ItZm9udC0xKTtcXHJcXG59XFxyXFxuXFxyXFxuLmNhcmQtdG9waWMgLmNhcmQtY29udGVudDpob3ZlciB7XFxyXFxuICAgIGJveC1zaGFkb3c6IDAgMCAxNXB4IDNweCB2YXIoLS1jb2xvci1mb250LTEpO1xcclxcbn1cXHJcXG5cXHJcXG4uY2FyZC5kaXNhYmxlZCAuY2FyZC1jb250ZW50IHtcXHJcXG4gICAgYm94LXNoYWRvdzogbm9uZTtcXHJcXG59XFxyXFxuXFxyXFxuLmNhcmQtbWFpbi1wYWdlIC5jYXJkLWNvbnRlbnQsIC5jYXJkLW1haW4tcGFnZSBpbWcge1xcclxcbiAgICBib3JkZXItcmFkaXVzOiA1MHB4O1xcclxcbn1cXHJcXG5cXHJcXG4uY2FyZC1jb250ZW50LCAuY2FyZC1jb250ZW50IGltZyB7XFxyXFxuICAgIHRyYW5zaXRpb246IGJvcmRlci1yYWRpdXMgMXM7XFxyXFxufVxcclxcblxcclxcbi5jYXJkLXRvcGljIC5jYXJkLWNvbnRlbnQge1xcclxcbiAgICBib3JkZXItcmFkaXVzOiA1MHB4IDA7XFxyXFxufVxcclxcblxcclxcbi5jYXJkLXRvcGljLmZsaXBwZWQgLmNhcmQtY29udGVudCB7XFxyXFxuICAgIGJvcmRlci1yYWRpdXM6IDAgNTBweDtcXHJcXG59XFxyXFxuXFxyXFxuLmNhcmQtdG9waWMgaW1nIHtcXHJcXG4gICAgYm9yZGVyLXJhZGl1czogNTBweCAwIDAgMDtcXHJcXG59XFxyXFxuXFxyXFxuLmNhcmQtdG9waWMuZmxpcHBlZCBpbWcge1xcclxcbiAgICBib3JkZXItcmFkaXVzOiAwIDUwcHggMCAwO1xcclxcbn1cXHJcXG5cXHJcXG4uY2FyZCBwIHtcXHJcXG4gICAgbWFyZ2luLXRvcDogMTVweDtcXHJcXG4gICAgZm9udC1zaXplOiAzMnB4O1xcclxcbiAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XFxyXFxufVxcclxcblxcclxcbi5jYXJkLW1haW4tcGFnZSBwIHtcXHJcXG4gICAgcG9zaXRpb246IHJlbGF0aXZlO1xcclxcbiAgICB0b3A6IDMycHg7XFxyXFxuICAgIGJvcmRlci1yYWRpdXM6IDIwcHg7XFxyXFxuICAgIGZvbnQtc2l6ZTogMzJweDtcXHJcXG59XFxyXFxuXFxyXFxuLmNhcmQtZmxpcC1idXR0b24ge1xcclxcbiAgICB3aWR0aDogMzVweDtcXHJcXG4gICAgaGVpZ2h0OiAzNXB4O1xcclxcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XFxyXFxuICAgIGJvdHRvbTogMjBweDtcXHJcXG4gICAgcmlnaHQ6IDIwcHg7XFxyXFxuICAgIGJvcmRlci1yYWRpdXM6IDUwJTtcXHJcXG4gICAgYmFja2dyb3VuZC1pbWFnZTogdXJsKFwiICsgX19fQ1NTX0xPQURFUl9VUkxfUkVQTEFDRU1FTlRfMThfX18gKyBcIik7XFxyXFxuICAgIGJhY2tncm91bmQtc2l6ZTogY292ZXI7XFxyXFxufVxcclxcblxcclxcbi5jYXJkLWZsaXAtYnV0dG9uOmhvdmVyIHtcXHJcXG4gICAgYW5pbWF0aW9uLW5hbWU6IHJvdGF0aW9uO1xcclxcbiAgICBhbmltYXRpb24tZHVyYXRpb246IDJzO1xcclxcbiAgICBhbmltYXRpb24tdGltaW5nLWZ1bmN0aW9uOiBsaW5lYXI7XFxyXFxuICAgIGFuaW1hdGlvbi1pdGVyYXRpb24tY291bnQ6IGluZmluaXRlO1xcclxcbn1cXHJcXG5cXHJcXG4uZmxpcHBlZCAuY2FyZC1jb250ZW50IHtcXHJcXG4gICAgYW5pbWF0aW9uLW5hbWU6IGZsaXAtY2FyZDtcXHJcXG4gICAgYW5pbWF0aW9uLWR1cmF0aW9uOiAxcztcXHJcXG59XFxyXFxuXFxyXFxuLnVuZmxpcHBlZCAuY2FyZC1jb250ZW50IHtcXHJcXG4gICAgYW5pbWF0aW9uLW5hbWU6IHVuZmxpcC1jYXJkO1xcclxcbiAgICBhbmltYXRpb24tZHVyYXRpb246IDFzO1xcclxcbn1cXHJcXG5cXHJcXG4uZmluYWwtY2xpcCB7XFxyXFxuICAgIGRpc3BsYXk6IGZsZXg7XFxyXFxuICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxyXFxuICAgIHdpZHRoOiAzMjBweDtcXHJcXG4gICAgbWFyZ2luOiBhdXRvO1xcclxcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXHJcXG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXHJcXG4gICAgcGFkZGluZzogNTBweCAwO1xcclxcbn1cXHJcXG5cXHJcXG4uZmluYWwtY2xpcCBwIHtcXHJcXG4gICAgY29sb3I6IHJlZDtcXHJcXG4gICAgZm9udC1zaXplOiAzNnB4O1xcclxcbiAgICBtYXJnaW4tdG9wOiAzMHB4O1xcclxcbn1cXHJcXG5cXHJcXG4uc3RhdC1jb250YWluZXIge1xcclxcbiAgICB3aWR0aDogNzQlO1xcclxcbiAgICBkaXNwbGF5OiBmbGV4O1xcclxcbiAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcclxcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXHJcXG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXHJcXG4gICAgZm9udC1zaXplOiAyZW07XFxyXFxufVxcclxcblxcclxcbi50YWJsZS13cmFwcGVyIHtcXHJcXG4gICAgd2lkdGg6IDEwMCU7XFxyXFxuICAgIG92ZXJmbG93LXg6IGF1dG87XFxyXFxufVxcclxcblxcclxcbi5zdGF0LXRhYmxlIHtcXHJcXG4gICAgd2lkdGg6IDEwMCU7XFxyXFxuICAgIGJvcmRlci1jb2xsYXBzZTogY29sbGFwc2U7XFxyXFxuICAgIGZvbnQtc2l6ZTogMC41ZW07XFxyXFxuXFxyXFxufVxcclxcblxcclxcbnRoZWFkIHtcXHJcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogYWxpY2VibHVlO1xcclxcbn1cXHJcXG5cXHJcXG50aCB7XFxyXFxuICAgIGhlaWdodDogMzBweDtcXHJcXG59XFxyXFxuXFxyXFxudHIge1xcclxcbiAgICBoZWlnaHQ6IDI1cHg7XFxyXFxuICAgIGJhY2tncm91bmQtY29sb3I6IGF6dXJlO1xcclxcbn1cXHJcXG5cXHJcXG50aCwgdGQge1xcclxcbiAgICBwYWRkaW5nOiAwIDRweDtcXHJcXG4gICAgYm9yZGVyOiAxcHggc29saWQgYmxhY2s7XFxyXFxuICAgIHRleHQtYWxpZ246IGNlbnRlcjtcXHJcXG4gICAgdmVydGljYWwtYWxpZ246IG1pZGRsZTtcXHJcXG59XFxyXFxuXFxyXFxudHI6bnRoLWNoaWxkKGV2ZW4pIHtcXHJcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogI2ZkZmRkZTtcXHJcXG59XFxyXFxuXFxyXFxuLnNvcnRlZC1kb3duLCAuc29ydGVkLXVwIHtcXHJcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogI2QwZmE4MTtcXHJcXG59XFxyXFxuXFxyXFxuLnNvcnQtaWNvbiB7XFxyXFxuICAgIHdpZHRoOiAxNnB4O1xcclxcbiAgICBoZWlnaHQ6IGF1dG87XFxyXFxuICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcXHJcXG4gICAgbGVmdDogMTBweDtcXHJcXG4gICAgdG9wOiAycHg7XFxyXFxufVxcclxcblxcclxcbi5zdGF0LWJ1dHRvbnMtd3JhcHBlciB7XFxyXFxuICAgIHdpZHRoOiAxMDAlO1xcclxcbiAgICBkaXNwbGF5OiBmbGV4O1xcclxcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWFyb3VuZDtcXHJcXG4gICAgZmxleC13cmFwOiB3cmFwO1xcclxcbn1cXHJcXG5cXHJcXG4uc3RhdC1idXR0b24ge1xcclxcbiAgICB3aWR0aDogMzAwcHg7XFxyXFxuICAgIGhlaWdodDogNzBweDtcXHJcXG4gICAgbWFyZ2luOiAyMHB4IDA7XFxyXFxuICAgIHBhZGRpbmc6IDE1cHg7XFxyXFxuICAgIGJvcmRlci1yYWRpdXM6IDUwcHg7XFxyXFxuICAgIGJvcmRlcjogMXB4IHNvbGlkIHJnYigwLCAwLCAwKTtcXHJcXG4gICAgY29sb3I6IGF6dXJlO1xcclxcbiAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XFxyXFxufVxcclxcblxcclxcbi5idXR0b24udHJhaW4tZGlmZiB7XFxyXFxuICAgIGJhY2tncm91bmQtY29sb3I6IHJnYig3LCAxNjAsIDk2KTtcXHJcXG59XFxyXFxuXFxyXFxuLmJ1dHRvbi5yZXNldC1zdGF0IHtcXHJcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogcmdiKDE4OSwgNDUsIDQ1KTtcXHJcXG59XFxyXFxuXFxyXFxuLm5vdGhpbmctZGlmZiB7XFxyXFxuICAgIHdpZHRoOiAxMDAlO1xcclxcbn1cXHJcXG5cXHJcXG4ubm90aGluZy1kaWZmIHAge1xcclxcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XFxyXFxuICAgIHRvcDogMjAlO1xcclxcbn1cXHJcXG5cXHJcXG4uZGlzYWJsZWQ6aG92ZXIge1xcclxcbiAgICBjdXJzb3I6YXV0bztcXHJcXG59XFxyXFxuXFxyXFxuLyogLS0tIEFuaW1hdGlvbiAtLS0gKi9cXHJcXG5cXHJcXG5Aa2V5ZnJhbWVzIGZsaXAtY2FyZCB7XFxyXFxuICAgIDAlIHt9XFxyXFxuICAgIDUwJSB7dHJhbnNmb3JtOiByb3RhdGVZKDg5ZGVnKX1cXHJcXG59XFxyXFxuXFxyXFxuQGtleWZyYW1lcyB1bmZsaXAtY2FyZCB7XFxyXFxuICAgIDAlIHt9XFxyXFxuICAgIDUwJSB7dHJhbnNmb3JtOiByb3RhdGVZKDg5ZGVnKX1cXHJcXG59XFxyXFxuXFxyXFxuQGtleWZyYW1lcyByb3RhdGlvbiB7XFxyXFxuICAgIDAlIHt9XFxyXFxuICAgIDEwMCUge3RyYW5zZm9ybTogcm90YXRlKDM2MGRlZyl9XFxyXFxufVxcclxcblxcclxcbi8qIC0tLSBSRVNQT05TSVZFIExBWU9VVFMgLS0tICovXFxyXFxuXFxyXFxuQG1lZGlhIChtYXgtd2lkdGg6IDE0MzlweCkge1xcclxcbiAgICAuY29udGFpbmVyLWNlbnRlcmVkIHtcXHJcXG4gICAgICAgIG1pbi13aWR0aDogY2FsYygxNDQwdncqMTAwLzE0NDAgLSAyMHB4KTtcXHJcXG4gICAgfVxcclxcblxcclxcbiAgICBoZWFkZXIubWFpbi1wYWdlIHtcXHJcXG4gICAgICAgIG1hcmdpbi10b3A6ICBjYWxjKDM4MHZ3KjEwMC8xNDQwKTtcXHJcXG4gICAgfVxcclxcblxcclxcbiAgICBoZWFkZXIgLmdyYXBoaWMge1xcclxcbiAgICAgICAgdG9wOiBjYWxjKC0zNzB2dyoxMDAvMTQ0MCArIDVweCk7XFxyXFxuICAgIH1cXHJcXG59XFxyXFxuXFxyXFxuQG1lZGlhIChtYXgtd2lkdGg6IDU1OXB4KSB7XFxyXFxuICAgIC5tYWluLWNvbnRyb2xzIHtcXHJcXG4gICAgICAgIHdpZHRoOiAxMDB2dztcXHJcXG4gICAgICAgIGJvcmRlci1yYWRpdXM6IDA7XFxyXFxuICAgIH1cXHJcXG5cXHJcXG4gICAgLmdhbWUtY29udHJvbHMge1xcclxcbiAgICAgICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxyXFxuICAgIH1cXHJcXG5cXHJcXG4gICAgLmdhbWUtYnV0dG9uIHtcXHJcXG4gICAgICAgIHdpZHRoOiA3MHB4O1xcclxcbiAgICAgICAgaGVpZ2h0OiA3MHB4O1xcclxcbiAgICB9XFxyXFxuXFxyXFxuICAgIGgxIHtcXHJcXG4gICAgICAgIG1heC13aWR0aDogNzVweDtcXHJcXG4gICAgICAgIGZvbnQtc2l6ZTogMjRweDtcXHJcXG4gICAgfVxcclxcblxcclxcbiAgICBoMi50b3BpYy1uYW1lIHtcXHJcXG4gICAgICAgIGZvbnQtc2l6ZTogMzJweDtcXHJcXG4gICAgICAgIG1hcmdpbjogMTBweCAwO1xcclxcbiAgICB9XFxyXFxuXFxyXFxuICAgIC5jYXJkLW1haW4tcGFnZSB7XFxyXFxuICAgICAgICB3aWR0aDogMjMwcHg7XFxyXFxuICAgICAgICBoZWlnaHQ6IDIyMHB4O1xcclxcbiAgICAgICAgbWFyZ2luOiAxMHB4IDA7XFxyXFxuICAgIH1cXHJcXG5cXHJcXG4gICAgLmNhcmQtbWFpbi1wYWdlIHAge1xcclxcbiAgICAgICAgZm9udC1zaXplOiAyOHB4O1xcclxcbiAgICB9XFxyXFxuXFxyXFxuICAgIC5zdGF0LWJ1dHRvbnMtd3JhcHBlciB7XFxyXFxuICAgICAgICB3aWR0aDogNzglO1xcclxcbiAgICB9XFxyXFxuXFxyXFxuICAgIC5zdGF0LWJ1dHRvbiB7XFxyXFxuICAgICAgICB3aWR0aDogMTkwcHg7XFxyXFxuICAgICAgICBoZWlnaHQ6IDUycHg7XFxyXFxuICAgICAgICBmb250LXNpemU6IDIxcHg7XFxyXFxuICAgICAgICBtYXJnaW46IDVweCAwO1xcclxcbiAgICB9XFxyXFxuXFxyXFxuICAgIG1haW4uY29udGFpbmVyLWNlbnRlcmVkIHtcXHJcXG4gICAgICAgIHdpZHRoOiAxMDB2dztcXHJcXG4gICAgfVxcclxcblxcclxcbiAgICAuc3RhdC1jb250YWluZXIge1xcclxcbiAgICAgICAgd2lkdGg6IDEwMCU7XFxyXFxuICAgIH1cXHJcXG5cXHJcXG4gICAgLnRhYmxlLXdyYXBwZXIge1xcclxcbiAgICAgICAgd2lkdGg6IDcyJTtcXHJcXG4gICAgfVxcclxcbn1cXHJcXG5cXHJcXG5AbWVkaWEgKG1heC1oZWlnaHQ6IDk3MHB4KSB7XFxyXFxuICAgIC5tZW51LWxpc3Qge1xcclxcbiAgICAgICAgbWFyZ2luLXRvcDogMjM1cHg7XFxyXFxuICAgIH1cXHJcXG59XCIsIFwiXCIse1widmVyc2lvblwiOjMsXCJzb3VyY2VzXCI6W1wid2VicGFjazovLy4vYXNzZXRzL3N0eWxlcy9zdHlsZS5jc3NcIl0sXCJuYW1lc1wiOltdLFwibWFwcGluZ3NcIjpcIkFBQUEsc0NBQXNDO0FBQ3RDO0lBQ0ksZ0NBQWdDO0lBQ2hDLGtCQUFrQjtJQUNsQixnQkFBZ0I7SUFDaEI7OytEQUU0RSxFQUFFLGdEQUFnRDtFQUNoSTs7QUFFRiwyQkFBMkI7QUFDM0I7SUFDSSxxQkFBcUI7SUFDckIsa0JBQWtCO0lBQ2xCLGdCQUFnQjtJQUNoQjs7K0RBRWlFLEVBQUUsZ0RBQWdEO0VBQ3JIOztBQUVGLHNDQUFzQzs7QUFFdEM7SUFDSSxzQkFBc0I7QUFDMUI7O0FBRUE7SUFDSSxtQkFBbUI7QUFDdkI7O0FBRUEsK0JBQStCOztBQUUvQjtJQUNJLDBCQUEwQjtJQUMxQiwwQkFBMEI7SUFDMUIsMEJBQTBCO0lBQzFCLDRCQUE0QjtJQUM1Qix1QkFBdUI7QUFDM0I7O0FBRUEsdUNBQXVDOztBQUV2QztJQUNJLFdBQVc7SUFDWCxhQUFhO0lBQ2Isc0JBQXNCO0lBQ3RCLG1CQUFtQjtJQUNuQix3Q0FBd0M7SUFDeEMsa0dBQStHO0lBQy9HLDRCQUE0QjtJQUM1Qiwy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QUNoQjs7SUFFQTtRQUNJLGVBQWU7UUFDZixlQUFlO0lBQ25COztJQUVBO1FBQ0ksZUFBZTtRQUNmLGNBQWM7SUFDbEI7O0lBRUE7UUFDSSxZQUFZO1FBQ1osYUFBYTtRQUNiLGNBQWM7SUFDbEI7O0lBRUE7UUFDSSxlQUFlO0lBQ25COztJQUVBO1FBQ0ksVUFBVTtJQUNkOztJQUVBO1FBQ0ksWUFBWTtRQUNaLFlBQVk7UUFDWixlQUFlO1FBQ2YsYUFBYTtJQUNqQjs7SUFFQTtRQUNJLFlBQVk7SUFDaEI7O0lBRUE7UUFDSSxXQUFXO0lBQ2Y7O0lBRUE7UUFDSSxVQUFVO0lBQ2Q7QUFDSjs7QUFFQTtJQUNJO1FBQ0ksaUJBQWlCO0lBQ3JCO0FBQ0pcIixcInNvdXJjZXNDb250ZW50XCI6W1wiLyogZ2xvcmlhLWhhbGxlbHVqYWgtcmVndWxhciAtIGxhdGluICovXFxyXFxuQGZvbnQtZmFjZSB7XFxyXFxuICAgIGZvbnQtZmFtaWx5OiAnR2xvcmlhIEhhbGxlbHVqYWgnO1xcclxcbiAgICBmb250LXN0eWxlOiBub3JtYWw7XFxyXFxuICAgIGZvbnQtd2VpZ2h0OiA0MDA7XFxyXFxuICAgIHNyYzogbG9jYWwoJycpLFxcclxcbiAgICAgICAgIHVybCgnLi4vZm9udHMvZ2xvcmlhLWhhbGxlbHVqYWgtdjE3LWxhdGluLXJlZ3VsYXIud29mZjInKSBmb3JtYXQoJ3dvZmYyJyksIC8qIENocm9tZSAyNissIE9wZXJhIDIzKywgRmlyZWZveCAzOSsgKi9cXHJcXG4gICAgICAgICB1cmwoJy4uL2ZvbnRzL2dsb3JpYS1oYWxsZWx1amFoLXYxNy1sYXRpbi1yZWd1bGFyLndvZmYnKSBmb3JtYXQoJ3dvZmYnKTsgLyogQ2hyb21lIDYrLCBGaXJlZm94IDMuNissIElFIDkrLCBTYWZhcmkgNS4xKyAqL1xcclxcbiAgfVxcclxcblxcclxcbi8qIG5ldWNoYS1yZWd1bGFyIC0gbGF0aW4gKi9cXHJcXG5AZm9udC1mYWNlIHtcXHJcXG4gICAgZm9udC1mYW1pbHk6ICdOZXVjaGEnO1xcclxcbiAgICBmb250LXN0eWxlOiBub3JtYWw7XFxyXFxuICAgIGZvbnQtd2VpZ2h0OiA0MDA7XFxyXFxuICAgIHNyYzogbG9jYWwoJycpLFxcclxcbiAgICAgICAgIHVybCgnLi4vZm9udHMvbmV1Y2hhLXYxNy1sYXRpbi1yZWd1bGFyLndvZmYyJykgZm9ybWF0KCd3b2ZmMicpLCAvKiBDaHJvbWUgMjYrLCBPcGVyYSAyMyssIEZpcmVmb3ggMzkrICovXFxyXFxuICAgICAgICAgdXJsKCcuLi9mb250cy9uZXVjaGEtdjE3LWxhdGluLXJlZ3VsYXIud29mZicpIGZvcm1hdCgnd29mZicpOyAvKiBDaHJvbWUgNissIEZpcmVmb3ggMy42KywgSUUgOSssIFNhZmFyaSA1LjErICovXFxyXFxuICB9XFxyXFxuXFxyXFxuLyogYm9yZGVyLWJveCBtb2RlbCBmb3IgYWxsIGVsZW1lbnRzICovXFxyXFxuXFxyXFxuaHRtbCB7XFxyXFxuICAgIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XFxyXFxufVxcclxcblxcclxcbiosICo6OmJlZm9yZSwgKjo6YWZ0ZXIge1xcclxcbiAgICBib3gtc2l6aW5nOiBpbmhlcml0O1xcclxcbn1cXHJcXG5cXHJcXG4vKiAtLS0gUGFnZSBjb2xvciBzdHlsaW5nIC0tLSAqL1xcclxcblxcclxcbjpyb290IHtcXHJcXG4gICAgLS1jb2xvci1iZy1tYWluLTE6ICNmZmZmZmY7XFxyXFxuICAgIC0tY29sb3ItYmctbWFpbi0yOiAjZGJmNWY4O1xcclxcbiAgICAtLWNvbG9yLWJnLW1haW4tMzogI2U5ZjVmZjtcXHJcXG4gICAgLS1jb2xvci1iZy1tYWluLTQ6ICNmMGMyY2Q2MztcXHJcXG4gICAgLS1jb2xvci1mb250LTE6ICMzMDcwYTY7XFxyXFxufVxcclxcblxcclxcbi8qIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gKi9cXHJcXG5cXHJcXG5ib2R5IHtcXHJcXG4gICAgd2lkdGg6IDEwMCU7XFxyXFxuICAgIGRpc3BsYXk6IGZsZXg7XFxyXFxuICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxyXFxuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxyXFxuICAgIGJhY2tncm91bmQtY29sb3I6IHZhcigtLWNvbG9yLWJnLW1haW4tMSk7XFxyXFxuICAgIGJhY2tncm91bmQtaW1hZ2U6IHVybChcXFwiLi4vaW1nL2FwcC93YXRlcmNvbG9yLWJsdWUtYmctbGVmdC5qcGdcXFwiKSwgdXJsKFxcXCIuLi9pbWcvYXBwL3dhdGVyY29sb3ItYmx1ZS1iZy1yaWdodC5qcGdcXFwiKTtcXHJcXG4gICAgYmFja2dyb3VuZC1hdHRhY2htZW50OiBmaXhlZDtcXHJcXG4gICAgYmFja2dyb3VuZC1wb3NpdGlvbjogbGVmdCB0b3AsIHJpZ2h0IGJvdHRvbTtcXHJcXG4gICAgYmFja2dyb3VuZC1yZXBlYXQ6IHJlcGVhdC15O1xcclxcbiAgICBiYWNrZ3JvdW5kLXNpemU6IDE1JSBhdXRvO1xcclxcbiAgICBmb250LWZhbWlseTogJ05ldWNoYScsIGN1cnNpdmU7XFxyXFxuICAgIGNvbG9yOiB2YXIoLS1jb2xvci1mb250LTEpO1xcclxcbn1cXHJcXG5cXHJcXG5ib2R5Lm9wZW5lZC1tZW51IHtcXHJcXG4gICAgb3ZlcmZsb3cteTogaGlkZGVuO1xcclxcbn1cXHJcXG5cXHJcXG4uaW5hY3RpdmUge1xcclxcbiAgICB2aXNpYmlsaXR5OiBoaWRkZW47XFxyXFxuICAgIHBvc2l0aW9uOiBmaXhlZDtcXHJcXG4gICAgdG9wOiAwO1xcclxcbn1cXHJcXG5cXHJcXG4uZ3JhcGhpYywgaW1nIHtcXHJcXG4gICAgd2lkdGg6IDEwMCU7XFxyXFxuICAgIGhlaWdodDogYXV0bztcXHJcXG4gICAgcGFkZGluZzogMDtcXHJcXG4gICAgbWFyZ2luOiAwO1xcclxcbn1cXHJcXG5cXHJcXG4uY29udGFpbmVyLWNlbnRlcmVkIHtcXHJcXG4gICAgbWF4LXdpZHRoOiAxNDQwcHg7XFxyXFxuICAgIG1pbi13aWR0aDogMTQ0MHB4O1xcclxcbiAgICBtYXJnaW46IDAgYXV0bztcXHJcXG59XFxyXFxuXFxyXFxuaGVhZGVyLmNvbnRhaW5lci1jZW50ZXJlZCB7XFxyXFxuICAgIGRpc3BsYXk6IGZsZXg7XFxyXFxuICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxyXFxuICAgIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcclxcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xcclxcbiAgICBwb3NpdGlvbjogLXdlYmtpdC1zdGlja3k7XFxyXFxuICAgIHBvc2l0aW9uOiBzdGlja3k7XFxyXFxuICAgIHRvcDogMDtcXHJcXG4gICAgei1pbmRleDogODtcXHJcXG4gICAgbWFyZ2luLXRvcDogMDtcXHJcXG4gICAgdHJhbnNpdGlvbjogbWFyZ2luIDFzO1xcclxcbn1cXHJcXG5cXHJcXG5oZWFkZXIubWFpbi1wYWdlIHtcXHJcXG4gICAgbWFyZ2luLXRvcDogMzgwcHg7XFxyXFxufVxcclxcblxcclxcbmhlYWRlciAuaGVhZGVyLWltYWdlIHtcXHJcXG4gICAgd2lkdGg6IDcwJTtcXHJcXG4gICAgcG9zaXRpb246IGFic29sdXRlO1xcclxcbiAgICB0b3A6IC0zNzZweDtcXHJcXG59XFxyXFxuXFxyXFxuLm1haW4tY29udHJvbHMge1xcclxcbiAgICB3aWR0aDogODAlO1xcclxcbiAgICBtaW4taGVpZ2h0OiAxNTBweDtcXHJcXG4gICAgZGlzcGxheTogZmxleDtcXHJcXG4gICAganVzdGlmeS1jb250ZW50OiBzcGFjZS1hcm91bmQ7XFxyXFxuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxyXFxuICAgIGJvcmRlci1yYWRpdXM6IDM1cHg7XFxyXFxuICAgIGJhY2tncm91bmQtY29sb3I6IHdoaXRlO1xcclxcbiAgICBiYWNrZ3JvdW5kLWltYWdlOiB1cmwoLi4vaW1nL2FwcC93YXRlcmNvbG9yLXdhdmVzLTAxLXVwLnBuZyksIHVybCguLi9pbWcvYXBwL3dhdGVyY29sb3Itd2F2ZXMtMDEtZG93bi5wbmcpO1xcclxcbiAgICBiYWNrZ3JvdW5kLXBvc2l0aW9uOiAxMDAlIDAsIDAgMTAwJTtcXHJcXG4gICAgYmFja2dyb3VuZC1yZXBlYXQ6IHJlcGVhdC14O1xcclxcbiAgICBiYWNrZ3JvdW5kLXNpemU6IGF1dG8gMjglO1xcclxcbiAgICB6LWluZGV4OiA1O1xcclxcbn1cXHJcXG5cXHJcXG4uZ2FtZS1jb250cm9scyB7XFxyXFxuICAgIHdpZHRoOiAxMDB2dztcXHJcXG4gICAgYm9yZGVyLXJhZGl1czogMTBweDtcXHJcXG4gICAgbWluLWhlaWdodDogMTAwcHg7XFxyXFxuICAgIHBhZGRpbmc6IDEwcHggMDtcXHJcXG4gICAgZGlzcGxheTogZmxleDtcXHJcXG4gICAganVzdGlmeS1jb250ZW50OiBzcGFjZS1hcm91bmQ7XFxyXFxuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxyXFxuICAgIGJhY2tncm91bmQtY29sb3I6IHdoaXRlO1xcclxcbiAgICBib3JkZXItcmFkaXVzOiAwO1xcclxcbiAgICBiYWNrZ3JvdW5kLWltYWdlOiB1cmwoXFxcIi4uL2ltZy9hcHAvd2F0ZXJjb2xvci1ibHVlLWJnLWxlZnQuanBnXFxcIiksIHVybChcXFwiLi4vaW1nL2FwcC93YXRlcmNvbG9yLWJsdWUtYmctcmlnaHQuanBnXFxcIik7XFxyXFxuICAgIGJhY2tncm91bmQtYXR0YWNobWVudDogZml4ZWQ7XFxyXFxuICAgIGJhY2tncm91bmQtcG9zaXRpb246IGxlZnQgdG9wLCByaWdodCBib3R0b207XFxyXFxuICAgIGJhY2tncm91bmQtcmVwZWF0OiByZXBlYXQteTtcXHJcXG4gICAgYmFja2dyb3VuZC1zaXplOiAxNSUgYXV0bztcXHJcXG59XFxyXFxuXFxyXFxuaDEge1xcclxcbiAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XFxyXFxuICAgIGZvbnQtZmFtaWx5OiAnR2xvcmlhIEhhbGxlbHVqYWgnLCBjdXJzaXZlO1xcclxcbn1cXHJcXG5cXHJcXG4uYnV0dG9uOmhvdmVyIHtcXHJcXG4gICAgY3Vyc29yOiBwb2ludGVyO1xcclxcbn1cXHJcXG5cXHJcXG4ubWVudS1idXR0b24ge1xcclxcbiAgICB6LWluZGV4OiAxMDtcXHJcXG4gICAgd2lkdGg6IDM2cHg7XFxyXFxuICAgIGhlaWdodDogMzZweDtcXHJcXG4gICAgYmFja2dyb3VuZC1pbWFnZTogdXJsKFxcXCIuLi9pbWcvYXBwL3dhdGVyY29sb3ItbWVudS1idXR0b24tMDEucG5nXFxcIik7XFxyXFxuICAgIGJhY2tncm91bmQtc2l6ZTogY292ZXI7XFxyXFxuICAgIHRyYW5zaXRpb246IHRyYW5zZm9ybSAxcztcXHJcXG59XFxyXFxuXFxyXFxuLm1lbnUtYnV0dG9uLm9wZW5lZC1tZW51IHtcXHJcXG4gICAgdHJhbnNmb3JtOiByb3RhdGUoMTgwZGVnKTtcXHJcXG59XFxyXFxuXFxyXFxuLmJ1dHRvbi5jbG9zZS1tZW51IHtcXHJcXG4gICAgcG9zaXRpb246IGFic29sdXRlO1xcclxcbiAgICB0b3A6IDIwcHg7XFxyXFxuICAgIHJpZ2h0OiAyMHB4O1xcclxcbiAgICB3aWR0aDogNTBweDtcXHJcXG4gICAgaGVpZ2h0OiA1MHB4O1xcclxcbiAgICBib3JkZXItcmFkaXVzOiA1MCU7XFxyXFxuICAgIGJhY2tncm91bmQtaW1hZ2U6IHVybChcXFwiLi4vaW1nL2FwcC93YXRlcmNvbG9yLXJlZC1jcm9zcy1idXR0b24tMDEuanBnXFxcIik7XFxyXFxuICAgIGJhY2tncm91bmQtc2l6ZTogY292ZXI7XFxyXFxuXFxyXFxufVxcclxcblxcclxcbi5zd2l0Y2gge1xcclxcbiAgICB3aWR0aDogMTEwcHg7XFxyXFxuICAgIGJhY2tncm91bmQtY29sb3I6ICNmYWY4ZmQ7XFxyXFxuICAgIGRpc3BsYXk6IGZsZXg7XFxyXFxuICAgIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjtcXHJcXG4gICAgYm9yZGVyLXJhZGl1czogNjBweDtcXHJcXG4gICAgcG9zaXRpb246IHJlbGF0aXZlO1xcclxcbiAgICBib3JkZXI6IDJweCB2YXIoLS1jb2xvci1mb250LTEpIHNvbGlkO1xcclxcbn1cXHJcXG5cXHJcXG4uc3dpdGNoLXJhaWwge1xcclxcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XFxyXFxuICAgIGxlZnQ6IDA7XFxyXFxuICAgIHdpZHRoOiAxMDAlO1xcclxcbiAgICBoZWlnaHQ6IDEwMCU7XFxyXFxuICAgIGJvcmRlci1yYWRpdXM6IGluaGVyaXQ7XFxyXFxufVxcclxcblxcclxcbi5zd2l0Y2gtcm9sbGVyIHtcXHJcXG4gICAgd2lkdGg6IDU1cHg7XFxyXFxuICAgIGhlaWdodDogMTAwJTtcXHJcXG4gICAgcG9zaXRpb246IGFic29sdXRlO1xcclxcbiAgICBsZWZ0OiAwO1xcclxcbiAgICBib3JkZXItcmFkaXVzOiBpbmhlcml0O1xcclxcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjMzI3MWE3NGQ7XFxyXFxuICAgIHotaW5kZXg6IDEwO1xcclxcbiAgICB0cmFuc2l0aW9uOiBsZWZ0IDAuN3M7XFxyXFxuICAgIGJvcmRlcjogMXB4IHZhcigtLWNvbG9yLWZvbnQtMSkgc29saWQ7XFxyXFxufVxcclxcblxcclxcbi5zd2l0Y2guc3dpdGNoLW9uIC5zd2l0Y2gtcm9sbGVyIHtcXHJcXG4gICAgbGVmdDogNTNweDtcXHJcXG59XFxyXFxuXFxyXFxuLnN3aXRjaC10cmlnZ2VyIHtcXHJcXG4gICAgbWFyZ2luOiAwIDEwcHg7XFxyXFxuICAgIGhlaWdodDogNDBweDtcXHJcXG4gICAgei1pbmRleDogOTtcXHJcXG4gICAgcGFkZGluZzogMTBweCAwO1xcclxcbiAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XFxyXFxuICAgIGZvbnQtc2l6ZTogMjBweDtcXHJcXG59XFxyXFxuXFxyXFxuLmdhbWUtYnV0dG9uIHtcXHJcXG4gICAgd2lkdGg6IDEwMHB4O1xcclxcbiAgICBoZWlnaHQ6IDEwMHB4O1xcclxcbiAgICBib3JkZXItcmFkaXVzOiA1MHB4O1xcclxcbiAgICBiYWNrZ3JvdW5kLXBvc2l0aW9uOiBjZW50ZXI7XFxyXFxuICAgIGJhY2tncm91bmQtcmVwZWF0OiBuby1yZXBlYXQ7XFxyXFxuICAgIGJhY2tncm91bmQtc2l6ZTogY292ZXI7XFxyXFxufVxcclxcblxcclxcbi5nYW1lLWJ1dHRvbi5zdGFydC1idXR0b24ge1xcclxcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjMDM5MjI3O1xcclxcbiAgICBiYWNrZ3JvdW5kLWltYWdlOiB1cmwoXFxcIi4uL2ltZy9hcHAvd2F0ZXJjb2xvci1idXR0b24tc3RhcnQtMDEucG5nXFxcIik7XFxyXFxufVxcclxcblxcclxcbi5nYW1lLWJ1dHRvbi5yZXBlYXQtYnV0dG9uIHtcXHJcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogIzM5NGNmNTtcXHJcXG4gICAgYmFja2dyb3VuZC1pbWFnZTogdXJsKFxcXCIuLi9pbWcvYXBwL3dhdGVyY29sb3ItYnV0dG9uLXJlcGVhdC0wMS5wbmdcXFwiKTtcXHJcXG59XFxyXFxuXFxyXFxuLmdhbWUtcHJvZ3Jlc3Mge1xcclxcbiAgICB3aWR0aDogMjIwcHg7XFxyXFxuICAgIGRpc3BsYXk6IGZsZXg7XFxyXFxuICAgIGp1c3RpZnktY29udGVudDogc3BhY2UtYXJvdW5kO1xcclxcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xcclxcbn1cXHJcXG5cXHJcXG4uZ2FtZS1pbmRpY2F0b3Ige1xcclxcbiAgICB3aWR0aDogMTUwcHg7XFxyXFxuICAgIGhlaWdodDogNDBweDtcXHJcXG4gICAgYm9yZGVyLXJhZGl1czogMThweDtcXHJcXG4gICAgZGlzcGxheTogZmxleDtcXHJcXG4gICAganVzdGlmeS1jb250ZW50OiBmbGV4LXN0YXJ0O1xcclxcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xcclxcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjZmFmOGZkO1xcclxcbiAgICBib3JkZXI6IDFweCB2YXIoLS1jb2xvci1mb250LTEpIHNvbGlkO1xcclxcbn1cXHJcXG5cXHJcXG4uc3RhciB7XFxyXFxuICAgIHdpZHRoOiAzMHB4O1xcclxcbn1cXHJcXG5cXHJcXG4uZ2FtZS1zY29yZSB7XFxyXFxuICAgIHRleHQtYWxpZ246IGNlbnRlcjtcXHJcXG59XFxyXFxuXFxyXFxuLmdhbWUtc2NvcmUgLmNvcnJlY3Qge1xcclxcbiAgICBjb2xvcjogIzAwODAwMDtcXHJcXG59XFxyXFxuXFxyXFxuLmdhbWUtc2NvcmUgLndyb25nIHtcXHJcXG4gICAgY29sb3I6ICNmZjAwMDA7XFxyXFxufVxcclxcblxcclxcbm5hdiB7XFxyXFxuICAgIGxlZnQ6IC0zMjBweDtcXHJcXG4gICAgcG9zaXRpb246IGZpeGVkO1xcclxcbiAgICB0b3A6IDA7XFxyXFxuICAgIHdpZHRoOiAzMjBweDtcXHJcXG4gICAgaGVpZ2h0OiAxMDAlO1xcclxcbiAgICBvdmVyZmxvdy15OiBhdXRvO1xcclxcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1jb2xvci1iZy1tYWluLTEpO1xcclxcbiAgICB6LWluZGV4OiAxMTtcXHJcXG4gICAgYmFja2dyb3VuZC1pbWFnZTogdXJsKFxcXCIuLi9pbWcvYXBwL3dhdGVyY29sb3Ita3l0ZXMtMDEuanBnXFxcIiksIHVybChcXFwiLi4vaW1nL2FwcC93YXRlcmNvbG9yLWJ1dGVyZmx5LTAxLmpwZ1xcXCIpO1xcclxcbiAgICBiYWNrZ3JvdW5kLXNpemU6IDQ1MHB4IGF1dG8sIDE3OXB4IGF1dG87XFxyXFxuICAgIGJhY2tncm91bmQtcG9zaXRpb246IDBweCAwcHgsIDEyMnB4IDEwMCU7XFxyXFxuICAgIGJhY2tncm91bmQtcmVwZWF0OiBuby1yZXBlYXQsIG5vLXJlcGVhdDtcXHJcXG4gICAgYm94LXNoYWRvdzogbm9uZTtcXHJcXG4gICAgdHJhbnNpdGlvbi1wcm9wZXJ0eTogbGVmdCwgYmFja2dyb3VuZC1wb3NpdGlvbiwgYm94LXNoYWRvdztcXHJcXG4gICAgdHJhbnNpdGlvbi1kdXJhdGlvbjogMS4ycyw1cztcXHJcXG59XFxyXFxuXFxyXFxubmF2Lm9wZW5lZC1tZW51IHtcXHJcXG4gICAgbGVmdDogMDtcXHJcXG4gICAgYm94LXNoYWRvdzogMHB4IDAgMjBweCAxcHggIzk0Y2E2OCwgMHB4IDAgODBweCAyMHB4ICNmMGUwODAsIDUwcHggMCAyNTBweCA1MHB4IHZhcigtLWNvbG9yLWZvbnQtMSk7XFxyXFxufVxcclxcblxcclxcbi5tZW51LWxpc3Qge1xcclxcbiAgICBoZWlnaHQ6IDUwMHB4O1xcclxcbiAgICBtYXJnaW4tdG9wOiBjYWxjKDUwdmggLSAyNTBweCk7XFxyXFxufVxcclxcblxcclxcbi5tZW51LWxpc3QgbGkge1xcclxcbiAgICBwYWRkaW5nOiAxMHB4IDA7XFxyXFxuICAgIHRleHQtYWxpZ246IGNlbnRlcjtcXHJcXG4gICAgZm9udC1zaXplOiAyZW07XFxyXFxuICAgIGJhY2tncm91bmQtY29sb3I6IHZhcigtLWNvbG9yLWJnLW1haW4tMSk7XFxyXFxufVxcclxcblxcclxcbi5tZW51LWxpc3QgbGk6aG92ZXIge1xcclxcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1jb2xvci1iZy1tYWluLTIpO1xcclxcbiAgICBiYWNrZ3JvdW5kLWltYWdlOiB1cmwoXFxcIi4uL2ltZy9hcHAvd2F0ZXJjb2xvci1saW5lLTAyLXJpZ2h0LnBuZ1xcXCIpO1xcclxcbiAgICBiYWNrZ3JvdW5kLXNpemU6IDEwMCUgMTAwJTtcXHJcXG4gICAgY29sb3I6IHdoaXRlO1xcclxcbiAgICBwYWRkaW5nOiAxNXB4IDA7XFxyXFxufVxcclxcblxcclxcbi5tZW51LWxpc3QgbGk6bnRoLWNoaWxkKGV2ZW4pOmhvdmVyIHtcXHJcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0tY29sb3ItYmctbWFpbi0yKTtcXHJcXG4gICAgYmFja2dyb3VuZC1pbWFnZTogdXJsKFxcXCIuLi9pbWcvYXBwL3dhdGVyY29sb3ItbGluZS0wMi5wbmdcXFwiKTtcXHJcXG59XFxyXFxuXFxyXFxuLm1lbnUtbGlzdCBsaS5hY3RpdmUtcGFnZSwgLm1lbnUtbGlzdCBsaS5hY3RpdmUtcGFnZTpob3ZlciB7XFxyXFxuICAgIGJhY2tncm91bmQtY29sb3I6IHZhcigtLWNvbG9yLWJnLW1haW4tMik7XFxyXFxuICAgIGJhY2tncm91bmQtaW1hZ2U6IHVybChcXFwiLi4vaW1nL2FwcC93YXRlcmNvbG9yLWxpbmUtMDEucG5nXFxcIik7XFxyXFxuICAgIGJhY2tncm91bmQtc2l6ZTogMTAwJSAxMDAlO1xcclxcbiAgICBjb2xvcjogd2hpdGU7XFxyXFxuICAgIHBhZGRpbmc6IDE1cHggMDtcXHJcXG59XFxyXFxuXFxyXFxubWFpbi5jb250YWluZXItY2VudGVyZWQge1xcclxcbiAgICBtYXJnaW4tdG9wOiAyMHB4O1xcclxcbiAgICBwYWRkaW5nLWJvdHRvbTogMzVweDtcXHJcXG59XFxyXFxuXFxyXFxuLmNvbnRlbnQtd3JhcHBlciB7XFxyXFxuICAgIHdpZHRoOiAxMDAlO1xcclxcbiAgICBtYXJnaW46IGF1dG87XFxyXFxuICAgIGRpc3BsYXk6IGZsZXg7XFxyXFxuICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxyXFxuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxyXFxufVxcclxcblxcclxcbmgyLnRvcGljLW5hbWUge1xcclxcbiAgICBmb250LXNpemU6IDM0cHg7XFxyXFxuICAgIG1hcmdpbjogMzBweCAwO1xcclxcbn1cXHJcXG5cXHJcXG4uY2FyZC1jb250YWluZXIge1xcclxcbiAgICBkaXNwbGF5OiBmbGV4O1xcclxcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWFyb3VuZDtcXHJcXG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXHJcXG4gICAgZmxleC13cmFwOiB3cmFwO1xcclxcbiAgICB3aWR0aDogNzglO1xcclxcbiAgICBtYXJnaW46IGF1dG87XFxyXFxufVxcclxcblxcclxcbi5jYXJkIHtcXHJcXG4gICAgbWFyZ2luOiAxNXB4O1xcclxcbiAgICBwb3NpdGlvbjogcmVsYXRpdmU7XFxyXFxufVxcclxcblxcclxcbi5jYXJkLW1haW4tcGFnZSB7XFxyXFxuICAgIHdpZHRoOiAyNTZweDtcXHJcXG4gICAgaGVpZ2h0OiAyNDBweDtcXHJcXG4gICAgbWFyZ2luLXRvcDogMjBweDtcXHJcXG4gICAgcGFkZGluZzogNDVweDtcXHJcXG4gICAgYm9yZGVyLXJhZGl1czogNTAlO1xcclxcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjZmZmZmZmO1xcclxcbiAgICBiYWNrZ3JvdW5kLWltYWdlOiB1cmwoXFxcIi4uL2ltZy9hcHAvd2F0ZXJjb2xvci1ibHVlLWNhcmQtYmctMDEuanBnXFxcIik7XFxyXFxuICAgIGJhY2tncm91bmQtc2l6ZTogMTAwJSA4MyU7XFxyXFxuICAgIGJhY2tncm91bmQtcmVwZWF0OiBuby1yZXBlYXQ7XFxyXFxufVxcclxcblxcclxcbi5jYXJkLXRvcGljIHtcXHJcXG4gICAgd2lkdGg6IDIyNnB4O1xcclxcbiAgICBoZWlnaHQ6IDI3MHB4O1xcclxcbn1cXHJcXG5cXHJcXG4uY2FyZC5kaXNhYmxlZCB7XFxyXFxuICAgIGZpbHRlcjogYmx1cigzcHgpO1xcclxcbn1cXHJcXG5cXHJcXG4uY2FyZC1jb250ZW50IHtcXHJcXG4gICAgd2lkdGg6IDEwMCU7XFxyXFxuICAgIGhlaWdodDogMTAwJTtcXHJcXG4gICAgcG9zaXRpb246IHJlbGF0aXZlO1xcclxcbn1cXHJcXG5cXHJcXG4uY2FyZC10b3BpYyAuY2FyZC1jb250ZW50IHtcXHJcXG4gICAgYm9yZGVyOiAycHggdmFyKC0tY29sb3ItZm9udC0xKSBzb2xpZDtcXHJcXG4gICAgYm94LXNoYWRvdzogMCAwIDE1cHggMXB4IHZhcigtLWNvbG9yLWZvbnQtMSk7XFxyXFxufVxcclxcblxcclxcbi5jYXJkLXRvcGljIC5jYXJkLWNvbnRlbnQ6aG92ZXIge1xcclxcbiAgICBib3gtc2hhZG93OiAwIDAgMTVweCAzcHggdmFyKC0tY29sb3ItZm9udC0xKTtcXHJcXG59XFxyXFxuXFxyXFxuLmNhcmQuZGlzYWJsZWQgLmNhcmQtY29udGVudCB7XFxyXFxuICAgIGJveC1zaGFkb3c6IG5vbmU7XFxyXFxufVxcclxcblxcclxcbi5jYXJkLW1haW4tcGFnZSAuY2FyZC1jb250ZW50LCAuY2FyZC1tYWluLXBhZ2UgaW1nIHtcXHJcXG4gICAgYm9yZGVyLXJhZGl1czogNTBweDtcXHJcXG59XFxyXFxuXFxyXFxuLmNhcmQtY29udGVudCwgLmNhcmQtY29udGVudCBpbWcge1xcclxcbiAgICB0cmFuc2l0aW9uOiBib3JkZXItcmFkaXVzIDFzO1xcclxcbn1cXHJcXG5cXHJcXG4uY2FyZC10b3BpYyAuY2FyZC1jb250ZW50IHtcXHJcXG4gICAgYm9yZGVyLXJhZGl1czogNTBweCAwO1xcclxcbn1cXHJcXG5cXHJcXG4uY2FyZC10b3BpYy5mbGlwcGVkIC5jYXJkLWNvbnRlbnQge1xcclxcbiAgICBib3JkZXItcmFkaXVzOiAwIDUwcHg7XFxyXFxufVxcclxcblxcclxcbi5jYXJkLXRvcGljIGltZyB7XFxyXFxuICAgIGJvcmRlci1yYWRpdXM6IDUwcHggMCAwIDA7XFxyXFxufVxcclxcblxcclxcbi5jYXJkLXRvcGljLmZsaXBwZWQgaW1nIHtcXHJcXG4gICAgYm9yZGVyLXJhZGl1czogMCA1MHB4IDAgMDtcXHJcXG59XFxyXFxuXFxyXFxuLmNhcmQgcCB7XFxyXFxuICAgIG1hcmdpbi10b3A6IDE1cHg7XFxyXFxuICAgIGZvbnQtc2l6ZTogMzJweDtcXHJcXG4gICAgdGV4dC1hbGlnbjogY2VudGVyO1xcclxcbn1cXHJcXG5cXHJcXG4uY2FyZC1tYWluLXBhZ2UgcCB7XFxyXFxuICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcXHJcXG4gICAgdG9wOiAzMnB4O1xcclxcbiAgICBib3JkZXItcmFkaXVzOiAyMHB4O1xcclxcbiAgICBmb250LXNpemU6IDMycHg7XFxyXFxufVxcclxcblxcclxcbi5jYXJkLWZsaXAtYnV0dG9uIHtcXHJcXG4gICAgd2lkdGg6IDM1cHg7XFxyXFxuICAgIGhlaWdodDogMzVweDtcXHJcXG4gICAgcG9zaXRpb246IGFic29sdXRlO1xcclxcbiAgICBib3R0b206IDIwcHg7XFxyXFxuICAgIHJpZ2h0OiAyMHB4O1xcclxcbiAgICBib3JkZXItcmFkaXVzOiA1MCU7XFxyXFxuICAgIGJhY2tncm91bmQtaW1hZ2U6IHVybChcXFwiLi4vaW1nL2FwcC93YXRlcmNvbG9yLWZsaXAtYnV0dG9uLTAxLnBuZ1xcXCIpO1xcclxcbiAgICBiYWNrZ3JvdW5kLXNpemU6IGNvdmVyO1xcclxcbn1cXHJcXG5cXHJcXG4uY2FyZC1mbGlwLWJ1dHRvbjpob3ZlciB7XFxyXFxuICAgIGFuaW1hdGlvbi1uYW1lOiByb3RhdGlvbjtcXHJcXG4gICAgYW5pbWF0aW9uLWR1cmF0aW9uOiAycztcXHJcXG4gICAgYW5pbWF0aW9uLXRpbWluZy1mdW5jdGlvbjogbGluZWFyO1xcclxcbiAgICBhbmltYXRpb24taXRlcmF0aW9uLWNvdW50OiBpbmZpbml0ZTtcXHJcXG59XFxyXFxuXFxyXFxuLmZsaXBwZWQgLmNhcmQtY29udGVudCB7XFxyXFxuICAgIGFuaW1hdGlvbi1uYW1lOiBmbGlwLWNhcmQ7XFxyXFxuICAgIGFuaW1hdGlvbi1kdXJhdGlvbjogMXM7XFxyXFxufVxcclxcblxcclxcbi51bmZsaXBwZWQgLmNhcmQtY29udGVudCB7XFxyXFxuICAgIGFuaW1hdGlvbi1uYW1lOiB1bmZsaXAtY2FyZDtcXHJcXG4gICAgYW5pbWF0aW9uLWR1cmF0aW9uOiAxcztcXHJcXG59XFxyXFxuXFxyXFxuLmZpbmFsLWNsaXAge1xcclxcbiAgICBkaXNwbGF5OiBmbGV4O1xcclxcbiAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcclxcbiAgICB3aWR0aDogMzIwcHg7XFxyXFxuICAgIG1hcmdpbjogYXV0bztcXHJcXG4gICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxyXFxuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxyXFxuICAgIHBhZGRpbmc6IDUwcHggMDtcXHJcXG59XFxyXFxuXFxyXFxuLmZpbmFsLWNsaXAgcCB7XFxyXFxuICAgIGNvbG9yOiByZWQ7XFxyXFxuICAgIGZvbnQtc2l6ZTogMzZweDtcXHJcXG4gICAgbWFyZ2luLXRvcDogMzBweDtcXHJcXG59XFxyXFxuXFxyXFxuLnN0YXQtY29udGFpbmVyIHtcXHJcXG4gICAgd2lkdGg6IDc0JTtcXHJcXG4gICAgZGlzcGxheTogZmxleDtcXHJcXG4gICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXHJcXG4gICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxyXFxuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxyXFxuICAgIGZvbnQtc2l6ZTogMmVtO1xcclxcbn1cXHJcXG5cXHJcXG4udGFibGUtd3JhcHBlciB7XFxyXFxuICAgIHdpZHRoOiAxMDAlO1xcclxcbiAgICBvdmVyZmxvdy14OiBhdXRvO1xcclxcbn1cXHJcXG5cXHJcXG4uc3RhdC10YWJsZSB7XFxyXFxuICAgIHdpZHRoOiAxMDAlO1xcclxcbiAgICBib3JkZXItY29sbGFwc2U6IGNvbGxhcHNlO1xcclxcbiAgICBmb250LXNpemU6IDAuNWVtO1xcclxcblxcclxcbn1cXHJcXG5cXHJcXG50aGVhZCB7XFxyXFxuICAgIGJhY2tncm91bmQtY29sb3I6IGFsaWNlYmx1ZTtcXHJcXG59XFxyXFxuXFxyXFxudGgge1xcclxcbiAgICBoZWlnaHQ6IDMwcHg7XFxyXFxufVxcclxcblxcclxcbnRyIHtcXHJcXG4gICAgaGVpZ2h0OiAyNXB4O1xcclxcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiBhenVyZTtcXHJcXG59XFxyXFxuXFxyXFxudGgsIHRkIHtcXHJcXG4gICAgcGFkZGluZzogMCA0cHg7XFxyXFxuICAgIGJvcmRlcjogMXB4IHNvbGlkIGJsYWNrO1xcclxcbiAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XFxyXFxuICAgIHZlcnRpY2FsLWFsaWduOiBtaWRkbGU7XFxyXFxufVxcclxcblxcclxcbnRyOm50aC1jaGlsZChldmVuKSB7XFxyXFxuICAgIGJhY2tncm91bmQtY29sb3I6ICNmZGZkZGU7XFxyXFxufVxcclxcblxcclxcbi5zb3J0ZWQtZG93biwgLnNvcnRlZC11cCB7XFxyXFxuICAgIGJhY2tncm91bmQtY29sb3I6ICNkMGZhODE7XFxyXFxufVxcclxcblxcclxcbi5zb3J0LWljb24ge1xcclxcbiAgICB3aWR0aDogMTZweDtcXHJcXG4gICAgaGVpZ2h0OiBhdXRvO1xcclxcbiAgICBwb3NpdGlvbjogcmVsYXRpdmU7XFxyXFxuICAgIGxlZnQ6IDEwcHg7XFxyXFxuICAgIHRvcDogMnB4O1xcclxcbn1cXHJcXG5cXHJcXG4uc3RhdC1idXR0b25zLXdyYXBwZXIge1xcclxcbiAgICB3aWR0aDogMTAwJTtcXHJcXG4gICAgZGlzcGxheTogZmxleDtcXHJcXG4gICAganVzdGlmeS1jb250ZW50OiBzcGFjZS1hcm91bmQ7XFxyXFxuICAgIGZsZXgtd3JhcDogd3JhcDtcXHJcXG59XFxyXFxuXFxyXFxuLnN0YXQtYnV0dG9uIHtcXHJcXG4gICAgd2lkdGg6IDMwMHB4O1xcclxcbiAgICBoZWlnaHQ6IDcwcHg7XFxyXFxuICAgIG1hcmdpbjogMjBweCAwO1xcclxcbiAgICBwYWRkaW5nOiAxNXB4O1xcclxcbiAgICBib3JkZXItcmFkaXVzOiA1MHB4O1xcclxcbiAgICBib3JkZXI6IDFweCBzb2xpZCByZ2IoMCwgMCwgMCk7XFxyXFxuICAgIGNvbG9yOiBhenVyZTtcXHJcXG4gICAgdGV4dC1hbGlnbjogY2VudGVyO1xcclxcbn1cXHJcXG5cXHJcXG4uYnV0dG9uLnRyYWluLWRpZmYge1xcclxcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2IoNywgMTYwLCA5Nik7XFxyXFxufVxcclxcblxcclxcbi5idXR0b24ucmVzZXQtc3RhdCB7XFxyXFxuICAgIGJhY2tncm91bmQtY29sb3I6IHJnYigxODksIDQ1LCA0NSk7XFxyXFxufVxcclxcblxcclxcbi5ub3RoaW5nLWRpZmYge1xcclxcbiAgICB3aWR0aDogMTAwJTtcXHJcXG59XFxyXFxuXFxyXFxuLm5vdGhpbmctZGlmZiBwIHtcXHJcXG4gICAgcG9zaXRpb246IGFic29sdXRlO1xcclxcbiAgICB0b3A6IDIwJTtcXHJcXG59XFxyXFxuXFxyXFxuLmRpc2FibGVkOmhvdmVyIHtcXHJcXG4gICAgY3Vyc29yOmF1dG87XFxyXFxufVxcclxcblxcclxcbi8qIC0tLSBBbmltYXRpb24gLS0tICovXFxyXFxuXFxyXFxuQGtleWZyYW1lcyBmbGlwLWNhcmQge1xcclxcbiAgICAwJSB7fVxcclxcbiAgICA1MCUge3RyYW5zZm9ybTogcm90YXRlWSg4OWRlZyl9XFxyXFxufVxcclxcblxcclxcbkBrZXlmcmFtZXMgdW5mbGlwLWNhcmQge1xcclxcbiAgICAwJSB7fVxcclxcbiAgICA1MCUge3RyYW5zZm9ybTogcm90YXRlWSg4OWRlZyl9XFxyXFxufVxcclxcblxcclxcbkBrZXlmcmFtZXMgcm90YXRpb24ge1xcclxcbiAgICAwJSB7fVxcclxcbiAgICAxMDAlIHt0cmFuc2Zvcm06IHJvdGF0ZSgzNjBkZWcpfVxcclxcbn1cXHJcXG5cXHJcXG4vKiAtLS0gUkVTUE9OU0lWRSBMQVlPVVRTIC0tLSAqL1xcclxcblxcclxcbkBtZWRpYSAobWF4LXdpZHRoOiAxNDM5cHgpIHtcXHJcXG4gICAgLmNvbnRhaW5lci1jZW50ZXJlZCB7XFxyXFxuICAgICAgICBtaW4td2lkdGg6IGNhbGMoMTQ0MHZ3KjEwMC8xNDQwIC0gMjBweCk7XFxyXFxuICAgIH1cXHJcXG5cXHJcXG4gICAgaGVhZGVyLm1haW4tcGFnZSB7XFxyXFxuICAgICAgICBtYXJnaW4tdG9wOiAgY2FsYygzODB2dyoxMDAvMTQ0MCk7XFxyXFxuICAgIH1cXHJcXG5cXHJcXG4gICAgaGVhZGVyIC5ncmFwaGljIHtcXHJcXG4gICAgICAgIHRvcDogY2FsYygtMzcwdncqMTAwLzE0NDAgKyA1cHgpO1xcclxcbiAgICB9XFxyXFxufVxcclxcblxcclxcbkBtZWRpYSAobWF4LXdpZHRoOiA1NTlweCkge1xcclxcbiAgICAubWFpbi1jb250cm9scyB7XFxyXFxuICAgICAgICB3aWR0aDogMTAwdnc7XFxyXFxuICAgICAgICBib3JkZXItcmFkaXVzOiAwO1xcclxcbiAgICB9XFxyXFxuXFxyXFxuICAgIC5nYW1lLWNvbnRyb2xzIHtcXHJcXG4gICAgICAgIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcclxcbiAgICB9XFxyXFxuXFxyXFxuICAgIC5nYW1lLWJ1dHRvbiB7XFxyXFxuICAgICAgICB3aWR0aDogNzBweDtcXHJcXG4gICAgICAgIGhlaWdodDogNzBweDtcXHJcXG4gICAgfVxcclxcblxcclxcbiAgICBoMSB7XFxyXFxuICAgICAgICBtYXgtd2lkdGg6IDc1cHg7XFxyXFxuICAgICAgICBmb250LXNpemU6IDI0cHg7XFxyXFxuICAgIH1cXHJcXG5cXHJcXG4gICAgaDIudG9waWMtbmFtZSB7XFxyXFxuICAgICAgICBmb250LXNpemU6IDMycHg7XFxyXFxuICAgICAgICBtYXJnaW46IDEwcHggMDtcXHJcXG4gICAgfVxcclxcblxcclxcbiAgICAuY2FyZC1tYWluLXBhZ2Uge1xcclxcbiAgICAgICAgd2lkdGg6IDIzMHB4O1xcclxcbiAgICAgICAgaGVpZ2h0OiAyMjBweDtcXHJcXG4gICAgICAgIG1hcmdpbjogMTBweCAwO1xcclxcbiAgICB9XFxyXFxuXFxyXFxuICAgIC5jYXJkLW1haW4tcGFnZSBwIHtcXHJcXG4gICAgICAgIGZvbnQtc2l6ZTogMjhweDtcXHJcXG4gICAgfVxcclxcblxcclxcbiAgICAuc3RhdC1idXR0b25zLXdyYXBwZXIge1xcclxcbiAgICAgICAgd2lkdGg6IDc4JTtcXHJcXG4gICAgfVxcclxcblxcclxcbiAgICAuc3RhdC1idXR0b24ge1xcclxcbiAgICAgICAgd2lkdGg6IDE5MHB4O1xcclxcbiAgICAgICAgaGVpZ2h0OiA1MnB4O1xcclxcbiAgICAgICAgZm9udC1zaXplOiAyMXB4O1xcclxcbiAgICAgICAgbWFyZ2luOiA1cHggMDtcXHJcXG4gICAgfVxcclxcblxcclxcbiAgICBtYWluLmNvbnRhaW5lci1jZW50ZXJlZCB7XFxyXFxuICAgICAgICB3aWR0aDogMTAwdnc7XFxyXFxuICAgIH1cXHJcXG5cXHJcXG4gICAgLnN0YXQtY29udGFpbmVyIHtcXHJcXG4gICAgICAgIHdpZHRoOiAxMDAlO1xcclxcbiAgICB9XFxyXFxuXFxyXFxuICAgIC50YWJsZS13cmFwcGVyIHtcXHJcXG4gICAgICAgIHdpZHRoOiA3MiU7XFxyXFxuICAgIH1cXHJcXG59XFxyXFxuXFxyXFxuQG1lZGlhIChtYXgtaGVpZ2h0OiA5NzBweCkge1xcclxcbiAgICAubWVudS1saXN0IHtcXHJcXG4gICAgICAgIG1hcmdpbi10b3A6IDIzNXB4O1xcclxcbiAgICB9XFxyXFxufVwiXSxcInNvdXJjZVJvb3RcIjpcIlwifV0pO1xuLy8gRXhwb3J0c1xuZXhwb3J0IGRlZmF1bHQgX19fQ1NTX0xPQURFUl9FWFBPUlRfX187XG4iLCJcInVzZSBzdHJpY3RcIjtcblxuLypcbiAgTUlUIExpY2Vuc2UgaHR0cDovL3d3dy5vcGVuc291cmNlLm9yZy9saWNlbnNlcy9taXQtbGljZW5zZS5waHBcbiAgQXV0aG9yIFRvYmlhcyBLb3BwZXJzIEBzb2tyYVxuKi9cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGNzc1dpdGhNYXBwaW5nVG9TdHJpbmcpIHtcbiAgdmFyIGxpc3QgPSBbXTsgLy8gcmV0dXJuIHRoZSBsaXN0IG9mIG1vZHVsZXMgYXMgY3NzIHN0cmluZ1xuXG4gIGxpc3QudG9TdHJpbmcgPSBmdW5jdGlvbiB0b1N0cmluZygpIHtcbiAgICByZXR1cm4gdGhpcy5tYXAoZnVuY3Rpb24gKGl0ZW0pIHtcbiAgICAgIHZhciBjb250ZW50ID0gXCJcIjtcbiAgICAgIHZhciBuZWVkTGF5ZXIgPSB0eXBlb2YgaXRlbVs1XSAhPT0gXCJ1bmRlZmluZWRcIjtcblxuICAgICAgaWYgKGl0ZW1bNF0pIHtcbiAgICAgICAgY29udGVudCArPSBcIkBzdXBwb3J0cyAoXCIuY29uY2F0KGl0ZW1bNF0sIFwiKSB7XCIpO1xuICAgICAgfVxuXG4gICAgICBpZiAoaXRlbVsyXSkge1xuICAgICAgICBjb250ZW50ICs9IFwiQG1lZGlhIFwiLmNvbmNhdChpdGVtWzJdLCBcIiB7XCIpO1xuICAgICAgfVxuXG4gICAgICBpZiAobmVlZExheWVyKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJAbGF5ZXJcIi5jb25jYXQoaXRlbVs1XS5sZW5ndGggPiAwID8gXCIgXCIuY29uY2F0KGl0ZW1bNV0pIDogXCJcIiwgXCIge1wiKTtcbiAgICAgIH1cblxuICAgICAgY29udGVudCArPSBjc3NXaXRoTWFwcGluZ1RvU3RyaW5nKGl0ZW0pO1xuXG4gICAgICBpZiAobmVlZExheWVyKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJ9XCI7XG4gICAgICB9XG5cbiAgICAgIGlmIChpdGVtWzJdKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJ9XCI7XG4gICAgICB9XG5cbiAgICAgIGlmIChpdGVtWzRdKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJ9XCI7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBjb250ZW50O1xuICAgIH0pLmpvaW4oXCJcIik7XG4gIH07IC8vIGltcG9ydCBhIGxpc3Qgb2YgbW9kdWxlcyBpbnRvIHRoZSBsaXN0XG5cblxuICBsaXN0LmkgPSBmdW5jdGlvbiBpKG1vZHVsZXMsIG1lZGlhLCBkZWR1cGUsIHN1cHBvcnRzLCBsYXllcikge1xuICAgIGlmICh0eXBlb2YgbW9kdWxlcyA9PT0gXCJzdHJpbmdcIikge1xuICAgICAgbW9kdWxlcyA9IFtbbnVsbCwgbW9kdWxlcywgdW5kZWZpbmVkXV07XG4gICAgfVxuXG4gICAgdmFyIGFscmVhZHlJbXBvcnRlZE1vZHVsZXMgPSB7fTtcblxuICAgIGlmIChkZWR1cGUpIHtcbiAgICAgIGZvciAodmFyIGsgPSAwOyBrIDwgdGhpcy5sZW5ndGg7IGsrKykge1xuICAgICAgICB2YXIgaWQgPSB0aGlzW2tdWzBdO1xuXG4gICAgICAgIGlmIChpZCAhPSBudWxsKSB7XG4gICAgICAgICAgYWxyZWFkeUltcG9ydGVkTW9kdWxlc1tpZF0gPSB0cnVlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgZm9yICh2YXIgX2sgPSAwOyBfayA8IG1vZHVsZXMubGVuZ3RoOyBfaysrKSB7XG4gICAgICB2YXIgaXRlbSA9IFtdLmNvbmNhdChtb2R1bGVzW19rXSk7XG5cbiAgICAgIGlmIChkZWR1cGUgJiYgYWxyZWFkeUltcG9ydGVkTW9kdWxlc1tpdGVtWzBdXSkge1xuICAgICAgICBjb250aW51ZTtcbiAgICAgIH1cblxuICAgICAgaWYgKHR5cGVvZiBsYXllciAhPT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgICBpZiAodHlwZW9mIGl0ZW1bNV0gPT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgICAgICBpdGVtWzVdID0gbGF5ZXI7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaXRlbVsxXSA9IFwiQGxheWVyXCIuY29uY2F0KGl0ZW1bNV0ubGVuZ3RoID4gMCA/IFwiIFwiLmNvbmNhdChpdGVtWzVdKSA6IFwiXCIsIFwiIHtcIikuY29uY2F0KGl0ZW1bMV0sIFwifVwiKTtcbiAgICAgICAgICBpdGVtWzVdID0gbGF5ZXI7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgaWYgKG1lZGlhKSB7XG4gICAgICAgIGlmICghaXRlbVsyXSkge1xuICAgICAgICAgIGl0ZW1bMl0gPSBtZWRpYTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpdGVtWzFdID0gXCJAbWVkaWEgXCIuY29uY2F0KGl0ZW1bMl0sIFwiIHtcIikuY29uY2F0KGl0ZW1bMV0sIFwifVwiKTtcbiAgICAgICAgICBpdGVtWzJdID0gbWVkaWE7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgaWYgKHN1cHBvcnRzKSB7XG4gICAgICAgIGlmICghaXRlbVs0XSkge1xuICAgICAgICAgIGl0ZW1bNF0gPSBcIlwiLmNvbmNhdChzdXBwb3J0cyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaXRlbVsxXSA9IFwiQHN1cHBvcnRzIChcIi5jb25jYXQoaXRlbVs0XSwgXCIpIHtcIikuY29uY2F0KGl0ZW1bMV0sIFwifVwiKTtcbiAgICAgICAgICBpdGVtWzRdID0gc3VwcG9ydHM7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgbGlzdC5wdXNoKGl0ZW0pO1xuICAgIH1cbiAgfTtcblxuICByZXR1cm4gbGlzdDtcbn07IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKHVybCwgb3B0aW9ucykge1xuICBpZiAoIW9wdGlvbnMpIHtcbiAgICBvcHRpb25zID0ge307XG4gIH1cblxuICBpZiAoIXVybCkge1xuICAgIHJldHVybiB1cmw7XG4gIH1cblxuICB1cmwgPSBTdHJpbmcodXJsLl9fZXNNb2R1bGUgPyB1cmwuZGVmYXVsdCA6IHVybCk7IC8vIElmIHVybCBpcyBhbHJlYWR5IHdyYXBwZWQgaW4gcXVvdGVzLCByZW1vdmUgdGhlbVxuXG4gIGlmICgvXlsnXCJdLipbJ1wiXSQvLnRlc3QodXJsKSkge1xuICAgIHVybCA9IHVybC5zbGljZSgxLCAtMSk7XG4gIH1cblxuICBpZiAob3B0aW9ucy5oYXNoKSB7XG4gICAgdXJsICs9IG9wdGlvbnMuaGFzaDtcbiAgfSAvLyBTaG91bGQgdXJsIGJlIHdyYXBwZWQ/XG4gIC8vIFNlZSBodHRwczovL2RyYWZ0cy5jc3N3Zy5vcmcvY3NzLXZhbHVlcy0zLyN1cmxzXG5cblxuICBpZiAoL1tcIicoKSBcXHRcXG5dfCglMjApLy50ZXN0KHVybCkgfHwgb3B0aW9ucy5uZWVkUXVvdGVzKSB7XG4gICAgcmV0dXJuIFwiXFxcIlwiLmNvbmNhdCh1cmwucmVwbGFjZSgvXCIvZywgJ1xcXFxcIicpLnJlcGxhY2UoL1xcbi9nLCBcIlxcXFxuXCIpLCBcIlxcXCJcIik7XG4gIH1cblxuICByZXR1cm4gdXJsO1xufTsiLCJcInVzZSBzdHJpY3RcIjtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXRlbSkge1xuICB2YXIgY29udGVudCA9IGl0ZW1bMV07XG4gIHZhciBjc3NNYXBwaW5nID0gaXRlbVszXTtcblxuICBpZiAoIWNzc01hcHBpbmcpIHtcbiAgICByZXR1cm4gY29udGVudDtcbiAgfVxuXG4gIGlmICh0eXBlb2YgYnRvYSA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgdmFyIGJhc2U2NCA9IGJ0b2EodW5lc2NhcGUoZW5jb2RlVVJJQ29tcG9uZW50KEpTT04uc3RyaW5naWZ5KGNzc01hcHBpbmcpKSkpO1xuICAgIHZhciBkYXRhID0gXCJzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtjaGFyc2V0PXV0Zi04O2Jhc2U2NCxcIi5jb25jYXQoYmFzZTY0KTtcbiAgICB2YXIgc291cmNlTWFwcGluZyA9IFwiLyojIFwiLmNvbmNhdChkYXRhLCBcIiAqL1wiKTtcbiAgICB2YXIgc291cmNlVVJMcyA9IGNzc01hcHBpbmcuc291cmNlcy5tYXAoZnVuY3Rpb24gKHNvdXJjZSkge1xuICAgICAgcmV0dXJuIFwiLyojIHNvdXJjZVVSTD1cIi5jb25jYXQoY3NzTWFwcGluZy5zb3VyY2VSb290IHx8IFwiXCIpLmNvbmNhdChzb3VyY2UsIFwiICovXCIpO1xuICAgIH0pO1xuICAgIHJldHVybiBbY29udGVudF0uY29uY2F0KHNvdXJjZVVSTHMpLmNvbmNhdChbc291cmNlTWFwcGluZ10pLmpvaW4oXCJcXG5cIik7XG4gIH1cblxuICByZXR1cm4gW2NvbnRlbnRdLmpvaW4oXCJcXG5cIik7XG59OyIsIlxuICAgICAgaW1wb3J0IEFQSSBmcm9tIFwiIS4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luamVjdFN0eWxlc0ludG9TdHlsZVRhZy5qc1wiO1xuICAgICAgaW1wb3J0IGRvbUFQSSBmcm9tIFwiIS4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlRG9tQVBJLmpzXCI7XG4gICAgICBpbXBvcnQgaW5zZXJ0Rm4gZnJvbSBcIiEuLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRCeVNlbGVjdG9yLmpzXCI7XG4gICAgICBpbXBvcnQgc2V0QXR0cmlidXRlcyBmcm9tIFwiIS4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3NldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlcy5qc1wiO1xuICAgICAgaW1wb3J0IGluc2VydFN0eWxlRWxlbWVudCBmcm9tIFwiIS4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydFN0eWxlRWxlbWVudC5qc1wiO1xuICAgICAgaW1wb3J0IHN0eWxlVGFnVHJhbnNmb3JtRm4gZnJvbSBcIiEuLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZVRhZ1RyYW5zZm9ybS5qc1wiO1xuICAgICAgaW1wb3J0IGNvbnRlbnQsICogYXMgbmFtZWRFeHBvcnQgZnJvbSBcIiEhLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanMhLi9ub3JtYWxpemUuY3NzXCI7XG4gICAgICBcbiAgICAgIFxuXG52YXIgb3B0aW9ucyA9IHt9O1xuXG5vcHRpb25zLnN0eWxlVGFnVHJhbnNmb3JtID0gc3R5bGVUYWdUcmFuc2Zvcm1Gbjtcbm9wdGlvbnMuc2V0QXR0cmlidXRlcyA9IHNldEF0dHJpYnV0ZXM7XG5cbiAgICAgIG9wdGlvbnMuaW5zZXJ0ID0gaW5zZXJ0Rm4uYmluZChudWxsLCBcImhlYWRcIik7XG4gICAgXG5vcHRpb25zLmRvbUFQSSA9IGRvbUFQSTtcbm9wdGlvbnMuaW5zZXJ0U3R5bGVFbGVtZW50ID0gaW5zZXJ0U3R5bGVFbGVtZW50O1xuXG52YXIgdXBkYXRlID0gQVBJKGNvbnRlbnQsIG9wdGlvbnMpO1xuXG5cblxuZXhwb3J0ICogZnJvbSBcIiEhLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanMhLi9ub3JtYWxpemUuY3NzXCI7XG4gICAgICAgZXhwb3J0IGRlZmF1bHQgY29udGVudCAmJiBjb250ZW50LmxvY2FscyA/IGNvbnRlbnQubG9jYWxzIDogdW5kZWZpbmVkO1xuIiwiXG4gICAgICBpbXBvcnQgQVBJIGZyb20gXCIhLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5qZWN0U3R5bGVzSW50b1N0eWxlVGFnLmpzXCI7XG4gICAgICBpbXBvcnQgZG9tQVBJIGZyb20gXCIhLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVEb21BUEkuanNcIjtcbiAgICAgIGltcG9ydCBpbnNlcnRGbiBmcm9tIFwiIS4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydEJ5U2VsZWN0b3IuanNcIjtcbiAgICAgIGltcG9ydCBzZXRBdHRyaWJ1dGVzIGZyb20gXCIhLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzLmpzXCI7XG4gICAgICBpbXBvcnQgaW5zZXJ0U3R5bGVFbGVtZW50IGZyb20gXCIhLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0U3R5bGVFbGVtZW50LmpzXCI7XG4gICAgICBpbXBvcnQgc3R5bGVUYWdUcmFuc2Zvcm1GbiBmcm9tIFwiIS4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlVGFnVHJhbnNmb3JtLmpzXCI7XG4gICAgICBpbXBvcnQgY29udGVudCwgKiBhcyBuYW1lZEV4cG9ydCBmcm9tIFwiISEuLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L2Nqcy5qcyEuL3Jlc2V0LmNzc1wiO1xuICAgICAgXG4gICAgICBcblxudmFyIG9wdGlvbnMgPSB7fTtcblxub3B0aW9ucy5zdHlsZVRhZ1RyYW5zZm9ybSA9IHN0eWxlVGFnVHJhbnNmb3JtRm47XG5vcHRpb25zLnNldEF0dHJpYnV0ZXMgPSBzZXRBdHRyaWJ1dGVzO1xuXG4gICAgICBvcHRpb25zLmluc2VydCA9IGluc2VydEZuLmJpbmQobnVsbCwgXCJoZWFkXCIpO1xuICAgIFxub3B0aW9ucy5kb21BUEkgPSBkb21BUEk7XG5vcHRpb25zLmluc2VydFN0eWxlRWxlbWVudCA9IGluc2VydFN0eWxlRWxlbWVudDtcblxudmFyIHVwZGF0ZSA9IEFQSShjb250ZW50LCBvcHRpb25zKTtcblxuXG5cbmV4cG9ydCAqIGZyb20gXCIhIS4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4vcmVzZXQuY3NzXCI7XG4gICAgICAgZXhwb3J0IGRlZmF1bHQgY29udGVudCAmJiBjb250ZW50LmxvY2FscyA/IGNvbnRlbnQubG9jYWxzIDogdW5kZWZpbmVkO1xuIiwiXG4gICAgICBpbXBvcnQgQVBJIGZyb20gXCIhLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5qZWN0U3R5bGVzSW50b1N0eWxlVGFnLmpzXCI7XG4gICAgICBpbXBvcnQgZG9tQVBJIGZyb20gXCIhLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVEb21BUEkuanNcIjtcbiAgICAgIGltcG9ydCBpbnNlcnRGbiBmcm9tIFwiIS4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydEJ5U2VsZWN0b3IuanNcIjtcbiAgICAgIGltcG9ydCBzZXRBdHRyaWJ1dGVzIGZyb20gXCIhLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzLmpzXCI7XG4gICAgICBpbXBvcnQgaW5zZXJ0U3R5bGVFbGVtZW50IGZyb20gXCIhLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0U3R5bGVFbGVtZW50LmpzXCI7XG4gICAgICBpbXBvcnQgc3R5bGVUYWdUcmFuc2Zvcm1GbiBmcm9tIFwiIS4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlVGFnVHJhbnNmb3JtLmpzXCI7XG4gICAgICBpbXBvcnQgY29udGVudCwgKiBhcyBuYW1lZEV4cG9ydCBmcm9tIFwiISEuLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L2Nqcy5qcyEuL3N0eWxlLmNzc1wiO1xuICAgICAgXG4gICAgICBcblxudmFyIG9wdGlvbnMgPSB7fTtcblxub3B0aW9ucy5zdHlsZVRhZ1RyYW5zZm9ybSA9IHN0eWxlVGFnVHJhbnNmb3JtRm47XG5vcHRpb25zLnNldEF0dHJpYnV0ZXMgPSBzZXRBdHRyaWJ1dGVzO1xuXG4gICAgICBvcHRpb25zLmluc2VydCA9IGluc2VydEZuLmJpbmQobnVsbCwgXCJoZWFkXCIpO1xuICAgIFxub3B0aW9ucy5kb21BUEkgPSBkb21BUEk7XG5vcHRpb25zLmluc2VydFN0eWxlRWxlbWVudCA9IGluc2VydFN0eWxlRWxlbWVudDtcblxudmFyIHVwZGF0ZSA9IEFQSShjb250ZW50LCBvcHRpb25zKTtcblxuXG5cbmV4cG9ydCAqIGZyb20gXCIhIS4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4vc3R5bGUuY3NzXCI7XG4gICAgICAgZXhwb3J0IGRlZmF1bHQgY29udGVudCAmJiBjb250ZW50LmxvY2FscyA/IGNvbnRlbnQubG9jYWxzIDogdW5kZWZpbmVkO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBzdHlsZXNJbkRPTSA9IFtdO1xuXG5mdW5jdGlvbiBnZXRJbmRleEJ5SWRlbnRpZmllcihpZGVudGlmaWVyKSB7XG4gIHZhciByZXN1bHQgPSAtMTtcblxuICBmb3IgKHZhciBpID0gMDsgaSA8IHN0eWxlc0luRE9NLmxlbmd0aDsgaSsrKSB7XG4gICAgaWYgKHN0eWxlc0luRE9NW2ldLmlkZW50aWZpZXIgPT09IGlkZW50aWZpZXIpIHtcbiAgICAgIHJlc3VsdCA9IGk7XG4gICAgICBicmVhaztcbiAgICB9XG4gIH1cblxuICByZXR1cm4gcmVzdWx0O1xufVxuXG5mdW5jdGlvbiBtb2R1bGVzVG9Eb20obGlzdCwgb3B0aW9ucykge1xuICB2YXIgaWRDb3VudE1hcCA9IHt9O1xuICB2YXIgaWRlbnRpZmllcnMgPSBbXTtcblxuICBmb3IgKHZhciBpID0gMDsgaSA8IGxpc3QubGVuZ3RoOyBpKyspIHtcbiAgICB2YXIgaXRlbSA9IGxpc3RbaV07XG4gICAgdmFyIGlkID0gb3B0aW9ucy5iYXNlID8gaXRlbVswXSArIG9wdGlvbnMuYmFzZSA6IGl0ZW1bMF07XG4gICAgdmFyIGNvdW50ID0gaWRDb3VudE1hcFtpZF0gfHwgMDtcbiAgICB2YXIgaWRlbnRpZmllciA9IFwiXCIuY29uY2F0KGlkLCBcIiBcIikuY29uY2F0KGNvdW50KTtcbiAgICBpZENvdW50TWFwW2lkXSA9IGNvdW50ICsgMTtcbiAgICB2YXIgaW5kZXhCeUlkZW50aWZpZXIgPSBnZXRJbmRleEJ5SWRlbnRpZmllcihpZGVudGlmaWVyKTtcbiAgICB2YXIgb2JqID0ge1xuICAgICAgY3NzOiBpdGVtWzFdLFxuICAgICAgbWVkaWE6IGl0ZW1bMl0sXG4gICAgICBzb3VyY2VNYXA6IGl0ZW1bM10sXG4gICAgICBzdXBwb3J0czogaXRlbVs0XSxcbiAgICAgIGxheWVyOiBpdGVtWzVdXG4gICAgfTtcblxuICAgIGlmIChpbmRleEJ5SWRlbnRpZmllciAhPT0gLTEpIHtcbiAgICAgIHN0eWxlc0luRE9NW2luZGV4QnlJZGVudGlmaWVyXS5yZWZlcmVuY2VzKys7XG4gICAgICBzdHlsZXNJbkRPTVtpbmRleEJ5SWRlbnRpZmllcl0udXBkYXRlcihvYmopO1xuICAgIH0gZWxzZSB7XG4gICAgICB2YXIgdXBkYXRlciA9IGFkZEVsZW1lbnRTdHlsZShvYmosIG9wdGlvbnMpO1xuICAgICAgb3B0aW9ucy5ieUluZGV4ID0gaTtcbiAgICAgIHN0eWxlc0luRE9NLnNwbGljZShpLCAwLCB7XG4gICAgICAgIGlkZW50aWZpZXI6IGlkZW50aWZpZXIsXG4gICAgICAgIHVwZGF0ZXI6IHVwZGF0ZXIsXG4gICAgICAgIHJlZmVyZW5jZXM6IDFcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIGlkZW50aWZpZXJzLnB1c2goaWRlbnRpZmllcik7XG4gIH1cblxuICByZXR1cm4gaWRlbnRpZmllcnM7XG59XG5cbmZ1bmN0aW9uIGFkZEVsZW1lbnRTdHlsZShvYmosIG9wdGlvbnMpIHtcbiAgdmFyIGFwaSA9IG9wdGlvbnMuZG9tQVBJKG9wdGlvbnMpO1xuICBhcGkudXBkYXRlKG9iaik7XG5cbiAgdmFyIHVwZGF0ZXIgPSBmdW5jdGlvbiB1cGRhdGVyKG5ld09iaikge1xuICAgIGlmIChuZXdPYmopIHtcbiAgICAgIGlmIChuZXdPYmouY3NzID09PSBvYmouY3NzICYmIG5ld09iai5tZWRpYSA9PT0gb2JqLm1lZGlhICYmIG5ld09iai5zb3VyY2VNYXAgPT09IG9iai5zb3VyY2VNYXAgJiYgbmV3T2JqLnN1cHBvcnRzID09PSBvYmouc3VwcG9ydHMgJiYgbmV3T2JqLmxheWVyID09PSBvYmoubGF5ZXIpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBhcGkudXBkYXRlKG9iaiA9IG5ld09iaik7XG4gICAgfSBlbHNlIHtcbiAgICAgIGFwaS5yZW1vdmUoKTtcbiAgICB9XG4gIH07XG5cbiAgcmV0dXJuIHVwZGF0ZXI7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGxpc3QsIG9wdGlvbnMpIHtcbiAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG4gIGxpc3QgPSBsaXN0IHx8IFtdO1xuICB2YXIgbGFzdElkZW50aWZpZXJzID0gbW9kdWxlc1RvRG9tKGxpc3QsIG9wdGlvbnMpO1xuICByZXR1cm4gZnVuY3Rpb24gdXBkYXRlKG5ld0xpc3QpIHtcbiAgICBuZXdMaXN0ID0gbmV3TGlzdCB8fCBbXTtcblxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbGFzdElkZW50aWZpZXJzLmxlbmd0aDsgaSsrKSB7XG4gICAgICB2YXIgaWRlbnRpZmllciA9IGxhc3RJZGVudGlmaWVyc1tpXTtcbiAgICAgIHZhciBpbmRleCA9IGdldEluZGV4QnlJZGVudGlmaWVyKGlkZW50aWZpZXIpO1xuICAgICAgc3R5bGVzSW5ET01baW5kZXhdLnJlZmVyZW5jZXMtLTtcbiAgICB9XG5cbiAgICB2YXIgbmV3TGFzdElkZW50aWZpZXJzID0gbW9kdWxlc1RvRG9tKG5ld0xpc3QsIG9wdGlvbnMpO1xuXG4gICAgZm9yICh2YXIgX2kgPSAwOyBfaSA8IGxhc3RJZGVudGlmaWVycy5sZW5ndGg7IF9pKyspIHtcbiAgICAgIHZhciBfaWRlbnRpZmllciA9IGxhc3RJZGVudGlmaWVyc1tfaV07XG5cbiAgICAgIHZhciBfaW5kZXggPSBnZXRJbmRleEJ5SWRlbnRpZmllcihfaWRlbnRpZmllcik7XG5cbiAgICAgIGlmIChzdHlsZXNJbkRPTVtfaW5kZXhdLnJlZmVyZW5jZXMgPT09IDApIHtcbiAgICAgICAgc3R5bGVzSW5ET01bX2luZGV4XS51cGRhdGVyKCk7XG5cbiAgICAgICAgc3R5bGVzSW5ET00uc3BsaWNlKF9pbmRleCwgMSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgbGFzdElkZW50aWZpZXJzID0gbmV3TGFzdElkZW50aWZpZXJzO1xuICB9O1xufTsiLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIG1lbW8gPSB7fTtcbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuXG5mdW5jdGlvbiBnZXRUYXJnZXQodGFyZ2V0KSB7XG4gIGlmICh0eXBlb2YgbWVtb1t0YXJnZXRdID09PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgdmFyIHN0eWxlVGFyZ2V0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3Rvcih0YXJnZXQpOyAvLyBTcGVjaWFsIGNhc2UgdG8gcmV0dXJuIGhlYWQgb2YgaWZyYW1lIGluc3RlYWQgb2YgaWZyYW1lIGl0c2VsZlxuXG4gICAgaWYgKHdpbmRvdy5IVE1MSUZyYW1lRWxlbWVudCAmJiBzdHlsZVRhcmdldCBpbnN0YW5jZW9mIHdpbmRvdy5IVE1MSUZyYW1lRWxlbWVudCkge1xuICAgICAgdHJ5IHtcbiAgICAgICAgLy8gVGhpcyB3aWxsIHRocm93IGFuIGV4Y2VwdGlvbiBpZiBhY2Nlc3MgdG8gaWZyYW1lIGlzIGJsb2NrZWRcbiAgICAgICAgLy8gZHVlIHRvIGNyb3NzLW9yaWdpbiByZXN0cmljdGlvbnNcbiAgICAgICAgc3R5bGVUYXJnZXQgPSBzdHlsZVRhcmdldC5jb250ZW50RG9jdW1lbnQuaGVhZDtcbiAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgLy8gaXN0YW5idWwgaWdub3JlIG5leHRcbiAgICAgICAgc3R5bGVUYXJnZXQgPSBudWxsO1xuICAgICAgfVxuICAgIH1cblxuICAgIG1lbW9bdGFyZ2V0XSA9IHN0eWxlVGFyZ2V0O1xuICB9XG5cbiAgcmV0dXJuIG1lbW9bdGFyZ2V0XTtcbn1cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuXG5cbmZ1bmN0aW9uIGluc2VydEJ5U2VsZWN0b3IoaW5zZXJ0LCBzdHlsZSkge1xuICB2YXIgdGFyZ2V0ID0gZ2V0VGFyZ2V0KGluc2VydCk7XG5cbiAgaWYgKCF0YXJnZXQpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXCJDb3VsZG4ndCBmaW5kIGEgc3R5bGUgdGFyZ2V0LiBUaGlzIHByb2JhYmx5IG1lYW5zIHRoYXQgdGhlIHZhbHVlIGZvciB0aGUgJ2luc2VydCcgcGFyYW1ldGVyIGlzIGludmFsaWQuXCIpO1xuICB9XG5cbiAgdGFyZ2V0LmFwcGVuZENoaWxkKHN0eWxlKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBpbnNlcnRCeVNlbGVjdG9yOyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIGluc2VydFN0eWxlRWxlbWVudChvcHRpb25zKSB7XG4gIHZhciBlbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInN0eWxlXCIpO1xuICBvcHRpb25zLnNldEF0dHJpYnV0ZXMoZWxlbWVudCwgb3B0aW9ucy5hdHRyaWJ1dGVzKTtcbiAgb3B0aW9ucy5pbnNlcnQoZWxlbWVudCwgb3B0aW9ucy5vcHRpb25zKTtcbiAgcmV0dXJuIGVsZW1lbnQ7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gaW5zZXJ0U3R5bGVFbGVtZW50OyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIHNldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlcyhzdHlsZUVsZW1lbnQpIHtcbiAgdmFyIG5vbmNlID0gdHlwZW9mIF9fd2VicGFja19ub25jZV9fICE9PSBcInVuZGVmaW5lZFwiID8gX193ZWJwYWNrX25vbmNlX18gOiBudWxsO1xuXG4gIGlmIChub25jZSkge1xuICAgIHN0eWxlRWxlbWVudC5zZXRBdHRyaWJ1dGUoXCJub25jZVwiLCBub25jZSk7XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBzZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXM7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gYXBwbHkoc3R5bGVFbGVtZW50LCBvcHRpb25zLCBvYmopIHtcbiAgdmFyIGNzcyA9IFwiXCI7XG5cbiAgaWYgKG9iai5zdXBwb3J0cykge1xuICAgIGNzcyArPSBcIkBzdXBwb3J0cyAoXCIuY29uY2F0KG9iai5zdXBwb3J0cywgXCIpIHtcIik7XG4gIH1cblxuICBpZiAob2JqLm1lZGlhKSB7XG4gICAgY3NzICs9IFwiQG1lZGlhIFwiLmNvbmNhdChvYmoubWVkaWEsIFwiIHtcIik7XG4gIH1cblxuICB2YXIgbmVlZExheWVyID0gdHlwZW9mIG9iai5sYXllciAhPT0gXCJ1bmRlZmluZWRcIjtcblxuICBpZiAobmVlZExheWVyKSB7XG4gICAgY3NzICs9IFwiQGxheWVyXCIuY29uY2F0KG9iai5sYXllci5sZW5ndGggPiAwID8gXCIgXCIuY29uY2F0KG9iai5sYXllcikgOiBcIlwiLCBcIiB7XCIpO1xuICB9XG5cbiAgY3NzICs9IG9iai5jc3M7XG5cbiAgaWYgKG5lZWRMYXllcikge1xuICAgIGNzcyArPSBcIn1cIjtcbiAgfVxuXG4gIGlmIChvYmoubWVkaWEpIHtcbiAgICBjc3MgKz0gXCJ9XCI7XG4gIH1cblxuICBpZiAob2JqLnN1cHBvcnRzKSB7XG4gICAgY3NzICs9IFwifVwiO1xuICB9XG5cbiAgdmFyIHNvdXJjZU1hcCA9IG9iai5zb3VyY2VNYXA7XG5cbiAgaWYgKHNvdXJjZU1hcCAmJiB0eXBlb2YgYnRvYSAhPT0gXCJ1bmRlZmluZWRcIikge1xuICAgIGNzcyArPSBcIlxcbi8qIyBzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtiYXNlNjQsXCIuY29uY2F0KGJ0b2EodW5lc2NhcGUoZW5jb2RlVVJJQ29tcG9uZW50KEpTT04uc3RyaW5naWZ5KHNvdXJjZU1hcCkpKSksIFwiICovXCIpO1xuICB9IC8vIEZvciBvbGQgSUVcblxuICAvKiBpc3RhbmJ1bCBpZ25vcmUgaWYgICovXG5cblxuICBvcHRpb25zLnN0eWxlVGFnVHJhbnNmb3JtKGNzcywgc3R5bGVFbGVtZW50LCBvcHRpb25zLm9wdGlvbnMpO1xufVxuXG5mdW5jdGlvbiByZW1vdmVTdHlsZUVsZW1lbnQoc3R5bGVFbGVtZW50KSB7XG4gIC8vIGlzdGFuYnVsIGlnbm9yZSBpZlxuICBpZiAoc3R5bGVFbGVtZW50LnBhcmVudE5vZGUgPT09IG51bGwpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICBzdHlsZUVsZW1lbnQucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChzdHlsZUVsZW1lbnQpO1xufVxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5cblxuZnVuY3Rpb24gZG9tQVBJKG9wdGlvbnMpIHtcbiAgdmFyIHN0eWxlRWxlbWVudCA9IG9wdGlvbnMuaW5zZXJ0U3R5bGVFbGVtZW50KG9wdGlvbnMpO1xuICByZXR1cm4ge1xuICAgIHVwZGF0ZTogZnVuY3Rpb24gdXBkYXRlKG9iaikge1xuICAgICAgYXBwbHkoc3R5bGVFbGVtZW50LCBvcHRpb25zLCBvYmopO1xuICAgIH0sXG4gICAgcmVtb3ZlOiBmdW5jdGlvbiByZW1vdmUoKSB7XG4gICAgICByZW1vdmVTdHlsZUVsZW1lbnQoc3R5bGVFbGVtZW50KTtcbiAgICB9XG4gIH07XG59XG5cbm1vZHVsZS5leHBvcnRzID0gZG9tQVBJOyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIHN0eWxlVGFnVHJhbnNmb3JtKGNzcywgc3R5bGVFbGVtZW50KSB7XG4gIGlmIChzdHlsZUVsZW1lbnQuc3R5bGVTaGVldCkge1xuICAgIHN0eWxlRWxlbWVudC5zdHlsZVNoZWV0LmNzc1RleHQgPSBjc3M7XG4gIH0gZWxzZSB7XG4gICAgd2hpbGUgKHN0eWxlRWxlbWVudC5maXJzdENoaWxkKSB7XG4gICAgICBzdHlsZUVsZW1lbnQucmVtb3ZlQ2hpbGQoc3R5bGVFbGVtZW50LmZpcnN0Q2hpbGQpO1xuICAgIH1cblxuICAgIHN0eWxlRWxlbWVudC5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShjc3MpKTtcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHN0eWxlVGFnVHJhbnNmb3JtOyIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0aWQ6IG1vZHVsZUlkLFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4vLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuX193ZWJwYWNrX3JlcXVpcmVfXy5tID0gX193ZWJwYWNrX21vZHVsZXNfXztcblxuIiwiLy8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbl9fd2VicGFja19yZXF1aXJlX18ubiA9IChtb2R1bGUpID0+IHtcblx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG5cdFx0KCkgPT4gKG1vZHVsZVsnZGVmYXVsdCddKSA6XG5cdFx0KCkgPT4gKG1vZHVsZSk7XG5cdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsIHsgYTogZ2V0dGVyIH0pO1xuXHRyZXR1cm4gZ2V0dGVyO1xufTsiLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLmcgPSAoZnVuY3Rpb24oKSB7XG5cdGlmICh0eXBlb2YgZ2xvYmFsVGhpcyA9PT0gJ29iamVjdCcpIHJldHVybiBnbG9iYWxUaGlzO1xuXHR0cnkge1xuXHRcdHJldHVybiB0aGlzIHx8IG5ldyBGdW5jdGlvbigncmV0dXJuIHRoaXMnKSgpO1xuXHR9IGNhdGNoIChlKSB7XG5cdFx0aWYgKHR5cGVvZiB3aW5kb3cgPT09ICdvYmplY3QnKSByZXR1cm4gd2luZG93O1xuXHR9XG59KSgpOyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJ2YXIgc2NyaXB0VXJsO1xuaWYgKF9fd2VicGFja19yZXF1aXJlX18uZy5pbXBvcnRTY3JpcHRzKSBzY3JpcHRVcmwgPSBfX3dlYnBhY2tfcmVxdWlyZV9fLmcubG9jYXRpb24gKyBcIlwiO1xudmFyIGRvY3VtZW50ID0gX193ZWJwYWNrX3JlcXVpcmVfXy5nLmRvY3VtZW50O1xuaWYgKCFzY3JpcHRVcmwgJiYgZG9jdW1lbnQpIHtcblx0aWYgKGRvY3VtZW50LmN1cnJlbnRTY3JpcHQpXG5cdFx0c2NyaXB0VXJsID0gZG9jdW1lbnQuY3VycmVudFNjcmlwdC5zcmNcblx0aWYgKCFzY3JpcHRVcmwpIHtcblx0XHR2YXIgc2NyaXB0cyA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKFwic2NyaXB0XCIpO1xuXHRcdGlmKHNjcmlwdHMubGVuZ3RoKSBzY3JpcHRVcmwgPSBzY3JpcHRzW3NjcmlwdHMubGVuZ3RoIC0gMV0uc3JjXG5cdH1cbn1cbi8vIFdoZW4gc3VwcG9ydGluZyBicm93c2VycyB3aGVyZSBhbiBhdXRvbWF0aWMgcHVibGljUGF0aCBpcyBub3Qgc3VwcG9ydGVkIHlvdSBtdXN0IHNwZWNpZnkgYW4gb3V0cHV0LnB1YmxpY1BhdGggbWFudWFsbHkgdmlhIGNvbmZpZ3VyYXRpb25cbi8vIG9yIHBhc3MgYW4gZW1wdHkgc3RyaW5nIChcIlwiKSBhbmQgc2V0IHRoZSBfX3dlYnBhY2tfcHVibGljX3BhdGhfXyB2YXJpYWJsZSBmcm9tIHlvdXIgY29kZSB0byB1c2UgeW91ciBvd24gbG9naWMuXG5pZiAoIXNjcmlwdFVybCkgdGhyb3cgbmV3IEVycm9yKFwiQXV0b21hdGljIHB1YmxpY1BhdGggaXMgbm90IHN1cHBvcnRlZCBpbiB0aGlzIGJyb3dzZXJcIik7XG5zY3JpcHRVcmwgPSBzY3JpcHRVcmwucmVwbGFjZSgvIy4qJC8sIFwiXCIpLnJlcGxhY2UoL1xcPy4qJC8sIFwiXCIpLnJlcGxhY2UoL1xcL1teXFwvXSskLywgXCIvXCIpO1xuX193ZWJwYWNrX3JlcXVpcmVfXy5wID0gc2NyaXB0VXJsOyIsIl9fd2VicGFja19yZXF1aXJlX18uYiA9IGRvY3VtZW50LmJhc2VVUkkgfHwgc2VsZi5sb2NhdGlvbi5ocmVmO1xuXG4vLyBvYmplY3QgdG8gc3RvcmUgbG9hZGVkIGFuZCBsb2FkaW5nIGNodW5rc1xuLy8gdW5kZWZpbmVkID0gY2h1bmsgbm90IGxvYWRlZCwgbnVsbCA9IGNodW5rIHByZWxvYWRlZC9wcmVmZXRjaGVkXG4vLyBbcmVzb2x2ZSwgcmVqZWN0LCBQcm9taXNlXSA9IGNodW5rIGxvYWRpbmcsIDAgPSBjaHVuayBsb2FkZWRcbnZhciBpbnN0YWxsZWRDaHVua3MgPSB7XG5cdFwiaW5kZXhcIjogMFxufTtcblxuLy8gbm8gY2h1bmsgb24gZGVtYW5kIGxvYWRpbmdcblxuLy8gbm8gcHJlZmV0Y2hpbmdcblxuLy8gbm8gcHJlbG9hZGVkXG5cbi8vIG5vIEhNUlxuXG4vLyBubyBITVIgbWFuaWZlc3RcblxuLy8gbm8gb24gY2h1bmtzIGxvYWRlZFxuXG4vLyBubyBqc29ucCBmdW5jdGlvbiIsIl9fd2VicGFja19yZXF1aXJlX18ubmMgPSB1bmRlZmluZWQ7IiwiLyogZXNsaW50LWRpc2FibGUgbGluZWJyZWFrLXN0eWxlICovXHJcbi8qIGVzbGludC1kaXNhYmxlIG5vLXVuZGVmICovXHJcblxyXG5pbXBvcnQgJy4uL2Fzc2V0cy9zdHlsZXMvcmVzZXQuY3NzJztcclxuaW1wb3J0ICcuLi9hc3NldHMvc3R5bGVzL25vcm1hbGl6ZS5jc3MnO1xyXG5pbXBvcnQgJy4uL2Fzc2V0cy9zdHlsZXMvc3R5bGUuY3NzJztcclxuXHJcbmltcG9ydCBkYXRhQXJyYXlzIGZyb20gJy4uL2Fzc2V0cy9qcy9jYXJkcyc7XHJcbmltcG9ydCBBcHBDb250cm9sIGZyb20gJy4uL2Fzc2V0cy9qcy9hcHBDb250cm9sJztcclxuaW1wb3J0IGNsaWNrVXNlckludGVyYWN0aXZlIGZyb20gJy4uL2Fzc2V0cy9qcy9jbGlja1VzZXJJbnRlcmFjdGl2ZSc7XHJcbmltcG9ydCBtYWluQ2FyZHMgZnJvbSAnLi4vYXNzZXRzL2pzL21haW5DYXJkcyc7XHJcblxyXG5jb25zdCBbdG9waWNzLCBjYXJkc10gPSBbZGF0YUFycmF5c1swXSwgZGF0YUFycmF5cy5zbGljZSgxKV07XHJcblxyXG5jb25zdCBhcHBDb250cm9sID0gbmV3IEFwcENvbnRyb2wodG9waWNzLCBjYXJkcywgbWFpbkNhcmRzKTtcclxuXHJcbmRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2JvZHknKS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChldmVudCkgPT4gY2xpY2tVc2VySW50ZXJhY3RpdmUoZXZlbnQsIGFwcENvbnRyb2wpKTtcclxuIl0sIm5hbWVzIjpbImRhdGFBcnJheXMiLCJBcHBDb250cm9sIiwiY2xpY2tVc2VySW50ZXJhY3RpdmUiLCJtYWluQ2FyZHMiLCJzbGljZSIsInRvcGljcyIsImNhcmRzIiwiYXBwQ29udHJvbCIsImRvY3VtZW50IiwicXVlcnlTZWxlY3RvciIsImFkZEV2ZW50TGlzdGVuZXIiLCJldmVudCJdLCJzb3VyY2VSb290IjoiIn0=