import modelFactory from './model.js'
import Sum from './Sum.js'

const { store, getState, ...events } = modelFactory()
const { addItem, updateItem, deleteItem, exchangeItem } = events

const __clonedNode = (node) => {
    return node.content.firstElementChild.cloneNode(true)
}


const App = () => {

    const app = document.querySelector('#root')
    const tableEl = app.querySelector('table')
    const tbodyEl = app.querySelector('tbody')
    const templateEl = document.querySelector('template')

    const tableTopVal = tableEl.offsetTop

    let activeTrNode
    let originEl, draggedEl, targetedEl

    const renderSum = () => {
        Sum(store.data, app)
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
            index = store.data.length
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
                    node.dataset.index = store.data.length
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
            const storeData = store.data
            switch(type) {
                case 'add' :
                    node.remove()
                    break
                case 'update' :
                    amountEl.value = storeData[index].amount
                    priceEl.value = storeData[index].price
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
            originEl = node
            setTimeout( () => {
                originEl.dataset.origin = true
            }, 1)
        })

        node.addEventListener("dragenter", () => {
            // css 간편화를 위해, 중간에 originEl이 있으면 css가 복잡
            tbodyEl.appendChild(originEl)

            // originEl은 targetEl의 대상이 아니다.
            if( node === originEl || node === targetedEl ) {
                return
            }

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

        store.data.forEach( (data, index) => {
            const { amount, price } = data

            const node = __clonedNode(templateEl)
            const amountEl = node.querySelector('input[name="amount"]')
            const priceEl = node.querySelector('input[name="price"]')

            node.dataset.index = index
            amountEl.value = amount
            priceEl.value = price

            addItemEvents(node, index)

            el.appendChild(node)
        })

        renderSum()
    }

    const renderIndex = () => {
        tbodyEl.querySelectorAll('tr')
            .forEach( (el, index) => {
                el.dataset.index = index
            })
    }
    
    const addEvents = () => {

        const addButton = app.querySelector('button[name="add"]')

        addButton.addEventListener('click', (e) => {
            const node = __clonedNode(templateEl)
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
            
            if (!targetedEl) {
                originEl.removeAttribute('draggable')
                delete originEl.dataset.origin
                return
            }

            let el = targetedEl
            // if( el === originEl ) {
            //     return
            // }

            const mouseY = event.clientY
            const elHalfVal = el.offsetTop + el.offsetHeight/2
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
            if (!targetedEl) {
                return
            }

            let el = targetedEl
            
            tbodyEl.dataset.drop = true
            const draggedIndex = draggedEl.dataset.index
            const pos = el.dataset.pos || 'top'
            if (pos === 'bottom') {
                el.after(draggedEl)
            } else {
                el.before(draggedEl)
            }
            exchangeItem(pos, el.dataset.index, draggedIndex)

            delete el.dataset.pos
            originEl.remove()
            draggedEl.removeAttribute('draggable')

            renderIndex()

            setTimeout( () => {
                delete tbodyEl.dataset.drop
            }, 100)

        })
    }

    renderTable()
    addEvents()

    document.querySelector('#test')
        .addEventListener('click', () => {
            exchangeItem('bottom', 2, 0)
        })

}

export default App