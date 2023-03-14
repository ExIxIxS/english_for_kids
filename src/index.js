import './assets/styles/normalize.css';
import './assets/styles/style.css';

import dataArrays from './assets/js/cards';
import AppControl from './assets/js/appControl';
import clickUserInteractive from './assets/js/clickUserInteractive';
import mainCards from './assets/js/mainCards';

const [topics, cards] = [dataArrays[0], dataArrays.slice(1)];

const appControl = new AppControl(topics, cards, mainCards);

document.querySelector('body').addEventListener('click', (event) => clickUserInteractive(event, appControl));
