import {CommonClass,
        createCompleteElement,

} from './common.js';

export default class ContentContainer extends CommonClass {
    constructor(topicsArr, cardsArr, menuObj, type='main page') {
        super();
        this.topicsArr = topicsArr;
        this.cardsArr = cardsArr;
        this.menu = menuObj;
        this.validTypes = ['main page', 'topic', 'statistic'];
        this.applyValidType(type);
        this.topicName = this.menu.activePage;
        this.build();
    }

    build() {
        const contentWrapper = createCompleteElement('div', 'content-wrapper');
        this.topicName = this.menu.activePage;
        let contentElement;

        switch(this.type) {
            case 'statistic':
                break;
            case 'main page':
                contentElement = createCompleteElement('div', 'card-container');
                this.topicsArr.forEach((topic, index) => {
                    const cardObj = {
                        cardName: topic,
                        image: this.cardsArr[index][0].image
                    }
                    contentElement.append(new Card(cardObj).element)
                })
                break;
            case 'topic':
                contentElement = createCompleteElement('div', 'card-container');
                const cardIndex = this.topicsArr.findIndex(item => item === this.topicName);
                this.cardsArr[cardIndex].forEach(cardObj => {
                    contentElement.append(new Card(cardObj, this.type).element)
                })

                break;

        }


        contentWrapper.append(contentElement);
        this.element = contentWrapper;
        return this;
    }

    addToDoc() {
        document.querySelector('main').append(this.element);
        return this;
    }

    changePage(menuTopicName) {
        this.type = this.getValidType(menuTopicName)
        this
            .build()
            .clear()
            .addToDoc();
        return this;
    }

    clear() {
        document.querySelector('.content-wrapper').remove();
        return this;
    }
}

class Card extends CommonClass {
    constructor(cardObj, type='main page') {
        super();
        this.type = type;
        this.validTypes = ['main page', 'topic'];
        this.build(cardObj);
    }

    build(cardObj) {
        let template;
        let classNames;
        switch(this.type) {
            case 'main page':
                template = `
                            <div class="graphic">
                                <img src="../../assets/${cardObj.image}" alt="Section ${cardObj.cardName}" width="390" height="260">
                            </div>
                            <p>${cardObj.cardName}</p>
                            `
                classNames = 'card card-main-page';
                break;
            case 'topic':
                template = `
                            <div class="graphic">
                                <img src="../../assets/${cardObj.image}" alt="${cardObj.word}" width="390" height="260">
                            </div>
                            <p>${cardObj.word}</p>
                            `
                classNames = 'card card-topic';
                break;
        }

        this.element = createCompleteElement('div', classNames, template);
        return this;
    }
}

