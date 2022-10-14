/* eslint-disable linebreak-style */
/* eslint-disable class-methods-use-this */
/* eslint-disable linebreak-style */
/* eslint-disable no-console */
/* eslint-disable linebreak-style */
/* eslint-disable no-undef */
/* eslint-disable linebreak-style */

import StatStorage from './statStorage';
import Card from './card';

import {
  createCustomElement,
} from './commonFunct';

class Statistic {
  constructor(appControl) {
    this.appControl = appControl;
    this.storage = new StatStorage(appControl.topicsArr, appControl.cardsArr);
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

    const statElement = createCustomElement('div', classNames, template);

    statElement.append(statContentElement);
    this.element = statElement;
    return this;
  }

  createTableElement(dataArr) {
    const tableElement = createCustomElement('div', 'table-wrapper');

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

        resultElement = createCustomElement('div', 'nothing-diff', template);
        break;
      }
      default: {
        const cardsContainerElement = createCustomElement('div', 'card-container');
        const maxCardsAmount = 8;
        const cardsAmount = (diffWordsArr.length < maxCardsAmount)
          ? diffWordsAmount
          : maxCardsAmount;

        for (let i = 0; i < cardsAmount; i += 1) {
          const cardObj = diffWordsArr[i];
          const cardElement = new Card(this.appControl, cardObj, 'topic').element;
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

export default Statistic;
