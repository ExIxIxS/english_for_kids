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
        image: this.appControl.mainCards[index].image,
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
var ___CSS_LOADER_URL_IMPORT_10___ = new URL(/* asset import */ __webpack_require__(/*! ../img/app/start-button.jpg */ "./assets/img/app/start-button.jpg"), __webpack_require__.b);
var ___CSS_LOADER_URL_IMPORT_11___ = new URL(/* asset import */ __webpack_require__(/*! ../img/app/button-repeat.jpg */ "./assets/img/app/button-repeat.jpg"), __webpack_require__.b);
var ___CSS_LOADER_URL_IMPORT_12___ = new URL(/* asset import */ __webpack_require__(/*! ../img/app/watercolor-kytes-01.jpg */ "./assets/img/app/watercolor-kytes-01.jpg"), __webpack_require__.b);
var ___CSS_LOADER_URL_IMPORT_13___ = new URL(/* asset import */ __webpack_require__(/*! ../img/app/watercolor-buterfly-01.jpg */ "./assets/img/app/watercolor-buterfly-01.jpg"), __webpack_require__.b);
var ___CSS_LOADER_URL_IMPORT_14___ = new URL(/* asset import */ __webpack_require__(/*! ../img/app/watercolor-line-02-right.png */ "./assets/img/app/watercolor-line-02-right.png"), __webpack_require__.b);
var ___CSS_LOADER_URL_IMPORT_15___ = new URL(/* asset import */ __webpack_require__(/*! ../img/app/watercolor-line-02.png */ "./assets/img/app/watercolor-line-02.png"), __webpack_require__.b);
var ___CSS_LOADER_URL_IMPORT_16___ = new URL(/* asset import */ __webpack_require__(/*! ../img/app/watercolor-line-01.png */ "./assets/img/app/watercolor-line-01.png"), __webpack_require__.b);
var ___CSS_LOADER_URL_IMPORT_17___ = new URL(/* asset import */ __webpack_require__(/*! ../img/app/watercolor-blue-card-bg-01.jpg */ "./assets/img/app/watercolor-blue-card-bg-01.jpg"), __webpack_require__.b);
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
// Module
___CSS_LOADER_EXPORT___.push([module.id, "/* gloria-hallelujah-regular - latin */\r\n@font-face {\r\n    font-family: 'Gloria Hallelujah';\r\n    font-style: normal;\r\n    font-weight: 400;\r\n    src: local(''),\r\n         url(" + ___CSS_LOADER_URL_REPLACEMENT_0___ + ") format('woff2'), /* Chrome 26+, Opera 23+, Firefox 39+ */\r\n         url(" + ___CSS_LOADER_URL_REPLACEMENT_1___ + ") format('woff'); /* Chrome 6+, Firefox 3.6+, IE 9+, Safari 5.1+ */\r\n  }\r\n\r\n/* neucha-regular - latin */\r\n@font-face {\r\n    font-family: 'Neucha';\r\n    font-style: normal;\r\n    font-weight: 400;\r\n    src: local(''),\r\n         url(" + ___CSS_LOADER_URL_REPLACEMENT_2___ + ") format('woff2'), /* Chrome 26+, Opera 23+, Firefox 39+ */\r\n         url(" + ___CSS_LOADER_URL_REPLACEMENT_3___ + ") format('woff'); /* Chrome 6+, Firefox 3.6+, IE 9+, Safari 5.1+ */\r\n  }\r\n\r\n/* border-box model for all elements */\r\n\r\nhtml {\r\n    box-sizing: border-box;\r\n}\r\n\r\n*, *::before, *::after {\r\n    box-sizing: inherit;\r\n}\r\n\r\n/* --- Page color styling --- */\r\n\r\n:root {\r\n    --color-bg-main-1: #ffffff;\r\n    --color-bg-main-2: #dbf5f8;\r\n    --color-bg-main-3: #e9f5ff;\r\n    --color-bg-main-4: #f0c2cd63;\r\n    --color-font-1: #3070a6;;\r\n}\r\n\r\n/* ---------------------------------- */\r\n\r\nbody {\r\n    width: 100%;\r\n    display: flex;\r\n    flex-direction: column;\r\n    align-items: center;\r\n    background-color: var(--color-bg-main-1);\r\n    background-image: url(" + ___CSS_LOADER_URL_REPLACEMENT_4___ + "), url(" + ___CSS_LOADER_URL_REPLACEMENT_5___ + ");\r\n    background-attachment: fixed;\r\n    background-position: left top, right bottom;\r\n    background-repeat: repeat-y;\r\n    background-size: 15% auto;\r\n    font-family: 'Neucha', cursive;\r\n    color: var(--color-font-1);\r\n}\r\n\r\nbody.opened-menu {\r\n    overflow-y: hidden;\r\n}\r\n\r\n.inactive {\r\n    visibility: hidden;\r\n    position: fixed;\r\n    top: 0;\r\n}\r\n\r\n.graphic, img {\r\n    width: 100%;\r\n    height: auto;\r\n    padding: 0;\r\n    margin: 0;\r\n}\r\n\r\n.container-centered {\r\n    max-width: 1440px;\r\n    min-width: 1440px;\r\n    margin: 0 auto;\r\n}\r\n\r\nheader.container-centered {\r\n    display: flex;\r\n    flex-direction: column;\r\n    justify-content: center;\r\n    align-items: center;\r\n    position: -webkit-sticky;\r\n    position: sticky;\r\n    top: 0;\r\n    z-index: 8;\r\n    margin-top: 380px;\r\n}\r\n\r\nheader .header-image {\r\n    width: 70%;\r\n    position: absolute;\r\n    top: -376px;\r\n}\r\n\r\n.main-controls {\r\n    width: 100%;\r\n    min-height: 150px;\r\n    display: flex;\r\n    justify-content: space-around;\r\n    align-items: center;\r\n    border-radius: 35px;\r\n    background-color: white;\r\n    background-image: url(" + ___CSS_LOADER_URL_REPLACEMENT_6___ + "), url(" + ___CSS_LOADER_URL_REPLACEMENT_7___ + ");\r\n    background-position: 100% 0, 0 100%;\r\n    background-repeat: repeat-x;\r\n    background-size: auto 28%;\r\n}\r\n\r\n.game-controls {\r\n    width: 70%;\r\n    min-height: 120px;\r\n    padding: 10px 0;\r\n    display: flex;\r\n    justify-content: space-around;\r\n    align-items: center;\r\n    background-color: white;\r\n}\r\n\r\nh1 {\r\n    text-align: center;\r\n    font-family: 'Gloria Hallelujah', cursive;\r\n}\r\n\r\n.button:hover {\r\n    cursor: pointer;\r\n}\r\n\r\n.menu-button {\r\n    z-index: 10;\r\n    width: 30px;\r\n    height: 30px;\r\n    background-image: url(" + ___CSS_LOADER_URL_REPLACEMENT_8___ + ");\r\n    background-size: cover;\r\n    transition: transform 1s;\r\n}\r\n\r\n.menu-button.opened-menu {\r\n    transform: rotate(180deg);\r\n}\r\n\r\n.button.close-menu {\r\n    position: absolute;\r\n    top: 20px;\r\n    right: 20px;\r\n    width: 50px;\r\n    height: 50px;\r\n    border-radius: 50%;\r\n    background-image: url(" + ___CSS_LOADER_URL_REPLACEMENT_9___ + ");\r\n    background-size: cover;\r\n\r\n}\r\n\r\n.switch {\r\n    width: 110px;\r\n    background-color: #faf8fd;\r\n    display: flex;\r\n    justify-content: space-between;\r\n    border-radius: 60px;\r\n    position: relative;\r\n    border: 2px var(--color-font-1) solid;\r\n}\r\n\r\n.switch-rail {\r\n    position: absolute;\r\n    left: 0;\r\n    width: 100%;\r\n    height: 100%;\r\n    border-radius: inherit;\r\n}\r\n\r\n.switch-roller {\r\n    width: 55px;\r\n    height: 100%;\r\n    position: absolute;\r\n    left: 0;\r\n    border-radius: inherit;\r\n    background-color: rgb(50 113 167 / 30%);\r\n    z-index: 10;\r\n    transition: left 0.7s;\r\n    border: 1px var(--color-font-1) solid;\r\n}\r\n\r\n.switch.switch-on .switch-roller {\r\n    left: 53px;\r\n}\r\n\r\n.switch-trigger {\r\n    margin: 0 10px;\r\n    height: 40px;\r\n    z-index: 9;\r\n    padding: 10px 0;\r\n    text-align: center;\r\n    font-size: 20px;\r\n}\r\n\r\n.game-button {\r\n    width: 100px;\r\n    height: 100px;\r\n    border-radius: 50px;\r\n    background-position: center;\r\n    background-repeat: no-repeat;\r\n    background-size: cover;\r\n}\r\n\r\n.game-button.start-button {\r\n    background-color: rgb(3, 146, 39);\r\n    background-image: url(" + ___CSS_LOADER_URL_REPLACEMENT_10___ + ");\r\n}\r\n\r\n.game-button.repeat-button {\r\n    background-color: rgb(248, 178, 112);\r\n    background-image: url(" + ___CSS_LOADER_URL_REPLACEMENT_11___ + ");\r\n}\r\n\r\n.game-progress {\r\n    width: 220px;\r\n    display: flex;\r\n    justify-content: space-around;\r\n    align-items: center;\r\n}\r\n\r\n.game-indicator {\r\n    width: 150px;\r\n    height: 40px;\r\n    border-radius: 18px;\r\n    display: flex;\r\n    justify-content: flex-start;\r\n    align-items: center;\r\n    background-color: #faf8fd;\r\n    border: 1px var(--color-font-1) solid;\r\n}\r\n\r\n.star {\r\n    width: 30px;\r\n}\r\n\r\n.game-score {\r\n    text-align: center;\r\n}\r\n\r\n.game-score .correct {\r\n    color: green;\r\n}\r\n\r\n.game-score .wrong {\r\n    color: red;\r\n}\r\n\r\nnav {\r\n    left: -320px;\r\n    visibility: hidden;\r\n    position: fixed;\r\n    top: 0;\r\n    width: 320px;\r\n    height: 100%;\r\n    overflow-y: auto;\r\n    background-color: var(--color-bg-main-1);\r\n    z-index: 11;\r\n    background-image: url(" + ___CSS_LOADER_URL_REPLACEMENT_12___ + "), url(" + ___CSS_LOADER_URL_REPLACEMENT_13___ + ");\r\n    background-size: 450px auto, 179px auto;\r\n    background-position: 0px 0px, 122px 100%;\r\n    background-repeat: no-repeat, no-repeat;\r\n    transition-property: left, visibility, background-position;\r\n    transition-duration: 1.2s;\r\n}\r\n\r\nnav.opened-menu {\r\n    visibility: visible;\r\n    left: 0;\r\n}\r\n\r\n.menu-list {\r\n    height: 500px;\r\n    margin-top: calc(50vh - 250px);\r\n}\r\n\r\n.menu-list li {\r\n    padding: 10px 0;\r\n    text-align: center;\r\n    font-size: 2em;\r\n    background-color: var(--color-bg-main-1);\r\n}\r\n\r\n.menu-list li:hover {\r\n    background-color: var(--color-bg-main-2);\r\n    background-image: url(" + ___CSS_LOADER_URL_REPLACEMENT_14___ + ");\r\n    background-size: 100% 100%;\r\n    color: white;\r\n    padding: 15px 0;\r\n}\r\n\r\n.menu-list li:nth-child(even):hover {\r\n    background-color: var(--color-bg-main-2);\r\n    background-image: url(" + ___CSS_LOADER_URL_REPLACEMENT_15___ + ");\r\n}\r\n\r\n.menu-list li.active-page, .menu-list li.active-page:hover {\r\n    background-color: var(--color-bg-main-2);\r\n    background-image: url(" + ___CSS_LOADER_URL_REPLACEMENT_16___ + ");\r\n    background-size: 100% 100%;\r\n    color: white;\r\n    padding: 15px 0;\r\n}\r\n\r\nmain.container-centered {\r\n    margin-top: 20px;\r\n    padding-bottom: 35px;\r\n}\r\n\r\n.card-container {\r\n    display: flex;\r\n    justify-content: space-around;\r\n    align-items: center;\r\n    flex-wrap: wrap;\r\n    width: 80%;\r\n    margin: auto;\r\n}\r\n\r\n.card {\r\n    width: 280px;\r\n    height: 270px;\r\n    margin: 15px;\r\n    position: relative;\r\n}\r\n\r\n.card-main-page {\r\n    width: 256px;\r\n    height: 240px;\r\n    margin-top: 20px;\r\n    padding: 45px;\r\n    border-radius: 50%;\r\n    background-color: #ffffff;\r\n    background-image: url(" + ___CSS_LOADER_URL_REPLACEMENT_17___ + ");\r\n    background-size: 100% 83%;\r\n    background-repeat: no-repeat;\r\n}\r\n\r\n.card.disabled {\r\n    background-color: #d2f848;\r\n}\r\n\r\n.card-content {\r\n    width: 100%;\r\n    height: 100%;\r\n    position: relative;\r\n}\r\n\r\n.card-content, .card img {\r\n    border-radius: 50px;\r\n}\r\n\r\n.card p {\r\n    margin-top: 15px;\r\n    font-size: 32px;\r\n    text-align: center;\r\n}\r\n\r\n.card-main-page p {\r\n    position: relative;\r\n    top: 32px;\r\n    border-radius: 20px;\r\n    font-size: 20px;\r\n}\r\n\r\n.card-flip-button {\r\n    width: 50px;\r\n    height: 50px;\r\n    position: absolute;\r\n    bottom: 20px;\r\n    right: 20px;\r\n}\r\n\r\n.card-flip-button span {\r\n    font-size: 50px;\r\n}\r\n\r\n.flipped .card-content {\r\n    animation-name: flip-card;\r\n    animation-duration: 1s;\r\n}\r\n\r\n.unflipped .card-content {\r\n    animation-name: unflip-card;\r\n    animation-duration: 1s;\r\n}\r\n\r\n.final-clip {\r\n    display: flex;\r\n    flex-direction: column;\r\n    width: 320px;\r\n    margin: auto;\r\n    justify-content: center;\r\n    align-items: center;\r\n    padding: 50px 0;\r\n}\r\n\r\n.final-clip p {\r\n    color: red;\r\n    font-size: 36px;\r\n    margin-top: 30px;\r\n}\r\n\r\n.stat-container {\r\n    display: flex;\r\n    flex-direction: column;\r\n    justify-content: center;\r\n    align-items: center;\r\n    font-size: 2em;\r\n}\r\n\r\n.table-wrapper {\r\n    width: calc(1440vw*100/1440);\r\n    overflow-x: auto;\r\n    display: flex;\r\n    flex-direction: column;\r\n    justify-content: center;\r\n    align-items: center;\r\n}\r\n\r\n.stat-table {\r\n    width: calc(1440vw*100/1440);\r\n    max-width: 1440px;\r\n    min-width: 500px;\r\n    border-collapse: collapse;\r\n    font-size: 0.5em;\r\n\r\n}\r\n\r\nthead {\r\n    background-color: aliceblue;\r\n}\r\n\r\nth {\r\n    height: 30px;\r\n}\r\n\r\ntr {\r\n    height: 25px;\r\n    background-color: azure;\r\n}\r\n\r\nth, td {\r\n    border: 1px solid black;\r\n    text-align: center;\r\n    vertical-align: middle;\r\n}\r\n\r\ntr:nth-child(even) {\r\n    background-color: #fdfdde;\r\n}\r\n\r\n.sorted-down, .sorted-up {\r\n    background-color: #d0fa81;\r\n}\r\n\r\n.sort-icon {\r\n    width: 16px;\r\n    height: auto;\r\n    position: relative;\r\n    left: 10px;\r\n    top: 2px;\r\n}\r\n\r\n.stat-buttons-wrapper {\r\n    width: 100%;\r\n    display: flex;\r\n    justify-content: space-around;\r\n    flex-wrap: wrap;\r\n}\r\n\r\n.stat-button {\r\n    width: 300px;\r\n    height: 70px;\r\n    margin: 20px 0;\r\n    padding: 15px;\r\n    border-radius: 50px;\r\n    border: 1px solid rgb(0, 0, 0);\r\n    color: azure;\r\n    text-align: center;\r\n}\r\n\r\n.button.train-diff {\r\n    background-color: rgb(7, 160, 96);\r\n}\r\n\r\n.button.reset-stat {\r\n    background-color: rgb(189, 45, 45);\r\n}\r\n\r\n.nothing-diff {\r\n    width: 100%;\r\n}\r\n\r\n.nothing-diff p {\r\n    position: absolute;\r\n    top: 20%;\r\n}\r\n\r\n.disabled:hover {\r\n    cursor:not-allowed;\r\n}\r\n\r\n/* --- Animation --- */\r\n\r\n@keyframes flip-card {\r\n    0% {}\r\n    50% {transform: rotateY(89deg)}\r\n}\r\n\r\n@keyframes unflip-card {\r\n    0% {}\r\n    50% {transform: rotateY(89deg)}\r\n}\r\n\r\n/* --- RESPONSIVE LAYOUTS --- */\r\n\r\n@media (max-width: 1439px) {\r\n    .container-centered {\r\n        min-width: calc(1440vw*100/1440);\r\n    }\r\n\r\n    header.container-centered {\r\n        margin-top:  calc(380vw*100/1440);\r\n    }\r\n\r\n    header .graphic {\r\n        top: calc(-376vw*100/1440);\r\n    }\r\n\r\n}\r\n\r\n@media (max-height: 970px) {\r\n    .menu-list {\r\n        margin-top: 235px;\r\n    }\r\n}", "",{"version":3,"sources":["webpack://./assets/styles/style.css"],"names":[],"mappings":"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","sourcesContent":["/* gloria-hallelujah-regular - latin */\r\n@font-face {\r\n    font-family: 'Gloria Hallelujah';\r\n    font-style: normal;\r\n    font-weight: 400;\r\n    src: local(''),\r\n         url('../fonts/gloria-hallelujah-v17-latin-regular.woff2') format('woff2'), /* Chrome 26+, Opera 23+, Firefox 39+ */\r\n         url('../fonts/gloria-hallelujah-v17-latin-regular.woff') format('woff'); /* Chrome 6+, Firefox 3.6+, IE 9+, Safari 5.1+ */\r\n  }\r\n\r\n/* neucha-regular - latin */\r\n@font-face {\r\n    font-family: 'Neucha';\r\n    font-style: normal;\r\n    font-weight: 400;\r\n    src: local(''),\r\n         url('../fonts/neucha-v17-latin-regular.woff2') format('woff2'), /* Chrome 26+, Opera 23+, Firefox 39+ */\r\n         url('../fonts/neucha-v17-latin-regular.woff') format('woff'); /* Chrome 6+, Firefox 3.6+, IE 9+, Safari 5.1+ */\r\n  }\r\n\r\n/* border-box model for all elements */\r\n\r\nhtml {\r\n    box-sizing: border-box;\r\n}\r\n\r\n*, *::before, *::after {\r\n    box-sizing: inherit;\r\n}\r\n\r\n/* --- Page color styling --- */\r\n\r\n:root {\r\n    --color-bg-main-1: #ffffff;\r\n    --color-bg-main-2: #dbf5f8;\r\n    --color-bg-main-3: #e9f5ff;\r\n    --color-bg-main-4: #f0c2cd63;\r\n    --color-font-1: #3070a6;;\r\n}\r\n\r\n/* ---------------------------------- */\r\n\r\nbody {\r\n    width: 100%;\r\n    display: flex;\r\n    flex-direction: column;\r\n    align-items: center;\r\n    background-color: var(--color-bg-main-1);\r\n    background-image: url(\"../img/app/watercolor-blue-bg-left.jpg\"), url(\"../img/app/watercolor-blue-bg-right.jpg\");\r\n    background-attachment: fixed;\r\n    background-position: left top, right bottom;\r\n    background-repeat: repeat-y;\r\n    background-size: 15% auto;\r\n    font-family: 'Neucha', cursive;\r\n    color: var(--color-font-1);\r\n}\r\n\r\nbody.opened-menu {\r\n    overflow-y: hidden;\r\n}\r\n\r\n.inactive {\r\n    visibility: hidden;\r\n    position: fixed;\r\n    top: 0;\r\n}\r\n\r\n.graphic, img {\r\n    width: 100%;\r\n    height: auto;\r\n    padding: 0;\r\n    margin: 0;\r\n}\r\n\r\n.container-centered {\r\n    max-width: 1440px;\r\n    min-width: 1440px;\r\n    margin: 0 auto;\r\n}\r\n\r\nheader.container-centered {\r\n    display: flex;\r\n    flex-direction: column;\r\n    justify-content: center;\r\n    align-items: center;\r\n    position: -webkit-sticky;\r\n    position: sticky;\r\n    top: 0;\r\n    z-index: 8;\r\n    margin-top: 380px;\r\n}\r\n\r\nheader .header-image {\r\n    width: 70%;\r\n    position: absolute;\r\n    top: -376px;\r\n}\r\n\r\n.main-controls {\r\n    width: 100%;\r\n    min-height: 150px;\r\n    display: flex;\r\n    justify-content: space-around;\r\n    align-items: center;\r\n    border-radius: 35px;\r\n    background-color: white;\r\n    background-image: url(../img/app/watercolor-waves-01-up.png), url(../img/app/watercolor-waves-01-down.png);\r\n    background-position: 100% 0, 0 100%;\r\n    background-repeat: repeat-x;\r\n    background-size: auto 28%;\r\n}\r\n\r\n.game-controls {\r\n    width: 70%;\r\n    min-height: 120px;\r\n    padding: 10px 0;\r\n    display: flex;\r\n    justify-content: space-around;\r\n    align-items: center;\r\n    background-color: white;\r\n}\r\n\r\nh1 {\r\n    text-align: center;\r\n    font-family: 'Gloria Hallelujah', cursive;\r\n}\r\n\r\n.button:hover {\r\n    cursor: pointer;\r\n}\r\n\r\n.menu-button {\r\n    z-index: 10;\r\n    width: 30px;\r\n    height: 30px;\r\n    background-image: url(\"../img/app/watercolor-menu-button-01.png\");\r\n    background-size: cover;\r\n    transition: transform 1s;\r\n}\r\n\r\n.menu-button.opened-menu {\r\n    transform: rotate(180deg);\r\n}\r\n\r\n.button.close-menu {\r\n    position: absolute;\r\n    top: 20px;\r\n    right: 20px;\r\n    width: 50px;\r\n    height: 50px;\r\n    border-radius: 50%;\r\n    background-image: url(\"../img/app/watercolor-red-cross-button-01.jpg\");\r\n    background-size: cover;\r\n\r\n}\r\n\r\n.switch {\r\n    width: 110px;\r\n    background-color: #faf8fd;\r\n    display: flex;\r\n    justify-content: space-between;\r\n    border-radius: 60px;\r\n    position: relative;\r\n    border: 2px var(--color-font-1) solid;\r\n}\r\n\r\n.switch-rail {\r\n    position: absolute;\r\n    left: 0;\r\n    width: 100%;\r\n    height: 100%;\r\n    border-radius: inherit;\r\n}\r\n\r\n.switch-roller {\r\n    width: 55px;\r\n    height: 100%;\r\n    position: absolute;\r\n    left: 0;\r\n    border-radius: inherit;\r\n    background-color: rgb(50 113 167 / 30%);\r\n    z-index: 10;\r\n    transition: left 0.7s;\r\n    border: 1px var(--color-font-1) solid;\r\n}\r\n\r\n.switch.switch-on .switch-roller {\r\n    left: 53px;\r\n}\r\n\r\n.switch-trigger {\r\n    margin: 0 10px;\r\n    height: 40px;\r\n    z-index: 9;\r\n    padding: 10px 0;\r\n    text-align: center;\r\n    font-size: 20px;\r\n}\r\n\r\n.game-button {\r\n    width: 100px;\r\n    height: 100px;\r\n    border-radius: 50px;\r\n    background-position: center;\r\n    background-repeat: no-repeat;\r\n    background-size: cover;\r\n}\r\n\r\n.game-button.start-button {\r\n    background-color: rgb(3, 146, 39);\r\n    background-image: url(\"../img/app/start-button.jpg\");\r\n}\r\n\r\n.game-button.repeat-button {\r\n    background-color: rgb(248, 178, 112);\r\n    background-image: url(\"../img/app/button-repeat.jpg\");\r\n}\r\n\r\n.game-progress {\r\n    width: 220px;\r\n    display: flex;\r\n    justify-content: space-around;\r\n    align-items: center;\r\n}\r\n\r\n.game-indicator {\r\n    width: 150px;\r\n    height: 40px;\r\n    border-radius: 18px;\r\n    display: flex;\r\n    justify-content: flex-start;\r\n    align-items: center;\r\n    background-color: #faf8fd;\r\n    border: 1px var(--color-font-1) solid;\r\n}\r\n\r\n.star {\r\n    width: 30px;\r\n}\r\n\r\n.game-score {\r\n    text-align: center;\r\n}\r\n\r\n.game-score .correct {\r\n    color: green;\r\n}\r\n\r\n.game-score .wrong {\r\n    color: red;\r\n}\r\n\r\nnav {\r\n    left: -320px;\r\n    visibility: hidden;\r\n    position: fixed;\r\n    top: 0;\r\n    width: 320px;\r\n    height: 100%;\r\n    overflow-y: auto;\r\n    background-color: var(--color-bg-main-1);\r\n    z-index: 11;\r\n    background-image: url(\"../img/app/watercolor-kytes-01.jpg\"), url(\"../img/app/watercolor-buterfly-01.jpg\");\r\n    background-size: 450px auto, 179px auto;\r\n    background-position: 0px 0px, 122px 100%;\r\n    background-repeat: no-repeat, no-repeat;\r\n    transition-property: left, visibility, background-position;\r\n    transition-duration: 1.2s;\r\n}\r\n\r\nnav.opened-menu {\r\n    visibility: visible;\r\n    left: 0;\r\n}\r\n\r\n.menu-list {\r\n    height: 500px;\r\n    margin-top: calc(50vh - 250px);\r\n}\r\n\r\n.menu-list li {\r\n    padding: 10px 0;\r\n    text-align: center;\r\n    font-size: 2em;\r\n    background-color: var(--color-bg-main-1);\r\n}\r\n\r\n.menu-list li:hover {\r\n    background-color: var(--color-bg-main-2);\r\n    background-image: url(\"../img/app/watercolor-line-02-right.png\");\r\n    background-size: 100% 100%;\r\n    color: white;\r\n    padding: 15px 0;\r\n}\r\n\r\n.menu-list li:nth-child(even):hover {\r\n    background-color: var(--color-bg-main-2);\r\n    background-image: url(\"../img/app/watercolor-line-02.png\");\r\n}\r\n\r\n.menu-list li.active-page, .menu-list li.active-page:hover {\r\n    background-color: var(--color-bg-main-2);\r\n    background-image: url(\"../img/app/watercolor-line-01.png\");\r\n    background-size: 100% 100%;\r\n    color: white;\r\n    padding: 15px 0;\r\n}\r\n\r\nmain.container-centered {\r\n    margin-top: 20px;\r\n    padding-bottom: 35px;\r\n}\r\n\r\n.card-container {\r\n    display: flex;\r\n    justify-content: space-around;\r\n    align-items: center;\r\n    flex-wrap: wrap;\r\n    width: 80%;\r\n    margin: auto;\r\n}\r\n\r\n.card {\r\n    width: 280px;\r\n    height: 270px;\r\n    margin: 15px;\r\n    position: relative;\r\n}\r\n\r\n.card-main-page {\r\n    width: 256px;\r\n    height: 240px;\r\n    margin-top: 20px;\r\n    padding: 45px;\r\n    border-radius: 50%;\r\n    background-color: #ffffff;\r\n    background-image: url(\"../img/app/watercolor-blue-card-bg-01.jpg\");\r\n    background-size: 100% 83%;\r\n    background-repeat: no-repeat;\r\n}\r\n\r\n.card.disabled {\r\n    background-color: #d2f848;\r\n}\r\n\r\n.card-content {\r\n    width: 100%;\r\n    height: 100%;\r\n    position: relative;\r\n}\r\n\r\n.card-content, .card img {\r\n    border-radius: 50px;\r\n}\r\n\r\n.card p {\r\n    margin-top: 15px;\r\n    font-size: 32px;\r\n    text-align: center;\r\n}\r\n\r\n.card-main-page p {\r\n    position: relative;\r\n    top: 32px;\r\n    border-radius: 20px;\r\n    font-size: 20px;\r\n}\r\n\r\n.card-flip-button {\r\n    width: 50px;\r\n    height: 50px;\r\n    position: absolute;\r\n    bottom: 20px;\r\n    right: 20px;\r\n}\r\n\r\n.card-flip-button span {\r\n    font-size: 50px;\r\n}\r\n\r\n.flipped .card-content {\r\n    animation-name: flip-card;\r\n    animation-duration: 1s;\r\n}\r\n\r\n.unflipped .card-content {\r\n    animation-name: unflip-card;\r\n    animation-duration: 1s;\r\n}\r\n\r\n.final-clip {\r\n    display: flex;\r\n    flex-direction: column;\r\n    width: 320px;\r\n    margin: auto;\r\n    justify-content: center;\r\n    align-items: center;\r\n    padding: 50px 0;\r\n}\r\n\r\n.final-clip p {\r\n    color: red;\r\n    font-size: 36px;\r\n    margin-top: 30px;\r\n}\r\n\r\n.stat-container {\r\n    display: flex;\r\n    flex-direction: column;\r\n    justify-content: center;\r\n    align-items: center;\r\n    font-size: 2em;\r\n}\r\n\r\n.table-wrapper {\r\n    width: calc(1440vw*100/1440);\r\n    overflow-x: auto;\r\n    display: flex;\r\n    flex-direction: column;\r\n    justify-content: center;\r\n    align-items: center;\r\n}\r\n\r\n.stat-table {\r\n    width: calc(1440vw*100/1440);\r\n    max-width: 1440px;\r\n    min-width: 500px;\r\n    border-collapse: collapse;\r\n    font-size: 0.5em;\r\n\r\n}\r\n\r\nthead {\r\n    background-color: aliceblue;\r\n}\r\n\r\nth {\r\n    height: 30px;\r\n}\r\n\r\ntr {\r\n    height: 25px;\r\n    background-color: azure;\r\n}\r\n\r\nth, td {\r\n    border: 1px solid black;\r\n    text-align: center;\r\n    vertical-align: middle;\r\n}\r\n\r\ntr:nth-child(even) {\r\n    background-color: #fdfdde;\r\n}\r\n\r\n.sorted-down, .sorted-up {\r\n    background-color: #d0fa81;\r\n}\r\n\r\n.sort-icon {\r\n    width: 16px;\r\n    height: auto;\r\n    position: relative;\r\n    left: 10px;\r\n    top: 2px;\r\n}\r\n\r\n.stat-buttons-wrapper {\r\n    width: 100%;\r\n    display: flex;\r\n    justify-content: space-around;\r\n    flex-wrap: wrap;\r\n}\r\n\r\n.stat-button {\r\n    width: 300px;\r\n    height: 70px;\r\n    margin: 20px 0;\r\n    padding: 15px;\r\n    border-radius: 50px;\r\n    border: 1px solid rgb(0, 0, 0);\r\n    color: azure;\r\n    text-align: center;\r\n}\r\n\r\n.button.train-diff {\r\n    background-color: rgb(7, 160, 96);\r\n}\r\n\r\n.button.reset-stat {\r\n    background-color: rgb(189, 45, 45);\r\n}\r\n\r\n.nothing-diff {\r\n    width: 100%;\r\n}\r\n\r\n.nothing-diff p {\r\n    position: absolute;\r\n    top: 20%;\r\n}\r\n\r\n.disabled:hover {\r\n    cursor:not-allowed;\r\n}\r\n\r\n/* --- Animation --- */\r\n\r\n@keyframes flip-card {\r\n    0% {}\r\n    50% {transform: rotateY(89deg)}\r\n}\r\n\r\n@keyframes unflip-card {\r\n    0% {}\r\n    50% {transform: rotateY(89deg)}\r\n}\r\n\r\n/* --- RESPONSIVE LAYOUTS --- */\r\n\r\n@media (max-width: 1439px) {\r\n    .container-centered {\r\n        min-width: calc(1440vw*100/1440);\r\n    }\r\n\r\n    header.container-centered {\r\n        margin-top:  calc(380vw*100/1440);\r\n    }\r\n\r\n    header .graphic {\r\n        top: calc(-376vw*100/1440);\r\n    }\r\n\r\n}\r\n\r\n@media (max-height: 970px) {\r\n    .menu-list {\r\n        margin-top: 235px;\r\n    }\r\n}"],"sourceRoot":""}]);
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

/***/ "./assets/img/app/button-repeat.jpg":
/*!******************************************!*\
  !*** ./assets/img/app/button-repeat.jpg ***!
  \******************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "2f4761e65a6164479dcd.jpg";

/***/ }),

/***/ "./assets/img/app/start-button.jpg":
/*!*****************************************!*\
  !*** ./assets/img/app/start-button.jpg ***!
  \*****************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "55b73a14795a31ccb937.jpg";

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSxpRUFBZSxLQUFLLEVBQUM7Ozs7Ozs7Ozs7Ozs7OztBQ2pUckI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBUTtBQUNSO0FBQ0E7QUFDQTtBQUNBLFFBQVE7QUFDUjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBUTtBQUNSO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlFQUFlLG9CQUFvQixFQUFDOzs7Ozs7Ozs7Ozs7Ozs7O0FDakhwQztBQUNBO0FBQ0E7QUFDQTtBQUNB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QUN0QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMEJBQTBCLDBEQUFZO0FBQ3RDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHlDQUF5Qyw2Q0FBSTtBQUM3QztBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHlDQUF5Qyw2Q0FBSTtBQUM3QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlFQUFlLFdBQVcsRUFBQzs7Ozs7Ozs7Ozs7Ozs7O0FDOUwzQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtB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QUssWUFBWSxXQUFXLFVBQVUsVUFBVSxVQUFVLFlBQVksYUFBYSxjQUFjLE9BQU8sS0FBSyxVQUFVLFlBQVksV0FBVyxZQUFZLGFBQWEsYUFBYSxhQUFhLE9BQU8sS0FBSyxZQUFZLFdBQVcsVUFBVSxVQUFVLFlBQVksT0FBTyxLQUFLLFVBQVUsVUFBVSxZQUFZLFdBQVcsWUFBWSxhQUFhLFdBQVcsWUFBWSxhQUFhLE9BQU8sS0FBSyxVQUFVLE1BQU0sS0FBSyxVQUFVLFVBQVUsVUFBVSxVQUFVLFlBQVksV0FBVyxPQUFPLEtBQUssVUFBVSxVQUFVLFlBQVksYUFBYSxhQUFhLGFBQWEsT0FBTyxLQUFLLFlBQVksYUFBYSxPQUFPLEtBQUssWUFBWSxhQUFhLE9BQU8sS0FBSyxVQUFVLFVBQVUsWUFBWSxhQUFhLE9BQU8sS0FBSyxVQUFVLFVBQVUsWUFBWSxXQUFXLFlBQVksYUFBYSxhQUFhLGFBQWEsT0FBTyxLQUFLLFVBQVUsTUFBTSxLQUFLLFlBQVksT0FBTyxLQUFLLFVBQVUsT0FBTyxLQUFLLFVBQVUsTUFBTSxLQUFLLFVBQVUsWUFBWSxXQUFXLFVBQVUsVUFBVSxVQUFVLFlBQVksYUFBYSxXQUFXLFlBQVksYUFBYSxhQUFhLGFBQWEsYUFBYSxhQUFhLE9BQU8sS0FBSyxZQUFZLFdBQVcsTUFBTSxLQUFLLFVBQVUsWUFBWSxPQUFPLEtBQUssVUFBVSxZQUFZLFdBQVcsWUFBWSxPQUFPLEtBQUssWUFBWSxhQUFhLGFBQWEsV0FBVyxVQUFVLE9BQU8sS0FBSyxZQUFZLGFBQWEsT0FBTyxLQUFLLFlBQVksYUFBYSxhQUFhLFdBQVcsVUFBVSxPQUFPLEtBQUssWUFBWSxhQUFhLE9BQU8sS0FBSyxVQUFVLFlBQVksYUFBYSxXQUFXLFVBQVUsVUFBVSxPQUFPLEtBQUssVUFBVSxVQUFVLFVBQVUsWUFBWSxPQUFPLEtBQUssVUFBVSxVQUFVLFlBQVksV0FBVyxZQUFZLGFBQWEsYUFBYSxhQUFhLGFBQWEsT0FBTyxLQUFLLFlBQVksT0FBTyxLQUFLLFVBQVUsVUFBVSxZQUFZLE9BQU8sS0FBSyxZQUFZLE9B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V0FDQTtXQUNBO1dBQ0EseUNBQXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0E7Ozs7O1dDUEE7V0FDQTtXQUNBO1dBQ0E7V0FDQSxHQUFHO1dBQ0g7V0FDQTtXQUNBLENBQUM7Ozs7O1dDUEQ7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7OztXQ05BO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBOzs7OztXQ2ZBOztXQUVBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTs7V0FFQTs7V0FFQTs7V0FFQTs7V0FFQTs7V0FFQTs7V0FFQTs7V0FFQTs7Ozs7V0NyQkE7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ0FBOztBQUNBO0FBRUE7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFFQSxXQUF3QixDQUFDQSwyREFBRCxFQUFnQkEsOERBQUEsQ0FBaUIsQ0FBakIsQ0FBaEIsQ0FBeEI7QUFBQSxJQUFPSyxNQUFQO0FBQUEsSUFBZUMsS0FBZjtBQUVBLElBQU1DLFVBQVUsR0FBRyxJQUFJTiw2REFBSixDQUFlSSxNQUFmLEVBQXVCQyxLQUF2QixFQUE4QkgsNERBQTlCLENBQW5CO0FBRUFLLFFBQVEsQ0FBQ0MsYUFBVCxDQUF1QixNQUF2QixFQUErQkMsZ0JBQS9CLENBQWdELE9BQWhELEVBQXlELFVBQUNDLEtBQUQ7RUFBQSxPQUFXVCwyRUFBb0IsQ0FBQ1MsS0FBRCxFQUFRSixVQUFSLENBQS9CO0FBQUEsQ0FBekQsRSIsInNvdXJjZXMiOlsid2VicGFjazovL2VuZ2xpc2hfZm9yX2tpZHMvLi9hc3NldHMvanMvYXBwQ29udHJvbC5qcyIsIndlYnBhY2s6Ly9lbmdsaXNoX2Zvcl9raWRzLy4vYXNzZXRzL2pzL2NhcmQuanMiLCJ3ZWJwYWNrOi8vZW5nbGlzaF9mb3Jfa2lkcy8uL2Fzc2V0cy9qcy9jYXJkcy5qcyIsIndlYnBhY2s6Ly9lbmdsaXNoX2Zvcl9raWRzLy4vYXNzZXRzL2pzL2NsaWNrVXNlckludGVyYWN0aXZlLmpzIiwid2VicGFjazovL2VuZ2xpc2hfZm9yX2tpZHMvLi9hc3NldHMvanMvY29tbW9uRnVuY3QuanMiLCJ3ZWJwYWNrOi8vZW5nbGlzaF9mb3Jfa2lkcy8uL2Fzc2V0cy9qcy9jb250ZW50LmpzIiwid2VicGFjazovL2VuZ2xpc2hfZm9yX2tpZHMvLi9hc3NldHMvanMvZ2FtZUNvbnRyb2wuanMiLCJ3ZWJwYWNrOi8vZW5nbGlzaF9mb3Jfa2lkcy8uL2Fzc2V0cy9qcy9tYWluQ2FyZHMuanMiLCJ3ZWJwYWNrOi8vZW5nbGlzaF9mb3Jfa2lkcy8uL2Fzc2V0cy9qcy9tZW51LmpzIiwid2VicGFjazovL2VuZ2xpc2hfZm9yX2tpZHMvLi9hc3NldHMvanMvc3Rhci5qcyIsIndlYnBhY2s6Ly9lbmdsaXNoX2Zvcl9raWRzLy4vYXNzZXRzL2pzL3N0YXRTdG9yYWdlLmpzIiwid2VicGFjazovL2VuZ2xpc2hfZm9yX2tpZHMvLi9hc3NldHMvanMvc3RhdGlzdGljLmpzIiwid2VicGFjazovL2VuZ2xpc2hfZm9yX2tpZHMvLi9hc3NldHMvanMvc3dpdGNoLmpzIiwid2VicGFjazovL2VuZ2xpc2hfZm9yX2tpZHMvLi9hc3NldHMvc3R5bGVzL25vcm1hbGl6ZS5jc3MiLCJ3ZWJwYWNrOi8vZW5nbGlzaF9mb3Jfa2lkcy8uL2Fzc2V0cy9zdHlsZXMvcmVzZXQuY3NzIiwid2VicGFjazovL2VuZ2xpc2hfZm9yX2tpZHMvLi9hc3NldHMvc3R5bGVzL3N0eWxlLmNzcyIsIndlYnBhY2s6Ly9lbmdsaXNoX2Zvcl9raWRzLy4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL2FwaS5qcyIsIndlYnBhY2s6Ly9lbmdsaXNoX2Zvcl9raWRzLy4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL2dldFVybC5qcyIsIndlYnBhY2s6Ly9lbmdsaXNoX2Zvcl9raWRzLy4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL3NvdXJjZU1hcHMuanMiLCJ3ZWJwYWNrOi8vZW5nbGlzaF9mb3Jfa2lkcy8uL2Fzc2V0cy9zdHlsZXMvbm9ybWFsaXplLmNzcz8zOGVlIiwid2VicGFjazovL2VuZ2xpc2hfZm9yX2tpZHMvLi9hc3NldHMvc3R5bGVzL3Jlc2V0LmNzcz85YjdhIiwid2VicGFjazovL2VuZ2xpc2hfZm9yX2tpZHMvLi9hc3NldHMvc3R5bGVzL3N0eWxlLmNzcz85YmJlIiwid2VicGFjazovL2VuZ2xpc2hfZm9yX2tpZHMvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbmplY3RTdHlsZXNJbnRvU3R5bGVUYWcuanMiLCJ3ZWJwYWNrOi8vZW5nbGlzaF9mb3Jfa2lkcy8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydEJ5U2VsZWN0b3IuanMiLCJ3ZWJwYWNrOi8vZW5nbGlzaF9mb3Jfa2lkcy8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydFN0eWxlRWxlbWVudC5qcyIsIndlYnBhY2s6Ly9lbmdsaXNoX2Zvcl9raWRzLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzLmpzIiwid2VicGFjazovL2VuZ2xpc2hfZm9yX2tpZHMvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZURvbUFQSS5qcyIsIndlYnBhY2s6Ly9lbmdsaXNoX2Zvcl9raWRzLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVUYWdUcmFuc2Zvcm0uanMiLCJ3ZWJwYWNrOi8vZW5nbGlzaF9mb3Jfa2lkcy93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9lbmdsaXNoX2Zvcl9raWRzL3dlYnBhY2svcnVudGltZS9jb21wYXQgZ2V0IGRlZmF1bHQgZXhwb3J0Iiwid2VicGFjazovL2VuZ2xpc2hfZm9yX2tpZHMvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL2VuZ2xpc2hfZm9yX2tpZHMvd2VicGFjay9ydW50aW1lL2dsb2JhbCIsIndlYnBhY2s6Ly9lbmdsaXNoX2Zvcl9raWRzL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vZW5nbGlzaF9mb3Jfa2lkcy93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL2VuZ2xpc2hfZm9yX2tpZHMvd2VicGFjay9ydW50aW1lL3B1YmxpY1BhdGgiLCJ3ZWJwYWNrOi8vZW5nbGlzaF9mb3Jfa2lkcy93ZWJwYWNrL3J1bnRpbWUvanNvbnAgY2h1bmsgbG9hZGluZyIsIndlYnBhY2s6Ly9lbmdsaXNoX2Zvcl9raWRzL3dlYnBhY2svcnVudGltZS9ub25jZSIsIndlYnBhY2s6Ly9lbmdsaXNoX2Zvcl9raWRzLy4vc3JjL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbIi8qIGVzbGludC1kaXNhYmxlIGxpbmVicmVhay1zdHlsZSAqL1xyXG4vKiBlc2xpbnQtZGlzYWJsZSBuby1jb25zb2xlICovXHJcbi8qIGVzbGludC1kaXNhYmxlIGxpbmVicmVhay1zdHlsZSAqL1xyXG4vKiBlc2xpbnQtZGlzYWJsZSBuby11bmRlZiAqL1xyXG5cclxuaW1wb3J0IE1lbnVFbGVtZW50IGZyb20gJy4vbWVudSc7XHJcbmltcG9ydCBDb250ZW50Q29udGFpbmVyIGZyb20gJy4vY29udGVudCc7XHJcbmltcG9ydCBTd2l0Y2hFbGVtZW50IGZyb20gJy4vc3dpdGNoJztcclxuaW1wb3J0IEdhbWVDb250cm9sIGZyb20gJy4vZ2FtZUNvbnRyb2wnO1xyXG5pbXBvcnQgU3RhdGlzdGljIGZyb20gJy4vc3RhdGlzdGljJztcclxuXHJcbmNsYXNzIEFwcENvbnRyb2wge1xyXG4gIGNvbnN0cnVjdG9yKHRvcGljc0FyciwgY2FyZHNBcnIsIG1haW5DYXJkcykge1xyXG4gICAgdGhpcy50b3BpY3NBcnIgPSB0b3BpY3NBcnI7XHJcbiAgICB0aGlzLmNhcmRzQXJyID0gY2FyZHNBcnI7XHJcbiAgICB0aGlzLm1haW5DYXJkcyA9IG1haW5DYXJkcztcclxuXHJcbiAgICB0aGlzLm1lbnUgPSBuZXcgTWVudUVsZW1lbnQodGhpcy50b3BpY3NBcnIpXHJcbiAgICAgIC5hZGRUb0RvYygpO1xyXG5cclxuICAgIHRoaXMuYWN0aXZlUGFnZSA9IHRoaXMubWVudS5hY3RpdmVQYWdlO1xyXG5cclxuICAgIHRoaXMuc3dpdGNoT2JqID0gbmV3IFN3aXRjaEVsZW1lbnQoKVxyXG4gICAgICAuYWRkVG9Eb2MoKTtcclxuXHJcbiAgICB0aGlzLmFjdGl2ZU1vZGUgPSB0aGlzLnN3aXRjaE9iai5hY3RpdmVNb2RlO1xyXG5cclxuICAgIHRoaXMuZ2FtZUNvbnRyb2wgPSBuZXcgR2FtZUNvbnRyb2wodGhpcylcclxuICAgICAgLmFkZFRvRG9jKCk7XHJcblxyXG4gICAgdGhpcy5jb250ZW50ID0gbmV3IENvbnRlbnRDb250YWluZXIodGhpcylcclxuICAgICAgLmFkZFRvRG9jKCk7XHJcblxyXG4gICAgdGhpcy5zdGF0ID0gbmV3IFN0YXRpc3RpYyh0aGlzKTtcclxuICB9XHJcblxyXG4gIGdldCBhY3RpdmVQYWdlKCkge1xyXG4gICAgcmV0dXJuIHRoaXMubWVudS5hY3RpdmVQYWdlO1xyXG4gIH1cclxuXHJcbiAgc2V0IGFjdGl2ZVBhZ2UodmFsdWUpIHtcclxuICAgIHRoaXMubWVudS5hY3RpdmVQYWdlID0gdmFsdWU7XHJcbiAgfVxyXG5cclxuICBnZXQgYWN0aXZlTW9kZSgpIHtcclxuICAgIHJldHVybiB0aGlzLnN3aXRjaE9iai5hY3RpdmVNb2RlO1xyXG4gIH1cclxuXHJcbiAgc2V0IGFjdGl2ZU1vZGUodmFsdWUpIHtcclxuICAgIHRoaXMuc3dpdGNoT2JqLmFjdGl2ZU1vZGUgPSB2YWx1ZTtcclxuICB9XHJcblxyXG4gIGdldCBhY3RpdmVBcnJDYXJkc09iaigpIHtcclxuICAgIGNvbnN0IGkgPSB0aGlzLnRvcGljc0Fyci5maW5kSW5kZXgoKGl0ZW0pID0+IGl0ZW0udG9Mb3dlckNhc2UoKSA9PT0gdGhpcy5hY3RpdmVQYWdlKTtcclxuICAgIHJldHVybiB0aGlzLmNhcmRzQXJyW2ldO1xyXG4gIH1cclxuXHJcbiAgc2V0IGFjdGl2ZUFyckNhcmRzT2JqKGFyckNhcmRzT2JqKSB7XHJcbiAgICB0aGlzLmFjdGl2ZUFyckNhcmRzT2JqID0gYXJyQ2FyZHNPYmo7XHJcbiAgfVxyXG5cclxuICBjaGFuZ2VQYWdlKHBhZ2VOYW1lKSB7XHJcbiAgICB0aGlzLm1lbnUuc2V0QWN0aXZlVG9waWMocGFnZU5hbWUpO1xyXG4gICAgdGhpcy5jb250ZW50LmNoYW5nZUNvbnRlbnQocGFnZU5hbWUpO1xyXG4gICAgaWYgKHRoaXMuYWN0aXZlTW9kZSA9PT0gJ3BsYXknICYmICh0aGlzLmNvbnRlbnQuZ2V0VmFsaWRUb3BpY1R5cGUodGhpcy5hY3RpdmVQYWdlKSA9PT0gJ3RvcGljJykpIHtcclxuICAgICAgdGhpcy5nYW1lQ29udHJvbC5zaG93KCk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLmdhbWVDb250cm9sLmhpZGUoKTtcclxuICAgIH1cclxuICAgIHJldHVybiB0aGlzO1xyXG4gIH1cclxuXHJcbiAgcGxheUNhcmRTb3VuZChjYXJkT2JqKSB7XHJcbiAgICBjb25zdCBhdWRpb0VsZW1lbnQgPSBuZXcgQXVkaW8oYC4uL2Fzc2V0cy8ke2NhcmRPYmouYXVkaW9TcmN9YCk7XHJcbiAgICBhdWRpb0VsZW1lbnQucGxheSgpO1xyXG4gICAgcmV0dXJuIHRoaXM7XHJcbiAgfVxyXG5cclxuICBwbGF5QXBwU291bmQoc291bmROYW1lKSB7XHJcbiAgICBjb25zdCBzb3VuZHNMaWJyYXJ5ID0ge1xyXG4gICAgICBjb3JyZWN0OiAnYXBwL2NvcnJlY3QubXAzJyxcclxuICAgICAgd3Jvbmc6ICdhcHAvZXJyb3IubXAzJyxcclxuICAgICAgc3VjY2VzczogJ2FwcC9zdWNjZXNzLm1wMycsXHJcbiAgICAgIGZhaWx1cmU6ICdhcHAvZmFpbHVyZS5tcDMnLFxyXG4gICAgfTtcclxuXHJcbiAgICBjb25zdCBhdWRpb0VsZW1lbnQgPSBuZXcgQXVkaW8oYC4uL2Fzc2V0cy9hdWRpby8ke3NvdW5kc0xpYnJhcnlbc291bmROYW1lXX1gKTtcclxuICAgIGF1ZGlvRWxlbWVudC5wbGF5KCk7XHJcbiAgICByZXR1cm4gdGhpcztcclxuICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IEFwcENvbnRyb2w7XHJcbiIsIi8qIGVzbGludC1kaXNhYmxlIGxpbmVicmVhay1zdHlsZSAqL1xyXG5pbXBvcnQgeyBjcmVhdGVDdXN0b21FbGVtZW50IH0gZnJvbSAnLi9jb21tb25GdW5jdCc7XHJcblxyXG5jbGFzcyBDYXJkIHtcclxuICBjb25zdHJ1Y3RvcihhcHBDdHJsT2JqLCBjYXJkT2JqLCB0eXBlID0gJ21haW4gcGFnZScpIHtcclxuICAgIHRoaXMuYXBwQ3RybE9iaiA9IGFwcEN0cmxPYmo7XHJcbiAgICB0aGlzLnR5cGUgPSB0eXBlO1xyXG4gICAgdGhpcy52YWxpZFR5cGVzID0gWydtYWluIHBhZ2UnLCAndG9waWMnXTtcclxuICAgIHRoaXMuZWxlbWVudCA9IG51bGw7XHJcbiAgICB0aGlzLmJ1aWxkKGNhcmRPYmopO1xyXG4gIH1cclxuXHJcbiAgYnVpbGQoY2FyZE9iaikge1xyXG4gICAgbGV0IHRlbXBsYXRlO1xyXG4gICAgbGV0IGNsYXNzTmFtZXMgPSAnY2FyZCBidXR0b24nO1xyXG4gICAgc3dpdGNoICh0aGlzLnR5cGUpIHtcclxuICAgICAgY2FzZSAnbWFpbiBwYWdlJzpcclxuICAgICAgICB0ZW1wbGF0ZSA9IGBcclxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiY2FyZC1jb250ZW50XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJncmFwaGljIGNhcmQtZ3JhcGhpY1wiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGltZyBjbGFzcz1cImNhcmQtaW1hZ2VcIiBzcmM9XCIuLi9hc3NldHMvJHtjYXJkT2JqLmltYWdlfVwiIGFsdD1cIlNlY3Rpb24gJHtjYXJkT2JqLmNhcmROYW1lfVwiIHdpZHRoPVwiMzkwXCIgaGVpZ2h0PVwiMjYwXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8cCBjbGFzcz1cImNhcmQtdGV4dFwiPiR7Y2FyZE9iai5jYXJkTmFtZX08L3A+XHJcbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgIGA7XHJcbiAgICAgICAgY2xhc3NOYW1lcyArPSAnIGNhcmQtbWFpbi1wYWdlJztcclxuICAgICAgICBicmVhaztcclxuICAgICAgY2FzZSAndG9waWMnOlxyXG4gICAgICAgIGlmICh0aGlzLmFwcEN0cmxPYmouYWN0aXZlTW9kZSA9PT0gJ3RyYWluJykge1xyXG4gICAgICAgICAgdGVtcGxhdGUgPSBgXHJcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImNhcmQtY29udGVudFwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiZ3JhcGhpYyBjYXJkLWdyYXBoaWNcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxpbWcgY2xhc3M9XCJjYXJkLWltYWdlXCIgc3JjPVwiLi4vYXNzZXRzLyR7Y2FyZE9iai5pbWFnZX1cIiBhbHQ9XCIke2NhcmRPYmoud29yZH1cIiB3aWR0aD1cIjM5MFwiIGhlaWdodD1cIjI2MFwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPHAgY2xhc3M9XCJjYXJkLXRleHRcIj4ke2NhcmRPYmoud29yZH08L3A+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJidXR0b24gY2FyZC1mbGlwLWJ1dHRvblwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJtYXRlcmlhbC1zeW1ib2xzLW91dGxpbmVkXCI+ZmxpcF9jYW1lcmFfYW5kcm9pZDwvc3Bhbj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgYDtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgdGVtcGxhdGUgPSBgXHJcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImNhcmQtY29udGVudFwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiZ3JhcGhpYyBjYXJkLWdyYXBoaWNcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxpbWcgY2xhc3M9XCJjYXJkLWltYWdlXCIgc3JjPVwiLi4vYXNzZXRzLyR7Y2FyZE9iai5pbWFnZX1cIiBhbHQ9XCIke2NhcmRPYmoud29yZH1cIiB3aWR0aD1cIjM5MFwiIGhlaWdodD1cIjI2MFwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICBgO1xyXG4gICAgICAgICAgY2xhc3NOYW1lcyArPSAnIGdhbWUtY2FyZCc7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNsYXNzTmFtZXMgKz0gJyBjYXJkLXRvcGljJztcclxuICAgICAgICBicmVhaztcclxuICAgICAgZGVmYXVsdDpcclxuICAgICAgICBicmVhaztcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLmVsZW1lbnQgPSBjcmVhdGVDdXN0b21FbGVtZW50KCdkaXYnLCBjbGFzc05hbWVzLCB0ZW1wbGF0ZSk7XHJcbiAgICByZXR1cm4gdGhpcztcclxuICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IENhcmQ7XHJcbiIsIi8qIGVzbGludC1kaXNhYmxlIGxpbmVicmVhay1zdHlsZSAqL1xyXG5jb25zdCBjYXJkcyA9IFtcclxuICBbJ0FjdGlvbiAoc2V0IEEpJywgJ0FjdGlvbiAoc2V0IEIpJywgJ0FuaW1hbCAoc2V0IEEpJywgJ0FuaW1hbCAoc2V0IEIpJywgJ0Nsb3RoZXMnLCAnRW1vdGlvbnMnXSxcclxuICBbXHJcbiAgICB7XHJcbiAgICAgIHdvcmQ6ICdjcnknLFxyXG4gICAgICB0cmFuc2xhdGlvbjogJ9C/0LvQsNC60LDRgtGMJyxcclxuICAgICAgaW1hZ2U6ICdpbWcvY3J5LmpwZycsXHJcbiAgICAgIGF1ZGlvU3JjOiAnYXVkaW8vY3J5Lm1wMycsXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICB3b3JkOiAnZGFuY2UnLFxyXG4gICAgICB0cmFuc2xhdGlvbjogJ9GC0LDQvdGG0LXQstCw0YLRjCcsXHJcbiAgICAgIGltYWdlOiAnaW1nL2RhbmNlLmpwZycsXHJcbiAgICAgIGF1ZGlvU3JjOiAnYXVkaW8vZGFuY2UubXAzJyxcclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgIHdvcmQ6ICdkaXZlJyxcclxuICAgICAgdHJhbnNsYXRpb246ICfQvdGL0YDRj9GC0YwnLFxyXG4gICAgICBpbWFnZTogJ2ltZy9kaXZlLmpwZycsXHJcbiAgICAgIGF1ZGlvU3JjOiAnYXVkaW8vZGl2ZS5tcDMnLFxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgd29yZDogJ2RyYXcnLFxyXG4gICAgICB0cmFuc2xhdGlvbjogJ9GA0LjRgdC+0LLQsNGC0YwnLFxyXG4gICAgICBpbWFnZTogJ2ltZy9kcmF3LmpwZycsXHJcbiAgICAgIGF1ZGlvU3JjOiAnYXVkaW8vZHJhdy5tcDMnLFxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgd29yZDogJ2Zpc2gnLFxyXG4gICAgICB0cmFuc2xhdGlvbjogJ9C70L7QstC40YLRjCDRgNGL0LHRgycsXHJcbiAgICAgIGltYWdlOiAnaW1nL2Zpc2guanBnJyxcclxuICAgICAgYXVkaW9TcmM6ICdhdWRpby9maXNoLm1wMycsXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICB3b3JkOiAnZmx5JyxcclxuICAgICAgdHJhbnNsYXRpb246ICfQu9C10YLQsNGC0YwnLFxyXG4gICAgICBpbWFnZTogJ2ltZy9mbHkuanBnJyxcclxuICAgICAgYXVkaW9TcmM6ICdhdWRpby9mbHkubXAzJyxcclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgIHdvcmQ6ICdodWcnLFxyXG4gICAgICB0cmFuc2xhdGlvbjogJ9C+0LHQvdC40LzQsNGC0YwnLFxyXG4gICAgICBpbWFnZTogJ2ltZy9odWcuanBnJyxcclxuICAgICAgYXVkaW9TcmM6ICdhdWRpby9odWcubXAzJyxcclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgIHdvcmQ6ICdqdW1wJyxcclxuICAgICAgdHJhbnNsYXRpb246ICfQv9GA0YvQs9Cw0YLRjCcsXHJcbiAgICAgIGltYWdlOiAnaW1nL2p1bXAuanBnJyxcclxuICAgICAgYXVkaW9TcmM6ICdhdWRpby9qdW1wLm1wMycsXHJcbiAgICB9LFxyXG4gIF0sXHJcbiAgW1xyXG4gICAge1xyXG4gICAgICB3b3JkOiAnb3BlbicsXHJcbiAgICAgIHRyYW5zbGF0aW9uOiAn0L7RgtC60YDRi9Cy0LDRgtGMJyxcclxuICAgICAgaW1hZ2U6ICdpbWcvb3Blbi5qcGcnLFxyXG4gICAgICBhdWRpb1NyYzogJ2F1ZGlvL29wZW4ubXAzJyxcclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgIHdvcmQ6ICdwbGF5JyxcclxuICAgICAgdHJhbnNsYXRpb246ICfQuNCz0YDQsNGC0YwnLFxyXG4gICAgICBpbWFnZTogJ2ltZy9wbGF5LmpwZycsXHJcbiAgICAgIGF1ZGlvU3JjOiAnYXVkaW8vcGxheS5tcDMnLFxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgd29yZDogJ3BvaW50JyxcclxuICAgICAgdHJhbnNsYXRpb246ICfRg9C60LDQt9GL0LLQsNGC0YwnLFxyXG4gICAgICBpbWFnZTogJ2ltZy9wb2ludC5qcGcnLFxyXG4gICAgICBhdWRpb1NyYzogJ2F1ZGlvL3BvaW50Lm1wMycsXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICB3b3JkOiAncmlkZScsXHJcbiAgICAgIHRyYW5zbGF0aW9uOiAn0LXQt9C00LjRgtGMJyxcclxuICAgICAgaW1hZ2U6ICdpbWcvcmlkZS5qcGcnLFxyXG4gICAgICBhdWRpb1NyYzogJ2F1ZGlvL3JpZGUubXAzJyxcclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgIHdvcmQ6ICdydW4nLFxyXG4gICAgICB0cmFuc2xhdGlvbjogJ9Cx0LXQs9Cw0YLRjCcsXHJcbiAgICAgIGltYWdlOiAnaW1nL3J1bi5qcGcnLFxyXG4gICAgICBhdWRpb1NyYzogJ2F1ZGlvL3J1bi5tcDMnLFxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgd29yZDogJ3NpbmcnLFxyXG4gICAgICB0cmFuc2xhdGlvbjogJ9C/0LXRgtGMJyxcclxuICAgICAgaW1hZ2U6ICdpbWcvc2luZy5qcGcnLFxyXG4gICAgICBhdWRpb1NyYzogJ2F1ZGlvL3NpbmcubXAzJyxcclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgIHdvcmQ6ICdza2lwJyxcclxuICAgICAgdHJhbnNsYXRpb246ICfQv9GA0L7Qv9GD0YHQutCw0YLRjCwg0L/RgNGL0LPQsNGC0YwnLFxyXG4gICAgICBpbWFnZTogJ2ltZy9za2lwLmpwZycsXHJcbiAgICAgIGF1ZGlvU3JjOiAnYXVkaW8vc2tpcC5tcDMnLFxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgd29yZDogJ3N3aW0nLFxyXG4gICAgICB0cmFuc2xhdGlvbjogJ9C/0LvQsNCy0LDRgtGMJyxcclxuICAgICAgaW1hZ2U6ICdpbWcvc3dpbS5qcGcnLFxyXG4gICAgICBhdWRpb1NyYzogJ2F1ZGlvL3N3aW0ubXAzJyxcclxuICAgIH0sXHJcbiAgXSxcclxuICBbXHJcbiAgICB7XHJcbiAgICAgIHdvcmQ6ICdjYXQnLFxyXG4gICAgICB0cmFuc2xhdGlvbjogJ9C60L7RgicsXHJcbiAgICAgIGltYWdlOiAnaW1nL2NhdC5qcGcnLFxyXG4gICAgICBhdWRpb1NyYzogJ2F1ZGlvL2NhdC5tcDMnLFxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgd29yZDogJ2NoaWNrJyxcclxuICAgICAgdHJhbnNsYXRpb246ICfRhtGL0L/Qu9GR0L3QvtC6JyxcclxuICAgICAgaW1hZ2U6ICdpbWcvY2hpY2suanBnJyxcclxuICAgICAgYXVkaW9TcmM6ICdhdWRpby9jaGljay5tcDMnLFxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgd29yZDogJ2NoaWNrZW4nLFxyXG4gICAgICB0cmFuc2xhdGlvbjogJ9C60YPRgNC40YbQsCcsXHJcbiAgICAgIGltYWdlOiAnaW1nL2NoaWNrZW4uanBnJyxcclxuICAgICAgYXVkaW9TcmM6ICdhdWRpby9jaGlja2VuLm1wMycsXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICB3b3JkOiAnZG9nJyxcclxuICAgICAgdHJhbnNsYXRpb246ICfRgdC+0LHQsNC60LAnLFxyXG4gICAgICBpbWFnZTogJ2ltZy9kb2cuanBnJyxcclxuICAgICAgYXVkaW9TcmM6ICdhdWRpby9kb2cubXAzJyxcclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgIHdvcmQ6ICdob3JzZScsXHJcbiAgICAgIHRyYW5zbGF0aW9uOiAn0LvQvtGI0LDQtNGMJyxcclxuICAgICAgaW1hZ2U6ICdpbWcvaG9yc2UuanBnJyxcclxuICAgICAgYXVkaW9TcmM6ICdhdWRpby9ob3JzZS5tcDMnLFxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgd29yZDogJ3BpZycsXHJcbiAgICAgIHRyYW5zbGF0aW9uOiAn0YHQstC40L3RjNGPJyxcclxuICAgICAgaW1hZ2U6ICdpbWcvcGlnLmpwZycsXHJcbiAgICAgIGF1ZGlvU3JjOiAnYXVkaW8vcGlnLm1wMycsXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICB3b3JkOiAncmFiYml0JyxcclxuICAgICAgdHJhbnNsYXRpb246ICfQutGA0L7Qu9C40LonLFxyXG4gICAgICBpbWFnZTogJ2ltZy9yYWJiaXQuanBnJyxcclxuICAgICAgYXVkaW9TcmM6ICdhdWRpby9yYWJiaXQubXAzJyxcclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgIHdvcmQ6ICdzaGVlcCcsXHJcbiAgICAgIHRyYW5zbGF0aW9uOiAn0L7QstGG0LAnLFxyXG4gICAgICBpbWFnZTogJ2ltZy9zaGVlcC5qcGcnLFxyXG4gICAgICBhdWRpb1NyYzogJ2F1ZGlvL3NoZWVwLm1wMycsXHJcbiAgICB9LFxyXG4gIF0sXHJcbiAgW1xyXG4gICAge1xyXG4gICAgICB3b3JkOiAnYmlyZCcsXHJcbiAgICAgIHRyYW5zbGF0aW9uOiAn0L/RgtC40YbQsCcsXHJcbiAgICAgIGltYWdlOiAnaW1nL2JpcmQuanBnJyxcclxuICAgICAgYXVkaW9TcmM6ICdhdWRpby9iaXJkLm1wMycsXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICB3b3JkOiAnZmlzaCcsXHJcbiAgICAgIHRyYW5zbGF0aW9uOiAn0YDRi9Cx0LAnLFxyXG4gICAgICBpbWFnZTogJ2ltZy9maXNoMS5qcGcnLFxyXG4gICAgICBhdWRpb1NyYzogJ2F1ZGlvL2Zpc2gubXAzJyxcclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgIHdvcmQ6ICdmcm9nJyxcclxuICAgICAgdHJhbnNsYXRpb246ICfQttCw0LHQsCcsXHJcbiAgICAgIGltYWdlOiAnaW1nL2Zyb2cuanBnJyxcclxuICAgICAgYXVkaW9TcmM6ICdhdWRpby9mcm9nLm1wMycsXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICB3b3JkOiAnZ2lyYWZmZScsXHJcbiAgICAgIHRyYW5zbGF0aW9uOiAn0LbQuNGA0LDRhNCwJyxcclxuICAgICAgaW1hZ2U6ICdpbWcvZ2lyYWZmZS5qcGcnLFxyXG4gICAgICBhdWRpb1NyYzogJ2F1ZGlvL2dpcmFmZmUubXAzJyxcclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgIHdvcmQ6ICdsaW9uJyxcclxuICAgICAgdHJhbnNsYXRpb246ICfQu9C10LInLFxyXG4gICAgICBpbWFnZTogJ2ltZy9saW9uLmpwZycsXHJcbiAgICAgIGF1ZGlvU3JjOiAnYXVkaW8vbGlvbi5tcDMnLFxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgd29yZDogJ21vdXNlJyxcclxuICAgICAgdHJhbnNsYXRpb246ICfQvNGL0YjRjCcsXHJcbiAgICAgIGltYWdlOiAnaW1nL21vdXNlLmpwZycsXHJcbiAgICAgIGF1ZGlvU3JjOiAnYXVkaW8vbW91c2UubXAzJyxcclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgIHdvcmQ6ICd0dXJ0bGUnLFxyXG4gICAgICB0cmFuc2xhdGlvbjogJ9GH0LXRgNC10L/QsNGF0LAnLFxyXG4gICAgICBpbWFnZTogJ2ltZy90dXJ0bGUuanBnJyxcclxuICAgICAgYXVkaW9TcmM6ICdhdWRpby90dXJ0bGUubXAzJyxcclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgIHdvcmQ6ICdkb2xwaGluJyxcclxuICAgICAgdHJhbnNsYXRpb246ICfQtNC10LvRjNGE0LjQvScsXHJcbiAgICAgIGltYWdlOiAnaW1nL2RvbHBoaW4uanBnJyxcclxuICAgICAgYXVkaW9TcmM6ICdhdWRpby9kb2xwaGluLm1wMycsXHJcbiAgICB9LFxyXG4gIF0sXHJcbiAgW1xyXG4gICAge1xyXG4gICAgICB3b3JkOiAnc2tpcnQnLFxyXG4gICAgICB0cmFuc2xhdGlvbjogJ9GO0LHQutCwJyxcclxuICAgICAgaW1hZ2U6ICdpbWcvc2tpcnQuanBnJyxcclxuICAgICAgYXVkaW9TcmM6ICdhdWRpby9za2lydC5tcDMnLFxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgd29yZDogJ3BhbnRzJyxcclxuICAgICAgdHJhbnNsYXRpb246ICfQsdGA0Y7QutC4JyxcclxuICAgICAgaW1hZ2U6ICdpbWcvcGFudHMuanBnJyxcclxuICAgICAgYXVkaW9TcmM6ICdhdWRpby9wYW50cy5tcDMnLFxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgd29yZDogJ2Jsb3VzZScsXHJcbiAgICAgIHRyYW5zbGF0aW9uOiAn0LHQu9GD0LfQutCwJyxcclxuICAgICAgaW1hZ2U6ICdpbWcvYmxvdXNlLmpwZycsXHJcbiAgICAgIGF1ZGlvU3JjOiAnYXVkaW8vYmxvdXNlLm1wMycsXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICB3b3JkOiAnZHJlc3MnLFxyXG4gICAgICB0cmFuc2xhdGlvbjogJ9C/0LvQsNGC0YzQtScsXHJcbiAgICAgIGltYWdlOiAnaW1nL2RyZXNzLmpwZycsXHJcbiAgICAgIGF1ZGlvU3JjOiAnYXVkaW8vZHJlc3MubXAzJyxcclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgIHdvcmQ6ICdib290JyxcclxuICAgICAgdHJhbnNsYXRpb246ICfQsdC+0YLQuNC90L7QuicsXHJcbiAgICAgIGltYWdlOiAnaW1nL2Jvb3QuanBnJyxcclxuICAgICAgYXVkaW9TcmM6ICdhdWRpby9ib290Lm1wMycsXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICB3b3JkOiAnc2hpcnQnLFxyXG4gICAgICB0cmFuc2xhdGlvbjogJ9GA0YPQsdCw0YjQutCwJyxcclxuICAgICAgaW1hZ2U6ICdpbWcvc2hpcnQuanBnJyxcclxuICAgICAgYXVkaW9TcmM6ICdhdWRpby9zaGlydC5tcDMnLFxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgd29yZDogJ2NvYXQnLFxyXG4gICAgICB0cmFuc2xhdGlvbjogJ9C/0LDQu9GM0YLQvicsXHJcbiAgICAgIGltYWdlOiAnaW1nL2NvYXQuanBnJyxcclxuICAgICAgYXVkaW9TcmM6ICdhdWRpby9jb2F0Lm1wMycsXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICB3b3JkOiAnc2hvZScsXHJcbiAgICAgIHRyYW5zbGF0aW9uOiAn0YLRg9GE0LvQuCcsXHJcbiAgICAgIGltYWdlOiAnaW1nL3Nob2UuanBnJyxcclxuICAgICAgYXVkaW9TcmM6ICdhdWRpby9zaG9lLm1wMycsXHJcbiAgICB9LFxyXG4gIF0sXHJcbiAgW1xyXG4gICAge1xyXG4gICAgICB3b3JkOiAnc2FkJyxcclxuICAgICAgdHJhbnNsYXRpb246ICfQs9GA0YPRgdGC0L3Ri9C5JyxcclxuICAgICAgaW1hZ2U6ICdpbWcvc2FkLmpwZycsXHJcbiAgICAgIGF1ZGlvU3JjOiAnYXVkaW8vc2FkLm1wMycsXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICB3b3JkOiAnYW5ncnknLFxyXG4gICAgICB0cmFuc2xhdGlvbjogJ9GB0LXRgNC00LjRgtGL0LknLFxyXG4gICAgICBpbWFnZTogJ2ltZy9hbmdyeS5qcGcnLFxyXG4gICAgICBhdWRpb1NyYzogJ2F1ZGlvL2FuZ3J5Lm1wMycsXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICB3b3JkOiAnaGFwcHknLFxyXG4gICAgICB0cmFuc2xhdGlvbjogJ9GB0YfQsNGB0YLQu9C40LLRi9C5JyxcclxuICAgICAgaW1hZ2U6ICdpbWcvaGFwcHkuanBnJyxcclxuICAgICAgYXVkaW9TcmM6ICdhdWRpby9oYXBweS5tcDMnLFxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgd29yZDogJ3RpcmVkJyxcclxuICAgICAgdHJhbnNsYXRpb246ICfRg9GB0YLQsNCy0YjQuNC5JyxcclxuICAgICAgaW1hZ2U6ICdpbWcvdGlyZWQuanBnJyxcclxuICAgICAgYXVkaW9TcmM6ICdhdWRpby90aXJlZC5tcDMnLFxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgd29yZDogJ3N1cnByaXNlZCcsXHJcbiAgICAgIHRyYW5zbGF0aW9uOiAn0YPQtNC40LLQu9GR0L3QvdGL0LknLFxyXG4gICAgICBpbWFnZTogJ2ltZy9zdXJwcmlzZWQuanBnJyxcclxuICAgICAgYXVkaW9TcmM6ICdhdWRpby9zdXJwcmlzZWQubXAzJyxcclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgIHdvcmQ6ICdzY2FyZWQnLFxyXG4gICAgICB0cmFuc2xhdGlvbjogJ9C40YHQv9GD0LPQsNC90L3Ri9C5JyxcclxuICAgICAgaW1hZ2U6ICdpbWcvc2NhcmVkLmpwZycsXHJcbiAgICAgIGF1ZGlvU3JjOiAnYXVkaW8vc2NhcmVkLm1wMycsXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICB3b3JkOiAnc21pbGUnLFxyXG4gICAgICB0cmFuc2xhdGlvbjogJ9GD0LvRi9Cx0LrQsCcsXHJcbiAgICAgIGltYWdlOiAnaW1nL3NtaWxlLmpwZycsXHJcbiAgICAgIGF1ZGlvU3JjOiAnYXVkaW8vc21pbGUubXAzJyxcclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgIHdvcmQ6ICdsYXVnaCcsXHJcbiAgICAgIHRyYW5zbGF0aW9uOiAn0YHQvNC10YUnLFxyXG4gICAgICBpbWFnZTogJ2ltZy9sYXVnaC5qcGcnLFxyXG4gICAgICBhdWRpb1NyYzogJ2F1ZGlvL2xhdWdoLm1wMycsXHJcbiAgICB9LFxyXG4gIF0sXHJcbl07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjYXJkcztcclxuIiwiLyogZXNsaW50LWRpc2FibGUgbGluZWJyZWFrLXN0eWxlICovXHJcbi8qIGVzbGludC1kaXNhYmxlIHByZWZlci1kZXN0cnVjdHVyaW5nICovXHJcbi8qIGVzbGludC1kaXNhYmxlIG5vLXVudXNlZC12YXJzICovXHJcbi8qIGVzbGludC1kaXNhYmxlIG5vLWNvbnNvbGUgKi9cclxuLyogZXNsaW50LWRpc2FibGUgbm8tdW5kZWYgKi9cclxuXHJcbmZ1bmN0aW9uIGNsaWNrVXNlckludGVyYWN0aXZlKGV2ZW50LCBhcHBDdHJsT2JqKSB7XHJcbiAgY29uc3QgYXBwQ29udHJvbCA9IGFwcEN0cmxPYmo7XHJcbiAgY29uc3QgbWVudSA9IGFwcENvbnRyb2wubWVudTtcclxuICBjb25zdCBnYW1lQ29udHJvbCA9IGFwcENvbnRyb2wuZ2FtZUNvbnRyb2w7XHJcbiAgY29uc3Qgc3dpdGNoT2JqID0gYXBwQ29udHJvbC5zd2l0Y2hPYmo7XHJcbiAgY29uc3QgY29udGVudCA9IGFwcENvbnRyb2wuY29udGVudDtcclxuICBjb25zdCB0YXJnZXRDbGFzc0xpc3QgPSBBcnJheS5mcm9tKGV2ZW50LnRhcmdldC5jbGFzc0xpc3QpO1xyXG4gIGNvbnN0IGlzR2FtZU1vZGUgPSAoYXBwQ29udHJvbC5hY3RpdmVNb2RlID09PSAncGxheScpO1xyXG4gIGxldCBjYXJkRWxlbWVudDtcclxuICBsZXQgYWN0aXZlTWVudUVsZW1lbnQ7XHJcblxyXG4gIHN3aXRjaCAodHJ1ZSkge1xyXG4gICAgLy8gIGNsaWNraW5nIG9uIG1lbnUgYnVyZ2VyIGJ1dHRvblxyXG4gICAgY2FzZSAodGFyZ2V0Q2xhc3NMaXN0LmluY2x1ZGVzKCdtZW51LWJ1dHRvbicpKTpcclxuICAgICAgbWVudS50b2dnbGUoKTtcclxuICAgICAgYnJlYWs7XHJcblxyXG4gICAgLy8gIGNsaWNraW5nIGFueXdoZXJlIGVsc2Ugd2hlbiBidXJnZXIgbWVudSBvcGVuZWRcclxuICAgIGNhc2UgKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2JvZHknKS5jbGFzc0xpc3QuY29udGFpbnMoJ29wZW5lZC1tZW51JykgJiYgIXRhcmdldENsYXNzTGlzdC5pbmNsdWRlcygnbWVudScpKTpcclxuICAgICAgbWVudS5jbG9zZSgpO1xyXG4gICAgICBpZiAodGFyZ2V0Q2xhc3NMaXN0LmluY2x1ZGVzKCdtZW51LWl0ZW0nKSkge1xyXG4gICAgICAgIGFjdGl2ZU1lbnVFbGVtZW50ID0gZXZlbnQudGFyZ2V0O1xyXG4gICAgICAgIGFwcENvbnRyb2wuY2hhbmdlUGFnZShhY3RpdmVNZW51RWxlbWVudC5pbm5lckhUTUwpO1xyXG4gICAgICAgIGFwcENvbnRyb2wuc3dpdGNoT2JqLmVuYWJsZSgpO1xyXG4gICAgICB9XHJcbiAgICAgIGJyZWFrO1xyXG5cclxuICAgIC8vICBjbGlja2luZyBvbiBzd2l0Y2ggYnV0dG9uXHJcbiAgICBjYXNlICh0YXJnZXRDbGFzc0xpc3QuaW5jbHVkZXMoJ3N3aXRjaC10cmlnZ2VyJylcclxuICAgICAgICAgICYmICFzd2l0Y2hPYmouZWxlbWVudC5jbGFzc0xpc3QuY29udGFpbnMoJ2Rpc2FibGVkJykpOiB7XHJcbiAgICAgIHN3aXRjaE9iai50b2dnbGUoKTtcclxuICAgICAgYXBwQ29udHJvbC5jaGFuZ2VQYWdlKGFwcENvbnRyb2wuYWN0aXZlUGFnZSk7XHJcbiAgICAgIGJyZWFrO1xyXG4gICAgfVxyXG5cclxuICAgIC8vICBjbGlja2luZyBvbiBzdGFydCBnYW1lIGJ1dHRvblxyXG4gICAgY2FzZSAodGFyZ2V0Q2xhc3NMaXN0LmluY2x1ZGVzKCdzdGFydC1idXR0b24nKSk6IHtcclxuICAgICAgZ2FtZUNvbnRyb2wuc3RhcnRHYW1lKGFwcENvbnRyb2wuYWN0aXZlQXJyQ2FyZHNPYmopO1xyXG4gICAgICBicmVhaztcclxuICAgIH1cclxuXHJcbiAgICAvLyAgY2xpY2tpbmcgb24gc3RhcnQgZ2FtZSBidXR0b25cclxuICAgIGNhc2UgKHRhcmdldENsYXNzTGlzdC5pbmNsdWRlcygncmVwZWF0LWJ1dHRvbicpKToge1xyXG4gICAgICBnYW1lQ29udHJvbC5yZXBlYXRRdWVzdGlvbigpO1xyXG4gICAgICBicmVhaztcclxuICAgIH1cclxuXHJcbiAgICAvLyAgY2xpY2tpbmcgb24gY2FyZCBmbGlwIGJ1dHRvblxyXG4gICAgY2FzZSAoZXZlbnQudGFyZ2V0LnBhcmVudEVsZW1lbnQuY2xhc3NMaXN0LmNvbnRhaW5zKCdjYXJkLWZsaXAtYnV0dG9uJykpOlxyXG4gICAgICBjYXJkRWxlbWVudCA9IGNvbnRlbnQuZ2V0Q2FyZEVsZW1lbnRCeVRhcmdldChldmVudC50YXJnZXQpO1xyXG4gICAgICBjb250ZW50LmZsaXBDYXJkKGNhcmRFbGVtZW50KTtcclxuICAgICAgYnJlYWs7XHJcblxyXG4gICAgLy8gIGNsaWNraW5nIG9uIGNhcmRcclxuICAgIGNhc2UgKHRhcmdldENsYXNzTGlzdC5zb21lKChjbGFzc05hbWUpID0+IGNvbnRlbnQudmFsaWRDYXJkQ2xhc3Nlcy5pbmNsdWRlcyhjbGFzc05hbWUpKSk6IHtcclxuICAgICAgbGV0IGNhcmRPYmo7XHJcbiAgICAgIGNhcmRFbGVtZW50ID0gY29udGVudC5nZXRDYXJkRWxlbWVudEJ5VGFyZ2V0KGV2ZW50LnRhcmdldCk7XHJcblxyXG4gICAgICBpZiAoIWNhcmRFbGVtZW50LmNsYXNzTGlzdC5jb250YWlucygnY2FyZC1tYWluLXBhZ2UnKSkge1xyXG4gICAgICAgIGNvbnN0IGNhcmRJbWFnZU5hbWUgPSBjb250ZW50LmdldENhcmRJbWFnZU5hbWUoY2FyZEVsZW1lbnQpO1xyXG4gICAgICAgIGNhcmRPYmogPSBjb250ZW50LmdldENhcmRPYmpCeUltYWdlTmFtZShjYXJkSW1hZ2VOYW1lKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgaWYgKGlzR2FtZU1vZGUgJiYgZ2FtZUNvbnRyb2wuaXNHYW1lU3RhcnRlZCAmJiAhY2FyZEVsZW1lbnQuY2xhc3NMaXN0LmNvbnRhaW5zKCdkaXNhYmxlZCcpKSB7XHJcbiAgICAgICAgZ2FtZUNvbnRyb2wucHJvY2Vzc0Fuc3dlcihjYXJkT2JqLCBjYXJkRWxlbWVudCk7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIH0gZWxzZSBpZiAoY2FyZEVsZW1lbnQuY2xhc3NMaXN0LmNvbnRhaW5zKCdjYXJkLW1haW4tcGFnZScpKSB7XHJcbiAgICAgICAgY29uc3QgcGFnZU5hbWUgPSBjb250ZW50LmdldENhcmRJbm5lclRleHQoY2FyZEVsZW1lbnQpO1xyXG4gICAgICAgIGFjdGl2ZU1lbnVFbGVtZW50ID0gbWVudS5nZXRNZW51SXRlbUJ5TmFtZShwYWdlTmFtZSk7XHJcbiAgICAgICAgYXBwQ29udHJvbC5jaGFuZ2VQYWdlKHBhZ2VOYW1lKTtcclxuICAgICAgfSBlbHNlIGlmICghY2FyZEVsZW1lbnQuY2xhc3NMaXN0LmNvbnRhaW5zKCdmbGlwcGVkJykgJiYgIWNhcmRFbGVtZW50LmNsYXNzTGlzdC5jb250YWlucygnZ2FtZS1jYXJkJykpIHtcclxuICAgICAgICBhcHBDb250cm9sLnBsYXlDYXJkU291bmQoY2FyZE9iaik7XHJcbiAgICAgICAgYXBwQ29udHJvbC5zdGF0LnN0b3JhZ2UuYWRkKCdjbGljaycsIGNhcmRPYmopO1xyXG4gICAgICB9XHJcbiAgICAgIGJyZWFrO1xyXG4gICAgfVxyXG5cclxuICAgIC8vICBjbGlja2luZyBvbiB0YWJsZSBoZWFkZXJcclxuICAgIGNhc2UgKHRhcmdldENsYXNzTGlzdC5pbmNsdWRlcygnc29ydGFibGUnKSk6XHJcbiAgICAgIGFwcENvbnRyb2wuc3RhdC5zb3J0VGFibGUoZXZlbnQudGFyZ2V0KTtcclxuICAgICAgY29udGVudC5jaGFuZ2VDb250ZW50KCdzdGF0aXN0aWMnKTtcclxuICAgICAgYnJlYWs7XHJcblxyXG4gICAgLy8gIGNsaWNraW5nIG9uIHJlc2V0IGJ1dHRvblxyXG4gICAgY2FzZSAodGFyZ2V0Q2xhc3NMaXN0LmluY2x1ZGVzKCdyZXNldC1zdGF0JykpOlxyXG4gICAgICBhcHBDb250cm9sLnN0YXQuc3RvcmFnZS5jbGVhblN0b3JhZ2UoKTtcclxuICAgICAgaWYgKGFwcENvbnRyb2wuY29udGVudC50eXBlID09PSAnc3RhdGlzdGljJykge1xyXG4gICAgICAgIGNvbnRlbnQuY2hhbmdlQ29udGVudCgnc3RhdGlzdGljJyk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgY29udGVudC5jaGFuZ2VDb250ZW50KCd0cmFpbiBkaWZmJyk7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGJyZWFrO1xyXG5cclxuICAgIC8vICBjbGlja2luZyBvbiB0cmFpbiBkaWZmLiB3b3JkcyBidXR0b25cclxuICAgIGNhc2UgKHRhcmdldENsYXNzTGlzdC5pbmNsdWRlcygndHJhaW4tZGlmZicpKTpcclxuICAgICAgc3dpdGNoT2JqLnRyYWluKCk7XHJcbiAgICAgIHN3aXRjaE9iai5kaXNhYmxlKCk7XHJcbiAgICAgIGFwcENvbnRyb2wuc3RhdC5zdG9yYWdlLmdldERpZmZXb3Jkc0FycigpO1xyXG4gICAgICBjb250ZW50LmNoYW5nZUNvbnRlbnQoJ3RyYWluIGRpZmYnKTtcclxuICAgICAgYnJlYWs7XHJcblxyXG4gICAgZGVmYXVsdDpcclxuICAgICAgYnJlYWs7XHJcbiAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGlja1VzZXJJbnRlcmFjdGl2ZTtcclxuIiwiLyogZXNsaW50LWRpc2FibGUgbGluZWJyZWFrLXN0eWxlICovXHJcbi8qIGVzbGludC1kaXNhYmxlIGltcG9ydC9wcmVmZXItZGVmYXVsdC1leHBvcnQgKi9cclxuLyogZXNsaW50LWRpc2FibGUgbm8tdW5kZWYgKi9cclxuXHJcbmZ1bmN0aW9uIGNyZWF0ZUN1c3RvbUVsZW1lbnQodHlwZSwgY2xhc3NOYW1lID0gJycsIGlubmVySFRNTCA9ICcnKSB7XHJcbiAgY29uc3QgZWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQodHlwZSk7XHJcbiAgZWxlbWVudC5jbGFzc05hbWUgPSBjbGFzc05hbWU7XHJcbiAgZWxlbWVudC5pbm5lckhUTUwgPSBpbm5lckhUTUw7XHJcbiAgcmV0dXJuIGVsZW1lbnQ7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGdldFJhbmRvbUludChtYXhJbnQsIG1pbkludCA9IDApIHtcclxuICAvLyAgbWF4IGFuZCBtaW4gaW5jbHVzaXZlXHJcbiAgcmV0dXJuIE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIChtYXhJbnQgLSBtaW5JbnQgKyAxKSkgKyBtaW5JbnQ7XHJcbn1cclxuXHJcbmV4cG9ydCB7IGNyZWF0ZUN1c3RvbUVsZW1lbnQsIGdldFJhbmRvbUludCB9O1xyXG4iLCIvKiBlc2xpbnQtZGlzYWJsZSBsaW5lYnJlYWstc3R5bGUgKi9cclxuLyogZXNsaW50LWRpc2FibGUgbm8tcmVzdHJpY3RlZC1zeW50YXggKi9cclxuLyogZXNsaW50LWRpc2FibGUgbGluZWJyZWFrLXN0eWxlICovXHJcbi8qIGVzbGludC1kaXNhYmxlIG5vLWNvbnNvbGUgKi9cclxuLyogZXNsaW50LWRpc2FibGUgbGluZWJyZWFrLXN0eWxlICovXHJcbi8qIGVzbGludC1kaXNhYmxlIGNsYXNzLW1ldGhvZHMtdXNlLXRoaXMgKi9cclxuLyogZXNsaW50LWRpc2FibGUgbm8tdW5kZWYgKi9cclxuXHJcbmltcG9ydCBDYXJkIGZyb20gJy4vY2FyZCc7XHJcbmltcG9ydCB7IGNyZWF0ZUN1c3RvbUVsZW1lbnQgfSBmcm9tICcuL2NvbW1vbkZ1bmN0JztcclxuXHJcbmNsYXNzIENvbnRlbnRDb250YWluZXIge1xyXG4gIGNvbnN0cnVjdG9yKGFwcEN0cmxPYmosIHR5cGUgPSAnbWFpbiBwYWdlJykge1xyXG4gICAgdGhpcy5hcHBDb250cm9sID0gYXBwQ3RybE9iajtcclxuICAgIHRoaXMudG9waWNzQXJyID0gYXBwQ3RybE9iai50b3BpY3NBcnI7XHJcbiAgICB0aGlzLmNhcmRzQXJyID0gYXBwQ3RybE9iai5jYXJkc0FycjtcclxuICAgIHRoaXMubWVudSA9IGFwcEN0cmxPYmoubWVudTtcclxuICAgIHRoaXMudmFsaWRUeXBlcyA9IFsnbWFpbiBwYWdlJywgJ3RvcGljJywgJ3N0YXRpc3RpYycsICd0cmFpbiBkaWZmJ107XHJcbiAgICB0aGlzLnZhbGlkQ2FyZENsYXNzZXMgPSBbJ2NhcmQnLCAnY2FyZC1jb250ZW50JywgJ2NhcmQtdGV4dCcsICdjYXJkLWdyYXBoaWMnLCAnY2FyZC1pbWFnZSddO1xyXG4gICAgdGhpcy50eXBlID0gdGhpcy5nZXRWYWxpZFR5cGUodHlwZSk7XHJcbiAgICB0aGlzLmNhcmRzQ29sbGVjdGlvbiA9IG51bGw7XHJcbiAgICB0aGlzLmdhbWVDYXRkc0NvbGxlY3Rpb24gPSBudWxsO1xyXG4gICAgdGhpcy5lbGVtZW50ID0gbnVsbDtcclxuXHJcbiAgICB0aGlzLmJ1aWxkKCk7XHJcbiAgfVxyXG5cclxuICBidWlsZCgpIHtcclxuICAgIGNvbnN0IGNvbnRlbnRXcmFwcGVyID0gY3JlYXRlQ3VzdG9tRWxlbWVudCgnZGl2JywgJ2NvbnRlbnQtd3JhcHBlcicpO1xyXG4gICAgbGV0IGNvbnRlbnRFbGVtZW50O1xyXG5cclxuICAgIHN3aXRjaCAodGhpcy50eXBlKSB7XHJcbiAgICAgIGNhc2UgJ3N0YXRpc3RpYyc6XHJcbiAgICAgICAgaWYgKCF0aGlzLmFwcENvbnRyb2wuc3RhdC5zb3J0ZWQpIHtcclxuICAgICAgICAgIHRoaXMuYXBwQ29udHJvbC5zdGF0LmJ1aWxkKCk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIHRoaXMuYXBwQ29udHJvbC5zdGF0LnNvcnRlZCA9IGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjb250ZW50RWxlbWVudCA9IHRoaXMuYXBwQ29udHJvbC5zdGF0LmVsZW1lbnQ7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIGNhc2UgJ3RyYWluIGRpZmYnOlxyXG4gICAgICAgIHRoaXMuYXBwQ29udHJvbC5zdGF0LmJ1aWxkKCk7XHJcbiAgICAgICAgY29udGVudEVsZW1lbnQgPSB0aGlzLmFwcENvbnRyb2wuc3RhdC5lbGVtZW50O1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBjYXNlICdtYWluIHBhZ2UnOlxyXG4gICAgICAgIGNvbnRlbnRFbGVtZW50ID0gdGhpcy5jcmVhdGVNYWluQ2FyZHNDb250YWluZXIoKTtcclxuICAgICAgICBicmVhaztcclxuICAgICAgY2FzZSAndG9waWMnOiB7XHJcbiAgICAgICAgY29udGVudEVsZW1lbnQgPSB0aGlzLmNyZWF0ZVRvcGljQ2FyZHNDb250YWluZXIoKTtcclxuICAgICAgICBicmVhaztcclxuICAgICAgfVxyXG4gICAgICBkZWZhdWx0OlxyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnRlbnRXcmFwcGVyLmFwcGVuZChjb250ZW50RWxlbWVudCk7XHJcbiAgICB0aGlzLmVsZW1lbnQgPSBjb250ZW50V3JhcHBlcjtcclxuXHJcbiAgICByZXR1cm4gdGhpcztcclxuICB9XHJcblxyXG4gIGNyZWF0ZU1haW5DYXJkc0NvbnRhaW5lcigpIHtcclxuICAgIGNvbnN0IG1haW5Db250YWluZXJFbGVtZW50ID0gY3JlYXRlQ3VzdG9tRWxlbWVudCgnZGl2JywgJ2NhcmQtY29udGFpbmVyJyk7XHJcbiAgICB0aGlzLnRvcGljc0Fyci5mb3JFYWNoKCh0b3BpYywgaW5kZXgpID0+IHtcclxuICAgICAgY29uc3QgY2FyZE9iaiA9IHtcclxuICAgICAgICBjYXJkTmFtZTogdG9waWMsXHJcbiAgICAgICAgaW1hZ2U6IHRoaXMuYXBwQ29udHJvbC5tYWluQ2FyZHNbaW5kZXhdLmltYWdlLFxyXG4gICAgICB9O1xyXG4gICAgICBtYWluQ29udGFpbmVyRWxlbWVudC5hcHBlbmQobmV3IENhcmQodGhpcy5hcHBDb250cm9sLCBjYXJkT2JqKS5lbGVtZW50KTtcclxuICAgIH0pO1xyXG5cclxuICAgIHJldHVybiBtYWluQ29udGFpbmVyRWxlbWVudDtcclxuICB9XHJcblxyXG4gIGNyZWF0ZVRvcGljQ2FyZHNDb250YWluZXIoKSB7XHJcbiAgICBjb25zdCBjYXJkc0NvbnRhaW5lckVsZW1lbnQgPSBjcmVhdGVDdXN0b21FbGVtZW50KCdkaXYnLCAnY2FyZC1jb250YWluZXInKTtcclxuICAgIGNvbnN0IGNhcmRJbmRleCA9IHRoaXMudG9waWNzQXJyLmZpbmRJbmRleCgoaXRlbSkgPT4ge1xyXG4gICAgICBjb25zdCByZXN1bHQgPSBpdGVtLnRvTG93ZXJDYXNlKCkgPT09IHRoaXMuYXBwQ29udHJvbC5hY3RpdmVQYWdlO1xyXG4gICAgICByZXR1cm4gcmVzdWx0O1xyXG4gICAgfSk7XHJcblxyXG4gICAgdGhpcy5jYXJkc0FycltjYXJkSW5kZXhdLmZvckVhY2goKGNhcmRPYmopID0+IHtcclxuICAgICAgY2FyZHNDb250YWluZXJFbGVtZW50LmFwcGVuZChuZXcgQ2FyZCh0aGlzLmFwcENvbnRyb2wsIGNhcmRPYmosIHRoaXMudHlwZSkuZWxlbWVudCk7XHJcbiAgICB9KTtcclxuXHJcbiAgICByZXR1cm4gY2FyZHNDb250YWluZXJFbGVtZW50O1xyXG4gIH1cclxuXHJcbiAgYWRkVG9Eb2MoKSB7XHJcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdtYWluJykuYXBwZW5kKHRoaXMuZWxlbWVudCk7XHJcbiAgICBbdGhpcy5lbGVtZW50XSA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ2NvbnRlbnQtd3JhcHBlcicpO1xyXG4gICAgdGhpcy5jYXJkc0NvbGxlY3Rpb24gPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdjYXJkJyk7XHJcbiAgICB0aGlzLmdhbWVDYXJkc0NvbGxlY3Rpb24gPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdnYW1lLWNhcmQnKTtcclxuICAgIHJldHVybiB0aGlzO1xyXG4gIH1cclxuXHJcbiAgY2xlYXIoKSB7XHJcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuY29udGVudC13cmFwcGVyJykucmVtb3ZlKCk7XHJcbiAgICByZXR1cm4gdGhpcztcclxuICB9XHJcblxyXG4gIGNoYW5nZUNvbnRlbnQobWVudVRvcGljTmFtZSkge1xyXG4gICAgdGhpcy50eXBlID0gdGhpcy5nZXRWYWxpZFRvcGljVHlwZShtZW51VG9waWNOYW1lKTtcclxuICAgIHRoaXMuYXBwQ29udHJvbC5nYW1lQ29udHJvbFxyXG4gICAgICAuZW5kR2FtZSgpO1xyXG5cclxuICAgIHRoaXNcclxuICAgICAgLmJ1aWxkKClcclxuICAgICAgLmNsZWFyKClcclxuICAgICAgLmFkZFRvRG9jKCk7XHJcbiAgICByZXR1cm4gdGhpcztcclxuICB9XHJcblxyXG4gIGlzRWxlbWVudEluQ2FyZChlbGVtZW50KSB7XHJcbiAgICByZXR1cm4gKHRoaXMudmFsaWRDYXJkQ2xhc3Nlcy5zb21lKChjbGFzc05hbWUpID0+IGVsZW1lbnQuY2xhc3NMaXN0LmNvbnRhaW5zKGNsYXNzTmFtZSkpKTtcclxuICB9XHJcblxyXG4gIGdldFZhbGlkVHlwZSh0eXBlKSB7XHJcbiAgICBpZiAodGhpcy52YWxpZFR5cGVzLmluY2x1ZGVzKHR5cGUpKSB7XHJcbiAgICAgIHJldHVybiB0eXBlO1xyXG4gICAgfVxyXG4gICAgdGhyb3cgbmV3IEVycm9yKCd3cm9uZyB0eXBlIG9mIE9iamVjdCcpO1xyXG4gIH1cclxuXHJcbiAgZ2V0VmFsaWRUb3BpY1R5cGUobWVudVRvcGljTmFtZSkge1xyXG4gICAgY29uc3QgY3VyZW50TWVudVRvcGljTmFtZSA9IG1lbnVUb3BpY05hbWUudG9Mb3dlckNhc2UoKTtcclxuICAgIGlmICh0aGlzLnZhbGlkVHlwZXMuaW5jbHVkZXMoY3VyZW50TWVudVRvcGljTmFtZSkpIHtcclxuICAgICAgcmV0dXJuIGN1cmVudE1lbnVUb3BpY05hbWU7XHJcbiAgICB9IGlmICh0aGlzLnRvcGljc0Fyci5tYXAoKGl0ZW0pID0+IGl0ZW0udG9Mb3dlckNhc2UoKSkuaW5jbHVkZXMoY3VyZW50TWVudVRvcGljTmFtZSkpIHtcclxuICAgICAgcmV0dXJuICd0b3BpYyc7XHJcbiAgICB9XHJcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ3dyb25nIG1lbnUgdG9waWMgTmFtZScpO1xyXG4gIH1cclxuXHJcbiAgZ2V0Q2FyZE9iakJ5V29yZCh3b3JkKSB7XHJcbiAgICByZXR1cm4gdGhpcy5jYXJkc0Fyci5mbGF0KCkuZmluZCgoY2FyZE9iaikgPT4gY2FyZE9iai53b3JkID09PSB3b3JkKTtcclxuICB9XHJcblxyXG4gIGdldENhcmRPYmpCeUltYWdlTmFtZShpbWFnZU5hbWUpIHtcclxuICAgIHJldHVybiB0aGlzLmNhcmRzQXJyLmZsYXQoKS5maW5kKChjYXJkT2JqKSA9PiBjYXJkT2JqLmltYWdlID09PSBgaW1nLyR7aW1hZ2VOYW1lfS5qcGdgKTtcclxuICB9XHJcblxyXG4gIGdldENhcmRPYmpCeVRyYW5zbGF0aW9uKHRyYW5zbGF0aW9uKSB7XHJcbiAgICByZXR1cm4gdGhpcy5jYXJkc0Fyci5mbGF0KCkuZmluZCgoY2FyZE9iaikgPT4gY2FyZE9iai50cmFuc2xhdGlvbiA9PT0gdHJhbnNsYXRpb24pO1xyXG4gIH1cclxuXHJcbiAgZ2V0Q2FyZEVsZW1lbnRCeVRhcmdldCh0YXJnZXRFbGVtZW50KSB7XHJcbiAgICBsZXQgc2VhcmNoRWxlbWVudCA9IHRhcmdldEVsZW1lbnQ7XHJcbiAgICB3aGlsZSAoIXNlYXJjaEVsZW1lbnQuY2xhc3NMaXN0LmNvbnRhaW5zKCdjYXJkJykpIHtcclxuICAgICAgc2VhcmNoRWxlbWVudCA9IHNlYXJjaEVsZW1lbnQucGFyZW50RWxlbWVudDtcclxuICAgIH1cclxuICAgIHJldHVybiBzZWFyY2hFbGVtZW50O1xyXG4gIH1cclxuXHJcbiAgZ2V0Q2FyZElubmVyVGV4dChjYXJkRWxlbWVudCkge1xyXG4gICAgcmV0dXJuIGNhcmRFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJ3AnKS5pbm5lckhUTUw7XHJcbiAgfVxyXG5cclxuICBnZXRDYXJkSW1hZ2VOYW1lKGNhcmRFbGVtZW50KSB7XHJcbiAgICBjb25zdCBpbWFnZVNyYyA9IGNhcmRFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJy5jYXJkLWltYWdlJykuc3JjO1xyXG4gICAgY29uc3QgaW1hZ2VOYW1lID0gaW1hZ2VTcmMubWF0Y2goLyg/PD1cXC8pXFx3Kyg/PVxcLnBuZ3wuc3ZnfC5qcGd8LmpwZWd8LmdpZikvKVswXTtcclxuICAgIHJldHVybiBpbWFnZU5hbWU7XHJcbiAgfVxyXG5cclxuICBmbGlwQ2FyZChjYXJkRWxlbWVudCkge1xyXG4gICAgY29uc3QgY2FyZFBhcmFncmFwaCA9IGNhcmRFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJ3AnKTtcclxuICAgIGNvbnN0IGNhcmRGbGlwQnV0dG9uID0gY2FyZEVsZW1lbnQucXVlcnlTZWxlY3RvcignLmNhcmQtZmxpcC1idXR0b24nKTtcclxuICAgIGNvbnN0IGNhcmRJbWFnZU5hbWUgPSB0aGlzLmdldENhcmRJbWFnZU5hbWUoY2FyZEVsZW1lbnQpO1xyXG4gICAgY29uc3QgY2FyZE9iaiA9IHRoaXMuZ2V0Q2FyZE9iakJ5SW1hZ2VOYW1lKGNhcmRJbWFnZU5hbWUpO1xyXG5cclxuICAgIGNhcmRFbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUoJ3VuZmxpcHBlZCcpO1xyXG4gICAgY2FyZEVsZW1lbnQuY2xhc3NMaXN0LmFkZCgnZmxpcHBlZCcpO1xyXG4gICAgY2FyZEVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcclxuICAgICAgJ3BvaW50ZXJsZWF2ZScsXHJcbiAgICAgICgpID0+IHtcclxuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgIHRoaXMudW5mbGlwQ2FyZChjYXJkRWxlbWVudCk7XHJcbiAgICAgICAgfSwgNTAwKTtcclxuICAgICAgfSxcclxuICAgICAgeyBvbmNlOiB0cnVlIH0sXHJcbiAgICApO1xyXG5cclxuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICBjYXJkUGFyYWdyYXBoLmlubmVySFRNTCA9IGNhcmRPYmoudHJhbnNsYXRpb247XHJcbiAgICAgIGNhcmRGbGlwQnV0dG9uLmhpZGRlbiA9IHRydWU7XHJcbiAgICB9LCA1MDApO1xyXG5cclxuICAgIHJldHVybiB0aGlzO1xyXG4gIH1cclxuXHJcbiAgdW5mbGlwQ2FyZChjYXJkRWxlbWVudCkge1xyXG4gICAgY2FyZEVsZW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcigncG9pbnRlcmxlYXZlJywgKGV2ZW50KSA9PiB1bmhvdmVyQ2FyZChldmVudCwgY2FyZEVsZW1lbnQsIHRoaXMpKTtcclxuXHJcbiAgICBpZiAoY2FyZEVsZW1lbnQuY2xhc3NMaXN0LmNvbnRhaW5zKCdmbGlwcGVkJykpIHtcclxuICAgICAgY29uc3QgY2FyZFBhcmFncmFwaCA9IGNhcmRFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJ3AnKTtcclxuICAgICAgY29uc3QgY2FyZEZsaXBCdXR0b24gPSBjYXJkRWxlbWVudC5xdWVyeVNlbGVjdG9yKCcuY2FyZC1mbGlwLWJ1dHRvbicpO1xyXG4gICAgICBjb25zdCBjYXJkV29yZCA9IGNhcmRQYXJhZ3JhcGguaW5uZXJIVE1MO1xyXG4gICAgICBjb25zdCBjYXJkT2JqID0gdGhpcy5nZXRDYXJkT2JqQnlUcmFuc2xhdGlvbihjYXJkV29yZCk7XHJcblxyXG4gICAgICBjYXJkRWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKCdmbGlwcGVkJyk7XHJcbiAgICAgIGNhcmRFbGVtZW50LmNsYXNzTGlzdC5hZGQoJ3VuZmxpcHBlZCcpO1xyXG4gICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICBjYXJkUGFyYWdyYXBoLmlubmVySFRNTCA9IGNhcmRPYmoud29yZDtcclxuICAgICAgICBjYXJkRmxpcEJ1dHRvbi5oaWRkZW4gPSBmYWxzZTtcclxuICAgICAgfSwgNTAwKTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gdGhpcztcclxuICB9XHJcblxyXG4gIHJlbW92ZUNhcmRzKCkge1xyXG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmNhcmQtY29udGFpbmVyJykucmVtb3ZlKCk7XHJcbiAgICByZXR1cm4gdGhpcztcclxuICB9XHJcblxyXG4gIHBsYXlGaW5hbENsaXAod3JvbmdBbnN3ZXJzKSB7XHJcbiAgICBjb25zdCBjbGlwVHlwZSA9ICh3cm9uZ0Fuc3dlcnMgPT09IDApID8gJ3N1Y2Nlc3MnIDogJ2ZhaWx1cmUnO1xyXG4gICAgY29uc3QgY2xhc3NOYW1lcyA9ICdmaW5hbC1jbGlwJztcclxuICAgIGNvbnN0IGltYWdlU3JjID0gYGFwcC8ke2NsaXBUeXBlfS5qcGdgO1xyXG5cclxuICAgIGNvbnN0IHRlbXBsYXRlID0gYFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImdyYXBoaWNcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGltZyBzcmM9XCIuLi9hc3NldHMvaW1nLyR7aW1hZ2VTcmN9XCIgYWx0PVwiaW1hZ2UgJHtjbGlwVHlwZX1cIiB3aWR0aD1cIjQwMFwiIGhlaWdodD1cIjQwMFwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBgO1xyXG5cclxuICAgIGNvbnN0IGZpbmFsQ2xpcEVsZW1lbnQgPSBjcmVhdGVDdXN0b21FbGVtZW50KCdkaXYnLCBjbGFzc05hbWVzLCB0ZW1wbGF0ZSk7XHJcbiAgICBpZiAoY2xpcFR5cGUgPT09ICdmYWlsdXJlJykge1xyXG4gICAgICBmaW5hbENsaXBFbGVtZW50LmlubmVySFRNTCArPSBgPHAgY2xhc3M9XCJtaXN0YWtlcy1udW1iZXJcIj5NaXN0YWtlczogJHt3cm9uZ0Fuc3dlcnN9PC9wPmA7XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5hcHBDb250cm9sLnBsYXlBcHBTb3VuZChjbGlwVHlwZSk7XHJcbiAgICB0aGlzLnJlbW92ZUNhcmRzKCk7XHJcbiAgICB0aGlzLmVsZW1lbnQuYXBwZW5kKGZpbmFsQ2xpcEVsZW1lbnQpO1xyXG5cclxuICAgIHJldHVybiB0aGlzO1xyXG4gIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgQ29udGVudENvbnRhaW5lcjtcclxuIiwiLyogZXNsaW50LWRpc2FibGUgbGluZWJyZWFrLXN0eWxlICovXHJcbi8qIGVzbGludC1kaXNhYmxlIG5vLXJlc3RyaWN0ZWQtc3ludGF4ICovXHJcbi8qIGVzbGludC1kaXNhYmxlIGxpbmVicmVhay1zdHlsZSAqL1xyXG4vKiBlc2xpbnQtZGlzYWJsZSBuby1jb25zb2xlICovXHJcbi8qIGVzbGludC1kaXNhYmxlIGxpbmVicmVhay1zdHlsZSAqL1xyXG4vKiBlc2xpbnQtZGlzYWJsZSBuby11bmRlZiAqL1xyXG5cclxuaW1wb3J0IFN0YXIgZnJvbSAnLi9zdGFyJztcclxuaW1wb3J0IHtcclxuICBjcmVhdGVDdXN0b21FbGVtZW50LFxyXG4gIGdldFJhbmRvbUludCxcclxufSBmcm9tICcuL2NvbW1vbkZ1bmN0JztcclxuXHJcbmNsYXNzIGdhbWVDb250cm9sIHtcclxuICBjb25zdHJ1Y3RvcihhcHBDb250cm9sKSB7XHJcbiAgICB0aGlzLmFwcENvbnRyb2wgPSBhcHBDb250cm9sO1xyXG4gICAgdGhpcy5xdWVzdGlvbnNCdW5kbGUgPSBbXTtcclxuICAgIHRoaXMuaXNHYW1lU3RhcnRlZCA9IGZhbHNlO1xyXG4gICAgdGhpcy5jb3JyZWN0U3RhckVsZW1lbnQgPSBuZXcgU3RhcigpLmVsZW1lbnQ7XHJcbiAgICB0aGlzLndyb25nU3RhckVsZW1lbnQgPSBuZXcgU3Rhcignd3JvbmcnKS5lbGVtZW50O1xyXG5cclxuICAgIHRoaXMuYWN0aXZlUXVlc3Rpb24gPSBudWxsO1xyXG4gICAgdGhpcy5lbGVtZW50ID0gbnVsbDtcclxuICAgIHRoaXMubGl2ZUVsZW1lbnQgPSBudWxsO1xyXG4gICAgdGhpcy5saXZlQnV0dG9uRWxlbWVudCA9IG51bGw7XHJcbiAgICB0aGlzLmxpdmVJbmRpY2F0b3JFbGVtZW50ID0gbnVsbDtcclxuICAgIHRoaXMubGl2ZUNvcnJlY3RQckVsZW1lbnQgPSBudWxsO1xyXG4gICAgdGhpcy5saXZlV3JvbmdQckVsZW1lbnQgPSBudWxsO1xyXG4gICAgdGhpcy5saXZlU3RhcnNDb2xsZWN0aW9uID0gbnVsbDtcclxuICAgIHRoaXMuY29ycmVjdEFuc3dlcnMgPSBudWxsO1xyXG4gICAgdGhpcy53cm9uZ0Fuc3dlcnMgPSBudWxsO1xyXG5cclxuICAgIHRoaXMuYnVpbGQoKTtcclxuICB9XHJcblxyXG4gIGJ1aWxkKCkge1xyXG4gICAgY29uc3QgY2xhc3NOYW1lcyA9ICdnYW1lLWNvbnRyb2xzIGluYWN0aXZlJztcclxuICAgIGNvbnN0IHRlbXBsYXRlID0gYFxyXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJidXR0b24gZ2FtZS1idXR0b24gc3RhcnQtYnV0dG9uXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImdhbWUtcHJvZ3Jlc3MgaW5hY3RpdmVcIj5cclxuICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJnYW1lLWluZGljYXRvclwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgICA8cCBjbGFzcz1cImdhbWUtc2NvcmVcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJwcm9ncmVzcyBjb3JyZWN0XCI+MDwvc3Bhbj4gfCA8c3BhbiBjbGFzcz1cInByb2dyZXNzIHdyb25nXCI+MDwvc3Bhbj5cclxuICAgICAgICAgICAgICAgICAgICAgIDwvcD5cclxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICBgO1xyXG4gICAgdGhpcy5lbGVtZW50ID0gY3JlYXRlQ3VzdG9tRWxlbWVudCgnZGl2JywgY2xhc3NOYW1lcywgdGVtcGxhdGUpO1xyXG4gICAgcmV0dXJuIHRoaXM7XHJcbiAgfVxyXG5cclxuICBhZGRUb0RvYygpIHtcclxuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2hlYWRlcicpLmFwcGVuZCh0aGlzLmVsZW1lbnQpO1xyXG4gICAgW3RoaXMubGl2ZUVsZW1lbnRdID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnZ2FtZS1jb250cm9scycpO1xyXG4gICAgW3RoaXMubGl2ZUJ1dHRvbkVsZW1lbnRdID0gdGhpcy5saXZlRWxlbWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdnYW1lLWJ1dHRvbicpO1xyXG4gICAgW3RoaXMubGl2ZUluZGljYXRvckVsZW1lbnRdID0gdGhpcy5saXZlRWxlbWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdnYW1lLWluZGljYXRvcicpO1xyXG4gICAgW3RoaXMubGl2ZUNvcnJlY3RQckVsZW1lbnQsIHRoaXMubGl2ZVdyb25nUHJFbGVtZW50XSA9IHRoaXMubGl2ZUVsZW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgncHJvZ3Jlc3MnKTtcclxuICAgIHRoaXMubGl2ZVN0YXJzQ29sbGVjdGlvbiA9IHRoaXMubGl2ZUVsZW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnc3RhcicpO1xyXG5cclxuICAgIHJldHVybiB0aGlzO1xyXG4gIH1cclxuXHJcbiAgc2hvdygpIHtcclxuICAgIHRoaXMubGl2ZUVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZSgnaW5hY3RpdmUnKTtcclxuICAgIHJldHVybiB0aGlzO1xyXG4gIH1cclxuXHJcbiAgaGlkZSgpIHtcclxuICAgIHRoaXMubGl2ZUVsZW1lbnQuY2xhc3NMaXN0LmFkZCgnaW5hY3RpdmUnKTtcclxuICAgIHJldHVybiB0aGlzO1xyXG4gIH1cclxuXHJcbiAgc2hvd0dhbWVQcm9ncmVzcygpIHtcclxuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5nYW1lLXByb2dyZXNzJykuY2xhc3NMaXN0LnJlbW92ZSgnaW5hY3RpdmUnKTtcclxuICAgIHJldHVybiB0aGlzO1xyXG4gIH1cclxuXHJcbiAgaGlkZUdhbWVQcm9ncmVzcygpIHtcclxuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5nYW1lLXByb2dyZXNzJykuY2xhc3NMaXN0LmFkZCgnaW5hY3RpdmUnKTtcclxuICAgIHJldHVybiB0aGlzO1xyXG4gIH1cclxuXHJcbiAgY3JlYXRlUmFuZG9tUXVlc3Rpb25zQnVuZGxlKGFyck9wdGlvbnMpIHtcclxuICAgIHRoaXMucXVlc3Rpb25zQnVuZGxlID0gW107XHJcbiAgICBjb25zdCB3b3JrQXJyID0gYXJyT3B0aW9ucy5tYXAoKGl0ZW0pID0+IGl0ZW0pO1xyXG4gICAgd2hpbGUgKHRoaXMucXVlc3Rpb25zQnVuZGxlLmxlbmd0aCA8IGFyck9wdGlvbnMubGVuZ3RoKSB7XHJcbiAgICAgIGNvbnN0IHJhbmRvbUluZGV4ID0gZ2V0UmFuZG9tSW50KHdvcmtBcnIubGVuZ3RoIC0gMSk7XHJcbiAgICAgIHRoaXMucXVlc3Rpb25zQnVuZGxlLnB1c2goLi4ud29ya0Fyci5zcGxpY2UocmFuZG9tSW5kZXgsIDEpKTtcclxuICAgIH1cclxuICAgIHJldHVybiB0aGlzO1xyXG4gIH1cclxuXHJcbiAgc3RhcnRHYW1lKGFyck9wdGlvbnMpIHtcclxuICAgIHRoaXMuaXNHYW1lU3RhcnRlZCA9IHRydWU7XHJcbiAgICB0aGlzLmNvcnJlY3RBbnN3ZXJzID0gMDtcclxuICAgIHRoaXMud3JvbmdBbnN3ZXJzID0gMDtcclxuICAgIHRoaXMuc2hvd0dhbWVQcm9ncmVzcygpO1xyXG4gICAgdGhpcy5jcmVhdGVSYW5kb21RdWVzdGlvbnNCdW5kbGUoYXJyT3B0aW9ucyk7XHJcbiAgICB0aGlzLmFza1F1ZXN0aW9uKCk7XHJcbiAgICB0aGlzLmNoYW5nZUJ1dHRvbkNsYXNzKCdyZXBlYXQtYnV0dG9uJyk7XHJcbiAgICByZXR1cm4gdGhpcztcclxuICB9XHJcblxyXG4gIGVuZEdhbWUoKSB7XHJcbiAgICB0aGlzLmlzR2FtZVN0YXJ0ZWQgPSBmYWxzZTtcclxuICAgIHRoaXMuYWN0aXZlUXVlc3Rpb24gPSBudWxsO1xyXG4gICAgdGhpcy5oaWRlR2FtZVByb2dyZXNzKCk7XHJcbiAgICB0aGlzLmNoYW5nZUJ1dHRvbkNsYXNzKCdzdGFydC1idXR0b24nKTtcclxuXHJcbiAgICBpZiAodGhpcy5jb3JyZWN0QW5zd2VycyA9PT0gdGhpcy5hcHBDb250cm9sLmNvbnRlbnQuZ2FtZUNhcmRzQ29sbGVjdGlvbi5sZW5ndGhcclxuICAgICAgICAmJiB0aGlzLmNvcnJlY3RBbnN3ZXJzICE9PSAwKSB7XHJcbiAgICAgIHRoaXMuYXBwQ29udHJvbC5jb250ZW50LnBsYXlGaW5hbENsaXAodGhpcy53cm9uZ0Fuc3dlcnMpO1xyXG4gICAgICB0aGlzLmNvcnJlY3RBbnN3ZXJzID0gMDtcclxuICAgICAgdGhpcy53cm9uZ0Fuc3dlcnMgPSAwO1xyXG5cclxuICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgdGhpcy5hcHBDb250cm9sLmNoYW5nZVBhZ2UoJ01haW4gcGFnZScpO1xyXG4gICAgICB9LCAzMDAwKTtcclxuXHJcbiAgICAgIHRoaXMuY29ycmVjdEFuc3dlcnMgPSAwO1xyXG4gICAgICB0aGlzLndyb25nQW5zd2VycyA9IDA7XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5saXZlQ29ycmVjdFByRWxlbWVudC5pbm5lckhUTUwgPSAnMCc7XHJcbiAgICB0aGlzLmxpdmVXcm9uZ1ByRWxlbWVudC5pbm5lckhUTUwgPSAnMCc7XHJcbiAgICB0aGlzLmxpdmVJbmRpY2F0b3JFbGVtZW50LmlubmVySFRNTCA9ICcnO1xyXG4gICAgcmV0dXJuIHRoaXM7XHJcbiAgfVxyXG5cclxuICBhc2tRdWVzdGlvbigpIHtcclxuICAgIGlmICh0aGlzLnF1ZXN0aW9uc0J1bmRsZS5sZW5ndGggIT09IDApIHtcclxuICAgICAgdGhpcy5hY3RpdmVRdWVzdGlvbiA9IHRoaXMucXVlc3Rpb25zQnVuZGxlLnBvcCgpO1xyXG4gICAgICB0aGlzLmFwcENvbnRyb2wucGxheUNhcmRTb3VuZCh0aGlzLmFjdGl2ZVF1ZXN0aW9uKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMuZW5kR2FtZSgpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHRoaXM7XHJcbiAgfVxyXG5cclxuICBwcm9jZXNzQW5zd2VyKGNhcmRPYmosIGNhcmRFbGVtZW50KSB7XHJcbiAgICBpZiAodGhpcy5saXZlU3RhcnNDb2xsZWN0aW9uLmxlbmd0aCA+PSA1KSB7XHJcbiAgICAgIHRoaXMubGl2ZUluZGljYXRvckVsZW1lbnQuZmlyc3RFbGVtZW50Q2hpbGQucmVtb3ZlKCk7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKE9iamVjdC5lbnRyaWVzKHRoaXMuYWN0aXZlUXVlc3Rpb24pLmV2ZXJ5KChba2V5LCB2YWx1ZV0pID0+IHZhbHVlID09PSBjYXJkT2JqW2tleV0pKSB7XHJcbiAgICAgIHRoaXMuY29ycmVjdEFuc3dlcih0aGlzLmFjdGl2ZVF1ZXN0aW9uKTtcclxuICAgICAgY2FyZEVsZW1lbnQuY2xhc3NMaXN0LmFkZCgnZGlzYWJsZWQnKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMud3JvbmdBbnN3ZXIodGhpcy5hY3RpdmVRdWVzdGlvbik7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHRoaXM7XHJcbiAgfVxyXG5cclxuICBjb3JyZWN0QW5zd2VyKGNhcmRPYmopIHtcclxuICAgIHRoaXMuYXBwQ29udHJvbC5wbGF5QXBwU291bmQoJ2NvcnJlY3QnKTtcclxuICAgIHRoaXMuY29ycmVjdEFuc3dlcnMgKz0gMTtcclxuICAgIHRoaXMuYXBwQ29udHJvbC5zdGF0LnN0b3JhZ2UuYWRkKCdjb3JyZWN0JywgY2FyZE9iaik7XHJcbiAgICB0aGlzLmxpdmVDb3JyZWN0UHJFbGVtZW50LmlubmVySFRNTCA9IHRoaXMuY29ycmVjdEFuc3dlcnM7XHJcbiAgICB0aGlzLmxpdmVJbmRpY2F0b3JFbGVtZW50LmFwcGVuZChuZXcgU3RhcigpLmVsZW1lbnQpO1xyXG4gICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgIHRoaXMuYXNrUXVlc3Rpb24oKTtcclxuICAgIH0sIDEwMDApO1xyXG5cclxuICAgIHJldHVybiB0aGlzO1xyXG4gIH1cclxuXHJcbiAgd3JvbmdBbnN3ZXIoY2FyZE9iaikge1xyXG4gICAgdGhpcy5hcHBDb250cm9sLnBsYXlBcHBTb3VuZCgnd3JvbmcnKTtcclxuICAgIHRoaXMud3JvbmdBbnN3ZXJzICs9IDE7XHJcbiAgICB0aGlzLmFwcENvbnRyb2wuc3RhdC5zdG9yYWdlLmFkZCgnd3JvbmcnLCBjYXJkT2JqKTtcclxuICAgIHRoaXMubGl2ZVdyb25nUHJFbGVtZW50LmlubmVySFRNTCA9IHRoaXMud3JvbmdBbnN3ZXJzO1xyXG4gICAgdGhpcy5saXZlSW5kaWNhdG9yRWxlbWVudC5hcHBlbmQobmV3IFN0YXIoJ3dyb25nJykuZWxlbWVudCk7XHJcbiAgICByZXR1cm4gdGhpcztcclxuICB9XHJcblxyXG4gIHJlcGVhdFF1ZXN0aW9uKCkge1xyXG4gICAgdGhpcy5hcHBDb250cm9sLnBsYXlDYXJkU291bmQodGhpcy5hY3RpdmVRdWVzdGlvbik7XHJcbiAgICByZXR1cm4gdGhpcztcclxuICB9XHJcblxyXG4gIGNoYW5nZUJ1dHRvbkNsYXNzKGJ1dHRvbkNsYXNzTmFtZSkge1xyXG4gICAgY29uc3QgcmVtb3ZlZENsYXNzTmFtZSA9IChidXR0b25DbGFzc05hbWUgPT09ICdzdGFydC1idXR0b24nKSA/ICdyZXBlYXQtYnV0dG9uJyA6ICdzdGFydC1idXR0b24nO1xyXG4gICAgdGhpcy5saXZlQnV0dG9uRWxlbWVudC5jbGFzc0xpc3QuYWRkKGJ1dHRvbkNsYXNzTmFtZSk7XHJcbiAgICB0aGlzLmxpdmVCdXR0b25FbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUocmVtb3ZlZENsYXNzTmFtZSk7XHJcbiAgICByZXR1cm4gdGhpcztcclxuICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IGdhbWVDb250cm9sO1xyXG4iLCIvKiBlc2xpbnQtZGlzYWJsZSBsaW5lYnJlYWstc3R5bGUgKi9cclxuY29uc3QgbWFpbkNhcmRzID0gW1xyXG4gIHtcclxuICAgIHRvcGljOiAnQWN0aW9uIChzZXQgQSknLFxyXG4gICAgaW1hZ2U6ICdpbWcvYXBwL21haW4tMDAxLnBuZycsXHJcbiAgfSxcclxuICB7XHJcbiAgICB0b3BpYzogJ0FjdGlvbiAoc2V0IEIpJyxcclxuICAgIGltYWdlOiAnaW1nL2FwcC9tYWluLTAwMi5wbmcnLFxyXG4gIH0sXHJcbiAge1xyXG4gICAgdG9waWM6ICdBbmltYWwgKHNldCBBKScsXHJcbiAgICBpbWFnZTogJ2ltZy9hcHAvbWFpbi0wMDMucG5nJyxcclxuICB9LFxyXG4gIHtcclxuICAgIHRvcGljOiAnQW5pbWFsIChzZXQgQiknLFxyXG4gICAgaW1hZ2U6ICdpbWcvYXBwL21haW4tMDA0LnBuZycsXHJcbiAgfSxcclxuICB7XHJcbiAgICB0b3BpYzogJ0Nsb3RoZXMnLFxyXG4gICAgaW1hZ2U6ICdpbWcvYXBwL21haW4tMDA1LnBuZycsXHJcbiAgfSxcclxuICB7XHJcbiAgICB0b3BpYzogJ0Vtb3Rpb25zJyxcclxuICAgIGltYWdlOiAnaW1nL2FwcC9tYWluLTAwNi5wbmcnLFxyXG4gIH0sXHJcbl07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBtYWluQ2FyZHM7XHJcbiIsIi8qIGVzbGludC1kaXNhYmxlIGxpbmVicmVhay1zdHlsZSAqL1xyXG4vKiBlc2xpbnQtZGlzYWJsZSBuby1jb25zb2xlICovXHJcbi8qIGVzbGludC1kaXNhYmxlIGxpbmVicmVhay1zdHlsZSAqL1xyXG4vKiBlc2xpbnQtZGlzYWJsZSBjb25zaXN0ZW50LXJldHVybiAqL1xyXG4vKiBlc2xpbnQtZGlzYWJsZSBuby1yZXN0cmljdGVkLXN5bnRheCAqL1xyXG4vKiBlc2xpbnQtZGlzYWJsZSBuby11bmRlZiAqL1xyXG5cclxuaW1wb3J0IHtcclxuICBjcmVhdGVDdXN0b21FbGVtZW50LFxyXG59IGZyb20gJy4vY29tbW9uRnVuY3QnO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTWVudUVsZW1lbnQge1xyXG4gIGNvbnN0cnVjdG9yKHRvcGljc0Fyciwgc3RhcnRNZW51ID0gJ01haW4gcGFnZScsIGVuZE1lbnUgPSAnU3RhdGlzdGljJykge1xyXG4gICAgdGhpcy5vcGVuZWRNZW51Q29sbGVjdGlvbnMgPSBbXHJcbiAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKCdib2R5JyksXHJcbiAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ21lbnUnKSxcclxuICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnbWVudS1idXR0b24nKSxcclxuICAgIF07XHJcbiAgICB0aGlzLnRvcGljc0FyciA9IHRvcGljc0FycjtcclxuICAgIHRoaXMuc3RhcnRNZW51ID0gc3RhcnRNZW51O1xyXG4gICAgdGhpcy5lbmRNZW51ID0gZW5kTWVudTtcclxuICAgIHRoaXMuYWN0aXZlUGFnZSA9IHRoaXMuc3RhcnRNZW51LnRvTG93ZXJDYXNlKCk7XHJcbiAgICB0aGlzLm1lbnVJdGVtc0VsZW1lbnRzID0gbnVsbDtcclxuICAgIHRoaXMuZWxlbWVudCA9IG51bGw7XHJcblxyXG4gICAgdGhpcy5idWlsZCgpO1xyXG4gIH1cclxuXHJcbiAgYnVpbGQoKSB7XHJcbiAgICBmdW5jdGlvbiBjcmVhdGVMaSh0b3BpY05hbWUgPSAnJykge1xyXG4gICAgICBjb25zdCBlbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGknKTtcclxuICAgICAgZWxlbWVudC5jbGFzc05hbWUgPSAnYnV0dG9uIG1lbnUtaXRlbSc7XHJcbiAgICAgIGVsZW1lbnQuaW5uZXJIVE1MID0gdG9waWNOYW1lO1xyXG4gICAgICByZXR1cm4gZWxlbWVudDtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCB1bEVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd1bCcpO1xyXG4gICAgdWxFbGVtZW50LmNsYXNzTmFtZSA9ICdtZW51LWxpc3QnO1xyXG5cclxuICAgIHVsRWxlbWVudC5hcHBlbmQoY3JlYXRlTGkodGhpcy5zdGFydE1lbnUpKTtcclxuICAgIHRoaXMudG9waWNzQXJyLmZvckVhY2goKHRvcGljTmFtZSkgPT4gdWxFbGVtZW50LmFwcGVuZChjcmVhdGVMaSh0b3BpY05hbWUpKSk7XHJcbiAgICB1bEVsZW1lbnQuYXBwZW5kKGNyZWF0ZUxpKHRoaXMuZW5kTWVudSkpO1xyXG5cclxuICAgIGNvbnN0IGJ1dHRvblRlbXBsYXRlID0gYFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImJ1dHRvbiBjbG9zZS1tZW51XCI+PC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBgO1xyXG5cclxuICAgIGNvbnN0IG1lbnVFbGVtZW50ID0gY3JlYXRlQ3VzdG9tRWxlbWVudCgnbmF2JywgJ21lbnUnLCBidXR0b25UZW1wbGF0ZSk7XHJcbiAgICBtZW51RWxlbWVudC5hcHBlbmQodWxFbGVtZW50KTtcclxuICAgIHRoaXMuZWxlbWVudCA9IG1lbnVFbGVtZW50O1xyXG4gICAgcmV0dXJuIHRoaXM7XHJcbiAgfVxyXG5cclxuICBhZGRUb0RvYygpIHtcclxuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5tYWluLWNvbnRyb2xzJykucHJlcGVuZCh0aGlzLmVsZW1lbnQpO1xyXG4gICAgdGhpcy5tZW51SXRlbXNFbGVtZW50cyA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ21lbnUtaXRlbScpO1xyXG4gICAgdGhpcy5zZXRBY3RpdmVUb3BpYyh0aGlzLm1lbnVJdGVtc0VsZW1lbnRzWzBdLmlubmVySFRNTCk7XHJcbiAgICByZXR1cm4gdGhpcztcclxuICB9XHJcblxyXG4gIHRvZ2dsZSgpIHtcclxuICAgIHRoaXMub3BlbmVkTWVudUNvbGxlY3Rpb25zLm1hcCgoaHRtbENvbGxlY3Rpb24pID0+IGh0bWxDb2xsZWN0aW9uWzBdLmNsYXNzTGlzdC50b2dnbGUoJ29wZW5lZC1tZW51JykpO1xyXG4gICAgcmV0dXJuIHRoaXM7XHJcbiAgfVxyXG5cclxuICBjbG9zZSgpIHtcclxuICAgIHRoaXMub3BlbmVkTWVudUNvbGxlY3Rpb25zLm1hcCgoaHRtbENvbGxlY3Rpb24pID0+IGh0bWxDb2xsZWN0aW9uWzBdLmNsYXNzTGlzdC5yZW1vdmUoJ29wZW5lZC1tZW51JykpO1xyXG4gIH1cclxuXHJcbiAgc2V0QWN0aXZlVG9waWModG9waWNOYW1lKSB7XHJcbiAgICBjb25zdCBjbGFzc05hbWUgPSAnYWN0aXZlLXBhZ2UnO1xyXG4gICAgY29uc3QgdG9waWNFbGVtZW50ID0gdGhpcy5nZXRNZW51SXRlbUJ5TmFtZSh0b3BpY05hbWUpO1xyXG4gICAgdGhpcy5hY3RpdmVQYWdlID0gdG9waWNOYW1lLnRvTG93ZXJDYXNlKCk7XHJcbiAgICBmb3IgKGNvbnN0IG1lbnVJdGVtRWxlbWVudCBvZiB0aGlzLm1lbnVJdGVtc0VsZW1lbnRzKSB7XHJcbiAgICAgIG1lbnVJdGVtRWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKGNsYXNzTmFtZSk7XHJcbiAgICB9XHJcbiAgICB0b3BpY0VsZW1lbnQuY2xhc3NMaXN0LmFkZChjbGFzc05hbWUpO1xyXG5cclxuICAgIHJldHVybiB0aGlzO1xyXG4gIH1cclxuXHJcbiAgZ2V0TWVudUl0ZW1CeU5hbWUoaXRlbU5hbWUpIHtcclxuICAgIGZvciAoY29uc3QgZWxlbWVudCBvZiB0aGlzLm1lbnVJdGVtc0VsZW1lbnRzKSB7XHJcbiAgICAgIGlmIChlbGVtZW50LmlubmVySFRNTC50b0xvd2VyQ2FzZSgpID09PSBpdGVtTmFtZS50b0xvd2VyQ2FzZSgpKSB7XHJcbiAgICAgICAgcmV0dXJuIGVsZW1lbnQ7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcbn1cclxuIiwiLyogZXNsaW50LWRpc2FibGUgbGluZWJyZWFrLXN0eWxlICovXHJcblxyXG5pbXBvcnQgeyBjcmVhdGVDdXN0b21FbGVtZW50IH0gZnJvbSAnLi9jb21tb25GdW5jdCc7XHJcblxyXG5jbGFzcyBTdGFyIHtcclxuICBjb25zdHJ1Y3Rvcih0eXBlID0gJ2NvcnJlY3QnKSB7XHJcbiAgICB0aGlzLnR5cGUgPSAodHlwZSA9PT0gJ2NvcnJlY3QnKSA/IHR5cGUgOiAnd3JvbmcnO1xyXG4gICAgY29uc3QgY2xhc3NOYW1lcyA9IGBncmFwaGljIHN0YXIgc3Rhci0ke3RoaXMudHlwZX1gO1xyXG4gICAgbGV0IGltYWdlU3JjO1xyXG5cclxuICAgIGlmICh0aGlzLnR5cGUgPT09ICdjb3JyZWN0Jykge1xyXG4gICAgICBpbWFnZVNyYyA9ICdhcHAvc3Rhci13aW4uc3ZnJztcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGltYWdlU3JjID0gJ2FwcC9zdGFyLnN2Zyc7XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgdGVtcGxhdGUgPSBgXHJcbiAgICAgICAgICAgICAgICAgICAgICA8aW1nIGNsYXNzPVwic3Rhci1pbWFnZVwiIHNyYz1cIi4uL2Fzc2V0cy9pbWcvJHtpbWFnZVNyY31cIiBhbHQ9XCIke3RoaXMudHlwZX0gc3RhclwiIHdpZHRoPVwiNDBcIiBoZWlnaHQ9XCI0MFwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgYDtcclxuICAgIHRoaXMuZWxlbWVudCA9IGNyZWF0ZUN1c3RvbUVsZW1lbnQoJ2RpdicsIGNsYXNzTmFtZXMsIHRlbXBsYXRlKTtcclxuICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IFN0YXI7XHJcbiIsIi8qIGVzbGludC1kaXNhYmxlIGxpbmVicmVhay1zdHlsZSAqL1xyXG4vKiBlc2xpbnQtZGlzYWJsZSBuby1jb25zb2xlICovXHJcbi8qIGVzbGludC1kaXNhYmxlIGxpbmVicmVhay1zdHlsZSAqL1xyXG4vKiBlc2xpbnQtZGlzYWJsZSBuby11bmRlZiAqL1xyXG4vKiBlc2xpbnQtZGlzYWJsZSBsaW5lYnJlYWstc3R5bGUgKi9cclxuXHJcbmNsYXNzIFN0YXRTdG9yYWdlIHtcclxuICBjb25zdHJ1Y3Rvcih0b3BpY3NBcnIsIGNhcmRzQXJyKSB7XHJcbiAgICB0aGlzLnRvcGljc0FyciA9IHRvcGljc0FycjtcclxuICAgIHRoaXMuY2FyZHNBcnIgPSBjYXJkc0FycjtcclxuICAgIHRoaXMuc3RhdEFyciA9IEpTT04ucGFyc2UobG9jYWxTdG9yYWdlLmdldEl0ZW0oJ0VuZ2xpc2hGb3JLaWRzJykgfHwgW10pO1xyXG4gICAgaWYgKCF0aGlzLnN0YXRBcnIpIHtcclxuICAgICAgdGhpc1xyXG4gICAgICAgIC5idWlsZCgpXHJcbiAgICAgICAgLnVwZGF0ZVN0b3JhZ2UoKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGJ1aWxkKCkge1xyXG4gICAgY29uc3Qgc3RhdERhdGFBcnIgPSBbXTtcclxuICAgIHRoaXMudG9waWNzQXJyLmZvckVhY2goKHRvcGlOYW1lLCBpbmRleCkgPT4ge1xyXG4gICAgICBjb25zdCB0b3BpY0NhcmRzQXJyID0gdGhpcy5jYXJkc0FycltpbmRleF07XHJcblxyXG4gICAgICB0b3BpY0NhcmRzQXJyLmZvckVhY2goKHdvcmRPYmopID0+IHtcclxuICAgICAgICBjb25zdCBzdGF0V29yZE9iaiA9IHtcclxuICAgICAgICAgIHRvcGljOiB0b3BpTmFtZSxcclxuICAgICAgICAgIHdvcmQ6IHdvcmRPYmoud29yZCxcclxuICAgICAgICAgIHRyYW5zbGF0aW9uOiB3b3JkT2JqLnRyYW5zbGF0aW9uLFxyXG4gICAgICAgICAgdHJhaW5DbGljazogMCxcclxuICAgICAgICAgIGNvcnJlY3RBbnN3ZXJzOiAwLFxyXG4gICAgICAgICAgbWlzdGFrZXM6IDAsXHJcbiAgICAgICAgICBwZXJjZW50YWdlOiAwLFxyXG4gICAgICAgICAgaW1hZ2U6IHdvcmRPYmouaW1hZ2UsXHJcbiAgICAgICAgICBhdWRpb1NyYzogd29yZE9iai5hdWRpb1NyYyxcclxuICAgICAgICB9O1xyXG4gICAgICAgIHN0YXREYXRhQXJyLnB1c2goc3RhdFdvcmRPYmopO1xyXG4gICAgICB9KTtcclxuICAgIH0pO1xyXG4gICAgdGhpcy5zdGF0QXJyID0gc3RhdERhdGFBcnI7XHJcbiAgICByZXR1cm4gdGhpcztcclxuICB9XHJcblxyXG4gIHVwZGF0ZVN0b3JhZ2UoKSB7XHJcbiAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnRW5nbGlzaEZvcktpZHMnLCBKU09OLnN0cmluZ2lmeSh0aGlzLnN0YXRBcnIpKTtcclxuICAgIHJldHVybiB0aGlzO1xyXG4gIH1cclxuXHJcbiAgY2xlYW5TdG9yYWdlKCkge1xyXG4gICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ0VuZ2xpc2hGb3JLaWRzJywgSlNPTi5zdHJpbmdpZnkoJycpKTtcclxuICAgIHRoaXNcclxuICAgICAgLmJ1aWxkKClcclxuICAgICAgLnVwZGF0ZVN0b3JhZ2UoKTtcclxuICAgIHJldHVybiB0aGlzO1xyXG4gIH1cclxuXHJcbiAgYWRkKHR5cGUsIGNhcmRPYmopIHtcclxuICAgIGNvbnN0IG9iakluZGV4ID0gdGhpcy5zdGF0QXJyLmZpbmRJbmRleCgod29yZE9iaikgPT4ge1xyXG4gICAgICBjb25zdCByZXN1bHQgPSAod29yZE9iai53b3JkID09PSBjYXJkT2JqLndvcmQpXHJcbiAgICAgICAgICAgICYmICh3b3JkT2JqLnRyYW5zbGF0aW9uID09PSBjYXJkT2JqLnRyYW5zbGF0aW9uKTtcclxuICAgICAgcmV0dXJuIHJlc3VsdDtcclxuICAgIH0pO1xyXG5cclxuICAgIHN3aXRjaCAodHlwZSkge1xyXG4gICAgICBjYXNlICdjbGljayc6IHtcclxuICAgICAgICB0aGlzLnN0YXRBcnJbb2JqSW5kZXhdLnRyYWluQ2xpY2sgKz0gMTtcclxuICAgICAgICBicmVhaztcclxuICAgICAgfVxyXG4gICAgICBjYXNlICdjb3JyZWN0Jzoge1xyXG4gICAgICAgIHRoaXMuc3RhdEFycltvYmpJbmRleF0uY29ycmVjdEFuc3dlcnMgKz0gMTtcclxuICAgICAgICBicmVhaztcclxuICAgICAgfVxyXG4gICAgICBjYXNlICd3cm9uZyc6IHtcclxuICAgICAgICB0aGlzLnN0YXRBcnJbb2JqSW5kZXhdLm1pc3Rha2VzICs9IDE7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIH1cclxuICAgICAgZGVmYXVsdDpcclxuICAgICAgICBicmVhaztcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBjb3JyQW5zdyA9IHRoaXMuc3RhdEFycltvYmpJbmRleF0uY29ycmVjdEFuc3dlcnM7XHJcbiAgICBjb25zdCB3cm9uZ0Fuc3cgPSB0aGlzLnN0YXRBcnJbb2JqSW5kZXhdLm1pc3Rha2VzO1xyXG4gICAgaWYgKGNvcnJBbnN3ICYmIHdyb25nQW5zdykge1xyXG4gICAgICB0aGlzLnN0YXRBcnJbb2JqSW5kZXhdLnBlcmNlbnRhZ2UgPSBNYXRoLnJvdW5kKChjb3JyQW5zdyAvIChjb3JyQW5zdyArIHdyb25nQW5zdykpICogMTAwKTtcclxuICAgIH0gZWxzZSBpZiAoY29yckFuc3cpIHtcclxuICAgICAgdGhpcy5zdGF0QXJyW29iakluZGV4XS5wZXJjZW50YWdlID0gMTAwO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMudXBkYXRlU3RvcmFnZSgpO1xyXG4gICAgcmV0dXJuIHRoaXM7XHJcbiAgfVxyXG5cclxuICBnZXRTb3J0ZWRBcnJCeVByb3AocHJvcGVydHksIHNvcnRUeXBlID0gJ2Rvd24nKSB7XHJcbiAgICBjb25zdCBzb3J0ZWRBcnIgPSBbXTtcclxuICAgIHRoaXMuc3RhdEFyci5mb3JFYWNoKChpdGVtKSA9PiBzb3J0ZWRBcnIucHVzaChpdGVtKSk7XHJcblxyXG4gICAgZnVuY3Rpb24gY29tcGFyZUZ1bmN0aW9uKG9iakEsIG9iakIpIHtcclxuICAgICAgaWYgKG9iakFbcHJvcGVydHldID4gb2JqQltwcm9wZXJ0eV0pIHtcclxuICAgICAgICByZXR1cm4gMTtcclxuICAgICAgfVxyXG4gICAgICBpZiAob2JqQVtwcm9wZXJ0eV0gPCBvYmpCW3Byb3BlcnR5XSkge1xyXG4gICAgICAgIHJldHVybiAtMTtcclxuICAgICAgfVxyXG4gICAgICByZXR1cm4gMDtcclxuICAgIH1cclxuXHJcbiAgICBpZiAoc29ydFR5cGUgPT09ICdkb3duJykge1xyXG4gICAgICBzb3J0ZWRBcnIuc29ydCgoYSwgYikgPT4gY29tcGFyZUZ1bmN0aW9uKGEsIGIpKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHNvcnRlZEFyci5zb3J0KChhLCBiKSA9PiBjb21wYXJlRnVuY3Rpb24oYiwgYSkpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHNvcnRlZEFycjtcclxuICB9XHJcblxyXG4gIGdldERpZmZXb3Jkc0FycigpIHtcclxuICAgIGNvbnN0IHNvcnRlZEFyciA9IHRoaXMuZ2V0U29ydGVkQXJyQnlQcm9wKCdwZXJjZW50YWdlJywgJ2Rvd24nKTtcclxuICAgIGNvbnN0IHJlc3VsdEFyciA9IHNvcnRlZEFyci5maWx0ZXIoKGl0ZW0pID0+IGl0ZW0ucGVyY2VudGFnZSA+IDAgJiYgaXRlbS5wZXJjZW50YWdlIDwgMTAwKTtcclxuICAgIHJldHVybiByZXN1bHRBcnI7XHJcbiAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBTdGF0U3RvcmFnZTtcclxuIiwiLyogZXNsaW50LWRpc2FibGUgbGluZWJyZWFrLXN0eWxlICovXHJcbi8qIGVzbGludC1kaXNhYmxlIGNsYXNzLW1ldGhvZHMtdXNlLXRoaXMgKi9cclxuLyogZXNsaW50LWRpc2FibGUgbGluZWJyZWFrLXN0eWxlICovXHJcbi8qIGVzbGludC1kaXNhYmxlIG5vLWNvbnNvbGUgKi9cclxuLyogZXNsaW50LWRpc2FibGUgbGluZWJyZWFrLXN0eWxlICovXHJcbi8qIGVzbGludC1kaXNhYmxlIG5vLXVuZGVmICovXHJcbi8qIGVzbGludC1kaXNhYmxlIGxpbmVicmVhay1zdHlsZSAqL1xyXG5cclxuaW1wb3J0IFN0YXRTdG9yYWdlIGZyb20gJy4vc3RhdFN0b3JhZ2UnO1xyXG5pbXBvcnQgQ2FyZCBmcm9tICcuL2NhcmQnO1xyXG5cclxuaW1wb3J0IHtcclxuICBjcmVhdGVDdXN0b21FbGVtZW50LFxyXG59IGZyb20gJy4vY29tbW9uRnVuY3QnO1xyXG5cclxuY2xhc3MgU3RhdGlzdGljIHtcclxuICBjb25zdHJ1Y3RvcihhcHBDb250cm9sKSB7XHJcbiAgICB0aGlzLmFwcENvbnRyb2wgPSBhcHBDb250cm9sO1xyXG4gICAgdGhpcy5zdG9yYWdlID0gbmV3IFN0YXRTdG9yYWdlKGFwcENvbnRyb2wudG9waWNzQXJyLCBhcHBDb250cm9sLmNhcmRzQXJyKTtcclxuICAgIHRoaXMuc29ydGVkID0gZmFsc2U7XHJcbiAgICB0aGlzLnNvcnRUeXBlID0gbnVsbDtcclxuICAgIHRoaXMuc29ydFByb3BlcnR5ID0gbnVsbDtcclxuICAgIHRoaXMuZWxlbWVudCA9IG51bGw7XHJcbiAgICB0aGlzLnByb3BzTGliID0ge1xyXG4gICAgICBDYXRlZ29yeTogJ3RvcGljJyxcclxuICAgICAgV29yZDogJ3dvcmQnLFxyXG4gICAgICBUcmFuc2xhdGlvbjogJ3RyYW5zbGF0aW9uJyxcclxuICAgICAgVHJhaW46ICd0cmFpbkNsaWNrJyxcclxuICAgICAgQ29ycmVjdDogJ2NvcnJlY3RBbnN3ZXJzJyxcclxuICAgICAgTWlzdGFrZXM6ICdtaXN0YWtlcycsXHJcbiAgICAgICclJzogJ3BlcmNlbnRhZ2UnLFxyXG4gICAgfTtcclxuICAgIHRoaXMuYnVpbGQoKTtcclxuICB9XHJcblxyXG4gIGJ1aWxkKGRhdGFBcnIgPSB0aGlzLnN0b3JhZ2Uuc3RhdEFycikge1xyXG4gICAgY29uc3QgY2xhc3NOYW1lcyA9ICdzdGF0LWNvbnRhaW5lcic7XHJcbiAgICBjb25zdCBzdGF0Q29udGVudEVsZW1lbnQgPSAodGhpcy5hcHBDb250cm9sLmNvbnRlbnQudHlwZSA9PT0gJ3N0YXRpc3RpYycpXHJcbiAgICAgID8gdGhpcy5jcmVhdGVUYWJsZUVsZW1lbnQoZGF0YUFycilcclxuICAgICAgOiB0aGlzLmNyZWF0ZVRyYWluRGlmZkNvbnRhaW5lcigpO1xyXG5cclxuICAgIGNvbnN0IHRlbXBsYXRlID0gYFxyXG4gICAgICAgICAgICAgICAgICAgICAgPGgyPkdhbWUgU3RhdGlzdGljPC9oMj5cclxuICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJzdGF0LWJ1dHRvbnMtd3JhcHBlclwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiYnV0dG9uIHN0YXQtYnV0dG9uIHRyYWluLWRpZmZcIj5UcmFpbiBkaWZmaWN1bHQgd29yZHM8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImJ1dHRvbiBzdGF0LWJ1dHRvbiByZXNldC1zdGF0XCI+UmVzZXQgc3RhdHM8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgIGA7XHJcblxyXG4gICAgY29uc3Qgc3RhdEVsZW1lbnQgPSBjcmVhdGVDdXN0b21FbGVtZW50KCdkaXYnLCBjbGFzc05hbWVzLCB0ZW1wbGF0ZSk7XHJcblxyXG4gICAgc3RhdEVsZW1lbnQuYXBwZW5kKHN0YXRDb250ZW50RWxlbWVudCk7XHJcbiAgICB0aGlzLmVsZW1lbnQgPSBzdGF0RWxlbWVudDtcclxuICAgIHJldHVybiB0aGlzO1xyXG4gIH1cclxuXHJcbiAgY3JlYXRlVGFibGVFbGVtZW50KGRhdGFBcnIpIHtcclxuICAgIGNvbnN0IHRhYmxlRWxlbWVudCA9IGNyZWF0ZUN1c3RvbUVsZW1lbnQoJ2RpdicsICd0YWJsZS13cmFwcGVyJyk7XHJcblxyXG4gICAgbGV0IHRhYmxlQm9keUlubmVyID0gJyc7XHJcbiAgICBkYXRhQXJyLmZvckVhY2goKHdvcmRPYmopID0+IHtcclxuICAgICAgY29uc3Qgcm93VGVtcGxhdGUgPSBgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgPHRyPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRkPiR7d29yZE9iai50b3BpY308L3RoPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRkPiR7d29yZE9iai53b3JkfTwvdGg+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dGQ+JHt3b3JkT2JqLnRyYW5zbGF0aW9ufTwvdGg+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dGQ+JHt3b3JkT2JqLnRyYWluQ2xpY2t9PC90aD5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0ZD4ke3dvcmRPYmouY29ycmVjdEFuc3dlcnN9PC90aD5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0ZD4ke3dvcmRPYmoubWlzdGFrZXN9PC90aD5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0ZD4ke3dvcmRPYmoucGVyY2VudGFnZX0gJTwvdGg+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgPC90cj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICBgO1xyXG4gICAgICB0YWJsZUJvZHlJbm5lciArPSByb3dUZW1wbGF0ZTtcclxuICAgIH0pO1xyXG5cclxuICAgIGNvbnN0IHRoQ2xhc3NOYW1lcyA9ICdidXR0b24gc29ydGFibGUnO1xyXG4gICAgY29uc3QgdGhUaXRsZSA9ICdzb3J0JztcclxuICAgIGxldCB0aGVhZFJvd0lubmVyID0gJyc7XHJcblxyXG4gICAgT2JqZWN0LmVudHJpZXModGhpcy5wcm9wc0xpYikuZm9yRWFjaCgoW2NvbHVtbk5hbWUsIHByb3BOYW1lXSkgPT4ge1xyXG4gICAgICBsZXQgc29ydENsYXNzTmFtZSA9ICcnO1xyXG4gICAgICBsZXQgaW1hZ2VIVE1MID0gJyc7XHJcblxyXG4gICAgICBpZiAodGhpcy5zb3J0ZWQgJiYgKHRoaXMuc29ydFByb3BlcnR5ID09PSBwcm9wTmFtZSkpIHtcclxuICAgICAgICBzb3J0Q2xhc3NOYW1lID0gYCBzb3J0ZWQtJHt0aGlzLnNvcnRUeXBlfWA7XHJcbiAgICAgICAgY29uc3QgaW1hZ2VOYW1lID0gKHRoaXMuc29ydFR5cGUgPT09ICdkb3duJykgPyAnc29ydC1hc2MnIDogJ3NvcnQtZGVzYyc7XHJcbiAgICAgICAgaW1hZ2VIVE1MID0gYFxyXG4gICAgICAgICAgICAgICAgICAgIDxpbWcgY2xhc3M9XCJzb3J0LWljb24gYnV0dG9uIHNvcnRhYmxlXCIgc3JjPS4uL2Fzc2V0cy9pY29ucy8ke2ltYWdlTmFtZX0ucG5nIGFsdD1cInNvcnQgaWNvblwiIHdpZHRoPVwiNTFcIiBoZWlnaHQ9XCI1MVwiPjwvaW1nPlxyXG4gICAgICAgICAgICAgICAgICAgIGA7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHRoZWFkUm93SW5uZXIgKz0gYFxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8dGggY2xhc3M9XCJ0aGVhZCAke3RoQ2xhc3NOYW1lc30ke3NvcnRDbGFzc05hbWV9XCIgdGl0bGU9XCIke3RoVGl0bGV9XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJ0aE5hbWUgYnV0dG9uIHNvcnRhYmxlXCI+JHtjb2x1bW5OYW1lfTwvc3Bhbj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAke2ltYWdlSFRNTH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgPC90aD5cclxuICAgICAgICAgICAgICAgICAgICAgICAgYDtcclxuICAgIH0pO1xyXG5cclxuICAgIGNvbnN0IHRhYmxlSW5uZXJIVE1MID0gYFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIDx0YWJsZSBjbGFzcz1cInN0YXQtdGFibGVcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0aGVhZD5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRyPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICR7dGhlYWRSb3dJbm5lcn1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC90cj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvdGhlYWQ+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dGJvZHk+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICR7dGFibGVCb2R5SW5uZXJ9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3Rib2R5PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIDwvdGFibGU+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGA7XHJcblxyXG4gICAgdGFibGVFbGVtZW50LmlubmVySFRNTCA9IHRhYmxlSW5uZXJIVE1MO1xyXG5cclxuICAgIHJldHVybiB0YWJsZUVsZW1lbnQ7XHJcbiAgfVxyXG5cclxuICBjcmVhdGVUcmFpbkRpZmZDb250YWluZXIoKSB7XHJcbiAgICBsZXQgcmVzdWx0RWxlbWVudDtcclxuICAgIGNvbnN0IGRpZmZXb3Jkc0FyciA9IHRoaXMuc3RvcmFnZS5nZXREaWZmV29yZHNBcnIoKTtcclxuICAgIGNvbnN0IGRpZmZXb3Jkc0Ftb3VudCA9IGRpZmZXb3Jkc0Fyci5sZW5ndGg7XHJcblxyXG4gICAgc3dpdGNoIChkaWZmV29yZHNBbW91bnQpIHtcclxuICAgICAgY2FzZSAwOiB7XHJcbiAgICAgICAgY29uc3QgdGVtcGxhdGUgPSBgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImdyYXBoaWNcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxpbWcgc3JjPVwiLi4vYXNzZXRzL2ltZy9hcHAvc3VwZXIucG5nXCIgYWx0PVwic3VwZXIgcmVzdWx0XCIgd2lkdGg9XCI3NTNcIiBoZWlnaHQ9XCI1NTNcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICA8cD5Ob3RoaW5nIGRpZmZpY3VsdCE8L3A+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGA7XHJcblxyXG4gICAgICAgIHJlc3VsdEVsZW1lbnQgPSBjcmVhdGVDdXN0b21FbGVtZW50KCdkaXYnLCAnbm90aGluZy1kaWZmJywgdGVtcGxhdGUpO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICB9XHJcbiAgICAgIGRlZmF1bHQ6IHtcclxuICAgICAgICBjb25zdCBjYXJkc0NvbnRhaW5lckVsZW1lbnQgPSBjcmVhdGVDdXN0b21FbGVtZW50KCdkaXYnLCAnY2FyZC1jb250YWluZXInKTtcclxuICAgICAgICBjb25zdCBtYXhDYXJkc0Ftb3VudCA9IDg7XHJcbiAgICAgICAgY29uc3QgY2FyZHNBbW91bnQgPSAoZGlmZldvcmRzQXJyLmxlbmd0aCA8IG1heENhcmRzQW1vdW50KVxyXG4gICAgICAgICAgPyBkaWZmV29yZHNBbW91bnRcclxuICAgICAgICAgIDogbWF4Q2FyZHNBbW91bnQ7XHJcblxyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgY2FyZHNBbW91bnQ7IGkgKz0gMSkge1xyXG4gICAgICAgICAgY29uc3QgY2FyZE9iaiA9IGRpZmZXb3Jkc0FycltpXTtcclxuICAgICAgICAgIGNvbnN0IGNhcmRFbGVtZW50ID0gbmV3IENhcmQodGhpcy5hcHBDb250cm9sLCBjYXJkT2JqLCAndG9waWMnKS5lbGVtZW50O1xyXG4gICAgICAgICAgY2FyZHNDb250YWluZXJFbGVtZW50LmFwcGVuZChjYXJkRWxlbWVudCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXN1bHRFbGVtZW50ID0gY2FyZHNDb250YWluZXJFbGVtZW50O1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHJlc3VsdEVsZW1lbnQ7XHJcbiAgfVxyXG5cclxuICBzb3J0VGFibGUodGFyZ2V0RWxlbWVudCkge1xyXG4gICAgY29uc3QgdGhIZWFkRWxlbWVudCA9IHRoaXMuZ2V0VGhlYWRCeVRhcmdldCh0YXJnZXRFbGVtZW50KTtcclxuICAgIHRoaXMuc29ydGVkID0gdHJ1ZTtcclxuICAgIHRoaXMuc29ydFR5cGUgPSAoIXRoSGVhZEVsZW1lbnQuY2xhc3NMaXN0LmNvbnRhaW5zKCdzb3J0ZWQtZG93bicpKSA/ICdkb3duJyA6ICd1cCc7XHJcbiAgICBjb25zdCB0aE5hbWUgPSB0aEhlYWRFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJy50aE5hbWUnKS5pbm5lckhUTUw7XHJcbiAgICB0aGlzLnNvcnRQcm9wZXJ0eSA9IHRoaXMucHJvcHNMaWJbdGhOYW1lXTtcclxuICAgIGNvbnN0IHNvcnRlZEFyciA9IHRoaXMuc3RvcmFnZS5nZXRTb3J0ZWRBcnJCeVByb3AodGhpcy5zb3J0UHJvcGVydHksIHRoaXMuc29ydFR5cGUpO1xyXG4gICAgdGhpcy5idWlsZChzb3J0ZWRBcnIpO1xyXG4gICAgcmV0dXJuIHRoaXM7XHJcbiAgfVxyXG5cclxuICBnZXRUaGVhZEJ5VGFyZ2V0KHRhcmdldEVsZW1lbnQpIHtcclxuICAgIGxldCBzZWFyY2hFbGVtZW50ID0gdGFyZ2V0RWxlbWVudDtcclxuICAgIHdoaWxlICghc2VhcmNoRWxlbWVudC5jbGFzc0xpc3QuY29udGFpbnMoJ3RoZWFkJykpIHtcclxuICAgICAgc2VhcmNoRWxlbWVudCA9IHNlYXJjaEVsZW1lbnQucGFyZW50RWxlbWVudDtcclxuICAgIH1cclxuICAgIHJldHVybiBzZWFyY2hFbGVtZW50O1xyXG4gIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgU3RhdGlzdGljO1xyXG4iLCIvKiBlc2xpbnQtZGlzYWJsZSBsaW5lYnJlYWstc3R5bGUgKi9cclxuLyogZXNsaW50LWRpc2FibGUgbm8tY29uc29sZSAqL1xyXG4vKiBlc2xpbnQtZGlzYWJsZSBsaW5lYnJlYWstc3R5bGUgKi9cclxuLyogZXNsaW50LWRpc2FibGUgbm8tdW5kZWYgKi9cclxuXHJcbmltcG9ydCB7IGNyZWF0ZUN1c3RvbUVsZW1lbnQgfSBmcm9tICcuL2NvbW1vbkZ1bmN0JztcclxuXHJcbmNsYXNzIFN3aXRjaCB7XHJcbiAgY29uc3RydWN0b3IoYXBwQ3RybE9iaikge1xyXG4gICAgdGhpcy52YWxpZE1vZGVzID0gWyd0cmFpbicsICdwbGF5J107XHJcbiAgICB0aGlzLmFjdGl2ZU1vZGUgPSAndHJhaW4nO1xyXG4gICAgdGhpcy5hcHBDb250cm9sID0gYXBwQ3RybE9iajtcclxuICAgIHRoaXMuZWxlbWVudCA9IG51bGw7XHJcbiAgICB0aGlzLmJ1aWxkKCk7XHJcbiAgfVxyXG5cclxuICBidWlsZCgpIHtcclxuICAgIGNvbnN0IGNsYXNzTmFtZXMgPSAnYnV0dG9uIHN3aXRjaCc7XHJcbiAgICBjb25zdCB0ZW1wbGF0ZSA9IGBcclxuICAgICAgICAgICAgICAgICAgICA8cCBjbGFzcz1cInN3aXRjaC10cmlnZ2VyXCI+VHJhaW48L3A+XHJcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInN3aXRjaC1yYWlsXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwic3dpdGNoLXJvbGxlclwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgPHAgY2xhc3M9XCJzd2l0Y2gtdHJpZ2dlclwiPlBsYXk8L3A+XHJcbiAgICAgICAgICAgICAgICAgICAgYDtcclxuXHJcbiAgICB0aGlzLmVsZW1lbnQgPSBjcmVhdGVDdXN0b21FbGVtZW50KCdkaXYnLCBjbGFzc05hbWVzLCB0ZW1wbGF0ZSk7XHJcbiAgICByZXR1cm4gdGhpcztcclxuICB9XHJcblxyXG4gIGFkZFRvRG9jKCkge1xyXG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm1haW4tY29udHJvbHMnKS5hcHBlbmQodGhpcy5lbGVtZW50KTtcclxuICAgIHJldHVybiB0aGlzO1xyXG4gIH1cclxuXHJcbiAgdG9nZ2xlKCkge1xyXG4gICAgdGhpcy5lbGVtZW50LmNsYXNzTGlzdC50b2dnbGUoJ3N3aXRjaC1vbicpO1xyXG4gICAgdGhpcy5hY3RpdmVNb2RlID0gKHRoaXMuYWN0aXZlTW9kZSA9PT0gJ3BsYXknKSA/ICd0cmFpbicgOiAncGxheSc7XHJcbiAgfVxyXG5cclxuICB0cmFpbigpIHtcclxuICAgIHRoaXMuZWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKCdzd2l0Y2gtb24nKTtcclxuICAgIHRoaXMuYWN0aXZlTW9kZSA9ICd0cmFpbic7XHJcbiAgfVxyXG5cclxuICBlbmFibGUoKSB7XHJcbiAgICB0aGlzLmVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZSgnZGlzYWJsZWQnKTtcclxuICB9XHJcblxyXG4gIGRpc2FibGUoKSB7XHJcbiAgICB0aGlzLmVsZW1lbnQuY2xhc3NMaXN0LmFkZCgnZGlzYWJsZWQnKTtcclxuICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IFN3aXRjaDtcclxuIiwiLy8gSW1wb3J0c1xuaW1wb3J0IF9fX0NTU19MT0FERVJfQVBJX1NPVVJDRU1BUF9JTVBPUlRfX18gZnJvbSBcIi4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9zb3VyY2VNYXBzLmpzXCI7XG5pbXBvcnQgX19fQ1NTX0xPQURFUl9BUElfSU1QT1JUX19fIGZyb20gXCIuLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvYXBpLmpzXCI7XG52YXIgX19fQ1NTX0xPQURFUl9FWFBPUlRfX18gPSBfX19DU1NfTE9BREVSX0FQSV9JTVBPUlRfX18oX19fQ1NTX0xPQURFUl9BUElfU09VUkNFTUFQX0lNUE9SVF9fXyk7XG4vLyBNb2R1bGVcbl9fX0NTU19MT0FERVJfRVhQT1JUX19fLnB1c2goW21vZHVsZS5pZCwgXCIvKiEgbm9ybWFsaXplLmNzcyB2OC4wLjEgfCBNSVQgTGljZW5zZSB8IGdpdGh1Yi5jb20vbmVjb2xhcy9ub3JtYWxpemUuY3NzICovXFxyXFxuXFxyXFxuLyogRG9jdW1lbnRcXHJcXG4gICA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PSAqL1xcclxcblxcclxcbi8qKlxcclxcbiAqIDEuIENvcnJlY3QgdGhlIGxpbmUgaGVpZ2h0IGluIGFsbCBicm93c2Vycy5cXHJcXG4gKiAyLiBQcmV2ZW50IGFkanVzdG1lbnRzIG9mIGZvbnQgc2l6ZSBhZnRlciBvcmllbnRhdGlvbiBjaGFuZ2VzIGluIGlPUy5cXHJcXG4gKi9cXHJcXG5cXHJcXG5odG1sIHtcXHJcXG4gIGxpbmUtaGVpZ2h0OiAxLjE1OyAvKiAxICovXFxyXFxuICAtd2Via2l0LXRleHQtc2l6ZS1hZGp1c3Q6IDEwMCU7IC8qIDIgKi9cXHJcXG59XFxyXFxuXFxyXFxuLyogU2VjdGlvbnNcXHJcXG4gICA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PSAqL1xcclxcblxcclxcbi8qKlxcclxcbiAqIFJlbW92ZSB0aGUgbWFyZ2luIGluIGFsbCBicm93c2Vycy5cXHJcXG4gKi9cXHJcXG5cXHJcXG5ib2R5IHtcXHJcXG4gIG1hcmdpbjogMDtcXHJcXG59XFxyXFxuXFxyXFxuLyoqXFxyXFxuICogUmVuZGVyIHRoZSBgbWFpbmAgZWxlbWVudCBjb25zaXN0ZW50bHkgaW4gSUUuXFxyXFxuICovXFxyXFxuXFxyXFxubWFpbiB7XFxyXFxuICBkaXNwbGF5OiBibG9jaztcXHJcXG59XFxyXFxuXFxyXFxuLyoqXFxyXFxuICogQ29ycmVjdCB0aGUgZm9udCBzaXplIGFuZCBtYXJnaW4gb24gYGgxYCBlbGVtZW50cyB3aXRoaW4gYHNlY3Rpb25gIGFuZFxcclxcbiAqIGBhcnRpY2xlYCBjb250ZXh0cyBpbiBDaHJvbWUsIEZpcmVmb3gsIGFuZCBTYWZhcmkuXFxyXFxuICovXFxyXFxuXFxyXFxuaDEge1xcclxcbiAgZm9udC1zaXplOiAyZW07XFxyXFxuICBtYXJnaW46IDAuNjdlbSAwO1xcclxcbn1cXHJcXG5cXHJcXG4vKiBHcm91cGluZyBjb250ZW50XFxyXFxuICAgPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0gKi9cXHJcXG5cXHJcXG4vKipcXHJcXG4gKiAxLiBBZGQgdGhlIGNvcnJlY3QgYm94IHNpemluZyBpbiBGaXJlZm94LlxcclxcbiAqIDIuIFNob3cgdGhlIG92ZXJmbG93IGluIEVkZ2UgYW5kIElFLlxcclxcbiAqL1xcclxcblxcclxcbmhyIHtcXHJcXG4gIGJveC1zaXppbmc6IGNvbnRlbnQtYm94OyAvKiAxICovXFxyXFxuICBoZWlnaHQ6IDA7IC8qIDEgKi9cXHJcXG4gIG92ZXJmbG93OiB2aXNpYmxlOyAvKiAyICovXFxyXFxufVxcclxcblxcclxcbi8qKlxcclxcbiAqIDEuIENvcnJlY3QgdGhlIGluaGVyaXRhbmNlIGFuZCBzY2FsaW5nIG9mIGZvbnQgc2l6ZSBpbiBhbGwgYnJvd3NlcnMuXFxyXFxuICogMi4gQ29ycmVjdCB0aGUgb2RkIGBlbWAgZm9udCBzaXppbmcgaW4gYWxsIGJyb3dzZXJzLlxcclxcbiAqL1xcclxcblxcclxcbnByZSB7XFxyXFxuICBmb250LWZhbWlseTogbW9ub3NwYWNlLCBtb25vc3BhY2U7IC8qIDEgKi9cXHJcXG4gIGZvbnQtc2l6ZTogMWVtOyAvKiAyICovXFxyXFxufVxcclxcblxcclxcbi8qIFRleHQtbGV2ZWwgc2VtYW50aWNzXFxyXFxuICAgPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0gKi9cXHJcXG5cXHJcXG4vKipcXHJcXG4gKiBSZW1vdmUgdGhlIGdyYXkgYmFja2dyb3VuZCBvbiBhY3RpdmUgbGlua3MgaW4gSUUgMTAuXFxyXFxuICovXFxyXFxuXFxyXFxuYSB7XFxyXFxuICBiYWNrZ3JvdW5kLWNvbG9yOiB0cmFuc3BhcmVudDtcXHJcXG59XFxyXFxuXFxyXFxuLyoqXFxyXFxuICogMS4gUmVtb3ZlIHRoZSBib3R0b20gYm9yZGVyIGluIENocm9tZSA1Ny1cXHJcXG4gKiAyLiBBZGQgdGhlIGNvcnJlY3QgdGV4dCBkZWNvcmF0aW9uIGluIENocm9tZSwgRWRnZSwgSUUsIE9wZXJhLCBhbmQgU2FmYXJpLlxcclxcbiAqL1xcclxcblxcclxcbmFiYnJbdGl0bGVdIHtcXHJcXG4gIGJvcmRlci1ib3R0b206IG5vbmU7IC8qIDEgKi9cXHJcXG4gIHRleHQtZGVjb3JhdGlvbjogdW5kZXJsaW5lOyAvKiAyICovXFxyXFxuICB0ZXh0LWRlY29yYXRpb246IHVuZGVybGluZSBkb3R0ZWQ7IC8qIDIgKi9cXHJcXG59XFxyXFxuXFxyXFxuLyoqXFxyXFxuICogQWRkIHRoZSBjb3JyZWN0IGZvbnQgd2VpZ2h0IGluIENocm9tZSwgRWRnZSwgYW5kIFNhZmFyaS5cXHJcXG4gKi9cXHJcXG5cXHJcXG5iLFxcclxcbnN0cm9uZyB7XFxyXFxuICBmb250LXdlaWdodDogYm9sZGVyO1xcclxcbn1cXHJcXG5cXHJcXG4vKipcXHJcXG4gKiAxLiBDb3JyZWN0IHRoZSBpbmhlcml0YW5jZSBhbmQgc2NhbGluZyBvZiBmb250IHNpemUgaW4gYWxsIGJyb3dzZXJzLlxcclxcbiAqIDIuIENvcnJlY3QgdGhlIG9kZCBgZW1gIGZvbnQgc2l6aW5nIGluIGFsbCBicm93c2Vycy5cXHJcXG4gKi9cXHJcXG5cXHJcXG5jb2RlLFxcclxcbmtiZCxcXHJcXG5zYW1wIHtcXHJcXG4gIGZvbnQtZmFtaWx5OiBtb25vc3BhY2UsIG1vbm9zcGFjZTsgLyogMSAqL1xcclxcbiAgZm9udC1zaXplOiAxZW07IC8qIDIgKi9cXHJcXG59XFxyXFxuXFxyXFxuLyoqXFxyXFxuICogQWRkIHRoZSBjb3JyZWN0IGZvbnQgc2l6ZSBpbiBhbGwgYnJvd3NlcnMuXFxyXFxuICovXFxyXFxuXFxyXFxuc21hbGwge1xcclxcbiAgZm9udC1zaXplOiA4MCU7XFxyXFxufVxcclxcblxcclxcbi8qKlxcclxcbiAqIFByZXZlbnQgYHN1YmAgYW5kIGBzdXBgIGVsZW1lbnRzIGZyb20gYWZmZWN0aW5nIHRoZSBsaW5lIGhlaWdodCBpblxcclxcbiAqIGFsbCBicm93c2Vycy5cXHJcXG4gKi9cXHJcXG5cXHJcXG5zdWIsXFxyXFxuc3VwIHtcXHJcXG4gIGZvbnQtc2l6ZTogNzUlO1xcclxcbiAgbGluZS1oZWlnaHQ6IDA7XFxyXFxuICBwb3NpdGlvbjogcmVsYXRpdmU7XFxyXFxuICB2ZXJ0aWNhbC1hbGlnbjogYmFzZWxpbmU7XFxyXFxufVxcclxcblxcclxcbnN1YiB7XFxyXFxuICBib3R0b206IC0wLjI1ZW07XFxyXFxufVxcclxcblxcclxcbnN1cCB7XFxyXFxuICB0b3A6IC0wLjVlbTtcXHJcXG59XFxyXFxuXFxyXFxuLyogRW1iZWRkZWQgY29udGVudFxcclxcbiAgID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09ICovXFxyXFxuXFxyXFxuLyoqXFxyXFxuICogUmVtb3ZlIHRoZSBib3JkZXIgb24gaW1hZ2VzIGluc2lkZSBsaW5rcyBpbiBJRSAxMC5cXHJcXG4gKi9cXHJcXG5cXHJcXG5pbWcge1xcclxcbiAgYm9yZGVyLXN0eWxlOiBub25lO1xcclxcbn1cXHJcXG5cXHJcXG4vKiBGb3Jtc1xcclxcbiAgID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09ICovXFxyXFxuXFxyXFxuLyoqXFxyXFxuICogMS4gQ2hhbmdlIHRoZSBmb250IHN0eWxlcyBpbiBhbGwgYnJvd3NlcnMuXFxyXFxuICogMi4gUmVtb3ZlIHRoZSBtYXJnaW4gaW4gRmlyZWZveCBhbmQgU2FmYXJpLlxcclxcbiAqL1xcclxcblxcclxcbmJ1dHRvbixcXHJcXG5pbnB1dCxcXHJcXG5vcHRncm91cCxcXHJcXG5zZWxlY3QsXFxyXFxudGV4dGFyZWEge1xcclxcbiAgZm9udC1mYW1pbHk6IGluaGVyaXQ7IC8qIDEgKi9cXHJcXG4gIGZvbnQtc2l6ZTogMTAwJTsgLyogMSAqL1xcclxcbiAgbGluZS1oZWlnaHQ6IDEuMTU7IC8qIDEgKi9cXHJcXG4gIG1hcmdpbjogMDsgLyogMiAqL1xcclxcbn1cXHJcXG5cXHJcXG4vKipcXHJcXG4gKiBTaG93IHRoZSBvdmVyZmxvdyBpbiBJRS5cXHJcXG4gKiAxLiBTaG93IHRoZSBvdmVyZmxvdyBpbiBFZGdlLlxcclxcbiAqL1xcclxcblxcclxcbmJ1dHRvbixcXHJcXG5pbnB1dCB7IC8qIDEgKi9cXHJcXG4gIG92ZXJmbG93OiB2aXNpYmxlO1xcclxcbn1cXHJcXG5cXHJcXG4vKipcXHJcXG4gKiBSZW1vdmUgdGhlIGluaGVyaXRhbmNlIG9mIHRleHQgdHJhbnNmb3JtIGluIEVkZ2UsIEZpcmVmb3gsIGFuZCBJRS5cXHJcXG4gKiAxLiBSZW1vdmUgdGhlIGluaGVyaXRhbmNlIG9mIHRleHQgdHJhbnNmb3JtIGluIEZpcmVmb3guXFxyXFxuICovXFxyXFxuXFxyXFxuYnV0dG9uLFxcclxcbnNlbGVjdCB7IC8qIDEgKi9cXHJcXG4gIHRleHQtdHJhbnNmb3JtOiBub25lO1xcclxcbn1cXHJcXG5cXHJcXG4vKipcXHJcXG4gKiBDb3JyZWN0IHRoZSBpbmFiaWxpdHkgdG8gc3R5bGUgY2xpY2thYmxlIHR5cGVzIGluIGlPUyBhbmQgU2FmYXJpLlxcclxcbiAqL1xcclxcblxcclxcbmJ1dHRvbixcXHJcXG5bdHlwZT1cXFwiYnV0dG9uXFxcIl0sXFxyXFxuW3R5cGU9XFxcInJlc2V0XFxcIl0sXFxyXFxuW3R5cGU9XFxcInN1Ym1pdFxcXCJdIHtcXHJcXG4gIC13ZWJraXQtYXBwZWFyYW5jZTogYnV0dG9uO1xcclxcbn1cXHJcXG5cXHJcXG4vKipcXHJcXG4gKiBSZW1vdmUgdGhlIGlubmVyIGJvcmRlciBhbmQgcGFkZGluZyBpbiBGaXJlZm94LlxcclxcbiAqL1xcclxcblxcclxcbmJ1dHRvbjo6LW1vei1mb2N1cy1pbm5lcixcXHJcXG5bdHlwZT1cXFwiYnV0dG9uXFxcIl06Oi1tb3otZm9jdXMtaW5uZXIsXFxyXFxuW3R5cGU9XFxcInJlc2V0XFxcIl06Oi1tb3otZm9jdXMtaW5uZXIsXFxyXFxuW3R5cGU9XFxcInN1Ym1pdFxcXCJdOjotbW96LWZvY3VzLWlubmVyIHtcXHJcXG4gIGJvcmRlci1zdHlsZTogbm9uZTtcXHJcXG4gIHBhZGRpbmc6IDA7XFxyXFxufVxcclxcblxcclxcbi8qKlxcclxcbiAqIFJlc3RvcmUgdGhlIGZvY3VzIHN0eWxlcyB1bnNldCBieSB0aGUgcHJldmlvdXMgcnVsZS5cXHJcXG4gKi9cXHJcXG5cXHJcXG5idXR0b246LW1vei1mb2N1c3JpbmcsXFxyXFxuW3R5cGU9XFxcImJ1dHRvblxcXCJdOi1tb3otZm9jdXNyaW5nLFxcclxcblt0eXBlPVxcXCJyZXNldFxcXCJdOi1tb3otZm9jdXNyaW5nLFxcclxcblt0eXBlPVxcXCJzdWJtaXRcXFwiXTotbW96LWZvY3VzcmluZyB7XFxyXFxuICBvdXRsaW5lOiAxcHggZG90dGVkIEJ1dHRvblRleHQ7XFxyXFxufVxcclxcblxcclxcbi8qKlxcclxcbiAqIENvcnJlY3QgdGhlIHBhZGRpbmcgaW4gRmlyZWZveC5cXHJcXG4gKi9cXHJcXG5cXHJcXG5maWVsZHNldCB7XFxyXFxuICBwYWRkaW5nOiAwLjM1ZW0gMC43NWVtIDAuNjI1ZW07XFxyXFxufVxcclxcblxcclxcbi8qKlxcclxcbiAqIDEuIENvcnJlY3QgdGhlIHRleHQgd3JhcHBpbmcgaW4gRWRnZSBhbmQgSUUuXFxyXFxuICogMi4gQ29ycmVjdCB0aGUgY29sb3IgaW5oZXJpdGFuY2UgZnJvbSBgZmllbGRzZXRgIGVsZW1lbnRzIGluIElFLlxcclxcbiAqIDMuIFJlbW92ZSB0aGUgcGFkZGluZyBzbyBkZXZlbG9wZXJzIGFyZSBub3QgY2F1Z2h0IG91dCB3aGVuIHRoZXkgemVybyBvdXRcXHJcXG4gKiAgICBgZmllbGRzZXRgIGVsZW1lbnRzIGluIGFsbCBicm93c2Vycy5cXHJcXG4gKi9cXHJcXG5cXHJcXG5sZWdlbmQge1xcclxcbiAgYm94LXNpemluZzogYm9yZGVyLWJveDsgLyogMSAqL1xcclxcbiAgY29sb3I6IGluaGVyaXQ7IC8qIDIgKi9cXHJcXG4gIGRpc3BsYXk6IHRhYmxlOyAvKiAxICovXFxyXFxuICBtYXgtd2lkdGg6IDEwMCU7IC8qIDEgKi9cXHJcXG4gIHBhZGRpbmc6IDA7IC8qIDMgKi9cXHJcXG4gIHdoaXRlLXNwYWNlOiBub3JtYWw7IC8qIDEgKi9cXHJcXG59XFxyXFxuXFxyXFxuLyoqXFxyXFxuICogQWRkIHRoZSBjb3JyZWN0IHZlcnRpY2FsIGFsaWdubWVudCBpbiBDaHJvbWUsIEZpcmVmb3gsIGFuZCBPcGVyYS5cXHJcXG4gKi9cXHJcXG5cXHJcXG5wcm9ncmVzcyB7XFxyXFxuICB2ZXJ0aWNhbC1hbGlnbjogYmFzZWxpbmU7XFxyXFxufVxcclxcblxcclxcbi8qKlxcclxcbiAqIFJlbW92ZSB0aGUgZGVmYXVsdCB2ZXJ0aWNhbCBzY3JvbGxiYXIgaW4gSUUgMTArLlxcclxcbiAqL1xcclxcblxcclxcbnRleHRhcmVhIHtcXHJcXG4gIG92ZXJmbG93OiBhdXRvO1xcclxcbn1cXHJcXG5cXHJcXG4vKipcXHJcXG4gKiAxLiBBZGQgdGhlIGNvcnJlY3QgYm94IHNpemluZyBpbiBJRSAxMC5cXHJcXG4gKiAyLiBSZW1vdmUgdGhlIHBhZGRpbmcgaW4gSUUgMTAuXFxyXFxuICovXFxyXFxuXFxyXFxuW3R5cGU9XFxcImNoZWNrYm94XFxcIl0sXFxyXFxuW3R5cGU9XFxcInJhZGlvXFxcIl0ge1xcclxcbiAgYm94LXNpemluZzogYm9yZGVyLWJveDsgLyogMSAqL1xcclxcbiAgcGFkZGluZzogMDsgLyogMiAqL1xcclxcbn1cXHJcXG5cXHJcXG4vKipcXHJcXG4gKiBDb3JyZWN0IHRoZSBjdXJzb3Igc3R5bGUgb2YgaW5jcmVtZW50IGFuZCBkZWNyZW1lbnQgYnV0dG9ucyBpbiBDaHJvbWUuXFxyXFxuICovXFxyXFxuXFxyXFxuW3R5cGU9XFxcIm51bWJlclxcXCJdOjotd2Via2l0LWlubmVyLXNwaW4tYnV0dG9uLFxcclxcblt0eXBlPVxcXCJudW1iZXJcXFwiXTo6LXdlYmtpdC1vdXRlci1zcGluLWJ1dHRvbiB7XFxyXFxuICBoZWlnaHQ6IGF1dG87XFxyXFxufVxcclxcblxcclxcbi8qKlxcclxcbiAqIDEuIENvcnJlY3QgdGhlIG9kZCBhcHBlYXJhbmNlIGluIENocm9tZSBhbmQgU2FmYXJpLlxcclxcbiAqIDIuIENvcnJlY3QgdGhlIG91dGxpbmUgc3R5bGUgaW4gU2FmYXJpLlxcclxcbiAqL1xcclxcblxcclxcblt0eXBlPVxcXCJzZWFyY2hcXFwiXSB7XFxyXFxuICAtd2Via2l0LWFwcGVhcmFuY2U6IHRleHRmaWVsZDsgLyogMSAqL1xcclxcbiAgb3V0bGluZS1vZmZzZXQ6IC0ycHg7IC8qIDIgKi9cXHJcXG59XFxyXFxuXFxyXFxuLyoqXFxyXFxuICogUmVtb3ZlIHRoZSBpbm5lciBwYWRkaW5nIGluIENocm9tZSBhbmQgU2FmYXJpIG9uIG1hY09TLlxcclxcbiAqL1xcclxcblxcclxcblt0eXBlPVxcXCJzZWFyY2hcXFwiXTo6LXdlYmtpdC1zZWFyY2gtZGVjb3JhdGlvbiB7XFxyXFxuICAtd2Via2l0LWFwcGVhcmFuY2U6IG5vbmU7XFxyXFxufVxcclxcblxcclxcbi8qKlxcclxcbiAqIDEuIENvcnJlY3QgdGhlIGluYWJpbGl0eSB0byBzdHlsZSBjbGlja2FibGUgdHlwZXMgaW4gaU9TIGFuZCBTYWZhcmkuXFxyXFxuICogMi4gQ2hhbmdlIGZvbnQgcHJvcGVydGllcyB0byBgaW5oZXJpdGAgaW4gU2FmYXJpLlxcclxcbiAqL1xcclxcblxcclxcbjo6LXdlYmtpdC1maWxlLXVwbG9hZC1idXR0b24ge1xcclxcbiAgLXdlYmtpdC1hcHBlYXJhbmNlOiBidXR0b247IC8qIDEgKi9cXHJcXG4gIGZvbnQ6IGluaGVyaXQ7IC8qIDIgKi9cXHJcXG59XFxyXFxuXFxyXFxuLyogSW50ZXJhY3RpdmVcXHJcXG4gICA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PSAqL1xcclxcblxcclxcbi8qXFxyXFxuICogQWRkIHRoZSBjb3JyZWN0IGRpc3BsYXkgaW4gRWRnZSwgSUUgMTArLCBhbmQgRmlyZWZveC5cXHJcXG4gKi9cXHJcXG5cXHJcXG5kZXRhaWxzIHtcXHJcXG4gIGRpc3BsYXk6IGJsb2NrO1xcclxcbn1cXHJcXG5cXHJcXG4vKlxcclxcbiAqIEFkZCB0aGUgY29ycmVjdCBkaXNwbGF5IGluIGFsbCBicm93c2Vycy5cXHJcXG4gKi9cXHJcXG5cXHJcXG5zdW1tYXJ5IHtcXHJcXG4gIGRpc3BsYXk6IGxpc3QtaXRlbTtcXHJcXG59XFxyXFxuXFxyXFxuLyogTWlzY1xcclxcbiAgID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09ICovXFxyXFxuXFxyXFxuLyoqXFxyXFxuICogQWRkIHRoZSBjb3JyZWN0IGRpc3BsYXkgaW4gSUUgMTArLlxcclxcbiAqL1xcclxcblxcclxcbnRlbXBsYXRlIHtcXHJcXG4gIGRpc3BsYXk6IG5vbmU7XFxyXFxufVxcclxcblxcclxcbi8qKlxcclxcbiAqIEFkZCB0aGUgY29ycmVjdCBkaXNwbGF5IGluIElFIDEwLlxcclxcbiAqL1xcclxcblxcclxcbltoaWRkZW5dIHtcXHJcXG4gIGRpc3BsYXk6IG5vbmU7XFxyXFxufVxcclxcblwiLCBcIlwiLHtcInZlcnNpb25cIjozLFwic291cmNlc1wiOltcIndlYnBhY2s6Ly8uL2Fzc2V0cy9zdHlsZXMvbm9ybWFsaXplLmNzc1wiXSxcIm5hbWVzXCI6W10sXCJtYXBwaW5nc1wiOlwiQUFBQSwyRUFBMkU7O0FBRTNFOytFQUMrRTs7QUFFL0U7OztFQUdFOztBQUVGO0VBQ0UsaUJBQWlC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YUFBYTtBQUNmOztBQUVBOztFQUVFOztBQUVGO0VBQ0UsYUFBYTtBQUNmXCIsXCJzb3VyY2VzQ29udGVudFwiOltcIi8qISBub3JtYWxpemUuY3NzIHY4LjAuMSB8IE1JVCBMaWNlbnNlIHwgZ2l0aHViLmNvbS9uZWNvbGFzL25vcm1hbGl6ZS5jc3MgKi9cXHJcXG5cXHJcXG4vKiBEb2N1bWVudFxcclxcbiAgID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09ICovXFxyXFxuXFxyXFxuLyoqXFxyXFxuICogMS4gQ29ycmVjdCB0aGUgbGluZSBoZWlnaHQgaW4gYWxsIGJyb3dzZXJzLlxcclxcbiAqIDIuIFByZXZlbnQgYWRqdXN0bWVudHMgb2YgZm9udCBzaXplIGFmdGVyIG9yaWVudGF0aW9uIGNoYW5nZXMgaW4gaU9TLlxcclxcbiAqL1xcclxcblxcclxcbmh0bWwge1xcclxcbiAgbGluZS1oZWlnaHQ6IDEuMTU7IC8qIDEgKi9cXHJcXG4gIC13ZWJraXQtdGV4dC1zaXplLWFkanVzdDogMTAwJTsgLyogMiAqL1xcclxcbn1cXHJcXG5cXHJcXG4vKiBTZWN0aW9uc1xcclxcbiAgID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09ICovXFxyXFxuXFxyXFxuLyoqXFxyXFxuICogUmVtb3ZlIHRoZSBtYXJnaW4gaW4gYWxsIGJyb3dzZXJzLlxcclxcbiAqL1xcclxcblxcclxcbmJvZHkge1xcclxcbiAgbWFyZ2luOiAwO1xcclxcbn1cXHJcXG5cXHJcXG4vKipcXHJcXG4gKiBSZW5kZXIgdGhlIGBtYWluYCBlbGVtZW50IGNvbnNpc3RlbnRseSBpbiBJRS5cXHJcXG4gKi9cXHJcXG5cXHJcXG5tYWluIHtcXHJcXG4gIGRpc3BsYXk6IGJsb2NrO1xcclxcbn1cXHJcXG5cXHJcXG4vKipcXHJcXG4gKiBDb3JyZWN0IHRoZSBmb250IHNpemUgYW5kIG1hcmdpbiBvbiBgaDFgIGVsZW1lbnRzIHdpdGhpbiBgc2VjdGlvbmAgYW5kXFxyXFxuICogYGFydGljbGVgIGNvbnRleHRzIGluIENocm9tZSwgRmlyZWZveCwgYW5kIFNhZmFyaS5cXHJcXG4gKi9cXHJcXG5cXHJcXG5oMSB7XFxyXFxuICBmb250LXNpemU6IDJlbTtcXHJcXG4gIG1hcmdpbjogMC42N2VtIDA7XFxyXFxufVxcclxcblxcclxcbi8qIEdyb3VwaW5nIGNvbnRlbnRcXHJcXG4gICA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PSAqL1xcclxcblxcclxcbi8qKlxcclxcbiAqIDEuIEFkZCB0aGUgY29ycmVjdCBib3ggc2l6aW5nIGluIEZpcmVmb3guXFxyXFxuICogMi4gU2hvdyB0aGUgb3ZlcmZsb3cgaW4gRWRnZSBhbmQgSUUuXFxyXFxuICovXFxyXFxuXFxyXFxuaHIge1xcclxcbiAgYm94LXNpemluZzogY29udGVudC1ib3g7IC8qIDEgKi9cXHJcXG4gIGhlaWdodDogMDsgLyogMSAqL1xcclxcbiAgb3ZlcmZsb3c6IHZpc2libGU7IC8qIDIgKi9cXHJcXG59XFxyXFxuXFxyXFxuLyoqXFxyXFxuICogMS4gQ29ycmVjdCB0aGUgaW5oZXJpdGFuY2UgYW5kIHNjYWxpbmcgb2YgZm9udCBzaXplIGluIGFsbCBicm93c2Vycy5cXHJcXG4gKiAyLiBDb3JyZWN0IHRoZSBvZGQgYGVtYCBmb250IHNpemluZyBpbiBhbGwgYnJvd3NlcnMuXFxyXFxuICovXFxyXFxuXFxyXFxucHJlIHtcXHJcXG4gIGZvbnQtZmFtaWx5OiBtb25vc3BhY2UsIG1vbm9zcGFjZTsgLyogMSAqL1xcclxcbiAgZm9udC1zaXplOiAxZW07IC8qIDIgKi9cXHJcXG59XFxyXFxuXFxyXFxuLyogVGV4dC1sZXZlbCBzZW1hbnRpY3NcXHJcXG4gICA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PSAqL1xcclxcblxcclxcbi8qKlxcclxcbiAqIFJlbW92ZSB0aGUgZ3JheSBiYWNrZ3JvdW5kIG9uIGFjdGl2ZSBsaW5rcyBpbiBJRSAxMC5cXHJcXG4gKi9cXHJcXG5cXHJcXG5hIHtcXHJcXG4gIGJhY2tncm91bmQtY29sb3I6IHRyYW5zcGFyZW50O1xcclxcbn1cXHJcXG5cXHJcXG4vKipcXHJcXG4gKiAxLiBSZW1vdmUgdGhlIGJvdHRvbSBib3JkZXIgaW4gQ2hyb21lIDU3LVxcclxcbiAqIDIuIEFkZCB0aGUgY29ycmVjdCB0ZXh0IGRlY29yYXRpb24gaW4gQ2hyb21lLCBFZGdlLCBJRSwgT3BlcmEsIGFuZCBTYWZhcmkuXFxyXFxuICovXFxyXFxuXFxyXFxuYWJiclt0aXRsZV0ge1xcclxcbiAgYm9yZGVyLWJvdHRvbTogbm9uZTsgLyogMSAqL1xcclxcbiAgdGV4dC1kZWNvcmF0aW9uOiB1bmRlcmxpbmU7IC8qIDIgKi9cXHJcXG4gIHRleHQtZGVjb3JhdGlvbjogdW5kZXJsaW5lIGRvdHRlZDsgLyogMiAqL1xcclxcbn1cXHJcXG5cXHJcXG4vKipcXHJcXG4gKiBBZGQgdGhlIGNvcnJlY3QgZm9udCB3ZWlnaHQgaW4gQ2hyb21lLCBFZGdlLCBhbmQgU2FmYXJpLlxcclxcbiAqL1xcclxcblxcclxcbmIsXFxyXFxuc3Ryb25nIHtcXHJcXG4gIGZvbnQtd2VpZ2h0OiBib2xkZXI7XFxyXFxufVxcclxcblxcclxcbi8qKlxcclxcbiAqIDEuIENvcnJlY3QgdGhlIGluaGVyaXRhbmNlIGFuZCBzY2FsaW5nIG9mIGZvbnQgc2l6ZSBpbiBhbGwgYnJvd3NlcnMuXFxyXFxuICogMi4gQ29ycmVjdCB0aGUgb2RkIGBlbWAgZm9udCBzaXppbmcgaW4gYWxsIGJyb3dzZXJzLlxcclxcbiAqL1xcclxcblxcclxcbmNvZGUsXFxyXFxua2JkLFxcclxcbnNhbXAge1xcclxcbiAgZm9udC1mYW1pbHk6IG1vbm9zcGFjZSwgbW9ub3NwYWNlOyAvKiAxICovXFxyXFxuICBmb250LXNpemU6IDFlbTsgLyogMiAqL1xcclxcbn1cXHJcXG5cXHJcXG4vKipcXHJcXG4gKiBBZGQgdGhlIGNvcnJlY3QgZm9udCBzaXplIGluIGFsbCBicm93c2Vycy5cXHJcXG4gKi9cXHJcXG5cXHJcXG5zbWFsbCB7XFxyXFxuICBmb250LXNpemU6IDgwJTtcXHJcXG59XFxyXFxuXFxyXFxuLyoqXFxyXFxuICogUHJldmVudCBgc3ViYCBhbmQgYHN1cGAgZWxlbWVudHMgZnJvbSBhZmZlY3RpbmcgdGhlIGxpbmUgaGVpZ2h0IGluXFxyXFxuICogYWxsIGJyb3dzZXJzLlxcclxcbiAqL1xcclxcblxcclxcbnN1YixcXHJcXG5zdXAge1xcclxcbiAgZm9udC1zaXplOiA3NSU7XFxyXFxuICBsaW5lLWhlaWdodDogMDtcXHJcXG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcXHJcXG4gIHZlcnRpY2FsLWFsaWduOiBiYXNlbGluZTtcXHJcXG59XFxyXFxuXFxyXFxuc3ViIHtcXHJcXG4gIGJvdHRvbTogLTAuMjVlbTtcXHJcXG59XFxyXFxuXFxyXFxuc3VwIHtcXHJcXG4gIHRvcDogLTAuNWVtO1xcclxcbn1cXHJcXG5cXHJcXG4vKiBFbWJlZGRlZCBjb250ZW50XFxyXFxuICAgPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0gKi9cXHJcXG5cXHJcXG4vKipcXHJcXG4gKiBSZW1vdmUgdGhlIGJvcmRlciBvbiBpbWFnZXMgaW5zaWRlIGxpbmtzIGluIElFIDEwLlxcclxcbiAqL1xcclxcblxcclxcbmltZyB7XFxyXFxuICBib3JkZXItc3R5bGU6IG5vbmU7XFxyXFxufVxcclxcblxcclxcbi8qIEZvcm1zXFxyXFxuICAgPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0gKi9cXHJcXG5cXHJcXG4vKipcXHJcXG4gKiAxLiBDaGFuZ2UgdGhlIGZvbnQgc3R5bGVzIGluIGFsbCBicm93c2Vycy5cXHJcXG4gKiAyLiBSZW1vdmUgdGhlIG1hcmdpbiBpbiBGaXJlZm94IGFuZCBTYWZhcmkuXFxyXFxuICovXFxyXFxuXFxyXFxuYnV0dG9uLFxcclxcbmlucHV0LFxcclxcbm9wdGdyb3VwLFxcclxcbnNlbGVjdCxcXHJcXG50ZXh0YXJlYSB7XFxyXFxuICBmb250LWZhbWlseTogaW5oZXJpdDsgLyogMSAqL1xcclxcbiAgZm9udC1zaXplOiAxMDAlOyAvKiAxICovXFxyXFxuICBsaW5lLWhlaWdodDogMS4xNTsgLyogMSAqL1xcclxcbiAgbWFyZ2luOiAwOyAvKiAyICovXFxyXFxufVxcclxcblxcclxcbi8qKlxcclxcbiAqIFNob3cgdGhlIG92ZXJmbG93IGluIElFLlxcclxcbiAqIDEuIFNob3cgdGhlIG92ZXJmbG93IGluIEVkZ2UuXFxyXFxuICovXFxyXFxuXFxyXFxuYnV0dG9uLFxcclxcbmlucHV0IHsgLyogMSAqL1xcclxcbiAgb3ZlcmZsb3c6IHZpc2libGU7XFxyXFxufVxcclxcblxcclxcbi8qKlxcclxcbiAqIFJlbW92ZSB0aGUgaW5oZXJpdGFuY2Ugb2YgdGV4dCB0cmFuc2Zvcm0gaW4gRWRnZSwgRmlyZWZveCwgYW5kIElFLlxcclxcbiAqIDEuIFJlbW92ZSB0aGUgaW5oZXJpdGFuY2Ugb2YgdGV4dCB0cmFuc2Zvcm0gaW4gRmlyZWZveC5cXHJcXG4gKi9cXHJcXG5cXHJcXG5idXR0b24sXFxyXFxuc2VsZWN0IHsgLyogMSAqL1xcclxcbiAgdGV4dC10cmFuc2Zvcm06IG5vbmU7XFxyXFxufVxcclxcblxcclxcbi8qKlxcclxcbiAqIENvcnJlY3QgdGhlIGluYWJpbGl0eSB0byBzdHlsZSBjbGlja2FibGUgdHlwZXMgaW4gaU9TIGFuZCBTYWZhcmkuXFxyXFxuICovXFxyXFxuXFxyXFxuYnV0dG9uLFxcclxcblt0eXBlPVxcXCJidXR0b25cXFwiXSxcXHJcXG5bdHlwZT1cXFwicmVzZXRcXFwiXSxcXHJcXG5bdHlwZT1cXFwic3VibWl0XFxcIl0ge1xcclxcbiAgLXdlYmtpdC1hcHBlYXJhbmNlOiBidXR0b247XFxyXFxufVxcclxcblxcclxcbi8qKlxcclxcbiAqIFJlbW92ZSB0aGUgaW5uZXIgYm9yZGVyIGFuZCBwYWRkaW5nIGluIEZpcmVmb3guXFxyXFxuICovXFxyXFxuXFxyXFxuYnV0dG9uOjotbW96LWZvY3VzLWlubmVyLFxcclxcblt0eXBlPVxcXCJidXR0b25cXFwiXTo6LW1vei1mb2N1cy1pbm5lcixcXHJcXG5bdHlwZT1cXFwicmVzZXRcXFwiXTo6LW1vei1mb2N1cy1pbm5lcixcXHJcXG5bdHlwZT1cXFwic3VibWl0XFxcIl06Oi1tb3otZm9jdXMtaW5uZXIge1xcclxcbiAgYm9yZGVyLXN0eWxlOiBub25lO1xcclxcbiAgcGFkZGluZzogMDtcXHJcXG59XFxyXFxuXFxyXFxuLyoqXFxyXFxuICogUmVzdG9yZSB0aGUgZm9jdXMgc3R5bGVzIHVuc2V0IGJ5IHRoZSBwcmV2aW91cyBydWxlLlxcclxcbiAqL1xcclxcblxcclxcbmJ1dHRvbjotbW96LWZvY3VzcmluZyxcXHJcXG5bdHlwZT1cXFwiYnV0dG9uXFxcIl06LW1vei1mb2N1c3JpbmcsXFxyXFxuW3R5cGU9XFxcInJlc2V0XFxcIl06LW1vei1mb2N1c3JpbmcsXFxyXFxuW3R5cGU9XFxcInN1Ym1pdFxcXCJdOi1tb3otZm9jdXNyaW5nIHtcXHJcXG4gIG91dGxpbmU6IDFweCBkb3R0ZWQgQnV0dG9uVGV4dDtcXHJcXG59XFxyXFxuXFxyXFxuLyoqXFxyXFxuICogQ29ycmVjdCB0aGUgcGFkZGluZyBpbiBGaXJlZm94LlxcclxcbiAqL1xcclxcblxcclxcbmZpZWxkc2V0IHtcXHJcXG4gIHBhZGRpbmc6IDAuMzVlbSAwLjc1ZW0gMC42MjVlbTtcXHJcXG59XFxyXFxuXFxyXFxuLyoqXFxyXFxuICogMS4gQ29ycmVjdCB0aGUgdGV4dCB3cmFwcGluZyBpbiBFZGdlIGFuZCBJRS5cXHJcXG4gKiAyLiBDb3JyZWN0IHRoZSBjb2xvciBpbmhlcml0YW5jZSBmcm9tIGBmaWVsZHNldGAgZWxlbWVudHMgaW4gSUUuXFxyXFxuICogMy4gUmVtb3ZlIHRoZSBwYWRkaW5nIHNvIGRldmVsb3BlcnMgYXJlIG5vdCBjYXVnaHQgb3V0IHdoZW4gdGhleSB6ZXJvIG91dFxcclxcbiAqICAgIGBmaWVsZHNldGAgZWxlbWVudHMgaW4gYWxsIGJyb3dzZXJzLlxcclxcbiAqL1xcclxcblxcclxcbmxlZ2VuZCB7XFxyXFxuICBib3gtc2l6aW5nOiBib3JkZXItYm94OyAvKiAxICovXFxyXFxuICBjb2xvcjogaW5oZXJpdDsgLyogMiAqL1xcclxcbiAgZGlzcGxheTogdGFibGU7IC8qIDEgKi9cXHJcXG4gIG1heC13aWR0aDogMTAwJTsgLyogMSAqL1xcclxcbiAgcGFkZGluZzogMDsgLyogMyAqL1xcclxcbiAgd2hpdGUtc3BhY2U6IG5vcm1hbDsgLyogMSAqL1xcclxcbn1cXHJcXG5cXHJcXG4vKipcXHJcXG4gKiBBZGQgdGhlIGNvcnJlY3QgdmVydGljYWwgYWxpZ25tZW50IGluIENocm9tZSwgRmlyZWZveCwgYW5kIE9wZXJhLlxcclxcbiAqL1xcclxcblxcclxcbnByb2dyZXNzIHtcXHJcXG4gIHZlcnRpY2FsLWFsaWduOiBiYXNlbGluZTtcXHJcXG59XFxyXFxuXFxyXFxuLyoqXFxyXFxuICogUmVtb3ZlIHRoZSBkZWZhdWx0IHZlcnRpY2FsIHNjcm9sbGJhciBpbiBJRSAxMCsuXFxyXFxuICovXFxyXFxuXFxyXFxudGV4dGFyZWEge1xcclxcbiAgb3ZlcmZsb3c6IGF1dG87XFxyXFxufVxcclxcblxcclxcbi8qKlxcclxcbiAqIDEuIEFkZCB0aGUgY29ycmVjdCBib3ggc2l6aW5nIGluIElFIDEwLlxcclxcbiAqIDIuIFJlbW92ZSB0aGUgcGFkZGluZyBpbiBJRSAxMC5cXHJcXG4gKi9cXHJcXG5cXHJcXG5bdHlwZT1cXFwiY2hlY2tib3hcXFwiXSxcXHJcXG5bdHlwZT1cXFwicmFkaW9cXFwiXSB7XFxyXFxuICBib3gtc2l6aW5nOiBib3JkZXItYm94OyAvKiAxICovXFxyXFxuICBwYWRkaW5nOiAwOyAvKiAyICovXFxyXFxufVxcclxcblxcclxcbi8qKlxcclxcbiAqIENvcnJlY3QgdGhlIGN1cnNvciBzdHlsZSBvZiBpbmNyZW1lbnQgYW5kIGRlY3JlbWVudCBidXR0b25zIGluIENocm9tZS5cXHJcXG4gKi9cXHJcXG5cXHJcXG5bdHlwZT1cXFwibnVtYmVyXFxcIl06Oi13ZWJraXQtaW5uZXItc3Bpbi1idXR0b24sXFxyXFxuW3R5cGU9XFxcIm51bWJlclxcXCJdOjotd2Via2l0LW91dGVyLXNwaW4tYnV0dG9uIHtcXHJcXG4gIGhlaWdodDogYXV0bztcXHJcXG59XFxyXFxuXFxyXFxuLyoqXFxyXFxuICogMS4gQ29ycmVjdCB0aGUgb2RkIGFwcGVhcmFuY2UgaW4gQ2hyb21lIGFuZCBTYWZhcmkuXFxyXFxuICogMi4gQ29ycmVjdCB0aGUgb3V0bGluZSBzdHlsZSBpbiBTYWZhcmkuXFxyXFxuICovXFxyXFxuXFxyXFxuW3R5cGU9XFxcInNlYXJjaFxcXCJdIHtcXHJcXG4gIC13ZWJraXQtYXBwZWFyYW5jZTogdGV4dGZpZWxkOyAvKiAxICovXFxyXFxuICBvdXRsaW5lLW9mZnNldDogLTJweDsgLyogMiAqL1xcclxcbn1cXHJcXG5cXHJcXG4vKipcXHJcXG4gKiBSZW1vdmUgdGhlIGlubmVyIHBhZGRpbmcgaW4gQ2hyb21lIGFuZCBTYWZhcmkgb24gbWFjT1MuXFxyXFxuICovXFxyXFxuXFxyXFxuW3R5cGU9XFxcInNlYXJjaFxcXCJdOjotd2Via2l0LXNlYXJjaC1kZWNvcmF0aW9uIHtcXHJcXG4gIC13ZWJraXQtYXBwZWFyYW5jZTogbm9uZTtcXHJcXG59XFxyXFxuXFxyXFxuLyoqXFxyXFxuICogMS4gQ29ycmVjdCB0aGUgaW5hYmlsaXR5IHRvIHN0eWxlIGNsaWNrYWJsZSB0eXBlcyBpbiBpT1MgYW5kIFNhZmFyaS5cXHJcXG4gKiAyLiBDaGFuZ2UgZm9udCBwcm9wZXJ0aWVzIHRvIGBpbmhlcml0YCBpbiBTYWZhcmkuXFxyXFxuICovXFxyXFxuXFxyXFxuOjotd2Via2l0LWZpbGUtdXBsb2FkLWJ1dHRvbiB7XFxyXFxuICAtd2Via2l0LWFwcGVhcmFuY2U6IGJ1dHRvbjsgLyogMSAqL1xcclxcbiAgZm9udDogaW5oZXJpdDsgLyogMiAqL1xcclxcbn1cXHJcXG5cXHJcXG4vKiBJbnRlcmFjdGl2ZVxcclxcbiAgID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09ICovXFxyXFxuXFxyXFxuLypcXHJcXG4gKiBBZGQgdGhlIGNvcnJlY3QgZGlzcGxheSBpbiBFZGdlLCBJRSAxMCssIGFuZCBGaXJlZm94LlxcclxcbiAqL1xcclxcblxcclxcbmRldGFpbHMge1xcclxcbiAgZGlzcGxheTogYmxvY2s7XFxyXFxufVxcclxcblxcclxcbi8qXFxyXFxuICogQWRkIHRoZSBjb3JyZWN0IGRpc3BsYXkgaW4gYWxsIGJyb3dzZXJzLlxcclxcbiAqL1xcclxcblxcclxcbnN1bW1hcnkge1xcclxcbiAgZGlzcGxheTogbGlzdC1pdGVtO1xcclxcbn1cXHJcXG5cXHJcXG4vKiBNaXNjXFxyXFxuICAgPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0gKi9cXHJcXG5cXHJcXG4vKipcXHJcXG4gKiBBZGQgdGhlIGNvcnJlY3QgZGlzcGxheSBpbiBJRSAxMCsuXFxyXFxuICovXFxyXFxuXFxyXFxudGVtcGxhdGUge1xcclxcbiAgZGlzcGxheTogbm9uZTtcXHJcXG59XFxyXFxuXFxyXFxuLyoqXFxyXFxuICogQWRkIHRoZSBjb3JyZWN0IGRpc3BsYXkgaW4gSUUgMTAuXFxyXFxuICovXFxyXFxuXFxyXFxuW2hpZGRlbl0ge1xcclxcbiAgZGlzcGxheTogbm9uZTtcXHJcXG59XFxyXFxuXCJdLFwic291cmNlUm9vdFwiOlwiXCJ9XSk7XG4vLyBFeHBvcnRzXG5leHBvcnQgZGVmYXVsdCBfX19DU1NfTE9BREVSX0VYUE9SVF9fXztcbiIsIi8vIEltcG9ydHNcbmltcG9ydCBfX19DU1NfTE9BREVSX0FQSV9TT1VSQ0VNQVBfSU1QT1JUX19fIGZyb20gXCIuLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvc291cmNlTWFwcy5qc1wiO1xuaW1wb3J0IF9fX0NTU19MT0FERVJfQVBJX0lNUE9SVF9fXyBmcm9tIFwiLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL2FwaS5qc1wiO1xudmFyIF9fX0NTU19MT0FERVJfRVhQT1JUX19fID0gX19fQ1NTX0xPQURFUl9BUElfSU1QT1JUX19fKF9fX0NTU19MT0FERVJfQVBJX1NPVVJDRU1BUF9JTVBPUlRfX18pO1xuLy8gTW9kdWxlXG5fX19DU1NfTE9BREVSX0VYUE9SVF9fXy5wdXNoKFttb2R1bGUuaWQsIFwiLyogaHR0cDovL21leWVyd2ViLmNvbS9lcmljL3Rvb2xzL2Nzcy9yZXNldC9cXHJcXG4gICB2Mi4wIHwgMjAxMTAxMjZcXHJcXG4gICBMaWNlbnNlOiBub25lIChwdWJsaWMgZG9tYWluKVxcclxcbiovXFxyXFxuXFxyXFxuaHRtbCwgYm9keSwgZGl2LCBzcGFuLCBhcHBsZXQsIG9iamVjdCwgaWZyYW1lLFxcclxcbmgxLCBoMiwgaDMsIGg0LCBoNSwgaDYsIHAsIGJsb2NrcXVvdGUsIHByZSxcXHJcXG5hLCBhYmJyLCBhY3JvbnltLCBhZGRyZXNzLCBiaWcsIGNpdGUsIGNvZGUsXFxyXFxuZGVsLCBkZm4sIGVtLCBpbWcsIGlucywga2JkLCBxLCBzLCBzYW1wLFxcclxcbnNtYWxsLCBzdHJpa2UsIHN0cm9uZywgc3ViLCBzdXAsIHR0LCB2YXIsXFxyXFxuYiwgdSwgaSwgY2VudGVyLFxcclxcbmRsLCBkdCwgZGQsIG9sLCB1bCwgbGksXFxyXFxuZmllbGRzZXQsIGZvcm0sIGxhYmVsLCBsZWdlbmQsXFxyXFxudGFibGUsIGNhcHRpb24sIHRib2R5LCB0Zm9vdCwgdGhlYWQsIHRyLCB0aCwgdGQsXFxyXFxuYXJ0aWNsZSwgYXNpZGUsIGNhbnZhcywgZGV0YWlscywgZW1iZWQsXFxyXFxuZmlndXJlLCBmaWdjYXB0aW9uLCBmb290ZXIsIGhlYWRlciwgaGdyb3VwLFxcclxcbm1lbnUsIG5hdiwgb3V0cHV0LCBydWJ5LCBzZWN0aW9uLCBzdW1tYXJ5LFxcclxcbnRpbWUsIG1hcmssIGF1ZGlvLCB2aWRlbyB7XFxyXFxuXFx0bWFyZ2luOiAwO1xcclxcblxcdHBhZGRpbmc6IDA7XFxyXFxuXFx0Ym9yZGVyOiAwO1xcclxcblxcdGZvbnQtc2l6ZTogMTAwJTtcXHJcXG5cXHRmb250OiBpbmhlcml0O1xcclxcblxcdHZlcnRpY2FsLWFsaWduOiBiYXNlbGluZTtcXHJcXG59XFxyXFxuLyogSFRNTDUgZGlzcGxheS1yb2xlIHJlc2V0IGZvciBvbGRlciBicm93c2VycyAqL1xcclxcbmFydGljbGUsIGFzaWRlLCBkZXRhaWxzLCBmaWdjYXB0aW9uLCBmaWd1cmUsXFxyXFxuZm9vdGVyLCBoZWFkZXIsIGhncm91cCwgbWVudSwgbmF2LCBzZWN0aW9uIHtcXHJcXG5cXHRkaXNwbGF5OiBibG9jaztcXHJcXG59XFxyXFxuYm9keSB7XFxyXFxuXFx0bGluZS1oZWlnaHQ6IDE7XFxyXFxufVxcclxcbm9sLCB1bCB7XFxyXFxuXFx0bGlzdC1zdHlsZTogbm9uZTtcXHJcXG59XFxyXFxuYmxvY2txdW90ZSwgcSB7XFxyXFxuXFx0cXVvdGVzOiBub25lO1xcclxcbn1cXHJcXG5ibG9ja3F1b3RlOmJlZm9yZSwgYmxvY2txdW90ZTphZnRlcixcXHJcXG5xOmJlZm9yZSwgcTphZnRlciB7XFxyXFxuXFx0Y29udGVudDogJyc7XFxyXFxuXFx0Y29udGVudDogbm9uZTtcXHJcXG59XFxyXFxudGFibGUge1xcclxcblxcdGJvcmRlci1jb2xsYXBzZTogY29sbGFwc2U7XFxyXFxuXFx0Ym9yZGVyLXNwYWNpbmc6IDA7XFxyXFxufVwiLCBcIlwiLHtcInZlcnNpb25cIjozLFwic291cmNlc1wiOltcIndlYnBhY2s6Ly8uL2Fzc2V0cy9zdHlsZXMvcmVzZXQuY3NzXCJdLFwibmFtZXNcIjpbXSxcIm1hcHBpbmdzXCI6XCJBQUFBOzs7Q0FHQzs7QUFFRDs7Ozs7Ozs7Ozs7OztDQWFDLFNBQVM7Q0FDVCxVQUFVO0NBQ1YsU0FBUztDQUNULGVBQWU7Q0FDZixhQUFhO0NBQ2Isd0JBQXdCO0FBQ3pCO0FBQ0EsZ0RBQWdEO0FBQ2hEOztDQUVDLGNBQWM7QUFDZjtBQUNBO0NBQ0MsY0FBYztBQUNmO0FBQ0E7Q0FDQyxnQkFBZ0I7QUFDakI7QUFDQTtDQUNDLFlBQVk7QUFDYjtBQUNBOztDQUVDLFdBQVc7Q0FDWCxhQUFhO0FBQ2Q7QUFDQTtDQUNDLHlCQUF5QjtDQUN6QixpQkFBaUI7QUFDbEJcIixcInNvdXJjZXNDb250ZW50XCI6W1wiLyogaHR0cDovL21leWVyd2ViLmNvbS9lcmljL3Rvb2xzL2Nzcy9yZXNldC9cXHJcXG4gICB2Mi4wIHwgMjAxMTAxMjZcXHJcXG4gICBMaWNlbnNlOiBub25lIChwdWJsaWMgZG9tYWluKVxcclxcbiovXFxyXFxuXFxyXFxuaHRtbCwgYm9keSwgZGl2LCBzcGFuLCBhcHBsZXQsIG9iamVjdCwgaWZyYW1lLFxcclxcbmgxLCBoMiwgaDMsIGg0LCBoNSwgaDYsIHAsIGJsb2NrcXVvdGUsIHByZSxcXHJcXG5hLCBhYmJyLCBhY3JvbnltLCBhZGRyZXNzLCBiaWcsIGNpdGUsIGNvZGUsXFxyXFxuZGVsLCBkZm4sIGVtLCBpbWcsIGlucywga2JkLCBxLCBzLCBzYW1wLFxcclxcbnNtYWxsLCBzdHJpa2UsIHN0cm9uZywgc3ViLCBzdXAsIHR0LCB2YXIsXFxyXFxuYiwgdSwgaSwgY2VudGVyLFxcclxcbmRsLCBkdCwgZGQsIG9sLCB1bCwgbGksXFxyXFxuZmllbGRzZXQsIGZvcm0sIGxhYmVsLCBsZWdlbmQsXFxyXFxudGFibGUsIGNhcHRpb24sIHRib2R5LCB0Zm9vdCwgdGhlYWQsIHRyLCB0aCwgdGQsXFxyXFxuYXJ0aWNsZSwgYXNpZGUsIGNhbnZhcywgZGV0YWlscywgZW1iZWQsXFxyXFxuZmlndXJlLCBmaWdjYXB0aW9uLCBmb290ZXIsIGhlYWRlciwgaGdyb3VwLFxcclxcbm1lbnUsIG5hdiwgb3V0cHV0LCBydWJ5LCBzZWN0aW9uLCBzdW1tYXJ5LFxcclxcbnRpbWUsIG1hcmssIGF1ZGlvLCB2aWRlbyB7XFxyXFxuXFx0bWFyZ2luOiAwO1xcclxcblxcdHBhZGRpbmc6IDA7XFxyXFxuXFx0Ym9yZGVyOiAwO1xcclxcblxcdGZvbnQtc2l6ZTogMTAwJTtcXHJcXG5cXHRmb250OiBpbmhlcml0O1xcclxcblxcdHZlcnRpY2FsLWFsaWduOiBiYXNlbGluZTtcXHJcXG59XFxyXFxuLyogSFRNTDUgZGlzcGxheS1yb2xlIHJlc2V0IGZvciBvbGRlciBicm93c2VycyAqL1xcclxcbmFydGljbGUsIGFzaWRlLCBkZXRhaWxzLCBmaWdjYXB0aW9uLCBmaWd1cmUsXFxyXFxuZm9vdGVyLCBoZWFkZXIsIGhncm91cCwgbWVudSwgbmF2LCBzZWN0aW9uIHtcXHJcXG5cXHRkaXNwbGF5OiBibG9jaztcXHJcXG59XFxyXFxuYm9keSB7XFxyXFxuXFx0bGluZS1oZWlnaHQ6IDE7XFxyXFxufVxcclxcbm9sLCB1bCB7XFxyXFxuXFx0bGlzdC1zdHlsZTogbm9uZTtcXHJcXG59XFxyXFxuYmxvY2txdW90ZSwgcSB7XFxyXFxuXFx0cXVvdGVzOiBub25lO1xcclxcbn1cXHJcXG5ibG9ja3F1b3RlOmJlZm9yZSwgYmxvY2txdW90ZTphZnRlcixcXHJcXG5xOmJlZm9yZSwgcTphZnRlciB7XFxyXFxuXFx0Y29udGVudDogJyc7XFxyXFxuXFx0Y29udGVudDogbm9uZTtcXHJcXG59XFxyXFxudGFibGUge1xcclxcblxcdGJvcmRlci1jb2xsYXBzZTogY29sbGFwc2U7XFxyXFxuXFx0Ym9yZGVyLXNwYWNpbmc6IDA7XFxyXFxufVwiXSxcInNvdXJjZVJvb3RcIjpcIlwifV0pO1xuLy8gRXhwb3J0c1xuZXhwb3J0IGRlZmF1bHQgX19fQ1NTX0xPQURFUl9FWFBPUlRfX187XG4iLCIvLyBJbXBvcnRzXG5pbXBvcnQgX19fQ1NTX0xPQURFUl9BUElfU09VUkNFTUFQX0lNUE9SVF9fXyBmcm9tIFwiLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL3NvdXJjZU1hcHMuanNcIjtcbmltcG9ydCBfX19DU1NfTE9BREVSX0FQSV9JTVBPUlRfX18gZnJvbSBcIi4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9hcGkuanNcIjtcbmltcG9ydCBfX19DU1NfTE9BREVSX0dFVF9VUkxfSU1QT1JUX19fIGZyb20gXCIuLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvZ2V0VXJsLmpzXCI7XG52YXIgX19fQ1NTX0xPQURFUl9VUkxfSU1QT1JUXzBfX18gPSBuZXcgVVJMKFwiLi4vZm9udHMvZ2xvcmlhLWhhbGxlbHVqYWgtdjE3LWxhdGluLXJlZ3VsYXIud29mZjJcIiwgaW1wb3J0Lm1ldGEudXJsKTtcbnZhciBfX19DU1NfTE9BREVSX1VSTF9JTVBPUlRfMV9fXyA9IG5ldyBVUkwoXCIuLi9mb250cy9nbG9yaWEtaGFsbGVsdWphaC12MTctbGF0aW4tcmVndWxhci53b2ZmXCIsIGltcG9ydC5tZXRhLnVybCk7XG52YXIgX19fQ1NTX0xPQURFUl9VUkxfSU1QT1JUXzJfX18gPSBuZXcgVVJMKFwiLi4vZm9udHMvbmV1Y2hhLXYxNy1sYXRpbi1yZWd1bGFyLndvZmYyXCIsIGltcG9ydC5tZXRhLnVybCk7XG52YXIgX19fQ1NTX0xPQURFUl9VUkxfSU1QT1JUXzNfX18gPSBuZXcgVVJMKFwiLi4vZm9udHMvbmV1Y2hhLXYxNy1sYXRpbi1yZWd1bGFyLndvZmZcIiwgaW1wb3J0Lm1ldGEudXJsKTtcbnZhciBfX19DU1NfTE9BREVSX1VSTF9JTVBPUlRfNF9fXyA9IG5ldyBVUkwoXCIuLi9pbWcvYXBwL3dhdGVyY29sb3ItYmx1ZS1iZy1sZWZ0LmpwZ1wiLCBpbXBvcnQubWV0YS51cmwpO1xudmFyIF9fX0NTU19MT0FERVJfVVJMX0lNUE9SVF81X19fID0gbmV3IFVSTChcIi4uL2ltZy9hcHAvd2F0ZXJjb2xvci1ibHVlLWJnLXJpZ2h0LmpwZ1wiLCBpbXBvcnQubWV0YS51cmwpO1xudmFyIF9fX0NTU19MT0FERVJfVVJMX0lNUE9SVF82X19fID0gbmV3IFVSTChcIi4uL2ltZy9hcHAvd2F0ZXJjb2xvci13YXZlcy0wMS11cC5wbmdcIiwgaW1wb3J0Lm1ldGEudXJsKTtcbnZhciBfX19DU1NfTE9BREVSX1VSTF9JTVBPUlRfN19fXyA9IG5ldyBVUkwoXCIuLi9pbWcvYXBwL3dhdGVyY29sb3Itd2F2ZXMtMDEtZG93bi5wbmdcIiwgaW1wb3J0Lm1ldGEudXJsKTtcbnZhciBfX19DU1NfTE9BREVSX1VSTF9JTVBPUlRfOF9fXyA9IG5ldyBVUkwoXCIuLi9pbWcvYXBwL3dhdGVyY29sb3ItbWVudS1idXR0b24tMDEucG5nXCIsIGltcG9ydC5tZXRhLnVybCk7XG52YXIgX19fQ1NTX0xPQURFUl9VUkxfSU1QT1JUXzlfX18gPSBuZXcgVVJMKFwiLi4vaW1nL2FwcC93YXRlcmNvbG9yLXJlZC1jcm9zcy1idXR0b24tMDEuanBnXCIsIGltcG9ydC5tZXRhLnVybCk7XG52YXIgX19fQ1NTX0xPQURFUl9VUkxfSU1QT1JUXzEwX19fID0gbmV3IFVSTChcIi4uL2ltZy9hcHAvc3RhcnQtYnV0dG9uLmpwZ1wiLCBpbXBvcnQubWV0YS51cmwpO1xudmFyIF9fX0NTU19MT0FERVJfVVJMX0lNUE9SVF8xMV9fXyA9IG5ldyBVUkwoXCIuLi9pbWcvYXBwL2J1dHRvbi1yZXBlYXQuanBnXCIsIGltcG9ydC5tZXRhLnVybCk7XG52YXIgX19fQ1NTX0xPQURFUl9VUkxfSU1QT1JUXzEyX19fID0gbmV3IFVSTChcIi4uL2ltZy9hcHAvd2F0ZXJjb2xvci1reXRlcy0wMS5qcGdcIiwgaW1wb3J0Lm1ldGEudXJsKTtcbnZhciBfX19DU1NfTE9BREVSX1VSTF9JTVBPUlRfMTNfX18gPSBuZXcgVVJMKFwiLi4vaW1nL2FwcC93YXRlcmNvbG9yLWJ1dGVyZmx5LTAxLmpwZ1wiLCBpbXBvcnQubWV0YS51cmwpO1xudmFyIF9fX0NTU19MT0FERVJfVVJMX0lNUE9SVF8xNF9fXyA9IG5ldyBVUkwoXCIuLi9pbWcvYXBwL3dhdGVyY29sb3ItbGluZS0wMi1yaWdodC5wbmdcIiwgaW1wb3J0Lm1ldGEudXJsKTtcbnZhciBfX19DU1NfTE9BREVSX1VSTF9JTVBPUlRfMTVfX18gPSBuZXcgVVJMKFwiLi4vaW1nL2FwcC93YXRlcmNvbG9yLWxpbmUtMDIucG5nXCIsIGltcG9ydC5tZXRhLnVybCk7XG52YXIgX19fQ1NTX0xPQURFUl9VUkxfSU1QT1JUXzE2X19fID0gbmV3IFVSTChcIi4uL2ltZy9hcHAvd2F0ZXJjb2xvci1saW5lLTAxLnBuZ1wiLCBpbXBvcnQubWV0YS51cmwpO1xudmFyIF9fX0NTU19MT0FERVJfVVJMX0lNUE9SVF8xN19fXyA9IG5ldyBVUkwoXCIuLi9pbWcvYXBwL3dhdGVyY29sb3ItYmx1ZS1jYXJkLWJnLTAxLmpwZ1wiLCBpbXBvcnQubWV0YS51cmwpO1xudmFyIF9fX0NTU19MT0FERVJfRVhQT1JUX19fID0gX19fQ1NTX0xPQURFUl9BUElfSU1QT1JUX19fKF9fX0NTU19MT0FERVJfQVBJX1NPVVJDRU1BUF9JTVBPUlRfX18pO1xudmFyIF9fX0NTU19MT0FERVJfVVJMX1JFUExBQ0VNRU5UXzBfX18gPSBfX19DU1NfTE9BREVSX0dFVF9VUkxfSU1QT1JUX19fKF9fX0NTU19MT0FERVJfVVJMX0lNUE9SVF8wX19fKTtcbnZhciBfX19DU1NfTE9BREVSX1VSTF9SRVBMQUNFTUVOVF8xX19fID0gX19fQ1NTX0xPQURFUl9HRVRfVVJMX0lNUE9SVF9fXyhfX19DU1NfTE9BREVSX1VSTF9JTVBPUlRfMV9fXyk7XG52YXIgX19fQ1NTX0xPQURFUl9VUkxfUkVQTEFDRU1FTlRfMl9fXyA9IF9fX0NTU19MT0FERVJfR0VUX1VSTF9JTVBPUlRfX18oX19fQ1NTX0xPQURFUl9VUkxfSU1QT1JUXzJfX18pO1xudmFyIF9fX0NTU19MT0FERVJfVVJMX1JFUExBQ0VNRU5UXzNfX18gPSBfX19DU1NfTE9BREVSX0dFVF9VUkxfSU1QT1JUX19fKF9fX0NTU19MT0FERVJfVVJMX0lNUE9SVF8zX19fKTtcbnZhciBfX19DU1NfTE9BREVSX1VSTF9SRVBMQUNFTUVOVF80X19fID0gX19fQ1NTX0xPQURFUl9HRVRfVVJMX0lNUE9SVF9fXyhfX19DU1NfTE9BREVSX1VSTF9JTVBPUlRfNF9fXyk7XG52YXIgX19fQ1NTX0xPQURFUl9VUkxfUkVQTEFDRU1FTlRfNV9fXyA9IF9fX0NTU19MT0FERVJfR0VUX1VSTF9JTVBPUlRfX18oX19fQ1NTX0xPQURFUl9VUkxfSU1QT1JUXzVfX18pO1xudmFyIF9fX0NTU19MT0FERVJfVVJMX1JFUExBQ0VNRU5UXzZfX18gPSBfX19DU1NfTE9BREVSX0dFVF9VUkxfSU1QT1JUX19fKF9fX0NTU19MT0FERVJfVVJMX0lNUE9SVF82X19fKTtcbnZhciBfX19DU1NfTE9BREVSX1VSTF9SRVBMQUNFTUVOVF83X19fID0gX19fQ1NTX0xPQURFUl9HRVRfVVJMX0lNUE9SVF9fXyhfX19DU1NfTE9BREVSX1VSTF9JTVBPUlRfN19fXyk7XG52YXIgX19fQ1NTX0xPQURFUl9VUkxfUkVQTEFDRU1FTlRfOF9fXyA9IF9fX0NTU19MT0FERVJfR0VUX1VSTF9JTVBPUlRfX18oX19fQ1NTX0xPQURFUl9VUkxfSU1QT1JUXzhfX18pO1xudmFyIF9fX0NTU19MT0FERVJfVVJMX1JFUExBQ0VNRU5UXzlfX18gPSBfX19DU1NfTE9BREVSX0dFVF9VUkxfSU1QT1JUX19fKF9fX0NTU19MT0FERVJfVVJMX0lNUE9SVF85X19fKTtcbnZhciBfX19DU1NfTE9BREVSX1VSTF9SRVBMQUNFTUVOVF8xMF9fXyA9IF9fX0NTU19MT0FERVJfR0VUX1VSTF9JTVBPUlRfX18oX19fQ1NTX0xPQURFUl9VUkxfSU1QT1JUXzEwX19fKTtcbnZhciBfX19DU1NfTE9BREVSX1VSTF9SRVBMQUNFTUVOVF8xMV9fXyA9IF9fX0NTU19MT0FERVJfR0VUX1VSTF9JTVBPUlRfX18oX19fQ1NTX0xPQURFUl9VUkxfSU1QT1JUXzExX19fKTtcbnZhciBfX19DU1NfTE9BREVSX1VSTF9SRVBMQUNFTUVOVF8xMl9fXyA9IF9fX0NTU19MT0FERVJfR0VUX1VSTF9JTVBPUlRfX18oX19fQ1NTX0xPQURFUl9VUkxfSU1QT1JUXzEyX19fKTtcbnZhciBfX19DU1NfTE9BREVSX1VSTF9SRVBMQUNFTUVOVF8xM19fXyA9IF9fX0NTU19MT0FERVJfR0VUX1VSTF9JTVBPUlRfX18oX19fQ1NTX0xPQURFUl9VUkxfSU1QT1JUXzEzX19fKTtcbnZhciBfX19DU1NfTE9BREVSX1VSTF9SRVBMQUNFTUVOVF8xNF9fXyA9IF9fX0NTU19MT0FERVJfR0VUX1VSTF9JTVBPUlRfX18oX19fQ1NTX0xPQURFUl9VUkxfSU1QT1JUXzE0X19fKTtcbnZhciBfX19DU1NfTE9BREVSX1VSTF9SRVBMQUNFTUVOVF8xNV9fXyA9IF9fX0NTU19MT0FERVJfR0VUX1VSTF9JTVBPUlRfX18oX19fQ1NTX0xPQURFUl9VUkxfSU1QT1JUXzE1X19fKTtcbnZhciBfX19DU1NfTE9BREVSX1VSTF9SRVBMQUNFTUVOVF8xNl9fXyA9IF9fX0NTU19MT0FERVJfR0VUX1VSTF9JTVBPUlRfX18oX19fQ1NTX0xPQURFUl9VUkxfSU1QT1JUXzE2X19fKTtcbnZhciBfX19DU1NfTE9BREVSX1VSTF9SRVBMQUNFTUVOVF8xN19fXyA9IF9fX0NTU19MT0FERVJfR0VUX1VSTF9JTVBPUlRfX18oX19fQ1NTX0xPQURFUl9VUkxfSU1QT1JUXzE3X19fKTtcbi8vIE1vZHVsZVxuX19fQ1NTX0xPQURFUl9FWFBPUlRfX18ucHVzaChbbW9kdWxlLmlkLCBcIi8qIGdsb3JpYS1oYWxsZWx1amFoLXJlZ3VsYXIgLSBsYXRpbiAqL1xcclxcbkBmb250LWZhY2Uge1xcclxcbiAgICBmb250LWZhbWlseTogJ0dsb3JpYSBIYWxsZWx1amFoJztcXHJcXG4gICAgZm9udC1zdHlsZTogbm9ybWFsO1xcclxcbiAgICBmb250LXdlaWdodDogNDAwO1xcclxcbiAgICBzcmM6IGxvY2FsKCcnKSxcXHJcXG4gICAgICAgICB1cmwoXCIgKyBfX19DU1NfTE9BREVSX1VSTF9SRVBMQUNFTUVOVF8wX19fICsgXCIpIGZvcm1hdCgnd29mZjInKSwgLyogQ2hyb21lIDI2KywgT3BlcmEgMjMrLCBGaXJlZm94IDM5KyAqL1xcclxcbiAgICAgICAgIHVybChcIiArIF9fX0NTU19MT0FERVJfVVJMX1JFUExBQ0VNRU5UXzFfX18gKyBcIikgZm9ybWF0KCd3b2ZmJyk7IC8qIENocm9tZSA2KywgRmlyZWZveCAzLjYrLCBJRSA5KywgU2FmYXJpIDUuMSsgKi9cXHJcXG4gIH1cXHJcXG5cXHJcXG4vKiBuZXVjaGEtcmVndWxhciAtIGxhdGluICovXFxyXFxuQGZvbnQtZmFjZSB7XFxyXFxuICAgIGZvbnQtZmFtaWx5OiAnTmV1Y2hhJztcXHJcXG4gICAgZm9udC1zdHlsZTogbm9ybWFsO1xcclxcbiAgICBmb250LXdlaWdodDogNDAwO1xcclxcbiAgICBzcmM6IGxvY2FsKCcnKSxcXHJcXG4gICAgICAgICB1cmwoXCIgKyBfX19DU1NfTE9BREVSX1VSTF9SRVBMQUNFTUVOVF8yX19fICsgXCIpIGZvcm1hdCgnd29mZjInKSwgLyogQ2hyb21lIDI2KywgT3BlcmEgMjMrLCBGaXJlZm94IDM5KyAqL1xcclxcbiAgICAgICAgIHVybChcIiArIF9fX0NTU19MT0FERVJfVVJMX1JFUExBQ0VNRU5UXzNfX18gKyBcIikgZm9ybWF0KCd3b2ZmJyk7IC8qIENocm9tZSA2KywgRmlyZWZveCAzLjYrLCBJRSA5KywgU2FmYXJpIDUuMSsgKi9cXHJcXG4gIH1cXHJcXG5cXHJcXG4vKiBib3JkZXItYm94IG1vZGVsIGZvciBhbGwgZWxlbWVudHMgKi9cXHJcXG5cXHJcXG5odG1sIHtcXHJcXG4gICAgYm94LXNpemluZzogYm9yZGVyLWJveDtcXHJcXG59XFxyXFxuXFxyXFxuKiwgKjo6YmVmb3JlLCAqOjphZnRlciB7XFxyXFxuICAgIGJveC1zaXppbmc6IGluaGVyaXQ7XFxyXFxufVxcclxcblxcclxcbi8qIC0tLSBQYWdlIGNvbG9yIHN0eWxpbmcgLS0tICovXFxyXFxuXFxyXFxuOnJvb3Qge1xcclxcbiAgICAtLWNvbG9yLWJnLW1haW4tMTogI2ZmZmZmZjtcXHJcXG4gICAgLS1jb2xvci1iZy1tYWluLTI6ICNkYmY1Zjg7XFxyXFxuICAgIC0tY29sb3ItYmctbWFpbi0zOiAjZTlmNWZmO1xcclxcbiAgICAtLWNvbG9yLWJnLW1haW4tNDogI2YwYzJjZDYzO1xcclxcbiAgICAtLWNvbG9yLWZvbnQtMTogIzMwNzBhNjs7XFxyXFxufVxcclxcblxcclxcbi8qIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gKi9cXHJcXG5cXHJcXG5ib2R5IHtcXHJcXG4gICAgd2lkdGg6IDEwMCU7XFxyXFxuICAgIGRpc3BsYXk6IGZsZXg7XFxyXFxuICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxyXFxuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxyXFxuICAgIGJhY2tncm91bmQtY29sb3I6IHZhcigtLWNvbG9yLWJnLW1haW4tMSk7XFxyXFxuICAgIGJhY2tncm91bmQtaW1hZ2U6IHVybChcIiArIF9fX0NTU19MT0FERVJfVVJMX1JFUExBQ0VNRU5UXzRfX18gKyBcIiksIHVybChcIiArIF9fX0NTU19MT0FERVJfVVJMX1JFUExBQ0VNRU5UXzVfX18gKyBcIik7XFxyXFxuICAgIGJhY2tncm91bmQtYXR0YWNobWVudDogZml4ZWQ7XFxyXFxuICAgIGJhY2tncm91bmQtcG9zaXRpb246IGxlZnQgdG9wLCByaWdodCBib3R0b207XFxyXFxuICAgIGJhY2tncm91bmQtcmVwZWF0OiByZXBlYXQteTtcXHJcXG4gICAgYmFja2dyb3VuZC1zaXplOiAxNSUgYXV0bztcXHJcXG4gICAgZm9udC1mYW1pbHk6ICdOZXVjaGEnLCBjdXJzaXZlO1xcclxcbiAgICBjb2xvcjogdmFyKC0tY29sb3ItZm9udC0xKTtcXHJcXG59XFxyXFxuXFxyXFxuYm9keS5vcGVuZWQtbWVudSB7XFxyXFxuICAgIG92ZXJmbG93LXk6IGhpZGRlbjtcXHJcXG59XFxyXFxuXFxyXFxuLmluYWN0aXZlIHtcXHJcXG4gICAgdmlzaWJpbGl0eTogaGlkZGVuO1xcclxcbiAgICBwb3NpdGlvbjogZml4ZWQ7XFxyXFxuICAgIHRvcDogMDtcXHJcXG59XFxyXFxuXFxyXFxuLmdyYXBoaWMsIGltZyB7XFxyXFxuICAgIHdpZHRoOiAxMDAlO1xcclxcbiAgICBoZWlnaHQ6IGF1dG87XFxyXFxuICAgIHBhZGRpbmc6IDA7XFxyXFxuICAgIG1hcmdpbjogMDtcXHJcXG59XFxyXFxuXFxyXFxuLmNvbnRhaW5lci1jZW50ZXJlZCB7XFxyXFxuICAgIG1heC13aWR0aDogMTQ0MHB4O1xcclxcbiAgICBtaW4td2lkdGg6IDE0NDBweDtcXHJcXG4gICAgbWFyZ2luOiAwIGF1dG87XFxyXFxufVxcclxcblxcclxcbmhlYWRlci5jb250YWluZXItY2VudGVyZWQge1xcclxcbiAgICBkaXNwbGF5OiBmbGV4O1xcclxcbiAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcclxcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXHJcXG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXHJcXG4gICAgcG9zaXRpb246IC13ZWJraXQtc3RpY2t5O1xcclxcbiAgICBwb3NpdGlvbjogc3RpY2t5O1xcclxcbiAgICB0b3A6IDA7XFxyXFxuICAgIHotaW5kZXg6IDg7XFxyXFxuICAgIG1hcmdpbi10b3A6IDM4MHB4O1xcclxcbn1cXHJcXG5cXHJcXG5oZWFkZXIgLmhlYWRlci1pbWFnZSB7XFxyXFxuICAgIHdpZHRoOiA3MCU7XFxyXFxuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXHJcXG4gICAgdG9wOiAtMzc2cHg7XFxyXFxufVxcclxcblxcclxcbi5tYWluLWNvbnRyb2xzIHtcXHJcXG4gICAgd2lkdGg6IDEwMCU7XFxyXFxuICAgIG1pbi1oZWlnaHQ6IDE1MHB4O1xcclxcbiAgICBkaXNwbGF5OiBmbGV4O1xcclxcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWFyb3VuZDtcXHJcXG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXHJcXG4gICAgYm9yZGVyLXJhZGl1czogMzVweDtcXHJcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogd2hpdGU7XFxyXFxuICAgIGJhY2tncm91bmQtaW1hZ2U6IHVybChcIiArIF9fX0NTU19MT0FERVJfVVJMX1JFUExBQ0VNRU5UXzZfX18gKyBcIiksIHVybChcIiArIF9fX0NTU19MT0FERVJfVVJMX1JFUExBQ0VNRU5UXzdfX18gKyBcIik7XFxyXFxuICAgIGJhY2tncm91bmQtcG9zaXRpb246IDEwMCUgMCwgMCAxMDAlO1xcclxcbiAgICBiYWNrZ3JvdW5kLXJlcGVhdDogcmVwZWF0LXg7XFxyXFxuICAgIGJhY2tncm91bmQtc2l6ZTogYXV0byAyOCU7XFxyXFxufVxcclxcblxcclxcbi5nYW1lLWNvbnRyb2xzIHtcXHJcXG4gICAgd2lkdGg6IDcwJTtcXHJcXG4gICAgbWluLWhlaWdodDogMTIwcHg7XFxyXFxuICAgIHBhZGRpbmc6IDEwcHggMDtcXHJcXG4gICAgZGlzcGxheTogZmxleDtcXHJcXG4gICAganVzdGlmeS1jb250ZW50OiBzcGFjZS1hcm91bmQ7XFxyXFxuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxyXFxuICAgIGJhY2tncm91bmQtY29sb3I6IHdoaXRlO1xcclxcbn1cXHJcXG5cXHJcXG5oMSB7XFxyXFxuICAgIHRleHQtYWxpZ246IGNlbnRlcjtcXHJcXG4gICAgZm9udC1mYW1pbHk6ICdHbG9yaWEgSGFsbGVsdWphaCcsIGN1cnNpdmU7XFxyXFxufVxcclxcblxcclxcbi5idXR0b246aG92ZXIge1xcclxcbiAgICBjdXJzb3I6IHBvaW50ZXI7XFxyXFxufVxcclxcblxcclxcbi5tZW51LWJ1dHRvbiB7XFxyXFxuICAgIHotaW5kZXg6IDEwO1xcclxcbiAgICB3aWR0aDogMzBweDtcXHJcXG4gICAgaGVpZ2h0OiAzMHB4O1xcclxcbiAgICBiYWNrZ3JvdW5kLWltYWdlOiB1cmwoXCIgKyBfX19DU1NfTE9BREVSX1VSTF9SRVBMQUNFTUVOVF84X19fICsgXCIpO1xcclxcbiAgICBiYWNrZ3JvdW5kLXNpemU6IGNvdmVyO1xcclxcbiAgICB0cmFuc2l0aW9uOiB0cmFuc2Zvcm0gMXM7XFxyXFxufVxcclxcblxcclxcbi5tZW51LWJ1dHRvbi5vcGVuZWQtbWVudSB7XFxyXFxuICAgIHRyYW5zZm9ybTogcm90YXRlKDE4MGRlZyk7XFxyXFxufVxcclxcblxcclxcbi5idXR0b24uY2xvc2UtbWVudSB7XFxyXFxuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXHJcXG4gICAgdG9wOiAyMHB4O1xcclxcbiAgICByaWdodDogMjBweDtcXHJcXG4gICAgd2lkdGg6IDUwcHg7XFxyXFxuICAgIGhlaWdodDogNTBweDtcXHJcXG4gICAgYm9yZGVyLXJhZGl1czogNTAlO1xcclxcbiAgICBiYWNrZ3JvdW5kLWltYWdlOiB1cmwoXCIgKyBfX19DU1NfTE9BREVSX1VSTF9SRVBMQUNFTUVOVF85X19fICsgXCIpO1xcclxcbiAgICBiYWNrZ3JvdW5kLXNpemU6IGNvdmVyO1xcclxcblxcclxcbn1cXHJcXG5cXHJcXG4uc3dpdGNoIHtcXHJcXG4gICAgd2lkdGg6IDExMHB4O1xcclxcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjZmFmOGZkO1xcclxcbiAgICBkaXNwbGF5OiBmbGV4O1xcclxcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XFxyXFxuICAgIGJvcmRlci1yYWRpdXM6IDYwcHg7XFxyXFxuICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcXHJcXG4gICAgYm9yZGVyOiAycHggdmFyKC0tY29sb3ItZm9udC0xKSBzb2xpZDtcXHJcXG59XFxyXFxuXFxyXFxuLnN3aXRjaC1yYWlsIHtcXHJcXG4gICAgcG9zaXRpb246IGFic29sdXRlO1xcclxcbiAgICBsZWZ0OiAwO1xcclxcbiAgICB3aWR0aDogMTAwJTtcXHJcXG4gICAgaGVpZ2h0OiAxMDAlO1xcclxcbiAgICBib3JkZXItcmFkaXVzOiBpbmhlcml0O1xcclxcbn1cXHJcXG5cXHJcXG4uc3dpdGNoLXJvbGxlciB7XFxyXFxuICAgIHdpZHRoOiA1NXB4O1xcclxcbiAgICBoZWlnaHQ6IDEwMCU7XFxyXFxuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXHJcXG4gICAgbGVmdDogMDtcXHJcXG4gICAgYm9yZGVyLXJhZGl1czogaW5oZXJpdDtcXHJcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogcmdiKDUwIDExMyAxNjcgLyAzMCUpO1xcclxcbiAgICB6LWluZGV4OiAxMDtcXHJcXG4gICAgdHJhbnNpdGlvbjogbGVmdCAwLjdzO1xcclxcbiAgICBib3JkZXI6IDFweCB2YXIoLS1jb2xvci1mb250LTEpIHNvbGlkO1xcclxcbn1cXHJcXG5cXHJcXG4uc3dpdGNoLnN3aXRjaC1vbiAuc3dpdGNoLXJvbGxlciB7XFxyXFxuICAgIGxlZnQ6IDUzcHg7XFxyXFxufVxcclxcblxcclxcbi5zd2l0Y2gtdHJpZ2dlciB7XFxyXFxuICAgIG1hcmdpbjogMCAxMHB4O1xcclxcbiAgICBoZWlnaHQ6IDQwcHg7XFxyXFxuICAgIHotaW5kZXg6IDk7XFxyXFxuICAgIHBhZGRpbmc6IDEwcHggMDtcXHJcXG4gICAgdGV4dC1hbGlnbjogY2VudGVyO1xcclxcbiAgICBmb250LXNpemU6IDIwcHg7XFxyXFxufVxcclxcblxcclxcbi5nYW1lLWJ1dHRvbiB7XFxyXFxuICAgIHdpZHRoOiAxMDBweDtcXHJcXG4gICAgaGVpZ2h0OiAxMDBweDtcXHJcXG4gICAgYm9yZGVyLXJhZGl1czogNTBweDtcXHJcXG4gICAgYmFja2dyb3VuZC1wb3NpdGlvbjogY2VudGVyO1xcclxcbiAgICBiYWNrZ3JvdW5kLXJlcGVhdDogbm8tcmVwZWF0O1xcclxcbiAgICBiYWNrZ3JvdW5kLXNpemU6IGNvdmVyO1xcclxcbn1cXHJcXG5cXHJcXG4uZ2FtZS1idXR0b24uc3RhcnQtYnV0dG9uIHtcXHJcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogcmdiKDMsIDE0NiwgMzkpO1xcclxcbiAgICBiYWNrZ3JvdW5kLWltYWdlOiB1cmwoXCIgKyBfX19DU1NfTE9BREVSX1VSTF9SRVBMQUNFTUVOVF8xMF9fXyArIFwiKTtcXHJcXG59XFxyXFxuXFxyXFxuLmdhbWUtYnV0dG9uLnJlcGVhdC1idXR0b24ge1xcclxcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2IoMjQ4LCAxNzgsIDExMik7XFxyXFxuICAgIGJhY2tncm91bmQtaW1hZ2U6IHVybChcIiArIF9fX0NTU19MT0FERVJfVVJMX1JFUExBQ0VNRU5UXzExX19fICsgXCIpO1xcclxcbn1cXHJcXG5cXHJcXG4uZ2FtZS1wcm9ncmVzcyB7XFxyXFxuICAgIHdpZHRoOiAyMjBweDtcXHJcXG4gICAgZGlzcGxheTogZmxleDtcXHJcXG4gICAganVzdGlmeS1jb250ZW50OiBzcGFjZS1hcm91bmQ7XFxyXFxuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxyXFxufVxcclxcblxcclxcbi5nYW1lLWluZGljYXRvciB7XFxyXFxuICAgIHdpZHRoOiAxNTBweDtcXHJcXG4gICAgaGVpZ2h0OiA0MHB4O1xcclxcbiAgICBib3JkZXItcmFkaXVzOiAxOHB4O1xcclxcbiAgICBkaXNwbGF5OiBmbGV4O1xcclxcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IGZsZXgtc3RhcnQ7XFxyXFxuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxyXFxuICAgIGJhY2tncm91bmQtY29sb3I6ICNmYWY4ZmQ7XFxyXFxuICAgIGJvcmRlcjogMXB4IHZhcigtLWNvbG9yLWZvbnQtMSkgc29saWQ7XFxyXFxufVxcclxcblxcclxcbi5zdGFyIHtcXHJcXG4gICAgd2lkdGg6IDMwcHg7XFxyXFxufVxcclxcblxcclxcbi5nYW1lLXNjb3JlIHtcXHJcXG4gICAgdGV4dC1hbGlnbjogY2VudGVyO1xcclxcbn1cXHJcXG5cXHJcXG4uZ2FtZS1zY29yZSAuY29ycmVjdCB7XFxyXFxuICAgIGNvbG9yOiBncmVlbjtcXHJcXG59XFxyXFxuXFxyXFxuLmdhbWUtc2NvcmUgLndyb25nIHtcXHJcXG4gICAgY29sb3I6IHJlZDtcXHJcXG59XFxyXFxuXFxyXFxubmF2IHtcXHJcXG4gICAgbGVmdDogLTMyMHB4O1xcclxcbiAgICB2aXNpYmlsaXR5OiBoaWRkZW47XFxyXFxuICAgIHBvc2l0aW9uOiBmaXhlZDtcXHJcXG4gICAgdG9wOiAwO1xcclxcbiAgICB3aWR0aDogMzIwcHg7XFxyXFxuICAgIGhlaWdodDogMTAwJTtcXHJcXG4gICAgb3ZlcmZsb3cteTogYXV0bztcXHJcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0tY29sb3ItYmctbWFpbi0xKTtcXHJcXG4gICAgei1pbmRleDogMTE7XFxyXFxuICAgIGJhY2tncm91bmQtaW1hZ2U6IHVybChcIiArIF9fX0NTU19MT0FERVJfVVJMX1JFUExBQ0VNRU5UXzEyX19fICsgXCIpLCB1cmwoXCIgKyBfX19DU1NfTE9BREVSX1VSTF9SRVBMQUNFTUVOVF8xM19fXyArIFwiKTtcXHJcXG4gICAgYmFja2dyb3VuZC1zaXplOiA0NTBweCBhdXRvLCAxNzlweCBhdXRvO1xcclxcbiAgICBiYWNrZ3JvdW5kLXBvc2l0aW9uOiAwcHggMHB4LCAxMjJweCAxMDAlO1xcclxcbiAgICBiYWNrZ3JvdW5kLXJlcGVhdDogbm8tcmVwZWF0LCBuby1yZXBlYXQ7XFxyXFxuICAgIHRyYW5zaXRpb24tcHJvcGVydHk6IGxlZnQsIHZpc2liaWxpdHksIGJhY2tncm91bmQtcG9zaXRpb247XFxyXFxuICAgIHRyYW5zaXRpb24tZHVyYXRpb246IDEuMnM7XFxyXFxufVxcclxcblxcclxcbm5hdi5vcGVuZWQtbWVudSB7XFxyXFxuICAgIHZpc2liaWxpdHk6IHZpc2libGU7XFxyXFxuICAgIGxlZnQ6IDA7XFxyXFxufVxcclxcblxcclxcbi5tZW51LWxpc3Qge1xcclxcbiAgICBoZWlnaHQ6IDUwMHB4O1xcclxcbiAgICBtYXJnaW4tdG9wOiBjYWxjKDUwdmggLSAyNTBweCk7XFxyXFxufVxcclxcblxcclxcbi5tZW51LWxpc3QgbGkge1xcclxcbiAgICBwYWRkaW5nOiAxMHB4IDA7XFxyXFxuICAgIHRleHQtYWxpZ246IGNlbnRlcjtcXHJcXG4gICAgZm9udC1zaXplOiAyZW07XFxyXFxuICAgIGJhY2tncm91bmQtY29sb3I6IHZhcigtLWNvbG9yLWJnLW1haW4tMSk7XFxyXFxufVxcclxcblxcclxcbi5tZW51LWxpc3QgbGk6aG92ZXIge1xcclxcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1jb2xvci1iZy1tYWluLTIpO1xcclxcbiAgICBiYWNrZ3JvdW5kLWltYWdlOiB1cmwoXCIgKyBfX19DU1NfTE9BREVSX1VSTF9SRVBMQUNFTUVOVF8xNF9fXyArIFwiKTtcXHJcXG4gICAgYmFja2dyb3VuZC1zaXplOiAxMDAlIDEwMCU7XFxyXFxuICAgIGNvbG9yOiB3aGl0ZTtcXHJcXG4gICAgcGFkZGluZzogMTVweCAwO1xcclxcbn1cXHJcXG5cXHJcXG4ubWVudS1saXN0IGxpOm50aC1jaGlsZChldmVuKTpob3ZlciB7XFxyXFxuICAgIGJhY2tncm91bmQtY29sb3I6IHZhcigtLWNvbG9yLWJnLW1haW4tMik7XFxyXFxuICAgIGJhY2tncm91bmQtaW1hZ2U6IHVybChcIiArIF9fX0NTU19MT0FERVJfVVJMX1JFUExBQ0VNRU5UXzE1X19fICsgXCIpO1xcclxcbn1cXHJcXG5cXHJcXG4ubWVudS1saXN0IGxpLmFjdGl2ZS1wYWdlLCAubWVudS1saXN0IGxpLmFjdGl2ZS1wYWdlOmhvdmVyIHtcXHJcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0tY29sb3ItYmctbWFpbi0yKTtcXHJcXG4gICAgYmFja2dyb3VuZC1pbWFnZTogdXJsKFwiICsgX19fQ1NTX0xPQURFUl9VUkxfUkVQTEFDRU1FTlRfMTZfX18gKyBcIik7XFxyXFxuICAgIGJhY2tncm91bmQtc2l6ZTogMTAwJSAxMDAlO1xcclxcbiAgICBjb2xvcjogd2hpdGU7XFxyXFxuICAgIHBhZGRpbmc6IDE1cHggMDtcXHJcXG59XFxyXFxuXFxyXFxubWFpbi5jb250YWluZXItY2VudGVyZWQge1xcclxcbiAgICBtYXJnaW4tdG9wOiAyMHB4O1xcclxcbiAgICBwYWRkaW5nLWJvdHRvbTogMzVweDtcXHJcXG59XFxyXFxuXFxyXFxuLmNhcmQtY29udGFpbmVyIHtcXHJcXG4gICAgZGlzcGxheTogZmxleDtcXHJcXG4gICAganVzdGlmeS1jb250ZW50OiBzcGFjZS1hcm91bmQ7XFxyXFxuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxyXFxuICAgIGZsZXgtd3JhcDogd3JhcDtcXHJcXG4gICAgd2lkdGg6IDgwJTtcXHJcXG4gICAgbWFyZ2luOiBhdXRvO1xcclxcbn1cXHJcXG5cXHJcXG4uY2FyZCB7XFxyXFxuICAgIHdpZHRoOiAyODBweDtcXHJcXG4gICAgaGVpZ2h0OiAyNzBweDtcXHJcXG4gICAgbWFyZ2luOiAxNXB4O1xcclxcbiAgICBwb3NpdGlvbjogcmVsYXRpdmU7XFxyXFxufVxcclxcblxcclxcbi5jYXJkLW1haW4tcGFnZSB7XFxyXFxuICAgIHdpZHRoOiAyNTZweDtcXHJcXG4gICAgaGVpZ2h0OiAyNDBweDtcXHJcXG4gICAgbWFyZ2luLXRvcDogMjBweDtcXHJcXG4gICAgcGFkZGluZzogNDVweDtcXHJcXG4gICAgYm9yZGVyLXJhZGl1czogNTAlO1xcclxcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjZmZmZmZmO1xcclxcbiAgICBiYWNrZ3JvdW5kLWltYWdlOiB1cmwoXCIgKyBfX19DU1NfTE9BREVSX1VSTF9SRVBMQUNFTUVOVF8xN19fXyArIFwiKTtcXHJcXG4gICAgYmFja2dyb3VuZC1zaXplOiAxMDAlIDgzJTtcXHJcXG4gICAgYmFja2dyb3VuZC1yZXBlYXQ6IG5vLXJlcGVhdDtcXHJcXG59XFxyXFxuXFxyXFxuLmNhcmQuZGlzYWJsZWQge1xcclxcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjZDJmODQ4O1xcclxcbn1cXHJcXG5cXHJcXG4uY2FyZC1jb250ZW50IHtcXHJcXG4gICAgd2lkdGg6IDEwMCU7XFxyXFxuICAgIGhlaWdodDogMTAwJTtcXHJcXG4gICAgcG9zaXRpb246IHJlbGF0aXZlO1xcclxcbn1cXHJcXG5cXHJcXG4uY2FyZC1jb250ZW50LCAuY2FyZCBpbWcge1xcclxcbiAgICBib3JkZXItcmFkaXVzOiA1MHB4O1xcclxcbn1cXHJcXG5cXHJcXG4uY2FyZCBwIHtcXHJcXG4gICAgbWFyZ2luLXRvcDogMTVweDtcXHJcXG4gICAgZm9udC1zaXplOiAzMnB4O1xcclxcbiAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XFxyXFxufVxcclxcblxcclxcbi5jYXJkLW1haW4tcGFnZSBwIHtcXHJcXG4gICAgcG9zaXRpb246IHJlbGF0aXZlO1xcclxcbiAgICB0b3A6IDMycHg7XFxyXFxuICAgIGJvcmRlci1yYWRpdXM6IDIwcHg7XFxyXFxuICAgIGZvbnQtc2l6ZTogMjBweDtcXHJcXG59XFxyXFxuXFxyXFxuLmNhcmQtZmxpcC1idXR0b24ge1xcclxcbiAgICB3aWR0aDogNTBweDtcXHJcXG4gICAgaGVpZ2h0OiA1MHB4O1xcclxcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XFxyXFxuICAgIGJvdHRvbTogMjBweDtcXHJcXG4gICAgcmlnaHQ6IDIwcHg7XFxyXFxufVxcclxcblxcclxcbi5jYXJkLWZsaXAtYnV0dG9uIHNwYW4ge1xcclxcbiAgICBmb250LXNpemU6IDUwcHg7XFxyXFxufVxcclxcblxcclxcbi5mbGlwcGVkIC5jYXJkLWNvbnRlbnQge1xcclxcbiAgICBhbmltYXRpb24tbmFtZTogZmxpcC1jYXJkO1xcclxcbiAgICBhbmltYXRpb24tZHVyYXRpb246IDFzO1xcclxcbn1cXHJcXG5cXHJcXG4udW5mbGlwcGVkIC5jYXJkLWNvbnRlbnQge1xcclxcbiAgICBhbmltYXRpb24tbmFtZTogdW5mbGlwLWNhcmQ7XFxyXFxuICAgIGFuaW1hdGlvbi1kdXJhdGlvbjogMXM7XFxyXFxufVxcclxcblxcclxcbi5maW5hbC1jbGlwIHtcXHJcXG4gICAgZGlzcGxheTogZmxleDtcXHJcXG4gICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXHJcXG4gICAgd2lkdGg6IDMyMHB4O1xcclxcbiAgICBtYXJnaW46IGF1dG87XFxyXFxuICAgIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcclxcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xcclxcbiAgICBwYWRkaW5nOiA1MHB4IDA7XFxyXFxufVxcclxcblxcclxcbi5maW5hbC1jbGlwIHAge1xcclxcbiAgICBjb2xvcjogcmVkO1xcclxcbiAgICBmb250LXNpemU6IDM2cHg7XFxyXFxuICAgIG1hcmdpbi10b3A6IDMwcHg7XFxyXFxufVxcclxcblxcclxcbi5zdGF0LWNvbnRhaW5lciB7XFxyXFxuICAgIGRpc3BsYXk6IGZsZXg7XFxyXFxuICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxyXFxuICAgIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcclxcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xcclxcbiAgICBmb250LXNpemU6IDJlbTtcXHJcXG59XFxyXFxuXFxyXFxuLnRhYmxlLXdyYXBwZXIge1xcclxcbiAgICB3aWR0aDogY2FsYygxNDQwdncqMTAwLzE0NDApO1xcclxcbiAgICBvdmVyZmxvdy14OiBhdXRvO1xcclxcbiAgICBkaXNwbGF5OiBmbGV4O1xcclxcbiAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcclxcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXHJcXG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXHJcXG59XFxyXFxuXFxyXFxuLnN0YXQtdGFibGUge1xcclxcbiAgICB3aWR0aDogY2FsYygxNDQwdncqMTAwLzE0NDApO1xcclxcbiAgICBtYXgtd2lkdGg6IDE0NDBweDtcXHJcXG4gICAgbWluLXdpZHRoOiA1MDBweDtcXHJcXG4gICAgYm9yZGVyLWNvbGxhcHNlOiBjb2xsYXBzZTtcXHJcXG4gICAgZm9udC1zaXplOiAwLjVlbTtcXHJcXG5cXHJcXG59XFxyXFxuXFxyXFxudGhlYWQge1xcclxcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiBhbGljZWJsdWU7XFxyXFxufVxcclxcblxcclxcbnRoIHtcXHJcXG4gICAgaGVpZ2h0OiAzMHB4O1xcclxcbn1cXHJcXG5cXHJcXG50ciB7XFxyXFxuICAgIGhlaWdodDogMjVweDtcXHJcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogYXp1cmU7XFxyXFxufVxcclxcblxcclxcbnRoLCB0ZCB7XFxyXFxuICAgIGJvcmRlcjogMXB4IHNvbGlkIGJsYWNrO1xcclxcbiAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XFxyXFxuICAgIHZlcnRpY2FsLWFsaWduOiBtaWRkbGU7XFxyXFxufVxcclxcblxcclxcbnRyOm50aC1jaGlsZChldmVuKSB7XFxyXFxuICAgIGJhY2tncm91bmQtY29sb3I6ICNmZGZkZGU7XFxyXFxufVxcclxcblxcclxcbi5zb3J0ZWQtZG93biwgLnNvcnRlZC11cCB7XFxyXFxuICAgIGJhY2tncm91bmQtY29sb3I6ICNkMGZhODE7XFxyXFxufVxcclxcblxcclxcbi5zb3J0LWljb24ge1xcclxcbiAgICB3aWR0aDogMTZweDtcXHJcXG4gICAgaGVpZ2h0OiBhdXRvO1xcclxcbiAgICBwb3NpdGlvbjogcmVsYXRpdmU7XFxyXFxuICAgIGxlZnQ6IDEwcHg7XFxyXFxuICAgIHRvcDogMnB4O1xcclxcbn1cXHJcXG5cXHJcXG4uc3RhdC1idXR0b25zLXdyYXBwZXIge1xcclxcbiAgICB3aWR0aDogMTAwJTtcXHJcXG4gICAgZGlzcGxheTogZmxleDtcXHJcXG4gICAganVzdGlmeS1jb250ZW50OiBzcGFjZS1hcm91bmQ7XFxyXFxuICAgIGZsZXgtd3JhcDogd3JhcDtcXHJcXG59XFxyXFxuXFxyXFxuLnN0YXQtYnV0dG9uIHtcXHJcXG4gICAgd2lkdGg6IDMwMHB4O1xcclxcbiAgICBoZWlnaHQ6IDcwcHg7XFxyXFxuICAgIG1hcmdpbjogMjBweCAwO1xcclxcbiAgICBwYWRkaW5nOiAxNXB4O1xcclxcbiAgICBib3JkZXItcmFkaXVzOiA1MHB4O1xcclxcbiAgICBib3JkZXI6IDFweCBzb2xpZCByZ2IoMCwgMCwgMCk7XFxyXFxuICAgIGNvbG9yOiBhenVyZTtcXHJcXG4gICAgdGV4dC1hbGlnbjogY2VudGVyO1xcclxcbn1cXHJcXG5cXHJcXG4uYnV0dG9uLnRyYWluLWRpZmYge1xcclxcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2IoNywgMTYwLCA5Nik7XFxyXFxufVxcclxcblxcclxcbi5idXR0b24ucmVzZXQtc3RhdCB7XFxyXFxuICAgIGJhY2tncm91bmQtY29sb3I6IHJnYigxODksIDQ1LCA0NSk7XFxyXFxufVxcclxcblxcclxcbi5ub3RoaW5nLWRpZmYge1xcclxcbiAgICB3aWR0aDogMTAwJTtcXHJcXG59XFxyXFxuXFxyXFxuLm5vdGhpbmctZGlmZiBwIHtcXHJcXG4gICAgcG9zaXRpb246IGFic29sdXRlO1xcclxcbiAgICB0b3A6IDIwJTtcXHJcXG59XFxyXFxuXFxyXFxuLmRpc2FibGVkOmhvdmVyIHtcXHJcXG4gICAgY3Vyc29yOm5vdC1hbGxvd2VkO1xcclxcbn1cXHJcXG5cXHJcXG4vKiAtLS0gQW5pbWF0aW9uIC0tLSAqL1xcclxcblxcclxcbkBrZXlmcmFtZXMgZmxpcC1jYXJkIHtcXHJcXG4gICAgMCUge31cXHJcXG4gICAgNTAlIHt0cmFuc2Zvcm06IHJvdGF0ZVkoODlkZWcpfVxcclxcbn1cXHJcXG5cXHJcXG5Aa2V5ZnJhbWVzIHVuZmxpcC1jYXJkIHtcXHJcXG4gICAgMCUge31cXHJcXG4gICAgNTAlIHt0cmFuc2Zvcm06IHJvdGF0ZVkoODlkZWcpfVxcclxcbn1cXHJcXG5cXHJcXG4vKiAtLS0gUkVTUE9OU0lWRSBMQVlPVVRTIC0tLSAqL1xcclxcblxcclxcbkBtZWRpYSAobWF4LXdpZHRoOiAxNDM5cHgpIHtcXHJcXG4gICAgLmNvbnRhaW5lci1jZW50ZXJlZCB7XFxyXFxuICAgICAgICBtaW4td2lkdGg6IGNhbGMoMTQ0MHZ3KjEwMC8xNDQwKTtcXHJcXG4gICAgfVxcclxcblxcclxcbiAgICBoZWFkZXIuY29udGFpbmVyLWNlbnRlcmVkIHtcXHJcXG4gICAgICAgIG1hcmdpbi10b3A6ICBjYWxjKDM4MHZ3KjEwMC8xNDQwKTtcXHJcXG4gICAgfVxcclxcblxcclxcbiAgICBoZWFkZXIgLmdyYXBoaWMge1xcclxcbiAgICAgICAgdG9wOiBjYWxjKC0zNzZ2dyoxMDAvMTQ0MCk7XFxyXFxuICAgIH1cXHJcXG5cXHJcXG59XFxyXFxuXFxyXFxuQG1lZGlhIChtYXgtaGVpZ2h0OiA5NzBweCkge1xcclxcbiAgICAubWVudS1saXN0IHtcXHJcXG4gICAgICAgIG1hcmdpbi10b3A6IDIzNXB4O1xcclxcbiAgICB9XFxyXFxufVwiLCBcIlwiLHtcInZlcnNpb25cIjozLFwic291cmNlc1wiOltcIndlYnBhY2s6Ly8uL2Fzc2V0cy9zdHlsZXMvc3R5bGUuY3NzXCJdLFwibmFtZXNcIjpbXSxcIm1hcHBpbmdzXCI6XCJBQUFBLHNDQUFzQztBQUN0QztJQUNJLGdDQUFnQztJQUNoQyxrQkFBa0I7SUFDbEIsZ0JBQWdCO0lBQ2hCOzsrREFFNEUsRUFBRSxnREFBZ0Q7RUFDaEk7O0FBRUYsMkJBQTJCO0FBQzNCO0lBQ0kscUJBQXFCO0lBQ3JCLGtCQUFrQjtJQUNsQixnQkFBZ0I7SUFDaEI7OytEQUVpRSxFQUFFLGdEQUFnRDtFQUNySDs7QUFFRixzQ0FBc0M7O0FBRXRDO0lBQ0ksc0JBQXNCO0FBQzFCOztBQUVBO0lBQ0ksbUJBQW1CO0FBQ3ZCOztBQUVBLCtCQUErQjs7QUFFL0I7SUFDSSwwQkFBMEI7SUFDMUIsMEJBQTBCO0lBQzFCLDBCQUEwQjtJQUMxQiw0QkFBNEI7SUFDNUIsdUJBQXVCO0FBQzNCOztBQUVBLHVDQUF1Qzs7QUFFdkM7SUFDSSxXQUFXO0lBQ1gsYUFBYTtJQUNiLHNCQUFzQjtJQUN0QixtQkFBbUI7SUFDbkIsd0NBQXdDO0lBQ3hDLGtHQUErRztJQUMvRyw0QkFBNEI7SUFDNUIsMkNBQTJDO0lBQzNDLDJCQUEyQjtJQUMzQix5QkFBeUI7SUFDekIsOEJBQThCO0lBQzlCLDBCQUEwQjtBQUM5Qjs7QUFFQTtJQUNJLGtCQUFrQjtBQUN0Qjs7QUFFQTtJQUNJLGtCQUFrQjtJQUNsQixlQUFlO0lBQ2YsTUFBTTtBQUNWOztBQUVBO0lB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SUFBSTtJQUNKLEtBQUsseUJBQXlCO0FBQ2xDOztBQUVBO0lBQ0ksSUFBSTtJQUNKLEtBQUsseUJBQXlCO0FBQ2xDOztBQUVBLCtCQUErQjs7QUFFL0I7SUFDSTtRQUNJLGdDQUFnQztJQUNwQzs7SUFFQTtRQUNJLGlDQUFpQztJQUNyQzs7SUFFQTtRQUNJLDBCQUEwQjtJQUM5Qjs7QUFFSjs7QUFFQTtJQUNJO1FBQ0ksaUJBQWlCO0lBQ3JCO0FBQ0pcIixcInNvdXJjZXNDb250ZW50XCI6W1wiLyogZ2xvcmlhLWhhbGxlbHVqYWgtcmVndWxhciAtIGxhdGluICovXFxyXFxuQGZvbnQtZmFjZSB7XFxyXFxuICAgIGZvbnQtZmFtaWx5OiAnR2xvcmlhIEhhbGxlbHVqYWgnO1xcclxcbiAgICBmb250LXN0eWxlOiBub3JtYWw7XFxyXFxuICAgIGZvbnQtd2VpZ2h0OiA0MDA7XFxyXFxuICAgIHNyYzogbG9jYWwoJycpLFxcclxcbiAgICAgICAgIHVybCgnLi4vZm9udHMvZ2xvcmlhLWhhbGxlbHVqYWgtdjE3LWxhdGluLXJlZ3VsYXIud29mZjInKSBmb3JtYXQoJ3dvZmYyJyksIC8qIENocm9tZSAyNissIE9wZXJhIDIzKywgRmlyZWZveCAzOSsgKi9cXHJcXG4gICAgICAgICB1cmwoJy4uL2ZvbnRzL2dsb3JpYS1oYWxsZWx1amFoLXYxNy1sYXRpbi1yZWd1bGFyLndvZmYnKSBmb3JtYXQoJ3dvZmYnKTsgLyogQ2hyb21lIDYrLCBGaXJlZm94IDMuNissIElFIDkrLCBTYWZhcmkgNS4xKyAqL1xcclxcbiAgfVxcclxcblxcclxcbi8qIG5ldWNoYS1yZWd1bGFyIC0gbGF0aW4gKi9cXHJcXG5AZm9udC1mYWNlIHtcXHJcXG4gICAgZm9udC1mYW1pbHk6ICdOZXVjaGEnO1xcclxcbiAgICBmb250LXN0eWxlOiBub3JtYWw7XFxyXFxuICAgIGZvbnQtd2VpZ2h0OiA0MDA7XFxyXFxuICAgIHNyYzogbG9jYWwoJycpLFxcclxcbiAgICAgICAgIHVybCgnLi4vZm9udHMvbmV1Y2hhLXYxNy1sYXRpbi1yZWd1bGFyLndvZmYyJykgZm9ybWF0KCd3b2ZmMicpLCAvKiBDaHJvbWUgMjYrLCBPcGVyYSAyMyssIEZpcmVmb3ggMzkrICovXFxyXFxuICAgICAgICAgdXJsKCcuLi9mb250cy9uZXVjaGEtdjE3LWxhdGluLXJlZ3VsYXIud29mZicpIGZvcm1hdCgnd29mZicpOyAvKiBDaHJvbWUgNissIEZpcmVmb3ggMy42KywgSUUgOSssIFNhZmFyaSA1LjErICovXFxyXFxuICB9XFxyXFxuXFxyXFxuLyogYm9yZGVyLWJveCBtb2RlbCBmb3IgYWxsIGVsZW1lbnRzICovXFxyXFxuXFxyXFxuaHRtbCB7XFxyXFxuICAgIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XFxyXFxufVxcclxcblxcclxcbiosICo6OmJlZm9yZSwgKjo6YWZ0ZXIge1xcclxcbiAgICBib3gtc2l6aW5nOiBpbmhlcml0O1xcclxcbn1cXHJcXG5cXHJcXG4vKiAtLS0gUGFnZSBjb2xvciBzdHlsaW5nIC0tLSAqL1xcclxcblxcclxcbjpyb290IHtcXHJcXG4gICAgLS1jb2xvci1iZy1tYWluLTE6ICNmZmZmZmY7XFxyXFxuICAgIC0tY29sb3ItYmctbWFpbi0yOiAjZGJmNWY4O1xcclxcbiAgICAtLWNvbG9yLWJnLW1haW4tMzogI2U5ZjVmZjtcXHJcXG4gICAgLS1jb2xvci1iZy1tYWluLTQ6ICNmMGMyY2Q2MztcXHJcXG4gICAgLS1jb2xvci1mb250LTE6ICMzMDcwYTY7O1xcclxcbn1cXHJcXG5cXHJcXG4vKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tICovXFxyXFxuXFxyXFxuYm9keSB7XFxyXFxuICAgIHdpZHRoOiAxMDAlO1xcclxcbiAgICBkaXNwbGF5OiBmbGV4O1xcclxcbiAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcclxcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xcclxcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1jb2xvci1iZy1tYWluLTEpO1xcclxcbiAgICBiYWNrZ3JvdW5kLWltYWdlOiB1cmwoXFxcIi4uL2ltZy9hcHAvd2F0ZXJjb2xvci1ibHVlLWJnLWxlZnQuanBnXFxcIiksIHVybChcXFwiLi4vaW1nL2FwcC93YXRlcmNvbG9yLWJsdWUtYmctcmlnaHQuanBnXFxcIik7XFxyXFxuICAgIGJhY2tncm91bmQtYXR0YWNobWVudDogZml4ZWQ7XFxyXFxuICAgIGJhY2tncm91bmQtcG9zaXRpb246IGxlZnQgdG9wLCByaWdodCBib3R0b207XFxyXFxuICAgIGJhY2tncm91bmQtcmVwZWF0OiByZXBlYXQteTtcXHJcXG4gICAgYmFja2dyb3VuZC1zaXplOiAxNSUgYXV0bztcXHJcXG4gICAgZm9udC1mYW1pbHk6ICdOZXVjaGEnLCBjdXJzaXZlO1xcclxcbiAgICBjb2xvcjogdmFyKC0tY29sb3ItZm9udC0xKTtcXHJcXG59XFxyXFxuXFxyXFxuYm9keS5vcGVuZWQtbWVudSB7XFxyXFxuICAgIG92ZXJmbG93LXk6IGhpZGRlbjtcXHJcXG59XFxyXFxuXFxyXFxuLmluYWN0aXZlIHtcXHJcXG4gICAgdmlzaWJpbGl0eTogaGlkZGVuO1xcclxcbiAgICBwb3NpdGlvbjogZml4ZWQ7XFxyXFxuICAgIHRvcDogMDtcXHJcXG59XFxyXFxuXFxyXFxuLmdyYXBoaWMsIGltZyB7XFxyXFxuICAgIHdpZHRoOiAxMDAlO1xcclxcbiAgICBoZWlnaHQ6IGF1dG87XFxyXFxuICAgIHBhZGRpbmc6IDA7XFxyXFxuICAgIG1hcmdpbjogMDtcXHJcXG59XFxyXFxuXFxyXFxuLmNvbnRhaW5lci1jZW50ZXJlZCB7XFxyXFxuICAgIG1heC13aWR0aDogMTQ0MHB4O1xcclxcbiAgICBtaW4td2lkdGg6IDE0NDBweDtcXHJcXG4gICAgbWFyZ2luOiAwIGF1dG87XFxyXFxufVxcclxcblxcclxcbmhlYWRlci5jb250YWluZXItY2VudGVyZWQge1xcclxcbiAgICBkaXNwbGF5OiBmbGV4O1xcclxcbiAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcclxcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXHJcXG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXHJcXG4gICAgcG9zaXRpb246IC13ZWJraXQtc3RpY2t5O1xcclxcbiAgICBwb3NpdGlvbjogc3RpY2t5O1xcclxcbiAgICB0b3A6IDA7XFxyXFxuICAgIHotaW5kZXg6IDg7XFxyXFxuICAgIG1hcmdpbi10b3A6IDM4MHB4O1xcclxcbn1cXHJcXG5cXHJcXG5oZWFkZXIgLmhlYWRlci1pbWFnZSB7XFxyXFxuICAgIHdpZHRoOiA3MCU7XFxyXFxuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXHJcXG4gICAgdG9wOiAtMzc2cHg7XFxyXFxufVxcclxcblxcclxcbi5tYWluLWNvbnRyb2xzIHtcXHJcXG4gICAgd2lkdGg6IDEwMCU7XFxyXFxuICAgIG1pbi1oZWlnaHQ6IDE1MHB4O1xcclxcbiAgICBkaXNwbGF5OiBmbGV4O1xcclxcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWFyb3VuZDtcXHJcXG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXHJcXG4gICAgYm9yZGVyLXJhZGl1czogMzVweDtcXHJcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogd2hpdGU7XFxyXFxuICAgIGJhY2tncm91bmQtaW1hZ2U6IHVybCguLi9pbWcvYXBwL3dhdGVyY29sb3Itd2F2ZXMtMDEtdXAucG5nKSwgdXJsKC4uL2ltZy9hcHAvd2F0ZXJjb2xvci13YXZlcy0wMS1kb3duLnBuZyk7XFxyXFxuICAgIGJhY2tncm91bmQtcG9zaXRpb246IDEwMCUgMCwgMCAxMDAlO1xcclxcbiAgICBiYWNrZ3JvdW5kLXJlcGVhdDogcmVwZWF0LXg7XFxyXFxuICAgIGJhY2tncm91bmQtc2l6ZTogYXV0byAyOCU7XFxyXFxufVxcclxcblxcclxcbi5nYW1lLWNvbnRyb2xzIHtcXHJcXG4gICAgd2lkdGg6IDcwJTtcXHJcXG4gICAgbWluLWhlaWdodDogMTIwcHg7XFxyXFxuICAgIHBhZGRpbmc6IDEwcHggMDtcXHJcXG4gICAgZGlzcGxheTogZmxleDtcXHJcXG4gICAganVzdGlmeS1jb250ZW50OiBzcGFjZS1hcm91bmQ7XFxyXFxuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxyXFxuICAgIGJhY2tncm91bmQtY29sb3I6IHdoaXRlO1xcclxcbn1cXHJcXG5cXHJcXG5oMSB7XFxyXFxuICAgIHRleHQtYWxpZ246IGNlbnRlcjtcXHJcXG4gICAgZm9udC1mYW1pbHk6ICdHbG9yaWEgSGFsbGVsdWphaCcsIGN1cnNpdmU7XFxyXFxufVxcclxcblxcclxcbi5idXR0b246aG92ZXIge1xcclxcbiAgICBjdXJzb3I6IHBvaW50ZXI7XFxyXFxufVxcclxcblxcclxcbi5tZW51LWJ1dHRvbiB7XFxyXFxuICAgIHotaW5kZXg6IDEwO1xcclxcbiAgICB3aWR0aDogMzBweDtcXHJcXG4gICAgaGVpZ2h0OiAzMHB4O1xcclxcbiAgICBiYWNrZ3JvdW5kLWltYWdlOiB1cmwoXFxcIi4uL2ltZy9hcHAvd2F0ZXJjb2xvci1tZW51LWJ1dHRvbi0wMS5wbmdcXFwiKTtcXHJcXG4gICAgYmFja2dyb3VuZC1zaXplOiBjb3ZlcjtcXHJcXG4gICAgdHJhbnNpdGlvbjogdHJhbnNmb3JtIDFzO1xcclxcbn1cXHJcXG5cXHJcXG4ubWVudS1idXR0b24ub3BlbmVkLW1lbnUge1xcclxcbiAgICB0cmFuc2Zvcm06IHJvdGF0ZSgxODBkZWcpO1xcclxcbn1cXHJcXG5cXHJcXG4uYnV0dG9uLmNsb3NlLW1lbnUge1xcclxcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XFxyXFxuICAgIHRvcDogMjBweDtcXHJcXG4gICAgcmlnaHQ6IDIwcHg7XFxyXFxuICAgIHdpZHRoOiA1MHB4O1xcclxcbiAgICBoZWlnaHQ6IDUwcHg7XFxyXFxuICAgIGJvcmRlci1yYWRpdXM6IDUwJTtcXHJcXG4gICAgYmFja2dyb3VuZC1pbWFnZTogdXJsKFxcXCIuLi9pbWcvYXBwL3dhdGVyY29sb3ItcmVkLWNyb3NzLWJ1dHRvbi0wMS5qcGdcXFwiKTtcXHJcXG4gICAgYmFja2dyb3VuZC1zaXplOiBjb3ZlcjtcXHJcXG5cXHJcXG59XFxyXFxuXFxyXFxuLnN3aXRjaCB7XFxyXFxuICAgIHdpZHRoOiAxMTBweDtcXHJcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogI2ZhZjhmZDtcXHJcXG4gICAgZGlzcGxheTogZmxleDtcXHJcXG4gICAganVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuO1xcclxcbiAgICBib3JkZXItcmFkaXVzOiA2MHB4O1xcclxcbiAgICBwb3NpdGlvbjogcmVsYXRpdmU7XFxyXFxuICAgIGJvcmRlcjogMnB4IHZhcigtLWNvbG9yLWZvbnQtMSkgc29saWQ7XFxyXFxufVxcclxcblxcclxcbi5zd2l0Y2gtcmFpbCB7XFxyXFxuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXHJcXG4gICAgbGVmdDogMDtcXHJcXG4gICAgd2lkdGg6IDEwMCU7XFxyXFxuICAgIGhlaWdodDogMTAwJTtcXHJcXG4gICAgYm9yZGVyLXJhZGl1czogaW5oZXJpdDtcXHJcXG59XFxyXFxuXFxyXFxuLnN3aXRjaC1yb2xsZXIge1xcclxcbiAgICB3aWR0aDogNTVweDtcXHJcXG4gICAgaGVpZ2h0OiAxMDAlO1xcclxcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XFxyXFxuICAgIGxlZnQ6IDA7XFxyXFxuICAgIGJvcmRlci1yYWRpdXM6IGluaGVyaXQ7XFxyXFxuICAgIGJhY2tncm91bmQtY29sb3I6IHJnYig1MCAxMTMgMTY3IC8gMzAlKTtcXHJcXG4gICAgei1pbmRleDogMTA7XFxyXFxuICAgIHRyYW5zaXRpb246IGxlZnQgMC43cztcXHJcXG4gICAgYm9yZGVyOiAxcHggdmFyKC0tY29sb3ItZm9udC0xKSBzb2xpZDtcXHJcXG59XFxyXFxuXFxyXFxuLnN3aXRjaC5zd2l0Y2gtb24gLnN3aXRjaC1yb2xsZXIge1xcclxcbiAgICBsZWZ0OiA1M3B4O1xcclxcbn1cXHJcXG5cXHJcXG4uc3dpdGNoLXRyaWdnZXIge1xcclxcbiAgICBtYXJnaW46IDAgMTBweDtcXHJcXG4gICAgaGVpZ2h0OiA0MHB4O1xcclxcbiAgICB6LWluZGV4OiA5O1xcclxcbiAgICBwYWRkaW5nOiAxMHB4IDA7XFxyXFxuICAgIHRleHQtYWxpZ246IGNlbnRlcjtcXHJcXG4gICAgZm9udC1zaXplOiAyMHB4O1xcclxcbn1cXHJcXG5cXHJcXG4uZ2FtZS1idXR0b24ge1xcclxcbiAgICB3aWR0aDogMTAwcHg7XFxyXFxuICAgIGhlaWdodDogMTAwcHg7XFxyXFxuICAgIGJvcmRlci1yYWRpdXM6IDUwcHg7XFxyXFxuICAgIGJhY2tncm91bmQtcG9zaXRpb246IGNlbnRlcjtcXHJcXG4gICAgYmFja2dyb3VuZC1yZXBlYXQ6IG5vLXJlcGVhdDtcXHJcXG4gICAgYmFja2dyb3VuZC1zaXplOiBjb3ZlcjtcXHJcXG59XFxyXFxuXFxyXFxuLmdhbWUtYnV0dG9uLnN0YXJ0LWJ1dHRvbiB7XFxyXFxuICAgIGJhY2tncm91bmQtY29sb3I6IHJnYigzLCAxNDYsIDM5KTtcXHJcXG4gICAgYmFja2dyb3VuZC1pbWFnZTogdXJsKFxcXCIuLi9pbWcvYXBwL3N0YXJ0LWJ1dHRvbi5qcGdcXFwiKTtcXHJcXG59XFxyXFxuXFxyXFxuLmdhbWUtYnV0dG9uLnJlcGVhdC1idXR0b24ge1xcclxcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2IoMjQ4LCAxNzgsIDExMik7XFxyXFxuICAgIGJhY2tncm91bmQtaW1hZ2U6IHVybChcXFwiLi4vaW1nL2FwcC9idXR0b24tcmVwZWF0LmpwZ1xcXCIpO1xcclxcbn1cXHJcXG5cXHJcXG4uZ2FtZS1wcm9ncmVzcyB7XFxyXFxuICAgIHdpZHRoOiAyMjBweDtcXHJcXG4gICAgZGlzcGxheTogZmxleDtcXHJcXG4gICAganVzdGlmeS1jb250ZW50OiBzcGFjZS1hcm91bmQ7XFxyXFxuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxyXFxufVxcclxcblxcclxcbi5nYW1lLWluZGljYXRvciB7XFxyXFxuICAgIHdpZHRoOiAxNTBweDtcXHJcXG4gICAgaGVpZ2h0OiA0MHB4O1xcclxcbiAgICBib3JkZXItcmFkaXVzOiAxOHB4O1xcclxcbiAgICBkaXNwbGF5OiBmbGV4O1xcclxcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IGZsZXgtc3RhcnQ7XFxyXFxuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxyXFxuICAgIGJhY2tncm91bmQtY29sb3I6ICNmYWY4ZmQ7XFxyXFxuICAgIGJvcmRlcjogMXB4IHZhcigtLWNvbG9yLWZvbnQtMSkgc29saWQ7XFxyXFxufVxcclxcblxcclxcbi5zdGFyIHtcXHJcXG4gICAgd2lkdGg6IDMwcHg7XFxyXFxufVxcclxcblxcclxcbi5nYW1lLXNjb3JlIHtcXHJcXG4gICAgdGV4dC1hbGlnbjogY2VudGVyO1xcclxcbn1cXHJcXG5cXHJcXG4uZ2FtZS1zY29yZSAuY29ycmVjdCB7XFxyXFxuICAgIGNvbG9yOiBncmVlbjtcXHJcXG59XFxyXFxuXFxyXFxuLmdhbWUtc2NvcmUgLndyb25nIHtcXHJcXG4gICAgY29sb3I6IHJlZDtcXHJcXG59XFxyXFxuXFxyXFxubmF2IHtcXHJcXG4gICAgbGVmdDogLTMyMHB4O1xcclxcbiAgICB2aXNpYmlsaXR5OiBoaWRkZW47XFxyXFxuICAgIHBvc2l0aW9uOiBmaXhlZDtcXHJcXG4gICAgdG9wOiAwO1xcclxcbiAgICB3aWR0aDogMzIwcHg7XFxyXFxuICAgIGhlaWdodDogMTAwJTtcXHJcXG4gICAgb3ZlcmZsb3cteTogYXV0bztcXHJcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0tY29sb3ItYmctbWFpbi0xKTtcXHJcXG4gICAgei1pbmRleDogMTE7XFxyXFxuICAgIGJhY2tncm91bmQtaW1hZ2U6IHVybChcXFwiLi4vaW1nL2FwcC93YXRlcmNvbG9yLWt5dGVzLTAxLmpwZ1xcXCIpLCB1cmwoXFxcIi4uL2ltZy9hcHAvd2F0ZXJjb2xvci1idXRlcmZseS0wMS5qcGdcXFwiKTtcXHJcXG4gICAgYmFja2dyb3VuZC1zaXplOiA0NTBweCBhdXRvLCAxNzlweCBhdXRvO1xcclxcbiAgICBiYWNrZ3JvdW5kLXBvc2l0aW9uOiAwcHggMHB4LCAxMjJweCAxMDAlO1xcclxcbiAgICBiYWNrZ3JvdW5kLXJlcGVhdDogbm8tcmVwZWF0LCBuby1yZXBlYXQ7XFxyXFxuICAgIHRyYW5zaXRpb24tcHJvcGVydHk6IGxlZnQsIHZpc2liaWxpdHksIGJhY2tncm91bmQtcG9zaXRpb247XFxyXFxuICAgIHRyYW5zaXRpb24tZHVyYXRpb246IDEuMnM7XFxyXFxufVxcclxcblxcclxcbm5hdi5vcGVuZWQtbWVudSB7XFxyXFxuICAgIHZpc2liaWxpdHk6IHZpc2libGU7XFxyXFxuICAgIGxlZnQ6IDA7XFxyXFxufVxcclxcblxcclxcbi5tZW51LWxpc3Qge1xcclxcbiAgICBoZWlnaHQ6IDUwMHB4O1xcclxcbiAgICBtYXJnaW4tdG9wOiBjYWxjKDUwdmggLSAyNTBweCk7XFxyXFxufVxcclxcblxcclxcbi5tZW51LWxpc3QgbGkge1xcclxcbiAgICBwYWRkaW5nOiAxMHB4IDA7XFxyXFxuICAgIHRleHQtYWxpZ246IGNlbnRlcjtcXHJcXG4gICAgZm9udC1zaXplOiAyZW07XFxyXFxuICAgIGJhY2tncm91bmQtY29sb3I6IHZhcigtLWNvbG9yLWJnLW1haW4tMSk7XFxyXFxufVxcclxcblxcclxcbi5tZW51LWxpc3QgbGk6aG92ZXIge1xcclxcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1jb2xvci1iZy1tYWluLTIpO1xcclxcbiAgICBiYWNrZ3JvdW5kLWltYWdlOiB1cmwoXFxcIi4uL2ltZy9hcHAvd2F0ZXJjb2xvci1saW5lLTAyLXJpZ2h0LnBuZ1xcXCIpO1xcclxcbiAgICBiYWNrZ3JvdW5kLXNpemU6IDEwMCUgMTAwJTtcXHJcXG4gICAgY29sb3I6IHdoaXRlO1xcclxcbiAgICBwYWRkaW5nOiAxNXB4IDA7XFxyXFxufVxcclxcblxcclxcbi5tZW51LWxpc3QgbGk6bnRoLWNoaWxkKGV2ZW4pOmhvdmVyIHtcXHJcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0tY29sb3ItYmctbWFpbi0yKTtcXHJcXG4gICAgYmFja2dyb3VuZC1pbWFnZTogdXJsKFxcXCIuLi9pbWcvYXBwL3dhdGVyY29sb3ItbGluZS0wMi5wbmdcXFwiKTtcXHJcXG59XFxyXFxuXFxyXFxuLm1lbnUtbGlzdCBsaS5hY3RpdmUtcGFnZSwgLm1lbnUtbGlzdCBsaS5hY3RpdmUtcGFnZTpob3ZlciB7XFxyXFxuICAgIGJhY2tncm91bmQtY29sb3I6IHZhcigtLWNvbG9yLWJnLW1haW4tMik7XFxyXFxuICAgIGJhY2tncm91bmQtaW1hZ2U6IHVybChcXFwiLi4vaW1nL2FwcC93YXRlcmNvbG9yLWxpbmUtMDEucG5nXFxcIik7XFxyXFxuICAgIGJhY2tncm91bmQtc2l6ZTogMTAwJSAxMDAlO1xcclxcbiAgICBjb2xvcjogd2hpdGU7XFxyXFxuICAgIHBhZGRpbmc6IDE1cHggMDtcXHJcXG59XFxyXFxuXFxyXFxubWFpbi5jb250YWluZXItY2VudGVyZWQge1xcclxcbiAgICBtYXJnaW4tdG9wOiAyMHB4O1xcclxcbiAgICBwYWRkaW5nLWJvdHRvbTogMzVweDtcXHJcXG59XFxyXFxuXFxyXFxuLmNhcmQtY29udGFpbmVyIHtcXHJcXG4gICAgZGlzcGxheTogZmxleDtcXHJcXG4gICAganVzdGlmeS1jb250ZW50OiBzcGFjZS1hcm91bmQ7XFxyXFxuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxyXFxuICAgIGZsZXgtd3JhcDogd3JhcDtcXHJcXG4gICAgd2lkdGg6IDgwJTtcXHJcXG4gICAgbWFyZ2luOiBhdXRvO1xcclxcbn1cXHJcXG5cXHJcXG4uY2FyZCB7XFxyXFxuICAgIHdpZHRoOiAyODBweDtcXHJcXG4gICAgaGVpZ2h0OiAyNzBweDtcXHJcXG4gICAgbWFyZ2luOiAxNXB4O1xcclxcbiAgICBwb3NpdGlvbjogcmVsYXRpdmU7XFxyXFxufVxcclxcblxcclxcbi5jYXJkLW1haW4tcGFnZSB7XFxyXFxuICAgIHdpZHRoOiAyNTZweDtcXHJcXG4gICAgaGVpZ2h0OiAyNDBweDtcXHJcXG4gICAgbWFyZ2luLXRvcDogMjBweDtcXHJcXG4gICAgcGFkZGluZzogNDVweDtcXHJcXG4gICAgYm9yZGVyLXJhZGl1czogNTAlO1xcclxcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjZmZmZmZmO1xcclxcbiAgICBiYWNrZ3JvdW5kLWltYWdlOiB1cmwoXFxcIi4uL2ltZy9hcHAvd2F0ZXJjb2xvci1ibHVlLWNhcmQtYmctMDEuanBnXFxcIik7XFxyXFxuICAgIGJhY2tncm91bmQtc2l6ZTogMTAwJSA4MyU7XFxyXFxuICAgIGJhY2tncm91bmQtcmVwZWF0OiBuby1yZXBlYXQ7XFxyXFxufVxcclxcblxcclxcbi5jYXJkLmRpc2FibGVkIHtcXHJcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogI2QyZjg0ODtcXHJcXG59XFxyXFxuXFxyXFxuLmNhcmQtY29udGVudCB7XFxyXFxuICAgIHdpZHRoOiAxMDAlO1xcclxcbiAgICBoZWlnaHQ6IDEwMCU7XFxyXFxuICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcXHJcXG59XFxyXFxuXFxyXFxuLmNhcmQtY29udGVudCwgLmNhcmQgaW1nIHtcXHJcXG4gICAgYm9yZGVyLXJhZGl1czogNTBweDtcXHJcXG59XFxyXFxuXFxyXFxuLmNhcmQgcCB7XFxyXFxuICAgIG1hcmdpbi10b3A6IDE1cHg7XFxyXFxuICAgIGZvbnQtc2l6ZTogMzJweDtcXHJcXG4gICAgdGV4dC1hbGlnbjogY2VudGVyO1xcclxcbn1cXHJcXG5cXHJcXG4uY2FyZC1tYWluLXBhZ2UgcCB7XFxyXFxuICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcXHJcXG4gICAgdG9wOiAzMnB4O1xcclxcbiAgICBib3JkZXItcmFkaXVzOiAyMHB4O1xcclxcbiAgICBmb250LXNpemU6IDIwcHg7XFxyXFxufVxcclxcblxcclxcbi5jYXJkLWZsaXAtYnV0dG9uIHtcXHJcXG4gICAgd2lkdGg6IDUwcHg7XFxyXFxuICAgIGhlaWdodDogNTBweDtcXHJcXG4gICAgcG9zaXRpb246IGFic29sdXRlO1xcclxcbiAgICBib3R0b206IDIwcHg7XFxyXFxuICAgIHJpZ2h0OiAyMHB4O1xcclxcbn1cXHJcXG5cXHJcXG4uY2FyZC1mbGlwLWJ1dHRvbiBzcGFuIHtcXHJcXG4gICAgZm9udC1zaXplOiA1MHB4O1xcclxcbn1cXHJcXG5cXHJcXG4uZmxpcHBlZCAuY2FyZC1jb250ZW50IHtcXHJcXG4gICAgYW5pbWF0aW9uLW5hbWU6IGZsaXAtY2FyZDtcXHJcXG4gICAgYW5pbWF0aW9uLWR1cmF0aW9uOiAxcztcXHJcXG59XFxyXFxuXFxyXFxuLnVuZmxpcHBlZCAuY2FyZC1jb250ZW50IHtcXHJcXG4gICAgYW5pbWF0aW9uLW5hbWU6IHVuZmxpcC1jYXJkO1xcclxcbiAgICBhbmltYXRpb24tZHVyYXRpb246IDFzO1xcclxcbn1cXHJcXG5cXHJcXG4uZmluYWwtY2xpcCB7XFxyXFxuICAgIGRpc3BsYXk6IGZsZXg7XFxyXFxuICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxyXFxuICAgIHdpZHRoOiAzMjBweDtcXHJcXG4gICAgbWFyZ2luOiBhdXRvO1xcclxcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXHJcXG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXHJcXG4gICAgcGFkZGluZzogNTBweCAwO1xcclxcbn1cXHJcXG5cXHJcXG4uZmluYWwtY2xpcCBwIHtcXHJcXG4gICAgY29sb3I6IHJlZDtcXHJcXG4gICAgZm9udC1zaXplOiAzNnB4O1xcclxcbiAgICBtYXJnaW4tdG9wOiAzMHB4O1xcclxcbn1cXHJcXG5cXHJcXG4uc3RhdC1jb250YWluZXIge1xcclxcbiAgICBkaXNwbGF5OiBmbGV4O1xcclxcbiAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcclxcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXHJcXG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXHJcXG4gICAgZm9udC1zaXplOiAyZW07XFxyXFxufVxcclxcblxcclxcbi50YWJsZS13cmFwcGVyIHtcXHJcXG4gICAgd2lkdGg6IGNhbGMoMTQ0MHZ3KjEwMC8xNDQwKTtcXHJcXG4gICAgb3ZlcmZsb3cteDogYXV0bztcXHJcXG4gICAgZGlzcGxheTogZmxleDtcXHJcXG4gICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXHJcXG4gICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxyXFxuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxyXFxufVxcclxcblxcclxcbi5zdGF0LXRhYmxlIHtcXHJcXG4gICAgd2lkdGg6IGNhbGMoMTQ0MHZ3KjEwMC8xNDQwKTtcXHJcXG4gICAgbWF4LXdpZHRoOiAxNDQwcHg7XFxyXFxuICAgIG1pbi13aWR0aDogNTAwcHg7XFxyXFxuICAgIGJvcmRlci1jb2xsYXBzZTogY29sbGFwc2U7XFxyXFxuICAgIGZvbnQtc2l6ZTogMC41ZW07XFxyXFxuXFxyXFxufVxcclxcblxcclxcbnRoZWFkIHtcXHJcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogYWxpY2VibHVlO1xcclxcbn1cXHJcXG5cXHJcXG50aCB7XFxyXFxuICAgIGhlaWdodDogMzBweDtcXHJcXG59XFxyXFxuXFxyXFxudHIge1xcclxcbiAgICBoZWlnaHQ6IDI1cHg7XFxyXFxuICAgIGJhY2tncm91bmQtY29sb3I6IGF6dXJlO1xcclxcbn1cXHJcXG5cXHJcXG50aCwgdGQge1xcclxcbiAgICBib3JkZXI6IDFweCBzb2xpZCBibGFjaztcXHJcXG4gICAgdGV4dC1hbGlnbjogY2VudGVyO1xcclxcbiAgICB2ZXJ0aWNhbC1hbGlnbjogbWlkZGxlO1xcclxcbn1cXHJcXG5cXHJcXG50cjpudGgtY2hpbGQoZXZlbikge1xcclxcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjZmRmZGRlO1xcclxcbn1cXHJcXG5cXHJcXG4uc29ydGVkLWRvd24sIC5zb3J0ZWQtdXAge1xcclxcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjZDBmYTgxO1xcclxcbn1cXHJcXG5cXHJcXG4uc29ydC1pY29uIHtcXHJcXG4gICAgd2lkdGg6IDE2cHg7XFxyXFxuICAgIGhlaWdodDogYXV0bztcXHJcXG4gICAgcG9zaXRpb246IHJlbGF0aXZlO1xcclxcbiAgICBsZWZ0OiAxMHB4O1xcclxcbiAgICB0b3A6IDJweDtcXHJcXG59XFxyXFxuXFxyXFxuLnN0YXQtYnV0dG9ucy13cmFwcGVyIHtcXHJcXG4gICAgd2lkdGg6IDEwMCU7XFxyXFxuICAgIGRpc3BsYXk6IGZsZXg7XFxyXFxuICAgIGp1c3RpZnktY29udGVudDogc3BhY2UtYXJvdW5kO1xcclxcbiAgICBmbGV4LXdyYXA6IHdyYXA7XFxyXFxufVxcclxcblxcclxcbi5zdGF0LWJ1dHRvbiB7XFxyXFxuICAgIHdpZHRoOiAzMDBweDtcXHJcXG4gICAgaGVpZ2h0OiA3MHB4O1xcclxcbiAgICBtYXJnaW46IDIwcHggMDtcXHJcXG4gICAgcGFkZGluZzogMTVweDtcXHJcXG4gICAgYm9yZGVyLXJhZGl1czogNTBweDtcXHJcXG4gICAgYm9yZGVyOiAxcHggc29saWQgcmdiKDAsIDAsIDApO1xcclxcbiAgICBjb2xvcjogYXp1cmU7XFxyXFxuICAgIHRleHQtYWxpZ246IGNlbnRlcjtcXHJcXG59XFxyXFxuXFxyXFxuLmJ1dHRvbi50cmFpbi1kaWZmIHtcXHJcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogcmdiKDcsIDE2MCwgOTYpO1xcclxcbn1cXHJcXG5cXHJcXG4uYnV0dG9uLnJlc2V0LXN0YXQge1xcclxcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2IoMTg5LCA0NSwgNDUpO1xcclxcbn1cXHJcXG5cXHJcXG4ubm90aGluZy1kaWZmIHtcXHJcXG4gICAgd2lkdGg6IDEwMCU7XFxyXFxufVxcclxcblxcclxcbi5ub3RoaW5nLWRpZmYgcCB7XFxyXFxuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXHJcXG4gICAgdG9wOiAyMCU7XFxyXFxufVxcclxcblxcclxcbi5kaXNhYmxlZDpob3ZlciB7XFxyXFxuICAgIGN1cnNvcjpub3QtYWxsb3dlZDtcXHJcXG59XFxyXFxuXFxyXFxuLyogLS0tIEFuaW1hdGlvbiAtLS0gKi9cXHJcXG5cXHJcXG5Aa2V5ZnJhbWVzIGZsaXAtY2FyZCB7XFxyXFxuICAgIDAlIHt9XFxyXFxuICAgIDUwJSB7dHJhbnNmb3JtOiByb3RhdGVZKDg5ZGVnKX1cXHJcXG59XFxyXFxuXFxyXFxuQGtleWZyYW1lcyB1bmZsaXAtY2FyZCB7XFxyXFxuICAgIDAlIHt9XFxyXFxuICAgIDUwJSB7dHJhbnNmb3JtOiByb3RhdGVZKDg5ZGVnKX1cXHJcXG59XFxyXFxuXFxyXFxuLyogLS0tIFJFU1BPTlNJVkUgTEFZT1VUUyAtLS0gKi9cXHJcXG5cXHJcXG5AbWVkaWEgKG1heC13aWR0aDogMTQzOXB4KSB7XFxyXFxuICAgIC5jb250YWluZXItY2VudGVyZWQge1xcclxcbiAgICAgICAgbWluLXdpZHRoOiBjYWxjKDE0NDB2dyoxMDAvMTQ0MCk7XFxyXFxuICAgIH1cXHJcXG5cXHJcXG4gICAgaGVhZGVyLmNvbnRhaW5lci1jZW50ZXJlZCB7XFxyXFxuICAgICAgICBtYXJnaW4tdG9wOiAgY2FsYygzODB2dyoxMDAvMTQ0MCk7XFxyXFxuICAgIH1cXHJcXG5cXHJcXG4gICAgaGVhZGVyIC5ncmFwaGljIHtcXHJcXG4gICAgICAgIHRvcDogY2FsYygtMzc2dncqMTAwLzE0NDApO1xcclxcbiAgICB9XFxyXFxuXFxyXFxufVxcclxcblxcclxcbkBtZWRpYSAobWF4LWhlaWdodDogOTcwcHgpIHtcXHJcXG4gICAgLm1lbnUtbGlzdCB7XFxyXFxuICAgICAgICBtYXJnaW4tdG9wOiAyMzVweDtcXHJcXG4gICAgfVxcclxcbn1cIl0sXCJzb3VyY2VSb290XCI6XCJcIn1dKTtcbi8vIEV4cG9ydHNcbmV4cG9ydCBkZWZhdWx0IF9fX0NTU19MT0FERVJfRVhQT1JUX19fO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qXG4gIE1JVCBMaWNlbnNlIGh0dHA6Ly93d3cub3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvbWl0LWxpY2Vuc2UucGhwXG4gIEF1dGhvciBUb2JpYXMgS29wcGVycyBAc29rcmFcbiovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChjc3NXaXRoTWFwcGluZ1RvU3RyaW5nKSB7XG4gIHZhciBsaXN0ID0gW107IC8vIHJldHVybiB0aGUgbGlzdCBvZiBtb2R1bGVzIGFzIGNzcyBzdHJpbmdcblxuICBsaXN0LnRvU3RyaW5nID0gZnVuY3Rpb24gdG9TdHJpbmcoKSB7XG4gICAgcmV0dXJuIHRoaXMubWFwKGZ1bmN0aW9uIChpdGVtKSB7XG4gICAgICB2YXIgY29udGVudCA9IFwiXCI7XG4gICAgICB2YXIgbmVlZExheWVyID0gdHlwZW9mIGl0ZW1bNV0gIT09IFwidW5kZWZpbmVkXCI7XG5cbiAgICAgIGlmIChpdGVtWzRdKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJAc3VwcG9ydHMgKFwiLmNvbmNhdChpdGVtWzRdLCBcIikge1wiKTtcbiAgICAgIH1cblxuICAgICAgaWYgKGl0ZW1bMl0pIHtcbiAgICAgICAgY29udGVudCArPSBcIkBtZWRpYSBcIi5jb25jYXQoaXRlbVsyXSwgXCIge1wiKTtcbiAgICAgIH1cblxuICAgICAgaWYgKG5lZWRMYXllcikge1xuICAgICAgICBjb250ZW50ICs9IFwiQGxheWVyXCIuY29uY2F0KGl0ZW1bNV0ubGVuZ3RoID4gMCA/IFwiIFwiLmNvbmNhdChpdGVtWzVdKSA6IFwiXCIsIFwiIHtcIik7XG4gICAgICB9XG5cbiAgICAgIGNvbnRlbnQgKz0gY3NzV2l0aE1hcHBpbmdUb1N0cmluZyhpdGVtKTtcblxuICAgICAgaWYgKG5lZWRMYXllcikge1xuICAgICAgICBjb250ZW50ICs9IFwifVwiO1xuICAgICAgfVxuXG4gICAgICBpZiAoaXRlbVsyXSkge1xuICAgICAgICBjb250ZW50ICs9IFwifVwiO1xuICAgICAgfVxuXG4gICAgICBpZiAoaXRlbVs0XSkge1xuICAgICAgICBjb250ZW50ICs9IFwifVwiO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gY29udGVudDtcbiAgICB9KS5qb2luKFwiXCIpO1xuICB9OyAvLyBpbXBvcnQgYSBsaXN0IG9mIG1vZHVsZXMgaW50byB0aGUgbGlzdFxuXG5cbiAgbGlzdC5pID0gZnVuY3Rpb24gaShtb2R1bGVzLCBtZWRpYSwgZGVkdXBlLCBzdXBwb3J0cywgbGF5ZXIpIHtcbiAgICBpZiAodHlwZW9mIG1vZHVsZXMgPT09IFwic3RyaW5nXCIpIHtcbiAgICAgIG1vZHVsZXMgPSBbW251bGwsIG1vZHVsZXMsIHVuZGVmaW5lZF1dO1xuICAgIH1cblxuICAgIHZhciBhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzID0ge307XG5cbiAgICBpZiAoZGVkdXBlKSB7XG4gICAgICBmb3IgKHZhciBrID0gMDsgayA8IHRoaXMubGVuZ3RoOyBrKyspIHtcbiAgICAgICAgdmFyIGlkID0gdGhpc1trXVswXTtcblxuICAgICAgICBpZiAoaWQgIT0gbnVsbCkge1xuICAgICAgICAgIGFscmVhZHlJbXBvcnRlZE1vZHVsZXNbaWRdID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIGZvciAodmFyIF9rID0gMDsgX2sgPCBtb2R1bGVzLmxlbmd0aDsgX2srKykge1xuICAgICAgdmFyIGl0ZW0gPSBbXS5jb25jYXQobW9kdWxlc1tfa10pO1xuXG4gICAgICBpZiAoZGVkdXBlICYmIGFscmVhZHlJbXBvcnRlZE1vZHVsZXNbaXRlbVswXV0pIHtcbiAgICAgICAgY29udGludWU7XG4gICAgICB9XG5cbiAgICAgIGlmICh0eXBlb2YgbGF5ZXIgIT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgICAgaWYgKHR5cGVvZiBpdGVtWzVdID09PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICAgICAgaXRlbVs1XSA9IGxheWVyO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGl0ZW1bMV0gPSBcIkBsYXllclwiLmNvbmNhdChpdGVtWzVdLmxlbmd0aCA+IDAgPyBcIiBcIi5jb25jYXQoaXRlbVs1XSkgOiBcIlwiLCBcIiB7XCIpLmNvbmNhdChpdGVtWzFdLCBcIn1cIik7XG4gICAgICAgICAgaXRlbVs1XSA9IGxheWVyO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGlmIChtZWRpYSkge1xuICAgICAgICBpZiAoIWl0ZW1bMl0pIHtcbiAgICAgICAgICBpdGVtWzJdID0gbWVkaWE7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaXRlbVsxXSA9IFwiQG1lZGlhIFwiLmNvbmNhdChpdGVtWzJdLCBcIiB7XCIpLmNvbmNhdChpdGVtWzFdLCBcIn1cIik7XG4gICAgICAgICAgaXRlbVsyXSA9IG1lZGlhO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGlmIChzdXBwb3J0cykge1xuICAgICAgICBpZiAoIWl0ZW1bNF0pIHtcbiAgICAgICAgICBpdGVtWzRdID0gXCJcIi5jb25jYXQoc3VwcG9ydHMpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGl0ZW1bMV0gPSBcIkBzdXBwb3J0cyAoXCIuY29uY2F0KGl0ZW1bNF0sIFwiKSB7XCIpLmNvbmNhdChpdGVtWzFdLCBcIn1cIik7XG4gICAgICAgICAgaXRlbVs0XSA9IHN1cHBvcnRzO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGxpc3QucHVzaChpdGVtKTtcbiAgICB9XG4gIH07XG5cbiAgcmV0dXJuIGxpc3Q7XG59OyIsIlwidXNlIHN0cmljdFwiO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uICh1cmwsIG9wdGlvbnMpIHtcbiAgaWYgKCFvcHRpb25zKSB7XG4gICAgb3B0aW9ucyA9IHt9O1xuICB9XG5cbiAgaWYgKCF1cmwpIHtcbiAgICByZXR1cm4gdXJsO1xuICB9XG5cbiAgdXJsID0gU3RyaW5nKHVybC5fX2VzTW9kdWxlID8gdXJsLmRlZmF1bHQgOiB1cmwpOyAvLyBJZiB1cmwgaXMgYWxyZWFkeSB3cmFwcGVkIGluIHF1b3RlcywgcmVtb3ZlIHRoZW1cblxuICBpZiAoL15bJ1wiXS4qWydcIl0kLy50ZXN0KHVybCkpIHtcbiAgICB1cmwgPSB1cmwuc2xpY2UoMSwgLTEpO1xuICB9XG5cbiAgaWYgKG9wdGlvbnMuaGFzaCkge1xuICAgIHVybCArPSBvcHRpb25zLmhhc2g7XG4gIH0gLy8gU2hvdWxkIHVybCBiZSB3cmFwcGVkP1xuICAvLyBTZWUgaHR0cHM6Ly9kcmFmdHMuY3Nzd2cub3JnL2Nzcy12YWx1ZXMtMy8jdXJsc1xuXG5cbiAgaWYgKC9bXCInKCkgXFx0XFxuXXwoJTIwKS8udGVzdCh1cmwpIHx8IG9wdGlvbnMubmVlZFF1b3Rlcykge1xuICAgIHJldHVybiBcIlxcXCJcIi5jb25jYXQodXJsLnJlcGxhY2UoL1wiL2csICdcXFxcXCInKS5yZXBsYWNlKC9cXG4vZywgXCJcXFxcblwiKSwgXCJcXFwiXCIpO1xuICB9XG5cbiAgcmV0dXJuIHVybDtcbn07IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0ZW0pIHtcbiAgdmFyIGNvbnRlbnQgPSBpdGVtWzFdO1xuICB2YXIgY3NzTWFwcGluZyA9IGl0ZW1bM107XG5cbiAgaWYgKCFjc3NNYXBwaW5nKSB7XG4gICAgcmV0dXJuIGNvbnRlbnQ7XG4gIH1cblxuICBpZiAodHlwZW9mIGJ0b2EgPT09IFwiZnVuY3Rpb25cIikge1xuICAgIHZhciBiYXNlNjQgPSBidG9hKHVuZXNjYXBlKGVuY29kZVVSSUNvbXBvbmVudChKU09OLnN0cmluZ2lmeShjc3NNYXBwaW5nKSkpKTtcbiAgICB2YXIgZGF0YSA9IFwic291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247Y2hhcnNldD11dGYtODtiYXNlNjQsXCIuY29uY2F0KGJhc2U2NCk7XG4gICAgdmFyIHNvdXJjZU1hcHBpbmcgPSBcIi8qIyBcIi5jb25jYXQoZGF0YSwgXCIgKi9cIik7XG4gICAgdmFyIHNvdXJjZVVSTHMgPSBjc3NNYXBwaW5nLnNvdXJjZXMubWFwKGZ1bmN0aW9uIChzb3VyY2UpIHtcbiAgICAgIHJldHVybiBcIi8qIyBzb3VyY2VVUkw9XCIuY29uY2F0KGNzc01hcHBpbmcuc291cmNlUm9vdCB8fCBcIlwiKS5jb25jYXQoc291cmNlLCBcIiAqL1wiKTtcbiAgICB9KTtcbiAgICByZXR1cm4gW2NvbnRlbnRdLmNvbmNhdChzb3VyY2VVUkxzKS5jb25jYXQoW3NvdXJjZU1hcHBpbmddKS5qb2luKFwiXFxuXCIpO1xuICB9XG5cbiAgcmV0dXJuIFtjb250ZW50XS5qb2luKFwiXFxuXCIpO1xufTsiLCJcbiAgICAgIGltcG9ydCBBUEkgZnJvbSBcIiEuLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbmplY3RTdHlsZXNJbnRvU3R5bGVUYWcuanNcIjtcbiAgICAgIGltcG9ydCBkb21BUEkgZnJvbSBcIiEuLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZURvbUFQSS5qc1wiO1xuICAgICAgaW1wb3J0IGluc2VydEZuIGZyb20gXCIhLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0QnlTZWxlY3Rvci5qc1wiO1xuICAgICAgaW1wb3J0IHNldEF0dHJpYnV0ZXMgZnJvbSBcIiEuLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXMuanNcIjtcbiAgICAgIGltcG9ydCBpbnNlcnRTdHlsZUVsZW1lbnQgZnJvbSBcIiEuLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRTdHlsZUVsZW1lbnQuanNcIjtcbiAgICAgIGltcG9ydCBzdHlsZVRhZ1RyYW5zZm9ybUZuIGZyb20gXCIhLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVUYWdUcmFuc2Zvcm0uanNcIjtcbiAgICAgIGltcG9ydCBjb250ZW50LCAqIGFzIG5hbWVkRXhwb3J0IGZyb20gXCIhIS4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4vbm9ybWFsaXplLmNzc1wiO1xuICAgICAgXG4gICAgICBcblxudmFyIG9wdGlvbnMgPSB7fTtcblxub3B0aW9ucy5zdHlsZVRhZ1RyYW5zZm9ybSA9IHN0eWxlVGFnVHJhbnNmb3JtRm47XG5vcHRpb25zLnNldEF0dHJpYnV0ZXMgPSBzZXRBdHRyaWJ1dGVzO1xuXG4gICAgICBvcHRpb25zLmluc2VydCA9IGluc2VydEZuLmJpbmQobnVsbCwgXCJoZWFkXCIpO1xuICAgIFxub3B0aW9ucy5kb21BUEkgPSBkb21BUEk7XG5vcHRpb25zLmluc2VydFN0eWxlRWxlbWVudCA9IGluc2VydFN0eWxlRWxlbWVudDtcblxudmFyIHVwZGF0ZSA9IEFQSShjb250ZW50LCBvcHRpb25zKTtcblxuXG5cbmV4cG9ydCAqIGZyb20gXCIhIS4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4vbm9ybWFsaXplLmNzc1wiO1xuICAgICAgIGV4cG9ydCBkZWZhdWx0IGNvbnRlbnQgJiYgY29udGVudC5sb2NhbHMgPyBjb250ZW50LmxvY2FscyA6IHVuZGVmaW5lZDtcbiIsIlxuICAgICAgaW1wb3J0IEFQSSBmcm9tIFwiIS4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luamVjdFN0eWxlc0ludG9TdHlsZVRhZy5qc1wiO1xuICAgICAgaW1wb3J0IGRvbUFQSSBmcm9tIFwiIS4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlRG9tQVBJLmpzXCI7XG4gICAgICBpbXBvcnQgaW5zZXJ0Rm4gZnJvbSBcIiEuLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRCeVNlbGVjdG9yLmpzXCI7XG4gICAgICBpbXBvcnQgc2V0QXR0cmlidXRlcyBmcm9tIFwiIS4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3NldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlcy5qc1wiO1xuICAgICAgaW1wb3J0IGluc2VydFN0eWxlRWxlbWVudCBmcm9tIFwiIS4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydFN0eWxlRWxlbWVudC5qc1wiO1xuICAgICAgaW1wb3J0IHN0eWxlVGFnVHJhbnNmb3JtRm4gZnJvbSBcIiEuLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZVRhZ1RyYW5zZm9ybS5qc1wiO1xuICAgICAgaW1wb3J0IGNvbnRlbnQsICogYXMgbmFtZWRFeHBvcnQgZnJvbSBcIiEhLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanMhLi9yZXNldC5jc3NcIjtcbiAgICAgIFxuICAgICAgXG5cbnZhciBvcHRpb25zID0ge307XG5cbm9wdGlvbnMuc3R5bGVUYWdUcmFuc2Zvcm0gPSBzdHlsZVRhZ1RyYW5zZm9ybUZuO1xub3B0aW9ucy5zZXRBdHRyaWJ1dGVzID0gc2V0QXR0cmlidXRlcztcblxuICAgICAgb3B0aW9ucy5pbnNlcnQgPSBpbnNlcnRGbi5iaW5kKG51bGwsIFwiaGVhZFwiKTtcbiAgICBcbm9wdGlvbnMuZG9tQVBJID0gZG9tQVBJO1xub3B0aW9ucy5pbnNlcnRTdHlsZUVsZW1lbnQgPSBpbnNlcnRTdHlsZUVsZW1lbnQ7XG5cbnZhciB1cGRhdGUgPSBBUEkoY29udGVudCwgb3B0aW9ucyk7XG5cblxuXG5leHBvcnQgKiBmcm9tIFwiISEuLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L2Nqcy5qcyEuL3Jlc2V0LmNzc1wiO1xuICAgICAgIGV4cG9ydCBkZWZhdWx0IGNvbnRlbnQgJiYgY29udGVudC5sb2NhbHMgPyBjb250ZW50LmxvY2FscyA6IHVuZGVmaW5lZDtcbiIsIlxuICAgICAgaW1wb3J0IEFQSSBmcm9tIFwiIS4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luamVjdFN0eWxlc0ludG9TdHlsZVRhZy5qc1wiO1xuICAgICAgaW1wb3J0IGRvbUFQSSBmcm9tIFwiIS4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlRG9tQVBJLmpzXCI7XG4gICAgICBpbXBvcnQgaW5zZXJ0Rm4gZnJvbSBcIiEuLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRCeVNlbGVjdG9yLmpzXCI7XG4gICAgICBpbXBvcnQgc2V0QXR0cmlidXRlcyBmcm9tIFwiIS4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3NldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlcy5qc1wiO1xuICAgICAgaW1wb3J0IGluc2VydFN0eWxlRWxlbWVudCBmcm9tIFwiIS4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydFN0eWxlRWxlbWVudC5qc1wiO1xuICAgICAgaW1wb3J0IHN0eWxlVGFnVHJhbnNmb3JtRm4gZnJvbSBcIiEuLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZVRhZ1RyYW5zZm9ybS5qc1wiO1xuICAgICAgaW1wb3J0IGNvbnRlbnQsICogYXMgbmFtZWRFeHBvcnQgZnJvbSBcIiEhLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanMhLi9zdHlsZS5jc3NcIjtcbiAgICAgIFxuICAgICAgXG5cbnZhciBvcHRpb25zID0ge307XG5cbm9wdGlvbnMuc3R5bGVUYWdUcmFuc2Zvcm0gPSBzdHlsZVRhZ1RyYW5zZm9ybUZuO1xub3B0aW9ucy5zZXRBdHRyaWJ1dGVzID0gc2V0QXR0cmlidXRlcztcblxuICAgICAgb3B0aW9ucy5pbnNlcnQgPSBpbnNlcnRGbi5iaW5kKG51bGwsIFwiaGVhZFwiKTtcbiAgICBcbm9wdGlvbnMuZG9tQVBJID0gZG9tQVBJO1xub3B0aW9ucy5pbnNlcnRTdHlsZUVsZW1lbnQgPSBpbnNlcnRTdHlsZUVsZW1lbnQ7XG5cbnZhciB1cGRhdGUgPSBBUEkoY29udGVudCwgb3B0aW9ucyk7XG5cblxuXG5leHBvcnQgKiBmcm9tIFwiISEuLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L2Nqcy5qcyEuL3N0eWxlLmNzc1wiO1xuICAgICAgIGV4cG9ydCBkZWZhdWx0IGNvbnRlbnQgJiYgY29udGVudC5sb2NhbHMgPyBjb250ZW50LmxvY2FscyA6IHVuZGVmaW5lZDtcbiIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgc3R5bGVzSW5ET00gPSBbXTtcblxuZnVuY3Rpb24gZ2V0SW5kZXhCeUlkZW50aWZpZXIoaWRlbnRpZmllcikge1xuICB2YXIgcmVzdWx0ID0gLTE7XG5cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBzdHlsZXNJbkRPTS5sZW5ndGg7IGkrKykge1xuICAgIGlmIChzdHlsZXNJbkRPTVtpXS5pZGVudGlmaWVyID09PSBpZGVudGlmaWVyKSB7XG4gICAgICByZXN1bHQgPSBpO1xuICAgICAgYnJlYWs7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxuZnVuY3Rpb24gbW9kdWxlc1RvRG9tKGxpc3QsIG9wdGlvbnMpIHtcbiAgdmFyIGlkQ291bnRNYXAgPSB7fTtcbiAgdmFyIGlkZW50aWZpZXJzID0gW107XG5cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBsaXN0Lmxlbmd0aDsgaSsrKSB7XG4gICAgdmFyIGl0ZW0gPSBsaXN0W2ldO1xuICAgIHZhciBpZCA9IG9wdGlvbnMuYmFzZSA/IGl0ZW1bMF0gKyBvcHRpb25zLmJhc2UgOiBpdGVtWzBdO1xuICAgIHZhciBjb3VudCA9IGlkQ291bnRNYXBbaWRdIHx8IDA7XG4gICAgdmFyIGlkZW50aWZpZXIgPSBcIlwiLmNvbmNhdChpZCwgXCIgXCIpLmNvbmNhdChjb3VudCk7XG4gICAgaWRDb3VudE1hcFtpZF0gPSBjb3VudCArIDE7XG4gICAgdmFyIGluZGV4QnlJZGVudGlmaWVyID0gZ2V0SW5kZXhCeUlkZW50aWZpZXIoaWRlbnRpZmllcik7XG4gICAgdmFyIG9iaiA9IHtcbiAgICAgIGNzczogaXRlbVsxXSxcbiAgICAgIG1lZGlhOiBpdGVtWzJdLFxuICAgICAgc291cmNlTWFwOiBpdGVtWzNdLFxuICAgICAgc3VwcG9ydHM6IGl0ZW1bNF0sXG4gICAgICBsYXllcjogaXRlbVs1XVxuICAgIH07XG5cbiAgICBpZiAoaW5kZXhCeUlkZW50aWZpZXIgIT09IC0xKSB7XG4gICAgICBzdHlsZXNJbkRPTVtpbmRleEJ5SWRlbnRpZmllcl0ucmVmZXJlbmNlcysrO1xuICAgICAgc3R5bGVzSW5ET01baW5kZXhCeUlkZW50aWZpZXJdLnVwZGF0ZXIob2JqKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdmFyIHVwZGF0ZXIgPSBhZGRFbGVtZW50U3R5bGUob2JqLCBvcHRpb25zKTtcbiAgICAgIG9wdGlvbnMuYnlJbmRleCA9IGk7XG4gICAgICBzdHlsZXNJbkRPTS5zcGxpY2UoaSwgMCwge1xuICAgICAgICBpZGVudGlmaWVyOiBpZGVudGlmaWVyLFxuICAgICAgICB1cGRhdGVyOiB1cGRhdGVyLFxuICAgICAgICByZWZlcmVuY2VzOiAxXG4gICAgICB9KTtcbiAgICB9XG5cbiAgICBpZGVudGlmaWVycy5wdXNoKGlkZW50aWZpZXIpO1xuICB9XG5cbiAgcmV0dXJuIGlkZW50aWZpZXJzO1xufVxuXG5mdW5jdGlvbiBhZGRFbGVtZW50U3R5bGUob2JqLCBvcHRpb25zKSB7XG4gIHZhciBhcGkgPSBvcHRpb25zLmRvbUFQSShvcHRpb25zKTtcbiAgYXBpLnVwZGF0ZShvYmopO1xuXG4gIHZhciB1cGRhdGVyID0gZnVuY3Rpb24gdXBkYXRlcihuZXdPYmopIHtcbiAgICBpZiAobmV3T2JqKSB7XG4gICAgICBpZiAobmV3T2JqLmNzcyA9PT0gb2JqLmNzcyAmJiBuZXdPYmoubWVkaWEgPT09IG9iai5tZWRpYSAmJiBuZXdPYmouc291cmNlTWFwID09PSBvYmouc291cmNlTWFwICYmIG5ld09iai5zdXBwb3J0cyA9PT0gb2JqLnN1cHBvcnRzICYmIG5ld09iai5sYXllciA9PT0gb2JqLmxheWVyKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgYXBpLnVwZGF0ZShvYmogPSBuZXdPYmopO1xuICAgIH0gZWxzZSB7XG4gICAgICBhcGkucmVtb3ZlKCk7XG4gICAgfVxuICB9O1xuXG4gIHJldHVybiB1cGRhdGVyO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChsaXN0LCBvcHRpb25zKSB7XG4gIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuICBsaXN0ID0gbGlzdCB8fCBbXTtcbiAgdmFyIGxhc3RJZGVudGlmaWVycyA9IG1vZHVsZXNUb0RvbShsaXN0LCBvcHRpb25zKTtcbiAgcmV0dXJuIGZ1bmN0aW9uIHVwZGF0ZShuZXdMaXN0KSB7XG4gICAgbmV3TGlzdCA9IG5ld0xpc3QgfHwgW107XG5cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxhc3RJZGVudGlmaWVycy5sZW5ndGg7IGkrKykge1xuICAgICAgdmFyIGlkZW50aWZpZXIgPSBsYXN0SWRlbnRpZmllcnNbaV07XG4gICAgICB2YXIgaW5kZXggPSBnZXRJbmRleEJ5SWRlbnRpZmllcihpZGVudGlmaWVyKTtcbiAgICAgIHN0eWxlc0luRE9NW2luZGV4XS5yZWZlcmVuY2VzLS07XG4gICAgfVxuXG4gICAgdmFyIG5ld0xhc3RJZGVudGlmaWVycyA9IG1vZHVsZXNUb0RvbShuZXdMaXN0LCBvcHRpb25zKTtcblxuICAgIGZvciAodmFyIF9pID0gMDsgX2kgPCBsYXN0SWRlbnRpZmllcnMubGVuZ3RoOyBfaSsrKSB7XG4gICAgICB2YXIgX2lkZW50aWZpZXIgPSBsYXN0SWRlbnRpZmllcnNbX2ldO1xuXG4gICAgICB2YXIgX2luZGV4ID0gZ2V0SW5kZXhCeUlkZW50aWZpZXIoX2lkZW50aWZpZXIpO1xuXG4gICAgICBpZiAoc3R5bGVzSW5ET01bX2luZGV4XS5yZWZlcmVuY2VzID09PSAwKSB7XG4gICAgICAgIHN0eWxlc0luRE9NW19pbmRleF0udXBkYXRlcigpO1xuXG4gICAgICAgIHN0eWxlc0luRE9NLnNwbGljZShfaW5kZXgsIDEpO1xuICAgICAgfVxuICAgIH1cblxuICAgIGxhc3RJZGVudGlmaWVycyA9IG5ld0xhc3RJZGVudGlmaWVycztcbiAgfTtcbn07IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBtZW1vID0ge307XG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cblxuZnVuY3Rpb24gZ2V0VGFyZ2V0KHRhcmdldCkge1xuICBpZiAodHlwZW9mIG1lbW9bdGFyZ2V0XSA9PT0gXCJ1bmRlZmluZWRcIikge1xuICAgIHZhciBzdHlsZVRhcmdldCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IodGFyZ2V0KTsgLy8gU3BlY2lhbCBjYXNlIHRvIHJldHVybiBoZWFkIG9mIGlmcmFtZSBpbnN0ZWFkIG9mIGlmcmFtZSBpdHNlbGZcblxuICAgIGlmICh3aW5kb3cuSFRNTElGcmFtZUVsZW1lbnQgJiYgc3R5bGVUYXJnZXQgaW5zdGFuY2VvZiB3aW5kb3cuSFRNTElGcmFtZUVsZW1lbnQpIHtcbiAgICAgIHRyeSB7XG4gICAgICAgIC8vIFRoaXMgd2lsbCB0aHJvdyBhbiBleGNlcHRpb24gaWYgYWNjZXNzIHRvIGlmcmFtZSBpcyBibG9ja2VkXG4gICAgICAgIC8vIGR1ZSB0byBjcm9zcy1vcmlnaW4gcmVzdHJpY3Rpb25zXG4gICAgICAgIHN0eWxlVGFyZ2V0ID0gc3R5bGVUYXJnZXQuY29udGVudERvY3VtZW50LmhlYWQ7XG4gICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIC8vIGlzdGFuYnVsIGlnbm9yZSBuZXh0XG4gICAgICAgIHN0eWxlVGFyZ2V0ID0gbnVsbDtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBtZW1vW3RhcmdldF0gPSBzdHlsZVRhcmdldDtcbiAgfVxuXG4gIHJldHVybiBtZW1vW3RhcmdldF07XG59XG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cblxuXG5mdW5jdGlvbiBpbnNlcnRCeVNlbGVjdG9yKGluc2VydCwgc3R5bGUpIHtcbiAgdmFyIHRhcmdldCA9IGdldFRhcmdldChpbnNlcnQpO1xuXG4gIGlmICghdGFyZ2V0KSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKFwiQ291bGRuJ3QgZmluZCBhIHN0eWxlIHRhcmdldC4gVGhpcyBwcm9iYWJseSBtZWFucyB0aGF0IHRoZSB2YWx1ZSBmb3IgdGhlICdpbnNlcnQnIHBhcmFtZXRlciBpcyBpbnZhbGlkLlwiKTtcbiAgfVxuXG4gIHRhcmdldC5hcHBlbmRDaGlsZChzdHlsZSk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gaW5zZXJ0QnlTZWxlY3RvcjsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBpbnNlcnRTdHlsZUVsZW1lbnQob3B0aW9ucykge1xuICB2YXIgZWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzdHlsZVwiKTtcbiAgb3B0aW9ucy5zZXRBdHRyaWJ1dGVzKGVsZW1lbnQsIG9wdGlvbnMuYXR0cmlidXRlcyk7XG4gIG9wdGlvbnMuaW5zZXJ0KGVsZW1lbnQsIG9wdGlvbnMub3B0aW9ucyk7XG4gIHJldHVybiBlbGVtZW50O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGluc2VydFN0eWxlRWxlbWVudDsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBzZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXMoc3R5bGVFbGVtZW50KSB7XG4gIHZhciBub25jZSA9IHR5cGVvZiBfX3dlYnBhY2tfbm9uY2VfXyAhPT0gXCJ1bmRlZmluZWRcIiA/IF9fd2VicGFja19ub25jZV9fIDogbnVsbDtcblxuICBpZiAobm9uY2UpIHtcbiAgICBzdHlsZUVsZW1lbnQuc2V0QXR0cmlidXRlKFwibm9uY2VcIiwgbm9uY2UpO1xuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzOyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIGFwcGx5KHN0eWxlRWxlbWVudCwgb3B0aW9ucywgb2JqKSB7XG4gIHZhciBjc3MgPSBcIlwiO1xuXG4gIGlmIChvYmouc3VwcG9ydHMpIHtcbiAgICBjc3MgKz0gXCJAc3VwcG9ydHMgKFwiLmNvbmNhdChvYmouc3VwcG9ydHMsIFwiKSB7XCIpO1xuICB9XG5cbiAgaWYgKG9iai5tZWRpYSkge1xuICAgIGNzcyArPSBcIkBtZWRpYSBcIi5jb25jYXQob2JqLm1lZGlhLCBcIiB7XCIpO1xuICB9XG5cbiAgdmFyIG5lZWRMYXllciA9IHR5cGVvZiBvYmoubGF5ZXIgIT09IFwidW5kZWZpbmVkXCI7XG5cbiAgaWYgKG5lZWRMYXllcikge1xuICAgIGNzcyArPSBcIkBsYXllclwiLmNvbmNhdChvYmoubGF5ZXIubGVuZ3RoID4gMCA/IFwiIFwiLmNvbmNhdChvYmoubGF5ZXIpIDogXCJcIiwgXCIge1wiKTtcbiAgfVxuXG4gIGNzcyArPSBvYmouY3NzO1xuXG4gIGlmIChuZWVkTGF5ZXIpIHtcbiAgICBjc3MgKz0gXCJ9XCI7XG4gIH1cblxuICBpZiAob2JqLm1lZGlhKSB7XG4gICAgY3NzICs9IFwifVwiO1xuICB9XG5cbiAgaWYgKG9iai5zdXBwb3J0cykge1xuICAgIGNzcyArPSBcIn1cIjtcbiAgfVxuXG4gIHZhciBzb3VyY2VNYXAgPSBvYmouc291cmNlTWFwO1xuXG4gIGlmIChzb3VyY2VNYXAgJiYgdHlwZW9mIGJ0b2EgIT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICBjc3MgKz0gXCJcXG4vKiMgc291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247YmFzZTY0LFwiLmNvbmNhdChidG9hKHVuZXNjYXBlKGVuY29kZVVSSUNvbXBvbmVudChKU09OLnN0cmluZ2lmeShzb3VyY2VNYXApKSkpLCBcIiAqL1wiKTtcbiAgfSAvLyBGb3Igb2xkIElFXG5cbiAgLyogaXN0YW5idWwgaWdub3JlIGlmICAqL1xuXG5cbiAgb3B0aW9ucy5zdHlsZVRhZ1RyYW5zZm9ybShjc3MsIHN0eWxlRWxlbWVudCwgb3B0aW9ucy5vcHRpb25zKTtcbn1cblxuZnVuY3Rpb24gcmVtb3ZlU3R5bGVFbGVtZW50KHN0eWxlRWxlbWVudCkge1xuICAvLyBpc3RhbmJ1bCBpZ25vcmUgaWZcbiAgaWYgKHN0eWxlRWxlbWVudC5wYXJlbnROb2RlID09PSBudWxsKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgc3R5bGVFbGVtZW50LnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoc3R5bGVFbGVtZW50KTtcbn1cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuXG5cbmZ1bmN0aW9uIGRvbUFQSShvcHRpb25zKSB7XG4gIHZhciBzdHlsZUVsZW1lbnQgPSBvcHRpb25zLmluc2VydFN0eWxlRWxlbWVudChvcHRpb25zKTtcbiAgcmV0dXJuIHtcbiAgICB1cGRhdGU6IGZ1bmN0aW9uIHVwZGF0ZShvYmopIHtcbiAgICAgIGFwcGx5KHN0eWxlRWxlbWVudCwgb3B0aW9ucywgb2JqKTtcbiAgICB9LFxuICAgIHJlbW92ZTogZnVuY3Rpb24gcmVtb3ZlKCkge1xuICAgICAgcmVtb3ZlU3R5bGVFbGVtZW50KHN0eWxlRWxlbWVudCk7XG4gICAgfVxuICB9O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGRvbUFQSTsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBzdHlsZVRhZ1RyYW5zZm9ybShjc3MsIHN0eWxlRWxlbWVudCkge1xuICBpZiAoc3R5bGVFbGVtZW50LnN0eWxlU2hlZXQpIHtcbiAgICBzdHlsZUVsZW1lbnQuc3R5bGVTaGVldC5jc3NUZXh0ID0gY3NzO1xuICB9IGVsc2Uge1xuICAgIHdoaWxlIChzdHlsZUVsZW1lbnQuZmlyc3RDaGlsZCkge1xuICAgICAgc3R5bGVFbGVtZW50LnJlbW92ZUNoaWxkKHN0eWxlRWxlbWVudC5maXJzdENoaWxkKTtcbiAgICB9XG5cbiAgICBzdHlsZUVsZW1lbnQuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoY3NzKSk7XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBzdHlsZVRhZ1RyYW5zZm9ybTsiLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdGlkOiBtb2R1bGVJZCxcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuLy8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbl9fd2VicGFja19yZXF1aXJlX18ubSA9IF9fd2VicGFja19tb2R1bGVzX187XG5cbiIsIi8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSAobW9kdWxlKSA9PiB7XG5cdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuXHRcdCgpID0+IChtb2R1bGVbJ2RlZmF1bHQnXSkgOlxuXHRcdCgpID0+IChtb2R1bGUpO1xuXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCB7IGE6IGdldHRlciB9KTtcblx0cmV0dXJuIGdldHRlcjtcbn07IiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5nID0gKGZ1bmN0aW9uKCkge1xuXHRpZiAodHlwZW9mIGdsb2JhbFRoaXMgPT09ICdvYmplY3QnKSByZXR1cm4gZ2xvYmFsVGhpcztcblx0dHJ5IHtcblx0XHRyZXR1cm4gdGhpcyB8fCBuZXcgRnVuY3Rpb24oJ3JldHVybiB0aGlzJykoKTtcblx0fSBjYXRjaCAoZSkge1xuXHRcdGlmICh0eXBlb2Ygd2luZG93ID09PSAnb2JqZWN0JykgcmV0dXJuIHdpbmRvdztcblx0fVxufSkoKTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwidmFyIHNjcmlwdFVybDtcbmlmIChfX3dlYnBhY2tfcmVxdWlyZV9fLmcuaW1wb3J0U2NyaXB0cykgc2NyaXB0VXJsID0gX193ZWJwYWNrX3JlcXVpcmVfXy5nLmxvY2F0aW9uICsgXCJcIjtcbnZhciBkb2N1bWVudCA9IF9fd2VicGFja19yZXF1aXJlX18uZy5kb2N1bWVudDtcbmlmICghc2NyaXB0VXJsICYmIGRvY3VtZW50KSB7XG5cdGlmIChkb2N1bWVudC5jdXJyZW50U2NyaXB0KVxuXHRcdHNjcmlwdFVybCA9IGRvY3VtZW50LmN1cnJlbnRTY3JpcHQuc3JjXG5cdGlmICghc2NyaXB0VXJsKSB7XG5cdFx0dmFyIHNjcmlwdHMgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZShcInNjcmlwdFwiKTtcblx0XHRpZihzY3JpcHRzLmxlbmd0aCkgc2NyaXB0VXJsID0gc2NyaXB0c1tzY3JpcHRzLmxlbmd0aCAtIDFdLnNyY1xuXHR9XG59XG4vLyBXaGVuIHN1cHBvcnRpbmcgYnJvd3NlcnMgd2hlcmUgYW4gYXV0b21hdGljIHB1YmxpY1BhdGggaXMgbm90IHN1cHBvcnRlZCB5b3UgbXVzdCBzcGVjaWZ5IGFuIG91dHB1dC5wdWJsaWNQYXRoIG1hbnVhbGx5IHZpYSBjb25maWd1cmF0aW9uXG4vLyBvciBwYXNzIGFuIGVtcHR5IHN0cmluZyAoXCJcIikgYW5kIHNldCB0aGUgX193ZWJwYWNrX3B1YmxpY19wYXRoX18gdmFyaWFibGUgZnJvbSB5b3VyIGNvZGUgdG8gdXNlIHlvdXIgb3duIGxvZ2ljLlxuaWYgKCFzY3JpcHRVcmwpIHRocm93IG5ldyBFcnJvcihcIkF1dG9tYXRpYyBwdWJsaWNQYXRoIGlzIG5vdCBzdXBwb3J0ZWQgaW4gdGhpcyBicm93c2VyXCIpO1xuc2NyaXB0VXJsID0gc2NyaXB0VXJsLnJlcGxhY2UoLyMuKiQvLCBcIlwiKS5yZXBsYWNlKC9cXD8uKiQvLCBcIlwiKS5yZXBsYWNlKC9cXC9bXlxcL10rJC8sIFwiL1wiKTtcbl9fd2VicGFja19yZXF1aXJlX18ucCA9IHNjcmlwdFVybDsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLmIgPSBkb2N1bWVudC5iYXNlVVJJIHx8IHNlbGYubG9jYXRpb24uaHJlZjtcblxuLy8gb2JqZWN0IHRvIHN0b3JlIGxvYWRlZCBhbmQgbG9hZGluZyBjaHVua3Ncbi8vIHVuZGVmaW5lZCA9IGNodW5rIG5vdCBsb2FkZWQsIG51bGwgPSBjaHVuayBwcmVsb2FkZWQvcHJlZmV0Y2hlZFxuLy8gW3Jlc29sdmUsIHJlamVjdCwgUHJvbWlzZV0gPSBjaHVuayBsb2FkaW5nLCAwID0gY2h1bmsgbG9hZGVkXG52YXIgaW5zdGFsbGVkQ2h1bmtzID0ge1xuXHRcImluZGV4XCI6IDBcbn07XG5cbi8vIG5vIGNodW5rIG9uIGRlbWFuZCBsb2FkaW5nXG5cbi8vIG5vIHByZWZldGNoaW5nXG5cbi8vIG5vIHByZWxvYWRlZFxuXG4vLyBubyBITVJcblxuLy8gbm8gSE1SIG1hbmlmZXN0XG5cbi8vIG5vIG9uIGNodW5rcyBsb2FkZWRcblxuLy8gbm8ganNvbnAgZnVuY3Rpb24iLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm5jID0gdW5kZWZpbmVkOyIsIi8qIGVzbGludC1kaXNhYmxlIGxpbmVicmVhay1zdHlsZSAqL1xyXG4vKiBlc2xpbnQtZGlzYWJsZSBuby11bmRlZiAqL1xyXG5cclxuaW1wb3J0ICcuLi9hc3NldHMvc3R5bGVzL3Jlc2V0LmNzcyc7XHJcbmltcG9ydCAnLi4vYXNzZXRzL3N0eWxlcy9ub3JtYWxpemUuY3NzJztcclxuaW1wb3J0ICcuLi9hc3NldHMvc3R5bGVzL3N0eWxlLmNzcyc7XHJcblxyXG5pbXBvcnQgZGF0YUFycmF5cyBmcm9tICcuLi9hc3NldHMvanMvY2FyZHMnO1xyXG5pbXBvcnQgQXBwQ29udHJvbCBmcm9tICcuLi9hc3NldHMvanMvYXBwQ29udHJvbCc7XHJcbmltcG9ydCBjbGlja1VzZXJJbnRlcmFjdGl2ZSBmcm9tICcuLi9hc3NldHMvanMvY2xpY2tVc2VySW50ZXJhY3RpdmUnO1xyXG5pbXBvcnQgbWFpbkNhcmRzIGZyb20gJy4uL2Fzc2V0cy9qcy9tYWluQ2FyZHMnO1xyXG5cclxuY29uc3QgW3RvcGljcywgY2FyZHNdID0gW2RhdGFBcnJheXNbMF0sIGRhdGFBcnJheXMuc2xpY2UoMSldO1xyXG5cclxuY29uc3QgYXBwQ29udHJvbCA9IG5ldyBBcHBDb250cm9sKHRvcGljcywgY2FyZHMsIG1haW5DYXJkcyk7XHJcblxyXG5kb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdib2R5JykuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZXZlbnQpID0+IGNsaWNrVXNlckludGVyYWN0aXZlKGV2ZW50LCBhcHBDb250cm9sKSk7XHJcbiJdLCJuYW1lcyI6WyJkYXRhQXJyYXlzIiwiQXBwQ29udHJvbCIsImNsaWNrVXNlckludGVyYWN0aXZlIiwibWFpbkNhcmRzIiwic2xpY2UiLCJ0b3BpY3MiLCJjYXJkcyIsImFwcENvbnRyb2wiLCJkb2N1bWVudCIsInF1ZXJ5U2VsZWN0b3IiLCJhZGRFdmVudExpc3RlbmVyIiwiZXZlbnQiXSwic291cmNlUm9vdCI6IiJ9