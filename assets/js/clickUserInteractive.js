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
        menu.setActiveTopic(activeMenuElement);
        content.changePage(activeMenuElement.innerHTML);
      }
      break;

    //  clicking on switch button
    case (targetClassList.includes('switch-trigger')): {
      switchObj.toggle();
      content.changePage(appControl.activePage);
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

      if (isGameMode && gameControl.isGameStarted) {
        gameControl.processAnswer(cardObj, cardElement);
        break;
      } else if (cardElement.classList.contains('card-main-page')) {
        const topicName = content.getCardInnerText(cardElement);
        activeMenuElement = menu.getMenuItemByName(topicName);
        menu.setActiveTopic(activeMenuElement);
        content.changePage(topicName);
      } else if (!cardElement.classList.contains('flipped') && !cardElement.classList.contains('game-card')) {
        appControl.playCardSound(cardObj);
      }
      break;
    }
    default:
      break;
  }

  if (appControl.activeMode === 'play' && (content.getValidTopicType(appControl.activePage) === 'topic')) {
    appControl.gameControl.show();
  } else {
    appControl.gameControl.hide();
  }
}

export default clickUserInteractive;
