function createCustomElement (type, className = '', innerHTML = '') {
    const element = document.createElement(type);
    element.className = className;
    element.innerHTML = innerHTML;
    return element;
}

export {createCustomElement};