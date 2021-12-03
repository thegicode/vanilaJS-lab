
const __cloneDeep = x => {
    return JSON.parse(JSON.stringify(x))
}
  
const __freeze = x => Object.freeze(__cloneDeep(x))

const INITIAL_DATA = [
    {
        amount: 0,
        price: 1000,
        check: false
    },
    {
        amount: 1,
        price: 2000,
        check: false
    },
    {
        amount: 2,
        price: 3000,
        check: false
    },
    {
        amount: 3,
        price: 4000,
        check: false
    },
    {
        amount: 4,
        price: 5000,
        check: false
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
        const obj = {
            amount: Number(amount),
            price: Number(price),
            check: false
        }
        state.push(obj)
        console.log('add: ', Array.from(state, item => (item.amount || item.price)))
    }
    
    const updateItem = (index, key, value) => {
        if (key === 'amount' || key === 'price') {
            value = Number(value)
        }
        if (state[index][key] === value ) {
            return
        }
        
        state[index][key] = value

        console.log('update: ', Array.from(state, item => item[key]) )
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

    return {
        store,
        addItem,
        updateItem,
        deleteItem,
        exchangeItem
    }
}


