
const { faker } = window


/** 임시 데이터 가져오기 **/
const __get = (index) => {
    console.log('__get', index)

    // 데이터가 없는 경우 확인용
    /*return {
       data: [],
       hasNextPage: false
    }*/

    const randomLen = Math.floor(Math.random() * 101)
    if (index >= randomLen) {
        return {
            data: ['end 1', 'end 2', 'end 3'],
            hasNextPage: false,
        }
    }

    const _len = index | 0
    const arr = []
    for(let i = _len; i < _len + 5 ; i++) {
        arr.push(`${i+1} - ${faker.random.words()}`)
    }
    return {
       data: arr,
       hasNextPage: true
    }
}


export default class SearchList extends HTMLDivElement {
    static observedAttributes = ["hidden"]

    get hidden() {
        return this.ariaHidden
    }
    set hidden(value) {
        this.ariaHidden = value
    }

    constructor() {
        super()

        this.ul = this.querySelector('ul')
        this.loading = this.querySelector('.loading')
        this.memo = this.querySelector('.memo')

        this.data = []
        this.selected = undefined
        this.timeId = ''
        this.isItemOver = false
    }


    connectedCallback() {
        window.addEventListener('onSubmit', () => {
            this.selected.querySelector('a').click()
        })

        window.addEventListener('onReset', () => {
            this.selected = undefined
            this.hidden = true
        })

        window.addEventListener('onInput', (event) => {
            this.onInput(event.detail.keyword)
        })

        window.addEventListener('onKeydown', event => {
            if (this.hidden === 'false') {
                this.onKeydown()
            }
        })

        window.addEventListener('onFocusOut', event => {
            if (this.isItemOver === false) {
                this.hidden = true
            }
        })


    }

    onInput(keyword) {

        // 빈 값인 경우
        if (keyword === '') {
            this.hidden = true
            return
        }

        this.ul.innerHTML = ''
        this.loading.hidden = false
        this.memo.hidden = true
        this.hidden = false

        clearTimeout(this.timeId)
        this.timeId = setTimeout( () => {
            this.data = []
            this.callData(0)
            this.loading.hidden = true
        }, 500)
    }

    onKeydown() {
        const cEl = this.selected
        switch (event.detail.keyCode) {
            case 38: // up
                if(cEl.previousElementSibling) {
                    cEl.dataset.selected = false
                    this.selected = cEl.previousElementSibling
                    this.selected.dataset.selected = true
                    this.handleScroll()
                }
                break
            case 40: // down
                if(cEl.nextElementSibling) {
                    cEl.dataset.selected = false
                    this.selected = cEl.nextElementSibling
                    this.selected.dataset.selected = true
                    this.handleScroll()
                }
                break
            default:
                console.log('default')
        }
    }

    callData(index) {
        new Promise( resolve => {
            const obj = __get(index) // TODO : __get() 특정문자 포함 문자열로 가져오기
            resolve(obj)
        })
        .then( obj => {
            const { data, hasNextPage } = obj

            if ( index === 0 && data.length === 0) {
                this.memo.textContent = '검색 결과가 없습니다.'
                this.memo.hidden = false
            }

            /*if (hasNextPage === false) {
                return
            } */

            this.data = [...this.data, ...data]
            console.log(this.data.length)
            this.render(data, index, hasNextPage)
        })
    }

    render(data, index, hasNextPage) {
        // TODO : Like DocumentFragment
        data.forEach( item => {
            const el = this.element(item, index)
            this.ul.appendChild(el)
        })

        // First item set selected
        if (index === 0) {
            const firstEl = this.ul.querySelector('li')
            firstEl.dataset.selected = true
            this.selected = firstEl
        }

        if (hasNextPage === false) {
            return
        }

        this.observe()
    }

    element(text, index) {
        const node = document.createElement('li')
        const aEl = document.createElement('a')
        node.dataset.index = index
        aEl.textContent = text
        aEl.href = `${index}`
        node.appendChild(aEl)
        this.addEvent(aEl, text)
        return node
    }

    addEvent(aEl, text) {
        aEl.addEventListener('click', event => {
            event.preventDefault()
            window.dispatchEvent(new CustomEvent('onItemClick'))
            document.querySelector('.result').textContent = text
            this.hidden = true
        })
        aEl.addEventListener('mouseenter', event => {
            this.isItemOver = true
        })
        aEl.addEventListener('mouseleave', event => {
            this.isItemOver = false
        })
    }

    observe() {
        const targetEl = this.ul.querySelector('li:last-child')
        const options = {
            root: null,
            rootMargin: '0px',
            threshold: 0.1
        }
        const callback = () => {
            // 실행
            this.callData(this.data.length)

            // 해제
            observer.unobserve(targetEl)
        }
        let observer = new IntersectionObserver( entries => {
            entries.forEach( entry => {
                if (entry.isIntersecting) {
                    callback()
                }
            })
        }, options)

        observer.observe(targetEl)
    }

    handleScroll() {
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
