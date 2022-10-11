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
  constructor(topicsArr, cardsArr) {
    this.topicsArr = topicsArr;
    this.cardsArr = cardsArr;

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
                            <span class="material-symbols-outlined">flip_camera_android</span>
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
    case (event.target.parentElement.classList.contains('card-flip-button')):
      cardElement = content.getCardElementByTarget(event.target);
      content.flipCard(cardElement);
      break;

    //  clicking on card
    case (targetClassList.some((className) => content.validCardClasses.includes(className))): {
      cardElement = content.getCardElementByTarget(event.target);
      const cardImageName = content.getCardImageName(cardElement);
      const cardObj = content.getCardObjByImageName(cardImageName);

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
        contentElement = this.createTopicCardsContainer();
        break;
      }
      default:
        break;
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
        image: this.cardsArr[index][0].image,
      };
      mainContainerElement.append(new _card__WEBPACK_IMPORTED_MODULE_0__["default"](this.appControl, cardObj).element);
    });

    return mainContainerElement;
  }

  createTopicCardsContainer() {
    const cardsContainerElement = (0,_commonFunct__WEBPACK_IMPORTED_MODULE_1__.createCustomElement)('div', 'card-container');
    const cardIndex = this.topicsArr.findIndex((item) => {
      const result = item.toLowerCase() === this.appControl.activePage;
      return result;
    });

    this.cardsArr[cardIndex].forEach((cardObj) => {
      cardsContainerElement.append(new _card__WEBPACK_IMPORTED_MODULE_0__["default"](this.appControl, cardObj, this.type).element);
    });

    return cardsContainerElement;
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
    const imageName = imageSrc.match(/(?<=\/)\w+(?=\.jpg)/)[0];
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
                      Button
                    </div>
                    <div class="game-progress">
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

  showGameStat() {
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
    this.showGameStat(); //  isn`t written
    this.createRandomQuestionsBundle(arrOptions);
    this.askQuestion();
    this.changeButtonClass('repeat-button');
    return this;
  }

  endGame() {
    this.isGameStarted = false;
    this.activeQuestion = null;
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

/***/ "./assets/js/menu.js":
/*!***************************!*\
  !*** ./assets/js/menu.js ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ MenuElement)
/* harmony export */ });
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

    const menuElement = document.createElement('nav');
    menuElement.className = 'menu';
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
                            <td>${wordObj.percentage} %</th>
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
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, "/* border-box model for all elements */\r\n\r\nhtml {\r\n    box-sizing: border-box;\r\n}\r\n\r\n*, *::before, *::after {\r\n    box-sizing: inherit;\r\n}\r\n\r\n/* --- Page color styling --- */\r\n\r\n:root {\r\n    --color-bg-main-1: #66b3fc;\r\n    --color-bg-main-2: #dbf5f8;\r\n    --color-bg-main-3: #d2f848;\r\n    --color-bg-main-4: #f0c2cd63;\r\n    --color-font-1: #d9aa63;\r\n}\r\n\r\n/* ---------------------------------- */\r\n\r\nbody {\r\n    width: 100%;\r\n    display: flex;\r\n    flex-direction: column;\r\n    align-items: center;\r\n    background-color: var(--color-bg-main-1);\r\n}\r\n\r\nbody.opened-menu {\r\n    overflow-y: hidden;\r\n}\r\n\r\n.inactive {\r\n    visibility: hidden;\r\n    position: fixed;\r\n    top: 0;\r\n}\r\n\r\n.graphic, img {\r\n    width: 100%;\r\n    height: auto;\r\n    padding: 0;\r\n    margin: 0;\r\n}\r\n\r\n.container-centered {\r\n    max-width: 1440px;\r\n    min-width: 1440px;\r\n    margin: 0 auto;\r\n    background-color: var(--color-bg-main-2);\r\n}\r\n\r\nheader {\r\n    display: flex;\r\n    flex-direction: column;\r\n    justify-content: center;\r\n    align-items: center;\r\n    position: -webkit-sticky;\r\n    position: sticky;\r\n    top: 0;\r\n    z-index: 8;\r\n}\r\n\r\n.main-controls, .game-controls {\r\n    width: 100%;\r\n    min-height: 100px;\r\n    display: flex;\r\n    justify-content: space-between;\r\n    align-items: center;\r\n}\r\n\r\nh1 {\r\n    text-align: center;\r\n}\r\n\r\n.button:hover {\r\n    cursor: pointer;\r\n}\r\n\r\n.menu-button {\r\n    height: 20px;\r\n    z-index: 10;\r\n}\r\n\r\n.switch {\r\n    width: 110px;\r\n    background-color: whitesmoke;\r\n    display: flex;\r\n    justify-content: space-between;\r\n    border-radius: 60px;\r\n    position: relative;\r\n}\r\n\r\n.switch-rail {\r\n    position: absolute;\r\n    left: 0;\r\n    width: 100%;\r\n    height: 100%;\r\n    border-radius: inherit;\r\n    display: flex;\r\n    justify-content: flex-start;\r\n}\r\n\r\n.switch.switch-on .switch-rail {\r\n    justify-content: flex-end;\r\n}\r\n\r\n.switch-roller {\r\n    width: 55px;\r\n    border-radius: inherit;\r\n    background-color: rgba(214, 225, 65, 0.459);\r\n    z-index: 10;\r\n}\r\n\r\n.switch-trigger {\r\n    margin: 0 10px;\r\n    height: 40px;\r\n    z-index: 9;\r\n    padding: 10px 0;\r\n    text-align: center;\r\n}\r\n\r\n.game-button {\r\n    width: 100px;\r\n    height: 100px;\r\n    background-color: rgb(213, 178, 248);\r\n}\r\n\r\n.game-button.repeat-button {\r\n    background-color: rgb(248, 178, 112);\r\n}\r\n\r\n.game-progress {\r\n    width: 220px;\r\n    display: flex;\r\n    justify-content: space-around;\r\n    align-items: center;\r\n}\r\n\r\n.game-indicator {\r\n    width: 150px;\r\n    height: 40px;\r\n    background-color: red;\r\n    border-radius: 18px;\r\n    display: flex;\r\n    justify-content: flex-start;\r\n    align-items: center;\r\n}\r\n\r\n.star {\r\n    width: 30px;\r\n}\r\n\r\n.game-score {\r\n    text-align: center;\r\n}\r\n\r\n.game-score .correct {\r\n    color: green;\r\n}\r\n\r\n.game-score .wrong {\r\n    color: red;\r\n}\r\n\r\n\r\nnav {\r\n    position: fixed;\r\n    top: 0;\r\n    left: -320px;\r\n    width: 320px;\r\n    height: 100%;\r\n    display: flex;\r\n    flex-direction: column;\r\n    justify-content: center;\r\n    background-color: var(--color-bg-main-3);\r\n    z-index: 9;\r\n    visibility: hidden;\r\n}\r\n\r\nnav.opened-menu {\r\n    visibility: visible;\r\n    left: 0;\r\n}\r\n\r\n.menu-list li {\r\n    text-align: center;\r\n    margin: 15px 0;\r\n    font-size: 2em;\r\n    background-color: var(--color-bg-main-1);\r\n}\r\n\r\n.menu-list li.active-page {\r\n    background-color: var(--color-bg-main-4);\r\n}\r\n\r\nmain.container-centered {\r\n    background-color: var(--color-bg-main-4);\r\n}\r\n\r\n.card-container {\r\n    display: flex;\r\n    justify-content: space-around;\r\n    align-items: center;\r\n    flex-wrap: wrap;\r\n}\r\n\r\n.card {\r\n    width: 280px;\r\n    height: 270px;\r\n    margin: 15px;\r\n    position: relative;\r\n}\r\n\r\n.card-main-page {\r\n    height: 240px;\r\n}\r\n\r\n.card.disabled {\r\n    background-color: #d2f848;\r\n}\r\n\r\n.card-content {\r\n    width: 100%;\r\n    height: 100%;\r\n    background-color: royalblue;\r\n    position: relative;\r\n}\r\n\r\n.card-content, .card img {\r\n    border-radius: 25px;\r\n}\r\n\r\n.card p {\r\n    margin-top: 15px;\r\n    font-size: 32px;\r\n    text-align: center;\r\n}\r\n\r\n.card-main-page p {\r\n    margin: 5px 0;\r\n}\r\n\r\n.card-flip-button {\r\n    width: 50px;\r\n    height: 50px;\r\n    position: absolute;\r\n    bottom: 20px;\r\n    right: 20px;\r\n}\r\n\r\n.card-flip-button span {\r\n    font-size: 50px;\r\n}\r\n\r\n.flipped .card-content {\r\n    animation-name: flip-card;\r\n    animation-duration: 1s;\r\n}\r\n\r\n.unflipped .card-content {\r\n    animation-name: unflip-card;\r\n    animation-duration: 1s;\r\n}\r\n\r\n.final-clip {\r\n    display: flex;\r\n    flex-direction: column;\r\n    width: 320px;\r\n    margin: auto;\r\n    justify-content: center;\r\n    align-items: center;\r\n    padding: 50px 0;\r\n}\r\n\r\n.final-clip p {\r\n    color: red;\r\n    font-size: 36px;\r\n    margin-top: 30px;\r\n}\r\n\r\n.stat-container {\r\n    display: flex;\r\n    flex-direction: column;\r\n    justify-content: center;\r\n    align-items: center;\r\n    font-size: 2em;\r\n}\r\n\r\n.table-wrapper {\r\n    width: calc(1440vw*100/1440);\r\n    overflow-x: auto;\r\n    display: flex;\r\n    flex-direction: column;\r\n    justify-content: center;\r\n    align-items: center;\r\n}\r\n\r\n.stat-table {\r\n    width: calc(1440vw*100/1440);\r\n    max-width: 1440px;\r\n    min-width: 500px;\r\n    border-collapse: collapse;\r\n    font-size: 0.5em;\r\n\r\n}\r\n\r\nthead {\r\n    background-color: aliceblue;\r\n}\r\n\r\nth {\r\n    height: 30px;\r\n}\r\n\r\ntr {\r\n    height: 25px;\r\n    background-color: azure;\r\n}\r\n\r\nth, td {\r\n    border: 1px solid black;\r\n    text-align: center;\r\n    vertical-align: middle;\r\n}\r\n\r\ntr:nth-child(even) {\r\n    background-color: #fdfdde;\r\n}\r\n\r\n.sorted-down, .sorted-up {\r\n    background-color: #d0fa81;\r\n}\r\n\r\n.sort-icon {\r\n    width: 16px;\r\n    height: auto;\r\n    position: relative;\r\n    left: 10px;\r\n    top: 2px;\r\n}\r\n\r\n.stat-buttons-wrapper {\r\n    width: 100%;\r\n    display: flex;\r\n    justify-content: space-around;\r\n    flex-wrap: wrap;\r\n}\r\n\r\n.stat-button {\r\n    width: 300px;\r\n    height: 70px;\r\n    margin: 20px 0;\r\n    padding: 15px;\r\n    border-radius: 50px;\r\n    border: 1px solid rgb(0, 0, 0);\r\n    color: azure;\r\n    text-align: center;\r\n}\r\n\r\n.button.train-diff {\r\n    background-color: rgb(7, 160, 96);\r\n}\r\n\r\n.button.reset-stat {\r\n    background-color: rgb(189, 45, 45);\r\n}\r\n\r\n.nothing-diff {\r\n    width: 100%;\r\n}\r\n\r\n.nothing-diff p {\r\n    position: absolute;\r\n    top: 20%;\r\n}\r\n\r\n.disabled:hover {\r\n    cursor:not-allowed;\r\n}\r\n\r\n@keyframes flip-card {\r\n    0% {}\r\n    50% {transform: rotateY(89deg)}\r\n}\r\n\r\n@keyframes unflip-card {\r\n    0% {}\r\n    50% {transform: rotateY(89deg)}\r\n}\r\n\r\n/* --- RESPONSIVE LAYOUTS --- */\r\n\r\n@media (max-width: 1439px) {\r\n    .container-centered {\r\n        min-width: calc(1440vw*100/1440);\r\n    }\r\n\r\n}", "",{"version":3,"sources":["webpack://./assets/styles/style.css"],"names":[],"mappings":"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","sourcesContent":["/* border-box model for all elements */\r\n\r\nhtml {\r\n    box-sizing: border-box;\r\n}\r\n\r\n*, *::before, *::after {\r\n    box-sizing: inherit;\r\n}\r\n\r\n/* --- Page color styling --- */\r\n\r\n:root {\r\n    --color-bg-main-1: #66b3fc;\r\n    --color-bg-main-2: #dbf5f8;\r\n    --color-bg-main-3: #d2f848;\r\n    --color-bg-main-4: #f0c2cd63;\r\n    --color-font-1: #d9aa63;\r\n}\r\n\r\n/* ---------------------------------- */\r\n\r\nbody {\r\n    width: 100%;\r\n    display: flex;\r\n    flex-direction: column;\r\n    align-items: center;\r\n    background-color: var(--color-bg-main-1);\r\n}\r\n\r\nbody.opened-menu {\r\n    overflow-y: hidden;\r\n}\r\n\r\n.inactive {\r\n    visibility: hidden;\r\n    position: fixed;\r\n    top: 0;\r\n}\r\n\r\n.graphic, img {\r\n    width: 100%;\r\n    height: auto;\r\n    padding: 0;\r\n    margin: 0;\r\n}\r\n\r\n.container-centered {\r\n    max-width: 1440px;\r\n    min-width: 1440px;\r\n    margin: 0 auto;\r\n    background-color: var(--color-bg-main-2);\r\n}\r\n\r\nheader {\r\n    display: flex;\r\n    flex-direction: column;\r\n    justify-content: center;\r\n    align-items: center;\r\n    position: -webkit-sticky;\r\n    position: sticky;\r\n    top: 0;\r\n    z-index: 8;\r\n}\r\n\r\n.main-controls, .game-controls {\r\n    width: 100%;\r\n    min-height: 100px;\r\n    display: flex;\r\n    justify-content: space-between;\r\n    align-items: center;\r\n}\r\n\r\nh1 {\r\n    text-align: center;\r\n}\r\n\r\n.button:hover {\r\n    cursor: pointer;\r\n}\r\n\r\n.menu-button {\r\n    height: 20px;\r\n    z-index: 10;\r\n}\r\n\r\n.switch {\r\n    width: 110px;\r\n    background-color: whitesmoke;\r\n    display: flex;\r\n    justify-content: space-between;\r\n    border-radius: 60px;\r\n    position: relative;\r\n}\r\n\r\n.switch-rail {\r\n    position: absolute;\r\n    left: 0;\r\n    width: 100%;\r\n    height: 100%;\r\n    border-radius: inherit;\r\n    display: flex;\r\n    justify-content: flex-start;\r\n}\r\n\r\n.switch.switch-on .switch-rail {\r\n    justify-content: flex-end;\r\n}\r\n\r\n.switch-roller {\r\n    width: 55px;\r\n    border-radius: inherit;\r\n    background-color: rgba(214, 225, 65, 0.459);\r\n    z-index: 10;\r\n}\r\n\r\n.switch-trigger {\r\n    margin: 0 10px;\r\n    height: 40px;\r\n    z-index: 9;\r\n    padding: 10px 0;\r\n    text-align: center;\r\n}\r\n\r\n.game-button {\r\n    width: 100px;\r\n    height: 100px;\r\n    background-color: rgb(213, 178, 248);\r\n}\r\n\r\n.game-button.repeat-button {\r\n    background-color: rgb(248, 178, 112);\r\n}\r\n\r\n.game-progress {\r\n    width: 220px;\r\n    display: flex;\r\n    justify-content: space-around;\r\n    align-items: center;\r\n}\r\n\r\n.game-indicator {\r\n    width: 150px;\r\n    height: 40px;\r\n    background-color: red;\r\n    border-radius: 18px;\r\n    display: flex;\r\n    justify-content: flex-start;\r\n    align-items: center;\r\n}\r\n\r\n.star {\r\n    width: 30px;\r\n}\r\n\r\n.game-score {\r\n    text-align: center;\r\n}\r\n\r\n.game-score .correct {\r\n    color: green;\r\n}\r\n\r\n.game-score .wrong {\r\n    color: red;\r\n}\r\n\r\n\r\nnav {\r\n    position: fixed;\r\n    top: 0;\r\n    left: -320px;\r\n    width: 320px;\r\n    height: 100%;\r\n    display: flex;\r\n    flex-direction: column;\r\n    justify-content: center;\r\n    background-color: var(--color-bg-main-3);\r\n    z-index: 9;\r\n    visibility: hidden;\r\n}\r\n\r\nnav.opened-menu {\r\n    visibility: visible;\r\n    left: 0;\r\n}\r\n\r\n.menu-list li {\r\n    text-align: center;\r\n    margin: 15px 0;\r\n    font-size: 2em;\r\n    background-color: var(--color-bg-main-1);\r\n}\r\n\r\n.menu-list li.active-page {\r\n    background-color: var(--color-bg-main-4);\r\n}\r\n\r\nmain.container-centered {\r\n    background-color: var(--color-bg-main-4);\r\n}\r\n\r\n.card-container {\r\n    display: flex;\r\n    justify-content: space-around;\r\n    align-items: center;\r\n    flex-wrap: wrap;\r\n}\r\n\r\n.card {\r\n    width: 280px;\r\n    height: 270px;\r\n    margin: 15px;\r\n    position: relative;\r\n}\r\n\r\n.card-main-page {\r\n    height: 240px;\r\n}\r\n\r\n.card.disabled {\r\n    background-color: #d2f848;\r\n}\r\n\r\n.card-content {\r\n    width: 100%;\r\n    height: 100%;\r\n    background-color: royalblue;\r\n    position: relative;\r\n}\r\n\r\n.card-content, .card img {\r\n    border-radius: 25px;\r\n}\r\n\r\n.card p {\r\n    margin-top: 15px;\r\n    font-size: 32px;\r\n    text-align: center;\r\n}\r\n\r\n.card-main-page p {\r\n    margin: 5px 0;\r\n}\r\n\r\n.card-flip-button {\r\n    width: 50px;\r\n    height: 50px;\r\n    position: absolute;\r\n    bottom: 20px;\r\n    right: 20px;\r\n}\r\n\r\n.card-flip-button span {\r\n    font-size: 50px;\r\n}\r\n\r\n.flipped .card-content {\r\n    animation-name: flip-card;\r\n    animation-duration: 1s;\r\n}\r\n\r\n.unflipped .card-content {\r\n    animation-name: unflip-card;\r\n    animation-duration: 1s;\r\n}\r\n\r\n.final-clip {\r\n    display: flex;\r\n    flex-direction: column;\r\n    width: 320px;\r\n    margin: auto;\r\n    justify-content: center;\r\n    align-items: center;\r\n    padding: 50px 0;\r\n}\r\n\r\n.final-clip p {\r\n    color: red;\r\n    font-size: 36px;\r\n    margin-top: 30px;\r\n}\r\n\r\n.stat-container {\r\n    display: flex;\r\n    flex-direction: column;\r\n    justify-content: center;\r\n    align-items: center;\r\n    font-size: 2em;\r\n}\r\n\r\n.table-wrapper {\r\n    width: calc(1440vw*100/1440);\r\n    overflow-x: auto;\r\n    display: flex;\r\n    flex-direction: column;\r\n    justify-content: center;\r\n    align-items: center;\r\n}\r\n\r\n.stat-table {\r\n    width: calc(1440vw*100/1440);\r\n    max-width: 1440px;\r\n    min-width: 500px;\r\n    border-collapse: collapse;\r\n    font-size: 0.5em;\r\n\r\n}\r\n\r\nthead {\r\n    background-color: aliceblue;\r\n}\r\n\r\nth {\r\n    height: 30px;\r\n}\r\n\r\ntr {\r\n    height: 25px;\r\n    background-color: azure;\r\n}\r\n\r\nth, td {\r\n    border: 1px solid black;\r\n    text-align: center;\r\n    vertical-align: middle;\r\n}\r\n\r\ntr:nth-child(even) {\r\n    background-color: #fdfdde;\r\n}\r\n\r\n.sorted-down, .sorted-up {\r\n    background-color: #d0fa81;\r\n}\r\n\r\n.sort-icon {\r\n    width: 16px;\r\n    height: auto;\r\n    position: relative;\r\n    left: 10px;\r\n    top: 2px;\r\n}\r\n\r\n.stat-buttons-wrapper {\r\n    width: 100%;\r\n    display: flex;\r\n    justify-content: space-around;\r\n    flex-wrap: wrap;\r\n}\r\n\r\n.stat-button {\r\n    width: 300px;\r\n    height: 70px;\r\n    margin: 20px 0;\r\n    padding: 15px;\r\n    border-radius: 50px;\r\n    border: 1px solid rgb(0, 0, 0);\r\n    color: azure;\r\n    text-align: center;\r\n}\r\n\r\n.button.train-diff {\r\n    background-color: rgb(7, 160, 96);\r\n}\r\n\r\n.button.reset-stat {\r\n    background-color: rgb(189, 45, 45);\r\n}\r\n\r\n.nothing-diff {\r\n    width: 100%;\r\n}\r\n\r\n.nothing-diff p {\r\n    position: absolute;\r\n    top: 20%;\r\n}\r\n\r\n.disabled:hover {\r\n    cursor:not-allowed;\r\n}\r\n\r\n@keyframes flip-card {\r\n    0% {}\r\n    50% {transform: rotateY(89deg)}\r\n}\r\n\r\n@keyframes unflip-card {\r\n    0% {}\r\n    50% {transform: rotateY(89deg)}\r\n}\r\n\r\n/* --- RESPONSIVE LAYOUTS --- */\r\n\r\n@media (max-width: 1439px) {\r\n    .container-centered {\r\n        min-width: calc(1440vw*100/1440);\r\n    }\r\n\r\n}"],"sourceRoot":""}]);
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
/* eslint-disable linebreak-style */

/* eslint-disable no-undef */






var _ref = [_assets_js_cards__WEBPACK_IMPORTED_MODULE_3__["default"][0], _assets_js_cards__WEBPACK_IMPORTED_MODULE_3__["default"].slice(1)],
    topics = _ref[0],
    cards = _ref[1];
