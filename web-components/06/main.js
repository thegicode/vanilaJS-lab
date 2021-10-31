
customElements.define('element-details',
    class extends HTMLElement {
        constructor() {
            super();
            const template = document
                .querySelector('#element-details-template')
                .content;

            const shadowRoot = this.attachShadow({ mode: 'open'})
                .appendChild(template.cloneNode(true));
        }
    }
);