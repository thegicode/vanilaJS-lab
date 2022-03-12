
export default class SearchInput extends HTMLFormElement {

    constructor() {
        super()
        this.inputEl = this.querySelector('input')
    }
  
    connectedCallback() {

        this.addEventListener('submit', (event) => {
            event.preventDefault()
            window.dispatchEvent(new CustomEvent('onSubmit'))
        })

        this.inputEl.addEventListener('input', (event) => {
            window.dispatchEvent(new CustomEvent('onInput'))
        })

        this.inputEl.addEventListener('focus', (event) => {
            this.dataset.focus = true
        })
        this.inputEl.addEventListener('focusout', (event) => {
            this.dataset.focus = false
        })

        this.inputEl.addEventListener('keydown', (event) => {
            const keyCode = event.keyCode
            if (keyCode === 38 || keyCode === 40) {
                window.dispatchEvent(new CustomEvent('onKeydown', {
                    detail: {
                        keyCode
                    }
                }))
            }
        })

        window.addEventListener('onItemClick', (event) => {
            this.inputEl.value = ''
        })
        
    }


}
