
const render = (rootEl, store) => {
    const tbodyEl = rootEl.querySelector('tbody')

    const sum = () => {
        const tfootEl = rootEl.querySelector('tfoot')
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
        
        const cloned = tfootEl.cloneNode(true)
        cloned.querySelector('.amount').textContent = sum._amount.toLocaleString()
        cloned.querySelector('.price').textContent = sum._price.toLocaleString()
        cloned.querySelector('.discount').textContent = sum._discountPrice.toLocaleString()
        cloned.querySelector('.total').textContent = sum._total.toLocaleString()
        tfootEl.replaceWith(cloned)

        // tfootEl.querySelector('.amount').textContent = sum._amount.toLocaleString()
        // tfootEl.querySelector('.price').textContent = sum._price.toLocaleString()
        // tfootEl.querySelector('.discount').textContent = sum._discountPrice.toLocaleString()
        // tfootEl.querySelector('.total').textContent = sum._total.toLocaleString()

        // * Chrome performances 확인 결과 [수정의 경우] idle에서 cloneNode 방식의 시간이 더 짧았다.
    }

    const table = (getNode) => {
        tbodyEl.innerHTML = ''

        // store.data.forEach( (data, index) => {
        //     const node = getNode(data, index)
        //     tbodyEl.appendChild(node)
        // })

        const fragment = new DocumentFragment()
        store.data.forEach( (data, index) => {
            const node = getNode(data, index)
            fragment.appendChild(node)
        })
        tbodyEl.appendChild(fragment)

        sum()
        return true
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