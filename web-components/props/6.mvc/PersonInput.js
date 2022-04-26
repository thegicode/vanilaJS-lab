export default class PesronInput extends HTMLElement {
    constructor() {
        super()
        this.input = this.querySelector('input')
    }

    set value(n) {
        // console.log('PersonInput Value: ', n)
        this.input.value = n
    }

    connectedCallback() {
        this.input.addEventListener('change', () => {
			this.controller.init(this.input.value) 
		})
    }
    
}