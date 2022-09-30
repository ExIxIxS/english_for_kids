import dataArrays from '../../assets/js/cards.js';
import MenuElement from '../../assets/js/menu.js';
import ContentContainer from '../../assets/js/content.js';

const [topics, cards] = [dataArrays[0], dataArrays.slice(1)];

const menu = new MenuElement(topics)
    .addToDoc();

const content = new ContentContainer(topics, cards, menu)
    .addToDoc();

document.querySelector('body').addEventListener('click', event => {
    const targetClassList = event.target.classList;
    switch (true) {
        //clicking on menu burger button
        case (targetClassList.contains('menu-button')):
            menu.toggle();
            break;
        //clicking anywhere else when burger menu opened
        case (document.querySelector('body').classList.contains('opened-menu') && !targetClassList.contains('menu')):
            menu.close();
            if (targetClassList.contains('topic')) {
                const activeTopicElement = event.target;
                menu.changeTopic(activeTopicElement);
                content.changePage(activeTopicElement.innerHTML);
            }
            break;
    }
});