/* eslint-disable linebreak-style */
/* eslint-disable no-restricted-syntax */
/* eslint-disable linebreak-style */
/* eslint-disable no-console */
/* eslint-disable linebreak-style */
/* eslint-disable no-undef */

import Star from './star';
import {
  createCustomElement,
  getRandomInt,
} from './commonFunct';

class gameControl {
  constructor(appControl) {
    this.appControl = appControl;
    this.questionsBundle = [];
    this.isGameStarted = false;
    this.correctStarElement = new Star().element;
    this.wrongStarElement = new Star('wrong').element;

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
    this.element = createCustomElement('div', classNames, template);
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
      const randomIndex = getRandomInt(workArr.length - 1);
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
    this.liveIndicatorElement.append(new Star().element);
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
    this.liveIndicatorElement.append(new Star('wrong').element);
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

export default gameControl;
