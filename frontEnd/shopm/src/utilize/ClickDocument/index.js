

export default class ClickDocument {

    constructor() {
        // console.log('Create ClickDocument success !')
        this._elements = [];
    }

    start() {
        this._closeDialog = this.closeDialog();
        document.addEventListener('click', this._closeDialog);
    }

    closeDialog() {
        const element_m = this._elements;
        const closeDialog_m = function() {
            element_m.forEach(element => {
                element.classList.remove('show');
                element.classList.remove('active');
            });

            document.removeEventListener('click', this.closeDialog_m);
        }
        return closeDialog_m;
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
        document.removeEventListener('click', this._closeDialog);
    }
}