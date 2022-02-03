export default class App extends HTMLElement {

    static observedAttributes = ["text"]

    get text() {
        return this.getAttribute('text')
    }
    set text(value) {
        console.log('[App set text]: ', `${value}`)
        this.setAttribute('text', value)
    }

    constructor() {
        super()
        console.log('[Prev App constructor]: ', this.text)
        this.text = '[App constructor]'
        console.log('[App constructor]: ', this.text)
    }

    connectedCallback() {
        this.text = '[App connectedCallback]'
        // const obj = { a: 1, b: 2}
        // this.text = JSON.stringify(obj)
        console.log('[App connectedCallback]: ', this.text)
    }

    attributeChangedCallback(name, oldValue, newValue) {
        console.log('[App attributeChangedCallback]:', `name: ${name},`, `oldValue: ${oldValue}, `, `newValue: ${newValue}`)
        document.querySelector('#test').textContent = `${name}: ${newValue}`
    }

}
