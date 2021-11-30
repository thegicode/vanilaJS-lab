
let DATA = [
    {
        amount: 0,
        price: 1000
    },
    {
        amount: 1,
        price: 2000
    },
    {
        amount: 2,
        price: 3000
    },
    {
        amount: 3,
        price: 4000
    },
    {
        amount: 4,
        price: 5000
    }
]

const addItem = (amount, price) => {
    DATA.push({
        amount: Number(amount),
        price: Number(price)
    })
}

const updateItem = (index, key, value) => {
    DATA[index][key] = Number(value)
}

const deleteItem = (index) => {
    return DATA.splice(index, 1)
}


const exchangeItem = (type, desIndex, targetIdx) => {
    // console.log(type, desIndex, targetIdx)
    switch(type) {
        case 'top':
            if (desIndex < targetIdx) {
                const arr = DATA.splice(0, targetIdx)
                const item = arr.splice(desIndex, 1)
                DATA = [...arr, ...item, ...DATA]
            } else {
                const item = DATA.splice(desIndex, 1)
                const arr = DATA.splice(0, targetIdx)
                DATA = [...arr, ...item, ...DATA]
            }
            break
        case 'bottom':
            break
        default :
            console.log('exchangeItem')
    }
}


export {
    DATA,
    addItem,
    updateItem,
    deleteItem,
    exchangeItem
} 
