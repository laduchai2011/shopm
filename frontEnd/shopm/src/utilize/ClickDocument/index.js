

export default class ClickDocument {

    constructor() {
        // console.log('Create ClickDocument success !')
        this._elements = [];
    }

    start() {
        document.addEventListener('click', () => this.closeDialog());
    }

    closeDialog() {
        this._elements.forEach(element => {
            element.classList.remove('show');
            element.classList.remove('active');
        });
    }

    setElements(elements) {
        this._elements = elements;
    }

    pushElement(element) {
        const checkElement = this._elements.indexOf(element);

        if (checkElement === -1) {
            this._elements.push(element);
        }
    }

    clear() {
        this._elements = [];
    }

    getElements() {
        return this._elements;
    }

    destroy() {
        document.removeEventListener('click', () => {
            console.log('removeEventListener : click')
        })
    }
}