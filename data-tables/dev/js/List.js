import { DATA, update } from './model.js'

const List = () => {


    const cpnt = document.querySelector('#tables')
    const template = document.querySelector('template')

    const addUp = () => {
        const el = cpnt.querySelector('tfoot')
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

    const addEvents = (inputEl, priceEl, index) => {
        inputEl.addEventListener('change', e => {
            if ( e.target.checkValidity() === true ) {
                update(index, e.target.value)
                priceEl.textContent = DATA[index].price.toLocaleString()
                addUp()
            } 
        })
    }

    const lists = () => {
        DATA.forEach( (data, index) => {
            const { amount, price } = data

            const node = template.content.firstElementChild.cloneNode(true)
            const inputEl = node.querySelector('input')
            const priceEl = node.querySelector('.price')

            inputEl.value = amount.toLocaleString()
            priceEl.textContent = price.toLocaleString()

            addEvents(inputEl, priceEl, index)

            cpnt.querySelector('tbody')
                .appendChild(node)
        })
    }

    lists() // tbody 
    addUp() // tfoot

}

export default List