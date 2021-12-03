
const sum = (storeData, app) => {
    const el = app.querySelector('tfoot')
    const sum = {
        _amount: 0,
        _price: 0,
        _discount: 0,
        _total: 0,
    }
    storeData.forEach( data => {
        sum._amount += data.amount
        sum._price += data.amount * data.price
        if (data.check === true) {
            sum._discount += data.amount * data.discount
        }
    })
    sum._total = sum._price - sum._discount
    el.querySelector('.amount').textContent = sum._amount.toLocaleString()
    el.querySelector('.price').textContent = sum._price.toLocaleString()
    el.querySelector('.discount').textContent = sum._discount.toLocaleString()
    el.querySelector('.total').textContent = sum._total.toLocaleString()
}

export default sum
