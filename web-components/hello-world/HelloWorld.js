
const DEFAULT_COLOR = 'black'

export default class HelloWorld extends HTMLElement {

    static get observedAttributes () {
        return ['color']
    }

    get color () {
        return this.getAttribute('color') || DEFAULT_COLOR
    }

    set color (value) {
        this.setAttribute('color', value)
    }

    attributeChangedCallback (name, oldValue, newValue) {
        console.log('attributeChangedCallback')
        if (!this.firstElementChild) {
            return
        }

        if (name === 'color') {
            this.firstElementChild.style.color = newValue
        }
    }

    connectedCallback () {
        window.requestAnimationFrame( () => {
            const div = document.createElement('div')
            div.textContent = 'Hello World'
            div.style.color = this.color

            this.appendChild(div)
        })
    }
}