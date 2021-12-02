import { clonedNode } from './helpers.js'

const item = (app, store, events, state, renderSum, renderTable, dragAndDrop) => {

    const templateEl = app.querySelector('template')

    const addNodeEvents = (node, type) => {
        const { addItem, updateItem, deleteItem, exchangeItem } = events

        const inputEls = node.querySelectorAll('input[type="number"]')
        const amountEl = node.querySelector('input[name="amount"]')
        const priceEl = node.querySelector('input[name="price"]')
        const confirmButton = node.querySelector('button[name="confirm"]')
        const cancelButton = node.querySelector('button[name="cancel"]')
        const deleteButton = node.querySelector('button[name="delete"]')

        type = type || 'update' 

        const handleUpdateItem = () => {
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
                    type = 'update'
                    break
                case 'update' :
                    const __idx = node.dataset.index
                    inputEls.forEach( inputEl => {
                        updateItem(__idx, inputEl.name, inputEl.value)
                    })
                    break
                default :
                    break
            }
            renderSum()
            node.dataset.focus = false
        }

        inputEls.forEach( inputEl => {
            inputEl.addEventListener('focus', () => {
                const activeNode = state.activeNode
                if (activeNode && activeNode !== node ) {
                    delete activeNode.dataset.focus
                }
                node.dataset.focus = true
                state.activeNode = node
            })

            inputEl.addEventListener('keydown', (event) => {
                if (event.key === 'Enter') {
                    handleUpdateItem()
                    inputEl.blur()
                    node.dataset.focus = false
                    state.activeNode = null
                }
            })

            inputEl.addEventListener('blur', handleUpdateItem)

        })

        confirmButton.addEventListener('click', handleUpdateItem)

        cancelButton.addEventListener('click', () => {
            const storeData = store.data
            switch(type) {
                case 'add' :
                    node.remove()
                    break
                case 'update' :
                    const __idx = node.dataset.index
                    amountEl.value = storeData[__idx].amount
                    priceEl.value = storeData[__idx].price
                    break
                default :
                    break
            }
            node.dataset.focus = false
        })

        deleteButton.addEventListener('click', () => {
            deleteItem(node.dataset.index)
            renderTable()
        })

    }

    const addEvents = (node, type) => {
        addNodeEvents(node, type)
        dragAndDrop.addEvents(node, addEvents)
    }

    const getNode = (data, index) => {
        const { amount, price } = data

        const node = clonedNode(templateEl)
        const amountEl = node.querySelector('input[name="amount"]')
        const priceEl = node.querySelector('input[name="price"]')

        node.dataset.index = index
        amountEl.value = amount
        priceEl.value = price

        addEvents(node)

        return node
    }

    const getEmptyNode = () => {
        const index = store.data.length
        const node = clonedNode(templateEl)
        
        node.dataset.index = index

        addEvents(node, 'add')

        return node
    }
    
    return {
        getNode,
        getEmptyNode,
        addEvents
    }

}

export default item