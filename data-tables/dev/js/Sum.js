
const Sum = (storeData, app) => {

    const el = app.querySelector('tfoot')
    const sum = {
        _amount: 0,
        _price: 0
    }
    storeData.forEach( data => {
        sum._amount += data.amount
        sum._price += data.amount * data.price
    })
    el.querySelector('.amount').textContent = sum._amount.toLocaleString()
    el.querySelector('.price').textContent = sum._price.toLocaleString()

}

export default Sum