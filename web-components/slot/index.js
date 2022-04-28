
class ModalDialog extends HTMLElement {
    constructor() {
        super()

        const el = document.querySelector('template').content.cloneNode(true)

        el.querySelector('#closeButton').addEventListener('click', this.onClose.bind(this))
        this.attachShadow({mode: 'open'}).appendChild(el)
    }

    connectedCallback() {
    }

    onClose(event) {
        this.hidden = true
    }
}
customElements.define('modal-dialog', ModalDialog)