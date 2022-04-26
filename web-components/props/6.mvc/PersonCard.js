export default class PesronCard extends HTMLElement {
    constructor() {
        super()
        this.tempate = document.querySelector('template')
    }

    set data(v) {
        this.render(v)
    }
    
    render({ first_name, last_name, avatar }) {
        this.innerHTML = ''
        const el = this.tempate.content.cloneNode(true)
        el.querySelector('.first_name').textContent = first_name
        el.querySelector('.last_name').textContent = last_name
        el.querySelector('img').src = avatar
        this.appendChild(el)
    }
}