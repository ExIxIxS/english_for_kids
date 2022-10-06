/* eslint-disable linebreak-style */
/* eslint-disable prefer-destructuring */
/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
/* eslint-disable no-undef */

export default function clickUserInteractive(event, appObj) {
  const menu = appObj.menu;
  const switchObj = appObj.switchObj;
  const content = appObj.content;
  const targetClassList = Array.from(event.target.classList);
  let cardElement;
  let activeMenuElement;

  // console.log(targetClassList);

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
    case (targetClassList.includes('switch-trigger')):
      switchObj.toggle();
      break;

    //  clicking on card flip button
    case (event.target.parentElement.classList.contains('card-flip-button')):
      cardElement = content.getCardElementByTarget(event.target);
      content.flipCard(cardElement);
      break;

    //  clicking on card
    case (targetClassList.some((className) => content.validCardClasses.includes(className))): {
      cardElement = content.getCardElementByTarget(event.target);
      const cardName = content.getCardInnerText(cardElement);

      if (cardElement.classList.contains('card-main-page')) {
        activeMenuElement = menu.getMenuItemByName(cardName);
        menu.setActiveTopic(activeMenuElement);
        content.changePage(cardName);
      } else if (!cardElement.classList.contains('flipped')) {
        content.playCardSound(cardName);
      }
      break;
    }
    default:
      break;
  }
}
