
const DATA = [
    {
        amount: 1,
        price: 1000
    },
    {
        amount: 2,
        price: 2000
    }
]

const cpnt = document.querySelector('#tables')
const template = document.querySelector('template')
DATA.forEach( (data, index) => {
    const el = template.content.firstElementChild.cloneNode(true)
    el.querySelector('input').value = data.amount
    el.querySelector('.price').textContent = data.price
    cpnt.querySelector('tbody')
        .appendChild(el)
})


