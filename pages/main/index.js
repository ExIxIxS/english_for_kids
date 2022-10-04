import dataArrays from '../../assets/js/cards.js';
import clickUserInteractive from '../../assets/js/clickUserInteractive.js';
import MenuElement from '../../assets/js/menu.js';
import ContentContainer from '../../assets/js/content.js';

const [topics, cards] = [dataArrays[0], dataArrays.slice(1)];

const menu = new MenuElement(topics)
    .addToDoc();

const content = new ContentContainer(topics, cards, menu)
    .addToDoc();

document.querySelector('body').addEventListener('click', event => clickUserInteractive(event, menu, content));
