

class TacoButton extends HTMLElement {
    static observedAttributes = ['disabled']

    constructor() {
        super()
        this._internals = this.attachInternals()
        this._internals.role ='button'

        this.addEventListener('keydown', e => {
            if (e.code === 'Enter' || e.code === 'Space') {
                this.dispatchEvent(new PointerEvent('click', {
                    bubbles: true,
                    cancelable: true
                }))
            }
        })

        this.addEventListener('click', e => {
            console.log('event')
            if (this.disabled) {
                e.preventDefault()
                e.stopImmediatePropagation()
                // 같은 이벤트에서 다른 리스너들이 불려지는 것을 막는다.
            }

        })

        this._observer = new MutationObserver(() => {
            this._internals.ariaLabel = this.textContent

            console.log('observer callback', this._internals.ariaLabel)
        })
    }

    connectedCallback() {
        this.setAttribute('tabindex', '0')

        this._observer.observe(this, {
            childList: true,
            characterData: true,
            subtree: true
        })
    }

    disconnectedCallback() {
        this._observer.disconnect()
    }

    get disabled() {
        return this.hasAttribute('disabled')
    }
    set disabled(flag) {
        this.toggleAttribute('disabled', Boolean(flag))
    }

    attributeChangedCallback(name, oldValue, newValue) {
        console.log('disabled', this.disabled)
        // name will always be "disabled" due to observedAttributes
        if (this.disabled) {
            this.removeAttribute('tabindex')
            this._internals.ariaDisabled = 'true'
        } else {
            this.setAttribute('tabindex', 0)
            this._internals.ariaDisabled = 'false'
        }
    }
}

customElements.define('taco-button', TacoButton)

const tacoButton = document.querySelector('#tacoButton')
document.querySelector('#testButton')
    .addEventListener('click', () => {
        tacoButton.disabled = !tacoButton.disabled
    })

let count = 0
document.querySelector('#testButton2')
    .addEventListener('click', () => {
        tacoButton.textContent = `${tacoButton.textContent} ${count++}`
    })