var appControl = new _assets_js_appControl__WEBPACK_IMPORTED_MODULE_4__["default"](topics, cards);
document.querySelector('body').addEventListener('click', function (event) {
  return (0,_assets_js_clickUserInteractive__WEBPACK_IMPORTED_MODULE_5__["default"])(event, appControl);
});
})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguNjRiZDRiYWE3YjlmNWZlN2E1MTUuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDaUM7QUFDUTtBQUNKO0FBQ0c7QUFDSjtBQUNwQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvQkFBb0IsNkNBQVc7QUFDL0I7QUFDQTtBQUNBO0FBQ0E7QUFDQSx5QkFBeUIsK0NBQWE7QUFDdEM7QUFDQTtBQUNBO0FBQ0E7QUFDQSwyQkFBMkIsb0RBQVc7QUFDdEM7QUFDQTtBQUNBLHVCQUF1QixnREFBZ0I7QUFDdkM7QUFDQTtBQUNBLG9CQUFvQixrREFBUztBQUM3QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGdEQUFnRCxpQkFBaUI7QUFDakU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esc0RBQXNELHlCQUF5QjtBQUMvRTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUVBQWUsVUFBVSxFQUFDOzs7Ozs7Ozs7Ozs7Ozs7O0FDM0YxQjtBQUNvRDtBQUNwRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxRUFBcUUsY0FBYyxpQkFBaUIsaUJBQWlCO0FBQ3JIO0FBQ0EsK0NBQStDLGlCQUFpQjtBQUNoRTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxRUFBcUUsY0FBYyxTQUFTLGFBQWE7QUFDekc7QUFDQSwrQ0FBK0MsYUFBYTtBQUM1RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBVTtBQUNWO0FBQ0E7QUFDQTtBQUNBLHFFQUFxRSxjQUFjLFNBQVMsYUFBYTtBQUN6RztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUJBQW1CLGlFQUFtQjtBQUN0QztBQUNBO0FBQ0E7QUFDQTtBQUNBLGlFQUFlLElBQUksRUFBQzs7Ozs7Ozs7Ozs7Ozs7O0FDN0RwQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsaUVBQWUsS0FBSyxFQUFDOzs7Ozs7Ozs7Ozs7Ozs7QUNqVHJCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFRO0FBQ1I7QUFDQTtBQUNBO0FBQ0EsUUFBUTtBQUNSO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFRO0FBQ1I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUVBQWUsb0JBQW9CLEVBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7QUM3R3BDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQzZDOzs7Ozs7Ozs7Ozs7Ozs7OztBQ2hCN0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUMwQjtBQUMwQjtBQUNwRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwyQkFBMkIsaUVBQW1CO0FBQzlDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVU7QUFDVjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUNBQWlDLGlFQUFtQjtBQUNwRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esc0NBQXNDLDZDQUFJO0FBQzFDLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0NBQWtDLGlFQUFtQjtBQUNyRDtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLHVDQUF1Qyw2Q0FBSTtBQUMzQyxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDJFQUEyRSxVQUFVO0FBQ3JGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNULE9BQU87QUFDUCxRQUFRLFlBQVk7QUFDcEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw0QkFBNEIsU0FBUztBQUNyQztBQUNBO0FBQ0E7QUFDQSx3REFBd0QsU0FBUyxlQUFlLFNBQVM7QUFDekY7QUFDQTtBQUNBO0FBQ0EsNkJBQTZCLGlFQUFtQjtBQUNoRDtBQUNBLDRFQUE0RSxhQUFhO0FBQ3pGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUVBQWUsZ0JBQWdCLEVBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDL09oQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDMEI7QUFJSDtBQUN2QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrQ0FBa0MsNkNBQUk7QUFDdEMsZ0NBQWdDLDZDQUFJO0FBQ3BDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQkFBbUIsaUVBQW1CO0FBQ3RDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwwQkFBMEIsMERBQVk7QUFDdEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EseUJBQXlCO0FBQ3pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EseUNBQXlDLDZDQUFJO0FBQzdDO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EseUNBQXlDLDZDQUFJO0FBQzdDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUVBQWUsV0FBVyxFQUFDOzs7Ozs7Ozs7Ozs7Ozs7QUN2TDNCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ2U7QUFDZjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFD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QUssc0JBQXNCLHVCQUF1QixPQUFPLEtBQUssUUFBUSxPQUFPLE1BQU0sS0FBSyxVQUFVLE1BQU0sTUFBTSxNQUFNLEtBQUssVUFBVSxPQUFPLE9BQU8sTUFBTSxLQUFLLFVBQVUsWUFBWSxPQUFPLEtBQUssUUFBUSxRQUFRLE1BQU0sS0FBSyxzQkFBc0IscUJBQXFCLHVCQUF1QixPQUFPLE9BQU8sTUFBTSxLQUFLLHNCQUFzQixxQkFBcUIsT0FBTyxLQUFLLFFBQVEsT0FBTyxNQUFNLEtBQUssWUFBWSxPQUFPLE9BQU8sTUFBTSxLQUFLLHNCQUFzQix1QkFBdUIsdUJBQXVCLE9BQU8sTUFBTSxNQUFNLE1BQU0sWUFBWSxPQUFPLE9BQU8sTUFBTSxPQUFPLHNCQUFzQixxQkFBcUIsT0FBTyxNQUFNLE1BQU0sS0FBSyxVQUFVLE9BQU8sT0FBTyxNQUFNLE1BQU0sVUFBVSxVQUFVLFlBQVksYUFBYSxPQUFPLEtBQUssVUFBVSxPQUFPLEtBQUssVUFBVSxNQUFNLEtBQUssUUFBUSxPQUFPLE1BQU0sS0FBSyxZQUFZLE9BQU8sS0FBSyxRQUFRLFFBQVEsTUFBTSxTQUFTLHNCQUFzQixxQkFBcUIsdUJBQXVCLHFCQUFxQixPQUFPLE9BQU8sTUFBTSxLQUFLLFVBQVUsWUFBWSxPQUFPLE9BQU8sTUFBTSxLQUFLLFVBQVUsWUFBWSxPQUFPLE1BQU0sTUFBTSxRQUFRLFlBQVksT0FBTyxNQUFNLE1BQU0sUUFBUSxZQUFZLFdBQVcsTUFBTSxNQUFNLE1BQU0sUUFBUSxZQUFZLE9BQU8sTUFBTSxNQUFNLEtBQUssWUFBWSxPQUFPLFNBQVMsTUFBTSxLQUFLLHNCQUFzQixxQkFBcUIscUJBQXFCLHFCQUFxQixxQkFBcUIsdUJBQXVCLE9BQU8sTUFBTSxNQUFNLEtBQUssWUFBWSxPQUFPLE1BQU0sTUFBTSxLQUFLLFVBQVUsT0FBTyxPQUFPLE1BQU0sTUFBTSxzQkFBc0IscUJBQXFCLE9BQU8sTUFBTSxNQUFNLE1BQU0sVUFBVSxNQUFNLE9BQU8sTUFBTSxLQUFLLHNCQUFzQix1QkFBdUIsT0FBTyxNQUFNLE1BQU0s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TUFBTSxLQUFLLFlBQVksT0FBTyxLQUFLLFVBQVUsT0FBTyxLQUFLLFVBQVUsT0FBTyxLQUFLLFVBQVUsVUFBVSxVQUFVLFVBQVUsVUFBVSxVQUFVLFlBQVksYUFBYSxhQUFhLFdBQVcsWUFBWSxPQUFPLEtBQUssWUFBWSxXQUFXLE1BQU0sS0FBSyxZQUFZLFdBQVcsVUFBVSxZQUFZLE9BQU8sS0FBSyxZQUFZLE9BQU8sS0FBSyxZQUFZLE9BQU8sS0FBSyxVQUFVLFlBQVksYUFBYSxXQUFXLE9BQU8sS0FBSyxVQUFVLFVBQVUsVUFBVSxZQUFZLE9BQU8sS0FBSyxVQUFVLE9BQU8sS0FBSyxZQUFZLE9BQU8sS0FBSyxVQUFVLFVBQVUsWUFBWSxhQUFhLE9BQU8sS0FBSyxZQUFZLE9BQU8sS0FBSyxZQUFZLFdBQVcsWUFBWSxPQUFPLEtBQUssVUFBVSxPQUFPLEtBQUssVUFBVSxVQUFVLFlBQVksV0FBVyxVQUFVLE1BQU0sS0FBSyxVQUFVLE9BQU8sS0FBSyxZQUFZLGFBQWEsT0FBTyxLQUFLLFlBQVksYUFBYSxPQUFPLEtBQUssVUFBVSxZQUFZLFdBQVcsVUFBVSxZQUFZLGFBQWEsV0FBVyxPQUFPLEtBQUssVUFBVSxVQUFVLFlBQVksT0FBTyxLQUFLLFVBQVUsWUFBWSxhQUFhLGFBQWEsV0FBVyxPQUFPLEtBQUssWUFBWSxhQUFhLFdBQVcsWUFBWSxhQUFhLGFBQWEsT0FBTyxLQUFLLFlBQVksYUFBYSxhQUFhLGFBQWEsY0FBYyxPQUFPLEtBQUssWUFBWSxPQUFPLEtBQUssVUFBVSxPQUFPLEtBQUssVUFBVSxZQUFZLE9BQU8sS0FBSyxZQUFZLGFBQWEsYUFBYSxPQUFPLEtBQUssWUFBWSxPQUFPLEtBQUssWUFBWSxPQUFPLEtBQUssVUFBVSxVQUFVLFlBQVksV0FBVyxVQUFVLE1BQU0sS0FBSyxVQUFVLFVBQVUsWUFBWSxXQUFXLE9BQU8sS0FBSyxVQUFVLFVBQVUsVUFBVSxVQUFVLFlBQVksYUFBYSxXQUFXLFlBQVksT0FBTyxLQUFLLFlBQVksT0FBTyxLQUFLLFlBQVksT0FBTyxLQUFLLFVBQVUs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QUM1QztXQUNBOzs7OztXQ1BBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EseUNBQXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0E7Ozs7O1dDUEE7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7OztXQ05BOzs7Ozs7Ozs7Ozs7Ozs7OztBQ0FBOztBQUNBO0FBRUE7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBRUEsV0FBd0IsQ0FBQ0EsMkRBQUQsRUFBZ0JBLDhEQUFBLENBQWlCLENBQWpCLENBQWhCLENBQXhCO0FBQUEsSUFBT0ksTUFBUDtBQUFBLElBQWVDLEtBQWY7QUFFQSxJQUFNQyxVQUFVLEdBQUcsSUFBSUwsNkRBQUosQ0FBZUcsTUFBZixFQUF1QkMsS0FBdkIsQ0FBbkI7QUFFQUUsUUFBUSxDQUFDQyxhQUFULENBQXVCLE1BQXZCLEVBQStCQyxnQkFBL0IsQ0FBZ0QsT0FBaEQsRUFBeUQsVUFBQ0MsS0FBRDtFQUFBLE9BQVdSLDJFQUFvQixDQUFDUSxLQUFELEVBQVFKLFVBQVIsQ0FBL0I7QUFBQSxDQUF6RCxFIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vZW5nbGlzaF9mb3Jfa2lkcy8uL2Fzc2V0cy9qcy9hcHBDb250cm9sLmpzIiwid2VicGFjazovL2VuZ2xpc2hfZm9yX2tpZHMvLi9hc3NldHMvanMvY2FyZC5qcyIsIndlYnBhY2s6Ly9lbmdsaXNoX2Zvcl9raWRzLy4vYXNzZXRzL2pzL2NhcmRzLmpzIiwid2VicGFjazovL2VuZ2xpc2hfZm9yX2tpZHMvLi9hc3NldHMvanMvY2xpY2tVc2VySW50ZXJhY3RpdmUuanMiLCJ3ZWJwYWNrOi8vZW5nbGlzaF9mb3Jfa2lkcy8uL2Fzc2V0cy9qcy9jb21tb25GdW5jdC5qcyIsIndlYnBhY2s6Ly9lbmdsaXNoX2Zvcl9raWRzLy4vYXNzZXRzL2pzL2NvbnRlbnQuanMiLCJ3ZWJwYWNrOi8vZW5nbGlzaF9mb3Jfa2lkcy8uL2Fzc2V0cy9qcy9nYW1lQ29udHJvbC5qcyIsIndlYnBhY2s6Ly9lbmdsaXNoX2Zvcl9raWRzLy4vYXNzZXRzL2pzL21lbnUuanMiLCJ3ZWJwYWNrOi8vZW5nbGlzaF9mb3Jfa2lkcy8uL2Fzc2V0cy9qcy9zdGFyLmpzIiwid2VicGFjazovL2VuZ2xpc2hfZm9yX2tpZHMvLi9hc3NldHMvanMvc3RhdFN0b3JhZ2UuanMiLCJ3ZWJwYWNrOi8vZW5nbGlzaF9mb3Jfa2lkcy8uL2Fzc2V0cy9qcy9zdGF0aXN0aWMuanMiLCJ3ZWJwYWNrOi8vZW5nbGlzaF9mb3Jfa2lkcy8uL2Fzc2V0cy9qcy9zd2l0Y2guanMiLCJ3ZWJwYWNrOi8vZW5nbGlzaF9mb3Jfa2lkcy8uL2Fzc2V0cy9zdHlsZXMvbm9ybWFsaXplLmNzcyIsIndlYnBhY2s6Ly9lbmdsaXNoX2Zvcl9raWRzLy4vYXNzZXRzL3N0eWxlcy9yZXNldC5jc3MiLCJ3ZWJwYWNrOi8vZW5nbGlzaF9mb3Jfa2lkcy8uL2Fzc2V0cy9zdHlsZXMvc3R5bGUuY3NzIiwid2VicGFjazovL2VuZ2xpc2hfZm9yX2tpZHMvLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvYXBpLmpzIiwid2VicGFjazovL2VuZ2xpc2hfZm9yX2tpZHMvLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvc291cmNlTWFwcy5qcyIsIndlYnBhY2s6Ly9lbmdsaXNoX2Zvcl9raWRzLy4vYXNzZXRzL3N0eWxlcy9ub3JtYWxpemUuY3NzPzM4ZWUiLCJ3ZWJwYWNrOi8vZW5nbGlzaF9mb3Jfa2lkcy8uL2Fzc2V0cy9zdHlsZXMvcmVzZXQuY3NzPzliN2EiLCJ3ZWJwYWNrOi8vZW5nbGlzaF9mb3Jfa2lkcy8uL2Fzc2V0cy9zdHlsZXMvc3R5bGUuY3NzPzliYmUiLCJ3ZWJwYWNrOi8vZW5nbGlzaF9mb3Jfa2lkcy8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luamVjdFN0eWxlc0ludG9TdHlsZVRhZy5qcyIsIndlYnBhY2s6Ly9lbmdsaXNoX2Zvcl9raWRzLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0QnlTZWxlY3Rvci5qcyIsIndlYnBhY2s6Ly9lbmdsaXNoX2Zvcl9raWRzLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0U3R5bGVFbGVtZW50LmpzIiwid2VicGFjazovL2VuZ2xpc2hfZm9yX2tpZHMvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXMuanMiLCJ3ZWJwYWNrOi8vZW5nbGlzaF9mb3Jfa2lkcy8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlRG9tQVBJLmpzIiwid2VicGFjazovL2VuZ2xpc2hfZm9yX2tpZHMvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZVRhZ1RyYW5zZm9ybS5qcyIsIndlYnBhY2s6Ly9lbmdsaXNoX2Zvcl9raWRzL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL2VuZ2xpc2hfZm9yX2tpZHMvd2VicGFjay9ydW50aW1lL2NvbXBhdCBnZXQgZGVmYXVsdCBleHBvcnQiLCJ3ZWJwYWNrOi8vZW5nbGlzaF9mb3Jfa2lkcy93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vZW5nbGlzaF9mb3Jfa2lkcy93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL2VuZ2xpc2hfZm9yX2tpZHMvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9lbmdsaXNoX2Zvcl9raWRzL3dlYnBhY2svcnVudGltZS9ub25jZSIsIndlYnBhY2s6Ly9lbmdsaXNoX2Zvcl9raWRzLy4vc3JjL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbIi8qIGVzbGludC1kaXNhYmxlIGxpbmVicmVhay1zdHlsZSAqL1xyXG4vKiBlc2xpbnQtZGlzYWJsZSBuby1jb25zb2xlICovXHJcbi8qIGVzbGludC1kaXNhYmxlIGxpbmVicmVhay1zdHlsZSAqL1xyXG4vKiBlc2xpbnQtZGlzYWJsZSBuby11bmRlZiAqL1xyXG5cclxuaW1wb3J0IE1lbnVFbGVtZW50IGZyb20gJy4vbWVudSc7XHJcbmltcG9ydCBDb250ZW50Q29udGFpbmVyIGZyb20gJy4vY29udGVudCc7XHJcbmltcG9ydCBTd2l0Y2hFbGVtZW50IGZyb20gJy4vc3dpdGNoJztcclxuaW1wb3J0IEdhbWVDb250cm9sIGZyb20gJy4vZ2FtZUNvbnRyb2wnO1xyXG5pbXBvcnQgU3RhdGlzdGljIGZyb20gJy4vc3RhdGlzdGljJztcclxuXHJcbmNsYXNzIEFwcENvbnRyb2wge1xyXG4gIGNvbnN0cnVjdG9yKHRvcGljc0FyciwgY2FyZHNBcnIpIHtcclxuICAgIHRoaXMudG9waWNzQXJyID0gdG9waWNzQXJyO1xyXG4gICAgdGhpcy5jYXJkc0FyciA9IGNhcmRzQXJyO1xyXG5cclxuICAgIHRoaXMubWVudSA9IG5ldyBNZW51RWxlbWVudCh0aGlzLnRvcGljc0FycilcclxuICAgICAgLmFkZFRvRG9jKCk7XHJcblxyXG4gICAgdGhpcy5hY3RpdmVQYWdlID0gdGhpcy5tZW51LmFjdGl2ZVBhZ2U7XHJcblxyXG4gICAgdGhpcy5zd2l0Y2hPYmogPSBuZXcgU3dpdGNoRWxlbWVudCgpXHJcbiAgICAgIC5hZGRUb0RvYygpO1xyXG5cclxuICAgIHRoaXMuYWN0aXZlTW9kZSA9IHRoaXMuc3dpdGNoT2JqLmFjdGl2ZU1vZGU7XHJcblxyXG4gICAgdGhpcy5nYW1lQ29udHJvbCA9IG5ldyBHYW1lQ29udHJvbCh0aGlzKVxyXG4gICAgICAuYWRkVG9Eb2MoKTtcclxuXHJcbiAgICB0aGlzLmNvbnRlbnQgPSBuZXcgQ29udGVudENvbnRhaW5lcih0aGlzKVxyXG4gICAgICAuYWRkVG9Eb2MoKTtcclxuXHJcbiAgICB0aGlzLnN0YXQgPSBuZXcgU3RhdGlzdGljKHRoaXMpO1xyXG4gIH1cclxuXHJcbiAgZ2V0IGFjdGl2ZVBhZ2UoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5tZW51LmFjdGl2ZVBhZ2U7XHJcbiAgfVxyXG5cclxuICBzZXQgYWN0aXZlUGFnZSh2YWx1ZSkge1xyXG4gICAgdGhpcy5tZW51LmFjdGl2ZVBhZ2UgPSB2YWx1ZTtcclxuICB9XHJcblxyXG4gIGdldCBhY3RpdmVNb2RlKCkge1xyXG4gICAgcmV0dXJuIHRoaXMuc3dpdGNoT2JqLmFjdGl2ZU1vZGU7XHJcbiAgfVxyXG5cclxuICBzZXQgYWN0aXZlTW9kZSh2YWx1ZSkge1xyXG4gICAgdGhpcy5zd2l0Y2hPYmouYWN0aXZlTW9kZSA9IHZhbHVlO1xyXG4gIH1cclxuXHJcbiAgZ2V0IGFjdGl2ZUFyckNhcmRzT2JqKCkge1xyXG4gICAgY29uc3QgaSA9IHRoaXMudG9waWNzQXJyLmZpbmRJbmRleCgoaXRlbSkgPT4gaXRlbS50b0xvd2VyQ2FzZSgpID09PSB0aGlzLmFjdGl2ZVBhZ2UpO1xyXG4gICAgcmV0dXJuIHRoaXMuY2FyZHNBcnJbaV07XHJcbiAgfVxyXG5cclxuICBzZXQgYWN0aXZlQXJyQ2FyZHNPYmooYXJyQ2FyZHNPYmopIHtcclxuICAgIHRoaXMuYWN0aXZlQXJyQ2FyZHNPYmogPSBhcnJDYXJkc09iajtcclxuICB9XHJcblxyXG4gIGNoYW5nZVBhZ2UocGFnZU5hbWUpIHtcclxuICAgIHRoaXMubWVudS5zZXRBY3RpdmVUb3BpYyhwYWdlTmFtZSk7XHJcbiAgICB0aGlzLmNvbnRlbnQuY2hhbmdlQ29udGVudChwYWdlTmFtZSk7XHJcbiAgICBpZiAodGhpcy5hY3RpdmVNb2RlID09PSAncGxheScgJiYgKHRoaXMuY29udGVudC5nZXRWYWxpZFRvcGljVHlwZSh0aGlzLmFjdGl2ZVBhZ2UpID09PSAndG9waWMnKSkge1xyXG4gICAgICB0aGlzLmdhbWVDb250cm9sLnNob3coKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMuZ2FtZUNvbnRyb2wuaGlkZSgpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHRoaXM7XHJcbiAgfVxyXG5cclxuICBwbGF5Q2FyZFNvdW5kKGNhcmRPYmopIHtcclxuICAgIGNvbnN0IGF1ZGlvRWxlbWVudCA9IG5ldyBBdWRpbyhgLi4vYXNzZXRzLyR7Y2FyZE9iai5hdWRpb1NyY31gKTtcclxuICAgIGF1ZGlvRWxlbWVudC5wbGF5KCk7XHJcbiAgICByZXR1cm4gdGhpcztcclxuICB9XHJcblxyXG4gIHBsYXlBcHBTb3VuZChzb3VuZE5hbWUpIHtcclxuICAgIGNvbnN0IHNvdW5kc0xpYnJhcnkgPSB7XHJcbiAgICAgIGNvcnJlY3Q6ICdhcHAvY29ycmVjdC5tcDMnLFxyXG4gICAgICB3cm9uZzogJ2FwcC9lcnJvci5tcDMnLFxyXG4gICAgICBzdWNjZXNzOiAnYXBwL3N1Y2Nlc3MubXAzJyxcclxuICAgICAgZmFpbHVyZTogJ2FwcC9mYWlsdXJlLm1wMycsXHJcbiAgICB9O1xyXG5cclxuICAgIGNvbnN0IGF1ZGlvRWxlbWVudCA9IG5ldyBBdWRpbyhgLi4vYXNzZXRzL2F1ZGlvLyR7c291bmRzTGlicmFyeVtzb3VuZE5hbWVdfWApO1xyXG4gICAgYXVkaW9FbGVtZW50LnBsYXkoKTtcclxuICAgIHJldHVybiB0aGlzO1xyXG4gIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgQXBwQ29udHJvbDtcclxuIiwiLyogZXNsaW50LWRpc2FibGUgbGluZWJyZWFrLXN0eWxlICovXHJcbmltcG9ydCB7IGNyZWF0ZUN1c3RvbUVsZW1lbnQgfSBmcm9tICcuL2NvbW1vbkZ1bmN0JztcclxuXHJcbmNsYXNzIENhcmQge1xyXG4gIGNvbnN0cnVjdG9yKGFwcEN0cmxPYmosIGNhcmRPYmosIHR5cGUgPSAnbWFpbiBwYWdlJykge1xyXG4gICAgdGhpcy5hcHBDdHJsT2JqID0gYXBwQ3RybE9iajtcclxuICAgIHRoaXMudHlwZSA9IHR5cGU7XHJcbiAgICB0aGlzLnZhbGlkVHlwZXMgPSBbJ21haW4gcGFnZScsICd0b3BpYyddO1xyXG4gICAgdGhpcy5lbGVtZW50ID0gbnVsbDtcclxuICAgIHRoaXMuYnVpbGQoY2FyZE9iaik7XHJcbiAgfVxyXG5cclxuICBidWlsZChjYXJkT2JqKSB7XHJcbiAgICBsZXQgdGVtcGxhdGU7XHJcbiAgICBsZXQgY2xhc3NOYW1lcyA9ICdjYXJkIGJ1dHRvbic7XHJcbiAgICBzd2l0Y2ggKHRoaXMudHlwZSkge1xyXG4gICAgICBjYXNlICdtYWluIHBhZ2UnOlxyXG4gICAgICAgIHRlbXBsYXRlID0gYFxyXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJjYXJkLWNvbnRlbnRcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImdyYXBoaWMgY2FyZC1ncmFwaGljXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aW1nIGNsYXNzPVwiY2FyZC1pbWFnZVwiIHNyYz1cIi4uL2Fzc2V0cy8ke2NhcmRPYmouaW1hZ2V9XCIgYWx0PVwiU2VjdGlvbiAke2NhcmRPYmouY2FyZE5hbWV9XCIgd2lkdGg9XCIzOTBcIiBoZWlnaHQ9XCIyNjBcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxwIGNsYXNzPVwiY2FyZC10ZXh0XCI+JHtjYXJkT2JqLmNhcmROYW1lfTwvcD5cclxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgYDtcclxuICAgICAgICBjbGFzc05hbWVzICs9ICcgY2FyZC1tYWluLXBhZ2UnO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBjYXNlICd0b3BpYyc6XHJcbiAgICAgICAgaWYgKHRoaXMuYXBwQ3RybE9iai5hY3RpdmVNb2RlID09PSAndHJhaW4nKSB7XHJcbiAgICAgICAgICB0ZW1wbGF0ZSA9IGBcclxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiY2FyZC1jb250ZW50XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJncmFwaGljIGNhcmQtZ3JhcGhpY1wiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGltZyBjbGFzcz1cImNhcmQtaW1hZ2VcIiBzcmM9XCIuLi9hc3NldHMvJHtjYXJkT2JqLmltYWdlfVwiIGFsdD1cIiR7Y2FyZE9iai53b3JkfVwiIHdpZHRoPVwiMzkwXCIgaGVpZ2h0PVwiMjYwXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8cCBjbGFzcz1cImNhcmQtdGV4dFwiPiR7Y2FyZE9iai53b3JkfTwvcD5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImJ1dHRvbiBjYXJkLWZsaXAtYnV0dG9uXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cIm1hdGVyaWFsLXN5bWJvbHMtb3V0bGluZWRcIj5mbGlwX2NhbWVyYV9hbmRyb2lkPC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICBgO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICB0ZW1wbGF0ZSA9IGBcclxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiY2FyZC1jb250ZW50XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJncmFwaGljIGNhcmQtZ3JhcGhpY1wiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGltZyBjbGFzcz1cImNhcmQtaW1hZ2VcIiBzcmM9XCIuLi9hc3NldHMvJHtjYXJkT2JqLmltYWdlfVwiIGFsdD1cIiR7Y2FyZE9iai53b3JkfVwiIHdpZHRoPVwiMzkwXCIgaGVpZ2h0PVwiMjYwXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgIGA7XHJcbiAgICAgICAgICBjbGFzc05hbWVzICs9ICcgZ2FtZS1jYXJkJztcclxuICAgICAgICB9XHJcbiAgICAgICAgY2xhc3NOYW1lcyArPSAnIGNhcmQtdG9waWMnO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBkZWZhdWx0OlxyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMuZWxlbWVudCA9IGNyZWF0ZUN1c3RvbUVsZW1lbnQoJ2RpdicsIGNsYXNzTmFtZXMsIHRlbXBsYXRlKTtcclxuICAgIHJldHVybiB0aGlzO1xyXG4gIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgQ2FyZDtcclxuIiwiLyogZXNsaW50LWRpc2FibGUgbGluZWJyZWFrLXN0eWxlICovXHJcbmNvbnN0IGNhcmRzID0gW1xyXG4gIFsnQWN0aW9uIChzZXQgQSknLCAnQWN0aW9uIChzZXQgQiknLCAnQW5pbWFsIChzZXQgQSknLCAnQW5pbWFsIChzZXQgQiknLCAnQ2xvdGhlcycsICdFbW90aW9ucyddLFxyXG4gIFtcclxuICAgIHtcclxuICAgICAgd29yZDogJ2NyeScsXHJcbiAgICAgIHRyYW5zbGF0aW9uOiAn0L/Qu9Cw0LrQsNGC0YwnLFxyXG4gICAgICBpbWFnZTogJ2ltZy9jcnkuanBnJyxcclxuICAgICAgYXVkaW9TcmM6ICdhdWRpby9jcnkubXAzJyxcclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgIHdvcmQ6ICdkYW5jZScsXHJcbiAgICAgIHRyYW5zbGF0aW9uOiAn0YLQsNC90YbQtdCy0LDRgtGMJyxcclxuICAgICAgaW1hZ2U6ICdpbWcvZGFuY2UuanBnJyxcclxuICAgICAgYXVkaW9TcmM6ICdhdWRpby9kYW5jZS5tcDMnLFxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgd29yZDogJ2RpdmUnLFxyXG4gICAgICB0cmFuc2xhdGlvbjogJ9C90YvRgNGP0YLRjCcsXHJcbiAgICAgIGltYWdlOiAnaW1nL2RpdmUuanBnJyxcclxuICAgICAgYXVkaW9TcmM6ICdhdWRpby9kaXZlLm1wMycsXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICB3b3JkOiAnZHJhdycsXHJcbiAgICAgIHRyYW5zbGF0aW9uOiAn0YDQuNGB0L7QstCw0YLRjCcsXHJcbiAgICAgIGltYWdlOiAnaW1nL2RyYXcuanBnJyxcclxuICAgICAgYXVkaW9TcmM6ICdhdWRpby9kcmF3Lm1wMycsXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICB3b3JkOiAnZmlzaCcsXHJcbiAgICAgIHRyYW5zbGF0aW9uOiAn0LvQvtCy0LjRgtGMINGA0YvQsdGDJyxcclxuICAgICAgaW1hZ2U6ICdpbWcvZmlzaC5qcGcnLFxyXG4gICAgICBhdWRpb1NyYzogJ2F1ZGlvL2Zpc2gubXAzJyxcclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgIHdvcmQ6ICdmbHknLFxyXG4gICAgICB0cmFuc2xhdGlvbjogJ9C70LXRgtCw0YLRjCcsXHJcbiAgICAgIGltYWdlOiAnaW1nL2ZseS5qcGcnLFxyXG4gICAgICBhdWRpb1NyYzogJ2F1ZGlvL2ZseS5tcDMnLFxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgd29yZDogJ2h1ZycsXHJcbiAgICAgIHRyYW5zbGF0aW9uOiAn0L7QsdC90LjQvNCw0YLRjCcsXHJcbiAgICAgIGltYWdlOiAnaW1nL2h1Zy5qcGcnLFxyXG4gICAgICBhdWRpb1NyYzogJ2F1ZGlvL2h1Zy5tcDMnLFxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgd29yZDogJ2p1bXAnLFxyXG4gICAgICB0cmFuc2xhdGlvbjogJ9C/0YDRi9Cz0LDRgtGMJyxcclxuICAgICAgaW1hZ2U6ICdpbWcvanVtcC5qcGcnLFxyXG4gICAgICBhdWRpb1NyYzogJ2F1ZGlvL2p1bXAubXAzJyxcclxuICAgIH0sXHJcbiAgXSxcclxuICBbXHJcbiAgICB7XHJcbiAgICAgIHdvcmQ6ICdvcGVuJyxcclxuICAgICAgdHJhbnNsYXRpb246ICfQvtGC0LrRgNGL0LLQsNGC0YwnLFxyXG4gICAgICBpbWFnZTogJ2ltZy9vcGVuLmpwZycsXHJcbiAgICAgIGF1ZGlvU3JjOiAnYXVkaW8vb3Blbi5tcDMnLFxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgd29yZDogJ3BsYXknLFxyXG4gICAgICB0cmFuc2xhdGlvbjogJ9C40LPRgNCw0YLRjCcsXHJcbiAgICAgIGltYWdlOiAnaW1nL3BsYXkuanBnJyxcclxuICAgICAgYXVkaW9TcmM6ICdhdWRpby9wbGF5Lm1wMycsXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICB3b3JkOiAncG9pbnQnLFxyXG4gICAgICB0cmFuc2xhdGlvbjogJ9GD0LrQsNC30YvQstCw0YLRjCcsXHJcbiAgICAgIGltYWdlOiAnaW1nL3BvaW50LmpwZycsXHJcbiAgICAgIGF1ZGlvU3JjOiAnYXVkaW8vcG9pbnQubXAzJyxcclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgIHdvcmQ6ICdyaWRlJyxcclxuICAgICAgdHJhbnNsYXRpb246ICfQtdC30LTQuNGC0YwnLFxyXG4gICAgICBpbWFnZTogJ2ltZy9yaWRlLmpwZycsXHJcbiAgICAgIGF1ZGlvU3JjOiAnYXVkaW8vcmlkZS5tcDMnLFxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgd29yZDogJ3J1bicsXHJcbiAgICAgIHRyYW5zbGF0aW9uOiAn0LHQtdCz0LDRgtGMJyxcclxuICAgICAgaW1hZ2U6ICdpbWcvcnVuLmpwZycsXHJcbiAgICAgIGF1ZGlvU3JjOiAnYXVkaW8vcnVuLm1wMycsXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICB3b3JkOiAnc2luZycsXHJcbiAgICAgIHRyYW5zbGF0aW9uOiAn0L/QtdGC0YwnLFxyXG4gICAgICBpbWFnZTogJ2ltZy9zaW5nLmpwZycsXHJcbiAgICAgIGF1ZGlvU3JjOiAnYXVkaW8vc2luZy5tcDMnLFxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgd29yZDogJ3NraXAnLFxyXG4gICAgICB0cmFuc2xhdGlvbjogJ9C/0YDQvtC/0YPRgdC60LDRgtGMLCDQv9GA0YvQs9Cw0YLRjCcsXHJcbiAgICAgIGltYWdlOiAnaW1nL3NraXAuanBnJyxcclxuICAgICAgYXVkaW9TcmM6ICdhdWRpby9za2lwLm1wMycsXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICB3b3JkOiAnc3dpbScsXHJcbiAgICAgIHRyYW5zbGF0aW9uOiAn0L/Qu9Cw0LLQsNGC0YwnLFxyXG4gICAgICBpbWFnZTogJ2ltZy9zd2ltLmpwZycsXHJcbiAgICAgIGF1ZGlvU3JjOiAnYXVkaW8vc3dpbS5tcDMnLFxyXG4gICAgfSxcclxuICBdLFxyXG4gIFtcclxuICAgIHtcclxuICAgICAgd29yZDogJ2NhdCcsXHJcbiAgICAgIHRyYW5zbGF0aW9uOiAn0LrQvtGCJyxcclxuICAgICAgaW1hZ2U6ICdpbWcvY2F0LmpwZycsXHJcbiAgICAgIGF1ZGlvU3JjOiAnYXVkaW8vY2F0Lm1wMycsXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICB3b3JkOiAnY2hpY2snLFxyXG4gICAgICB0cmFuc2xhdGlvbjogJ9GG0YvQv9C70ZHQvdC+0LonLFxyXG4gICAgICBpbWFnZTogJ2ltZy9jaGljay5qcGcnLFxyXG4gICAgICBhdWRpb1NyYzogJ2F1ZGlvL2NoaWNrLm1wMycsXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICB3b3JkOiAnY2hpY2tlbicsXHJcbiAgICAgIHRyYW5zbGF0aW9uOiAn0LrRg9GA0LjRhtCwJyxcclxuICAgICAgaW1hZ2U6ICdpbWcvY2hpY2tlbi5qcGcnLFxyXG4gICAgICBhdWRpb1NyYzogJ2F1ZGlvL2NoaWNrZW4ubXAzJyxcclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgIHdvcmQ6ICdkb2cnLFxyXG4gICAgICB0cmFuc2xhdGlvbjogJ9GB0L7QsdCw0LrQsCcsXHJcbiAgICAgIGltYWdlOiAnaW1nL2RvZy5qcGcnLFxyXG4gICAgICBhdWRpb1NyYzogJ2F1ZGlvL2RvZy5tcDMnLFxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgd29yZDogJ2hvcnNlJyxcclxuICAgICAgdHJhbnNsYXRpb246ICfQu9C+0YjQsNC00YwnLFxyXG4gICAgICBpbWFnZTogJ2ltZy9ob3JzZS5qcGcnLFxyXG4gICAgICBhdWRpb1NyYzogJ2F1ZGlvL2hvcnNlLm1wMycsXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICB3b3JkOiAncGlnJyxcclxuICAgICAgdHJhbnNsYXRpb246ICfRgdCy0LjQvdGM0Y8nLFxyXG4gICAgICBpbWFnZTogJ2ltZy9waWcuanBnJyxcclxuICAgICAgYXVkaW9TcmM6ICdhdWRpby9waWcubXAzJyxcclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgIHdvcmQ6ICdyYWJiaXQnLFxyXG4gICAgICB0cmFuc2xhdGlvbjogJ9C60YDQvtC70LjQuicsXHJcbiAgICAgIGltYWdlOiAnaW1nL3JhYmJpdC5qcGcnLFxyXG4gICAgICBhdWRpb1NyYzogJ2F1ZGlvL3JhYmJpdC5tcDMnLFxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgd29yZDogJ3NoZWVwJyxcclxuICAgICAgdHJhbnNsYXRpb246ICfQvtCy0YbQsCcsXHJcbiAgICAgIGltYWdlOiAnaW1nL3NoZWVwLmpwZycsXHJcbiAgICAgIGF1ZGlvU3JjOiAnYXVkaW8vc2hlZXAubXAzJyxcclxuICAgIH0sXHJcbiAgXSxcclxuICBbXHJcbiAgICB7XHJcbiAgICAgIHdvcmQ6ICdiaXJkJyxcclxuICAgICAgdHJhbnNsYXRpb246ICfQv9GC0LjRhtCwJyxcclxuICAgICAgaW1hZ2U6ICdpbWcvYmlyZC5qcGcnLFxyXG4gICAgICBhdWRpb1NyYzogJ2F1ZGlvL2JpcmQubXAzJyxcclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgIHdvcmQ6ICdmaXNoJyxcclxuICAgICAgdHJhbnNsYXRpb246ICfRgNGL0LHQsCcsXHJcbiAgICAgIGltYWdlOiAnaW1nL2Zpc2gxLmpwZycsXHJcbiAgICAgIGF1ZGlvU3JjOiAnYXVkaW8vZmlzaC5tcDMnLFxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgd29yZDogJ2Zyb2cnLFxyXG4gICAgICB0cmFuc2xhdGlvbjogJ9C20LDQsdCwJyxcclxuICAgICAgaW1hZ2U6ICdpbWcvZnJvZy5qcGcnLFxyXG4gICAgICBhdWRpb1NyYzogJ2F1ZGlvL2Zyb2cubXAzJyxcclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgIHdvcmQ6ICdnaXJhZmZlJyxcclxuICAgICAgdHJhbnNsYXRpb246ICfQttC40YDQsNGE0LAnLFxyXG4gICAgICBpbWFnZTogJ2ltZy9naXJhZmZlLmpwZycsXHJcbiAgICAgIGF1ZGlvU3JjOiAnYXVkaW8vZ2lyYWZmZS5tcDMnLFxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgd29yZDogJ2xpb24nLFxyXG4gICAgICB0cmFuc2xhdGlvbjogJ9C70LXQsicsXHJcbiAgICAgIGltYWdlOiAnaW1nL2xpb24uanBnJyxcclxuICAgICAgYXVkaW9TcmM6ICdhdWRpby9saW9uLm1wMycsXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICB3b3JkOiAnbW91c2UnLFxyXG4gICAgICB0cmFuc2xhdGlvbjogJ9C80YvRiNGMJyxcclxuICAgICAgaW1hZ2U6ICdpbWcvbW91c2UuanBnJyxcclxuICAgICAgYXVkaW9TcmM6ICdhdWRpby9tb3VzZS5tcDMnLFxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgd29yZDogJ3R1cnRsZScsXHJcbiAgICAgIHRyYW5zbGF0aW9uOiAn0YfQtdGA0LXQv9Cw0YXQsCcsXHJcbiAgICAgIGltYWdlOiAnaW1nL3R1cnRsZS5qcGcnLFxyXG4gICAgICBhdWRpb1NyYzogJ2F1ZGlvL3R1cnRsZS5tcDMnLFxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgd29yZDogJ2RvbHBoaW4nLFxyXG4gICAgICB0cmFuc2xhdGlvbjogJ9C00LXQu9GM0YTQuNC9JyxcclxuICAgICAgaW1hZ2U6ICdpbWcvZG9scGhpbi5qcGcnLFxyXG4gICAgICBhdWRpb1NyYzogJ2F1ZGlvL2RvbHBoaW4ubXAzJyxcclxuICAgIH0sXHJcbiAgXSxcclxuICBbXHJcbiAgICB7XHJcbiAgICAgIHdvcmQ6ICdza2lydCcsXHJcbiAgICAgIHRyYW5zbGF0aW9uOiAn0Y7QsdC60LAnLFxyXG4gICAgICBpbWFnZTogJ2ltZy9za2lydC5qcGcnLFxyXG4gICAgICBhdWRpb1NyYzogJ2F1ZGlvL3NraXJ0Lm1wMycsXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICB3b3JkOiAncGFudHMnLFxyXG4gICAgICB0cmFuc2xhdGlvbjogJ9Cx0YDRjtC60LgnLFxyXG4gICAgICBpbWFnZTogJ2ltZy9wYW50cy5qcGcnLFxyXG4gICAgICBhdWRpb1NyYzogJ2F1ZGlvL3BhbnRzLm1wMycsXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICB3b3JkOiAnYmxvdXNlJyxcclxuICAgICAgdHJhbnNsYXRpb246ICfQsdC70YPQt9C60LAnLFxyXG4gICAgICBpbWFnZTogJ2ltZy9ibG91c2UuanBnJyxcclxuICAgICAgYXVkaW9TcmM6ICdhdWRpby9ibG91c2UubXAzJyxcclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgIHdvcmQ6ICdkcmVzcycsXHJcbiAgICAgIHRyYW5zbGF0aW9uOiAn0L/Qu9Cw0YLRjNC1JyxcclxuICAgICAgaW1hZ2U6ICdpbWcvZHJlc3MuanBnJyxcclxuICAgICAgYXVkaW9TcmM6ICdhdWRpby9kcmVzcy5tcDMnLFxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgd29yZDogJ2Jvb3QnLFxyXG4gICAgICB0cmFuc2xhdGlvbjogJ9Cx0L7RgtC40L3QvtC6JyxcclxuICAgICAgaW1hZ2U6ICdpbWcvYm9vdC5qcGcnLFxyXG4gICAgICBhdWRpb1NyYzogJ2F1ZGlvL2Jvb3QubXAzJyxcclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgIHdvcmQ6ICdzaGlydCcsXHJcbiAgICAgIHRyYW5zbGF0aW9uOiAn0YDRg9Cx0LDRiNC60LAnLFxyXG4gICAgICBpbWFnZTogJ2ltZy9zaGlydC5qcGcnLFxyXG4gICAgICBhdWRpb1NyYzogJ2F1ZGlvL3NoaXJ0Lm1wMycsXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICB3b3JkOiAnY29hdCcsXHJcbiAgICAgIHRyYW5zbGF0aW9uOiAn0L/QsNC70YzRgtC+JyxcclxuICAgICAgaW1hZ2U6ICdpbWcvY29hdC5qcGcnLFxyXG4gICAgICBhdWRpb1NyYzogJ2F1ZGlvL2NvYXQubXAzJyxcclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgIHdvcmQ6ICdzaG9lJyxcclxuICAgICAgdHJhbnNsYXRpb246ICfRgtGD0YTQu9C4JyxcclxuICAgICAgaW1hZ2U6ICdpbWcvc2hvZS5qcGcnLFxyXG4gICAgICBhdWRpb1NyYzogJ2F1ZGlvL3Nob2UubXAzJyxcclxuICAgIH0sXHJcbiAgXSxcclxuICBbXHJcbiAgICB7XHJcbiAgICAgIHdvcmQ6ICdzYWQnLFxyXG4gICAgICB0cmFuc2xhdGlvbjogJ9Cz0YDRg9GB0YLQvdGL0LknLFxyXG4gICAgICBpbWFnZTogJ2ltZy9zYWQuanBnJyxcclxuICAgICAgYXVkaW9TcmM6ICdhdWRpby9zYWQubXAzJyxcclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgIHdvcmQ6ICdhbmdyeScsXHJcbiAgICAgIHRyYW5zbGF0aW9uOiAn0YHQtdGA0LTQuNGC0YvQuScsXHJcbiAgICAgIGltYWdlOiAnaW1nL2FuZ3J5LmpwZycsXHJcbiAgICAgIGF1ZGlvU3JjOiAnYXVkaW8vYW5ncnkubXAzJyxcclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgIHdvcmQ6ICdoYXBweScsXHJcbiAgICAgIHRyYW5zbGF0aW9uOiAn0YHRh9Cw0YHRgtC70LjQstGL0LknLFxyXG4gICAgICBpbWFnZTogJ2ltZy9oYXBweS5qcGcnLFxyXG4gICAgICBhdWRpb1NyYzogJ2F1ZGlvL2hhcHB5Lm1wMycsXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICB3b3JkOiAndGlyZWQnLFxyXG4gICAgICB0cmFuc2xhdGlvbjogJ9GD0YHRgtCw0LLRiNC40LknLFxyXG4gICAgICBpbWFnZTogJ2ltZy90aXJlZC5qcGcnLFxyXG4gICAgICBhdWRpb1NyYzogJ2F1ZGlvL3RpcmVkLm1wMycsXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICB3b3JkOiAnc3VycHJpc2VkJyxcclxuICAgICAgdHJhbnNsYXRpb246ICfRg9C00LjQstC70ZHQvdC90YvQuScsXHJcbiAgICAgIGltYWdlOiAnaW1nL3N1cnByaXNlZC5qcGcnLFxyXG4gICAgICBhdWRpb1NyYzogJ2F1ZGlvL3N1cnByaXNlZC5tcDMnLFxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgd29yZDogJ3NjYXJlZCcsXHJcbiAgICAgIHRyYW5zbGF0aW9uOiAn0LjRgdC/0YPQs9Cw0L3QvdGL0LknLFxyXG4gICAgICBpbWFnZTogJ2ltZy9zY2FyZWQuanBnJyxcclxuICAgICAgYXVkaW9TcmM6ICdhdWRpby9zY2FyZWQubXAzJyxcclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgIHdvcmQ6ICdzbWlsZScsXHJcbiAgICAgIHRyYW5zbGF0aW9uOiAn0YPQu9GL0LHQutCwJyxcclxuICAgICAgaW1hZ2U6ICdpbWcvc21pbGUuanBnJyxcclxuICAgICAgYXVkaW9TcmM6ICdhdWRpby9zbWlsZS5tcDMnLFxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgd29yZDogJ2xhdWdoJyxcclxuICAgICAgdHJhbnNsYXRpb246ICfRgdC80LXRhScsXHJcbiAgICAgIGltYWdlOiAnaW1nL2xhdWdoLmpwZycsXHJcbiAgICAgIGF1ZGlvU3JjOiAnYXVkaW8vbGF1Z2gubXAzJyxcclxuICAgIH0sXHJcbiAgXSxcclxuXTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNhcmRzO1xyXG4iLCIvKiBlc2xpbnQtZGlzYWJsZSBsaW5lYnJlYWstc3R5bGUgKi9cclxuLyogZXNsaW50LWRpc2FibGUgcHJlZmVyLWRlc3RydWN0dXJpbmcgKi9cclxuLyogZXNsaW50LWRpc2FibGUgbm8tdW51c2VkLXZhcnMgKi9cclxuLyogZXNsaW50LWRpc2FibGUgbm8tY29uc29sZSAqL1xyXG4vKiBlc2xpbnQtZGlzYWJsZSBuby11bmRlZiAqL1xyXG5cclxuZnVuY3Rpb24gY2xpY2tVc2VySW50ZXJhY3RpdmUoZXZlbnQsIGFwcEN0cmxPYmopIHtcclxuICBjb25zdCBhcHBDb250cm9sID0gYXBwQ3RybE9iajtcclxuICBjb25zdCBtZW51ID0gYXBwQ29udHJvbC5tZW51O1xyXG4gIGNvbnN0IGdhbWVDb250cm9sID0gYXBwQ29udHJvbC5nYW1lQ29udHJvbDtcclxuICBjb25zdCBzd2l0Y2hPYmogPSBhcHBDb250cm9sLnN3aXRjaE9iajtcclxuICBjb25zdCBjb250ZW50ID0gYXBwQ29udHJvbC5jb250ZW50O1xyXG4gIGNvbnN0IHRhcmdldENsYXNzTGlzdCA9IEFycmF5LmZyb20oZXZlbnQudGFyZ2V0LmNsYXNzTGlzdCk7XHJcbiAgY29uc3QgaXNHYW1lTW9kZSA9IChhcHBDb250cm9sLmFjdGl2ZU1vZGUgPT09ICdwbGF5Jyk7XHJcbiAgbGV0IGNhcmRFbGVtZW50O1xyXG4gIGxldCBhY3RpdmVNZW51RWxlbWVudDtcclxuXHJcbiAgc3dpdGNoICh0cnVlKSB7XHJcbiAgICAvLyAgY2xpY2tpbmcgb24gbWVudSBidXJnZXIgYnV0dG9uXHJcbiAgICBjYXNlICh0YXJnZXRDbGFzc0xpc3QuaW5jbHVkZXMoJ21lbnUtYnV0dG9uJykpOlxyXG4gICAgICBtZW51LnRvZ2dsZSgpO1xyXG4gICAgICBicmVhaztcclxuXHJcbiAgICAvLyAgY2xpY2tpbmcgYW55d2hlcmUgZWxzZSB3aGVuIGJ1cmdlciBtZW51IG9wZW5lZFxyXG4gICAgY2FzZSAoZG9jdW1lbnQucXVlcnlTZWxlY3RvcignYm9keScpLmNsYXNzTGlzdC5jb250YWlucygnb3BlbmVkLW1lbnUnKSAmJiAhdGFyZ2V0Q2xhc3NMaXN0LmluY2x1ZGVzKCdtZW51JykpOlxyXG4gICAgICBtZW51LmNsb3NlKCk7XHJcbiAgICAgIGlmICh0YXJnZXRDbGFzc0xpc3QuaW5jbHVkZXMoJ21lbnUtaXRlbScpKSB7XHJcbiAgICAgICAgYWN0aXZlTWVudUVsZW1lbnQgPSBldmVudC50YXJnZXQ7XHJcbiAgICAgICAgYXBwQ29udHJvbC5jaGFuZ2VQYWdlKGFjdGl2ZU1lbnVFbGVtZW50LmlubmVySFRNTCk7XHJcbiAgICAgICAgYXBwQ29udHJvbC5zd2l0Y2hPYmouZW5hYmxlKCk7XHJcbiAgICAgIH1cclxuICAgICAgYnJlYWs7XHJcblxyXG4gICAgLy8gIGNsaWNraW5nIG9uIHN3aXRjaCBidXR0b25cclxuICAgIGNhc2UgKHRhcmdldENsYXNzTGlzdC5pbmNsdWRlcygnc3dpdGNoLXRyaWdnZXInKVxyXG4gICAgICAgICAgJiYgIXN3aXRjaE9iai5lbGVtZW50LmNsYXNzTGlzdC5jb250YWlucygnZGlzYWJsZWQnKSk6IHtcclxuICAgICAgc3dpdGNoT2JqLnRvZ2dsZSgpO1xyXG4gICAgICBhcHBDb250cm9sLmNoYW5nZVBhZ2UoYXBwQ29udHJvbC5hY3RpdmVQYWdlKTtcclxuICAgICAgYnJlYWs7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gIGNsaWNraW5nIG9uIHN0YXJ0IGdhbWUgYnV0dG9uXHJcbiAgICBjYXNlICh0YXJnZXRDbGFzc0xpc3QuaW5jbHVkZXMoJ3N0YXJ0LWJ1dHRvbicpKToge1xyXG4gICAgICBnYW1lQ29udHJvbC5zdGFydEdhbWUoYXBwQ29udHJvbC5hY3RpdmVBcnJDYXJkc09iaik7XHJcbiAgICAgIGJyZWFrO1xyXG4gICAgfVxyXG5cclxuICAgIC8vICBjbGlja2luZyBvbiBzdGFydCBnYW1lIGJ1dHRvblxyXG4gICAgY2FzZSAodGFyZ2V0Q2xhc3NMaXN0LmluY2x1ZGVzKCdyZXBlYXQtYnV0dG9uJykpOiB7XHJcbiAgICAgIGdhbWVDb250cm9sLnJlcGVhdFF1ZXN0aW9uKCk7XHJcbiAgICAgIGJyZWFrO1xyXG4gICAgfVxyXG5cclxuICAgIC8vICBjbGlja2luZyBvbiBjYXJkIGZsaXAgYnV0dG9uXHJcbiAgICBjYXNlIChldmVudC50YXJnZXQucGFyZW50RWxlbWVudC5jbGFzc0xpc3QuY29udGFpbnMoJ2NhcmQtZmxpcC1idXR0b24nKSk6XHJcbiAgICAgIGNhcmRFbGVtZW50ID0gY29udGVudC5nZXRDYXJkRWxlbWVudEJ5VGFyZ2V0KGV2ZW50LnRhcmdldCk7XHJcbiAgICAgIGNvbnRlbnQuZmxpcENhcmQoY2FyZEVsZW1lbnQpO1xyXG4gICAgICBicmVhaztcclxuXHJcbiAgICAvLyAgY2xpY2tpbmcgb24gY2FyZFxyXG4gICAgY2FzZSAodGFyZ2V0Q2xhc3NMaXN0LnNvbWUoKGNsYXNzTmFtZSkgPT4gY29udGVudC52YWxpZENhcmRDbGFzc2VzLmluY2x1ZGVzKGNsYXNzTmFtZSkpKToge1xyXG4gICAgICBjYXJkRWxlbWVudCA9IGNvbnRlbnQuZ2V0Q2FyZEVsZW1lbnRCeVRhcmdldChldmVudC50YXJnZXQpO1xyXG4gICAgICBjb25zdCBjYXJkSW1hZ2VOYW1lID0gY29udGVudC5nZXRDYXJkSW1hZ2VOYW1lKGNhcmRFbGVtZW50KTtcclxuICAgICAgY29uc3QgY2FyZE9iaiA9IGNvbnRlbnQuZ2V0Q2FyZE9iakJ5SW1hZ2VOYW1lKGNhcmRJbWFnZU5hbWUpO1xyXG5cclxuICAgICAgaWYgKGlzR2FtZU1vZGUgJiYgZ2FtZUNvbnRyb2wuaXNHYW1lU3RhcnRlZCAmJiAhY2FyZEVsZW1lbnQuY2xhc3NMaXN0LmNvbnRhaW5zKCdkaXNhYmxlZCcpKSB7XHJcbiAgICAgICAgZ2FtZUNvbnRyb2wucHJvY2Vzc0Fuc3dlcihjYXJkT2JqLCBjYXJkRWxlbWVudCk7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIH0gZWxzZSBpZiAoY2FyZEVsZW1lbnQuY2xhc3NMaXN0LmNvbnRhaW5zKCdjYXJkLW1haW4tcGFnZScpKSB7XHJcbiAgICAgICAgY29uc3QgcGFnZU5hbWUgPSBjb250ZW50LmdldENhcmRJbm5lclRleHQoY2FyZEVsZW1lbnQpO1xyXG4gICAgICAgIGFjdGl2ZU1lbnVFbGVtZW50ID0gbWVudS5nZXRNZW51SXRlbUJ5TmFtZShwYWdlTmFtZSk7XHJcbiAgICAgICAgYXBwQ29udHJvbC5jaGFuZ2VQYWdlKHBhZ2VOYW1lKTtcclxuICAgICAgfSBlbHNlIGlmICghY2FyZEVsZW1lbnQuY2xhc3NMaXN0LmNvbnRhaW5zKCdmbGlwcGVkJykgJiYgIWNhcmRFbGVtZW50LmNsYXNzTGlzdC5jb250YWlucygnZ2FtZS1jYXJkJykpIHtcclxuICAgICAgICBhcHBDb250cm9sLnBsYXlDYXJkU291bmQoY2FyZE9iaik7XHJcbiAgICAgICAgYXBwQ29udHJvbC5zdGF0LnN0b3JhZ2UuYWRkKCdjbGljaycsIGNhcmRPYmopO1xyXG4gICAgICB9XHJcbiAgICAgIGJyZWFrO1xyXG4gICAgfVxyXG5cclxuICAgIC8vICBjbGlja2luZyBvbiB0YWJsZSBoZWFkZXJcclxuICAgIGNhc2UgKHRhcmdldENsYXNzTGlzdC5pbmNsdWRlcygnc29ydGFibGUnKSk6XHJcbiAgICAgIGFwcENvbnRyb2wuc3RhdC5zb3J0VGFibGUoZXZlbnQudGFyZ2V0KTtcclxuICAgICAgY29udGVudC5jaGFuZ2VDb250ZW50KCdzdGF0aXN0aWMnKTtcclxuICAgICAgYnJlYWs7XHJcblxyXG4gICAgLy8gIGNsaWNraW5nIG9uIHJlc2V0IGJ1dHRvblxyXG4gICAgY2FzZSAodGFyZ2V0Q2xhc3NMaXN0LmluY2x1ZGVzKCdyZXNldC1zdGF0JykpOlxyXG4gICAgICBhcHBDb250cm9sLnN0YXQuc3RvcmFnZS5jbGVhblN0b3JhZ2UoKTtcclxuICAgICAgaWYgKGFwcENvbnRyb2wuY29udGVudC50eXBlID09PSAnc3RhdGlzdGljJykge1xyXG4gICAgICAgIGNvbnRlbnQuY2hhbmdlQ29udGVudCgnc3RhdGlzdGljJyk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgY29udGVudC5jaGFuZ2VDb250ZW50KCd0cmFpbiBkaWZmJyk7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGJyZWFrO1xyXG5cclxuICAgIC8vICBjbGlja2luZyBvbiB0cmFpbiBkaWZmLiB3b3JkcyBidXR0b25cclxuICAgIGNhc2UgKHRhcmdldENsYXNzTGlzdC5pbmNsdWRlcygndHJhaW4tZGlmZicpKTpcclxuICAgICAgc3dpdGNoT2JqLnRyYWluKCk7XHJcbiAgICAgIHN3aXRjaE9iai5kaXNhYmxlKCk7XHJcbiAgICAgIGFwcENvbnRyb2wuc3RhdC5zdG9yYWdlLmdldERpZmZXb3Jkc0FycigpO1xyXG4gICAgICBjb250ZW50LmNoYW5nZUNvbnRlbnQoJ3RyYWluIGRpZmYnKTtcclxuICAgICAgYnJlYWs7XHJcblxyXG4gICAgZGVmYXVsdDpcclxuICAgICAgYnJlYWs7XHJcbiAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGlja1VzZXJJbnRlcmFjdGl2ZTtcclxuIiwiLyogZXNsaW50LWRpc2FibGUgbGluZWJyZWFrLXN0eWxlICovXHJcbi8qIGVzbGludC1kaXNhYmxlIGltcG9ydC9wcmVmZXItZGVmYXVsdC1leHBvcnQgKi9cclxuLyogZXNsaW50LWRpc2FibGUgbm8tdW5kZWYgKi9cclxuXHJcbmZ1bmN0aW9uIGNyZWF0ZUN1c3RvbUVsZW1lbnQodHlwZSwgY2xhc3NOYW1lID0gJycsIGlubmVySFRNTCA9ICcnKSB7XHJcbiAgY29uc3QgZWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQodHlwZSk7XHJcbiAgZWxlbWVudC5jbGFzc05hbWUgPSBjbGFzc05hbWU7XHJcbiAgZWxlbWVudC5pbm5lckhUTUwgPSBpbm5lckhUTUw7XHJcbiAgcmV0dXJuIGVsZW1lbnQ7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGdldFJhbmRvbUludChtYXhJbnQsIG1pbkludCA9IDApIHtcclxuICAvLyAgbWF4IGFuZCBtaW4gaW5jbHVzaXZlXHJcbiAgcmV0dXJuIE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIChtYXhJbnQgLSBtaW5JbnQgKyAxKSkgKyBtaW5JbnQ7XHJcbn1cclxuXHJcbmV4cG9ydCB7IGNyZWF0ZUN1c3RvbUVsZW1lbnQsIGdldFJhbmRvbUludCB9O1xyXG4iLCIvKiBlc2xpbnQtZGlzYWJsZSBsaW5lYnJlYWstc3R5bGUgKi9cclxuLyogZXNsaW50LWRpc2FibGUgbm8tcmVzdHJpY3RlZC1zeW50YXggKi9cclxuLyogZXNsaW50LWRpc2FibGUgbGluZWJyZWFrLXN0eWxlICovXHJcbi8qIGVzbGludC1kaXNhYmxlIG5vLWNvbnNvbGUgKi9cclxuLyogZXNsaW50LWRpc2FibGUgbGluZWJyZWFrLXN0eWxlICovXHJcbi8qIGVzbGludC1kaXNhYmxlIGNsYXNzLW1ldGhvZHMtdXNlLXRoaXMgKi9cclxuLyogZXNsaW50LWRpc2FibGUgbm8tdW5kZWYgKi9cclxuXHJcbmltcG9ydCBDYXJkIGZyb20gJy4vY2FyZCc7XHJcbmltcG9ydCB7IGNyZWF0ZUN1c3RvbUVsZW1lbnQgfSBmcm9tICcuL2NvbW1vbkZ1bmN0JztcclxuXHJcbmNsYXNzIENvbnRlbnRDb250YWluZXIge1xyXG4gIGNvbnN0cnVjdG9yKGFwcEN0cmxPYmosIHR5cGUgPSAnbWFpbiBwYWdlJykge1xyXG4gICAgdGhpcy5hcHBDb250cm9sID0gYXBwQ3RybE9iajtcclxuICAgIHRoaXMudG9waWNzQXJyID0gYXBwQ3RybE9iai50b3BpY3NBcnI7XHJcbiAgICB0aGlzLmNhcmRzQXJyID0gYXBwQ3RybE9iai5jYXJkc0FycjtcclxuICAgIHRoaXMubWVudSA9IGFwcEN0cmxPYmoubWVudTtcclxuICAgIHRoaXMudmFsaWRUeXBlcyA9IFsnbWFpbiBwYWdlJywgJ3RvcGljJywgJ3N0YXRpc3RpYycsICd0cmFpbiBkaWZmJ107XHJcbiAgICB0aGlzLnZhbGlkQ2FyZENsYXNzZXMgPSBbJ2NhcmQnLCAnY2FyZC1jb250ZW50JywgJ2NhcmQtdGV4dCcsICdjYXJkLWdyYXBoaWMnLCAnY2FyZC1pbWFnZSddO1xyXG4gICAgdGhpcy50eXBlID0gdGhpcy5nZXRWYWxpZFR5cGUodHlwZSk7XHJcbiAgICB0aGlzLmNhcmRzQ29sbGVjdGlvbiA9IG51bGw7XHJcbiAgICB0aGlzLmdhbWVDYXRkc0NvbGxlY3Rpb24gPSBudWxsO1xyXG4gICAgdGhpcy5lbGVtZW50ID0gbnVsbDtcclxuXHJcbiAgICB0aGlzLmJ1aWxkKCk7XHJcbiAgfVxyXG5cclxuICBidWlsZCgpIHtcclxuICAgIGNvbnN0IGNvbnRlbnRXcmFwcGVyID0gY3JlYXRlQ3VzdG9tRWxlbWVudCgnZGl2JywgJ2NvbnRlbnQtd3JhcHBlcicpO1xyXG4gICAgbGV0IGNvbnRlbnRFbGVtZW50O1xyXG5cclxuICAgIHN3aXRjaCAodGhpcy50eXBlKSB7XHJcbiAgICAgIGNhc2UgJ3N0YXRpc3RpYyc6XHJcbiAgICAgICAgaWYgKCF0aGlzLmFwcENvbnRyb2wuc3RhdC5zb3J0ZWQpIHtcclxuICAgICAgICAgIHRoaXMuYXBwQ29udHJvbC5zdGF0LmJ1aWxkKCk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIHRoaXMuYXBwQ29udHJvbC5zdGF0LnNvcnRlZCA9IGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjb250ZW50RWxlbWVudCA9IHRoaXMuYXBwQ29udHJvbC5zdGF0LmVsZW1lbnQ7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIGNhc2UgJ3RyYWluIGRpZmYnOlxyXG4gICAgICAgIHRoaXMuYXBwQ29udHJvbC5zdGF0LmJ1aWxkKCk7XHJcbiAgICAgICAgY29udGVudEVsZW1lbnQgPSB0aGlzLmFwcENvbnRyb2wuc3RhdC5lbGVtZW50O1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBjYXNlICdtYWluIHBhZ2UnOlxyXG4gICAgICAgIGNvbnRlbnRFbGVtZW50ID0gdGhpcy5jcmVhdGVNYWluQ2FyZHNDb250YWluZXIoKTtcclxuICAgICAgICBicmVhaztcclxuICAgICAgY2FzZSAndG9waWMnOiB7XHJcbiAgICAgICAgY29udGVudEVsZW1lbnQgPSB0aGlzLmNyZWF0ZVRvcGljQ2FyZHNDb250YWluZXIoKTtcclxuICAgICAgICBicmVhaztcclxuICAgICAgfVxyXG4gICAgICBkZWZhdWx0OlxyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnRlbnRXcmFwcGVyLmFwcGVuZChjb250ZW50RWxlbWVudCk7XHJcbiAgICB0aGlzLmVsZW1lbnQgPSBjb250ZW50V3JhcHBlcjtcclxuXHJcbiAgICByZXR1cm4gdGhpcztcclxuICB9XHJcblxyXG4gIGNyZWF0ZU1haW5DYXJkc0NvbnRhaW5lcigpIHtcclxuICAgIGNvbnN0IG1haW5Db250YWluZXJFbGVtZW50ID0gY3JlYXRlQ3VzdG9tRWxlbWVudCgnZGl2JywgJ2NhcmQtY29udGFpbmVyJyk7XHJcbiAgICB0aGlzLnRvcGljc0Fyci5mb3JFYWNoKCh0b3BpYywgaW5kZXgpID0+IHtcclxuICAgICAgY29uc3QgY2FyZE9iaiA9IHtcclxuICAgICAgICBjYXJkTmFtZTogdG9waWMsXHJcbiAgICAgICAgaW1hZ2U6IHRoaXMuY2FyZHNBcnJbaW5kZXhdWzBdLmltYWdlLFxyXG4gICAgICB9O1xyXG4gICAgICBtYWluQ29udGFpbmVyRWxlbWVudC5hcHBlbmQobmV3IENhcmQodGhpcy5hcHBDb250cm9sLCBjYXJkT2JqKS5lbGVtZW50KTtcclxuICAgIH0pO1xyXG5cclxuICAgIHJldHVybiBtYWluQ29udGFpbmVyRWxlbWVudDtcclxuICB9XHJcblxyXG4gIGNyZWF0ZVRvcGljQ2FyZHNDb250YWluZXIoKSB7XHJcbiAgICBjb25zdCBjYXJkc0NvbnRhaW5lckVsZW1lbnQgPSBjcmVhdGVDdXN0b21FbGVtZW50KCdkaXYnLCAnY2FyZC1jb250YWluZXInKTtcclxuICAgIGNvbnN0IGNhcmRJbmRleCA9IHRoaXMudG9waWNzQXJyLmZpbmRJbmRleCgoaXRlbSkgPT4ge1xyXG4gICAgICBjb25zdCByZXN1bHQgPSBpdGVtLnRvTG93ZXJDYXNlKCkgPT09IHRoaXMuYXBwQ29udHJvbC5hY3RpdmVQYWdlO1xyXG4gICAgICByZXR1cm4gcmVzdWx0O1xyXG4gICAgfSk7XHJcblxyXG4gICAgdGhpcy5jYXJkc0FycltjYXJkSW5kZXhdLmZvckVhY2goKGNhcmRPYmopID0+IHtcclxuICAgICAgY2FyZHNDb250YWluZXJFbGVtZW50LmFwcGVuZChuZXcgQ2FyZCh0aGlzLmFwcENvbnRyb2wsIGNhcmRPYmosIHRoaXMudHlwZSkuZWxlbWVudCk7XHJcbiAgICB9KTtcclxuXHJcbiAgICByZXR1cm4gY2FyZHNDb250YWluZXJFbGVtZW50O1xyXG4gIH1cclxuXHJcbiAgYWRkVG9Eb2MoKSB7XHJcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdtYWluJykuYXBwZW5kKHRoaXMuZWxlbWVudCk7XHJcbiAgICBbdGhpcy5lbGVtZW50XSA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ2NvbnRlbnQtd3JhcHBlcicpO1xyXG4gICAgdGhpcy5jYXJkc0NvbGxlY3Rpb24gPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdjYXJkJyk7XHJcbiAgICB0aGlzLmdhbWVDYXJkc0NvbGxlY3Rpb24gPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdnYW1lLWNhcmQnKTtcclxuICAgIHJldHVybiB0aGlzO1xyXG4gIH1cclxuXHJcbiAgY2xlYXIoKSB7XHJcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuY29udGVudC13cmFwcGVyJykucmVtb3ZlKCk7XHJcbiAgICByZXR1cm4gdGhpcztcclxuICB9XHJcblxyXG4gIGNoYW5nZUNvbnRlbnQobWVudVRvcGljTmFtZSkge1xyXG4gICAgdGhpcy50eXBlID0gdGhpcy5nZXRWYWxpZFRvcGljVHlwZShtZW51VG9waWNOYW1lKTtcclxuICAgIHRoaXMuYXBwQ29udHJvbC5nYW1lQ29udHJvbFxyXG4gICAgICAuZW5kR2FtZSgpO1xyXG5cclxuICAgIHRoaXNcclxuICAgICAgLmJ1aWxkKClcclxuICAgICAgLmNsZWFyKClcclxuICAgICAgLmFkZFRvRG9jKCk7XHJcbiAgICByZXR1cm4gdGhpcztcclxuICB9XHJcblxyXG4gIGlzRWxlbWVudEluQ2FyZChlbGVtZW50KSB7XHJcbiAgICByZXR1cm4gKHRoaXMudmFsaWRDYXJkQ2xhc3Nlcy5zb21lKChjbGFzc05hbWUpID0+IGVsZW1lbnQuY2xhc3NMaXN0LmNvbnRhaW5zKGNsYXNzTmFtZSkpKTtcclxuICB9XHJcblxyXG4gIGdldFZhbGlkVHlwZSh0eXBlKSB7XHJcbiAgICBpZiAodGhpcy52YWxpZFR5cGVzLmluY2x1ZGVzKHR5cGUpKSB7XHJcbiAgICAgIHJldHVybiB0eXBlO1xyXG4gICAgfVxyXG4gICAgdGhyb3cgbmV3IEVycm9yKCd3cm9uZyB0eXBlIG9mIE9iamVjdCcpO1xyXG4gIH1cclxuXHJcbiAgZ2V0VmFsaWRUb3BpY1R5cGUobWVudVRvcGljTmFtZSkge1xyXG4gICAgY29uc3QgY3VyZW50TWVudVRvcGljTmFtZSA9IG1lbnVUb3BpY05hbWUudG9Mb3dlckNhc2UoKTtcclxuICAgIGlmICh0aGlzLnZhbGlkVHlwZXMuaW5jbHVkZXMoY3VyZW50TWVudVRvcGljTmFtZSkpIHtcclxuICAgICAgcmV0dXJuIGN1cmVudE1lbnVUb3BpY05hbWU7XHJcbiAgICB9IGlmICh0aGlzLnRvcGljc0Fyci5tYXAoKGl0ZW0pID0+IGl0ZW0udG9Mb3dlckNhc2UoKSkuaW5jbHVkZXMoY3VyZW50TWVudVRvcGljTmFtZSkpIHtcclxuICAgICAgcmV0dXJuICd0b3BpYyc7XHJcbiAgICB9XHJcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ3dyb25nIG1lbnUgdG9waWMgTmFtZScpO1xyXG4gIH1cclxuXHJcbiAgZ2V0Q2FyZE9iakJ5V29yZCh3b3JkKSB7XHJcbiAgICByZXR1cm4gdGhpcy5jYXJkc0Fyci5mbGF0KCkuZmluZCgoY2FyZE9iaikgPT4gY2FyZE9iai53b3JkID09PSB3b3JkKTtcclxuICB9XHJcblxyXG4gIGdldENhcmRPYmpCeUltYWdlTmFtZShpbWFnZU5hbWUpIHtcclxuICAgIHJldHVybiB0aGlzLmNhcmRzQXJyLmZsYXQoKS5maW5kKChjYXJkT2JqKSA9PiBjYXJkT2JqLmltYWdlID09PSBgaW1nLyR7aW1hZ2VOYW1lfS5qcGdgKTtcclxuICB9XHJcblxyXG4gIGdldENhcmRPYmpCeVRyYW5zbGF0aW9uKHRyYW5zbGF0aW9uKSB7XHJcbiAgICByZXR1cm4gdGhpcy5jYXJkc0Fyci5mbGF0KCkuZmluZCgoY2FyZE9iaikgPT4gY2FyZE9iai50cmFuc2xhdGlvbiA9PT0gdHJhbnNsYXRpb24pO1xyXG4gIH1cclxuXHJcbiAgZ2V0Q2FyZEVsZW1lbnRCeVRhcmdldCh0YXJnZXRFbGVtZW50KSB7XHJcbiAgICBsZXQgc2VhcmNoRWxlbWVudCA9IHRhcmdldEVsZW1lbnQ7XHJcbiAgICB3aGlsZSAoIXNlYXJjaEVsZW1lbnQuY2xhc3NMaXN0LmNvbnRhaW5zKCdjYXJkJykpIHtcclxuICAgICAgc2VhcmNoRWxlbWVudCA9IHNlYXJjaEVsZW1lbnQucGFyZW50RWxlbWVudDtcclxuICAgIH1cclxuICAgIHJldHVybiBzZWFyY2hFbGVtZW50O1xyXG4gIH1cclxuXHJcbiAgZ2V0Q2FyZElubmVyVGV4dChjYXJkRWxlbWVudCkge1xyXG4gICAgcmV0dXJuIGNhcmRFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJ3AnKS5pbm5lckhUTUw7XHJcbiAgfVxyXG5cclxuICBnZXRDYXJkSW1hZ2VOYW1lKGNhcmRFbGVtZW50KSB7XHJcbiAgICBjb25zdCBpbWFnZVNyYyA9IGNhcmRFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJy5jYXJkLWltYWdlJykuc3JjO1xyXG4gICAgY29uc3QgaW1hZ2VOYW1lID0gaW1hZ2VTcmMubWF0Y2goLyg/PD1cXC8pXFx3Kyg/PVxcLmpwZykvKVswXTtcclxuICAgIHJldHVybiBpbWFnZU5hbWU7XHJcbiAgfVxyXG5cclxuICBmbGlwQ2FyZChjYXJkRWxlbWVudCkge1xyXG4gICAgY29uc3QgY2FyZFBhcmFncmFwaCA9IGNhcmRFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJ3AnKTtcclxuICAgIGNvbnN0IGNhcmRGbGlwQnV0dG9uID0gY2FyZEVsZW1lbnQucXVlcnlTZWxlY3RvcignLmNhcmQtZmxpcC1idXR0b24nKTtcclxuICAgIGNvbnN0IGNhcmRJbWFnZU5hbWUgPSB0aGlzLmdldENhcmRJbWFnZU5hbWUoY2FyZEVsZW1lbnQpO1xyXG4gICAgY29uc3QgY2FyZE9iaiA9IHRoaXMuZ2V0Q2FyZE9iakJ5SW1hZ2VOYW1lKGNhcmRJbWFnZU5hbWUpO1xyXG5cclxuICAgIGNhcmRFbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUoJ3VuZmxpcHBlZCcpO1xyXG4gICAgY2FyZEVsZW1lbnQuY2xhc3NMaXN0LmFkZCgnZmxpcHBlZCcpO1xyXG4gICAgY2FyZEVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcclxuICAgICAgJ3BvaW50ZXJsZWF2ZScsXHJcbiAgICAgICgpID0+IHtcclxuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgIHRoaXMudW5mbGlwQ2FyZChjYXJkRWxlbWVudCk7XHJcbiAgICAgICAgfSwgNTAwKTtcclxuICAgICAgfSxcclxuICAgICAgeyBvbmNlOiB0cnVlIH0sXHJcbiAgICApO1xyXG5cclxuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICBjYXJkUGFyYWdyYXBoLmlubmVySFRNTCA9IGNhcmRPYmoudHJhbnNsYXRpb247XHJcbiAgICAgIGNhcmRGbGlwQnV0dG9uLmhpZGRlbiA9IHRydWU7XHJcbiAgICB9LCA1MDApO1xyXG5cclxuICAgIHJldHVybiB0aGlzO1xyXG4gIH1cclxuXHJcbiAgdW5mbGlwQ2FyZChjYXJkRWxlbWVudCkge1xyXG4gICAgY2FyZEVsZW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcigncG9pbnRlcmxlYXZlJywgKGV2ZW50KSA9PiB1bmhvdmVyQ2FyZChldmVudCwgY2FyZEVsZW1lbnQsIHRoaXMpKTtcclxuXHJcbiAgICBpZiAoY2FyZEVsZW1lbnQuY2xhc3NMaXN0LmNvbnRhaW5zKCdmbGlwcGVkJykpIHtcclxuICAgICAgY29uc3QgY2FyZFBhcmFncmFwaCA9IGNhcmRFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJ3AnKTtcclxuICAgICAgY29uc3QgY2FyZEZsaXBCdXR0b24gPSBjYXJkRWxlbWVudC5xdWVyeVNlbGVjdG9yKCcuY2FyZC1mbGlwLWJ1dHRvbicpO1xyXG4gICAgICBjb25zdCBjYXJkV29yZCA9IGNhcmRQYXJhZ3JhcGguaW5uZXJIVE1MO1xyXG4gICAgICBjb25zdCBjYXJkT2JqID0gdGhpcy5nZXRDYXJkT2JqQnlUcmFuc2xhdGlvbihjYXJkV29yZCk7XHJcblxyXG4gICAgICBjYXJkRWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKCdmbGlwcGVkJyk7XHJcbiAgICAgIGNhcmRFbGVtZW50LmNsYXNzTGlzdC5hZGQoJ3VuZmxpcHBlZCcpO1xyXG4gICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICBjYXJkUGFyYWdyYXBoLmlubmVySFRNTCA9IGNhcmRPYmoud29yZDtcclxuICAgICAgICBjYXJkRmxpcEJ1dHRvbi5oaWRkZW4gPSBmYWxzZTtcclxuICAgICAgfSwgNTAwKTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gdGhpcztcclxuICB9XHJcblxyXG4gIHJlbW92ZUNhcmRzKCkge1xyXG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmNhcmQtY29udGFpbmVyJykucmVtb3ZlKCk7XHJcbiAgICByZXR1cm4gdGhpcztcclxuICB9XHJcblxyXG4gIHBsYXlGaW5hbENsaXAod3JvbmdBbnN3ZXJzKSB7XHJcbiAgICBjb25zdCBjbGlwVHlwZSA9ICh3cm9uZ0Fuc3dlcnMgPT09IDApID8gJ3N1Y2Nlc3MnIDogJ2ZhaWx1cmUnO1xyXG4gICAgY29uc3QgY2xhc3NOYW1lcyA9ICdmaW5hbC1jbGlwJztcclxuICAgIGNvbnN0IGltYWdlU3JjID0gYGFwcC8ke2NsaXBUeXBlfS5qcGdgO1xyXG5cclxuICAgIGNvbnN0IHRlbXBsYXRlID0gYFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImdyYXBoaWNcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGltZyBzcmM9XCIuLi9hc3NldHMvaW1nLyR7aW1hZ2VTcmN9XCIgYWx0PVwiaW1hZ2UgJHtjbGlwVHlwZX1cIiB3aWR0aD1cIjQwMFwiIGhlaWdodD1cIjQwMFwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBgO1xyXG5cclxuICAgIGNvbnN0IGZpbmFsQ2xpcEVsZW1lbnQgPSBjcmVhdGVDdXN0b21FbGVtZW50KCdkaXYnLCBjbGFzc05hbWVzLCB0ZW1wbGF0ZSk7XHJcbiAgICBpZiAoY2xpcFR5cGUgPT09ICdmYWlsdXJlJykge1xyXG4gICAgICBmaW5hbENsaXBFbGVtZW50LmlubmVySFRNTCArPSBgPHAgY2xhc3M9XCJtaXN0YWtlcy1udW1iZXJcIj5NaXN0YWtlczogJHt3cm9uZ0Fuc3dlcnN9PC9wPmA7XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5hcHBDb250cm9sLnBsYXlBcHBTb3VuZChjbGlwVHlwZSk7XHJcbiAgICB0aGlzLnJlbW92ZUNhcmRzKCk7XHJcbiAgICB0aGlzLmVsZW1lbnQuYXBwZW5kKGZpbmFsQ2xpcEVsZW1lbnQpO1xyXG5cclxuICAgIHJldHVybiB0aGlzO1xyXG4gIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgQ29udGVudENvbnRhaW5lcjtcclxuIiwiLyogZXNsaW50LWRpc2FibGUgbGluZWJyZWFrLXN0eWxlICovXHJcbi8qIGVzbGludC1kaXNhYmxlIG5vLXJlc3RyaWN0ZWQtc3ludGF4ICovXHJcbi8qIGVzbGludC1kaXNhYmxlIGxpbmVicmVhay1zdHlsZSAqL1xyXG4vKiBlc2xpbnQtZGlzYWJsZSBuby1jb25zb2xlICovXHJcbi8qIGVzbGludC1kaXNhYmxlIGxpbmVicmVhay1zdHlsZSAqL1xyXG4vKiBlc2xpbnQtZGlzYWJsZSBuby11bmRlZiAqL1xyXG5pbXBvcnQgU3RhciBmcm9tICcuL3N0YXInO1xyXG5pbXBvcnQge1xyXG4gIGNyZWF0ZUN1c3RvbUVsZW1lbnQsXHJcbiAgZ2V0UmFuZG9tSW50LFxyXG59IGZyb20gJy4vY29tbW9uRnVuY3QnO1xyXG5cclxuY2xhc3MgZ2FtZUNvbnRyb2wge1xyXG4gIGNvbnN0cnVjdG9yKGFwcENvbnRyb2wpIHtcclxuICAgIHRoaXMuYXBwQ29udHJvbCA9IGFwcENvbnRyb2w7XHJcbiAgICB0aGlzLnF1ZXN0aW9uc0J1bmRsZSA9IFtdO1xyXG4gICAgdGhpcy5pc0dhbWVTdGFydGVkID0gZmFsc2U7XHJcbiAgICB0aGlzLmNvcnJlY3RTdGFyRWxlbWVudCA9IG5ldyBTdGFyKCkuZWxlbWVudDtcclxuICAgIHRoaXMud3JvbmdTdGFyRWxlbWVudCA9IG5ldyBTdGFyKCd3cm9uZycpLmVsZW1lbnQ7XHJcblxyXG4gICAgdGhpcy5hY3RpdmVRdWVzdGlvbiA9IG51bGw7XHJcbiAgICB0aGlzLmVsZW1lbnQgPSBudWxsO1xyXG4gICAgdGhpcy5saXZlRWxlbWVudCA9IG51bGw7XHJcbiAgICB0aGlzLmxpdmVCdXR0b25FbGVtZW50ID0gbnVsbDtcclxuICAgIHRoaXMubGl2ZUluZGljYXRvckVsZW1lbnQgPSBudWxsO1xyXG4gICAgdGhpcy5saXZlQ29ycmVjdFByRWxlbWVudCA9IG51bGw7XHJcbiAgICB0aGlzLmxpdmVXcm9uZ1ByRWxlbWVudCA9IG51bGw7XHJcbiAgICB0aGlzLmxpdmVTdGFyc0NvbGxlY3Rpb24gPSBudWxsO1xyXG4gICAgdGhpcy5jb3JyZWN0QW5zd2VycyA9IG51bGw7XHJcbiAgICB0aGlzLndyb25nQW5zd2VycyA9IG51bGw7XHJcblxyXG4gICAgdGhpcy5idWlsZCgpO1xyXG4gIH1cclxuXHJcbiAgYnVpbGQoKSB7XHJcbiAgICBjb25zdCBjbGFzc05hbWVzID0gJ2dhbWUtY29udHJvbHMgaW5hY3RpdmUnO1xyXG4gICAgY29uc3QgdGVtcGxhdGUgPSBgXHJcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImJ1dHRvbiBnYW1lLWJ1dHRvbiBzdGFydC1idXR0b25cIj5cclxuICAgICAgICAgICAgICAgICAgICAgIEJ1dHRvblxyXG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJnYW1lLXByb2dyZXNzXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiZ2FtZS1pbmRpY2F0b3JcIj5cclxuICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICAgPHAgY2xhc3M9XCJnYW1lLXNjb3JlXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwicHJvZ3Jlc3MgY29ycmVjdFwiPjA8L3NwYW4+IHwgPHNwYW4gY2xhc3M9XCJwcm9ncmVzcyB3cm9uZ1wiPjA8L3NwYW4+XHJcbiAgICAgICAgICAgICAgICAgICAgICA8L3A+XHJcbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgYDtcclxuICAgIHRoaXMuZWxlbWVudCA9IGNyZWF0ZUN1c3RvbUVsZW1lbnQoJ2RpdicsIGNsYXNzTmFtZXMsIHRlbXBsYXRlKTtcclxuICAgIHJldHVybiB0aGlzO1xyXG4gIH1cclxuXHJcbiAgYWRkVG9Eb2MoKSB7XHJcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdoZWFkZXInKS5hcHBlbmQodGhpcy5lbGVtZW50KTtcclxuICAgIFt0aGlzLmxpdmVFbGVtZW50XSA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ2dhbWUtY29udHJvbHMnKTtcclxuICAgIFt0aGlzLmxpdmVCdXR0b25FbGVtZW50XSA9IHRoaXMubGl2ZUVsZW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnZ2FtZS1idXR0b24nKTtcclxuICAgIFt0aGlzLmxpdmVJbmRpY2F0b3JFbGVtZW50XSA9IHRoaXMubGl2ZUVsZW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnZ2FtZS1pbmRpY2F0b3InKTtcclxuICAgIFt0aGlzLmxpdmVDb3JyZWN0UHJFbGVtZW50LCB0aGlzLmxpdmVXcm9uZ1ByRWxlbWVudF0gPSB0aGlzLmxpdmVFbGVtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ3Byb2dyZXNzJyk7XHJcbiAgICB0aGlzLmxpdmVTdGFyc0NvbGxlY3Rpb24gPSB0aGlzLmxpdmVFbGVtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ3N0YXInKTtcclxuXHJcbiAgICByZXR1cm4gdGhpcztcclxuICB9XHJcblxyXG4gIHNob3coKSB7XHJcbiAgICB0aGlzLmxpdmVFbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUoJ2luYWN0aXZlJyk7XHJcbiAgICByZXR1cm4gdGhpcztcclxuICB9XHJcblxyXG4gIGhpZGUoKSB7XHJcbiAgICB0aGlzLmxpdmVFbGVtZW50LmNsYXNzTGlzdC5hZGQoJ2luYWN0aXZlJyk7XHJcbiAgICByZXR1cm4gdGhpcztcclxuICB9XHJcblxyXG4gIHNob3dHYW1lU3RhdCgpIHtcclxuICAgIHJldHVybiB0aGlzO1xyXG4gIH1cclxuXHJcbiAgY3JlYXRlUmFuZG9tUXVlc3Rpb25zQnVuZGxlKGFyck9wdGlvbnMpIHtcclxuICAgIHRoaXMucXVlc3Rpb25zQnVuZGxlID0gW107XHJcbiAgICBjb25zdCB3b3JrQXJyID0gYXJyT3B0aW9ucy5tYXAoKGl0ZW0pID0+IGl0ZW0pO1xyXG4gICAgd2hpbGUgKHRoaXMucXVlc3Rpb25zQnVuZGxlLmxlbmd0aCA8IGFyck9wdGlvbnMubGVuZ3RoKSB7XHJcbiAgICAgIGNvbnN0IHJhbmRvbUluZGV4ID0gZ2V0UmFuZG9tSW50KHdvcmtBcnIubGVuZ3RoIC0gMSk7XHJcbiAgICAgIHRoaXMucXVlc3Rpb25zQnVuZGxlLnB1c2goLi4ud29ya0Fyci5zcGxpY2UocmFuZG9tSW5kZXgsIDEpKTtcclxuICAgIH1cclxuICAgIHJldHVybiB0aGlzO1xyXG4gIH1cclxuXHJcbiAgc3RhcnRHYW1lKGFyck9wdGlvbnMpIHtcclxuICAgIHRoaXMuaXNHYW1lU3RhcnRlZCA9IHRydWU7XHJcbiAgICB0aGlzLmNvcnJlY3RBbnN3ZXJzID0gMDtcclxuICAgIHRoaXMud3JvbmdBbnN3ZXJzID0gMDtcclxuICAgIHRoaXMuc2hvd0dhbWVTdGF0KCk7IC8vICBpc25gdCB3cml0dGVuXHJcbiAgICB0aGlzLmNyZWF0ZVJhbmRvbVF1ZXN0aW9uc0J1bmRsZShhcnJPcHRpb25zKTtcclxuICAgIHRoaXMuYXNrUXVlc3Rpb24oKTtcclxuICAgIHRoaXMuY2hhbmdlQnV0dG9uQ2xhc3MoJ3JlcGVhdC1idXR0b24nKTtcclxuICAgIHJldHVybiB0aGlzO1xyXG4gIH1cclxuXHJcbiAgZW5kR2FtZSgpIHtcclxuICAgIHRoaXMuaXNHYW1lU3RhcnRlZCA9IGZhbHNlO1xyXG4gICAgdGhpcy5hY3RpdmVRdWVzdGlvbiA9IG51bGw7XHJcbiAgICB0aGlzLmNoYW5nZUJ1dHRvbkNsYXNzKCdzdGFydC1idXR0b24nKTtcclxuXHJcbiAgICBpZiAodGhpcy5jb3JyZWN0QW5zd2VycyA9PT0gdGhpcy5hcHBDb250cm9sLmNvbnRlbnQuZ2FtZUNhcmRzQ29sbGVjdGlvbi5sZW5ndGhcclxuICAgICAgICAmJiB0aGlzLmNvcnJlY3RBbnN3ZXJzICE9PSAwKSB7XHJcbiAgICAgIHRoaXMuYXBwQ29udHJvbC5jb250ZW50LnBsYXlGaW5hbENsaXAodGhpcy53cm9uZ0Fuc3dlcnMpO1xyXG4gICAgICB0aGlzLmNvcnJlY3RBbnN3ZXJzID0gMDtcclxuICAgICAgdGhpcy53cm9uZ0Fuc3dlcnMgPSAwO1xyXG5cclxuICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgdGhpcy5hcHBDb250cm9sLmNoYW5nZVBhZ2UoJ01haW4gcGFnZScpO1xyXG4gICAgICB9LCAzMDAwKTtcclxuXHJcbiAgICAgIHRoaXMuY29ycmVjdEFuc3dlcnMgPSAwO1xyXG4gICAgICB0aGlzLndyb25nQW5zd2VycyA9IDA7XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5saXZlQ29ycmVjdFByRWxlbWVudC5pbm5lckhUTUwgPSAnMCc7XHJcbiAgICB0aGlzLmxpdmVXcm9uZ1ByRWxlbWVudC5pbm5lckhUTUwgPSAnMCc7XHJcbiAgICB0aGlzLmxpdmVJbmRpY2F0b3JFbGVtZW50LmlubmVySFRNTCA9ICcnO1xyXG4gICAgcmV0dXJuIHRoaXM7XHJcbiAgfVxyXG5cclxuICBhc2tRdWVzdGlvbigpIHtcclxuICAgIGlmICh0aGlzLnF1ZXN0aW9uc0J1bmRsZS5sZW5ndGggIT09IDApIHtcclxuICAgICAgdGhpcy5hY3RpdmVRdWVzdGlvbiA9IHRoaXMucXVlc3Rpb25zQnVuZGxlLnBvcCgpO1xyXG4gICAgICB0aGlzLmFwcENvbnRyb2wucGxheUNhcmRTb3VuZCh0aGlzLmFjdGl2ZVF1ZXN0aW9uKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMuZW5kR2FtZSgpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHRoaXM7XHJcbiAgfVxyXG5cclxuICBwcm9jZXNzQW5zd2VyKGNhcmRPYmosIGNhcmRFbGVtZW50KSB7XHJcbiAgICBpZiAodGhpcy5saXZlU3RhcnNDb2xsZWN0aW9uLmxlbmd0aCA+PSA1KSB7XHJcbiAgICAgIHRoaXMubGl2ZUluZGljYXRvckVsZW1lbnQuZmlyc3RFbGVtZW50Q2hpbGQucmVtb3ZlKCk7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKE9iamVjdC5lbnRyaWVzKHRoaXMuYWN0aXZlUXVlc3Rpb24pLmV2ZXJ5KChba2V5LCB2YWx1ZV0pID0+IHZhbHVlID09PSBjYXJkT2JqW2tleV0pKSB7XHJcbiAgICAgIHRoaXMuY29ycmVjdEFuc3dlcih0aGlzLmFjdGl2ZVF1ZXN0aW9uKTtcclxuICAgICAgY2FyZEVsZW1lbnQuY2xhc3NMaXN0LmFkZCgnZGlzYWJsZWQnKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMud3JvbmdBbnN3ZXIodGhpcy5hY3RpdmVRdWVzdGlvbik7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHRoaXM7XHJcbiAgfVxyXG5cclxuICBjb3JyZWN0QW5zd2VyKGNhcmRPYmopIHtcclxuICAgIHRoaXMuYXBwQ29udHJvbC5wbGF5QXBwU291bmQoJ2NvcnJlY3QnKTtcclxuICAgIHRoaXMuY29ycmVjdEFuc3dlcnMgKz0gMTtcclxuICAgIHRoaXMuYXBwQ29udHJvbC5zdGF0LnN0b3JhZ2UuYWRkKCdjb3JyZWN0JywgY2FyZE9iaik7XHJcbiAgICB0aGlzLmxpdmVDb3JyZWN0UHJFbGVtZW50LmlubmVySFRNTCA9IHRoaXMuY29ycmVjdEFuc3dlcnM7XHJcbiAgICB0aGlzLmxpdmVJbmRpY2F0b3JFbGVtZW50LmFwcGVuZChuZXcgU3RhcigpLmVsZW1lbnQpO1xyXG4gICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgIHRoaXMuYXNrUXVlc3Rpb24oKTtcclxuICAgIH0sIDEwMDApO1xyXG5cclxuICAgIHJldHVybiB0aGlzO1xyXG4gIH1cclxuXHJcbiAgd3JvbmdBbnN3ZXIoY2FyZE9iaikge1xyXG4gICAgdGhpcy5hcHBDb250cm9sLnBsYXlBcHBTb3VuZCgnd3JvbmcnKTtcclxuICAgIHRoaXMud3JvbmdBbnN3ZXJzICs9IDE7XHJcbiAgICB0aGlzLmFwcENvbnRyb2wuc3RhdC5zdG9yYWdlLmFkZCgnd3JvbmcnLCBjYXJkT2JqKTtcclxuICAgIHRoaXMubGl2ZVdyb25nUHJFbGVtZW50LmlubmVySFRNTCA9IHRoaXMud3JvbmdBbnN3ZXJzO1xyXG4gICAgdGhpcy5saXZlSW5kaWNhdG9yRWxlbWVudC5hcHBlbmQobmV3IFN0YXIoJ3dyb25nJykuZWxlbWVudCk7XHJcbiAgICByZXR1cm4gdGhpcztcclxuICB9XHJcblxyXG4gIHJlcGVhdFF1ZXN0aW9uKCkge1xyXG4gICAgdGhpcy5hcHBDb250cm9sLnBsYXlDYXJkU291bmQodGhpcy5hY3RpdmVRdWVzdGlvbik7XHJcbiAgICByZXR1cm4gdGhpcztcclxuICB9XHJcblxyXG4gIGNoYW5nZUJ1dHRvbkNsYXNzKGJ1dHRvbkNsYXNzTmFtZSkge1xyXG4gICAgY29uc3QgcmVtb3ZlZENsYXNzTmFtZSA9IChidXR0b25DbGFzc05hbWUgPT09ICdzdGFydC1idXR0b24nKSA/ICdyZXBlYXQtYnV0dG9uJyA6ICdzdGFydC1idXR0b24nO1xyXG4gICAgdGhpcy5saXZlQnV0dG9uRWxlbWVudC5jbGFzc0xpc3QuYWRkKGJ1dHRvbkNsYXNzTmFtZSk7XHJcbiAgICB0aGlzLmxpdmVCdXR0b25FbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUocmVtb3ZlZENsYXNzTmFtZSk7XHJcbiAgICByZXR1cm4gdGhpcztcclxuICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IGdhbWVDb250cm9sO1xyXG4iLCIvKiBlc2xpbnQtZGlzYWJsZSBsaW5lYnJlYWstc3R5bGUgKi9cclxuLyogZXNsaW50LWRpc2FibGUgbm8tY29uc29sZSAqL1xyXG4vKiBlc2xpbnQtZGlzYWJsZSBsaW5lYnJlYWstc3R5bGUgKi9cclxuLyogZXNsaW50LWRpc2FibGUgY29uc2lzdGVudC1yZXR1cm4gKi9cclxuLyogZXNsaW50LWRpc2FibGUgbm8tcmVzdHJpY3RlZC1zeW50YXggKi9cclxuLyogZXNsaW50LWRpc2FibGUgbm8tdW5kZWYgKi9cclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE1lbnVFbGVtZW50IHtcclxuICBjb25zdHJ1Y3Rvcih0b3BpY3NBcnIsIHN0YXJ0TWVudSA9ICdNYWluIHBhZ2UnLCBlbmRNZW51ID0gJ1N0YXRpc3RpYycpIHtcclxuICAgIHRoaXMub3BlbmVkTWVudUNvbGxlY3Rpb25zID0gW1xyXG4gICAgICBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZSgnYm9keScpLFxyXG4gICAgICBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdtZW51JyksXHJcbiAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ21lbnUtYnV0dG9uJyksXHJcbiAgICBdO1xyXG4gICAgdGhpcy50b3BpY3NBcnIgPSB0b3BpY3NBcnI7XHJcbiAgICB0aGlzLnN0YXJ0TWVudSA9IHN0YXJ0TWVudTtcclxuICAgIHRoaXMuZW5kTWVudSA9IGVuZE1lbnU7XHJcbiAgICB0aGlzLmFjdGl2ZVBhZ2UgPSB0aGlzLnN0YXJ0TWVudS50b0xvd2VyQ2FzZSgpO1xyXG4gICAgdGhpcy5tZW51SXRlbXNFbGVtZW50cyA9IG51bGw7XHJcbiAgICB0aGlzLmVsZW1lbnQgPSBudWxsO1xyXG5cclxuICAgIHRoaXMuYnVpbGQoKTtcclxuICB9XHJcblxyXG4gIGJ1aWxkKCkge1xyXG4gICAgZnVuY3Rpb24gY3JlYXRlTGkodG9waWNOYW1lID0gJycpIHtcclxuICAgICAgY29uc3QgZWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xpJyk7XHJcbiAgICAgIGVsZW1lbnQuY2xhc3NOYW1lID0gJ2J1dHRvbiBtZW51LWl0ZW0nO1xyXG4gICAgICBlbGVtZW50LmlubmVySFRNTCA9IHRvcGljTmFtZTtcclxuICAgICAgcmV0dXJuIGVsZW1lbnQ7XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgdWxFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndWwnKTtcclxuICAgIHVsRWxlbWVudC5jbGFzc05hbWUgPSAnbWVudS1saXN0JztcclxuXHJcbiAgICB1bEVsZW1lbnQuYXBwZW5kKGNyZWF0ZUxpKHRoaXMuc3RhcnRNZW51KSk7XHJcbiAgICB0aGlzLnRvcGljc0Fyci5mb3JFYWNoKCh0b3BpY05hbWUpID0+IHVsRWxlbWVudC5hcHBlbmQoY3JlYXRlTGkodG9waWNOYW1lKSkpO1xyXG4gICAgdWxFbGVtZW50LmFwcGVuZChjcmVhdGVMaSh0aGlzLmVuZE1lbnUpKTtcclxuXHJcbiAgICBjb25zdCBtZW51RWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ25hdicpO1xyXG4gICAgbWVudUVsZW1lbnQuY2xhc3NOYW1lID0gJ21lbnUnO1xyXG4gICAgbWVudUVsZW1lbnQuYXBwZW5kKHVsRWxlbWVudCk7XHJcbiAgICB0aGlzLmVsZW1lbnQgPSBtZW51RWxlbWVudDtcclxuICAgIHJldHVybiB0aGlzO1xyXG4gIH1cclxuXHJcbiAgYWRkVG9Eb2MoKSB7XHJcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubWFpbi1jb250cm9scycpLnByZXBlbmQodGhpcy5lbGVtZW50KTtcclxuICAgIHRoaXMubWVudUl0ZW1zRWxlbWVudHMgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdtZW51LWl0ZW0nKTtcclxuICAgIHRoaXMuc2V0QWN0aXZlVG9waWModGhpcy5tZW51SXRlbXNFbGVtZW50c1swXS5pbm5lckhUTUwpO1xyXG4gICAgcmV0dXJuIHRoaXM7XHJcbiAgfVxyXG5cclxuICB0b2dnbGUoKSB7XHJcbiAgICB0aGlzLm9wZW5lZE1lbnVDb2xsZWN0aW9ucy5tYXAoKGh0bWxDb2xsZWN0aW9uKSA9PiBodG1sQ29sbGVjdGlvblswXS5jbGFzc0xpc3QudG9nZ2xlKCdvcGVuZWQtbWVudScpKTtcclxuICAgIHJldHVybiB0aGlzO1xyXG4gIH1cclxuXHJcbiAgY2xvc2UoKSB7XHJcbiAgICB0aGlzLm9wZW5lZE1lbnVDb2xsZWN0aW9ucy5tYXAoKGh0bWxDb2xsZWN0aW9uKSA9PiBodG1sQ29sbGVjdGlvblswXS5jbGFzc0xpc3QucmVtb3ZlKCdvcGVuZWQtbWVudScpKTtcclxuICB9XHJcblxyXG4gIHNldEFjdGl2ZVRvcGljKHRvcGljTmFtZSkge1xyXG4gICAgY29uc3QgY2xhc3NOYW1lID0gJ2FjdGl2ZS1wYWdlJztcclxuICAgIGNvbnN0IHRvcGljRWxlbWVudCA9IHRoaXMuZ2V0TWVudUl0ZW1CeU5hbWUodG9waWNOYW1lKTtcclxuICAgIHRoaXMuYWN0aXZlUGFnZSA9IHRvcGljTmFtZS50b0xvd2VyQ2FzZSgpO1xyXG4gICAgZm9yIChjb25zdCBtZW51SXRlbUVsZW1lbnQgb2YgdGhpcy5tZW51SXRlbXNFbGVtZW50cykge1xyXG4gICAgICBtZW51SXRlbUVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZShjbGFzc05hbWUpO1xyXG4gICAgfVxyXG4gICAgdG9waWNFbGVtZW50LmNsYXNzTGlzdC5hZGQoY2xhc3NOYW1lKTtcclxuXHJcbiAgICByZXR1cm4gdGhpcztcclxuICB9XHJcblxyXG4gIGdldE1lbnVJdGVtQnlOYW1lKGl0ZW1OYW1lKSB7XHJcbiAgICBmb3IgKGNvbnN0IGVsZW1lbnQgb2YgdGhpcy5tZW51SXRlbXNFbGVtZW50cykge1xyXG4gICAgICBpZiAoZWxlbWVudC5pbm5lckhUTUwudG9Mb3dlckNhc2UoKSA9PT0gaXRlbU5hbWUudG9Mb3dlckNhc2UoKSkge1xyXG4gICAgICAgIHJldHVybiBlbGVtZW50O1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG59XHJcbiIsIi8qIGVzbGludC1kaXNhYmxlIGxpbmVicmVhay1zdHlsZSAqL1xyXG5cclxuaW1wb3J0IHsgY3JlYXRlQ3VzdG9tRWxlbWVudCB9IGZyb20gJy4vY29tbW9uRnVuY3QnO1xyXG5cclxuY2xhc3MgU3RhciB7XHJcbiAgY29uc3RydWN0b3IodHlwZSA9ICdjb3JyZWN0Jykge1xyXG4gICAgdGhpcy50eXBlID0gKHR5cGUgPT09ICdjb3JyZWN0JykgPyB0eXBlIDogJ3dyb25nJztcclxuICAgIGNvbnN0IGNsYXNzTmFtZXMgPSBgZ3JhcGhpYyBzdGFyIHN0YXItJHt0aGlzLnR5cGV9YDtcclxuICAgIGxldCBpbWFnZVNyYztcclxuXHJcbiAgICBpZiAodGhpcy50eXBlID09PSAnY29ycmVjdCcpIHtcclxuICAgICAgaW1hZ2VTcmMgPSAnYXBwL3N0YXItd2luLnN2Zyc7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBpbWFnZVNyYyA9ICdhcHAvc3Rhci5zdmcnO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IHRlbXBsYXRlID0gYFxyXG4gICAgICAgICAgICAgICAgICAgICAgPGltZyBjbGFzcz1cInN0YXItaW1hZ2VcIiBzcmM9XCIuLi9hc3NldHMvaW1nLyR7aW1hZ2VTcmN9XCIgYWx0PVwiJHt0aGlzLnR5cGV9IHN0YXJcIiB3aWR0aD1cIjQwXCIgaGVpZ2h0PVwiNDBcIj5cclxuICAgICAgICAgICAgICAgICAgICAgIGA7XHJcbiAgICB0aGlzLmVsZW1lbnQgPSBjcmVhdGVDdXN0b21FbGVtZW50KCdkaXYnLCBjbGFzc05hbWVzLCB0ZW1wbGF0ZSk7XHJcbiAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBTdGFyO1xyXG4iLCIvKiBlc2xpbnQtZGlzYWJsZSBsaW5lYnJlYWstc3R5bGUgKi9cclxuLyogZXNsaW50LWRpc2FibGUgbm8tY29uc29sZSAqL1xyXG4vKiBlc2xpbnQtZGlzYWJsZSBsaW5lYnJlYWstc3R5bGUgKi9cclxuLyogZXNsaW50LWRpc2FibGUgbm8tdW5kZWYgKi9cclxuLyogZXNsaW50LWRpc2FibGUgbGluZWJyZWFrLXN0eWxlICovXHJcblxyXG5jbGFzcyBTdGF0U3RvcmFnZSB7XHJcbiAgY29uc3RydWN0b3IodG9waWNzQXJyLCBjYXJkc0Fycikge1xyXG4gICAgdGhpcy50b3BpY3NBcnIgPSB0b3BpY3NBcnI7XHJcbiAgICB0aGlzLmNhcmRzQXJyID0gY2FyZHNBcnI7XHJcbiAgICB0aGlzLnN0YXRBcnIgPSBKU09OLnBhcnNlKGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdFbmdsaXNoRm9yS2lkcycpIHx8IFtdKTtcclxuICAgIGlmICghdGhpcy5zdGF0QXJyKSB7XHJcbiAgICAgIHRoaXNcclxuICAgICAgICAuYnVpbGQoKVxyXG4gICAgICAgIC51cGRhdGVTdG9yYWdlKCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBidWlsZCgpIHtcclxuICAgIGNvbnN0IHN0YXREYXRhQXJyID0gW107XHJcbiAgICB0aGlzLnRvcGljc0Fyci5mb3JFYWNoKCh0b3BpTmFtZSwgaW5kZXgpID0+IHtcclxuICAgICAgY29uc3QgdG9waWNDYXJkc0FyciA9IHRoaXMuY2FyZHNBcnJbaW5kZXhdO1xyXG5cclxuICAgICAgdG9waWNDYXJkc0Fyci5mb3JFYWNoKCh3b3JkT2JqKSA9PiB7XHJcbiAgICAgICAgY29uc3Qgc3RhdFdvcmRPYmogPSB7XHJcbiAgICAgICAgICB0b3BpYzogdG9waU5hbWUsXHJcbiAgICAgICAgICB3b3JkOiB3b3JkT2JqLndvcmQsXHJcbiAgICAgICAgICB0cmFuc2xhdGlvbjogd29yZE9iai50cmFuc2xhdGlvbixcclxuICAgICAgICAgIHRyYWluQ2xpY2s6IDAsXHJcbiAgICAgICAgICBjb3JyZWN0QW5zd2VyczogMCxcclxuICAgICAgICAgIG1pc3Rha2VzOiAwLFxyXG4gICAgICAgICAgcGVyY2VudGFnZTogMCxcclxuICAgICAgICAgIGltYWdlOiB3b3JkT2JqLmltYWdlLFxyXG4gICAgICAgICAgYXVkaW9TcmM6IHdvcmRPYmouYXVkaW9TcmMsXHJcbiAgICAgICAgfTtcclxuICAgICAgICBzdGF0RGF0YUFyci5wdXNoKHN0YXRXb3JkT2JqKTtcclxuICAgICAgfSk7XHJcbiAgICB9KTtcclxuICAgIHRoaXMuc3RhdEFyciA9IHN0YXREYXRhQXJyO1xyXG4gICAgcmV0dXJuIHRoaXM7XHJcbiAgfVxyXG5cclxuICB1cGRhdGVTdG9yYWdlKCkge1xyXG4gICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ0VuZ2xpc2hGb3JLaWRzJywgSlNPTi5zdHJpbmdpZnkodGhpcy5zdGF0QXJyKSk7XHJcbiAgICByZXR1cm4gdGhpcztcclxuICB9XHJcblxyXG4gIGNsZWFuU3RvcmFnZSgpIHtcclxuICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdFbmdsaXNoRm9yS2lkcycsIEpTT04uc3RyaW5naWZ5KCcnKSk7XHJcbiAgICB0aGlzXHJcbiAgICAgIC5idWlsZCgpXHJcbiAgICAgIC51cGRhdGVTdG9yYWdlKCk7XHJcbiAgICByZXR1cm4gdGhpcztcclxuICB9XHJcblxyXG4gIGFkZCh0eXBlLCBjYXJkT2JqKSB7XHJcbiAgICBjb25zdCBvYmpJbmRleCA9IHRoaXMuc3RhdEFyci5maW5kSW5kZXgoKHdvcmRPYmopID0+IHtcclxuICAgICAgY29uc3QgcmVzdWx0ID0gKHdvcmRPYmoud29yZCA9PT0gY2FyZE9iai53b3JkKVxyXG4gICAgICAgICAgICAmJiAod29yZE9iai50cmFuc2xhdGlvbiA9PT0gY2FyZE9iai50cmFuc2xhdGlvbik7XHJcbiAgICAgIHJldHVybiByZXN1bHQ7XHJcbiAgICB9KTtcclxuXHJcbiAgICBzd2l0Y2ggKHR5cGUpIHtcclxuICAgICAgY2FzZSAnY2xpY2snOiB7XHJcbiAgICAgICAgdGhpcy5zdGF0QXJyW29iakluZGV4XS50cmFpbkNsaWNrICs9IDE7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIH1cclxuICAgICAgY2FzZSAnY29ycmVjdCc6IHtcclxuICAgICAgICB0aGlzLnN0YXRBcnJbb2JqSW5kZXhdLmNvcnJlY3RBbnN3ZXJzICs9IDE7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIH1cclxuICAgICAgY2FzZSAnd3JvbmcnOiB7XHJcbiAgICAgICAgdGhpcy5zdGF0QXJyW29iakluZGV4XS5taXN0YWtlcyArPSAxO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICB9XHJcbiAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgY29yckFuc3cgPSB0aGlzLnN0YXRBcnJbb2JqSW5kZXhdLmNvcnJlY3RBbnN3ZXJzO1xyXG4gICAgY29uc3Qgd3JvbmdBbnN3ID0gdGhpcy5zdGF0QXJyW29iakluZGV4XS5taXN0YWtlcztcclxuICAgIGlmIChjb3JyQW5zdyAmJiB3cm9uZ0Fuc3cpIHtcclxuICAgICAgdGhpcy5zdGF0QXJyW29iakluZGV4XS5wZXJjZW50YWdlID0gTWF0aC5yb3VuZCgoY29yckFuc3cgLyAoY29yckFuc3cgKyB3cm9uZ0Fuc3cpKSAqIDEwMCk7XHJcbiAgICB9IGVsc2UgaWYgKGNvcnJBbnN3KSB7XHJcbiAgICAgIHRoaXMuc3RhdEFycltvYmpJbmRleF0ucGVyY2VudGFnZSA9IDEwMDtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLnVwZGF0ZVN0b3JhZ2UoKTtcclxuICAgIHJldHVybiB0aGlzO1xyXG4gIH1cclxuXHJcbiAgZ2V0U29ydGVkQXJyQnlQcm9wKHByb3BlcnR5LCBzb3J0VHlwZSA9ICdkb3duJykge1xyXG4gICAgY29uc3Qgc29ydGVkQXJyID0gW107XHJcbiAgICB0aGlzLnN0YXRBcnIuZm9yRWFjaCgoaXRlbSkgPT4gc29ydGVkQXJyLnB1c2goaXRlbSkpO1xyXG5cclxuICAgIGZ1bmN0aW9uIGNvbXBhcmVGdW5jdGlvbihvYmpBLCBvYmpCKSB7XHJcbiAgICAgIGlmIChvYmpBW3Byb3BlcnR5XSA+IG9iakJbcHJvcGVydHldKSB7XHJcbiAgICAgICAgcmV0dXJuIDE7XHJcbiAgICAgIH1cclxuICAgICAgaWYgKG9iakFbcHJvcGVydHldIDwgb2JqQltwcm9wZXJ0eV0pIHtcclxuICAgICAgICByZXR1cm4gLTE7XHJcbiAgICAgIH1cclxuICAgICAgcmV0dXJuIDA7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKHNvcnRUeXBlID09PSAnZG93bicpIHtcclxuICAgICAgc29ydGVkQXJyLnNvcnQoKGEsIGIpID0+IGNvbXBhcmVGdW5jdGlvbihhLCBiKSk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBzb3J0ZWRBcnIuc29ydCgoYSwgYikgPT4gY29tcGFyZUZ1bmN0aW9uKGIsIGEpKTtcclxuICAgIH1cclxuICAgIHJldHVybiBzb3J0ZWRBcnI7XHJcbiAgfVxyXG5cclxuICBnZXREaWZmV29yZHNBcnIoKSB7XHJcbiAgICBjb25zdCBzb3J0ZWRBcnIgPSB0aGlzLmdldFNvcnRlZEFyckJ5UHJvcCgncGVyY2VudGFnZScsICdkb3duJyk7XHJcbiAgICBjb25zdCByZXN1bHRBcnIgPSBzb3J0ZWRBcnIuZmlsdGVyKChpdGVtKSA9PiBpdGVtLnBlcmNlbnRhZ2UgPiAwICYmIGl0ZW0ucGVyY2VudGFnZSA8IDEwMCk7XHJcbiAgICByZXR1cm4gcmVzdWx0QXJyO1xyXG4gIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgU3RhdFN0b3JhZ2U7XHJcbiIsIi8qIGVzbGludC1kaXNhYmxlIGxpbmVicmVhay1zdHlsZSAqL1xyXG4vKiBlc2xpbnQtZGlzYWJsZSBjbGFzcy1tZXRob2RzLXVzZS10aGlzICovXHJcbi8qIGVzbGludC1kaXNhYmxlIGxpbmVicmVhay1zdHlsZSAqL1xyXG4vKiBlc2xpbnQtZGlzYWJsZSBuby1jb25zb2xlICovXHJcbi8qIGVzbGludC1kaXNhYmxlIGxpbmVicmVhay1zdHlsZSAqL1xyXG4vKiBlc2xpbnQtZGlzYWJsZSBuby11bmRlZiAqL1xyXG4vKiBlc2xpbnQtZGlzYWJsZSBsaW5lYnJlYWstc3R5bGUgKi9cclxuXHJcbmltcG9ydCBTdGF0U3RvcmFnZSBmcm9tICcuL3N0YXRTdG9yYWdlJztcclxuaW1wb3J0IENhcmQgZnJvbSAnLi9jYXJkJztcclxuXHJcbmltcG9ydCB7XHJcbiAgY3JlYXRlQ3VzdG9tRWxlbWVudCxcclxuICAvLyAgZ2V0UmFuZG9tSW50LFxyXG59IGZyb20gJy4vY29tbW9uRnVuY3QnO1xyXG5cclxuY2xhc3MgU3RhdGlzdGljIHtcclxuICBjb25zdHJ1Y3RvcihhcHBDb250cm9sKSB7XHJcbiAgICB0aGlzLmFwcENvbnRyb2wgPSBhcHBDb250cm9sO1xyXG4gICAgdGhpcy5zdG9yYWdlID0gbmV3IFN0YXRTdG9yYWdlKGFwcENvbnRyb2wudG9waWNzQXJyLCBhcHBDb250cm9sLmNhcmRzQXJyKTtcclxuICAgIHRoaXMuc29ydGVkID0gZmFsc2U7XHJcbiAgICB0aGlzLnNvcnRUeXBlID0gbnVsbDtcclxuICAgIHRoaXMuc29ydFByb3BlcnR5ID0gbnVsbDtcclxuICAgIHRoaXMuZWxlbWVudCA9IG51bGw7XHJcbiAgICB0aGlzLnByb3BzTGliID0ge1xyXG4gICAgICBDYXRlZ29yeTogJ3RvcGljJyxcclxuICAgICAgV29yZDogJ3dvcmQnLFxyXG4gICAgICBUcmFuc2xhdGlvbjogJ3RyYW5zbGF0aW9uJyxcclxuICAgICAgVHJhaW46ICd0cmFpbkNsaWNrJyxcclxuICAgICAgQ29ycmVjdDogJ2NvcnJlY3RBbnN3ZXJzJyxcclxuICAgICAgTWlzdGFrZXM6ICdtaXN0YWtlcycsXHJcbiAgICAgICclJzogJ3BlcmNlbnRhZ2UnLFxyXG4gICAgfTtcclxuICAgIHRoaXMuYnVpbGQoKTtcclxuICB9XHJcblxyXG4gIGJ1aWxkKGRhdGFBcnIgPSB0aGlzLnN0b3JhZ2Uuc3RhdEFycikge1xyXG4gICAgY29uc3QgY2xhc3NOYW1lcyA9ICdzdGF0LWNvbnRhaW5lcic7XHJcbiAgICBjb25zdCBzdGF0Q29udGVudEVsZW1lbnQgPSAodGhpcy5hcHBDb250cm9sLmNvbnRlbnQudHlwZSA9PT0gJ3N0YXRpc3RpYycpXHJcbiAgICAgID8gdGhpcy5jcmVhdGVUYWJsZUVsZW1lbnQoZGF0YUFycilcclxuICAgICAgOiB0aGlzLmNyZWF0ZVRyYWluRGlmZkNvbnRhaW5lcigpO1xyXG5cclxuICAgIGNvbnN0IHRlbXBsYXRlID0gYFxyXG4gICAgICAgICAgICAgICAgICAgICAgPGgyPkdhbWUgU3RhdGlzdGljPC9oMj5cclxuICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJzdGF0LWJ1dHRvbnMtd3JhcHBlclwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiYnV0dG9uIHN0YXQtYnV0dG9uIHRyYWluLWRpZmZcIj5UcmFpbiBkaWZmaWN1bHQgd29yZHM8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImJ1dHRvbiBzdGF0LWJ1dHRvbiByZXNldC1zdGF0XCI+UmVzZXQgc3RhdHM8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgIGA7XHJcblxyXG4gICAgY29uc3Qgc3RhdEVsZW1lbnQgPSBjcmVhdGVDdXN0b21FbGVtZW50KCdkaXYnLCBjbGFzc05hbWVzLCB0ZW1wbGF0ZSk7XHJcblxyXG4gICAgc3RhdEVsZW1lbnQuYXBwZW5kKHN0YXRDb250ZW50RWxlbWVudCk7XHJcbiAgICB0aGlzLmVsZW1lbnQgPSBzdGF0RWxlbWVudDtcclxuICAgIHJldHVybiB0aGlzO1xyXG4gIH1cclxuXHJcbiAgY3JlYXRlVGFibGVFbGVtZW50KGRhdGFBcnIpIHtcclxuICAgIGNvbnN0IHRhYmxlRWxlbWVudCA9IGNyZWF0ZUN1c3RvbUVsZW1lbnQoJ2RpdicsICd0YWJsZS13cmFwcGVyJyk7XHJcblxyXG4gICAgbGV0IHRhYmxlQm9keUlubmVyID0gJyc7XHJcbiAgICBkYXRhQXJyLmZvckVhY2goKHdvcmRPYmopID0+IHtcclxuICAgICAgY29uc3Qgcm93VGVtcGxhdGUgPSBgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgPHRyPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRkPiR7d29yZE9iai50b3BpY308L3RoPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRkPiR7d29yZE9iai53b3JkfTwvdGg+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dGQ+JHt3b3JkT2JqLnRyYW5zbGF0aW9ufTwvdGg+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dGQ+JHt3b3JkT2JqLnRyYWluQ2xpY2t9PC90aD5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0ZD4ke3dvcmRPYmouY29ycmVjdEFuc3dlcnN9PC90aD5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0ZD4ke3dvcmRPYmoubWlzdGFrZXN9PC90aD5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0ZD4ke3dvcmRPYmoucGVyY2VudGFnZX0gJTwvdGg+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgPC90cj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICBgO1xyXG4gICAgICB0YWJsZUJvZHlJbm5lciArPSByb3dUZW1wbGF0ZTtcclxuICAgIH0pO1xyXG5cclxuICAgIGNvbnN0IHRoQ2xhc3NOYW1lcyA9ICdidXR0b24gc29ydGFibGUnO1xyXG4gICAgY29uc3QgdGhUaXRsZSA9ICdzb3J0JztcclxuICAgIGxldCB0aGVhZFJvd0lubmVyID0gJyc7XHJcblxyXG4gICAgT2JqZWN0LmVudHJpZXModGhpcy5wcm9wc0xpYikuZm9yRWFjaCgoW2NvbHVtbk5hbWUsIHByb3BOYW1lXSkgPT4ge1xyXG4gICAgICBsZXQgc29ydENsYXNzTmFtZSA9ICcnO1xyXG4gICAgICBsZXQgaW1hZ2VIVE1MID0gJyc7XHJcblxyXG4gICAgICBpZiAodGhpcy5zb3J0ZWQgJiYgKHRoaXMuc29ydFByb3BlcnR5ID09PSBwcm9wTmFtZSkpIHtcclxuICAgICAgICBzb3J0Q2xhc3NOYW1lID0gYCBzb3J0ZWQtJHt0aGlzLnNvcnRUeXBlfWA7XHJcbiAgICAgICAgY29uc3QgaW1hZ2VOYW1lID0gKHRoaXMuc29ydFR5cGUgPT09ICdkb3duJykgPyAnc29ydC1hc2MnIDogJ3NvcnQtZGVzYyc7XHJcbiAgICAgICAgaW1hZ2VIVE1MID0gYFxyXG4gICAgICAgICAgICAgICAgICAgIDxpbWcgY2xhc3M9XCJzb3J0LWljb24gYnV0dG9uIHNvcnRhYmxlXCIgc3JjPS4uL2Fzc2V0cy9pY29ucy8ke2ltYWdlTmFtZX0ucG5nIGFsdD1cInNvcnQgaWNvblwiIHdpZHRoPVwiNTFcIiBoZWlnaHQ9XCI1MVwiPjwvaW1nPlxyXG4gICAgICAgICAgICAgICAgICAgIGA7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHRoZWFkUm93SW5uZXIgKz0gYFxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8dGggY2xhc3M9XCJ0aGVhZCAke3RoQ2xhc3NOYW1lc30ke3NvcnRDbGFzc05hbWV9XCIgdGl0bGU9XCIke3RoVGl0bGV9XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJ0aE5hbWUgYnV0dG9uIHNvcnRhYmxlXCI+JHtjb2x1bW5OYW1lfTwvc3Bhbj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAke2ltYWdlSFRNTH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgPC90aD5cclxuICAgICAgICAgICAgICAgICAgICAgICAgYDtcclxuICAgIH0pO1xyXG5cclxuICAgIGNvbnN0IHRhYmxlSW5uZXJIVE1MID0gYFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIDx0YWJsZSBjbGFzcz1cInN0YXQtdGFibGVcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0aGVhZD5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRyPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICR7dGhlYWRSb3dJbm5lcn1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC90cj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvdGhlYWQ+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dGJvZHk+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICR7dGFibGVCb2R5SW5uZXJ9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3Rib2R5PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIDwvdGFibGU+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGA7XHJcblxyXG4gICAgdGFibGVFbGVtZW50LmlubmVySFRNTCA9IHRhYmxlSW5uZXJIVE1MO1xyXG5cclxuICAgIHJldHVybiB0YWJsZUVsZW1lbnQ7XHJcbiAgfVxyXG5cclxuICBjcmVhdGVUcmFpbkRpZmZDb250YWluZXIoKSB7XHJcbiAgICBsZXQgcmVzdWx0RWxlbWVudDtcclxuICAgIGNvbnN0IGRpZmZXb3Jkc0FyciA9IHRoaXMuc3RvcmFnZS5nZXREaWZmV29yZHNBcnIoKTtcclxuICAgIGNvbnN0IGRpZmZXb3Jkc0Ftb3VudCA9IGRpZmZXb3Jkc0Fyci5sZW5ndGg7XHJcblxyXG4gICAgc3dpdGNoIChkaWZmV29yZHNBbW91bnQpIHtcclxuICAgICAgY2FzZSAwOiB7XHJcbiAgICAgICAgY29uc3QgdGVtcGxhdGUgPSBgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImdyYXBoaWNcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxpbWcgc3JjPVwiLi4vYXNzZXRzL2ltZy9hcHAvc3VwZXIucG5nXCIgYWx0PVwic3VwZXIgcmVzdWx0XCIgd2lkdGg9XCI3NTNcIiBoZWlnaHQ9XCI1NTNcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICA8cD5Ob3RoaW5nIGRpZmZpY3VsdCE8L3A+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGA7XHJcblxyXG4gICAgICAgIHJlc3VsdEVsZW1lbnQgPSBjcmVhdGVDdXN0b21FbGVtZW50KCdkaXYnLCAnbm90aGluZy1kaWZmJywgdGVtcGxhdGUpO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICB9XHJcbiAgICAgIGRlZmF1bHQ6IHtcclxuICAgICAgICBjb25zdCBjYXJkc0NvbnRhaW5lckVsZW1lbnQgPSBjcmVhdGVDdXN0b21FbGVtZW50KCdkaXYnLCAnY2FyZC1jb250YWluZXInKTtcclxuICAgICAgICBjb25zdCBtYXhDYXJkc0Ftb3VudCA9IDg7XHJcbiAgICAgICAgY29uc3QgY2FyZHNBbW91bnQgPSAoZGlmZldvcmRzQXJyLmxlbmd0aCA8IG1heENhcmRzQW1vdW50KVxyXG4gICAgICAgICAgPyBkaWZmV29yZHNBbW91bnRcclxuICAgICAgICAgIDogbWF4Q2FyZHNBbW91bnQ7XHJcblxyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgY2FyZHNBbW91bnQ7IGkgKz0gMSkge1xyXG4gICAgICAgICAgY29uc3QgY2FyZE9iaiA9IGRpZmZXb3Jkc0FycltpXTtcclxuICAgICAgICAgIGNvbnN0IGNhcmRFbGVtZW50ID0gbmV3IENhcmQodGhpcy5hcHBDb250cm9sLCBjYXJkT2JqLCAndG9waWMnKS5lbGVtZW50O1xyXG4gICAgICAgICAgY2FyZHNDb250YWluZXJFbGVtZW50LmFwcGVuZChjYXJkRWxlbWVudCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXN1bHRFbGVtZW50ID0gY2FyZHNDb250YWluZXJFbGVtZW50O1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHJlc3VsdEVsZW1lbnQ7XHJcbiAgfVxyXG5cclxuICBzb3J0VGFibGUodGFyZ2V0RWxlbWVudCkge1xyXG4gICAgY29uc3QgdGhIZWFkRWxlbWVudCA9IHRoaXMuZ2V0VGhlYWRCeVRhcmdldCh0YXJnZXRFbGVtZW50KTtcclxuICAgIHRoaXMuc29ydGVkID0gdHJ1ZTtcclxuICAgIHRoaXMuc29ydFR5cGUgPSAoIXRoSGVhZEVsZW1lbnQuY2xhc3NMaXN0LmNvbnRhaW5zKCdzb3J0ZWQtZG93bicpKSA/ICdkb3duJyA6ICd1cCc7XHJcbiAgICBjb25zdCB0aE5hbWUgPSB0aEhlYWRFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJy50aE5hbWUnKS5pbm5lckhUTUw7XHJcbiAgICB0aGlzLnNvcnRQcm9wZXJ0eSA9IHRoaXMucHJvcHNMaWJbdGhOYW1lXTtcclxuICAgIGNvbnN0IHNvcnRlZEFyciA9IHRoaXMuc3RvcmFnZS5nZXRTb3J0ZWRBcnJCeVByb3AodGhpcy5zb3J0UHJvcGVydHksIHRoaXMuc29ydFR5cGUpO1xyXG4gICAgdGhpcy5idWlsZChzb3J0ZWRBcnIpO1xyXG4gICAgcmV0dXJuIHRoaXM7XHJcbiAgfVxyXG5cclxuICBnZXRUaGVhZEJ5VGFyZ2V0KHRhcmdldEVsZW1lbnQpIHtcclxuICAgIGxldCBzZWFyY2hFbGVtZW50ID0gdGFyZ2V0RWxlbWVudDtcclxuICAgIHdoaWxlICghc2VhcmNoRWxlbWVudC5jbGFzc0xpc3QuY29udGFpbnMoJ3RoZWFkJykpIHtcclxuICAgICAgc2VhcmNoRWxlbWVudCA9IHNlYXJjaEVsZW1lbnQucGFyZW50RWxlbWVudDtcclxuICAgIH1cclxuICAgIHJldHVybiBzZWFyY2hFbGVtZW50O1xyXG4gIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgU3RhdGlzdGljO1xyXG4iLCIvKiBlc2xpbnQtZGlzYWJsZSBsaW5lYnJlYWstc3R5bGUgKi9cclxuLyogZXNsaW50LWRpc2FibGUgbm8tY29uc29sZSAqL1xyXG4vKiBlc2xpbnQtZGlzYWJsZSBsaW5lYnJlYWstc3R5bGUgKi9cclxuLyogZXNsaW50LWRpc2FibGUgbm8tdW5kZWYgKi9cclxuXHJcbmltcG9ydCB7IGNyZWF0ZUN1c3RvbUVsZW1lbnQgfSBmcm9tICcuL2NvbW1vbkZ1bmN0JztcclxuXHJcbmNsYXNzIFN3aXRjaCB7XHJcbiAgY29uc3RydWN0b3IoYXBwQ3RybE9iaikge1xyXG4gICAgdGhpcy52YWxpZE1vZGVzID0gWyd0cmFpbicsICdwbGF5J107XHJcbiAgICB0aGlzLmFjdGl2ZU1vZGUgPSAndHJhaW4nO1xyXG4gICAgdGhpcy5hcHBDb250cm9sID0gYXBwQ3RybE9iajtcclxuICAgIHRoaXMuZWxlbWVudCA9IG51bGw7XHJcbiAgICB0aGlzLmJ1aWxkKCk7XHJcbiAgfVxyXG5cclxuICBidWlsZCgpIHtcclxuICAgIGNvbnN0IGNsYXNzTmFtZXMgPSAnYnV0dG9uIHN3aXRjaCc7XHJcbiAgICBjb25zdCB0ZW1wbGF0ZSA9IGBcclxuICAgICAgICAgICAgICAgICAgICA8cCBjbGFzcz1cInN3aXRjaC10cmlnZ2VyXCI+VHJhaW48L3A+XHJcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInN3aXRjaC1yYWlsXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwic3dpdGNoLXJvbGxlclwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgPHAgY2xhc3M9XCJzd2l0Y2gtdHJpZ2dlclwiPlBsYXk8L3A+XHJcbiAgICAgICAgICAgICAgICAgICAgYDtcclxuXHJcbiAgICB0aGlzLmVsZW1lbnQgPSBjcmVhdGVDdXN0b21FbGVtZW50KCdkaXYnLCBjbGFzc05hbWVzLCB0ZW1wbGF0ZSk7XHJcbiAgICByZXR1cm4gdGhpcztcclxuICB9XHJcblxyXG4gIGFkZFRvRG9jKCkge1xyXG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm1haW4tY29udHJvbHMnKS5hcHBlbmQodGhpcy5lbGVtZW50KTtcclxuICAgIHJldHVybiB0aGlzO1xyXG4gIH1cclxuXHJcbiAgdG9nZ2xlKCkge1xyXG4gICAgdGhpcy5lbGVtZW50LmNsYXNzTGlzdC50b2dnbGUoJ3N3aXRjaC1vbicpO1xyXG4gICAgdGhpcy5hY3RpdmVNb2RlID0gKHRoaXMuYWN0aXZlTW9kZSA9PT0gJ3BsYXknKSA/ICd0cmFpbicgOiAncGxheSc7XHJcbiAgfVxyXG5cclxuICB0cmFpbigpIHtcclxuICAgIHRoaXMuZWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKCdzd2l0Y2gtb24nKTtcclxuICAgIHRoaXMuYWN0aXZlTW9kZSA9ICd0cmFpbic7XHJcbiAgfVxyXG5cclxuICBlbmFibGUoKSB7XHJcbiAgICB0aGlzLmVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZSgnZGlzYWJsZWQnKTtcclxuICB9XHJcblxyXG4gIGRpc2FibGUoKSB7XHJcbiAgICB0aGlzLmVsZW1lbnQuY2xhc3NMaXN0LmFkZCgnZGlzYWJsZWQnKTtcclxuICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IFN3aXRjaDtcclxuIiwiLy8gSW1wb3J0c1xuaW1wb3J0IF9fX0NTU19MT0FERVJfQVBJX1NPVVJDRU1BUF9JTVBPUlRfX18gZnJvbSBcIi4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9zb3VyY2VNYXBzLmpzXCI7XG5pbXBvcnQgX19fQ1NTX0xPQURFUl9BUElfSU1QT1JUX19fIGZyb20gXCIuLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvYXBpLmpzXCI7XG52YXIgX19fQ1NTX0xPQURFUl9FWFBPUlRfX18gPSBfX19DU1NfTE9BREVSX0FQSV9JTVBPUlRfX18oX19fQ1NTX0xPQURFUl9BUElfU09VUkNFTUFQX0lNUE9SVF9fXyk7XG4vLyBNb2R1bGVcbl9fX0NTU19MT0FERVJfRVhQT1JUX19fLnB1c2goW21vZHVsZS5pZCwgXCIvKiEgbm9ybWFsaXplLmNzcyB2OC4wLjEgfCBNSVQgTGljZW5zZSB8IGdpdGh1Yi5jb20vbmVjb2xhcy9ub3JtYWxpemUuY3NzICovXFxyXFxuXFxyXFxuLyogRG9jdW1lbnRcXHJcXG4gICA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PSAqL1xcclxcblxcclxcbi8qKlxcclxcbiAqIDEuIENvcnJlY3QgdGhlIGxpbmUgaGVpZ2h0IGluIGFsbCBicm93c2Vycy5cXHJcXG4gKiAyLiBQcmV2ZW50IGFkanVzdG1lbnRzIG9mIGZvbnQgc2l6ZSBhZnRlciBvcmllbnRhdGlvbiBjaGFuZ2VzIGluIGlPUy5cXHJcXG4gKi9cXHJcXG5cXHJcXG5odG1sIHtcXHJcXG4gIGxpbmUtaGVpZ2h0OiAxLjE1OyAvKiAxICovXFxyXFxuICAtd2Via2l0LXRleHQtc2l6ZS1hZGp1c3Q6IDEwMCU7IC8qIDIgKi9cXHJcXG59XFxyXFxuXFxyXFxuLyogU2VjdGlvbnNcXHJcXG4gICA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PSAqL1xcclxcblxcclxcbi8qKlxcclxcbiAqIFJlbW92ZSB0aGUgbWFyZ2luIGluIGFsbCBicm93c2Vycy5cXHJcXG4gKi9cXHJcXG5cXHJcXG5ib2R5IHtcXHJcXG4gIG1hcmdpbjogMDtcXHJcXG59XFxyXFxuXFxyXFxuLyoqXFxyXFxuICogUmVuZGVyIHRoZSBgbWFpbmAgZWxlbWVudCBjb25zaXN0ZW50bHkgaW4gSUUuXFxyXFxuICovXFxyXFxuXFxyXFxubWFpbiB7XFxyXFxuICBkaXNwbGF5OiBibG9jaztcXHJcXG59XFxyXFxuXFxyXFxuLyoqXFxyXFxuICogQ29ycmVjdCB0aGUgZm9udCBzaXplIGFuZCBtYXJnaW4gb24gYGgxYCBlbGVtZW50cyB3aXRoaW4gYHNlY3Rpb25gIGFuZFxcclxcbiAqIGBhcnRpY2xlYCBjb250ZXh0cyBpbiBDaHJvbWUsIEZpcmVmb3gsIGFuZCBTYWZhcmkuXFxyXFxuICovXFxyXFxuXFxyXFxuaDEge1xcclxcbiAgZm9udC1zaXplOiAyZW07XFxyXFxuICBtYXJnaW46IDAuNjdlbSAwO1xcclxcbn1cXHJcXG5cXHJcXG4vKiBHcm91cGluZyBjb250ZW50XFxyXFxuICAgPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0gKi9cXHJcXG5cXHJcXG4vKipcXHJcXG4gKiAxLiBBZGQgdGhlIGNvcnJlY3QgYm94IHNpemluZyBpbiBGaXJlZm94LlxcclxcbiAqIDIuIFNob3cgdGhlIG92ZXJmbG93IGluIEVkZ2UgYW5kIElFLlxcclxcbiAqL1xcclxcblxcclxcbmhyIHtcXHJcXG4gIGJveC1zaXppbmc6IGNvbnRlbnQtYm94OyAvKiAxICovXFxyXFxuICBoZWlnaHQ6IDA7IC8qIDEgKi9cXHJcXG4gIG92ZXJmbG93OiB2aXNpYmxlOyAvKiAyICovXFxyXFxufVxcclxcblxcclxcbi8qKlxcclxcbiAqIDEuIENvcnJlY3QgdGhlIGluaGVyaXRhbmNlIGFuZCBzY2FsaW5nIG9mIGZvbnQgc2l6ZSBpbiBhbGwgYnJvd3NlcnMuXFxyXFxuICogMi4gQ29ycmVjdCB0aGUgb2RkIGBlbWAgZm9udCBzaXppbmcgaW4gYWxsIGJyb3dzZXJzLlxcclxcbiAqL1xcclxcblxcclxcbnByZSB7XFxyXFxuICBmb250LWZhbWlseTogbW9ub3NwYWNlLCBtb25vc3BhY2U7IC8qIDEgKi9cXHJcXG4gIGZvbnQtc2l6ZTogMWVtOyAvKiAyICovXFxyXFxufVxcclxcblxcclxcbi8qIFRleHQtbGV2ZWwgc2VtYW50aWNzXFxyXFxuICAgPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0gKi9cXHJcXG5cXHJcXG4vKipcXHJcXG4gKiBSZW1vdmUgdGhlIGdyYXkgYmFja2dyb3VuZCBvbiBhY3RpdmUgbGlua3MgaW4gSUUgMTAuXFxyXFxuICovXFxyXFxuXFxyXFxuYSB7XFxyXFxuICBiYWNrZ3JvdW5kLWNvbG9yOiB0cmFuc3BhcmVudDtcXHJcXG59XFxyXFxuXFxyXFxuLyoqXFxyXFxuICogMS4gUmVtb3ZlIHRoZSBib3R0b20gYm9yZGVyIGluIENocm9tZSA1Ny1cXHJcXG4gKiAyLiBBZGQgdGhlIGNvcnJlY3QgdGV4dCBkZWNvcmF0aW9uIGluIENocm9tZSwgRWRnZSwgSUUsIE9wZXJhLCBhbmQgU2FmYXJpLlxcclxcbiAqL1xcclxcblxcclxcbmFiYnJbdGl0bGVdIHtcXHJcXG4gIGJvcmRlci1ib3R0b206IG5vbmU7IC8qIDEgKi9cXHJcXG4gIHRleHQtZGVjb3JhdGlvbjogdW5kZXJsaW5lOyAvKiAyICovXFxyXFxuICB0ZXh0LWRlY29yYXRpb246IHVuZGVybGluZSBkb3R0ZWQ7IC8qIDIgKi9cXHJcXG59XFxyXFxuXFxyXFxuLyoqXFxyXFxuICogQWRkIHRoZSBjb3JyZWN0IGZvbnQgd2VpZ2h0IGluIENocm9tZSwgRWRnZSwgYW5kIFNhZmFyaS5cXHJcXG4gKi9cXHJcXG5cXHJcXG5iLFxcclxcbnN0cm9uZyB7XFxyXFxuICBmb250LXdlaWdodDogYm9sZGVyO1xcclxcbn1cXHJcXG5cXHJcXG4vKipcXHJcXG4gKiAxLiBDb3JyZWN0IHRoZSBpbmhlcml0YW5jZSBhbmQgc2NhbGluZyBvZiBmb250IHNpemUgaW4gYWxsIGJyb3dzZXJzLlxcclxcbiAqIDIuIENvcnJlY3QgdGhlIG9kZCBgZW1gIGZvbnQgc2l6aW5nIGluIGFsbCBicm93c2Vycy5cXHJcXG4gKi9cXHJcXG5cXHJcXG5jb2RlLFxcclxcbmtiZCxcXHJcXG5zYW1wIHtcXHJcXG4gIGZvbnQtZmFtaWx5OiBtb25vc3BhY2UsIG1vbm9zcGFjZTsgLyogMSAqL1xcclxcbiAgZm9udC1zaXplOiAxZW07IC8qIDIgKi9cXHJcXG59XFxyXFxuXFxyXFxuLyoqXFxyXFxuICogQWRkIHRoZSBjb3JyZWN0IGZvbnQgc2l6ZSBpbiBhbGwgYnJvd3NlcnMuXFxyXFxuICovXFxyXFxuXFxyXFxuc21hbGwge1xcclxcbiAgZm9udC1zaXplOiA4MCU7XFxyXFxufVxcclxcblxcclxcbi8qKlxcclxcbiAqIFByZXZlbnQgYHN1YmAgYW5kIGBzdXBgIGVsZW1lbnRzIGZyb20gYWZmZWN0aW5nIHRoZSBsaW5lIGhlaWdodCBpblxcclxcbiAqIGFsbCBicm93c2Vycy5cXHJcXG4gKi9cXHJcXG5cXHJcXG5zdWIsXFxyXFxuc3VwIHtcXHJcXG4gIGZvbnQtc2l6ZTogNzUlO1xcclxcbiAgbGluZS1oZWlnaHQ6IDA7XFxyXFxuICBwb3NpdGlvbjogcmVsYXRpdmU7XFxyXFxuICB2ZXJ0aWNhbC1hbGlnbjogYmFzZWxpbmU7XFxyXFxufVxcclxcblxcclxcbnN1YiB7XFxyXFxuICBib3R0b206IC0wLjI1ZW07XFxyXFxufVxcclxcblxcclxcbnN1cCB7XFxyXFxuICB0b3A6IC0wLjVlbTtcXHJcXG59XFxyXFxuXFxyXFxuLyogRW1iZWRkZWQgY29udGVudFxcclxcbiAgID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09ICovXFxyXFxuXFxyXFxuLyoqXFxyXFxuICogUmVtb3ZlIHRoZSBib3JkZXIgb24gaW1hZ2VzIGluc2lkZSBsaW5rcyBpbiBJRSAxMC5cXHJcXG4gKi9cXHJcXG5cXHJcXG5pbWcge1xcclxcbiAgYm9yZGVyLXN0eWxlOiBub25lO1xcclxcbn1cXHJcXG5cXHJcXG4vKiBGb3Jtc1xcclxcbiAgID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09ICovXFxyXFxuXFxyXFxuLyoqXFxyXFxuICogMS4gQ2hhbmdlIHRoZSBmb250IHN0eWxlcyBpbiBhbGwgYnJvd3NlcnMuXFxyXFxuICogMi4gUmVtb3ZlIHRoZSBtYXJnaW4gaW4gRmlyZWZveCBhbmQgU2FmYXJpLlxcclxcbiAqL1xcclxcblxcclxcbmJ1dHRvbixcXHJcXG5pbnB1dCxcXHJcXG5vcHRncm91cCxcXHJcXG5zZWxlY3QsXFxyXFxudGV4dGFyZWEge1xcclxcbiAgZm9udC1mYW1pbHk6IGluaGVyaXQ7IC8qIDEgKi9cXHJcXG4gIGZvbnQtc2l6ZTogMTAwJTsgLyogMSAqL1xcclxcbiAgbGluZS1oZWlnaHQ6IDEuMTU7IC8qIDEgKi9cXHJcXG4gIG1hcmdpbjogMDsgLyogMiAqL1xcclxcbn1cXHJcXG5cXHJcXG4vKipcXHJcXG4gKiBTaG93IHRoZSBvdmVyZmxvdyBpbiBJRS5cXHJcXG4gKiAxLiBTaG93IHRoZSBvdmVyZmxvdyBpbiBFZGdlLlxcclxcbiAqL1xcclxcblxcclxcbmJ1dHRvbixcXHJcXG5pbnB1dCB7IC8qIDEgKi9cXHJcXG4gIG92ZXJmbG93OiB2aXNpYmxlO1xcclxcbn1cXHJcXG5cXHJcXG4vKipcXHJcXG4gKiBSZW1vdmUgdGhlIGluaGVyaXRhbmNlIG9mIHRleHQgdHJhbnNmb3JtIGluIEVkZ2UsIEZpcmVmb3gsIGFuZCBJRS5cXHJcXG4gKiAxLiBSZW1vdmUgdGhlIGluaGVyaXRhbmNlIG9mIHRleHQgdHJhbnNmb3JtIGluIEZpcmVmb3guXFxyXFxuICovXFxyXFxuXFxyXFxuYnV0dG9uLFxcclxcbnNlbGVjdCB7IC8qIDEgKi9cXHJcXG4gIHRleHQtdHJhbnNmb3JtOiBub25lO1xcclxcbn1cXHJcXG5cXHJcXG4vKipcXHJcXG4gKiBDb3JyZWN0IHRoZSBpbmFiaWxpdHkgdG8gc3R5bGUgY2xpY2thYmxlIHR5cGVzIGluIGlPUyBhbmQgU2FmYXJpLlxcclxcbiAqL1xcclxcblxcclxcbmJ1dHRvbixcXHJcXG5bdHlwZT1cXFwiYnV0dG9uXFxcIl0sXFxyXFxuW3R5cGU9XFxcInJlc2V0XFxcIl0sXFxyXFxuW3R5cGU9XFxcInN1Ym1pdFxcXCJdIHtcXHJcXG4gIC13ZWJraXQtYXBwZWFyYW5jZTogYnV0dG9uO1xcclxcbn1cXHJcXG5cXHJcXG4vKipcXHJcXG4gKiBSZW1vdmUgdGhlIGlubmVyIGJvcmRlciBhbmQgcGFkZGluZyBpbiBGaXJlZm94LlxcclxcbiAqL1xcclxcblxcclxcbmJ1dHRvbjo6LW1vei1mb2N1cy1pbm5lcixcXHJcXG5bdHlwZT1cXFwiYnV0dG9uXFxcIl06Oi1tb3otZm9jdXMtaW5uZXIsXFxyXFxuW3R5cGU9XFxcInJlc2V0XFxcIl06Oi1tb3otZm9jdXMtaW5uZXIsXFxyXFxuW3R5cGU9XFxcInN1Ym1pdFxcXCJdOjotbW96LWZvY3VzLWlubmVyIHtcXHJcXG4gIGJvcmRlci1zdHlsZTogbm9uZTtcXHJcXG4gIHBhZGRpbmc6IDA7XFxyXFxufVxcclxcblxcclxcbi8qKlxcclxcbiAqIFJlc3RvcmUgdGhlIGZvY3VzIHN0eWxlcyB1bnNldCBieSB0aGUgcHJldmlvdXMgcnVsZS5cXHJcXG4gKi9cXHJcXG5cXHJcXG5idXR0b246LW1vei1mb2N1c3JpbmcsXFxyXFxuW3R5cGU9XFxcImJ1dHRvblxcXCJdOi1tb3otZm9jdXNyaW5nLFxcclxcblt0eXBlPVxcXCJyZXNldFxcXCJdOi1tb3otZm9jdXNyaW5nLFxcclxcblt0eXBlPVxcXCJzdWJtaXRcXFwiXTotbW96LWZvY3VzcmluZyB7XFxyXFxuICBvdXRsaW5lOiAxcHggZG90dGVkIEJ1dHRvblRleHQ7XFxyXFxufVxcclxcblxcclxcbi8qKlxcclxcbiAqIENvcnJlY3QgdGhlIHBhZGRpbmcgaW4gRmlyZWZveC5cXHJcXG4gKi9cXHJcXG5cXHJcXG5maWVsZHNldCB7XFxyXFxuICBwYWRkaW5nOiAwLjM1ZW0gMC43NWVtIDAuNjI1ZW07XFxyXFxufVxcclxcblxcclxcbi8qKlxcclxcbiAqIDEuIENvcnJlY3QgdGhlIHRleHQgd3JhcHBpbmcgaW4gRWRnZSBhbmQgSUUuXFxyXFxuICogMi4gQ29ycmVjdCB0aGUgY29sb3IgaW5oZXJpdGFuY2UgZnJvbSBgZmllbGRzZXRgIGVsZW1lbnRzIGluIElFLlxcclxcbiAqIDMuIFJlbW92ZSB0aGUgcGFkZGluZyBzbyBkZXZlbG9wZXJzIGFyZSBub3QgY2F1Z2h0IG91dCB3aGVuIHRoZXkgemVybyBvdXRcXHJcXG4gKiAgICBgZmllbGRzZXRgIGVsZW1lbnRzIGluIGFsbCBicm93c2Vycy5cXHJcXG4gKi9cXHJcXG5cXHJcXG5sZWdlbmQge1xcclxcbiAgYm94LXNpemluZzogYm9yZGVyLWJveDsgLyogMSAqL1xcclxcbiAgY29sb3I6IGluaGVyaXQ7IC8qIDIgKi9cXHJcXG4gIGRpc3BsYXk6IHRhYmxlOyAvKiAxICovXFxyXFxuICBtYXgtd2lkdGg6IDEwMCU7IC8qIDEgKi9cXHJcXG4gIHBhZGRpbmc6IDA7IC8qIDMgKi9cXHJcXG4gIHdoaXRlLXNwYWNlOiBub3JtYWw7IC8qIDEgKi9cXHJcXG59XFxyXFxuXFxyXFxuLyoqXFxyXFxuICogQWRkIHRoZSBjb3JyZWN0IHZlcnRpY2FsIGFsaWdubWVudCBpbiBDaHJvbWUsIEZpcmVmb3gsIGFuZCBPcGVyYS5cXHJcXG4gKi9cXHJcXG5cXHJcXG5wcm9ncmVzcyB7XFxyXFxuICB2ZXJ0aWNhbC1hbGlnbjogYmFzZWxpbmU7XFxyXFxufVxcclxcblxcclxcbi8qKlxcclxcbiAqIFJlbW92ZSB0aGUgZGVmYXVsdCB2ZXJ0aWNhbCBzY3JvbGxiYXIgaW4gSUUgMTArLlxcclxcbiAqL1xcclxcblxcclxcbnRleHRhcmVhIHtcXHJcXG4gIG92ZXJmbG93OiBhdXRvO1xcclxcbn1cXHJcXG5cXHJcXG4vKipcXHJcXG4gKiAxLiBBZGQgdGhlIGNvcnJlY3QgYm94IHNpemluZyBpbiBJRSAxMC5cXHJcXG4gKiAyLiBSZW1vdmUgdGhlIHBhZGRpbmcgaW4gSUUgMTAuXFxyXFxuICovXFxyXFxuXFxyXFxuW3R5cGU9XFxcImNoZWNrYm94XFxcIl0sXFxyXFxuW3R5cGU9XFxcInJhZGlvXFxcIl0ge1xcclxcbiAgYm94LXNpemluZzogYm9yZGVyLWJveDsgLyogMSAqL1xcclxcbiAgcGFkZGluZzogMDsgLyogMiAqL1xcclxcbn1cXHJcXG5cXHJcXG4vKipcXHJcXG4gKiBDb3JyZWN0IHRoZSBjdXJzb3Igc3R5bGUgb2YgaW5jcmVtZW50IGFuZCBkZWNyZW1lbnQgYnV0dG9ucyBpbiBDaHJvbWUuXFxyXFxuICovXFxyXFxuXFxyXFxuW3R5cGU9XFxcIm51bWJlclxcXCJdOjotd2Via2l0LWlubmVyLXNwaW4tYnV0dG9uLFxcclxcblt0eXBlPVxcXCJudW1iZXJcXFwiXTo6LXdlYmtpdC1vdXRlci1zcGluLWJ1dHRvbiB7XFxyXFxuICBoZWlnaHQ6IGF1dG87XFxyXFxufVxcclxcblxcclxcbi8qKlxcclxcbiAqIDEuIENvcnJlY3QgdGhlIG9kZCBhcHBlYXJhbmNlIGluIENocm9tZSBhbmQgU2FmYXJpLlxcclxcbiAqIDIuIENvcnJlY3QgdGhlIG91dGxpbmUgc3R5bGUgaW4gU2FmYXJpLlxcclxcbiAqL1xcclxcblxcclxcblt0eXBlPVxcXCJzZWFyY2hcXFwiXSB7XFxyXFxuICAtd2Via2l0LWFwcGVhcmFuY2U6IHRleHRmaWVsZDsgLyogMSAqL1xcclxcbiAgb3V0bGluZS1vZmZzZXQ6IC0ycHg7IC8qIDIgKi9cXHJcXG59XFxyXFxuXFxyXFxuLyoqXFxyXFxuICogUmVtb3ZlIHRoZSBpbm5lciBwYWRkaW5nIGluIENocm9tZSBhbmQgU2FmYXJpIG9uIG1hY09TLlxcclxcbiAqL1xcclxcblxcclxcblt0eXBlPVxcXCJzZWFyY2hcXFwiXTo6LXdlYmtpdC1zZWFyY2gtZGVjb3JhdGlvbiB7XFxyXFxuICAtd2Via2l0LWFwcGVhcmFuY2U6IG5vbmU7XFxyXFxufVxcclxcblxcclxcbi8qKlxcclxcbiAqIDEuIENvcnJlY3QgdGhlIGluYWJpbGl0eSB0byBzdHlsZSBjbGlja2FibGUgdHlwZXMgaW4gaU9TIGFuZCBTYWZhcmkuXFxyXFxuICogMi4gQ2hhbmdlIGZvbnQgcHJvcGVydGllcyB0byBgaW5oZXJpdGAgaW4gU2FmYXJpLlxcclxcbiAqL1xcclxcblxcclxcbjo6LXdlYmtpdC1maWxlLXVwbG9hZC1idXR0b24ge1xcclxcbiAgLXdlYmtpdC1hcHBlYXJhbmNlOiBidXR0b247IC8qIDEgKi9cXHJcXG4gIGZvbnQ6IGluaGVyaXQ7IC8qIDIgKi9cXHJcXG59XFxyXFxuXFxyXFxuLyogSW50ZXJhY3RpdmVcXHJcXG4gICA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PSAqL1xcclxcblxcclxcbi8qXFxyXFxuICogQWRkIHRoZSBjb3JyZWN0IGRpc3BsYXkgaW4gRWRnZSwgSUUgMTArLCBhbmQgRmlyZWZveC5cXHJcXG4gKi9cXHJcXG5cXHJcXG5kZXRhaWxzIHtcXHJcXG4gIGRpc3BsYXk6IGJsb2NrO1xcclxcbn1cXHJcXG5cXHJcXG4vKlxcclxcbiAqIEFkZCB0aGUgY29ycmVjdCBkaXNwbGF5IGluIGFsbCBicm93c2Vycy5cXHJcXG4gKi9cXHJcXG5cXHJcXG5zdW1tYXJ5IHtcXHJcXG4gIGRpc3BsYXk6IGxpc3QtaXRlbTtcXHJcXG59XFxyXFxuXFxyXFxuLyogTWlzY1xcclxcbiAgID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09ICovXFxyXFxuXFxyXFxuLyoqXFxyXFxuICogQWRkIHRoZSBjb3JyZWN0IGRpc3BsYXkgaW4gSUUgMTArLlxcclxcbiAqL1xcclxcblxcclxcbnRlbXBsYXRlIHtcXHJcXG4gIGRpc3BsYXk6IG5vbmU7XFxyXFxufVxcclxcblxcclxcbi8qKlxcclxcbiAqIEFkZCB0aGUgY29ycmVjdCBkaXNwbGF5IGluIElFIDEwLlxcclxcbiAqL1xcclxcblxcclxcbltoaWRkZW5dIHtcXHJcXG4gIGRpc3BsYXk6IG5vbmU7XFxyXFxufVxcclxcblwiLCBcIlwiLHtcInZlcnNpb25cIjozLFwic291cmNlc1wiOltcIndlYnBhY2s6Ly8u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QTsrRUFDK0U7O0FBRS9FOztFQUVFOztBQUVGO0VBQ0UsY0FBYztBQUNoQjs7QUFFQTs7RUFFRTs7QUFFRjtFQUNFLGtCQUFrQjtBQUNwQjs7QUFFQTsrRUFDK0U7O0FBRS9FOztFQUVFOztBQUVGO0VBQ0UsYUFBYTtBQUNmOztBQUVBOztFQUVFOztBQUVGO0VBQ0UsYUFBYTtBQUNmXCIsXCJzb3VyY2VzQ29udGVudFwiOltcIi8qISBub3JtYWxpemUuY3NzIHY4LjAuMSB8IE1JVCBMaWNlbnNlIHwgZ2l0aHViLmNvbS9uZWNvbGFzL25vcm1hbGl6ZS5jc3MgKi9cXHJcXG5cXHJcXG4vKiBEb2N1bWVudFxcclxcbiAgID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09ICovXFxyXFxuXFxyXFxuLyoqXFxyXFxuICogMS4gQ29ycmVjdCB0aGUgbGluZSBoZWlnaHQgaW4gYWxsIGJyb3dzZXJzLlxcclxcbiAqIDIuIFByZXZlbnQgYWRqdXN0bWVudHMgb2YgZm9udCBzaXplIGFmdGVyIG9yaWVudGF0aW9uIGNoYW5nZXMgaW4gaU9TLlxcclxcbiAqL1xcclxcblxcclxcbmh0bWwge1xcclxcbiAgbGluZS1oZWlnaHQ6IDEuMTU7IC8qIDEgKi9cXHJcXG4gIC13ZWJraXQtdGV4dC1zaXplLWFkanVzdDogMTAwJTsgLyogMiAqL1xcclxcbn1cXHJcXG5cXHJcXG4vKiBTZWN0aW9uc1xcclxcbiAgID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09ICovXFxyXFxuXFxyXFxuLyoqXFxyXFxuICogUmVtb3ZlIHRoZSBtYXJnaW4gaW4gYWxsIGJyb3dzZXJzLlxcclxcbiAqL1xcclxcblxcclxcbmJvZHkge1xcclxcbiAgbWFyZ2luOiAwO1xcclxcbn1cXHJcXG5cXHJcXG4vKipcXHJcXG4gKiBSZW5kZXIgdGhlIGBtYWluYCBlbGVtZW50IGNvbnNpc3RlbnRseSBpbiBJRS5cXHJcXG4gKi9cXHJcXG5cXHJcXG5tYWluIHtcXHJcXG4gIGRpc3BsYXk6IGJsb2NrO1xcclxcbn1cXHJcXG5cXHJcXG4vKipcXHJcXG4gKiBDb3JyZWN0IHRoZSBmb250IHNpemUgYW5kIG1hcmdpbiBvbiBgaDFgIGVsZW1lbnRzIHdpdGhpbiBgc2VjdGlvbmAgYW5kXFxyXFxuICogYGFydGljbGVgIGNvbnRleHRzIGluIENocm9tZSwgRmlyZWZveCwgYW5kIFNhZmFyaS5cXHJcXG4gKi9cXHJcXG5cXHJcXG5oMSB7XFxyXFxuICBmb250LXNpemU6IDJlbTtcXHJcXG4gIG1hcmdpbjogMC42N2VtIDA7XFxyXFxufVxcclxcblxcclxcbi8qIEdyb3VwaW5nIGNvbnRlbnRcXHJcXG4gICA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PSAqL1xcclxcblxcclxcbi8qKlxcclxcbiAqIDEuIEFkZCB0aGUgY29ycmVjdCBib3ggc2l6aW5nIGluIEZpcmVmb3guXFxyXFxuICogMi4gU2hvdyB0aGUgb3ZlcmZsb3cgaW4gRWRnZSBhbmQgSUUuXFxyXFxuICovXFxyXFxuXFxyXFxuaHIge1xcclxcbiAgYm94LXNpemluZzogY29udGVudC1ib3g7IC8qIDEgKi9cXHJcXG4gIGhlaWdodDogMDsgLyogMSAqL1xcclxcbiAgb3ZlcmZsb3c6IHZpc2libGU7IC8qIDIgKi9cXHJcXG59XFxyXFxuXFxyXFxuLyoqXFxyXFxuICogMS4gQ29ycmVjdCB0aGUgaW5oZXJpdGFuY2UgYW5kIHNjYWxpbmcgb2YgZm9udCBzaXplIGluIGFsbCBicm93c2Vycy5cXHJcXG4gKiAyLiBDb3JyZWN0IHRoZSBvZGQgYGVtYCBmb250IHNpemluZyBpbiBhbGwgYnJvd3NlcnMuXFxyXFxuICovXFxyXFxuXFxyXFxucHJlIHtcXHJcXG4gIGZvbnQtZmFtaWx5OiBtb25vc3BhY2UsIG1vbm9zcGFjZTsgLyogMSAqL1xcclxcbiAgZm9udC1zaXplOiAxZW07IC8qIDIgKi9cXHJcXG59XFxyXFxuXFxyXFxuLyogVGV4dC1sZXZlbCBzZW1hbnRpY3NcXHJcXG4gICA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PSAqL1xcclxcblxcclxcbi8qKlxcclxcbiAqIFJlbW92ZSB0aGUgZ3JheSBiYWNrZ3JvdW5kIG9uIGFjdGl2ZSBsaW5rcyBpbiBJRSAxMC5cXHJcXG4gKi9cXHJcXG5cXHJcXG5hIHtcXHJcXG4gIGJhY2tncm91bmQtY29sb3I6IHRyYW5zcGFyZW50O1xcclxcbn1cXHJcXG5cXHJcXG4vKipcXHJcXG4gKiAxLiBSZW1vdmUgdGhlIGJvdHRvbSBib3JkZXIgaW4gQ2hyb21lIDU3LVxcclxcbiAqIDIuIEFkZCB0aGUgY29ycmVjdCB0ZXh0IGRlY29yYXRpb24gaW4gQ2hyb21lLCBFZGdlLCBJRSwgT3BlcmEsIGFuZCBTYWZhcmkuXFxyXFxuICovXFxyXFxuXFxyXFxuYWJiclt0aXRsZV0ge1xcclxcbiAgYm9yZGVyLWJvdHRvbTogbm9uZTsgLyogMSAqL1xcclxcbiAgdGV4dC1kZWNvcmF0aW9uOiB1bmRlcmxpbmU7IC8qIDIgKi9cXHJcXG4gIHRleHQtZGVjb3JhdGlvbjogdW5kZXJsaW5lIGRvdHRlZDsgLyogMiAqL1xcclxcbn1cXHJcXG5cXHJcXG4vKipcXHJcXG4gKiBBZGQgdGhlIGNvcnJlY3QgZm9udCB3ZWlnaHQgaW4gQ2hyb21lLCBFZGdlLCBhbmQgU2FmYXJpLlxcclxcbiAqL1xcclxcblxcclxcbmIsXFxyXFxuc3Ryb25nIHtcXHJcXG4gIGZvbnQtd2VpZ2h0OiBib2xkZXI7XFxyXFxufVxcclxcblxcclxcbi8qKlxcclxcbiAqIDEuIENvcnJlY3QgdGhlIGluaGVyaXRhbmNlIGFuZCBzY2FsaW5nIG9mIGZvbnQgc2l6ZSBpbiBhbGwgYnJvd3NlcnMuXFxyXFxuICogMi4gQ29ycmVjdCB0aGUgb2RkIGBlbWAgZm9udCBzaXppbmcgaW4gYWxsIGJyb3dzZXJzLlxcclxcbiAqL1xcclxcblxcclxcbmNvZGUsXFxyXFxua2JkLFxcclxcbnNhbXAge1xcclxcbiAgZm9udC1mYW1pbHk6IG1vbm9zcGFjZSwgbW9ub3NwYWNlOyAvKiAxICovXFxyXFxuICBmb250LXNpemU6IDFlbTsgLyogMiAqL1xcclxcbn1cXHJcXG5cXHJcXG4vKipcXHJcXG4gKiBBZGQgdGhlIGNvcnJlY3QgZm9udCBzaXplIGluIGFsbCBicm93c2Vycy5cXHJcXG4gKi9cXHJcXG5cXHJcXG5zbWFsbCB7XFxyXFxuICBmb250LXNpemU6IDgwJTtcXHJcXG59XFxyXFxuXFxyXFxuLyoqXFxyXFxuICogUHJldmVudCBgc3ViYCBhbmQgYHN1cGAgZWxlbWVudHMgZnJvbSBhZmZlY3RpbmcgdGhlIGxpbmUgaGVpZ2h0IGluXFxyXFxuICogYWxsIGJyb3dzZXJzLlxcclxcbiAqL1xcclxcblxcclxcbnN1YixcXHJcXG5zdXAge1xcclxcbiAgZm9udC1zaXplOiA3NSU7XFxyXFxuICBsaW5lLWhlaWdodDogMDtcXHJcXG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcXHJcXG4gIHZlcnRpY2FsLWFsaWduOiBiYXNlbGluZTtcXHJcXG59XFxyXFxuXFxyXFxuc3ViIHtcXHJcXG4gIGJvdHRvbTogLTAuMjVlbTtcXHJcXG59XFxyXFxuXFxyXFxuc3VwIHtcXHJcXG4gIHRvcDogLTAuNWVtO1xcclxcbn1cXHJcXG5cXHJcXG4vKiBFbWJlZGRlZCBjb250ZW50XFxyXFxuICAgPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0gKi9cXHJcXG5cXHJcXG4vKipcXHJcXG4gKiBSZW1vdmUgdGhlIGJvcmRlciBvbiBpbWFnZXMgaW5zaWRlIGxpbmtzIGluIElFIDEwLlxcclxcbiAqL1xcclxcblxcclxcbmltZyB7XFxyXFxuICBib3JkZXItc3R5bGU6IG5vbmU7XFxyXFxufVxcclxcblxcclxcbi8qIEZvcm1zXFxyXFxuICAgPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0gKi9cXHJcXG5cXHJcXG4vKipcXHJcXG4gKiAxLiBDaGFuZ2UgdGhlIGZvbnQgc3R5bGVzIGluIGFsbCBicm93c2Vycy5cXHJcXG4gKiAyLiBSZW1vdmUgdGhlIG1hcmdpbiBpbiBGaXJlZm94IGFuZCBTYWZhcmkuXFxyXFxuICovXFxyXFxuXFxyXFxuYnV0dG9uLFxcclxcbmlucHV0LFxcclxcbm9wdGdyb3VwLFxcclxcbnNlbGVjdCxcXHJcXG50ZXh0YXJlYSB7XFxyXFxuICBmb250LWZhbWlseTogaW5oZXJpdDsgLyogMSAqL1xcclxcbiAgZm9udC1zaXplOiAxMDAlOyAvKiAxICovXFxyXFxuICBsaW5lLWhlaWdodDogMS4xNTsgLyogMSAqL1xcclxcbiAgbWFyZ2luOiAwOyAvKiAyICovXFxyXFxufVxcclxcblxcclxcbi8qKlxcclxcbiAqIFNob3cgdGhlIG92ZXJmbG93IGluIElFLlxcclxcbiAqIDEuIFNob3cgdGhlIG92ZXJmbG93IGluIEVkZ2UuXFxyXFxuICovXFxyXFxuXFxyXFxuYnV0dG9uLFxcclxcbmlucHV0IHsgLyogMSAqL1xcclxcbiAgb3ZlcmZsb3c6IHZpc2libGU7XFxyXFxufVxcclxcblxcclxcbi8qKlxcclxcbiAqIFJlbW92ZSB0aGUgaW5oZXJpdGFuY2Ugb2YgdGV4dCB0cmFuc2Zvcm0gaW4gRWRnZSwgRmlyZWZveCwgYW5kIElFLlxcclxcbiAqIDEuIFJlbW92ZSB0aGUgaW5oZXJpdGFuY2Ugb2YgdGV4dCB0cmFuc2Zvcm0gaW4gRmlyZWZveC5cXHJcXG4gKi9cXHJcXG5cXHJcXG5idXR0b24sXFxyXFxuc2VsZWN0IHsgLyogMSAqL1xcclxcbiAgdGV4dC10cmFuc2Zvcm06IG5vbmU7XFxyXFxufVxcclxcblxcclxcbi8qKlxcclxcbiAqIENvcnJlY3QgdGhlIGluYWJpbGl0eSB0byBzdHlsZSBjbGlja2FibGUgdHlwZXMgaW4gaU9TIGFuZCBTYWZhcmkuXFxyXFxuICovXFxyXFxuXFxyXFxuYnV0dG9uLFxcclxcblt0eXBlPVxcXCJidXR0b25cXFwiXSxcXHJcXG5bdHlwZT1cXFwicmVzZXRcXFwiXSxcXHJcXG5bdHlwZT1cXFwic3VibWl0XFxcIl0ge1xcclxcbiAgLXdlYmtpdC1hcHBlYXJhbmNlOiBidXR0b247XFxyXFxufVxcclxcblxcclxcbi8qKlxcclxcbiAqIFJlbW92ZSB0aGUgaW5uZXIgYm9yZGVyIGFuZCBwYWRkaW5nIGluIEZpcmVmb3guXFxyXFxuICovXFxyXFxuXFxyXFxuYnV0dG9uOjotbW96LWZvY3VzLWlubmVyLFxcclxcblt0eXBlPVxcXCJidXR0b25cXFwiXTo6LW1vei1mb2N1cy1pbm5lcixcXHJcXG5bdHlwZT1cXFwicmVzZXRcXFwiXTo6LW1vei1mb2N1cy1pbm5lcixcXHJcXG5bdHlwZT1cXFwic3VibWl0XFxcIl06Oi1tb3otZm9jdXMtaW5uZXIge1xcclxcbiAgYm9yZGVyLXN0eWxlOiBub25lO1xcclxcbiAgcGFkZGluZzogMDtcXHJcXG59XFxyXFxuXFxyXFxuLyoqXFxyXFxuICogUmVzdG9yZSB0aGUgZm9jdXMgc3R5bGVzIHVuc2V0IGJ5IHRoZSBwcmV2aW91cyBydWxlLlxcclxcbiAqL1xcclxcblxcclxcbmJ1dHRvbjotbW96LWZvY3VzcmluZyxcXHJcXG5bdHlwZT1cXFwiYnV0dG9uXFxcIl06LW1vei1mb2N1c3JpbmcsXFxyXFxuW3R5cGU9XFxcInJlc2V0XFxcIl06LW1vei1mb2N1c3JpbmcsXFxyXFxuW3R5cGU9XFxcInN1Ym1pdFxcXCJdOi1tb3otZm9jdXNyaW5nIHtcXHJcXG4gIG91dGxpbmU6IDFweCBkb3R0ZWQgQnV0dG9uVGV4dDtcXHJcXG59XFxyXFxuXFxyXFxuLyoqXFxyXFxuICogQ29ycmVjdCB0aGUgcGFkZGluZyBpbiBGaXJlZm94LlxcclxcbiAqL1xcclxcblxcclxcbmZpZWxkc2V0IHtcXHJcXG4gIHBhZGRpbmc6IDAuMzVlbSAwLjc1ZW0gMC42MjVlbTtcXHJcXG59XFxyXFxuXFxyXFxuLyoqXFxyXFxuICogMS4gQ29ycmVjdCB0aGUgdGV4dCB3cmFwcGluZyBpbiBFZGdlIGFuZCBJRS5cXHJcXG4gKiAyLiBDb3JyZWN0IHRoZSBjb2xvciBpbmhlcml0YW5jZSBmcm9tIGBmaWVsZHNldGAgZWxlbWVudHMgaW4gSUUuXFxyXFxuICogMy4gUmVtb3ZlIHRoZSBwYWRkaW5nIHNvIGRldmVsb3BlcnMgYXJlIG5vdCBjYXVnaHQgb3V0IHdoZW4gdGhleSB6ZXJvIG91dFxcclxcbiAqICAgIGBmaWVsZHNldGAgZWxlbWVudHMgaW4gYWxsIGJyb3dzZXJzLlxcclxcbiAqL1xcclxcblxcclxcbmxlZ2VuZCB7XFxyXFxuICBib3gtc2l6aW5nOiBib3JkZXItYm94OyAvKiAxICovXFxyXFxuICBjb2xvcjogaW5oZXJpdDsgLyogMiAqL1xcclxcbiAgZGlzcGxheTogdGFibGU7IC8qIDEgKi9cXHJcXG4gIG1heC13aWR0aDogMTAwJTsgLyogMSAqL1xcclxcbiAgcGFkZGluZzogMDsgLyogMyAqL1xcclxcbiAgd2hpdGUtc3BhY2U6IG5vcm1hbDsgLyogMSAqL1xcclxcbn1cXHJcXG5cXHJcXG4vKipcXHJcXG4gKiBBZGQgdGhlIGNvcnJlY3QgdmVydGljYWwgYWxpZ25tZW50IGluIENocm9tZSwgRmlyZWZveCwgYW5kIE9wZXJhLlxcclxcbiAqL1xcclxcblxcclxcbnByb2dyZXNzIHtcXHJcXG4gIHZlcnRpY2FsLWFsaWduOiBiYXNlbGluZTtcXHJcXG59XFxyXFxuXFxyXFxuLyoqXFxyXFxuICogUmVtb3ZlIHRoZSBkZWZhdWx0IHZlcnRpY2FsIHNjcm9sbGJhciBpbiBJRSAxMCsuXFxyXFxuICovXFxyXFxuXFxyXFxudGV4dGFyZWEge1xcclxcbiAgb3ZlcmZsb3c6IGF1dG87XFxyXFxufVxcclxcblxcclxcbi8qKlxcclxcbiAqIDEuIEFkZCB0aGUgY29ycmVjdCBib3ggc2l6aW5nIGluIElFIDEwLlxcclxcbiAqIDIuIFJlbW92ZSB0aGUgcGFkZGluZyBpbiBJRSAxMC5cXHJcXG4gKi9cXHJcXG5cXHJcXG5bdHlwZT1cXFwiY2hlY2tib3hcXFwiXSxcXHJcXG5bdHlwZT1cXFwicmFkaW9cXFwiXSB7XFxyXFxuICBib3gtc2l6aW5nOiBib3JkZXItYm94OyAvKiAxICovXFxyXFxuICBwYWRkaW5nOiAwOyAvKiAyICovXFxyXFxufVxcclxcblxcclxcbi8qKlxcclxcbiAqIENvcnJlY3QgdGhlIGN1cnNvciBzdHlsZSBvZiBpbmNyZW1lbnQgYW5kIGRlY3JlbWVudCBidXR0b25zIGluIENocm9tZS5cXHJcXG4gKi9cXHJcXG5cXHJcXG5bdHlwZT1cXFwibnVtYmVyXFxcIl06Oi13ZWJraXQtaW5uZXItc3Bpbi1idXR0b24sXFxyXFxuW3R5cGU9XFxcIm51bWJlclxcXCJdOjotd2Via2l0LW91dGVyLXNwaW4tYnV0dG9uIHtcXHJcXG4gIGhlaWdodDogYXV0bztcXHJcXG59XFxyXFxuXFxyXFxuLyoqXFxyXFxuICogMS4gQ29ycmVjdCB0aGUgb2RkIGFwcGVhcmFuY2UgaW4gQ2hyb21lIGFuZCBTYWZhcmkuXFxyXFxuICogMi4gQ29ycmVjdCB0aGUgb3V0bGluZSBzdHlsZSBpbiBTYWZhcmkuXFxyXFxuICovXFxyXFxuXFxyXFxuW3R5cGU9XFxcInNlYXJjaFxcXCJdIHtcXHJcXG4gIC13ZWJraXQtYXBwZWFyYW5jZTogdGV4dGZpZWxkOyAvKiAxICovXFxyXFxuICBvdXRsaW5lLW9mZnNldDogLTJweDsgLyogMiAqL1xcclxcbn1cXHJcXG5cXHJcXG4vKipcXHJcXG4gKiBSZW1vdmUgdGhlIGlubmVyIHBhZGRpbmcgaW4gQ2hyb21lIGFuZCBTYWZhcmkgb24gbWFjT1MuXFxyXFxuICovXFxyXFxuXFxyXFxuW3R5cGU9XFxcInNlYXJjaFxcXCJdOjotd2Via2l0LXNlYXJjaC1kZWNvcmF0aW9uIHtcXHJcXG4gIC13ZWJraXQtYXBwZWFyYW5jZTogbm9uZTtcXHJcXG59XFxyXFxuXFxyXFxuLyoqXFxyXFxuICogMS4gQ29ycmVjdCB0aGUgaW5hYmlsaXR5IHRvIHN0eWxlIGNsaWNrYWJsZSB0eXBlcyBpbiBpT1MgYW5kIFNhZmFyaS5cXHJcXG4gKiAyLiBDaGFuZ2UgZm9udCBwcm9wZXJ0aWVzIHRvIGBpbmhlcml0YCBpbiBTYWZhcmkuXFxyXFxuICovXFxyXFxuXFxyXFxuOjotd2Via2l0LWZpbGUtdXBsb2FkLWJ1dHRvbiB7XFxyXFxuICAtd2Via2l0LWFwcGVhcmFuY2U6IGJ1dHRvbjsgLyogMSAqL1xcclxcbiAgZm9udDogaW5oZXJpdDsgLyogMiAqL1xcclxcbn1cXHJcXG5cXHJcXG4vKiBJbnRlcmFjdGl2ZVxcclxcbiAgID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09ICovXFxyXFxuXFxyXFxuLypcXHJcXG4gKiBBZGQgdGhlIGNvcnJlY3QgZGlzcGxheSBpbiBFZGdlLCBJRSAxMCssIGFuZCBGaXJlZm94LlxcclxcbiAqL1xcclxcblxcclxcbmRldGFpbHMge1xcclxcbiAgZGlzcGxheTogYmxvY2s7XFxyXFxufVxcclxcblxcclxcbi8qXFxyXFxuICogQWRkIHRoZSBjb3JyZWN0IGRpc3BsYXkgaW4gYWxsIGJyb3dzZXJzLlxcclxcbiAqL1xcclxcblxcclxcbnN1bW1hcnkge1xcclxcbiAgZGlzcGxheTogbGlzdC1pdGVtO1xcclxcbn1cXHJcXG5cXHJcXG4vKiBNaXNjXFxyXFxuICAgPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0gKi9cXHJcXG5cXHJcXG4vKipcXHJcXG4gKiBBZGQgdGhlIGNvcnJlY3QgZGlzcGxheSBpbiBJRSAxMCsuXFxyXFxuICovXFxyXFxuXFxyXFxudGVtcGxhdGUge1xcclxcbiAgZGlzcGxheTogbm9uZTtcXHJcXG59XFxyXFxuXFxyXFxuLyoqXFxyXFxuICogQWRkIHRoZSBjb3JyZWN0IGRpc3BsYXkgaW4gSUUgMTAuXFxyXFxuICovXFxyXFxuXFxyXFxuW2hpZGRlbl0ge1xcclxcbiAgZGlzcGxheTogbm9uZTtcXHJcXG59XFxyXFxuXCJdLFwic291cmNlUm9vdFwiOlwiXCJ9XSk7XG4vLyBFeHBvcnRzXG5leHBvcnQgZGVmYXVsdCBfX19DU1NfTE9BREVSX0VYUE9SVF9fXztcbiIsIi8vIEltcG9ydHNcbmltcG9ydCBfX19DU1NfTE9BREVSX0FQSV9TT1VSQ0VNQVBfSU1QT1JUX19fIGZyb20gXCIuLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvc291cmNlTWFwcy5qc1wiO1xuaW1wb3J0IF9fX0NTU19MT0FERVJfQVBJX0lNUE9SVF9fXyBmcm9tIFwiLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL2FwaS5qc1wiO1xudmFyIF9fX0NTU19MT0FERVJfRVhQT1JUX19fID0gX19fQ1NTX0xPQURFUl9BUElfSU1QT1JUX19fKF9fX0NTU19MT0FERVJfQVBJX1NPVVJDRU1BUF9JTVBPUlRfX18pO1xuLy8gTW9kdWxlXG5fX19DU1NfTE9BREVSX0VYUE9SVF9fXy5wdXNoKFttb2R1bGUuaWQsIFwiLyogaHR0cDovL21leWVyd2ViLmNvbS9lcmljL3Rvb2xzL2Nzcy9yZXNldC9cXHJcXG4gICB2Mi4wIHwgMjAxMTAxMjZcXHJcXG4gICBMaWNlbnNlOiBub25lIChwdWJsaWMgZG9tYWluKVxcclxcbiovXFxyXFxuXFxyXFxuaHRtbCwgYm9keSwgZGl2LCBzcGFuLCBhcHBsZXQsIG9iamVjdCwgaWZyYW1lLFxcclxcbmgxLCBoMiwgaDMsIGg0LCBoNSwgaDYsIHAsIGJsb2NrcXVvdGUsIHByZSxcXHJcXG5hLCBhYmJyLCBhY3JvbnltLCBhZGRyZXNzLCBiaWcsIGNpdGUsIGNvZGUsXFxyXFxuZGVsLCBkZm4sIGVtLCBpbWcsIGlucywga2JkLCBxLCBzLCBzYW1wLFxcclxcbnNtYWxsLCBzdHJpa2UsIHN0cm9uZywgc3ViLCBzdXAsIHR0LCB2YXIsXFxyXFxuYiwgdSwgaSwgY2VudGVyLFxcclxcbmRsLCBkdCwgZGQsIG9sLCB1bCwgbGksXFxyXFxuZmllbGRzZXQsIGZvcm0sIGxhYmVsLCBsZWdlbmQsXFxyXFxudGFibGUsIGNhcHRpb24sIHRib2R5LCB0Zm9vdCwgdGhlYWQsIHRyLCB0aCwgdGQsXFxyXFxuYXJ0aWNsZSwgYXNpZGUsIGNhbnZhcywgZGV0YWlscywgZW1iZWQsXFxyXFxuZmlndXJlLCBmaWdjYXB0aW9uLCBmb290ZXIsIGhlYWRlciwgaGdyb3VwLFxcclxcbm1lbnUsIG5hdiwgb3V0cHV0LCBydWJ5LCBzZWN0aW9uLCBzdW1tYXJ5LFxcclxcbnRpbWUsIG1hcmssIGF1ZGlvLCB2aWRlbyB7XFxyXFxuXFx0bWFyZ2luOiAwO1xcclxcblxcdHBhZGRpbmc6IDA7XFxyXFxuXFx0Ym9yZGVyOiAwO1xcclxcblxcdGZvbnQtc2l6ZTogMTAwJTtcXHJcXG5cXHRmb250OiBpbmhlcml0O1xcclxcblxcdHZlcnRpY2FsLWFsaWduOiBiYXNlbGluZTtcXHJcXG59XFxyXFxuLyogSFRNTDUgZGlzcGxheS1yb2xlIHJlc2V0IGZvciBvbGRlciBicm93c2VycyAqL1xcclxcbmFydGljbGUsIGFzaWRlLCBkZXRhaWxzLCBmaWdjYXB0aW9uLCBmaWd1cmUsXFxyXFxuZm9vdGVyLCBoZWFkZXIsIGhncm91cCwgbWVudSwgbmF2LCBzZWN0aW9uIHtcXHJcXG5cXHRkaXNwbGF5OiBibG9jaztcXHJcXG59XFxyXFxuYm9keSB7XFxyXFxuXFx0bGluZS1oZWlnaHQ6IDE7XFxyXFxufVxcclxcbm9sLCB1bCB7XFxyXFxuXFx0bGlzdC1zdHlsZTogbm9uZTtcXHJcXG59XFxyXFxuYmxvY2txdW90ZSwgcSB7XFxyXFxuXFx0cXVvdGVzOiBub25lO1xcclxcbn1cXHJcXG5ibG9ja3F1b3RlOmJlZm9yZSwgYmxvY2txdW90ZTphZnRlcixcXHJcXG5xOmJlZm9yZSwgcTphZnRlciB7XFxyXFxuXFx0Y29udGVudDogJyc7XFxyXFxuXFx0Y29udGVudDogbm9uZTtcXHJcXG59XFxyXFxudGFibGUge1xcclxcblxcdGJvcmRlci1jb2xsYXBzZTogY29sbGFwc2U7XFxyXFxuXFx0Ym9yZGVyLXNwYWNpbmc6IDA7XFxyXFxufVwiLCBcIlwiLHtcInZlcnNpb25cIjozLFwic291cmNlc1wiOltcIndlYnBhY2s6Ly8uL2Fzc2V0cy9zdHlsZXMvcmVzZXQuY3NzXCJdLFwibmFtZXNcIjpbXSxcIm1hcHBpbmdzXCI6XCJBQUFBOzs7Q0FHQzs7QUFFRDs7Ozs7Ozs7Ozs7OztDQWFDLFNBQVM7Q0FDVCxVQUFVO0NBQ1YsU0FBUztDQUNULGVBQWU7Q0FDZixhQUFhO0NBQ2Isd0JBQXdCO0FBQ3pCO0FBQ0EsZ0RBQWdEO0FBQ2hEOztDQUVDLGNBQWM7QUFDZjtBQUNBO0NBQ0MsY0FBYztBQUNmO0FBQ0E7Q0FDQyxnQkFBZ0I7QUFDakI7QUFDQTtDQUNDLFlBQVk7QUFDYjtBQUNBOztDQUVDLFdBQVc7Q0FDWCxhQUFhO0FBQ2Q7QUFDQTtDQUNDLHlCQUF5QjtDQUN6QixpQkFBaUI7QUFDbEJcIixcInNvdXJjZXNDb250ZW50XCI6W1wiLyogaHR0cDovL21leWVyd2ViLmNvbS9lcmljL3Rvb2xzL2Nzcy9yZXNldC9cXHJcXG4gICB2Mi4wIHwgMjAxMTAxMjZcXHJcXG4gICBMaWNlbnNlOiBub25lIChwdWJsaWMgZG9tYWluKVxcclxcbiovXFxyXFxuXFxyXFxuaHRtbCwgYm9keSwgZGl2LCBzcGFuLCBhcHBsZXQsIG9iamVjdCwgaWZyYW1lLFxcclxcbmgxLCBoMiwgaDMsIGg0LCBoNSwgaDYsIHAsIGJsb2NrcXVvdGUsIHByZSxcXHJcXG5hLCBhYmJyLCBhY3JvbnltLCBhZGRyZXNzLCBiaWcsIGNpdGUsIGNvZGUsXFxyXFxuZGVsLCBkZm4sIGVtLCBpbWcsIGlucywga2JkLCBxLCBzLCBzYW1wLFxcclxcbnNtYWxsLCBzdHJpa2UsIHN0cm9uZywgc3ViLCBzdXAsIHR0LCB2YXIsXFxyXFxuYiwgdSwgaSwgY2VudGVyLFxcclxcbmRsLCBkdCwgZGQsIG9sLCB1bCwgbGksXFxyXFxuZmllbGRzZXQsIGZvcm0sIGxhYmVsLCBsZWdlbmQsXFxyXFxudGFibGUsIGNhcHRpb24sIHRib2R5LCB0Zm9vdCwgdGhlYWQsIHRyLCB0aCwgdGQsXFxyXFxuYXJ0aWNsZSwgYXNpZGUsIGNhbnZhcywgZGV0YWlscywgZW1iZWQsXFxyXFxuZmlndXJlLCBmaWdjYXB0aW9uLCBmb290ZXIsIGhlYWRlciwgaGdyb3VwLFxcclxcbm1lbnUsIG5hdiwgb3V0cHV0LCBydWJ5LCBzZWN0aW9uLCBzdW1tYXJ5LFxcclxcbnRpbWUsIG1hcmssIGF1ZGlvLCB2aWRlbyB7XFxyXFxuXFx0bWFyZ2luOiAwO1xcclxcblxcdHBhZGRpbmc6IDA7XFxyXFxuXFx0Ym9yZGVyOiAwO1xcclxcblxcdGZvbnQtc2l6ZTogMTAwJTtcXHJcXG5cXHRmb250OiBpbmhlcml0O1xcclxcblxcdHZlcnRpY2FsLWFsaWduOiBiYXNlbGluZTtcXHJcXG59XFxyXFxuLyogSFRNTDUgZGlzcGxheS1yb2xlIHJlc2V0IGZvciBvbGRlciBicm93c2VycyAqL1xcclxcbmFydGljbGUsIGFzaWRlLCBkZXRhaWxzLCBmaWdjYXB0aW9uLCBmaWd1cmUsXFxyXFxuZm9vdGVyLCBoZWFkZXIsIGhncm91cCwgbWVudSwgbmF2LCBzZWN0aW9uIHtcXHJcXG5cXHRkaXNwbGF5OiBibG9jaztcXHJcXG59XFxyXFxuYm9keSB7XFxyXFxuXFx0bGluZS1oZWlnaHQ6IDE7XFxyXFxufVxcclxcbm9sLCB1bCB7XFxyXFxuXFx0bGlzdC1zdHlsZTogbm9uZTtcXHJcXG59XFxyXFxuYmxvY2txdW90ZSwgcSB7XFxyXFxuXFx0cXVvdGVzOiBub25lO1xcclxcbn1cXHJcXG5ibG9ja3F1b3RlOmJlZm9yZSwgYmxvY2txdW90ZTphZnRlcixcXHJcXG5xOmJlZm9yZSwgcTphZnRlciB7XFxyXFxuXFx0Y29udGVudDogJyc7XFxyXFxuXFx0Y29udGVudDogbm9uZTtcXHJcXG59XFxyXFxudGFibGUge1xcclxcblxcdGJvcmRlci1jb2xsYXBzZTogY29sbGFwc2U7XFxyXFxuXFx0Ym9yZGVyLXNwYWNpbmc6IDA7XFxyXFxufVwiXSxcInNvdXJjZVJvb3RcIjpcIlwifV0pO1xuLy8gRXhwb3J0c1xuZXhwb3J0IGRlZmF1bHQgX19fQ1NTX0xPQURFUl9FWFBPUlRfX187XG4iLCIvLyBJbXBvcnRzXG5pbXBvcnQgX19fQ1NTX0xPQURFUl9BUElfU09VUkNFTUFQX0lNUE9SVF9fXyBmcm9tIFwiLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL3NvdXJjZU1hcHMuanNcIjtcbmltcG9ydCBfX19DU1NfTE9BREVSX0FQSV9JTVBPUlRfX18gZnJvbSBcIi4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9hcGkuanNcIjtcbnZhciBfX19DU1NfTE9BREVSX0VYUE9SVF9fXyA9IF9fX0NTU19MT0FERVJfQVBJX0lNUE9SVF9fXyhfX19DU1NfTE9BREVSX0FQSV9TT1VSQ0VNQVBfSU1QT1JUX19fKTtcbi8vIE1vZHVsZVxuX19fQ1NTX0xPQURFUl9FWFBPUlRfX18ucHVzaChbbW9kdWxlLmlkLCBcIi8qIGJvcmRlci1ib3ggbW9kZWwgZm9yIGFsbCBlbGVtZW50cyAqL1xcclxcblxcclxcbmh0bWwge1xcclxcbiAgICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xcclxcbn1cXHJcXG5cXHJcXG4qLCAqOjpiZWZvcmUsICo6OmFmdGVyIHtcXHJcXG4gICAgYm94LXNpemluZzogaW5oZXJpdDtcXHJcXG59XFxyXFxuXFxyXFxuLyogLS0tIFBhZ2UgY29sb3Igc3R5bGluZyAtLS0gKi9cXHJcXG5cXHJcXG46cm9vdCB7XFxyXFxuICAgIC0tY29sb3ItYmctbWFpbi0xOiAjNjZiM2ZjO1xcclxcbiAgICAtLWNvbG9yLWJnLW1haW4tMjogI2RiZjVmODtcXHJcXG4gICAgLS1jb2xvci1iZy1tYWluLTM6ICNkMmY4NDg7XFxyXFxuICAgIC0tY29sb3ItYmctbWFpbi00OiAjZjBjMmNkNjM7XFxyXFxuICAgIC0tY29sb3ItZm9udC0xOiAjZDlhYTYzO1xcclxcbn1cXHJcXG5cXHJcXG4vKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tICovXFxyXFxuXFxyXFxuYm9keSB7XFxyXFxuICAgIHdpZHRoOiAxMDAlO1xcclxcbiAgICBkaXNwbGF5OiBmbGV4O1xcclxcbiAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcclxcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xcclxcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1jb2xvci1iZy1tYWluLTEpO1xcclxcbn1cXHJcXG5cXHJcXG5ib2R5Lm9wZW5lZC1tZW51IHtcXHJcXG4gICAgb3ZlcmZsb3cteTogaGlkZGVuO1xcclxcbn1cXHJcXG5cXHJcXG4uaW5hY3RpdmUge1xcclxcbiAgICB2aXNpYmlsaXR5OiBoaWRkZW47XFxyXFxuICAgIHBvc2l0aW9uOiBmaXhlZDtcXHJcXG4gICAgdG9wOiAwO1xcclxcbn1cXHJcXG5cXHJcXG4uZ3JhcGhpYywgaW1nIHtcXHJcXG4gICAgd2lkdGg6IDEwMCU7XFxyXFxuICAgIGhlaWdodDogYXV0bztcXHJcXG4gICAgcGFkZGluZzogMDtcXHJcXG4gICAgbWFyZ2luOiAwO1xcclxcbn1cXHJcXG5cXHJcXG4uY29udGFpbmVyLWNlbnRlcmVkIHtcXHJcXG4gICAgbWF4LXdpZHRoOiAxNDQwcHg7XFxyXFxuICAgIG1pbi13aWR0aDogMTQ0MHB4O1xcclxcbiAgICBtYXJnaW46IDAgYXV0bztcXHJcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0tY29sb3ItYmctbWFpbi0yKTtcXHJcXG59XFxyXFxuXFxyXFxuaGVhZGVyIHtcXHJcXG4gICAgZGlzcGxheTogZmxleDtcXHJcXG4gICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXHJcXG4gICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxyXFxuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxyXFxuICAgIHBvc2l0aW9uOiAtd2Via2l0LXN0aWNreTtcXHJcXG4gICAgcG9zaXRpb246IHN0aWNreTtcXHJcXG4gICAgdG9wOiAwO1xcclxcbiAgICB6LWluZGV4OiA4O1xcclxcbn1cXHJcXG5cXHJcXG4ubWFpbi1jb250cm9scywgLmdhbWUtY29udHJvbHMge1xcclxcbiAgICB3aWR0aDogMTAwJTtcXHJcXG4gICAgbWluLWhlaWdodDogMTAwcHg7XFxyXFxuICAgIGRpc3BsYXk6IGZsZXg7XFxyXFxuICAgIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjtcXHJcXG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXHJcXG59XFxyXFxuXFxyXFxuaDEge1xcclxcbiAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XFxyXFxufVxcclxcblxcclxcbi5idXR0b246aG92ZXIge1xcclxcbiAgICBjdXJzb3I6IHBvaW50ZXI7XFxyXFxufVxcclxcblxcclxcbi5tZW51LWJ1dHRvbiB7XFxyXFxuICAgIGhlaWdodDogMjBweDtcXHJcXG4gICAgei1pbmRleDogMTA7XFxyXFxufVxcclxcblxcclxcbi5zd2l0Y2gge1xcclxcbiAgICB3aWR0aDogMTEwcHg7XFxyXFxuICAgIGJhY2tncm91bmQtY29sb3I6IHdoaXRlc21va2U7XFxyXFxuICAgIGRpc3BsYXk6IGZsZXg7XFxyXFxuICAgIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjtcXHJcXG4gICAgYm9yZGVyLXJhZGl1czogNjBweDtcXHJcXG4gICAgcG9zaXRpb246IHJlbGF0aXZlO1xcclxcbn1cXHJcXG5cXHJcXG4uc3dpdGNoLXJhaWwge1xcclxcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XFxyXFxuICAgIGxlZnQ6IDA7XFxyXFxuICAgIHdpZHRoOiAxMDAlO1xcclxcbiAgICBoZWlnaHQ6IDEwMCU7XFxyXFxuICAgIGJvcmRlci1yYWRpdXM6IGluaGVyaXQ7XFxyXFxuICAgIGRpc3BsYXk6IGZsZXg7XFxyXFxuICAgIGp1c3RpZnktY29udGVudDogZmxleC1zdGFydDtcXHJcXG59XFxyXFxuXFxyXFxuLnN3aXRjaC5zd2l0Y2gtb24gLnN3aXRjaC1yYWlsIHtcXHJcXG4gICAganVzdGlmeS1jb250ZW50OiBmbGV4LWVuZDtcXHJcXG59XFxyXFxuXFxyXFxuLnN3aXRjaC1yb2xsZXIge1xcclxcbiAgICB3aWR0aDogNTVweDtcXHJcXG4gICAgYm9yZGVyLXJhZGl1czogaW5oZXJpdDtcXHJcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogcmdiYSgyMTQsIDIyNSwgNjUsIDAuNDU5KTtcXHJcXG4gICAgei1pbmRleDogMTA7XFxyXFxufVxcclxcblxcclxcbi5zd2l0Y2gtdHJpZ2dlciB7XFxyXFxuICAgIG1hcmdpbjogMCAxMHB4O1xcclxcbiAgICBoZWlnaHQ6IDQwcHg7XFxyXFxuICAgIHotaW5kZXg6IDk7XFxyXFxuICAgIHBhZGRpbmc6IDEwcHggMDtcXHJcXG4gICAgdGV4dC1hbGlnbjogY2VudGVyO1xcclxcbn1cXHJcXG5cXHJcXG4uZ2FtZS1idXR0b24ge1xcclxcbiAgICB3aWR0aDogMTAwcHg7XFxyXFxuICAgIGhlaWdodDogMTAwcHg7XFxyXFxuICAgIGJhY2tncm91bmQtY29sb3I6IHJnYigyMTMsIDE3OCwgMjQ4KTtcXHJcXG59XFxyXFxuXFxyXFxuLmdhbWUtYnV0dG9uLnJlcGVhdC1idXR0b24ge1xcclxcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2IoMjQ4LCAxNzgsIDExMik7XFxyXFxufVxcclxcblxcclxcbi5nYW1lLXByb2dyZXNzIHtcXHJcXG4gICAgd2lkdGg6IDIyMHB4O1xcclxcbiAgICBkaXNwbGF5OiBmbGV4O1xcclxcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWFyb3VuZDtcXHJcXG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXHJcXG59XFxyXFxuXFxyXFxuLmdhbWUtaW5kaWNhdG9yIHtcXHJcXG4gICAgd2lkdGg6IDE1MHB4O1xcclxcbiAgICBoZWlnaHQ6IDQwcHg7XFxyXFxuICAgIGJhY2tncm91bmQtY29sb3I6IHJlZDtcXHJcXG4gICAgYm9yZGVyLXJhZGl1czogMThweDtcXHJcXG4gICAgZGlzcGxheTogZmxleDtcXHJcXG4gICAganVzdGlmeS1jb250ZW50OiBmbGV4LXN0YXJ0O1xcclxcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xcclxcbn1cXHJcXG5cXHJcXG4uc3RhciB7XFxyXFxuICAgIHdpZHRoOiAzMHB4O1xcclxcbn1cXHJcXG5cXHJcXG4uZ2FtZS1zY29yZSB7XFxyXFxuICAgIHRleHQtYWxpZ246IGNlbnRlcjtcXHJcXG59XFxyXFxuXFxyXFxuLmdhbWUtc2NvcmUgLmNvcnJlY3Qge1xcclxcbiAgICBjb2xvcjogZ3JlZW47XFxyXFxufVxcclxcblxcclxcbi5nYW1lLXNjb3JlIC53cm9uZyB7XFxyXFxuICAgIGNvbG9yOiByZWQ7XFxyXFxufVxcclxcblxcclxcblxcclxcbm5hdiB7XFxyXFxuICAgIHBvc2l0aW9uOiBmaXhlZDtcXHJcXG4gICAgdG9wOiAwO1xcclxcbiAgICBsZWZ0OiAtMzIwcHg7XFxyXFxuICAgIHdpZHRoOiAzMjBweDtcXHJcXG4gICAgaGVpZ2h0OiAxMDAlO1xcclxcbiAgICBkaXNwbGF5OiBmbGV4O1xcclxcbiAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcclxcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXHJcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0tY29sb3ItYmctbWFpbi0zKTtcXHJcXG4gICAgei1pbmRleDogOTtcXHJcXG4gICAgdmlzaWJpbGl0eTogaGlkZGVuO1xcclxcbn1cXHJcXG5cXHJcXG5uYXYub3BlbmVkLW1lbnUge1xcclxcbiAgICB2aXNpYmlsaXR5OiB2aXNpYmxlO1xcclxcbiAgICBsZWZ0OiAwO1xcclxcbn1cXHJcXG5cXHJcXG4ubWVudS1saXN0IGxpIHtcXHJcXG4gICAgdGV4dC1hbGlnbjogY2VudGVyO1xcclxcbiAgICBtYXJnaW46IDE1cHggMDtcXHJcXG4gICAgZm9udC1zaXplOiAyZW07XFxyXFxuICAgIGJhY2tncm91bmQtY29sb3I6IHZhcigtLWNvbG9yLWJnLW1haW4tMSk7XFxyXFxufVxcclxcblxcclxcbi5tZW51LWxpc3QgbGkuYWN0aXZlLXBhZ2Uge1xcclxcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1jb2xvci1iZy1tYWluLTQpO1xcclxcbn1cXHJcXG5cXHJcXG5tYWluLmNvbnRhaW5lci1jZW50ZXJlZCB7XFxyXFxuICAgIGJhY2tncm91bmQtY29sb3I6IHZhcigtLWNvbG9yLWJnLW1haW4tNCk7XFxyXFxufVxcclxcblxcclxcbi5jYXJkLWNvbnRhaW5lciB7XFxyXFxuICAgIGRpc3BsYXk6IGZsZXg7XFxyXFxuICAgIGp1c3RpZnktY29udGVudDogc3BhY2UtYXJvdW5kO1xcclxcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xcclxcbiAgICBmbGV4LXdyYXA6IHdyYXA7XFxyXFxufVxcclxcblxcclxcbi5jYXJkIHtcXHJcXG4gICAgd2lkdGg6IDI4MHB4O1xcclxcbiAgICBoZWlnaHQ6IDI3MHB4O1xcclxcbiAgICBtYXJnaW46IDE1cHg7XFxyXFxuICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcXHJcXG59XFxyXFxuXFxyXFxuLmNhcmQtbWFpbi1wYWdlIHtcXHJcXG4gICAgaGVpZ2h0OiAyNDBweDtcXHJcXG59XFxyXFxuXFxyXFxuLmNhcmQuZGlzYWJsZWQge1xcclxcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjZDJmODQ4O1xcclxcbn1cXHJcXG5cXHJcXG4uY2FyZC1jb250ZW50IHtcXHJcXG4gICAgd2lkdGg6IDEwMCU7XFxyXFxuICAgIGhlaWdodDogMTAwJTtcXHJcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogcm95YWxibHVlO1xcclxcbiAgICBwb3NpdGlvbjogcmVsYXRpdmU7XFxyXFxufVxcclxcblxcclxcbi5jYXJkLWNvbnRlbnQsIC5jYXJkIGltZyB7XFxyXFxuICAgIGJvcmRlci1yYWRpdXM6IDI1cHg7XFxyXFxufVxcclxcblxcclxcbi5jYXJkIHAge1xcclxcbiAgICBtYXJnaW4tdG9wOiAxNXB4O1xcclxcbiAgICBmb250LXNpemU6IDMycHg7XFxyXFxuICAgIHRleHQtYWxpZ246IGNlbnRlcjtcXHJcXG59XFxyXFxuXFxyXFxuLmNhcmQtbWFpbi1wYWdlIHAge1xcclxcbiAgICBtYXJnaW46IDVweCAwO1xcclxcbn1cXHJcXG5cXHJcXG4uY2FyZC1mbGlwLWJ1dHRvbiB7XFxyXFxuICAgIHdpZHRoOiA1MHB4O1xcclxcbiAgICBoZWlnaHQ6IDUwcHg7XFxyXFxuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXHJcXG4gICAgYm90dG9tOiAyMHB4O1xcclxcbiAgICByaWdodDogMjBweDtcXHJcXG59XFxyXFxuXFxyXFxuLmNhcmQtZmxpcC1idXR0b24gc3BhbiB7XFxyXFxuICAgIGZvbnQtc2l6ZTogNTBweDtcXHJcXG59XFxyXFxuXFxyXFxuLmZsaXBwZWQgLmNhcmQtY29udGVudCB7XFxyXFxuICAgIGFuaW1hdGlvbi1uYW1lOiBmbGlwLWNhcmQ7XFxyXFxuICAgIGFuaW1hdGlvbi1kdXJhdGlvbjogMXM7XFxyXFxufVxcclxcblxcclxcbi51bmZsaXBwZWQgLmNhcmQtY29udGVudCB7XFxyXFxuICAgIGFuaW1hdGlvbi1uYW1lOiB1bmZsaXAtY2FyZDtcXHJcXG4gICAgYW5pbWF0aW9uLWR1cmF0aW9uOiAxcztcXHJcXG59XFxyXFxuXFxyXFxuLmZpbmFsLWNsaXAge1xcclxcbiAgICBkaXNwbGF5OiBmbGV4O1xcclxcbiAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcclxcbiAgICB3aWR0aDogMzIwcHg7XFxyXFxuICAgIG1hcmdpbjogYXV0bztcXHJcXG4gICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxyXFxuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxyXFxuICAgIHBhZGRpbmc6IDUwcHggMDtcXHJcXG59XFxyXFxuXFxyXFxuLmZpbmFsLWNsaXAgcCB7XFxyXFxuICAgIGNvbG9yOiByZWQ7XFxyXFxuICAgIGZvbnQtc2l6ZTogMzZweDtcXHJcXG4gICAgbWFyZ2luLXRvcDogMzBweDtcXHJcXG59XFxyXFxuXFxyXFxuLnN0YXQtY29udGFpbmVyIHtcXHJcXG4gICAgZGlzcGxheTogZmxleDtcXHJcXG4gICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXHJcXG4gICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxyXFxuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxyXFxuICAgIGZvbnQtc2l6ZTogMmVtO1xcclxcbn1cXHJcXG5cXHJcXG4udGFibGUtd3JhcHBlciB7XFxyXFxuICAgIHdpZHRoOiBjYWxjKDE0NDB2dyoxMDAvMTQ0MCk7XFxyXFxuICAgIG92ZXJmbG93LXg6IGF1dG87XFxyXFxuICAgIGRpc3BsYXk6IGZsZXg7XFxyXFxuICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxyXFxuICAgIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcclxcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xcclxcbn1cXHJcXG5cXHJcXG4uc3RhdC10YWJsZSB7XFxyXFxuICAgIHdpZHRoOiBjYWxjKDE0NDB2dyoxMDAvMTQ0MCk7XFxyXFxuICAgIG1heC13aWR0aDogMTQ0MHB4O1xcclxcbiAgICBtaW4td2lkdGg6IDUwMHB4O1xcclxcbiAgICBib3JkZXItY29sbGFwc2U6IGNvbGxhcHNlO1xcclxcbiAgICBmb250LXNpemU6IDAuNWVtO1xcclxcblxcclxcbn1cXHJcXG5cXHJcXG50aGVhZCB7XFxyXFxuICAgIGJhY2tncm91bmQtY29sb3I6IGFsaWNlYmx1ZTtcXHJcXG59XFxyXFxuXFxyXFxudGgge1xcclxcbiAgICBoZWlnaHQ6IDMwcHg7XFxyXFxufVxcclxcblxcclxcbnRyIHtcXHJcXG4gICAgaGVpZ2h0OiAyNXB4O1xcclxcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiBhenVyZTtcXHJcXG59XFxyXFxuXFxyXFxudGgsIHRkIHtcXHJcXG4gICAgYm9yZGVyOiAxcHggc29saWQgYmxhY2s7XFxyXFxuICAgIHRleHQtYWxpZ246IGNlbnRlcjtcXHJcXG4gICAgdmVydGljYWwtYWxpZ246IG1pZGRsZTtcXHJcXG59XFxyXFxuXFxyXFxudHI6bnRoLWNoaWxkKGV2ZW4pIHtcXHJcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogI2ZkZmRkZTtcXHJcXG59XFxyXFxuXFxyXFxuLnNvcnRlZC1kb3duLCAuc29ydGVkLXVwIHtcXHJcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogI2QwZmE4MTtcXHJcXG59XFxyXFxuXFxyXFxuLnNvcnQtaWNvbiB7XFxyXFxuICAgIHdpZHRoOiAxNnB4O1xcclxcbiAgICBoZWlnaHQ6IGF1dG87XFxyXFxuICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcXHJcXG4gICAgbGVmdDogMTBweDtcXHJcXG4gICAgdG9wOiAycHg7XFxyXFxufVxcclxcblxcclxcbi5zdGF0LWJ1dHRvbnMtd3JhcHBlciB7XFxyXFxuICAgIHdpZHRoOiAxMDAlO1xcclxcbiAgICBkaXNwbGF5OiBmbGV4O1xcclxcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWFyb3VuZDtcXHJcXG4gICAgZmxleC13cmFwOiB3cmFwO1xcclxcbn1cXHJcXG5cXHJcXG4uc3RhdC1idXR0b24ge1xcclxcbiAgICB3aWR0aDogMzAwcHg7XFxyXFxuICAgIGhlaWdodDogNzBweDtcXHJcXG4gICAgbWFyZ2luOiAyMHB4IDA7XFxyXFxuICAgIHBhZGRpbmc6IDE1cHg7XFxyXFxuICAgIGJvcmRlci1yYWRpdXM6IDUwcHg7XFxyXFxuICAgIGJvcmRlcjogMXB4IHNvbGlkIHJnYigwLCAwLCAwKTtcXHJcXG4gICAgY29sb3I6IGF6dXJlO1xcclxcbiAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XFxyXFxufVxcclxcblxcclxcbi5idXR0b24udHJhaW4tZGlmZiB7XFxyXFxuICAgIGJhY2tncm91bmQtY29sb3I6IHJnYig3LCAxNjAsIDk2KTtcXHJcXG59XFxyXFxuXFxyXFxuLmJ1dHRvbi5yZXNldC1zdGF0IHtcXHJcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogcmdiKDE4OSwgNDUsIDQ1KTtcXHJcXG59XFxyXFxuXFxyXFxuLm5vdGhpbmctZGlmZiB7XFxyXFxuICAgIHdpZHRoOiAxMDAlO1xcclxcbn1cXHJcXG5cXHJcXG4ubm90aGluZy1kaWZmIHAge1xcclxcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XFxyXFxuICAgIHRvcDogMjAlO1xcclxcbn1cXHJcXG5cXHJcXG4uZGlzYWJsZWQ6aG92ZXIge1xcclxcbiAgICBjdXJzb3I6bm90LWFsbG93ZWQ7XFxyXFxufVxcclxcblxcclxcbkBrZXlmcmFtZXMgZmxpcC1jYXJkIHtcXHJcXG4gICAgMCUge31cXHJcXG4gICAgNTAlIHt0cmFuc2Zvcm06IHJvdGF0ZVkoODlkZWcpfVxcclxcbn1cXHJcXG5cXHJcXG5Aa2V5ZnJhbWVzIHVuZmxpcC1jYXJkIHtcXHJcXG4gICAgMCUge31cXHJcXG4gICAgNTAlIHt0cmFuc2Zvcm06IHJvdGF0ZVkoODlkZWcpfVxcclxcbn1cXHJcXG5cXHJcXG4vKiAtLS0gUkVTUE9OU0lWRSBMQVlPVVRTIC0tLSAqL1xcclxcblxcclxcbkBtZWRpYSAobWF4LXdpZHRoOiAxNDM5cHgpIHtcXHJcXG4gICAgLmNvbnRhaW5lci1jZW50ZXJlZCB7XFxyXFxuICAgICAgICBtaW4td2lkdGg6IGNhbGMoMTQ0MHZ3KjEwMC8xNDQwKTtcXHJcXG4gICAgfVxcclxcblxcclxcbn1cIiwgXCJcIix7XCJ2ZXJzaW9uXCI6MyxcInNvdXJjZXNcIjpbXCJ3ZWJwYWNrOi8vLi9hc3NldHMvc3R5bGVzL3N0eWxlLmNzc1wiXSxcIm5hbWVzXCI6W10sXCJtYXBwaW5nc1wiOlwiQUFBQSxzQ0FBc0M7O0FBRXRDO0lBQ0ksc0JBQXNCO0FBQzFCOztBQUVBO0lBQ0ksbUJBQW1CO0FBQ3ZCOztBQUVBLCtCQUErQjs7QUFFL0I7SUFDSSwwQkFBMEI7SUFDMUIsMEJBQTBCO0lBQzFCLDBCQUEwQjtJQUMxQiw0QkFBNEI7SUFDNUIsdUJBQXVCO0FBQzNCOztBQUVBLHVDQUF1Qzs7QUFFdkM7SUFDSSxXQUFXO0lBQ1gsYUFBYTtJQUNiLHNCQUFzQjtJQUN0QixtQkFBbUI7SUFDbkIsd0NBQXdDO0FBQzVDOztBQUVBO0lBQ0ksa0JBQWtCO0FBQ3RCOztBQUVBO0lBQ0ksa0JBQWtCO0lBQ2xCLGVBQWU7SUFDZixNQUFNO0FBQ1Y7O0FBRUE7SUFDSSxXQUFXO0lBQ1gsWUFBWTtJQUNaLFVBQVU7SUFDVixTQUFTO0FBQ2I7O0FBRUE7SUFDSSxpQkFBaUI7SUFDakIsaUJBQWlCO0lBQ2pCLGNBQWM7SUFDZCx3Q0FBd0M7QUFDNUM7O0FBRUE7SUFDSSxhQUFhO0lBQ2Isc0JBQXNCO0lBQ3RCLHVCQUF1QjtJQUN2QixtQkFBbUI7SUFDbkIsd0JBQXdCO0lBQ3hCLGdCQUFnQjtJQUNoQixNQUFNO0lBQ04sVUFBVTtBQUNkOztBQUVBO0lBQ0ksV0FBVztJQUNYLGlCQUFpQjtJQUNqQixhQUFhO0lBQ2IsOEJBQThCO0lBQzlCLG1CQUFtQjtBQUN2Qjs7QUFFQTtJQUNJLGtCQUFrQjtBQUN0Qjs7QUFFQTtJQUNJLGVBQWU7QUFDbkI7O0FBRUE7SUFDSSxZQUFZO0lBQ1osV0FBVztBQUNmOztBQUVBO0lBQ0ksWUFBWTtJQUNaLDRCQUE0QjtJQUM1QixhQUFhO0lBQ2IsOEJBQThCO0lBQzlCLG1CQUFtQjtJQUNuQixrQkFBa0I7QUFDdEI7O0FBRUE7SUFDSSxrQkFBa0I7SUFDbEIsT0FBTztJQUNQLFdBQVc7SUFDWCxZQUFZO0lBQ1osc0JBQXNCO0lBQ3RCLGFBQWE7SUFDYiwyQkFBMkI7QUFDL0I7O0FBRUE7SUFDSSx5QkFBeUI7QUFDN0I7O0FBRUE7SUFDSSxXQUFXO0lBQ1gsc0JBQXNCO0lBQ3RCLDJDQUEyQztJQUMzQyxXQUFXO0FBQ2Y7O0FBRUE7SUFDSSxjQUFjO0lBQ2QsWUFBWTtJQUNaLFVBQVU7SUFDVixlQUFlO0lBQ2Ysa0JBQWtCO0FBQ3RCOztBQUVBO0lBQ0ksWUFBWTtJQUNaLGFBQWE7SUFDYixvQ0FBb0M7QUFDeEM7O0FBRUE7SUFDSSxvQ0FBb0M7QUFDeEM7O0FBRUE7SUFDSSxZQUFZO0lBQ1osYUFBYTtJQUNiLDZCQUE2QjtJQUM3QixtQkFBbUI7QUFDdkI7O0FBRUE7SUFDSSxZQUFZO0lBQ1osWUFBWTtJQUNaLHFCQUFxQjtJQUNyQixtQkFBbUI7SUFDbkIsYUFBYTtJQUNiLDJCQUEyQjtJQUMzQixtQkFBbUI7QUFDdkI7O0FBRUE7SUFDSSxXQUFXO0FBQ2Y7O0FBRUE7SUFDSSxrQkFBa0I7QUFDdEI7O0FBRUE7SUFDSSxZQUFZO0FBQ2hCOztBQUVBO0lBQ0ksVUFBVTtBQUNkOzs7QUFHQTtJQUNJLGVBQWU7SUFDZixNQUFNO0lBQ04sWUFBWTtJQUNaLFlBQVk7SUFDWixZQUFZO0lBQ1osYUFBYTtJQUNiLHNCQUFzQjtJQUN0Qix1QkFBdUI7SUFDdkIsd0NBQXdDO0lBQ3hDLFVBQVU7SUFDVixrQkFBa0I7QUFDdEI7O0FBRUE7SUFDSSxtQkFBbUI7SUFDbkIsT0FBTztBQUNYOztBQUVBO0lBQ0ksa0JBQWtCO0lBQ2xCLGNBQWM7SUFDZCxjQUFjO0lBQ2Qsd0NBQXdDO0FBQzVDOztBQUVBO0lBQ0ksd0NBQXdDO0FBQzVDOztBQUVBO0lBQ0ksd0NBQXdDO0FBQzVDOztBQUVBO0lBQ0ksYUFBYTtJQUNiLDZCQUE2QjtJQUM3QixtQkFBbUI7SUFDbkIsZUFBZTtBQUNuQjs7QUFFQTtJQUNJLFlBQVk7SUFDWixhQUFhO0lBQ2IsWUFBWTtJQUNaLGtCQUFrQjtBQUN0Qjs7QUFFQTtJQUNJLGFBQWE7QUFDakI7O0FBRUE7SUFDSSx5QkFBeUI7QUFDN0I7O0FBRUE7SUFDSSxXQUFXO0lBQ1gsWUFBWTtJQUNaLDJCQUEyQjtJQUMzQixrQkFBa0I7QUFDdEI7O0FBRUE7SUFDSSxtQkFBbUI7QUFDdkI7O0FBRUE7SUFDSSxnQkFBZ0I7SUFDaEIsZUFBZTtJQUNmLGtCQUFrQjtBQUN0Qjs7QUFFQTtJQUNJLGFBQWE7QUFDakI7O0FBRUE7SUFDSSxXQUFXO0lBQ1gsWUFBWTtJQUNaLGtCQUFrQjtJQUNsQixZQUFZO0lBQ1osV0FBVztBQUNmOztBQUVBO0lBQ0ksZUFBZTtBQUNuQjs7QUFFQTtJQUNJLHlCQUF5QjtJQUN6QixzQkFBc0I7QUFDMUI7O0FBRUE7SUFDSSwyQkFBMkI7SUFDM0Isc0JBQXNCO0FBQzFCOztBQUVBO0lBQ0ksYUFBYTtJQUNiLHNCQUFzQjtJQUN0QixZQUFZO0lBQ1osWUFBWTtJQUNaLHVCQUF1QjtJQUN2QixtQkFBbUI7SUFDbkIsZUFBZTtBQUNuQjs7QUFFQTtJQUNJLFVBQVU7SUFDVixlQUFlO0lBQ2YsZ0JBQWdCO0FBQ3BCOztBQUVBO0lBQ0ksYUFBYTtJQUNiLHNCQUFzQjtJQUN0Qix1QkFBdUI7SUFDdkIsbUJBQW1CO0lBQ25CLGNBQWM7QUFDbEI7O0FBRUE7SUFDSSw0QkFBNEI7SUFDNUIsZ0JBQWdCO0lBQ2hCLGFBQWE7SUFDYixzQkFBc0I7SUFDdEIsdUJBQXVCO0lBQ3ZCLG1CQUFtQjtBQUN2Qjs7QUFFQTtJQUNJLDRCQUE0QjtJQUM1QixpQkFBaUI7SUFDakIsZ0JBQWdCO0lBQ2hCLHlCQUF5QjtJQUN6QixnQkFBZ0I7O0FBRXBCOztBQUVBO0lBQ0ksMkJBQTJCO0FBQy9COztBQUVBO0lBQ0ksWUFBWTtBQUNoQjs7QUFFQTtJQUNJLFlBQVk7SUFDWix1QkFBdUI7QUFDM0I7O0FBRUE7SUFDSSx1QkFBdUI7SUFDdkIsa0JBQWtCO0lBQ2xCLHNCQUFzQjtBQUMxQjs7QUFFQTtJQUNJLHlCQUF5QjtBQUM3Qjs7QUFFQTtJQUNJLHlCQUF5QjtBQUM3Qjs7QUFFQTtJQUNJLFdBQVc7SUFDWCxZQUFZO0lBQ1osa0JBQWtCO0lBQ2xCLFVBQVU7SUFDVixRQUFRO0FBQ1o7O0FBRUE7SUFDSSxXQUFXO0lBQ1gsYUFBYTtJQUNiLDZCQUE2QjtJQUM3QixlQUFlO0FBQ25COztBQUVBO0lBQ0ksWUFBWTtJQUNaLFlBQVk7SUFDWixjQUFjO0lBQ2QsYUFBYTtJQUNiLG1CQUFtQjtJQUNuQiw4QkFBOEI7SUFDOUIsWUFBWTtJQUNaLGtCQUFrQjtBQUN0Qjs7QUFFQTtJQUNJLGlDQUFpQztBQUNyQzs7QUFFQTtJQUNJLGtDQUFrQztBQUN0Qzs7QUFFQTtJQUNJLFdBQVc7QUFDZjs7QUFFQTtJQUNJLGtCQUFrQjtJQUNsQixRQUFRO0FBQ1o7O0FBRUE7SUFDSSxrQkFBa0I7QUFDdEI7O0FBRUE7SUFDSSxJQUFJO0lBQ0osS0FBSyx5QkFBeUI7QUFDbEM7O0FBRUE7SUFDSSxJQUFJO0lBQ0osS0FBSyx5QkFBeUI7QUFDbEM7O0FBRUEsK0JBQStCOztBQUUvQjtJQUNJO1FBQ0ksZ0NBQWdDO0lBQ3BDOztBQUVKXCIsXCJzb3VyY2VzQ29udGVudFwiOltcIi8qIGJvcmRlci1ib3ggbW9kZWwgZm9yIGFsbCBlbGVtZW50cyAqL1xcclxcblxcclxcbmh0bWwge1xcclxcbiAgICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xcclxcbn1cXHJcXG5cXHJcXG4qLCAqOjpiZWZvcmUsICo6OmFmdGVyIHtcXHJcXG4gICAgYm94LXNpemluZzogaW5oZXJpdDtcXHJcXG59XFxyXFxuXFxyXFxuLyogLS0tIFBhZ2UgY29sb3Igc3R5bGluZyAtLS0gKi9cXHJcXG5cXHJcXG46cm9vdCB7XFxyXFxuICAgIC0tY29sb3ItYmctbWFpbi0xOiAjNjZiM2ZjO1xcclxcbiAgICAtLWNvbG9yLWJnLW1haW4tMjogI2RiZjVmODtcXHJcXG4gICAgLS1jb2xvci1iZy1tYWluLTM6ICNkMmY4NDg7XFxyXFxuICAgIC0tY29sb3ItYmctbWFpbi00OiAjZjBjMmNkNjM7XFxyXFxuICAgIC0tY29sb3ItZm9udC0xOiAjZDlhYTYzO1xcclxcbn1cXHJcXG5cXHJcXG4vKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tICovXFxyXFxuXFxyXFxuYm9keSB7XFxyXFxuICAgIHdpZHRoOiAxMDAlO1xcclxcbiAgICBkaXNwbGF5OiBmbGV4O1xcclxcbiAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcclxcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xcclxcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1jb2xvci1iZy1tYWluLTEpO1xcclxcbn1cXHJcXG5cXHJcXG5ib2R5Lm9wZW5lZC1tZW51IHtcXHJcXG4gICAgb3ZlcmZsb3cteTogaGlkZGVuO1xcclxcbn1cXHJcXG5cXHJcXG4uaW5hY3RpdmUge1xcclxcbiAgICB2aXNpYmlsaXR5OiBoaWRkZW47XFxyXFxuICAgIHBvc2l0aW9uOiBmaXhlZDtcXHJcXG4gICAgdG9wOiAwO1xcclxcbn1cXHJcXG5cXHJcXG4uZ3JhcGhpYywgaW1nIHtcXHJcXG4gICAgd2lkdGg6IDEwMCU7XFxyXFxuICAgIGhlaWdodDogYXV0bztcXHJcXG4gICAgcGFkZGluZzogMDtcXHJcXG4gICAgbWFyZ2luOiAwO1xcclxcbn1cXHJcXG5cXHJcXG4uY29udGFpbmVyLWNlbnRlcmVkIHtcXHJcXG4gICAgbWF4LXdpZHRoOiAxNDQwcHg7XFxyXFxuICAgIG1pbi13aWR0aDogMTQ0MHB4O1xcclxcbiAgICBtYXJnaW46IDAgYXV0bztcXHJcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0tY29sb3ItYmctbWFpbi0yKTtcXHJcXG59XFxyXFxuXFxyXFxuaGVhZGVyIHtcXHJcXG4gICAgZGlzcGxheTogZmxleDtcXHJcXG4gICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXHJcXG4gICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxyXFxuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxyXFxuICAgIHBvc2l0aW9uOiAtd2Via2l0LXN0aWNreTtcXHJcXG4gICAgcG9zaXRpb246IHN0aWNreTtcXHJcXG4gICAgdG9wOiAwO1xcclxcbiAgICB6LWluZGV4OiA4O1xcclxcbn1cXHJcXG5cXHJcXG4ubWFpbi1jb250cm9scywgLmdhbWUtY29udHJvbHMge1xcclxcbiAgICB3aWR0aDogMTAwJTtcXHJcXG4gICAgbWluLWhlaWdodDogMTAwcHg7XFxyXFxuICAgIGRpc3BsYXk6IGZsZXg7XFxyXFxuICAgIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjtcXHJcXG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXHJcXG59XFxyXFxuXFxyXFxuaDEge1xcclxcbiAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XFxyXFxufVxcclxcblxcclxcbi5idXR0b246aG92ZXIge1xcclxcbiAgICBjdXJzb3I6IHBvaW50ZXI7XFxyXFxufVxcclxcblxcclxcbi5tZW51LWJ1dHRvbiB7XFxyXFxuICAgIGhlaWdodDogMjBweDtcXHJcXG4gICAgei1pbmRleDogMTA7XFxyXFxufVxcclxcblxcclxcbi5zd2l0Y2gge1xcclxcbiAgICB3aWR0aDogMTEwcHg7XFxyXFxuICAgIGJhY2tncm91bmQtY29sb3I6IHdoaXRlc21va2U7XFxyXFxuICAgIGRpc3BsYXk6IGZsZXg7XFxyXFxuICAgIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjtcXHJcXG4gICAgYm9yZGVyLXJhZGl1czogNjBweDtcXHJcXG4gICAgcG9zaXRpb246IHJlbGF0aXZlO1xcclxcbn1cXHJcXG5cXHJcXG4uc3dpdGNoLXJhaWwge1xcclxcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XFxyXFxuICAgIGxlZnQ6IDA7XFxyXFxuICAgIHdpZHRoOiAxMDAlO1xcclxcbiAgICBoZWlnaHQ6IDEwMCU7XFxyXFxuICAgIGJvcmRlci1yYWRpdXM6IGluaGVyaXQ7XFxyXFxuICAgIGRpc3BsYXk6IGZsZXg7XFxyXFxuICAgIGp1c3RpZnktY29udGVudDogZmxleC1zdGFydDtcXHJcXG59XFxyXFxuXFxyXFxuLnN3aXRjaC5zd2l0Y2gtb24gLnN3aXRjaC1yYWlsIHtcXHJcXG4gICAganVzdGlmeS1jb250ZW50OiBmbGV4LWVuZDtcXHJcXG59XFxyXFxuXFxyXFxuLnN3aXRjaC1yb2xsZXIge1xcclxcbiAgICB3aWR0aDogNTVweDtcXHJcXG4gICAgYm9yZGVyLXJhZGl1czogaW5oZXJpdDtcXHJcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogcmdiYSgyMTQsIDIyNSwgNjUsIDAuNDU5KTtcXHJcXG4gICAgei1pbmRleDogMTA7XFxyXFxufVxcclxcblxcclxcbi5zd2l0Y2gtdHJpZ2dlciB7XFxyXFxuICAgIG1hcmdpbjogMCAxMHB4O1xcclxcbiAgICBoZWlnaHQ6IDQwcHg7XFxyXFxuICAgIHotaW5kZXg6IDk7XFxyXFxuICAgIHBhZGRpbmc6IDEwcHggMDtcXHJcXG4gICAgdGV4dC1hbGlnbjogY2VudGVyO1xcclxcbn1cXHJcXG5cXHJcXG4uZ2FtZS1idXR0b24ge1xcclxcbiAgICB3aWR0aDogMTAwcHg7XFxyXFxuICAgIGhlaWdodDogMTAwcHg7XFxyXFxuICAgIGJhY2tncm91bmQtY29sb3I6IHJnYigyMTMsIDE3OCwgMjQ4KTtcXHJcXG59XFxyXFxuXFxyXFxuLmdhbWUtYnV0dG9uLnJlcGVhdC1idXR0b24ge1xcclxcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2IoMjQ4LCAxNzgsIDExMik7XFxyXFxufVxcclxcblxcclxcbi5nYW1lLXByb2dyZXNzIHtcXHJcXG4gICAgd2lkdGg6IDIyMHB4O1xcclxcbiAgICBkaXNwbGF5OiBmbGV4O1xcclxcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWFyb3VuZDtcXHJcXG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXHJcXG59XFxyXFxuXFxyXFxuLmdhbWUtaW5kaWNhdG9yIHtcXHJcXG4gICAgd2lkdGg6IDE1MHB4O1xcclxcbiAgICBoZWlnaHQ6IDQwcHg7XFxyXFxuICAgIGJhY2tncm91bmQtY29sb3I6IHJlZDtcXHJcXG4gICAgYm9yZGVyLXJhZGl1czogMThweDtcXHJcXG4gICAgZGlzcGxheTogZmxleDtcXHJcXG4gICAganVzdGlmeS1jb250ZW50OiBmbGV4LXN0YXJ0O1xcclxcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xcclxcbn1cXHJcXG5cXHJcXG4uc3RhciB7XFxyXFxuICAgIHdpZHRoOiAzMHB4O1xcclxcbn1cXHJcXG5cXHJcXG4uZ2FtZS1zY29yZSB7XFxyXFxuICAgIHRleHQtYWxpZ246IGNlbnRlcjtcXHJcXG59XFxyXFxuXFxyXFxuLmdhbWUtc2NvcmUgLmNvcnJlY3Qge1xcclxcbiAgICBjb2xvcjogZ3JlZW47XFxyXFxufVxcclxcblxcclxcbi5nYW1lLXNjb3JlIC53cm9uZyB7XFxyXFxuICAgIGNvbG9yOiByZWQ7XFxyXFxufVxcclxcblxcclxcblxcclxcbm5hdiB7XFxyXFxuICAgIHBvc2l0aW9uOiBmaXhlZDtcXHJcXG4gICAgdG9wOiAwO1xcclxcbiAgICBsZWZ0OiAtMzIwcHg7XFxyXFxuICAgIHdpZHRoOiAzMjBweDtcXHJcXG4gICAgaGVpZ2h0OiAxMDAlO1xcclxcbiAgICBkaXNwbGF5OiBmbGV4O1xcclxcbiAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcclxcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXHJcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0tY29sb3ItYmctbWFpbi0zKTtcXHJcXG4gICAgei1pbmRleDogOTtcXHJcXG4gICAgdmlzaWJpbGl0eTogaGlkZGVuO1xcclxcbn1cXHJcXG5cXHJcXG5uYXYub3BlbmVkLW1lbnUge1xcclxcbiAgICB2aXNpYmlsaXR5OiB2aXNpYmxlO1xcclxcbiAgICBsZWZ0OiAwO1xcclxcbn1cXHJcXG5cXHJcXG4ubWVudS1saXN0IGxpIHtcXHJcXG4gICAgdGV4dC1hbGlnbjogY2VudGVyO1xcclxcbiAgICBtYXJnaW46IDE1cHggMDtcXHJcXG4gICAgZm9udC1zaXplOiAyZW07XFxyXFxuICAgIGJhY2tncm91bmQtY29sb3I6IHZhcigtLWNvbG9yLWJnLW1haW4tMSk7XFxyXFxufVxcclxcblxcclxcbi5tZW51LWxpc3QgbGkuYWN0aXZlLXBhZ2Uge1xcclxcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1jb2xvci1iZy1tYWluLTQpO1xcclxcbn1cXHJcXG5cXHJcXG5tYWluLmNvbnRhaW5lci1jZW50ZXJlZCB7XFxyXFxuICAgIGJhY2tncm91bmQtY29sb3I6IHZhcigtLWNvbG9yLWJnLW1haW4tNCk7XFxyXFxufVxcclxcblxcclxcbi5jYXJkLWNvbnRhaW5lciB7XFxyXFxuICAgIGRpc3BsYXk6IGZsZXg7XFxyXFxuICAgIGp1c3RpZnktY29udGVudDogc3BhY2UtYXJvdW5kO1xcclxcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xcclxcbiAgICBmbGV4LXdyYXA6IHdyYXA7XFxyXFxufVxcclxcblxcclxcbi5jYXJkIHtcXHJcXG4gICAgd2lkdGg6IDI4MHB4O1xcclxcbiAgICBoZWlnaHQ6IDI3MHB4O1xcclxcbiAgICBtYXJnaW46IDE1cHg7XFxyXFxuICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcXHJcXG59XFxyXFxuXFxyXFxuLmNhcmQtbWFpbi1wYWdlIHtcXHJcXG4gICAgaGVpZ2h0OiAyNDBweDtcXHJcXG59XFxyXFxuXFxyXFxuLmNhcmQuZGlzYWJsZWQge1xcclxcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjZDJmODQ4O1xcclxcbn1cXHJcXG5cXHJcXG4uY2FyZC1jb250ZW50IHtcXHJcXG4gICAgd2lkdGg6IDEwMCU7XFxyXFxuICAgIGhlaWdodDogMTAwJTtcXHJcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogcm95YWxibHVlO1xcclxcbiAgICBwb3NpdGlvbjogcmVsYXRpdmU7XFxyXFxufVxcclxcblxcclxcbi5jYXJkLWNvbnRlbnQsIC5jYXJkIGltZyB7XFxyXFxuICAgIGJvcmRlci1yYWRpdXM6IDI1cHg7XFxyXFxufVxcclxcblxcclxcbi5jYXJkIHAge1xcclxcbiAgICBtYXJnaW4tdG9wOiAxNXB4O1xcclxcbiAgICBmb250LXNpemU6IDMycHg7XFxyXFxuICAgIHRleHQtYWxpZ246IGNlbnRlcjtcXHJcXG59XFxyXFxuXFxyXFxuLmNhcmQtbWFpbi1wYWdlIHAge1xcclxcbiAgICBtYXJnaW46IDVweCAwO1xcclxcbn1cXHJcXG5cXHJcXG4uY2FyZC1mbGlwLWJ1dHRvbiB7XFxyXFxuICAgIHdpZHRoOiA1MHB4O1xcclxcbiAgICBoZWlnaHQ6IDUwcHg7XFxyXFxuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXHJcXG4gICAgYm90dG9tOiAyMHB4O1xcclxcbiAgICByaWdodDogMjBweDtcXHJcXG59XFxyXFxuXFxyXFxuLmNhcmQtZmxpcC1idXR0b24gc3BhbiB7XFxyXFxuICAgIGZvbnQtc2l6ZTogNTBweDtcXHJcXG59XFxyXFxuXFxyXFxuLmZsaXBwZWQgLmNhcmQtY29udGVudCB7XFxyXFxuICAgIGFuaW1hdGlvbi1uYW1lOiBmbGlwLWNhcmQ7XFxyXFxuICAgIGFuaW1hdGlvbi1kdXJhdGlvbjogMXM7XFxyXFxufVxcclxcblxcclxcbi51bmZsaXBwZWQgLmNhcmQtY29udGVudCB7XFxyXFxuICAgIGFuaW1hdGlvbi1uYW1lOiB1bmZsaXAtY2FyZDtcXHJcXG4gICAgYW5pbWF0aW9uLWR1cmF0aW9uOiAxcztcXHJcXG59XFxyXFxuXFxyXFxuLmZpbmFsLWNsaXAge1xcclxcbiAgICBkaXNwbGF5OiBmbGV4O1xcclxcbiAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcclxcbiAgICB3aWR0aDogMzIwcHg7XFxyXFxuICAgIG1hcmdpbjogYXV0bztcXHJcXG4gICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxyXFxuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxyXFxuICAgIHBhZGRpbmc6IDUwcHggMDtcXHJcXG59XFxyXFxuXFxyXFxuLmZpbmFsLWNsaXAgcCB7XFxyXFxuICAgIGNvbG9yOiByZWQ7XFxyXFxuICAgIGZvbnQtc2l6ZTogMzZweDtcXHJcXG4gICAgbWFyZ2luLXRvcDogMzBweDtcXHJcXG59XFxyXFxuXFxyXFxuLnN0YXQtY29udGFpbmVyIHtcXHJcXG4gICAgZGlzcGxheTogZmxleDtcXHJcXG4gICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXHJcXG4gICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxyXFxuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxyXFxuICAgIGZvbnQtc2l6ZTogMmVtO1xcclxcbn1cXHJcXG5cXHJcXG4udGFibGUtd3JhcHBlciB7XFxyXFxuICAgIHdpZHRoOiBjYWxjKDE0NDB2dyoxMDAvMTQ0MCk7XFxyXFxuICAgIG92ZXJmbG93LXg6IGF1dG87XFxyXFxuICAgIGRpc3BsYXk6IGZsZXg7XFxyXFxuICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxyXFxuICAgIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcclxcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xcclxcbn1cXHJcXG5cXHJcXG4uc3RhdC10YWJsZSB7XFxyXFxuICAgIHdpZHRoOiBjYWxjKDE0NDB2dyoxMDAvMTQ0MCk7XFxyXFxuICAgIG1heC13aWR0aDogMTQ0MHB4O1xcclxcbiAgICBtaW4td2lkdGg6IDUwMHB4O1xcclxcbiAgICBib3JkZXItY29sbGFwc2U6IGNvbGxhcHNlO1xcclxcbiAgICBmb250LXNpemU6IDAuNWVtO1xcclxcblxcclxcbn1cXHJcXG5cXHJcXG50aGVhZCB7XFxyXFxuICAgIGJhY2tncm91bmQtY29sb3I6IGFsaWNlYmx1ZTtcXHJcXG59XFxyXFxuXFxyXFxudGgge1xcclxcbiAgICBoZWlnaHQ6IDMwcHg7XFxyXFxufVxcclxcblxcclxcbnRyIHtcXHJcXG4gICAgaGVpZ2h0OiAyNXB4O1xcclxcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiBhenVyZTtcXHJcXG59XFxyXFxuXFxyXFxudGgsIHRkIHtcXHJcXG4gICAgYm9yZGVyOiAxcHggc29saWQgYmxhY2s7XFxyXFxuICAgIHRleHQtYWxpZ246IGNlbnRlcjtcXHJcXG4gICAgdmVydGljYWwtYWxpZ246IG1pZGRsZTtcXHJcXG59XFxyXFxuXFxyXFxudHI6bnRoLWNoaWxkKGV2ZW4pIHtcXHJcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogI2ZkZmRkZTtcXHJcXG59XFxyXFxuXFxyXFxuLnNvcnRlZC1kb3duLCAuc29ydGVkLXVwIHtcXHJcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogI2QwZmE4MTtcXHJcXG59XFxyXFxuXFxyXFxuLnNvcnQtaWNvbiB7XFxyXFxuICAgIHdpZHRoOiAxNnB4O1xcclxcbiAgICBoZWlnaHQ6IGF1dG87XFxyXFxuICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcXHJcXG4gICAgbGVmdDogMTBweDtcXHJcXG4gICAgdG9wOiAycHg7XFxyXFxufVxcclxcblxcclxcbi5zdGF0LWJ1dHRvbnMtd3JhcHBlciB7XFxyXFxuICAgIHdpZHRoOiAxMDAlO1xcclxcbiAgICBkaXNwbGF5OiBmbGV4O1xcclxcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWFyb3VuZDtcXHJcXG4gICAgZmxleC13cmFwOiB3cmFwO1xcclxcbn1cXHJcXG5cXHJcXG4uc3RhdC1idXR0b24ge1xcclxcbiAgICB3aWR0aDogMzAwcHg7XFxyXFxuICAgIGhlaWdodDogNzBweDtcXHJcXG4gICAgbWFyZ2luOiAyMHB4IDA7XFxyXFxuICAgIHBhZGRpbmc6IDE1cHg7XFxyXFxuICAgIGJvcmRlci1yYWRpdXM6IDUwcHg7XFxyXFxuICAgIGJvcmRlcjogMXB4IHNvbGlkIHJnYigwLCAwLCAwKTtcXHJcXG4gICAgY29sb3I6IGF6dXJlO1xcclxcbiAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XFxyXFxufVxcclxcblxcclxcbi5idXR0b24udHJhaW4tZGlmZiB7XFxyXFxuICAgIGJhY2tncm91bmQtY29sb3I6IHJnYig3LCAxNjAsIDk2KTtcXHJcXG59XFxyXFxuXFxyXFxuLmJ1dHRvbi5yZXNldC1zdGF0IHtcXHJcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogcmdiKDE4OSwgNDUsIDQ1KTtcXHJcXG59XFxyXFxuXFxyXFxuLm5vdGhpbmctZGlmZiB7XFxyXFxuICAgIHdpZHRoOiAxMDAlO1xcclxcbn1cXHJcXG5cXHJcXG4ubm90aGluZy1kaWZmIHAge1xcclxcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XFxyXFxuICAgIHRvcDogMjAlO1xcclxcbn1cXHJcXG5cXHJcXG4uZGlzYWJsZWQ6aG92ZXIge1xcclxcbiAgICBjdXJzb3I6bm90LWFsbG93ZWQ7XFxyXFxufVxcclxcblxcclxcbkBrZXlmcmFtZXMgZmxpcC1jYXJkIHtcXHJcXG4gICAgMCUge31cXHJcXG4gICAgNTAlIHt0cmFuc2Zvcm06IHJvdGF0ZVkoODlkZWcpfVxcclxcbn1cXHJcXG5cXHJcXG5Aa2V5ZnJhbWVzIHVuZmxpcC1jYXJkIHtcXHJcXG4gICAgMCUge31cXHJcXG4gICAgNTAlIHt0cmFuc2Zvcm06IHJvdGF0ZVkoODlkZWcpfVxcclxcbn1cXHJcXG5cXHJcXG4vKiAtLS0gUkVTUE9OU0lWRSBMQVlPVVRTIC0tLSAqL1xcclxcblxcclxcbkBtZWRpYSAobWF4LXdpZHRoOiAxNDM5cHgpIHtcXHJcXG4gICAgLmNvbnRhaW5lci1jZW50ZXJlZCB7XFxyXFxuICAgICAgICBtaW4td2lkdGg6IGNhbGMoMTQ0MHZ3KjEwMC8xNDQwKTtcXHJcXG4gICAgfVxcclxcblxcclxcbn1cIl0sXCJzb3VyY2VSb290XCI6XCJcIn1dKTtcbi8vIEV4cG9ydHNcbmV4cG9ydCBkZWZhdWx0IF9fX0NTU19MT0FERVJfRVhQT1JUX19fO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qXG4gIE1JVCBMaWNlbnNlIGh0dHA6Ly93d3cub3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvbWl0LWxpY2Vuc2UucGhwXG4gIEF1dGhvciBUb2JpYXMgS29wcGVycyBAc29rcmFcbiovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChjc3NXaXRoTWFwcGluZ1RvU3RyaW5nKSB7XG4gIHZhciBsaXN0ID0gW107IC8vIHJldHVybiB0aGUgbGlzdCBvZiBtb2R1bGVzIGFzIGNzcyBzdHJpbmdcblxuICBsaXN0LnRvU3RyaW5nID0gZnVuY3Rpb24gdG9TdHJpbmcoKSB7XG4gICAgcmV0dXJuIHRoaXMubWFwKGZ1bmN0aW9uIChpdGVtKSB7XG4gICAgICB2YXIgY29udGVudCA9IFwiXCI7XG4gICAgICB2YXIgbmVlZExheWVyID0gdHlwZW9mIGl0ZW1bNV0gIT09IFwidW5kZWZpbmVkXCI7XG5cbiAgICAgIGlmIChpdGVtWzRdKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJAc3VwcG9ydHMgKFwiLmNvbmNhdChpdGVtWzRdLCBcIikge1wiKTtcbiAgICAgIH1cblxuICAgICAgaWYgKGl0ZW1bMl0pIHtcbiAgICAgICAgY29udGVudCArPSBcIkBtZWRpYSBcIi5jb25jYXQoaXRlbVsyXSwgXCIge1wiKTtcbiAgICAgIH1cblxuICAgICAgaWYgKG5lZWRMYXllcikge1xuICAgICAgICBjb250ZW50ICs9IFwiQGxheWVyXCIuY29uY2F0KGl0ZW1bNV0ubGVuZ3RoID4gMCA/IFwiIFwiLmNvbmNhdChpdGVtWzVdKSA6IFwiXCIsIFwiIHtcIik7XG4gICAgICB9XG5cbiAgICAgIGNvbnRlbnQgKz0gY3NzV2l0aE1hcHBpbmdUb1N0cmluZyhpdGVtKTtcblxuICAgICAgaWYgKG5lZWRMYXllcikge1xuICAgICAgICBjb250ZW50ICs9IFwifVwiO1xuICAgICAgfVxuXG4gICAgICBpZiAoaXRlbVsyXSkge1xuICAgICAgICBjb250ZW50ICs9IFwifVwiO1xuICAgICAgfVxuXG4gICAgICBpZiAoaXRlbVs0XSkge1xuICAgICAgICBjb250ZW50ICs9IFwifVwiO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gY29udGVudDtcbiAgICB9KS5qb2luKFwiXCIpO1xuICB9OyAvLyBpbXBvcnQgYSBsaXN0IG9mIG1vZHVsZXMgaW50byB0aGUgbGlzdFxuXG5cbiAgbGlzdC5pID0gZnVuY3Rpb24gaShtb2R1bGVzLCBtZWRpYSwgZGVkdXBlLCBzdXBwb3J0cywgbGF5ZXIpIHtcbiAgICBpZiAodHlwZW9mIG1vZHVsZXMgPT09IFwic3RyaW5nXCIpIHtcbiAgICAgIG1vZHVsZXMgPSBbW251bGwsIG1vZHVsZXMsIHVuZGVmaW5lZF1dO1xuICAgIH1cblxuICAgIHZhciBhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzID0ge307XG5cbiAgICBpZiAoZGVkdXBlKSB7XG4gICAgICBmb3IgKHZhciBrID0gMDsgayA8IHRoaXMubGVuZ3RoOyBrKyspIHtcbiAgICAgICAgdmFyIGlkID0gdGhpc1trXVswXTtcblxuICAgICAgICBpZiAoaWQgIT0gbnVsbCkge1xuICAgICAgICAgIGFscmVhZHlJbXBvcnRlZE1vZHVsZXNbaWRdID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIGZvciAodmFyIF9rID0gMDsgX2sgPCBtb2R1bGVzLmxlbmd0aDsgX2srKykge1xuICAgICAgdmFyIGl0ZW0gPSBbXS5jb25jYXQobW9kdWxlc1tfa10pO1xuXG4gICAgICBpZiAoZGVkdXBlICYmIGFscmVhZHlJbXBvcnRlZE1vZHVsZXNbaXRlbVswXV0pIHtcbiAgICAgICAgY29udGludWU7XG4gICAgICB9XG5cbiAgICAgIGlmICh0eXBlb2YgbGF5ZXIgIT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgICAgaWYgKHR5cGVvZiBpdGVtWzVdID09PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICAgICAgaXRlbVs1XSA9IGxheWVyO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGl0ZW1bMV0gPSBcIkBsYXllclwiLmNvbmNhdChpdGVtWzVdLmxlbmd0aCA+IDAgPyBcIiBcIi5jb25jYXQoaXRlbVs1XSkgOiBcIlwiLCBcIiB7XCIpLmNvbmNhdChpdGVtWzFdLCBcIn1cIik7XG4gICAgICAgICAgaXRlbVs1XSA9IGxheWVyO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGlmIChtZWRpYSkge1xuICAgICAgICBpZiAoIWl0ZW1bMl0pIHtcbiAgICAgICAgICBpdGVtWzJdID0gbWVkaWE7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaXRlbVsxXSA9IFwiQG1lZGlhIFwiLmNvbmNhdChpdGVtWzJdLCBcIiB7XCIpLmNvbmNhdChpdGVtWzFdLCBcIn1cIik7XG4gICAgICAgICAgaXRlbVsyXSA9IG1lZGlhO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGlmIChzdXBwb3J0cykge1xuICAgICAgICBpZiAoIWl0ZW1bNF0pIHtcbiAgICAgICAgICBpdGVtWzRdID0gXCJcIi5jb25jYXQoc3VwcG9ydHMpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGl0ZW1bMV0gPSBcIkBzdXBwb3J0cyAoXCIuY29uY2F0KGl0ZW1bNF0sIFwiKSB7XCIpLmNvbmNhdChpdGVtWzFdLCBcIn1cIik7XG4gICAgICAgICAgaXRlbVs0XSA9IHN1cHBvcnRzO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGxpc3QucHVzaChpdGVtKTtcbiAgICB9XG4gIH07XG5cbiAgcmV0dXJuIGxpc3Q7XG59OyIsIlwidXNlIHN0cmljdFwiO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdGVtKSB7XG4gIHZhciBjb250ZW50ID0gaXRlbVsxXTtcbiAgdmFyIGNzc01hcHBpbmcgPSBpdGVtWzNdO1xuXG4gIGlmICghY3NzTWFwcGluZykge1xuICAgIHJldHVybiBjb250ZW50O1xuICB9XG5cbiAgaWYgKHR5cGVvZiBidG9hID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICB2YXIgYmFzZTY0ID0gYnRvYSh1bmVzY2FwZShlbmNvZGVVUklDb21wb25lbnQoSlNPTi5zdHJpbmdpZnkoY3NzTWFwcGluZykpKSk7XG4gICAgdmFyIGRhdGEgPSBcInNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2NoYXJzZXQ9dXRmLTg7YmFzZTY0LFwiLmNvbmNhdChiYXNlNjQpO1xuICAgIHZhciBzb3VyY2VNYXBwaW5nID0gXCIvKiMgXCIuY29uY2F0KGRhdGEsIFwiICovXCIpO1xuICAgIHZhciBzb3VyY2VVUkxzID0gY3NzTWFwcGluZy5zb3VyY2VzLm1hcChmdW5jdGlvbiAoc291cmNlKSB7XG4gICAgICByZXR1cm4gXCIvKiMgc291cmNlVVJMPVwiLmNvbmNhdChjc3NNYXBwaW5nLnNvdXJjZVJvb3QgfHwgXCJcIikuY29uY2F0KHNvdXJjZSwgXCIgKi9cIik7XG4gICAgfSk7XG4gICAgcmV0dXJuIFtjb250ZW50XS5jb25jYXQoc291cmNlVVJMcykuY29uY2F0KFtzb3VyY2VNYXBwaW5nXSkuam9pbihcIlxcblwiKTtcbiAgfVxuXG4gIHJldHVybiBbY29udGVudF0uam9pbihcIlxcblwiKTtcbn07IiwiXG4gICAgICBpbXBvcnQgQVBJIGZyb20gXCIhLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5qZWN0U3R5bGVzSW50b1N0eWxlVGFnLmpzXCI7XG4gICAgICBpbXBvcnQgZG9tQVBJIGZyb20gXCIhLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVEb21BUEkuanNcIjtcbiAgICAgIGltcG9ydCBpbnNlcnRGbiBmcm9tIFwiIS4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydEJ5U2VsZWN0b3IuanNcIjtcbiAgICAgIGltcG9ydCBzZXRBdHRyaWJ1dGVzIGZyb20gXCIhLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzLmpzXCI7XG4gICAgICBpbXBvcnQgaW5zZXJ0U3R5bGVFbGVtZW50IGZyb20gXCIhLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0U3R5bGVFbGVtZW50LmpzXCI7XG4gICAgICBpbXBvcnQgc3R5bGVUYWdUcmFuc2Zvcm1GbiBmcm9tIFwiIS4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlVGFnVHJhbnNmb3JtLmpzXCI7XG4gICAgICBpbXBvcnQgY29udGVudCwgKiBhcyBuYW1lZEV4cG9ydCBmcm9tIFwiISEuLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L2Nqcy5qcyEuL25vcm1hbGl6ZS5jc3NcIjtcbiAgICAgIFxuICAgICAgXG5cbnZhciBvcHRpb25zID0ge307XG5cbm9wdGlvbnMuc3R5bGVUYWdUcmFuc2Zvcm0gPSBzdHlsZVRhZ1RyYW5zZm9ybUZuO1xub3B0aW9ucy5zZXRBdHRyaWJ1dGVzID0gc2V0QXR0cmlidXRlcztcblxuICAgICAgb3B0aW9ucy5pbnNlcnQgPSBpbnNlcnRGbi5iaW5kKG51bGwsIFwiaGVhZFwiKTtcbiAgICBcbm9wdGlvbnMuZG9tQVBJID0gZG9tQVBJO1xub3B0aW9ucy5pbnNlcnRTdHlsZUVsZW1lbnQgPSBpbnNlcnRTdHlsZUVsZW1lbnQ7XG5cbnZhciB1cGRhdGUgPSBBUEkoY29udGVudCwgb3B0aW9ucyk7XG5cblxuXG5leHBvcnQgKiBmcm9tIFwiISEuLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L2Nqcy5qcyEuL25vcm1hbGl6ZS5jc3NcIjtcbiAgICAgICBleHBvcnQgZGVmYXVsdCBjb250ZW50ICYmIGNvbnRlbnQubG9jYWxzID8gY29udGVudC5sb2NhbHMgOiB1bmRlZmluZWQ7XG4iLCJcbiAgICAgIGltcG9ydCBBUEkgZnJvbSBcIiEuLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbmplY3RTdHlsZXNJbnRvU3R5bGVUYWcuanNcIjtcbiAgICAgIGltcG9ydCBkb21BUEkgZnJvbSBcIiEuLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZURvbUFQSS5qc1wiO1xuICAgICAgaW1wb3J0IGluc2VydEZuIGZyb20gXCIhLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0QnlTZWxlY3Rvci5qc1wiO1xuICAgICAgaW1wb3J0IHNldEF0dHJpYnV0ZXMgZnJvbSBcIiEuLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXMuanNcIjtcbiAgICAgIGltcG9ydCBpbnNlcnRTdHlsZUVsZW1lbnQgZnJvbSBcIiEuLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRTdHlsZUVsZW1lbnQuanNcIjtcbiAgICAgIGltcG9ydCBzdHlsZVRhZ1RyYW5zZm9ybUZuIGZyb20gXCIhLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVUYWdUcmFuc2Zvcm0uanNcIjtcbiAgICAgIGltcG9ydCBjb250ZW50LCAqIGFzIG5hbWVkRXhwb3J0IGZyb20gXCIhIS4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4vcmVzZXQuY3NzXCI7XG4gICAgICBcbiAgICAgIFxuXG52YXIgb3B0aW9ucyA9IHt9O1xuXG5vcHRpb25zLnN0eWxlVGFnVHJhbnNmb3JtID0gc3R5bGVUYWdUcmFuc2Zvcm1Gbjtcbm9wdGlvbnMuc2V0QXR0cmlidXRlcyA9IHNldEF0dHJpYnV0ZXM7XG5cbiAgICAgIG9wdGlvbnMuaW5zZXJ0ID0gaW5zZXJ0Rm4uYmluZChudWxsLCBcImhlYWRcIik7XG4gICAgXG5vcHRpb25zLmRvbUFQSSA9IGRvbUFQSTtcbm9wdGlvbnMuaW5zZXJ0U3R5bGVFbGVtZW50ID0gaW5zZXJ0U3R5bGVFbGVtZW50O1xuXG52YXIgdXBkYXRlID0gQVBJKGNvbnRlbnQsIG9wdGlvbnMpO1xuXG5cblxuZXhwb3J0ICogZnJvbSBcIiEhLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanMhLi9yZXNldC5jc3NcIjtcbiAgICAgICBleHBvcnQgZGVmYXVsdCBjb250ZW50ICYmIGNvbnRlbnQubG9jYWxzID8gY29udGVudC5sb2NhbHMgOiB1bmRlZmluZWQ7XG4iLCJcbiAgICAgIGltcG9ydCBBUEkgZnJvbSBcIiEuLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbmplY3RTdHlsZXNJbnRvU3R5bGVUYWcuanNcIjtcbiAgICAgIGltcG9ydCBkb21BUEkgZnJvbSBcIiEuLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZURvbUFQSS5qc1wiO1xuICAgICAgaW1wb3J0IGluc2VydEZuIGZyb20gXCIhLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0QnlTZWxlY3Rvci5qc1wiO1xuICAgICAgaW1wb3J0IHNldEF0dHJpYnV0ZXMgZnJvbSBcIiEuLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXMuanNcIjtcbiAgICAgIGltcG9ydCBpbnNlcnRTdHlsZUVsZW1lbnQgZnJvbSBcIiEuLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRTdHlsZUVsZW1lbnQuanNcIjtcbiAgICAgIGltcG9ydCBzdHlsZVRhZ1RyYW5zZm9ybUZuIGZyb20gXCIhLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVUYWdUcmFuc2Zvcm0uanNcIjtcbiAgICAgIGltcG9ydCBjb250ZW50LCAqIGFzIG5hbWVkRXhwb3J0IGZyb20gXCIhIS4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4vc3R5bGUuY3NzXCI7XG4gICAgICBcbiAgICAgIFxuXG52YXIgb3B0aW9ucyA9IHt9O1xuXG5vcHRpb25zLnN0eWxlVGFnVHJhbnNmb3JtID0gc3R5bGVUYWdUcmFuc2Zvcm1Gbjtcbm9wdGlvbnMuc2V0QXR0cmlidXRlcyA9IHNldEF0dHJpYnV0ZXM7XG5cbiAgICAgIG9wdGlvbnMuaW5zZXJ0ID0gaW5zZXJ0Rm4uYmluZChudWxsLCBcImhlYWRcIik7XG4gICAgXG5vcHRpb25zLmRvbUFQSSA9IGRvbUFQSTtcbm9wdGlvbnMuaW5zZXJ0U3R5bGVFbGVtZW50ID0gaW5zZXJ0U3R5bGVFbGVtZW50O1xuXG52YXIgdXBkYXRlID0gQVBJKGNvbnRlbnQsIG9wdGlvbnMpO1xuXG5cblxuZXhwb3J0ICogZnJvbSBcIiEhLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanMhLi9zdHlsZS5jc3NcIjtcbiAgICAgICBleHBvcnQgZGVmYXVsdCBjb250ZW50ICYmIGNvbnRlbnQubG9jYWxzID8gY29udGVudC5sb2NhbHMgOiB1bmRlZmluZWQ7XG4iLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIHN0eWxlc0luRE9NID0gW107XG5cbmZ1bmN0aW9uIGdldEluZGV4QnlJZGVudGlmaWVyKGlkZW50aWZpZXIpIHtcbiAgdmFyIHJlc3VsdCA9IC0xO1xuXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgc3R5bGVzSW5ET00ubGVuZ3RoOyBpKyspIHtcbiAgICBpZiAoc3R5bGVzSW5ET01baV0uaWRlbnRpZmllciA9PT0gaWRlbnRpZmllcikge1xuICAgICAgcmVzdWx0ID0gaTtcbiAgICAgIGJyZWFrO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiByZXN1bHQ7XG59XG5cbmZ1bmN0aW9uIG1vZHVsZXNUb0RvbShsaXN0LCBvcHRpb25zKSB7XG4gIHZhciBpZENvdW50TWFwID0ge307XG4gIHZhciBpZGVudGlmaWVycyA9IFtdO1xuXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgbGlzdC5sZW5ndGg7IGkrKykge1xuICAgIHZhciBpdGVtID0gbGlzdFtpXTtcbiAgICB2YXIgaWQgPSBvcHRpb25zLmJhc2UgPyBpdGVtWzBdICsgb3B0aW9ucy5iYXNlIDogaXRlbVswXTtcbiAgICB2YXIgY291bnQgPSBpZENvdW50TWFwW2lkXSB8fCAwO1xuICAgIHZhciBpZGVudGlmaWVyID0gXCJcIi5jb25jYXQoaWQsIFwiIFwiKS5jb25jYXQoY291bnQpO1xuICAgIGlkQ291bnRNYXBbaWRdID0gY291bnQgKyAxO1xuICAgIHZhciBpbmRleEJ5SWRlbnRpZmllciA9IGdldEluZGV4QnlJZGVudGlmaWVyKGlkZW50aWZpZXIpO1xuICAgIHZhciBvYmogPSB7XG4gICAgICBjc3M6IGl0ZW1bMV0sXG4gICAgICBtZWRpYTogaXRlbVsyXSxcbiAgICAgIHNvdXJjZU1hcDogaXRlbVszXSxcbiAgICAgIHN1cHBvcnRzOiBpdGVtWzRdLFxuICAgICAgbGF5ZXI6IGl0ZW1bNV1cbiAgICB9O1xuXG4gICAgaWYgKGluZGV4QnlJZGVudGlmaWVyICE9PSAtMSkge1xuICAgICAgc3R5bGVzSW5ET01baW5kZXhCeUlkZW50aWZpZXJdLnJlZmVyZW5jZXMrKztcbiAgICAgIHN0eWxlc0luRE9NW2luZGV4QnlJZGVudGlmaWVyXS51cGRhdGVyKG9iaik7XG4gICAgfSBlbHNlIHtcbiAgICAgIHZhciB1cGRhdGVyID0gYWRkRWxlbWVudFN0eWxlKG9iaiwgb3B0aW9ucyk7XG4gICAgICBvcHRpb25zLmJ5SW5kZXggPSBpO1xuICAgICAgc3R5bGVzSW5ET00uc3BsaWNlKGksIDAsIHtcbiAgICAgICAgaWRlbnRpZmllcjogaWRlbnRpZmllcixcbiAgICAgICAgdXBkYXRlcjogdXBkYXRlcixcbiAgICAgICAgcmVmZXJlbmNlczogMVxuICAgICAgfSk7XG4gICAgfVxuXG4gICAgaWRlbnRpZmllcnMucHVzaChpZGVudGlmaWVyKTtcbiAgfVxuXG4gIHJldHVybiBpZGVudGlmaWVycztcbn1cblxuZnVuY3Rpb24gYWRkRWxlbWVudFN0eWxlKG9iaiwgb3B0aW9ucykge1xuICB2YXIgYXBpID0gb3B0aW9ucy5kb21BUEkob3B0aW9ucyk7XG4gIGFwaS51cGRhdGUob2JqKTtcblxuICB2YXIgdXBkYXRlciA9IGZ1bmN0aW9uIHVwZGF0ZXIobmV3T2JqKSB7XG4gICAgaWYgKG5ld09iaikge1xuICAgICAgaWYgKG5ld09iai5jc3MgPT09IG9iai5jc3MgJiYgbmV3T2JqLm1lZGlhID09PSBvYmoubWVkaWEgJiYgbmV3T2JqLnNvdXJjZU1hcCA9PT0gb2JqLnNvdXJjZU1hcCAmJiBuZXdPYmouc3VwcG9ydHMgPT09IG9iai5zdXBwb3J0cyAmJiBuZXdPYmoubGF5ZXIgPT09IG9iai5sYXllcikge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIGFwaS51cGRhdGUob2JqID0gbmV3T2JqKTtcbiAgICB9IGVsc2Uge1xuICAgICAgYXBpLnJlbW92ZSgpO1xuICAgIH1cbiAgfTtcblxuICByZXR1cm4gdXBkYXRlcjtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAobGlzdCwgb3B0aW9ucykge1xuICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcbiAgbGlzdCA9IGxpc3QgfHwgW107XG4gIHZhciBsYXN0SWRlbnRpZmllcnMgPSBtb2R1bGVzVG9Eb20obGlzdCwgb3B0aW9ucyk7XG4gIHJldHVybiBmdW5jdGlvbiB1cGRhdGUobmV3TGlzdCkge1xuICAgIG5ld0xpc3QgPSBuZXdMaXN0IHx8IFtdO1xuXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsYXN0SWRlbnRpZmllcnMubGVuZ3RoOyBpKyspIHtcbiAgICAgIHZhciBpZGVudGlmaWVyID0gbGFzdElkZW50aWZpZXJzW2ldO1xuICAgICAgdmFyIGluZGV4ID0gZ2V0SW5kZXhCeUlkZW50aWZpZXIoaWRlbnRpZmllcik7XG4gICAgICBzdHlsZXNJbkRPTVtpbmRleF0ucmVmZXJlbmNlcy0tO1xuICAgIH1cblxuICAgIHZhciBuZXdMYXN0SWRlbnRpZmllcnMgPSBtb2R1bGVzVG9Eb20obmV3TGlzdCwgb3B0aW9ucyk7XG5cbiAgICBmb3IgKHZhciBfaSA9IDA7IF9pIDwgbGFzdElkZW50aWZpZXJzLmxlbmd0aDsgX2krKykge1xuICAgICAgdmFyIF9pZGVudGlmaWVyID0gbGFzdElkZW50aWZpZXJzW19pXTtcblxuICAgICAgdmFyIF9pbmRleCA9IGdldEluZGV4QnlJZGVudGlmaWVyKF9pZGVudGlmaWVyKTtcblxuICAgICAgaWYgKHN0eWxlc0luRE9NW19pbmRleF0ucmVmZXJlbmNlcyA9PT0gMCkge1xuICAgICAgICBzdHlsZXNJbkRPTVtfaW5kZXhdLnVwZGF0ZXIoKTtcblxuICAgICAgICBzdHlsZXNJbkRPTS5zcGxpY2UoX2luZGV4LCAxKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBsYXN0SWRlbnRpZmllcnMgPSBuZXdMYXN0SWRlbnRpZmllcnM7XG4gIH07XG59OyIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgbWVtbyA9IHt9O1xuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5cbmZ1bmN0aW9uIGdldFRhcmdldCh0YXJnZXQpIHtcbiAgaWYgKHR5cGVvZiBtZW1vW3RhcmdldF0gPT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICB2YXIgc3R5bGVUYXJnZXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHRhcmdldCk7IC8vIFNwZWNpYWwgY2FzZSB0byByZXR1cm4gaGVhZCBvZiBpZnJhbWUgaW5zdGVhZCBvZiBpZnJhbWUgaXRzZWxmXG5cbiAgICBpZiAod2luZG93LkhUTUxJRnJhbWVFbGVtZW50ICYmIHN0eWxlVGFyZ2V0IGluc3RhbmNlb2Ygd2luZG93LkhUTUxJRnJhbWVFbGVtZW50KSB7XG4gICAgICB0cnkge1xuICAgICAgICAvLyBUaGlzIHdpbGwgdGhyb3cgYW4gZXhjZXB0aW9uIGlmIGFjY2VzcyB0byBpZnJhbWUgaXMgYmxvY2tlZFxuICAgICAgICAvLyBkdWUgdG8gY3Jvc3Mtb3JpZ2luIHJlc3RyaWN0aW9uc1xuICAgICAgICBzdHlsZVRhcmdldCA9IHN0eWxlVGFyZ2V0LmNvbnRlbnREb2N1bWVudC5oZWFkO1xuICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAvLyBpc3RhbmJ1bCBpZ25vcmUgbmV4dFxuICAgICAgICBzdHlsZVRhcmdldCA9IG51bGw7XG4gICAgICB9XG4gICAgfVxuXG4gICAgbWVtb1t0YXJnZXRdID0gc3R5bGVUYXJnZXQ7XG4gIH1cblxuICByZXR1cm4gbWVtb1t0YXJnZXRdO1xufVxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5cblxuZnVuY3Rpb24gaW5zZXJ0QnlTZWxlY3RvcihpbnNlcnQsIHN0eWxlKSB7XG4gIHZhciB0YXJnZXQgPSBnZXRUYXJnZXQoaW5zZXJ0KTtcblxuICBpZiAoIXRhcmdldCkge1xuICAgIHRocm93IG5ldyBFcnJvcihcIkNvdWxkbid0IGZpbmQgYSBzdHlsZSB0YXJnZXQuIFRoaXMgcHJvYmFibHkgbWVhbnMgdGhhdCB0aGUgdmFsdWUgZm9yIHRoZSAnaW5zZXJ0JyBwYXJhbWV0ZXIgaXMgaW52YWxpZC5cIik7XG4gIH1cblxuICB0YXJnZXQuYXBwZW5kQ2hpbGQoc3R5bGUpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGluc2VydEJ5U2VsZWN0b3I7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gaW5zZXJ0U3R5bGVFbGVtZW50KG9wdGlvbnMpIHtcbiAgdmFyIGVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3R5bGVcIik7XG4gIG9wdGlvbnMuc2V0QXR0cmlidXRlcyhlbGVtZW50LCBvcHRpb25zLmF0dHJpYnV0ZXMpO1xuICBvcHRpb25zLmluc2VydChlbGVtZW50LCBvcHRpb25zLm9wdGlvbnMpO1xuICByZXR1cm4gZWxlbWVudDtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBpbnNlcnRTdHlsZUVsZW1lbnQ7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzKHN0eWxlRWxlbWVudCkge1xuICB2YXIgbm9uY2UgPSB0eXBlb2YgX193ZWJwYWNrX25vbmNlX18gIT09IFwidW5kZWZpbmVkXCIgPyBfX3dlYnBhY2tfbm9uY2VfXyA6IG51bGw7XG5cbiAgaWYgKG5vbmNlKSB7XG4gICAgc3R5bGVFbGVtZW50LnNldEF0dHJpYnV0ZShcIm5vbmNlXCIsIG5vbmNlKTtcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHNldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlczsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBhcHBseShzdHlsZUVsZW1lbnQsIG9wdGlvbnMsIG9iaikge1xuICB2YXIgY3NzID0gXCJcIjtcblxuICBpZiAob2JqLnN1cHBvcnRzKSB7XG4gICAgY3NzICs9IFwiQHN1cHBvcnRzIChcIi5jb25jYXQob2JqLnN1cHBvcnRzLCBcIikge1wiKTtcbiAgfVxuXG4gIGlmIChvYmoubWVkaWEpIHtcbiAgICBjc3MgKz0gXCJAbWVkaWEgXCIuY29uY2F0KG9iai5tZWRpYSwgXCIge1wiKTtcbiAgfVxuXG4gIHZhciBuZWVkTGF5ZXIgPSB0eXBlb2Ygb2JqLmxheWVyICE9PSBcInVuZGVmaW5lZFwiO1xuXG4gIGlmIChuZWVkTGF5ZXIpIHtcbiAgICBjc3MgKz0gXCJAbGF5ZXJcIi5jb25jYXQob2JqLmxheWVyLmxlbmd0aCA+IDAgPyBcIiBcIi5jb25jYXQob2JqLmxheWVyKSA6IFwiXCIsIFwiIHtcIik7XG4gIH1cblxuICBjc3MgKz0gb2JqLmNzcztcblxuICBpZiAobmVlZExheWVyKSB7XG4gICAgY3NzICs9IFwifVwiO1xuICB9XG5cbiAgaWYgKG9iai5tZWRpYSkge1xuICAgIGNzcyArPSBcIn1cIjtcbiAgfVxuXG4gIGlmIChvYmouc3VwcG9ydHMpIHtcbiAgICBjc3MgKz0gXCJ9XCI7XG4gIH1cblxuICB2YXIgc291cmNlTWFwID0gb2JqLnNvdXJjZU1hcDtcblxuICBpZiAoc291cmNlTWFwICYmIHR5cGVvZiBidG9hICE9PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgY3NzICs9IFwiXFxuLyojIHNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2Jhc2U2NCxcIi5jb25jYXQoYnRvYSh1bmVzY2FwZShlbmNvZGVVUklDb21wb25lbnQoSlNPTi5zdHJpbmdpZnkoc291cmNlTWFwKSkpKSwgXCIgKi9cIik7XG4gIH0gLy8gRm9yIG9sZCBJRVxuXG4gIC8qIGlzdGFuYnVsIGlnbm9yZSBpZiAgKi9cblxuXG4gIG9wdGlvbnMuc3R5bGVUYWdUcmFuc2Zvcm0oY3NzLCBzdHlsZUVsZW1lbnQsIG9wdGlvbnMub3B0aW9ucyk7XG59XG5cbmZ1bmN0aW9uIHJlbW92ZVN0eWxlRWxlbWVudChzdHlsZUVsZW1lbnQpIHtcbiAgLy8gaXN0YW5idWwgaWdub3JlIGlmXG4gIGlmIChzdHlsZUVsZW1lbnQucGFyZW50Tm9kZSA9PT0gbnVsbCkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIHN0eWxlRWxlbWVudC5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKHN0eWxlRWxlbWVudCk7XG59XG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cblxuXG5mdW5jdGlvbiBkb21BUEkob3B0aW9ucykge1xuICB2YXIgc3R5bGVFbGVtZW50ID0gb3B0aW9ucy5pbnNlcnRTdHlsZUVsZW1lbnQob3B0aW9ucyk7XG4gIHJldHVybiB7XG4gICAgdXBkYXRlOiBmdW5jdGlvbiB1cGRhdGUob2JqKSB7XG4gICAgICBhcHBseShzdHlsZUVsZW1lbnQsIG9wdGlvbnMsIG9iaik7XG4gICAgfSxcbiAgICByZW1vdmU6IGZ1bmN0aW9uIHJlbW92ZSgpIHtcbiAgICAgIHJlbW92ZVN0eWxlRWxlbWVudChzdHlsZUVsZW1lbnQpO1xuICAgIH1cbiAgfTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBkb21BUEk7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gc3R5bGVUYWdUcmFuc2Zvcm0oY3NzLCBzdHlsZUVsZW1lbnQpIHtcbiAgaWYgKHN0eWxlRWxlbWVudC5zdHlsZVNoZWV0KSB7XG4gICAgc3R5bGVFbGVtZW50LnN0eWxlU2hlZXQuY3NzVGV4dCA9IGNzcztcbiAgfSBlbHNlIHtcbiAgICB3aGlsZSAoc3R5bGVFbGVtZW50LmZpcnN0Q2hpbGQpIHtcbiAgICAgIHN0eWxlRWxlbWVudC5yZW1vdmVDaGlsZChzdHlsZUVsZW1lbnQuZmlyc3RDaGlsZCk7XG4gICAgfVxuXG4gICAgc3R5bGVFbGVtZW50LmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKGNzcykpO1xuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gc3R5bGVUYWdUcmFuc2Zvcm07IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHRpZDogbW9kdWxlSWQsXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSAobW9kdWxlKSA9PiB7XG5cdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuXHRcdCgpID0+IChtb2R1bGVbJ2RlZmF1bHQnXSkgOlxuXHRcdCgpID0+IChtb2R1bGUpO1xuXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCB7IGE6IGdldHRlciB9KTtcblx0cmV0dXJuIGdldHRlcjtcbn07IiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubmMgPSB1bmRlZmluZWQ7IiwiLyogZXNsaW50LWRpc2FibGUgbGluZWJyZWFrLXN0eWxlICovXHJcbi8qIGVzbGludC1kaXNhYmxlIG5vLXVuZGVmICovXHJcblxyXG5pbXBvcnQgJy4uL2Fzc2V0cy9zdHlsZXMvcmVzZXQuY3NzJztcclxuaW1wb3J0ICcuLi9hc3NldHMvc3R5bGVzL25vcm1hbGl6ZS5jc3MnO1xyXG5pbXBvcnQgJy4uL2Fzc2V0cy9zdHlsZXMvc3R5bGUuY3NzJztcclxuXHJcbmltcG9ydCBkYXRhQXJyYXlzIGZyb20gJy4uL2Fzc2V0cy9qcy9jYXJkcyc7XHJcbmltcG9ydCBBcHBDb250cm9sIGZyb20gJy4uL2Fzc2V0cy9qcy9hcHBDb250cm9sJztcclxuaW1wb3J0IGNsaWNrVXNlckludGVyYWN0aXZlIGZyb20gJy4uL2Fzc2V0cy9qcy9jbGlja1VzZXJJbnRlcmFjdGl2ZSc7XHJcblxyXG5jb25zdCBbdG9waWNzLCBjYXJkc10gPSBbZGF0YUFycmF5c1swXSwgZGF0YUFycmF5cy5zbGljZSgxKV07XHJcblxyXG5jb25zdCBhcHBDb250cm9sID0gbmV3IEFwcENvbnRyb2wodG9waWNzLCBjYXJkcyk7XHJcblxyXG5kb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdib2R5JykuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZXZlbnQpID0+IGNsaWNrVXNlckludGVyYWN0aXZlKGV2ZW50LCBhcHBDb250cm9sKSk7XHJcbiJdLCJuYW1lcyI6WyJkYXRhQXJyYXlzIiwiQXBwQ29udHJvbCIsImNsaWNrVXNlckludGVyYWN0aXZlIiwic2xpY2UiLCJ0b3BpY3MiLCJjYXJkcyIsImFwcENvbnRyb2wiLCJkb2N1bWVudCIsInF1ZXJ5U2VsZWN0b3IiLCJhZGRFdmVudExpc3RlbmVyIiwiZXZlbnQiXSwic291cmNlUm9vdCI6IiJ9