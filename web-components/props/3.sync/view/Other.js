
export default class Other extends HTMLElement {

    static observedAttributes = ["data"]

    get data() {
        return this.getAttribute('data')
    }
    set data(value) {
        this.setAttribute('data', value)
    }

    constructor() {
        super()
    }

    connectedCallback() {
        this.render()
    }

    attributeChangedCallback(name, oldValue, newValue) {
        this.render()
    }

    render() {
        this.querySelector('p').textContent = this.data
    }
}
