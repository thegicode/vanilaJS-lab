
export default class SearchInput extends HTMLFormElement {

    constructor() {
        super()
        this.inputEl = this.querySelector('input')
        this.keywordStr = ''
    }
  
    connectedCallback() {

        // Enter key -> search-list link element click
        this.addEventListener('submit', event => {
            event.preventDefault()
            window.dispatchEvent(new CustomEvent('onSubmit'))
        })

        this.addEventListener('reset', event => {
            window.dispatchEvent(new CustomEvent('onReset'))
        })

        this.inputEl.addEventListener('input', event => {
            window.dispatchEvent(new CustomEvent('onInput', {
                detail: {
                    keyword: this.inputEl.value
                }
            }))
        })

        this.inputEl.addEventListener('focus', event => {
            this.dataset.focus = true

            // 다시 확인
            // if (this.inputEl.value === '') {
            //     return
            // }

            if (this.inputEl.validity.valid === true) {
                window.dispatchEvent(new CustomEvent('onInput', {
                    detail: {
                        keyword: this.inputEl.value
                    }
                }))
            }
        })

        this.inputEl.addEventListener('focusout', (event) => {
            this.dataset.focus = false
            window.dispatchEvent(new CustomEvent('onFocusOut'))
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
