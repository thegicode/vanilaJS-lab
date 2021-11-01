
customElements.define('my-paragraph', 
    class extends HTMLElement {
        constructor() {
            super();

            const template = document.querySelector('#my-paragraph')
            const templateContent = template.content;

            this.attachShadow({mode: 'open'})
                .appendChild(templateContent.cloneNode(true));
        }
    }
);

const slotteSpan = document.querySelector('my-paragraph span');

console.log(slotteSpan.assignedSlot);
console.log(slotteSpan.slot);

