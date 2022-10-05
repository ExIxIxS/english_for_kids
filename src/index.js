/* eslint-disable linebreak-style */
/* eslint-disable no-undef */

import '../assets/styles/reset.css';
import '../assets/styles/normalize.css';
import '../assets/styles/style.css';

import dataArrays from '../assets/js/cards';
import clickUserInteractive from '../assets/js/clickUserInteractive';
import MenuElement from '../assets/js/menu';
import ContentContainer from '../assets/js/content';

const [topics, cards] = [dataArrays[0], dataArrays.slice(1)];

const menu = new MenuElement(topics)
  .addToDoc();

const content = new ContentContainer(topics, cards, menu)
  .addToDoc();

document.querySelector('body').addEventListener('click', (event) => clickUserInteractive(event, menu, content));
