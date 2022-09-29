export default class MenuElement {
    constructor(topicsArr, startMenu='Main page', endMenu='Statistic') {
        this.openedMenuCollections = [
            document.getElementsByTagName('body'),
            document.getElementsByClassName('menu'),
            document.getElementsByClassName('menu-button')
        ];
        this.topicsArr = topicsArr;
        this.startMenu = startMenu;
        this.endMenu = endMenu;
        this.activePage = this.startMenu;
        this.build();
    }

    build() {
        function createLi(topicName='') {
            const element = document.createElement('li');
            element.className = 'topic';
            element.innerHTML = topicName;
            return element;
        }

        const ulElement = document.createElement('ul');
        ulElement.className = 'menu-list';
        ulElement.append(createLi(this.startMenu));
        this.topicsArr.forEach(topic => ulElement.append(createLi(topic)));
        ulElement.append(createLi(this.endMenu));

        const menuElement = document.createElement('nav');
        menuElement.className = 'menu';
        menuElement.append(ulElement);
        this.element = menuElement;
        return this;
    }

    addToDoc() {
        document.querySelector('header').prepend(this.element);
        this.menuTopicElements = document.getElementsByClassName('topic');
        return this;
    }

    toggle() {
        this.openedMenuCollections.map(htmlCollection => htmlCollection[0].classList.toggle('opened-menu'));
        return this;
    }

    close() {
        this.openedMenuCollections.map(htmlCollection => htmlCollection[0].classList.remove('opened-menu'));
    }

    changeTopic(topicElement) {
        const topicName = topicElement.innerHTML;
        if (topicName !== this.activePage) {
            const className = 'active-page';
            this.activePage = topicName;
            for (let topicElement of this.menuTopicElements) {
                topicElement.classList.remove(className);
            }
            topicElement.classList.add(className);
        }

        return this;
    }
}