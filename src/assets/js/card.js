import { createCustomElement } from './commonFunct';

class Card {
  constructor(appCtrlObj, cardObj, type = 'main page') {
    this.appControl = appCtrlObj;
    this.type = type;
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
                        <img class="card-image" src="./assets/${cardObj.image}" alt="Section ${cardObj.cardName}" width="390" height="260">
                      </div>
                      <p class="card-text">${cardObj.cardName}</p>
                    </div>
                  `;
        classNames += ' card-main-page';
        break;
      case 'topic': {
        let extraTrainTemplate = '';
        if (this.appControl.activeMode === 'train') {
          extraTrainTemplate = `
                                  <p class="card-text">${cardObj.word}</p>
                                  <button class="button card-flip-button" type="button"></button>
                                `;
        } else {
          classNames += ' game-card';
        }

        template = `
                    <div class="card-content">
                      <div class="graphic card-graphic">
                          <img class="card-image" src="./assets/${cardObj.image}" alt="${cardObj.word}" width="390" height="260">
                      </div>
                      ${extraTrainTemplate}
                    </div>
                    `;
        classNames += ' card-topic';
        break;
      }
      default:
        break;
    }

    this.element = createCustomElement('div', classNames, template);
    return this;
  }
}

export default Card;
