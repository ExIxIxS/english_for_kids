export default class MenuElement {
    constructor(topicsArr) {
        this.openedMenuCollections = [
            document.getElementsByTagName('body'),
            document.getElementsByClassName('menu'),
            document.getElementsByClassName('menu-button')
        ];
        this.build(topicsArr);
    }

    build(topicsArr, startMenu='Main page', endMenu='Statistic') {
        function createLi(topicName='') {
            const element = document.createElement('li');
            element.className = 'topic';
            element.innerHTML = topicName;
            return element;
        }

        const ulElement = document.createElement('ul');
        ulElement.className = 'menu-list';
        ulElement.append(createLi(startMenu));
        this.activePage = startMenu;
        topicsArr.forEach(topic => ulElement.append(createLi(topic)));
        ulElement.append(createLi(endMenu));

        const menuElement = document.createElement('nav');
        menuElement.className = 'menu';
        menuElement.append(ulElement);
        this.element = menuElement;
        return this;
    }

    addToDoc() {
        document.querySelector('header').prepend(this.element);
        this.menuTopicElements = document.getElementsByClassName('topic');
        this.activateTopic(this.menuTopicElements[0]);
        return this;
    }

    toggle() {
        this.openedMenuCollections.map(htmlCollection => htmlCollection[0].classList.toggle('opened-menu'));
        return this;
    }

    close() {
        this.openedMenuCollections.map(htmlCollection => htmlCollection[0].classList.remove('opened-menu'));
    }

    activateTopic(topicElement) {
        const className = 'active-page';
        this.activePage = topicElement.innerHTML;
        for (let topicElement of this.menuTopicElements) {
            topicElement.classList.remove(className);
        }
        topicElement.classList.add(className);
        return this;
    }
}