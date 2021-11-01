
 
class Square extends HTMLElement {
    static get observedAttributes() {
        return ['c', 'l'];
    }

    constructor() {
        super();

        const shadow = this.attachShadow({ mode : 'open'});

        const div = document.createElement('div');
        const style = document.createElement('style');
        shadow.appendChild(div);
        shadow.appendChild(style);
    }

    connectedCallback() {
        console.log('[connectedCallback] Custom square element added to page.');
        updateStyle(this); // attributeChangedCallback()에서 이미 실행되므로 없어도 된다.
    }

    disconnectedCallback() {
        console.log('[disconnedtedCallback] Custom square element removed from page.')
    }

    adoptedCallback() {
        console.log('[adoptedCallback] Custom square element moved to new page.');
    }

    attributeChangedCallback(name, oldValue, newValue) {
        console.log('[attributeChangedCallback] Custom square element attributes changed.');
        updateStyle(this);
    }
}

customElements.define('custom-square', Square);

function updateStyle(elem) {
    const shadow = elem.shadowRoot;
    shadow.querySelector('style').textContent = `
        div {
            width: ${elem.getAttribute('l')}px;
            height: ${elem.getAttribute('l')}px;
            background-color: ${elem.getAttribute('c')};
        }
    `;
}

const add = document.querySelector('.add');
const update = document.querySelector('.update');
const remove = document.querySelector('.remove');
let square;

update.disabled = true;
remove.disabled = true;

function random(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

add.onclick = function() {
    square = document.createElement('custom-square');
    square.setAttribute('l', '100');
    square.setAttribute('c', 'red');
    document.body.appendChild(square);

    update.disabled = false;
    remove.disabled = false;
    add.disabled = true;
};

update.onclick = function() {
    square.setAttribute('l', random(50, 200));
    square.setAttribute('c', `rgb(${random(0, 255)}, ${random(0, 255)}, ${random(0, 255)})`);
};

remove.onclick = function() {
    document.body.removeChild(square);

    update.disabled = true;
    remove.disabled = true;
    add.disabled = false;

}

