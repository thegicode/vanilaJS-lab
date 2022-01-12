
export default class Check extends HTMLElement {
    constructor() {
        super()
        this.target = document.querySelector('confirm-app')
    }
    connectedCallback() {
        this.target.text = '[Check Element] change 1'
    }
}

// 