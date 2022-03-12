
const INITIAL_DATA = [
    '바나나1',
    '바나나2',
    '바나나3',
    '바나나4',
    '바나나5'
]

export default class SearchList extends HTMLDivElement {

    constructor() {
        super()
        this.ul = this.querySelector('ul')
        this.loading = this.querySelector('.loading')
    }

    static observedAttributes = ["hidden"]

    get hidden() {
        return this.ariaHidden
    }
    set hidden(value) {
        this.ariaHidden = value
    }

  
    connectedCallback() {
        window.addEventListener('onInput', () => {
            this.onInput()
        })

        window.addEventListener('click', event => {
            if (event.target.tagName !== 'A') {
                this.hidden = true
            }
        })

    }

    onInput() {
        this.hidden = false
        this.loading.hidden = false
        this.ul.innerHTML = ''

        const getData = new Promise( resolve => {
            setTimeout( () => {
                resolve()
            }, 500)
        })

        getData.then( () => {
            this.loading.hidden = true
            this.render(INITIAL_DATA)
        })
    }

    render(data) {
        data.forEach( (item, index) => {
           this.ul.appendChild(this.getElement(item, index))
        })
        this.ul.querySelector('a').focus()
    }

    getElement(text, index) {
        const node = document.createElement('li')
        const aNode = document.createElement('a')
        node.dataset.index = index
        aNode.textContent = text
        aNode.href = `${index}`
        node.appendChild(aNode)
        this.addEvent(aNode, text)
        return node
    }

    addEvent(aNode, text) {
        aNode.addEventListener('click', (event) => {
            window.dispatchEvent(new CustomEvent('onItemClick'))
            document.querySelector('.result').textContent = text
            this.hidden = true
        })
    }



    /*render(datas) {
        const ul = this.querySelector('ul')
        let str = ''
        datas.forEach( data => {
            str += `<li><a href="#">${data}</a></li>`
        })
        ul.innerHTML = str
        this.hidden = false
    }*/

   

}
