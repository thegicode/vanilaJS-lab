
const __cloneDeep = x => {
    return JSON.parse(JSON.stringify(x))
}
  
const __freeze = x => Object.freeze(__cloneDeep(x))

const INITIAL_DATA = [
    {
        amount: 0,
        price: 1000,
        isCheck: true,
        discountPrice: 0
    },
    {
        amount: 1,
        price: 2000,
        isCheck: true,
        discountPrice: 200
    },
    {
        amount: 2,
        price: 3000,
        isCheck: false,
        discountPrice: null
    },
    {
        amount: 3,
        price: 4000,
        isCheck: false,
        discountPrice: null
    },
    {
        amount: 4,
        price: 5000,
        isCheck: false,
        discountPrice: null
    }
]

export default () => {

    let state = __cloneDeep(INITIAL_DATA)

    const store = {
        get data() {
            return __freeze(state)
        }
    }

    const addItem = (amount, price) => {
        state.push({
            amount: Number(amount),
            price: Number(price),
            isCheck: false
        })
        console.log('add: ', Array.from(state, item => (item.amount || item.price)))
    }
    
    const updateItem = (index, key, value) => {
        const data = state[index]
        if (key === 'amount' || key === 'price') {
            value = Number(value)
        }
        if (data[key] === value ) {
            return
        }
        
        data[key] = value

        if( data.isCheck ) {
            discount(index)
        }

        console.log(data)
        // console.log('update: ', Array.from(state, item => item[key]) )
    }
    
    const deleteItem = (index) => {
        const deleted = state.splice(index, 1)
        console.log('delete: ', Array.from(state, item => item.amount))
        return deleted
    }
    
    const exchangeItem = (type, targetIdx, draggedIdx) => {
        console.log(type, targetIdx, draggedIdx)
        let arr, item
    
        const targetIndex = Number(targetIdx)
        const draggedIndex = Number(draggedIdx)

        const _splice1 = index => {
            arr = state.splice(0, index)
            item = arr.splice(draggedIndex, 1)
        }
        const _splice2 = index => {
            item = state.splice(draggedIndex, 1)
            arr = state.splice(0, index)
        }
    
        switch(type) {
            case 'top':
                if (targetIndex > draggedIndex) {
                    _splice1(targetIndex)
                } else {
                    _splice2(targetIndex)
                }
                break
            case 'bottom':
                if (targetIndex > draggedIndex) {
                    _splice1(targetIndex + 1)
                } else {
                    _splice2(targetIndex + 1)
                }
                break
            default :
                console.log('exchangeItem')
        }
        state = [...arr, ...item, ...state]
        console.log('exchange: ', Array.from(state, item => item.amount))
    }

    const discount = (index, isCheck) => {
        const data = state[index]
        let dsPrice = null
        isCheck = isCheck || data.isCheck
        if (isCheck === true) {
            dsPrice = data.amount * data.price * 0.1
        } 
        data.discountPrice = dsPrice
        console.log('discount: ', Array.from(state, item => item.discountPrice))
        return dsPrice
    }

    return {
        store,
        addItem,
        updateItem,
        deleteItem,
        exchangeItem,
        discount
    }
}


