
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

        // window.addEventListener('onInputFocusOut', (event) => {
        //     this.onInputFocusOut(event)
        // })

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

    onInputFocusOut(event) {
        console.log('event', event.detail)

        if (this.ariaHidden === 'false') {
            console.log('focusout')
            this.hidden = true
        }
    }

    render(data) {
        data.forEach( (item, index) => {
           this.ul.appendChild(this.getElement(item, index))
        })
    }



    getElement(text, index) {
        const node = document.createElement('li')
        const a = document.createElement('a')
        node.dataset.index = index
        a.textContent = text
        node.appendChild(a)
        this.addEvent(a, text)
        return node
    }

    addEvent(a, text) {
        a.addEventListener('click', (event) => {
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
