
const render = (store, rootEl) => {
    const tbodyEl = rootEl.querySelector('tbody'),
        tfootEl = rootEl.querySelector('tfoot')

    const sum = () => {
        const storeData = store.data
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
        tfootEl.querySelector('.amount').textContent = sum._amount.toLocaleString()
        tfootEl.querySelector('.price').textContent = sum._price.toLocaleString()
        tfootEl.querySelector('.discount').textContent = sum._discountPrice.toLocaleString()
        tfootEl.querySelector('.total').textContent = sum._total.toLocaleString()
    }

    const table = () => {
        tbodyEl.innerHTML = ''

        store.data.forEach( (data, index) => {
            const node = item.getNode(data, index)
            tbodyEl.appendChild(node)
        })

        sum()
    }

    const discountPrice = (el) => {
        const index = el.dataset.index
        const { isCheck, discountPrice } = store.data[index]
        el.querySelector('.discount')
            .textContent = isCheck ? discountPrice : ''
    }

    const index = () => {
        tbodyEl.querySelectorAll('tr')
            .forEach( (el, index) => {
                el.dataset.index = index
            })
    }

    return {
        sum,
        table,
        discountPrice,
        index
    }
}

export default render