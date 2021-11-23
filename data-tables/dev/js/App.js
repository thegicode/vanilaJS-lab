import { DATA, addItem, updateItem, deleteItem } from './model.js'
import Sum from './Sum.js'

const _clonedNode = (node) => {
    return node.content.firstElementChild.cloneNode(true)
}

const App = () => {

    const app = document.querySelector('#root')
    const tbodyEl = app.querySelector('tbody')
    const templateEl = document.querySelector('template')

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

        let type = 'update'
        let index = idx
        if (index === null) {
            type = 'add'
            index = DATA.length
        }

        inputEls.forEach( inputEl => {
            inputEl.addEventListener('focus', () => {
                deleteButton.ariaHidden = true
                confirmButton.ariaHidden = false
                cancelButton.ariaHidden = false
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
            deleteButton.ariaHidden = false
            confirmButton.ariaHidden = true
            cancelButton.ariaHidden = true
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
            deleteButton.ariaHidden = false
            confirmButton.ariaHidden = true
            cancelButton.ariaHidden = true
        })

        deleteButton.addEventListener('click', () => {
            deleteItem(index)
            renderTable()
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

        // app.querySelector('form')
        //     .addEventListener('submit', e => {
        //         e.preventDefault()
        //     })

        app.querySelector('button[name="add"]')
            .addEventListener('click', (e) => {

                const node = _clonedNode(templateEl)
                tbodyEl.appendChild(node)

                addItemEvents(node, null)
                node.querySelector('input').focus()
            
            })
    }

    renderTable()
    addEvents()

}

export default App