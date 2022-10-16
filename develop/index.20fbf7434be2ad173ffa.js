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
  ['Action (set A)', 'Action (set B)', 'Animal (set A)', 'Animal (set B)', 'Clothes', 'Emotions', 'Food', 'Geography'],
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
  [
    {
      word: 'burger',
      translation: 'бургер',
      image: 'img/burger.jpg',
      audioSrc: 'audio/en_burger.mp3',
    },
    {
      word: 'cake',
      translation: 'торт',
      image: 'img/cake.jpg',
      audioSrc: 'audio/en_cake.mp3',
    },
    {
      word: 'croissant',
      translation: 'круассан',
      image: 'img/croissant.jpg',
      audioSrc: 'audio/en_croissant.mp3',
    },
    {
      word: 'hot dog',
      translation: 'хот дог',
      image: 'img/hot_dog.jpg',
      audioSrc: 'audio/en_hot_dog.mp3',
    },
    {
      word: 'lasagna',
      translation: 'лазанья',
      image: 'img/lasagna.jpg',
      audioSrc: 'audio/en_lasagna.mp3',
    },
    {
      word: 'omelette',
      translation: 'омлет',
      image: 'img/omelette.jpg',
      audioSrc: 'audio/en_omelette.mp3',
    },
    {
      word: 'pizza',
      translation: 'пицца',
      image: 'img/pizza.jpg',
      audioSrc: 'audio/en_pizza.mp3',
    },
    {
      word: 'sandwich',
      translation: 'бутерброд',
      image: 'img/sandwich.jpg',
      audioSrc: 'audio/en_sandwich.mp3',
    },
    {
      word: 'spaghetti',
      translation: 'спагетти',
      image: 'img/spaghetti.jpg',
      audioSrc: 'audio/en_spaghetti.mp3',
    },
    {
      word: 'sushi',
      translation: 'суши',
      image: 'img/sushi.jpg',
      audioSrc: 'audio/en_sushi.mp3',
    },
  ],
  [
    {
      word: 'coast',
      translation: 'побережье',
      image: 'img/coast.jpg',
      audioSrc: 'audio/en_coast.mp3',
    },
    {
      word: 'swamp',
      translation: 'болото',
      image: 'img/swamp.jpg',
      audioSrc: 'audio/en_swamp.mp3',
    },
    {
      word: 'river',
      translation: 'река',
      image: 'img/river.jpg',
      audioSrc: 'audio/en_river.mp3',
    },
    {
      word: 'island',
      translation: 'остров',
      image: 'img/island.jpg',
      audioSrc: 'audio/en_island.mp3',
    },
    {
      word: 'lake',
      translation: 'озеро',
      image: 'img/lake.jpg',
      audioSrc: 'audio/en_lake.mp3',
    },
    {
      word: 'iceberg',
      translation: 'айсберг',
      image: 'img/iceberg.jpg',
      audioSrc: 'audio/en_iceberg.mp3',
    },
    {
      word: 'mountain',
      translation: 'гора',
      image: 'img/mountain.jpg',
      audioSrc: 'audio/en_mountain.mp3',
    },
    {
      word: 'ocean',
      translation: 'океан',
      image: 'img/ocean.jpg',
      audioSrc: 'audio/en_ocean.mp3',
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
    //  clicking on page title
    case (targetClassList.includes('app-title')):
      if (document.querySelector('body').classList.contains('opened-menu')) {
        menu.close();
      } else {
        appControl.changePage('main page');
        appControl.switchObj.enable();
      }
      break;

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
  {
    topic: 'Food',
    image: 'img/app/main-007.png',
  },
  {
    topic: 'Geography',
    image: 'img/app/main-008.png',
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
    this.statArr = JSON.parse(localStorage.getItem('EnglishForKids'));
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
        sortClassName = ` sorted sorted-${this.sortType}`;
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
                            <img src="../assets/img/app/watercolor-hero-01.png" alt="super result" width="753" height="553">
                          </div>
                          <p>Nothing difficult is!</p>
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
var ___CSS_LOADER_URL_IMPORT_12___ = new URL(/* asset import */ __webpack_require__(/*! ../img/app/watercolor-button-repeat-02.png */ "./assets/img/app/watercolor-button-repeat-02.png"), __webpack_require__.b);
var ___CSS_LOADER_URL_IMPORT_13___ = new URL(/* asset import */ __webpack_require__(/*! ../img/app/watercolor-kytes-01.jpg */ "./assets/img/app/watercolor-kytes-01.jpg"), __webpack_require__.b);
var ___CSS_LOADER_URL_IMPORT_14___ = new URL(/* asset import */ __webpack_require__(/*! ../img/app/watercolor-buterfly-01.jpg */ "./assets/img/app/watercolor-buterfly-01.jpg"), __webpack_require__.b);
var ___CSS_LOADER_URL_IMPORT_15___ = new URL(/* asset import */ __webpack_require__(/*! ../img/app/watercolor-line-02-right.png */ "./assets/img/app/watercolor-line-02-right.png"), __webpack_require__.b);
var ___CSS_LOADER_URL_IMPORT_16___ = new URL(/* asset import */ __webpack_require__(/*! ../img/app/watercolor-line-02.png */ "./assets/img/app/watercolor-line-02.png"), __webpack_require__.b);
var ___CSS_LOADER_URL_IMPORT_17___ = new URL(/* asset import */ __webpack_require__(/*! ../img/app/watercolor-line-01.png */ "./assets/img/app/watercolor-line-01.png"), __webpack_require__.b);
var ___CSS_LOADER_URL_IMPORT_18___ = new URL(/* asset import */ __webpack_require__(/*! ../img/app/watercolor-blue-card-bg-01.jpg */ "./assets/img/app/watercolor-blue-card-bg-01.jpg"), __webpack_require__.b);
var ___CSS_LOADER_URL_IMPORT_19___ = new URL(/* asset import */ __webpack_require__(/*! ../img/app/watercolor-flip-button-01.png */ "./assets/img/app/watercolor-flip-button-01.png"), __webpack_require__.b);
var ___CSS_LOADER_URL_IMPORT_20___ = new URL(/* asset import */ __webpack_require__(/*! ../img/app/watercolor-green-line-01.png */ "./assets/img/app/watercolor-green-line-01.png"), __webpack_require__.b);
var ___CSS_LOADER_URL_IMPORT_21___ = new URL(/* asset import */ __webpack_require__(/*! ../img/app/watercolor-red-line-01.png */ "./assets/img/app/watercolor-red-line-01.png"), __webpack_require__.b);
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
var ___CSS_LOADER_URL_REPLACEMENT_19___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(___CSS_LOADER_URL_IMPORT_19___);
var ___CSS_LOADER_URL_REPLACEMENT_20___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(___CSS_LOADER_URL_IMPORT_20___);
var ___CSS_LOADER_URL_REPLACEMENT_21___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(___CSS_LOADER_URL_IMPORT_21___);
// Module
___CSS_LOADER_EXPORT___.push([module.id, "/* gloria-hallelujah-regular - latin */\r\n@font-face {\r\n    font-family: 'Gloria Hallelujah';\r\n    font-style: normal;\r\n    font-weight: 400;\r\n    src: local(''),\r\n         url(" + ___CSS_LOADER_URL_REPLACEMENT_0___ + ") format('woff2'), /* Chrome 26+, Opera 23+, Firefox 39+ */\r\n         url(" + ___CSS_LOADER_URL_REPLACEMENT_1___ + ") format('woff'); /* Chrome 6+, Firefox 3.6+, IE 9+, Safari 5.1+ */\r\n  }\r\n\r\n/* neucha-regular - latin */\r\n@font-face {\r\n    font-family: 'Neucha';\r\n    font-style: normal;\r\n    font-weight: 400;\r\n    src: local(''),\r\n         url(" + ___CSS_LOADER_URL_REPLACEMENT_2___ + ") format('woff2'), /* Chrome 26+, Opera 23+, Firefox 39+ */\r\n         url(" + ___CSS_LOADER_URL_REPLACEMENT_3___ + ") format('woff'); /* Chrome 6+, Firefox 3.6+, IE 9+, Safari 5.1+ */\r\n  }\r\n\r\n/* border-box model for all elements */\r\n\r\nhtml {\r\n    box-sizing: border-box;\r\n}\r\n\r\n*, *::before, *::after {\r\n    box-sizing: inherit;\r\n}\r\n\r\n/* --- Page color styling --- */\r\n\r\n:root {\r\n    --color-bg-main-1: #ffffff;\r\n    --color-bg-main-2: #dbf5f8;\r\n    --color-bg-main-3: #e9f5ff;\r\n    --color-bg-main-4: #f0c2cd63;\r\n    --color-font-1: #3070a6;\r\n}\r\n\r\n/* ---------------------------------- */\r\n\r\nbody {\r\n    width: 100%;\r\n    display: flex;\r\n    flex-direction: column;\r\n    align-items: center;\r\n    background-color: var(--color-bg-main-1);\r\n    background-image: url(" + ___CSS_LOADER_URL_REPLACEMENT_4___ + "), url(" + ___CSS_LOADER_URL_REPLACEMENT_5___ + ");\r\n    background-attachment: fixed;\r\n    background-position: left top, right bottom;\r\n    background-repeat: repeat-y;\r\n    background-size: 15% auto;\r\n    font-family: 'Neucha', cursive;\r\n    color: var(--color-font-1);\r\n}\r\n\r\nbody.opened-menu {\r\n    overflow-y: hidden;\r\n}\r\n\r\n.inactive {\r\n    visibility: hidden;\r\n    position: fixed;\r\n    top: 0;\r\n}\r\n\r\n.graphic, img {\r\n    width: 100%;\r\n    height: auto;\r\n    padding: 0;\r\n    margin: 0;\r\n}\r\n\r\n.container-centered {\r\n    max-width: 1440px;\r\n    min-width: 1440px;\r\n    margin: 0 auto;\r\n}\r\n\r\nheader.container-centered {\r\n    display: flex;\r\n    flex-direction: column;\r\n    justify-content: center;\r\n    align-items: center;\r\n    position: -webkit-sticky;\r\n    position: sticky;\r\n    top: 0;\r\n    z-index: 8;\r\n    margin-top: 0;\r\n    transition: margin 1s;\r\n}\r\n\r\nheader.main-page {\r\n    margin-top: 380px;\r\n}\r\n\r\nheader .header-image {\r\n    width: 70%;\r\n    position: absolute;\r\n    top: -376px;\r\n}\r\n\r\n.main-controls {\r\n    width: 80%;\r\n    min-height: 150px;\r\n    display: flex;\r\n    justify-content: space-around;\r\n    align-items: center;\r\n    border-radius: 35px;\r\n    background-color: white;\r\n    background-image: url(" + ___CSS_LOADER_URL_REPLACEMENT_6___ + "), url(" + ___CSS_LOADER_URL_REPLACEMENT_7___ + ");\r\n    background-position: 100% 0, 0 100%;\r\n    background-repeat: repeat-x;\r\n    background-size: auto 28%;\r\n    z-index: 5;\r\n}\r\n\r\n.game-controls {\r\n    width: 100vw;\r\n    border-radius: 10px;\r\n    min-height: 100px;\r\n    padding: 10px 0;\r\n    display: flex;\r\n    justify-content: space-around;\r\n    align-items: center;\r\n    background-color: white;\r\n    border-radius: 0;\r\n    background-image: url(" + ___CSS_LOADER_URL_REPLACEMENT_4___ + "), url(" + ___CSS_LOADER_URL_REPLACEMENT_5___ + ");\r\n    background-attachment: fixed;\r\n    background-position: left top, right bottom;\r\n    background-repeat: repeat-y;\r\n    background-size: 15% auto;\r\n}\r\n\r\nh1 {\r\n    text-align: center;\r\n    font-family: 'Gloria Hallelujah', cursive;\r\n    text-shadow: 0px 0px 5px #7ed3ff;\r\n}\r\n\r\n.button:hover {\r\n    cursor: pointer;\r\n}\r\n\r\n.menu-button {\r\n    z-index: 10;\r\n    width: 36px;\r\n    height: 36px;\r\n    background-image: url(" + ___CSS_LOADER_URL_REPLACEMENT_8___ + ");\r\n    background-size: cover;\r\n    transition: transform 1s;\r\n}\r\n\r\n.menu-button.opened-menu {\r\n    transform: rotate(180deg);\r\n}\r\n\r\n.button.close-menu {\r\n    position: absolute;\r\n    top: 20px;\r\n    right: 20px;\r\n    width: 50px;\r\n    height: 50px;\r\n    border-radius: 50%;\r\n    background-image: url(" + ___CSS_LOADER_URL_REPLACEMENT_9___ + ");\r\n    background-size: cover;\r\n\r\n}\r\n\r\n.switch {\r\n    width: 110px;\r\n    background-color: #faf8fd;\r\n    display: flex;\r\n    justify-content: space-between;\r\n    border-radius: 60px;\r\n    position: relative;\r\n    border: 2px var(--color-font-1) solid;\r\n}\r\n\r\n.switch.disabled:hover {\r\n    cursor: not-allowed;\r\n}\r\n\r\n.switch-rail {\r\n    position: absolute;\r\n    left: 0;\r\n    width: 100%;\r\n    height: 100%;\r\n    border-radius: inherit;\r\n}\r\n\r\n.switch-roller {\r\n    width: 55px;\r\n    height: 100%;\r\n    position: absolute;\r\n    left: 0;\r\n    border-radius: inherit;\r\n    background-color: #79d1f330;\r\n    z-index: 10;\r\n    transition: left 0.7s;\r\n    border: 1px var(--color-font-1) solid;\r\n}\r\n\r\n.switch.switch-on .switch-roller {\r\n    left: 53px;\r\n}\r\n\r\n.switch-trigger {\r\n    margin: 0 10px;\r\n    height: 40px;\r\n    z-index: 9;\r\n    padding: 10px 0;\r\n    text-align: center;\r\n    font-size: 20px;\r\n}\r\n\r\n.game-button {\r\n    width: 100px;\r\n    height: 100px;\r\n    border-radius: 50px;\r\n    background-position: center;\r\n    background-repeat: no-repeat;\r\n    background-size: cover;\r\n}\r\n\r\n.game-button.start-button {\r\n    background-color: #039227;\r\n    background-image: url(" + ___CSS_LOADER_URL_REPLACEMENT_10___ + ");\r\n}\r\n\r\n.game-button.repeat-button {\r\n    background-color: var(--color-font-1);\r\n    background-image: url(" + ___CSS_LOADER_URL_REPLACEMENT_11___ + ");\r\n}\r\n\r\n.repeat-button {\r\n    animation-name: rotation;\r\n    animation-duration: 4s;\r\n    animation-timing-function: linear;\r\n    animation-iteration-count: infinite;\r\n}\r\n\r\n.repeat-button:hover {\r\n    background-image: url(" + ___CSS_LOADER_URL_REPLACEMENT_12___ + ");\r\n}\r\n\r\n.game-progress {\r\n    width: 220px;\r\n    display: flex;\r\n    justify-content: space-around;\r\n    align-items: center;\r\n}\r\n\r\n.game-indicator {\r\n    width: 150px;\r\n    height: 40px;\r\n    border-radius: 18px;\r\n    display: flex;\r\n    justify-content: flex-start;\r\n    align-items: center;\r\n    background-color: #faf8fd;\r\n    border: 1px var(--color-font-1) solid;\r\n    box-shadow: 0px 0px 10px #7ed3ff;\r\n}\r\n\r\n.star {\r\n    width: 30px;\r\n}\r\n\r\n.game-score {\r\n    text-align: center;\r\n}\r\n\r\n.game-score .correct {\r\n    color: #008000;\r\n}\r\n\r\n.game-score .wrong {\r\n    color: #ff0000;\r\n}\r\n\r\nnav {\r\n    left: -320px;\r\n    position: fixed;\r\n    top: 0;\r\n    width: 320px;\r\n    height: 100%;\r\n    overflow-y: auto;\r\n    background-color: var(--color-bg-main-1);\r\n    z-index: 11;\r\n    background-image: url(" + ___CSS_LOADER_URL_REPLACEMENT_13___ + "), url(" + ___CSS_LOADER_URL_REPLACEMENT_14___ + ");\r\n    background-size: 450px auto, 144px auto;\r\n    background-position: 0px 0px, 122px 100%;\r\n    background-repeat: no-repeat, no-repeat;\r\n    box-shadow: none;\r\n    transition-property: left, background-position, background-size, box-shadow;\r\n    transition-duration: 1.2s,5s;\r\n}\r\n\r\nnav.opened-menu {\r\n    left: 0;\r\n    box-shadow: 0px 0 20px 1px #94ca68, 0px 0 80px 20px #f0e080, 50px 0 250px 50px var(--color-font-1);\r\n}\r\n\r\n.menu-list {\r\n    height: 500px;\r\n    margin-top: calc(50vh - 250px);\r\n}\r\n\r\n.menu-list li {\r\n    padding: 10px 0;\r\n    text-align: center;\r\n    font-size: 2em;\r\n    background-color: var(--color-bg-main-1);\r\n}\r\n\r\n.menu-list li:hover {\r\n    background-color: var(--color-bg-main-2);\r\n    background-image: url(" + ___CSS_LOADER_URL_REPLACEMENT_15___ + ");\r\n    background-size: 100% 100%;\r\n    color: white;\r\n}\r\n\r\n.menu-list li:nth-child(even):hover {\r\n    background-color: var(--color-bg-main-2);\r\n    background-image: url(" + ___CSS_LOADER_URL_REPLACEMENT_16___ + ");\r\n}\r\n\r\n.menu-list li.active-page, .menu-list li.active-page:hover {\r\n    background-color: var(--color-bg-main-2);\r\n    background-image: url(" + ___CSS_LOADER_URL_REPLACEMENT_17___ + ");\r\n    background-size: 100% 100%;\r\n    color: white;\r\n    padding: 15px 0;\r\n}\r\n\r\nmain.container-centered {\r\n    margin-top: 20px;\r\n    padding-bottom: 35px;\r\n}\r\n\r\n.content-wrapper {\r\n    width: 100%;\r\n    margin: auto;\r\n    display: flex;\r\n    flex-direction: column;\r\n    align-items: center;\r\n}\r\n\r\nh2.topic-name {\r\n    font-size: 34px;\r\n    margin: 30px 0;\r\n}\r\n\r\n.card-container {\r\n    display: flex;\r\n    justify-content: space-around;\r\n    align-items: center;\r\n    flex-wrap: wrap;\r\n    width: 78%;\r\n    margin: auto;\r\n}\r\n\r\n.card {\r\n    margin: 15px;\r\n    position: relative;\r\n}\r\n\r\n.card-main-page {\r\n    width: 256px;\r\n    height: 240px;\r\n    margin-top: 20px;\r\n    padding: 45px;\r\n    border-radius: 50%;\r\n    background-color: #ffffff;\r\n    background-image: url(" + ___CSS_LOADER_URL_REPLACEMENT_18___ + ");\r\n    background-size: 100% 83%;\r\n    background-repeat: no-repeat;\r\n}\r\n\r\n.card-topic {\r\n    width: 226px;\r\n    height: 270px;\r\n}\r\n\r\n.card.disabled {\r\n    filter: blur(3px);\r\n}\r\n\r\n.card-content {\r\n    width: 100%;\r\n    height: 100%;\r\n    position: relative;\r\n}\r\n\r\n.card-topic .card-content {\r\n    border: 2px var(--color-font-1) solid;\r\n    box-shadow: 0 0 15px 1px var(--color-font-1);\r\n}\r\n\r\n.card-topic .card-content:hover {\r\n    box-shadow: 0 0 15px 3px var(--color-font-1);\r\n}\r\n\r\n.card.disabled .card-content {\r\n    box-shadow: none;\r\n}\r\n\r\n.card-main-page .card-content, .card-main-page img {\r\n    border-radius: 50px;\r\n}\r\n\r\n.card-content, .card-content img {\r\n    transition: border-radius 1s;\r\n}\r\n\r\n.card-topic .card-content {\r\n    border-radius: 50px 0;\r\n}\r\n\r\n.card-topic.flipped .card-content {\r\n    border-radius: 0 50px;\r\n}\r\n\r\n.card-topic img {\r\n    border-radius: 50px 0 0 0;\r\n}\r\n\r\n.card-topic.flipped img {\r\n    border-radius: 0 50px 0 0;\r\n}\r\n\r\n.card p {\r\n    margin-top: 15px;\r\n    font-size: 32px;\r\n    text-align: center;\r\n}\r\n\r\n.card-main-page p {\r\n    position: relative;\r\n    top: 32px;\r\n    border-radius: 20px;\r\n    font-size: 32px;\r\n}\r\n\r\n.card-flip-button {\r\n    width: 35px;\r\n    height: 35px;\r\n    position: absolute;\r\n    bottom: 20px;\r\n    right: 20px;\r\n    border-radius: 50%;\r\n    background-image: url(" + ___CSS_LOADER_URL_REPLACEMENT_19___ + ");\r\n    background-size: cover;\r\n}\r\n\r\n.card-flip-button:hover {\r\n    animation-name: rotation;\r\n    animation-duration: 2s;\r\n    animation-timing-function: linear;\r\n    animation-iteration-count: infinite;\r\n}\r\n\r\n.flipped .card-content {\r\n    animation-name: flip-card;\r\n    animation-duration: 1s;\r\n}\r\n\r\n.unflipped .card-content {\r\n    animation-name: unflip-card;\r\n    animation-duration: 1s;\r\n}\r\n\r\n.final-clip {\r\n    display: flex;\r\n    flex-direction: column;\r\n    width: 320px;\r\n    margin: auto;\r\n    justify-content: center;\r\n    align-items: center;\r\n    padding: 50px 0;\r\n}\r\n\r\n.final-clip p {\r\n    color: red;\r\n    font-size: 36px;\r\n    margin-top: 30px;\r\n}\r\n\r\n.stat-container {\r\n    width: 74%;\r\n    display: flex;\r\n    flex-direction: column;\r\n    justify-content: center;\r\n    align-items: center;\r\n    font-size: 2em;\r\n}\r\n\r\n.table-wrapper {\r\n    width: 100%;\r\n    overflow-x: auto;\r\n    overflow-y: hidden;\r\n}\r\n\r\n.stat-table {\r\n    width: 100%;\r\n    border-collapse: collapse;\r\n    font-size: 0.5em;\r\n\r\n}\r\n\r\nthead {\r\n    background-color: aliceblue;\r\n}\r\n\r\nth, td {\r\n    padding: 0 4px;\r\n    border: 1px solid black;\r\n    text-align: center;\r\n    vertical-align: middle;\r\n}\r\n\r\nth {\r\n    height: 40px;\r\n    position: relative;\r\n    font-size: 22px;\r\n    background-color: var(--color-bg-main-1);\r\n    border: none;\r\n}\r\n\r\ntr {\r\n    height: 25px;\r\n    background-color: var(--color-bg-main-1);\r\n}\r\n\r\nth.sorted {\r\n    padding: 0 24px 0 4px;\r\n}\r\n\r\ntr:nth-child(even) {\r\n    background-color: #e9f5ff;\r\n}\r\n\r\nimg.sort-icon {\r\n    width: 16px;\r\n    height: auto;\r\n    position: absolute;\r\n    right: 15px;\r\n    top: 12px;\r\n}\r\n\r\n.stat-buttons-wrapper {\r\n    width: 100%;\r\n    display: flex;\r\n    justify-content: space-around;\r\n    flex-wrap: wrap;\r\n}\r\n\r\n.stat-button {\r\n    width: 300px;\r\n    height: 70px;\r\n    margin: 20px 0;\r\n    padding: 15px;\r\n    border-radius: 50px;\r\n    color: azure;\r\n    text-align: center;\r\n}\r\n\r\n.button.train-diff {\r\n    background-color: #07a060;\r\n    background-image: url(" + ___CSS_LOADER_URL_REPLACEMENT_20___ + ");\r\n    background-size: 100% 100%;\r\n    text-shadow: 3px 3px 3px #07a060;\r\n}\r\n\r\n.button.reset-stat {\r\n    background-color: #bd2d2d;\r\n    background-image: url(" + ___CSS_LOADER_URL_REPLACEMENT_21___ + ");\r\n    background-size: 100% 100%;\r\n    text-shadow: 3px 3px 3px #bd2d2d;\r\n}\r\n\r\n.nothing-diff {\r\n    width: 60%;\r\n    margin-top: 30px;\r\n    display: flex;\r\n    flex-direction: column-reverse;\r\n    align-items: center;\r\n    justify-content: center;\r\n}\r\n\r\n.nothing-diff .graphic {\r\n    width: 60%;\r\n}\r\n\r\n.nothing-diff p {\r\n    color: #2a641a;\r\n    font-size: 4vw;\r\n    margin-bottom: 15px;\r\n    text-shadow: 2px 5px 5px #e4ebb5;\r\n}\r\n\r\n.disabled:hover {\r\n    cursor:auto;\r\n}\r\n\r\n/* --- Animation --- */\r\n\r\n@keyframes flip-card {\r\n    0% {}\r\n    50% {transform: rotateY(89deg)}\r\n}\r\n\r\n@keyframes unflip-card {\r\n    0% {}\r\n    50% {transform: rotateY(89deg)}\r\n}\r\n\r\n@keyframes rotation {\r\n    0% {}\r\n    100% {transform: rotate(360deg)}\r\n}\r\n\r\n/* --- RESPONSIVE LAYOUTS --- */\r\n\r\n@media (max-width: 1439px) {\r\n    .container-centered {\r\n        min-width: calc(1440vw*100/1440 - 20px);\r\n    }\r\n\r\n    header.main-page {\r\n        margin-top:  calc(380vw*100/1440);\r\n    }\r\n\r\n    header .graphic {\r\n        top: calc(-370vw*100/1440 + 5px);\r\n    }\r\n}\r\n\r\n@media (max-width: 999px) {\r\n\r\n    img.sort-icon {\r\n        right: 5px;\r\n    }\r\n\r\n    .nothing-diff {\r\n        width: 100%;\r\n    }\r\n\r\n    .nothing-diff p {\r\n        font-size: 36px;\r\n    }\r\n}\r\n\r\n@media (max-width: 559px) {\r\n    .main-controls {\r\n        width: 100vw;\r\n        border-radius: 0;\r\n    }\r\n\r\n    .game-controls {\r\n        justify-content: center;\r\n        box-shadow: 0px -15px 30px #7ed3ff;\r\n    }\r\n\r\n    .game-button {\r\n        width: 70px;\r\n        height: 70px;\r\n    }\r\n\r\n    .game-progress {\r\n        justify-content: flex-start;\r\n        margin: 0 0 0 10px;\r\n    }\r\n\r\n    .game-score {\r\n        margin: 0 0 0 10px;\r\n    }\r\n\r\n    h1 {\r\n        max-width: 75px;\r\n        font-size: 24px;\r\n    }\r\n\r\n    h2.topic-name {\r\n        font-size: 32px;\r\n        margin: 10px 0;\r\n    }\r\n\r\n    .card-main-page {\r\n        width: 230px;\r\n        height: 220px;\r\n        margin: 10px 0;\r\n    }\r\n\r\n    .card-main-page p {\r\n        font-size: 28px;\r\n    }\r\n\r\n    .stat-buttons-wrapper {\r\n        width: 78%;\r\n    }\r\n\r\n    .stat-button {\r\n        width: 190px;\r\n        height: 52px;\r\n        font-size: 21px;\r\n        margin: 5px 0;\r\n    }\r\n\r\n    main.container-centered {\r\n        width: 100vw;\r\n    }\r\n\r\n    .stat-container {\r\n        width: 100%;\r\n    }\r\n\r\n    .table-wrapper {\r\n        width: 72%;\r\n    }\r\n}\r\n\r\n@media (max-height: 930px) {\r\n    nav {\r\n        background-size: 450px auto, 0 auto;\r\n    }\r\n}\r\n\r\n@media (max-height: 970px) {\r\n    .menu-list {\r\n        margin-top: 235px;\r\n    }\r\n}\r\n", "",{"version":3,"sources":["webpack://./assets/styles/style.css"],"names":[],"mappings":"AAAA,sCAAsC;AACtC;IACI,gCAAgC;IAChC,kBAAkB;IAClB,gBAAgB;IAChB;;+DAE4E,EAAE,gDAAgD;EAChI;;AAEF,2BAA2B;AAC3B;IACI,qBAAqB;IACrB,kBAAkB;IAClB,gBAAgB;IAChB;;+DAEiE,EAAE,gDAAgD;EACrH;;AAEF,sCAAsC;;AAEtC;IACI,sBAAsB;AAC1B;;AAEA;IACI,mBAAmB;AACvB;;AAEA,+BAA+B;;AAE/B;IACI,0BAA0B;IAC1B,0BAA0B;IAC1B,0BAA0B;IAC1B,4BAA4B;IAC5B,uBAAuB;AAC3B;;AAEA,uCAAuC;;AAEvC;IACI,WAAW;IACX,aAAa;IACb,sBAAsB;IACtB,mBAAmB;IACnB,wCAAwC;IACxC,kGAA+G;IAC/G,4BAA4B;IAC5B,2CAA2C;IAC3C,2BAA2B;IAC3B,yBAAyB;IACzB,8BAA8B;IAC9B,0BAA0B;AAC9B;;AAEA;IACI,kBAAkB;AACtB;;AAEA;IACI,kBAAkB;IAClB,eAAe;IACf,MAAM;AACV;;AAEA;IACI,WAAW;IACX,YAAY;IACZ,UAAU;IACV,SAAS;AACb;;AAEA;IACI,iBAAiB;IACjB,iBAAiB;IACjB,cAAc;AAClB;;AAEA;IACI,aAAa;IACb,sBAAsB;IACtB,uBAAuB;IACvB,mBAAmB;IACnB,wBAAwB;IACxB,gBAAgB;IAChB,MAAM;IACN,UAAU;IACV,aAAa;IACb,qBAAqB;AACzB;;AAEA;IACI,iBAAiB;AACrB;;AAEA;IACI,UAAU;IACV,kBAAkB;IAClB,WAAW;AACf;;AAEA;IACI,UAAU;IACV,iBAAiB;IACjB,aAAa;IACb,6BAA6B;IAC7B,mBAAmB;IACnB,mBAAmB;IACnB,uBAAuB;IACvB,kGAA0G;IAC1G,mCAAmC;IACnC,2BAA2B;IAC3B,yBAAyB;IACzB,UAAU;AACd;;AAEA;IACI,YAAY;IACZ,mBAAmB;IACnB,iBAAiB;IACjB,eAAe;IACf,aAAa;IACb,6BAA6B;IAC7B,mBAAmB;IACnB,uBAAuB;IACvB,gBAAgB;IAChB,kGAA+G;IAC/G,4BAA4B;IAC5B,2CAA2C;IAC3C,2BAA2B;IAC3B,yBAAyB;AAC7B;;AAEA;IACI,kBAAkB;IAClB,yCAAyC;IACzC,gCAAgC;AACpC;;AAEA;IACI,eAAe;AACnB;;AAEA;IACI,WAAW;IACX,WAAW;IACX,YAAY;IACZ,yDAAiE;IACjE,sBAAsB;IACtB,wBAAwB;AAC5B;;AAEA;IACI,yBAAyB;AAC7B;;AAEA;IACI,kBAAkB;IAClB,SAAS;IACT,WAAW;IACX,WAAW;IACX,YAAY;IACZ,kBAAkB;IAClB,yDAAsE;IACtE,sBAAsB;;AAE1B;;AAEA;IACI,YAAY;IACZ,yBAAyB;IACzB,aAAa;IACb,8BAA8B;IAC9B,mBAAmB;IACnB,kBAAkB;IAClB,qCAAqC;AACzC;;AAEA;IACI,mBAAmB;AACvB;;AAEA;IACI,kBAAkB;IAClB,OAAO;IACP,WAAW;IACX,YAAY;IACZ,sBAAsB;AAC1B;;AAEA;IACI,WAAW;IACX,YAAY;IACZ,kBAAkB;IAClB,OAAO;IACP,sBAAsB;IACtB,2BAA2B;IAC3B,WAAW;IACX,qBAAqB;IACrB,qCAAqC;AACzC;;AAEA;IACI,UAAU;AACd;;AAEA;IACI,cAAc;IACd,YAAY;IACZ,UAAU;IACV,eAAe;IACf,kBAAkB;IAClB,eAAe;AACnB;;AAEA;IACI,YAAY;IACZ,aAAa;IACb,mBAAmB;IACnB,2BAA2B;IAC3B,4BAA4B;IAC5B,sBAAsB;AAC1B;;AAEA;IACI,yBAAyB;IACzB,0DAAkE;AACtE;;AAEA;IACI,qCAAqC;IACrC,0DAAmE;AACvE;;AAEA;IACI,wBAAwB;IACxB,sBAAsB;IACtB,iCAAiC;IACjC,mCAAmC;AACvC;;AAEA;IACI,0DAAmE;AACvE;;AAEA;IACI,YAAY;IACZ,aAAa;IACb,6BAA6B;IAC7B,mBAAmB;AACvB;;AAEA;IACI,YAAY;IACZ,YAAY;IACZ,mBAAmB;IACnB,aAAa;IACb,2BAA2B;IAC3B,mBAAmB;IACnB,yBAAyB;IACzB,qCAAqC;IACrC,gCAAgC;AACpC;;AAEA;IACI,WAAW;AACf;;AAEA;IACI,kBAAkB;AACtB;;AAEA;IACI,cAAc;AAClB;;AAEA;IACI,cAAc;AAClB;;AAEA;IACI,YAAY;IACZ,eAAe;IACf,MAAM;IACN,YAAY;IACZ,YAAY;IACZ,gBAAgB;IAChB,wCAAwC;IACxC,WAAW;IACX,oGAAyG;IACzG,uCAAuC;IACvC,wCAAwC;IACxC,uCAAuC;IACvC,gBAAgB;IAChB,2EAA2E;IAC3E,4BAA4B;AAChC;;AAEA;IACI,OAAO;IACP,kGAAkG;AACtG;;AAEA;IACI,aAAa;IACb,8BAA8B;AAClC;;AAEA;IACI,eAAe;IACf,kBAAkB;IAClB,cAAc;IACd,wCAAwC;AAC5C;;AAEA;IACI,wCAAwC;IACxC,0DAAgE;IAChE,0BAA0B;IAC1B,YAAY;AAChB;;AAEA;IACI,wCAAwC;IACxC,0DAA0D;AAC9D;;AAEA;IACI,wCAAwC;IACxC,0DAA0D;IAC1D,0BAA0B;IAC1B,YAAY;IACZ,eAAe;AACnB;;AAEA;IACI,gBAAgB;IAChB,oBAAoB;AACxB;;AAEA;IACI,WAAW;IACX,YAAY;IACZ,aAAa;IACb,sBAAsB;IACtB,mBAAmB;AACvB;;AAEA;IACI,eAAe;IACf,cAAc;AAClB;;AAEA;IACI,aAAa;IACb,6BAA6B;IAC7B,mBAAmB;IACnB,eAAe;IACf,UAAU;IACV,YAAY;AAChB;;AAEA;IACI,YAAY;IACZ,kBAAkB;AACtB;;AAEA;IACI,YAAY;IACZ,aAAa;IACb,gBAAgB;IAChB,aAAa;IACb,kBAAkB;IAClB,yBAAyB;IACzB,0DAAkE;IAClE,yBAAyB;IACzB,4BAA4B;AAChC;;AAEA;IACI,YAAY;IACZ,aAAa;AACjB;;AAEA;IACI,iBAAiB;AACrB;;AAEA;IACI,WAAW;IACX,YAAY;IACZ,kBAAkB;AACtB;;AAEA;IACI,qCAAqC;IACrC,4CAA4C;AAChD;;AAEA;IACI,4CAA4C;AAChD;;AAEA;IACI,gBAAgB;AACpB;;AAEA;IACI,mBAAmB;AACvB;;AAEA;IACI,4BAA4B;AAChC;;AAEA;IACI,qBAAqB;AACzB;;AAEA;IACI,qBAAqB;AACzB;;AAEA;IACI,yBAAyB;AAC7B;;AAEA;IACI,yBAAyB;AAC7B;;AAEA;IACI,gBAAgB;IAChB,eAAe;IACf,kBAAkB;AACtB;;AAEA;IACI,kBAAkB;IAClB,SAAS;IACT,mBAAmB;IACnB,eAAe;AACnB;;AAEA;IACI,WAAW;IACX,YAAY;IACZ,kBAAkB;IAClB,YAAY;IACZ,WAAW;IACX,kBAAkB;IAClB,0DAAiE;IACjE,sBAAsB;AAC1B;;AAEA;IACI,wBAAwB;IACxB,sBAAsB;IACtB,iCAAiC;IACjC,mCAAmC;AACvC;;AAEA;IACI,yBAAyB;IACzB,sBAAsB;AAC1B;;AAEA;IACI,2BAA2B;IAC3B,sBAAsB;AAC1B;;AAEA;IACI,aAAa;IACb,sBAAsB;IACtB,YAAY;IACZ,YAAY;IACZ,uBAAuB;IACvB,mBAAmB;IACnB,eAAe;AACnB;;AAEA;IACI,UAAU;IACV,eAAe;IACf,gBAAgB;AACpB;;AAEA;IACI,UAAU;IACV,aAAa;IACb,sBAAsB;IACtB,uBAAuB;IACvB,mBAAmB;IACnB,cAAc;AAClB;;AAEA;IACI,WAAW;IACX,gBAAgB;IAChB,kBAAkB;AACtB;;AAEA;IACI,WAAW;IACX,yBAAyB;IACzB,gBAAgB;;AAEpB;;AAEA;IACI,2BAA2B;AAC/B;;AAEA;IACI,cAAc;IACd,uBAAuB;IACvB,kBAAkB;IAClB,sBAAsB;AAC1B;;AAEA;IACI,YAAY;IACZ,kBAAkB;IAClB,eAAe;IACf,wCAAwC;IACxC,YAAY;AAChB;;AAEA;IACI,YAAY;IACZ,wCAAwC;AAC5C;;AAEA;IACI,qBAAqB;AACzB;;AAEA;IACI,yBAAyB;AAC7B;;AAEA;IACI,WAAW;IACX,YAAY;IACZ,kBAAkB;IAClB,WAAW;IACX,SAAS;AACb;;AAEA;IACI,WAAW;IACX,aAAa;IACb,6BAA6B;IAC7B,eAAe;AACnB;;AAEA;IACI,YAAY;IACZ,YAAY;IACZ,cAAc;IACd,aAAa;IACb,mBAAmB;IACnB,YAAY;IACZ,kBAAkB;AACtB;;AAEA;IACI,yBAAyB;IACzB,0DAAgE;IAChE,0BAA0B;IAC1B,gCAAgC;AACpC;;AAEA;IACI,yBAAyB;IACzB,0DAA8D;IAC9D,0BAA0B;IAC1B,gCAAgC;AACpC;;AAEA;IACI,UAAU;IACV,gBAAgB;IAChB,aAAa;IACb,8BAA8B;IAC9B,mBAAmB;IACnB,uBAAuB;AAC3B;;AAEA;IACI,UAAU;AACd;;AAEA;IACI,cAAc;IACd,cAAc;IACd,mBAAmB;IACnB,gCAAgC;AACpC;;AAEA;IACI,WAAW;AACf;;AAEA,sBAAsB;;AAEtB;IACI,IAAI;IACJ,KAAK,yBAAyB;AAClC;;AAEA;IACI,IAAI;IACJ,KAAK,yBAAyB;AAClC;;AAEA;IACI,IAAI;IACJ,MAAM,yBAAyB;AACnC;;AAEA,+BAA+B;;AAE/B;IACI;QACI,uCAAuC;IAC3C;;IAEA;QACI,iCAAiC;IACrC;;IAEA;QACI,gCAAgC;IACpC;AACJ;;AAEA;;IAEI;QACI,UAAU;IACd;;IAEA;QACI,WAAW;IACf;;IAEA;QACI,eAAe;IACnB;AACJ;;AAEA;IACI;QACI,YAAY;QACZ,gBAAgB;IACpB;;IAEA;QACI,uBAAuB;QACvB,kCAAkC;IACtC;;IAEA;QACI,WAAW;QACX,YAAY;IAChB;;IAEA;QACI,2BAA2B;QAC3B,kBAAkB;IACtB;;IAEA;QACI,kBAAkB;IACtB;;IAEA;QACI,eAAe;QACf,eAAe;IACnB;;IAEA;QACI,eAAe;QACf,cAAc;IAClB;;IAEA;QACI,YAAY;QACZ,aAAa;QACb,cAAc;IAClB;;IAEA;QACI,eAAe;IACnB;;IAEA;QACI,UAAU;IACd;;IAEA;QACI,YAAY;QACZ,YAAY;QACZ,eAAe;QACf,aAAa;IACjB;;IAEA;QACI,YAAY;IAChB;;IAEA;QACI,WAAW;IACf;;IAEA;QACI,UAAU;IACd;AACJ;;AAEA;IACI;QACI,mCAAmC;IACvC;AACJ;;AAEA;IACI;QACI,iBAAiB;IACrB;AACJ","sourcesContent":["/* gloria-hallelujah-regular - latin */\r\n@font-face {\r\n    font-family: 'Gloria Hallelujah';\r\n    font-style: normal;\r\n    font-weight: 400;\r\n    src: local(''),\r\n         url('../fonts/gloria-hallelujah-v17-latin-regular.woff2') format('woff2'), /* Chrome 26+, Opera 23+, Firefox 39+ */\r\n         url('../fonts/gloria-hallelujah-v17-latin-regular.woff') format('woff'); /* Chrome 6+, Firefox 3.6+, IE 9+, Safari 5.1+ */\r\n  }\r\n\r\n/* neucha-regular - latin */\r\n@font-face {\r\n    font-family: 'Neucha';\r\n    font-style: normal;\r\n    font-weight: 400;\r\n    src: local(''),\r\n         url('../fonts/neucha-v17-latin-regular.woff2') format('woff2'), /* Chrome 26+, Opera 23+, Firefox 39+ */\r\n         url('../fonts/neucha-v17-latin-regular.woff') format('woff'); /* Chrome 6+, Firefox 3.6+, IE 9+, Safari 5.1+ */\r\n  }\r\n\r\n/* border-box model for all elements */\r\n\r\nhtml {\r\n    box-sizing: border-box;\r\n}\r\n\r\n*, *::before, *::after {\r\n    box-sizing: inherit;\r\n}\r\n\r\n/* --- Page color styling --- */\r\n\r\n:root {\r\n    --color-bg-main-1: #ffffff;\r\n    --color-bg-main-2: #dbf5f8;\r\n    --color-bg-main-3: #e9f5ff;\r\n    --color-bg-main-4: #f0c2cd63;\r\n    --color-font-1: #3070a6;\r\n}\r\n\r\n/* ---------------------------------- */\r\n\r\nbody {\r\n    width: 100%;\r\n    display: flex;\r\n    flex-direction: column;\r\n    align-items: center;\r\n    background-color: var(--color-bg-main-1);\r\n    background-image: url(\"../img/app/watercolor-blue-bg-left.jpg\"), url(\"../img/app/watercolor-blue-bg-right.jpg\");\r\n    background-attachment: fixed;\r\n    background-position: left top, right bottom;\r\n    background-repeat: repeat-y;\r\n    background-size: 15% auto;\r\n    font-family: 'Neucha', cursive;\r\n    color: var(--color-font-1);\r\n}\r\n\r\nbody.opened-menu {\r\n    overflow-y: hidden;\r\n}\r\n\r\n.inactive {\r\n    visibility: hidden;\r\n    position: fixed;\r\n    top: 0;\r\n}\r\n\r\n.graphic, img {\r\n    width: 100%;\r\n    height: auto;\r\n    padding: 0;\r\n    margin: 0;\r\n}\r\n\r\n.container-centered {\r\n    max-width: 1440px;\r\n    min-width: 1440px;\r\n    margin: 0 auto;\r\n}\r\n\r\nheader.container-centered {\r\n    display: flex;\r\n    flex-direction: column;\r\n    justify-content: center;\r\n    align-items: center;\r\n    position: -webkit-sticky;\r\n    position: sticky;\r\n    top: 0;\r\n    z-index: 8;\r\n    margin-top: 0;\r\n    transition: margin 1s;\r\n}\r\n\r\nheader.main-page {\r\n    margin-top: 380px;\r\n}\r\n\r\nheader .header-image {\r\n    width: 70%;\r\n    position: absolute;\r\n    top: -376px;\r\n}\r\n\r\n.main-controls {\r\n    width: 80%;\r\n    min-height: 150px;\r\n    display: flex;\r\n    justify-content: space-around;\r\n    align-items: center;\r\n    border-radius: 35px;\r\n    background-color: white;\r\n    background-image: url(../img/app/watercolor-waves-01-up.png), url(../img/app/watercolor-waves-01-down.png);\r\n    background-position: 100% 0, 0 100%;\r\n    background-repeat: repeat-x;\r\n    background-size: auto 28%;\r\n    z-index: 5;\r\n}\r\n\r\n.game-controls {\r\n    width: 100vw;\r\n    border-radius: 10px;\r\n    min-height: 100px;\r\n    padding: 10px 0;\r\n    display: flex;\r\n    justify-content: space-around;\r\n    align-items: center;\r\n    background-color: white;\r\n    border-radius: 0;\r\n    background-image: url(\"../img/app/watercolor-blue-bg-left.jpg\"), url(\"../img/app/watercolor-blue-bg-right.jpg\");\r\n    background-attachment: fixed;\r\n    background-position: left top, right bottom;\r\n    background-repeat: repeat-y;\r\n    background-size: 15% auto;\r\n}\r\n\r\nh1 {\r\n    text-align: center;\r\n    font-family: 'Gloria Hallelujah', cursive;\r\n    text-shadow: 0px 0px 5px #7ed3ff;\r\n}\r\n\r\n.button:hover {\r\n    cursor: pointer;\r\n}\r\n\r\n.menu-button {\r\n    z-index: 10;\r\n    width: 36px;\r\n    height: 36px;\r\n    background-image: url(\"../img/app/watercolor-menu-button-01.png\");\r\n    background-size: cover;\r\n    transition: transform 1s;\r\n}\r\n\r\n.menu-button.opened-menu {\r\n    transform: rotate(180deg);\r\n}\r\n\r\n.button.close-menu {\r\n    position: absolute;\r\n    top: 20px;\r\n    right: 20px;\r\n    width: 50px;\r\n    height: 50px;\r\n    border-radius: 50%;\r\n    background-image: url(\"../img/app/watercolor-red-cross-button-01.jpg\");\r\n    background-size: cover;\r\n\r\n}\r\n\r\n.switch {\r\n    width: 110px;\r\n    background-color: #faf8fd;\r\n    display: flex;\r\n    justify-content: space-between;\r\n    border-radius: 60px;\r\n    position: relative;\r\n    border: 2px var(--color-font-1) solid;\r\n}\r\n\r\n.switch.disabled:hover {\r\n    cursor: not-allowed;\r\n}\r\n\r\n.switch-rail {\r\n    position: absolute;\r\n    left: 0;\r\n    width: 100%;\r\n    height: 100%;\r\n    border-radius: inherit;\r\n}\r\n\r\n.switch-roller {\r\n    width: 55px;\r\n    height: 100%;\r\n    position: absolute;\r\n    left: 0;\r\n    border-radius: inherit;\r\n    background-color: #79d1f330;\r\n    z-index: 10;\r\n    transition: left 0.7s;\r\n    border: 1px var(--color-font-1) solid;\r\n}\r\n\r\n.switch.switch-on .switch-roller {\r\n    left: 53px;\r\n}\r\n\r\n.switch-trigger {\r\n    margin: 0 10px;\r\n    height: 40px;\r\n    z-index: 9;\r\n    padding: 10px 0;\r\n    text-align: center;\r\n    font-size: 20px;\r\n}\r\n\r\n.game-button {\r\n    width: 100px;\r\n    height: 100px;\r\n    border-radius: 50px;\r\n    background-position: center;\r\n    background-repeat: no-repeat;\r\n    background-size: cover;\r\n}\r\n\r\n.game-button.start-button {\r\n    background-color: #039227;\r\n    background-image: url(\"../img/app/watercolor-button-start-01.png\");\r\n}\r\n\r\n.game-button.repeat-button {\r\n    background-color: var(--color-font-1);\r\n    background-image: url(\"../img/app/watercolor-button-repeat-01.png\");\r\n}\r\n\r\n.repeat-button {\r\n    animation-name: rotation;\r\n    animation-duration: 4s;\r\n    animation-timing-function: linear;\r\n    animation-iteration-count: infinite;\r\n}\r\n\r\n.repeat-button:hover {\r\n    background-image: url(\"../img/app/watercolor-button-repeat-02.png\");\r\n}\r\n\r\n.game-progress {\r\n    width: 220px;\r\n    display: flex;\r\n    justify-content: space-around;\r\n    align-items: center;\r\n}\r\n\r\n.game-indicator {\r\n    width: 150px;\r\n    height: 40px;\r\n    border-radius: 18px;\r\n    display: flex;\r\n    justify-content: flex-start;\r\n    align-items: center;\r\n    background-color: #faf8fd;\r\n    border: 1px var(--color-font-1) solid;\r\n    box-shadow: 0px 0px 10px #7ed3ff;\r\n}\r\n\r\n.star {\r\n    width: 30px;\r\n}\r\n\r\n.game-score {\r\n    text-align: center;\r\n}\r\n\r\n.game-score .correct {\r\n    color: #008000;\r\n}\r\n\r\n.game-score .wrong {\r\n    color: #ff0000;\r\n}\r\n\r\nnav {\r\n    left: -320px;\r\n    position: fixed;\r\n    top: 0;\r\n    width: 320px;\r\n    height: 100%;\r\n    overflow-y: auto;\r\n    background-color: var(--color-bg-main-1);\r\n    z-index: 11;\r\n    background-image: url(\"../img/app/watercolor-kytes-01.jpg\"), url(\"../img/app/watercolor-buterfly-01.jpg\");\r\n    background-size: 450px auto, 144px auto;\r\n    background-position: 0px 0px, 122px 100%;\r\n    background-repeat: no-repeat, no-repeat;\r\n    box-shadow: none;\r\n    transition-property: left, background-position, background-size, box-shadow;\r\n    transition-duration: 1.2s,5s;\r\n}\r\n\r\nnav.opened-menu {\r\n    left: 0;\r\n    box-shadow: 0px 0 20px 1px #94ca68, 0px 0 80px 20px #f0e080, 50px 0 250px 50px var(--color-font-1);\r\n}\r\n\r\n.menu-list {\r\n    height: 500px;\r\n    margin-top: calc(50vh - 250px);\r\n}\r\n\r\n.menu-list li {\r\n    padding: 10px 0;\r\n    text-align: center;\r\n    font-size: 2em;\r\n    background-color: var(--color-bg-main-1);\r\n}\r\n\r\n.menu-list li:hover {\r\n    background-color: var(--color-bg-main-2);\r\n    background-image: url(\"../img/app/watercolor-line-02-right.png\");\r\n    background-size: 100% 100%;\r\n    color: white;\r\n}\r\n\r\n.menu-list li:nth-child(even):hover {\r\n    background-color: var(--color-bg-main-2);\r\n    background-image: url(\"../img/app/watercolor-line-02.png\");\r\n}\r\n\r\n.menu-list li.active-page, .menu-list li.active-page:hover {\r\n    background-color: var(--color-bg-main-2);\r\n    background-image: url(\"../img/app/watercolor-line-01.png\");\r\n    background-size: 100% 100%;\r\n    color: white;\r\n    padding: 15px 0;\r\n}\r\n\r\nmain.container-centered {\r\n    margin-top: 20px;\r\n    padding-bottom: 35px;\r\n}\r\n\r\n.content-wrapper {\r\n    width: 100%;\r\n    margin: auto;\r\n    display: flex;\r\n    flex-direction: column;\r\n    align-items: center;\r\n}\r\n\r\nh2.topic-name {\r\n    font-size: 34px;\r\n    margin: 30px 0;\r\n}\r\n\r\n.card-container {\r\n    display: flex;\r\n    justify-content: space-around;\r\n    align-items: center;\r\n    flex-wrap: wrap;\r\n    width: 78%;\r\n    margin: auto;\r\n}\r\n\r\n.card {\r\n    margin: 15px;\r\n    position: relative;\r\n}\r\n\r\n.card-main-page {\r\n    width: 256px;\r\n    height: 240px;\r\n    margin-top: 20px;\r\n    padding: 45px;\r\n    border-radius: 50%;\r\n    background-color: #ffffff;\r\n    background-image: url(\"../img/app/watercolor-blue-card-bg-01.jpg\");\r\n    background-size: 100% 83%;\r\n    background-repeat: no-repeat;\r\n}\r\n\r\n.card-topic {\r\n    width: 226px;\r\n    height: 270px;\r\n}\r\n\r\n.card.disabled {\r\n    filter: blur(3px);\r\n}\r\n\r\n.card-content {\r\n    width: 100%;\r\n    height: 100%;\r\n    position: relative;\r\n}\r\n\r\n.card-topic .card-content {\r\n    border: 2px var(--color-font-1) solid;\r\n    box-shadow: 0 0 15px 1px var(--color-font-1);\r\n}\r\n\r\n.card-topic .card-content:hover {\r\n    box-shadow: 0 0 15px 3px var(--color-font-1);\r\n}\r\n\r\n.card.disabled .card-content {\r\n    box-shadow: none;\r\n}\r\n\r\n.card-main-page .card-content, .card-main-page img {\r\n    border-radius: 50px;\r\n}\r\n\r\n.card-content, .card-content img {\r\n    transition: border-radius 1s;\r\n}\r\n\r\n.card-topic .card-content {\r\n    border-radius: 50px 0;\r\n}\r\n\r\n.card-topic.flipped .card-content {\r\n    border-radius: 0 50px;\r\n}\r\n\r\n.card-topic img {\r\n    border-radius: 50px 0 0 0;\r\n}\r\n\r\n.card-topic.flipped img {\r\n    border-radius: 0 50px 0 0;\r\n}\r\n\r\n.card p {\r\n    margin-top: 15px;\r\n    font-size: 32px;\r\n    text-align: center;\r\n}\r\n\r\n.card-main-page p {\r\n    position: relative;\r\n    top: 32px;\r\n    border-radius: 20px;\r\n    font-size: 32px;\r\n}\r\n\r\n.card-flip-button {\r\n    width: 35px;\r\n    height: 35px;\r\n    position: absolute;\r\n    bottom: 20px;\r\n    right: 20px;\r\n    border-radius: 50%;\r\n    background-image: url(\"../img/app/watercolor-flip-button-01.png\");\r\n    background-size: cover;\r\n}\r\n\r\n.card-flip-button:hover {\r\n    animation-name: rotation;\r\n    animation-duration: 2s;\r\n    animation-timing-function: linear;\r\n    animation-iteration-count: infinite;\r\n}\r\n\r\n.flipped .card-content {\r\n    animation-name: flip-card;\r\n    animation-duration: 1s;\r\n}\r\n\r\n.unflipped .card-content {\r\n    animation-name: unflip-card;\r\n    animation-duration: 1s;\r\n}\r\n\r\n.final-clip {\r\n    display: flex;\r\n    flex-direction: column;\r\n    width: 320px;\r\n    margin: auto;\r\n    justify-content: center;\r\n    align-items: center;\r\n    padding: 50px 0;\r\n}\r\n\r\n.final-clip p {\r\n    color: red;\r\n    font-size: 36px;\r\n    margin-top: 30px;\r\n}\r\n\r\n.stat-container {\r\n    width: 74%;\r\n    display: flex;\r\n    flex-direction: column;\r\n    justify-content: center;\r\n    align-items: center;\r\n    font-size: 2em;\r\n}\r\n\r\n.table-wrapper {\r\n    width: 100%;\r\n    overflow-x: auto;\r\n    overflow-y: hidden;\r\n}\r\n\r\n.stat-table {\r\n    width: 100%;\r\n    border-collapse: collapse;\r\n    font-size: 0.5em;\r\n\r\n}\r\n\r\nthead {\r\n    background-color: aliceblue;\r\n}\r\n\r\nth, td {\r\n    padding: 0 4px;\r\n    border: 1px solid black;\r\n    text-align: center;\r\n    vertical-align: middle;\r\n}\r\n\r\nth {\r\n    height: 40px;\r\n    position: relative;\r\n    font-size: 22px;\r\n    background-color: var(--color-bg-main-1);\r\n    border: none;\r\n}\r\n\r\ntr {\r\n    height: 25px;\r\n    background-color: var(--color-bg-main-1);\r\n}\r\n\r\nth.sorted {\r\n    padding: 0 24px 0 4px;\r\n}\r\n\r\ntr:nth-child(even) {\r\n    background-color: #e9f5ff;\r\n}\r\n\r\nimg.sort-icon {\r\n    width: 16px;\r\n    height: auto;\r\n    position: absolute;\r\n    right: 15px;\r\n    top: 12px;\r\n}\r\n\r\n.stat-buttons-wrapper {\r\n    width: 100%;\r\n    display: flex;\r\n    justify-content: space-around;\r\n    flex-wrap: wrap;\r\n}\r\n\r\n.stat-button {\r\n    width: 300px;\r\n    height: 70px;\r\n    margin: 20px 0;\r\n    padding: 15px;\r\n    border-radius: 50px;\r\n    color: azure;\r\n    text-align: center;\r\n}\r\n\r\n.button.train-diff {\r\n    background-color: #07a060;\r\n    background-image: url(\"../img/app/watercolor-green-line-01.png\");\r\n    background-size: 100% 100%;\r\n    text-shadow: 3px 3px 3px #07a060;\r\n}\r\n\r\n.button.reset-stat {\r\n    background-color: #bd2d2d;\r\n    background-image: url(\"../img/app/watercolor-red-line-01.png\");\r\n    background-size: 100% 100%;\r\n    text-shadow: 3px 3px 3px #bd2d2d;\r\n}\r\n\r\n.nothing-diff {\r\n    width: 60%;\r\n    margin-top: 30px;\r\n    display: flex;\r\n    flex-direction: column-reverse;\r\n    align-items: center;\r\n    justify-content: center;\r\n}\r\n\r\n.nothing-diff .graphic {\r\n    width: 60%;\r\n}\r\n\r\n.nothing-diff p {\r\n    color: #2a641a;\r\n    font-size: 4vw;\r\n    margin-bottom: 15px;\r\n    text-shadow: 2px 5px 5px #e4ebb5;\r\n}\r\n\r\n.disabled:hover {\r\n    cursor:auto;\r\n}\r\n\r\n/* --- Animation --- */\r\n\r\n@keyframes flip-card {\r\n    0% {}\r\n    50% {transform: rotateY(89deg)}\r\n}\r\n\r\n@keyframes unflip-card {\r\n    0% {}\r\n    50% {transform: rotateY(89deg)}\r\n}\r\n\r\n@keyframes rotation {\r\n    0% {}\r\n    100% {transform: rotate(360deg)}\r\n}\r\n\r\n/* --- RESPONSIVE LAYOUTS --- */\r\n\r\n@media (max-width: 1439px) {\r\n    .container-centered {\r\n        min-width: calc(1440vw*100/1440 - 20px);\r\n    }\r\n\r\n    header.main-page {\r\n        margin-top:  calc(380vw*100/1440);\r\n    }\r\n\r\n    header .graphic {\r\n        top: calc(-370vw*100/1440 + 5px);\r\n    }\r\n}\r\n\r\n@media (max-width: 999px) {\r\n\r\n    img.sort-icon {\r\n        right: 5px;\r\n    }\r\n\r\n    .nothing-diff {\r\n        width: 100%;\r\n    }\r\n\r\n    .nothing-diff p {\r\n        font-size: 36px;\r\n    }\r\n}\r\n\r\n@media (max-width: 559px) {\r\n    .main-controls {\r\n        width: 100vw;\r\n        border-radius: 0;\r\n    }\r\n\r\n    .game-controls {\r\n        justify-content: center;\r\n        box-shadow: 0px -15px 30px #7ed3ff;\r\n    }\r\n\r\n    .game-button {\r\n        width: 70px;\r\n        height: 70px;\r\n    }\r\n\r\n    .game-progress {\r\n        justify-content: flex-start;\r\n        margin: 0 0 0 10px;\r\n    }\r\n\r\n    .game-score {\r\n        margin: 0 0 0 10px;\r\n    }\r\n\r\n    h1 {\r\n        max-width: 75px;\r\n        font-size: 24px;\r\n    }\r\n\r\n    h2.topic-name {\r\n        font-size: 32px;\r\n        margin: 10px 0;\r\n    }\r\n\r\n    .card-main-page {\r\n        width: 230px;\r\n        height: 220px;\r\n        margin: 10px 0;\r\n    }\r\n\r\n    .card-main-page p {\r\n        font-size: 28px;\r\n    }\r\n\r\n    .stat-buttons-wrapper {\r\n        width: 78%;\r\n    }\r\n\r\n    .stat-button {\r\n        width: 190px;\r\n        height: 52px;\r\n        font-size: 21px;\r\n        margin: 5px 0;\r\n    }\r\n\r\n    main.container-centered {\r\n        width: 100vw;\r\n    }\r\n\r\n    .stat-container {\r\n        width: 100%;\r\n    }\r\n\r\n    .table-wrapper {\r\n        width: 72%;\r\n    }\r\n}\r\n\r\n@media (max-height: 930px) {\r\n    nav {\r\n        background-size: 450px auto, 0 auto;\r\n    }\r\n}\r\n\r\n@media (max-height: 970px) {\r\n    .menu-list {\r\n        margin-top: 235px;\r\n    }\r\n}\r\n"],"sourceRoot":""}]);
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

module.exports = __webpack_require__.p + "4563e8339c5d03d04954.png";

/***/ }),

/***/ "./assets/img/app/watercolor-button-repeat-02.png":
/*!********************************************************!*\
  !*** ./assets/img/app/watercolor-button-repeat-02.png ***!
  \********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "0c107bd8f1590bfed8ad.png";

/***/ }),

/***/ "./assets/img/app/watercolor-button-start-01.png":
/*!*******************************************************!*\
  !*** ./assets/img/app/watercolor-button-start-01.png ***!
  \*******************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "ca8b3eb9068543282ec5.png";

/***/ }),

/***/ "./assets/img/app/watercolor-flip-button-01.png":
/*!******************************************************!*\
  !*** ./assets/img/app/watercolor-flip-button-01.png ***!
  \******************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "7ebb5fc7014c004bafdd.png";

/***/ }),

/***/ "./assets/img/app/watercolor-green-line-01.png":
/*!*****************************************************!*\
  !*** ./assets/img/app/watercolor-green-line-01.png ***!
  \*****************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "1992d9531320c83f35f3.png";

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

/***/ "./assets/img/app/watercolor-red-line-01.png":
/*!***************************************************!*\
  !*** ./assets/img/app/watercolor-red-line-01.png ***!
  \***************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "8b7dda106394ee43aff0.png";

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguMjBmYmY3NDM0YmUyYWQxNzNmZmEuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDaUM7QUFDUTtBQUNKO0FBQ0c7QUFDSjtBQUNwQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9CQUFvQiw2Q0FBVztBQUMvQjtBQUNBO0FBQ0E7QUFDQTtBQUNBLHlCQUF5QiwrQ0FBYTtBQUN0QztBQUNBO0FBQ0E7QUFDQTtBQUNBLDJCQUEyQixvREFBVztBQUN0QztBQUNBO0FBQ0EsdUJBQXVCLGdEQUFnQjtBQUN2QztBQUNBO0FBQ0Esb0JBQW9CLGtEQUFTO0FBQzdCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0RBQWdELGlCQUFpQjtBQUNqRTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxzREFBc0QseUJBQXlCO0FBQy9FO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpRUFBZSxVQUFVLEVBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7QUM1RjFCO0FBQ29EO0FBQ3BEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFFQUFxRSxjQUFjLGlCQUFpQixpQkFBaUI7QUFDckg7QUFDQSwrQ0FBK0MsaUJBQWlCO0FBQ2hFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFFQUFxRSxjQUFjLFNBQVMsYUFBYTtBQUN6RztBQUNBLCtDQUErQyxhQUFhO0FBQzVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBVTtBQUNWO0FBQ0E7QUFDQTtBQUNBLHFFQUFxRSxjQUFjLFNBQVMsYUFBYTtBQUN6RztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUJBQW1CLGlFQUFtQjtBQUN0QztBQUNBO0FBQ0E7QUFDQTtBQUNBLGlFQUFlLElBQUksRUFBQzs7Ozs7Ozs7Ozs7Ozs7O0FDNURwQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSxpRUFBZSxLQUFLLEVBQUM7Ozs7Ozs7Ozs7Ozs7OztBQ2phckI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFRO0FBQ1I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQVE7QUFDUjtBQUNBO0FBQ0E7QUFDQSxRQUFRO0FBQ1I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQVE7QUFDUjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpRUFBZSxvQkFBb0IsRUFBQzs7Ozs7Ozs7Ozs7Ozs7OztBQzNIcEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDNkM7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDaEI3QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQzBCO0FBQzBCO0FBQ3BEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FB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QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDBCQUEwQiwwREFBWTtBQUN0QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx5Q0FBeUMsNkNBQUk7QUFDN0M7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx5Q0FBeUMsNkNBQUk7QUFDN0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpRUFBZSxXQUFXLEVBQUM7Ozs7Ozs7Ozs7Ozs7OztBQzlMM0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtB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QVUsWUFBWSxPQUFPLEtBQUssWUFBWSxPQUFPLEtBQUssVUFBVSxZQUFZLFdBQVcsTUFBTSxLQUFLLFVBQVUsWUFBWSxXQUFXLFlBQVksYUFBYSxhQUFhLGFBQWEsYUFBYSxhQUFhLGFBQWEsYUFBYSxXQUFXLE1BQU0sS0FBSyxVQUFVLFlBQVksYUFBYSxXQUFXLFVBQVUsWUFBWSxhQUFhLGFBQWEsYUFBYSxhQUFhLGFBQWEsYUFBYSxhQUFhLGFBQWEsT0FBTyxLQUFLLFlBQVksYUFBYSxhQUFhLE9BQU8sS0FBSyxVQUFVLE9BQU8sS0FBSyxVQUFVLFVBQVUsVUFBVSxZQUFZLGFBQWEsYUFBYSxPQUFPLEtBQUssWUFBWSxPQUFPLEtBQUssWUFBWSxXQUFXLFVBQVUsVUFBVSxVQUFVLFlBQVksYUFBYSxjQUFjLE9BQU8sS0FBSyxVQUFVLFlBQVksV0FBVyxZQUFZLGFBQWEsYUFBYSxhQUFhLE9BQU8sS0FBSyxZQUFZLE9BQU8sS0FBSyxZQUFZLFdBQVcsVUFBVSxVQUFVLFlBQVksT0FBTyxLQUFLLFVBQVUsVUFBVSxZQUFZLFdBQVcsWUFBWSxhQUFhLFdBQVcsWUFBWSxhQUFhLE9BQU8sS0FBSyxVQUFVLE1BQU0sS0FBSyxVQUFVLFVBQVUsVUFBVSxVQUFVLFlBQVksV0FBVyxPQUFPLEtBQUssVUFBVSxVQUFVLFlBQVksYUFBYSxhQUFhLGFBQWEsT0FBTyxLQUFLLFlBQVksYUFBYSxPQUFPLEtBQUssWUFBWSxhQUFhLE9BQU8sS0FBSyxZQUFZLGFBQWEsYUFBYSxhQUFhLE9BQU8sS0FBSyxZQUFZLE9BQU8sS0FBSyxVQUFVLFVBQVUsWUFBWSxhQUFhLE9BQU8sS0FBSyxVQUFVLFVBQVUsWUFBWSxXQUFXLFlBQVksYUFBYSxhQUFhLGFBQWEsYUFBYSxPQUFPLEtBQUssVUFBVSxNQUFNLEtBQUssWUFBWSxPQUFPLEtBQUssVUFBVSxPQUFPLEtBQUssVUFBVSxPQUFPLEtBQUssVUFBVSxVQUFVLFVBQVUsVUFBVSxVQUFVLFlBQVksYUFBYSxXQUFXLFlBQVksYUFBYSxhQUFhLGFBQWEsYUFBYSxhQUFhLGFBQWEsT0FBTyxLQUFLLFVBQVUsWUFBWSxPQUFPLEtBQUssVUFBVSxZQUFZLE9BQU8sS0FBSyxVQUFVLFlBQVksV0FBVyxZQUFZLE9BQU8sS0FBSyxZQUFZLGFBQWEsYUFBYSxXQUFXLE9BQU8sS0FBSyxZQUFZLGFBQWEsT0FBTyxLQUFLLFlBQVksYUFBYSxhQUFhLFdBQVcsVUFBVSxPQUFPLEtBQUssWUFBWSxhQUFhLE9BQU8sS0FBSyxVQUFVLFVBQVUsVUFBVSxZQUFZLGFBQWEsT0FBTyxLQUFLLFVBQVUsVUFBVSxPQUFPLEtBQUssVUFBVSxZQUFZLGFBQWEsV0FBVyxVQUFVLFVBQVUsT0FBTyxLQUFLLFVBQVUsWUFBWSxPQUFPLEtBQUssVUFBVSxVQUFVLFlBQVksV0FBVyxZQUFZLGFBQWEsYUFBYSxhQUFhLGFBQWEsT0FBTyxLQUFLLFVBQVUsVUFBVSxPQUFPLEtBQUssWUFBWSxPQUFPLEtBQUssVUFBVSxVQUFVLFlBQVksT0FBTyxLQUFLLFlBQVksYUFBYSxPQUFPLEtBQUssWUFBWSxPQUFPLEtBQUssWUFBWSxPQUFPLEtBQUssWUFBWSxPQUFPLEtBQUssWUFBWSxPQUFPLEtBQUssWUFBWSxPQUFPLEtBQUssWUFBWSxPQUFPLEtBQUssWUFBWSxPQUFPLEtBQUssWUFBWSxPQUFPLEtBQUssWUFBWSxXQUFXLFlBQVksT0FBTyxLQUFLLFlBQVksV0FBVyxZQUFZLFdBQVcsT0FBTyxLQUFLLFVBQVUsVUFBVSxZQUFZLFdBQVcsVUFBVSxZQUFZLGFBQWEsYUFBYSxPQUFPLEtBQUssWUFBWSxhQUFhLGFBQWEsYUFBYSxPQUFPLEtBQUssWUFBWSxhQUFhLE9BQU8sS0FBSyxZQUFZLGFBQWEsT0FBTyxLQUFLLFVBQVUsWUFBWSxXQUFXLFVBQVUsWUFBWSxhQUFhLFdBQVcsT0FBTyxLQUFLLFVBQVUsVUFBVSxZQUFZLE9BQU8sS0FBSyxVQUFVLFVBQVUsWUFBWSxhQUFhLGFBQWEsV0FBVyxPQUFPLEtBQUssVUFBVSxZQUFZLGFBQWEsT0FBTyxLQUFLLFVBQVUsWUFBWSxjQUFjLE9BQU8sS0FBSyxZQUFZLE9BQU8sS0FBSyxVQUFVLFlBQVksYUFBYSxhQUFhLE9BQU8sS0FBSyxVQUFVLFlBQVksV0FBVyxZQUFZLFdBQVcsT0FBTyxLQUFLLFVBQVUsWUFBWSxPQUFPLEtBQUssWUFBWSxPQUFPLEtBQUssWUFBWSxPQUFPLEtBQUssVUFBVSxVQUFVLFlBQVksV0FBVyxVQUFVLE1BQU0sS0FBSyxVQUFVLFVBQVUsWUFBWSxXQUFXLE9BQU8sS0FBSyxVQUFVLFVBQVUsVUFBVSxVQUFVLFlBQVksV0FBVyxZQUFZLE9BQU8sS0FBSyxZQUFZLGFBQWEsYUFBYSxhQUFhLE9BQU8sS0FBSyxZQUFZLGFBQWEsYUFBYSxhQUFhLE9BQU8sS0FBSyxVQUFVLFlBQVksV0FBVyxZQUFZLGFBQWEsYUFBYSxPQUFPLEtBQUssVUFBVSxNQUFNLEtBQUssVUFBVSxVQUFVLFlBQVksYUFBYSxPQUFPLEtBQUssVUFBVSxNQUFNLGFBQWEsTUFBTSxVQUFVLGlCQUFpQixPQUFPLEtBQUssVUFBVSxpQkFBaUIsT0FBTyxLQUFLLFVBQVUsaUJBQWlCLE9BQU8sYUFBYSxNQUFNLEtBQUssWUFBWSxPQUFPLEtBQUssWUFBWSxPQUFPLEtBQUssWUFBWSxNQUFNLE1BQU0sTUFBTSxLQUFLLFVBQVUsTUFBTSxLQUFLLFVBQVUsTUFBTSxLQUFLLFVBQVUsTUFBTSxNQUFNLEtBQUssS0FBSyxVQUFVLFlBQVksT0FBTyxLQUFLLFlBQVksYUFBYSxPQUFPLEtBQUssVUFBVSxVQUFVLE9BQU8sS0FBSyxZQUFZLGFBQWEsT0FBTyxLQUFLLFlBQVksT0FBTyxLQUFLLFVBQVUsVUFBVSxPQUFPLEtBQUssVUFBVSxVQUFVLE9BQU8sS0FBSyxVQUFVLFVBQVUsVUFBVSxPQUFPLEtBQUssVUFBVSxPQUFPLEtBQUssVUFBVSxNQUFNLEtBQUssVUFBVSxVQUFVLFVBQVUsVUFBVSxPQUFPLEtBQUssVUFBVSxPQUFPLEtBQUssVUFBVSxNQUFNLEtBQUssVUFBVSxLQUFLLE1BQU0sS0FBSyxLQUFLLFlBQVksTUFBTSxNQUFNLEtBQUssS0FBSyxZQUFZLE1BQU0sZ0ZBQWdG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QUFuQjtBQUVBSyxRQUFRLENBQUNDLGFBQVQsQ0FBdUIsTUFBdkIsRUFBK0JDLGdCQUEvQixDQUFnRCxPQUFoRCxFQUF5RCxVQUFDQyxLQUFEO0VBQUEsT0FBV1QsMkVBQW9CLENBQUNTLEtBQUQsRUFBUUosVUFBUixDQUEvQjtBQUFBLENBQXpELEUiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9lbmdsaXNoX2Zvcl9raWRzLy4vYXNzZXRzL2pzL2FwcENvbnRyb2wuanMiLCJ3ZWJwYWNrOi8vZW5nbGlzaF9mb3Jfa2lkcy8uL2Fzc2V0cy9qcy9jYXJkLmpzIiwid2VicGFjazovL2VuZ2xpc2hfZm9yX2tpZHMvLi9hc3NldHMvanMvY2FyZHMuanMiLCJ3ZWJwYWNrOi8vZW5nbGlzaF9mb3Jfa2lkcy8uL2Fzc2V0cy9qcy9jbGlja1VzZXJJbnRlcmFjdGl2ZS5qcyIsIndlYnBhY2s6Ly9lbmdsaXNoX2Zvcl9raWRzLy4vYXNzZXRzL2pzL2NvbW1vbkZ1bmN0LmpzIiwid2VicGFjazovL2VuZ2xpc2hfZm9yX2tpZHMvLi9hc3NldHMvanMvY29udGVudC5qcyIsIndlYnBhY2s6Ly9lbmdsaXNoX2Zvcl9raWRzLy4vYXNzZXRzL2pzL2dhbWVDb250cm9sLmpzIiwid2VicGFjazovL2VuZ2xpc2hfZm9yX2tpZHMvLi9hc3NldHMvanMvbWFpbkNhcmRzLmpzIiwid2VicGFjazovL2VuZ2xpc2hfZm9yX2tpZHMvLi9hc3NldHMvanMvbWVudS5qcyIsIndlYnBhY2s6Ly9lbmdsaXNoX2Zvcl9raWRzLy4vYXNzZXRzL2pzL3N0YXIuanMiLCJ3ZWJwYWNrOi8vZW5nbGlzaF9mb3Jfa2lkcy8uL2Fzc2V0cy9qcy9zdGF0U3RvcmFnZS5qcyIsIndlYnBhY2s6Ly9lbmdsaXNoX2Zvcl9raWRzLy4vYXNzZXRzL2pzL3N0YXRpc3RpYy5qcyIsIndlYnBhY2s6Ly9lbmdsaXNoX2Zvcl9raWRzLy4vYXNzZXRzL2pzL3N3aXRjaC5qcyIsIndlYnBhY2s6Ly9lbmdsaXNoX2Zvcl9raWRzLy4vYXNzZXRzL3N0eWxlcy9ub3JtYWxpemUuY3NzIiwid2VicGFjazovL2VuZ2xpc2hfZm9yX2tpZHMvLi9hc3NldHMvc3R5bGVzL3Jlc2V0LmNzcyIsIndlYnBhY2s6Ly9lbmdsaXNoX2Zvcl9raWRzLy4vYXNzZXRzL3N0eWxlcy9zdHlsZS5jc3MiLCJ3ZWJwYWNrOi8vZW5nbGlzaF9mb3Jfa2lkcy8uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9hcGkuanMiLCJ3ZWJwYWNrOi8vZW5nbGlzaF9mb3Jfa2lkcy8uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9nZXRVcmwuanMiLCJ3ZWJwYWNrOi8vZW5nbGlzaF9mb3Jfa2lkcy8uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9zb3VyY2VNYXBzLmpzIiwid2VicGFjazovL2VuZ2xpc2hfZm9yX2tpZHMvLi9hc3NldHMvc3R5bGVzL25vcm1hbGl6ZS5jc3M/MzhlZSIsIndlYnBhY2s6Ly9lbmdsaXNoX2Zvcl9raWRzLy4vYXNzZXRzL3N0eWxlcy9yZXNldC5jc3M/OWI3YSIsIndlYnBhY2s6Ly9lbmdsaXNoX2Zvcl9raWRzLy4vYXNzZXRzL3N0eWxlcy9zdHlsZS5jc3M/OWJiZSIsIndlYnBhY2s6Ly9lbmdsaXNoX2Zvcl9raWRzLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5qZWN0U3R5bGVzSW50b1N0eWxlVGFnLmpzIiwid2VicGFjazovL2VuZ2xpc2hfZm9yX2tpZHMvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRCeVNlbGVjdG9yLmpzIiwid2VicGFjazovL2VuZ2xpc2hfZm9yX2tpZHMvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRTdHlsZUVsZW1lbnQuanMiLCJ3ZWJwYWNrOi8vZW5nbGlzaF9mb3Jfa2lkcy8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3NldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlcy5qcyIsIndlYnBhY2s6Ly9lbmdsaXNoX2Zvcl9raWRzLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVEb21BUEkuanMiLCJ3ZWJwYWNrOi8vZW5nbGlzaF9mb3Jfa2lkcy8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlVGFnVHJhbnNmb3JtLmpzIiwid2VicGFjazovL2VuZ2xpc2hfZm9yX2tpZHMvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vZW5nbGlzaF9mb3Jfa2lkcy93ZWJwYWNrL3J1bnRpbWUvY29tcGF0IGdldCBkZWZhdWx0IGV4cG9ydCIsIndlYnBhY2s6Ly9lbmdsaXNoX2Zvcl9raWRzL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9lbmdsaXNoX2Zvcl9raWRzL3dlYnBhY2svcnVudGltZS9nbG9iYWwiLCJ3ZWJwYWNrOi8vZW5nbGlzaF9mb3Jfa2lkcy93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL2VuZ2xpc2hfZm9yX2tpZHMvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9lbmdsaXNoX2Zvcl9raWRzL3dlYnBhY2svcnVudGltZS9wdWJsaWNQYXRoIiwid2VicGFjazovL2VuZ2xpc2hfZm9yX2tpZHMvd2VicGFjay9ydW50aW1lL2pzb25wIGNodW5rIGxvYWRpbmciLCJ3ZWJwYWNrOi8vZW5nbGlzaF9mb3Jfa2lkcy93ZWJwYWNrL3J1bnRpbWUvbm9uY2UiLCJ3ZWJwYWNrOi8vZW5nbGlzaF9mb3Jfa2lkcy8uL3NyYy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIvKiBlc2xpbnQtZGlzYWJsZSBsaW5lYnJlYWstc3R5bGUgKi9cclxuLyogZXNsaW50LWRpc2FibGUgbm8tY29uc29sZSAqL1xyXG4vKiBlc2xpbnQtZGlzYWJsZSBsaW5lYnJlYWstc3R5bGUgKi9cclxuLyogZXNsaW50LWRpc2FibGUgbm8tdW5kZWYgKi9cclxuXHJcbmltcG9ydCBNZW51RWxlbWVudCBmcm9tICcuL21lbnUnO1xyXG5pbXBvcnQgQ29udGVudENvbnRhaW5lciBmcm9tICcuL2NvbnRlbnQnO1xyXG5pbXBvcnQgU3dpdGNoRWxlbWVudCBmcm9tICcuL3N3aXRjaCc7XHJcbmltcG9ydCBHYW1lQ29udHJvbCBmcm9tICcuL2dhbWVDb250cm9sJztcclxuaW1wb3J0IFN0YXRpc3RpYyBmcm9tICcuL3N0YXRpc3RpYyc7XHJcblxyXG5jbGFzcyBBcHBDb250cm9sIHtcclxuICBjb25zdHJ1Y3Rvcih0b3BpY3NBcnIsIGNhcmRzQXJyLCBtYWluQ2FyZHMpIHtcclxuICAgIHRoaXMudG9waWNzQXJyID0gdG9waWNzQXJyO1xyXG4gICAgdGhpcy5jYXJkc0FyciA9IGNhcmRzQXJyO1xyXG4gICAgdGhpcy5tYWluQ2FyZHMgPSBtYWluQ2FyZHM7XHJcblxyXG4gICAgdGhpcy5tZW51ID0gbmV3IE1lbnVFbGVtZW50KHRoaXMudG9waWNzQXJyKVxyXG4gICAgICAuYWRkVG9Eb2MoKTtcclxuXHJcbiAgICB0aGlzLmFjdGl2ZVBhZ2UgPSB0aGlzLm1lbnUuYWN0aXZlUGFnZTtcclxuXHJcbiAgICB0aGlzLnN3aXRjaE9iaiA9IG5ldyBTd2l0Y2hFbGVtZW50KClcclxuICAgICAgLmFkZFRvRG9jKCk7XHJcblxyXG4gICAgdGhpcy5hY3RpdmVNb2RlID0gdGhpcy5zd2l0Y2hPYmouYWN0aXZlTW9kZTtcclxuXHJcbiAgICB0aGlzLmdhbWVDb250cm9sID0gbmV3IEdhbWVDb250cm9sKHRoaXMpXHJcbiAgICAgIC5hZGRUb0RvYygpO1xyXG5cclxuICAgIHRoaXMuY29udGVudCA9IG5ldyBDb250ZW50Q29udGFpbmVyKHRoaXMpXHJcbiAgICAgIC5hZGRUb0RvYygpO1xyXG5cclxuICAgIHRoaXMuc3RhdCA9IG5ldyBTdGF0aXN0aWModGhpcyk7XHJcbiAgfVxyXG5cclxuICBnZXQgYWN0aXZlUGFnZSgpIHtcclxuICAgIHJldHVybiB0aGlzLm1lbnUuYWN0aXZlUGFnZTtcclxuICB9XHJcblxyXG4gIHNldCBhY3RpdmVQYWdlKHZhbHVlKSB7XHJcbiAgICB0aGlzLm1lbnUuYWN0aXZlUGFnZSA9IHZhbHVlO1xyXG4gIH1cclxuXHJcbiAgZ2V0IGFjdGl2ZU1vZGUoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5zd2l0Y2hPYmouYWN0aXZlTW9kZTtcclxuICB9XHJcblxyXG4gIHNldCBhY3RpdmVNb2RlKHZhbHVlKSB7XHJcbiAgICB0aGlzLnN3aXRjaE9iai5hY3RpdmVNb2RlID0gdmFsdWU7XHJcbiAgfVxyXG5cclxuICBnZXQgYWN0aXZlQXJyQ2FyZHNPYmooKSB7XHJcbiAgICBjb25zdCBpID0gdGhpcy50b3BpY3NBcnIuZmluZEluZGV4KChpdGVtKSA9PiBpdGVtLnRvTG93ZXJDYXNlKCkgPT09IHRoaXMuYWN0aXZlUGFnZSk7XHJcbiAgICByZXR1cm4gdGhpcy5jYXJkc0FycltpXTtcclxuICB9XHJcblxyXG4gIHNldCBhY3RpdmVBcnJDYXJkc09iaihhcnJDYXJkc09iaikge1xyXG4gICAgdGhpcy5hY3RpdmVBcnJDYXJkc09iaiA9IGFyckNhcmRzT2JqO1xyXG4gIH1cclxuXHJcbiAgY2hhbmdlUGFnZShwYWdlTmFtZSkge1xyXG4gICAgdGhpcy5tZW51LnNldEFjdGl2ZVRvcGljKHBhZ2VOYW1lKTtcclxuICAgIHRoaXMuY29udGVudC5jaGFuZ2VDb250ZW50KHBhZ2VOYW1lKTtcclxuICAgIGlmICh0aGlzLmFjdGl2ZU1vZGUgPT09ICdwbGF5JyAmJiAodGhpcy5jb250ZW50LmdldFZhbGlkVG9waWNUeXBlKHRoaXMuYWN0aXZlUGFnZSkgPT09ICd0b3BpYycpKSB7XHJcbiAgICAgIHRoaXMuZ2FtZUNvbnRyb2wuc2hvdygpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5nYW1lQ29udHJvbC5oaWRlKCk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gdGhpcztcclxuICB9XHJcblxyXG4gIHBsYXlDYXJkU291bmQoY2FyZE9iaikge1xyXG4gICAgY29uc3QgYXVkaW9FbGVtZW50ID0gbmV3IEF1ZGlvKGAuLi9hc3NldHMvJHtjYXJkT2JqLmF1ZGlvU3JjfWApO1xyXG4gICAgYXVkaW9FbGVtZW50LnBsYXkoKTtcclxuICAgIHJldHVybiB0aGlzO1xyXG4gIH1cclxuXHJcbiAgcGxheUFwcFNvdW5kKHNvdW5kTmFtZSkge1xyXG4gICAgY29uc3Qgc291bmRzTGlicmFyeSA9IHtcclxuICAgICAgY29ycmVjdDogJ2FwcC9jb3JyZWN0Lm1wMycsXHJcbiAgICAgIHdyb25nOiAnYXBwL2Vycm9yLm1wMycsXHJcbiAgICAgIHN1Y2Nlc3M6ICdhcHAvc3VjY2Vzcy5tcDMnLFxyXG4gICAgICBmYWlsdXJlOiAnYXBwL2ZhaWx1cmUubXAzJyxcclxuICAgIH07XHJcblxyXG4gICAgY29uc3QgYXVkaW9FbGVtZW50ID0gbmV3IEF1ZGlvKGAuLi9hc3NldHMvYXVkaW8vJHtzb3VuZHNMaWJyYXJ5W3NvdW5kTmFtZV19YCk7XHJcbiAgICBhdWRpb0VsZW1lbnQucGxheSgpO1xyXG4gICAgcmV0dXJuIHRoaXM7XHJcbiAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBBcHBDb250cm9sO1xyXG4iLCIvKiBlc2xpbnQtZGlzYWJsZSBsaW5lYnJlYWstc3R5bGUgKi9cclxuaW1wb3J0IHsgY3JlYXRlQ3VzdG9tRWxlbWVudCB9IGZyb20gJy4vY29tbW9uRnVuY3QnO1xyXG5cclxuY2xhc3MgQ2FyZCB7XHJcbiAgY29uc3RydWN0b3IoYXBwQ3RybE9iaiwgY2FyZE9iaiwgdHlwZSA9ICdtYWluIHBhZ2UnKSB7XHJcbiAgICB0aGlzLmFwcEN0cmxPYmogPSBhcHBDdHJsT2JqO1xyXG4gICAgdGhpcy50eXBlID0gdHlwZTtcclxuICAgIHRoaXMudmFsaWRUeXBlcyA9IFsnbWFpbiBwYWdlJywgJ3RvcGljJ107XHJcbiAgICB0aGlzLmVsZW1lbnQgPSBudWxsO1xyXG4gICAgdGhpcy5idWlsZChjYXJkT2JqKTtcclxuICB9XHJcblxyXG4gIGJ1aWxkKGNhcmRPYmopIHtcclxuICAgIGxldCB0ZW1wbGF0ZTtcclxuICAgIGxldCBjbGFzc05hbWVzID0gJ2NhcmQgYnV0dG9uJztcclxuICAgIHN3aXRjaCAodGhpcy50eXBlKSB7XHJcbiAgICAgIGNhc2UgJ21haW4gcGFnZSc6XHJcbiAgICAgICAgdGVtcGxhdGUgPSBgXHJcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImNhcmQtY29udGVudFwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiZ3JhcGhpYyBjYXJkLWdyYXBoaWNcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxpbWcgY2xhc3M9XCJjYXJkLWltYWdlXCIgc3JjPVwiLi4vYXNzZXRzLyR7Y2FyZE9iai5pbWFnZX1cIiBhbHQ9XCJTZWN0aW9uICR7Y2FyZE9iai5jYXJkTmFtZX1cIiB3aWR0aD1cIjM5MFwiIGhlaWdodD1cIjI2MFwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPHAgY2xhc3M9XCJjYXJkLXRleHRcIj4ke2NhcmRPYmouY2FyZE5hbWV9PC9wPlxyXG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICBgO1xyXG4gICAgICAgIGNsYXNzTmFtZXMgKz0gJyBjYXJkLW1haW4tcGFnZSc7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIGNhc2UgJ3RvcGljJzpcclxuICAgICAgICBpZiAodGhpcy5hcHBDdHJsT2JqLmFjdGl2ZU1vZGUgPT09ICd0cmFpbicpIHtcclxuICAgICAgICAgIHRlbXBsYXRlID0gYFxyXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJjYXJkLWNvbnRlbnRcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImdyYXBoaWMgY2FyZC1ncmFwaGljXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aW1nIGNsYXNzPVwiY2FyZC1pbWFnZVwiIHNyYz1cIi4uL2Fzc2V0cy8ke2NhcmRPYmouaW1hZ2V9XCIgYWx0PVwiJHtjYXJkT2JqLndvcmR9XCIgd2lkdGg9XCIzOTBcIiBoZWlnaHQ9XCIyNjBcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxwIGNsYXNzPVwiY2FyZC10ZXh0XCI+JHtjYXJkT2JqLndvcmR9PC9wPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiYnV0dG9uIGNhcmQtZmxpcC1idXR0b25cIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgYDtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgdGVtcGxhdGUgPSBgXHJcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImNhcmQtY29udGVudFwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiZ3JhcGhpYyBjYXJkLWdyYXBoaWNcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxpbWcgY2xhc3M9XCJjYXJkLWltYWdlXCIgc3JjPVwiLi4vYXNzZXRzLyR7Y2FyZE9iai5pbWFnZX1cIiBhbHQ9XCIke2NhcmRPYmoud29yZH1cIiB3aWR0aD1cIjM5MFwiIGhlaWdodD1cIjI2MFwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICBgO1xyXG4gICAgICAgICAgY2xhc3NOYW1lcyArPSAnIGdhbWUtY2FyZCc7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNsYXNzTmFtZXMgKz0gJyBjYXJkLXRvcGljJztcclxuICAgICAgICBicmVhaztcclxuICAgICAgZGVmYXVsdDpcclxuICAgICAgICBicmVhaztcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLmVsZW1lbnQgPSBjcmVhdGVDdXN0b21FbGVtZW50KCdkaXYnLCBjbGFzc05hbWVzLCB0ZW1wbGF0ZSk7XHJcbiAgICByZXR1cm4gdGhpcztcclxuICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IENhcmQ7XHJcbiIsIi8qIGVzbGludC1kaXNhYmxlIGxpbmVicmVhay1zdHlsZSAqL1xyXG5jb25zdCBjYXJkcyA9IFtcclxuICBbJ0FjdGlvbiAoc2V0IEEpJywgJ0FjdGlvbiAoc2V0IEIpJywgJ0FuaW1hbCAoc2V0IEEpJywgJ0FuaW1hbCAoc2V0IEIpJywgJ0Nsb3RoZXMnLCAnRW1vdGlvbnMnLCAnRm9vZCcsICdHZW9ncmFwaHknXSxcclxuICBbXHJcbiAgICB7XHJcbiAgICAgIHdvcmQ6ICdjcnknLFxyXG4gICAgICB0cmFuc2xhdGlvbjogJ9C/0LvQsNC60LDRgtGMJyxcclxuICAgICAgaW1hZ2U6ICdpbWcvY3J5LmpwZycsXHJcbiAgICAgIGF1ZGlvU3JjOiAnYXVkaW8vY3J5Lm1wMycsXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICB3b3JkOiAnZGFuY2UnLFxyXG4gICAgICB0cmFuc2xhdGlvbjogJ9GC0LDQvdGG0LXQstCw0YLRjCcsXHJcbiAgICAgIGltYWdlOiAnaW1nL2RhbmNlLmpwZycsXHJcbiAgICAgIGF1ZGlvU3JjOiAnYXVkaW8vZGFuY2UubXAzJyxcclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgIHdvcmQ6ICdkaXZlJyxcclxuICAgICAgdHJhbnNsYXRpb246ICfQvdGL0YDRj9GC0YwnLFxyXG4gICAgICBpbWFnZTogJ2ltZy9kaXZlLmpwZycsXHJcbiAgICAgIGF1ZGlvU3JjOiAnYXVkaW8vZGl2ZS5tcDMnLFxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgd29yZDogJ2RyYXcnLFxyXG4gICAgICB0cmFuc2xhdGlvbjogJ9GA0LjRgdC+0LLQsNGC0YwnLFxyXG4gICAgICBpbWFnZTogJ2ltZy9kcmF3LmpwZycsXHJcbiAgICAgIGF1ZGlvU3JjOiAnYXVkaW8vZHJhdy5tcDMnLFxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgd29yZDogJ2Zpc2gnLFxyXG4gICAgICB0cmFuc2xhdGlvbjogJ9C70L7QstC40YLRjCDRgNGL0LHRgycsXHJcbiAgICAgIGltYWdlOiAnaW1nL2Zpc2guanBnJyxcclxuICAgICAgYXVkaW9TcmM6ICdhdWRpby9maXNoLm1wMycsXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICB3b3JkOiAnZmx5JyxcclxuICAgICAgdHJhbnNsYXRpb246ICfQu9C10YLQsNGC0YwnLFxyXG4gICAgICBpbWFnZTogJ2ltZy9mbHkuanBnJyxcclxuICAgICAgYXVkaW9TcmM6ICdhdWRpby9mbHkubXAzJyxcclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgIHdvcmQ6ICdodWcnLFxyXG4gICAgICB0cmFuc2xhdGlvbjogJ9C+0LHQvdC40LzQsNGC0YwnLFxyXG4gICAgICBpbWFnZTogJ2ltZy9odWcuanBnJyxcclxuICAgICAgYXVkaW9TcmM6ICdhdWRpby9odWcubXAzJyxcclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgIHdvcmQ6ICdqdW1wJyxcclxuICAgICAgdHJhbnNsYXRpb246ICfQv9GA0YvQs9Cw0YLRjCcsXHJcbiAgICAgIGltYWdlOiAnaW1nL2p1bXAuanBnJyxcclxuICAgICAgYXVkaW9TcmM6ICdhdWRpby9qdW1wLm1wMycsXHJcbiAgICB9LFxyXG4gIF0sXHJcbiAgW1xyXG4gICAge1xyXG4gICAgICB3b3JkOiAnb3BlbicsXHJcbiAgICAgIHRyYW5zbGF0aW9uOiAn0L7RgtC60YDRi9Cy0LDRgtGMJyxcclxuICAgICAgaW1hZ2U6ICdpbWcvb3Blbi5qcGcnLFxyXG4gICAgICBhdWRpb1NyYzogJ2F1ZGlvL29wZW4ubXAzJyxcclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgIHdvcmQ6ICdwbGF5JyxcclxuICAgICAgdHJhbnNsYXRpb246ICfQuNCz0YDQsNGC0YwnLFxyXG4gICAgICBpbWFnZTogJ2ltZy9wbGF5LmpwZycsXHJcbiAgICAgIGF1ZGlvU3JjOiAnYXVkaW8vcGxheS5tcDMnLFxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgd29yZDogJ3BvaW50JyxcclxuICAgICAgdHJhbnNsYXRpb246ICfRg9C60LDQt9GL0LLQsNGC0YwnLFxyXG4gICAgICBpbWFnZTogJ2ltZy9wb2ludC5qcGcnLFxyXG4gICAgICBhdWRpb1NyYzogJ2F1ZGlvL3BvaW50Lm1wMycsXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICB3b3JkOiAncmlkZScsXHJcbiAgICAgIHRyYW5zbGF0aW9uOiAn0LXQt9C00LjRgtGMJyxcclxuICAgICAgaW1hZ2U6ICdpbWcvcmlkZS5qcGcnLFxyXG4gICAgICBhdWRpb1NyYzogJ2F1ZGlvL3JpZGUubXAzJyxcclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgIHdvcmQ6ICdydW4nLFxyXG4gICAgICB0cmFuc2xhdGlvbjogJ9Cx0LXQs9Cw0YLRjCcsXHJcbiAgICAgIGltYWdlOiAnaW1nL3J1bi5qcGcnLFxyXG4gICAgICBhdWRpb1NyYzogJ2F1ZGlvL3J1bi5tcDMnLFxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgd29yZDogJ3NpbmcnLFxyXG4gICAgICB0cmFuc2xhdGlvbjogJ9C/0LXRgtGMJyxcclxuICAgICAgaW1hZ2U6ICdpbWcvc2luZy5qcGcnLFxyXG4gICAgICBhdWRpb1NyYzogJ2F1ZGlvL3NpbmcubXAzJyxcclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgIHdvcmQ6ICdza2lwJyxcclxuICAgICAgdHJhbnNsYXRpb246ICfQv9GA0L7Qv9GD0YHQutCw0YLRjCwg0L/RgNGL0LPQsNGC0YwnLFxyXG4gICAgICBpbWFnZTogJ2ltZy9za2lwLmpwZycsXHJcbiAgICAgIGF1ZGlvU3JjOiAnYXVkaW8vc2tpcC5tcDMnLFxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgd29yZDogJ3N3aW0nLFxyXG4gICAgICB0cmFuc2xhdGlvbjogJ9C/0LvQsNCy0LDRgtGMJyxcclxuICAgICAgaW1hZ2U6ICdpbWcvc3dpbS5qcGcnLFxyXG4gICAgICBhdWRpb1NyYzogJ2F1ZGlvL3N3aW0ubXAzJyxcclxuICAgIH0sXHJcbiAgXSxcclxuICBbXHJcbiAgICB7XHJcbiAgICAgIHdvcmQ6ICdjYXQnLFxyXG4gICAgICB0cmFuc2xhdGlvbjogJ9C60L7RgicsXHJcbiAgICAgIGltYWdlOiAnaW1nL2NhdC5qcGcnLFxyXG4gICAgICBhdWRpb1NyYzogJ2F1ZGlvL2NhdC5tcDMnLFxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgd29yZDogJ2NoaWNrJyxcclxuICAgICAgdHJhbnNsYXRpb246ICfRhtGL0L/Qu9GR0L3QvtC6JyxcclxuICAgICAgaW1hZ2U6ICdpbWcvY2hpY2suanBnJyxcclxuICAgICAgYXVkaW9TcmM6ICdhdWRpby9jaGljay5tcDMnLFxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgd29yZDogJ2NoaWNrZW4nLFxyXG4gICAgICB0cmFuc2xhdGlvbjogJ9C60YPRgNC40YbQsCcsXHJcbiAgICAgIGltYWdlOiAnaW1nL2NoaWNrZW4uanBnJyxcclxuICAgICAgYXVkaW9TcmM6ICdhdWRpby9jaGlja2VuLm1wMycsXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICB3b3JkOiAnZG9nJyxcclxuICAgICAgdHJhbnNsYXRpb246ICfRgdC+0LHQsNC60LAnLFxyXG4gICAgICBpbWFnZTogJ2ltZy9kb2cuanBnJyxcclxuICAgICAgYXVkaW9TcmM6ICdhdWRpby9kb2cubXAzJyxcclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgIHdvcmQ6ICdob3JzZScsXHJcbiAgICAgIHRyYW5zbGF0aW9uOiAn0LvQvtGI0LDQtNGMJyxcclxuICAgICAgaW1hZ2U6ICdpbWcvaG9yc2UuanBnJyxcclxuICAgICAgYXVkaW9TcmM6ICdhdWRpby9ob3JzZS5tcDMnLFxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgd29yZDogJ3BpZycsXHJcbiAgICAgIHRyYW5zbGF0aW9uOiAn0YHQstC40L3RjNGPJyxcclxuICAgICAgaW1hZ2U6ICdpbWcvcGlnLmpwZycsXHJcbiAgICAgIGF1ZGlvU3JjOiAnYXVkaW8vcGlnLm1wMycsXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICB3b3JkOiAncmFiYml0JyxcclxuICAgICAgdHJhbnNsYXRpb246ICfQutGA0L7Qu9C40LonLFxyXG4gICAgICBpbWFnZTogJ2ltZy9yYWJiaXQuanBnJyxcclxuICAgICAgYXVkaW9TcmM6ICdhdWRpby9yYWJiaXQubXAzJyxcclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgIHdvcmQ6ICdzaGVlcCcsXHJcbiAgICAgIHRyYW5zbGF0aW9uOiAn0L7QstGG0LAnLFxyXG4gICAgICBpbWFnZTogJ2ltZy9zaGVlcC5qcGcnLFxyXG4gICAgICBhdWRpb1NyYzogJ2F1ZGlvL3NoZWVwLm1wMycsXHJcbiAgICB9LFxyXG4gIF0sXHJcbiAgW1xyXG4gICAge1xyXG4gICAgICB3b3JkOiAnYmlyZCcsXHJcbiAgICAgIHRyYW5zbGF0aW9uOiAn0L/RgtC40YbQsCcsXHJcbiAgICAgIGltYWdlOiAnaW1nL2JpcmQuanBnJyxcclxuICAgICAgYXVkaW9TcmM6ICdhdWRpby9iaXJkLm1wMycsXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICB3b3JkOiAnZmlzaCcsXHJcbiAgICAgIHRyYW5zbGF0aW9uOiAn0YDRi9Cx0LAnLFxyXG4gICAgICBpbWFnZTogJ2ltZy9maXNoMS5qcGcnLFxyXG4gICAgICBhdWRpb1NyYzogJ2F1ZGlvL2Zpc2gubXAzJyxcclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgIHdvcmQ6ICdmcm9nJyxcclxuICAgICAgdHJhbnNsYXRpb246ICfQttCw0LHQsCcsXHJcbiAgICAgIGltYWdlOiAnaW1nL2Zyb2cuanBnJyxcclxuICAgICAgYXVkaW9TcmM6ICdhdWRpby9mcm9nLm1wMycsXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICB3b3JkOiAnZ2lyYWZmZScsXHJcbiAgICAgIHRyYW5zbGF0aW9uOiAn0LbQuNGA0LDRhNCwJyxcclxuICAgICAgaW1hZ2U6ICdpbWcvZ2lyYWZmZS5qcGcnLFxyXG4gICAgICBhdWRpb1NyYzogJ2F1ZGlvL2dpcmFmZmUubXAzJyxcclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgIHdvcmQ6ICdsaW9uJyxcclxuICAgICAgdHJhbnNsYXRpb246ICfQu9C10LInLFxyXG4gICAgICBpbWFnZTogJ2ltZy9saW9uLmpwZycsXHJcbiAgICAgIGF1ZGlvU3JjOiAnYXVkaW8vbGlvbi5tcDMnLFxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgd29yZDogJ21vdXNlJyxcclxuICAgICAgdHJhbnNsYXRpb246ICfQvNGL0YjRjCcsXHJcbiAgICAgIGltYWdlOiAnaW1nL21vdXNlLmpwZycsXHJcbiAgICAgIGF1ZGlvU3JjOiAnYXVkaW8vbW91c2UubXAzJyxcclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgIHdvcmQ6ICd0dXJ0bGUnLFxyXG4gICAgICB0cmFuc2xhdGlvbjogJ9GH0LXRgNC10L/QsNGF0LAnLFxyXG4gICAgICBpbWFnZTogJ2ltZy90dXJ0bGUuanBnJyxcclxuICAgICAgYXVkaW9TcmM6ICdhdWRpby90dXJ0bGUubXAzJyxcclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgIHdvcmQ6ICdkb2xwaGluJyxcclxuICAgICAgdHJhbnNsYXRpb246ICfQtNC10LvRjNGE0LjQvScsXHJcbiAgICAgIGltYWdlOiAnaW1nL2RvbHBoaW4uanBnJyxcclxuICAgICAgYXVkaW9TcmM6ICdhdWRpby9kb2xwaGluLm1wMycsXHJcbiAgICB9LFxyXG4gIF0sXHJcbiAgW1xyXG4gICAge1xyXG4gICAgICB3b3JkOiAnc2tpcnQnLFxyXG4gICAgICB0cmFuc2xhdGlvbjogJ9GO0LHQutCwJyxcclxuICAgICAgaW1hZ2U6ICdpbWcvc2tpcnQuanBnJyxcclxuICAgICAgYXVkaW9TcmM6ICdhdWRpby9za2lydC5tcDMnLFxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgd29yZDogJ3BhbnRzJyxcclxuICAgICAgdHJhbnNsYXRpb246ICfQsdGA0Y7QutC4JyxcclxuICAgICAgaW1hZ2U6ICdpbWcvcGFudHMuanBnJyxcclxuICAgICAgYXVkaW9TcmM6ICdhdWRpby9wYW50cy5tcDMnLFxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgd29yZDogJ2Jsb3VzZScsXHJcbiAgICAgIHRyYW5zbGF0aW9uOiAn0LHQu9GD0LfQutCwJyxcclxuICAgICAgaW1hZ2U6ICdpbWcvYmxvdXNlLmpwZycsXHJcbiAgICAgIGF1ZGlvU3JjOiAnYXVkaW8vYmxvdXNlLm1wMycsXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICB3b3JkOiAnZHJlc3MnLFxyXG4gICAgICB0cmFuc2xhdGlvbjogJ9C/0LvQsNGC0YzQtScsXHJcbiAgICAgIGltYWdlOiAnaW1nL2RyZXNzLmpwZycsXHJcbiAgICAgIGF1ZGlvU3JjOiAnYXVkaW8vZHJlc3MubXAzJyxcclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgIHdvcmQ6ICdib290JyxcclxuICAgICAgdHJhbnNsYXRpb246ICfQsdC+0YLQuNC90L7QuicsXHJcbiAgICAgIGltYWdlOiAnaW1nL2Jvb3QuanBnJyxcclxuICAgICAgYXVkaW9TcmM6ICdhdWRpby9ib290Lm1wMycsXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICB3b3JkOiAnc2hpcnQnLFxyXG4gICAgICB0cmFuc2xhdGlvbjogJ9GA0YPQsdCw0YjQutCwJyxcclxuICAgICAgaW1hZ2U6ICdpbWcvc2hpcnQuanBnJyxcclxuICAgICAgYXVkaW9TcmM6ICdhdWRpby9zaGlydC5tcDMnLFxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgd29yZDogJ2NvYXQnLFxyXG4gICAgICB0cmFuc2xhdGlvbjogJ9C/0LDQu9GM0YLQvicsXHJcbiAgICAgIGltYWdlOiAnaW1nL2NvYXQuanBnJyxcclxuICAgICAgYXVkaW9TcmM6ICdhdWRpby9jb2F0Lm1wMycsXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICB3b3JkOiAnc2hvZScsXHJcbiAgICAgIHRyYW5zbGF0aW9uOiAn0YLRg9GE0LvQuCcsXHJcbiAgICAgIGltYWdlOiAnaW1nL3Nob2UuanBnJyxcclxuICAgICAgYXVkaW9TcmM6ICdhdWRpby9zaG9lLm1wMycsXHJcbiAgICB9LFxyXG4gIF0sXHJcbiAgW1xyXG4gICAge1xyXG4gICAgICB3b3JkOiAnc2FkJyxcclxuICAgICAgdHJhbnNsYXRpb246ICfQs9GA0YPRgdGC0L3Ri9C5JyxcclxuICAgICAgaW1hZ2U6ICdpbWcvc2FkLmpwZycsXHJcbiAgICAgIGF1ZGlvU3JjOiAnYXVkaW8vc2FkLm1wMycsXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICB3b3JkOiAnYW5ncnknLFxyXG4gICAgICB0cmFuc2xhdGlvbjogJ9GB0LXRgNC00LjRgtGL0LknLFxyXG4gICAgICBpbWFnZTogJ2ltZy9hbmdyeS5qcGcnLFxyXG4gICAgICBhdWRpb1NyYzogJ2F1ZGlvL2FuZ3J5Lm1wMycsXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICB3b3JkOiAnaGFwcHknLFxyXG4gICAgICB0cmFuc2xhdGlvbjogJ9GB0YfQsNGB0YLQu9C40LLRi9C5JyxcclxuICAgICAgaW1hZ2U6ICdpbWcvaGFwcHkuanBnJyxcclxuICAgICAgYXVkaW9TcmM6ICdhdWRpby9oYXBweS5tcDMnLFxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgd29yZDogJ3RpcmVkJyxcclxuICAgICAgdHJhbnNsYXRpb246ICfRg9GB0YLQsNCy0YjQuNC5JyxcclxuICAgICAgaW1hZ2U6ICdpbWcvdGlyZWQuanBnJyxcclxuICAgICAgYXVkaW9TcmM6ICdhdWRpby90aXJlZC5tcDMnLFxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgd29yZDogJ3N1cnByaXNlZCcsXHJcbiAgICAgIHRyYW5zbGF0aW9uOiAn0YPQtNC40LLQu9GR0L3QvdGL0LknLFxyXG4gICAgICBpbWFnZTogJ2ltZy9zdXJwcmlzZWQuanBnJyxcclxuICAgICAgYXVkaW9TcmM6ICdhdWRpby9zdXJwcmlzZWQubXAzJyxcclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgIHdvcmQ6ICdzY2FyZWQnLFxyXG4gICAgICB0cmFuc2xhdGlvbjogJ9C40YHQv9GD0LPQsNC90L3Ri9C5JyxcclxuICAgICAgaW1hZ2U6ICdpbWcvc2NhcmVkLmpwZycsXHJcbiAgICAgIGF1ZGlvU3JjOiAnYXVkaW8vc2NhcmVkLm1wMycsXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICB3b3JkOiAnc21pbGUnLFxyXG4gICAgICB0cmFuc2xhdGlvbjogJ9GD0LvRi9Cx0LrQsCcsXHJcbiAgICAgIGltYWdlOiAnaW1nL3NtaWxlLmpwZycsXHJcbiAgICAgIGF1ZGlvU3JjOiAnYXVkaW8vc21pbGUubXAzJyxcclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgIHdvcmQ6ICdsYXVnaCcsXHJcbiAgICAgIHRyYW5zbGF0aW9uOiAn0YHQvNC10YUnLFxyXG4gICAgICBpbWFnZTogJ2ltZy9sYXVnaC5qcGcnLFxyXG4gICAgICBhdWRpb1NyYzogJ2F1ZGlvL2xhdWdoLm1wMycsXHJcbiAgICB9LFxyXG4gIF0sXHJcbiAgW1xyXG4gICAge1xyXG4gICAgICB3b3JkOiAnYnVyZ2VyJyxcclxuICAgICAgdHJhbnNsYXRpb246ICfQsdGD0YDQs9C10YAnLFxyXG4gICAgICBpbWFnZTogJ2ltZy9idXJnZXIuanBnJyxcclxuICAgICAgYXVkaW9TcmM6ICdhdWRpby9lbl9idXJnZXIubXAzJyxcclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgIHdvcmQ6ICdjYWtlJyxcclxuICAgICAgdHJhbnNsYXRpb246ICfRgtC+0YDRgicsXHJcbiAgICAgIGltYWdlOiAnaW1nL2Nha2UuanBnJyxcclxuICAgICAgYXVkaW9TcmM6ICdhdWRpby9lbl9jYWtlLm1wMycsXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICB3b3JkOiAnY3JvaXNzYW50JyxcclxuICAgICAgdHJhbnNsYXRpb246ICfQutGA0YPQsNGB0YHQsNC9JyxcclxuICAgICAgaW1hZ2U6ICdpbWcvY3JvaXNzYW50LmpwZycsXHJcbiAgICAgIGF1ZGlvU3JjOiAnYXVkaW8vZW5fY3JvaXNzYW50Lm1wMycsXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICB3b3JkOiAnaG90IGRvZycsXHJcbiAgICAgIHRyYW5zbGF0aW9uOiAn0YXQvtGCINC00L7QsycsXHJcbiAgICAgIGltYWdlOiAnaW1nL2hvdF9kb2cuanBnJyxcclxuICAgICAgYXVkaW9TcmM6ICdhdWRpby9lbl9ob3RfZG9nLm1wMycsXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICB3b3JkOiAnbGFzYWduYScsXHJcbiAgICAgIHRyYW5zbGF0aW9uOiAn0LvQsNC30LDQvdGM0Y8nLFxyXG4gICAgICBpbWFnZTogJ2ltZy9sYXNhZ25hLmpwZycsXHJcbiAgICAgIGF1ZGlvU3JjOiAnYXVkaW8vZW5fbGFzYWduYS5tcDMnLFxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgd29yZDogJ29tZWxldHRlJyxcclxuICAgICAgdHJhbnNsYXRpb246ICfQvtC80LvQtdGCJyxcclxuICAgICAgaW1hZ2U6ICdpbWcvb21lbGV0dGUuanBnJyxcclxuICAgICAgYXVkaW9TcmM6ICdhdWRpby9lbl9vbWVsZXR0ZS5tcDMnLFxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgd29yZDogJ3BpenphJyxcclxuICAgICAgdHJhbnNsYXRpb246ICfQv9C40YbRhtCwJyxcclxuICAgICAgaW1hZ2U6ICdpbWcvcGl6emEuanBnJyxcclxuICAgICAgYXVkaW9TcmM6ICdhdWRpby9lbl9waXp6YS5tcDMnLFxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgd29yZDogJ3NhbmR3aWNoJyxcclxuICAgICAgdHJhbnNsYXRpb246ICfQsdGD0YLQtdGA0LHRgNC+0LQnLFxyXG4gICAgICBpbWFnZTogJ2ltZy9zYW5kd2ljaC5qcGcnLFxyXG4gICAgICBhdWRpb1NyYzogJ2F1ZGlvL2VuX3NhbmR3aWNoLm1wMycsXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICB3b3JkOiAnc3BhZ2hldHRpJyxcclxuICAgICAgdHJhbnNsYXRpb246ICfRgdC/0LDQs9C10YLRgtC4JyxcclxuICAgICAgaW1hZ2U6ICdpbWcvc3BhZ2hldHRpLmpwZycsXHJcbiAgICAgIGF1ZGlvU3JjOiAnYXVkaW8vZW5fc3BhZ2hldHRpLm1wMycsXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICB3b3JkOiAnc3VzaGknLFxyXG4gICAgICB0cmFuc2xhdGlvbjogJ9GB0YPRiNC4JyxcclxuICAgICAgaW1hZ2U6ICdpbWcvc3VzaGkuanBnJyxcclxuICAgICAgYXVkaW9TcmM6ICdhdWRpby9lbl9zdXNoaS5tcDMnLFxyXG4gICAgfSxcclxuICBdLFxyXG4gIFtcclxuICAgIHtcclxuICAgICAgd29yZDogJ2NvYXN0JyxcclxuICAgICAgdHJhbnNsYXRpb246ICfQv9C+0LHQtdGA0LXQttGM0LUnLFxyXG4gICAgICBpbWFnZTogJ2ltZy9jb2FzdC5qcGcnLFxyXG4gICAgICBhdWRpb1NyYzogJ2F1ZGlvL2VuX2NvYXN0Lm1wMycsXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICB3b3JkOiAnc3dhbXAnLFxyXG4gICAgICB0cmFuc2xhdGlvbjogJ9Cx0L7Qu9C+0YLQvicsXHJcbiAgICAgIGltYWdlOiAnaW1nL3N3YW1wLmpwZycsXHJcbiAgICAgIGF1ZGlvU3JjOiAnYXVkaW8vZW5fc3dhbXAubXAzJyxcclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgIHdvcmQ6ICdyaXZlcicsXHJcbiAgICAgIHRyYW5zbGF0aW9uOiAn0YDQtdC60LAnLFxyXG4gICAgICBpbWFnZTogJ2ltZy9yaXZlci5qcGcnLFxyXG4gICAgICBhdWRpb1NyYzogJ2F1ZGlvL2VuX3JpdmVyLm1wMycsXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICB3b3JkOiAnaXNsYW5kJyxcclxuICAgICAgdHJhbnNsYXRpb246ICfQvtGB0YLRgNC+0LInLFxyXG4gICAgICBpbWFnZTogJ2ltZy9pc2xhbmQuanBnJyxcclxuICAgICAgYXVkaW9TcmM6ICdhdWRpby9lbl9pc2xhbmQubXAzJyxcclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgIHdvcmQ6ICdsYWtlJyxcclxuICAgICAgdHJhbnNsYXRpb246ICfQvtC30LXRgNC+JyxcclxuICAgICAgaW1hZ2U6ICdpbWcvbGFrZS5qcGcnLFxyXG4gICAgICBhdWRpb1NyYzogJ2F1ZGlvL2VuX2xha2UubXAzJyxcclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgIHdvcmQ6ICdpY2ViZXJnJyxcclxuICAgICAgdHJhbnNsYXRpb246ICfQsNC50YHQsdC10YDQsycsXHJcbiAgICAgIGltYWdlOiAnaW1nL2ljZWJlcmcuanBnJyxcclxuICAgICAgYXVkaW9TcmM6ICdhdWRpby9lbl9pY2ViZXJnLm1wMycsXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICB3b3JkOiAnbW91bnRhaW4nLFxyXG4gICAgICB0cmFuc2xhdGlvbjogJ9Cz0L7RgNCwJyxcclxuICAgICAgaW1hZ2U6ICdpbWcvbW91bnRhaW4uanBnJyxcclxuICAgICAgYXVkaW9TcmM6ICdhdWRpby9lbl9tb3VudGFpbi5tcDMnLFxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgd29yZDogJ29jZWFuJyxcclxuICAgICAgdHJhbnNsYXRpb246ICfQvtC60LXQsNC9JyxcclxuICAgICAgaW1hZ2U6ICdpbWcvb2NlYW4uanBnJyxcclxuICAgICAgYXVkaW9TcmM6ICdhdWRpby9lbl9vY2Vhbi5tcDMnLFxyXG4gICAgfSxcclxuICBdLFxyXG5dO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2FyZHM7XHJcbiIsIi8qIGVzbGludC1kaXNhYmxlIGxpbmVicmVhay1zdHlsZSAqL1xyXG4vKiBlc2xpbnQtZGlzYWJsZSBwcmVmZXItZGVzdHJ1Y3R1cmluZyAqL1xyXG4vKiBlc2xpbnQtZGlzYWJsZSBuby11bnVzZWQtdmFycyAqL1xyXG4vKiBlc2xpbnQtZGlzYWJsZSBuby1jb25zb2xlICovXHJcbi8qIGVzbGludC1kaXNhYmxlIG5vLXVuZGVmICovXHJcblxyXG5mdW5jdGlvbiBjbGlja1VzZXJJbnRlcmFjdGl2ZShldmVudCwgYXBwQ3RybE9iaikge1xyXG4gIGNvbnN0IGFwcENvbnRyb2wgPSBhcHBDdHJsT2JqO1xyXG4gIGNvbnN0IG1lbnUgPSBhcHBDb250cm9sLm1lbnU7XHJcbiAgY29uc3QgZ2FtZUNvbnRyb2wgPSBhcHBDb250cm9sLmdhbWVDb250cm9sO1xyXG4gIGNvbnN0IHN3aXRjaE9iaiA9IGFwcENvbnRyb2wuc3dpdGNoT2JqO1xyXG4gIGNvbnN0IGNvbnRlbnQgPSBhcHBDb250cm9sLmNvbnRlbnQ7XHJcbiAgY29uc3QgdGFyZ2V0Q2xhc3NMaXN0ID0gQXJyYXkuZnJvbShldmVudC50YXJnZXQuY2xhc3NMaXN0KTtcclxuICBjb25zdCBpc0dhbWVNb2RlID0gKGFwcENvbnRyb2wuYWN0aXZlTW9kZSA9PT0gJ3BsYXknKTtcclxuICBsZXQgY2FyZEVsZW1lbnQ7XHJcbiAgbGV0IGFjdGl2ZU1lbnVFbGVtZW50O1xyXG5cclxuICBzd2l0Y2ggKHRydWUpIHtcclxuICAgIC8vICBjbGlja2luZyBvbiBwYWdlIHRpdGxlXHJcbiAgICBjYXNlICh0YXJnZXRDbGFzc0xpc3QuaW5jbHVkZXMoJ2FwcC10aXRsZScpKTpcclxuICAgICAgaWYgKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2JvZHknKS5jbGFzc0xpc3QuY29udGFpbnMoJ29wZW5lZC1tZW51JykpIHtcclxuICAgICAgICBtZW51LmNsb3NlKCk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgYXBwQ29udHJvbC5jaGFuZ2VQYWdlKCdtYWluIHBhZ2UnKTtcclxuICAgICAgICBhcHBDb250cm9sLnN3aXRjaE9iai5lbmFibGUoKTtcclxuICAgICAgfVxyXG4gICAgICBicmVhaztcclxuXHJcbiAgICAvLyAgY2xpY2tpbmcgb24gbWVudSBidXJnZXIgYnV0dG9uXHJcbiAgICBjYXNlICh0YXJnZXRDbGFzc0xpc3QuaW5jbHVkZXMoJ21lbnUtYnV0dG9uJykpOlxyXG4gICAgICBtZW51LnRvZ2dsZSgpO1xyXG4gICAgICBicmVhaztcclxuXHJcbiAgICAvLyAgY2xpY2tpbmcgYW55d2hlcmUgZWxzZSB3aGVuIGJ1cmdlciBtZW51IG9wZW5lZFxyXG4gICAgY2FzZSAoZG9jdW1lbnQucXVlcnlTZWxlY3RvcignYm9keScpLmNsYXNzTGlzdC5jb250YWlucygnb3BlbmVkLW1lbnUnKSAmJiAhdGFyZ2V0Q2xhc3NMaXN0LmluY2x1ZGVzKCdtZW51JykpOlxyXG4gICAgICBtZW51LmNsb3NlKCk7XHJcbiAgICAgIGlmICh0YXJnZXRDbGFzc0xpc3QuaW5jbHVkZXMoJ21lbnUtaXRlbScpKSB7XHJcbiAgICAgICAgYWN0aXZlTWVudUVsZW1lbnQgPSBldmVudC50YXJnZXQ7XHJcbiAgICAgICAgYXBwQ29udHJvbC5jaGFuZ2VQYWdlKGFjdGl2ZU1lbnVFbGVtZW50LmlubmVySFRNTCk7XHJcbiAgICAgICAgYXBwQ29udHJvbC5zd2l0Y2hPYmouZW5hYmxlKCk7XHJcbiAgICAgIH1cclxuICAgICAgYnJlYWs7XHJcblxyXG4gICAgLy8gIGNsaWNraW5nIG9uIHN3aXRjaCBidXR0b25cclxuICAgIGNhc2UgKHRhcmdldENsYXNzTGlzdC5pbmNsdWRlcygnc3dpdGNoLXRyaWdnZXInKVxyXG4gICAgICAgICAgJiYgIXN3aXRjaE9iai5lbGVtZW50LmNsYXNzTGlzdC5jb250YWlucygnZGlzYWJsZWQnKSk6IHtcclxuICAgICAgc3dpdGNoT2JqLnRvZ2dsZSgpO1xyXG4gICAgICBhcHBDb250cm9sLmNoYW5nZVBhZ2UoYXBwQ29udHJvbC5hY3RpdmVQYWdlKTtcclxuICAgICAgYnJlYWs7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gIGNsaWNraW5nIG9uIHN0YXJ0IGdhbWUgYnV0dG9uXHJcbiAgICBjYXNlICh0YXJnZXRDbGFzc0xpc3QuaW5jbHVkZXMoJ3N0YXJ0LWJ1dHRvbicpKToge1xyXG4gICAgICBnYW1lQ29udHJvbC5zdGFydEdhbWUoYXBwQ29udHJvbC5hY3RpdmVBcnJDYXJkc09iaik7XHJcbiAgICAgIGJyZWFrO1xyXG4gICAgfVxyXG5cclxuICAgIC8vICBjbGlja2luZyBvbiBzdGFydCBnYW1lIGJ1dHRvblxyXG4gICAgY2FzZSAodGFyZ2V0Q2xhc3NMaXN0LmluY2x1ZGVzKCdyZXBlYXQtYnV0dG9uJykpOiB7XHJcbiAgICAgIGdhbWVDb250cm9sLnJlcGVhdFF1ZXN0aW9uKCk7XHJcbiAgICAgIGJyZWFrO1xyXG4gICAgfVxyXG5cclxuICAgIC8vICBjbGlja2luZyBvbiBjYXJkIGZsaXAgYnV0dG9uXHJcbiAgICBjYXNlICh0YXJnZXRDbGFzc0xpc3QuaW5jbHVkZXMoJ2NhcmQtZmxpcC1idXR0b24nKSk6XHJcbiAgICAgIGNhcmRFbGVtZW50ID0gY29udGVudC5nZXRDYXJkRWxlbWVudEJ5VGFyZ2V0KGV2ZW50LnRhcmdldCk7XHJcbiAgICAgIGNvbnRlbnQuZmxpcENhcmQoY2FyZEVsZW1lbnQpO1xyXG4gICAgICBicmVhaztcclxuXHJcbiAgICAvLyAgY2xpY2tpbmcgb24gY2FyZFxyXG4gICAgY2FzZSAodGFyZ2V0Q2xhc3NMaXN0LnNvbWUoKGNsYXNzTmFtZSkgPT4gY29udGVudC52YWxpZENhcmRDbGFzc2VzLmluY2x1ZGVzKGNsYXNzTmFtZSkpKToge1xyXG4gICAgICBsZXQgY2FyZE9iajtcclxuICAgICAgY2FyZEVsZW1lbnQgPSBjb250ZW50LmdldENhcmRFbGVtZW50QnlUYXJnZXQoZXZlbnQudGFyZ2V0KTtcclxuXHJcbiAgICAgIGlmICghY2FyZEVsZW1lbnQuY2xhc3NMaXN0LmNvbnRhaW5zKCdjYXJkLW1haW4tcGFnZScpKSB7XHJcbiAgICAgICAgY29uc3QgY2FyZEltYWdlTmFtZSA9IGNvbnRlbnQuZ2V0Q2FyZEltYWdlTmFtZShjYXJkRWxlbWVudCk7XHJcbiAgICAgICAgY2FyZE9iaiA9IGNvbnRlbnQuZ2V0Q2FyZE9iakJ5SW1hZ2VOYW1lKGNhcmRJbWFnZU5hbWUpO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBpZiAoaXNHYW1lTW9kZSAmJiBnYW1lQ29udHJvbC5pc0dhbWVTdGFydGVkICYmICFjYXJkRWxlbWVudC5jbGFzc0xpc3QuY29udGFpbnMoJ2Rpc2FibGVkJykpIHtcclxuICAgICAgICBnYW1lQ29udHJvbC5wcm9jZXNzQW5zd2VyKGNhcmRPYmosIGNhcmRFbGVtZW50KTtcclxuICAgICAgICBicmVhaztcclxuICAgICAgfSBlbHNlIGlmIChjYXJkRWxlbWVudC5jbGFzc0xpc3QuY29udGFpbnMoJ2NhcmQtbWFpbi1wYWdlJykpIHtcclxuICAgICAgICBjb25zdCBwYWdlTmFtZSA9IGNvbnRlbnQuZ2V0Q2FyZElubmVyVGV4dChjYXJkRWxlbWVudCk7XHJcbiAgICAgICAgYWN0aXZlTWVudUVsZW1lbnQgPSBtZW51LmdldE1lbnVJdGVtQnlOYW1lKHBhZ2VOYW1lKTtcclxuICAgICAgICBhcHBDb250cm9sLmNoYW5nZVBhZ2UocGFnZU5hbWUpO1xyXG4gICAgICB9IGVsc2UgaWYgKCFjYXJkRWxlbWVudC5jbGFzc0xpc3QuY29udGFpbnMoJ2ZsaXBwZWQnKSAmJiAhY2FyZEVsZW1lbnQuY2xhc3NMaXN0LmNvbnRhaW5zKCdnYW1lLWNhcmQnKSkge1xyXG4gICAgICAgIGFwcENvbnRyb2wucGxheUNhcmRTb3VuZChjYXJkT2JqKTtcclxuICAgICAgICBhcHBDb250cm9sLnN0YXQuc3RvcmFnZS5hZGQoJ2NsaWNrJywgY2FyZE9iaik7XHJcbiAgICAgIH1cclxuICAgICAgYnJlYWs7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gIGNsaWNraW5nIG9uIHRhYmxlIGhlYWRlclxyXG4gICAgY2FzZSAodGFyZ2V0Q2xhc3NMaXN0LmluY2x1ZGVzKCdzb3J0YWJsZScpKTpcclxuICAgICAgYXBwQ29udHJvbC5zdGF0LnNvcnRUYWJsZShldmVudC50YXJnZXQpO1xyXG4gICAgICBjb250ZW50LmNoYW5nZUNvbnRlbnQoJ3N0YXRpc3RpYycpO1xyXG4gICAgICBicmVhaztcclxuXHJcbiAgICAvLyAgY2xpY2tpbmcgb24gcmVzZXQgYnV0dG9uXHJcbiAgICBjYXNlICh0YXJnZXRDbGFzc0xpc3QuaW5jbHVkZXMoJ3Jlc2V0LXN0YXQnKSk6XHJcbiAgICAgIGFwcENvbnRyb2wuc3RhdC5zdG9yYWdlLmNsZWFuU3RvcmFnZSgpO1xyXG4gICAgICBpZiAoYXBwQ29udHJvbC5jb250ZW50LnR5cGUgPT09ICdzdGF0aXN0aWMnKSB7XHJcbiAgICAgICAgY29udGVudC5jaGFuZ2VDb250ZW50KCdzdGF0aXN0aWMnKTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBjb250ZW50LmNoYW5nZUNvbnRlbnQoJ3RyYWluIGRpZmYnKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgYnJlYWs7XHJcblxyXG4gICAgLy8gIGNsaWNraW5nIG9uIHRyYWluIGRpZmYuIHdvcmRzIGJ1dHRvblxyXG4gICAgY2FzZSAodGFyZ2V0Q2xhc3NMaXN0LmluY2x1ZGVzKCd0cmFpbi1kaWZmJykpOlxyXG4gICAgICBzd2l0Y2hPYmoudHJhaW4oKTtcclxuICAgICAgc3dpdGNoT2JqLmRpc2FibGUoKTtcclxuICAgICAgYXBwQ29udHJvbC5zdGF0LnN0b3JhZ2UuZ2V0RGlmZldvcmRzQXJyKCk7XHJcbiAgICAgIGNvbnRlbnQuY2hhbmdlQ29udGVudCgndHJhaW4gZGlmZicpO1xyXG4gICAgICBicmVhaztcclxuXHJcbiAgICBkZWZhdWx0OlxyXG4gICAgICBicmVhaztcclxuICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsaWNrVXNlckludGVyYWN0aXZlO1xyXG4iLCIvKiBlc2xpbnQtZGlzYWJsZSBsaW5lYnJlYWstc3R5bGUgKi9cclxuLyogZXNsaW50LWRpc2FibGUgaW1wb3J0L3ByZWZlci1kZWZhdWx0LWV4cG9ydCAqL1xyXG4vKiBlc2xpbnQtZGlzYWJsZSBuby11bmRlZiAqL1xyXG5cclxuZnVuY3Rpb24gY3JlYXRlQ3VzdG9tRWxlbWVudCh0eXBlLCBjbGFzc05hbWUgPSAnJywgaW5uZXJIVE1MID0gJycpIHtcclxuICBjb25zdCBlbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCh0eXBlKTtcclxuICBlbGVtZW50LmNsYXNzTmFtZSA9IGNsYXNzTmFtZTtcclxuICBlbGVtZW50LmlubmVySFRNTCA9IGlubmVySFRNTDtcclxuICByZXR1cm4gZWxlbWVudDtcclxufVxyXG5cclxuZnVuY3Rpb24gZ2V0UmFuZG9tSW50KG1heEludCwgbWluSW50ID0gMCkge1xyXG4gIC8vICBtYXggYW5kIG1pbiBpbmNsdXNpdmVcclxuICByZXR1cm4gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogKG1heEludCAtIG1pbkludCArIDEpKSArIG1pbkludDtcclxufVxyXG5cclxuZXhwb3J0IHsgY3JlYXRlQ3VzdG9tRWxlbWVudCwgZ2V0UmFuZG9tSW50IH07XHJcbiIsIi8qIGVzbGludC1kaXNhYmxlIGxpbmVicmVhay1zdHlsZSAqL1xyXG4vKiBlc2xpbnQtZGlzYWJsZSBuby1yZXN0cmljdGVkLXN5bnRheCAqL1xyXG4vKiBlc2xpbnQtZGlzYWJsZSBsaW5lYnJlYWstc3R5bGUgKi9cclxuLyogZXNsaW50LWRpc2FibGUgbm8tY29uc29sZSAqL1xyXG4vKiBlc2xpbnQtZGlzYWJsZSBsaW5lYnJlYWstc3R5bGUgKi9cclxuLyogZXNsaW50LWRpc2FibGUgY2xhc3MtbWV0aG9kcy11c2UtdGhpcyAqL1xyXG4vKiBlc2xpbnQtZGlzYWJsZSBuby11bmRlZiAqL1xyXG5cclxuaW1wb3J0IENhcmQgZnJvbSAnLi9jYXJkJztcclxuaW1wb3J0IHsgY3JlYXRlQ3VzdG9tRWxlbWVudCB9IGZyb20gJy4vY29tbW9uRnVuY3QnO1xyXG5cclxuY2xhc3MgQ29udGVudENvbnRhaW5lciB7XHJcbiAgY29uc3RydWN0b3IoYXBwQ3RybE9iaiwgdHlwZSA9ICdtYWluIHBhZ2UnKSB7XHJcbiAgICB0aGlzLmFwcENvbnRyb2wgPSBhcHBDdHJsT2JqO1xyXG4gICAgdGhpcy50b3BpY3NBcnIgPSBhcHBDdHJsT2JqLnRvcGljc0FycjtcclxuICAgIHRoaXMuY2FyZHNBcnIgPSBhcHBDdHJsT2JqLmNhcmRzQXJyO1xyXG4gICAgdGhpcy5tZW51ID0gYXBwQ3RybE9iai5tZW51O1xyXG4gICAgdGhpcy52YWxpZFR5cGVzID0gWydtYWluIHBhZ2UnLCAndG9waWMnLCAnc3RhdGlzdGljJywgJ3RyYWluIGRpZmYnXTtcclxuICAgIHRoaXMudmFsaWRDYXJkQ2xhc3NlcyA9IFsnY2FyZCcsICdjYXJkLWNvbnRlbnQnLCAnY2FyZC10ZXh0JywgJ2NhcmQtZ3JhcGhpYycsICdjYXJkLWltYWdlJ107XHJcbiAgICB0aGlzLnR5cGUgPSB0aGlzLmdldFZhbGlkVHlwZSh0eXBlKTtcclxuICAgIFt0aGlzLmhlYWRlckVsZW1lbnRdID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnY29udGFpbmVyLWNlbnRlcmVkJyk7XHJcbiAgICB0aGlzLmNhcmRzQ29sbGVjdGlvbiA9IG51bGw7XHJcbiAgICB0aGlzLmdhbWVDYXRkc0NvbGxlY3Rpb24gPSBudWxsO1xyXG4gICAgdGhpcy5lbGVtZW50ID0gbnVsbDtcclxuICAgIHRoaXMuYnVpbGQoKTtcclxuICB9XHJcblxyXG4gIGJ1aWxkKCkge1xyXG4gICAgY29uc3QgY29udGVudFdyYXBwZXIgPSBjcmVhdGVDdXN0b21FbGVtZW50KCdkaXYnLCAnY29udGVudC13cmFwcGVyJyk7XHJcbiAgICBsZXQgY29udGVudEVsZW1lbnQ7XHJcblxyXG4gICAgc3dpdGNoICh0aGlzLnR5cGUpIHtcclxuICAgICAgY2FzZSAnc3RhdGlzdGljJzpcclxuICAgICAgICBpZiAoIXRoaXMuYXBwQ29udHJvbC5zdGF0LnNvcnRlZCkge1xyXG4gICAgICAgICAgdGhpcy5hcHBDb250cm9sLnN0YXQuYnVpbGQoKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgdGhpcy5hcHBDb250cm9sLnN0YXQuc29ydGVkID0gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNvbnRlbnRFbGVtZW50ID0gdGhpcy5hcHBDb250cm9sLnN0YXQuZWxlbWVudDtcclxuICAgICAgICBicmVhaztcclxuICAgICAgY2FzZSAndHJhaW4gZGlmZic6XHJcbiAgICAgICAgdGhpcy5hcHBDb250cm9sLnN0YXQuYnVpbGQoKTtcclxuICAgICAgICBjb250ZW50RWxlbWVudCA9IHRoaXMuYXBwQ29udHJvbC5zdGF0LmVsZW1lbnQ7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIGNhc2UgJ21haW4gcGFnZSc6XHJcbiAgICAgICAgY29udGVudEVsZW1lbnQgPSB0aGlzLmNyZWF0ZU1haW5DYXJkc0NvbnRhaW5lcigpO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBjYXNlICd0b3BpYyc6IHtcclxuICAgICAgICBjb250ZW50RWxlbWVudCA9IHRoaXMuY3JlYXRlVG9waWNDYXJkc0NvbnRlbnQoKTtcclxuICAgICAgICBicmVhaztcclxuICAgICAgfVxyXG4gICAgICBkZWZhdWx0OlxyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgfVxyXG5cclxuICAgIGlmICh0aGlzLnR5cGUgPT09ICdtYWluIHBhZ2UnKSB7XHJcbiAgICAgIHRoaXMuaGVhZGVyRWxlbWVudC5jbGFzc0xpc3QuYWRkKCdtYWluLXBhZ2UnKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMuaGVhZGVyRWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKCdtYWluLXBhZ2UnKTtcclxuICAgIH1cclxuXHJcbiAgICBjb250ZW50V3JhcHBlci5hcHBlbmQoY29udGVudEVsZW1lbnQpO1xyXG4gICAgdGhpcy5lbGVtZW50ID0gY29udGVudFdyYXBwZXI7XHJcblxyXG4gICAgcmV0dXJuIHRoaXM7XHJcbiAgfVxyXG5cclxuICBjcmVhdGVNYWluQ2FyZHNDb250YWluZXIoKSB7XHJcbiAgICBjb25zdCBtYWluQ29udGFpbmVyRWxlbWVudCA9IGNyZWF0ZUN1c3RvbUVsZW1lbnQoJ2RpdicsICdjYXJkLWNvbnRhaW5lcicpO1xyXG4gICAgdGhpcy50b3BpY3NBcnIuZm9yRWFjaCgodG9waWMsIGluZGV4KSA9PiB7XHJcbiAgICAgIGNvbnN0IGNhcmRPYmogPSB7XHJcbiAgICAgICAgY2FyZE5hbWU6IHRvcGljLFxyXG4gICAgICAgIGltYWdlOiB0aGlzLmFwcENvbnRyb2wubWFpbkNhcmRzW2luZGV4XS5pbWFnZSxcclxuICAgICAgfTtcclxuICAgICAgbWFpbkNvbnRhaW5lckVsZW1lbnQuYXBwZW5kKG5ldyBDYXJkKHRoaXMuYXBwQ29udHJvbCwgY2FyZE9iaikuZWxlbWVudCk7XHJcbiAgICB9KTtcclxuXHJcbiAgICByZXR1cm4gbWFpbkNvbnRhaW5lckVsZW1lbnQ7XHJcbiAgfVxyXG5cclxuICBjcmVhdGVUb3BpY0NhcmRzQ29udGVudCgpIHtcclxuICAgIGNvbnN0IGNvbnRlbnRGcmFnbWVudCA9IG5ldyBEb2N1bWVudEZyYWdtZW50KCk7XHJcbiAgICBjb25zdCBjYXJkc0NvbnRhaW5lckVsZW1lbnQgPSBjcmVhdGVDdXN0b21FbGVtZW50KCdkaXYnLCAnY2FyZC1jb250YWluZXInKTtcclxuICAgIGNvbnN0IGNhcmRJbmRleCA9IHRoaXMudG9waWNzQXJyLmZpbmRJbmRleCgoaXRlbSkgPT4ge1xyXG4gICAgICBjb25zdCByZXN1bHQgPSBpdGVtLnRvTG93ZXJDYXNlKCkgPT09IHRoaXMuYXBwQ29udHJvbC5hY3RpdmVQYWdlO1xyXG4gICAgICByZXR1cm4gcmVzdWx0O1xyXG4gICAgfSk7XHJcbiAgICBjb25zdCB0b3BpY05hbWUgPSB0aGlzLnRvcGljc0FycltjYXJkSW5kZXhdO1xyXG5cclxuICAgIHRoaXMuY2FyZHNBcnJbY2FyZEluZGV4XS5mb3JFYWNoKChjYXJkT2JqKSA9PiB7XHJcbiAgICAgIGNhcmRzQ29udGFpbmVyRWxlbWVudC5hcHBlbmQobmV3IENhcmQodGhpcy5hcHBDb250cm9sLCBjYXJkT2JqLCB0aGlzLnR5cGUpLmVsZW1lbnQpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgY29udGVudEZyYWdtZW50LmFwcGVuZChjcmVhdGVDdXN0b21FbGVtZW50KCdoMicsICd0b3BpYy1uYW1lJywgdG9waWNOYW1lKSk7XHJcbiAgICBjb250ZW50RnJhZ21lbnQuYXBwZW5kKGNhcmRzQ29udGFpbmVyRWxlbWVudCk7XHJcblxyXG4gICAgcmV0dXJuIGNvbnRlbnRGcmFnbWVudDtcclxuICB9XHJcblxyXG4gIGFkZFRvRG9jKCkge1xyXG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignbWFpbicpLmFwcGVuZCh0aGlzLmVsZW1lbnQpO1xyXG4gICAgW3RoaXMuZWxlbWVudF0gPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdjb250ZW50LXdyYXBwZXInKTtcclxuICAgIHRoaXMuY2FyZHNDb2xsZWN0aW9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnY2FyZCcpO1xyXG4gICAgdGhpcy5nYW1lQ2FyZHNDb2xsZWN0aW9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnZ2FtZS1jYXJkJyk7XHJcbiAgICByZXR1cm4gdGhpcztcclxuICB9XHJcblxyXG4gIGNsZWFyKCkge1xyXG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmNvbnRlbnQtd3JhcHBlcicpLnJlbW92ZSgpO1xyXG4gICAgcmV0dXJuIHRoaXM7XHJcbiAgfVxyXG5cclxuICBjaGFuZ2VDb250ZW50KG1lbnVUb3BpY05hbWUpIHtcclxuICAgIHRoaXMudHlwZSA9IHRoaXMuZ2V0VmFsaWRUb3BpY1R5cGUobWVudVRvcGljTmFtZSk7XHJcbiAgICB0aGlzLmFwcENvbnRyb2wuZ2FtZUNvbnRyb2xcclxuICAgICAgLmVuZEdhbWUoKTtcclxuXHJcbiAgICB0aGlzXHJcbiAgICAgIC5idWlsZCgpXHJcbiAgICAgIC5jbGVhcigpXHJcbiAgICAgIC5hZGRUb0RvYygpO1xyXG4gICAgcmV0dXJuIHRoaXM7XHJcbiAgfVxyXG5cclxuICBpc0VsZW1lbnRJbkNhcmQoZWxlbWVudCkge1xyXG4gICAgcmV0dXJuICh0aGlzLnZhbGlkQ2FyZENsYXNzZXMuc29tZSgoY2xhc3NOYW1lKSA9PiBlbGVtZW50LmNsYXNzTGlzdC5jb250YWlucyhjbGFzc05hbWUpKSk7XHJcbiAgfVxyXG5cclxuICBnZXRWYWxpZFR5cGUodHlwZSkge1xyXG4gICAgaWYgKHRoaXMudmFsaWRUeXBlcy5pbmNsdWRlcyh0eXBlKSkge1xyXG4gICAgICByZXR1cm4gdHlwZTtcclxuICAgIH1cclxuICAgIHRocm93IG5ldyBFcnJvcignd3JvbmcgdHlwZSBvZiBPYmplY3QnKTtcclxuICB9XHJcblxyXG4gIGdldFZhbGlkVG9waWNUeXBlKG1lbnVUb3BpY05hbWUpIHtcclxuICAgIGNvbnN0IGN1cmVudE1lbnVUb3BpY05hbWUgPSBtZW51VG9waWNOYW1lLnRvTG93ZXJDYXNlKCk7XHJcbiAgICBpZiAodGhpcy52YWxpZFR5cGVzLmluY2x1ZGVzKGN1cmVudE1lbnVUb3BpY05hbWUpKSB7XHJcbiAgICAgIHJldHVybiBjdXJlbnRNZW51VG9waWNOYW1lO1xyXG4gICAgfSBpZiAodGhpcy50b3BpY3NBcnIubWFwKChpdGVtKSA9PiBpdGVtLnRvTG93ZXJDYXNlKCkpLmluY2x1ZGVzKGN1cmVudE1lbnVUb3BpY05hbWUpKSB7XHJcbiAgICAgIHJldHVybiAndG9waWMnO1xyXG4gICAgfVxyXG4gICAgdGhyb3cgbmV3IEVycm9yKCd3cm9uZyBtZW51IHRvcGljIE5hbWUnKTtcclxuICB9XHJcblxyXG4gIGdldENhcmRPYmpCeVdvcmQod29yZCkge1xyXG4gICAgcmV0dXJuIHRoaXMuY2FyZHNBcnIuZmxhdCgpLmZpbmQoKGNhcmRPYmopID0+IGNhcmRPYmoud29yZCA9PT0gd29yZCk7XHJcbiAgfVxyXG5cclxuICBnZXRDYXJkT2JqQnlJbWFnZU5hbWUoaW1hZ2VOYW1lKSB7XHJcbiAgICByZXR1cm4gdGhpcy5jYXJkc0Fyci5mbGF0KCkuZmluZCgoY2FyZE9iaikgPT4gY2FyZE9iai5pbWFnZSA9PT0gYGltZy8ke2ltYWdlTmFtZX0uanBnYCk7XHJcbiAgfVxyXG5cclxuICBnZXRDYXJkT2JqQnlUcmFuc2xhdGlvbih0cmFuc2xhdGlvbikge1xyXG4gICAgcmV0dXJuIHRoaXMuY2FyZHNBcnIuZmxhdCgpLmZpbmQoKGNhcmRPYmopID0+IGNhcmRPYmoudHJhbnNsYXRpb24gPT09IHRyYW5zbGF0aW9uKTtcclxuICB9XHJcblxyXG4gIGdldENhcmRFbGVtZW50QnlUYXJnZXQodGFyZ2V0RWxlbWVudCkge1xyXG4gICAgbGV0IHNlYXJjaEVsZW1lbnQgPSB0YXJnZXRFbGVtZW50O1xyXG4gICAgd2hpbGUgKCFzZWFyY2hFbGVtZW50LmNsYXNzTGlzdC5jb250YWlucygnY2FyZCcpKSB7XHJcbiAgICAgIHNlYXJjaEVsZW1lbnQgPSBzZWFyY2hFbGVtZW50LnBhcmVudEVsZW1lbnQ7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gc2VhcmNoRWxlbWVudDtcclxuICB9XHJcblxyXG4gIGdldENhcmRJbm5lclRleHQoY2FyZEVsZW1lbnQpIHtcclxuICAgIHJldHVybiBjYXJkRWxlbWVudC5xdWVyeVNlbGVjdG9yKCdwJykuaW5uZXJIVE1MO1xyXG4gIH1cclxuXHJcbiAgZ2V0Q2FyZEltYWdlTmFtZShjYXJkRWxlbWVudCkge1xyXG4gICAgY29uc3QgaW1hZ2VTcmMgPSBjYXJkRWxlbWVudC5xdWVyeVNlbGVjdG9yKCcuY2FyZC1pbWFnZScpLnNyYztcclxuICAgIGNvbnN0IGltYWdlTmFtZSA9IGltYWdlU3JjLm1hdGNoKC8oPzw9XFwvKVxcdysoPz1cXC5wbmd8LnN2Z3wuanBnfC5qcGVnfC5naWYpLylbMF07XHJcbiAgICByZXR1cm4gaW1hZ2VOYW1lO1xyXG4gIH1cclxuXHJcbiAgZmxpcENhcmQoY2FyZEVsZW1lbnQpIHtcclxuICAgIGNvbnN0IGNhcmRQYXJhZ3JhcGggPSBjYXJkRWxlbWVudC5xdWVyeVNlbGVjdG9yKCdwJyk7XHJcbiAgICBjb25zdCBjYXJkRmxpcEJ1dHRvbiA9IGNhcmRFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJy5jYXJkLWZsaXAtYnV0dG9uJyk7XHJcbiAgICBjb25zdCBjYXJkSW1hZ2VOYW1lID0gdGhpcy5nZXRDYXJkSW1hZ2VOYW1lKGNhcmRFbGVtZW50KTtcclxuICAgIGNvbnN0IGNhcmRPYmogPSB0aGlzLmdldENhcmRPYmpCeUltYWdlTmFtZShjYXJkSW1hZ2VOYW1lKTtcclxuXHJcbiAgICBjYXJkRWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKCd1bmZsaXBwZWQnKTtcclxuICAgIGNhcmRFbGVtZW50LmNsYXNzTGlzdC5hZGQoJ2ZsaXBwZWQnKTtcclxuICAgIGNhcmRFbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoXHJcbiAgICAgICdwb2ludGVybGVhdmUnLFxyXG4gICAgICAoKSA9PiB7XHJcbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICB0aGlzLnVuZmxpcENhcmQoY2FyZEVsZW1lbnQpO1xyXG4gICAgICAgIH0sIDUwMCk7XHJcbiAgICAgIH0sXHJcbiAgICAgIHsgb25jZTogdHJ1ZSB9LFxyXG4gICAgKTtcclxuXHJcbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgY2FyZFBhcmFncmFwaC5pbm5lckhUTUwgPSBjYXJkT2JqLnRyYW5zbGF0aW9uO1xyXG4gICAgICBjYXJkRmxpcEJ1dHRvbi5oaWRkZW4gPSB0cnVlO1xyXG4gICAgfSwgNTAwKTtcclxuXHJcbiAgICByZXR1cm4gdGhpcztcclxuICB9XHJcblxyXG4gIHVuZmxpcENhcmQoY2FyZEVsZW1lbnQpIHtcclxuICAgIGNhcmRFbGVtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3BvaW50ZXJsZWF2ZScsIChldmVudCkgPT4gdW5ob3ZlckNhcmQoZXZlbnQsIGNhcmRFbGVtZW50LCB0aGlzKSk7XHJcblxyXG4gICAgaWYgKGNhcmRFbGVtZW50LmNsYXNzTGlzdC5jb250YWlucygnZmxpcHBlZCcpKSB7XHJcbiAgICAgIGNvbnN0IGNhcmRQYXJhZ3JhcGggPSBjYXJkRWxlbWVudC5xdWVyeVNlbGVjdG9yKCdwJyk7XHJcbiAgICAgIGNvbnN0IGNhcmRGbGlwQnV0dG9uID0gY2FyZEVsZW1lbnQucXVlcnlTZWxlY3RvcignLmNhcmQtZmxpcC1idXR0b24nKTtcclxuICAgICAgY29uc3QgY2FyZFdvcmQgPSBjYXJkUGFyYWdyYXBoLmlubmVySFRNTDtcclxuICAgICAgY29uc3QgY2FyZE9iaiA9IHRoaXMuZ2V0Q2FyZE9iakJ5VHJhbnNsYXRpb24oY2FyZFdvcmQpO1xyXG5cclxuICAgICAgY2FyZEVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZSgnZmxpcHBlZCcpO1xyXG4gICAgICBjYXJkRWxlbWVudC5jbGFzc0xpc3QuYWRkKCd1bmZsaXBwZWQnKTtcclxuICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgY2FyZFBhcmFncmFwaC5pbm5lckhUTUwgPSBjYXJkT2JqLndvcmQ7XHJcbiAgICAgICAgY2FyZEZsaXBCdXR0b24uaGlkZGVuID0gZmFsc2U7XHJcbiAgICAgIH0sIDUwMCk7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHRoaXM7XHJcbiAgfVxyXG5cclxuICByZW1vdmVDYXJkcygpIHtcclxuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5jYXJkLWNvbnRhaW5lcicpLnJlbW92ZSgpO1xyXG4gICAgcmV0dXJuIHRoaXM7XHJcbiAgfVxyXG5cclxuICBwbGF5RmluYWxDbGlwKHdyb25nQW5zd2Vycykge1xyXG4gICAgY29uc3QgY2xpcFR5cGUgPSAod3JvbmdBbnN3ZXJzID09PSAwKSA/ICdzdWNjZXNzJyA6ICdmYWlsdXJlJztcclxuICAgIGNvbnN0IGNsYXNzTmFtZXMgPSAnZmluYWwtY2xpcCc7XHJcbiAgICBjb25zdCBpbWFnZVNyYyA9IGBhcHAvJHtjbGlwVHlwZX0uanBnYDtcclxuXHJcbiAgICBjb25zdCB0ZW1wbGF0ZSA9IGBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJncmFwaGljXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxpbWcgc3JjPVwiLi4vYXNzZXRzL2ltZy8ke2ltYWdlU3JjfVwiIGFsdD1cImltYWdlICR7Y2xpcFR5cGV9XCIgd2lkdGg9XCI0MDBcIiBoZWlnaHQ9XCI0MDBcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYDtcclxuXHJcbiAgICBjb25zdCBmaW5hbENsaXBFbGVtZW50ID0gY3JlYXRlQ3VzdG9tRWxlbWVudCgnZGl2JywgY2xhc3NOYW1lcywgdGVtcGxhdGUpO1xyXG4gICAgaWYgKGNsaXBUeXBlID09PSAnZmFpbHVyZScpIHtcclxuICAgICAgZmluYWxDbGlwRWxlbWVudC5pbm5lckhUTUwgKz0gYDxwIGNsYXNzPVwibWlzdGFrZXMtbnVtYmVyXCI+TWlzdGFrZXM6ICR7d3JvbmdBbnN3ZXJzfTwvcD5gO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMuYXBwQ29udHJvbC5wbGF5QXBwU291bmQoY2xpcFR5cGUpO1xyXG4gICAgdGhpcy5yZW1vdmVDYXJkcygpO1xyXG4gICAgdGhpcy5lbGVtZW50LmFwcGVuZChmaW5hbENsaXBFbGVtZW50KTtcclxuXHJcbiAgICByZXR1cm4gdGhpcztcclxuICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IENvbnRlbnRDb250YWluZXI7XHJcbiIsIi8qIGVzbGludC1kaXNhYmxlIGxpbmVicmVhay1zdHlsZSAqL1xyXG4vKiBlc2xpbnQtZGlzYWJsZSBuby1yZXN0cmljdGVkLXN5bnRheCAqL1xyXG4vKiBlc2xpbnQtZGlzYWJsZSBsaW5lYnJlYWstc3R5bGUgKi9cclxuLyogZXNsaW50LWRpc2FibGUgbm8tY29uc29sZSAqL1xyXG4vKiBlc2xpbnQtZGlzYWJsZSBsaW5lYnJlYWstc3R5bGUgKi9cclxuLyogZXNsaW50LWRpc2FibGUgbm8tdW5kZWYgKi9cclxuXHJcbmltcG9ydCBTdGFyIGZyb20gJy4vc3Rhcic7XHJcbmltcG9ydCB7XHJcbiAgY3JlYXRlQ3VzdG9tRWxlbWVudCxcclxuICBnZXRSYW5kb21JbnQsXHJcbn0gZnJvbSAnLi9jb21tb25GdW5jdCc7XHJcblxyXG5jbGFzcyBnYW1lQ29udHJvbCB7XHJcbiAgY29uc3RydWN0b3IoYXBwQ29udHJvbCkge1xyXG4gICAgdGhpcy5hcHBDb250cm9sID0gYXBwQ29udHJvbDtcclxuICAgIHRoaXMucXVlc3Rpb25zQnVuZGxlID0gW107XHJcbiAgICB0aGlzLmlzR2FtZVN0YXJ0ZWQgPSBmYWxzZTtcclxuICAgIHRoaXMuY29ycmVjdFN0YXJFbGVtZW50ID0gbmV3IFN0YXIoKS5lbGVtZW50O1xyXG4gICAgdGhpcy53cm9uZ1N0YXJFbGVtZW50ID0gbmV3IFN0YXIoJ3dyb25nJykuZWxlbWVudDtcclxuXHJcbiAgICB0aGlzLmFjdGl2ZVF1ZXN0aW9uID0gbnVsbDtcclxuICAgIHRoaXMuZWxlbWVudCA9IG51bGw7XHJcbiAgICB0aGlzLmxpdmVFbGVtZW50ID0gbnVsbDtcclxuICAgIHRoaXMubGl2ZUJ1dHRvbkVsZW1lbnQgPSBudWxsO1xyXG4gICAgdGhpcy5saXZlSW5kaWNhdG9yRWxlbWVudCA9IG51bGw7XHJcbiAgICB0aGlzLmxpdmVDb3JyZWN0UHJFbGVtZW50ID0gbnVsbDtcclxuICAgIHRoaXMubGl2ZVdyb25nUHJFbGVtZW50ID0gbnVsbDtcclxuICAgIHRoaXMubGl2ZVN0YXJzQ29sbGVjdGlvbiA9IG51bGw7XHJcbiAgICB0aGlzLmNvcnJlY3RBbnN3ZXJzID0gbnVsbDtcclxuICAgIHRoaXMud3JvbmdBbnN3ZXJzID0gbnVsbDtcclxuXHJcbiAgICB0aGlzLmJ1aWxkKCk7XHJcbiAgfVxyXG5cclxuICBidWlsZCgpIHtcclxuICAgIGNvbnN0IGNsYXNzTmFtZXMgPSAnZ2FtZS1jb250cm9scyBpbmFjdGl2ZSc7XHJcbiAgICBjb25zdCB0ZW1wbGF0ZSA9IGBcclxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiYnV0dG9uIGdhbWUtYnV0dG9uIHN0YXJ0LWJ1dHRvblwiPlxyXG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJnYW1lLXByb2dyZXNzIGluYWN0aXZlXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiZ2FtZS1pbmRpY2F0b3JcIj5cclxuICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICAgPHAgY2xhc3M9XCJnYW1lLXNjb3JlXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwicHJvZ3Jlc3MgY29ycmVjdFwiPjA8L3NwYW4+IHwgPHNwYW4gY2xhc3M9XCJwcm9ncmVzcyB3cm9uZ1wiPjA8L3NwYW4+XHJcbiAgICAgICAgICAgICAgICAgICAgICA8L3A+XHJcbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgYDtcclxuICAgIHRoaXMuZWxlbWVudCA9IGNyZWF0ZUN1c3RvbUVsZW1lbnQoJ2RpdicsIGNsYXNzTmFtZXMsIHRlbXBsYXRlKTtcclxuICAgIHJldHVybiB0aGlzO1xyXG4gIH1cclxuXHJcbiAgYWRkVG9Eb2MoKSB7XHJcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdoZWFkZXInKS5hcHBlbmQodGhpcy5lbGVtZW50KTtcclxuICAgIFt0aGlzLmxpdmVFbGVtZW50XSA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ2dhbWUtY29udHJvbHMnKTtcclxuICAgIFt0aGlzLmxpdmVCdXR0b25FbGVtZW50XSA9IHRoaXMubGl2ZUVsZW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnZ2FtZS1idXR0b24nKTtcclxuICAgIFt0aGlzLmxpdmVJbmRpY2F0b3JFbGVtZW50XSA9IHRoaXMubGl2ZUVsZW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnZ2FtZS1pbmRpY2F0b3InKTtcclxuICAgIFt0aGlzLmxpdmVDb3JyZWN0UHJFbGVtZW50LCB0aGlzLmxpdmVXcm9uZ1ByRWxlbWVudF0gPSB0aGlzLmxpdmVFbGVtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ3Byb2dyZXNzJyk7XHJcbiAgICB0aGlzLmxpdmVTdGFyc0NvbGxlY3Rpb24gPSB0aGlzLmxpdmVFbGVtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ3N0YXInKTtcclxuXHJcbiAgICByZXR1cm4gdGhpcztcclxuICB9XHJcblxyXG4gIHNob3coKSB7XHJcbiAgICB0aGlzLmxpdmVFbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUoJ2luYWN0aXZlJyk7XHJcbiAgICByZXR1cm4gdGhpcztcclxuICB9XHJcblxyXG4gIGhpZGUoKSB7XHJcbiAgICB0aGlzLmxpdmVFbGVtZW50LmNsYXNzTGlzdC5hZGQoJ2luYWN0aXZlJyk7XHJcbiAgICByZXR1cm4gdGhpcztcclxuICB9XHJcblxyXG4gIHNob3dHYW1lUHJvZ3Jlc3MoKSB7XHJcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZ2FtZS1wcm9ncmVzcycpLmNsYXNzTGlzdC5yZW1vdmUoJ2luYWN0aXZlJyk7XHJcbiAgICByZXR1cm4gdGhpcztcclxuICB9XHJcblxyXG4gIGhpZGVHYW1lUHJvZ3Jlc3MoKSB7XHJcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZ2FtZS1wcm9ncmVzcycpLmNsYXNzTGlzdC5hZGQoJ2luYWN0aXZlJyk7XHJcbiAgICByZXR1cm4gdGhpcztcclxuICB9XHJcblxyXG4gIGNyZWF0ZVJhbmRvbVF1ZXN0aW9uc0J1bmRsZShhcnJPcHRpb25zKSB7XHJcbiAgICB0aGlzLnF1ZXN0aW9uc0J1bmRsZSA9IFtdO1xyXG4gICAgY29uc3Qgd29ya0FyciA9IGFyck9wdGlvbnMubWFwKChpdGVtKSA9PiBpdGVtKTtcclxuICAgIHdoaWxlICh0aGlzLnF1ZXN0aW9uc0J1bmRsZS5sZW5ndGggPCBhcnJPcHRpb25zLmxlbmd0aCkge1xyXG4gICAgICBjb25zdCByYW5kb21JbmRleCA9IGdldFJhbmRvbUludCh3b3JrQXJyLmxlbmd0aCAtIDEpO1xyXG4gICAgICB0aGlzLnF1ZXN0aW9uc0J1bmRsZS5wdXNoKC4uLndvcmtBcnIuc3BsaWNlKHJhbmRvbUluZGV4LCAxKSk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gdGhpcztcclxuICB9XHJcblxyXG4gIHN0YXJ0R2FtZShhcnJPcHRpb25zKSB7XHJcbiAgICB0aGlzLmlzR2FtZVN0YXJ0ZWQgPSB0cnVlO1xyXG4gICAgdGhpcy5jb3JyZWN0QW5zd2VycyA9IDA7XHJcbiAgICB0aGlzLndyb25nQW5zd2VycyA9IDA7XHJcbiAgICB0aGlzLnNob3dHYW1lUHJvZ3Jlc3MoKTtcclxuICAgIHRoaXMuY3JlYXRlUmFuZG9tUXVlc3Rpb25zQnVuZGxlKGFyck9wdGlvbnMpO1xyXG4gICAgdGhpcy5hc2tRdWVzdGlvbigpO1xyXG4gICAgdGhpcy5jaGFuZ2VCdXR0b25DbGFzcygncmVwZWF0LWJ1dHRvbicpO1xyXG4gICAgcmV0dXJuIHRoaXM7XHJcbiAgfVxyXG5cclxuICBlbmRHYW1lKCkge1xyXG4gICAgdGhpcy5pc0dhbWVTdGFydGVkID0gZmFsc2U7XHJcbiAgICB0aGlzLmFjdGl2ZVF1ZXN0aW9uID0gbnVsbDtcclxuICAgIHRoaXMuaGlkZUdhbWVQcm9ncmVzcygpO1xyXG4gICAgdGhpcy5jaGFuZ2VCdXR0b25DbGFzcygnc3RhcnQtYnV0dG9uJyk7XHJcblxyXG4gICAgaWYgKHRoaXMuY29ycmVjdEFuc3dlcnMgPT09IHRoaXMuYXBwQ29udHJvbC5jb250ZW50LmdhbWVDYXJkc0NvbGxlY3Rpb24ubGVuZ3RoXHJcbiAgICAgICAgJiYgdGhpcy5jb3JyZWN0QW5zd2VycyAhPT0gMCkge1xyXG4gICAgICB0aGlzLmFwcENvbnRyb2wuY29udGVudC5wbGF5RmluYWxDbGlwKHRoaXMud3JvbmdBbnN3ZXJzKTtcclxuICAgICAgdGhpcy5jb3JyZWN0QW5zd2VycyA9IDA7XHJcbiAgICAgIHRoaXMud3JvbmdBbnN3ZXJzID0gMDtcclxuXHJcbiAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgIHRoaXMuYXBwQ29udHJvbC5jaGFuZ2VQYWdlKCdNYWluIHBhZ2UnKTtcclxuICAgICAgfSwgMzAwMCk7XHJcblxyXG4gICAgICB0aGlzLmNvcnJlY3RBbnN3ZXJzID0gMDtcclxuICAgICAgdGhpcy53cm9uZ0Fuc3dlcnMgPSAwO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMubGl2ZUNvcnJlY3RQckVsZW1lbnQuaW5uZXJIVE1MID0gJzAnO1xyXG4gICAgdGhpcy5saXZlV3JvbmdQckVsZW1lbnQuaW5uZXJIVE1MID0gJzAnO1xyXG4gICAgdGhpcy5saXZlSW5kaWNhdG9yRWxlbWVudC5pbm5lckhUTUwgPSAnJztcclxuICAgIHJldHVybiB0aGlzO1xyXG4gIH1cclxuXHJcbiAgYXNrUXVlc3Rpb24oKSB7XHJcbiAgICBpZiAodGhpcy5xdWVzdGlvbnNCdW5kbGUubGVuZ3RoICE9PSAwKSB7XHJcbiAgICAgIHRoaXMuYWN0aXZlUXVlc3Rpb24gPSB0aGlzLnF1ZXN0aW9uc0J1bmRsZS5wb3AoKTtcclxuICAgICAgdGhpcy5hcHBDb250cm9sLnBsYXlDYXJkU291bmQodGhpcy5hY3RpdmVRdWVzdGlvbik7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLmVuZEdhbWUoKTtcclxuICAgIH1cclxuICAgIHJldHVybiB0aGlzO1xyXG4gIH1cclxuXHJcbiAgcHJvY2Vzc0Fuc3dlcihjYXJkT2JqLCBjYXJkRWxlbWVudCkge1xyXG4gICAgaWYgKHRoaXMubGl2ZVN0YXJzQ29sbGVjdGlvbi5sZW5ndGggPj0gNSkge1xyXG4gICAgICB0aGlzLmxpdmVJbmRpY2F0b3JFbGVtZW50LmZpcnN0RWxlbWVudENoaWxkLnJlbW92ZSgpO1xyXG4gICAgfVxyXG5cclxuICAgIGlmIChPYmplY3QuZW50cmllcyh0aGlzLmFjdGl2ZVF1ZXN0aW9uKS5ldmVyeSgoW2tleSwgdmFsdWVdKSA9PiB2YWx1ZSA9PT0gY2FyZE9ialtrZXldKSkge1xyXG4gICAgICB0aGlzLmNvcnJlY3RBbnN3ZXIodGhpcy5hY3RpdmVRdWVzdGlvbik7XHJcbiAgICAgIGNhcmRFbGVtZW50LmNsYXNzTGlzdC5hZGQoJ2Rpc2FibGVkJyk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLndyb25nQW5zd2VyKHRoaXMuYWN0aXZlUXVlc3Rpb24pO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiB0aGlzO1xyXG4gIH1cclxuXHJcbiAgY29ycmVjdEFuc3dlcihjYXJkT2JqKSB7XHJcbiAgICB0aGlzLmFwcENvbnRyb2wucGxheUFwcFNvdW5kKCdjb3JyZWN0Jyk7XHJcbiAgICB0aGlzLmNvcnJlY3RBbnN3ZXJzICs9IDE7XHJcbiAgICB0aGlzLmFwcENvbnRyb2wuc3RhdC5zdG9yYWdlLmFkZCgnY29ycmVjdCcsIGNhcmRPYmopO1xyXG4gICAgdGhpcy5saXZlQ29ycmVjdFByRWxlbWVudC5pbm5lckhUTUwgPSB0aGlzLmNvcnJlY3RBbnN3ZXJzO1xyXG4gICAgdGhpcy5saXZlSW5kaWNhdG9yRWxlbWVudC5hcHBlbmQobmV3IFN0YXIoKS5lbGVtZW50KTtcclxuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICB0aGlzLmFza1F1ZXN0aW9uKCk7XHJcbiAgICB9LCAxMDAwKTtcclxuXHJcbiAgICByZXR1cm4gdGhpcztcclxuICB9XHJcblxyXG4gIHdyb25nQW5zd2VyKGNhcmRPYmopIHtcclxuICAgIHRoaXMuYXBwQ29udHJvbC5wbGF5QXBwU291bmQoJ3dyb25nJyk7XHJcbiAgICB0aGlzLndyb25nQW5zd2VycyArPSAxO1xyXG4gICAgdGhpcy5hcHBDb250cm9sLnN0YXQuc3RvcmFnZS5hZGQoJ3dyb25nJywgY2FyZE9iaik7XHJcbiAgICB0aGlzLmxpdmVXcm9uZ1ByRWxlbWVudC5pbm5lckhUTUwgPSB0aGlzLndyb25nQW5zd2VycztcclxuICAgIHRoaXMubGl2ZUluZGljYXRvckVsZW1lbnQuYXBwZW5kKG5ldyBTdGFyKCd3cm9uZycpLmVsZW1lbnQpO1xyXG4gICAgcmV0dXJuIHRoaXM7XHJcbiAgfVxyXG5cclxuICByZXBlYXRRdWVzdGlvbigpIHtcclxuICAgIHRoaXMuYXBwQ29udHJvbC5wbGF5Q2FyZFNvdW5kKHRoaXMuYWN0aXZlUXVlc3Rpb24pO1xyXG4gICAgcmV0dXJuIHRoaXM7XHJcbiAgfVxyXG5cclxuICBjaGFuZ2VCdXR0b25DbGFzcyhidXR0b25DbGFzc05hbWUpIHtcclxuICAgIGNvbnN0IHJlbW92ZWRDbGFzc05hbWUgPSAoYnV0dG9uQ2xhc3NOYW1lID09PSAnc3RhcnQtYnV0dG9uJykgPyAncmVwZWF0LWJ1dHRvbicgOiAnc3RhcnQtYnV0dG9uJztcclxuICAgIHRoaXMubGl2ZUJ1dHRvbkVsZW1lbnQuY2xhc3NMaXN0LmFkZChidXR0b25DbGFzc05hbWUpO1xyXG4gICAgdGhpcy5saXZlQnV0dG9uRWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKHJlbW92ZWRDbGFzc05hbWUpO1xyXG4gICAgcmV0dXJuIHRoaXM7XHJcbiAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBnYW1lQ29udHJvbDtcclxuIiwiLyogZXNsaW50LWRpc2FibGUgbGluZWJyZWFrLXN0eWxlICovXHJcbmNvbnN0IG1haW5DYXJkcyA9IFtcclxuICB7XHJcbiAgICB0b3BpYzogJ0FjdGlvbiAoc2V0IEEpJyxcclxuICAgIGltYWdlOiAnaW1nL2FwcC9tYWluLTAwMS5wbmcnLFxyXG4gIH0sXHJcbiAge1xyXG4gICAgdG9waWM6ICdBY3Rpb24gKHNldCBCKScsXHJcbiAgICBpbWFnZTogJ2ltZy9hcHAvbWFpbi0wMDIucG5nJyxcclxuICB9LFxyXG4gIHtcclxuICAgIHRvcGljOiAnQW5pbWFsIChzZXQgQSknLFxyXG4gICAgaW1hZ2U6ICdpbWcvYXBwL21haW4tMDAzLnBuZycsXHJcbiAgfSxcclxuICB7XHJcbiAgICB0b3BpYzogJ0FuaW1hbCAoc2V0IEIpJyxcclxuICAgIGltYWdlOiAnaW1nL2FwcC9tYWluLTAwNC5wbmcnLFxyXG4gIH0sXHJcbiAge1xyXG4gICAgdG9waWM6ICdDbG90aGVzJyxcclxuICAgIGltYWdlOiAnaW1nL2FwcC9tYWluLTAwNS5wbmcnLFxyXG4gIH0sXHJcbiAge1xyXG4gICAgdG9waWM6ICdFbW90aW9ucycsXHJcbiAgICBpbWFnZTogJ2ltZy9hcHAvbWFpbi0wMDYucG5nJyxcclxuICB9LFxyXG4gIHtcclxuICAgIHRvcGljOiAnRm9vZCcsXHJcbiAgICBpbWFnZTogJ2ltZy9hcHAvbWFpbi0wMDcucG5nJyxcclxuICB9LFxyXG4gIHtcclxuICAgIHRvcGljOiAnR2VvZ3JhcGh5JyxcclxuICAgIGltYWdlOiAnaW1nL2FwcC9tYWluLTAwOC5wbmcnLFxyXG4gIH0sXHJcbl07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBtYWluQ2FyZHM7XHJcbiIsIi8qIGVzbGludC1kaXNhYmxlIGxpbmVicmVhay1zdHlsZSAqL1xyXG4vKiBlc2xpbnQtZGlzYWJsZSBuby1jb25zb2xlICovXHJcbi8qIGVzbGludC1kaXNhYmxlIGxpbmVicmVhay1zdHlsZSAqL1xyXG4vKiBlc2xpbnQtZGlzYWJsZSBjb25zaXN0ZW50LXJldHVybiAqL1xyXG4vKiBlc2xpbnQtZGlzYWJsZSBuby1yZXN0cmljdGVkLXN5bnRheCAqL1xyXG4vKiBlc2xpbnQtZGlzYWJsZSBuby11bmRlZiAqL1xyXG5cclxuaW1wb3J0IHtcclxuICBjcmVhdGVDdXN0b21FbGVtZW50LFxyXG59IGZyb20gJy4vY29tbW9uRnVuY3QnO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTWVudUVsZW1lbnQge1xyXG4gIGNvbnN0cnVjdG9yKHRvcGljc0Fyciwgc3RhcnRNZW51ID0gJ01haW4gcGFnZScsIGVuZE1lbnUgPSAnU3RhdGlzdGljJykge1xyXG4gICAgdGhpcy5vcGVuZWRNZW51Q29sbGVjdGlvbnMgPSBbXHJcbiAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKCdib2R5JyksXHJcbiAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ21lbnUnKSxcclxuICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnbWVudS1idXR0b24nKSxcclxuICAgIF07XHJcbiAgICB0aGlzLnRvcGljc0FyciA9IHRvcGljc0FycjtcclxuICAgIHRoaXMuc3RhcnRNZW51ID0gc3RhcnRNZW51O1xyXG4gICAgdGhpcy5lbmRNZW51ID0gZW5kTWVudTtcclxuICAgIHRoaXMuYWN0aXZlUGFnZSA9IHRoaXMuc3RhcnRNZW51LnRvTG93ZXJDYXNlKCk7XHJcbiAgICB0aGlzLm1lbnVJdGVtc0VsZW1lbnRzID0gbnVsbDtcclxuICAgIHRoaXMuZWxlbWVudCA9IG51bGw7XHJcblxyXG4gICAgdGhpcy5idWlsZCgpO1xyXG4gIH1cclxuXHJcbiAgYnVpbGQoKSB7XHJcbiAgICBmdW5jdGlvbiBjcmVhdGVMaSh0b3BpY05hbWUgPSAnJykge1xyXG4gICAgICBjb25zdCBlbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGknKTtcclxuICAgICAgZWxlbWVudC5jbGFzc05hbWUgPSAnYnV0dG9uIG1lbnUtaXRlbSc7XHJcbiAgICAgIGVsZW1lbnQuaW5uZXJIVE1MID0gdG9waWNOYW1lO1xyXG4gICAgICByZXR1cm4gZWxlbWVudDtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCB1bEVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd1bCcpO1xyXG4gICAgdWxFbGVtZW50LmNsYXNzTmFtZSA9ICdtZW51LWxpc3QnO1xyXG5cclxuICAgIHVsRWxlbWVudC5hcHBlbmQoY3JlYXRlTGkodGhpcy5zdGFydE1lbnUpKTtcclxuICAgIHRoaXMudG9waWNzQXJyLmZvckVhY2goKHRvcGljTmFtZSkgPT4gdWxFbGVtZW50LmFwcGVuZChjcmVhdGVMaSh0b3BpY05hbWUpKSk7XHJcbiAgICB1bEVsZW1lbnQuYXBwZW5kKGNyZWF0ZUxpKHRoaXMuZW5kTWVudSkpO1xyXG5cclxuICAgIGNvbnN0IGJ1dHRvblRlbXBsYXRlID0gYFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImJ1dHRvbiBjbG9zZS1tZW51XCI+PC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBgO1xyXG5cclxuICAgIGNvbnN0IG1lbnVFbGVtZW50ID0gY3JlYXRlQ3VzdG9tRWxlbWVudCgnbmF2JywgJ21lbnUnLCBidXR0b25UZW1wbGF0ZSk7XHJcbiAgICBtZW51RWxlbWVudC5hcHBlbmQodWxFbGVtZW50KTtcclxuICAgIHRoaXMuZWxlbWVudCA9IG1lbnVFbGVtZW50O1xyXG4gICAgcmV0dXJuIHRoaXM7XHJcbiAgfVxyXG5cclxuICBhZGRUb0RvYygpIHtcclxuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5tYWluLWNvbnRyb2xzJykucHJlcGVuZCh0aGlzLmVsZW1lbnQpO1xyXG4gICAgdGhpcy5tZW51SXRlbXNFbGVtZW50cyA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ21lbnUtaXRlbScpO1xyXG4gICAgdGhpcy5zZXRBY3RpdmVUb3BpYyh0aGlzLm1lbnVJdGVtc0VsZW1lbnRzWzBdLmlubmVySFRNTCk7XHJcbiAgICByZXR1cm4gdGhpcztcclxuICB9XHJcblxyXG4gIHRvZ2dsZSgpIHtcclxuICAgIHRoaXMub3BlbmVkTWVudUNvbGxlY3Rpb25zLm1hcCgoaHRtbENvbGxlY3Rpb24pID0+IGh0bWxDb2xsZWN0aW9uWzBdLmNsYXNzTGlzdC50b2dnbGUoJ29wZW5lZC1tZW51JykpO1xyXG4gICAgcmV0dXJuIHRoaXM7XHJcbiAgfVxyXG5cclxuICBjbG9zZSgpIHtcclxuICAgIHRoaXMub3BlbmVkTWVudUNvbGxlY3Rpb25zLm1hcCgoaHRtbENvbGxlY3Rpb24pID0+IGh0bWxDb2xsZWN0aW9uWzBdLmNsYXNzTGlzdC5yZW1vdmUoJ29wZW5lZC1tZW51JykpO1xyXG4gIH1cclxuXHJcbiAgc2V0QWN0aXZlVG9waWModG9waWNOYW1lKSB7XHJcbiAgICBjb25zdCBjbGFzc05hbWUgPSAnYWN0aXZlLXBhZ2UnO1xyXG4gICAgY29uc3QgdG9waWNFbGVtZW50ID0gdGhpcy5nZXRNZW51SXRlbUJ5TmFtZSh0b3BpY05hbWUpO1xyXG4gICAgdGhpcy5hY3RpdmVQYWdlID0gdG9waWNOYW1lLnRvTG93ZXJDYXNlKCk7XHJcbiAgICBmb3IgKGNvbnN0IG1lbnVJdGVtRWxlbWVudCBvZiB0aGlzLm1lbnVJdGVtc0VsZW1lbnRzKSB7XHJcbiAgICAgIG1lbnVJdGVtRWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKGNsYXNzTmFtZSk7XHJcbiAgICB9XHJcbiAgICB0b3BpY0VsZW1lbnQuY2xhc3NMaXN0LmFkZChjbGFzc05hbWUpO1xyXG5cclxuICAgIHJldHVybiB0aGlzO1xyXG4gIH1cclxuXHJcbiAgZ2V0TWVudUl0ZW1CeU5hbWUoaXRlbU5hbWUpIHtcclxuICAgIGZvciAoY29uc3QgZWxlbWVudCBvZiB0aGlzLm1lbnVJdGVtc0VsZW1lbnRzKSB7XHJcbiAgICAgIGlmIChlbGVtZW50LmlubmVySFRNTC50b0xvd2VyQ2FzZSgpID09PSBpdGVtTmFtZS50b0xvd2VyQ2FzZSgpKSB7XHJcbiAgICAgICAgcmV0dXJuIGVsZW1lbnQ7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcbn1cclxuIiwiLyogZXNsaW50LWRpc2FibGUgbGluZWJyZWFrLXN0eWxlICovXHJcblxyXG5pbXBvcnQgeyBjcmVhdGVDdXN0b21FbGVtZW50IH0gZnJvbSAnLi9jb21tb25GdW5jdCc7XHJcblxyXG5jbGFzcyBTdGFyIHtcclxuICBjb25zdHJ1Y3Rvcih0eXBlID0gJ2NvcnJlY3QnKSB7XHJcbiAgICB0aGlzLnR5cGUgPSAodHlwZSA9PT0gJ2NvcnJlY3QnKSA/IHR5cGUgOiAnd3JvbmcnO1xyXG4gICAgY29uc3QgY2xhc3NOYW1lcyA9IGBncmFwaGljIHN0YXIgc3Rhci0ke3RoaXMudHlwZX1gO1xyXG4gICAgbGV0IGltYWdlU3JjO1xyXG5cclxuICAgIGlmICh0aGlzLnR5cGUgPT09ICdjb3JyZWN0Jykge1xyXG4gICAgICBpbWFnZVNyYyA9ICdhcHAvc3Rhci13aW4uc3ZnJztcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGltYWdlU3JjID0gJ2FwcC9zdGFyLnN2Zyc7XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgdGVtcGxhdGUgPSBgXHJcbiAgICAgICAgICAgICAgICAgICAgICA8aW1nIGNsYXNzPVwic3Rhci1pbWFnZVwiIHNyYz1cIi4uL2Fzc2V0cy9pbWcvJHtpbWFnZVNyY31cIiBhbHQ9XCIke3RoaXMudHlwZX0gc3RhclwiIHdpZHRoPVwiNDBcIiBoZWlnaHQ9XCI0MFwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgYDtcclxuICAgIHRoaXMuZWxlbWVudCA9IGNyZWF0ZUN1c3RvbUVsZW1lbnQoJ2RpdicsIGNsYXNzTmFtZXMsIHRlbXBsYXRlKTtcclxuICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IFN0YXI7XHJcbiIsIi8qIGVzbGludC1kaXNhYmxlIGxpbmVicmVhay1zdHlsZSAqL1xyXG4vKiBlc2xpbnQtZGlzYWJsZSBuby1jb25zb2xlICovXHJcbi8qIGVzbGludC1kaXNhYmxlIGxpbmVicmVhay1zdHlsZSAqL1xyXG4vKiBlc2xpbnQtZGlzYWJsZSBuby11bmRlZiAqL1xyXG4vKiBlc2xpbnQtZGlzYWJsZSBsaW5lYnJlYWstc3R5bGUgKi9cclxuXHJcbmNsYXNzIFN0YXRTdG9yYWdlIHtcclxuICBjb25zdHJ1Y3Rvcih0b3BpY3NBcnIsIGNhcmRzQXJyKSB7XHJcbiAgICB0aGlzLnRvcGljc0FyciA9IHRvcGljc0FycjtcclxuICAgIHRoaXMuY2FyZHNBcnIgPSBjYXJkc0FycjtcclxuICAgIHRoaXMuc3RhdEFyciA9IEpTT04ucGFyc2UobG9jYWxTdG9yYWdlLmdldEl0ZW0oJ0VuZ2xpc2hGb3JLaWRzJykpO1xyXG4gICAgaWYgKCF0aGlzLnN0YXRBcnIpIHtcclxuICAgICAgdGhpc1xyXG4gICAgICAgIC5idWlsZCgpXHJcbiAgICAgICAgLnVwZGF0ZVN0b3JhZ2UoKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGJ1aWxkKCkge1xyXG4gICAgY29uc3Qgc3RhdERhdGFBcnIgPSBbXTtcclxuICAgIHRoaXMudG9waWNzQXJyLmZvckVhY2goKHRvcGlOYW1lLCBpbmRleCkgPT4ge1xyXG4gICAgICBjb25zdCB0b3BpY0NhcmRzQXJyID0gdGhpcy5jYXJkc0FycltpbmRleF07XHJcblxyXG4gICAgICB0b3BpY0NhcmRzQXJyLmZvckVhY2goKHdvcmRPYmopID0+IHtcclxuICAgICAgICBjb25zdCBzdGF0V29yZE9iaiA9IHtcclxuICAgICAgICAgIHRvcGljOiB0b3BpTmFtZSxcclxuICAgICAgICAgIHdvcmQ6IHdvcmRPYmoud29yZCxcclxuICAgICAgICAgIHRyYW5zbGF0aW9uOiB3b3JkT2JqLnRyYW5zbGF0aW9uLFxyXG4gICAgICAgICAgdHJhaW5DbGljazogMCxcclxuICAgICAgICAgIGNvcnJlY3RBbnN3ZXJzOiAwLFxyXG4gICAgICAgICAgbWlzdGFrZXM6IDAsXHJcbiAgICAgICAgICBwZXJjZW50YWdlOiAwLFxyXG4gICAgICAgICAgaW1hZ2U6IHdvcmRPYmouaW1hZ2UsXHJcbiAgICAgICAgICBhdWRpb1NyYzogd29yZE9iai5hdWRpb1NyYyxcclxuICAgICAgICB9O1xyXG4gICAgICAgIHN0YXREYXRhQXJyLnB1c2goc3RhdFdvcmRPYmopO1xyXG4gICAgICB9KTtcclxuICAgIH0pO1xyXG4gICAgdGhpcy5zdGF0QXJyID0gc3RhdERhdGFBcnI7XHJcbiAgICByZXR1cm4gdGhpcztcclxuICB9XHJcblxyXG4gIHVwZGF0ZVN0b3JhZ2UoKSB7XHJcbiAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnRW5nbGlzaEZvcktpZHMnLCBKU09OLnN0cmluZ2lmeSh0aGlzLnN0YXRBcnIpKTtcclxuICAgIHJldHVybiB0aGlzO1xyXG4gIH1cclxuXHJcbiAgY2xlYW5TdG9yYWdlKCkge1xyXG4gICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ0VuZ2xpc2hGb3JLaWRzJywgSlNPTi5zdHJpbmdpZnkoJycpKTtcclxuICAgIHRoaXNcclxuICAgICAgLmJ1aWxkKClcclxuICAgICAgLnVwZGF0ZVN0b3JhZ2UoKTtcclxuICAgIHJldHVybiB0aGlzO1xyXG4gIH1cclxuXHJcbiAgYWRkKHR5cGUsIGNhcmRPYmopIHtcclxuICAgIGNvbnN0IG9iakluZGV4ID0gdGhpcy5zdGF0QXJyLmZpbmRJbmRleCgod29yZE9iaikgPT4ge1xyXG4gICAgICBjb25zdCByZXN1bHQgPSAod29yZE9iai53b3JkID09PSBjYXJkT2JqLndvcmQpXHJcbiAgICAgICAgICAgICYmICh3b3JkT2JqLnRyYW5zbGF0aW9uID09PSBjYXJkT2JqLnRyYW5zbGF0aW9uKTtcclxuICAgICAgcmV0dXJuIHJlc3VsdDtcclxuICAgIH0pO1xyXG5cclxuICAgIHN3aXRjaCAodHlwZSkge1xyXG4gICAgICBjYXNlICdjbGljayc6IHtcclxuICAgICAgICB0aGlzLnN0YXRBcnJbb2JqSW5kZXhdLnRyYWluQ2xpY2sgKz0gMTtcclxuICAgICAgICBicmVhaztcclxuICAgICAgfVxyXG4gICAgICBjYXNlICdjb3JyZWN0Jzoge1xyXG4gICAgICAgIHRoaXMuc3RhdEFycltvYmpJbmRleF0uY29ycmVjdEFuc3dlcnMgKz0gMTtcclxuICAgICAgICBicmVhaztcclxuICAgICAgfVxyXG4gICAgICBjYXNlICd3cm9uZyc6IHtcclxuICAgICAgICB0aGlzLnN0YXRBcnJbb2JqSW5kZXhdLm1pc3Rha2VzICs9IDE7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIH1cclxuICAgICAgZGVmYXVsdDpcclxuICAgICAgICBicmVhaztcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBjb3JyQW5zdyA9IHRoaXMuc3RhdEFycltvYmpJbmRleF0uY29ycmVjdEFuc3dlcnM7XHJcbiAgICBjb25zdCB3cm9uZ0Fuc3cgPSB0aGlzLnN0YXRBcnJbb2JqSW5kZXhdLm1pc3Rha2VzO1xyXG4gICAgaWYgKGNvcnJBbnN3ICYmIHdyb25nQW5zdykge1xyXG4gICAgICB0aGlzLnN0YXRBcnJbb2JqSW5kZXhdLnBlcmNlbnRhZ2UgPSBNYXRoLnJvdW5kKChjb3JyQW5zdyAvIChjb3JyQW5zdyArIHdyb25nQW5zdykpICogMTAwKTtcclxuICAgIH0gZWxzZSBpZiAoY29yckFuc3cpIHtcclxuICAgICAgdGhpcy5zdGF0QXJyW29iakluZGV4XS5wZXJjZW50YWdlID0gMTAwO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMudXBkYXRlU3RvcmFnZSgpO1xyXG4gICAgcmV0dXJuIHRoaXM7XHJcbiAgfVxyXG5cclxuICBnZXRTb3J0ZWRBcnJCeVByb3AocHJvcGVydHksIHNvcnRUeXBlID0gJ2Rvd24nKSB7XHJcbiAgICBjb25zdCBzb3J0ZWRBcnIgPSBbXTtcclxuICAgIHRoaXMuc3RhdEFyci5mb3JFYWNoKChpdGVtKSA9PiBzb3J0ZWRBcnIucHVzaChpdGVtKSk7XHJcblxyXG4gICAgZnVuY3Rpb24gY29tcGFyZUZ1bmN0aW9uKG9iakEsIG9iakIpIHtcclxuICAgICAgaWYgKG9iakFbcHJvcGVydHldID4gb2JqQltwcm9wZXJ0eV0pIHtcclxuICAgICAgICByZXR1cm4gMTtcclxuICAgICAgfVxyXG4gICAgICBpZiAob2JqQVtwcm9wZXJ0eV0gPCBvYmpCW3Byb3BlcnR5XSkge1xyXG4gICAgICAgIHJldHVybiAtMTtcclxuICAgICAgfVxyXG4gICAgICByZXR1cm4gMDtcclxuICAgIH1cclxuXHJcbiAgICBpZiAoc29ydFR5cGUgPT09ICdkb3duJykge1xyXG4gICAgICBzb3J0ZWRBcnIuc29ydCgoYSwgYikgPT4gY29tcGFyZUZ1bmN0aW9uKGEsIGIpKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHNvcnRlZEFyci5zb3J0KChhLCBiKSA9PiBjb21wYXJlRnVuY3Rpb24oYiwgYSkpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHNvcnRlZEFycjtcclxuICB9XHJcblxyXG4gIGdldERpZmZXb3Jkc0FycigpIHtcclxuICAgIGNvbnN0IHNvcnRlZEFyciA9IHRoaXMuZ2V0U29ydGVkQXJyQnlQcm9wKCdwZXJjZW50YWdlJywgJ2Rvd24nKTtcclxuICAgIGNvbnN0IHJlc3VsdEFyciA9IHNvcnRlZEFyci5maWx0ZXIoKGl0ZW0pID0+IGl0ZW0ucGVyY2VudGFnZSA+IDAgJiYgaXRlbS5wZXJjZW50YWdlIDwgMTAwKTtcclxuICAgIHJldHVybiByZXN1bHRBcnI7XHJcbiAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBTdGF0U3RvcmFnZTtcclxuIiwiLyogZXNsaW50LWRpc2FibGUgbGluZWJyZWFrLXN0eWxlICovXHJcbi8qIGVzbGludC1kaXNhYmxlIGNsYXNzLW1ldGhvZHMtdXNlLXRoaXMgKi9cclxuLyogZXNsaW50LWRpc2FibGUgbGluZWJyZWFrLXN0eWxlICovXHJcbi8qIGVzbGludC1kaXNhYmxlIG5vLWNvbnNvbGUgKi9cclxuLyogZXNsaW50LWRpc2FibGUgbGluZWJyZWFrLXN0eWxlICovXHJcbi8qIGVzbGludC1kaXNhYmxlIG5vLXVuZGVmICovXHJcbi8qIGVzbGludC1kaXNhYmxlIGxpbmVicmVhay1zdHlsZSAqL1xyXG5cclxuaW1wb3J0IFN0YXRTdG9yYWdlIGZyb20gJy4vc3RhdFN0b3JhZ2UnO1xyXG5pbXBvcnQgQ2FyZCBmcm9tICcuL2NhcmQnO1xyXG5cclxuaW1wb3J0IHtcclxuICBjcmVhdGVDdXN0b21FbGVtZW50LFxyXG59IGZyb20gJy4vY29tbW9uRnVuY3QnO1xyXG5cclxuY2xhc3MgU3RhdGlzdGljIHtcclxuICBjb25zdHJ1Y3RvcihhcHBDb250cm9sKSB7XHJcbiAgICB0aGlzLmFwcENvbnRyb2wgPSBhcHBDb250cm9sO1xyXG4gICAgdGhpcy5zdG9yYWdlID0gbmV3IFN0YXRTdG9yYWdlKGFwcENvbnRyb2wudG9waWNzQXJyLCBhcHBDb250cm9sLmNhcmRzQXJyKTtcclxuICAgIHRoaXMuc29ydGVkID0gZmFsc2U7XHJcbiAgICB0aGlzLnNvcnRUeXBlID0gbnVsbDtcclxuICAgIHRoaXMuc29ydFByb3BlcnR5ID0gbnVsbDtcclxuICAgIHRoaXMuZWxlbWVudCA9IG51bGw7XHJcbiAgICB0aGlzLnByb3BzTGliID0ge1xyXG4gICAgICBDYXRlZ29yeTogJ3RvcGljJyxcclxuICAgICAgV29yZDogJ3dvcmQnLFxyXG4gICAgICBUcmFuc2xhdGlvbjogJ3RyYW5zbGF0aW9uJyxcclxuICAgICAgVHJhaW46ICd0cmFpbkNsaWNrJyxcclxuICAgICAgQ29ycmVjdDogJ2NvcnJlY3RBbnN3ZXJzJyxcclxuICAgICAgTWlzdGFrZXM6ICdtaXN0YWtlcycsXHJcbiAgICAgICclJzogJ3BlcmNlbnRhZ2UnLFxyXG4gICAgfTtcclxuICAgIHRoaXMuYnVpbGQoKTtcclxuICB9XHJcblxyXG4gIGJ1aWxkKGRhdGFBcnIgPSB0aGlzLnN0b3JhZ2Uuc3RhdEFycikge1xyXG4gICAgY29uc3QgY2xhc3NOYW1lcyA9ICdzdGF0LWNvbnRhaW5lcic7XHJcbiAgICBjb25zdCBzdGF0Q29udGVudEVsZW1lbnQgPSAodGhpcy5hcHBDb250cm9sLmNvbnRlbnQudHlwZSA9PT0gJ3N0YXRpc3RpYycpXHJcbiAgICAgID8gdGhpcy5jcmVhdGVUYWJsZUVsZW1lbnQoZGF0YUFycilcclxuICAgICAgOiB0aGlzLmNyZWF0ZVRyYWluRGlmZkNvbnRhaW5lcigpO1xyXG5cclxuICAgIGNvbnN0IHRlbXBsYXRlID0gYFxyXG4gICAgICAgICAgICAgICAgICAgICAgPGgyPkdhbWUgU3RhdGlzdGljPC9oMj5cclxuICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJzdGF0LWJ1dHRvbnMtd3JhcHBlclwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiYnV0dG9uIHN0YXQtYnV0dG9uIHRyYWluLWRpZmZcIj5UcmFpbiBkaWZmaWN1bHQgd29yZHM8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImJ1dHRvbiBzdGF0LWJ1dHRvbiByZXNldC1zdGF0XCI+UmVzZXQgc3RhdHM8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgIGA7XHJcblxyXG4gICAgY29uc3Qgc3RhdEVsZW1lbnQgPSBjcmVhdGVDdXN0b21FbGVtZW50KCdkaXYnLCBjbGFzc05hbWVzLCB0ZW1wbGF0ZSk7XHJcblxyXG4gICAgc3RhdEVsZW1lbnQuYXBwZW5kKHN0YXRDb250ZW50RWxlbWVudCk7XHJcbiAgICB0aGlzLmVsZW1lbnQgPSBzdGF0RWxlbWVudDtcclxuICAgIHJldHVybiB0aGlzO1xyXG4gIH1cclxuXHJcbiAgY3JlYXRlVGFibGVFbGVtZW50KGRhdGFBcnIpIHtcclxuICAgIGNvbnN0IHRhYmxlRWxlbWVudCA9IGNyZWF0ZUN1c3RvbUVsZW1lbnQoJ2RpdicsICd0YWJsZS13cmFwcGVyJyk7XHJcblxyXG4gICAgbGV0IHRhYmxlQm9keUlubmVyID0gJyc7XHJcbiAgICBkYXRhQXJyLmZvckVhY2goKHdvcmRPYmopID0+IHtcclxuICAgICAgY29uc3Qgcm93VGVtcGxhdGUgPSBgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgPHRyPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRkPiR7d29yZE9iai50b3BpY308L3RoPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRkPiR7d29yZE9iai53b3JkfTwvdGg+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dGQ+JHt3b3JkT2JqLnRyYW5zbGF0aW9ufTwvdGg+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dGQ+JHt3b3JkT2JqLnRyYWluQ2xpY2t9PC90aD5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0ZD4ke3dvcmRPYmouY29ycmVjdEFuc3dlcnN9PC90aD5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0ZD4ke3dvcmRPYmoubWlzdGFrZXN9PC90aD5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0ZD4ke3dvcmRPYmoucGVyY2VudGFnZX0mbmJzcDslPC90aD5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICA8L3RyPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIGA7XHJcbiAgICAgIHRhYmxlQm9keUlubmVyICs9IHJvd1RlbXBsYXRlO1xyXG4gICAgfSk7XHJcblxyXG4gICAgY29uc3QgdGhDbGFzc05hbWVzID0gJ2J1dHRvbiBzb3J0YWJsZSc7XHJcbiAgICBjb25zdCB0aFRpdGxlID0gJ3NvcnQnO1xyXG4gICAgbGV0IHRoZWFkUm93SW5uZXIgPSAnJztcclxuXHJcbiAgICBPYmplY3QuZW50cmllcyh0aGlzLnByb3BzTGliKS5mb3JFYWNoKChbY29sdW1uTmFtZSwgcHJvcE5hbWVdKSA9PiB7XHJcbiAgICAgIGxldCBzb3J0Q2xhc3NOYW1lID0gJyc7XHJcbiAgICAgIGxldCBpbWFnZUhUTUwgPSAnJztcclxuXHJcbiAgICAgIGlmICh0aGlzLnNvcnRlZCAmJiAodGhpcy5zb3J0UHJvcGVydHkgPT09IHByb3BOYW1lKSkge1xyXG4gICAgICAgIHNvcnRDbGFzc05hbWUgPSBgIHNvcnRlZCBzb3J0ZWQtJHt0aGlzLnNvcnRUeXBlfWA7XHJcbiAgICAgICAgY29uc3QgaW1hZ2VOYW1lID0gKHRoaXMuc29ydFR5cGUgPT09ICdkb3duJykgPyAnc29ydC1hc2MnIDogJ3NvcnQtZGVzYyc7XHJcbiAgICAgICAgaW1hZ2VIVE1MID0gYFxyXG4gICAgICAgICAgICAgICAgICAgIDxpbWcgY2xhc3M9XCJzb3J0LWljb24gYnV0dG9uIHNvcnRhYmxlXCIgc3JjPS4uL2Fzc2V0cy9pY29ucy8ke2ltYWdlTmFtZX0ucG5nIGFsdD1cInNvcnQgaWNvblwiIHdpZHRoPVwiNTFcIiBoZWlnaHQ9XCI1MVwiPjwvaW1nPlxyXG4gICAgICAgICAgICAgICAgICAgIGA7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHRoZWFkUm93SW5uZXIgKz0gYFxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8dGggY2xhc3M9XCJ0aGVhZCAke3RoQ2xhc3NOYW1lc30ke3NvcnRDbGFzc05hbWV9XCIgdGl0bGU9XCIke3RoVGl0bGV9XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJ0aE5hbWUgYnV0dG9uIHNvcnRhYmxlXCI+JHtjb2x1bW5OYW1lfTwvc3Bhbj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAke2ltYWdlSFRNTH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgPC90aD5cclxuICAgICAgICAgICAgICAgICAgICAgICAgYDtcclxuICAgIH0pO1xyXG5cclxuICAgIGNvbnN0IHRhYmxlSW5uZXJIVE1MID0gYFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIDx0YWJsZSBjbGFzcz1cInN0YXQtdGFibGVcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0aGVhZD5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRyPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICR7dGhlYWRSb3dJbm5lcn1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC90cj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvdGhlYWQ+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dGJvZHk+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICR7dGFibGVCb2R5SW5uZXJ9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3Rib2R5PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIDwvdGFibGU+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGA7XHJcblxyXG4gICAgdGFibGVFbGVtZW50LmlubmVySFRNTCA9IHRhYmxlSW5uZXJIVE1MO1xyXG5cclxuICAgIHJldHVybiB0YWJsZUVsZW1lbnQ7XHJcbiAgfVxyXG5cclxuICBjcmVhdGVUcmFpbkRpZmZDb250YWluZXIoKSB7XHJcbiAgICBsZXQgcmVzdWx0RWxlbWVudDtcclxuICAgIGNvbnN0IGRpZmZXb3Jkc0FyciA9IHRoaXMuc3RvcmFnZS5nZXREaWZmV29yZHNBcnIoKTtcclxuICAgIGNvbnN0IGRpZmZXb3Jkc0Ftb3VudCA9IGRpZmZXb3Jkc0Fyci5sZW5ndGg7XHJcblxyXG4gICAgc3dpdGNoIChkaWZmV29yZHNBbW91bnQpIHtcclxuICAgICAgY2FzZSAwOiB7XHJcbiAgICAgICAgY29uc3QgdGVtcGxhdGUgPSBgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImdyYXBoaWNcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxpbWcgc3JjPVwiLi4vYXNzZXRzL2ltZy9hcHAvd2F0ZXJjb2xvci1oZXJvLTAxLnBuZ1wiIGFsdD1cInN1cGVyIHJlc3VsdFwiIHdpZHRoPVwiNzUzXCIgaGVpZ2h0PVwiNTUzXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgPHA+Tm90aGluZyBkaWZmaWN1bHQgaXMhPC9wPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBgO1xyXG5cclxuICAgICAgICByZXN1bHRFbGVtZW50ID0gY3JlYXRlQ3VzdG9tRWxlbWVudCgnZGl2JywgJ25vdGhpbmctZGlmZicsIHRlbXBsYXRlKTtcclxuICAgICAgICBicmVhaztcclxuICAgICAgfVxyXG4gICAgICBkZWZhdWx0OiB7XHJcbiAgICAgICAgY29uc3QgY2FyZHNDb250YWluZXJFbGVtZW50ID0gY3JlYXRlQ3VzdG9tRWxlbWVudCgnZGl2JywgJ2NhcmQtY29udGFpbmVyJyk7XHJcbiAgICAgICAgY29uc3QgbWF4Q2FyZHNBbW91bnQgPSA4O1xyXG4gICAgICAgIGNvbnN0IGNhcmRzQW1vdW50ID0gKGRpZmZXb3Jkc0Fyci5sZW5ndGggPCBtYXhDYXJkc0Ftb3VudClcclxuICAgICAgICAgID8gZGlmZldvcmRzQW1vdW50XHJcbiAgICAgICAgICA6IG1heENhcmRzQW1vdW50O1xyXG5cclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGNhcmRzQW1vdW50OyBpICs9IDEpIHtcclxuICAgICAgICAgIGNvbnN0IGNhcmRPYmogPSBkaWZmV29yZHNBcnJbaV07XHJcbiAgICAgICAgICBjb25zdCBjYXJkRWxlbWVudCA9IG5ldyBDYXJkKHRoaXMuYXBwQ29udHJvbCwgY2FyZE9iaiwgJ3RvcGljJykuZWxlbWVudDtcclxuICAgICAgICAgIGNhcmRzQ29udGFpbmVyRWxlbWVudC5hcHBlbmQoY2FyZEVsZW1lbnQpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmVzdWx0RWxlbWVudCA9IGNhcmRzQ29udGFpbmVyRWxlbWVudDtcclxuICAgICAgICBicmVhaztcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiByZXN1bHRFbGVtZW50O1xyXG4gIH1cclxuXHJcbiAgc29ydFRhYmxlKHRhcmdldEVsZW1lbnQpIHtcclxuICAgIGNvbnN0IHRoSGVhZEVsZW1lbnQgPSB0aGlzLmdldFRoZWFkQnlUYXJnZXQodGFyZ2V0RWxlbWVudCk7XHJcbiAgICB0aGlzLnNvcnRlZCA9IHRydWU7XHJcbiAgICB0aGlzLnNvcnRUeXBlID0gKCF0aEhlYWRFbGVtZW50LmNsYXNzTGlzdC5jb250YWlucygnc29ydGVkLWRvd24nKSkgPyAnZG93bicgOiAndXAnO1xyXG4gICAgY29uc3QgdGhOYW1lID0gdGhIZWFkRWxlbWVudC5xdWVyeVNlbGVjdG9yKCcudGhOYW1lJykuaW5uZXJIVE1MO1xyXG4gICAgdGhpcy5zb3J0UHJvcGVydHkgPSB0aGlzLnByb3BzTGliW3RoTmFtZV07XHJcbiAgICBjb25zdCBzb3J0ZWRBcnIgPSB0aGlzLnN0b3JhZ2UuZ2V0U29ydGVkQXJyQnlQcm9wKHRoaXMuc29ydFByb3BlcnR5LCB0aGlzLnNvcnRUeXBlKTtcclxuICAgIHRoaXMuYnVpbGQoc29ydGVkQXJyKTtcclxuICAgIHJldHVybiB0aGlzO1xyXG4gIH1cclxuXHJcbiAgZ2V0VGhlYWRCeVRhcmdldCh0YXJnZXRFbGVtZW50KSB7XHJcbiAgICBsZXQgc2VhcmNoRWxlbWVudCA9IHRhcmdldEVsZW1lbnQ7XHJcbiAgICB3aGlsZSAoIXNlYXJjaEVsZW1lbnQuY2xhc3NMaXN0LmNvbnRhaW5zKCd0aGVhZCcpKSB7XHJcbiAgICAgIHNlYXJjaEVsZW1lbnQgPSBzZWFyY2hFbGVtZW50LnBhcmVudEVsZW1lbnQ7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gc2VhcmNoRWxlbWVudDtcclxuICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IFN0YXRpc3RpYztcclxuIiwiLyogZXNsaW50LWRpc2FibGUgbGluZWJyZWFrLXN0eWxlICovXHJcbi8qIGVzbGludC1kaXNhYmxlIG5vLWNvbnNvbGUgKi9cclxuLyogZXNsaW50LWRpc2FibGUgbGluZWJyZWFrLXN0eWxlICovXHJcbi8qIGVzbGludC1kaXNhYmxlIG5vLXVuZGVmICovXHJcblxyXG5pbXBvcnQgeyBjcmVhdGVDdXN0b21FbGVtZW50IH0gZnJvbSAnLi9jb21tb25GdW5jdCc7XHJcblxyXG5jbGFzcyBTd2l0Y2gge1xyXG4gIGNvbnN0cnVjdG9yKGFwcEN0cmxPYmopIHtcclxuICAgIHRoaXMudmFsaWRNb2RlcyA9IFsndHJhaW4nLCAncGxheSddO1xyXG4gICAgdGhpcy5hY3RpdmVNb2RlID0gJ3RyYWluJztcclxuICAgIHRoaXMuYXBwQ29udHJvbCA9IGFwcEN0cmxPYmo7XHJcbiAgICB0aGlzLmVsZW1lbnQgPSBudWxsO1xyXG4gICAgdGhpcy5idWlsZCgpO1xyXG4gIH1cclxuXHJcbiAgYnVpbGQoKSB7XHJcbiAgICBjb25zdCBjbGFzc05hbWVzID0gJ2J1dHRvbiBzd2l0Y2gnO1xyXG4gICAgY29uc3QgdGVtcGxhdGUgPSBgXHJcbiAgICAgICAgICAgICAgICAgICAgPHAgY2xhc3M9XCJzd2l0Y2gtdHJpZ2dlclwiPlRyYWluPC9wPlxyXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJzd2l0Y2gtcmFpbFwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInN3aXRjaC1yb2xsZXJcIj5cclxuICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgIDxwIGNsYXNzPVwic3dpdGNoLXRyaWdnZXJcIj5QbGF5PC9wPlxyXG4gICAgICAgICAgICAgICAgICAgIGA7XHJcblxyXG4gICAgdGhpcy5lbGVtZW50ID0gY3JlYXRlQ3VzdG9tRWxlbWVudCgnZGl2JywgY2xhc3NOYW1lcywgdGVtcGxhdGUpO1xyXG4gICAgcmV0dXJuIHRoaXM7XHJcbiAgfVxyXG5cclxuICBhZGRUb0RvYygpIHtcclxuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5tYWluLWNvbnRyb2xzJykuYXBwZW5kKHRoaXMuZWxlbWVudCk7XHJcbiAgICByZXR1cm4gdGhpcztcclxuICB9XHJcblxyXG4gIHRvZ2dsZSgpIHtcclxuICAgIHRoaXMuZWxlbWVudC5jbGFzc0xpc3QudG9nZ2xlKCdzd2l0Y2gtb24nKTtcclxuICAgIHRoaXMuYWN0aXZlTW9kZSA9ICh0aGlzLmFjdGl2ZU1vZGUgPT09ICdwbGF5JykgPyAndHJhaW4nIDogJ3BsYXknO1xyXG4gIH1cclxuXHJcbiAgdHJhaW4oKSB7XHJcbiAgICB0aGlzLmVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZSgnc3dpdGNoLW9uJyk7XHJcbiAgICB0aGlzLmFjdGl2ZU1vZGUgPSAndHJhaW4nO1xyXG4gIH1cclxuXHJcbiAgZW5hYmxlKCkge1xyXG4gICAgdGhpcy5lbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUoJ2Rpc2FibGVkJyk7XHJcbiAgfVxyXG5cclxuICBkaXNhYmxlKCkge1xyXG4gICAgdGhpcy5lbGVtZW50LmNsYXNzTGlzdC5hZGQoJ2Rpc2FibGVkJyk7XHJcbiAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBTd2l0Y2g7XHJcbiIsIi8vIEltcG9ydHNcbmltcG9ydCBfX19DU1NfTE9BREVSX0FQSV9TT1VSQ0VNQVBfSU1QT1JUX19fIGZyb20gXCIuLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvc291cmNlTWFwcy5qc1wiO1xuaW1wb3J0IF9fX0NTU19MT0FERVJfQVBJX0lNUE9SVF9fXyBmcm9tIFwiLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL2FwaS5qc1wiO1xudmFyIF9fX0NTU19MT0FERVJfRVhQT1JUX19fID0gX19fQ1NTX0xPQURFUl9BUElfSU1QT1JUX19fKF9fX0NTU19MT0FERVJfQVBJX1NPVVJDRU1BUF9JTVBPUlRfX18pO1xuLy8gTW9kdWxlXG5fX19DU1NfTE9BREVSX0VYUE9SVF9fXy5wdXNoKFttb2R1bGUuaWQsIFwiLyohIG5vcm1hbGl6ZS5jc3MgdjguMC4xIHwgTUlUIExpY2Vuc2UgfCBnaXRodWIuY29tL25lY29sYXMvbm9ybWFsaXplLmNzcyAqL1xcclxcblxcclxcbi8qIERvY3VtZW50XFxyXFxuICAgPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0gKi9cXHJcXG5cXHJcXG4vKipcXHJcXG4gKiAxLiBDb3JyZWN0IHRoZSBsaW5lIGhlaWdodCBpbiBhbGwgYnJvd3NlcnMuXFxyXFxuICogMi4gUHJldmVudCBhZGp1c3RtZW50cyBvZiBmb250IHNpemUgYWZ0ZXIgb3JpZW50YXRpb24gY2hhbmdlcyBpbiBpT1MuXFxyXFxuICovXFxyXFxuXFxyXFxuaHRtbCB7XFxyXFxuICBsaW5lLWhlaWdodDogMS4xNTsgLyogMSAqL1xcclxcbiAgLXdlYmtpdC10ZXh0LXNpemUtYWRqdXN0OiAxMDAlOyAvKiAyICovXFxyXFxufVxcclxcblxcclxcbi8qIFNlY3Rpb25zXFxyXFxuICAgPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0gKi9cXHJcXG5cXHJcXG4vKipcXHJcXG4gKiBSZW1vdmUgdGhlIG1hcmdpbiBpbiBhbGwgYnJvd3NlcnMuXFxyXFxuICovXFxyXFxuXFxyXFxuYm9keSB7XFxyXFxuICBtYXJnaW46IDA7XFxyXFxufVxcclxcblxcclxcbi8qKlxcclxcbiAqIFJlbmRlciB0aGUgYG1haW5gIGVsZW1lbnQgY29uc2lzdGVudGx5IGluIElFLlxcclxcbiAqL1xcclxcblxcclxcbm1haW4ge1xcclxcbiAgZGlzcGxheTogYmxvY2s7XFxyXFxufVxcclxcblxcclxcbi8qKlxcclxcbiAqIENvcnJlY3QgdGhlIGZvbnQgc2l6ZSBhbmQgbWFyZ2luIG9uIGBoMWAgZWxlbWVudHMgd2l0aGluIGBzZWN0aW9uYCBhbmRcXHJcXG4gKiBgYXJ0aWNsZWAgY29udGV4dHMgaW4gQ2hyb21lLCBGaXJlZm94LCBhbmQgU2FmYXJpLlxcclxcbiAqL1xcclxcblxcclxcbmgxIHtcXHJcXG4gIGZvbnQtc2l6ZTogMmVtO1xcclxcbiAgbWFyZ2luOiAwLjY3ZW0gMDtcXHJcXG59XFxyXFxuXFxyXFxuLyogR3JvdXBpbmcgY29udGVudFxcclxcbiAgID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09ICovXFxyXFxuXFxyXFxuLyoqXFxyXFxuICogMS4gQWRkIHRoZSBjb3JyZWN0IGJveCBzaXppbmcgaW4gRmlyZWZveC5cXHJcXG4gKiAyLiBTaG93IHRoZSBvdmVyZmxvdyBpbiBFZGdlIGFuZCBJRS5cXHJcXG4gKi9cXHJcXG5cXHJcXG5ociB7XFxyXFxuICBib3gtc2l6aW5nOiBjb250ZW50LWJveDsgLyogMSAqL1xcclxcbiAgaGVpZ2h0OiAwOyAvKiAxICovXFxyXFxuICBvdmVyZmxvdzogdmlzaWJsZTsgLyogMiAqL1xcclxcbn1cXHJcXG5cXHJcXG4vKipcXHJcXG4gKiAxLiBDb3JyZWN0IHRoZSBpbmhlcml0YW5jZSBhbmQgc2NhbGluZyBvZiBmb250IHNpemUgaW4gYWxsIGJyb3dzZXJzLlxcclxcbiAqIDIuIENvcnJlY3QgdGhlIG9kZCBgZW1gIGZvbnQgc2l6aW5nIGluIGFsbCBicm93c2Vycy5cXHJcXG4gKi9cXHJcXG5cXHJcXG5wcmUge1xcclxcbiAgZm9udC1mYW1pbHk6IG1vbm9zcGFjZSwgbW9ub3NwYWNlOyAvKiAxICovXFxyXFxuICBmb250LXNpemU6IDFlbTsgLyogMiAqL1xcclxcbn1cXHJcXG5cXHJcXG4vKiBUZXh0LWxldmVsIHNlbWFudGljc1xcclxcbiAgID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09ICovXFxyXFxuXFxyXFxuLyoqXFxyXFxuICogUmVtb3ZlIHRoZSBncmF5IGJhY2tncm91bmQgb24gYWN0aXZlIGxpbmtzIGluIElFIDEwLlxcclxcbiAqL1xcclxcblxcclxcbmEge1xcclxcbiAgYmFja2dyb3VuZC1jb2xvcjogdHJhbnNwYXJlbnQ7XFxyXFxufVxcclxcblxcclxcbi8qKlxcclxcbiAqIDEuIFJlbW92ZSB0aGUgYm90dG9tIGJvcmRlciBpbiBDaHJvbWUgNTctXFxyXFxuICogMi4gQWRkIHRoZSBjb3JyZWN0IHRleHQgZGVjb3JhdGlvbiBpbiBDaHJvbWUsIEVkZ2UsIElFLCBPcGVyYSwgYW5kIFNhZmFyaS5cXHJcXG4gKi9cXHJcXG5cXHJcXG5hYmJyW3RpdGxlXSB7XFxyXFxuICBib3JkZXItYm90dG9tOiBub25lOyAvKiAxICovXFxyXFxuICB0ZXh0LWRlY29yYXRpb246IHVuZGVybGluZTsgLyogMiAqL1xcclxcbiAgdGV4dC1kZWNvcmF0aW9uOiB1bmRlcmxpbmUgZG90dGVkOyAvKiAyICovXFxyXFxufVxcclxcblxcclxcbi8qKlxcclxcbiAqIEFkZCB0aGUgY29ycmVjdCBmb250IHdlaWdodCBpbiBDaHJvbWUsIEVkZ2UsIGFuZCBTYWZhcmkuXFxyXFxuICovXFxyXFxuXFxyXFxuYixcXHJcXG5zdHJvbmcge1xcclxcbiAgZm9udC13ZWlnaHQ6IGJvbGRlcjtcXHJcXG59XFxyXFxuXFxyXFxuLyoqXFxyXFxuICogMS4gQ29ycmVjdCB0aGUgaW5oZXJpdGFuY2UgYW5kIHNjYWxpbmcgb2YgZm9udCBzaXplIGluIGFsbCBicm93c2Vycy5cXHJcXG4gKiAyLiBDb3JyZWN0IHRoZSBvZGQgYGVtYCBmb250IHNpemluZyBpbiBhbGwgYnJvd3NlcnMuXFxyXFxuICovXFxyXFxuXFxyXFxuY29kZSxcXHJcXG5rYmQsXFxyXFxuc2FtcCB7XFxyXFxuICBmb250LWZhbWlseTogbW9ub3NwYWNlLCBtb25vc3BhY2U7IC8qIDEgKi9cXHJcXG4gIGZvbnQtc2l6ZTogMWVtOyAvKiAyICovXFxyXFxufVxcclxcblxcclxcbi8qKlxcclxcbiAqIEFkZCB0aGUgY29ycmVjdCBmb250IHNpemUgaW4gYWxsIGJyb3dzZXJzLlxcclxcbiAqL1xcclxcblxcclxcbnNtYWxsIHtcXHJcXG4gIGZvbnQtc2l6ZTogODAlO1xcclxcbn1cXHJcXG5cXHJcXG4vKipcXHJcXG4gKiBQcmV2ZW50IGBzdWJgIGFuZCBgc3VwYCBlbGVtZW50cyBmcm9tIGFmZmVjdGluZyB0aGUgbGluZSBoZWlnaHQgaW5cXHJcXG4gKiBhbGwgYnJvd3NlcnMuXFxyXFxuICovXFxyXFxuXFxyXFxuc3ViLFxcclxcbnN1cCB7XFxyXFxuICBmb250LXNpemU6IDc1JTtcXHJcXG4gIGxpbmUtaGVpZ2h0OiAwO1xcclxcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xcclxcbiAgdmVydGljYWwtYWxpZ246IGJhc2VsaW5lO1xcclxcbn1cXHJcXG5cXHJcXG5zdWIge1xcclxcbiAgYm90dG9tOiAtMC4yNWVtO1xcclxcbn1cXHJcXG5cXHJcXG5zdXAge1xcclxcbiAgdG9wOiAtMC41ZW07XFxyXFxufVxcclxcblxcclxcbi8qIEVtYmVkZGVkIGNvbnRlbnRcXHJcXG4gICA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PSAqL1xcclxcblxcclxcbi8qKlxcclxcbiAqIFJlbW92ZSB0aGUgYm9yZGVyIG9uIGltYWdlcyBpbnNpZGUgbGlua3MgaW4gSUUgMTAuXFxyXFxuICovXFxyXFxuXFxyXFxuaW1nIHtcXHJcXG4gIGJvcmRlci1zdHlsZTogbm9uZTtcXHJcXG59XFxyXFxuXFxyXFxuLyogRm9ybXNcXHJcXG4gICA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PSAqL1xcclxcblxcclxcbi8qKlxcclxcbiAqIDEuIENoYW5nZSB0aGUgZm9udCBzdHlsZXMgaW4gYWxsIGJyb3dzZXJzLlxcclxcbiAqIDIuIFJlbW92ZSB0aGUgbWFyZ2luIGluIEZpcmVmb3ggYW5kIFNhZmFyaS5cXHJcXG4gKi9cXHJcXG5cXHJcXG5idXR0b24sXFxyXFxuaW5wdXQsXFxyXFxub3B0Z3JvdXAsXFxyXFxuc2VsZWN0LFxcclxcbnRleHRhcmVhIHtcXHJcXG4gIGZvbnQtZmFtaWx5OiBpbmhlcml0OyAvKiAxICovXFxyXFxuICBmb250LXNpemU6IDEwMCU7IC8qIDEgKi9cXHJcXG4gIGxpbmUtaGVpZ2h0OiAxLjE1OyAvKiAxICovXFxyXFxuICBtYXJnaW46IDA7IC8qIDIgKi9cXHJcXG59XFxyXFxuXFxyXFxuLyoqXFxyXFxuICogU2hvdyB0aGUgb3ZlcmZsb3cgaW4gSUUuXFxyXFxuICogMS4gU2hvdyB0aGUgb3ZlcmZsb3cgaW4gRWRnZS5cXHJcXG4gKi9cXHJcXG5cXHJcXG5idXR0b24sXFxyXFxuaW5wdXQgeyAvKiAxICovXFxyXFxuICBvdmVyZmxvdzogdmlzaWJsZTtcXHJcXG59XFxyXFxuXFxyXFxuLyoqXFxyXFxuICogUmVtb3ZlIHRoZSBpbmhlcml0YW5jZSBvZiB0ZXh0IHRyYW5zZm9ybSBpbiBFZGdlLCBGaXJlZm94LCBhbmQgSUUuXFxyXFxuICogMS4gUmVtb3ZlIHRoZSBpbmhlcml0YW5jZSBvZiB0ZXh0IHRyYW5zZm9ybSBpbiBGaXJlZm94LlxcclxcbiAqL1xcclxcblxcclxcbmJ1dHRvbixcXHJcXG5zZWxlY3QgeyAvKiAxICovXFxyXFxuICB0ZXh0LXRyYW5zZm9ybTogbm9uZTtcXHJcXG59XFxyXFxuXFxyXFxuLyoqXFxyXFxuICogQ29ycmVjdCB0aGUgaW5hYmlsaXR5IHRvIHN0eWxlIGNsaWNrYWJsZSB0eXBlcyBpbiBpT1MgYW5kIFNhZmFyaS5cXHJcXG4gKi9cXHJcXG5cXHJcXG5idXR0b24sXFxyXFxuW3R5cGU9XFxcImJ1dHRvblxcXCJdLFxcclxcblt0eXBlPVxcXCJyZXNldFxcXCJdLFxcclxcblt0eXBlPVxcXCJzdWJtaXRcXFwiXSB7XFxyXFxuICAtd2Via2l0LWFwcGVhcmFuY2U6IGJ1dHRvbjtcXHJcXG59XFxyXFxuXFxyXFxuLyoqXFxyXFxuICogUmVtb3ZlIHRoZSBpbm5lciBib3JkZXIgYW5kIHBhZGRpbmcgaW4gRmlyZWZveC5cXHJcXG4gKi9cXHJcXG5cXHJcXG5idXR0b246Oi1tb3otZm9jdXMtaW5uZXIsXFxyXFxuW3R5cGU9XFxcImJ1dHRvblxcXCJdOjotbW96LWZvY3VzLWlubmVyLFxcclxcblt0eXBlPVxcXCJyZXNldFxcXCJdOjotbW96LWZvY3VzLWlubmVyLFxcclxcblt0eXBlPVxcXCJzdWJtaXRcXFwiXTo6LW1vei1mb2N1cy1pbm5lciB7XFxyXFxuICBib3JkZXItc3R5bGU6IG5vbmU7XFxyXFxuICBwYWRkaW5nOiAwO1xcclxcbn1cXHJcXG5cXHJcXG4vKipcXHJcXG4gKiBSZXN0b3JlIHRoZSBmb2N1cyBzdHlsZXMgdW5zZXQgYnkgdGhlIHByZXZpb3VzIHJ1bGUuXFxyXFxuICovXFxyXFxuXFxyXFxuYnV0dG9uOi1tb3otZm9jdXNyaW5nLFxcclxcblt0eXBlPVxcXCJidXR0b25cXFwiXTotbW96LWZvY3VzcmluZyxcXHJcXG5bdHlwZT1cXFwicmVzZXRcXFwiXTotbW96LWZvY3VzcmluZyxcXHJcXG5bdHlwZT1cXFwic3VibWl0XFxcIl06LW1vei1mb2N1c3Jpbmcge1xcclxcbiAgb3V0bGluZTogMXB4IGRvdHRlZCBCdXR0b25UZXh0O1xcclxcbn1cXHJcXG5cXHJcXG4vKipcXHJcXG4gKiBDb3JyZWN0IHRoZSBwYWRkaW5nIGluIEZpcmVmb3guXFxyXFxuICovXFxyXFxuXFxyXFxuZmllbGRzZXQge1xcclxcbiAgcGFkZGluZzogMC4zNWVtIDAuNzVlbSAwLjYyNWVtO1xcclxcbn1cXHJcXG5cXHJcXG4vKipcXHJcXG4gKiAxLiBDb3JyZWN0IHRoZSB0ZXh0IHdyYXBwaW5nIGluIEVkZ2UgYW5kIElFLlxcclxcbiAqIDIuIENvcnJlY3QgdGhlIGNvbG9yIGluaGVyaXRhbmNlIGZyb20gYGZpZWxkc2V0YCBlbGVtZW50cyBpbiBJRS5cXHJcXG4gKiAzLiBSZW1vdmUgdGhlIHBhZGRpbmcgc28gZGV2ZWxvcGVycyBhcmUgbm90IGNhdWdodCBvdXQgd2hlbiB0aGV5IHplcm8gb3V0XFxyXFxuICogICAgYGZpZWxkc2V0YCBlbGVtZW50cyBpbiBhbGwgYnJvd3NlcnMuXFxyXFxuICovXFxyXFxuXFxyXFxubGVnZW5kIHtcXHJcXG4gIGJveC1zaXppbmc6IGJvcmRlci1ib3g7IC8qIDEgKi9cXHJcXG4gIGNvbG9yOiBpbmhlcml0OyAvKiAyICovXFxyXFxuICBkaXNwbGF5OiB0YWJsZTsgLyogMSAqL1xcclxcbiAgbWF4LXdpZHRoOiAxMDAlOyAvKiAxICovXFxyXFxuICBwYWRkaW5nOiAwOyAvKiAzICovXFxyXFxuICB3aGl0ZS1zcGFjZTogbm9ybWFsOyAvKiAxICovXFxyXFxufVxcclxcblxcclxcbi8qKlxcclxcbiAqIEFkZCB0aGUgY29ycmVjdCB2ZXJ0aWNhbCBhbGlnbm1lbnQgaW4gQ2hyb21lLCBGaXJlZm94LCBhbmQgT3BlcmEuXFxyXFxuICovXFxyXFxuXFxyXFxucHJvZ3Jlc3Mge1xcclxcbiAgdmVydGljYWwtYWxpZ246IGJhc2VsaW5lO1xcclxcbn1cXHJcXG5cXHJcXG4vKipcXHJcXG4gKiBSZW1vdmUgdGhlIGRlZmF1bHQgdmVydGljYWwgc2Nyb2xsYmFyIGluIElFIDEwKy5cXHJcXG4gKi9cXHJcXG5cXHJcXG50ZXh0YXJlYSB7XFxyXFxuICBvdmVyZmxvdzogYXV0bztcXHJcXG59XFxyXFxuXFxyXFxuLyoqXFxyXFxuICogMS4gQWRkIHRoZSBjb3JyZWN0IGJveCBzaXppbmcgaW4gSUUgMTAuXFxyXFxuICogMi4gUmVtb3ZlIHRoZSBwYWRkaW5nIGluIElFIDEwLlxcclxcbiAqL1xcclxcblxcclxcblt0eXBlPVxcXCJjaGVja2JveFxcXCJdLFxcclxcblt0eXBlPVxcXCJyYWRpb1xcXCJdIHtcXHJcXG4gIGJveC1zaXppbmc6IGJvcmRlci1ib3g7IC8qIDEgKi9cXHJcXG4gIHBhZGRpbmc6IDA7IC8qIDIgKi9cXHJcXG59XFxyXFxuXFxyXFxuLyoqXFxyXFxuICogQ29ycmVjdCB0aGUgY3Vyc29yIHN0eWxlIG9mIGluY3JlbWVudCBhbmQgZGVjcmVtZW50IGJ1dHRvbnMgaW4gQ2hyb21lLlxcclxcbiAqL1xcclxcblxcclxcblt0eXBlPVxcXCJudW1iZXJcXFwiXTo6LXdlYmtpdC1pbm5lci1zcGluLWJ1dHRvbixcXHJcXG5bdHlwZT1cXFwibnVtYmVyXFxcIl06Oi13ZWJraXQtb3V0ZXItc3Bpbi1idXR0b24ge1xcclxcbiAgaGVpZ2h0OiBhdXRvO1xcclxcbn1cXHJcXG5cXHJcXG4vKipcXHJcXG4gKiAxLiBDb3JyZWN0IHRoZSBvZGQgYXBwZWFyYW5jZSBpbiBDaHJvbWUgYW5kIFNhZmFyaS5cXHJcXG4gKiAyLiBDb3JyZWN0IHRoZSBvdXRsaW5lIHN0eWxlIGluIFNhZmFyaS5cXHJcXG4gKi9cXHJcXG5cXHJcXG5bdHlwZT1cXFwic2VhcmNoXFxcIl0ge1xcclxcbiAgLXdlYmtpdC1hcHBlYXJhbmNlOiB0ZXh0ZmllbGQ7IC8qIDEgKi9cXHJcXG4gIG91dGxpbmUtb2Zmc2V0OiAtMnB4OyAvKiAyICovXFxyXFxufVxcclxcblxcclxcbi8qKlxcclxcbiAqIFJlbW92ZSB0aGUgaW5uZXIgcGFkZGluZyBpbiBDaHJvbWUgYW5kIFNhZmFyaSBvbiBtYWNPUy5cXHJcXG4gKi9cXHJcXG5cXHJcXG5bdHlwZT1cXFwic2VhcmNoXFxcIl06Oi13ZWJraXQtc2VhcmNoLWRlY29yYXRpb24ge1xcclxcbiAgLXdlYmtpdC1hcHBlYXJhbmNlOiBub25lO1xcclxcbn1cXHJcXG5cXHJcXG4vKipcXHJcXG4gKiAxLiBDb3JyZWN0IHRoZSBpbmFiaWxpdHkgdG8gc3R5bGUgY2xpY2thYmxlIHR5cGVzIGluIGlPUyBhbmQgU2FmYXJpLlxcclxcbiAqIDIuIENoYW5nZSBmb250IHByb3BlcnRpZXMgdG8gYGluaGVyaXRgIGluIFNhZmFyaS5cXHJcXG4gKi9cXHJcXG5cXHJcXG46Oi13ZWJraXQtZmlsZS11cGxvYWQtYnV0dG9uIHtcXHJcXG4gIC13ZWJraXQtYXBwZWFyYW5jZTogYnV0dG9uOyAvKiAxICovXFxyXFxuICBmb250OiBpbmhlcml0OyAvKiAyICovXFxyXFxufVxcclxcblxcclxcbi8qIEludGVyYWN0aXZlXFxyXFxuICAgPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0gKi9cXHJcXG5cXHJcXG4vKlxcclxcbiAqIEFkZCB0aGUgY29ycmVjdCBkaXNwbGF5IGluIEVkZ2UsIElFIDEwKywgYW5kIEZpcmVmb3guXFxyXFxuICovXFxyXFxuXFxyXFxuZGV0YWlscyB7XFxyXFxuICBkaXNwbGF5OiBibG9jaztcXHJcXG59XFxyXFxuXFxyXFxuLypcXHJcXG4gKiBBZGQgdGhlIGNvcnJlY3QgZGlzcGxheSBpbiBhbGwgYnJvd3NlcnMuXFxyXFxuICovXFxyXFxuXFxyXFxuc3VtbWFyeSB7XFxyXFxuICBkaXNwbGF5OiBsaXN0LWl0ZW07XFxyXFxufVxcclxcblxcclxcbi8qIE1pc2NcXHJcXG4gICA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PSAqL1xcclxcblxcclxcbi8qKlxcclxcbiAqIEFkZCB0aGUgY29ycmVjdCBkaXNwbGF5IGluIElFIDEwKy5cXHJcXG4gKi9cXHJcXG5cXHJcXG50ZW1wbGF0ZSB7XFxyXFxuICBkaXNwbGF5OiBub25lO1xcclxcbn1cXHJcXG5cXHJcXG4vKipcXHJcXG4gKiBBZGQgdGhlIGNvcnJlY3QgZGlzcGxheSBpbiBJRSAxMC5cXHJcXG4gKi9cXHJcXG5cXHJcXG5baGlkZGVuXSB7XFxyXFxuICBkaXNwbGF5OiBub25lO1xcclxcbn1cXHJcXG5cIiwgXCJcIix7XCJ2ZXJzaW9uXCI6MyxcInNvdXJjZXNcIjpbXCJ3ZWJwYWNrOi8vLi9hc3NldHMvc3R5bGVzL25vcm1hbGl6ZS5jc3NcIl0sXCJuYW1lc1wiOltdLFwibWFwcGluZ3NcIjpcIkFBQUEsMkVBQTJFOztBQUUzRTsrRUFDK0U7O0FBRS9FOzs7RUFHRTs7QUFFRjtFQUNFLGlCQUFpQixFQUFFLE1BQU07RUFDekIsOEJBQThCLEVBQUUsTUFBTTtBQUN4Qzs7QUFFQTsrRUFDK0U7O0FBRS9FOztFQUVFOztBQUVGO0VBQ0UsU0FBUztBQUNYOztBQUVBOztFQUVFOztBQUVGO0VBQ0UsY0FBYztBQUNoQjs7QUFFQTs7O0VBR0U7O0FBRUY7RUFDRSxjQUFjO0VBQ2QsZ0JBQWdCO0FBQ2xCOztBQUVBOytFQUMrRTs7QUFFL0U7OztFQUdFOztBQUVGO0VBQ0UsdUJBQXVCLEVBQUUsTUFBTTtFQUMvQixTQUFTLEVBQUUsTUFBTTtFQUNqQixpQkFBaUIsRUFBRSxNQUFNO0FBQzNCOztBQUVBOzs7RUFHRTs7QUFFRjtFQUNFLGlDQUFpQyxFQUFFLE1BQU07RUFDekMsY0FBYyxFQUFFLE1BQU07QUFDeEI7O0FBRUE7K0VBQytFOztBQUUvRTs7RUFFRTs7QUFFRjtFQUNFLDZCQUE2QjtBQUMvQjs7QUFFQTs7O0VBR0U7O0FBRUY7RUFDRSxtQkFBbUIsRUFBRSxNQUFNO0VBQzNCLDBCQUEwQixFQUFFLE1BQU07RUFDbEMsaUNBQWlDLEVBQUUsTUFBTTtBQUMzQzs7QUFFQTs7RUFFRTs7QUFFRjs7RUFFRSxtQkFBbUI7QUFDckI7O0FBRUE7OztFQUdFOztBQUVGOzs7RUFHRSxpQ0FBaUMsRUFBRSxNQUFNO0VBQ3pDLGNBQWMsRUFBRSxNQUFNO0FBQ3hCOztBQUVBOztFQUVFOztBQUVGO0VBQ0UsY0FBYztBQUNoQjs7QUFFQTs7O0VBR0U7O0FBRUY7O0VBRUUsY0FBYztFQUNkLGNBQWM7RUFDZCxrQkFBa0I7RUFDbEIsd0JBQXdCO0FBQzFCOztBQUVBO0VBQ0UsZUFBZTtBQUNqQjs7QUFFQTtFQUNFLFdBQVc7QUFDYjs7QUFFQTsrRUFDK0U7O0FBRS9FOztFQUVFOztBQUVGO0VBQ0Usa0JBQWtCO0FBQ3BCOztBQUVBOytFQUMrRTs7QUFFL0U7OztFQUdFOztBQUVGOzs7OztFQUtFLG9CQUFvQixFQUFFLE1BQU07RUFDNUIsZUFBZSxFQUFFLE1BQU07RUFDdkIsaUJBQWlCLEVBQUUsTUFBTTtFQUN6QixTQUFTLEVBQUUsTUFBTTtBQUNuQjs7QUFFQTs7O0VBR0U7O0FBRUY7UUFDUSxNQUFNO0VBQ1osaUJBQWlCO0FBQ25COztBQUVBOzs7RUFHRTs7QUFFRjtTQUNTLE1BQU07RUFDYixvQkFBb0I7QUFDdEI7O0FBRUE7O0VBRUU7O0FBRUY7Ozs7RUFJRSwwQkFBMEI7QUFDNUI7O0FBRUE7O0VBRUU7O0FBRUY7Ozs7RUFJRSxrQkFBa0I7RUFDbEIsVUFBVTtBQUNaOztBQUVBOztFQUVFOztBQUVGOzs7O0VBSUUsOEJBQThCO0FBQ2hDOztBQUVBOztFQUVFOztBQUVGO0VBQ0UsOEJBQThCO0FBQ2hDOztBQUVBOzs7OztFQUtFOztBQUVGO0VBQ0Usc0JBQXNCLEVBQUUsTUFBTTtFQUM5QixjQUFjLEVBQUUsTUFBTTtFQUN0QixjQUFjLEVBQUUsTUFBTTtFQUN0QixlQUFlLEVBQUUsTUFBTTtFQUN2QixVQUFVLEVBQUUsTUFBTTtFQUNsQixtQkFBbUIsRUFBRSxNQUFNO0FBQzdCOztBQUVBOztFQUVFOztBQUVGO0VBQ0Usd0JBQXdCO0FBQzFCOztBQUVBOztFQUVFOztBQUVGO0VBQ0UsY0FBYztBQUNoQjs7QUFFQTs7O0VBR0U7O0FBRUY7O0VBRUUsc0JBQXNCLEVBQUUsTUFBTTtFQUM5QixVQUFVLEVBQUUsTUFBTTtBQUNwQjs7QUFFQTs7RUFFRTs7QUFFRjs7RUFFRSxZQUFZO0FBQ2Q7O0FBRUE7OztFQUdFOztBQUVGO0VBQ0UsNkJBQTZCLEVBQUUsTUFBTTtFQUNyQyxvQkFBb0IsRUFBRSxNQUFNO0FBQzlCOztBQUVBOztFQUVFOztBQUVGO0VBQ0Usd0JBQXdCO0FBQzFCOztBQUVBOzs7RUFHRTs7QUFFRjtFQUNFLDBCQUEwQixFQUFFLE1BQU07RUFDbEMsYUFBYSxFQUFFLE1BQU07QUFDdkI7O0FBRUE7K0VBQytFOztBQUUvRTs7RUFFRTs7QUFFRjtFQUNFLGNBQWM7QUFDaEI7O0FBRUE7O0VBRUU7O0FBRUY7RUFDRSxrQkFBa0I7QUFDcEI7O0FBRUE7K0VBQytFOztBQUUvRTs7RUFFRTs7QUFFRjtFQUNFLGFBQWE7QUFDZjs7QUFFQTs7RUFFRTs7QUFFRjtFQUNFLGFBQWE7QUFDZlwiLFwic291cmNlc0NvbnRlbnRcIjpbXCIvKiEgbm9ybWFsaXplLmNzcyB2OC4wLjEgfCBNSVQgTGljZW5zZSB8IGdpdGh1Yi5jb20vbmVjb2xhcy9ub3JtYWxpemUuY3NzICovXFxyXFxuXFxyXFxuLyogRG9jdW1lbnRcXHJcXG4gICA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PSAqL1xcclxcblxcclxcbi8qKlxcclxcbiAqIDEuIENvcnJlY3QgdGhlIGxpbmUgaGVpZ2h0IGluIGFsbCBicm93c2Vycy5cXHJcXG4gKiAyLiBQcmV2ZW50IGFkanVzdG1lbnRzIG9mIGZvbnQgc2l6ZSBhZnRlciBvcmllbnRhdGlvbiBjaGFuZ2VzIGluIGlPUy5cXHJcXG4gKi9cXHJcXG5cXHJcXG5odG1sIHtcXHJcXG4gIGxpbmUtaGVpZ2h0OiAxLjE1OyAvKiAxICovXFxyXFxuICAtd2Via2l0LXRleHQtc2l6ZS1hZGp1c3Q6IDEwMCU7IC8qIDIgKi9cXHJcXG59XFxyXFxuXFxyXFxuLyogU2VjdGlvbnNcXHJcXG4gICA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PSAqL1xcclxcblxcclxcbi8qKlxcclxcbiAqIFJlbW92ZSB0aGUgbWFyZ2luIGluIGFsbCBicm93c2Vycy5cXHJcXG4gKi9cXHJcXG5cXHJcXG5ib2R5IHtcXHJcXG4gIG1hcmdpbjogMDtcXHJcXG59XFxyXFxuXFxyXFxuLyoqXFxyXFxuICogUmVuZGVyIHRoZSBgbWFpbmAgZWxlbWVudCBjb25zaXN0ZW50bHkgaW4gSUUuXFxyXFxuICovXFxyXFxuXFxyXFxubWFpbiB7XFxyXFxuICBkaXNwbGF5OiBibG9jaztcXHJcXG59XFxyXFxuXFxyXFxuLyoqXFxyXFxuICogQ29ycmVjdCB0aGUgZm9udCBzaXplIGFuZCBtYXJnaW4gb24gYGgxYCBlbGVtZW50cyB3aXRoaW4gYHNlY3Rpb25gIGFuZFxcclxcbiAqIGBhcnRpY2xlYCBjb250ZXh0cyBpbiBDaHJvbWUsIEZpcmVmb3gsIGFuZCBTYWZhcmkuXFxyXFxuICovXFxyXFxuXFxyXFxuaDEge1xcclxcbiAgZm9udC1zaXplOiAyZW07XFxyXFxuICBtYXJnaW46IDAuNjdlbSAwO1xcclxcbn1cXHJcXG5cXHJcXG4vKiBHcm91cGluZyBjb250ZW50XFxyXFxuICAgPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0gKi9cXHJcXG5cXHJcXG4vKipcXHJcXG4gKiAxLiBBZGQgdGhlIGNvcnJlY3QgYm94IHNpemluZyBpbiBGaXJlZm94LlxcclxcbiAqIDIuIFNob3cgdGhlIG92ZXJmbG93IGluIEVkZ2UgYW5kIElFLlxcclxcbiAqL1xcclxcblxcclxcbmhyIHtcXHJcXG4gIGJveC1zaXppbmc6IGNvbnRlbnQtYm94OyAvKiAxICovXFxyXFxuICBoZWlnaHQ6IDA7IC8qIDEgKi9cXHJcXG4gIG92ZXJmbG93OiB2aXNpYmxlOyAvKiAyICovXFxyXFxufVxcclxcblxcclxcbi8qKlxcclxcbiAqIDEuIENvcnJlY3QgdGhlIGluaGVyaXRhbmNlIGFuZCBzY2FsaW5nIG9mIGZvbnQgc2l6ZSBpbiBhbGwgYnJvd3NlcnMuXFxyXFxuICogMi4gQ29ycmVjdCB0aGUgb2RkIGBlbWAgZm9udCBzaXppbmcgaW4gYWxsIGJyb3dzZXJzLlxcclxcbiAqL1xcclxcblxcclxcbnByZSB7XFxyXFxuICBmb250LWZhbWlseTogbW9ub3NwYWNlLCBtb25vc3BhY2U7IC8qIDEgKi9cXHJcXG4gIGZvbnQtc2l6ZTogMWVtOyAvKiAyICovXFxyXFxufVxcclxcblxcclxcbi8qIFRleHQtbGV2ZWwgc2VtYW50aWNzXFxyXFxuICAgPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0gKi9cXHJcXG5cXHJcXG4vKipcXHJcXG4gKiBSZW1vdmUgdGhlIGdyYXkgYmFja2dyb3VuZCBvbiBhY3RpdmUgbGlua3MgaW4gSUUgMTAuXFxyXFxuICovXFxyXFxuXFxyXFxuYSB7XFxyXFxuICBiYWNrZ3JvdW5kLWNvbG9yOiB0cmFuc3BhcmVudDtcXHJcXG59XFxyXFxuXFxyXFxuLyoqXFxyXFxuICogMS4gUmVtb3ZlIHRoZSBib3R0b20gYm9yZGVyIGluIENocm9tZSA1Ny1cXHJcXG4gKiAyLiBBZGQgdGhlIGNvcnJlY3QgdGV4dCBkZWNvcmF0aW9uIGluIENocm9tZSwgRWRnZSwgSUUsIE9wZXJhLCBhbmQgU2FmYXJpLlxcclxcbiAqL1xcclxcblxcclxcbmFiYnJbdGl0bGVdIHtcXHJcXG4gIGJvcmRlci1ib3R0b206IG5vbmU7IC8qIDEgKi9cXHJcXG4gIHRleHQtZGVjb3JhdGlvbjogdW5kZXJsaW5lOyAvKiAyICovXFxyXFxuICB0ZXh0LWRlY29yYXRpb246IHVuZGVybGluZSBkb3R0ZWQ7IC8qIDIgKi9cXHJcXG59XFxyXFxuXFxyXFxuLyoqXFxyXFxuICogQWRkIHRoZSBjb3JyZWN0IGZvbnQgd2VpZ2h0IGluIENocm9tZSwgRWRnZSwgYW5kIFNhZmFyaS5cXHJcXG4gKi9cXHJcXG5cXHJcXG5iLFxcclxcbnN0cm9uZyB7XFxyXFxuICBmb250LXdlaWdodDogYm9sZGVyO1xcclxcbn1cXHJcXG5cXHJcXG4vKipcXHJcXG4gKiAxLiBDb3JyZWN0IHRoZSBpbmhlcml0YW5jZSBhbmQgc2NhbGluZyBvZiBmb250IHNpemUgaW4gYWxsIGJyb3dzZXJzLlxcclxcbiAqIDIuIENvcnJlY3QgdGhlIG9kZCBgZW1gIGZvbnQgc2l6aW5nIGluIGFsbCBicm93c2Vycy5cXHJcXG4gKi9cXHJcXG5cXHJcXG5jb2RlLFxcclxcbmtiZCxcXHJcXG5zYW1wIHtcXHJcXG4gIGZvbnQtZmFtaWx5OiBtb25vc3BhY2UsIG1vbm9zcGFjZTsgLyogMSAqL1xcclxcbiAgZm9udC1zaXplOiAxZW07IC8qIDIgKi9cXHJcXG59XFxyXFxuXFxyXFxuLyoqXFxyXFxuICogQWRkIHRoZSBjb3JyZWN0IGZvbnQgc2l6ZSBpbiBhbGwgYnJvd3NlcnMuXFxyXFxuICovXFxyXFxuXFxyXFxuc21hbGwge1xcclxcbiAgZm9udC1zaXplOiA4MCU7XFxyXFxufVxcclxcblxcclxcbi8qKlxcclxcbiAqIFByZXZlbnQgYHN1YmAgYW5kIGBzdXBgIGVsZW1lbnRzIGZyb20gYWZmZWN0aW5nIHRoZSBsaW5lIGhlaWdodCBpblxcclxcbiAqIGFsbCBicm93c2Vycy5cXHJcXG4gKi9cXHJcXG5cXHJcXG5zdWIsXFxyXFxuc3VwIHtcXHJcXG4gIGZvbnQtc2l6ZTogNzUlO1xcclxcbiAgbGluZS1oZWlnaHQ6IDA7XFxyXFxuICBwb3NpdGlvbjogcmVsYXRpdmU7XFxyXFxuICB2ZXJ0aWNhbC1hbGlnbjogYmFzZWxpbmU7XFxyXFxufVxcclxcblxcclxcbnN1YiB7XFxyXFxuICBib3R0b206IC0wLjI1ZW07XFxyXFxufVxcclxcblxcclxcbnN1cCB7XFxyXFxuICB0b3A6IC0wLjVlbTtcXHJcXG59XFxyXFxuXFxyXFxuLyogRW1iZWRkZWQgY29udGVudFxcclxcbiAgID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09ICovXFxyXFxuXFxyXFxuLyoqXFxyXFxuICogUmVtb3ZlIHRoZSBib3JkZXIgb24gaW1hZ2VzIGluc2lkZSBsaW5rcyBpbiBJRSAxMC5cXHJcXG4gKi9cXHJcXG5cXHJcXG5pbWcge1xcclxcbiAgYm9yZGVyLXN0eWxlOiBub25lO1xcclxcbn1cXHJcXG5cXHJcXG4vKiBGb3Jtc1xcclxcbiAgID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09ICovXFxyXFxuXFxyXFxuLyoqXFxyXFxuICogMS4gQ2hhbmdlIHRoZSBmb250IHN0eWxlcyBpbiBhbGwgYnJvd3NlcnMuXFxyXFxuICogMi4gUmVtb3ZlIHRoZSBtYXJnaW4gaW4gRmlyZWZveCBhbmQgU2FmYXJpLlxcclxcbiAqL1xcclxcblxcclxcbmJ1dHRvbixcXHJcXG5pbnB1dCxcXHJcXG5vcHRncm91cCxcXHJcXG5zZWxlY3QsXFxyXFxudGV4dGFyZWEge1xcclxcbiAgZm9udC1mYW1pbHk6IGluaGVyaXQ7IC8qIDEgKi9cXHJcXG4gIGZvbnQtc2l6ZTogMTAwJTsgLyogMSAqL1xcclxcbiAgbGluZS1oZWlnaHQ6IDEuMTU7IC8qIDEgKi9cXHJcXG4gIG1hcmdpbjogMDsgLyogMiAqL1xcclxcbn1cXHJcXG5cXHJcXG4vKipcXHJcXG4gKiBTaG93IHRoZSBvdmVyZmxvdyBpbiBJRS5cXHJcXG4gKiAxLiBTaG93IHRoZSBvdmVyZmxvdyBpbiBFZGdlLlxcclxcbiAqL1xcclxcblxcclxcbmJ1dHRvbixcXHJcXG5pbnB1dCB7IC8qIDEgKi9cXHJcXG4gIG92ZXJmbG93OiB2aXNpYmxlO1xcclxcbn1cXHJcXG5cXHJcXG4vKipcXHJcXG4gKiBSZW1vdmUgdGhlIGluaGVyaXRhbmNlIG9mIHRleHQgdHJhbnNmb3JtIGluIEVkZ2UsIEZpcmVmb3gsIGFuZCBJRS5cXHJcXG4gKiAxLiBSZW1vdmUgdGhlIGluaGVyaXRhbmNlIG9mIHRleHQgdHJhbnNmb3JtIGluIEZpcmVmb3guXFxyXFxuICovXFxyXFxuXFxyXFxuYnV0dG9uLFxcclxcbnNlbGVjdCB7IC8qIDEgKi9cXHJcXG4gIHRleHQtdHJhbnNmb3JtOiBub25lO1xcclxcbn1cXHJcXG5cXHJcXG4vKipcXHJcXG4gKiBDb3JyZWN0IHRoZSBpbmFiaWxpdHkgdG8gc3R5bGUgY2xpY2thYmxlIHR5cGVzIGluIGlPUyBhbmQgU2FmYXJpLlxcclxcbiAqL1xcclxcblxcclxcbmJ1dHRvbixcXHJcXG5bdHlwZT1cXFwiYnV0dG9uXFxcIl0sXFxyXFxuW3R5cGU9XFxcInJlc2V0XFxcIl0sXFxyXFxuW3R5cGU9XFxcInN1Ym1pdFxcXCJdIHtcXHJcXG4gIC13ZWJraXQtYXBwZWFyYW5jZTogYnV0dG9uO1xcclxcbn1cXHJcXG5cXHJcXG4vKipcXHJcXG4gKiBSZW1vdmUgdGhlIGlubmVyIGJvcmRlciBhbmQgcGFkZGluZyBpbiBGaXJlZm94LlxcclxcbiAqL1xcclxcblxcclxcbmJ1dHRvbjo6LW1vei1mb2N1cy1pbm5lcixcXHJcXG5bdHlwZT1cXFwiYnV0dG9uXFxcIl06Oi1tb3otZm9jdXMtaW5uZXIsXFxyXFxuW3R5cGU9XFxcInJlc2V0XFxcIl06Oi1tb3otZm9jdXMtaW5uZXIsXFxyXFxuW3R5cGU9XFxcInN1Ym1pdFxcXCJdOjotbW96LWZvY3VzLWlubmVyIHtcXHJcXG4gIGJvcmRlci1zdHlsZTogbm9uZTtcXHJcXG4gIHBhZGRpbmc6IDA7XFxyXFxufVxcclxcblxcclxcbi8qKlxcclxcbiAqIFJlc3RvcmUgdGhlIGZvY3VzIHN0eWxlcyB1bnNldCBieSB0aGUgcHJldmlvdXMgcnVsZS5cXHJcXG4gKi9cXHJcXG5cXHJcXG5idXR0b246LW1vei1mb2N1c3JpbmcsXFxyXFxuW3R5cGU9XFxcImJ1dHRvblxcXCJdOi1tb3otZm9jdXNyaW5nLFxcclxcblt0eXBlPVxcXCJyZXNldFxcXCJdOi1tb3otZm9jdXNyaW5nLFxcclxcblt0eXBlPVxcXCJzdWJtaXRcXFwiXTotbW96LWZvY3VzcmluZyB7XFxyXFxuICBvdXRsaW5lOiAxcHggZG90dGVkIEJ1dHRvblRleHQ7XFxyXFxufVxcclxcblxcclxcbi8qKlxcclxcbiAqIENvcnJlY3QgdGhlIHBhZGRpbmcgaW4gRmlyZWZveC5cXHJcXG4gKi9cXHJcXG5cXHJcXG5maWVsZHNldCB7XFxyXFxuICBwYWRkaW5nOiAwLjM1ZW0gMC43NWVtIDAuNjI1ZW07XFxyXFxufVxcclxcblxcclxcbi8qKlxcclxcbiAqIDEuIENvcnJlY3QgdGhlIHRleHQgd3JhcHBpbmcgaW4gRWRnZSBhbmQgSUUuXFxyXFxuICogMi4gQ29ycmVjdCB0aGUgY29sb3IgaW5oZXJpdGFuY2UgZnJvbSBgZmllbGRzZXRgIGVsZW1lbnRzIGluIElFLlxcclxcbiAqIDMuIFJlbW92ZSB0aGUgcGFkZGluZyBzbyBkZXZlbG9wZXJzIGFyZSBub3QgY2F1Z2h0IG91dCB3aGVuIHRoZXkgemVybyBvdXRcXHJcXG4gKiAgICBgZmllbGRzZXRgIGVsZW1lbnRzIGluIGFsbCBicm93c2Vycy5cXHJcXG4gKi9cXHJcXG5cXHJcXG5sZWdlbmQge1xcclxcbiAgYm94LXNpemluZzogYm9yZGVyLWJveDsgLyogMSAqL1xcclxcbiAgY29sb3I6IGluaGVyaXQ7IC8qIDIgKi9cXHJcXG4gIGRpc3BsYXk6IHRhYmxlOyAvKiAxICovXFxyXFxuICBtYXgtd2lkdGg6IDEwMCU7IC8qIDEgKi9cXHJcXG4gIHBhZGRpbmc6IDA7IC8qIDMgKi9cXHJcXG4gIHdoaXRlLXNwYWNlOiBub3JtYWw7IC8qIDEgKi9cXHJcXG59XFxyXFxuXFxyXFxuLyoqXFxyXFxuICogQWRkIHRoZSBjb3JyZWN0IHZlcnRpY2FsIGFsaWdubWVudCBpbiBDaHJvbWUsIEZpcmVmb3gsIGFuZCBPcGVyYS5cXHJcXG4gKi9cXHJcXG5cXHJcXG5wcm9ncmVzcyB7XFxyXFxuICB2ZXJ0aWNhbC1hbGlnbjogYmFzZWxpbmU7XFxyXFxufVxcclxcblxcclxcbi8qKlxcclxcbiAqIFJlbW92ZSB0aGUgZGVmYXVsdCB2ZXJ0aWNhbCBzY3JvbGxiYXIgaW4gSUUgMTArLlxcclxcbiAqL1xcclxcblxcclxcbnRleHRhcmVhIHtcXHJcXG4gIG92ZXJmbG93OiBhdXRvO1xcclxcbn1cXHJcXG5cXHJcXG4vKipcXHJcXG4gKiAxLiBBZGQgdGhlIGNvcnJlY3QgYm94IHNpemluZyBpbiBJRSAxMC5cXHJcXG4gKiAyLiBSZW1vdmUgdGhlIHBhZGRpbmcgaW4gSUUgMTAuXFxyXFxuICovXFxyXFxuXFxyXFxuW3R5cGU9XFxcImNoZWNrYm94XFxcIl0sXFxyXFxuW3R5cGU9XFxcInJhZGlvXFxcIl0ge1xcclxcbiAgYm94LXNpemluZzogYm9yZGVyLWJveDsgLyogMSAqL1xcclxcbiAgcGFkZGluZzogMDsgLyogMiAqL1xcclxcbn1cXHJcXG5cXHJcXG4vKipcXHJcXG4gKiBDb3JyZWN0IHRoZSBjdXJzb3Igc3R5bGUgb2YgaW5jcmVtZW50IGFuZCBkZWNyZW1lbnQgYnV0dG9ucyBpbiBDaHJvbWUuXFxyXFxuICovXFxyXFxuXFxyXFxuW3R5cGU9XFxcIm51bWJlclxcXCJdOjotd2Via2l0LWlubmVyLXNwaW4tYnV0dG9uLFxcclxcblt0eXBlPVxcXCJudW1iZXJcXFwiXTo6LXdlYmtpdC1vdXRlci1zcGluLWJ1dHRvbiB7XFxyXFxuICBoZWlnaHQ6IGF1dG87XFxyXFxufVxcclxcblxcclxcbi8qKlxcclxcbiAqIDEuIENvcnJlY3QgdGhlIG9kZCBhcHBlYXJhbmNlIGluIENocm9tZSBhbmQgU2FmYXJpLlxcclxcbiAqIDIuIENvcnJlY3QgdGhlIG91dGxpbmUgc3R5bGUgaW4gU2FmYXJpLlxcclxcbiAqL1xcclxcblxcclxcblt0eXBlPVxcXCJzZWFyY2hcXFwiXSB7XFxyXFxuICAtd2Via2l0LWFwcGVhcmFuY2U6IHRleHRmaWVsZDsgLyogMSAqL1xcclxcbiAgb3V0bGluZS1vZmZzZXQ6IC0ycHg7IC8qIDIgKi9cXHJcXG59XFxyXFxuXFxyXFxuLyoqXFxyXFxuICogUmVtb3ZlIHRoZSBpbm5lciBwYWRkaW5nIGluIENocm9tZSBhbmQgU2FmYXJpIG9uIG1hY09TLlxcclxcbiAqL1xcclxcblxcclxcblt0eXBlPVxcXCJzZWFyY2hcXFwiXTo6LXdlYmtpdC1zZWFyY2gtZGVjb3JhdGlvbiB7XFxyXFxuICAtd2Via2l0LWFwcGVhcmFuY2U6IG5vbmU7XFxyXFxufVxcclxcblxcclxcbi8qKlxcclxcbiAqIDEuIENvcnJlY3QgdGhlIGluYWJpbGl0eSB0byBzdHlsZSBjbGlja2FibGUgdHlwZXMgaW4gaU9TIGFuZCBTYWZhcmkuXFxyXFxuICogMi4gQ2hhbmdlIGZvbnQgcHJvcGVydGllcyB0byBgaW5oZXJpdGAgaW4gU2FmYXJpLlxcclxcbiAqL1xcclxcblxcclxcbjo6LXdlYmtpdC1maWxlLXVwbG9hZC1idXR0b24ge1xcclxcbiAgLXdlYmtpdC1hcHBlYXJhbmNlOiBidXR0b247IC8qIDEgKi9cXHJcXG4gIGZvbnQ6IGluaGVyaXQ7IC8qIDIgKi9cXHJcXG59XFxyXFxuXFxyXFxuLyogSW50ZXJhY3RpdmVcXHJcXG4gICA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PSAqL1xcclxcblxcclxcbi8qXFxyXFxuICogQWRkIHRoZSBjb3JyZWN0IGRpc3BsYXkgaW4gRWRnZSwgSUUgMTArLCBhbmQgRmlyZWZveC5cXHJcXG4gKi9cXHJcXG5cXHJcXG5kZXRhaWxzIHtcXHJcXG4gIGRpc3BsYXk6IGJsb2NrO1xcclxcbn1cXHJcXG5cXHJcXG4vKlxcclxcbiAqIEFkZCB0aGUgY29ycmVjdCBkaXNwbGF5IGluIGFsbCBicm93c2Vycy5cXHJcXG4gKi9cXHJcXG5cXHJcXG5zdW1tYXJ5IHtcXHJcXG4gIGRpc3BsYXk6IGxpc3QtaXRlbTtcXHJcXG59XFxyXFxuXFxyXFxuLyogTWlzY1xcclxcbiAgID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09ICovXFxyXFxuXFxyXFxuLyoqXFxyXFxuICogQWRkIHRoZSBjb3JyZWN0IGRpc3BsYXkgaW4gSUUgMTArLlxcclxcbiAqL1xcclxcblxcclxcbnRlbXBsYXRlIHtcXHJcXG4gIGRpc3BsYXk6IG5vbmU7XFxyXFxufVxcclxcblxcclxcbi8qKlxcclxcbiAqIEFkZCB0aGUgY29ycmVjdCBkaXNwbGF5IGluIElFIDEwLlxcclxcbiAqL1xcclxcblxcclxcbltoaWRkZW5dIHtcXHJcXG4gIGRpc3BsYXk6IG5vbmU7XFxyXFxufVxcclxcblwiXSxcInNvdXJjZVJvb3RcIjpcIlwifV0pO1xuLy8gRXhwb3J0c1xuZXhwb3J0IGRlZmF1bHQgX19fQ1NTX0xPQURFUl9FWFBPUlRfX187XG4iLCIvLyBJbXBvcnRzXG5pbXBvcnQgX19fQ1NTX0xPQURFUl9BUElfU09VUkNFTUFQX0lNUE9SVF9fXyBmcm9tIFwiLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL3NvdXJjZU1hcHMuanNcIjtcbmltcG9ydCBfX19DU1NfTE9BREVSX0FQSV9JTVBPUlRfX18gZnJvbSBcIi4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9hcGkuanNcIjtcbnZhciBfX19DU1NfTE9BREVSX0VYUE9SVF9fXyA9IF9fX0NTU19MT0FERVJfQVBJX0lNUE9SVF9fXyhfX19DU1NfTE9BREVSX0FQSV9TT1VSQ0VNQVBfSU1QT1JUX19fKTtcbi8vIE1vZHVsZVxuX19fQ1NTX0xPQURFUl9FWFBPUlRfX18ucHVzaChbbW9kdWxlLmlkLCBcIi8qIGh0dHA6Ly9tZXllcndlYi5jb20vZXJpYy90b29scy9jc3MvcmVzZXQvXFxyXFxuICAgdjIuMCB8IDIwMTEwMTI2XFxyXFxuICAgTGljZW5zZTogbm9uZSAocHVibGljIGRvbWFpbilcXHJcXG4qL1xcclxcblxcclxcbmh0bWwsIGJvZHksIGRpdiwgc3BhbiwgYXBwbGV0LCBvYmplY3QsIGlmcmFtZSxcXHJcXG5oMSwgaDIsIGgzLCBoNCwgaDUsIGg2LCBwLCBibG9ja3F1b3RlLCBwcmUsXFxyXFxuYSwgYWJiciwgYWNyb255bSwgYWRkcmVzcywgYmlnLCBjaXRlLCBjb2RlLFxcclxcbmRlbCwgZGZuLCBlbSwgaW1nLCBpbnMsIGtiZCwgcSwgcywgc2FtcCxcXHJcXG5zbWFsbCwgc3RyaWtlLCBzdHJvbmcsIHN1Yiwgc3VwLCB0dCwgdmFyLFxcclxcbmIsIHUsIGksIGNlbnRlcixcXHJcXG5kbCwgZHQsIGRkLCBvbCwgdWwsIGxpLFxcclxcbmZpZWxkc2V0LCBmb3JtLCBsYWJlbCwgbGVnZW5kLFxcclxcbnRhYmxlLCBjYXB0aW9uLCB0Ym9keSwgdGZvb3QsIHRoZWFkLCB0ciwgdGgsIHRkLFxcclxcbmFydGljbGUsIGFzaWRlLCBjYW52YXMsIGRldGFpbHMsIGVtYmVkLFxcclxcbmZpZ3VyZSwgZmlnY2FwdGlvbiwgZm9vdGVyLCBoZWFkZXIsIGhncm91cCxcXHJcXG5tZW51LCBuYXYsIG91dHB1dCwgcnVieSwgc2VjdGlvbiwgc3VtbWFyeSxcXHJcXG50aW1lLCBtYXJrLCBhdWRpbywgdmlkZW8ge1xcclxcblxcdG1hcmdpbjogMDtcXHJcXG5cXHRwYWRkaW5nOiAwO1xcclxcblxcdGJvcmRlcjogMDtcXHJcXG5cXHRmb250LXNpemU6IDEwMCU7XFxyXFxuXFx0Zm9udDogaW5oZXJpdDtcXHJcXG5cXHR2ZXJ0aWNhbC1hbGlnbjogYmFzZWxpbmU7XFxyXFxufVxcclxcbi8qIEhUTUw1IGRpc3BsYXktcm9sZSByZXNldCBmb3Igb2xkZXIgYnJvd3NlcnMgKi9cXHJcXG5hcnRpY2xlLCBhc2lkZSwgZGV0YWlscywgZmlnY2FwdGlvbiwgZmlndXJlLFxcclxcbmZvb3RlciwgaGVhZGVyLCBoZ3JvdXAsIG1lbnUsIG5hdiwgc2VjdGlvbiB7XFxyXFxuXFx0ZGlzcGxheTogYmxvY2s7XFxyXFxufVxcclxcbmJvZHkge1xcclxcblxcdGxpbmUtaGVpZ2h0OiAxO1xcclxcbn1cXHJcXG5vbCwgdWwge1xcclxcblxcdGxpc3Qtc3R5bGU6IG5vbmU7XFxyXFxufVxcclxcbmJsb2NrcXVvdGUsIHEge1xcclxcblxcdHF1b3Rlczogbm9uZTtcXHJcXG59XFxyXFxuYmxvY2txdW90ZTpiZWZvcmUsIGJsb2NrcXVvdGU6YWZ0ZXIsXFxyXFxucTpiZWZvcmUsIHE6YWZ0ZXIge1xcclxcblxcdGNvbnRlbnQ6ICcnO1xcclxcblxcdGNvbnRlbnQ6IG5vbmU7XFxyXFxufVxcclxcbnRhYmxlIHtcXHJcXG5cXHRib3JkZXItY29sbGFwc2U6IGNvbGxhcHNlO1xcclxcblxcdGJvcmRlci1zcGFjaW5nOiAwO1xcclxcbn1cIiwgXCJcIix7XCJ2ZXJzaW9uXCI6MyxcInNvdXJjZXNcIjpbXCJ3ZWJwYWNrOi8vLi9hc3NldHMvc3R5bGVzL3Jlc2V0LmNzc1wiXSxcIm5hbWVzXCI6W10sXCJtYXBwaW5nc1wiOlwiQUFBQTs7O0NBR0M7O0FBRUQ7Ozs7Ozs7Ozs7Ozs7Q0FhQyxTQUFTO0NBQ1QsVUFBVTtDQUNWLFNBQVM7Q0FDVCxlQUFlO0NBQ2YsYUFBYTtDQUNiLHdCQUF3QjtBQUN6QjtBQUNBLGdEQUFnRDtBQUNoRDs7Q0FFQyxjQUFjO0FBQ2Y7QUFDQTtDQUNDLGNBQWM7QUFDZjtBQUNBO0NBQ0MsZ0JBQWdCO0FBQ2pCO0FBQ0E7Q0FDQyxZQUFZO0FBQ2I7QUFDQTs7Q0FFQyxXQUFXO0NBQ1gsYUFBYTtBQUNkO0FBQ0E7Q0FDQyx5QkFBeUI7Q0FDekIsaUJBQWlCO0FBQ2xCXCIsXCJzb3VyY2VzQ29udGVudFwiOltcIi8qIGh0dHA6Ly9tZXllcndlYi5jb20vZXJpYy90b29scy9jc3MvcmVzZXQvXFxyXFxuICAgdjIuMCB8IDIwMTEwMTI2XFxyXFxuICAgTGljZW5zZTogbm9uZSAocHVibGljIGRvbWFpbilcXHJcXG4qL1xcclxcblxcclxcbmh0bWwsIGJvZHksIGRpdiwgc3BhbiwgYXBwbGV0LCBvYmplY3QsIGlmcmFtZSxcXHJcXG5oMSwgaDIsIGgzLCBoNCwgaDUsIGg2LCBwLCBibG9ja3F1b3RlLCBwcmUsXFxyXFxuYSwgYWJiciwgYWNyb255bSwgYWRkcmVzcywgYmlnLCBjaXRlLCBjb2RlLFxcclxcbmRlbCwgZGZuLCBlbSwgaW1nLCBpbnMsIGtiZCwgcSwgcywgc2FtcCxcXHJcXG5zbWFsbCwgc3RyaWtlLCBzdHJvbmcsIHN1Yiwgc3VwLCB0dCwgdmFyLFxcclxcbmIsIHUsIGksIGNlbnRlcixcXHJcXG5kbCwgZHQsIGRkLCBvbCwgdWwsIGxpLFxcclxcbmZpZWxkc2V0LCBmb3JtLCBsYWJlbCwgbGVnZW5kLFxcclxcbnRhYmxlLCBjYXB0aW9uLCB0Ym9keSwgdGZvb3QsIHRoZWFkLCB0ciwgdGgsIHRkLFxcclxcbmFydGljbGUsIGFzaWRlLCBjYW52YXMsIGRldGFpbHMsIGVtYmVkLFxcclxcbmZpZ3VyZSwgZmlnY2FwdGlvbiwgZm9vdGVyLCBoZWFkZXIsIGhncm91cCxcXHJcXG5tZW51LCBuYXYsIG91dHB1dCwgcnVieSwgc2VjdGlvbiwgc3VtbWFyeSxcXHJcXG50aW1lLCBtYXJrLCBhdWRpbywgdmlkZW8ge1xcclxcblxcdG1hcmdpbjogMDtcXHJcXG5cXHRwYWRkaW5nOiAwO1xcclxcblxcdGJvcmRlcjogMDtcXHJcXG5cXHRmb250LXNpemU6IDEwMCU7XFxyXFxuXFx0Zm9udDogaW5oZXJpdDtcXHJcXG5cXHR2ZXJ0aWNhbC1hbGlnbjogYmFzZWxpbmU7XFxyXFxufVxcclxcbi8qIEhUTUw1IGRpc3BsYXktcm9sZSByZXNldCBmb3Igb2xkZXIgYnJvd3NlcnMgKi9cXHJcXG5hcnRpY2xlLCBhc2lkZSwgZGV0YWlscywgZmlnY2FwdGlvbiwgZmlndXJlLFxcclxcbmZvb3RlciwgaGVhZGVyLCBoZ3JvdXAsIG1lbnUsIG5hdiwgc2VjdGlvbiB7XFxyXFxuXFx0ZGlzcGxheTogYmxvY2s7XFxyXFxufVxcclxcbmJvZHkge1xcclxcblxcdGxpbmUtaGVpZ2h0OiAxO1xcclxcbn1cXHJcXG5vbCwgdWwge1xcclxcblxcdGxpc3Qtc3R5bGU6IG5vbmU7XFxyXFxufVxcclxcbmJsb2NrcXVvdGUsIHEge1xcclxcblxcdHF1b3Rlczogbm9uZTtcXHJcXG59XFxyXFxuYmxvY2txdW90ZTpiZWZvcmUsIGJsb2NrcXVvdGU6YWZ0ZXIsXFxyXFxucTpiZWZvcmUsIHE6YWZ0ZXIge1xcclxcblxcdGNvbnRlbnQ6ICcnO1xcclxcblxcdGNvbnRlbnQ6IG5vbmU7XFxyXFxufVxcclxcbnRhYmxlIHtcXHJcXG5cXHRib3JkZXItY29sbGFwc2U6IGNvbGxhcHNlO1xcclxcblxcdGJvcmRlci1zcGFjaW5nOiAwO1xcclxcbn1cIl0sXCJzb3VyY2VSb290XCI6XCJcIn1dKTtcbi8vIEV4cG9ydHNcbmV4cG9ydCBkZWZhdWx0IF9fX0NTU19MT0FERVJfRVhQT1JUX19fO1xuIiwiLy8gSW1wb3J0c1xuaW1wb3J0IF9fX0NTU19MT0FERVJfQVBJX1NPVVJDRU1BUF9JTVBPUlRfX18gZnJvbSBcIi4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9zb3VyY2VNYXBzLmpzXCI7XG5pbXBvcnQgX19fQ1NTX0xPQURFUl9BUElfSU1QT1JUX19fIGZyb20gXCIuLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvYXBpLmpzXCI7XG5pbXBvcnQgX19fQ1NTX0xPQURFUl9HRVRfVVJMX0lNUE9SVF9fXyBmcm9tIFwiLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL2dldFVybC5qc1wiO1xudmFyIF9fX0NTU19MT0FERVJfVVJMX0lNUE9SVF8wX19fID0gbmV3IFVSTChcIi4uL2ZvbnRzL2dsb3JpYS1oYWxsZWx1amFoLXYxNy1sYXRpbi1yZWd1bGFyLndvZmYyXCIsIGltcG9ydC5tZXRhLnVybCk7XG52YXIgX19fQ1NTX0xPQURFUl9VUkxfSU1QT1JUXzFfX18gPSBuZXcgVVJMKFwiLi4vZm9udHMvZ2xvcmlhLWhhbGxlbHVqYWgtdjE3LWxhdGluLXJlZ3VsYXIud29mZlwiLCBpbXBvcnQubWV0YS51cmwpO1xudmFyIF9fX0NTU19MT0FERVJfVVJMX0lNUE9SVF8yX19fID0gbmV3IFVSTChcIi4uL2ZvbnRzL25ldWNoYS12MTctbGF0aW4tcmVndWxhci53b2ZmMlwiLCBpbXBvcnQubWV0YS51cmwpO1xudmFyIF9fX0NTU19MT0FERVJfVVJMX0lNUE9SVF8zX19fID0gbmV3IFVSTChcIi4uL2ZvbnRzL25ldWNoYS12MTctbGF0aW4tcmVndWxhci53b2ZmXCIsIGltcG9ydC5tZXRhLnVybCk7XG52YXIgX19fQ1NTX0xPQURFUl9VUkxfSU1QT1JUXzRfX18gPSBuZXcgVVJMKFwiLi4vaW1nL2FwcC93YXRlcmNvbG9yLWJsdWUtYmctbGVmdC5qcGdcIiwgaW1wb3J0Lm1ldGEudXJsKTtcbnZhciBfX19DU1NfTE9BREVSX1VSTF9JTVBPUlRfNV9fXyA9IG5ldyBVUkwoXCIuLi9pbWcvYXBwL3dhdGVyY29sb3ItYmx1ZS1iZy1yaWdodC5qcGdcIiwgaW1wb3J0Lm1ldGEudXJsKTtcbnZhciBfX19DU1NfTE9BREVSX1VSTF9JTVBPUlRfNl9fXyA9IG5ldyBVUkwoXCIuLi9pbWcvYXBwL3dhdGVyY29sb3Itd2F2ZXMtMDEtdXAucG5nXCIsIGltcG9ydC5tZXRhLnVybCk7XG52YXIgX19fQ1NTX0xPQURFUl9VUkxfSU1QT1JUXzdfX18gPSBuZXcgVVJMKFwiLi4vaW1nL2FwcC93YXRlcmNvbG9yLXdhdmVzLTAxLWRvd24ucG5nXCIsIGltcG9ydC5tZXRhLnVybCk7XG52YXIgX19fQ1NTX0xPQURFUl9VUkxfSU1QT1JUXzhfX18gPSBuZXcgVVJMKFwiLi4vaW1nL2FwcC93YXRlcmNvbG9yLW1lbnUtYnV0dG9uLTAxLnBuZ1wiLCBpbXBvcnQubWV0YS51cmwpO1xudmFyIF9fX0NTU19MT0FERVJfVVJMX0lNUE9SVF85X19fID0gbmV3IFVSTChcIi4uL2ltZy9hcHAvd2F0ZXJjb2xvci1yZWQtY3Jvc3MtYnV0dG9uLTAxLmpwZ1wiLCBpbXBvcnQubWV0YS51cmwpO1xudmFyIF9fX0NTU19MT0FERVJfVVJMX0lNUE9SVF8xMF9fXyA9IG5ldyBVUkwoXCIuLi9pbWcvYXBwL3dhdGVyY29sb3ItYnV0dG9uLXN0YXJ0LTAxLnBuZ1wiLCBpbXBvcnQubWV0YS51cmwpO1xudmFyIF9fX0NTU19MT0FERVJfVVJMX0lNUE9SVF8xMV9fXyA9IG5ldyBVUkwoXCIuLi9pbWcvYXBwL3dhdGVyY29sb3ItYnV0dG9uLXJlcGVhdC0wMS5wbmdcIiwgaW1wb3J0Lm1ldGEudXJsKTtcbnZhciBfX19DU1NfTE9BREVSX1VSTF9JTVBPUlRfMTJfX18gPSBuZXcgVVJMKFwiLi4vaW1nL2FwcC93YXRlcmNvbG9yLWJ1dHRvbi1yZXBlYXQtMDIucG5nXCIsIGltcG9ydC5tZXRhLnVybCk7XG52YXIgX19fQ1NTX0xPQURFUl9VUkxfSU1QT1JUXzEzX19fID0gbmV3IFVSTChcIi4uL2ltZy9hcHAvd2F0ZXJjb2xvci1reXRlcy0wMS5qcGdcIiwgaW1wb3J0Lm1ldGEudXJsKTtcbnZhciBfX19DU1NfTE9BREVSX1VSTF9JTVBPUlRfMTRfX18gPSBuZXcgVVJMKFwiLi4vaW1nL2FwcC93YXRlcmNvbG9yLWJ1dGVyZmx5LTAxLmpwZ1wiLCBpbXBvcnQubWV0YS51cmwpO1xudmFyIF9fX0NTU19MT0FERVJfVVJMX0lNUE9SVF8xNV9fXyA9IG5ldyBVUkwoXCIuLi9pbWcvYXBwL3dhdGVyY29sb3ItbGluZS0wMi1yaWdodC5wbmdcIiwgaW1wb3J0Lm1ldGEudXJsKTtcbnZhciBfX19DU1NfTE9BREVSX1VSTF9JTVBPUlRfMTZfX18gPSBuZXcgVVJMKFwiLi4vaW1nL2FwcC93YXRlcmNvbG9yLWxpbmUtMDIucG5nXCIsIGltcG9ydC5tZXRhLnVybCk7XG52YXIgX19fQ1NTX0xPQURFUl9VUkxfSU1QT1JUXzE3X19fID0gbmV3IFVSTChcIi4uL2ltZy9hcHAvd2F0ZXJjb2xvci1saW5lLTAxLnBuZ1wiLCBpbXBvcnQubWV0YS51cmwpO1xudmFyIF9fX0NTU19MT0FERVJfVVJMX0lNUE9SVF8xOF9fXyA9IG5ldyBVUkwoXCIuLi9pbWcvYXBwL3dhdGVyY29sb3ItYmx1ZS1jYXJkLWJnLTAxLmpwZ1wiLCBpbXBvcnQubWV0YS51cmwpO1xudmFyIF9fX0NTU19MT0FERVJfVVJMX0lNUE9SVF8xOV9fXyA9IG5ldyBVUkwoXCIuLi9pbWcvYXBwL3dhdGVyY29sb3ItZmxpcC1idXR0b24tMDEucG5nXCIsIGltcG9ydC5tZXRhLnVybCk7XG52YXIgX19fQ1NTX0xPQURFUl9VUkxfSU1QT1JUXzIwX19fID0gbmV3IFVSTChcIi4uL2ltZy9hcHAvd2F0ZXJjb2xvci1ncmVlbi1saW5lLTAxLnBuZ1wiLCBpbXBvcnQubWV0YS51cmwpO1xudmFyIF9fX0NTU19MT0FERVJfVVJMX0lNUE9SVF8yMV9fXyA9IG5ldyBVUkwoXCIuLi9pbWcvYXBwL3dhdGVyY29sb3ItcmVkLWxpbmUtMDEucG5nXCIsIGltcG9ydC5tZXRhLnVybCk7XG52YXIgX19fQ1NTX0xPQURFUl9FWFBPUlRfX18gPSBfX19DU1NfTE9BREVSX0FQSV9JTVBPUlRfX18oX19fQ1NTX0xPQURFUl9BUElfU09VUkNFTUFQX0lNUE9SVF9fXyk7XG52YXIgX19fQ1NTX0xPQURFUl9VUkxfUkVQTEFDRU1FTlRfMF9fXyA9IF9fX0NTU19MT0FERVJfR0VUX1VSTF9JTVBPUlRfX18oX19fQ1NTX0xPQURFUl9VUkxfSU1QT1JUXzBfX18pO1xudmFyIF9fX0NTU19MT0FERVJfVVJMX1JFUExBQ0VNRU5UXzFfX18gPSBfX19DU1NfTE9BREVSX0dFVF9VUkxfSU1QT1JUX19fKF9fX0NTU19MT0FERVJfVVJMX0lNUE9SVF8xX19fKTtcbnZhciBfX19DU1NfTE9BREVSX1VSTF9SRVBMQUNFTUVOVF8yX19fID0gX19fQ1NTX0xPQURFUl9HRVRfVVJMX0lNUE9SVF9fXyhfX19DU1NfTE9BREVSX1VSTF9JTVBPUlRfMl9fXyk7XG52YXIgX19fQ1NTX0xPQURFUl9VUkxfUkVQTEFDRU1FTlRfM19fXyA9IF9fX0NTU19MT0FERVJfR0VUX1VSTF9JTVBPUlRfX18oX19fQ1NTX0xPQURFUl9VUkxfSU1QT1JUXzNfX18pO1xudmFyIF9fX0NTU19MT0FERVJfVVJMX1JFUExBQ0VNRU5UXzRfX18gPSBfX19DU1NfTE9BREVSX0dFVF9VUkxfSU1QT1JUX19fKF9fX0NTU19MT0FERVJfVVJMX0lNUE9SVF80X19fKTtcbnZhciBfX19DU1NfTE9BREVSX1VSTF9SRVBMQUNFTUVOVF81X19fID0gX19fQ1NTX0xPQURFUl9HRVRfVVJMX0lNUE9SVF9fXyhfX19DU1NfTE9BREVSX1VSTF9JTVBPUlRfNV9fXyk7XG52YXIgX19fQ1NTX0xPQURFUl9VUkxfUkVQTEFDRU1FTlRfNl9fXyA9IF9fX0NTU19MT0FERVJfR0VUX1VSTF9JTVBPUlRfX18oX19fQ1NTX0xPQURFUl9VUkxfSU1QT1JUXzZfX18pO1xudmFyIF9fX0NTU19MT0FERVJfVVJMX1JFUExBQ0VNRU5UXzdfX18gPSBfX19DU1NfTE9BREVSX0dFVF9VUkxfSU1QT1JUX19fKF9fX0NTU19MT0FERVJfVVJMX0lNUE9SVF83X19fKTtcbnZhciBfX19DU1NfTE9BREVSX1VSTF9SRVBMQUNFTUVOVF84X19fID0gX19fQ1NTX0xPQURFUl9HRVRfVVJMX0lNUE9SVF9fXyhfX19DU1NfTE9BREVSX1VSTF9JTVBPUlRfOF9fXyk7XG52YXIgX19fQ1NTX0xPQURFUl9VUkxfUkVQTEFDRU1FTlRfOV9fXyA9IF9fX0NTU19MT0FERVJfR0VUX1VSTF9JTVBPUlRfX18oX19fQ1NTX0xPQURFUl9VUkxfSU1QT1JUXzlfX18pO1xudmFyIF9fX0NTU19MT0FERVJfVVJMX1JFUExBQ0VNRU5UXzEwX19fID0gX19fQ1NTX0xPQURFUl9HRVRfVVJMX0lNUE9SVF9fXyhfX19DU1NfTE9BREVSX1VSTF9JTVBPUlRfMTBfX18pO1xudmFyIF9fX0NTU19MT0FERVJfVVJMX1JFUExBQ0VNRU5UXzExX19fID0gX19fQ1NTX0xPQURFUl9HRVRfVVJMX0lNUE9SVF9fXyhfX19DU1NfTE9BREVSX1VSTF9JTVBPUlRfMTFfX18pO1xudmFyIF9fX0NTU19MT0FERVJfVVJMX1JFUExBQ0VNRU5UXzEyX19fID0gX19fQ1NTX0xPQURFUl9HRVRfVVJMX0lNUE9SVF9fXyhfX19DU1NfTE9BREVSX1VSTF9JTVBPUlRfMTJfX18pO1xudmFyIF9fX0NTU19MT0FERVJfVVJMX1JFUExBQ0VNRU5UXzEzX19fID0gX19fQ1NTX0xPQURFUl9HRVRfVVJMX0lNUE9SVF9fXyhfX19DU1NfTE9BREVSX1VSTF9JTVBPUlRfMTNfX18pO1xudmFyIF9fX0NTU19MT0FERVJfVVJMX1JFUExBQ0VNRU5UXzE0X19fID0gX19fQ1NTX0xPQURFUl9HRVRfVVJMX0lNUE9SVF9fXyhfX19DU1NfTE9BREVSX1VSTF9JTVBPUlRfMTRfX18pO1xudmFyIF9fX0NTU19MT0FERVJfVVJMX1JFUExBQ0VNRU5UXzE1X19fID0gX19fQ1NTX0xPQURFUl9HRVRfVVJMX0lNUE9SVF9fXyhfX19DU1NfTE9BREVSX1VSTF9JTVBPUlRfMTVfX18pO1xudmFyIF9fX0NTU19MT0FERVJfVVJMX1JFUExBQ0VNRU5UXzE2X19fID0gX19fQ1NTX0xPQURFUl9HRVRfVVJMX0lNUE9SVF9fXyhfX19DU1NfTE9BREVSX1VSTF9JTVBPUlRfMTZfX18pO1xudmFyIF9fX0NTU19MT0FERVJfVVJMX1JFUExBQ0VNRU5UXzE3X19fID0gX19fQ1NTX0xPQURFUl9HRVRfVVJMX0lNUE9SVF9fXyhfX19DU1NfTE9BREVSX1VSTF9JTVBPUlRfMTdfX18pO1xudmFyIF9fX0NTU19MT0FERVJfVVJMX1JFUExBQ0VNRU5UXzE4X19fID0gX19fQ1NTX0xPQURFUl9HRVRfVVJMX0lNUE9SVF9fXyhfX19DU1NfTE9BREVSX1VSTF9JTVBPUlRfMThfX18pO1xudmFyIF9fX0NTU19MT0FERVJfVVJMX1JFUExBQ0VNRU5UXzE5X19fID0gX19fQ1NTX0xPQURFUl9HRVRfVVJMX0lNUE9SVF9fXyhfX19DU1NfTE9BREVSX1VSTF9JTVBPUlRfMTlfX18pO1xudmFyIF9fX0NTU19MT0FERVJfVVJMX1JFUExBQ0VNRU5UXzIwX19fID0gX19fQ1NTX0xPQURFUl9HRVRfVVJMX0lNUE9SVF9fXyhfX19DU1NfTE9BREVSX1VSTF9JTVBPUlRfMjBfX18pO1xudmFyIF9fX0NTU19MT0FERVJfVVJMX1JFUExBQ0VNRU5UXzIxX19fID0gX19fQ1NTX0xPQURFUl9HRVRfVVJMX0lNUE9SVF9fXyhfX19DU1NfTE9BREVSX1VSTF9JTVBPUlRfMjFfX18pO1xuLy8gTW9kdWxlXG5fX19DU1NfTE9BREVSX0VYUE9SVF9fXy5wdXNoKFttb2R1bGUuaWQsIFwiLyogZ2xvcmlhLWhhbGxlbHVqYWgtcmVndWxhciAtIGxhdGluICovXFxyXFxuQGZvbnQtZmFjZSB7XFxyXFxuICAgIGZvbnQtZmFtaWx5OiAnR2xvcmlhIEhhbGxlbHVqYWgnO1xcclxcbiAgICBmb250LXN0eWxlOiBub3JtYWw7XFxyXFxuICAgIGZvbnQtd2VpZ2h0OiA0MDA7XFxyXFxuICAgIHNyYzogbG9jYWwoJycpLFxcclxcbiAgICAgICAgIHVybChcIiArIF9fX0NTU19MT0FERVJfVVJMX1JFUExBQ0VNRU5UXzBfX18gKyBcIikgZm9ybWF0KCd3b2ZmMicpLCAvKiBDaHJvbWUgMjYrLCBPcGVyYSAyMyssIEZpcmVmb3ggMzkrICovXFxyXFxuICAgICAgICAgdXJsKFwiICsgX19fQ1NTX0xPQURFUl9VUkxfUkVQTEFDRU1FTlRfMV9fXyArIFwiKSBmb3JtYXQoJ3dvZmYnKTsgLyogQ2hyb21lIDYrLCBGaXJlZm94IDMuNissIElFIDkrLCBTYWZhcmkgNS4xKyAqL1xcclxcbiAgfVxcclxcblxcclxcbi8qIG5ldWNoYS1yZWd1bGFyIC0gbGF0aW4gKi9cXHJcXG5AZm9udC1mYWNlIHtcXHJcXG4gICAgZm9udC1mYW1pbHk6ICdOZXVjaGEnO1xcclxcbiAgICBmb250LXN0eWxlOiBub3JtYWw7XFxyXFxuICAgIGZvbnQtd2VpZ2h0OiA0MDA7XFxyXFxuICAgIHNyYzogbG9jYWwoJycpLFxcclxcbiAgICAgICAgIHVybChcIiArIF9fX0NTU19MT0FERVJfVVJMX1JFUExBQ0VNRU5UXzJfX18gKyBcIikgZm9ybWF0KCd3b2ZmMicpLCAvKiBDaHJvbWUgMjYrLCBPcGVyYSAyMyssIEZpcmVmb3ggMzkrICovXFxyXFxuICAgICAgICAgdXJsKFwiICsgX19fQ1NTX0xPQURFUl9VUkxfUkVQTEFDRU1FTlRfM19fXyArIFwiKSBmb3JtYXQoJ3dvZmYnKTsgLyogQ2hyb21lIDYrLCBGaXJlZm94IDMuNissIElFIDkrLCBTYWZhcmkgNS4xKyAqL1xcclxcbiAgfVxcclxcblxcclxcbi8qIGJvcmRlci1ib3ggbW9kZWwgZm9yIGFsbCBlbGVtZW50cyAqL1xcclxcblxcclxcbmh0bWwge1xcclxcbiAgICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xcclxcbn1cXHJcXG5cXHJcXG4qLCAqOjpiZWZvcmUsICo6OmFmdGVyIHtcXHJcXG4gICAgYm94LXNpemluZzogaW5oZXJpdDtcXHJcXG59XFxyXFxuXFxyXFxuLyogLS0tIFBhZ2UgY29sb3Igc3R5bGluZyAtLS0gKi9cXHJcXG5cXHJcXG46cm9vdCB7XFxyXFxuICAgIC0tY29sb3ItYmctbWFpbi0xOiAjZmZmZmZmO1xcclxcbiAgICAtLWNvbG9yLWJnLW1haW4tMjogI2RiZjVmODtcXHJcXG4gICAgLS1jb2xvci1iZy1tYWluLTM6ICNlOWY1ZmY7XFxyXFxuICAgIC0tY29sb3ItYmctbWFpbi00OiAjZjBjMmNkNjM7XFxyXFxuICAgIC0tY29sb3ItZm9udC0xOiAjMzA3MGE2O1xcclxcbn1cXHJcXG5cXHJcXG4vKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tICovXFxyXFxuXFxyXFxuYm9keSB7XFxyXFxuICAgIHdpZHRoOiAxMDAlO1xcclxcbiAgICBkaXNwbGF5OiBmbGV4O1xcclxcbiAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcclxcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xcclxcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1jb2xvci1iZy1tYWluLTEpO1xcclxcbiAgICBiYWNrZ3JvdW5kLWltYWdlOiB1cmwoXCIgKyBfX19DU1NfTE9BREVSX1VSTF9SRVBMQUNFTUVOVF80X19fICsgXCIpLCB1cmwoXCIgKyBfX19DU1NfTE9BREVSX1VSTF9SRVBMQUNFTUVOVF81X19fICsgXCIpO1xcclxcbiAgICBiYWNrZ3JvdW5kLWF0dGFjaG1lbnQ6IGZpeGVkO1xcclxcbiAgICBiYWNrZ3JvdW5kLXBvc2l0aW9uOiBsZWZ0IHRvcCwgcmlnaHQgYm90dG9tO1xcclxcbiAgICBiYWNrZ3JvdW5kLXJlcGVhdDogcmVwZWF0LXk7XFxyXFxuICAgIGJhY2tncm91bmQtc2l6ZTogMTUlIGF1dG87XFxyXFxuICAgIGZvbnQtZmFtaWx5OiAnTmV1Y2hhJywgY3Vyc2l2ZTtcXHJcXG4gICAgY29sb3I6IHZhcigtLWNvbG9yLWZvbnQtMSk7XFxyXFxufVxcclxcblxcclxcbmJvZHkub3BlbmVkLW1lbnUge1xcclxcbiAgICBvdmVyZmxvdy15OiBoaWRkZW47XFxyXFxufVxcclxcblxcclxcbi5pbmFjdGl2ZSB7XFxyXFxuICAgIHZpc2liaWxpdHk6IGhpZGRlbjtcXHJcXG4gICAgcG9zaXRpb246IGZpeGVkO1xcclxcbiAgICB0b3A6IDA7XFxyXFxufVxcclxcblxcclxcbi5ncmFwaGljLCBpbWcge1xcclxcbiAgICB3aWR0aDogMTAwJTtcXHJcXG4gICAgaGVpZ2h0OiBhdXRvO1xcclxcbiAgICBwYWRkaW5nOiAwO1xcclxcbiAgICBtYXJnaW46IDA7XFxyXFxufVxcclxcblxcclxcbi5jb250YWluZXItY2VudGVyZWQge1xcclxcbiAgICBtYXgtd2lkdGg6IDE0NDBweDtcXHJcXG4gICAgbWluLXdpZHRoOiAxNDQwcHg7XFxyXFxuICAgIG1hcmdpbjogMCBhdXRvO1xcclxcbn1cXHJcXG5cXHJcXG5oZWFkZXIuY29udGFpbmVyLWNlbnRlcmVkIHtcXHJcXG4gICAgZGlzcGxheTogZmxleDtcXHJcXG4gICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXHJcXG4gICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxyXFxuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxyXFxuICAgIHBvc2l0aW9uOiAtd2Via2l0LXN0aWNreTtcXHJcXG4gICAgcG9zaXRpb246IHN0aWNreTtcXHJcXG4gICAgdG9wOiAwO1xcclxcbiAgICB6LWluZGV4OiA4O1xcclxcbiAgICBtYXJnaW4tdG9wOiAwO1xcclxcbiAgICB0cmFuc2l0aW9uOiBtYXJnaW4gMXM7XFxyXFxufVxcclxcblxcclxcbmhlYWRlci5tYWluLXBhZ2Uge1xcclxcbiAgICBtYXJnaW4tdG9wOiAzODBweDtcXHJcXG59XFxyXFxuXFxyXFxuaGVhZGVyIC5oZWFkZXItaW1hZ2Uge1xcclxcbiAgICB3aWR0aDogNzAlO1xcclxcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XFxyXFxuICAgIHRvcDogLTM3NnB4O1xcclxcbn1cXHJcXG5cXHJcXG4ubWFpbi1jb250cm9scyB7XFxyXFxuICAgIHdpZHRoOiA4MCU7XFxyXFxuICAgIG1pbi1oZWlnaHQ6IDE1MHB4O1xcclxcbiAgICBkaXNwbGF5OiBmbGV4O1xcclxcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWFyb3VuZDtcXHJcXG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXHJcXG4gICAgYm9yZGVyLXJhZGl1czogMzVweDtcXHJcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogd2hpdGU7XFxyXFxuICAgIGJhY2tncm91bmQtaW1hZ2U6IHVybChcIiArIF9fX0NTU19MT0FERVJfVVJMX1JFUExBQ0VNRU5UXzZfX18gKyBcIiksIHVybChcIiArIF9fX0NTU19MT0FERVJfVVJMX1JFUExBQ0VNRU5UXzdfX18gKyBcIik7XFxyXFxuICAgIGJhY2tncm91bmQtcG9zaXRpb246IDEwMCUgMCwgMCAxMDAlO1xcclxcbiAgICBiYWNrZ3JvdW5kLXJlcGVhdDogcmVwZWF0LXg7XFxyXFxuICAgIGJhY2tncm91bmQtc2l6ZTogYXV0byAyOCU7XFxyXFxuICAgIHotaW5kZXg6IDU7XFxyXFxufVxcclxcblxcclxcbi5nYW1lLWNvbnRyb2xzIHtcXHJcXG4gICAgd2lkdGg6IDEwMHZ3O1xcclxcbiAgICBib3JkZXItcmFkaXVzOiAxMHB4O1xcclxcbiAgICBtaW4taGVpZ2h0OiAxMDBweDtcXHJcXG4gICAgcGFkZGluZzogMTBweCAwO1xcclxcbiAgICBkaXNwbGF5OiBmbGV4O1xcclxcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWFyb3VuZDtcXHJcXG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXHJcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogd2hpdGU7XFxyXFxuICAgIGJvcmRlci1yYWRpdXM6IDA7XFxyXFxuICAgIGJhY2tncm91bmQtaW1hZ2U6IHVybChcIiArIF9fX0NTU19MT0FERVJfVVJMX1JFUExBQ0VNRU5UXzRfX18gKyBcIiksIHVybChcIiArIF9fX0NTU19MT0FERVJfVVJMX1JFUExBQ0VNRU5UXzVfX18gKyBcIik7XFxyXFxuICAgIGJhY2tncm91bmQtYXR0YWNobWVudDogZml4ZWQ7XFxyXFxuICAgIGJhY2tncm91bmQtcG9zaXRpb246IGxlZnQgdG9wLCByaWdodCBib3R0b207XFxyXFxuICAgIGJhY2tncm91bmQtcmVwZWF0OiByZXBlYXQteTtcXHJcXG4gICAgYmFja2dyb3VuZC1zaXplOiAxNSUgYXV0bztcXHJcXG59XFxyXFxuXFxyXFxuaDEge1xcclxcbiAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XFxyXFxuICAgIGZvbnQtZmFtaWx5OiAnR2xvcmlhIEhhbGxlbHVqYWgnLCBjdXJzaXZlO1xcclxcbiAgICB0ZXh0LXNoYWRvdzogMHB4IDBweCA1cHggIzdlZDNmZjtcXHJcXG59XFxyXFxuXFxyXFxuLmJ1dHRvbjpob3ZlciB7XFxyXFxuICAgIGN1cnNvcjogcG9pbnRlcjtcXHJcXG59XFxyXFxuXFxyXFxuLm1lbnUtYnV0dG9uIHtcXHJcXG4gICAgei1pbmRleDogMTA7XFxyXFxuICAgIHdpZHRoOiAzNnB4O1xcclxcbiAgICBoZWlnaHQ6IDM2cHg7XFxyXFxuICAgIGJhY2tncm91bmQtaW1hZ2U6IHVybChcIiArIF9fX0NTU19MT0FERVJfVVJMX1JFUExBQ0VNRU5UXzhfX18gKyBcIik7XFxyXFxuICAgIGJhY2tncm91bmQtc2l6ZTogY292ZXI7XFxyXFxuICAgIHRyYW5zaXRpb246IHRyYW5zZm9ybSAxcztcXHJcXG59XFxyXFxuXFxyXFxuLm1lbnUtYnV0dG9uLm9wZW5lZC1tZW51IHtcXHJcXG4gICAgdHJhbnNmb3JtOiByb3RhdGUoMTgwZGVnKTtcXHJcXG59XFxyXFxuXFxyXFxuLmJ1dHRvbi5jbG9zZS1tZW51IHtcXHJcXG4gICAgcG9zaXRpb246IGFic29sdXRlO1xcclxcbiAgICB0b3A6IDIwcHg7XFxyXFxuICAgIHJpZ2h0OiAyMHB4O1xcclxcbiAgICB3aWR0aDogNTBweDtcXHJcXG4gICAgaGVpZ2h0OiA1MHB4O1xcclxcbiAgICBib3JkZXItcmFkaXVzOiA1MCU7XFxyXFxuICAgIGJhY2tncm91bmQtaW1hZ2U6IHVybChcIiArIF9fX0NTU19MT0FERVJfVVJMX1JFUExBQ0VNRU5UXzlfX18gKyBcIik7XFxyXFxuICAgIGJhY2tncm91bmQtc2l6ZTogY292ZXI7XFxyXFxuXFxyXFxufVxcclxcblxcclxcbi5zd2l0Y2gge1xcclxcbiAgICB3aWR0aDogMTEwcHg7XFxyXFxuICAgIGJhY2tncm91bmQtY29sb3I6ICNmYWY4ZmQ7XFxyXFxuICAgIGRpc3BsYXk6IGZsZXg7XFxyXFxuICAgIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjtcXHJcXG4gICAgYm9yZGVyLXJhZGl1czogNjBweDtcXHJcXG4gICAgcG9zaXRpb246IHJlbGF0aXZlO1xcclxcbiAgICBib3JkZXI6IDJweCB2YXIoLS1jb2xvci1mb250LTEpIHNvbGlkO1xcclxcbn1cXHJcXG5cXHJcXG4uc3dpdGNoLmRpc2FibGVkOmhvdmVyIHtcXHJcXG4gICAgY3Vyc29yOiBub3QtYWxsb3dlZDtcXHJcXG59XFxyXFxuXFxyXFxuLnN3aXRjaC1yYWlsIHtcXHJcXG4gICAgcG9zaXRpb246IGFic29sdXRlO1xcclxcbiAgICBsZWZ0OiAwO1xcclxcbiAgICB3aWR0aDogMTAwJTtcXHJcXG4gICAgaGVpZ2h0OiAxMDAlO1xcclxcbiAgICBib3JkZXItcmFkaXVzOiBpbmhlcml0O1xcclxcbn1cXHJcXG5cXHJcXG4uc3dpdGNoLXJvbGxlciB7XFxyXFxuICAgIHdpZHRoOiA1NXB4O1xcclxcbiAgICBoZWlnaHQ6IDEwMCU7XFxyXFxuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXHJcXG4gICAgbGVmdDogMDtcXHJcXG4gICAgYm9yZGVyLXJhZGl1czogaW5oZXJpdDtcXHJcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogIzc5ZDFmMzMwO1xcclxcbiAgICB6LWluZGV4OiAxMDtcXHJcXG4gICAgdHJhbnNpdGlvbjogbGVmdCAwLjdzO1xcclxcbiAgICBib3JkZXI6IDFweCB2YXIoLS1jb2xvci1mb250LTEpIHNvbGlkO1xcclxcbn1cXHJcXG5cXHJcXG4uc3dpdGNoLnN3aXRjaC1vbiAuc3dpdGNoLXJvbGxlciB7XFxyXFxuICAgIGxlZnQ6IDUzcHg7XFxyXFxufVxcclxcblxcclxcbi5zd2l0Y2gtdHJpZ2dlciB7XFxyXFxuICAgIG1hcmdpbjogMCAxMHB4O1xcclxcbiAgICBoZWlnaHQ6IDQwcHg7XFxyXFxuICAgIHotaW5kZXg6IDk7XFxyXFxuICAgIHBhZGRpbmc6IDEwcHggMDtcXHJcXG4gICAgdGV4dC1hbGlnbjogY2VudGVyO1xcclxcbiAgICBmb250LXNpemU6IDIwcHg7XFxyXFxufVxcclxcblxcclxcbi5nYW1lLWJ1dHRvbiB7XFxyXFxuICAgIHdpZHRoOiAxMDBweDtcXHJcXG4gICAgaGVpZ2h0OiAxMDBweDtcXHJcXG4gICAgYm9yZGVyLXJhZGl1czogNTBweDtcXHJcXG4gICAgYmFja2dyb3VuZC1wb3NpdGlvbjogY2VudGVyO1xcclxcbiAgICBiYWNrZ3JvdW5kLXJlcGVhdDogbm8tcmVwZWF0O1xcclxcbiAgICBiYWNrZ3JvdW5kLXNpemU6IGNvdmVyO1xcclxcbn1cXHJcXG5cXHJcXG4uZ2FtZS1idXR0b24uc3RhcnQtYnV0dG9uIHtcXHJcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogIzAzOTIyNztcXHJcXG4gICAgYmFja2dyb3VuZC1pbWFnZTogdXJsKFwiICsgX19fQ1NTX0xPQURFUl9VUkxfUkVQTEFDRU1FTlRfMTBfX18gKyBcIik7XFxyXFxufVxcclxcblxcclxcbi5nYW1lLWJ1dHRvbi5yZXBlYXQtYnV0dG9uIHtcXHJcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0tY29sb3ItZm9udC0xKTtcXHJcXG4gICAgYmFja2dyb3VuZC1pbWFnZTogdXJsKFwiICsgX19fQ1NTX0xPQURFUl9VUkxfUkVQTEFDRU1FTlRfMTFfX18gKyBcIik7XFxyXFxufVxcclxcblxcclxcbi5yZXBlYXQtYnV0dG9uIHtcXHJcXG4gICAgYW5pbWF0aW9uLW5hbWU6IHJvdGF0aW9uO1xcclxcbiAgICBhbmltYXRpb24tZHVyYXRpb246IDRzO1xcclxcbiAgICBhbmltYXRpb24tdGltaW5nLWZ1bmN0aW9uOiBsaW5lYXI7XFxyXFxuICAgIGFuaW1hdGlvbi1pdGVyYXRpb24tY291bnQ6IGluZmluaXRlO1xcclxcbn1cXHJcXG5cXHJcXG4ucmVwZWF0LWJ1dHRvbjpob3ZlciB7XFxyXFxuICAgIGJhY2tncm91bmQtaW1hZ2U6IHVybChcIiArIF9fX0NTU19MT0FERVJfVVJMX1JFUExBQ0VNRU5UXzEyX19fICsgXCIpO1xcclxcbn1cXHJcXG5cXHJcXG4uZ2FtZS1wcm9ncmVzcyB7XFxyXFxuICAgIHdpZHRoOiAyMjBweDtcXHJcXG4gICAgZGlzcGxheTogZmxleDtcXHJcXG4gICAganVzdGlmeS1jb250ZW50OiBzcGFjZS1hcm91bmQ7XFxyXFxuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxyXFxufVxcclxcblxcclxcbi5nYW1lLWluZGljYXRvciB7XFxyXFxuICAgIHdpZHRoOiAxNTBweDtcXHJcXG4gICAgaGVpZ2h0OiA0MHB4O1xcclxcbiAgICBib3JkZXItcmFkaXVzOiAxOHB4O1xcclxcbiAgICBkaXNwbGF5OiBmbGV4O1xcclxcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IGZsZXgtc3RhcnQ7XFxyXFxuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxyXFxuICAgIGJhY2tncm91bmQtY29sb3I6ICNmYWY4ZmQ7XFxyXFxuICAgIGJvcmRlcjogMXB4IHZhcigtLWNvbG9yLWZvbnQtMSkgc29saWQ7XFxyXFxuICAgIGJveC1zaGFkb3c6IDBweCAwcHggMTBweCAjN2VkM2ZmO1xcclxcbn1cXHJcXG5cXHJcXG4uc3RhciB7XFxyXFxuICAgIHdpZHRoOiAzMHB4O1xcclxcbn1cXHJcXG5cXHJcXG4uZ2FtZS1zY29yZSB7XFxyXFxuICAgIHRleHQtYWxpZ246IGNlbnRlcjtcXHJcXG59XFxyXFxuXFxyXFxuLmdhbWUtc2NvcmUgLmNvcnJlY3Qge1xcclxcbiAgICBjb2xvcjogIzAwODAwMDtcXHJcXG59XFxyXFxuXFxyXFxuLmdhbWUtc2NvcmUgLndyb25nIHtcXHJcXG4gICAgY29sb3I6ICNmZjAwMDA7XFxyXFxufVxcclxcblxcclxcbm5hdiB7XFxyXFxuICAgIGxlZnQ6IC0zMjBweDtcXHJcXG4gICAgcG9zaXRpb246IGZpeGVkO1xcclxcbiAgICB0b3A6IDA7XFxyXFxuICAgIHdpZHRoOiAzMjBweDtcXHJcXG4gICAgaGVpZ2h0OiAxMDAlO1xcclxcbiAgICBvdmVyZmxvdy15OiBhdXRvO1xcclxcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1jb2xvci1iZy1tYWluLTEpO1xcclxcbiAgICB6LWluZGV4OiAxMTtcXHJcXG4gICAgYmFja2dyb3VuZC1pbWFnZTogdXJsKFwiICsgX19fQ1NTX0xPQURFUl9VUkxfUkVQTEFDRU1FTlRfMTNfX18gKyBcIiksIHVybChcIiArIF9fX0NTU19MT0FERVJfVVJMX1JFUExBQ0VNRU5UXzE0X19fICsgXCIpO1xcclxcbiAgICBiYWNrZ3JvdW5kLXNpemU6IDQ1MHB4IGF1dG8sIDE0NHB4IGF1dG87XFxyXFxuICAgIGJhY2tncm91bmQtcG9zaXRpb246IDBweCAwcHgsIDEyMnB4IDEwMCU7XFxyXFxuICAgIGJhY2tncm91bmQtcmVwZWF0OiBuby1yZXBlYXQsIG5vLXJlcGVhdDtcXHJcXG4gICAgYm94LXNoYWRvdzogbm9uZTtcXHJcXG4gICAgdHJhbnNpdGlvbi1wcm9wZXJ0eTogbGVmdCwgYmFja2dyb3VuZC1wb3NpdGlvbiwgYmFja2dyb3VuZC1zaXplLCBib3gtc2hhZG93O1xcclxcbiAgICB0cmFuc2l0aW9uLWR1cmF0aW9uOiAxLjJzLDVzO1xcclxcbn1cXHJcXG5cXHJcXG5uYXYub3BlbmVkLW1lbnUge1xcclxcbiAgICBsZWZ0OiAwO1xcclxcbiAgICBib3gtc2hhZG93OiAwcHggMCAyMHB4IDFweCAjOTRjYTY4LCAwcHggMCA4MHB4IDIwcHggI2YwZTA4MCwgNTBweCAwIDI1MHB4IDUwcHggdmFyKC0tY29sb3ItZm9udC0xKTtcXHJcXG59XFxyXFxuXFxyXFxuLm1lbnUtbGlzdCB7XFxyXFxuICAgIGhlaWdodDogNTAwcHg7XFxyXFxuICAgIG1hcmdpbi10b3A6IGNhbGMoNTB2aCAtIDI1MHB4KTtcXHJcXG59XFxyXFxuXFxyXFxuLm1lbnUtbGlzdCBsaSB7XFxyXFxuICAgIHBhZGRpbmc6IDEwcHggMDtcXHJcXG4gICAgdGV4dC1hbGlnbjogY2VudGVyO1xcclxcbiAgICBmb250LXNpemU6IDJlbTtcXHJcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0tY29sb3ItYmctbWFpbi0xKTtcXHJcXG59XFxyXFxuXFxyXFxuLm1lbnUtbGlzdCBsaTpob3ZlciB7XFxyXFxuICAgIGJhY2tncm91bmQtY29sb3I6IHZhcigtLWNvbG9yLWJnLW1haW4tMik7XFxyXFxuICAgIGJhY2tncm91bmQtaW1hZ2U6IHVybChcIiArIF9fX0NTU19MT0FERVJfVVJMX1JFUExBQ0VNRU5UXzE1X19fICsgXCIpO1xcclxcbiAgICBiYWNrZ3JvdW5kLXNpemU6IDEwMCUgMTAwJTtcXHJcXG4gICAgY29sb3I6IHdoaXRlO1xcclxcbn1cXHJcXG5cXHJcXG4ubWVudS1saXN0IGxpOm50aC1jaGlsZChldmVuKTpob3ZlciB7XFxyXFxuICAgIGJhY2tncm91bmQtY29sb3I6IHZhcigtLWNvbG9yLWJnLW1haW4tMik7XFxyXFxuICAgIGJhY2tncm91bmQtaW1hZ2U6IHVybChcIiArIF9fX0NTU19MT0FERVJfVVJMX1JFUExBQ0VNRU5UXzE2X19fICsgXCIpO1xcclxcbn1cXHJcXG5cXHJcXG4ubWVudS1saXN0IGxpLmFjdGl2ZS1wYWdlLCAubWVudS1saXN0IGxpLmFjdGl2ZS1wYWdlOmhvdmVyIHtcXHJcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0tY29sb3ItYmctbWFpbi0yKTtcXHJcXG4gICAgYmFja2dyb3VuZC1pbWFnZTogdXJsKFwiICsgX19fQ1NTX0xPQURFUl9VUkxfUkVQTEFDRU1FTlRfMTdfX18gKyBcIik7XFxyXFxuICAgIGJhY2tncm91bmQtc2l6ZTogMTAwJSAxMDAlO1xcclxcbiAgICBjb2xvcjogd2hpdGU7XFxyXFxuICAgIHBhZGRpbmc6IDE1cHggMDtcXHJcXG59XFxyXFxuXFxyXFxubWFpbi5jb250YWluZXItY2VudGVyZWQge1xcclxcbiAgICBtYXJnaW4tdG9wOiAyMHB4O1xcclxcbiAgICBwYWRkaW5nLWJvdHRvbTogMzVweDtcXHJcXG59XFxyXFxuXFxyXFxuLmNvbnRlbnQtd3JhcHBlciB7XFxyXFxuICAgIHdpZHRoOiAxMDAlO1xcclxcbiAgICBtYXJnaW46IGF1dG87XFxyXFxuICAgIGRpc3BsYXk6IGZsZXg7XFxyXFxuICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxyXFxuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxyXFxufVxcclxcblxcclxcbmgyLnRvcGljLW5hbWUge1xcclxcbiAgICBmb250LXNpemU6IDM0cHg7XFxyXFxuICAgIG1hcmdpbjogMzBweCAwO1xcclxcbn1cXHJcXG5cXHJcXG4uY2FyZC1jb250YWluZXIge1xcclxcbiAgICBkaXNwbGF5OiBmbGV4O1xcclxcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWFyb3VuZDtcXHJcXG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXHJcXG4gICAgZmxleC13cmFwOiB3cmFwO1xcclxcbiAgICB3aWR0aDogNzglO1xcclxcbiAgICBtYXJnaW46IGF1dG87XFxyXFxufVxcclxcblxcclxcbi5jYXJkIHtcXHJcXG4gICAgbWFyZ2luOiAxNXB4O1xcclxcbiAgICBwb3NpdGlvbjogcmVsYXRpdmU7XFxyXFxufVxcclxcblxcclxcbi5jYXJkLW1haW4tcGFnZSB7XFxyXFxuICAgIHdpZHRoOiAyNTZweDtcXHJcXG4gICAgaGVpZ2h0OiAyNDBweDtcXHJcXG4gICAgbWFyZ2luLXRvcDogMjBweDtcXHJcXG4gICAgcGFkZGluZzogNDVweDtcXHJcXG4gICAgYm9yZGVyLXJhZGl1czogNTAlO1xcclxcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjZmZmZmZmO1xcclxcbiAgICBiYWNrZ3JvdW5kLWltYWdlOiB1cmwoXCIgKyBfX19DU1NfTE9BREVSX1VSTF9SRVBMQUNFTUVOVF8xOF9fXyArIFwiKTtcXHJcXG4gICAgYmFja2dyb3VuZC1zaXplOiAxMDAlIDgzJTtcXHJcXG4gICAgYmFja2dyb3VuZC1yZXBlYXQ6IG5vLXJlcGVhdDtcXHJcXG59XFxyXFxuXFxyXFxuLmNhcmQtdG9waWMge1xcclxcbiAgICB3aWR0aDogMjI2cHg7XFxyXFxuICAgIGhlaWdodDogMjcwcHg7XFxyXFxufVxcclxcblxcclxcbi5jYXJkLmRpc2FibGVkIHtcXHJcXG4gICAgZmlsdGVyOiBibHVyKDNweCk7XFxyXFxufVxcclxcblxcclxcbi5jYXJkLWNvbnRlbnQge1xcclxcbiAgICB3aWR0aDogMTAwJTtcXHJcXG4gICAgaGVpZ2h0OiAxMDAlO1xcclxcbiAgICBwb3NpdGlvbjogcmVsYXRpdmU7XFxyXFxufVxcclxcblxcclxcbi5jYXJkLXRvcGljIC5jYXJkLWNvbnRlbnQge1xcclxcbiAgICBib3JkZXI6IDJweCB2YXIoLS1jb2xvci1mb250LTEpIHNvbGlkO1xcclxcbiAgICBib3gtc2hhZG93OiAwIDAgMTVweCAxcHggdmFyKC0tY29sb3ItZm9udC0xKTtcXHJcXG59XFxyXFxuXFxyXFxuLmNhcmQtdG9waWMgLmNhcmQtY29udGVudDpob3ZlciB7XFxyXFxuICAgIGJveC1zaGFkb3c6IDAgMCAxNXB4IDNweCB2YXIoLS1jb2xvci1mb250LTEpO1xcclxcbn1cXHJcXG5cXHJcXG4uY2FyZC5kaXNhYmxlZCAuY2FyZC1jb250ZW50IHtcXHJcXG4gICAgYm94LXNoYWRvdzogbm9uZTtcXHJcXG59XFxyXFxuXFxyXFxuLmNhcmQtbWFpbi1wYWdlIC5jYXJkLWNvbnRlbnQsIC5jYXJkLW1haW4tcGFnZSBpbWcge1xcclxcbiAgICBib3JkZXItcmFkaXVzOiA1MHB4O1xcclxcbn1cXHJcXG5cXHJcXG4uY2FyZC1jb250ZW50LCAuY2FyZC1jb250ZW50IGltZyB7XFxyXFxuICAgIHRyYW5zaXRpb246IGJvcmRlci1yYWRpdXMgMXM7XFxyXFxufVxcclxcblxcclxcbi5jYXJkLXRvcGljIC5jYXJkLWNvbnRlbnQge1xcclxcbiAgICBib3JkZXItcmFkaXVzOiA1MHB4IDA7XFxyXFxufVxcclxcblxcclxcbi5jYXJkLXRvcGljLmZsaXBwZWQgLmNhcmQtY29udGVudCB7XFxyXFxuICAgIGJvcmRlci1yYWRpdXM6IDAgNTBweDtcXHJcXG59XFxyXFxuXFxyXFxuLmNhcmQtdG9waWMgaW1nIHtcXHJcXG4gICAgYm9yZGVyLXJhZGl1czogNTBweCAwIDAgMDtcXHJcXG59XFxyXFxuXFxyXFxuLmNhcmQtdG9waWMuZmxpcHBlZCBpbWcge1xcclxcbiAgICBib3JkZXItcmFkaXVzOiAwIDUwcHggMCAwO1xcclxcbn1cXHJcXG5cXHJcXG4uY2FyZCBwIHtcXHJcXG4gICAgbWFyZ2luLXRvcDogMTVweDtcXHJcXG4gICAgZm9udC1zaXplOiAzMnB4O1xcclxcbiAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XFxyXFxufVxcclxcblxcclxcbi5jYXJkLW1haW4tcGFnZSBwIHtcXHJcXG4gICAgcG9zaXRpb246IHJlbGF0aXZlO1xcclxcbiAgICB0b3A6IDMycHg7XFxyXFxuICAgIGJvcmRlci1yYWRpdXM6IDIwcHg7XFxyXFxuICAgIGZvbnQtc2l6ZTogMzJweDtcXHJcXG59XFxyXFxuXFxyXFxuLmNhcmQtZmxpcC1idXR0b24ge1xcclxcbiAgICB3aWR0aDogMzVweDtcXHJcXG4gICAgaGVpZ2h0OiAzNXB4O1xcclxcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XFxyXFxuICAgIGJvdHRvbTogMjBweDtcXHJcXG4gICAgcmlnaHQ6IDIwcHg7XFxyXFxuICAgIGJvcmRlci1yYWRpdXM6IDUwJTtcXHJcXG4gICAgYmFja2dyb3VuZC1pbWFnZTogdXJsKFwiICsgX19fQ1NTX0xPQURFUl9VUkxfUkVQTEFDRU1FTlRfMTlfX18gKyBcIik7XFxyXFxuICAgIGJhY2tncm91bmQtc2l6ZTogY292ZXI7XFxyXFxufVxcclxcblxcclxcbi5jYXJkLWZsaXAtYnV0dG9uOmhvdmVyIHtcXHJcXG4gICAgYW5pbWF0aW9uLW5hbWU6IHJvdGF0aW9uO1xcclxcbiAgICBhbmltYXRpb24tZHVyYXRpb246IDJzO1xcclxcbiAgICBhbmltYXRpb24tdGltaW5nLWZ1bmN0aW9uOiBsaW5lYXI7XFxyXFxuICAgIGFuaW1hdGlvbi1pdGVyYXRpb24tY291bnQ6IGluZmluaXRlO1xcclxcbn1cXHJcXG5cXHJcXG4uZmxpcHBlZCAuY2FyZC1jb250ZW50IHtcXHJcXG4gICAgYW5pbWF0aW9uLW5hbWU6IGZsaXAtY2FyZDtcXHJcXG4gICAgYW5pbWF0aW9uLWR1cmF0aW9uOiAxcztcXHJcXG59XFxyXFxuXFxyXFxuLnVuZmxpcHBlZCAuY2FyZC1jb250ZW50IHtcXHJcXG4gICAgYW5pbWF0aW9uLW5hbWU6IHVuZmxpcC1jYXJkO1xcclxcbiAgICBhbmltYXRpb24tZHVyYXRpb246IDFzO1xcclxcbn1cXHJcXG5cXHJcXG4uZmluYWwtY2xpcCB7XFxyXFxuICAgIGRpc3BsYXk6IGZsZXg7XFxyXFxuICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxyXFxuICAgIHdpZHRoOiAzMjBweDtcXHJcXG4gICAgbWFyZ2luOiBhdXRvO1xcclxcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXHJcXG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXHJcXG4gICAgcGFkZGluZzogNTBweCAwO1xcclxcbn1cXHJcXG5cXHJcXG4uZmluYWwtY2xpcCBwIHtcXHJcXG4gICAgY29sb3I6IHJlZDtcXHJcXG4gICAgZm9udC1zaXplOiAzNnB4O1xcclxcbiAgICBtYXJnaW4tdG9wOiAzMHB4O1xcclxcbn1cXHJcXG5cXHJcXG4uc3RhdC1jb250YWluZXIge1xcclxcbiAgICB3aWR0aDogNzQlO1xcclxcbiAgICBkaXNwbGF5OiBmbGV4O1xcclxcbiAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcclxcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXHJcXG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXHJcXG4gICAgZm9udC1zaXplOiAyZW07XFxyXFxufVxcclxcblxcclxcbi50YWJsZS13cmFwcGVyIHtcXHJcXG4gICAgd2lkdGg6IDEwMCU7XFxyXFxuICAgIG92ZXJmbG93LXg6IGF1dG87XFxyXFxuICAgIG92ZXJmbG93LXk6IGhpZGRlbjtcXHJcXG59XFxyXFxuXFxyXFxuLnN0YXQtdGFibGUge1xcclxcbiAgICB3aWR0aDogMTAwJTtcXHJcXG4gICAgYm9yZGVyLWNvbGxhcHNlOiBjb2xsYXBzZTtcXHJcXG4gICAgZm9udC1zaXplOiAwLjVlbTtcXHJcXG5cXHJcXG59XFxyXFxuXFxyXFxudGhlYWQge1xcclxcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiBhbGljZWJsdWU7XFxyXFxufVxcclxcblxcclxcbnRoLCB0ZCB7XFxyXFxuICAgIHBhZGRpbmc6IDAgNHB4O1xcclxcbiAgICBib3JkZXI6IDFweCBzb2xpZCBibGFjaztcXHJcXG4gICAgdGV4dC1hbGlnbjogY2VudGVyO1xcclxcbiAgICB2ZXJ0aWNhbC1hbGlnbjogbWlkZGxlO1xcclxcbn1cXHJcXG5cXHJcXG50aCB7XFxyXFxuICAgIGhlaWdodDogNDBweDtcXHJcXG4gICAgcG9zaXRpb246IHJlbGF0aXZlO1xcclxcbiAgICBmb250LXNpemU6IDIycHg7XFxyXFxuICAgIGJhY2tncm91bmQtY29sb3I6IHZhcigtLWNvbG9yLWJnLW1haW4tMSk7XFxyXFxuICAgIGJvcmRlcjogbm9uZTtcXHJcXG59XFxyXFxuXFxyXFxudHIge1xcclxcbiAgICBoZWlnaHQ6IDI1cHg7XFxyXFxuICAgIGJhY2tncm91bmQtY29sb3I6IHZhcigtLWNvbG9yLWJnLW1haW4tMSk7XFxyXFxufVxcclxcblxcclxcbnRoLnNvcnRlZCB7XFxyXFxuICAgIHBhZGRpbmc6IDAgMjRweCAwIDRweDtcXHJcXG59XFxyXFxuXFxyXFxudHI6bnRoLWNoaWxkKGV2ZW4pIHtcXHJcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogI2U5ZjVmZjtcXHJcXG59XFxyXFxuXFxyXFxuaW1nLnNvcnQtaWNvbiB7XFxyXFxuICAgIHdpZHRoOiAxNnB4O1xcclxcbiAgICBoZWlnaHQ6IGF1dG87XFxyXFxuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXHJcXG4gICAgcmlnaHQ6IDE1cHg7XFxyXFxuICAgIHRvcDogMTJweDtcXHJcXG59XFxyXFxuXFxyXFxuLnN0YXQtYnV0dG9ucy13cmFwcGVyIHtcXHJcXG4gICAgd2lkdGg6IDEwMCU7XFxyXFxuICAgIGRpc3BsYXk6IGZsZXg7XFxyXFxuICAgIGp1c3RpZnktY29udGVudDogc3BhY2UtYXJvdW5kO1xcclxcbiAgICBmbGV4LXdyYXA6IHdyYXA7XFxyXFxufVxcclxcblxcclxcbi5zdGF0LWJ1dHRvbiB7XFxyXFxuICAgIHdpZHRoOiAzMDBweDtcXHJcXG4gICAgaGVpZ2h0OiA3MHB4O1xcclxcbiAgICBtYXJnaW46IDIwcHggMDtcXHJcXG4gICAgcGFkZGluZzogMTVweDtcXHJcXG4gICAgYm9yZGVyLXJhZGl1czogNTBweDtcXHJcXG4gICAgY29sb3I6IGF6dXJlO1xcclxcbiAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XFxyXFxufVxcclxcblxcclxcbi5idXR0b24udHJhaW4tZGlmZiB7XFxyXFxuICAgIGJhY2tncm91bmQtY29sb3I6ICMwN2EwNjA7XFxyXFxuICAgIGJhY2tncm91bmQtaW1hZ2U6IHVybChcIiArIF9fX0NTU19MT0FERVJfVVJMX1JFUExBQ0VNRU5UXzIwX19fICsgXCIpO1xcclxcbiAgICBiYWNrZ3JvdW5kLXNpemU6IDEwMCUgMTAwJTtcXHJcXG4gICAgdGV4dC1zaGFkb3c6IDNweCAzcHggM3B4ICMwN2EwNjA7XFxyXFxufVxcclxcblxcclxcbi5idXR0b24ucmVzZXQtc3RhdCB7XFxyXFxuICAgIGJhY2tncm91bmQtY29sb3I6ICNiZDJkMmQ7XFxyXFxuICAgIGJhY2tncm91bmQtaW1hZ2U6IHVybChcIiArIF9fX0NTU19MT0FERVJfVVJMX1JFUExBQ0VNRU5UXzIxX19fICsgXCIpO1xcclxcbiAgICBiYWNrZ3JvdW5kLXNpemU6IDEwMCUgMTAwJTtcXHJcXG4gICAgdGV4dC1zaGFkb3c6IDNweCAzcHggM3B4ICNiZDJkMmQ7XFxyXFxufVxcclxcblxcclxcbi5ub3RoaW5nLWRpZmYge1xcclxcbiAgICB3aWR0aDogNjAlO1xcclxcbiAgICBtYXJnaW4tdG9wOiAzMHB4O1xcclxcbiAgICBkaXNwbGF5OiBmbGV4O1xcclxcbiAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uLXJldmVyc2U7XFxyXFxuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxyXFxuICAgIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcclxcbn1cXHJcXG5cXHJcXG4ubm90aGluZy1kaWZmIC5ncmFwaGljIHtcXHJcXG4gICAgd2lkdGg6IDYwJTtcXHJcXG59XFxyXFxuXFxyXFxuLm5vdGhpbmctZGlmZiBwIHtcXHJcXG4gICAgY29sb3I6ICMyYTY0MWE7XFxyXFxuICAgIGZvbnQtc2l6ZTogNHZ3O1xcclxcbiAgICBtYXJnaW4tYm90dG9tOiAxNXB4O1xcclxcbiAgICB0ZXh0LXNoYWRvdzogMnB4IDVweCA1cHggI2U0ZWJiNTtcXHJcXG59XFxyXFxuXFxyXFxuLmRpc2FibGVkOmhvdmVyIHtcXHJcXG4gICAgY3Vyc29yOmF1dG87XFxyXFxufVxcclxcblxcclxcbi8qIC0tLSBBbmltYXRpb24gLS0tICovXFxyXFxuXFxyXFxuQGtleWZyYW1lcyBmbGlwLWNhcmQge1xcclxcbiAgICAwJSB7fVxcclxcbiAgICA1MCUge3RyYW5zZm9ybTogcm90YXRlWSg4OWRlZyl9XFxyXFxufVxcclxcblxcclxcbkBrZXlmcmFtZXMgdW5mbGlwLWNhcmQge1xcclxcbiAgICAwJSB7fVxcclxcbiAgICA1MCUge3RyYW5zZm9ybTogcm90YXRlWSg4OWRlZyl9XFxyXFxufVxcclxcblxcclxcbkBrZXlmcmFtZXMgcm90YXRpb24ge1xcclxcbiAgICAwJSB7fVxcclxcbiAgICAxMDAlIHt0cmFuc2Zvcm06IHJvdGF0ZSgzNjBkZWcpfVxcclxcbn1cXHJcXG5cXHJcXG4vKiAtLS0gUkVTUE9OU0lWRSBMQVlPVVRTIC0tLSAqL1xcclxcblxcclxcbkBtZWRpYSAobWF4LXdpZHRoOiAxNDM5cHgpIHtcXHJcXG4gICAgLmNvbnRhaW5lci1jZW50ZXJlZCB7XFxyXFxuICAgICAgICBtaW4td2lkdGg6IGNhbGMoMTQ0MHZ3KjEwMC8xNDQwIC0gMjBweCk7XFxyXFxuICAgIH1cXHJcXG5cXHJcXG4gICAgaGVhZGVyLm1haW4tcGFnZSB7XFxyXFxuICAgICAgICBtYXJnaW4tdG9wOiAgY2FsYygzODB2dyoxMDAvMTQ0MCk7XFxyXFxuICAgIH1cXHJcXG5cXHJcXG4gICAgaGVhZGVyIC5ncmFwaGljIHtcXHJcXG4gICAgICAgIHRvcDogY2FsYygtMzcwdncqMTAwLzE0NDAgKyA1cHgpO1xcclxcbiAgICB9XFxyXFxufVxcclxcblxcclxcbkBtZWRpYSAobWF4LXdpZHRoOiA5OTlweCkge1xcclxcblxcclxcbiAgICBpbWcuc29ydC1pY29uIHtcXHJcXG4gICAgICAgIHJpZ2h0OiA1cHg7XFxyXFxuICAgIH1cXHJcXG5cXHJcXG4gICAgLm5vdGhpbmctZGlmZiB7XFxyXFxuICAgICAgICB3aWR0aDogMTAwJTtcXHJcXG4gICAgfVxcclxcblxcclxcbiAgICAubm90aGluZy1kaWZmIHAge1xcclxcbiAgICAgICAgZm9udC1zaXplOiAzNnB4O1xcclxcbiAgICB9XFxyXFxufVxcclxcblxcclxcbkBtZWRpYSAobWF4LXdpZHRoOiA1NTlweCkge1xcclxcbiAgICAubWFpbi1jb250cm9scyB7XFxyXFxuICAgICAgICB3aWR0aDogMTAwdnc7XFxyXFxuICAgICAgICBib3JkZXItcmFkaXVzOiAwO1xcclxcbiAgICB9XFxyXFxuXFxyXFxuICAgIC5nYW1lLWNvbnRyb2xzIHtcXHJcXG4gICAgICAgIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcclxcbiAgICAgICAgYm94LXNoYWRvdzogMHB4IC0xNXB4IDMwcHggIzdlZDNmZjtcXHJcXG4gICAgfVxcclxcblxcclxcbiAgICAuZ2FtZS1idXR0b24ge1xcclxcbiAgICAgICAgd2lkdGg6IDcwcHg7XFxyXFxuICAgICAgICBoZWlnaHQ6IDcwcHg7XFxyXFxuICAgIH1cXHJcXG5cXHJcXG4gICAgLmdhbWUtcHJvZ3Jlc3Mge1xcclxcbiAgICAgICAganVzdGlmeS1jb250ZW50OiBmbGV4LXN0YXJ0O1xcclxcbiAgICAgICAgbWFyZ2luOiAwIDAgMCAxMHB4O1xcclxcbiAgICB9XFxyXFxuXFxyXFxuICAgIC5nYW1lLXNjb3JlIHtcXHJcXG4gICAgICAgIG1hcmdpbjogMCAwIDAgMTBweDtcXHJcXG4gICAgfVxcclxcblxcclxcbiAgICBoMSB7XFxyXFxuICAgICAgICBtYXgtd2lkdGg6IDc1cHg7XFxyXFxuICAgICAgICBmb250LXNpemU6IDI0cHg7XFxyXFxuICAgIH1cXHJcXG5cXHJcXG4gICAgaDIudG9waWMtbmFtZSB7XFxyXFxuICAgICAgICBmb250LXNpemU6IDMycHg7XFxyXFxuICAgICAgICBtYXJnaW46IDEwcHggMDtcXHJcXG4gICAgfVxcclxcblxcclxcbiAgICAuY2FyZC1tYWluLXBhZ2Uge1xcclxcbiAgICAgICAgd2lkdGg6IDIzMHB4O1xcclxcbiAgICAgICAgaGVpZ2h0OiAyMjBweDtcXHJcXG4gICAgICAgIG1hcmdpbjogMTBweCAwO1xcclxcbiAgICB9XFxyXFxuXFxyXFxuICAgIC5jYXJkLW1haW4tcGFnZSBwIHtcXHJcXG4gICAgICAgIGZvbnQtc2l6ZTogMjhweDtcXHJcXG4gICAgfVxcclxcblxcclxcbiAgICAuc3RhdC1idXR0b25zLXdyYXBwZXIge1xcclxcbiAgICAgICAgd2lkdGg6IDc4JTtcXHJcXG4gICAgfVxcclxcblxcclxcbiAgICAuc3RhdC1idXR0b24ge1xcclxcbiAgICAgICAgd2lkdGg6IDE5MHB4O1xcclxcbiAgICAgICAgaGVpZ2h0OiA1MnB4O1xcclxcbiAgICAgICAgZm9udC1zaXplOiAyMXB4O1xcclxcbiAgICAgICAgbWFyZ2luOiA1cHggMDtcXHJcXG4gICAgfVxcclxcblxcclxcbiAgICBtYWluLmNvbnRhaW5lci1jZW50ZXJlZCB7XFxyXFxuICAgICAgICB3aWR0aDogMTAwdnc7XFxyXFxuICAgIH1cXHJcXG5cXHJcXG4gICAgLnN0YXQtY29udGFpbmVyIHtcXHJcXG4gICAgICAgIHdpZHRoOiAxMDAlO1xcclxcbiAgICB9XFxyXFxuXFxyXFxuICAgIC50YWJsZS13cmFwcGVyIHtcXHJcXG4gICAgICAgIHdpZHRoOiA3MiU7XFxyXFxuICAgIH1cXHJcXG59XFxyXFxuXFxyXFxuQG1lZGlhIChtYXgtaGVpZ2h0OiA5MzBweCkge1xcclxcbiAgICBuYXYge1xcclxcbiAgICAgICAgYmFja2dyb3VuZC1zaXplOiA0NTBweCBhdXRvLCAwIGF1dG87XFxyXFxuICAgIH1cXHJcXG59XFxyXFxuXFxyXFxuQG1lZGlhIChtYXgtaGVpZ2h0OiA5NzBweCkge1xcclxcbiAgICAubWVudS1saXN0IHtcXHJcXG4gICAgICAgIG1hcmdpbi10b3A6IDIzNXB4O1xcclxcbiAgICB9XFxyXFxufVxcclxcblwiLCBcIlwiLHtcInZlcnNpb25cIjozLFwic291cmNlc1wiOltcIndlYnBhY2s6Ly8uL2Fzc2V0cy9zdHlsZXMvc3R5bGUuY3NzXCJdLFwibmFtZXNcIjpbXSxcIm1hcHBpbmdzXCI6XCJBQUFBLHNDQUFzQztBQUN0QztJQUNJLGdDQUFnQztJQUNoQyxrQkFBa0I7SUFDbEIsZ0JBQWdCO0lBQ2hCOzsrREFFNEUsRUFBRSxnREFBZ0Q7RUFDaEk7O0FBRUYsMkJBQTJCO0FBQzNCO0lBQ0kscUJBQXFCO0lBQ3JCLGtCQUFrQjtJQUNsQixnQkFBZ0I7SUFDaEI7OytEQUVpRSxFQUFFLGdEQUFnRDtFQUNySDs7QUFFRixzQ0FBc0M7O0FBRXRDO0lBQ0ksc0JBQXNCO0FBQzFCOztBQUVBO0lBQ0ksbUJBQW1CO0FBQ3ZCOztBQUVBLCtCQUErQjs7QUFFL0I7SUFDSSwwQkFBMEI7SUFDMUIsMEJBQTBCO0lBQzFCLDBCQUEwQjtJQUMxQiw0QkFBNEI7SUFDNUIsdUJBQXVCO0FBQzNCOztBQUVBLHVDQUF1Qzs7QUFFdkM7SUFDSSxXQUFXO0lBQ1gsYUFBYTtJQUNiLHNCQUFzQjtJQUN0QixtQkFBbUI7SUFDbkIsd0NBQXdDO0lBQ3hDLGtHQUErRztJQUMvRyw0QkFBNEI7SUFDNUIsMkNBQTJDO0lBQzNDLDJCQUEyQjtJQUMzQix5QkFBeUI7SUFDekIsOEJBQThCO0lBQzlCLDBCQUEwQjtBQUM5Qjs7QUFFQTtJQUNJLGtCQUFrQjtBQUN0Qjs7QUFFQTtJQUNJLGtCQUFrQjtJQUNsQixlQUFlO0lBQ2YsTUFBTTtBQUNWOztBQUVBO0lBQ0ksV0FBVztJQUNYLFlBQVk7SUFDWixVQUFVO0lBQ1YsU0FBUztBQUNiOztBQUVBO0lBQ0ksaUJBQWlCO0lBQ2pCLGlCQUFpQjtJQUNqQixjQUFjO0FBQ2xCOztBQUVBO0lBQ0ksYUFBYTtJQUNiLHNCQUFzQjtJQUN0Qix1QkFBdUI7SUFDdkIsbUJBQW1C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VUFBVTtJQUNkOztJQUVBO1FBQ0ksV0FBVztJQUNmOztJQUVBO1FBQ0ksZUFBZTtJQUNuQjtBQUNKOztBQUVBO0lBQ0k7UUFDSSxZQUFZO1FBQ1osZ0JBQWdCO0lBQ3BCOztJQUVBO1FBQ0ksdUJBQXVCO1FBQ3ZCLGtDQUFrQztJQUN0Qzs7SUFFQTtRQUNJLFdBQVc7UUFDWCxZQUFZO0lBQ2hCOztJQUVBO1FBQ0ksMkJBQTJCO1FBQzNCLGtCQUFrQjtJQUN0Qjs7SUFFQTtRQUNJLGtCQUFrQjtJQUN0Qjs7SUFFQTtRQUNJLGVBQWU7UUFDZixlQUFlO0lBQ25COztJQUVBO1FBQ0ksZUFBZTtRQUNmLGNBQWM7SUFDbEI7O0lBRUE7UUFDSSxZQUFZO1FBQ1osYUFBYTtRQUNiLGNBQWM7SUFDbEI7O0lBRUE7UUFDSSxlQUFlO0lBQ25COztJQUVBO1FBQ0ksVUFBVTtJQUNkOztJQUVBO1FBQ0ksWUFBWTtRQUNaLFlBQVk7UUFDWixlQUFlO1FBQ2YsYUFBYTtJQUNqQjs7SUFFQTtRQUNJLFlBQVk7SUFDaEI7O0lBRUE7UUFDSSxXQUFXO0lBQ2Y7O0lBRUE7UUFDSSxVQUFVO0lBQ2Q7QUFDSjs7QUFFQTtJQUNJO1FBQ0ksbUNBQW1DO0lBQ3ZDO0FBQ0o7O0FBRUE7SUFDSTtRQUNJLGlCQUFpQjtJQUNyQjtBQUNKXCIsXCJzb3VyY2VzQ29udGVudFwiOltcIi8qIGdsb3JpYS1oYWxsZWx1amFoLXJlZ3VsYXIgLSBsYXRpbiAqL1xcclxcbkBmb250LWZhY2Uge1xcclxcbiAgICBmb250LWZhbWlseTogJ0dsb3JpYSBIYWxsZWx1amFoJztcXHJcXG4gICAgZm9udC1zdHlsZTogbm9ybWFsO1xcclxcbiAgICBmb250LXdlaWdodDogNDAwO1xcclxcbiAgICBzcmM6IGxvY2FsKCcnKSxcXHJcXG4gICAgICAgICB1cmwoJy4uL2ZvbnRzL2dsb3JpYS1oYWxsZWx1amFoLXYxNy1sYXRpbi1yZWd1bGFyLndvZmYyJykgZm9ybWF0KCd3b2ZmMicpLCAvKiBDaHJvbWUgMjYrLCBPcGVyYSAyMyssIEZpcmVmb3ggMzkrICovXFxyXFxuICAgICAgICAgdXJsKCcuLi9mb250cy9nbG9yaWEtaGFsbGVsdWphaC12MTctbGF0aW4tcmVndWxhci53b2ZmJykgZm9ybWF0KCd3b2ZmJyk7IC8qIENocm9tZSA2KywgRmlyZWZveCAzLjYrLCBJRSA5KywgU2FmYXJpIDUuMSsgKi9cXHJcXG4gIH1cXHJcXG5cXHJcXG4vKiBuZXVjaGEtcmVndWxhciAtIGxhdGluICovXFxyXFxuQGZvbnQtZmFjZSB7XFxyXFxuICAgIGZvbnQtZmFtaWx5OiAnTmV1Y2hhJztcXHJcXG4gICAgZm9udC1zdHlsZTogbm9ybWFsO1xcclxcbiAgICBmb250LXdlaWdodDogNDAwO1xcclxcbiAgICBzcmM6IGxvY2FsKCcnKSxcXHJcXG4gICAgICAgICB1cmwoJy4uL2ZvbnRzL25ldWNoYS12MTctbGF0aW4tcmVndWxhci53b2ZmMicpIGZvcm1hdCgnd29mZjInKSwgLyogQ2hyb21lIDI2KywgT3BlcmEgMjMrLCBGaXJlZm94IDM5KyAqL1xcclxcbiAgICAgICAgIHVybCgnLi4vZm9udHMvbmV1Y2hhLXYxNy1sYXRpbi1yZWd1bGFyLndvZmYnKSBmb3JtYXQoJ3dvZmYnKTsgLyogQ2hyb21lIDYrLCBGaXJlZm94IDMuNissIElFIDkrLCBTYWZhcmkgNS4xKyAqL1xcclxcbiAgfVxcclxcblxcclxcbi8qIGJvcmRlci1ib3ggbW9kZWwgZm9yIGFsbCBlbGVtZW50cyAqL1xcclxcblxcclxcbmh0bWwge1xcclxcbiAgICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xcclxcbn1cXHJcXG5cXHJcXG4qLCAqOjpiZWZvcmUsICo6OmFmdGVyIHtcXHJcXG4gICAgYm94LXNpemluZzogaW5oZXJpdDtcXHJcXG59XFxyXFxuXFxyXFxuLyogLS0tIFBhZ2UgY29sb3Igc3R5bGluZyAtLS0gKi9cXHJcXG5cXHJcXG46cm9vdCB7XFxyXFxuICAgIC0tY29sb3ItYmctbWFpbi0xOiAjZmZmZmZmO1xcclxcbiAgICAtLWNvbG9yLWJnLW1haW4tMjogI2RiZjVmODtcXHJcXG4gICAgLS1jb2xvci1iZy1tYWluLTM6ICNlOWY1ZmY7XFxyXFxuICAgIC0tY29sb3ItYmctbWFpbi00OiAjZjBjMmNkNjM7XFxyXFxuICAgIC0tY29sb3ItZm9udC0xOiAjMzA3MGE2O1xcclxcbn1cXHJcXG5cXHJcXG4vKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tICovXFxyXFxuXFxyXFxuYm9keSB7XFxyXFxuICAgIHdpZHRoOiAxMDAlO1xcclxcbiAgICBkaXNwbGF5OiBmbGV4O1xcclxcbiAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcclxcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xcclxcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1jb2xvci1iZy1tYWluLTEpO1xcclxcbiAgICBiYWNrZ3JvdW5kLWltYWdlOiB1cmwoXFxcIi4uL2ltZy9hcHAvd2F0ZXJjb2xvci1ibHVlLWJnLWxlZnQuanBnXFxcIiksIHVybChcXFwiLi4vaW1nL2FwcC93YXRlcmNvbG9yLWJsdWUtYmctcmlnaHQuanBnXFxcIik7XFxyXFxuICAgIGJhY2tncm91bmQtYXR0YWNobWVudDogZml4ZWQ7XFxyXFxuICAgIGJhY2tncm91bmQtcG9zaXRpb246IGxlZnQgdG9wLCByaWdodCBib3R0b207XFxyXFxuICAgIGJhY2tncm91bmQtcmVwZWF0OiByZXBlYXQteTtcXHJcXG4gICAgYmFja2dyb3VuZC1zaXplOiAxNSUgYXV0bztcXHJcXG4gICAgZm9udC1mYW1pbHk6ICdOZXVjaGEnLCBjdXJzaXZlO1xcclxcbiAgICBjb2xvcjogdmFyKC0tY29sb3ItZm9udC0xKTtcXHJcXG59XFxyXFxuXFxyXFxuYm9keS5vcGVuZWQtbWVudSB7XFxyXFxuICAgIG92ZXJmbG93LXk6IGhpZGRlbjtcXHJcXG59XFxyXFxuXFxyXFxuLmluYWN0aXZlIHtcXHJcXG4gICAgdmlzaWJpbGl0eTogaGlkZGVuO1xcclxcbiAgICBwb3NpdGlvbjogZml4ZWQ7XFxyXFxuICAgIHRvcDogMDtcXHJcXG59XFxyXFxuXFxyXFxuLmdyYXBoaWMsIGltZyB7XFxyXFxuICAgIHdpZHRoOiAxMDAlO1xcclxcbiAgICBoZWlnaHQ6IGF1dG87XFxyXFxuICAgIHBhZGRpbmc6IDA7XFxyXFxuICAgIG1hcmdpbjogMDtcXHJcXG59XFxyXFxuXFxyXFxuLmNvbnRhaW5lci1jZW50ZXJlZCB7XFxyXFxuICAgIG1heC13aWR0aDogMTQ0MHB4O1xcclxcbiAgICBtaW4td2lkdGg6IDE0NDBweDtcXHJcXG4gICAgbWFyZ2luOiAwIGF1dG87XFxyXFxufVxcclxcblxcclxcbmhlYWRlci5jb250YWluZXItY2VudGVyZWQge1xcclxcbiAgICBkaXNwbGF5OiBmbGV4O1xcclxcbiAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcclxcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXHJcXG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXHJcXG4gICAgcG9zaXRpb246IC13ZWJraXQtc3RpY2t5O1xcclxcbiAgICBwb3NpdGlvbjogc3RpY2t5O1xcclxcbiAgICB0b3A6IDA7XFxyXFxuICAgIHotaW5kZXg6IDg7XFxyXFxuICAgIG1hcmdpbi10b3A6IDA7XFxyXFxuICAgIHRyYW5zaXRpb246IG1hcmdpbiAxcztcXHJcXG59XFxyXFxuXFxyXFxuaGVhZGVyLm1haW4tcGFnZSB7XFxyXFxuICAgIG1hcmdpbi10b3A6IDM4MHB4O1xcclxcbn1cXHJcXG5cXHJcXG5oZWFkZXIgLmhlYWRlci1pbWFnZSB7XFxyXFxuICAgIHdpZHRoOiA3MCU7XFxyXFxuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXHJcXG4gICAgdG9wOiAtMzc2cHg7XFxyXFxufVxcclxcblxcclxcbi5tYWluLWNvbnRyb2xzIHtcXHJcXG4gICAgd2lkdGg6IDgwJTtcXHJcXG4gICAgbWluLWhlaWdodDogMTUwcHg7XFxyXFxuICAgIGRpc3BsYXk6IGZsZXg7XFxyXFxuICAgIGp1c3RpZnktY29udGVudDogc3BhY2UtYXJvdW5kO1xcclxcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xcclxcbiAgICBib3JkZXItcmFkaXVzOiAzNXB4O1xcclxcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiB3aGl0ZTtcXHJcXG4gICAgYmFja2dyb3VuZC1pbWFnZTogdXJsKC4uL2ltZy9hcHAvd2F0ZXJjb2xvci13YXZlcy0wMS11cC5wbmcpLCB1cmwoLi4vaW1nL2FwcC93YXRlcmNvbG9yLXdhdmVzLTAxLWRvd24ucG5nKTtcXHJcXG4gICAgYmFja2dyb3VuZC1wb3NpdGlvbjogMTAwJSAwLCAwIDEwMCU7XFxyXFxuICAgIGJhY2tncm91bmQtcmVwZWF0OiByZXBlYXQteDtcXHJcXG4gICAgYmFja2dyb3VuZC1zaXplOiBhdXRvIDI4JTtcXHJcXG4gICAgei1pbmRleDogNTtcXHJcXG59XFxyXFxuXFxyXFxuLmdhbWUtY29udHJvbHMge1xcclxcbiAgICB3aWR0aDogMTAwdnc7XFxyXFxuICAgIGJvcmRlci1yYWRpdXM6IDEwcHg7XFxyXFxuICAgIG1pbi1oZWlnaHQ6IDEwMHB4O1xcclxcbiAgICBwYWRkaW5nOiAxMHB4IDA7XFxyXFxuICAgIGRpc3BsYXk6IGZsZXg7XFxyXFxuICAgIGp1c3RpZnktY29udGVudDogc3BhY2UtYXJvdW5kO1xcclxcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xcclxcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiB3aGl0ZTtcXHJcXG4gICAgYm9yZGVyLXJhZGl1czogMDtcXHJcXG4gICAgYmFja2dyb3VuZC1pbWFnZTogdXJsKFxcXCIuLi9pbWcvYXBwL3dhdGVyY29sb3ItYmx1ZS1iZy1sZWZ0LmpwZ1xcXCIpLCB1cmwoXFxcIi4uL2ltZy9hcHAvd2F0ZXJjb2xvci1ibHVlLWJnLXJpZ2h0LmpwZ1xcXCIpO1xcclxcbiAgICBiYWNrZ3JvdW5kLWF0dGFjaG1lbnQ6IGZpeGVkO1xcclxcbiAgICBiYWNrZ3JvdW5kLXBvc2l0aW9uOiBsZWZ0IHRvcCwgcmlnaHQgYm90dG9tO1xcclxcbiAgICBiYWNrZ3JvdW5kLXJlcGVhdDogcmVwZWF0LXk7XFxyXFxuICAgIGJhY2tncm91bmQtc2l6ZTogMTUlIGF1dG87XFxyXFxufVxcclxcblxcclxcbmgxIHtcXHJcXG4gICAgdGV4dC1hbGlnbjogY2VudGVyO1xcclxcbiAgICBmb250LWZhbWlseTogJ0dsb3JpYSBIYWxsZWx1amFoJywgY3Vyc2l2ZTtcXHJcXG4gICAgdGV4dC1zaGFkb3c6IDBweCAwcHggNXB4ICM3ZWQzZmY7XFxyXFxufVxcclxcblxcclxcbi5idXR0b246aG92ZXIge1xcclxcbiAgICBjdXJzb3I6IHBvaW50ZXI7XFxyXFxufVxcclxcblxcclxcbi5tZW51LWJ1dHRvbiB7XFxyXFxuICAgIHotaW5kZXg6IDEwO1xcclxcbiAgICB3aWR0aDogMzZweDtcXHJcXG4gICAgaGVpZ2h0OiAzNnB4O1xcclxcbiAgICBiYWNrZ3JvdW5kLWltYWdlOiB1cmwoXFxcIi4uL2ltZy9hcHAvd2F0ZXJjb2xvci1tZW51LWJ1dHRvbi0wMS5wbmdcXFwiKTtcXHJcXG4gICAgYmFja2dyb3VuZC1zaXplOiBjb3ZlcjtcXHJcXG4gICAgdHJhbnNpdGlvbjogdHJhbnNmb3JtIDFzO1xcclxcbn1cXHJcXG5cXHJcXG4ubWVudS1idXR0b24ub3BlbmVkLW1lbnUge1xcclxcbiAgICB0cmFuc2Zvcm06IHJvdGF0ZSgxODBkZWcpO1xcclxcbn1cXHJcXG5cXHJcXG4uYnV0dG9uLmNsb3NlLW1lbnUge1xcclxcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XFxyXFxuICAgIHRvcDogMjBweDtcXHJcXG4gICAgcmlnaHQ6IDIwcHg7XFxyXFxuICAgIHdpZHRoOiA1MHB4O1xcclxcbiAgICBoZWlnaHQ6IDUwcHg7XFxyXFxuICAgIGJvcmRlci1yYWRpdXM6IDUwJTtcXHJcXG4gICAgYmFja2dyb3VuZC1pbWFnZTogdXJsKFxcXCIuLi9pbWcvYXBwL3dhdGVyY29sb3ItcmVkLWNyb3NzLWJ1dHRvbi0wMS5qcGdcXFwiKTtcXHJcXG4gICAgYmFja2dyb3VuZC1zaXplOiBjb3ZlcjtcXHJcXG5cXHJcXG59XFxyXFxuXFxyXFxuLnN3aXRjaCB7XFxyXFxuICAgIHdpZHRoOiAxMTBweDtcXHJcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogI2ZhZjhmZDtcXHJcXG4gICAgZGlzcGxheTogZmxleDtcXHJcXG4gICAganVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuO1xcclxcbiAgICBib3JkZXItcmFkaXVzOiA2MHB4O1xcclxcbiAgICBwb3NpdGlvbjogcmVsYXRpdmU7XFxyXFxuICAgIGJvcmRlcjogMnB4IHZhcigtLWNvbG9yLWZvbnQtMSkgc29saWQ7XFxyXFxufVxcclxcblxcclxcbi5zd2l0Y2guZGlzYWJsZWQ6aG92ZXIge1xcclxcbiAgICBjdXJzb3I6IG5vdC1hbGxvd2VkO1xcclxcbn1cXHJcXG5cXHJcXG4uc3dpdGNoLXJhaWwge1xcclxcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XFxyXFxuICAgIGxlZnQ6IDA7XFxyXFxuICAgIHdpZHRoOiAxMDAlO1xcclxcbiAgICBoZWlnaHQ6IDEwMCU7XFxyXFxuICAgIGJvcmRlci1yYWRpdXM6IGluaGVyaXQ7XFxyXFxufVxcclxcblxcclxcbi5zd2l0Y2gtcm9sbGVyIHtcXHJcXG4gICAgd2lkdGg6IDU1cHg7XFxyXFxuICAgIGhlaWdodDogMTAwJTtcXHJcXG4gICAgcG9zaXRpb246IGFic29sdXRlO1xcclxcbiAgICBsZWZ0OiAwO1xcclxcbiAgICBib3JkZXItcmFkaXVzOiBpbmhlcml0O1xcclxcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjNzlkMWYzMzA7XFxyXFxuICAgIHotaW5kZXg6IDEwO1xcclxcbiAgICB0cmFuc2l0aW9uOiBsZWZ0IDAuN3M7XFxyXFxuICAgIGJvcmRlcjogMXB4IHZhcigtLWNvbG9yLWZvbnQtMSkgc29saWQ7XFxyXFxufVxcclxcblxcclxcbi5zd2l0Y2guc3dpdGNoLW9uIC5zd2l0Y2gtcm9sbGVyIHtcXHJcXG4gICAgbGVmdDogNTNweDtcXHJcXG59XFxyXFxuXFxyXFxuLnN3aXRjaC10cmlnZ2VyIHtcXHJcXG4gICAgbWFyZ2luOiAwIDEwcHg7XFxyXFxuICAgIGhlaWdodDogNDBweDtcXHJcXG4gICAgei1pbmRleDogOTtcXHJcXG4gICAgcGFkZGluZzogMTBweCAwO1xcclxcbiAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XFxyXFxuICAgIGZvbnQtc2l6ZTogMjBweDtcXHJcXG59XFxyXFxuXFxyXFxuLmdhbWUtYnV0dG9uIHtcXHJcXG4gICAgd2lkdGg6IDEwMHB4O1xcclxcbiAgICBoZWlnaHQ6IDEwMHB4O1xcclxcbiAgICBib3JkZXItcmFkaXVzOiA1MHB4O1xcclxcbiAgICBiYWNrZ3JvdW5kLXBvc2l0aW9uOiBjZW50ZXI7XFxyXFxuICAgIGJhY2tncm91bmQtcmVwZWF0OiBuby1yZXBlYXQ7XFxyXFxuICAgIGJhY2tncm91bmQtc2l6ZTogY292ZXI7XFxyXFxufVxcclxcblxcclxcbi5nYW1lLWJ1dHRvbi5zdGFydC1idXR0b24ge1xcclxcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjMDM5MjI3O1xcclxcbiAgICBiYWNrZ3JvdW5kLWltYWdlOiB1cmwoXFxcIi4uL2ltZy9hcHAvd2F0ZXJjb2xvci1idXR0b24tc3RhcnQtMDEucG5nXFxcIik7XFxyXFxufVxcclxcblxcclxcbi5nYW1lLWJ1dHRvbi5yZXBlYXQtYnV0dG9uIHtcXHJcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0tY29sb3ItZm9udC0xKTtcXHJcXG4gICAgYmFja2dyb3VuZC1pbWFnZTogdXJsKFxcXCIuLi9pbWcvYXBwL3dhdGVyY29sb3ItYnV0dG9uLXJlcGVhdC0wMS5wbmdcXFwiKTtcXHJcXG59XFxyXFxuXFxyXFxuLnJlcGVhdC1idXR0b24ge1xcclxcbiAgICBhbmltYXRpb24tbmFtZTogcm90YXRpb247XFxyXFxuICAgIGFuaW1hdGlvbi1kdXJhdGlvbjogNHM7XFxyXFxuICAgIGFuaW1hdGlvbi10aW1pbmctZnVuY3Rpb246IGxpbmVhcjtcXHJcXG4gICAgYW5pbWF0aW9uLWl0ZXJhdGlvbi1jb3VudDogaW5maW5pdGU7XFxyXFxufVxcclxcblxcclxcbi5yZXBlYXQtYnV0dG9uOmhvdmVyIHtcXHJcXG4gICAgYmFja2dyb3VuZC1pbWFnZTogdXJsKFxcXCIuLi9pbWcvYXBwL3dhdGVyY29sb3ItYnV0dG9uLXJlcGVhdC0wMi5wbmdcXFwiKTtcXHJcXG59XFxyXFxuXFxyXFxuLmdhbWUtcHJvZ3Jlc3Mge1xcclxcbiAgICB3aWR0aDogMjIwcHg7XFxyXFxuICAgIGRpc3BsYXk6IGZsZXg7XFxyXFxuICAgIGp1c3RpZnktY29udGVudDogc3BhY2UtYXJvdW5kO1xcclxcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xcclxcbn1cXHJcXG5cXHJcXG4uZ2FtZS1pbmRpY2F0b3Ige1xcclxcbiAgICB3aWR0aDogMTUwcHg7XFxyXFxuICAgIGhlaWdodDogNDBweDtcXHJcXG4gICAgYm9yZGVyLXJhZGl1czogMThweDtcXHJcXG4gICAgZGlzcGxheTogZmxleDtcXHJcXG4gICAganVzdGlmeS1jb250ZW50OiBmbGV4LXN0YXJ0O1xcclxcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xcclxcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjZmFmOGZkO1xcclxcbiAgICBib3JkZXI6IDFweCB2YXIoLS1jb2xvci1mb250LTEpIHNvbGlkO1xcclxcbiAgICBib3gtc2hhZG93OiAwcHggMHB4IDEwcHggIzdlZDNmZjtcXHJcXG59XFxyXFxuXFxyXFxuLnN0YXIge1xcclxcbiAgICB3aWR0aDogMzBweDtcXHJcXG59XFxyXFxuXFxyXFxuLmdhbWUtc2NvcmUge1xcclxcbiAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XFxyXFxufVxcclxcblxcclxcbi5nYW1lLXNjb3JlIC5jb3JyZWN0IHtcXHJcXG4gICAgY29sb3I6ICMwMDgwMDA7XFxyXFxufVxcclxcblxcclxcbi5nYW1lLXNjb3JlIC53cm9uZyB7XFxyXFxuICAgIGNvbG9yOiAjZmYwMDAwO1xcclxcbn1cXHJcXG5cXHJcXG5uYXYge1xcclxcbiAgICBsZWZ0OiAtMzIwcHg7XFxyXFxuICAgIHBvc2l0aW9uOiBmaXhlZDtcXHJcXG4gICAgdG9wOiAwO1xcclxcbiAgICB3aWR0aDogMzIwcHg7XFxyXFxuICAgIGhlaWdodDogMTAwJTtcXHJcXG4gICAgb3ZlcmZsb3cteTogYXV0bztcXHJcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0tY29sb3ItYmctbWFpbi0xKTtcXHJcXG4gICAgei1pbmRleDogMTE7XFxyXFxuICAgIGJhY2tncm91bmQtaW1hZ2U6IHVybChcXFwiLi4vaW1nL2FwcC93YXRlcmNvbG9yLWt5dGVzLTAxLmpwZ1xcXCIpLCB1cmwoXFxcIi4uL2ltZy9hcHAvd2F0ZXJjb2xvci1idXRlcmZseS0wMS5qcGdcXFwiKTtcXHJcXG4gICAgYmFja2dyb3VuZC1zaXplOiA0NTBweCBhdXRvLCAxNDRweCBhdXRvO1xcclxcbiAgICBiYWNrZ3JvdW5kLXBvc2l0aW9uOiAwcHggMHB4LCAxMjJweCAxMDAlO1xcclxcbiAgICBiYWNrZ3JvdW5kLXJlcGVhdDogbm8tcmVwZWF0LCBuby1yZXBlYXQ7XFxyXFxuICAgIGJveC1zaGFkb3c6IG5vbmU7XFxyXFxuICAgIHRyYW5zaXRpb24tcHJvcGVydHk6IGxlZnQsIGJhY2tncm91bmQtcG9zaXRpb24sIGJhY2tncm91bmQtc2l6ZSwgYm94LXNoYWRvdztcXHJcXG4gICAgdHJhbnNpdGlvbi1kdXJhdGlvbjogMS4ycyw1cztcXHJcXG59XFxyXFxuXFxyXFxubmF2Lm9wZW5lZC1tZW51IHtcXHJcXG4gICAgbGVmdDogMDtcXHJcXG4gICAgYm94LXNoYWRvdzogMHB4IDAgMjBweCAxcHggIzk0Y2E2OCwgMHB4IDAgODBweCAyMHB4ICNmMGUwODAsIDUwcHggMCAyNTBweCA1MHB4IHZhcigtLWNvbG9yLWZvbnQtMSk7XFxyXFxufVxcclxcblxcclxcbi5tZW51LWxpc3Qge1xcclxcbiAgICBoZWlnaHQ6IDUwMHB4O1xcclxcbiAgICBtYXJnaW4tdG9wOiBjYWxjKDUwdmggLSAyNTBweCk7XFxyXFxufVxcclxcblxcclxcbi5tZW51LWxpc3QgbGkge1xcclxcbiAgICBwYWRkaW5nOiAxMHB4IDA7XFxyXFxuICAgIHRleHQtYWxpZ246IGNlbnRlcjtcXHJcXG4gICAgZm9udC1zaXplOiAyZW07XFxyXFxuICAgIGJhY2tncm91bmQtY29sb3I6IHZhcigtLWNvbG9yLWJnLW1haW4tMSk7XFxyXFxufVxcclxcblxcclxcbi5tZW51LWxpc3QgbGk6aG92ZXIge1xcclxcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1jb2xvci1iZy1tYWluLTIpO1xcclxcbiAgICBiYWNrZ3JvdW5kLWltYWdlOiB1cmwoXFxcIi4uL2ltZy9hcHAvd2F0ZXJjb2xvci1saW5lLTAyLXJpZ2h0LnBuZ1xcXCIpO1xcclxcbiAgICBiYWNrZ3JvdW5kLXNpemU6IDEwMCUgMTAwJTtcXHJcXG4gICAgY29sb3I6IHdoaXRlO1xcclxcbn1cXHJcXG5cXHJcXG4ubWVudS1saXN0IGxpOm50aC1jaGlsZChldmVuKTpob3ZlciB7XFxyXFxuICAgIGJhY2tncm91bmQtY29sb3I6IHZhcigtLWNvbG9yLWJnLW1haW4tMik7XFxyXFxuICAgIGJhY2tncm91bmQtaW1hZ2U6IHVybChcXFwiLi4vaW1nL2FwcC93YXRlcmNvbG9yLWxpbmUtMDIucG5nXFxcIik7XFxyXFxufVxcclxcblxcclxcbi5tZW51LWxpc3QgbGkuYWN0aXZlLXBhZ2UsIC5tZW51LWxpc3QgbGkuYWN0aXZlLXBhZ2U6aG92ZXIge1xcclxcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1jb2xvci1iZy1tYWluLTIpO1xcclxcbiAgICBiYWNrZ3JvdW5kLWltYWdlOiB1cmwoXFxcIi4uL2ltZy9hcHAvd2F0ZXJjb2xvci1saW5lLTAxLnBuZ1xcXCIpO1xcclxcbiAgICBiYWNrZ3JvdW5kLXNpemU6IDEwMCUgMTAwJTtcXHJcXG4gICAgY29sb3I6IHdoaXRlO1xcclxcbiAgICBwYWRkaW5nOiAxNXB4IDA7XFxyXFxufVxcclxcblxcclxcbm1haW4uY29udGFpbmVyLWNlbnRlcmVkIHtcXHJcXG4gICAgbWFyZ2luLXRvcDogMjBweDtcXHJcXG4gICAgcGFkZGluZy1ib3R0b206IDM1cHg7XFxyXFxufVxcclxcblxcclxcbi5jb250ZW50LXdyYXBwZXIge1xcclxcbiAgICB3aWR0aDogMTAwJTtcXHJcXG4gICAgbWFyZ2luOiBhdXRvO1xcclxcbiAgICBkaXNwbGF5OiBmbGV4O1xcclxcbiAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcclxcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xcclxcbn1cXHJcXG5cXHJcXG5oMi50b3BpYy1uYW1lIHtcXHJcXG4gICAgZm9udC1zaXplOiAzNHB4O1xcclxcbiAgICBtYXJnaW46IDMwcHggMDtcXHJcXG59XFxyXFxuXFxyXFxuLmNhcmQtY29udGFpbmVyIHtcXHJcXG4gICAgZGlzcGxheTogZmxleDtcXHJcXG4gICAganVzdGlmeS1jb250ZW50OiBzcGFjZS1hcm91bmQ7XFxyXFxuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxyXFxuICAgIGZsZXgtd3JhcDogd3JhcDtcXHJcXG4gICAgd2lkdGg6IDc4JTtcXHJcXG4gICAgbWFyZ2luOiBhdXRvO1xcclxcbn1cXHJcXG5cXHJcXG4uY2FyZCB7XFxyXFxuICAgIG1hcmdpbjogMTVweDtcXHJcXG4gICAgcG9zaXRpb246IHJlbGF0aXZlO1xcclxcbn1cXHJcXG5cXHJcXG4uY2FyZC1tYWluLXBhZ2Uge1xcclxcbiAgICB3aWR0aDogMjU2cHg7XFxyXFxuICAgIGhlaWdodDogMjQwcHg7XFxyXFxuICAgIG1hcmdpbi10b3A6IDIwcHg7XFxyXFxuICAgIHBhZGRpbmc6IDQ1cHg7XFxyXFxuICAgIGJvcmRlci1yYWRpdXM6IDUwJTtcXHJcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogI2ZmZmZmZjtcXHJcXG4gICAgYmFja2dyb3VuZC1pbWFnZTogdXJsKFxcXCIuLi9pbWcvYXBwL3dhdGVyY29sb3ItYmx1ZS1jYXJkLWJnLTAxLmpwZ1xcXCIpO1xcclxcbiAgICBiYWNrZ3JvdW5kLXNpemU6IDEwMCUgODMlO1xcclxcbiAgICBiYWNrZ3JvdW5kLXJlcGVhdDogbm8tcmVwZWF0O1xcclxcbn1cXHJcXG5cXHJcXG4uY2FyZC10b3BpYyB7XFxyXFxuICAgIHdpZHRoOiAyMjZweDtcXHJcXG4gICAgaGVpZ2h0OiAyNzBweDtcXHJcXG59XFxyXFxuXFxyXFxuLmNhcmQuZGlzYWJsZWQge1xcclxcbiAgICBmaWx0ZXI6IGJsdXIoM3B4KTtcXHJcXG59XFxyXFxuXFxyXFxuLmNhcmQtY29udGVudCB7XFxyXFxuICAgIHdpZHRoOiAxMDAlO1xcclxcbiAgICBoZWlnaHQ6IDEwMCU7XFxyXFxuICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcXHJcXG59XFxyXFxuXFxyXFxuLmNhcmQtdG9waWMgLmNhcmQtY29udGVudCB7XFxyXFxuICAgIGJvcmRlcjogMnB4IHZhcigtLWNvbG9yLWZvbnQtMSkgc29saWQ7XFxyXFxuICAgIGJveC1zaGFkb3c6IDAgMCAxNXB4IDFweCB2YXIoLS1jb2xvci1mb250LTEpO1xcclxcbn1cXHJcXG5cXHJcXG4uY2FyZC10b3BpYyAuY2FyZC1jb250ZW50OmhvdmVyIHtcXHJcXG4gICAgYm94LXNoYWRvdzogMCAwIDE1cHggM3B4IHZhcigtLWNvbG9yLWZvbnQtMSk7XFxyXFxufVxcclxcblxcclxcbi5jYXJkLmRpc2FibGVkIC5jYXJkLWNvbnRlbnQge1xcclxcbiAgICBib3gtc2hhZG93OiBub25lO1xcclxcbn1cXHJcXG5cXHJcXG4uY2FyZC1tYWluLXBhZ2UgLmNhcmQtY29udGVudCwgLmNhcmQtbWFpbi1wYWdlIGltZyB7XFxyXFxuICAgIGJvcmRlci1yYWRpdXM6IDUwcHg7XFxyXFxufVxcclxcblxcclxcbi5jYXJkLWNvbnRlbnQsIC5jYXJkLWNvbnRlbnQgaW1nIHtcXHJcXG4gICAgdHJhbnNpdGlvbjogYm9yZGVyLXJhZGl1cyAxcztcXHJcXG59XFxyXFxuXFxyXFxuLmNhcmQtdG9waWMgLmNhcmQtY29udGVudCB7XFxyXFxuICAgIGJvcmRlci1yYWRpdXM6IDUwcHggMDtcXHJcXG59XFxyXFxuXFxyXFxuLmNhcmQtdG9waWMuZmxpcHBlZCAuY2FyZC1jb250ZW50IHtcXHJcXG4gICAgYm9yZGVyLXJhZGl1czogMCA1MHB4O1xcclxcbn1cXHJcXG5cXHJcXG4uY2FyZC10b3BpYyBpbWcge1xcclxcbiAgICBib3JkZXItcmFkaXVzOiA1MHB4IDAgMCAwO1xcclxcbn1cXHJcXG5cXHJcXG4uY2FyZC10b3BpYy5mbGlwcGVkIGltZyB7XFxyXFxuICAgIGJvcmRlci1yYWRpdXM6IDAgNTBweCAwIDA7XFxyXFxufVxcclxcblxcclxcbi5jYXJkIHAge1xcclxcbiAgICBtYXJnaW4tdG9wOiAxNXB4O1xcclxcbiAgICBmb250LXNpemU6IDMycHg7XFxyXFxuICAgIHRleHQtYWxpZ246IGNlbnRlcjtcXHJcXG59XFxyXFxuXFxyXFxuLmNhcmQtbWFpbi1wYWdlIHAge1xcclxcbiAgICBwb3NpdGlvbjogcmVsYXRpdmU7XFxyXFxuICAgIHRvcDogMzJweDtcXHJcXG4gICAgYm9yZGVyLXJhZGl1czogMjBweDtcXHJcXG4gICAgZm9udC1zaXplOiAzMnB4O1xcclxcbn1cXHJcXG5cXHJcXG4uY2FyZC1mbGlwLWJ1dHRvbiB7XFxyXFxuICAgIHdpZHRoOiAzNXB4O1xcclxcbiAgICBoZWlnaHQ6IDM1cHg7XFxyXFxuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXHJcXG4gICAgYm90dG9tOiAyMHB4O1xcclxcbiAgICByaWdodDogMjBweDtcXHJcXG4gICAgYm9yZGVyLXJhZGl1czogNTAlO1xcclxcbiAgICBiYWNrZ3JvdW5kLWltYWdlOiB1cmwoXFxcIi4uL2ltZy9hcHAvd2F0ZXJjb2xvci1mbGlwLWJ1dHRvbi0wMS5wbmdcXFwiKTtcXHJcXG4gICAgYmFja2dyb3VuZC1zaXplOiBjb3ZlcjtcXHJcXG59XFxyXFxuXFxyXFxuLmNhcmQtZmxpcC1idXR0b246aG92ZXIge1xcclxcbiAgICBhbmltYXRpb24tbmFtZTogcm90YXRpb247XFxyXFxuICAgIGFuaW1hdGlvbi1kdXJhdGlvbjogMnM7XFxyXFxuICAgIGFuaW1hdGlvbi10aW1pbmctZnVuY3Rpb246IGxpbmVhcjtcXHJcXG4gICAgYW5pbWF0aW9uLWl0ZXJhdGlvbi1jb3VudDogaW5maW5pdGU7XFxyXFxufVxcclxcblxcclxcbi5mbGlwcGVkIC5jYXJkLWNvbnRlbnQge1xcclxcbiAgICBhbmltYXRpb24tbmFtZTogZmxpcC1jYXJkO1xcclxcbiAgICBhbmltYXRpb24tZHVyYXRpb246IDFzO1xcclxcbn1cXHJcXG5cXHJcXG4udW5mbGlwcGVkIC5jYXJkLWNvbnRlbnQge1xcclxcbiAgICBhbmltYXRpb24tbmFtZTogdW5mbGlwLWNhcmQ7XFxyXFxuICAgIGFuaW1hdGlvbi1kdXJhdGlvbjogMXM7XFxyXFxufVxcclxcblxcclxcbi5maW5hbC1jbGlwIHtcXHJcXG4gICAgZGlzcGxheTogZmxleDtcXHJcXG4gICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXHJcXG4gICAgd2lkdGg6IDMyMHB4O1xcclxcbiAgICBtYXJnaW46IGF1dG87XFxyXFxuICAgIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcclxcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xcclxcbiAgICBwYWRkaW5nOiA1MHB4IDA7XFxyXFxufVxcclxcblxcclxcbi5maW5hbC1jbGlwIHAge1xcclxcbiAgICBjb2xvcjogcmVkO1xcclxcbiAgICBmb250LXNpemU6IDM2cHg7XFxyXFxuICAgIG1hcmdpbi10b3A6IDMwcHg7XFxyXFxufVxcclxcblxcclxcbi5zdGF0LWNvbnRhaW5lciB7XFxyXFxuICAgIHdpZHRoOiA3NCU7XFxyXFxuICAgIGRpc3BsYXk6IGZsZXg7XFxyXFxuICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxyXFxuICAgIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcclxcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xcclxcbiAgICBmb250LXNpemU6IDJlbTtcXHJcXG59XFxyXFxuXFxyXFxuLnRhYmxlLXdyYXBwZXIge1xcclxcbiAgICB3aWR0aDogMTAwJTtcXHJcXG4gICAgb3ZlcmZsb3cteDogYXV0bztcXHJcXG4gICAgb3ZlcmZsb3cteTogaGlkZGVuO1xcclxcbn1cXHJcXG5cXHJcXG4uc3RhdC10YWJsZSB7XFxyXFxuICAgIHdpZHRoOiAxMDAlO1xcclxcbiAgICBib3JkZXItY29sbGFwc2U6IGNvbGxhcHNlO1xcclxcbiAgICBmb250LXNpemU6IDAuNWVtO1xcclxcblxcclxcbn1cXHJcXG5cXHJcXG50aGVhZCB7XFxyXFxuICAgIGJhY2tncm91bmQtY29sb3I6IGFsaWNlYmx1ZTtcXHJcXG59XFxyXFxuXFxyXFxudGgsIHRkIHtcXHJcXG4gICAgcGFkZGluZzogMCA0cHg7XFxyXFxuICAgIGJvcmRlcjogMXB4IHNvbGlkIGJsYWNrO1xcclxcbiAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XFxyXFxuICAgIHZlcnRpY2FsLWFsaWduOiBtaWRkbGU7XFxyXFxufVxcclxcblxcclxcbnRoIHtcXHJcXG4gICAgaGVpZ2h0OiA0MHB4O1xcclxcbiAgICBwb3NpdGlvbjogcmVsYXRpdmU7XFxyXFxuICAgIGZvbnQtc2l6ZTogMjJweDtcXHJcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0tY29sb3ItYmctbWFpbi0xKTtcXHJcXG4gICAgYm9yZGVyOiBub25lO1xcclxcbn1cXHJcXG5cXHJcXG50ciB7XFxyXFxuICAgIGhlaWdodDogMjVweDtcXHJcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0tY29sb3ItYmctbWFpbi0xKTtcXHJcXG59XFxyXFxuXFxyXFxudGguc29ydGVkIHtcXHJcXG4gICAgcGFkZGluZzogMCAyNHB4IDAgNHB4O1xcclxcbn1cXHJcXG5cXHJcXG50cjpudGgtY2hpbGQoZXZlbikge1xcclxcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjZTlmNWZmO1xcclxcbn1cXHJcXG5cXHJcXG5pbWcuc29ydC1pY29uIHtcXHJcXG4gICAgd2lkdGg6IDE2cHg7XFxyXFxuICAgIGhlaWdodDogYXV0bztcXHJcXG4gICAgcG9zaXRpb246IGFic29sdXRlO1xcclxcbiAgICByaWdodDogMTVweDtcXHJcXG4gICAgdG9wOiAxMnB4O1xcclxcbn1cXHJcXG5cXHJcXG4uc3RhdC1idXR0b25zLXdyYXBwZXIge1xcclxcbiAgICB3aWR0aDogMTAwJTtcXHJcXG4gICAgZGlzcGxheTogZmxleDtcXHJcXG4gICAganVzdGlmeS1jb250ZW50OiBzcGFjZS1hcm91bmQ7XFxyXFxuICAgIGZsZXgtd3JhcDogd3JhcDtcXHJcXG59XFxyXFxuXFxyXFxuLnN0YXQtYnV0dG9uIHtcXHJcXG4gICAgd2lkdGg6IDMwMHB4O1xcclxcbiAgICBoZWlnaHQ6IDcwcHg7XFxyXFxuICAgIG1hcmdpbjogMjBweCAwO1xcclxcbiAgICBwYWRkaW5nOiAxNXB4O1xcclxcbiAgICBib3JkZXItcmFkaXVzOiA1MHB4O1xcclxcbiAgICBjb2xvcjogYXp1cmU7XFxyXFxuICAgIHRleHQtYWxpZ246IGNlbnRlcjtcXHJcXG59XFxyXFxuXFxyXFxuLmJ1dHRvbi50cmFpbi1kaWZmIHtcXHJcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogIzA3YTA2MDtcXHJcXG4gICAgYmFja2dyb3VuZC1pbWFnZTogdXJsKFxcXCIuLi9pbWcvYXBwL3dhdGVyY29sb3ItZ3JlZW4tbGluZS0wMS5wbmdcXFwiKTtcXHJcXG4gICAgYmFja2dyb3VuZC1zaXplOiAxMDAlIDEwMCU7XFxyXFxuICAgIHRleHQtc2hhZG93OiAzcHggM3B4IDNweCAjMDdhMDYwO1xcclxcbn1cXHJcXG5cXHJcXG4uYnV0dG9uLnJlc2V0LXN0YXQge1xcclxcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjYmQyZDJkO1xcclxcbiAgICBiYWNrZ3JvdW5kLWltYWdlOiB1cmwoXFxcIi4uL2ltZy9hcHAvd2F0ZXJjb2xvci1yZWQtbGluZS0wMS5wbmdcXFwiKTtcXHJcXG4gICAgYmFja2dyb3VuZC1zaXplOiAxMDAlIDEwMCU7XFxyXFxuICAgIHRleHQtc2hhZG93OiAzcHggM3B4IDNweCAjYmQyZDJkO1xcclxcbn1cXHJcXG5cXHJcXG4ubm90aGluZy1kaWZmIHtcXHJcXG4gICAgd2lkdGg6IDYwJTtcXHJcXG4gICAgbWFyZ2luLXRvcDogMzBweDtcXHJcXG4gICAgZGlzcGxheTogZmxleDtcXHJcXG4gICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbi1yZXZlcnNlO1xcclxcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xcclxcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXHJcXG59XFxyXFxuXFxyXFxuLm5vdGhpbmctZGlmZiAuZ3JhcGhpYyB7XFxyXFxuICAgIHdpZHRoOiA2MCU7XFxyXFxufVxcclxcblxcclxcbi5ub3RoaW5nLWRpZmYgcCB7XFxyXFxuICAgIGNvbG9yOiAjMmE2NDFhO1xcclxcbiAgICBmb250LXNpemU6IDR2dztcXHJcXG4gICAgbWFyZ2luLWJvdHRvbTogMTVweDtcXHJcXG4gICAgdGV4dC1zaGFkb3c6IDJweCA1cHggNXB4ICNlNGViYjU7XFxyXFxufVxcclxcblxcclxcbi5kaXNhYmxlZDpob3ZlciB7XFxyXFxuICAgIGN1cnNvcjphdXRvO1xcclxcbn1cXHJcXG5cXHJcXG4vKiAtLS0gQW5pbWF0aW9uIC0tLSAqL1xcclxcblxcclxcbkBrZXlmcmFtZXMgZmxpcC1jYXJkIHtcXHJcXG4gICAgMCUge31cXHJcXG4gICAgNTAlIHt0cmFuc2Zvcm06IHJvdGF0ZVkoODlkZWcpfVxcclxcbn1cXHJcXG5cXHJcXG5Aa2V5ZnJhbWVzIHVuZmxpcC1jYXJkIHtcXHJcXG4gICAgMCUge31cXHJcXG4gICAgNTAlIHt0cmFuc2Zvcm06IHJvdGF0ZVkoODlkZWcpfVxcclxcbn1cXHJcXG5cXHJcXG5Aa2V5ZnJhbWVzIHJvdGF0aW9uIHtcXHJcXG4gICAgMCUge31cXHJcXG4gICAgMTAwJSB7dHJhbnNmb3JtOiByb3RhdGUoMzYwZGVnKX1cXHJcXG59XFxyXFxuXFxyXFxuLyogLS0tIFJFU1BPTlNJVkUgTEFZT1VUUyAtLS0gKi9cXHJcXG5cXHJcXG5AbWVkaWEgKG1heC13aWR0aDogMTQzOXB4KSB7XFxyXFxuICAgIC5jb250YWluZXItY2VudGVyZWQge1xcclxcbiAgICAgICAgbWluLXdpZHRoOiBjYWxjKDE0NDB2dyoxMDAvMTQ0MCAtIDIwcHgpO1xcclxcbiAgICB9XFxyXFxuXFxyXFxuICAgIGhlYWRlci5tYWluLXBhZ2Uge1xcclxcbiAgICAgICAgbWFyZ2luLXRvcDogIGNhbGMoMzgwdncqMTAwLzE0NDApO1xcclxcbiAgICB9XFxyXFxuXFxyXFxuICAgIGhlYWRlciAuZ3JhcGhpYyB7XFxyXFxuICAgICAgICB0b3A6IGNhbGMoLTM3MHZ3KjEwMC8xNDQwICsgNXB4KTtcXHJcXG4gICAgfVxcclxcbn1cXHJcXG5cXHJcXG5AbWVkaWEgKG1heC13aWR0aDogOTk5cHgpIHtcXHJcXG5cXHJcXG4gICAgaW1nLnNvcnQtaWNvbiB7XFxyXFxuICAgICAgICByaWdodDogNXB4O1xcclxcbiAgICB9XFxyXFxuXFxyXFxuICAgIC5ub3RoaW5nLWRpZmYge1xcclxcbiAgICAgICAgd2lkdGg6IDEwMCU7XFxyXFxuICAgIH1cXHJcXG5cXHJcXG4gICAgLm5vdGhpbmctZGlmZiBwIHtcXHJcXG4gICAgICAgIGZvbnQtc2l6ZTogMzZweDtcXHJcXG4gICAgfVxcclxcbn1cXHJcXG5cXHJcXG5AbWVkaWEgKG1heC13aWR0aDogNTU5cHgpIHtcXHJcXG4gICAgLm1haW4tY29udHJvbHMge1xcclxcbiAgICAgICAgd2lkdGg6IDEwMHZ3O1xcclxcbiAgICAgICAgYm9yZGVyLXJhZGl1czogMDtcXHJcXG4gICAgfVxcclxcblxcclxcbiAgICAuZ2FtZS1jb250cm9scyB7XFxyXFxuICAgICAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXHJcXG4gICAgICAgIGJveC1zaGFkb3c6IDBweCAtMTVweCAzMHB4ICM3ZWQzZmY7XFxyXFxuICAgIH1cXHJcXG5cXHJcXG4gICAgLmdhbWUtYnV0dG9uIHtcXHJcXG4gICAgICAgIHdpZHRoOiA3MHB4O1xcclxcbiAgICAgICAgaGVpZ2h0OiA3MHB4O1xcclxcbiAgICB9XFxyXFxuXFxyXFxuICAgIC5nYW1lLXByb2dyZXNzIHtcXHJcXG4gICAgICAgIGp1c3RpZnktY29udGVudDogZmxleC1zdGFydDtcXHJcXG4gICAgICAgIG1hcmdpbjogMCAwIDAgMTBweDtcXHJcXG4gICAgfVxcclxcblxcclxcbiAgICAuZ2FtZS1zY29yZSB7XFxyXFxuICAgICAgICBtYXJnaW46IDAgMCAwIDEwcHg7XFxyXFxuICAgIH1cXHJcXG5cXHJcXG4gICAgaDEge1xcclxcbiAgICAgICAgbWF4LXdpZHRoOiA3NXB4O1xcclxcbiAgICAgICAgZm9udC1zaXplOiAyNHB4O1xcclxcbiAgICB9XFxyXFxuXFxyXFxuICAgIGgyLnRvcGljLW5hbWUge1xcclxcbiAgICAgICAgZm9udC1zaXplOiAzMnB4O1xcclxcbiAgICAgICAgbWFyZ2luOiAxMHB4IDA7XFxyXFxuICAgIH1cXHJcXG5cXHJcXG4gICAgLmNhcmQtbWFpbi1wYWdlIHtcXHJcXG4gICAgICAgIHdpZHRoOiAyMzBweDtcXHJcXG4gICAgICAgIGhlaWdodDogMjIwcHg7XFxyXFxuICAgICAgICBtYXJnaW46IDEwcHggMDtcXHJcXG4gICAgfVxcclxcblxcclxcbiAgICAuY2FyZC1tYWluLXBhZ2UgcCB7XFxyXFxuICAgICAgICBmb250LXNpemU6IDI4cHg7XFxyXFxuICAgIH1cXHJcXG5cXHJcXG4gICAgLnN0YXQtYnV0dG9ucy13cmFwcGVyIHtcXHJcXG4gICAgICAgIHdpZHRoOiA3OCU7XFxyXFxuICAgIH1cXHJcXG5cXHJcXG4gICAgLnN0YXQtYnV0dG9uIHtcXHJcXG4gICAgICAgIHdpZHRoOiAxOTBweDtcXHJcXG4gICAgICAgIGhlaWdodDogNTJweDtcXHJcXG4gICAgICAgIGZvbnQtc2l6ZTogMjFweDtcXHJcXG4gICAgICAgIG1hcmdpbjogNXB4IDA7XFxyXFxuICAgIH1cXHJcXG5cXHJcXG4gICAgbWFpbi5jb250YWluZXItY2VudGVyZWQge1xcclxcbiAgICAgICAgd2lkdGg6IDEwMHZ3O1xcclxcbiAgICB9XFxyXFxuXFxyXFxuICAgIC5zdGF0LWNvbnRhaW5lciB7XFxyXFxuICAgICAgICB3aWR0aDogMTAwJTtcXHJcXG4gICAgfVxcclxcblxcclxcbiAgICAudGFibGUtd3JhcHBlciB7XFxyXFxuICAgICAgICB3aWR0aDogNzIlO1xcclxcbiAgICB9XFxyXFxufVxcclxcblxcclxcbkBtZWRpYSAobWF4LWhlaWdodDogOTMwcHgpIHtcXHJcXG4gICAgbmF2IHtcXHJcXG4gICAgICAgIGJhY2tncm91bmQtc2l6ZTogNDUwcHggYXV0bywgMCBhdXRvO1xcclxcbiAgICB9XFxyXFxufVxcclxcblxcclxcbkBtZWRpYSAobWF4LWhlaWdodDogOTcwcHgpIHtcXHJcXG4gICAgLm1lbnUtbGlzdCB7XFxyXFxuICAgICAgICBtYXJnaW4tdG9wOiAyMzVweDtcXHJcXG4gICAgfVxcclxcbn1cXHJcXG5cIl0sXCJzb3VyY2VSb290XCI6XCJcIn1dKTtcbi8vIEV4cG9ydHNcbmV4cG9ydCBkZWZhdWx0IF9fX0NTU19MT0FERVJfRVhQT1JUX19fO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qXG4gIE1JVCBMaWNlbnNlIGh0dHA6Ly93d3cub3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvbWl0LWxpY2Vuc2UucGhwXG4gIEF1dGhvciBUb2JpYXMgS29wcGVycyBAc29rcmFcbiovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChjc3NXaXRoTWFwcGluZ1RvU3RyaW5nKSB7XG4gIHZhciBsaXN0ID0gW107IC8vIHJldHVybiB0aGUgbGlzdCBvZiBtb2R1bGVzIGFzIGNzcyBzdHJpbmdcblxuICBsaXN0LnRvU3RyaW5nID0gZnVuY3Rpb24gdG9TdHJpbmcoKSB7XG4gICAgcmV0dXJuIHRoaXMubWFwKGZ1bmN0aW9uIChpdGVtKSB7XG4gICAgICB2YXIgY29udGVudCA9IFwiXCI7XG4gICAgICB2YXIgbmVlZExheWVyID0gdHlwZW9mIGl0ZW1bNV0gIT09IFwidW5kZWZpbmVkXCI7XG5cbiAgICAgIGlmIChpdGVtWzRdKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJAc3VwcG9ydHMgKFwiLmNvbmNhdChpdGVtWzRdLCBcIikge1wiKTtcbiAgICAgIH1cblxuICAgICAgaWYgKGl0ZW1bMl0pIHtcbiAgICAgICAgY29udGVudCArPSBcIkBtZWRpYSBcIi5jb25jYXQoaXRlbVsyXSwgXCIge1wiKTtcbiAgICAgIH1cblxuICAgICAgaWYgKG5lZWRMYXllcikge1xuICAgICAgICBjb250ZW50ICs9IFwiQGxheWVyXCIuY29uY2F0KGl0ZW1bNV0ubGVuZ3RoID4gMCA/IFwiIFwiLmNvbmNhdChpdGVtWzVdKSA6IFwiXCIsIFwiIHtcIik7XG4gICAgICB9XG5cbiAgICAgIGNvbnRlbnQgKz0gY3NzV2l0aE1hcHBpbmdUb1N0cmluZyhpdGVtKTtcblxuICAgICAgaWYgKG5lZWRMYXllcikge1xuICAgICAgICBjb250ZW50ICs9IFwifVwiO1xuICAgICAgfVxuXG4gICAgICBpZiAoaXRlbVsyXSkge1xuICAgICAgICBjb250ZW50ICs9IFwifVwiO1xuICAgICAgfVxuXG4gICAgICBpZiAoaXRlbVs0XSkge1xuICAgICAgICBjb250ZW50ICs9IFwifVwiO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gY29udGVudDtcbiAgICB9KS5qb2luKFwiXCIpO1xuICB9OyAvLyBpbXBvcnQgYSBsaXN0IG9mIG1vZHVsZXMgaW50byB0aGUgbGlzdFxuXG5cbiAgbGlzdC5pID0gZnVuY3Rpb24gaShtb2R1bGVzLCBtZWRpYSwgZGVkdXBlLCBzdXBwb3J0cywgbGF5ZXIpIHtcbiAgICBpZiAodHlwZW9mIG1vZHVsZXMgPT09IFwic3RyaW5nXCIpIHtcbiAgICAgIG1vZHVsZXMgPSBbW251bGwsIG1vZHVsZXMsIHVuZGVmaW5lZF1dO1xuICAgIH1cblxuICAgIHZhciBhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzID0ge307XG5cbiAgICBpZiAoZGVkdXBlKSB7XG4gICAgICBmb3IgKHZhciBrID0gMDsgayA8IHRoaXMubGVuZ3RoOyBrKyspIHtcbiAgICAgICAgdmFyIGlkID0gdGhpc1trXVswXTtcblxuICAgICAgICBpZiAoaWQgIT0gbnVsbCkge1xuICAgICAgICAgIGFscmVhZHlJbXBvcnRlZE1vZHVsZXNbaWRdID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIGZvciAodmFyIF9rID0gMDsgX2sgPCBtb2R1bGVzLmxlbmd0aDsgX2srKykge1xuICAgICAgdmFyIGl0ZW0gPSBbXS5jb25jYXQobW9kdWxlc1tfa10pO1xuXG4gICAgICBpZiAoZGVkdXBlICYmIGFscmVhZHlJbXBvcnRlZE1vZHVsZXNbaXRlbVswXV0pIHtcbiAgICAgICAgY29udGludWU7XG4gICAgICB9XG5cbiAgICAgIGlmICh0eXBlb2YgbGF5ZXIgIT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgICAgaWYgKHR5cGVvZiBpdGVtWzVdID09PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICAgICAgaXRlbVs1XSA9IGxheWVyO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGl0ZW1bMV0gPSBcIkBsYXllclwiLmNvbmNhdChpdGVtWzVdLmxlbmd0aCA+IDAgPyBcIiBcIi5jb25jYXQoaXRlbVs1XSkgOiBcIlwiLCBcIiB7XCIpLmNvbmNhdChpdGVtWzFdLCBcIn1cIik7XG4gICAgICAgICAgaXRlbVs1XSA9IGxheWVyO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGlmIChtZWRpYSkge1xuICAgICAgICBpZiAoIWl0ZW1bMl0pIHtcbiAgICAgICAgICBpdGVtWzJdID0gbWVkaWE7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaXRlbVsxXSA9IFwiQG1lZGlhIFwiLmNvbmNhdChpdGVtWzJdLCBcIiB7XCIpLmNvbmNhdChpdGVtWzFdLCBcIn1cIik7XG4gICAgICAgICAgaXRlbVsyXSA9IG1lZGlhO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGlmIChzdXBwb3J0cykge1xuICAgICAgICBpZiAoIWl0ZW1bNF0pIHtcbiAgICAgICAgICBpdGVtWzRdID0gXCJcIi5jb25jYXQoc3VwcG9ydHMpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGl0ZW1bMV0gPSBcIkBzdXBwb3J0cyAoXCIuY29uY2F0KGl0ZW1bNF0sIFwiKSB7XCIpLmNvbmNhdChpdGVtWzFdLCBcIn1cIik7XG4gICAgICAgICAgaXRlbVs0XSA9IHN1cHBvcnRzO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGxpc3QucHVzaChpdGVtKTtcbiAgICB9XG4gIH07XG5cbiAgcmV0dXJuIGxpc3Q7XG59OyIsIlwidXNlIHN0cmljdFwiO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uICh1cmwsIG9wdGlvbnMpIHtcbiAgaWYgKCFvcHRpb25zKSB7XG4gICAgb3B0aW9ucyA9IHt9O1xuICB9XG5cbiAgaWYgKCF1cmwpIHtcbiAgICByZXR1cm4gdXJsO1xuICB9XG5cbiAgdXJsID0gU3RyaW5nKHVybC5fX2VzTW9kdWxlID8gdXJsLmRlZmF1bHQgOiB1cmwpOyAvLyBJZiB1cmwgaXMgYWxyZWFkeSB3cmFwcGVkIGluIHF1b3RlcywgcmVtb3ZlIHRoZW1cblxuICBpZiAoL15bJ1wiXS4qWydcIl0kLy50ZXN0KHVybCkpIHtcbiAgICB1cmwgPSB1cmwuc2xpY2UoMSwgLTEpO1xuICB9XG5cbiAgaWYgKG9wdGlvbnMuaGFzaCkge1xuICAgIHVybCArPSBvcHRpb25zLmhhc2g7XG4gIH0gLy8gU2hvdWxkIHVybCBiZSB3cmFwcGVkP1xuICAvLyBTZWUgaHR0cHM6Ly9kcmFmdHMuY3Nzd2cub3JnL2Nzcy12YWx1ZXMtMy8jdXJsc1xuXG5cbiAgaWYgKC9bXCInKCkgXFx0XFxuXXwoJTIwKS8udGVzdCh1cmwpIHx8IG9wdGlvbnMubmVlZFF1b3Rlcykge1xuICAgIHJldHVybiBcIlxcXCJcIi5jb25jYXQodXJsLnJlcGxhY2UoL1wiL2csICdcXFxcXCInKS5yZXBsYWNlKC9cXG4vZywgXCJcXFxcblwiKSwgXCJcXFwiXCIpO1xuICB9XG5cbiAgcmV0dXJuIHVybDtcbn07IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0ZW0pIHtcbiAgdmFyIGNvbnRlbnQgPSBpdGVtWzFdO1xuICB2YXIgY3NzTWFwcGluZyA9IGl0ZW1bM107XG5cbiAgaWYgKCFjc3NNYXBwaW5nKSB7XG4gICAgcmV0dXJuIGNvbnRlbnQ7XG4gIH1cblxuICBpZiAodHlwZW9mIGJ0b2EgPT09IFwiZnVuY3Rpb25cIikge1xuICAgIHZhciBiYXNlNjQgPSBidG9hKHVuZXNjYXBlKGVuY29kZVVSSUNvbXBvbmVudChKU09OLnN0cmluZ2lmeShjc3NNYXBwaW5nKSkpKTtcbiAgICB2YXIgZGF0YSA9IFwic291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247Y2hhcnNldD11dGYtODtiYXNlNjQsXCIuY29uY2F0KGJhc2U2NCk7XG4gICAgdmFyIHNvdXJjZU1hcHBpbmcgPSBcIi8qIyBcIi5jb25jYXQoZGF0YSwgXCIgKi9cIik7XG4gICAgdmFyIHNvdXJjZVVSTHMgPSBjc3NNYXBwaW5nLnNvdXJjZXMubWFwKGZ1bmN0aW9uIChzb3VyY2UpIHtcbiAgICAgIHJldHVybiBcIi8qIyBzb3VyY2VVUkw9XCIuY29uY2F0KGNzc01hcHBpbmcuc291cmNlUm9vdCB8fCBcIlwiKS5jb25jYXQoc291cmNlLCBcIiAqL1wiKTtcbiAgICB9KTtcbiAgICByZXR1cm4gW2NvbnRlbnRdLmNvbmNhdChzb3VyY2VVUkxzKS5jb25jYXQoW3NvdXJjZU1hcHBpbmddKS5qb2luKFwiXFxuXCIpO1xuICB9XG5cbiAgcmV0dXJuIFtjb250ZW50XS5qb2luKFwiXFxuXCIpO1xufTsiLCJcbiAgICAgIGltcG9ydCBBUEkgZnJvbSBcIiEuLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbmplY3RTdHlsZXNJbnRvU3R5bGVUYWcuanNcIjtcbiAgICAgIGltcG9ydCBkb21BUEkgZnJvbSBcIiEuLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZURvbUFQSS5qc1wiO1xuICAgICAgaW1wb3J0IGluc2VydEZuIGZyb20gXCIhLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0QnlTZWxlY3Rvci5qc1wiO1xuICAgICAgaW1wb3J0IHNldEF0dHJpYnV0ZXMgZnJvbSBcIiEuLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXMuanNcIjtcbiAgICAgIGltcG9ydCBpbnNlcnRTdHlsZUVsZW1lbnQgZnJvbSBcIiEuLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRTdHlsZUVsZW1lbnQuanNcIjtcbiAgICAgIGltcG9ydCBzdHlsZVRhZ1RyYW5zZm9ybUZuIGZyb20gXCIhLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVUYWdUcmFuc2Zvcm0uanNcIjtcbiAgICAgIGltcG9ydCBjb250ZW50LCAqIGFzIG5hbWVkRXhwb3J0IGZyb20gXCIhIS4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4vbm9ybWFsaXplLmNzc1wiO1xuICAgICAgXG4gICAgICBcblxudmFyIG9wdGlvbnMgPSB7fTtcblxub3B0aW9ucy5zdHlsZVRhZ1RyYW5zZm9ybSA9IHN0eWxlVGFnVHJhbnNmb3JtRm47XG5vcHRpb25zLnNldEF0dHJpYnV0ZXMgPSBzZXRBdHRyaWJ1dGVzO1xuXG4gICAgICBvcHRpb25zLmluc2VydCA9IGluc2VydEZuLmJpbmQobnVsbCwgXCJoZWFkXCIpO1xuICAgIFxub3B0aW9ucy5kb21BUEkgPSBkb21BUEk7XG5vcHRpb25zLmluc2VydFN0eWxlRWxlbWVudCA9IGluc2VydFN0eWxlRWxlbWVudDtcblxudmFyIHVwZGF0ZSA9IEFQSShjb250ZW50LCBvcHRpb25zKTtcblxuXG5cbmV4cG9ydCAqIGZyb20gXCIhIS4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4vbm9ybWFsaXplLmNzc1wiO1xuICAgICAgIGV4cG9ydCBkZWZhdWx0IGNvbnRlbnQgJiYgY29udGVudC5sb2NhbHMgPyBjb250ZW50LmxvY2FscyA6IHVuZGVmaW5lZDtcbiIsIlxuICAgICAgaW1wb3J0IEFQSSBmcm9tIFwiIS4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luamVjdFN0eWxlc0ludG9TdHlsZVRhZy5qc1wiO1xuICAgICAgaW1wb3J0IGRvbUFQSSBmcm9tIFwiIS4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlRG9tQVBJLmpzXCI7XG4gICAgICBpbXBvcnQgaW5zZXJ0Rm4gZnJvbSBcIiEuLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRCeVNlbGVjdG9yLmpzXCI7XG4gICAgICBpbXBvcnQgc2V0QXR0cmlidXRlcyBmcm9tIFwiIS4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3NldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlcy5qc1wiO1xuICAgICAgaW1wb3J0IGluc2VydFN0eWxlRWxlbWVudCBmcm9tIFwiIS4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydFN0eWxlRWxlbWVudC5qc1wiO1xuICAgICAgaW1wb3J0IHN0eWxlVGFnVHJhbnNmb3JtRm4gZnJvbSBcIiEuLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZVRhZ1RyYW5zZm9ybS5qc1wiO1xuICAgICAgaW1wb3J0IGNvbnRlbnQsICogYXMgbmFtZWRFeHBvcnQgZnJvbSBcIiEhLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanMhLi9yZXNldC5jc3NcIjtcbiAgICAgIFxuICAgICAgXG5cbnZhciBvcHRpb25zID0ge307XG5cbm9wdGlvbnMuc3R5bGVUYWdUcmFuc2Zvcm0gPSBzdHlsZVRhZ1RyYW5zZm9ybUZuO1xub3B0aW9ucy5zZXRBdHRyaWJ1dGVzID0gc2V0QXR0cmlidXRlcztcblxuICAgICAgb3B0aW9ucy5pbnNlcnQgPSBpbnNlcnRGbi5iaW5kKG51bGwsIFwiaGVhZFwiKTtcbiAgICBcbm9wdGlvbnMuZG9tQVBJID0gZG9tQVBJO1xub3B0aW9ucy5pbnNlcnRTdHlsZUVsZW1lbnQgPSBpbnNlcnRTdHlsZUVsZW1lbnQ7XG5cbnZhciB1cGRhdGUgPSBBUEkoY29udGVudCwgb3B0aW9ucyk7XG5cblxuXG5leHBvcnQgKiBmcm9tIFwiISEuLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L2Nqcy5qcyEuL3Jlc2V0LmNzc1wiO1xuICAgICAgIGV4cG9ydCBkZWZhdWx0IGNvbnRlbnQgJiYgY29udGVudC5sb2NhbHMgPyBjb250ZW50LmxvY2FscyA6IHVuZGVmaW5lZDtcbiIsIlxuICAgICAgaW1wb3J0IEFQSSBmcm9tIFwiIS4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luamVjdFN0eWxlc0ludG9TdHlsZVRhZy5qc1wiO1xuICAgICAgaW1wb3J0IGRvbUFQSSBmcm9tIFwiIS4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlRG9tQVBJLmpzXCI7XG4gICAgICBpbXBvcnQgaW5zZXJ0Rm4gZnJvbSBcIiEuLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRCeVNlbGVjdG9yLmpzXCI7XG4gICAgICBpbXBvcnQgc2V0QXR0cmlidXRlcyBmcm9tIFwiIS4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3NldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlcy5qc1wiO1xuICAgICAgaW1wb3J0IGluc2VydFN0eWxlRWxlbWVudCBmcm9tIFwiIS4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydFN0eWxlRWxlbWVudC5qc1wiO1xuICAgICAgaW1wb3J0IHN0eWxlVGFnVHJhbnNmb3JtRm4gZnJvbSBcIiEuLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZVRhZ1RyYW5zZm9ybS5qc1wiO1xuICAgICAgaW1wb3J0IGNvbnRlbnQsICogYXMgbmFtZWRFeHBvcnQgZnJvbSBcIiEhLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanMhLi9zdHlsZS5jc3NcIjtcbiAgICAgIFxuICAgICAgXG5cbnZhciBvcHRpb25zID0ge307XG5cbm9wdGlvbnMuc3R5bGVUYWdUcmFuc2Zvcm0gPSBzdHlsZVRhZ1RyYW5zZm9ybUZuO1xub3B0aW9ucy5zZXRBdHRyaWJ1dGVzID0gc2V0QXR0cmlidXRlcztcblxuICAgICAgb3B0aW9ucy5pbnNlcnQgPSBpbnNlcnRGbi5iaW5kKG51bGwsIFwiaGVhZFwiKTtcbiAgICBcbm9wdGlvbnMuZG9tQVBJID0gZG9tQVBJO1xub3B0aW9ucy5pbnNlcnRTdHlsZUVsZW1lbnQgPSBpbnNlcnRTdHlsZUVsZW1lbnQ7XG5cbnZhciB1cGRhdGUgPSBBUEkoY29udGVudCwgb3B0aW9ucyk7XG5cblxuXG5leHBvcnQgKiBmcm9tIFwiISEuLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L2Nqcy5qcyEuL3N0eWxlLmNzc1wiO1xuICAgICAgIGV4cG9ydCBkZWZhdWx0IGNvbnRlbnQgJiYgY29udGVudC5sb2NhbHMgPyBjb250ZW50LmxvY2FscyA6IHVuZGVmaW5lZDtcbiIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgc3R5bGVzSW5ET00gPSBbXTtcblxuZnVuY3Rpb24gZ2V0SW5kZXhCeUlkZW50aWZpZXIoaWRlbnRpZmllcikge1xuICB2YXIgcmVzdWx0ID0gLTE7XG5cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBzdHlsZXNJbkRPTS5sZW5ndGg7IGkrKykge1xuICAgIGlmIChzdHlsZXNJbkRPTVtpXS5pZGVudGlmaWVyID09PSBpZGVudGlmaWVyKSB7XG4gICAgICByZXN1bHQgPSBpO1xuICAgICAgYnJlYWs7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxuZnVuY3Rpb24gbW9kdWxlc1RvRG9tKGxpc3QsIG9wdGlvbnMpIHtcbiAgdmFyIGlkQ291bnRNYXAgPSB7fTtcbiAgdmFyIGlkZW50aWZpZXJzID0gW107XG5cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBsaXN0Lmxlbmd0aDsgaSsrKSB7XG4gICAgdmFyIGl0ZW0gPSBsaXN0W2ldO1xuICAgIHZhciBpZCA9IG9wdGlvbnMuYmFzZSA/IGl0ZW1bMF0gKyBvcHRpb25zLmJhc2UgOiBpdGVtWzBdO1xuICAgIHZhciBjb3VudCA9IGlkQ291bnRNYXBbaWRdIHx8IDA7XG4gICAgdmFyIGlkZW50aWZpZXIgPSBcIlwiLmNvbmNhdChpZCwgXCIgXCIpLmNvbmNhdChjb3VudCk7XG4gICAgaWRDb3VudE1hcFtpZF0gPSBjb3VudCArIDE7XG4gICAgdmFyIGluZGV4QnlJZGVudGlmaWVyID0gZ2V0SW5kZXhCeUlkZW50aWZpZXIoaWRlbnRpZmllcik7XG4gICAgdmFyIG9iaiA9IHtcbiAgICAgIGNzczogaXRlbVsxXSxcbiAgICAgIG1lZGlhOiBpdGVtWzJdLFxuICAgICAgc291cmNlTWFwOiBpdGVtWzNdLFxuICAgICAgc3VwcG9ydHM6IGl0ZW1bNF0sXG4gICAgICBsYXllcjogaXRlbVs1XVxuICAgIH07XG5cbiAgICBpZiAoaW5kZXhCeUlkZW50aWZpZXIgIT09IC0xKSB7XG4gICAgICBzdHlsZXNJbkRPTVtpbmRleEJ5SWRlbnRpZmllcl0ucmVmZXJlbmNlcysrO1xuICAgICAgc3R5bGVzSW5ET01baW5kZXhCeUlkZW50aWZpZXJdLnVwZGF0ZXIob2JqKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdmFyIHVwZGF0ZXIgPSBhZGRFbGVtZW50U3R5bGUob2JqLCBvcHRpb25zKTtcbiAgICAgIG9wdGlvbnMuYnlJbmRleCA9IGk7XG4gICAgICBzdHlsZXNJbkRPTS5zcGxpY2UoaSwgMCwge1xuICAgICAgICBpZGVudGlmaWVyOiBpZGVudGlmaWVyLFxuICAgICAgICB1cGRhdGVyOiB1cGRhdGVyLFxuICAgICAgICByZWZlcmVuY2VzOiAxXG4gICAgICB9KTtcbiAgICB9XG5cbiAgICBpZGVudGlmaWVycy5wdXNoKGlkZW50aWZpZXIpO1xuICB9XG5cbiAgcmV0dXJuIGlkZW50aWZpZXJzO1xufVxuXG5mdW5jdGlvbiBhZGRFbGVtZW50U3R5bGUob2JqLCBvcHRpb25zKSB7XG4gIHZhciBhcGkgPSBvcHRpb25zLmRvbUFQSShvcHRpb25zKTtcbiAgYXBpLnVwZGF0ZShvYmopO1xuXG4gIHZhciB1cGRhdGVyID0gZnVuY3Rpb24gdXBkYXRlcihuZXdPYmopIHtcbiAgICBpZiAobmV3T2JqKSB7XG4gICAgICBpZiAobmV3T2JqLmNzcyA9PT0gb2JqLmNzcyAmJiBuZXdPYmoubWVkaWEgPT09IG9iai5tZWRpYSAmJiBuZXdPYmouc291cmNlTWFwID09PSBvYmouc291cmNlTWFwICYmIG5ld09iai5zdXBwb3J0cyA9PT0gb2JqLnN1cHBvcnRzICYmIG5ld09iai5sYXllciA9PT0gb2JqLmxheWVyKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgYXBpLnVwZGF0ZShvYmogPSBuZXdPYmopO1xuICAgIH0gZWxzZSB7XG4gICAgICBhcGkucmVtb3ZlKCk7XG4gICAgfVxuICB9O1xuXG4gIHJldHVybiB1cGRhdGVyO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChsaXN0LCBvcHRpb25zKSB7XG4gIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuICBsaXN0ID0gbGlzdCB8fCBbXTtcbiAgdmFyIGxhc3RJZGVudGlmaWVycyA9IG1vZHVsZXNUb0RvbShsaXN0LCBvcHRpb25zKTtcbiAgcmV0dXJuIGZ1bmN0aW9uIHVwZGF0ZShuZXdMaXN0KSB7XG4gICAgbmV3TGlzdCA9IG5ld0xpc3QgfHwgW107XG5cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxhc3RJZGVudGlmaWVycy5sZW5ndGg7IGkrKykge1xuICAgICAgdmFyIGlkZW50aWZpZXIgPSBsYXN0SWRlbnRpZmllcnNbaV07XG4gICAgICB2YXIgaW5kZXggPSBnZXRJbmRleEJ5SWRlbnRpZmllcihpZGVudGlmaWVyKTtcbiAgICAgIHN0eWxlc0luRE9NW2luZGV4XS5yZWZlcmVuY2VzLS07XG4gICAgfVxuXG4gICAgdmFyIG5ld0xhc3RJZGVudGlmaWVycyA9IG1vZHVsZXNUb0RvbShuZXdMaXN0LCBvcHRpb25zKTtcblxuICAgIGZvciAodmFyIF9pID0gMDsgX2kgPCBsYXN0SWRlbnRpZmllcnMubGVuZ3RoOyBfaSsrKSB7XG4gICAgICB2YXIgX2lkZW50aWZpZXIgPSBsYXN0SWRlbnRpZmllcnNbX2ldO1xuXG4gICAgICB2YXIgX2luZGV4ID0gZ2V0SW5kZXhCeUlkZW50aWZpZXIoX2lkZW50aWZpZXIpO1xuXG4gICAgICBpZiAoc3R5bGVzSW5ET01bX2luZGV4XS5yZWZlcmVuY2VzID09PSAwKSB7XG4gICAgICAgIHN0eWxlc0luRE9NW19pbmRleF0udXBkYXRlcigpO1xuXG4gICAgICAgIHN0eWxlc0luRE9NLnNwbGljZShfaW5kZXgsIDEpO1xuICAgICAgfVxuICAgIH1cblxuICAgIGxhc3RJZGVudGlmaWVycyA9IG5ld0xhc3RJZGVudGlmaWVycztcbiAgfTtcbn07IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBtZW1vID0ge307XG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cblxuZnVuY3Rpb24gZ2V0VGFyZ2V0KHRhcmdldCkge1xuICBpZiAodHlwZW9mIG1lbW9bdGFyZ2V0XSA9PT0gXCJ1bmRlZmluZWRcIikge1xuICAgIHZhciBzdHlsZVRhcmdldCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IodGFyZ2V0KTsgLy8gU3BlY2lhbCBjYXNlIHRvIHJldHVybiBoZWFkIG9mIGlmcmFtZSBpbnN0ZWFkIG9mIGlmcmFtZSBpdHNlbGZcblxuICAgIGlmICh3aW5kb3cuSFRNTElGcmFtZUVsZW1lbnQgJiYgc3R5bGVUYXJnZXQgaW5zdGFuY2VvZiB3aW5kb3cuSFRNTElGcmFtZUVsZW1lbnQpIHtcbiAgICAgIHRyeSB7XG4gICAgICAgIC8vIFRoaXMgd2lsbCB0aHJvdyBhbiBleGNlcHRpb24gaWYgYWNjZXNzIHRvIGlmcmFtZSBpcyBibG9ja2VkXG4gICAgICAgIC8vIGR1ZSB0byBjcm9zcy1vcmlnaW4gcmVzdHJpY3Rpb25zXG4gICAgICAgIHN0eWxlVGFyZ2V0ID0gc3R5bGVUYXJnZXQuY29udGVudERvY3VtZW50LmhlYWQ7XG4gICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIC8vIGlzdGFuYnVsIGlnbm9yZSBuZXh0XG4gICAgICAgIHN0eWxlVGFyZ2V0ID0gbnVsbDtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBtZW1vW3RhcmdldF0gPSBzdHlsZVRhcmdldDtcbiAgfVxuXG4gIHJldHVybiBtZW1vW3RhcmdldF07XG59XG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cblxuXG5mdW5jdGlvbiBpbnNlcnRCeVNlbGVjdG9yKGluc2VydCwgc3R5bGUpIHtcbiAgdmFyIHRhcmdldCA9IGdldFRhcmdldChpbnNlcnQpO1xuXG4gIGlmICghdGFyZ2V0KSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKFwiQ291bGRuJ3QgZmluZCBhIHN0eWxlIHRhcmdldC4gVGhpcyBwcm9iYWJseSBtZWFucyB0aGF0IHRoZSB2YWx1ZSBmb3IgdGhlICdpbnNlcnQnIHBhcmFtZXRlciBpcyBpbnZhbGlkLlwiKTtcbiAgfVxuXG4gIHRhcmdldC5hcHBlbmRDaGlsZChzdHlsZSk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gaW5zZXJ0QnlTZWxlY3RvcjsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBpbnNlcnRTdHlsZUVsZW1lbnQob3B0aW9ucykge1xuICB2YXIgZWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzdHlsZVwiKTtcbiAgb3B0aW9ucy5zZXRBdHRyaWJ1dGVzKGVsZW1lbnQsIG9wdGlvbnMuYXR0cmlidXRlcyk7XG4gIG9wdGlvbnMuaW5zZXJ0KGVsZW1lbnQsIG9wdGlvbnMub3B0aW9ucyk7XG4gIHJldHVybiBlbGVtZW50O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGluc2VydFN0eWxlRWxlbWVudDsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBzZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXMoc3R5bGVFbGVtZW50KSB7XG4gIHZhciBub25jZSA9IHR5cGVvZiBfX3dlYnBhY2tfbm9uY2VfXyAhPT0gXCJ1bmRlZmluZWRcIiA/IF9fd2VicGFja19ub25jZV9fIDogbnVsbDtcblxuICBpZiAobm9uY2UpIHtcbiAgICBzdHlsZUVsZW1lbnQuc2V0QXR0cmlidXRlKFwibm9uY2VcIiwgbm9uY2UpO1xuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzOyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIGFwcGx5KHN0eWxlRWxlbWVudCwgb3B0aW9ucywgb2JqKSB7XG4gIHZhciBjc3MgPSBcIlwiO1xuXG4gIGlmIChvYmouc3VwcG9ydHMpIHtcbiAgICBjc3MgKz0gXCJAc3VwcG9ydHMgKFwiLmNvbmNhdChvYmouc3VwcG9ydHMsIFwiKSB7XCIpO1xuICB9XG5cbiAgaWYgKG9iai5tZWRpYSkge1xuICAgIGNzcyArPSBcIkBtZWRpYSBcIi5jb25jYXQob2JqLm1lZGlhLCBcIiB7XCIpO1xuICB9XG5cbiAgdmFyIG5lZWRMYXllciA9IHR5cGVvZiBvYmoubGF5ZXIgIT09IFwidW5kZWZpbmVkXCI7XG5cbiAgaWYgKG5lZWRMYXllcikge1xuICAgIGNzcyArPSBcIkBsYXllclwiLmNvbmNhdChvYmoubGF5ZXIubGVuZ3RoID4gMCA/IFwiIFwiLmNvbmNhdChvYmoubGF5ZXIpIDogXCJcIiwgXCIge1wiKTtcbiAgfVxuXG4gIGNzcyArPSBvYmouY3NzO1xuXG4gIGlmIChuZWVkTGF5ZXIpIHtcbiAgICBjc3MgKz0gXCJ9XCI7XG4gIH1cblxuICBpZiAob2JqLm1lZGlhKSB7XG4gICAgY3NzICs9IFwifVwiO1xuICB9XG5cbiAgaWYgKG9iai5zdXBwb3J0cykge1xuICAgIGNzcyArPSBcIn1cIjtcbiAgfVxuXG4gIHZhciBzb3VyY2VNYXAgPSBvYmouc291cmNlTWFwO1xuXG4gIGlmIChzb3VyY2VNYXAgJiYgdHlwZW9mIGJ0b2EgIT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICBjc3MgKz0gXCJcXG4vKiMgc291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247YmFzZTY0LFwiLmNvbmNhdChidG9hKHVuZXNjYXBlKGVuY29kZVVSSUNvbXBvbmVudChKU09OLnN0cmluZ2lmeShzb3VyY2VNYXApKSkpLCBcIiAqL1wiKTtcbiAgfSAvLyBGb3Igb2xkIElFXG5cbiAgLyogaXN0YW5idWwgaWdub3JlIGlmICAqL1xuXG5cbiAgb3B0aW9ucy5zdHlsZVRhZ1RyYW5zZm9ybShjc3MsIHN0eWxlRWxlbWVudCwgb3B0aW9ucy5vcHRpb25zKTtcbn1cblxuZnVuY3Rpb24gcmVtb3ZlU3R5bGVFbGVtZW50KHN0eWxlRWxlbWVudCkge1xuICAvLyBpc3RhbmJ1bCBpZ25vcmUgaWZcbiAgaWYgKHN0eWxlRWxlbWVudC5wYXJlbnROb2RlID09PSBudWxsKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgc3R5bGVFbGVtZW50LnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoc3R5bGVFbGVtZW50KTtcbn1cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuXG5cbmZ1bmN0aW9uIGRvbUFQSShvcHRpb25zKSB7XG4gIHZhciBzdHlsZUVsZW1lbnQgPSBvcHRpb25zLmluc2VydFN0eWxlRWxlbWVudChvcHRpb25zKTtcbiAgcmV0dXJuIHtcbiAgICB1cGRhdGU6IGZ1bmN0aW9uIHVwZGF0ZShvYmopIHtcbiAgICAgIGFwcGx5KHN0eWxlRWxlbWVudCwgb3B0aW9ucywgb2JqKTtcbiAgICB9LFxuICAgIHJlbW92ZTogZnVuY3Rpb24gcmVtb3ZlKCkge1xuICAgICAgcmVtb3ZlU3R5bGVFbGVtZW50KHN0eWxlRWxlbWVudCk7XG4gICAgfVxuICB9O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGRvbUFQSTsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBzdHlsZVRhZ1RyYW5zZm9ybShjc3MsIHN0eWxlRWxlbWVudCkge1xuICBpZiAoc3R5bGVFbGVtZW50LnN0eWxlU2hlZXQpIHtcbiAgICBzdHlsZUVsZW1lbnQuc3R5bGVTaGVldC5jc3NUZXh0ID0gY3NzO1xuICB9IGVsc2Uge1xuICAgIHdoaWxlIChzdHlsZUVsZW1lbnQuZmlyc3RDaGlsZCkge1xuICAgICAgc3R5bGVFbGVtZW50LnJlbW92ZUNoaWxkKHN0eWxlRWxlbWVudC5maXJzdENoaWxkKTtcbiAgICB9XG5cbiAgICBzdHlsZUVsZW1lbnQuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoY3NzKSk7XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBzdHlsZVRhZ1RyYW5zZm9ybTsiLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdGlkOiBtb2R1bGVJZCxcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuLy8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbl9fd2VicGFja19yZXF1aXJlX18ubSA9IF9fd2VicGFja19tb2R1bGVzX187XG5cbiIsIi8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSAobW9kdWxlKSA9PiB7XG5cdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuXHRcdCgpID0+IChtb2R1bGVbJ2RlZmF1bHQnXSkgOlxuXHRcdCgpID0+IChtb2R1bGUpO1xuXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCB7IGE6IGdldHRlciB9KTtcblx0cmV0dXJuIGdldHRlcjtcbn07IiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5nID0gKGZ1bmN0aW9uKCkge1xuXHRpZiAodHlwZW9mIGdsb2JhbFRoaXMgPT09ICdvYmplY3QnKSByZXR1cm4gZ2xvYmFsVGhpcztcblx0dHJ5IHtcblx0XHRyZXR1cm4gdGhpcyB8fCBuZXcgRnVuY3Rpb24oJ3JldHVybiB0aGlzJykoKTtcblx0fSBjYXRjaCAoZSkge1xuXHRcdGlmICh0eXBlb2Ygd2luZG93ID09PSAnb2JqZWN0JykgcmV0dXJuIHdpbmRvdztcblx0fVxufSkoKTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwidmFyIHNjcmlwdFVybDtcbmlmIChfX3dlYnBhY2tfcmVxdWlyZV9fLmcuaW1wb3J0U2NyaXB0cykgc2NyaXB0VXJsID0gX193ZWJwYWNrX3JlcXVpcmVfXy5nLmxvY2F0aW9uICsgXCJcIjtcbnZhciBkb2N1bWVudCA9IF9fd2VicGFja19yZXF1aXJlX18uZy5kb2N1bWVudDtcbmlmICghc2NyaXB0VXJsICYmIGRvY3VtZW50KSB7XG5cdGlmIChkb2N1bWVudC5jdXJyZW50U2NyaXB0KVxuXHRcdHNjcmlwdFVybCA9IGRvY3VtZW50LmN1cnJlbnRTY3JpcHQuc3JjXG5cdGlmICghc2NyaXB0VXJsKSB7XG5cdFx0dmFyIHNjcmlwdHMgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZShcInNjcmlwdFwiKTtcblx0XHRpZihzY3JpcHRzLmxlbmd0aCkgc2NyaXB0VXJsID0gc2NyaXB0c1tzY3JpcHRzLmxlbmd0aCAtIDFdLnNyY1xuXHR9XG59XG4vLyBXaGVuIHN1cHBvcnRpbmcgYnJvd3NlcnMgd2hlcmUgYW4gYXV0b21hdGljIHB1YmxpY1BhdGggaXMgbm90IHN1cHBvcnRlZCB5b3UgbXVzdCBzcGVjaWZ5IGFuIG91dHB1dC5wdWJsaWNQYXRoIG1hbnVhbGx5IHZpYSBjb25maWd1cmF0aW9uXG4vLyBvciBwYXNzIGFuIGVtcHR5IHN0cmluZyAoXCJcIikgYW5kIHNldCB0aGUgX193ZWJwYWNrX3B1YmxpY19wYXRoX18gdmFyaWFibGUgZnJvbSB5b3VyIGNvZGUgdG8gdXNlIHlvdXIgb3duIGxvZ2ljLlxuaWYgKCFzY3JpcHRVcmwpIHRocm93IG5ldyBFcnJvcihcIkF1dG9tYXRpYyBwdWJsaWNQYXRoIGlzIG5vdCBzdXBwb3J0ZWQgaW4gdGhpcyBicm93c2VyXCIpO1xuc2NyaXB0VXJsID0gc2NyaXB0VXJsLnJlcGxhY2UoLyMuKiQvLCBcIlwiKS5yZXBsYWNlKC9cXD8uKiQvLCBcIlwiKS5yZXBsYWNlKC9cXC9bXlxcL10rJC8sIFwiL1wiKTtcbl9fd2VicGFja19yZXF1aXJlX18ucCA9IHNjcmlwdFVybDsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLmIgPSBkb2N1bWVudC5iYXNlVVJJIHx8IHNlbGYubG9jYXRpb24uaHJlZjtcblxuLy8gb2JqZWN0IHRvIHN0b3JlIGxvYWRlZCBhbmQgbG9hZGluZyBjaHVua3Ncbi8vIHVuZGVmaW5lZCA9IGNodW5rIG5vdCBsb2FkZWQsIG51bGwgPSBjaHVuayBwcmVsb2FkZWQvcHJlZmV0Y2hlZFxuLy8gW3Jlc29sdmUsIHJlamVjdCwgUHJvbWlzZV0gPSBjaHVuayBsb2FkaW5nLCAwID0gY2h1bmsgbG9hZGVkXG52YXIgaW5zdGFsbGVkQ2h1bmtzID0ge1xuXHRcImluZGV4XCI6IDBcbn07XG5cbi8vIG5vIGNodW5rIG9uIGRlbWFuZCBsb2FkaW5nXG5cbi8vIG5vIHByZWZldGNoaW5nXG5cbi8vIG5vIHByZWxvYWRlZFxuXG4vLyBubyBITVJcblxuLy8gbm8gSE1SIG1hbmlmZXN0XG5cbi8vIG5vIG9uIGNodW5rcyBsb2FkZWRcblxuLy8gbm8ganNvbnAgZnVuY3Rpb24iLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm5jID0gdW5kZWZpbmVkOyIsIi8qIGVzbGludC1kaXNhYmxlIGxpbmVicmVhay1zdHlsZSAqL1xyXG4vKiBlc2xpbnQtZGlzYWJsZSBuby11bmRlZiAqL1xyXG5cclxuaW1wb3J0ICcuLi9hc3NldHMvc3R5bGVzL3Jlc2V0LmNzcyc7XHJcbmltcG9ydCAnLi4vYXNzZXRzL3N0eWxlcy9ub3JtYWxpemUuY3NzJztcclxuaW1wb3J0ICcuLi9hc3NldHMvc3R5bGVzL3N0eWxlLmNzcyc7XHJcblxyXG5pbXBvcnQgZGF0YUFycmF5cyBmcm9tICcuLi9hc3NldHMvanMvY2FyZHMnO1xyXG5pbXBvcnQgQXBwQ29udHJvbCBmcm9tICcuLi9hc3NldHMvanMvYXBwQ29udHJvbCc7XHJcbmltcG9ydCBjbGlja1VzZXJJbnRlcmFjdGl2ZSBmcm9tICcuLi9hc3NldHMvanMvY2xpY2tVc2VySW50ZXJhY3RpdmUnO1xyXG5pbXBvcnQgbWFpbkNhcmRzIGZyb20gJy4uL2Fzc2V0cy9qcy9tYWluQ2FyZHMnO1xyXG5cclxuY29uc3QgW3RvcGljcywgY2FyZHNdID0gW2RhdGFBcnJheXNbMF0sIGRhdGFBcnJheXMuc2xpY2UoMSldO1xyXG5cclxuY29uc3QgYXBwQ29udHJvbCA9IG5ldyBBcHBDb250cm9sKHRvcGljcywgY2FyZHMsIG1haW5DYXJkcyk7XHJcblxyXG5kb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdib2R5JykuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZXZlbnQpID0+IGNsaWNrVXNlckludGVyYWN0aXZlKGV2ZW50LCBhcHBDb250cm9sKSk7XHJcbiJdLCJuYW1lcyI6WyJkYXRhQXJyYXlzIiwiQXBwQ29udHJvbCIsImNsaWNrVXNlckludGVyYWN0aXZlIiwibWFpbkNhcmRzIiwic2xpY2UiLCJ0b3BpY3MiLCJjYXJkcyIsImFwcENvbnRyb2wiLCJkb2N1bWVudCIsInF1ZXJ5U2VsZWN0b3IiLCJhZGRFdmVudExpc3RlbmVyIiwiZXZlbnQiXSwic291cmNlUm9vdCI6IiJ9