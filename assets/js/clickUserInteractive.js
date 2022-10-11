/* eslint-disable linebreak-style */
/* eslint-disable prefer-destructuring */
/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
/* eslint-disable no-undef */

function clickUserInteractive(event, appCtrlObj) {
  const appControl = appCtrlObj;
  const menu = appControl.menu;
  const gameControl = appControl.gameControl;
  const switchObj = appControl.switchObj;
  const content = appControl.content;
  const targetClassList = Array.from(event.target.classList);
  const isGameMode = (appControl.activeMode === 'play');
  let cardElement;
  let activeMenuElement;

  switch (true) {
    //  clicking on menu burger button
    case (targetClassList.includes('menu-button')):
      menu.toggle();
      break;

    //  clicking anywhere else when burger menu opened
    case (document.querySelector('body').classList.contains('opened-menu') && !targetClassList.includes('menu')):
      menu.close();
      if (targetClassList.includes('menu-item')) {
        activeMenuElement = event.target;
        appControl.changePage(activeMenuElement.innerHTML);
        appControl.switchObj.enable();
      }
      break;

    //  clicking on switch button
    case (targetClassList.includes('switch-trigger')
          && !switchObj.element.classList.contains('disabled')): {
      switchObj.toggle();
      appControl.changePage(appControl.activePage);
      break;
    }

    //  clicking on start game button
    case (targetClassList.includes('start-button')): {
      gameControl.startGame(appControl.activeArrCardsObj);
      break;
    }

    //  clicking on start game button
    case (targetClassList.includes('repeat-button')): {
      gameControl.repeatQuestion();
      break;
    }

    //  clicking on card flip button
    case (event.target.parentElement.classList.contains('card-flip-button')):
      cardElement = content.getCardElementByTarget(event.target);
      content.flipCard(cardElement);
      break;

    //  clicking on card
    case (targetClassList.some((className) => content.validCardClasses.includes(className))): {
      cardElement = content.getCardElementByTarget(event.target);
      const cardImageName = content.getCardImageName(cardElement);
      const cardObj = content.getCardObjByImageName(cardImageName);

      if (isGameMode && gameControl.isGameStarted && !cardElement.classList.contains('disabled')) {
        gameControl.processAnswer(cardObj, cardElement);
        break;
      } else if (cardElement.classList.contains('card-main-page')) {
        const pageName = content.getCardInnerText(cardElement);
        activeMenuElement = menu.getMenuItemByName(pageName);
        appControl.changePage(pageName);
      } else if (!cardElement.classList.contains('flipped') && !cardElement.classList.contains('game-card')) {
        appControl.playCardSound(cardObj);
        appControl.stat.storage.add('click', cardObj);
      }
      break;
    }

    //  clicking on table header
    case (targetClassList.includes('sortable')):
      appControl.stat.sortTable(event.target);
      content.changeContent('statistic');
      break;

    //  clicking on reset button
    case (targetClassList.includes('reset-stat')):
      appControl.stat.storage.cleanStorage();
      if (appControl.content.type === 'statistic') {
        content.changeContent('statistic');
      } else {
        content.changeContent('train diff');
      }

      break;

    //  clicking on train diff. words button
    case (targetClassList.includes('train-diff')):
      switchObj.train();
      switchObj.disable();
      appControl.stat.storage.getDiffWordsArr();
      content.changeContent('train diff');
      break;

    default:
      break;
  }
}

export default clickUserInteractive;
