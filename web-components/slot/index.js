
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

// header는 간편하게 된다.
// footer는 레이어가 중첩되고 그로 인해 css 작업도 추적이 잘 안되서 불편하다.