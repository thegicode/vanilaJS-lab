import { DATA, addItem, updateItem, deleteItem } from './model.js'
import Sum from './Sum.js'

const _clonedNode = (node) => {
    return node.content.firstElementChild.cloneNode(true)
}

const App = () => {

    const app = document.querySelector('#table')
    const tbodyEl = app.querySelector('tbody')
    const templateEl = document.querySelector('template')

    const renderSum = () => {
        Sum(DATA, app)
    }

    const addItemEvents = (node, index) => {

        const inputEl = node.querySelector('input')
        const priceEl = node.querySelector('.price')
        const deleteButton = node.querySelector('button[name="delete"]')

        inputEl.addEventListener('change', e => {
            if ( e.target.checkValidity() === true ) {
                updateItem(index, e.target.value)
                priceEl.textContent = DATA[index].price.toLocaleString()
                renderSum()
            } 
        })

        deleteButton.addEventListener('click', () => {
            deleteItem(index)
            renderTable()
        })
        
    }

    const renderTable = () => {
        const el = tbodyEl
        el.innerHTML = ''

        // Render List
        DATA.forEach( (data, index) => {
            const { amount, price } = data

            const node = _clonedNode(templateEl)
            const inputEl = node.querySelector('input')
            const priceEl = node.querySelector('.price')

            inputEl.value = amount.toLocaleString()
            priceEl.textContent = price.toLocaleString()

            addItemEvents(node, index)

            el.appendChild(node)
        })

        renderSum()
    }

    const addEvents = () => {
        document.querySelector('button[name="add"]')
            .addEventListener('click', () => {

                const node = _clonedNode(templateEl)
                const inputEl = node.querySelector('input')
                const priceEl = node.querySelector('.price')

                inputEl.addEventListener('change', e => {
                    if ( e.target.checkValidity() === true ) {
                        addItem(e.target.value)
                        const index = DATA.length - 1
                        priceEl.textContent = DATA[index].price.toLocaleString()
                        addItemEvents(node, index)
                        renderSum()
                    } 
                })

                tbodyEl.appendChild(node)
                inputEl.focus()

                

            })
    }

    renderTable()
    addEvents()

}

export default App