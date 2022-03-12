
const { faker } = window

const __getDataArr = () => {
    const arr = []
    for(let i = 0; i< 5 ; i++) {
        arr.push(faker.random.word())
    }
    return arr
}

export default class SearchList extends HTMLDivElement {

    constructor() {
        super()
        this.ul = this.querySelector('ul')
        this.loading = this.querySelector('.loading')

        this.data = []
        this.selected = undefined
        this.timeId = ''
    }

    static observedAttributes = ["hidden"]

    get hidden() {
        return this.ariaHidden
    }
    set hidden(value) {
        this.ariaHidden = value
    }

    connectedCallback() {
        window.addEventListener('onSubmit', () => {
            this.selected.querySelector('a').click()

            /** Enter key
             *  if $search-list 가 visible 이면 selected item > a click event -> 필요없음
             *  if $search-list 가 hidden 이면 input event와 동일한 기능  
             */
            /*switch(this.hidden) {
                case 'true':
                    this.onInput()
                    break
                case 'false':
                    this.selected.querySelector('a').click()
                    break
            }*/
        })

        window.addEventListener('onReset', () => {
            // this.selected = undefined
            this.hidden = true
        })

        window.addEventListener('onInput', (event) => {
            this.onInput(event)
        })

        window.addEventListener('onKeydown', event => {
            if (this.hidden === 'false') {
                this.onKeydown()
            }
        })

        window.addEventListener('onFocusOut', event => {
            // console.log('onFocusOut', this.hidden)

        })

        // window.addEventListener('click', event => {
        //     if (event.target.tagName !== 'A') {
        //         this.hidden = true
        //     }
        // })

    }

    onInput(event) {
        const isNewKeyword = event.detail.isNewKeyword

        this.hidden = false
        this.loading.hidden = false
        this.ul.innerHTML = ''

        if (isNewKeyword === false ) {
            this.render(this.data)
            return
        } 
        

        clearTimeout(this.timeId)
        const keyword = event.detail.keyword
        this.timeId = setTimeout( () => {
            new Promise( resolve => {
                resolve(__getDataArr())
            })
            .then( data => {
                this.loading.hidden = true
                this.data = data
                this.render(data)
            })
        }, 500)

    }

    onKeydown() {
        const oldEl = this.selected
        switch (event.detail.keyCode) {
            case 38: // up
                if(oldEl.previousElementSibling) {
                    oldEl.dataset.selected = false
                    this.selected = oldEl.previousElementSibling
                    this.selected.dataset.selected = true
                    this.__handleScroll()
                }
                break
            case 40: // down
                if(oldEl.nextElementSibling) {
                    oldEl.dataset.selected = false
                    this.selected = oldEl.nextElementSibling
                    this.selected.dataset.selected = true
                    this.__handleScroll()
                }
                break
            default:
                console.log('default')
        }
    }

    render(data) {
        // TODO
        data.forEach( (item, index) => {
           this.ul.appendChild(this.getElement(item, index))
        })
    }

    getElement(text, index) {
        const node = document.createElement('li')
        const aNode = document.createElement('a')
        node.dataset.index = index
        aNode.textContent = text
        aNode.href = `${index}`
        node.appendChild(aNode)
        this.addEvent(node, aNode, text)
        if (index === 0) {
            node.dataset.selected = true
            this.selected = node
        }
        return node
    }

    addEvent(node, aNode, text) {
        aNode.addEventListener('click', (event) => {
            console.log('click')
            event.preventDefault()
            window.dispatchEvent(new CustomEvent('onItemClick'))
            document.querySelector('.result').textContent = text
            this.hidden = true
        })
    }


    __handleScroll() {
        const selectedEl = this.selected
        const containerHeight = this.offsetHeight
        if (selectedEl.offsetTop >= containerHeight) {
            this.scrollTop = selectedEl.offsetTop + selectedEl.offsetHeight - containerHeight
        }
        if (selectedEl.offsetTop <= this.scrollTop) {
            this.scrollTop = selectedEl.offsetTop 
        }
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
