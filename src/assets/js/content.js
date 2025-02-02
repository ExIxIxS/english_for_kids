import Card from './card';
import { createCustomElement } from './commonFunct';

class ContentContainer {
  constructor(appCtrlObj, type = 'main page') {
    this.appControl = appCtrlObj;
    this.validTypes = ['main page', 'topic', 'statistic', 'train diff'];
    this.validCardClasses = ['card', 'card-content', 'card-text', 'card-graphic', 'card-image'];
    this.type = this.getValidType(type);
    [this.headerElement] = document.getElementsByClassName('container-centered');
    this.cardsCollection = null;
    this.gameCardsCollection = null;
    this.element = null;
    this.build();
  }

  build() {
    const contentWrapper = createCustomElement('div', 'content-wrapper');
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
    const mainContainerElement = createCustomElement('div', 'card-container');
    this.appControl.topicsArr.forEach((topic, index) => {
      const cardObj = {
        cardName: topic,
        image: this.appControl.mainCards[index].image,
      };
      mainContainerElement.append(new Card(this.appControl, cardObj).element);
    });

    return mainContainerElement;
  }

  createTopicCardsContent() {
    const contentFragment = new DocumentFragment();
    const cardsContainerElement = createCustomElement('div', 'card-container');
    const cardIndex = this.appControl.topicsArr.findIndex((item) => {
      const result = item.toLowerCase() === this.appControl.activePage;
      return result;
    });
    const topicName = this.appControl.topicsArr[cardIndex];

    this.appControl.cardsArr[cardIndex].forEach((cardObj) => {
      cardsContainerElement.append(new Card(this.appControl, cardObj, this.type).element);
    });

    contentFragment.append(createCustomElement('h2', 'topic-name', topicName));
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
    } if (this.appControl.topicsArr.map((item) => item.toLowerCase())
      .includes(curentMenuTopicName)) {
      return 'topic';
    }
    throw new Error('wrong menu topic Name');
  }

  getCardObjByWord(word) {
    return this.appControl.cardsArr.flat().find((cardObj) => cardObj.word === word);
  }

  getCardObjByImageName(imageName) {
    return this.appControl.cardsArr.flat().find((cardObj) => cardObj.image === `img/${imageName}.jpg`);
  }

  getCardObjByTranslation(translation) {
    return this.appControl.cardsArr.flat().find((cardObj) => cardObj.translation === translation);
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
    const [imageName] = imageSrc.match(/(?<=\/)\w+(?=\.png|.svg|.jpg|.jpeg|.gif)/);
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
                              <img src="./assets/img/${imageSrc}" alt="image ${clipType}" width="400" height="400">
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

export default ContentContainer;
