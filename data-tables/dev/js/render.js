
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

        tfootEl.querySelector('.amount').textContent = sum._amount.toLocaleString()
        tfootEl.querySelector('.price').textContent = sum._price.toLocaleString()
        tfootEl.querySelector('.discount').textContent = sum._discountPrice.toLocaleString()
        tfootEl.querySelector('.total').textContent = sum._total.toLocaleString()
    }

    const table = (getNode) => {
        tbodyEl.innerHTML = ''
        const fragment = new DocumentFragment()
        store.data.forEach( (data, index) => {
            const node = getNode(data, index)
            fragment.appendChild(node)
        })
        // window.requestAnimationFrame( () => {
            // console.time('a')
            tbodyEl.appendChild(fragment)
            sum()
            // console.timeEnd('a')
        // })

        // requestAnimationFrame
        // load : 1.31787109375, 0.636962890625, 1.977783203125
        // delete center : 0.231201171875, 1.129150390625, 1.551025390625

        // normal
        // load: 0.461181640625, 0.525146484375, 1.32080078125
        // delete center: 0.32080078125, 2.466064453125, 0.294921875

        // load : normal?
        // delete : requestAnimationFrame
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