import { DATA, addItem, updateItem, deleteItem } from './model.js'

const _clonedNode = (node) => {
    return node.content.firstElementChild.cloneNode(true)
}

const List = () => {

    const app = document.querySelector('#table')
    const tbodyEl = app.querySelector('tbody')
    const templateEl = document.querySelector('template')

    const renderSum = () => {
        const el = app.querySelector('tfoot')
        const sum = {
            _amount: 0,
            _price: 0
        }
        DATA.forEach( data => {
            sum._amount += data.amount
            sum._price += data.price
        })
        el.querySelector('.amount').textContent = sum._amount.toLocaleString()
        el.querySelector('.price').textContent = sum._price.toLocaleString()
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
                } 
            })

            tbodyEl.appendChild(node)
            inputEl.focus()
        })

    renderTable()

}

export default List