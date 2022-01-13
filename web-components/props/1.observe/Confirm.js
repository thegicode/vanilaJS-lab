export default class Confirm extends HTMLElement {

    static observedAttributes = ["text"]

    get text() {
        return this.getAttribute('text')
    }
    set text(value) {
        this.setAttribute('text', value)
    }

    constructor() {
        super()

        this.text = 'constructor'
        console.log('[constructor] this.prop: ', this.text)
    }

    connectedCallback() {
        this.text = 'connectedCallback'
        const obj = { a: 1, b: 2}
        this.text = JSON.stringify(obj)
    }

    attributeChangedCallback(name, oldValue, newValue) {
        console.log('[attributeChangedCallback]', name, oldValue, newValue)
        document.querySelector('#test').textContent = `${name}: ${newValue}`
    }

}
