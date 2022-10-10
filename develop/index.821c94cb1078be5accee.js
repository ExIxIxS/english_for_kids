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
  }

  playCardSound(cardObj) {
    console.log(`Play "${cardObj.audioSrc}"`);
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
      }
      break;

    //  clicking on switch button
    case (targetClassList.includes('switch-trigger')): {
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
      }
      break;
    }
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
/* harmony export */   "default": () => (/* binding */ ContentContainer)
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
    this.validTypes = ['main page', 'topic', 'statistic'];
    this.validCardClasses = ['card', 'card-content', 'card-text', 'card-graphic', 'card-image'];
    this.type = this.getValidType(type);
    this.cardsCollection = null;
    this.element = null;

    this.build();
  }

  build() {
    const contentWrapper = (0,_commonFunct__WEBPACK_IMPORTED_MODULE_1__.createCustomElement)('div', 'content-wrapper');
    let contentElement;

    switch (this.type) {
      case 'statistic':
        break;
      case 'main page':
        contentElement = (0,_commonFunct__WEBPACK_IMPORTED_MODULE_1__.createCustomElement)('div', 'card-container');
        this.topicsArr.forEach((topic, index) => {
          const cardObj = {
            cardName: topic,
            image: this.cardsArr[index][0].image,
          };
          contentElement.append(new _card__WEBPACK_IMPORTED_MODULE_0__["default"](this.appControl, cardObj).element);
        });
        break;
      case 'topic': {
        contentElement = (0,_commonFunct__WEBPACK_IMPORTED_MODULE_1__.createCustomElement)('div', 'card-container');
        const cardIndex = this.topicsArr.findIndex((item) => {
          const result = item.toLowerCase() === this.appControl.activePage;
          return result;
        });
        this.cardsArr[cardIndex].forEach((cardObj) => {
          contentElement.append(new _card__WEBPACK_IMPORTED_MODULE_0__["default"](this.appControl, cardObj, this.type).element);
        });

        break;
      }
      default:
        break;
    }

    contentWrapper.append(contentElement);
    this.element = contentWrapper;

    return this;
  }

  addToDoc() {
    document.querySelector('main').append(this.element);
    [this.element] = document.getElementsByClassName('content-wrapper');
    this.cardsCollection = document.getElementsByClassName('card');
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
    console.log('<<< game started !!! >>>');
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

    if (this.correctAnswers === this.appControl.content.cardsCollection.length
        && this.correctAnswers !== 0) {
      console.log(`<<< Game Over = ${this.correctAnswers}/${this.wrongAnswers} >>>`);
      this.correctAnswers = 0;
      this.appControl.content.playFinalClip(this.wrongAnswers);
      this.wrongAnswers = 0;

      setTimeout(() => {
        this.appControl.changePage('Main page');
      }, 3000);
    }

    this.liveCorrectPrElement.innerHTML = '0';
    this.liveWrongPrElement.innerHTML = '0';
    this.liveIndicatorElement.innerHTML = '';
    console.log('<<< End game >>>');
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
      this.correctAnswer();
      cardElement.classList.add('disabled');
    } else {
      this.wrongAnswer();
    }

    return this;
  }

  correctAnswer() {
    this.appControl.playAppSound('correct');
    this.correctAnswers += 1;
    this.liveCorrectPrElement.innerHTML = this.correctAnswers;
    this.liveIndicatorElement.append(new _star__WEBPACK_IMPORTED_MODULE_0__["default"]().element);
    setTimeout(() => {
      this.askQuestion();
    }, 1000);

    return this;
  }

  wrongAnswer() {
    this.appControl.playAppSound('wrong');
    this.wrongAnswers += 1;
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
___CSS_LOADER_EXPORT___.push([module.id, "/* border-box model for all elements */\r\n\r\nhtml {\r\n    box-sizing: border-box;\r\n}\r\n\r\n*, *::before, *::after {\r\n    box-sizing: inherit;\r\n}\r\n\r\n/* --- Page color styling --- */\r\n\r\n:root {\r\n    --color-bg-main-1: #66b3fc;\r\n    --color-bg-main-2: #dbf5f8;\r\n    --color-bg-main-3: #d2f848;\r\n    --color-bg-main-4: #f0c2cd63;\r\n    --color-font-1: #d9aa63;\r\n}\r\n\r\n/* ---------------------------------- */\r\n\r\nbody {\r\n    width: 100%;\r\n    display: flex;\r\n    flex-direction: column;\r\n    align-items: center;\r\n    background-color: var(--color-bg-main-1);\r\n}\r\n\r\nbody.opened-menu {\r\n    overflow-y: hidden;\r\n}\r\n\r\n.inactive {\r\n    visibility: hidden;\r\n    position: fixed;\r\n    top: 0;\r\n}\r\n\r\n.graphic, img {\r\n    width: 100%;\r\n    height: auto;\r\n    padding: 0;\r\n    margin: 0;\r\n}\r\n\r\n.container-centered {\r\n    max-width: 1440px;\r\n    min-width: 1440px;\r\n    margin: 0 auto;\r\n    background-color: var(--color-bg-main-2);\r\n}\r\n\r\nheader {\r\n    display: flex;\r\n    flex-direction: column;\r\n    justify-content: center;\r\n    align-items: center;\r\n    position: -webkit-sticky;\r\n    position: sticky;\r\n    top: 0;\r\n    z-index: 8;\r\n}\r\n\r\n.main-controls, .game-controls {\r\n    width: 100%;\r\n    min-height: 100px;\r\n    display: flex;\r\n    justify-content: space-between;\r\n    align-items: center;\r\n}\r\n\r\nh1 {\r\n    text-align: center;\r\n}\r\n\r\n.button:hover {\r\n    cursor: pointer;\r\n}\r\n\r\n.menu-button {\r\n    height: 20px;\r\n    z-index: 10;\r\n}\r\n\r\n.switch {\r\n    width: 110px;\r\n    background-color: whitesmoke;\r\n    display: flex;\r\n    justify-content: space-between;\r\n    border-radius: 60px;\r\n    position: relative;\r\n}\r\n\r\n.switch-rail {\r\n    position: absolute;\r\n    left: 0;\r\n    width: 100%;\r\n    height: 100%;\r\n    border-radius: inherit;\r\n    display: flex;\r\n    justify-content: flex-start;\r\n}\r\n\r\n.switch.switch-on .switch-rail {\r\n    justify-content: flex-end;\r\n}\r\n\r\n.switch-roller {\r\n    width: 55px;\r\n    border-radius: inherit;\r\n    background-color: rgba(214, 225, 65, 0.459);\r\n    z-index: 10;\r\n}\r\n\r\n.switch-trigger {\r\n    margin: 0 10px;\r\n    height: 40px;\r\n    z-index: 9;\r\n    padding: 10px 0;\r\n    text-align: center;\r\n}\r\n\r\n.game-button {\r\n    width: 100px;\r\n    height: 100px;\r\n    background-color: rgb(213, 178, 248);\r\n}\r\n\r\n.game-button.repeat-button {\r\n    background-color: rgb(248, 178, 112);\r\n}\r\n\r\n.game-progress {\r\n    width: 220px;\r\n    display: flex;\r\n    justify-content: space-around;\r\n    align-items: center;\r\n}\r\n\r\n.game-indicator {\r\n    width: 150px;\r\n    height: 40px;\r\n    background-color: red;\r\n    border-radius: 18px;\r\n    display: flex;\r\n    justify-content: flex-start;\r\n    align-items: center;\r\n}\r\n\r\n.star {\r\n    width: 30px;\r\n}\r\n\r\n.game-score {\r\n    text-align: center;\r\n}\r\n\r\n.game-score .correct {\r\n    color: green;\r\n}\r\n\r\n.game-score .wrong {\r\n    color: red;\r\n}\r\n\r\n\r\nnav {\r\n    position: fixed;\r\n    top: 0;\r\n    left: -320px;\r\n    width: 320px;\r\n    height: 100%;\r\n    display: flex;\r\n    flex-direction: column;\r\n    justify-content: center;\r\n    background-color: var(--color-bg-main-3);\r\n    z-index: 9;\r\n    visibility: hidden;\r\n}\r\n\r\nnav.opened-menu {\r\n    visibility: visible;\r\n    left: 0;\r\n}\r\n\r\n.menu-list li {\r\n    text-align: center;\r\n    margin: 15px 0;\r\n    font-size: 2em;\r\n    background-color: var(--color-bg-main-1);\r\n}\r\n\r\n.menu-list li.active-page {\r\n    background-color: var(--color-bg-main-4);\r\n}\r\n\r\nmain.container-centered {\r\n    background-color: var(--color-bg-main-4);\r\n}\r\n\r\n.card-container {\r\n    display: flex;\r\n    justify-content: space-around;\r\n    align-items: center;\r\n    flex-wrap: wrap;\r\n}\r\n\r\n.card {\r\n    width: 280px;\r\n    height: 320px;\r\n    margin: 15px;\r\n    position: relative;\r\n}\r\n\r\n.card.disabled {\r\n    background-color: #d2f848;\r\n}\r\n\r\n.card-content {\r\n    width: 100%;\r\n    height: 100%;\r\n    background-color: royalblue;\r\n    position: relative;\r\n}\r\n\r\n.card-content, .card img {\r\n    border-radius: 25px;\r\n}\r\n\r\n.card p {\r\n    font-size: 2em;\r\n    text-align: center;\r\n}\r\n\r\n.card-flip-button {\r\n    width: 50px;\r\n    height: 50px;\r\n    position: absolute;\r\n    bottom: 20px;\r\n    right: 20px;\r\n}\r\n\r\n.card-flip-button span {\r\n    font-size: 50px;\r\n}\r\n\r\n.flipped .card-content {\r\n    animation-name: flip-card;\r\n    animation-duration: 1s;\r\n}\r\n\r\n.unflipped .card-content {\r\n    animation-name: unflip-card;\r\n    animation-duration: 1s;\r\n}\r\n\r\n.final-clip {\r\n    display: flex;\r\n    flex-direction: column;\r\n    width: 320px;\r\n    margin: auto;\r\n    justify-content: center;\r\n    align-items: center;\r\n    padding: 50px 0;\r\n}\r\n\r\n.final-clip p {\r\n    color: red;\r\n    font-size: 36px;\r\n    margin-top: 30px;\r\n}\r\n\r\n@keyframes flip-card {\r\n    0% {}\r\n    50% {transform: rotateY(89deg)}\r\n}\r\n\r\n@keyframes unflip-card {\r\n    0% {}\r\n    50% {transform: rotateY(89deg)}\r\n}\r\n\r\n/* --- RESPONSIVE LAYOUTS --- */\r\n\r\n@media (max-width: 1439px) {\r\n    .container-centered {\r\n        min-width: calc(1440vw*100/1440);\r\n    }\r\n\r\n}", "",{"version":3,"sources":["webpack://./assets/styles/style.css"],"names":[],"mappings":"AAAA,sCAAsC;;AAEtC;IACI,sBAAsB;AAC1B;;AAEA;IACI,mBAAmB;AACvB;;AAEA,+BAA+B;;AAE/B;IACI,0BAA0B;IAC1B,0BAA0B;IAC1B,0BAA0B;IAC1B,4BAA4B;IAC5B,uBAAuB;AAC3B;;AAEA,uCAAuC;;AAEvC;IACI,WAAW;IACX,aAAa;IACb,sBAAsB;IACtB,mBAAmB;IACnB,wCAAwC;AAC5C;;AAEA;IACI,kBAAkB;AACtB;;AAEA;IACI,kBAAkB;IAClB,eAAe;IACf,MAAM;AACV;;AAEA;IACI,WAAW;IACX,YAAY;IACZ,UAAU;IACV,SAAS;AACb;;AAEA;IACI,iBAAiB;IACjB,iBAAiB;IACjB,cAAc;IACd,wCAAwC;AAC5C;;AAEA;IACI,aAAa;IACb,sBAAsB;IACtB,uBAAuB;IACvB,mBAAmB;IACnB,wBAAwB;IACxB,gBAAgB;IAChB,MAAM;IACN,UAAU;AACd;;AAEA;IACI,WAAW;IACX,iBAAiB;IACjB,aAAa;IACb,8BAA8B;IAC9B,mBAAmB;AACvB;;AAEA;IACI,kBAAkB;AACtB;;AAEA;IACI,eAAe;AACnB;;AAEA;IACI,YAAY;IACZ,WAAW;AACf;;AAEA;IACI,YAAY;IACZ,4BAA4B;IAC5B,aAAa;IACb,8BAA8B;IAC9B,mBAAmB;IACnB,kBAAkB;AACtB;;AAEA;IACI,kBAAkB;IAClB,OAAO;IACP,WAAW;IACX,YAAY;IACZ,sBAAsB;IACtB,aAAa;IACb,2BAA2B;AAC/B;;AAEA;IACI,yBAAyB;AAC7B;;AAEA;IACI,WAAW;IACX,sBAAsB;IACtB,2CAA2C;IAC3C,WAAW;AACf;;AAEA;IACI,cAAc;IACd,YAAY;IACZ,UAAU;IACV,eAAe;IACf,kBAAkB;AACtB;;AAEA;IACI,YAAY;IACZ,aAAa;IACb,oCAAoC;AACxC;;AAEA;IACI,oCAAoC;AACxC;;AAEA;IACI,YAAY;IACZ,aAAa;IACb,6BAA6B;IAC7B,mBAAmB;AACvB;;AAEA;IACI,YAAY;IACZ,YAAY;IACZ,qBAAqB;IACrB,mBAAmB;IACnB,aAAa;IACb,2BAA2B;IAC3B,mBAAmB;AACvB;;AAEA;IACI,WAAW;AACf;;AAEA;IACI,kBAAkB;AACtB;;AAEA;IACI,YAAY;AAChB;;AAEA;IACI,UAAU;AACd;;;AAGA;IACI,eAAe;IACf,MAAM;IACN,YAAY;IACZ,YAAY;IACZ,YAAY;IACZ,aAAa;IACb,sBAAsB;IACtB,uBAAuB;IACvB,wCAAwC;IACxC,UAAU;IACV,kBAAkB;AACtB;;AAEA;IACI,mBAAmB;IACnB,OAAO;AACX;;AAEA;IACI,kBAAkB;IAClB,cAAc;IACd,cAAc;IACd,wCAAwC;AAC5C;;AAEA;IACI,wCAAwC;AAC5C;;AAEA;IACI,wCAAwC;AAC5C;;AAEA;IACI,aAAa;IACb,6BAA6B;IAC7B,mBAAmB;IACnB,eAAe;AACnB;;AAEA;IACI,YAAY;IACZ,aAAa;IACb,YAAY;IACZ,kBAAkB;AACtB;;AAEA;IACI,yBAAyB;AAC7B;;AAEA;IACI,WAAW;IACX,YAAY;IACZ,2BAA2B;IAC3B,kBAAkB;AACtB;;AAEA;IACI,mBAAmB;AACvB;;AAEA;IACI,cAAc;IACd,kBAAkB;AACtB;;AAEA;IACI,WAAW;IACX,YAAY;IACZ,kBAAkB;IAClB,YAAY;IACZ,WAAW;AACf;;AAEA;IACI,eAAe;AACnB;;AAEA;IACI,yBAAyB;IACzB,sBAAsB;AAC1B;;AAEA;IACI,2BAA2B;IAC3B,sBAAsB;AAC1B;;AAEA;IACI,aAAa;IACb,sBAAsB;IACtB,YAAY;IACZ,YAAY;IACZ,uBAAuB;IACvB,mBAAmB;IACnB,eAAe;AACnB;;AAEA;IACI,UAAU;IACV,eAAe;IACf,gBAAgB;AACpB;;AAEA;IACI,IAAI;IACJ,KAAK,yBAAyB;AAClC;;AAEA;IACI,IAAI;IACJ,KAAK,yBAAyB;AAClC;;AAEA,+BAA+B;;AAE/B;IACI;QACI,gCAAgC;IACpC;;AAEJ","sourcesContent":["/* border-box model for all elements */\r\n\r\nhtml {\r\n    box-sizing: border-box;\r\n}\r\n\r\n*, *::before, *::after {\r\n    box-sizing: inherit;\r\n}\r\n\r\n/* --- Page color styling --- */\r\n\r\n:root {\r\n    --color-bg-main-1: #66b3fc;\r\n    --color-bg-main-2: #dbf5f8;\r\n    --color-bg-main-3: #d2f848;\r\n    --color-bg-main-4: #f0c2cd63;\r\n    --color-font-1: #d9aa63;\r\n}\r\n\r\n/* ---------------------------------- */\r\n\r\nbody {\r\n    width: 100%;\r\n    display: flex;\r\n    flex-direction: column;\r\n    align-items: center;\r\n    background-color: var(--color-bg-main-1);\r\n}\r\n\r\nbody.opened-menu {\r\n    overflow-y: hidden;\r\n}\r\n\r\n.inactive {\r\n    visibility: hidden;\r\n    position: fixed;\r\n    top: 0;\r\n}\r\n\r\n.graphic, img {\r\n    width: 100%;\r\n    height: auto;\r\n    padding: 0;\r\n    margin: 0;\r\n}\r\n\r\n.container-centered {\r\n    max-width: 1440px;\r\n    min-width: 1440px;\r\n    margin: 0 auto;\r\n    background-color: var(--color-bg-main-2);\r\n}\r\n\r\nheader {\r\n    display: flex;\r\n    flex-direction: column;\r\n    justify-content: center;\r\n    align-items: center;\r\n    position: -webkit-sticky;\r\n    position: sticky;\r\n    top: 0;\r\n    z-index: 8;\r\n}\r\n\r\n.main-controls, .game-controls {\r\n    width: 100%;\r\n    min-height: 100px;\r\n    display: flex;\r\n    justify-content: space-between;\r\n    align-items: center;\r\n}\r\n\r\nh1 {\r\n    text-align: center;\r\n}\r\n\r\n.button:hover {\r\n    cursor: pointer;\r\n}\r\n\r\n.menu-button {\r\n    height: 20px;\r\n    z-index: 10;\r\n}\r\n\r\n.switch {\r\n    width: 110px;\r\n    background-color: whitesmoke;\r\n    display: flex;\r\n    justify-content: space-between;\r\n    border-radius: 60px;\r\n    position: relative;\r\n}\r\n\r\n.switch-rail {\r\n    position: absolute;\r\n    left: 0;\r\n    width: 100%;\r\n    height: 100%;\r\n    border-radius: inherit;\r\n    display: flex;\r\n    justify-content: flex-start;\r\n}\r\n\r\n.switch.switch-on .switch-rail {\r\n    justify-content: flex-end;\r\n}\r\n\r\n.switch-roller {\r\n    width: 55px;\r\n    border-radius: inherit;\r\n    background-color: rgba(214, 225, 65, 0.459);\r\n    z-index: 10;\r\n}\r\n\r\n.switch-trigger {\r\n    margin: 0 10px;\r\n    height: 40px;\r\n    z-index: 9;\r\n    padding: 10px 0;\r\n    text-align: center;\r\n}\r\n\r\n.game-button {\r\n    width: 100px;\r\n    height: 100px;\r\n    background-color: rgb(213, 178, 248);\r\n}\r\n\r\n.game-button.repeat-button {\r\n    background-color: rgb(248, 178, 112);\r\n}\r\n\r\n.game-progress {\r\n    width: 220px;\r\n    display: flex;\r\n    justify-content: space-around;\r\n    align-items: center;\r\n}\r\n\r\n.game-indicator {\r\n    width: 150px;\r\n    height: 40px;\r\n    background-color: red;\r\n    border-radius: 18px;\r\n    display: flex;\r\n    justify-content: flex-start;\r\n    align-items: center;\r\n}\r\n\r\n.star {\r\n    width: 30px;\r\n}\r\n\r\n.game-score {\r\n    text-align: center;\r\n}\r\n\r\n.game-score .correct {\r\n    color: green;\r\n}\r\n\r\n.game-score .wrong {\r\n    color: red;\r\n}\r\n\r\n\r\nnav {\r\n    position: fixed;\r\n    top: 0;\r\n    left: -320px;\r\n    width: 320px;\r\n    height: 100%;\r\n    display: flex;\r\n    flex-direction: column;\r\n    justify-content: center;\r\n    background-color: var(--color-bg-main-3);\r\n    z-index: 9;\r\n    visibility: hidden;\r\n}\r\n\r\nnav.opened-menu {\r\n    visibility: visible;\r\n    left: 0;\r\n}\r\n\r\n.menu-list li {\r\n    text-align: center;\r\n    margin: 15px 0;\r\n    font-size: 2em;\r\n    background-color: var(--color-bg-main-1);\r\n}\r\n\r\n.menu-list li.active-page {\r\n    background-color: var(--color-bg-main-4);\r\n}\r\n\r\nmain.container-centered {\r\n    background-color: var(--color-bg-main-4);\r\n}\r\n\r\n.card-container {\r\n    display: flex;\r\n    justify-content: space-around;\r\n    align-items: center;\r\n    flex-wrap: wrap;\r\n}\r\n\r\n.card {\r\n    width: 280px;\r\n    height: 320px;\r\n    margin: 15px;\r\n    position: relative;\r\n}\r\n\r\n.card.disabled {\r\n    background-color: #d2f848;\r\n}\r\n\r\n.card-content {\r\n    width: 100%;\r\n    height: 100%;\r\n    background-color: royalblue;\r\n    position: relative;\r\n}\r\n\r\n.card-content, .card img {\r\n    border-radius: 25px;\r\n}\r\n\r\n.card p {\r\n    font-size: 2em;\r\n    text-align: center;\r\n}\r\n\r\n.card-flip-button {\r\n    width: 50px;\r\n    height: 50px;\r\n    position: absolute;\r\n    bottom: 20px;\r\n    right: 20px;\r\n}\r\n\r\n.card-flip-button span {\r\n    font-size: 50px;\r\n}\r\n\r\n.flipped .card-content {\r\n    animation-name: flip-card;\r\n    animation-duration: 1s;\r\n}\r\n\r\n.unflipped .card-content {\r\n    animation-name: unflip-card;\r\n    animation-duration: 1s;\r\n}\r\n\r\n.final-clip {\r\n    display: flex;\r\n    flex-direction: column;\r\n    width: 320px;\r\n    margin: auto;\r\n    justify-content: center;\r\n    align-items: center;\r\n    padding: 50px 0;\r\n}\r\n\r\n.final-clip p {\r\n    color: red;\r\n    font-size: 36px;\r\n    margin-top: 30px;\r\n}\r\n\r\n@keyframes flip-card {\r\n    0% {}\r\n    50% {transform: rotateY(89deg)}\r\n}\r\n\r\n@keyframes unflip-card {\r\n    0% {}\r\n    50% {transform: rotateY(89deg)}\r\n}\r\n\r\n/* --- RESPONSIVE LAYOUTS --- */\r\n\r\n@media (max-width: 1439px) {\r\n    .container-centered {\r\n        min-width: calc(1440vw*100/1440);\r\n    }\r\n\r\n}"],"sourceRoot":""}]);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguODIxYzk0Y2IxMDc4YmU1YWNjZWUuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNpQztBQUNRO0FBQ0o7QUFDRztBQUN4QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvQkFBb0IsNkNBQVc7QUFDL0I7QUFDQTtBQUNBO0FBQ0E7QUFDQSx5QkFBeUIsK0NBQWE7QUFDdEM7QUFDQTtBQUNBO0FBQ0E7QUFDQSwyQkFBMkIsb0RBQVc7QUFDdEM7QUFDQTtBQUNBLHVCQUF1QixnREFBZ0I7QUFDdkM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx5QkFBeUIsaUJBQWlCO0FBQzFDLGdEQUFnRCxpQkFBaUI7QUFDakU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHNEQUFzRCx5QkFBeUI7QUFDL0U7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlFQUFlLFVBQVUsRUFBQzs7Ozs7Ozs7Ozs7Ozs7OztBQ3ZGMUI7QUFDb0Q7QUFDcEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUVBQXFFLGNBQWMsaUJBQWlCLGlCQUFpQjtBQUNySDtBQUNBLCtDQUErQyxpQkFBaUI7QUFDaEU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUVBQXFFLGNBQWMsU0FBUyxhQUFhO0FBQ3pHO0FBQ0EsK0NBQStDLGFBQWE7QUFDNUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVU7QUFDVjtBQUNBO0FBQ0E7QUFDQSxxRUFBcUUsY0FBYyxTQUFTLGFBQWE7QUFDekc7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1CQUFtQixpRUFBbUI7QUFDdEM7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpRUFBZSxJQUFJLEVBQUM7Ozs7Ozs7Ozs7Ozs7OztBQzdEcEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLGlFQUFlLEtBQUssRUFBQzs7Ozs7Ozs7Ozs7Ozs7O0FDalRyQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFRO0FBQ1I7QUFDQTtBQUNBO0FBQ0EsUUFBUTtBQUNSO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlFQUFlLG9CQUFvQixFQUFDOzs7Ozs7Ozs7Ozs7Ozs7O0FDaEZwQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUM2Qzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNoQjdDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDMEI7QUFDMEI7QUFDcEQ7QUFDZTtBQUNmO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FB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QixDQUFoQixDQUF4QjtBQUFBLElBQU9JLE1BQVA7QUFBQSxJQUFlQyxLQUFmO0FBRUEsSUFBTUMsVUFBVSxHQUFHLElBQUlMLDZEQUFKLENBQWVHLE1BQWYsRUFBdUJDLEtBQXZCLENBQW5CO0FBRUFFLFFBQVEsQ0FBQ0MsYUFBVCxDQUF1QixNQUF2QixFQUErQkMsZ0JBQS9CLENBQWdELE9BQWhELEVBQXlELFVBQUNDLEtBQUQ7RUFBQSxPQUFXUiwyRUFBb0IsQ0FBQ1EsS0FBRCxFQUFRSixVQUFSLENBQS9CO0FBQUEsQ0FBekQsRSIsInNvdXJjZXMiOlsid2VicGFjazovL2VuZ2xpc2hfZm9yX2tpZHMvLi9hc3NldHMvanMvYXBwQ29udHJvbC5qcyIsIndlYnBhY2s6Ly9lbmdsaXNoX2Zvcl9raWRzLy4vYXNzZXRzL2pzL2NhcmQuanMiLCJ3ZWJwYWNrOi8vZW5nbGlzaF9mb3Jfa2lkcy8uL2Fzc2V0cy9qcy9jYXJkcy5qcyIsIndlYnBhY2s6Ly9lbmdsaXNoX2Zvcl9raWRzLy4vYXNzZXRzL2pzL2NsaWNrVXNlckludGVyYWN0aXZlLmpzIiwid2VicGFjazovL2VuZ2xpc2hfZm9yX2tpZHMvLi9hc3NldHMvanMvY29tbW9uRnVuY3QuanMiLCJ3ZWJwYWNrOi8vZW5nbGlzaF9mb3Jfa2lkcy8uL2Fzc2V0cy9qcy9jb250ZW50LmpzIiwid2VicGFjazovL2VuZ2xpc2hfZm9yX2tpZHMvLi9hc3NldHMvanMvZ2FtZUNvbnRyb2wuanMiLCJ3ZWJwYWNrOi8vZW5nbGlzaF9mb3Jfa2lkcy8uL2Fzc2V0cy9qcy9tZW51LmpzIiwid2VicGFjazovL2VuZ2xpc2hfZm9yX2tpZHMvLi9hc3NldHMvanMvc3Rhci5qcyIsIndlYnBhY2s6Ly9lbmdsaXNoX2Zvcl9raWRzLy4vYXNzZXRzL2pzL3N3aXRjaC5qcyIsIndlYnBhY2s6Ly9lbmdsaXNoX2Zvcl9raWRzLy4vYXNzZXRzL3N0eWxlcy9ub3JtYWxpemUuY3NzIiwid2VicGFjazovL2VuZ2xpc2hfZm9yX2tpZHMvLi9hc3NldHMvc3R5bGVzL3Jlc2V0LmNzcyIsIndlYnBhY2s6Ly9lbmdsaXNoX2Zvcl9raWRzLy4vYXNzZXRzL3N0eWxlcy9zdHlsZS5jc3MiLCJ3ZWJwYWNrOi8vZW5nbGlzaF9mb3Jfa2lkcy8uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9hcGkuanMiLCJ3ZWJwYWNrOi8vZW5nbGlzaF9mb3Jfa2lkcy8uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9zb3VyY2VNYXBzLmpzIiwid2VicGFjazovL2VuZ2xpc2hfZm9yX2tpZHMvLi9hc3NldHMvc3R5bGVzL25vcm1hbGl6ZS5jc3M/MzhlZSIsIndlYnBhY2s6Ly9lbmdsaXNoX2Zvcl9raWRzLy4vYXNzZXRzL3N0eWxlcy9yZXNldC5jc3M/OWI3YSIsIndlYnBhY2s6Ly9lbmdsaXNoX2Zvcl9raWRzLy4vYXNzZXRzL3N0eWxlcy9zdHlsZS5jc3M/OWJiZSIsIndlYnBhY2s6Ly9lbmdsaXNoX2Zvcl9raWRzLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5qZWN0U3R5bGVzSW50b1N0eWxlVGFnLmpzIiwid2VicGFjazovL2VuZ2xpc2hfZm9yX2tpZHMvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRCeVNlbGVjdG9yLmpzIiwid2VicGFjazovL2VuZ2xpc2hfZm9yX2tpZHMvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRTdHlsZUVsZW1lbnQuanMiLCJ3ZWJwYWNrOi8vZW5nbGlzaF9mb3Jfa2lkcy8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3NldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlcy5qcyIsIndlYnBhY2s6Ly9lbmdsaXNoX2Zvcl9raWRzLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVEb21BUEkuanMiLCJ3ZWJwYWNrOi8vZW5nbGlzaF9mb3Jfa2lkcy8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlVGFnVHJhbnNmb3JtLmpzIiwid2VicGFjazovL2VuZ2xpc2hfZm9yX2tpZHMvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vZW5nbGlzaF9mb3Jfa2lkcy93ZWJwYWNrL3J1bnRpbWUvY29tcGF0IGdldCBkZWZhdWx0IGV4cG9ydCIsIndlYnBhY2s6Ly9lbmdsaXNoX2Zvcl9raWRzL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9lbmdsaXNoX2Zvcl9raWRzL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vZW5nbGlzaF9mb3Jfa2lkcy93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL2VuZ2xpc2hfZm9yX2tpZHMvd2VicGFjay9ydW50aW1lL25vbmNlIiwid2VicGFjazovL2VuZ2xpc2hfZm9yX2tpZHMvLi9zcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiLyogZXNsaW50LWRpc2FibGUgbGluZWJyZWFrLXN0eWxlICovXHJcbi8qIGVzbGludC1kaXNhYmxlIG5vLWNvbnNvbGUgKi9cclxuLyogZXNsaW50LWRpc2FibGUgbGluZWJyZWFrLXN0eWxlICovXHJcbi8qIGVzbGludC1kaXNhYmxlIG5vLXVuZGVmICovXHJcblxyXG5pbXBvcnQgTWVudUVsZW1lbnQgZnJvbSAnLi9tZW51JztcclxuaW1wb3J0IENvbnRlbnRDb250YWluZXIgZnJvbSAnLi9jb250ZW50JztcclxuaW1wb3J0IFN3aXRjaEVsZW1lbnQgZnJvbSAnLi9zd2l0Y2gnO1xyXG5pbXBvcnQgR2FtZUNvbnRyb2wgZnJvbSAnLi9nYW1lQ29udHJvbCc7XHJcblxyXG5jbGFzcyBBcHBDb250cm9sIHtcclxuICBjb25zdHJ1Y3Rvcih0b3BpY3NBcnIsIGNhcmRzQXJyKSB7XHJcbiAgICB0aGlzLnRvcGljc0FyciA9IHRvcGljc0FycjtcclxuICAgIHRoaXMuY2FyZHNBcnIgPSBjYXJkc0FycjtcclxuXHJcbiAgICB0aGlzLm1lbnUgPSBuZXcgTWVudUVsZW1lbnQodGhpcy50b3BpY3NBcnIpXHJcbiAgICAgIC5hZGRUb0RvYygpO1xyXG5cclxuICAgIHRoaXMuYWN0aXZlUGFnZSA9IHRoaXMubWVudS5hY3RpdmVQYWdlO1xyXG5cclxuICAgIHRoaXMuc3dpdGNoT2JqID0gbmV3IFN3aXRjaEVsZW1lbnQoKVxyXG4gICAgICAuYWRkVG9Eb2MoKTtcclxuXHJcbiAgICB0aGlzLmFjdGl2ZU1vZGUgPSB0aGlzLnN3aXRjaE9iai5hY3RpdmVNb2RlO1xyXG5cclxuICAgIHRoaXMuZ2FtZUNvbnRyb2wgPSBuZXcgR2FtZUNvbnRyb2wodGhpcylcclxuICAgICAgLmFkZFRvRG9jKCk7XHJcblxyXG4gICAgdGhpcy5jb250ZW50ID0gbmV3IENvbnRlbnRDb250YWluZXIodGhpcylcclxuICAgICAgLmFkZFRvRG9jKCk7XHJcbiAgfVxyXG5cclxuICBnZXQgYWN0aXZlUGFnZSgpIHtcclxuICAgIHJldHVybiB0aGlzLm1lbnUuYWN0aXZlUGFnZTtcclxuICB9XHJcblxyXG4gIHNldCBhY3RpdmVQYWdlKHZhbHVlKSB7XHJcbiAgICB0aGlzLm1lbnUuYWN0aXZlUGFnZSA9IHZhbHVlO1xyXG4gIH1cclxuXHJcbiAgZ2V0IGFjdGl2ZU1vZGUoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5zd2l0Y2hPYmouYWN0aXZlTW9kZTtcclxuICB9XHJcblxyXG4gIHNldCBhY3RpdmVNb2RlKHZhbHVlKSB7XHJcbiAgICB0aGlzLnN3aXRjaE9iai5hY3RpdmVNb2RlID0gdmFsdWU7XHJcbiAgfVxyXG5cclxuICBnZXQgYWN0aXZlQXJyQ2FyZHNPYmooKSB7XHJcbiAgICBjb25zdCBpID0gdGhpcy50b3BpY3NBcnIuZmluZEluZGV4KChpdGVtKSA9PiBpdGVtLnRvTG93ZXJDYXNlKCkgPT09IHRoaXMuYWN0aXZlUGFnZSk7XHJcbiAgICByZXR1cm4gdGhpcy5jYXJkc0FycltpXTtcclxuICB9XHJcblxyXG4gIHNldCBhY3RpdmVBcnJDYXJkc09iaihhcnJDYXJkc09iaikge1xyXG4gICAgdGhpcy5hY3RpdmVBcnJDYXJkc09iaiA9IGFyckNhcmRzT2JqO1xyXG4gIH1cclxuXHJcbiAgY2hhbmdlUGFnZShwYWdlTmFtZSkge1xyXG4gICAgdGhpcy5tZW51LnNldEFjdGl2ZVRvcGljKHBhZ2VOYW1lKTtcclxuICAgIHRoaXMuY29udGVudC5jaGFuZ2VDb250ZW50KHBhZ2VOYW1lKTtcclxuICAgIGlmICh0aGlzLmFjdGl2ZU1vZGUgPT09ICdwbGF5JyAmJiAodGhpcy5jb250ZW50LmdldFZhbGlkVG9waWNUeXBlKHRoaXMuYWN0aXZlUGFnZSkgPT09ICd0b3BpYycpKSB7XHJcbiAgICAgIHRoaXMuZ2FtZUNvbnRyb2wuc2hvdygpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5nYW1lQ29udHJvbC5oaWRlKCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBwbGF5Q2FyZFNvdW5kKGNhcmRPYmopIHtcclxuICAgIGNvbnNvbGUubG9nKGBQbGF5IFwiJHtjYXJkT2JqLmF1ZGlvU3JjfVwiYCk7XHJcbiAgICBjb25zdCBhdWRpb0VsZW1lbnQgPSBuZXcgQXVkaW8oYC4uL2Fzc2V0cy8ke2NhcmRPYmouYXVkaW9TcmN9YCk7XHJcbiAgICBhdWRpb0VsZW1lbnQucGxheSgpO1xyXG4gICAgcmV0dXJuIHRoaXM7XHJcbiAgfVxyXG5cclxuICBwbGF5QXBwU291bmQoc291bmROYW1lKSB7XHJcbiAgICBjb25zdCBzb3VuZHNMaWJyYXJ5ID0ge1xyXG4gICAgICBjb3JyZWN0OiAnYXBwL2NvcnJlY3QubXAzJyxcclxuICAgICAgd3Jvbmc6ICdhcHAvZXJyb3IubXAzJyxcclxuICAgICAgc3VjY2VzczogJ2FwcC9zdWNjZXNzLm1wMycsXHJcbiAgICAgIGZhaWx1cmU6ICdhcHAvZmFpbHVyZS5tcDMnLFxyXG4gICAgfTtcclxuICAgIGNvbnN0IGF1ZGlvRWxlbWVudCA9IG5ldyBBdWRpbyhgLi4vYXNzZXRzL2F1ZGlvLyR7c291bmRzTGlicmFyeVtzb3VuZE5hbWVdfWApO1xyXG4gICAgYXVkaW9FbGVtZW50LnBsYXkoKTtcclxuICAgIHJldHVybiB0aGlzO1xyXG4gIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgQXBwQ29udHJvbDtcclxuIiwiLyogZXNsaW50LWRpc2FibGUgbGluZWJyZWFrLXN0eWxlICovXHJcbmltcG9ydCB7IGNyZWF0ZUN1c3RvbUVsZW1lbnQgfSBmcm9tICcuL2NvbW1vbkZ1bmN0JztcclxuXHJcbmNsYXNzIENhcmQge1xyXG4gIGNvbnN0cnVjdG9yKGFwcEN0cmxPYmosIGNhcmRPYmosIHR5cGUgPSAnbWFpbiBwYWdlJykge1xyXG4gICAgdGhpcy5hcHBDdHJsT2JqID0gYXBwQ3RybE9iajtcclxuICAgIHRoaXMudHlwZSA9IHR5cGU7XHJcbiAgICB0aGlzLnZhbGlkVHlwZXMgPSBbJ21haW4gcGFnZScsICd0b3BpYyddO1xyXG4gICAgdGhpcy5lbGVtZW50ID0gbnVsbDtcclxuICAgIHRoaXMuYnVpbGQoY2FyZE9iaik7XHJcbiAgfVxyXG5cclxuICBidWlsZChjYXJkT2JqKSB7XHJcbiAgICBsZXQgdGVtcGxhdGU7XHJcbiAgICBsZXQgY2xhc3NOYW1lcyA9ICdjYXJkIGJ1dHRvbic7XHJcbiAgICBzd2l0Y2ggKHRoaXMudHlwZSkge1xyXG4gICAgICBjYXNlICdtYWluIHBhZ2UnOlxyXG4gICAgICAgIHRlbXBsYXRlID0gYFxyXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJjYXJkLWNvbnRlbnRcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImdyYXBoaWMgY2FyZC1ncmFwaGljXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aW1nIGNsYXNzPVwiY2FyZC1pbWFnZVwiIHNyYz1cIi4uL2Fzc2V0cy8ke2NhcmRPYmouaW1hZ2V9XCIgYWx0PVwiU2VjdGlvbiAke2NhcmRPYmouY2FyZE5hbWV9XCIgd2lkdGg9XCIzOTBcIiBoZWlnaHQ9XCIyNjBcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxwIGNsYXNzPVwiY2FyZC10ZXh0XCI+JHtjYXJkT2JqLmNhcmROYW1lfTwvcD5cclxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgYDtcclxuICAgICAgICBjbGFzc05hbWVzICs9ICcgY2FyZC1tYWluLXBhZ2UnO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBjYXNlICd0b3BpYyc6XHJcbiAgICAgICAgaWYgKHRoaXMuYXBwQ3RybE9iai5hY3RpdmVNb2RlID09PSAndHJhaW4nKSB7XHJcbiAgICAgICAgICB0ZW1wbGF0ZSA9IGBcclxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiY2FyZC1jb250ZW50XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJncmFwaGljIGNhcmQtZ3JhcGhpY1wiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGltZyBjbGFzcz1cImNhcmQtaW1hZ2VcIiBzcmM9XCIuLi9hc3NldHMvJHtjYXJkT2JqLmltYWdlfVwiIGFsdD1cIiR7Y2FyZE9iai53b3JkfVwiIHdpZHRoPVwiMzkwXCIgaGVpZ2h0PVwiMjYwXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8cCBjbGFzcz1cImNhcmQtdGV4dFwiPiR7Y2FyZE9iai53b3JkfTwvcD5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImJ1dHRvbiBjYXJkLWZsaXAtYnV0dG9uXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cIm1hdGVyaWFsLXN5bWJvbHMtb3V0bGluZWRcIj5mbGlwX2NhbWVyYV9hbmRyb2lkPC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICBgO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICB0ZW1wbGF0ZSA9IGBcclxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiY2FyZC1jb250ZW50XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJncmFwaGljIGNhcmQtZ3JhcGhpY1wiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGltZyBjbGFzcz1cImNhcmQtaW1hZ2VcIiBzcmM9XCIuLi9hc3NldHMvJHtjYXJkT2JqLmltYWdlfVwiIGFsdD1cIiR7Y2FyZE9iai53b3JkfVwiIHdpZHRoPVwiMzkwXCIgaGVpZ2h0PVwiMjYwXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgIGA7XHJcbiAgICAgICAgICBjbGFzc05hbWVzICs9ICcgZ2FtZS1jYXJkJztcclxuICAgICAgICB9XHJcbiAgICAgICAgY2xhc3NOYW1lcyArPSAnIGNhcmQtdG9waWMnO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBkZWZhdWx0OlxyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMuZWxlbWVudCA9IGNyZWF0ZUN1c3RvbUVsZW1lbnQoJ2RpdicsIGNsYXNzTmFtZXMsIHRlbXBsYXRlKTtcclxuICAgIHJldHVybiB0aGlzO1xyXG4gIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgQ2FyZDtcclxuIiwiLyogZXNsaW50LWRpc2FibGUgbGluZWJyZWFrLXN0eWxlICovXHJcbmNvbnN0IGNhcmRzID0gW1xyXG4gIFsnQWN0aW9uIChzZXQgQSknLCAnQWN0aW9uIChzZXQgQiknLCAnQW5pbWFsIChzZXQgQSknLCAnQW5pbWFsIChzZXQgQiknLCAnQ2xvdGhlcycsICdFbW90aW9ucyddLFxyXG4gIFtcclxuICAgIHtcclxuICAgICAgd29yZDogJ2NyeScsXHJcbiAgICAgIHRyYW5zbGF0aW9uOiAn0L/Qu9Cw0LrQsNGC0YwnLFxyXG4gICAgICBpbWFnZTogJ2ltZy9jcnkuanBnJyxcclxuICAgICAgYXVkaW9TcmM6ICdhdWRpby9jcnkubXAzJyxcclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgIHdvcmQ6ICdkYW5jZScsXHJcbiAgICAgIHRyYW5zbGF0aW9uOiAn0YLQsNC90YbQtdCy0LDRgtGMJyxcclxuICAgICAgaW1hZ2U6ICdpbWcvZGFuY2UuanBnJyxcclxuICAgICAgYXVkaW9TcmM6ICdhdWRpby9kYW5jZS5tcDMnLFxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgd29yZDogJ2RpdmUnLFxyXG4gICAgICB0cmFuc2xhdGlvbjogJ9C90YvRgNGP0YLRjCcsXHJcbiAgICAgIGltYWdlOiAnaW1nL2RpdmUuanBnJyxcclxuICAgICAgYXVkaW9TcmM6ICdhdWRpby9kaXZlLm1wMycsXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICB3b3JkOiAnZHJhdycsXHJcbiAgICAgIHRyYW5zbGF0aW9uOiAn0YDQuNGB0L7QstCw0YLRjCcsXHJcbiAgICAgIGltYWdlOiAnaW1nL2RyYXcuanBnJyxcclxuICAgICAgYXVkaW9TcmM6ICdhdWRpby9kcmF3Lm1wMycsXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICB3b3JkOiAnZmlzaCcsXHJcbiAgICAgIHRyYW5zbGF0aW9uOiAn0LvQvtCy0LjRgtGMINGA0YvQsdGDJyxcclxuICAgICAgaW1hZ2U6ICdpbWcvZmlzaC5qcGcnLFxyXG4gICAgICBhdWRpb1NyYzogJ2F1ZGlvL2Zpc2gubXAzJyxcclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgIHdvcmQ6ICdmbHknLFxyXG4gICAgICB0cmFuc2xhdGlvbjogJ9C70LXRgtCw0YLRjCcsXHJcbiAgICAgIGltYWdlOiAnaW1nL2ZseS5qcGcnLFxyXG4gICAgICBhdWRpb1NyYzogJ2F1ZGlvL2ZseS5tcDMnLFxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgd29yZDogJ2h1ZycsXHJcbiAgICAgIHRyYW5zbGF0aW9uOiAn0L7QsdC90LjQvNCw0YLRjCcsXHJcbiAgICAgIGltYWdlOiAnaW1nL2h1Zy5qcGcnLFxyXG4gICAgICBhdWRpb1NyYzogJ2F1ZGlvL2h1Zy5tcDMnLFxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgd29yZDogJ2p1bXAnLFxyXG4gICAgICB0cmFuc2xhdGlvbjogJ9C/0YDRi9Cz0LDRgtGMJyxcclxuICAgICAgaW1hZ2U6ICdpbWcvanVtcC5qcGcnLFxyXG4gICAgICBhdWRpb1NyYzogJ2F1ZGlvL2p1bXAubXAzJyxcclxuICAgIH0sXHJcbiAgXSxcclxuICBbXHJcbiAgICB7XHJcbiAgICAgIHdvcmQ6ICdvcGVuJyxcclxuICAgICAgdHJhbnNsYXRpb246ICfQvtGC0LrRgNGL0LLQsNGC0YwnLFxyXG4gICAgICBpbWFnZTogJ2ltZy9vcGVuLmpwZycsXHJcbiAgICAgIGF1ZGlvU3JjOiAnYXVkaW8vb3Blbi5tcDMnLFxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgd29yZDogJ3BsYXknLFxyXG4gICAgICB0cmFuc2xhdGlvbjogJ9C40LPRgNCw0YLRjCcsXHJcbiAgICAgIGltYWdlOiAnaW1nL3BsYXkuanBnJyxcclxuICAgICAgYXVkaW9TcmM6ICdhdWRpby9wbGF5Lm1wMycsXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICB3b3JkOiAncG9pbnQnLFxyXG4gICAgICB0cmFuc2xhdGlvbjogJ9GD0LrQsNC30YvQstCw0YLRjCcsXHJcbiAgICAgIGltYWdlOiAnaW1nL3BvaW50LmpwZycsXHJcbiAgICAgIGF1ZGlvU3JjOiAnYXVkaW8vcG9pbnQubXAzJyxcclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgIHdvcmQ6ICdyaWRlJyxcclxuICAgICAgdHJhbnNsYXRpb246ICfQtdC30LTQuNGC0YwnLFxyXG4gICAgICBpbWFnZTogJ2ltZy9yaWRlLmpwZycsXHJcbiAgICAgIGF1ZGlvU3JjOiAnYXVkaW8vcmlkZS5tcDMnLFxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgd29yZDogJ3J1bicsXHJcbiAgICAgIHRyYW5zbGF0aW9uOiAn0LHQtdCz0LDRgtGMJyxcclxuICAgICAgaW1hZ2U6ICdpbWcvcnVuLmpwZycsXHJcbiAgICAgIGF1ZGlvU3JjOiAnYXVkaW8vcnVuLm1wMycsXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICB3b3JkOiAnc2luZycsXHJcbiAgICAgIHRyYW5zbGF0aW9uOiAn0L/QtdGC0YwnLFxyXG4gICAgICBpbWFnZTogJ2ltZy9zaW5nLmpwZycsXHJcbiAgICAgIGF1ZGlvU3JjOiAnYXVkaW8vc2luZy5tcDMnLFxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgd29yZDogJ3NraXAnLFxyXG4gICAgICB0cmFuc2xhdGlvbjogJ9C/0YDQvtC/0YPRgdC60LDRgtGMLCDQv9GA0YvQs9Cw0YLRjCcsXHJcbiAgICAgIGltYWdlOiAnaW1nL3NraXAuanBnJyxcclxuICAgICAgYXVkaW9TcmM6ICdhdWRpby9za2lwLm1wMycsXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICB3b3JkOiAnc3dpbScsXHJcbiAgICAgIHRyYW5zbGF0aW9uOiAn0L/Qu9Cw0LLQsNGC0YwnLFxyXG4gICAgICBpbWFnZTogJ2ltZy9zd2ltLmpwZycsXHJcbiAgICAgIGF1ZGlvU3JjOiAnYXVkaW8vc3dpbS5tcDMnLFxyXG4gICAgfSxcclxuICBdLFxyXG4gIFtcclxuICAgIHtcclxuICAgICAgd29yZDogJ2NhdCcsXHJcbiAgICAgIHRyYW5zbGF0aW9uOiAn0LrQvtGCJyxcclxuICAgICAgaW1hZ2U6ICdpbWcvY2F0LmpwZycsXHJcbiAgICAgIGF1ZGlvU3JjOiAnYXVkaW8vY2F0Lm1wMycsXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICB3b3JkOiAnY2hpY2snLFxyXG4gICAgICB0cmFuc2xhdGlvbjogJ9GG0YvQv9C70ZHQvdC+0LonLFxyXG4gICAgICBpbWFnZTogJ2ltZy9jaGljay5qcGcnLFxyXG4gICAgICBhdWRpb1NyYzogJ2F1ZGlvL2NoaWNrLm1wMycsXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICB3b3JkOiAnY2hpY2tlbicsXHJcbiAgICAgIHRyYW5zbGF0aW9uOiAn0LrRg9GA0LjRhtCwJyxcclxuICAgICAgaW1hZ2U6ICdpbWcvY2hpY2tlbi5qcGcnLFxyXG4gICAgICBhdWRpb1NyYzogJ2F1ZGlvL2NoaWNrZW4ubXAzJyxcclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgIHdvcmQ6ICdkb2cnLFxyXG4gICAgICB0cmFuc2xhdGlvbjogJ9GB0L7QsdCw0LrQsCcsXHJcbiAgICAgIGltYWdlOiAnaW1nL2RvZy5qcGcnLFxyXG4gICAgICBhdWRpb1NyYzogJ2F1ZGlvL2RvZy5tcDMnLFxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgd29yZDogJ2hvcnNlJyxcclxuICAgICAgdHJhbnNsYXRpb246ICfQu9C+0YjQsNC00YwnLFxyXG4gICAgICBpbWFnZTogJ2ltZy9ob3JzZS5qcGcnLFxyXG4gICAgICBhdWRpb1NyYzogJ2F1ZGlvL2hvcnNlLm1wMycsXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICB3b3JkOiAncGlnJyxcclxuICAgICAgdHJhbnNsYXRpb246ICfRgdCy0LjQvdGM0Y8nLFxyXG4gICAgICBpbWFnZTogJ2ltZy9waWcuanBnJyxcclxuICAgICAgYXVkaW9TcmM6ICdhdWRpby9waWcubXAzJyxcclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgIHdvcmQ6ICdyYWJiaXQnLFxyXG4gICAgICB0cmFuc2xhdGlvbjogJ9C60YDQvtC70LjQuicsXHJcbiAgICAgIGltYWdlOiAnaW1nL3JhYmJpdC5qcGcnLFxyXG4gICAgICBhdWRpb1NyYzogJ2F1ZGlvL3JhYmJpdC5tcDMnLFxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgd29yZDogJ3NoZWVwJyxcclxuICAgICAgdHJhbnNsYXRpb246ICfQvtCy0YbQsCcsXHJcbiAgICAgIGltYWdlOiAnaW1nL3NoZWVwLmpwZycsXHJcbiAgICAgIGF1ZGlvU3JjOiAnYXVkaW8vc2hlZXAubXAzJyxcclxuICAgIH0sXHJcbiAgXSxcclxuICBbXHJcbiAgICB7XHJcbiAgICAgIHdvcmQ6ICdiaXJkJyxcclxuICAgICAgdHJhbnNsYXRpb246ICfQv9GC0LjRhtCwJyxcclxuICAgICAgaW1hZ2U6ICdpbWcvYmlyZC5qcGcnLFxyXG4gICAgICBhdWRpb1NyYzogJ2F1ZGlvL2JpcmQubXAzJyxcclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgIHdvcmQ6ICdmaXNoJyxcclxuICAgICAgdHJhbnNsYXRpb246ICfRgNGL0LHQsCcsXHJcbiAgICAgIGltYWdlOiAnaW1nL2Zpc2gxLmpwZycsXHJcbiAgICAgIGF1ZGlvU3JjOiAnYXVkaW8vZmlzaC5tcDMnLFxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgd29yZDogJ2Zyb2cnLFxyXG4gICAgICB0cmFuc2xhdGlvbjogJ9C20LDQsdCwJyxcclxuICAgICAgaW1hZ2U6ICdpbWcvZnJvZy5qcGcnLFxyXG4gICAgICBhdWRpb1NyYzogJ2F1ZGlvL2Zyb2cubXAzJyxcclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgIHdvcmQ6ICdnaXJhZmZlJyxcclxuICAgICAgdHJhbnNsYXRpb246ICfQttC40YDQsNGE0LAnLFxyXG4gICAgICBpbWFnZTogJ2ltZy9naXJhZmZlLmpwZycsXHJcbiAgICAgIGF1ZGlvU3JjOiAnYXVkaW8vZ2lyYWZmZS5tcDMnLFxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgd29yZDogJ2xpb24nLFxyXG4gICAgICB0cmFuc2xhdGlvbjogJ9C70LXQsicsXHJcbiAgICAgIGltYWdlOiAnaW1nL2xpb24uanBnJyxcclxuICAgICAgYXVkaW9TcmM6ICdhdWRpby9saW9uLm1wMycsXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICB3b3JkOiAnbW91c2UnLFxyXG4gICAgICB0cmFuc2xhdGlvbjogJ9C80YvRiNGMJyxcclxuICAgICAgaW1hZ2U6ICdpbWcvbW91c2UuanBnJyxcclxuICAgICAgYXVkaW9TcmM6ICdhdWRpby9tb3VzZS5tcDMnLFxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgd29yZDogJ3R1cnRsZScsXHJcbiAgICAgIHRyYW5zbGF0aW9uOiAn0YfQtdGA0LXQv9Cw0YXQsCcsXHJcbiAgICAgIGltYWdlOiAnaW1nL3R1cnRsZS5qcGcnLFxyXG4gICAgICBhdWRpb1NyYzogJ2F1ZGlvL3R1cnRsZS5tcDMnLFxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgd29yZDogJ2RvbHBoaW4nLFxyXG4gICAgICB0cmFuc2xhdGlvbjogJ9C00LXQu9GM0YTQuNC9JyxcclxuICAgICAgaW1hZ2U6ICdpbWcvZG9scGhpbi5qcGcnLFxyXG4gICAgICBhdWRpb1NyYzogJ2F1ZGlvL2RvbHBoaW4ubXAzJyxcclxuICAgIH0sXHJcbiAgXSxcclxuICBbXHJcbiAgICB7XHJcbiAgICAgIHdvcmQ6ICdza2lydCcsXHJcbiAgICAgIHRyYW5zbGF0aW9uOiAn0Y7QsdC60LAnLFxyXG4gICAgICBpbWFnZTogJ2ltZy9za2lydC5qcGcnLFxyXG4gICAgICBhdWRpb1NyYzogJ2F1ZGlvL3NraXJ0Lm1wMycsXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICB3b3JkOiAncGFudHMnLFxyXG4gICAgICB0cmFuc2xhdGlvbjogJ9Cx0YDRjtC60LgnLFxyXG4gICAgICBpbWFnZTogJ2ltZy9wYW50cy5qcGcnLFxyXG4gICAgICBhdWRpb1NyYzogJ2F1ZGlvL3BhbnRzLm1wMycsXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICB3b3JkOiAnYmxvdXNlJyxcclxuICAgICAgdHJhbnNsYXRpb246ICfQsdC70YPQt9C60LAnLFxyXG4gICAgICBpbWFnZTogJ2ltZy9ibG91c2UuanBnJyxcclxuICAgICAgYXVkaW9TcmM6ICdhdWRpby9ibG91c2UubXAzJyxcclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgIHdvcmQ6ICdkcmVzcycsXHJcbiAgICAgIHRyYW5zbGF0aW9uOiAn0L/Qu9Cw0YLRjNC1JyxcclxuICAgICAgaW1hZ2U6ICdpbWcvZHJlc3MuanBnJyxcclxuICAgICAgYXVkaW9TcmM6ICdhdWRpby9kcmVzcy5tcDMnLFxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgd29yZDogJ2Jvb3QnLFxyXG4gICAgICB0cmFuc2xhdGlvbjogJ9Cx0L7RgtC40L3QvtC6JyxcclxuICAgICAgaW1hZ2U6ICdpbWcvYm9vdC5qcGcnLFxyXG4gICAgICBhdWRpb1NyYzogJ2F1ZGlvL2Jvb3QubXAzJyxcclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgIHdvcmQ6ICdzaGlydCcsXHJcbiAgICAgIHRyYW5zbGF0aW9uOiAn0YDRg9Cx0LDRiNC60LAnLFxyXG4gICAgICBpbWFnZTogJ2ltZy9zaGlydC5qcGcnLFxyXG4gICAgICBhdWRpb1NyYzogJ2F1ZGlvL3NoaXJ0Lm1wMycsXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICB3b3JkOiAnY29hdCcsXHJcbiAgICAgIHRyYW5zbGF0aW9uOiAn0L/QsNC70YzRgtC+JyxcclxuICAgICAgaW1hZ2U6ICdpbWcvY29hdC5qcGcnLFxyXG4gICAgICBhdWRpb1NyYzogJ2F1ZGlvL2NvYXQubXAzJyxcclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgIHdvcmQ6ICdzaG9lJyxcclxuICAgICAgdHJhbnNsYXRpb246ICfRgtGD0YTQu9C4JyxcclxuICAgICAgaW1hZ2U6ICdpbWcvc2hvZS5qcGcnLFxyXG4gICAgICBhdWRpb1NyYzogJ2F1ZGlvL3Nob2UubXAzJyxcclxuICAgIH0sXHJcbiAgXSxcclxuICBbXHJcbiAgICB7XHJcbiAgICAgIHdvcmQ6ICdzYWQnLFxyXG4gICAgICB0cmFuc2xhdGlvbjogJ9Cz0YDRg9GB0YLQvdGL0LknLFxyXG4gICAgICBpbWFnZTogJ2ltZy9zYWQuanBnJyxcclxuICAgICAgYXVkaW9TcmM6ICdhdWRpby9zYWQubXAzJyxcclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgIHdvcmQ6ICdhbmdyeScsXHJcbiAgICAgIHRyYW5zbGF0aW9uOiAn0YHQtdGA0LTQuNGC0YvQuScsXHJcbiAgICAgIGltYWdlOiAnaW1nL2FuZ3J5LmpwZycsXHJcbiAgICAgIGF1ZGlvU3JjOiAnYXVkaW8vYW5ncnkubXAzJyxcclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgIHdvcmQ6ICdoYXBweScsXHJcbiAgICAgIHRyYW5zbGF0aW9uOiAn0YHRh9Cw0YHRgtC70LjQstGL0LknLFxyXG4gICAgICBpbWFnZTogJ2ltZy9oYXBweS5qcGcnLFxyXG4gICAgICBhdWRpb1NyYzogJ2F1ZGlvL2hhcHB5Lm1wMycsXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICB3b3JkOiAndGlyZWQnLFxyXG4gICAgICB0cmFuc2xhdGlvbjogJ9GD0YHRgtCw0LLRiNC40LknLFxyXG4gICAgICBpbWFnZTogJ2ltZy90aXJlZC5qcGcnLFxyXG4gICAgICBhdWRpb1NyYzogJ2F1ZGlvL3RpcmVkLm1wMycsXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICB3b3JkOiAnc3VycHJpc2VkJyxcclxuICAgICAgdHJhbnNsYXRpb246ICfRg9C00LjQstC70ZHQvdC90YvQuScsXHJcbiAgICAgIGltYWdlOiAnaW1nL3N1cnByaXNlZC5qcGcnLFxyXG4gICAgICBhdWRpb1NyYzogJ2F1ZGlvL3N1cnByaXNlZC5tcDMnLFxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgd29yZDogJ3NjYXJlZCcsXHJcbiAgICAgIHRyYW5zbGF0aW9uOiAn0LjRgdC/0YPQs9Cw0L3QvdGL0LknLFxyXG4gICAgICBpbWFnZTogJ2ltZy9zY2FyZWQuanBnJyxcclxuICAgICAgYXVkaW9TcmM6ICdhdWRpby9zY2FyZWQubXAzJyxcclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgIHdvcmQ6ICdzbWlsZScsXHJcbiAgICAgIHRyYW5zbGF0aW9uOiAn0YPQu9GL0LHQutCwJyxcclxuICAgICAgaW1hZ2U6ICdpbWcvc21pbGUuanBnJyxcclxuICAgICAgYXVkaW9TcmM6ICdhdWRpby9zbWlsZS5tcDMnLFxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgd29yZDogJ2xhdWdoJyxcclxuICAgICAgdHJhbnNsYXRpb246ICfRgdC80LXRhScsXHJcbiAgICAgIGltYWdlOiAnaW1nL2xhdWdoLmpwZycsXHJcbiAgICAgIGF1ZGlvU3JjOiAnYXVkaW8vbGF1Z2gubXAzJyxcclxuICAgIH0sXHJcbiAgXSxcclxuXTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNhcmRzO1xyXG4iLCIvKiBlc2xpbnQtZGlzYWJsZSBsaW5lYnJlYWstc3R5bGUgKi9cclxuLyogZXNsaW50LWRpc2FibGUgcHJlZmVyLWRlc3RydWN0dXJpbmcgKi9cclxuLyogZXNsaW50LWRpc2FibGUgbm8tdW51c2VkLXZhcnMgKi9cclxuLyogZXNsaW50LWRpc2FibGUgbm8tY29uc29sZSAqL1xyXG4vKiBlc2xpbnQtZGlzYWJsZSBuby11bmRlZiAqL1xyXG5cclxuZnVuY3Rpb24gY2xpY2tVc2VySW50ZXJhY3RpdmUoZXZlbnQsIGFwcEN0cmxPYmopIHtcclxuICBjb25zdCBhcHBDb250cm9sID0gYXBwQ3RybE9iajtcclxuICBjb25zdCBtZW51ID0gYXBwQ29udHJvbC5tZW51O1xyXG4gIGNvbnN0IGdhbWVDb250cm9sID0gYXBwQ29udHJvbC5nYW1lQ29udHJvbDtcclxuICBjb25zdCBzd2l0Y2hPYmogPSBhcHBDb250cm9sLnN3aXRjaE9iajtcclxuICBjb25zdCBjb250ZW50ID0gYXBwQ29udHJvbC5jb250ZW50O1xyXG4gIGNvbnN0IHRhcmdldENsYXNzTGlzdCA9IEFycmF5LmZyb20oZXZlbnQudGFyZ2V0LmNsYXNzTGlzdCk7XHJcbiAgY29uc3QgaXNHYW1lTW9kZSA9IChhcHBDb250cm9sLmFjdGl2ZU1vZGUgPT09ICdwbGF5Jyk7XHJcbiAgbGV0IGNhcmRFbGVtZW50O1xyXG4gIGxldCBhY3RpdmVNZW51RWxlbWVudDtcclxuXHJcbiAgc3dpdGNoICh0cnVlKSB7XHJcbiAgICAvLyAgY2xpY2tpbmcgb24gbWVudSBidXJnZXIgYnV0dG9uXHJcbiAgICBjYXNlICh0YXJnZXRDbGFzc0xpc3QuaW5jbHVkZXMoJ21lbnUtYnV0dG9uJykpOlxyXG4gICAgICBtZW51LnRvZ2dsZSgpO1xyXG4gICAgICBicmVhaztcclxuXHJcbiAgICAvLyAgY2xpY2tpbmcgYW55d2hlcmUgZWxzZSB3aGVuIGJ1cmdlciBtZW51IG9wZW5lZFxyXG4gICAgY2FzZSAoZG9jdW1lbnQucXVlcnlTZWxlY3RvcignYm9keScpLmNsYXNzTGlzdC5jb250YWlucygnb3BlbmVkLW1lbnUnKSAmJiAhdGFyZ2V0Q2xhc3NMaXN0LmluY2x1ZGVzKCdtZW51JykpOlxyXG4gICAgICBtZW51LmNsb3NlKCk7XHJcbiAgICAgIGlmICh0YXJnZXRDbGFzc0xpc3QuaW5jbHVkZXMoJ21lbnUtaXRlbScpKSB7XHJcbiAgICAgICAgYWN0aXZlTWVudUVsZW1lbnQgPSBldmVudC50YXJnZXQ7XHJcbiAgICAgICAgYXBwQ29udHJvbC5jaGFuZ2VQYWdlKGFjdGl2ZU1lbnVFbGVtZW50LmlubmVySFRNTCk7XHJcbiAgICAgIH1cclxuICAgICAgYnJlYWs7XHJcblxyXG4gICAgLy8gIGNsaWNraW5nIG9uIHN3aXRjaCBidXR0b25cclxuICAgIGNhc2UgKHRhcmdldENsYXNzTGlzdC5pbmNsdWRlcygnc3dpdGNoLXRyaWdnZXInKSk6IHtcclxuICAgICAgc3dpdGNoT2JqLnRvZ2dsZSgpO1xyXG4gICAgICBhcHBDb250cm9sLmNoYW5nZVBhZ2UoYXBwQ29udHJvbC5hY3RpdmVQYWdlKTtcclxuICAgICAgYnJlYWs7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gIGNsaWNraW5nIG9uIHN0YXJ0IGdhbWUgYnV0dG9uXHJcbiAgICBjYXNlICh0YXJnZXRDbGFzc0xpc3QuaW5jbHVkZXMoJ3N0YXJ0LWJ1dHRvbicpKToge1xyXG4gICAgICBnYW1lQ29udHJvbC5zdGFydEdhbWUoYXBwQ29udHJvbC5hY3RpdmVBcnJDYXJkc09iaik7XHJcbiAgICAgIGJyZWFrO1xyXG4gICAgfVxyXG5cclxuICAgIC8vICBjbGlja2luZyBvbiBzdGFydCBnYW1lIGJ1dHRvblxyXG4gICAgY2FzZSAodGFyZ2V0Q2xhc3NMaXN0LmluY2x1ZGVzKCdyZXBlYXQtYnV0dG9uJykpOiB7XHJcbiAgICAgIGdhbWVDb250cm9sLnJlcGVhdFF1ZXN0aW9uKCk7XHJcbiAgICAgIGJyZWFrO1xyXG4gICAgfVxyXG5cclxuICAgIC8vICBjbGlja2luZyBvbiBjYXJkIGZsaXAgYnV0dG9uXHJcbiAgICBjYXNlIChldmVudC50YXJnZXQucGFyZW50RWxlbWVudC5jbGFzc0xpc3QuY29udGFpbnMoJ2NhcmQtZmxpcC1idXR0b24nKSk6XHJcbiAgICAgIGNhcmRFbGVtZW50ID0gY29udGVudC5nZXRDYXJkRWxlbWVudEJ5VGFyZ2V0KGV2ZW50LnRhcmdldCk7XHJcbiAgICAgIGNvbnRlbnQuZmxpcENhcmQoY2FyZEVsZW1lbnQpO1xyXG4gICAgICBicmVhaztcclxuXHJcbiAgICAvLyAgY2xpY2tpbmcgb24gY2FyZFxyXG4gICAgY2FzZSAodGFyZ2V0Q2xhc3NMaXN0LnNvbWUoKGNsYXNzTmFtZSkgPT4gY29udGVudC52YWxpZENhcmRDbGFzc2VzLmluY2x1ZGVzKGNsYXNzTmFtZSkpKToge1xyXG4gICAgICBjYXJkRWxlbWVudCA9IGNvbnRlbnQuZ2V0Q2FyZEVsZW1lbnRCeVRhcmdldChldmVudC50YXJnZXQpO1xyXG4gICAgICBjb25zdCBjYXJkSW1hZ2VOYW1lID0gY29udGVudC5nZXRDYXJkSW1hZ2VOYW1lKGNhcmRFbGVtZW50KTtcclxuICAgICAgY29uc3QgY2FyZE9iaiA9IGNvbnRlbnQuZ2V0Q2FyZE9iakJ5SW1hZ2VOYW1lKGNhcmRJbWFnZU5hbWUpO1xyXG5cclxuICAgICAgaWYgKGlzR2FtZU1vZGUgJiYgZ2FtZUNvbnRyb2wuaXNHYW1lU3RhcnRlZCAmJiAhY2FyZEVsZW1lbnQuY2xhc3NMaXN0LmNvbnRhaW5zKCdkaXNhYmxlZCcpKSB7XHJcbiAgICAgICAgZ2FtZUNvbnRyb2wucHJvY2Vzc0Fuc3dlcihjYXJkT2JqLCBjYXJkRWxlbWVudCk7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIH0gZWxzZSBpZiAoY2FyZEVsZW1lbnQuY2xhc3NMaXN0LmNvbnRhaW5zKCdjYXJkLW1haW4tcGFnZScpKSB7XHJcbiAgICAgICAgY29uc3QgcGFnZU5hbWUgPSBjb250ZW50LmdldENhcmRJbm5lclRleHQoY2FyZEVsZW1lbnQpO1xyXG4gICAgICAgIGFjdGl2ZU1lbnVFbGVtZW50ID0gbWVudS5nZXRNZW51SXRlbUJ5TmFtZShwYWdlTmFtZSk7XHJcbiAgICAgICAgYXBwQ29udHJvbC5jaGFuZ2VQYWdlKHBhZ2VOYW1lKTtcclxuICAgICAgfSBlbHNlIGlmICghY2FyZEVsZW1lbnQuY2xhc3NMaXN0LmNvbnRhaW5zKCdmbGlwcGVkJykgJiYgIWNhcmRFbGVtZW50LmNsYXNzTGlzdC5jb250YWlucygnZ2FtZS1jYXJkJykpIHtcclxuICAgICAgICBhcHBDb250cm9sLnBsYXlDYXJkU291bmQoY2FyZE9iaik7XHJcbiAgICAgIH1cclxuICAgICAgYnJlYWs7XHJcbiAgICB9XHJcbiAgICBkZWZhdWx0OlxyXG4gICAgICBicmVhaztcclxuICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsaWNrVXNlckludGVyYWN0aXZlO1xyXG4iLCIvKiBlc2xpbnQtZGlzYWJsZSBsaW5lYnJlYWstc3R5bGUgKi9cclxuLyogZXNsaW50LWRpc2FibGUgaW1wb3J0L3ByZWZlci1kZWZhdWx0LWV4cG9ydCAqL1xyXG4vKiBlc2xpbnQtZGlzYWJsZSBuby11bmRlZiAqL1xyXG5cclxuZnVuY3Rpb24gY3JlYXRlQ3VzdG9tRWxlbWVudCh0eXBlLCBjbGFzc05hbWUgPSAnJywgaW5uZXJIVE1MID0gJycpIHtcclxuICBjb25zdCBlbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCh0eXBlKTtcclxuICBlbGVtZW50LmNsYXNzTmFtZSA9IGNsYXNzTmFtZTtcclxuICBlbGVtZW50LmlubmVySFRNTCA9IGlubmVySFRNTDtcclxuICByZXR1cm4gZWxlbWVudDtcclxufVxyXG5cclxuZnVuY3Rpb24gZ2V0UmFuZG9tSW50KG1heEludCwgbWluSW50ID0gMCkge1xyXG4gIC8vICBtYXggYW5kIG1pbiBpbmNsdXNpdmVcclxuICByZXR1cm4gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogKG1heEludCAtIG1pbkludCArIDEpKSArIG1pbkludDtcclxufVxyXG5cclxuZXhwb3J0IHsgY3JlYXRlQ3VzdG9tRWxlbWVudCwgZ2V0UmFuZG9tSW50IH07XHJcbiIsIi8qIGVzbGludC1kaXNhYmxlIGxpbmVicmVhay1zdHlsZSAqL1xyXG4vKiBlc2xpbnQtZGlzYWJsZSBuby1yZXN0cmljdGVkLXN5bnRheCAqL1xyXG4vKiBlc2xpbnQtZGlzYWJsZSBsaW5lYnJlYWstc3R5bGUgKi9cclxuLyogZXNsaW50LWRpc2FibGUgbm8tY29uc29sZSAqL1xyXG4vKiBlc2xpbnQtZGlzYWJsZSBsaW5lYnJlYWstc3R5bGUgKi9cclxuLyogZXNsaW50LWRpc2FibGUgY2xhc3MtbWV0aG9kcy11c2UtdGhpcyAqL1xyXG4vKiBlc2xpbnQtZGlzYWJsZSBuby11bmRlZiAqL1xyXG5cclxuaW1wb3J0IENhcmQgZnJvbSAnLi9jYXJkJztcclxuaW1wb3J0IHsgY3JlYXRlQ3VzdG9tRWxlbWVudCB9IGZyb20gJy4vY29tbW9uRnVuY3QnO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ29udGVudENvbnRhaW5lciB7XHJcbiAgY29uc3RydWN0b3IoYXBwQ3RybE9iaiwgdHlwZSA9ICdtYWluIHBhZ2UnKSB7XHJcbiAgICB0aGlzLmFwcENvbnRyb2wgPSBhcHBDdHJsT2JqO1xyXG4gICAgdGhpcy50b3BpY3NBcnIgPSBhcHBDdHJsT2JqLnRvcGljc0FycjtcclxuICAgIHRoaXMuY2FyZHNBcnIgPSBhcHBDdHJsT2JqLmNhcmRzQXJyO1xyXG4gICAgdGhpcy5tZW51ID0gYXBwQ3RybE9iai5tZW51O1xyXG4gICAgdGhpcy52YWxpZFR5cGVzID0gWydtYWluIHBhZ2UnLCAndG9waWMnLCAnc3RhdGlzdGljJ107XHJcbiAgICB0aGlzLnZhbGlkQ2FyZENsYXNzZXMgPSBbJ2NhcmQnLCAnY2FyZC1jb250ZW50JywgJ2NhcmQtdGV4dCcsICdjYXJkLWdyYXBoaWMnLCAnY2FyZC1pbWFnZSddO1xyXG4gICAgdGhpcy50eXBlID0gdGhpcy5nZXRWYWxpZFR5cGUodHlwZSk7XHJcbiAgICB0aGlzLmNhcmRzQ29sbGVjdGlvbiA9IG51bGw7XHJcbiAgICB0aGlzLmVsZW1lbnQgPSBudWxsO1xyXG5cclxuICAgIHRoaXMuYnVpbGQoKTtcclxuICB9XHJcblxyXG4gIGJ1aWxkKCkge1xyXG4gICAgY29uc3QgY29udGVudFdyYXBwZXIgPSBjcmVhdGVDdXN0b21FbGVtZW50KCdkaXYnLCAnY29udGVudC13cmFwcGVyJyk7XHJcbiAgICBsZXQgY29udGVudEVsZW1lbnQ7XHJcblxyXG4gICAgc3dpdGNoICh0aGlzLnR5cGUpIHtcclxuICAgICAgY2FzZSAnc3RhdGlzdGljJzpcclxuICAgICAgICBicmVhaztcclxuICAgICAgY2FzZSAnbWFpbiBwYWdlJzpcclxuICAgICAgICBjb250ZW50RWxlbWVudCA9IGNyZWF0ZUN1c3RvbUVsZW1lbnQoJ2RpdicsICdjYXJkLWNvbnRhaW5lcicpO1xyXG4gICAgICAgIHRoaXMudG9waWNzQXJyLmZvckVhY2goKHRvcGljLCBpbmRleCkgPT4ge1xyXG4gICAgICAgICAgY29uc3QgY2FyZE9iaiA9IHtcclxuICAgICAgICAgICAgY2FyZE5hbWU6IHRvcGljLFxyXG4gICAgICAgICAgICBpbWFnZTogdGhpcy5jYXJkc0FycltpbmRleF1bMF0uaW1hZ2UsXHJcbiAgICAgICAgICB9O1xyXG4gICAgICAgICAgY29udGVudEVsZW1lbnQuYXBwZW5kKG5ldyBDYXJkKHRoaXMuYXBwQ29udHJvbCwgY2FyZE9iaikuZWxlbWVudCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIGNhc2UgJ3RvcGljJzoge1xyXG4gICAgICAgIGNvbnRlbnRFbGVtZW50ID0gY3JlYXRlQ3VzdG9tRWxlbWVudCgnZGl2JywgJ2NhcmQtY29udGFpbmVyJyk7XHJcbiAgICAgICAgY29uc3QgY2FyZEluZGV4ID0gdGhpcy50b3BpY3NBcnIuZmluZEluZGV4KChpdGVtKSA9PiB7XHJcbiAgICAgICAgICBjb25zdCByZXN1bHQgPSBpdGVtLnRvTG93ZXJDYXNlKCkgPT09IHRoaXMuYXBwQ29udHJvbC5hY3RpdmVQYWdlO1xyXG4gICAgICAgICAgcmV0dXJuIHJlc3VsdDtcclxuICAgICAgICB9KTtcclxuICAgICAgICB0aGlzLmNhcmRzQXJyW2NhcmRJbmRleF0uZm9yRWFjaCgoY2FyZE9iaikgPT4ge1xyXG4gICAgICAgICAgY29udGVudEVsZW1lbnQuYXBwZW5kKG5ldyBDYXJkKHRoaXMuYXBwQ29udHJvbCwgY2FyZE9iaiwgdGhpcy50eXBlKS5lbGVtZW50KTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIH1cclxuICAgICAgZGVmYXVsdDpcclxuICAgICAgICBicmVhaztcclxuICAgIH1cclxuXHJcbiAgICBjb250ZW50V3JhcHBlci5hcHBlbmQoY29udGVudEVsZW1lbnQpO1xyXG4gICAgdGhpcy5lbGVtZW50ID0gY29udGVudFdyYXBwZXI7XHJcblxyXG4gICAgcmV0dXJuIHRoaXM7XHJcbiAgfVxyXG5cclxuICBhZGRUb0RvYygpIHtcclxuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ21haW4nKS5hcHBlbmQodGhpcy5lbGVtZW50KTtcclxuICAgIFt0aGlzLmVsZW1lbnRdID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnY29udGVudC13cmFwcGVyJyk7XHJcbiAgICB0aGlzLmNhcmRzQ29sbGVjdGlvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ2NhcmQnKTtcclxuICAgIHJldHVybiB0aGlzO1xyXG4gIH1cclxuXHJcbiAgY2xlYXIoKSB7XHJcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuY29udGVudC13cmFwcGVyJykucmVtb3ZlKCk7XHJcbiAgICByZXR1cm4gdGhpcztcclxuICB9XHJcblxyXG4gIGNoYW5nZUNvbnRlbnQobWVudVRvcGljTmFtZSkge1xyXG4gICAgdGhpcy50eXBlID0gdGhpcy5nZXRWYWxpZFRvcGljVHlwZShtZW51VG9waWNOYW1lKTtcclxuICAgIHRoaXMuYXBwQ29udHJvbC5nYW1lQ29udHJvbFxyXG4gICAgICAuZW5kR2FtZSgpO1xyXG5cclxuICAgIHRoaXNcclxuICAgICAgLmJ1aWxkKClcclxuICAgICAgLmNsZWFyKClcclxuICAgICAgLmFkZFRvRG9jKCk7XHJcbiAgICByZXR1cm4gdGhpcztcclxuICB9XHJcblxyXG4gIGlzRWxlbWVudEluQ2FyZChlbGVtZW50KSB7XHJcbiAgICByZXR1cm4gKHRoaXMudmFsaWRDYXJkQ2xhc3Nlcy5zb21lKChjbGFzc05hbWUpID0+IGVsZW1lbnQuY2xhc3NMaXN0LmNvbnRhaW5zKGNsYXNzTmFtZSkpKTtcclxuICB9XHJcblxyXG4gIGdldFZhbGlkVHlwZSh0eXBlKSB7XHJcbiAgICBpZiAodGhpcy52YWxpZFR5cGVzLmluY2x1ZGVzKHR5cGUpKSB7XHJcbiAgICAgIHJldHVybiB0eXBlO1xyXG4gICAgfVxyXG4gICAgdGhyb3cgbmV3IEVycm9yKCd3cm9uZyB0eXBlIG9mIE9iamVjdCcpO1xyXG4gIH1cclxuXHJcbiAgZ2V0VmFsaWRUb3BpY1R5cGUobWVudVRvcGljTmFtZSkge1xyXG4gICAgY29uc3QgY3VyZW50TWVudVRvcGljTmFtZSA9IG1lbnVUb3BpY05hbWUudG9Mb3dlckNhc2UoKTtcclxuICAgIGlmICh0aGlzLnZhbGlkVHlwZXMuaW5jbHVkZXMoY3VyZW50TWVudVRvcGljTmFtZSkpIHtcclxuICAgICAgcmV0dXJuIGN1cmVudE1lbnVUb3BpY05hbWU7XHJcbiAgICB9IGlmICh0aGlzLnRvcGljc0Fyci5tYXAoKGl0ZW0pID0+IGl0ZW0udG9Mb3dlckNhc2UoKSkuaW5jbHVkZXMoY3VyZW50TWVudVRvcGljTmFtZSkpIHtcclxuICAgICAgcmV0dXJuICd0b3BpYyc7XHJcbiAgICB9XHJcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ3dyb25nIG1lbnUgdG9waWMgTmFtZScpO1xyXG4gIH1cclxuXHJcbiAgZ2V0Q2FyZE9iakJ5V29yZCh3b3JkKSB7XHJcbiAgICByZXR1cm4gdGhpcy5jYXJkc0Fyci5mbGF0KCkuZmluZCgoY2FyZE9iaikgPT4gY2FyZE9iai53b3JkID09PSB3b3JkKTtcclxuICB9XHJcblxyXG4gIGdldENhcmRPYmpCeUltYWdlTmFtZShpbWFnZU5hbWUpIHtcclxuICAgIHJldHVybiB0aGlzLmNhcmRzQXJyLmZsYXQoKS5maW5kKChjYXJkT2JqKSA9PiBjYXJkT2JqLmltYWdlID09PSBgaW1nLyR7aW1hZ2VOYW1lfS5qcGdgKTtcclxuICB9XHJcblxyXG4gIGdldENhcmRPYmpCeVRyYW5zbGF0aW9uKHRyYW5zbGF0aW9uKSB7XHJcbiAgICByZXR1cm4gdGhpcy5jYXJkc0Fyci5mbGF0KCkuZmluZCgoY2FyZE9iaikgPT4gY2FyZE9iai50cmFuc2xhdGlvbiA9PT0gdHJhbnNsYXRpb24pO1xyXG4gIH1cclxuXHJcbiAgZ2V0Q2FyZEVsZW1lbnRCeVRhcmdldCh0YXJnZXRFbGVtZW50KSB7XHJcbiAgICBsZXQgc2VhcmNoRWxlbWVudCA9IHRhcmdldEVsZW1lbnQ7XHJcbiAgICB3aGlsZSAoIXNlYXJjaEVsZW1lbnQuY2xhc3NMaXN0LmNvbnRhaW5zKCdjYXJkJykpIHtcclxuICAgICAgc2VhcmNoRWxlbWVudCA9IHNlYXJjaEVsZW1lbnQucGFyZW50RWxlbWVudDtcclxuICAgIH1cclxuICAgIHJldHVybiBzZWFyY2hFbGVtZW50O1xyXG4gIH1cclxuXHJcbiAgZ2V0Q2FyZElubmVyVGV4dChjYXJkRWxlbWVudCkge1xyXG4gICAgcmV0dXJuIGNhcmRFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJ3AnKS5pbm5lckhUTUw7XHJcbiAgfVxyXG5cclxuICBnZXRDYXJkSW1hZ2VOYW1lKGNhcmRFbGVtZW50KSB7XHJcbiAgICBjb25zdCBpbWFnZVNyYyA9IGNhcmRFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJy5jYXJkLWltYWdlJykuc3JjO1xyXG4gICAgY29uc3QgaW1hZ2VOYW1lID0gaW1hZ2VTcmMubWF0Y2goLyg/PD1cXC8pXFx3Kyg/PVxcLmpwZykvKVswXTtcclxuICAgIHJldHVybiBpbWFnZU5hbWU7XHJcbiAgfVxyXG5cclxuICBmbGlwQ2FyZChjYXJkRWxlbWVudCkge1xyXG4gICAgY29uc3QgY2FyZFBhcmFncmFwaCA9IGNhcmRFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJ3AnKTtcclxuICAgIGNvbnN0IGNhcmRGbGlwQnV0dG9uID0gY2FyZEVsZW1lbnQucXVlcnlTZWxlY3RvcignLmNhcmQtZmxpcC1idXR0b24nKTtcclxuICAgIGNvbnN0IGNhcmRJbWFnZU5hbWUgPSB0aGlzLmdldENhcmRJbWFnZU5hbWUoY2FyZEVsZW1lbnQpO1xyXG4gICAgY29uc3QgY2FyZE9iaiA9IHRoaXMuZ2V0Q2FyZE9iakJ5SW1hZ2VOYW1lKGNhcmRJbWFnZU5hbWUpO1xyXG5cclxuICAgIGNhcmRFbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUoJ3VuZmxpcHBlZCcpO1xyXG4gICAgY2FyZEVsZW1lbnQuY2xhc3NMaXN0LmFkZCgnZmxpcHBlZCcpO1xyXG4gICAgY2FyZEVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcclxuICAgICAgJ3BvaW50ZXJsZWF2ZScsXHJcbiAgICAgICgpID0+IHtcclxuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgIHRoaXMudW5mbGlwQ2FyZChjYXJkRWxlbWVudCk7XHJcbiAgICAgICAgfSwgNTAwKTtcclxuICAgICAgfSxcclxuICAgICAgeyBvbmNlOiB0cnVlIH0sXHJcbiAgICApO1xyXG5cclxuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICBjYXJkUGFyYWdyYXBoLmlubmVySFRNTCA9IGNhcmRPYmoudHJhbnNsYXRpb247XHJcbiAgICAgIGNhcmRGbGlwQnV0dG9uLmhpZGRlbiA9IHRydWU7XHJcbiAgICB9LCA1MDApO1xyXG5cclxuICAgIHJldHVybiB0aGlzO1xyXG4gIH1cclxuXHJcbiAgdW5mbGlwQ2FyZChjYXJkRWxlbWVudCkge1xyXG4gICAgY2FyZEVsZW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcigncG9pbnRlcmxlYXZlJywgKGV2ZW50KSA9PiB1bmhvdmVyQ2FyZChldmVudCwgY2FyZEVsZW1lbnQsIHRoaXMpKTtcclxuXHJcbiAgICBpZiAoY2FyZEVsZW1lbnQuY2xhc3NMaXN0LmNvbnRhaW5zKCdmbGlwcGVkJykpIHtcclxuICAgICAgY29uc3QgY2FyZFBhcmFncmFwaCA9IGNhcmRFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJ3AnKTtcclxuICAgICAgY29uc3QgY2FyZEZsaXBCdXR0b24gPSBjYXJkRWxlbWVudC5xdWVyeVNlbGVjdG9yKCcuY2FyZC1mbGlwLWJ1dHRvbicpO1xyXG4gICAgICBjb25zdCBjYXJkV29yZCA9IGNhcmRQYXJhZ3JhcGguaW5uZXJIVE1MO1xyXG4gICAgICBjb25zdCBjYXJkT2JqID0gdGhpcy5nZXRDYXJkT2JqQnlUcmFuc2xhdGlvbihjYXJkV29yZCk7XHJcblxyXG4gICAgICBjYXJkRWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKCdmbGlwcGVkJyk7XHJcbiAgICAgIGNhcmRFbGVtZW50LmNsYXNzTGlzdC5hZGQoJ3VuZmxpcHBlZCcpO1xyXG4gICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICBjYXJkUGFyYWdyYXBoLmlubmVySFRNTCA9IGNhcmRPYmoud29yZDtcclxuICAgICAgICBjYXJkRmxpcEJ1dHRvbi5oaWRkZW4gPSBmYWxzZTtcclxuICAgICAgfSwgNTAwKTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gdGhpcztcclxuICB9XHJcblxyXG4gIHJlbW92ZUNhcmRzKCkge1xyXG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmNhcmQtY29udGFpbmVyJykucmVtb3ZlKCk7XHJcbiAgICByZXR1cm4gdGhpcztcclxuICB9XHJcblxyXG4gIHBsYXlGaW5hbENsaXAod3JvbmdBbnN3ZXJzKSB7XHJcbiAgICBjb25zdCBjbGlwVHlwZSA9ICh3cm9uZ0Fuc3dlcnMgPT09IDApID8gJ3N1Y2Nlc3MnIDogJ2ZhaWx1cmUnO1xyXG4gICAgY29uc3QgY2xhc3NOYW1lcyA9ICdmaW5hbC1jbGlwJztcclxuICAgIGNvbnN0IGltYWdlU3JjID0gYGFwcC8ke2NsaXBUeXBlfS5qcGdgO1xyXG5cclxuICAgIGNvbnN0IHRlbXBsYXRlID0gYFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImdyYXBoaWNcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGltZyBzcmM9XCIuLi9hc3NldHMvaW1nLyR7aW1hZ2VTcmN9XCIgYWx0PVwiaW1hZ2UgJHtjbGlwVHlwZX1cIiB3aWR0aD1cIjQwMFwiIGhlaWdodD1cIjQwMFwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBgO1xyXG5cclxuICAgIGNvbnN0IGZpbmFsQ2xpcEVsZW1lbnQgPSBjcmVhdGVDdXN0b21FbGVtZW50KCdkaXYnLCBjbGFzc05hbWVzLCB0ZW1wbGF0ZSk7XHJcbiAgICBpZiAoY2xpcFR5cGUgPT09ICdmYWlsdXJlJykge1xyXG4gICAgICBmaW5hbENsaXBFbGVtZW50LmlubmVySFRNTCArPSBgPHAgY2xhc3M9XCJtaXN0YWtlcy1udW1iZXJcIj5NaXN0YWtlczogJHt3cm9uZ0Fuc3dlcnN9PC9wPmA7XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5hcHBDb250cm9sLnBsYXlBcHBTb3VuZChjbGlwVHlwZSk7XHJcbiAgICB0aGlzLnJlbW92ZUNhcmRzKCk7XHJcbiAgICB0aGlzLmVsZW1lbnQuYXBwZW5kKGZpbmFsQ2xpcEVsZW1lbnQpO1xyXG5cclxuICAgIHJldHVybiB0aGlzO1xyXG4gIH1cclxufVxyXG4iLCIvKiBlc2xpbnQtZGlzYWJsZSBsaW5lYnJlYWstc3R5bGUgKi9cclxuLyogZXNsaW50LWRpc2FibGUgbm8tcmVzdHJpY3RlZC1zeW50YXggKi9cclxuLyogZXNsaW50LWRpc2FibGUgbGluZWJyZWFrLXN0eWxlICovXHJcbi8qIGVzbGludC1kaXNhYmxlIG5vLWNvbnNvbGUgKi9cclxuLyogZXNsaW50LWRpc2FibGUgbGluZWJyZWFrLXN0eWxlICovXHJcbi8qIGVzbGludC1kaXNhYmxlIG5vLXVuZGVmICovXHJcbmltcG9ydCBTdGFyIGZyb20gJy4vc3Rhcic7XHJcbmltcG9ydCB7XHJcbiAgY3JlYXRlQ3VzdG9tRWxlbWVudCxcclxuICBnZXRSYW5kb21JbnQsXHJcbn0gZnJvbSAnLi9jb21tb25GdW5jdCc7XHJcblxyXG5jbGFzcyBnYW1lQ29udHJvbCB7XHJcbiAgY29uc3RydWN0b3IoYXBwQ29udHJvbCkge1xyXG4gICAgdGhpcy5hcHBDb250cm9sID0gYXBwQ29udHJvbDtcclxuICAgIHRoaXMucXVlc3Rpb25zQnVuZGxlID0gW107XHJcbiAgICB0aGlzLmlzR2FtZVN0YXJ0ZWQgPSBmYWxzZTtcclxuICAgIHRoaXMuY29ycmVjdFN0YXJFbGVtZW50ID0gbmV3IFN0YXIoKS5lbGVtZW50O1xyXG4gICAgdGhpcy53cm9uZ1N0YXJFbGVtZW50ID0gbmV3IFN0YXIoJ3dyb25nJykuZWxlbWVudDtcclxuXHJcbiAgICB0aGlzLmFjdGl2ZVF1ZXN0aW9uID0gbnVsbDtcclxuICAgIHRoaXMuZWxlbWVudCA9IG51bGw7XHJcbiAgICB0aGlzLmxpdmVFbGVtZW50ID0gbnVsbDtcclxuICAgIHRoaXMubGl2ZUJ1dHRvbkVsZW1lbnQgPSBudWxsO1xyXG4gICAgdGhpcy5saXZlSW5kaWNhdG9yRWxlbWVudCA9IG51bGw7XHJcbiAgICB0aGlzLmxpdmVDb3JyZWN0UHJFbGVtZW50ID0gbnVsbDtcclxuICAgIHRoaXMubGl2ZVdyb25nUHJFbGVtZW50ID0gbnVsbDtcclxuICAgIHRoaXMubGl2ZVN0YXJzQ29sbGVjdGlvbiA9IG51bGw7XHJcbiAgICB0aGlzLmNvcnJlY3RBbnN3ZXJzID0gbnVsbDtcclxuICAgIHRoaXMud3JvbmdBbnN3ZXJzID0gbnVsbDtcclxuXHJcbiAgICB0aGlzLmJ1aWxkKCk7XHJcbiAgfVxyXG5cclxuICBidWlsZCgpIHtcclxuICAgIGNvbnN0IGNsYXNzTmFtZXMgPSAnZ2FtZS1jb250cm9scyBpbmFjdGl2ZSc7XHJcbiAgICBjb25zdCB0ZW1wbGF0ZSA9IGBcclxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiYnV0dG9uIGdhbWUtYnV0dG9uIHN0YXJ0LWJ1dHRvblwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgQnV0dG9uXHJcbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImdhbWUtcHJvZ3Jlc3NcIj5cclxuICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJnYW1lLWluZGljYXRvclwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgICA8cCBjbGFzcz1cImdhbWUtc2NvcmVcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJwcm9ncmVzcyBjb3JyZWN0XCI+MDwvc3Bhbj4gfCA8c3BhbiBjbGFzcz1cInByb2dyZXNzIHdyb25nXCI+MDwvc3Bhbj5cclxuICAgICAgICAgICAgICAgICAgICAgIDwvcD5cclxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICBgO1xyXG4gICAgdGhpcy5lbGVtZW50ID0gY3JlYXRlQ3VzdG9tRWxlbWVudCgnZGl2JywgY2xhc3NOYW1lcywgdGVtcGxhdGUpO1xyXG4gICAgcmV0dXJuIHRoaXM7XHJcbiAgfVxyXG5cclxuICBhZGRUb0RvYygpIHtcclxuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2hlYWRlcicpLmFwcGVuZCh0aGlzLmVsZW1lbnQpO1xyXG4gICAgW3RoaXMubGl2ZUVsZW1lbnRdID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnZ2FtZS1jb250cm9scycpO1xyXG4gICAgW3RoaXMubGl2ZUJ1dHRvbkVsZW1lbnRdID0gdGhpcy5saXZlRWxlbWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdnYW1lLWJ1dHRvbicpO1xyXG4gICAgW3RoaXMubGl2ZUluZGljYXRvckVsZW1lbnRdID0gdGhpcy5saXZlRWxlbWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdnYW1lLWluZGljYXRvcicpO1xyXG4gICAgW3RoaXMubGl2ZUNvcnJlY3RQckVsZW1lbnQsIHRoaXMubGl2ZVdyb25nUHJFbGVtZW50XSA9IHRoaXMubGl2ZUVsZW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgncHJvZ3Jlc3MnKTtcclxuICAgIHRoaXMubGl2ZVN0YXJzQ29sbGVjdGlvbiA9IHRoaXMubGl2ZUVsZW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnc3RhcicpO1xyXG5cclxuICAgIHJldHVybiB0aGlzO1xyXG4gIH1cclxuXHJcbiAgc2hvdygpIHtcclxuICAgIHRoaXMubGl2ZUVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZSgnaW5hY3RpdmUnKTtcclxuICAgIHJldHVybiB0aGlzO1xyXG4gIH1cclxuXHJcbiAgaGlkZSgpIHtcclxuICAgIHRoaXMubGl2ZUVsZW1lbnQuY2xhc3NMaXN0LmFkZCgnaW5hY3RpdmUnKTtcclxuICAgIHJldHVybiB0aGlzO1xyXG4gIH1cclxuXHJcbiAgc2hvd0dhbWVTdGF0KCkge1xyXG4gICAgcmV0dXJuIHRoaXM7XHJcbiAgfVxyXG5cclxuICBjcmVhdGVSYW5kb21RdWVzdGlvbnNCdW5kbGUoYXJyT3B0aW9ucykge1xyXG4gICAgdGhpcy5xdWVzdGlvbnNCdW5kbGUgPSBbXTtcclxuICAgIGNvbnN0IHdvcmtBcnIgPSBhcnJPcHRpb25zLm1hcCgoaXRlbSkgPT4gaXRlbSk7XHJcbiAgICB3aGlsZSAodGhpcy5xdWVzdGlvbnNCdW5kbGUubGVuZ3RoIDwgYXJyT3B0aW9ucy5sZW5ndGgpIHtcclxuICAgICAgY29uc3QgcmFuZG9tSW5kZXggPSBnZXRSYW5kb21JbnQod29ya0Fyci5sZW5ndGggLSAxKTtcclxuICAgICAgdGhpcy5xdWVzdGlvbnNCdW5kbGUucHVzaCguLi53b3JrQXJyLnNwbGljZShyYW5kb21JbmRleCwgMSkpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHRoaXM7XHJcbiAgfVxyXG5cclxuICBzdGFydEdhbWUoYXJyT3B0aW9ucykge1xyXG4gICAgY29uc29sZS5sb2coJzw8PCBnYW1lIHN0YXJ0ZWQgISEhID4+PicpO1xyXG4gICAgdGhpcy5pc0dhbWVTdGFydGVkID0gdHJ1ZTtcclxuICAgIHRoaXMuY29ycmVjdEFuc3dlcnMgPSAwO1xyXG4gICAgdGhpcy53cm9uZ0Fuc3dlcnMgPSAwO1xyXG4gICAgdGhpcy5zaG93R2FtZVN0YXQoKTsgLy8gIGlzbmB0IHdyaXR0ZW5cclxuICAgIHRoaXMuY3JlYXRlUmFuZG9tUXVlc3Rpb25zQnVuZGxlKGFyck9wdGlvbnMpO1xyXG4gICAgdGhpcy5hc2tRdWVzdGlvbigpO1xyXG4gICAgdGhpcy5jaGFuZ2VCdXR0b25DbGFzcygncmVwZWF0LWJ1dHRvbicpO1xyXG4gICAgcmV0dXJuIHRoaXM7XHJcbiAgfVxyXG5cclxuICBlbmRHYW1lKCkge1xyXG4gICAgdGhpcy5pc0dhbWVTdGFydGVkID0gZmFsc2U7XHJcbiAgICB0aGlzLmFjdGl2ZVF1ZXN0aW9uID0gbnVsbDtcclxuICAgIHRoaXMuY2hhbmdlQnV0dG9uQ2xhc3MoJ3N0YXJ0LWJ1dHRvbicpO1xyXG5cclxuICAgIGlmICh0aGlzLmNvcnJlY3RBbnN3ZXJzID09PSB0aGlzLmFwcENvbnRyb2wuY29udGVudC5jYXJkc0NvbGxlY3Rpb24ubGVuZ3RoXHJcbiAgICAgICAgJiYgdGhpcy5jb3JyZWN0QW5zd2VycyAhPT0gMCkge1xyXG4gICAgICBjb25zb2xlLmxvZyhgPDw8IEdhbWUgT3ZlciA9ICR7dGhpcy5jb3JyZWN0QW5zd2Vyc30vJHt0aGlzLndyb25nQW5zd2Vyc30gPj4+YCk7XHJcbiAgICAgIHRoaXMuY29ycmVjdEFuc3dlcnMgPSAwO1xyXG4gICAgICB0aGlzLmFwcENvbnRyb2wuY29udGVudC5wbGF5RmluYWxDbGlwKHRoaXMud3JvbmdBbnN3ZXJzKTtcclxuICAgICAgdGhpcy53cm9uZ0Fuc3dlcnMgPSAwO1xyXG5cclxuICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgdGhpcy5hcHBDb250cm9sLmNoYW5nZVBhZ2UoJ01haW4gcGFnZScpO1xyXG4gICAgICB9LCAzMDAwKTtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLmxpdmVDb3JyZWN0UHJFbGVtZW50LmlubmVySFRNTCA9ICcwJztcclxuICAgIHRoaXMubGl2ZVdyb25nUHJFbGVtZW50LmlubmVySFRNTCA9ICcwJztcclxuICAgIHRoaXMubGl2ZUluZGljYXRvckVsZW1lbnQuaW5uZXJIVE1MID0gJyc7XHJcbiAgICBjb25zb2xlLmxvZygnPDw8IEVuZCBnYW1lID4+PicpO1xyXG4gICAgcmV0dXJuIHRoaXM7XHJcbiAgfVxyXG5cclxuICBhc2tRdWVzdGlvbigpIHtcclxuICAgIGlmICh0aGlzLnF1ZXN0aW9uc0J1bmRsZS5sZW5ndGggIT09IDApIHtcclxuICAgICAgdGhpcy5hY3RpdmVRdWVzdGlvbiA9IHRoaXMucXVlc3Rpb25zQnVuZGxlLnBvcCgpO1xyXG4gICAgICB0aGlzLmFwcENvbnRyb2wucGxheUNhcmRTb3VuZCh0aGlzLmFjdGl2ZVF1ZXN0aW9uKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMuZW5kR2FtZSgpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHRoaXM7XHJcbiAgfVxyXG5cclxuICBwcm9jZXNzQW5zd2VyKGNhcmRPYmosIGNhcmRFbGVtZW50KSB7XHJcbiAgICBpZiAodGhpcy5saXZlU3RhcnNDb2xsZWN0aW9uLmxlbmd0aCA+PSA1KSB7XHJcbiAgICAgIHRoaXMubGl2ZUluZGljYXRvckVsZW1lbnQuZmlyc3RFbGVtZW50Q2hpbGQucmVtb3ZlKCk7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKE9iamVjdC5lbnRyaWVzKHRoaXMuYWN0aXZlUXVlc3Rpb24pLmV2ZXJ5KChba2V5LCB2YWx1ZV0pID0+IHZhbHVlID09PSBjYXJkT2JqW2tleV0pKSB7XHJcbiAgICAgIHRoaXMuY29ycmVjdEFuc3dlcigpO1xyXG4gICAgICBjYXJkRWxlbWVudC5jbGFzc0xpc3QuYWRkKCdkaXNhYmxlZCcpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy53cm9uZ0Fuc3dlcigpO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiB0aGlzO1xyXG4gIH1cclxuXHJcbiAgY29ycmVjdEFuc3dlcigpIHtcclxuICAgIHRoaXMuYXBwQ29udHJvbC5wbGF5QXBwU291bmQoJ2NvcnJlY3QnKTtcclxuICAgIHRoaXMuY29ycmVjdEFuc3dlcnMgKz0gMTtcclxuICAgIHRoaXMubGl2ZUNvcnJlY3RQckVsZW1lbnQuaW5uZXJIVE1MID0gdGhpcy5jb3JyZWN0QW5zd2VycztcclxuICAgIHRoaXMubGl2ZUluZGljYXRvckVsZW1lbnQuYXBwZW5kKG5ldyBTdGFyKCkuZWxlbWVudCk7XHJcbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgdGhpcy5hc2tRdWVzdGlvbigpO1xyXG4gICAgfSwgMTAwMCk7XHJcblxyXG4gICAgcmV0dXJuIHRoaXM7XHJcbiAgfVxyXG5cclxuICB3cm9uZ0Fuc3dlcigpIHtcclxuICAgIHRoaXMuYXBwQ29udHJvbC5wbGF5QXBwU291bmQoJ3dyb25nJyk7XHJcbiAgICB0aGlzLndyb25nQW5zd2VycyArPSAxO1xyXG4gICAgdGhpcy5saXZlV3JvbmdQckVsZW1lbnQuaW5uZXJIVE1MID0gdGhpcy53cm9uZ0Fuc3dlcnM7XHJcbiAgICB0aGlzLmxpdmVJbmRpY2F0b3JFbGVtZW50LmFwcGVuZChuZXcgU3Rhcignd3JvbmcnKS5lbGVtZW50KTtcclxuICAgIHJldHVybiB0aGlzO1xyXG4gIH1cclxuXHJcbiAgcmVwZWF0UXVlc3Rpb24oKSB7XHJcbiAgICB0aGlzLmFwcENvbnRyb2wucGxheUNhcmRTb3VuZCh0aGlzLmFjdGl2ZVF1ZXN0aW9uKTtcclxuICAgIHJldHVybiB0aGlzO1xyXG4gIH1cclxuXHJcbiAgY2hhbmdlQnV0dG9uQ2xhc3MoYnV0dG9uQ2xhc3NOYW1lKSB7XHJcbiAgICBjb25zdCByZW1vdmVkQ2xhc3NOYW1lID0gKGJ1dHRvbkNsYXNzTmFtZSA9PT0gJ3N0YXJ0LWJ1dHRvbicpID8gJ3JlcGVhdC1idXR0b24nIDogJ3N0YXJ0LWJ1dHRvbic7XHJcbiAgICB0aGlzLmxpdmVCdXR0b25FbGVtZW50LmNsYXNzTGlzdC5hZGQoYnV0dG9uQ2xhc3NOYW1lKTtcclxuICAgIHRoaXMubGl2ZUJ1dHRvbkVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZShyZW1vdmVkQ2xhc3NOYW1lKTtcclxuICAgIHJldHVybiB0aGlzO1xyXG4gIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgZ2FtZUNvbnRyb2w7XHJcbiIsIi8qIGVzbGludC1kaXNhYmxlIGxpbmVicmVhay1zdHlsZSAqL1xyXG4vKiBlc2xpbnQtZGlzYWJsZSBuby1jb25zb2xlICovXHJcbi8qIGVzbGludC1kaXNhYmxlIGxpbmVicmVhay1zdHlsZSAqL1xyXG4vKiBlc2xpbnQtZGlzYWJsZSBjb25zaXN0ZW50LXJldHVybiAqL1xyXG4vKiBlc2xpbnQtZGlzYWJsZSBuby1yZXN0cmljdGVkLXN5bnRheCAqL1xyXG4vKiBlc2xpbnQtZGlzYWJsZSBuby11bmRlZiAqL1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTWVudUVsZW1lbnQge1xyXG4gIGNvbnN0cnVjdG9yKHRvcGljc0Fyciwgc3RhcnRNZW51ID0gJ01haW4gcGFnZScsIGVuZE1lbnUgPSAnU3RhdGlzdGljJykge1xyXG4gICAgdGhpcy5vcGVuZWRNZW51Q29sbGVjdGlvbnMgPSBbXHJcbiAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKCdib2R5JyksXHJcbiAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ21lbnUnKSxcclxuICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnbWVudS1idXR0b24nKSxcclxuICAgIF07XHJcbiAgICB0aGlzLnRvcGljc0FyciA9IHRvcGljc0FycjtcclxuICAgIHRoaXMuc3RhcnRNZW51ID0gc3RhcnRNZW51O1xyXG4gICAgdGhpcy5lbmRNZW51ID0gZW5kTWVudTtcclxuICAgIHRoaXMuYWN0aXZlUGFnZSA9IHRoaXMuc3RhcnRNZW51LnRvTG93ZXJDYXNlKCk7XHJcbiAgICB0aGlzLm1lbnVJdGVtc0VsZW1lbnRzID0gbnVsbDtcclxuICAgIHRoaXMuZWxlbWVudCA9IG51bGw7XHJcblxyXG4gICAgdGhpcy5idWlsZCgpO1xyXG4gIH1cclxuXHJcbiAgYnVpbGQoKSB7XHJcbiAgICBmdW5jdGlvbiBjcmVhdGVMaSh0b3BpY05hbWUgPSAnJykge1xyXG4gICAgICBjb25zdCBlbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGknKTtcclxuICAgICAgZWxlbWVudC5jbGFzc05hbWUgPSAnYnV0dG9uIG1lbnUtaXRlbSc7XHJcbiAgICAgIGVsZW1lbnQuaW5uZXJIVE1MID0gdG9waWNOYW1lO1xyXG4gICAgICByZXR1cm4gZWxlbWVudDtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCB1bEVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd1bCcpO1xyXG4gICAgdWxFbGVtZW50LmNsYXNzTmFtZSA9ICdtZW51LWxpc3QnO1xyXG5cclxuICAgIHVsRWxlbWVudC5hcHBlbmQoY3JlYXRlTGkodGhpcy5zdGFydE1lbnUpKTtcclxuICAgIHRoaXMudG9waWNzQXJyLmZvckVhY2goKHRvcGljTmFtZSkgPT4gdWxFbGVtZW50LmFwcGVuZChjcmVhdGVMaSh0b3BpY05hbWUpKSk7XHJcbiAgICB1bEVsZW1lbnQuYXBwZW5kKGNyZWF0ZUxpKHRoaXMuZW5kTWVudSkpO1xyXG5cclxuICAgIGNvbnN0IG1lbnVFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbmF2Jyk7XHJcbiAgICBtZW51RWxlbWVudC5jbGFzc05hbWUgPSAnbWVudSc7XHJcbiAgICBtZW51RWxlbWVudC5hcHBlbmQodWxFbGVtZW50KTtcclxuICAgIHRoaXMuZWxlbWVudCA9IG1lbnVFbGVtZW50O1xyXG4gICAgcmV0dXJuIHRoaXM7XHJcbiAgfVxyXG5cclxuICBhZGRUb0RvYygpIHtcclxuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5tYWluLWNvbnRyb2xzJykucHJlcGVuZCh0aGlzLmVsZW1lbnQpO1xyXG4gICAgdGhpcy5tZW51SXRlbXNFbGVtZW50cyA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ21lbnUtaXRlbScpO1xyXG4gICAgdGhpcy5zZXRBY3RpdmVUb3BpYyh0aGlzLm1lbnVJdGVtc0VsZW1lbnRzWzBdLmlubmVySFRNTCk7XHJcbiAgICByZXR1cm4gdGhpcztcclxuICB9XHJcblxyXG4gIHRvZ2dsZSgpIHtcclxuICAgIHRoaXMub3BlbmVkTWVudUNvbGxlY3Rpb25zLm1hcCgoaHRtbENvbGxlY3Rpb24pID0+IGh0bWxDb2xsZWN0aW9uWzBdLmNsYXNzTGlzdC50b2dnbGUoJ29wZW5lZC1tZW51JykpO1xyXG4gICAgcmV0dXJuIHRoaXM7XHJcbiAgfVxyXG5cclxuICBjbG9zZSgpIHtcclxuICAgIHRoaXMub3BlbmVkTWVudUNvbGxlY3Rpb25zLm1hcCgoaHRtbENvbGxlY3Rpb24pID0+IGh0bWxDb2xsZWN0aW9uWzBdLmNsYXNzTGlzdC5yZW1vdmUoJ29wZW5lZC1tZW51JykpO1xyXG4gIH1cclxuXHJcbiAgc2V0QWN0aXZlVG9waWModG9waWNOYW1lKSB7XHJcbiAgICBjb25zdCBjbGFzc05hbWUgPSAnYWN0aXZlLXBhZ2UnO1xyXG4gICAgY29uc3QgdG9waWNFbGVtZW50ID0gdGhpcy5nZXRNZW51SXRlbUJ5TmFtZSh0b3BpY05hbWUpO1xyXG4gICAgdGhpcy5hY3RpdmVQYWdlID0gdG9waWNOYW1lLnRvTG93ZXJDYXNlKCk7XHJcbiAgICBmb3IgKGNvbnN0IG1lbnVJdGVtRWxlbWVudCBvZiB0aGlzLm1lbnVJdGVtc0VsZW1lbnRzKSB7XHJcbiAgICAgIG1lbnVJdGVtRWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKGNsYXNzTmFtZSk7XHJcbiAgICB9XHJcbiAgICB0b3BpY0VsZW1lbnQuY2xhc3NMaXN0LmFkZChjbGFzc05hbWUpO1xyXG5cclxuICAgIHJldHVybiB0aGlzO1xyXG4gIH1cclxuXHJcbiAgZ2V0TWVudUl0ZW1CeU5hbWUoaXRlbU5hbWUpIHtcclxuICAgIGZvciAoY29uc3QgZWxlbWVudCBvZiB0aGlzLm1lbnVJdGVtc0VsZW1lbnRzKSB7XHJcbiAgICAgIGlmIChlbGVtZW50LmlubmVySFRNTC50b0xvd2VyQ2FzZSgpID09PSBpdGVtTmFtZS50b0xvd2VyQ2FzZSgpKSB7XHJcbiAgICAgICAgcmV0dXJuIGVsZW1lbnQ7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcbn1cclxuIiwiLyogZXNsaW50LWRpc2FibGUgbGluZWJyZWFrLXN0eWxlICovXHJcblxyXG5pbXBvcnQgeyBjcmVhdGVDdXN0b21FbGVtZW50IH0gZnJvbSAnLi9jb21tb25GdW5jdCc7XHJcblxyXG5jbGFzcyBTdGFyIHtcclxuICBjb25zdHJ1Y3Rvcih0eXBlID0gJ2NvcnJlY3QnKSB7XHJcbiAgICB0aGlzLnR5cGUgPSAodHlwZSA9PT0gJ2NvcnJlY3QnKSA/IHR5cGUgOiAnd3JvbmcnO1xyXG4gICAgY29uc3QgY2xhc3NOYW1lcyA9IGBncmFwaGljIHN0YXIgc3Rhci0ke3RoaXMudHlwZX1gO1xyXG4gICAgbGV0IGltYWdlU3JjO1xyXG5cclxuICAgIGlmICh0aGlzLnR5cGUgPT09ICdjb3JyZWN0Jykge1xyXG4gICAgICBpbWFnZVNyYyA9ICdhcHAvc3Rhci13aW4uc3ZnJztcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGltYWdlU3JjID0gJ2FwcC9zdGFyLnN2Zyc7XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgdGVtcGxhdGUgPSBgXHJcbiAgICAgICAgICAgICAgICAgICAgICA8aW1nIGNsYXNzPVwic3Rhci1pbWFnZVwiIHNyYz1cIi4uL2Fzc2V0cy9pbWcvJHtpbWFnZVNyY31cIiBhbHQ9XCIke3RoaXMudHlwZX0gc3RhclwiIHdpZHRoPVwiNDBcIiBoZWlnaHQ9XCI0MFwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgYDtcclxuICAgIHRoaXMuZWxlbWVudCA9IGNyZWF0ZUN1c3RvbUVsZW1lbnQoJ2RpdicsIGNsYXNzTmFtZXMsIHRlbXBsYXRlKTtcclxuICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IFN0YXI7XHJcbiIsIi8qIGVzbGludC1kaXNhYmxlIGxpbmVicmVhay1zdHlsZSAqL1xyXG4vKiBlc2xpbnQtZGlzYWJsZSBuby1jb25zb2xlICovXHJcbi8qIGVzbGludC1kaXNhYmxlIGxpbmVicmVhay1zdHlsZSAqL1xyXG4vKiBlc2xpbnQtZGlzYWJsZSBuby11bmRlZiAqL1xyXG5cclxuaW1wb3J0IHsgY3JlYXRlQ3VzdG9tRWxlbWVudCB9IGZyb20gJy4vY29tbW9uRnVuY3QnO1xyXG5cclxuY2xhc3MgU3dpdGNoIHtcclxuICBjb25zdHJ1Y3RvcihhcHBDdHJsT2JqKSB7XHJcbiAgICB0aGlzLnZhbGlkTW9kZXMgPSBbJ3RyYWluJywgJ3BsYXknXTtcclxuICAgIHRoaXMuYWN0aXZlTW9kZSA9ICd0cmFpbic7XHJcbiAgICB0aGlzLmFwcENvbnRyb2wgPSBhcHBDdHJsT2JqO1xyXG4gICAgdGhpcy5lbGVtZW50ID0gbnVsbDtcclxuICAgIHRoaXMuYnVpbGQoKTtcclxuICB9XHJcblxyXG4gIGJ1aWxkKCkge1xyXG4gICAgY29uc3QgY2xhc3NOYW1lcyA9ICdidXR0b24gc3dpdGNoJztcclxuICAgIGNvbnN0IHRlbXBsYXRlID0gYFxyXG4gICAgICAgICAgICAgICAgICAgIDxwIGNsYXNzPVwic3dpdGNoLXRyaWdnZXJcIj5UcmFpbjwvcD5cclxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwic3dpdGNoLXJhaWxcIj5cclxuICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJzd2l0Y2gtcm9sbGVyXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICA8cCBjbGFzcz1cInN3aXRjaC10cmlnZ2VyXCI+UGxheTwvcD5cclxuICAgICAgICAgICAgICAgICAgICBgO1xyXG5cclxuICAgIHRoaXMuZWxlbWVudCA9IGNyZWF0ZUN1c3RvbUVsZW1lbnQoJ2RpdicsIGNsYXNzTmFtZXMsIHRlbXBsYXRlKTtcclxuICAgIHJldHVybiB0aGlzO1xyXG4gIH1cclxuXHJcbiAgYWRkVG9Eb2MoKSB7XHJcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubWFpbi1jb250cm9scycpLmFwcGVuZCh0aGlzLmVsZW1lbnQpO1xyXG4gICAgcmV0dXJuIHRoaXM7XHJcbiAgfVxyXG5cclxuICB0b2dnbGUoKSB7XHJcbiAgICB0aGlzLmVsZW1lbnQuY2xhc3NMaXN0LnRvZ2dsZSgnc3dpdGNoLW9uJyk7XHJcbiAgICB0aGlzLmFjdGl2ZU1vZGUgPSAodGhpcy5hY3RpdmVNb2RlID09PSAncGxheScpID8gJ3RyYWluJyA6ICdwbGF5JztcclxuICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IFN3aXRjaDtcclxuIiwiLy8gSW1wb3J0c1xuaW1wb3J0IF9fX0NTU19MT0FERVJfQVBJX1NPVVJDRU1BUF9JTVBPUlRfX18gZnJvbSBcIi4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9zb3VyY2VNYXBzLmpzXCI7XG5pbXBvcnQgX19fQ1NTX0xPQURFUl9BUElfSU1QT1JUX19fIGZyb20gXCIuLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvYXBpLmpzXCI7XG52YXIgX19fQ1NTX0xPQURFUl9FWFBPUlRfX18gPSBfX19DU1NfTE9BREVSX0FQSV9JTVBPUlRfX18oX19fQ1NTX0xPQURFUl9BUElfU09VUkNFTUFQX0lNUE9SVF9fXyk7XG4vLyBNb2R1bGVcbl9fX0NTU19MT0FERVJfRVhQT1JUX19fLnB1c2goW21vZHVsZS5pZCwgXCIvKiEgbm9ybWFsaXplLmNzcyB2OC4wLjEgfCBNSVQgTGljZW5zZSB8IGdpdGh1Yi5jb20vbmVjb2xhcy9ub3JtYWxpemUuY3NzICovXFxyXFxuXFxyXFxuLyogRG9jdW1lbnRcXHJcXG4gICA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PSAqL1xcclxcblxcclxcbi8qKlxcclxcbiAqIDEuIENvcnJlY3QgdGhlIGxpbmUgaGVpZ2h0IGluIGFsbCBicm93c2Vycy5cXHJcXG4gKiAyLiBQcmV2ZW50IGFkanVzdG1lbnRzIG9mIGZvbnQgc2l6ZSBhZnRlciBvcmllbnRhdGlvbiBjaGFuZ2VzIGluIGlPUy5cXHJcXG4gKi9cXHJcXG5cXHJcXG5odG1sIHtcXHJcXG4gIGxpbmUtaGVpZ2h0OiAxLjE1OyAvKiAxICovXFxyXFxuICAtd2Via2l0LXRleHQtc2l6ZS1hZGp1c3Q6IDEwMCU7IC8qIDIgKi9cXHJcXG59XFxyXFxuXFxyXFxuLyogU2VjdGlvbnNcXHJcXG4gICA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PSAqL1xcclxcblxcclxcbi8qKlxcclxcbiAqIFJlbW92ZSB0aGUgbWFyZ2luIGluIGFsbCBicm93c2Vycy5cXHJcXG4gKi9cXHJcXG5cXHJcXG5ib2R5IHtcXHJcXG4gIG1hcmdpbjogMDtcXHJcXG59XFxyXFxuXFxyXFxuLyoqXFxyXFxuICogUmVuZGVyIHRoZSBgbWFpbmAgZWxlbWVudCBjb25zaXN0ZW50bHkgaW4gSUUuXFxyXFxuICovXFxyXFxuXFxyXFxubWFpbiB7XFxyXFxuICBkaXNwbGF5OiBibG9jaztcXHJcXG59XFxyXFxuXFxyXFxuLyoqXFxyXFxuICogQ29ycmVjdCB0aGUgZm9udCBzaXplIGFuZCBtYXJnaW4gb24gYGgxYCBlbGVtZW50cyB3aXRoaW4gYHNlY3Rpb25gIGFuZFxcclxcbiAqIGBhcnRpY2xlYCBjb250ZXh0cyBpbiBDaHJvbWUsIEZpcmVmb3gsIGFuZCBTYWZhcmkuXFxyXFxuICovXFxyXFxuXFxyXFxuaDEge1xcclxcbiAgZm9udC1zaXplOiAyZW07XFxyXFxuICBtYXJnaW46IDAuNjdlbSAwO1xcclxcbn1cXHJcXG5cXHJcXG4vKiBHcm91cGluZyBjb250ZW50XFxyXFxuICAgPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0gKi9cXHJcXG5cXHJcXG4vKipcXHJcXG4gKiAxLiBBZGQgdGhlIGNvcnJlY3QgYm94IHNpemluZyBpbiBGaXJlZm94LlxcclxcbiAqIDIuIFNob3cgdGhlIG92ZXJmbG93IGluIEVkZ2UgYW5kIElFLlxcclxcbiAqL1xcclxcblxcclxcbmhyIHtcXHJcXG4gIGJveC1zaXppbmc6IGNvbnRlbnQtYm94OyAvKiAxICovXFxyXFxuICBoZWlnaHQ6IDA7IC8qIDEgKi9cXHJcXG4gIG92ZXJmbG93OiB2aXNpYmxlOyAvKiAyICovXFxyXFxufVxcclxcblxcclxcbi8qKlxcclxcbiAqIDEuIENvcnJlY3QgdGhlIGluaGVyaXRhbmNlIGFuZCBzY2FsaW5nIG9mIGZvbnQgc2l6ZSBpbiBhbGwgYnJvd3NlcnMuXFxyXFxuICogMi4gQ29ycmVjdCB0aGUgb2RkIGBlbWAgZm9udCBzaXppbmcgaW4gYWxsIGJyb3dzZXJzLlxcclxcbiAqL1xcclxcblxcclxcbnByZSB7XFxyXFxuICBmb250LWZhbWlseTogbW9ub3NwYWNlLCBtb25vc3BhY2U7IC8qIDEgKi9cXHJcXG4gIGZvbnQtc2l6ZTogMWVtOyAvKiAyICovXFxyXFxufVxcclxcblxcclxcbi8qIFRleHQtbGV2ZWwgc2VtYW50aWNzXFxyXFxuICAgPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0gKi9cXHJcXG5cXHJcXG4vKipcXHJcXG4gKiBSZW1vdmUgdGhlIGdyYXkgYmFja2dyb3VuZCBvbiBhY3RpdmUgbGlua3MgaW4gSUUgMTAuXFxyXFxuICovXFxyXFxuXFxyXFxuYSB7XFxyXFxuICBiYWNrZ3JvdW5kLWNvbG9yOiB0cmFuc3BhcmVudDtcXHJcXG59XFxyXFxuXFxyXFxuLyoqXFxyXFxuICogMS4gUmVtb3ZlIHRoZSBib3R0b20gYm9yZGVyIGluIENocm9tZSA1Ny1cXHJcXG4gKiAyLiBBZGQgdGhlIGNvcnJlY3QgdGV4dCBkZWNvcmF0aW9uIGluIENocm9tZSwgRWRnZSwgSUUsIE9wZXJhLCBhbmQgU2FmYXJpLlxcclxcbiAqL1xcclxcblxcclxcbmFiYnJbdGl0bGVdIHtcXHJcXG4gIGJvcmRlci1ib3R0b206IG5vbmU7IC8qIDEgKi9cXHJcXG4gIHRleHQtZGVjb3JhdGlvbjogdW5kZXJsaW5lOyAvKiAyICovXFxyXFxuICB0ZXh0LWRlY29yYXRpb246IHVuZGVybGluZSBkb3R0ZWQ7IC8qIDIgKi9cXHJcXG59XFxyXFxuXFxyXFxuLyoqXFxyXFxuICogQWRkIHRoZSBjb3JyZWN0IGZvbnQgd2VpZ2h0IGluIENocm9tZSwgRWRnZSwgYW5kIFNhZmFyaS5cXHJcXG4gKi9cXHJcXG5cXHJcXG5iLFxcclxcbnN0cm9uZyB7XFxyXFxuICBmb250LXdlaWdodDogYm9sZGVyO1xcclxcbn1cXHJcXG5cXHJcXG4vKipcXHJcXG4gKiAxLiBDb3JyZWN0IHRoZSBpbmhlcml0YW5jZSBhbmQgc2NhbGluZyBvZiBmb250IHNpemUgaW4gYWxsIGJyb3dzZXJzLlxcclxcbiAqIDIuIENvcnJlY3QgdGhlIG9kZCBgZW1gIGZvbnQgc2l6aW5nIGluIGFsbCBicm93c2Vycy5cXHJcXG4gKi9cXHJcXG5cXHJcXG5jb2RlLFxcclxcbmtiZCxcXHJcXG5zYW1wIHtcXHJcXG4gIGZvbnQtZmFtaWx5OiBtb25vc3BhY2UsIG1vbm9zcGFjZTsgLyogMSAqL1xcclxcbiAgZm9udC1zaXplOiAxZW07IC8qIDIgKi9cXHJcXG59XFxyXFxuXFxyXFxuLyoqXFxyXFxuICogQWRkIHRoZSBjb3JyZWN0IGZvbnQgc2l6ZSBpbiBhbGwgYnJvd3NlcnMuXFxyXFxuICovXFxyXFxuXFxyXFxuc21hbGwge1xcclxcbiAgZm9udC1zaXplOiA4MCU7XFxyXFxufVxcclxcblxcclxcbi8qKlxcclxcbiAqIFByZXZlbnQgYHN1YmAgYW5kIGBzdXBgIGVsZW1lbnRzIGZyb20gYWZmZWN0aW5nIHRoZSBsaW5lIGhlaWdodCBpblxcclxcbiAqIGFsbCBicm93c2Vycy5cXHJcXG4gKi9cXHJcXG5cXHJcXG5zdWIsXFxyXFxuc3VwIHtcXHJcXG4gIGZvbnQtc2l6ZTogNzUlO1xcclxcbiAgbGluZS1oZWlnaHQ6IDA7XFxyXFxuICBwb3NpdGlvbjogcmVsYXRpdmU7XFxyXFxuICB2ZXJ0aWNhbC1hbGlnbjogYmFzZWxpbmU7XFxyXFxufVxcclxcblxcclxcbnN1YiB7XFxyXFxuICBib3R0b206IC0wLjI1ZW07XFxyXFxufVxcclxcblxcclxcbnN1cCB7XFxyXFxuICB0b3A6IC0wLjVlbTtcXHJcXG59XFxyXFxuXFxyXFxuLyogRW1iZWRkZWQgY29udGVudFxcclxcbiAgID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09ICovXFxyXFxuXFxyXFxuLyoqXFxyXFxuICogUmVtb3ZlIHRoZSBib3JkZXIgb24gaW1hZ2VzIGluc2lkZSBsaW5rcyBpbiBJRSAxMC5cXHJcXG4gKi9cXHJcXG5cXHJcXG5pbWcge1xcclxcbiAgYm9yZGVyLXN0eWxlOiBub25lO1xcclxcbn1cXHJcXG5cXHJcXG4vKiBGb3Jtc1xcclxcbiAgID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09ICovXFxyXFxuXFxyXFxuLyoqXFxyXFxuICogMS4gQ2hhbmdlIHRoZSBmb250IHN0eWxlcyBpbiBhbGwgYnJvd3NlcnMuXFxyXFxuICogMi4gUmVtb3ZlIHRoZSBtYXJnaW4gaW4gRmlyZWZveCBhbmQgU2FmYXJpLlxcclxcbiAqL1xcclxcblxcclxcbmJ1dHRvbixcXHJcXG5pbnB1dCxcXHJcXG5vcHRncm91cCxcXHJcXG5zZWxlY3QsXFxyXFxudGV4dGFyZWEge1xcclxcbiAgZm9udC1mYW1pbHk6IGluaGVyaXQ7IC8qIDEgKi9cXHJcXG4gIGZvbnQtc2l6ZTogMTAwJTsgLyogMSAqL1xcclxcbiAgbGluZS1oZWlnaHQ6IDEuMTU7IC8qIDEgKi9cXHJcXG4gIG1hcmdpbjogMDsgLyogMiAqL1xcclxcbn1cXHJcXG5cXHJcXG4vKipcXHJcXG4gKiBTaG93IHRoZSBvdmVyZmxvdyBpbiBJRS5cXHJcXG4gKiAxLiBTaG93IHRoZSBvdmVyZmxvdyBpbiBFZGdlLlxcclxcbiAqL1xcclxcblxcclxcbmJ1dHRvbixcXHJcXG5pbnB1dCB7IC8qIDEgKi9cXHJcXG4gIG92ZXJmbG93OiB2aXNpYmxlO1xcclxcbn1cXHJcXG5cXHJcXG4vKipcXHJcXG4gKiBSZW1vdmUgdGhlIGluaGVyaXRhbmNlIG9mIHRleHQgdHJhbnNmb3JtIGluIEVkZ2UsIEZpcmVmb3gsIGFuZCBJRS5cXHJcXG4gKiAxLiBSZW1vdmUgdGhlIGluaGVyaXRhbmNlIG9mIHRleHQgdHJhbnNmb3JtIGluIEZpcmVmb3guXFxyXFxuICovXFxyXFxuXFxyXFxuYnV0dG9uLFxcclxcbnNlbGVjdCB7IC8qIDEgKi9cXHJcXG4gIHRleHQtdHJhbnNmb3JtOiBub25lO1xcclxcbn1cXHJcXG5cXHJcXG4vKipcXHJcXG4gKiBDb3JyZWN0IHRoZSBpbmFiaWxpdHkgdG8gc3R5bGUgY2xpY2thYmxlIHR5cGVzIGluIGlPUyBhbmQgU2FmYXJpLlxcclxcbiAqL1xcclxcblxcclxcbmJ1dHRvbixcXHJcXG5bdHlwZT1cXFwiYnV0dG9uXFxcIl0sXFxyXFxuW3R5cGU9XFxcInJlc2V0XFxcIl0sXFxyXFxuW3R5cGU9XFxcInN1Ym1pdFxcXCJdIHtcXHJcXG4gIC13ZWJraXQtYXBwZWFyYW5jZTogYnV0dG9uO1xcclxcbn1cXHJcXG5cXHJcXG4vKipcXHJcXG4gKiBSZW1vdmUgdGhlIGlubmVyIGJvcmRlciBhbmQgcGFkZGluZyBpbiBGaXJlZm94LlxcclxcbiAqL1xcclxcblxcclxcbmJ1dHRvbjo6LW1vei1mb2N1cy1pbm5lcixcXHJcXG5bdHlwZT1cXFwiYnV0dG9uXFxcIl06Oi1tb3otZm9jdXMtaW5uZXIsXFxyXFxuW3R5cGU9XFxcInJlc2V0XFxcIl06Oi1tb3otZm9jdXMtaW5uZXIsXFxyXFxuW3R5cGU9XFxcInN1Ym1pdFxcXCJdOjotbW96LWZvY3VzLWlubmVyIHtcXHJcXG4gIGJvcmRlci1zdHlsZTogbm9uZTtcXHJcXG4gIHBhZGRpbmc6IDA7XFxyXFxufVxcclxcblxcclxcbi8qKlxcclxcbiAqIFJlc3RvcmUgdGhlIGZvY3VzIHN0eWxlcyB1bnNldCBieSB0aGUgcHJldmlvdXMgcnVsZS5cXHJcXG4gKi9cXHJcXG5cXHJcXG5idXR0b246LW1vei1mb2N1c3JpbmcsXFxyXFxuW3R5cGU9XFxcImJ1dHRvblxcXCJdOi1tb3otZm9jdXNyaW5nLFxcclxcblt0eXBlPVxcXCJyZXNldFxcXCJdOi1tb3otZm9jdXNyaW5nLFxcclxcblt0eXBlPVxcXCJzdWJtaXRcXFwiXTotbW96LWZvY3VzcmluZyB7XFxyXFxuICBvdXRsaW5lOiAxcHggZG90dGVkIEJ1dHRvblRleHQ7XFxyXFxufVxcclxcblxcclxcbi8qKlxcclxcbiAqIENvcnJlY3QgdGhlIHBhZGRpbmcgaW4gRmlyZWZveC5cXHJcXG4gKi9cXHJcXG5cXHJcXG5maWVsZHNldCB7XFxyXFxuICBwYWRkaW5nOiAwLjM1ZW0gMC43NWVtIDAuNjI1ZW07XFxyXFxufVxcclxcblxcclxcbi8qKlxcclxcbiAqIDEuIENvcnJlY3QgdGhlIHRleHQgd3JhcHBpbmcgaW4gRWRnZSBhbmQgSUUuXFxyXFxuICogMi4gQ29ycmVjdCB0aGUgY29sb3IgaW5oZXJpdGFuY2UgZnJvbSBgZmllbGRzZXRgIGVsZW1lbnRzIGluIElFLlxcclxcbiAqIDMuIFJlbW92ZSB0aGUgcGFkZGluZyBzbyBkZXZlbG9wZXJzIGFyZSBub3QgY2F1Z2h0IG91dCB3aGVuIHRoZXkgemVybyBvdXRcXHJcXG4gKiAgICBgZmllbGRzZXRgIGVsZW1lbnRzIGluIGFsbCBicm93c2Vycy5cXHJcXG4gKi9cXHJcXG5cXHJcXG5sZWdlbmQge1xcclxcbiAgYm94LXNpemluZzogYm9yZGVyLWJveDsgLyogMSAqL1xcclxcbiAgY29sb3I6IGluaGVyaXQ7IC8qIDIgKi9cXHJcXG4gIGRpc3BsYXk6IHRhYmxlOyAvKiAxICovXFxyXFxuICBtYXgtd2lkdGg6IDEwMCU7IC8qIDEgKi9cXHJcXG4gIHBhZGRpbmc6IDA7IC8qIDMgKi9cXHJcXG4gIHdoaXRlLXNwYWNlOiBub3JtYWw7IC8qIDEgKi9cXHJcXG59XFxyXFxuXFxyXFxuLyoqXFxyXFxuICogQWRkIHRoZSBjb3JyZWN0IHZlcnRpY2FsIGFsaWdubWVudCBpbiBDaHJvbWUsIEZpcmVmb3gsIGFuZCBPcGVyYS5cXHJcXG4gKi9cXHJcXG5cXHJcXG5wcm9ncmVzcyB7XFxyXFxuICB2ZXJ0aWNhbC1hbGlnbjogYmFzZWxpbmU7XFxyXFxufVxcclxcblxcclxcbi8qKlxcclxcbiAqIFJlbW92ZSB0aGUgZGVmYXVsdCB2ZXJ0aWNhbCBzY3JvbGxiYXIgaW4gSUUgMTArLlxcclxcbiAqL1xcclxcblxcclxcbnRleHRhcmVhIHtcXHJcXG4gIG92ZXJmbG93OiBhdXRvO1xcclxcbn1cXHJcXG5cXHJcXG4vKipcXHJcXG4gKiAxLiBBZGQgdGhlIGNvcnJlY3QgYm94IHNpemluZyBpbiBJRSAxMC5cXHJcXG4gKiAyLiBSZW1vdmUgdGhlIHBhZGRpbmcgaW4gSUUgMTAuXFxyXFxuICovXFxyXFxuXFxyXFxuW3R5cGU9XFxcImNoZWNrYm94XFxcIl0sXFxyXFxuW3R5cGU9XFxcInJhZGlvXFxcIl0ge1xcclxcbiAgYm94LXNpemluZzogYm9yZGVyLWJveDsgLyogMSAqL1xcclxcbiAgcGFkZGluZzogMDsgLyogMiAqL1xcclxcbn1cXHJcXG5cXHJcXG4vKipcXHJcXG4gKiBDb3JyZWN0IHRoZSBjdXJzb3Igc3R5bGUgb2YgaW5jcmVtZW50IGFuZCBkZWNyZW1lbnQgYnV0dG9ucyBpbiBDaHJvbWUuXFxyXFxuICovXFxyXFxuXFxyXFxuW3R5cGU9XFxcIm51bWJlclxcXCJdOjotd2Via2l0LWlubmVyLXNwaW4tYnV0dG9uLFxcclxcblt0eXBlPVxcXCJudW1iZXJcXFwiXTo6LXdlYmtpdC1vdXRlci1zcGluLWJ1dHRvbiB7XFxyXFxuICBoZWlnaHQ6IGF1dG87XFxyXFxufVxcclxcblxcclxcbi8qKlxcclxcbiAqIDEuIENvcnJlY3QgdGhlIG9kZCBhcHBlYXJhbmNlIGluIENocm9tZSBhbmQgU2FmYXJpLlxcclxcbiAqIDIuIENvcnJlY3QgdGhlIG91dGxpbmUgc3R5bGUgaW4gU2FmYXJpLlxcclxcbiAqL1xcclxcblxcclxcblt0eXBlPVxcXCJzZWFyY2hcXFwiXSB7XFxyXFxuICAtd2Via2l0LWFwcGVhcmFuY2U6IHRleHRmaWVsZDsgLyogMSAqL1xcclxcbiAgb3V0bGluZS1vZmZzZXQ6IC0ycHg7IC8qIDIgKi9cXHJcXG59XFxyXFxuXFxyXFxuLyoqXFxyXFxuICogUmVtb3ZlIHRoZSBpbm5lciBwYWRkaW5nIGluIENocm9tZSBhbmQgU2FmYXJpIG9uIG1hY09TLlxcclxcbiAqL1xcclxcblxcclxcblt0eXBlPVxcXCJzZWFyY2hcXFwiXTo6LXdlYmtpdC1zZWFyY2gtZGVjb3JhdGlvbiB7XFxyXFxuICAtd2Via2l0LWFwcGVhcmFuY2U6IG5vbmU7XFxyXFxufVxcclxcblxcclxcbi8qKlxcclxcbiAqIDEuIENvcnJlY3QgdGhlIGluYWJpbGl0eSB0byBzdHlsZSBjbGlja2FibGUgdHlwZXMgaW4gaU9TIGFuZCBTYWZhcmkuXFxyXFxuICogMi4gQ2hhbmdlIGZvbnQgcHJvcGVydGllcyB0byBgaW5oZXJpdGAgaW4gU2FmYXJpLlxcclxcbiAqL1xcclxcblxcclxcbjo6LXdlYmtpdC1maWxlLXVwbG9hZC1idXR0b24ge1xcclxcbiAgLXdlYmtpdC1hcHBlYXJhbmNlOiBidXR0b247IC8qIDEgKi9cXHJcXG4gIGZvbnQ6IGluaGVyaXQ7IC8qIDIgKi9cXHJcXG59XFxyXFxuXFxyXFxuLyogSW50ZXJhY3RpdmVcXHJcXG4gICA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PSAqL1xcclxcblxcclxcbi8qXFxyXFxuICogQWRkIHRoZSBjb3JyZWN0IGRpc3BsYXkgaW4gRWRnZSwgSUUgMTArLCBhbmQgRmlyZWZveC5cXHJcXG4gKi9cXHJcXG5cXHJcXG5kZXRhaWxzIHtcXHJcXG4gIGRpc3BsYXk6IGJsb2NrO1xcclxcbn1cXHJcXG5cXHJcXG4vKlxcclxcbiAqIEFkZCB0aGUgY29ycmVjdCBkaXNwbGF5IGluIGFsbCBicm93c2Vycy5cXHJcXG4gKi9cXHJcXG5cXHJcXG5zdW1tYXJ5IHtcXHJcXG4gIGRpc3BsYXk6IGxpc3QtaXRlbTtcXHJcXG59XFxyXFxuXFxyXFxuLyogTWlzY1xcclxcbiAgID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09ICovXFxyXFxuXFxyXFxuLyoqXFxyXFxuICogQWRkIHRoZSBjb3JyZWN0IGRpc3BsYXkgaW4gSUUgMTArLlxcclxcbiAqL1xcclxcblxcclxcbnRlbXBsYXRlIHtcXHJcXG4gIGRpc3BsYXk6IG5vbmU7XFxyXFxufVxcclxcblxcclxcbi8qKlxcclxcbiAqIEFkZCB0aGUgY29ycmVjdCBkaXNwbGF5IGluIElFIDEwLlxcclxcbiAqL1xcclxcblxcclxcbltoaWRkZW5dIHtcXHJcXG4gIGRpc3BsYXk6IG5vbmU7XFxyXFxufVxcclxcblwiLCBcIlwiLHtcInZlcnNpb25cIjozLFwic291cmNlc1wiOltcIndlYnBhY2s6Ly8uL2Fzc2V0cy9zdHlsZXMvbm9ybWFsaXplLmNzc1wiXSxcIm5hbWVzXCI6W10sXCJtYXBwaW5nc1wiOlwiQUFBQSwyRUFBMkU7O0FBRTNFOytFQUMrRTs7QUFFL0U7OztFQUdFOztBQUVGO0VBQ0UsaUJBQWlCLEVBQUUsTUFBTTtFQUN6Qiw4QkFBOEIsRUFBRSxNQUFNO0FBQ3hDOztBQUVBOytFQUMrRTs7QUFFL0U7O0VBRUU7O0FBRUY7RUFDRSxTQUFTO0FBQ1g7O0FBRUE7O0VBRUU7O0FBRUY7RUFDRSxjQUFjO0FBQ2hCOztBQUVBOzs7RUFHRTs7QUFFRjtFQUNFLGNBQWM7RUFDZCxnQkFBZ0I7QUFDbEI7O0FBRUE7K0VBQytFOztBQUUvRTs7O0VBR0U7O0FBRUY7RUFDRSx1QkFBdUIsRUFBRSxNQUFNO0VBQy9CLFNBQVMsRUFBRSxNQUFNO0VBQ2pCLGlCQUFpQixFQUFFLE1BQU07QUFDM0I7O0FBRUE7OztFQUdFOztBQUVGO0VBQ0UsaUNBQWlDLEVBQUUsTUFBTTtFQUN6QyxjQUFjLEVBQUUsTUFBTTtBQUN4Qjs7QUFFQTsrRUFDK0U7O0FBRS9FOztFQUVFOztBQUVGO0VBQ0UsNkJBQTZCO0FBQy9COztBQUVBOzs7RUFHRTs7QUFFRjtFQUNFLG1CQUFtQixFQUFFLE1BQU07RUFDM0IsMEJBQTBCLEVBQUUsTUFBTTtFQUNsQyxpQ0FBaUMsRUFBRSxNQUFNO0FBQzNDOztBQUVBOztFQUVFOztBQUVGOztFQUVFLG1CQUFtQjtBQUNyQjs7QUFFQTs7O0VBR0U7O0FBRUY7OztFQUdFLGlDQUFpQyxFQUFFLE1BQU07RUFDekMsY0FBYyxFQUFFLE1BQU07QUFDeEI7O0FBRUE7O0VBRUU7O0FBRUY7RUFDRSxjQUFjO0FBQ2hCOztBQUVBOzs7RUFHRTs7QUFFRjs7RUFFRSxjQUFjO0VBQ2QsY0FBYztFQUNkLGtCQUFrQjtFQUNsQix3QkFBd0I7QUFDMUI7O0FBRUE7RUFDRSxlQUFlO0FBQ2pCOztBQUVBO0VBQ0UsV0FBVztBQUNiOztBQUVBOytFQUMrRTs7QUFFL0U7O0VBRUU7O0FBRUY7RUFDRSxrQkFBa0I7QUFDcEI7O0FBRUE7K0VBQytFOztBQUUvRTs7O0VBR0U7O0FBRUY7Ozs7O0VBS0Usb0JBQW9CLEVBQUUsTUFBTTtFQUM1QixlQUFlLEVBQUUsTUFBTTtFQUN2QixpQkFBaUIsRUFBRSxNQUFNO0VBQ3pCLFNBQVMsRUFBRSxNQUFNO0FBQ25COztBQUVBOzs7RUFHRTs7QUFFRjtRQUNRLE1BQU07RUFDWixpQkFBaUI7QUFDbkI7O0FBRUE7OztFQUdFOztBQUVGO1NBQ1MsTUFBTTtFQUNiLG9CQUFvQjtBQUN0Qjs7QUFFQTs7RUFFRTs7QUFFRjs7OztFQUlFLDBCQUEwQjtBQUM1Qjs7QUFFQTs7RUFFRTs7QUFFRjs7OztFQUlFLGtCQUFrQjtFQUNsQixVQUFVO0FBQ1o7O0FBRUE7O0VBRUU7O0FBRUY7Ozs7RUFJRSw4QkFBOEI7QUFDaEM7O0FBRUE7O0VBRUU7O0FBRUY7RUFDRSw4QkFBOEI7QUFDaEM7O0FBRUE7Ozs7O0VBS0U7O0FBRUY7RUFDRSxzQkFBc0IsRUFBRSxNQUFNO0VBQzlCLGNBQWMsRUFBRSxNQUFNO0VBQ3RCLGNBQWMsRUFBRSxNQUFNO0VBQ3RCLGVBQWUsRUFBRSxNQUFNO0VBQ3ZCLFVBQVUsRUFBRSxNQUFNO0VBQ2xCLG1CQUFtQixFQUFFLE1BQU07QUFDN0I7O0FBRUE7O0VBRUU7O0FBRUY7RUFDRSx3QkFBd0I7QUFDMUI7O0FBRUE7O0VBRUU7O0FBRUY7RUFDRSxjQUFjO0FBQ2hCOztBQUVBOzs7RUFHRTs7QUFFRjs7RUFFRSxzQkFBc0IsRUFBRSxNQUFNO0VBQzlCLFVBQVUsRUFBRSxNQUFNO0FBQ3BCOztBQUVBOztFQUVFOztBQUVGOztFQUVFLFlBQVk7QUFDZDs7QUFFQTs7O0VBR0U7O0FBRUY7RUFDRSw2QkFBNkIsRUFBRSxNQUFNO0VBQ3JDLG9CQUFvQixFQUFFLE1BQU07QUFDOUI7O0FBRUE7O0VBRUU7O0FBRUY7RUFDRSx3QkFBd0I7QUFDMUI7O0FBRUE7OztFQUdFOztBQUVGO0VBQ0UsMEJBQTBCLEVBQUUsTUFBTTtFQUNsQyxhQUFhLEVBQUUsTUFBTTtBQUN2Qjs7QUFFQTsrRUFDK0U7O0FBRS9FOztFQUVFOztBQUVGO0VBQ0UsY0FBYztBQUNoQjs7QUFFQTs7RUFFRTs7QUFFRjtFQUNFLGtCQUFrQjtBQUNwQjs7QUFFQTsrRUFDK0U7O0FBRS9FOztFQUVFOztBQUVGO0VBQ0UsYUFBYTtBQUNmOztBQUVBOztFQUVFOztBQUVGO0VBQ0UsYUFBYTtBQUNmXCIsXCJzb3VyY2VzQ29udGVudFwiOltcIi8qISBub3JtYWxpemUuY3NzIHY4LjAuMSB8IE1JVCBMaWNlbnNlIHwgZ2l0aHViLmNvbS9uZWNvbGFzL25vcm1hbGl6ZS5jc3MgKi9cXHJcXG5cXHJcXG4vKiBEb2N1bWVudFxcclxcbiAgID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09ICovXFxyXFxuXFxyXFxuLyoqXFxyXFxuICogMS4gQ29ycmVjdCB0aGUgbGluZSBoZWlnaHQgaW4gYWxsIGJyb3dzZXJzLlxcclxcbiAqIDIuIFByZXZlbnQgYWRqdXN0bWVudHMgb2YgZm9udCBzaXplIGFmdGVyIG9yaWVudGF0aW9uIGNoYW5nZXMgaW4gaU9TLlxcclxcbiAqL1xcclxcblxcclxcbmh0bWwge1xcclxcbiAgbGluZS1oZWlnaHQ6IDEuMTU7IC8qIDEgKi9cXHJcXG4gIC13ZWJraXQtdGV4dC1zaXplLWFkanVzdDogMTAwJTsgLyogMiAqL1xcclxcbn1cXHJcXG5cXHJcXG4vKiBTZWN0aW9uc1xcclxcbiAgID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09ICovXFxyXFxuXFxyXFxuLyoqXFxyXFxuICogUmVtb3ZlIHRoZSBtYXJnaW4gaW4gYWxsIGJyb3dzZXJzLlxcclxcbiAqL1xcclxcblxcclxcbmJvZHkge1xcclxcbiAgbWFyZ2luOiAwO1xcclxcbn1cXHJcXG5cXHJcXG4vKipcXHJcXG4gKiBSZW5kZXIgdGhlIGBtYWluYCBlbGVtZW50IGNvbnNpc3RlbnRseSBpbiBJRS5cXHJcXG4gKi9cXHJcXG5cXHJcXG5tYWluIHtcXHJcXG4gIGRpc3BsYXk6IGJsb2NrO1xcclxcbn1cXHJcXG5cXHJcXG4vKipcXHJcXG4gKiBDb3JyZWN0IHRoZSBmb250IHNpemUgYW5kIG1hcmdpbiBvbiBgaDFgIGVsZW1lbnRzIHdpdGhpbiBgc2VjdGlvbmAgYW5kXFxyXFxuICogYGFydGljbGVgIGNvbnRleHRzIGluIENocm9tZSwgRmlyZWZveCwgYW5kIFNhZmFyaS5cXHJcXG4gKi9cXHJcXG5cXHJcXG5oMSB7XFxyXFxuICBmb250LXNpemU6IDJlbTtcXHJcXG4gIG1hcmdpbjogMC42N2VtIDA7XFxyXFxufVxcclxcblxcclxcbi8qIEdyb3VwaW5nIGNvbnRlbnRcXHJcXG4gICA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PSAqL1xcclxcblxcclxcbi8qKlxcclxcbiAqIDEuIEFkZCB0aGUgY29ycmVjdCBib3ggc2l6aW5nIGluIEZpcmVmb3guXFxyXFxuICogMi4gU2hvdyB0aGUgb3ZlcmZsb3cgaW4gRWRnZSBhbmQgSUUuXFxyXFxuICovXFxyXFxuXFxyXFxuaHIge1xcclxcbiAgYm94LXNpemluZzogY29udGVudC1ib3g7IC8qIDEgKi9cXHJcXG4gIGhlaWdodDogMDsgLyogMSAqL1xcclxcbiAgb3ZlcmZsb3c6IHZpc2libGU7IC8qIDIgKi9cXHJcXG59XFxyXFxuXFxyXFxuLyoqXFxyXFxuICogMS4gQ29ycmVjdCB0aGUgaW5oZXJpdGFuY2UgYW5kIHNjYWxpbmcgb2YgZm9udCBzaXplIGluIGFsbCBicm93c2Vycy5cXHJcXG4gKiAyLiBDb3JyZWN0IHRoZSBvZGQgYGVtYCBmb250IHNpemluZyBpbiBhbGwgYnJvd3NlcnMuXFxyXFxuICovXFxyXFxuXFxyXFxucHJlIHtcXHJcXG4gIGZvbnQtZmFtaWx5OiBtb25vc3BhY2UsIG1vbm9zcGFjZTsgLyogMSAqL1xcclxcbiAgZm9udC1zaXplOiAxZW07IC8qIDIgKi9cXHJcXG59XFxyXFxuXFxyXFxuLyogVGV4dC1sZXZlbCBzZW1hbnRpY3NcXHJcXG4gICA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PSAqL1xcclxcblxcclxcbi8qKlxcclxcbiAqIFJlbW92ZSB0aGUgZ3JheSBiYWNrZ3JvdW5kIG9uIGFjdGl2ZSBsaW5rcyBpbiBJRSAxMC5cXHJcXG4gKi9cXHJcXG5cXHJcXG5hIHtcXHJcXG4gIGJhY2tncm91bmQtY29sb3I6IHRyYW5zcGFyZW50O1xcclxcbn1cXHJcXG5cXHJcXG4vKipcXHJcXG4gKiAxLiBSZW1vdmUgdGhlIGJvdHRvbSBib3JkZXIgaW4gQ2hyb21lIDU3LVxcclxcbiAqIDIuIEFkZCB0aGUgY29ycmVjdCB0ZXh0IGRlY29yYXRpb24gaW4gQ2hyb21lLCBFZGdlLCBJRSwgT3BlcmEsIGFuZCBTYWZhcmkuXFxyXFxuICovXFxyXFxuXFxyXFxuYWJiclt0aXRsZV0ge1xcclxcbiAgYm9yZGVyLWJvdHRvbTogbm9uZTsgLyogMSAqL1xcclxcbiAgdGV4dC1kZWNvcmF0aW9uOiB1bmRlcmxpbmU7IC8qIDIgKi9cXHJcXG4gIHRleHQtZGVjb3JhdGlvbjogdW5kZXJsaW5lIGRvdHRlZDsgLyogMiAqL1xcclxcbn1cXHJcXG5cXHJcXG4vKipcXHJcXG4gKiBBZGQgdGhlIGNvcnJlY3QgZm9udCB3ZWlnaHQgaW4gQ2hyb21lLCBFZGdlLCBhbmQgU2FmYXJpLlxcclxcbiAqL1xcclxcblxcclxcbmIsXFxyXFxuc3Ryb25nIHtcXHJcXG4gIGZvbnQtd2VpZ2h0OiBib2xkZXI7XFxyXFxufVxcclxcblxcclxcbi8qKlxcclxcbiAqIDEuIENvcnJlY3QgdGhlIGluaGVyaXRhbmNlIGFuZCBzY2FsaW5nIG9mIGZvbnQgc2l6ZSBpbiBhbGwgYnJvd3NlcnMuXFxyXFxuICogMi4gQ29ycmVjdCB0aGUgb2RkIGBlbWAgZm9udCBzaXppbmcgaW4gYWxsIGJyb3dzZXJzLlxcclxcbiAqL1xcclxcblxcclxcbmNvZGUsXFxyXFxua2JkLFxcclxcbnNhbXAge1xcclxcbiAgZm9udC1mYW1pbHk6IG1vbm9zcGFjZSwgbW9ub3NwYWNlOyAvKiAxICovXFxyXFxuICBmb250LXNpemU6IDFlbTsgLyogMiAqL1xcclxcbn1cXHJcXG5cXHJcXG4vKipcXHJcXG4gKiBBZGQgdGhlIGNvcnJlY3QgZm9udCBzaXplIGluIGFsbCBicm93c2Vycy5cXHJcXG4gKi9cXHJcXG5cXHJcXG5zbWFsbCB7XFxyXFxuICBmb250LXNpemU6IDgwJTtcXHJcXG59XFxyXFxuXFxyXFxuLyoqXFxyXFxuICogUHJldmVudCBgc3ViYCBhbmQgYHN1cGAgZWxlbWVudHMgZnJvbSBhZmZlY3RpbmcgdGhlIGxpbmUgaGVpZ2h0IGluXFxyXFxuICogYWxsIGJyb3dzZXJzLlxcclxcbiAqL1xcclxcblxcclxcbnN1YixcXHJcXG5zdXAge1xcclxcbiAgZm9udC1zaXplOiA3NSU7XFxyXFxuICBsaW5lLWhlaWdodDogMDtcXHJcXG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcXHJcXG4gIHZlcnRpY2FsLWFsaWduOiBiYXNlbGluZTtcXHJcXG59XFxyXFxuXFxyXFxuc3ViIHtcXHJcXG4gIGJvdHRvbTogLTAuMjVlbTtcXHJcXG59XFxyXFxuXFxyXFxuc3VwIHtcXHJcXG4gIHRvcDogLTAuNWVtO1xcclxcbn1cXHJcXG5cXHJcXG4vKiBFbWJlZGRlZCBjb250ZW50XFxyXFxuICAgPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0gKi9cXHJcXG5cXHJcXG4vKipcXHJcXG4gKiBSZW1vdmUgdGhlIGJvcmRlciBvbiBpbWFnZXMgaW5zaWRlIGxpbmtzIGluIElFIDEwLlxcclxcbiAqL1xcclxcblxcclxcbmltZyB7XFxyXFxuICBib3JkZXItc3R5bGU6IG5vbmU7XFxyXFxufVxcclxcblxcclxcbi8qIEZvcm1zXFxyXFxuICAgPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0gKi9cXHJcXG5cXHJcXG4vKipcXHJcXG4gKiAxLiBDaGFuZ2UgdGhlIGZvbnQgc3R5bGVzIGluIGFsbCBicm93c2Vycy5cXHJcXG4gKiAyLiBSZW1vdmUgdGhlIG1hcmdpbiBpbiBGaXJlZm94IGFuZCBTYWZhcmkuXFxyXFxuICovXFxyXFxuXFxyXFxuYnV0dG9uLFxcclxcbmlucHV0LFxcclxcbm9wdGdyb3VwLFxcclxcbnNlbGVjdCxcXHJcXG50ZXh0YXJlYSB7XFxyXFxuICBmb250LWZhbWlseTogaW5oZXJpdDsgLyogMSAqL1xcclxcbiAgZm9udC1zaXplOiAxMDAlOyAvKiAxICovXFxyXFxuICBsaW5lLWhlaWdodDogMS4xNTsgLyogMSAqL1xcclxcbiAgbWFyZ2luOiAwOyAvKiAyICovXFxyXFxufVxcclxcblxcclxcbi8qKlxcclxcbiAqIFNob3cgdGhlIG92ZXJmbG93IGluIElFLlxcclxcbiAqIDEuIFNob3cgdGhlIG92ZXJmbG93IGluIEVkZ2UuXFxyXFxuICovXFxyXFxuXFxyXFxuYnV0dG9uLFxcclxcbmlucHV0IHsgLyogMSAqL1xcclxcbiAgb3ZlcmZsb3c6IHZpc2libGU7XFxyXFxufVxcclxcblxcclxcbi8qKlxcclxcbiAqIFJlbW92ZSB0aGUgaW5oZXJpdGFuY2Ugb2YgdGV4dCB0cmFuc2Zvcm0gaW4gRWRnZSwgRmlyZWZveCwgYW5kIElFLlxcclxcbiAqIDEuIFJlbW92ZSB0aGUgaW5oZXJpdGFuY2Ugb2YgdGV4dCB0cmFuc2Zvcm0gaW4gRmlyZWZveC5cXHJcXG4gKi9cXHJcXG5cXHJcXG5idXR0b24sXFxyXFxuc2VsZWN0IHsgLyogMSAqL1xcclxcbiAgdGV4dC10cmFuc2Zvcm06IG5vbmU7XFxyXFxufVxcclxcblxcclxcbi8qKlxcclxcbiAqIENvcnJlY3QgdGhlIGluYWJpbGl0eSB0byBzdHlsZSBjbGlja2FibGUgdHlwZXMgaW4gaU9TIGFuZCBTYWZhcmkuXFxyXFxuICovXFxyXFxuXFxyXFxuYnV0dG9uLFxcclxcblt0eXBlPVxcXCJidXR0b25cXFwiXSxcXHJcXG5bdHlwZT1cXFwicmVzZXRcXFwiXSxcXHJcXG5bdHlwZT1cXFwic3VibWl0XFxcIl0ge1xcclxcbiAgLXdlYmtpdC1hcHBlYXJhbmNlOiBidXR0b247XFxyXFxufVxcclxcblxcclxcbi8qKlxcclxcbiAqIFJlbW92ZSB0aGUgaW5uZXIgYm9yZGVyIGFuZCBwYWRkaW5nIGluIEZpcmVmb3guXFxyXFxuICovXFxyXFxuXFxyXFxuYnV0dG9uOjotbW96LWZvY3VzLWlubmVyLFxcclxcblt0eXBlPVxcXCJidXR0b25cXFwiXTo6LW1vei1mb2N1cy1pbm5lcixcXHJcXG5bdHlwZT1cXFwicmVzZXRcXFwiXTo6LW1vei1mb2N1cy1pbm5lcixcXHJcXG5bdHlwZT1cXFwic3VibWl0XFxcIl06Oi1tb3otZm9jdXMtaW5uZXIge1xcclxcbiAgYm9yZGVyLXN0eWxlOiBub25lO1xcclxcbiAgcGFkZGluZzogMDtcXHJcXG59XFxyXFxuXFxyXFxuLyoqXFxyXFxuICogUmVzdG9yZSB0aGUgZm9jdXMgc3R5bGVzIHVuc2V0IGJ5IHRoZSBwcmV2aW91cyBydWxlLlxcclxcbiAqL1xcclxcblxcclxcbmJ1dHRvbjotbW96LWZvY3VzcmluZyxcXHJcXG5bdHlwZT1cXFwiYnV0dG9uXFxcIl06LW1vei1mb2N1c3JpbmcsXFxyXFxuW3R5cGU9XFxcInJlc2V0XFxcIl06LW1vei1mb2N1c3JpbmcsXFxyXFxuW3R5cGU9XFxcInN1Ym1pdFxcXCJdOi1tb3otZm9jdXNyaW5nIHtcXHJcXG4gIG91dGxpbmU6IDFweCBkb3R0ZWQgQnV0dG9uVGV4dDtcXHJcXG59XFxyXFxuXFxyXFxuLyoqXFxyXFxuICogQ29ycmVjdCB0aGUgcGFkZGluZyBpbiBGaXJlZm94LlxcclxcbiAqL1xcclxcblxcclxcbmZpZWxkc2V0IHtcXHJcXG4gIHBhZGRpbmc6IDAuMzVlbSAwLjc1ZW0gMC42MjVlbTtcXHJcXG59XFxyXFxuXFxyXFxuLyoqXFxyXFxuICogMS4gQ29ycmVjdCB0aGUgdGV4dCB3cmFwcGluZyBpbiBFZGdlIGFuZCBJRS5cXHJcXG4gKiAyLiBDb3JyZWN0IHRoZSBjb2xvciBpbmhlcml0YW5jZSBmcm9tIGBmaWVsZHNldGAgZWxlbWVudHMgaW4gSUUuXFxyXFxuICogMy4gUmVtb3ZlIHRoZSBwYWRkaW5nIHNvIGRldmVsb3BlcnMgYXJlIG5vdCBjYXVnaHQgb3V0IHdoZW4gdGhleSB6ZXJvIG91dFxcclxcbiAqICAgIGBmaWVsZHNldGAgZWxlbWVudHMgaW4gYWxsIGJyb3dzZXJzLlxcclxcbiAqL1xcclxcblxcclxcbmxlZ2VuZCB7XFxyXFxuICBib3gtc2l6aW5nOiBib3JkZXItYm94OyAvKiAxICovXFxyXFxuICBjb2xvcjogaW5oZXJpdDsgLyogMiAqL1xcclxcbiAgZGlzcGxheTogdGFibGU7IC8qIDEgKi9cXHJcXG4gIG1heC13aWR0aDogMTAwJTsgLyogMSAqL1xcclxcbiAgcGFkZGluZzogMDsgLyogMyAqL1xcclxcbiAgd2hpdGUtc3BhY2U6IG5vcm1hbDsgLyogMSAqL1xcclxcbn1cXHJcXG5cXHJcXG4vKipcXHJcXG4gKiBBZGQgdGhlIGNvcnJlY3QgdmVydGljYWwgYWxpZ25tZW50IGluIENocm9tZSwgRmlyZWZveCwgYW5kIE9wZXJhLlxcclxcbiAqL1xcclxcblxcclxcbnByb2dyZXNzIHtcXHJcXG4gIHZlcnRpY2FsLWFsaWduOiBiYXNlbGluZTtcXHJcXG59XFxyXFxuXFxyXFxuLyoqXFxyXFxuICogUmVtb3ZlIHRoZSBkZWZhdWx0IHZlcnRpY2FsIHNjcm9sbGJhciBpbiBJRSAxMCsuXFxyXFxuICovXFxyXFxuXFxyXFxudGV4dGFyZWEge1xcclxcbiAgb3ZlcmZsb3c6IGF1dG87XFxyXFxufVxcclxcblxcclxcbi8qKlxcclxcbiAqIDEuIEFkZCB0aGUgY29ycmVjdCBib3ggc2l6aW5nIGluIElFIDEwLlxcclxcbiAqIDIuIFJlbW92ZSB0aGUgcGFkZGluZyBpbiBJRSAxMC5cXHJcXG4gKi9cXHJcXG5cXHJcXG5bdHlwZT1cXFwiY2hlY2tib3hcXFwiXSxcXHJcXG5bdHlwZT1cXFwicmFkaW9cXFwiXSB7XFxyXFxuICBib3gtc2l6aW5nOiBib3JkZXItYm94OyAvKiAxICovXFxyXFxuICBwYWRkaW5nOiAwOyAvKiAyICovXFxyXFxufVxcclxcblxcclxcbi8qKlxcclxcbiAqIENvcnJlY3QgdGhlIGN1cnNvciBzdHlsZSBvZiBpbmNyZW1lbnQgYW5kIGRlY3JlbWVudCBidXR0b25zIGluIENocm9tZS5cXHJcXG4gKi9cXHJcXG5cXHJcXG5bdHlwZT1cXFwibnVtYmVyXFxcIl06Oi13ZWJraXQtaW5uZXItc3Bpbi1idXR0b24sXFxyXFxuW3R5cGU9XFxcIm51bWJlclxcXCJdOjotd2Via2l0LW91dGVyLXNwaW4tYnV0dG9uIHtcXHJcXG4gIGhlaWdodDogYXV0bztcXHJcXG59XFxyXFxuXFxyXFxuLyoqXFxyXFxuICogMS4gQ29ycmVjdCB0aGUgb2RkIGFwcGVhcmFuY2UgaW4gQ2hyb21lIGFuZCBTYWZhcmkuXFxyXFxuICogMi4gQ29ycmVjdCB0aGUgb3V0bGluZSBzdHlsZSBpbiBTYWZhcmkuXFxyXFxuICovXFxyXFxuXFxyXFxuW3R5cGU9XFxcInNlYXJjaFxcXCJdIHtcXHJcXG4gIC13ZWJraXQtYXBwZWFyYW5jZTogdGV4dGZpZWxkOyAvKiAxICovXFxyXFxuICBvdXRsaW5lLW9mZnNldDogLTJweDsgLyogMiAqL1xcclxcbn1cXHJcXG5cXHJcXG4vKipcXHJcXG4gKiBSZW1vdmUgdGhlIGlubmVyIHBhZGRpbmcgaW4gQ2hyb21lIGFuZCBTYWZhcmkgb24gbWFjT1MuXFxyXFxuICovXFxyXFxuXFxyXFxuW3R5cGU9XFxcInNlYXJjaFxcXCJdOjotd2Via2l0LXNlYXJjaC1kZWNvcmF0aW9uIHtcXHJcXG4gIC13ZWJraXQtYXBwZWFyYW5jZTogbm9uZTtcXHJcXG59XFxyXFxuXFxyXFxuLyoqXFxyXFxuICogMS4gQ29ycmVjdCB0aGUgaW5hYmlsaXR5IHRvIHN0eWxlIGNsaWNrYWJsZSB0eXBlcyBpbiBpT1MgYW5kIFNhZmFyaS5cXHJcXG4gKiAyLiBDaGFuZ2UgZm9udCBwcm9wZXJ0aWVzIHRvIGBpbmhlcml0YCBpbiBTYWZhcmkuXFxyXFxuICovXFxyXFxuXFxyXFxuOjotd2Via2l0LWZpbGUtdXBsb2FkLWJ1dHRvbiB7XFxyXFxuICAtd2Via2l0LWFwcGVhcmFuY2U6IGJ1dHRvbjsgLyogMSAqL1xcclxcbiAgZm9udDogaW5oZXJpdDsgLyogMiAqL1xcclxcbn1cXHJcXG5cXHJcXG4vKiBJbnRlcmFjdGl2ZVxcclxcbiAgID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09ICovXFxyXFxuXFxyXFxuLypcXHJcXG4gKiBBZGQgdGhlIGNvcnJlY3QgZGlzcGxheSBpbiBFZGdlLCBJRSAxMCssIGFuZCBGaXJlZm94LlxcclxcbiAqL1xcclxcblxcclxcbmRldGFpbHMge1xcclxcbiAgZGlzcGxheTogYmxvY2s7XFxyXFxufVxcclxcblxcclxcbi8qXFxyXFxuICogQWRkIHRoZSBjb3JyZWN0IGRpc3BsYXkgaW4gYWxsIGJyb3dzZXJzLlxcclxcbiAqL1xcclxcblxcclxcbnN1bW1hcnkge1xcclxcbiAgZGlzcGxheTogbGlzdC1pdGVtO1xcclxcbn1cXHJcXG5cXHJcXG4vKiBNaXNjXFxyXFxuICAgPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0gKi9cXHJcXG5cXHJcXG4vKipcXHJcXG4gKiBBZGQgdGhlIGNvcnJlY3QgZGlzcGxheSBpbiBJRSAxMCsuXFxyXFxuICovXFxyXFxuXFxyXFxudGVtcGxhdGUge1xcclxcbiAgZGlzcGxheTogbm9uZTtcXHJcXG59XFxyXFxuXFxyXFxuLyoqXFxyXFxuICogQWRkIHRoZSBjb3JyZWN0IGRpc3BsYXkgaW4gSUUgMTAuXFxyXFxuICovXFxyXFxuXFxyXFxuW2hpZGRlbl0ge1xcclxcbiAgZGlzcGxheTogbm9uZTtcXHJcXG59XFxyXFxuXCJdLFwic291cmNlUm9vdFwiOlwiXCJ9XSk7XG4vLyBFeHBvcnRzXG5leHBvcnQgZGVmYXVsdCBfX19DU1NfTE9BREVSX0VYUE9SVF9fXztcbiIsIi8vIEltcG9ydHNcbmltcG9ydCBfX19DU1NfTE9BREVSX0FQSV9TT1VSQ0VNQVBfSU1QT1JUX19fIGZyb20gXCIuLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvc291cmNlTWFwcy5qc1wiO1xuaW1wb3J0IF9fX0NTU19MT0FERVJfQVBJX0lNUE9SVF9fXyBmcm9tIFwiLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL2FwaS5qc1wiO1xudmFyIF9fX0NTU19MT0FERVJfRVhQT1JUX19fID0gX19fQ1NTX0xPQURFUl9BUElfSU1QT1JUX19fKF9fX0NTU19MT0FERVJfQVBJX1NPVVJDRU1BUF9JTVBPUlRfX18pO1xuLy8gTW9kdWxlXG5fX19DU1NfTE9BREVSX0VYUE9SVF9fXy5wdXNoKFttb2R1bGUuaWQsIFwiLyogaHR0cDovL21leWVyd2ViLmNvbS9lcmljL3Rvb2xzL2Nzcy9yZXNldC9cXHJcXG4gICB2Mi4wIHwgMjAxMTAxMjZcXHJcXG4gICBMaWNlbnNlOiBub25lIChwdWJsaWMgZG9tYWluKVxcclxcbiovXFxyXFxuXFxyXFxuaHRtbCwgYm9keSwgZGl2LCBzcGFuLCBhcHBsZXQsIG9iamVjdCwgaWZyYW1lLFxcclxcbmgxLCBoMiwgaDMsIGg0LCBoNSwgaDYsIHAsIGJsb2NrcXVvdGUsIHByZSxcXHJcXG5hLCBhYmJyLCBhY3JvbnltLCBhZGRyZXNzLCBiaWcsIGNpdGUsIGNvZGUsXFxyXFxuZGVsLCBkZm4sIGVtLCBpbWcsIGlucywga2JkLCBxLCBzLCBzYW1wLFxcclxcbnNtYWxsLCBzdHJpa2UsIHN0cm9uZywgc3ViLCBzdXAsIHR0LCB2YXIsXFxyXFxuYiwgdSwgaSwgY2VudGVyLFxcclxcbmRsLCBkdCwgZGQsIG9sLCB1bCwgbGksXFxyXFxuZmllbGRzZXQsIGZvcm0sIGxhYmVsLCBsZWdlbmQsXFxyXFxudGFibGUsIGNhcHRpb24sIHRib2R5LCB0Zm9vdCwgdGhlYWQsIHRyLCB0aCwgdGQsXFxyXFxuYXJ0aWNsZSwgYXNpZGUsIGNhbnZhcywgZGV0YWlscywgZW1iZWQsXFxyXFxuZmlndXJlLCBmaWdjYXB0aW9uLCBmb290ZXIsIGhlYWRlciwgaGdyb3VwLFxcclxcbm1lbnUsIG5hdiwgb3V0cHV0LCBydWJ5LCBzZWN0aW9uLCBzdW1tYXJ5LFxcclxcbnRpbWUsIG1hcmssIGF1ZGlvLCB2aWRlbyB7XFxyXFxuXFx0bWFyZ2luOiAwO1xcclxcblxcdHBhZGRpbmc6IDA7XFxyXFxuXFx0Ym9yZGVyOiAwO1xcclxcblxcdGZvbnQtc2l6ZTogMTAwJTtcXHJcXG5cXHRmb250OiBpbmhlcml0O1xcclxcblxcdHZlcnRpY2FsLWFsaWduOiBiYXNlbGluZTtcXHJcXG59XFxyXFxuLyogSFRNTDUgZGlzcGxheS1yb2xlIHJlc2V0IGZvciBvbGRlciBicm93c2VycyAqL1xcclxcbmFydGljbGUsIGFzaWRlLCBkZXRhaWxzLCBmaWdjYXB0aW9uLCBmaWd1cmUsXFxyXFxuZm9vdGVyLCBoZWFkZXIsIGhncm91cCwgbWVudSwgbmF2LCBzZWN0aW9uIHtcXHJcXG5cXHRkaXNwbGF5OiBibG9jaztcXHJcXG59XFxyXFxuYm9keSB7XFxyXFxuXFx0bGluZS1oZWlnaHQ6IDE7XFxyXFxufVxcclxcbm9sLCB1bCB7XFxyXFxuXFx0bGlzdC1zdHlsZTogbm9uZTtcXHJcXG59XFxyXFxuYmxvY2txdW90ZSwgcSB7XFxyXFxuXFx0cXVvdGVzOiBub25lO1xcclxcbn1cXHJcXG5ibG9ja3F1b3RlOmJlZm9yZSwgYmxvY2txdW90ZTphZnRlcixcXHJcXG5xOmJlZm9yZSwgcTphZnRlciB7XFxyXFxuXFx0Y29udGVudDogJyc7XFxyXFxuXFx0Y29udGVudDogbm9uZTtcXHJcXG59XFxyXFxudGFibGUge1xcclxcblxcdGJvcmRlci1jb2xsYXBzZTogY29sbGFwc2U7XFxyXFxuXFx0Ym9yZGVyLXNwYWNpbmc6IDA7XFxyXFxufVwiLCBcIlwiLHtcInZlcnNpb25cIjozLFwic291cmNlc1wiOltcIndlYnBhY2s6Ly8uL2Fzc2V0cy9zdHlsZXMvcmVzZXQuY3NzXCJdLFwibmFtZXNcIjpbXSxcIm1hcHBpbmdzXCI6XCJBQUFBOzs7Q0FHQzs7QUFFRDs7Ozs7Ozs7Ozs7OztDQWFDLFNBQVM7Q0FDVCxVQUFVO0NBQ1YsU0FBUztDQUNULGVBQWU7Q0FDZixhQUFhO0NBQ2Isd0JBQXdCO0FBQ3pCO0FBQ0EsZ0RBQWdEO0FBQ2hEOztDQUVDLGNBQWM7QUFDZjtBQUNBO0NBQ0MsY0FBYztBQUNmO0FBQ0E7Q0FDQyxnQkFBZ0I7QUFDakI7QUFDQTtDQUNDLFlBQVk7QUFDYjtBQUNBOztDQUVDLFdBQVc7Q0FDWCxhQUFhO0FBQ2Q7QUFDQTtDQUNDLHlCQUF5QjtDQUN6QixpQkFBaUI7QUFDbEJcIixcInNvdXJjZXNDb250ZW50XCI6W1wiLyogaHR0cDovL21leWVyd2ViLmNvbS9lcmljL3Rvb2xzL2Nzcy9yZXNldC9cXHJcXG4gICB2Mi4wIHwgMjAxMTAxMjZcXHJcXG4gICBMaWNlbnNlOiBub25lIChwdWJsaWMgZG9tYWluKVxcclxcbiovXFxyXFxuXFxyXFxuaHRtbCwgYm9keSwgZGl2LCBzcGFuLCBhcHBsZXQsIG9iamVjdCwgaWZyYW1lLFxcclxcbmgxLCBoMiwgaDMsIGg0LCBoNSwgaDYsIHAsIGJsb2NrcXVvdGUsIHByZSxcXHJcXG5hLCBhYmJyLCBhY3JvbnltLCBhZGRyZXNzLCBiaWcsIGNpdGUsIGNvZGUsXFxyXFxuZGVsLCBkZm4sIGVtLCBpbWcsIGlucywga2JkLCBxLCBzLCBzYW1wLFxcclxcbnNtYWxsLCBzdHJpa2UsIHN0cm9uZywgc3ViLCBzdXAsIHR0LCB2YXIsXFxyXFxuYiwgdSwgaSwgY2VudGVyLFxcclxcbmRsLCBkdCwgZGQsIG9sLCB1bCwgbGksXFxyXFxuZmllbGRzZXQsIGZvcm0sIGxhYmVsLCBsZWdlbmQsXFxyXFxudGFibGUsIGNhcHRpb24sIHRib2R5LCB0Zm9vdCwgdGhlYWQsIHRyLCB0aCwgdGQsXFxyXFxuYXJ0aWNsZSwgYXNpZGUsIGNhbnZhcywgZGV0YWlscywgZW1iZWQsXFxyXFxuZmlndXJlLCBmaWdjYXB0aW9uLCBmb290ZXIsIGhlYWRlciwgaGdyb3VwLFxcclxcbm1lbnUsIG5hdiwgb3V0cHV0LCBydWJ5LCBzZWN0aW9uLCBzdW1tYXJ5LFxcclxcbnRpbWUsIG1hcmssIGF1ZGlvLCB2aWRlbyB7XFxyXFxuXFx0bWFyZ2luOiAwO1xcclxcblxcdHBhZGRpbmc6IDA7XFxyXFxuXFx0Ym9yZGVyOiAwO1xcclxcblxcdGZvbnQtc2l6ZTogMTAwJTtcXHJcXG5cXHRmb250OiBpbmhlcml0O1xcclxcblxcdHZlcnRpY2FsLWFsaWduOiBiYXNlbGluZTtcXHJcXG59XFxyXFxuLyogSFRNTDUgZGlzcGxheS1yb2xlIHJlc2V0IGZvciBvbGRlciBicm93c2VycyAqL1xcclxcbmFydGljbGUsIGFzaWRlLCBkZXRhaWxzLCBmaWdjYXB0aW9uLCBmaWd1cmUsXFxyXFxuZm9vdGVyLCBoZWFkZXIsIGhncm91cCwgbWVudSwgbmF2LCBzZWN0aW9uIHtcXHJcXG5cXHRkaXNwbGF5OiBibG9jaztcXHJcXG59XFxyXFxuYm9keSB7XFxyXFxuXFx0bGluZS1oZWlnaHQ6IDE7XFxyXFxufVxcclxcbm9sLCB1bCB7XFxyXFxuXFx0bGlzdC1zdHlsZTogbm9uZTtcXHJcXG59XFxyXFxuYmxvY2txdW90ZSwgcSB7XFxyXFxuXFx0cXVvdGVzOiBub25lO1xcclxcbn1cXHJcXG5ibG9ja3F1b3RlOmJlZm9yZSwgYmxvY2txdW90ZTphZnRlcixcXHJcXG5xOmJlZm9yZSwgcTphZnRlciB7XFxyXFxuXFx0Y29udGVudDogJyc7XFxyXFxuXFx0Y29udGVudDogbm9uZTtcXHJcXG59XFxyXFxudGFibGUge1xcclxcblxcdGJvcmRlci1jb2xsYXBzZTogY29sbGFwc2U7XFxyXFxuXFx0Ym9yZGVyLXNwYWNpbmc6IDA7XFxyXFxufVwiXSxcInNvdXJjZVJvb3RcIjpcIlwifV0pO1xuLy8gRXhwb3J0c1xuZXhwb3J0IGRlZmF1bHQgX19fQ1NTX0xPQURFUl9FWFBPUlRfX187XG4iLCIvLyBJbXBvcnRzXG5pbXBvcnQgX19fQ1NTX0xPQURFUl9BUElfU09VUkNFTUFQX0lNUE9SVF9fXyBmcm9tIFwiLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL3NvdXJjZU1hcHMuanNcIjtcbmltcG9ydCBfX19DU1NfTE9BREVSX0FQSV9JTVBPUlRfX18gZnJvbSBcIi4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9hcGkuanNcIjtcbnZhciBfX19DU1NfTE9BREVSX0VYUE9SVF9fXyA9IF9fX0NTU19MT0FERVJfQVBJX0lNUE9SVF9fXyhfX19DU1NfTE9BREVSX0FQSV9TT1VSQ0VNQVBfSU1QT1JUX19fKTtcbi8vIE1vZHVsZVxuX19fQ1NTX0xPQURFUl9FWFBPUlRfX18ucHVzaChbbW9kdWxlLmlkLCBcIi8qIGJvcmRlci1ib3ggbW9kZWwgZm9yIGFsbCBlbGVtZW50cyAqL1xcclxcblxcclxcbmh0bWwge1xcclxcbiAgICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xcclxcbn1cXHJcXG5cXHJcXG4qLCAqOjpiZWZvcmUsICo6OmFmdGVyIHtcXHJcXG4gICAgYm94LXNpemluZzogaW5oZXJpdDtcXHJcXG59XFxyXFxuXFxyXFxuLyogLS0tIFBhZ2UgY29sb3Igc3R5bGluZyAtLS0gKi9cXHJcXG5cXHJcXG46cm9vdCB7XFxyXFxuICAgIC0tY29sb3ItYmctbWFpbi0xOiAjNjZiM2ZjO1xcclxcbiAgICAtLWNvbG9yLWJnLW1haW4tMjogI2RiZjVmODtcXHJcXG4gICAgLS1jb2xvci1iZy1tYWluLTM6ICNkMmY4NDg7XFxyXFxuICAgIC0tY29sb3ItYmctbWFpbi00OiAjZjBjMmNkNjM7XFxyXFxuICAgIC0tY29sb3ItZm9udC0xOiAjZDlhYTYzO1xcclxcbn1cXHJcXG5cXHJcXG4vKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tICovXFxyXFxuXFxyXFxuYm9keSB7XFxyXFxuICAgIHdpZHRoOiAxMDAlO1xcclxcbiAgICBkaXNwbGF5OiBmbGV4O1xcclxcbiAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcclxcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xcclxcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1jb2xvci1iZy1tYWluLTEpO1xcclxcbn1cXHJcXG5cXHJcXG5ib2R5Lm9wZW5lZC1tZW51IHtcXHJcXG4gICAgb3ZlcmZsb3cteTogaGlkZGVuO1xcclxcbn1cXHJcXG5cXHJcXG4uaW5hY3RpdmUge1xcclxcbiAgICB2aXNpYmlsaXR5OiBoaWRkZW47XFxyXFxuICAgIHBvc2l0aW9uOiBmaXhlZDtcXHJcXG4gICAgdG9wOiAwO1xcclxcbn1cXHJcXG5cXHJcXG4uZ3JhcGhpYywgaW1nIHtcXHJcXG4gICAgd2lkdGg6IDEwMCU7XFxyXFxuICAgIGhlaWdodDogYXV0bztcXHJcXG4gICAgcGFkZGluZzogMDtcXHJcXG4gICAgbWFyZ2luOiAwO1xcclxcbn1cXHJcXG5cXHJcXG4uY29udGFpbmVyLWNlbnRlcmVkIHtcXHJcXG4gICAgbWF4LXdpZHRoOiAxNDQwcHg7XFxyXFxuICAgIG1pbi13aWR0aDogMTQ0MHB4O1xcclxcbiAgICBtYXJnaW46IDAgYXV0bztcXHJcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0tY29sb3ItYmctbWFpbi0yKTtcXHJcXG59XFxyXFxuXFxyXFxuaGVhZGVyIHtcXHJcXG4gICAgZGlzcGxheTogZmxleDtcXHJcXG4gICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXHJcXG4gICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxyXFxuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxyXFxuICAgIHBvc2l0aW9uOiAtd2Via2l0LXN0aWNreTtcXHJcXG4gICAgcG9zaXRpb246IHN0aWNreTtcXHJcXG4gICAgdG9wOiAwO1xcclxcbiAgICB6LWluZGV4OiA4O1xcclxcbn1cXHJcXG5cXHJcXG4ubWFpbi1jb250cm9scywgLmdhbWUtY29udHJvbHMge1xcclxcbiAgICB3aWR0aDogMTAwJTtcXHJcXG4gICAgbWluLWhlaWdodDogMTAwcHg7XFxyXFxuICAgIGRpc3BsYXk6IGZsZXg7XFxyXFxuICAgIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjtcXHJcXG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXHJcXG59XFxyXFxuXFxyXFxuaDEge1xcclxcbiAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XFxyXFxufVxcclxcblxcclxcbi5idXR0b246aG92ZXIge1xcclxcbiAgICBjdXJzb3I6IHBvaW50ZXI7XFxyXFxufVxcclxcblxcclxcbi5tZW51LWJ1dHRvbiB7XFxyXFxuICAgIGhlaWdodDogMjBweDtcXHJcXG4gICAgei1pbmRleDogMTA7XFxyXFxufVxcclxcblxcclxcbi5zd2l0Y2gge1xcclxcbiAgICB3aWR0aDogMTEwcHg7XFxyXFxuICAgIGJhY2tncm91bmQtY29sb3I6IHdoaXRlc21va2U7XFxyXFxuICAgIGRpc3BsYXk6IGZsZXg7XFxyXFxuICAgIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjtcXHJcXG4gICAgYm9yZGVyLXJhZGl1czogNjBweDtcXHJcXG4gICAgcG9zaXRpb246IHJlbGF0aXZlO1xcclxcbn1cXHJcXG5cXHJcXG4uc3dpdGNoLXJhaWwge1xcclxcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XFxyXFxuICAgIGxlZnQ6IDA7XFxyXFxuICAgIHdpZHRoOiAxMDAlO1xcclxcbiAgICBoZWlnaHQ6IDEwMCU7XFxyXFxuICAgIGJvcmRlci1yYWRpdXM6IGluaGVyaXQ7XFxyXFxuICAgIGRpc3BsYXk6IGZsZXg7XFxyXFxuICAgIGp1c3RpZnktY29udGVudDogZmxleC1zdGFydDtcXHJcXG59XFxyXFxuXFxyXFxuLnN3aXRjaC5zd2l0Y2gtb24gLnN3aXRjaC1yYWlsIHtcXHJcXG4gICAganVzdGlmeS1jb250ZW50OiBmbGV4LWVuZDtcXHJcXG59XFxyXFxuXFxyXFxuLnN3aXRjaC1yb2xsZXIge1xcclxcbiAgICB3aWR0aDogNTVweDtcXHJcXG4gICAgYm9yZGVyLXJhZGl1czogaW5oZXJpdDtcXHJcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogcmdiYSgyMTQsIDIyNSwgNjUsIDAuNDU5KTtcXHJcXG4gICAgei1pbmRleDogMTA7XFxyXFxufVxcclxcblxcclxcbi5zd2l0Y2gtdHJpZ2dlciB7XFxyXFxuICAgIG1hcmdpbjogMCAxMHB4O1xcclxcbiAgICBoZWlnaHQ6IDQwcHg7XFxyXFxuICAgIHotaW5kZXg6IDk7XFxyXFxuICAgIHBhZGRpbmc6IDEwcHggMDtcXHJcXG4gICAgdGV4dC1hbGlnbjogY2VudGVyO1xcclxcbn1cXHJcXG5cXHJcXG4uZ2FtZS1idXR0b24ge1xcclxcbiAgICB3aWR0aDogMTAwcHg7XFxyXFxuICAgIGhlaWdodDogMTAwcHg7XFxyXFxuICAgIGJhY2tncm91bmQtY29sb3I6IHJnYigyMTMsIDE3OCwgMjQ4KTtcXHJcXG59XFxyXFxuXFxyXFxuLmdhbWUtYnV0dG9uLnJlcGVhdC1idXR0b24ge1xcclxcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2IoMjQ4LCAxNzgsIDExMik7XFxyXFxufVxcclxcblxcclxcbi5nYW1lLXByb2dyZXNzIHtcXHJcXG4gICAgd2lkdGg6IDIyMHB4O1xcclxcbiAgICBkaXNwbGF5OiBmbGV4O1xcclxcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWFyb3VuZDtcXHJcXG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXHJcXG59XFxyXFxuXFxyXFxuLmdhbWUtaW5kaWNhdG9yIHtcXHJcXG4gICAgd2lkdGg6IDE1MHB4O1xcclxcbiAgICBoZWlnaHQ6IDQwcHg7XFxyXFxuICAgIGJhY2tncm91bmQtY29sb3I6IHJlZDtcXHJcXG4gICAgYm9yZGVyLXJhZGl1czogMThweDtcXHJcXG4gICAgZGlzcGxheTogZmxleDtcXHJcXG4gICAganVzdGlmeS1jb250ZW50OiBmbGV4LXN0YXJ0O1xcclxcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xcclxcbn1cXHJcXG5cXHJcXG4uc3RhciB7XFxyXFxuICAgIHdpZHRoOiAzMHB4O1xcclxcbn1cXHJcXG5cXHJcXG4uZ2FtZS1zY29yZSB7XFxyXFxuICAgIHRleHQtYWxpZ246IGNlbnRlcjtcXHJcXG59XFxyXFxuXFxyXFxuLmdhbWUtc2NvcmUgLmNvcnJlY3Qge1xcclxcbiAgICBjb2xvcjogZ3JlZW47XFxyXFxufVxcclxcblxcclxcbi5nYW1lLXNjb3JlIC53cm9uZyB7XFxyXFxuICAgIGNvbG9yOiByZWQ7XFxyXFxufVxcclxcblxcclxcblxcclxcbm5hdiB7XFxyXFxuICAgIHBvc2l0aW9uOiBmaXhlZDtcXHJcXG4gICAgdG9wOiAwO1xcclxcbiAgICBsZWZ0OiAtMzIwcHg7XFxyXFxuICAgIHdpZHRoOiAzMjBweDtcXHJcXG4gICAgaGVpZ2h0OiAxMDAlO1xcclxcbiAgICBkaXNwbGF5OiBmbGV4O1xcclxcbiAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcclxcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXHJcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0tY29sb3ItYmctbWFpbi0zKTtcXHJcXG4gICAgei1pbmRleDogOTtcXHJcXG4gICAgdmlzaWJpbGl0eTogaGlkZGVuO1xcclxcbn1cXHJcXG5cXHJcXG5uYXYub3BlbmVkLW1lbnUge1xcclxcbiAgICB2aXNpYmlsaXR5OiB2aXNpYmxlO1xcclxcbiAgICBsZWZ0OiAwO1xcclxcbn1cXHJcXG5cXHJcXG4ubWVudS1saXN0IGxpIHtcXHJcXG4gICAgdGV4dC1hbGlnbjogY2VudGVyO1xcclxcbiAgICBtYXJnaW46IDE1cHggMDtcXHJcXG4gICAgZm9udC1zaXplOiAyZW07XFxyXFxuICAgIGJhY2tncm91bmQtY29sb3I6IHZhcigtLWNvbG9yLWJnLW1haW4tMSk7XFxyXFxufVxcclxcblxcclxcbi5tZW51LWxpc3QgbGkuYWN0aXZlLXBhZ2Uge1xcclxcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1jb2xvci1iZy1tYWluLTQpO1xcclxcbn1cXHJcXG5cXHJcXG5tYWluLmNvbnRhaW5lci1jZW50ZXJlZCB7XFxyXFxuICAgIGJhY2tncm91bmQtY29sb3I6IHZhcigtLWNvbG9yLWJnLW1haW4tNCk7XFxyXFxufVxcclxcblxcclxcbi5jYXJkLWNvbnRhaW5lciB7XFxyXFxuICAgIGRpc3BsYXk6IGZsZXg7XFxyXFxuICAgIGp1c3RpZnktY29udGVudDogc3BhY2UtYXJvdW5kO1xcclxcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xcclxcbiAgICBmbGV4LXdyYXA6IHdyYXA7XFxyXFxufVxcclxcblxcclxcbi5jYXJkIHtcXHJcXG4gICAgd2lkdGg6IDI4MHB4O1xcclxcbiAgICBoZWlnaHQ6IDMyMHB4O1xcclxcbiAgICBtYXJnaW46IDE1cHg7XFxyXFxuICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcXHJcXG59XFxyXFxuXFxyXFxuLmNhcmQuZGlzYWJsZWQge1xcclxcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjZDJmODQ4O1xcclxcbn1cXHJcXG5cXHJcXG4uY2FyZC1jb250ZW50IHtcXHJcXG4gICAgd2lkdGg6IDEwMCU7XFxyXFxuICAgIGhlaWdodDogMTAwJTtcXHJcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogcm95YWxibHVlO1xcclxcbiAgICBwb3NpdGlvbjogcmVsYXRpdmU7XFxyXFxufVxcclxcblxcclxcbi5jYXJkLWNvbnRlbnQsIC5jYXJkIGltZyB7XFxyXFxuICAgIGJvcmRlci1yYWRpdXM6IDI1cHg7XFxyXFxufVxcclxcblxcclxcbi5jYXJkIHAge1xcclxcbiAgICBmb250LXNpemU6IDJlbTtcXHJcXG4gICAgdGV4dC1hbGlnbjogY2VudGVyO1xcclxcbn1cXHJcXG5cXHJcXG4uY2FyZC1mbGlwLWJ1dHRvbiB7XFxyXFxuICAgIHdpZHRoOiA1MHB4O1xcclxcbiAgICBoZWlnaHQ6IDUwcHg7XFxyXFxuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXHJcXG4gICAgYm90dG9tOiAyMHB4O1xcclxcbiAgICByaWdodDogMjBweDtcXHJcXG59XFxyXFxuXFxyXFxuLmNhcmQtZmxpcC1idXR0b24gc3BhbiB7XFxyXFxuICAgIGZvbnQtc2l6ZTogNTBweDtcXHJcXG59XFxyXFxuXFxyXFxuLmZsaXBwZWQgLmNhcmQtY29udGVudCB7XFxyXFxuICAgIGFuaW1hdGlvbi1uYW1lOiBmbGlwLWNhcmQ7XFxyXFxuICAgIGFuaW1hdGlvbi1kdXJhdGlvbjogMXM7XFxyXFxufVxcclxcblxcclxcbi51bmZsaXBwZWQgLmNhcmQtY29udGVudCB7XFxyXFxuICAgIGFuaW1hdGlvbi1uYW1lOiB1bmZsaXAtY2FyZDtcXHJcXG4gICAgYW5pbWF0aW9uLWR1cmF0aW9uOiAxcztcXHJcXG59XFxyXFxuXFxyXFxuLmZpbmFsLWNsaXAge1xcclxcbiAgICBkaXNwbGF5OiBmbGV4O1xcclxcbiAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcclxcbiAgICB3aWR0aDogMzIwcHg7XFxyXFxuICAgIG1hcmdpbjogYXV0bztcXHJcXG4gICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxyXFxuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxyXFxuICAgIHBhZGRpbmc6IDUwcHggMDtcXHJcXG59XFxyXFxuXFxyXFxuLmZpbmFsLWNsaXAgcCB7XFxyXFxuICAgIGNvbG9yOiByZWQ7XFxyXFxuICAgIGZvbnQtc2l6ZTogMzZweDtcXHJcXG4gICAgbWFyZ2luLXRvcDogMzBweDtcXHJcXG59XFxyXFxuXFxyXFxuQGtleWZyYW1lcyBmbGlwLWNhcmQge1xcclxcbiAgICAwJSB7fVxcclxcbiAgICA1MCUge3RyYW5zZm9ybTogcm90YXRlWSg4OWRlZyl9XFxyXFxufVxcclxcblxcclxcbkBrZXlmcmFtZXMgdW5mbGlwLWNhcmQge1xcclxcbiAgICAwJSB7fVxcclxcbiAgICA1MCUge3RyYW5zZm9ybTogcm90YXRlWSg4OWRlZyl9XFxyXFxufVxcclxcblxcclxcbi8qIC0tLSBSRVNQT05TSVZFIExBWU9VVFMgLS0tICovXFxyXFxuXFxyXFxuQG1lZGlhIChtYXgtd2lkdGg6IDE0MzlweCkge1xcclxcbiAgICAuY29udGFpbmVyLWNlbnRlcmVkIHtcXHJcXG4gICAgICAgIG1pbi13aWR0aDogY2FsYygxNDQwdncqMTAwLzE0NDApO1xcclxcbiAgICB9XFxyXFxuXFxyXFxufVwiLCBcIlwiLHtcInZlcnNpb25cIjozLFwic291cmNlc1wiOltcIndlYnBhY2s6Ly8uL2Fzc2V0cy9zdHlsZXMvc3R5bGUuY3NzXCJdLFwibmFtZXNcIjpbXSxcIm1hcHBpbmdzXCI6XCJBQUFBLHNDQUFzQzs7QUFFdEM7SUFDSSxzQkFBc0I7QUFDMUI7O0FBRUE7SUFDSSxtQkFBbUI7QUFDdkI7O0FBRUEsK0JBQStCOztBQUUvQjtJQUNJLDBCQUEwQjtJQUMxQiwwQkFBMEI7SUFDMUIsMEJBQTBCO0lBQzFCLDRCQUE0QjtJQUM1Qix1QkFBdUI7QUFDM0I7O0FBRUEsdUNBQXVDOztBQUV2QztJQUNJLFdBQVc7SUFDWCxhQUFhO0lBQ2Isc0JBQXNCO0lBQ3RCLG1CQUFtQjtJQUNuQix3Q0FBd0M7QUFDNUM7O0FBRUE7SUFDSSxrQkFBa0I7QUFDdEI7O0FBRUE7SUFDSSxrQkFBa0I7SUFDbEIsZUFBZTtJQUNmLE1BQU07QUFDVjs7QUFFQTtJQUNJLFdBQVc7SUFDWCxZQUFZO0lBQ1osVUFB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QkFBeUI7QUFDbEM7O0FBRUE7SUFDSSxJQUFJO0lBQ0osS0FBSyx5QkFBeUI7QUFDbEM7O0FBRUEsK0JBQStCOztBQUUvQjtJQUNJO1FBQ0ksZ0NBQWdDO0lBQ3BDOztBQUVKXCIsXCJzb3VyY2VzQ29udGVudFwiOltcIi8qIGJvcmRlci1ib3ggbW9kZWwgZm9yIGFsbCBlbGVtZW50cyAqL1xcclxcblxcclxcbmh0bWwge1xcclxcbiAgICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xcclxcbn1cXHJcXG5cXHJcXG4qLCAqOjpiZWZvcmUsICo6OmFmdGVyIHtcXHJcXG4gICAgYm94LXNpemluZzogaW5oZXJpdDtcXHJcXG59XFxyXFxuXFxyXFxuLyogLS0tIFBhZ2UgY29sb3Igc3R5bGluZyAtLS0gKi9cXHJcXG5cXHJcXG46cm9vdCB7XFxyXFxuICAgIC0tY29sb3ItYmctbWFpbi0xOiAjNjZiM2ZjO1xcclxcbiAgICAtLWNvbG9yLWJnLW1haW4tMjogI2RiZjVmODtcXHJcXG4gICAgLS1jb2xvci1iZy1tYWluLTM6ICNkMmY4NDg7XFxyXFxuICAgIC0tY29sb3ItYmctbWFpbi00OiAjZjBjMmNkNjM7XFxyXFxuICAgIC0tY29sb3ItZm9udC0xOiAjZDlhYTYzO1xcclxcbn1cXHJcXG5cXHJcXG4vKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tICovXFxyXFxuXFxyXFxuYm9keSB7XFxyXFxuICAgIHdpZHRoOiAxMDAlO1xcclxcbiAgICBkaXNwbGF5OiBmbGV4O1xcclxcbiAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcclxcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xcclxcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1jb2xvci1iZy1tYWluLTEpO1xcclxcbn1cXHJcXG5cXHJcXG5ib2R5Lm9wZW5lZC1tZW51IHtcXHJcXG4gICAgb3ZlcmZsb3cteTogaGlkZGVuO1xcclxcbn1cXHJcXG5cXHJcXG4uaW5hY3RpdmUge1xcclxcbiAgICB2aXNpYmlsaXR5OiBoaWRkZW47XFxyXFxuICAgIHBvc2l0aW9uOiBmaXhlZDtcXHJcXG4gICAgdG9wOiAwO1xcclxcbn1cXHJcXG5cXHJcXG4uZ3JhcGhpYywgaW1nIHtcXHJcXG4gICAgd2lkdGg6IDEwMCU7XFxyXFxuICAgIGhlaWdodDogYXV0bztcXHJcXG4gICAgcGFkZGluZzogMDtcXHJcXG4gICAgbWFyZ2luOiAwO1xcclxcbn1cXHJcXG5cXHJcXG4uY29udGFpbmVyLWNlbnRlcmVkIHtcXHJcXG4gICAgbWF4LXdpZHRoOiAxNDQwcHg7XFxyXFxuICAgIG1pbi13aWR0aDogMTQ0MHB4O1xcclxcbiAgICBtYXJnaW46IDAgYXV0bztcXHJcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0tY29sb3ItYmctbWFpbi0yKTtcXHJcXG59XFxyXFxuXFxyXFxuaGVhZGVyIHtcXHJcXG4gICAgZGlzcGxheTogZmxleDtcXHJcXG4gICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXHJcXG4gICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxyXFxuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxyXFxuICAgIHBvc2l0aW9uOiAtd2Via2l0LXN0aWNreTtcXHJcXG4gICAgcG9zaXRpb246IHN0aWNreTtcXHJcXG4gICAgdG9wOiAwO1xcclxcbiAgICB6LWluZGV4OiA4O1xcclxcbn1cXHJcXG5cXHJcXG4ubWFpbi1jb250cm9scywgLmdhbWUtY29udHJvbHMge1xcclxcbiAgICB3aWR0aDogMTAwJTtcXHJcXG4gICAgbWluLWhlaWdodDogMTAwcHg7XFxyXFxuICAgIGRpc3BsYXk6IGZsZXg7XFxyXFxuICAgIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjtcXHJcXG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXHJcXG59XFxyXFxuXFxyXFxuaDEge1xcclxcbiAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XFxyXFxufVxcclxcblxcclxcbi5idXR0b246aG92ZXIge1xcclxcbiAgICBjdXJzb3I6IHBvaW50ZXI7XFxyXFxufVxcclxcblxcclxcbi5tZW51LWJ1dHRvbiB7XFxyXFxuICAgIGhlaWdodDogMjBweDtcXHJcXG4gICAgei1pbmRleDogMTA7XFxyXFxufVxcclxcblxcclxcbi5zd2l0Y2gge1xcclxcbiAgICB3aWR0aDogMTEwcHg7XFxyXFxuICAgIGJhY2tncm91bmQtY29sb3I6IHdoaXRlc21va2U7XFxyXFxuICAgIGRpc3BsYXk6IGZsZXg7XFxyXFxuICAgIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjtcXHJcXG4gICAgYm9yZGVyLXJhZGl1czogNjBweDtcXHJcXG4gICAgcG9zaXRpb246IHJlbGF0aXZlO1xcclxcbn1cXHJcXG5cXHJcXG4uc3dpdGNoLXJhaWwge1xcclxcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XFxyXFxuICAgIGxlZnQ6IDA7XFxyXFxuICAgIHdpZHRoOiAxMDAlO1xcclxcbiAgICBoZWlnaHQ6IDEwMCU7XFxyXFxuICAgIGJvcmRlci1yYWRpdXM6IGluaGVyaXQ7XFxyXFxuICAgIGRpc3BsYXk6IGZsZXg7XFxyXFxuICAgIGp1c3RpZnktY29udGVudDogZmxleC1zdGFydDtcXHJcXG59XFxyXFxuXFxyXFxuLnN3aXRjaC5zd2l0Y2gtb24gLnN3aXRjaC1yYWlsIHtcXHJcXG4gICAganVzdGlmeS1jb250ZW50OiBmbGV4LWVuZDtcXHJcXG59XFxyXFxuXFxyXFxuLnN3aXRjaC1yb2xsZXIge1xcclxcbiAgICB3aWR0aDogNTVweDtcXHJcXG4gICAgYm9yZGVyLXJhZGl1czogaW5oZXJpdDtcXHJcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogcmdiYSgyMTQsIDIyNSwgNjUsIDAuNDU5KTtcXHJcXG4gICAgei1pbmRleDogMTA7XFxyXFxufVxcclxcblxcclxcbi5zd2l0Y2gtdHJpZ2dlciB7XFxyXFxuICAgIG1hcmdpbjogMCAxMHB4O1xcclxcbiAgICBoZWlnaHQ6IDQwcHg7XFxyXFxuICAgIHotaW5kZXg6IDk7XFxyXFxuICAgIHBhZGRpbmc6IDEwcHggMDtcXHJcXG4gICAgdGV4dC1hbGlnbjogY2VudGVyO1xcclxcbn1cXHJcXG5cXHJcXG4uZ2FtZS1idXR0b24ge1xcclxcbiAgICB3aWR0aDogMTAwcHg7XFxyXFxuICAgIGhlaWdodDogMTAwcHg7XFxyXFxuICAgIGJhY2tncm91bmQtY29sb3I6IHJnYigyMTMsIDE3OCwgMjQ4KTtcXHJcXG59XFxyXFxuXFxyXFxuLmdhbWUtYnV0dG9uLnJlcGVhdC1idXR0b24ge1xcclxcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2IoMjQ4LCAxNzgsIDExMik7XFxyXFxufVxcclxcblxcclxcbi5nYW1lLXByb2dyZXNzIHtcXHJcXG4gICAgd2lkdGg6IDIyMHB4O1xcclxcbiAgICBkaXNwbGF5OiBmbGV4O1xcclxcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWFyb3VuZDtcXHJcXG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXHJcXG59XFxyXFxuXFxyXFxuLmdhbWUtaW5kaWNhdG9yIHtcXHJcXG4gICAgd2lkdGg6IDE1MHB4O1xcclxcbiAgICBoZWlnaHQ6IDQwcHg7XFxyXFxuICAgIGJhY2tncm91bmQtY29sb3I6IHJlZDtcXHJcXG4gICAgYm9yZGVyLXJhZGl1czogMThweDtcXHJcXG4gICAgZGlzcGxheTogZmxleDtcXHJcXG4gICAganVzdGlmeS1jb250ZW50OiBmbGV4LXN0YXJ0O1xcclxcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xcclxcbn1cXHJcXG5cXHJcXG4uc3RhciB7XFxyXFxuICAgIHdpZHRoOiAzMHB4O1xcclxcbn1cXHJcXG5cXHJcXG4uZ2FtZS1zY29yZSB7XFxyXFxuICAgIHRleHQtYWxpZ246IGNlbnRlcjtcXHJcXG59XFxyXFxuXFxyXFxuLmdhbWUtc2NvcmUgLmNvcnJlY3Qge1xcclxcbiAgICBjb2xvcjogZ3JlZW47XFxyXFxufVxcclxcblxcclxcbi5nYW1lLXNjb3JlIC53cm9uZyB7XFxyXFxuICAgIGNvbG9yOiByZWQ7XFxyXFxufVxcclxcblxcclxcblxcclxcbm5hdiB7XFxyXFxuICAgIHBvc2l0aW9uOiBmaXhlZDtcXHJcXG4gICAgdG9wOiAwO1xcclxcbiAgICBsZWZ0OiAtMzIwcHg7XFxyXFxuICAgIHdpZHRoOiAzMjBweDtcXHJcXG4gICAgaGVpZ2h0OiAxMDAlO1xcclxcbiAgICBkaXNwbGF5OiBmbGV4O1xcclxcbiAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcclxcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXHJcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0tY29sb3ItYmctbWFpbi0zKTtcXHJcXG4gICAgei1pbmRleDogOTtcXHJcXG4gICAgdmlzaWJpbGl0eTogaGlkZGVuO1xcclxcbn1cXHJcXG5cXHJcXG5uYXYub3BlbmVkLW1lbnUge1xcclxcbiAgICB2aXNpYmlsaXR5OiB2aXNpYmxlO1xcclxcbiAgICBsZWZ0OiAwO1xcclxcbn1cXHJcXG5cXHJcXG4ubWVudS1saXN0IGxpIHtcXHJcXG4gICAgdGV4dC1hbGlnbjogY2VudGVyO1xcclxcbiAgICBtYXJnaW46IDE1cHggMDtcXHJcXG4gICAgZm9udC1zaXplOiAyZW07XFxyXFxuICAgIGJhY2tncm91bmQtY29sb3I6IHZhcigtLWNvbG9yLWJnLW1haW4tMSk7XFxyXFxufVxcclxcblxcclxcbi5tZW51LWxpc3QgbGkuYWN0aXZlLXBhZ2Uge1xcclxcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1jb2xvci1iZy1tYWluLTQpO1xcclxcbn1cXHJcXG5cXHJcXG5tYWluLmNvbnRhaW5lci1jZW50ZXJlZCB7XFxyXFxuICAgIGJhY2tncm91bmQtY29sb3I6IHZhcigtLWNvbG9yLWJnLW1haW4tNCk7XFxyXFxufVxcclxcblxcclxcbi5jYXJkLWNvbnRhaW5lciB7XFxyXFxuICAgIGRpc3BsYXk6IGZsZXg7XFxyXFxuICAgIGp1c3RpZnktY29udGVudDogc3BhY2UtYXJvdW5kO1xcclxcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xcclxcbiAgICBmbGV4LXdyYXA6IHdyYXA7XFxyXFxufVxcclxcblxcclxcbi5jYXJkIHtcXHJcXG4gICAgd2lkdGg6IDI4MHB4O1xcclxcbiAgICBoZWlnaHQ6IDMyMHB4O1xcclxcbiAgICBtYXJnaW46IDE1cHg7XFxyXFxuICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcXHJcXG59XFxyXFxuXFxyXFxuLmNhcmQuZGlzYWJsZWQge1xcclxcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjZDJmODQ4O1xcclxcbn1cXHJcXG5cXHJcXG4uY2FyZC1jb250ZW50IHtcXHJcXG4gICAgd2lkdGg6IDEwMCU7XFxyXFxuICAgIGhlaWdodDogMTAwJTtcXHJcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogcm95YWxibHVlO1xcclxcbiAgICBwb3NpdGlvbjogcmVsYXRpdmU7XFxyXFxufVxcclxcblxcclxcbi5jYXJkLWNvbnRlbnQsIC5jYXJkIGltZyB7XFxyXFxuICAgIGJvcmRlci1yYWRpdXM6IDI1cHg7XFxyXFxufVxcclxcblxcclxcbi5jYXJkIHAge1xcclxcbiAgICBmb250LXNpemU6IDJlbTtcXHJcXG4gICAgdGV4dC1hbGlnbjogY2VudGVyO1xcclxcbn1cXHJcXG5cXHJcXG4uY2FyZC1mbGlwLWJ1dHRvbiB7XFxyXFxuICAgIHdpZHRoOiA1MHB4O1xcclxcbiAgICBoZWlnaHQ6IDUwcHg7XFxyXFxuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXHJcXG4gICAgYm90dG9tOiAyMHB4O1xcclxcbiAgICByaWdodDogMjBweDtcXHJcXG59XFxyXFxuXFxyXFxuLmNhcmQtZmxpcC1idXR0b24gc3BhbiB7XFxyXFxuICAgIGZvbnQtc2l6ZTogNTBweDtcXHJcXG59XFxyXFxuXFxyXFxuLmZsaXBwZWQgLmNhcmQtY29udGVudCB7XFxyXFxuICAgIGFuaW1hdGlvbi1uYW1lOiBmbGlwLWNhcmQ7XFxyXFxuICAgIGFuaW1hdGlvbi1kdXJhdGlvbjogMXM7XFxyXFxufVxcclxcblxcclxcbi51bmZsaXBwZWQgLmNhcmQtY29udGVudCB7XFxyXFxuICAgIGFuaW1hdGlvbi1uYW1lOiB1bmZsaXAtY2FyZDtcXHJcXG4gICAgYW5pbWF0aW9uLWR1cmF0aW9uOiAxcztcXHJcXG59XFxyXFxuXFxyXFxuLmZpbmFsLWNsaXAge1xcclxcbiAgICBkaXNwbGF5OiBmbGV4O1xcclxcbiAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcclxcbiAgICB3aWR0aDogMzIwcHg7XFxyXFxuICAgIG1hcmdpbjogYXV0bztcXHJcXG4gICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxyXFxuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxyXFxuICAgIHBhZGRpbmc6IDUwcHggMDtcXHJcXG59XFxyXFxuXFxyXFxuLmZpbmFsLWNsaXAgcCB7XFxyXFxuICAgIGNvbG9yOiByZWQ7XFxyXFxuICAgIGZvbnQtc2l6ZTogMzZweDtcXHJcXG4gICAgbWFyZ2luLXRvcDogMzBweDtcXHJcXG59XFxyXFxuXFxyXFxuQGtleWZyYW1lcyBmbGlwLWNhcmQge1xcclxcbiAgICAwJSB7fVxcclxcbiAgICA1MCUge3RyYW5zZm9ybTogcm90YXRlWSg4OWRlZyl9XFxyXFxufVxcclxcblxcclxcbkBrZXlmcmFtZXMgdW5mbGlwLWNhcmQge1xcclxcbiAgICAwJSB7fVxcclxcbiAgICA1MCUge3RyYW5zZm9ybTogcm90YXRlWSg4OWRlZyl9XFxyXFxufVxcclxcblxcclxcbi8qIC0tLSBSRVNQT05TSVZFIExBWU9VVFMgLS0tICovXFxyXFxuXFxyXFxuQG1lZGlhIChtYXgtd2lkdGg6IDE0MzlweCkge1xcclxcbiAgICAuY29udGFpbmVyLWNlbnRlcmVkIHtcXHJcXG4gICAgICAgIG1pbi13aWR0aDogY2FsYygxNDQwdncqMTAwLzE0NDApO1xcclxcbiAgICB9XFxyXFxuXFxyXFxufVwiXSxcInNvdXJjZVJvb3RcIjpcIlwifV0pO1xuLy8gRXhwb3J0c1xuZXhwb3J0IGRlZmF1bHQgX19fQ1NTX0xPQURFUl9FWFBPUlRfX187XG4iLCJcInVzZSBzdHJpY3RcIjtcblxuLypcbiAgTUlUIExpY2Vuc2UgaHR0cDovL3d3dy5vcGVuc291cmNlLm9yZy9saWNlbnNlcy9taXQtbGljZW5zZS5waHBcbiAgQXV0aG9yIFRvYmlhcyBLb3BwZXJzIEBzb2tyYVxuKi9cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGNzc1dpdGhNYXBwaW5nVG9TdHJpbmcpIHtcbiAgdmFyIGxpc3QgPSBbXTsgLy8gcmV0dXJuIHRoZSBsaXN0IG9mIG1vZHVsZXMgYXMgY3NzIHN0cmluZ1xuXG4gIGxpc3QudG9TdHJpbmcgPSBmdW5jdGlvbiB0b1N0cmluZygpIHtcbiAgICByZXR1cm4gdGhpcy5tYXAoZnVuY3Rpb24gKGl0ZW0pIHtcbiAgICAgIHZhciBjb250ZW50ID0gXCJcIjtcbiAgICAgIHZhciBuZWVkTGF5ZXIgPSB0eXBlb2YgaXRlbVs1XSAhPT0gXCJ1bmRlZmluZWRcIjtcblxuICAgICAgaWYgKGl0ZW1bNF0pIHtcbiAgICAgICAgY29udGVudCArPSBcIkBzdXBwb3J0cyAoXCIuY29uY2F0KGl0ZW1bNF0sIFwiKSB7XCIpO1xuICAgICAgfVxuXG4gICAgICBpZiAoaXRlbVsyXSkge1xuICAgICAgICBjb250ZW50ICs9IFwiQG1lZGlhIFwiLmNvbmNhdChpdGVtWzJdLCBcIiB7XCIpO1xuICAgICAgfVxuXG4gICAgICBpZiAobmVlZExheWVyKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJAbGF5ZXJcIi5jb25jYXQoaXRlbVs1XS5sZW5ndGggPiAwID8gXCIgXCIuY29uY2F0KGl0ZW1bNV0pIDogXCJcIiwgXCIge1wiKTtcbiAgICAgIH1cblxuICAgICAgY29udGVudCArPSBjc3NXaXRoTWFwcGluZ1RvU3RyaW5nKGl0ZW0pO1xuXG4gICAgICBpZiAobmVlZExheWVyKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJ9XCI7XG4gICAgICB9XG5cbiAgICAgIGlmIChpdGVtWzJdKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJ9XCI7XG4gICAgICB9XG5cbiAgICAgIGlmIChpdGVtWzRdKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJ9XCI7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBjb250ZW50O1xuICAgIH0pLmpvaW4oXCJcIik7XG4gIH07IC8vIGltcG9ydCBhIGxpc3Qgb2YgbW9kdWxlcyBpbnRvIHRoZSBsaXN0XG5cblxuICBsaXN0LmkgPSBmdW5jdGlvbiBpKG1vZHVsZXMsIG1lZGlhLCBkZWR1cGUsIHN1cHBvcnRzLCBsYXllcikge1xuICAgIGlmICh0eXBlb2YgbW9kdWxlcyA9PT0gXCJzdHJpbmdcIikge1xuICAgICAgbW9kdWxlcyA9IFtbbnVsbCwgbW9kdWxlcywgdW5kZWZpbmVkXV07XG4gICAgfVxuXG4gICAgdmFyIGFscmVhZHlJbXBvcnRlZE1vZHVsZXMgPSB7fTtcblxuICAgIGlmIChkZWR1cGUpIHtcbiAgICAgIGZvciAodmFyIGsgPSAwOyBrIDwgdGhpcy5sZW5ndGg7IGsrKykge1xuICAgICAgICB2YXIgaWQgPSB0aGlzW2tdWzBdO1xuXG4gICAgICAgIGlmIChpZCAhPSBudWxsKSB7XG4gICAgICAgICAgYWxyZWFkeUltcG9ydGVkTW9kdWxlc1tpZF0gPSB0cnVlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgZm9yICh2YXIgX2sgPSAwOyBfayA8IG1vZHVsZXMubGVuZ3RoOyBfaysrKSB7XG4gICAgICB2YXIgaXRlbSA9IFtdLmNvbmNhdChtb2R1bGVzW19rXSk7XG5cbiAgICAgIGlmIChkZWR1cGUgJiYgYWxyZWFkeUltcG9ydGVkTW9kdWxlc1tpdGVtWzBdXSkge1xuICAgICAgICBjb250aW51ZTtcbiAgICAgIH1cblxuICAgICAgaWYgKHR5cGVvZiBsYXllciAhPT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgICBpZiAodHlwZW9mIGl0ZW1bNV0gPT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgICAgICBpdGVtWzVdID0gbGF5ZXI7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaXRlbVsxXSA9IFwiQGxheWVyXCIuY29uY2F0KGl0ZW1bNV0ubGVuZ3RoID4gMCA/IFwiIFwiLmNvbmNhdChpdGVtWzVdKSA6IFwiXCIsIFwiIHtcIikuY29uY2F0KGl0ZW1bMV0sIFwifVwiKTtcbiAgICAgICAgICBpdGVtWzVdID0gbGF5ZXI7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgaWYgKG1lZGlhKSB7XG4gICAgICAgIGlmICghaXRlbVsyXSkge1xuICAgICAgICAgIGl0ZW1bMl0gPSBtZWRpYTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpdGVtWzFdID0gXCJAbWVkaWEgXCIuY29uY2F0KGl0ZW1bMl0sIFwiIHtcIikuY29uY2F0KGl0ZW1bMV0sIFwifVwiKTtcbiAgICAgICAgICBpdGVtWzJdID0gbWVkaWE7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgaWYgKHN1cHBvcnRzKSB7XG4gICAgICAgIGlmICghaXRlbVs0XSkge1xuICAgICAgICAgIGl0ZW1bNF0gPSBcIlwiLmNvbmNhdChzdXBwb3J0cyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaXRlbVsxXSA9IFwiQHN1cHBvcnRzIChcIi5jb25jYXQoaXRlbVs0XSwgXCIpIHtcIikuY29uY2F0KGl0ZW1bMV0sIFwifVwiKTtcbiAgICAgICAgICBpdGVtWzRdID0gc3VwcG9ydHM7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgbGlzdC5wdXNoKGl0ZW0pO1xuICAgIH1cbiAgfTtcblxuICByZXR1cm4gbGlzdDtcbn07IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0ZW0pIHtcbiAgdmFyIGNvbnRlbnQgPSBpdGVtWzFdO1xuICB2YXIgY3NzTWFwcGluZyA9IGl0ZW1bM107XG5cbiAgaWYgKCFjc3NNYXBwaW5nKSB7XG4gICAgcmV0dXJuIGNvbnRlbnQ7XG4gIH1cblxuICBpZiAodHlwZW9mIGJ0b2EgPT09IFwiZnVuY3Rpb25cIikge1xuICAgIHZhciBiYXNlNjQgPSBidG9hKHVuZXNjYXBlKGVuY29kZVVSSUNvbXBvbmVudChKU09OLnN0cmluZ2lmeShjc3NNYXBwaW5nKSkpKTtcbiAgICB2YXIgZGF0YSA9IFwic291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247Y2hhcnNldD11dGYtODtiYXNlNjQsXCIuY29uY2F0KGJhc2U2NCk7XG4gICAgdmFyIHNvdXJjZU1hcHBpbmcgPSBcIi8qIyBcIi5jb25jYXQoZGF0YSwgXCIgKi9cIik7XG4gICAgdmFyIHNvdXJjZVVSTHMgPSBjc3NNYXBwaW5nLnNvdXJjZXMubWFwKGZ1bmN0aW9uIChzb3VyY2UpIHtcbiAgICAgIHJldHVybiBcIi8qIyBzb3VyY2VVUkw9XCIuY29uY2F0KGNzc01hcHBpbmcuc291cmNlUm9vdCB8fCBcIlwiKS5jb25jYXQoc291cmNlLCBcIiAqL1wiKTtcbiAgICB9KTtcbiAgICByZXR1cm4gW2NvbnRlbnRdLmNvbmNhdChzb3VyY2VVUkxzKS5jb25jYXQoW3NvdXJjZU1hcHBpbmddKS5qb2luKFwiXFxuXCIpO1xuICB9XG5cbiAgcmV0dXJuIFtjb250ZW50XS5qb2luKFwiXFxuXCIpO1xufTsiLCJcbiAgICAgIGltcG9ydCBBUEkgZnJvbSBcIiEuLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbmplY3RTdHlsZXNJbnRvU3R5bGVUYWcuanNcIjtcbiAgICAgIGltcG9ydCBkb21BUEkgZnJvbSBcIiEuLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZURvbUFQSS5qc1wiO1xuICAgICAgaW1wb3J0IGluc2VydEZuIGZyb20gXCIhLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0QnlTZWxlY3Rvci5qc1wiO1xuICAgICAgaW1wb3J0IHNldEF0dHJpYnV0ZXMgZnJvbSBcIiEuLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXMuanNcIjtcbiAgICAgIGltcG9ydCBpbnNlcnRTdHlsZUVsZW1lbnQgZnJvbSBcIiEuLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRTdHlsZUVsZW1lbnQuanNcIjtcbiAgICAgIGltcG9ydCBzdHlsZVRhZ1RyYW5zZm9ybUZuIGZyb20gXCIhLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVUYWdUcmFuc2Zvcm0uanNcIjtcbiAgICAgIGltcG9ydCBjb250ZW50LCAqIGFzIG5hbWVkRXhwb3J0IGZyb20gXCIhIS4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4vbm9ybWFsaXplLmNzc1wiO1xuICAgICAgXG4gICAgICBcblxudmFyIG9wdGlvbnMgPSB7fTtcblxub3B0aW9ucy5zdHlsZVRhZ1RyYW5zZm9ybSA9IHN0eWxlVGFnVHJhbnNmb3JtRm47XG5vcHRpb25zLnNldEF0dHJpYnV0ZXMgPSBzZXRBdHRyaWJ1dGVzO1xuXG4gICAgICBvcHRpb25zLmluc2VydCA9IGluc2VydEZuLmJpbmQobnVsbCwgXCJoZWFkXCIpO1xuICAgIFxub3B0aW9ucy5kb21BUEkgPSBkb21BUEk7XG5vcHRpb25zLmluc2VydFN0eWxlRWxlbWVudCA9IGluc2VydFN0eWxlRWxlbWVudDtcblxudmFyIHVwZGF0ZSA9IEFQSShjb250ZW50LCBvcHRpb25zKTtcblxuXG5cbmV4cG9ydCAqIGZyb20gXCIhIS4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4vbm9ybWFsaXplLmNzc1wiO1xuICAgICAgIGV4cG9ydCBkZWZhdWx0IGNvbnRlbnQgJiYgY29udGVudC5sb2NhbHMgPyBjb250ZW50LmxvY2FscyA6IHVuZGVmaW5lZDtcbiIsIlxuICAgICAgaW1wb3J0IEFQSSBmcm9tIFwiIS4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luamVjdFN0eWxlc0ludG9TdHlsZVRhZy5qc1wiO1xuICAgICAgaW1wb3J0IGRvbUFQSSBmcm9tIFwiIS4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlRG9tQVBJLmpzXCI7XG4gICAgICBpbXBvcnQgaW5zZXJ0Rm4gZnJvbSBcIiEuLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRCeVNlbGVjdG9yLmpzXCI7XG4gICAgICBpbXBvcnQgc2V0QXR0cmlidXRlcyBmcm9tIFwiIS4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3NldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlcy5qc1wiO1xuICAgICAgaW1wb3J0IGluc2VydFN0eWxlRWxlbWVudCBmcm9tIFwiIS4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydFN0eWxlRWxlbWVudC5qc1wiO1xuICAgICAgaW1wb3J0IHN0eWxlVGFnVHJhbnNmb3JtRm4gZnJvbSBcIiEuLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZVRhZ1RyYW5zZm9ybS5qc1wiO1xuICAgICAgaW1wb3J0IGNvbnRlbnQsICogYXMgbmFtZWRFeHBvcnQgZnJvbSBcIiEhLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanMhLi9yZXNldC5jc3NcIjtcbiAgICAgIFxuICAgICAgXG5cbnZhciBvcHRpb25zID0ge307XG5cbm9wdGlvbnMuc3R5bGVUYWdUcmFuc2Zvcm0gPSBzdHlsZVRhZ1RyYW5zZm9ybUZuO1xub3B0aW9ucy5zZXRBdHRyaWJ1dGVzID0gc2V0QXR0cmlidXRlcztcblxuICAgICAgb3B0aW9ucy5pbnNlcnQgPSBpbnNlcnRGbi5iaW5kKG51bGwsIFwiaGVhZFwiKTtcbiAgICBcbm9wdGlvbnMuZG9tQVBJID0gZG9tQVBJO1xub3B0aW9ucy5pbnNlcnRTdHlsZUVsZW1lbnQgPSBpbnNlcnRTdHlsZUVsZW1lbnQ7XG5cbnZhciB1cGRhdGUgPSBBUEkoY29udGVudCwgb3B0aW9ucyk7XG5cblxuXG5leHBvcnQgKiBmcm9tIFwiISEuLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L2Nqcy5qcyEuL3Jlc2V0LmNzc1wiO1xuICAgICAgIGV4cG9ydCBkZWZhdWx0IGNvbnRlbnQgJiYgY29udGVudC5sb2NhbHMgPyBjb250ZW50LmxvY2FscyA6IHVuZGVmaW5lZDtcbiIsIlxuICAgICAgaW1wb3J0IEFQSSBmcm9tIFwiIS4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luamVjdFN0eWxlc0ludG9TdHlsZVRhZy5qc1wiO1xuICAgICAgaW1wb3J0IGRvbUFQSSBmcm9tIFwiIS4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlRG9tQVBJLmpzXCI7XG4gICAgICBpbXBvcnQgaW5zZXJ0Rm4gZnJvbSBcIiEuLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRCeVNlbGVjdG9yLmpzXCI7XG4gICAgICBpbXBvcnQgc2V0QXR0cmlidXRlcyBmcm9tIFwiIS4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3NldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlcy5qc1wiO1xuICAgICAgaW1wb3J0IGluc2VydFN0eWxlRWxlbWVudCBmcm9tIFwiIS4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydFN0eWxlRWxlbWVudC5qc1wiO1xuICAgICAgaW1wb3J0IHN0eWxlVGFnVHJhbnNmb3JtRm4gZnJvbSBcIiEuLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZVRhZ1RyYW5zZm9ybS5qc1wiO1xuICAgICAgaW1wb3J0IGNvbnRlbnQsICogYXMgbmFtZWRFeHBvcnQgZnJvbSBcIiEhLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanMhLi9zdHlsZS5jc3NcIjtcbiAgICAgIFxuICAgICAgXG5cbnZhciBvcHRpb25zID0ge307XG5cbm9wdGlvbnMuc3R5bGVUYWdUcmFuc2Zvcm0gPSBzdHlsZVRhZ1RyYW5zZm9ybUZuO1xub3B0aW9ucy5zZXRBdHRyaWJ1dGVzID0gc2V0QXR0cmlidXRlcztcblxuICAgICAgb3B0aW9ucy5pbnNlcnQgPSBpbnNlcnRGbi5iaW5kKG51bGwsIFwiaGVhZFwiKTtcbiAgICBcbm9wdGlvbnMuZG9tQVBJID0gZG9tQVBJO1xub3B0aW9ucy5pbnNlcnRTdHlsZUVsZW1lbnQgPSBpbnNlcnRTdHlsZUVsZW1lbnQ7XG5cbnZhciB1cGRhdGUgPSBBUEkoY29udGVudCwgb3B0aW9ucyk7XG5cblxuXG5leHBvcnQgKiBmcm9tIFwiISEuLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L2Nqcy5qcyEuL3N0eWxlLmNzc1wiO1xuICAgICAgIGV4cG9ydCBkZWZhdWx0IGNvbnRlbnQgJiYgY29udGVudC5sb2NhbHMgPyBjb250ZW50LmxvY2FscyA6IHVuZGVmaW5lZDtcbiIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgc3R5bGVzSW5ET00gPSBbXTtcblxuZnVuY3Rpb24gZ2V0SW5kZXhCeUlkZW50aWZpZXIoaWRlbnRpZmllcikge1xuICB2YXIgcmVzdWx0ID0gLTE7XG5cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBzdHlsZXNJbkRPTS5sZW5ndGg7IGkrKykge1xuICAgIGlmIChzdHlsZXNJbkRPTVtpXS5pZGVudGlmaWVyID09PSBpZGVudGlmaWVyKSB7XG4gICAgICByZXN1bHQgPSBpO1xuICAgICAgYnJlYWs7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxuZnVuY3Rpb24gbW9kdWxlc1RvRG9tKGxpc3QsIG9wdGlvbnMpIHtcbiAgdmFyIGlkQ291bnRNYXAgPSB7fTtcbiAgdmFyIGlkZW50aWZpZXJzID0gW107XG5cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBsaXN0Lmxlbmd0aDsgaSsrKSB7XG4gICAgdmFyIGl0ZW0gPSBsaXN0W2ldO1xuICAgIHZhciBpZCA9IG9wdGlvbnMuYmFzZSA/IGl0ZW1bMF0gKyBvcHRpb25zLmJhc2UgOiBpdGVtWzBdO1xuICAgIHZhciBjb3VudCA9IGlkQ291bnRNYXBbaWRdIHx8IDA7XG4gICAgdmFyIGlkZW50aWZpZXIgPSBcIlwiLmNvbmNhdChpZCwgXCIgXCIpLmNvbmNhdChjb3VudCk7XG4gICAgaWRDb3VudE1hcFtpZF0gPSBjb3VudCArIDE7XG4gICAgdmFyIGluZGV4QnlJZGVudGlmaWVyID0gZ2V0SW5kZXhCeUlkZW50aWZpZXIoaWRlbnRpZmllcik7XG4gICAgdmFyIG9iaiA9IHtcbiAgICAgIGNzczogaXRlbVsxXSxcbiAgICAgIG1lZGlhOiBpdGVtWzJdLFxuICAgICAgc291cmNlTWFwOiBpdGVtWzNdLFxuICAgICAgc3VwcG9ydHM6IGl0ZW1bNF0sXG4gICAgICBsYXllcjogaXRlbVs1XVxuICAgIH07XG5cbiAgICBpZiAoaW5kZXhCeUlkZW50aWZpZXIgIT09IC0xKSB7XG4gICAgICBzdHlsZXNJbkRPTVtpbmRleEJ5SWRlbnRpZmllcl0ucmVmZXJlbmNlcysrO1xuICAgICAgc3R5bGVzSW5ET01baW5kZXhCeUlkZW50aWZpZXJdLnVwZGF0ZXIob2JqKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdmFyIHVwZGF0ZXIgPSBhZGRFbGVtZW50U3R5bGUob2JqLCBvcHRpb25zKTtcbiAgICAgIG9wdGlvbnMuYnlJbmRleCA9IGk7XG4gICAgICBzdHlsZXNJbkRPTS5zcGxpY2UoaSwgMCwge1xuICAgICAgICBpZGVudGlmaWVyOiBpZGVudGlmaWVyLFxuICAgICAgICB1cGRhdGVyOiB1cGRhdGVyLFxuICAgICAgICByZWZlcmVuY2VzOiAxXG4gICAgICB9KTtcbiAgICB9XG5cbiAgICBpZGVudGlmaWVycy5wdXNoKGlkZW50aWZpZXIpO1xuICB9XG5cbiAgcmV0dXJuIGlkZW50aWZpZXJzO1xufVxuXG5mdW5jdGlvbiBhZGRFbGVtZW50U3R5bGUob2JqLCBvcHRpb25zKSB7XG4gIHZhciBhcGkgPSBvcHRpb25zLmRvbUFQSShvcHRpb25zKTtcbiAgYXBpLnVwZGF0ZShvYmopO1xuXG4gIHZhciB1cGRhdGVyID0gZnVuY3Rpb24gdXBkYXRlcihuZXdPYmopIHtcbiAgICBpZiAobmV3T2JqKSB7XG4gICAgICBpZiAobmV3T2JqLmNzcyA9PT0gb2JqLmNzcyAmJiBuZXdPYmoubWVkaWEgPT09IG9iai5tZWRpYSAmJiBuZXdPYmouc291cmNlTWFwID09PSBvYmouc291cmNlTWFwICYmIG5ld09iai5zdXBwb3J0cyA9PT0gb2JqLnN1cHBvcnRzICYmIG5ld09iai5sYXllciA9PT0gb2JqLmxheWVyKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgYXBpLnVwZGF0ZShvYmogPSBuZXdPYmopO1xuICAgIH0gZWxzZSB7XG4gICAgICBhcGkucmVtb3ZlKCk7XG4gICAgfVxuICB9O1xuXG4gIHJldHVybiB1cGRhdGVyO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChsaXN0LCBvcHRpb25zKSB7XG4gIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuICBsaXN0ID0gbGlzdCB8fCBbXTtcbiAgdmFyIGxhc3RJZGVudGlmaWVycyA9IG1vZHVsZXNUb0RvbShsaXN0LCBvcHRpb25zKTtcbiAgcmV0dXJuIGZ1bmN0aW9uIHVwZGF0ZShuZXdMaXN0KSB7XG4gICAgbmV3TGlzdCA9IG5ld0xpc3QgfHwgW107XG5cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxhc3RJZGVudGlmaWVycy5sZW5ndGg7IGkrKykge1xuICAgICAgdmFyIGlkZW50aWZpZXIgPSBsYXN0SWRlbnRpZmllcnNbaV07XG4gICAgICB2YXIgaW5kZXggPSBnZXRJbmRleEJ5SWRlbnRpZmllcihpZGVudGlmaWVyKTtcbiAgICAgIHN0eWxlc0luRE9NW2luZGV4XS5yZWZlcmVuY2VzLS07XG4gICAgfVxuXG4gICAgdmFyIG5ld0xhc3RJZGVudGlmaWVycyA9IG1vZHVsZXNUb0RvbShuZXdMaXN0LCBvcHRpb25zKTtcblxuICAgIGZvciAodmFyIF9pID0gMDsgX2kgPCBsYXN0SWRlbnRpZmllcnMubGVuZ3RoOyBfaSsrKSB7XG4gICAgICB2YXIgX2lkZW50aWZpZXIgPSBsYXN0SWRlbnRpZmllcnNbX2ldO1xuXG4gICAgICB2YXIgX2luZGV4ID0gZ2V0SW5kZXhCeUlkZW50aWZpZXIoX2lkZW50aWZpZXIpO1xuXG4gICAgICBpZiAoc3R5bGVzSW5ET01bX2luZGV4XS5yZWZlcmVuY2VzID09PSAwKSB7XG4gICAgICAgIHN0eWxlc0luRE9NW19pbmRleF0udXBkYXRlcigpO1xuXG4gICAgICAgIHN0eWxlc0luRE9NLnNwbGljZShfaW5kZXgsIDEpO1xuICAgICAgfVxuICAgIH1cblxuICAgIGxhc3RJZGVudGlmaWVycyA9IG5ld0xhc3RJZGVudGlmaWVycztcbiAgfTtcbn07IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBtZW1vID0ge307XG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cblxuZnVuY3Rpb24gZ2V0VGFyZ2V0KHRhcmdldCkge1xuICBpZiAodHlwZW9mIG1lbW9bdGFyZ2V0XSA9PT0gXCJ1bmRlZmluZWRcIikge1xuICAgIHZhciBzdHlsZVRhcmdldCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IodGFyZ2V0KTsgLy8gU3BlY2lhbCBjYXNlIHRvIHJldHVybiBoZWFkIG9mIGlmcmFtZSBpbnN0ZWFkIG9mIGlmcmFtZSBpdHNlbGZcblxuICAgIGlmICh3aW5kb3cuSFRNTElGcmFtZUVsZW1lbnQgJiYgc3R5bGVUYXJnZXQgaW5zdGFuY2VvZiB3aW5kb3cuSFRNTElGcmFtZUVsZW1lbnQpIHtcbiAgICAgIHRyeSB7XG4gICAgICAgIC8vIFRoaXMgd2lsbCB0aHJvdyBhbiBleGNlcHRpb24gaWYgYWNjZXNzIHRvIGlmcmFtZSBpcyBibG9ja2VkXG4gICAgICAgIC8vIGR1ZSB0byBjcm9zcy1vcmlnaW4gcmVzdHJpY3Rpb25zXG4gICAgICAgIHN0eWxlVGFyZ2V0ID0gc3R5bGVUYXJnZXQuY29udGVudERvY3VtZW50LmhlYWQ7XG4gICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIC8vIGlzdGFuYnVsIGlnbm9yZSBuZXh0XG4gICAgICAgIHN0eWxlVGFyZ2V0ID0gbnVsbDtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBtZW1vW3RhcmdldF0gPSBzdHlsZVRhcmdldDtcbiAgfVxuXG4gIHJldHVybiBtZW1vW3RhcmdldF07XG59XG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cblxuXG5mdW5jdGlvbiBpbnNlcnRCeVNlbGVjdG9yKGluc2VydCwgc3R5bGUpIHtcbiAgdmFyIHRhcmdldCA9IGdldFRhcmdldChpbnNlcnQpO1xuXG4gIGlmICghdGFyZ2V0KSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKFwiQ291bGRuJ3QgZmluZCBhIHN0eWxlIHRhcmdldC4gVGhpcyBwcm9iYWJseSBtZWFucyB0aGF0IHRoZSB2YWx1ZSBmb3IgdGhlICdpbnNlcnQnIHBhcmFtZXRlciBpcyBpbnZhbGlkLlwiKTtcbiAgfVxuXG4gIHRhcmdldC5hcHBlbmRDaGlsZChzdHlsZSk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gaW5zZXJ0QnlTZWxlY3RvcjsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBpbnNlcnRTdHlsZUVsZW1lbnQob3B0aW9ucykge1xuICB2YXIgZWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzdHlsZVwiKTtcbiAgb3B0aW9ucy5zZXRBdHRyaWJ1dGVzKGVsZW1lbnQsIG9wdGlvbnMuYXR0cmlidXRlcyk7XG4gIG9wdGlvbnMuaW5zZXJ0KGVsZW1lbnQsIG9wdGlvbnMub3B0aW9ucyk7XG4gIHJldHVybiBlbGVtZW50O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGluc2VydFN0eWxlRWxlbWVudDsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBzZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXMoc3R5bGVFbGVtZW50KSB7XG4gIHZhciBub25jZSA9IHR5cGVvZiBfX3dlYnBhY2tfbm9uY2VfXyAhPT0gXCJ1bmRlZmluZWRcIiA/IF9fd2VicGFja19ub25jZV9fIDogbnVsbDtcblxuICBpZiAobm9uY2UpIHtcbiAgICBzdHlsZUVsZW1lbnQuc2V0QXR0cmlidXRlKFwibm9uY2VcIiwgbm9uY2UpO1xuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzOyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIGFwcGx5KHN0eWxlRWxlbWVudCwgb3B0aW9ucywgb2JqKSB7XG4gIHZhciBjc3MgPSBcIlwiO1xuXG4gIGlmIChvYmouc3VwcG9ydHMpIHtcbiAgICBjc3MgKz0gXCJAc3VwcG9ydHMgKFwiLmNvbmNhdChvYmouc3VwcG9ydHMsIFwiKSB7XCIpO1xuICB9XG5cbiAgaWYgKG9iai5tZWRpYSkge1xuICAgIGNzcyArPSBcIkBtZWRpYSBcIi5jb25jYXQob2JqLm1lZGlhLCBcIiB7XCIpO1xuICB9XG5cbiAgdmFyIG5lZWRMYXllciA9IHR5cGVvZiBvYmoubGF5ZXIgIT09IFwidW5kZWZpbmVkXCI7XG5cbiAgaWYgKG5lZWRMYXllcikge1xuICAgIGNzcyArPSBcIkBsYXllclwiLmNvbmNhdChvYmoubGF5ZXIubGVuZ3RoID4gMCA/IFwiIFwiLmNvbmNhdChvYmoubGF5ZXIpIDogXCJcIiwgXCIge1wiKTtcbiAgfVxuXG4gIGNzcyArPSBvYmouY3NzO1xuXG4gIGlmIChuZWVkTGF5ZXIpIHtcbiAgICBjc3MgKz0gXCJ9XCI7XG4gIH1cblxuICBpZiAob2JqLm1lZGlhKSB7XG4gICAgY3NzICs9IFwifVwiO1xuICB9XG5cbiAgaWYgKG9iai5zdXBwb3J0cykge1xuICAgIGNzcyArPSBcIn1cIjtcbiAgfVxuXG4gIHZhciBzb3VyY2VNYXAgPSBvYmouc291cmNlTWFwO1xuXG4gIGlmIChzb3VyY2VNYXAgJiYgdHlwZW9mIGJ0b2EgIT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICBjc3MgKz0gXCJcXG4vKiMgc291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247YmFzZTY0LFwiLmNvbmNhdChidG9hKHVuZXNjYXBlKGVuY29kZVVSSUNvbXBvbmVudChKU09OLnN0cmluZ2lmeShzb3VyY2VNYXApKSkpLCBcIiAqL1wiKTtcbiAgfSAvLyBGb3Igb2xkIElFXG5cbiAgLyogaXN0YW5idWwgaWdub3JlIGlmICAqL1xuXG5cbiAgb3B0aW9ucy5zdHlsZVRhZ1RyYW5zZm9ybShjc3MsIHN0eWxlRWxlbWVudCwgb3B0aW9ucy5vcHRpb25zKTtcbn1cblxuZnVuY3Rpb24gcmVtb3ZlU3R5bGVFbGVtZW50KHN0eWxlRWxlbWVudCkge1xuICAvLyBpc3RhbmJ1bCBpZ25vcmUgaWZcbiAgaWYgKHN0eWxlRWxlbWVudC5wYXJlbnROb2RlID09PSBudWxsKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgc3R5bGVFbGVtZW50LnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoc3R5bGVFbGVtZW50KTtcbn1cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuXG5cbmZ1bmN0aW9uIGRvbUFQSShvcHRpb25zKSB7XG4gIHZhciBzdHlsZUVsZW1lbnQgPSBvcHRpb25zLmluc2VydFN0eWxlRWxlbWVudChvcHRpb25zKTtcbiAgcmV0dXJuIHtcbiAgICB1cGRhdGU6IGZ1bmN0aW9uIHVwZGF0ZShvYmopIHtcbiAgICAgIGFwcGx5KHN0eWxlRWxlbWVudCwgb3B0aW9ucywgb2JqKTtcbiAgICB9LFxuICAgIHJlbW92ZTogZnVuY3Rpb24gcmVtb3ZlKCkge1xuICAgICAgcmVtb3ZlU3R5bGVFbGVtZW50KHN0eWxlRWxlbWVudCk7XG4gICAgfVxuICB9O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGRvbUFQSTsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBzdHlsZVRhZ1RyYW5zZm9ybShjc3MsIHN0eWxlRWxlbWVudCkge1xuICBpZiAoc3R5bGVFbGVtZW50LnN0eWxlU2hlZXQpIHtcbiAgICBzdHlsZUVsZW1lbnQuc3R5bGVTaGVldC5jc3NUZXh0ID0gY3NzO1xuICB9IGVsc2Uge1xuICAgIHdoaWxlIChzdHlsZUVsZW1lbnQuZmlyc3RDaGlsZCkge1xuICAgICAgc3R5bGVFbGVtZW50LnJlbW92ZUNoaWxkKHN0eWxlRWxlbWVudC5maXJzdENoaWxkKTtcbiAgICB9XG5cbiAgICBzdHlsZUVsZW1lbnQuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoY3NzKSk7XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBzdHlsZVRhZ1RyYW5zZm9ybTsiLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdGlkOiBtb2R1bGVJZCxcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbl9fd2VicGFja19yZXF1aXJlX18ubiA9IChtb2R1bGUpID0+IHtcblx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG5cdFx0KCkgPT4gKG1vZHVsZVsnZGVmYXVsdCddKSA6XG5cdFx0KCkgPT4gKG1vZHVsZSk7XG5cdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsIHsgYTogZ2V0dGVyIH0pO1xuXHRyZXR1cm4gZ2V0dGVyO1xufTsiLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5uYyA9IHVuZGVmaW5lZDsiLCIvKiBlc2xpbnQtZGlzYWJsZSBsaW5lYnJlYWstc3R5bGUgKi9cclxuLyogZXNsaW50LWRpc2FibGUgbm8tdW5kZWYgKi9cclxuXHJcbmltcG9ydCAnLi4vYXNzZXRzL3N0eWxlcy9yZXNldC5jc3MnO1xyXG5pbXBvcnQgJy4uL2Fzc2V0cy9zdHlsZXMvbm9ybWFsaXplLmNzcyc7XHJcbmltcG9ydCAnLi4vYXNzZXRzL3N0eWxlcy9zdHlsZS5jc3MnO1xyXG5cclxuaW1wb3J0IGRhdGFBcnJheXMgZnJvbSAnLi4vYXNzZXRzL2pzL2NhcmRzJztcclxuaW1wb3J0IEFwcENvbnRyb2wgZnJvbSAnLi4vYXNzZXRzL2pzL2FwcENvbnRyb2wnO1xyXG5pbXBvcnQgY2xpY2tVc2VySW50ZXJhY3RpdmUgZnJvbSAnLi4vYXNzZXRzL2pzL2NsaWNrVXNlckludGVyYWN0aXZlJztcclxuXHJcbmNvbnN0IFt0b3BpY3MsIGNhcmRzXSA9IFtkYXRhQXJyYXlzWzBdLCBkYXRhQXJyYXlzLnNsaWNlKDEpXTtcclxuXHJcbmNvbnN0IGFwcENvbnRyb2wgPSBuZXcgQXBwQ29udHJvbCh0b3BpY3MsIGNhcmRzKTtcclxuXHJcbmRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2JvZHknKS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChldmVudCkgPT4gY2xpY2tVc2VySW50ZXJhY3RpdmUoZXZlbnQsIGFwcENvbnRyb2wpKTtcclxuIl0sIm5hbWVzIjpbImRhdGFBcnJheXMiLCJBcHBDb250cm9sIiwiY2xpY2tVc2VySW50ZXJhY3RpdmUiLCJzbGljZSIsInRvcGljcyIsImNhcmRzIiwiYXBwQ29udHJvbCIsImRvY3VtZW50IiwicXVlcnlTZWxlY3RvciIsImFkZEV2ZW50TGlzdGVuZXIiLCJldmVudCJdLCJzb3VyY2VSb290IjoiIn0=