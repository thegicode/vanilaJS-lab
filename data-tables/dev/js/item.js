import { clonedNode } from './helpers.js'

const item = () => {

    const addEvents = (node, index, store, events, state, renderSum, renderTable) => {
        const { addItem, updateItem, deleteItem, exchangeItem } = events

        const amountEl = node.querySelector('input[name="amount"]')
        const priceEl = node.querySelector('input[name="price"]')

        const inputEls = node.querySelectorAll('input[type="number"]')
        const confirmButton = node.querySelector('button[name="confirm"]')
        const cancelButton = node.querySelector('button[name="cancel"]')
        const deleteButton = node.querySelector('button[name="delete"]')

        let type = 'update'
        if (index === null) {
            type = 'add'
            index = store.data.length
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
                    node.dataset.index = index
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

    }

    const getNode = (data, index, templateEl) => {
        const { amount, price } = data

        const node = clonedNode(templateEl)
        const amountEl = node.querySelector('input[name="amount"]')
        const priceEl = node.querySelector('input[name="price"]')

        node.dataset.index = index
        amountEl.value = amount
        priceEl.value = price
        
        return node
    }

    
    return {
        getNode,
        addEvents
    }

}

export default item