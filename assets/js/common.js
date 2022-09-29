export function createCompleteElement (type, className = '', innerHTML = '') {
    const element = document.createElement(type);
    element.className = className;
    element.innerHTML = innerHTML;
    return element;
}

export class CommonClass {
    constructor() {}

    applyValidType(type) {
        if (this.validTypes.includes(type)) {
            this.type = type;
        } else {
            throw new Error('wrong type of Object')
        }
    }

    getValidType(menuTopicName) {
        menuTopicName = menuTopicName.toLowerCase();
        if (this.validTypes.includes(menuTopicName)) {
            return menuTopicName;
        } else if (this.topicsArr.map(item => item.toLowerCase()).includes(menuTopicName)) {
            return 'topic';
        } else {
            throw new Error('wrong menu topic Name');
        }
    }
}