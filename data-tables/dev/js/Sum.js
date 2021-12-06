
const sum = (storeData, app) => {
    const el = app.querySelector('tfoot')
    const sum = {
        _amount: 0,
        _price: 0,
        _discountPrice: 0,
        _total: 0,
    }
    storeData.forEach( data => {
        sum._amount += data.amount
        sum._price += data.amount * data.price
        if (data.isCheck === true) {
            sum._discountPrice +=  data.discountPrice
        }
    })
    sum._total = sum._price - sum._discountPrice
    el.querySelector('.amount').textContent = sum._amount.toLocaleString()
    el.querySelector('.price').textContent = sum._price.toLocaleString()
    el.querySelector('.discount').textContent = sum._discountPrice.toLocaleString()
    el.querySelector('.total').textContent = sum._total.toLocaleString()
}

export default sum
