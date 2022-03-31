
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

    console.log(Array.from(DATA, item => item.amount))
}

const updateItem = (index, key, value) => {
    DATA[index][key] = Number(value)

    console.log(Array.from(DATA, item => item.amount))
}

const deleteItem = (index) => {
    return DATA.splice(index, 1)

    console.log(Array.from(DATA, item => item.amount))
}


const exchangeItem = (type, targetIdx, draggedIdx) => {
    console.log(type, targetIdx, draggedIdx)
    let arr, item

    const targetIndex = Number(targetIdx)
    const draggedIndex = Number(draggedIdx)

    const _splice1 = index => {
        arr = DATA.splice(0, index)
        item = arr.splice(draggedIndex, 1)
    }
    const _splice2 = index => {
        item = DATA.splice(draggedIndex, 1)
        arr = DATA.splice(0, index)
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
    DATA = [...arr, ...item, ...DATA]
    console.log(Array.from(DATA, item => item.amount))
}


export {
    DATA,
    addItem,
    updateItem,
    deleteItem,
    exchangeItem
} 
