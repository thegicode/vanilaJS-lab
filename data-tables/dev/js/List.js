import { DATA, updateItem, deleteItem } from './model.js'

const List = () => {

    const app = document.querySelector('#table')
    const template = document.querySelector('template')

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

    const addEvents = (node, index) => {
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
            renderList()
        })
        
    }

    const renderList = () => {
        const el= app.querySelector('tbody')
        el.innerHTML = ''
        DATA.forEach( (data, index) => {
            const { amount, price } = data

            const node = template.content.firstElementChild.cloneNode(true)
            const inputEl = node.querySelector('input')
            const priceEl = node.querySelector('.price')

            inputEl.value = amount.toLocaleString()
            priceEl.textContent = price.toLocaleString()

            addEvents(node, index)

            el.appendChild(node)
        })

        renderSum()
    }

    renderList() // tbody 

}

export default List