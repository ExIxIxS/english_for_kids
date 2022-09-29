import dataArrays from '../../assets/js/cards.js';
import MenuElement from '../../assets/js/menu.js';
//import ContentContainer from '../../assets/js/content.js';

const [topics, cards] = dataArrays;

const menu = new MenuElement(topics)
    .addToDoc();
/*
const content = new ContentContainer(topics, cards)
    .addToDoc();
*/

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
                const activeTopic = event.target;
                menu.activateTopic(activeTopic);
                //content.activatePage(activeTopic);
            }
            break;
    }
});