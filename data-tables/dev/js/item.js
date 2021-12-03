import { clonedNode } from './helpers.js'

const item = (app, store, state, events, renderSum, renderTable, dragAndDrop) => {

    const templateEl = app.querySelector('template')

    const addNodeEvents = (node, type) => {
        const { addItem, updateItem, deleteItem } = events

        const inputEls = node.querySelectorAll('input[type="number"]')
        const amountEl = node.querySelector('input[name="amount"]')
        const priceEl = node.querySelector('input[name="price"]')
        const deleteButton = node.querySelector('button[name="delete"]')

        type = type || 'update' 

        const onInputElChange = (event) => {
            const inputEl = event.target
            if (inputEl.checkValidity() === false ) {
                inputEl.focus()
                return
            }
            switch(type) {
                case 'add' :
                    addItem(amountEl.value, priceEl.value)
                    type = 'update'
                    break
                case 'update' :
                    updateItem(node.dataset.index, inputEl.name, inputEl.value)
                    break
                default :
                    break
            }
            renderSum()
            node.dataset.focus = false
            state.activeNode = null
        }

        const handleCancelItem = () => {
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
            state.activeNode = null
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

            inputEl.addEventListener('change', onInputElChange)

        })

        priceEl.addEventListener('keydown', (event) => {
            if (event.key === 'Enter') {
                const trEl = event.shiftKey ? node.previousElementSibling : node.nextElementSibling
                trEl &&
                    trEl.querySelector('input[name="price"]').focus()
            }
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