/* eslint-disable linebreak-style */
/* eslint-disable no-console */
/* eslint-disable linebreak-style */
/* eslint-disable no-undef */

import {
  createCustomElement,
  getRandomInt,
} from './commonFunct';

class gameControl {
  constructor(appControl) {
    this.appControl = appControl;
    this.questionsBundle = [];
    this.activeQuestion = null;
    this.element = null;
    this.liveElement = null;
    this.correctAnswer = null;
    this.wrongAnswer = null;
    this.isGameStarted = false;
    this.build();
  }

  build() {
    const classNames = 'game-controls inactive';
    const template = `
                    <div class="button game-button start-button">
                      Button
                    </div>
                    <div class="game-stat">
                      <p>Game Statistic</p>
                    </div>
                    `;
    this.element = createCustomElement('div', classNames, template);
    return this;
  }

  addToDoc() {
    document.querySelector('header').append(this.element);
    [this.liveElement] = document.getElementsByClassName('game-controls');
    [this.liveButtonElement] = this.liveElement.getElementsByClassName('game-button');
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
    console.log(arrOptions);
    const workArr = arrOptions.map((item) => item);
    while (this.questionsBundle.length < arrOptions.length) {
      const randomIndex = getRandomInt(workArr.length - 1);
      this.questionsBundle.push(...workArr.splice(randomIndex, 1));
    }
    console.log(this.questionsBundle);
    return this;
  }

  startGame(arrOptions) {
    console.log('<<< game started !!! >>>');
    this.isGameStarted = true;
    this.correctAnswer = 0;
    this.wrongAnswer = 0;
    this.showGameStat(); //  isn`t written
    this.createRandomQuestionsBundle(arrOptions);
    this.askQuestion();
    this.changeButtonClass('repeat-button');
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

  endGame() {
    this.isGameStarted = false;
    this.changeButtonClass('start-button');
    console.log('<<< game over !!! >>>');
    return this;
  }

  processAnswer(cardObj, cardElement) {
    console.log(`Its Answer Process for "${cardObj.word}" and ${cardElement}`);
    return this;
  }
}

export default gameControl;
