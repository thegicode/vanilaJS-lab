export default class Confirm extends HTMLElement {

    constructor() {
        super()
        this.other = document.querySelector('Other-app')
    }
  
    connectedCallback() {
        this.other.data = 'main connectedCallback data'

        this.querySelector('button')
            .addEventListener('click', () => {
                this.other.data = 'main click data'
            })
    }

    // attributeChangedCallback(name, oldValue, newValue) {
    //     console.log('[attributeChangedCallback]', name, oldValue, newValue)
    //     document.querySelector('#test').textContent = `${name}: ${newValue}`
    // }

}
