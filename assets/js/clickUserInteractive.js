export default function clickUserInteractive (event, menuObj, contentObj) {
    const menu = menuObj;
    const content = contentObj;
    const targetClassList = Array.from(event.target.classList);
    let cardElement;
    let activeMenuElement;

    switch (true) {

        //clicking on menu burger button
        case (targetClassList.includes('menu-button')):
            menu.toggle();
            break;

        //clicking anywhere else when burger menu opened
        case (document.querySelector('body').classList.contains('opened-menu') && !targetClassList.includes('menu')):
            menu.close();
            if (targetClassList.includes('menu-item')) {
                activeMenuElement = event.target;
                menu.setActiveTopic(activeMenuElement);
                content.changePage(activeMenuElement.innerHTML);
            }
            break;

        //clicking on card flip button
        case (event.target.parentElement.classList.contains('card-flip-button')):
            cardElement = content.getCardElementByTarget(event.target);
            content.flipCard(cardElement);
            break;

        //clicking on card
        case (targetClassList.some(className => content.validCardClasses.includes(className))):
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
}
