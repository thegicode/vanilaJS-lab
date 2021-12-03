import { clonedNode } from './helpers.js'

const item = (app, store, state, events, renderSum, renderTable, dragAndDrop) => {
    const templateEl = app.querySelector('template')
    const { addItem, updateItem, deleteItem } = events

    const addNodeEvents = (node, type) => {

        const inputEls = node.querySelectorAll('input[type="number"]')
        const amountEl = node.querySelector('input[name="amount"]')
        const priceEl = node.querySelector('input[name="price"]')
        const checkEl = node.querySelector('.check')
        const deleteButton = node.querySelector('button[name="delete"]')

        type = type || 'update' 

        const onInputElFocus = () => {
            const activeNode = state.activeNode
            if (activeNode && activeNode !== node ) {
                delete activeNode.dataset.focus
            }
            node.dataset.focus = true
            state.activeNode = node
        }

        const onInputElChange = (event) => {
            const inputEl = event.target
            if (inputEl.checkValidity() === false ) {
                inputEl.focus()
                return
            }
            switch(type) {
                case 'add':
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

        inputEls.forEach( inputEl => {
            inputEl.addEventListener('focus', onInputElFocus)
            inputEl.addEventListener('change', onInputElChange)
        })

        priceEl.addEventListener('keydown', (event) => {
            switch(event.key) {
                case 'Enter':
                    const trEl = event.shiftKey ? 
                        node.previousElementSibling : node.nextElementSibling
                    trEl &&
                        trEl.querySelector('input[name="price"]').focus()
                    break
                case 'F6':
                    const value = event.shiftKey ? false : true
                    checkEl.textContent = value
                    updateItem(node.dataset.index, 'check', value)
                    break
                default:
                    // console.log('keydown')
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
        const { amount, price, check } = data

        const node = clonedNode(templateEl)
        const amountEl = node.querySelector('input[name="amount"]')
        const priceEl = node.querySelector('input[name="price"]')
        const checkEl = node.querySelector('.check')

        node.dataset.index = index
        amountEl.value = amount
        priceEl.value = price
        checkEl.textContent = check 

        addEvents(node)

        return node
    }

    const getEmptyNode = () => {
        const index = store.data.length
        const node = clonedNode(templateEl)
        
        node.dataset.index = index
        node.querySelector('.check').textContent = false

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