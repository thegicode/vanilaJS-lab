
export default class Check extends HTMLElement {

    static observedAttributes = ["data"]

    get data() {
        return this.getAttribute('data')
    }
    set data(value) {
        this.setAttribute('data', value)
    }

    constructor() {
        super()
        console.log('[Other constructor]', this.data)
    }

    connectedCallback() {
        this.data = '[Other] connectedCallback'
        console.log('[Other connectedCallback]', this.data)
        this.updateRenderig()
    }

    attributeChangedCallback(name, oldValue, newValue) {
        console.log('[Other attributeChangedCallback]', newValue)
        this.updateRenderig()
    }

    updateRenderig() {
        this.querySelector('p').textContent = this.data
    }
}
