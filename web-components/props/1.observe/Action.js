
export default class Action extends HTMLElement {
    constructor() {
        super()
        this.target = document.querySelector('test-app')
    }
    connectedCallback() {
        this.target.text = '[Action connectedCallback]'
    }
}
