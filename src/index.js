/* eslint-disable linebreak-style */
/* eslint-disable no-undef */

import '../assets/styles/reset.css';
import '../assets/styles/normalize.css';
import '../assets/styles/style.css';

import dataArrays from '../assets/js/cards';
import AppControls from '../assets/js/appControls';
import clickUserInteractive from '../assets/js/clickUserInteractive';

const [topics, cards] = [dataArrays[0], dataArrays.slice(1)];

const appControl = new AppControls(topics, cards);

document.querySelector('body').addEventListener('click', (event) => clickUserInteractive(event, appControl));
