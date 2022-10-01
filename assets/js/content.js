import Card from '../../assets/js/card.js';

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
        this.validCardClasses = ['card', 'card-content', 'card-text', 'card-graphic', 'card-image'];
        this.applyValidType(type);
        this.topicName = this.menu.activePage;
        this.cardsCollection = null;
        this.element = null;
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
        this.element = document.getElementsByClassName('content-wrapper');
        this.cardsCollection = document.getElementsByClassName('card');
        return this;
    }

    clear() {
        document.querySelector('.content-wrapper').remove();
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

    isElementInCard(element) {
        return (this.validCardClasses.some(className => element.classList.contains(className)))
    }

    getCardObjByWord(word){
        return this.cardsArr.flat().find(cardObj => cardObj.word === word);
    }

    getCardObjByTranslation(translation){
        return this.cardsArr.flat().find(cardObj => cardObj.translation === translation);
    }

    getCardElementByTarget(targetElement){
        while (!targetElement.classList.contains('card')) {
            targetElement = targetElement.parentElement;
        }
        return targetElement;
    }

    getCardInnerText(cardElement) {
        return cardElement.querySelector('p').innerHTML;
    }


    flipCard(cardElement) {
        const cardParagraph = cardElement.querySelector('p');
        const cardFlipButton = cardElement.querySelector('.card-flip-button');
        const cardWord = cardParagraph.innerHTML;
        const cardObj = this.getCardObjByWord(cardWord);

        cardElement.classList.remove('unflipped');
        cardElement.classList.add('flipped');
        cardElement.addEventListener('pointerleave', event => {
            setTimeout(() => {
                this.unflipCard(cardElement);
            }, 500)}
            , {once: true});

        setTimeout(() => {
            cardParagraph.innerHTML = cardObj.translation;
            cardFlipButton.hidden = true;
        }, 500)

        return this;
    }

    unflipCard(cardElement) {
        cardElement.removeEventListener('pointerleave', event => unhoverCard(event, cardElement, this));

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
            }, 500)
        }

        return this;
    }

    playCardSound(word) {
        const cardObj = this.getCardObjByWord(word);
        const audioElement = new Audio(`../../assets/${cardObj.audioSrc}`);
        audioElement.play();

        return this;
    }

}
