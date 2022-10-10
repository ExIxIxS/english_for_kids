/* eslint-disable linebreak-style */
/* eslint-disable no-restricted-syntax */
/* eslint-disable linebreak-style */
/* eslint-disable no-console */
/* eslint-disable linebreak-style */
/* eslint-disable class-methods-use-this */
/* eslint-disable no-undef */

import Card from './card';
import { createCustomElement } from './commonFunct';

export default class ContentContainer {
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
    const contentWrapper = createCustomElement('div', 'content-wrapper');
    let contentElement;

    switch (this.type) {
      case 'statistic':
        break;
      case 'main page':
        contentElement = createCustomElement('div', 'card-container');
        this.topicsArr.forEach((topic, index) => {
          const cardObj = {
            cardName: topic,
            image: this.cardsArr[index][0].image,
          };
          contentElement.append(new Card(this.appControl, cardObj).element);
        });
        break;
      case 'topic': {
        contentElement = createCustomElement('div', 'card-container');
        const cardIndex = this.topicsArr.findIndex((item) => {
          const result = item.toLowerCase() === this.appControl.activePage;
          return result;
        });
        this.cardsArr[cardIndex].forEach((cardObj) => {
          contentElement.append(new Card(this.appControl, cardObj, this.type).element);
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

    const finalClipElement = createCustomElement('div', classNames, template);
    if (clipType === 'failure') {
      finalClipElement.innerHTML += `<p class="mistakes-number">Mistakes: ${wrongAnswers}</p>`;
    }

    this.appControl.playAppSound(clipType);
    this.removeCards();
    this.element.append(finalClipElement);

    return this;
  }
}
