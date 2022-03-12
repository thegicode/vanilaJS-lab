
export default class SearchInput extends HTMLFormElement {

    constructor() {
        super()
        this.inputEl = this.querySelector('input')
    }
  
    connectedCallback() {

        this.addEventListener('submit', (event) => {
            event.preventDefault()
        })

        this.inputEl.addEventListener('input', (event) => {
            window.dispatchEvent(new CustomEvent('onInput'))
        })

        window.addEventListener('onItemClick', (event) => {
            this.inputEl.value = ''
        })

        // this.inputEl.addEventListener('focusout', (event) => {
        //     window.dispatchEvent(new CustomEvent('onInputFocusOut', {
        //         detail: {
        //             event
        //         }
        //     }))
        // })

        
    }


}
