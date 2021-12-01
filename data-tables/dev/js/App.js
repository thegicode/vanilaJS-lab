import modelFactory from './model.js'
import sum from './sum.js'
import dragAndDropFactory from './dragAndDrop.js'

const __clonedNode = (node) => {
    return node.content.firstElementChild.cloneNode(true)
}

const App = () => {

    const app = document.querySelector('#root')
    const tbodyEl = app.querySelector('tbody')
    const templateEl = document.querySelector('template')

    const { store, getState, ...events } = modelFactory()
    const { addItem, updateItem, deleteItem, exchangeItem } = events
    const dragAndDrop = dragAndDropFactory(tbodyEl)

    let activeTrNode

    const renderIndex = () => {
        tbodyEl.querySelectorAll('tr')
            .forEach( (el, index) => {
                el.dataset.index = index
            })
    }

    const renderSum = () => {
        sum(store.data, app)
    }

    const addItemEvents = (node, idx) => {

        const inputEls = node.querySelectorAll('input[type="number"]')
        const amountEl = node.querySelector('input[name="amount"]')
        const priceEl = node.querySelector('input[name="price"]')
        const confirmButton = node.querySelector('button[name="confirm"]')
        const deleteButton = node.querySelector('button[name="delete"]')
        const cancelButton = node.querySelector('button[name="cancel"]')

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
                        console.log('update', index)
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

        dragAndDrop.nodeEvents(node, addItemEvents)
        
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

        dragAndDrop.domEvents(renderIndex, exchangeItem)
        
    }

    renderTable()
    addEvents()

    document.querySelector('#test')
        .addEventListener('click', () => {
            exchangeItem('bottom', 2, 0)
        })

}

export default App
