import { DATA, addItem, updateItem, deleteItem } from './model.js'
import Sum from './Sum.js'

const _clonedNode = (node) => {
    return node.content.firstElementChild.cloneNode(true)
}


const App = () => {

    const app = document.querySelector('#root')
    const tableEl = app.querySelector('table')
    const tbodyEl = app.querySelector('tbody')
    const templateEl = document.querySelector('template')

    const tableTopVal = tableEl.offsetTop

    let activeTrNode
    let originalEl, draggedEl, targetedEl

    const renderSum = () => {
        Sum(DATA, app)
    }

    const addItemEvents = (node, idx) => {

        const inputEls = node.querySelectorAll('input[type="number"]')
        const amountEl = node.querySelector('input[name="amount"]')
        const priceEl = node.querySelector('input[name="price"]')
        const confirmButton = node.querySelector('button[name="confirm"]')
        const deleteButton = node.querySelector('button[name="delete"]')
        const cancelButton = node.querySelector('button[name="cancel"]')
        const draggerButton = node.querySelector('button[name="dragger"]')

        let type = 'update'
        let index = idx
        if (index === null) {
            type = 'add'
            index = DATA.length
        }

        inputEls.forEach( inputEl => {
            inputEl.addEventListener('focus', () => {
                if (activeTrNode && activeTrNode !== node ) {
                    activeTrNode.dataset.focus = false
                }
                node.dataset.focus = true
                activeTrNode = node
            })
        })

        confirmButton.addEventListener('click', e => {
            if (amountEl.checkValidity() === false ) {
                amountEl.focus()
                return
            }
            if (priceEl.checkValidity() === false ) {
                priceEl.focus()
                return
            }

            switch(type) {
                case 'add' :
                    const amount = amountEl.value
                    const price = priceEl.value
                    addItem(amount, price)
                    break
                case 'update' :
                    inputEls.forEach( inputEl => {
                        updateItem(index, inputEl.name, inputEl.value)
                    })
                    break
                default :
                    break
            }
            renderSum()
            node.dataset.focus = false
        })

        cancelButton.addEventListener('click', () => {
            switch(type) {
                case 'add' :
                    node.remove()
                    break
                case 'update' :
                    amountEl.value = DATA[index].amount
                    priceEl.value = DATA[index].price
                    break
                default :
                    break
            }
            node.dataset.focus = false
        })

        deleteButton.addEventListener('click', () => {
            deleteItem(index)
            renderTable()
        })


        draggerButton.addEventListener('mousedown', () => {
            node.draggable = true
        })
        draggerButton.addEventListener('mouseup', () => {
            node.removeAttribute('draggable')
        })

        node.addEventListener("dragstart", (event) => {
            draggedEl = node.cloneNode(true)
            addItemEvents(draggedEl)
            originalEl = node
            setTimeout( () => {
                originalEl.dataset.original = true
            }, 1)
        })

        node.addEventListener("dragenter", () => {
            // 이전 targetedEl의 data 속성 제거
            if ( targetedEl && targetedEl !== node ) {
                delete targetedEl.dataset.pos
            }
            targetedEl = node
        })
        
    }

    const renderTable = () => {
        const el = tbodyEl
        el.innerHTML = ''

        DATA.forEach( (data, index) => {
            const { amount, price } = data

            const node = _clonedNode(templateEl)
            const amountEl = node.querySelector('input[name="amount"]')
            const priceEl = node.querySelector('input[name="price"]')

            amountEl.value = amount
            priceEl.value = price

            addItemEvents(node, index)

            el.appendChild(node)
        })

        renderSum()
    }


    const addEvents = () => {

        const addButton = app.querySelector('button[name="add"]')

        addButton.addEventListener('click', (e) => {
            const node = _clonedNode(templateEl)
            tbodyEl.appendChild(node)

            addItemEvents(node, null)
            node.querySelector('input').focus()
        
        })
        
        addButton.addEventListener('focus', () => {
            if (activeTrNode) {
                activeTrNode.dataset.focus = false
                activeTrNode = null
            }
        })

        app.addEventListener('click', () => {
            if (activeTrNode && document.activeElement.tagName !== 'INPUT') {
                activeTrNode.dataset.focus = false
                activeTrNode = null
            }
        })

        document.addEventListener("dragover", event => {

            event.preventDefault()
            let el = event.target

            const isDragzone = el.tagName === 'TBODY' || tbodyEl.contains(el)

            if (!isDragzone) return

            if ( el.tagName !== 'TR' ) {
                el = el.closest('tr')
            }
            if( el === originalEl ) {
                return
            }
            
            const mouseY = event.clientY
            const elHalfVal = tableTopVal + el.offsetTop + el.offsetHeight/2
            if( mouseY > elHalfVal) { 
                // 마우스 위치가 el의 절반 위치보다 크면
                el.dataset.pos = 'bottom'
            } else { 
                // 마우스 위치가 el의 절반 위치보다 작으면
                el.dataset.pos = 'top'
            }
        })

        document.addEventListener("drop", event => {
            event.preventDefault()

            let el = event.target
            const isDragzone = el.tagName === 'TBODY' || tbodyEl.contains(el)
            
            if (isDragzone) {
                // DragZone 이면 엘리먼트 이동

                if ( el.tagName !== 'TR' ) {
                    el = el.closest('tr')
                }

                delete el.dataset.pos

                const mouseY = event.clientY
                const elHalfVal = tableTopVal + el.offsetTop + el.offsetHeight/2
                if( mouseY > elHalfVal) {
                    // 마우스 위치가 el의 절반 위치보다 크면 el 뒤로 옮긴다.
                    el.after(draggedEl)
                } else {
                    // 마우스 위치가 el의 절반 위치보다 작으면 el 앞으로 옮긴다.
                    el.before(draggedEl)
                }

                draggedEl.removeAttribute('draggable')
                // delete draggedEl.dataset.dragged 
                originalEl.remove()
            } else {
                // DragZone 외부이면 원래의 상태로 변경
                draggedEl.remove()
                originalEl.removeAttribute('draggable')
                targetedEl && delete targetedEl.dataset.pos
                delete originalEl.dataset.original
            }

        })
        

    }

    renderTable()
    addEvents()

}

export default App