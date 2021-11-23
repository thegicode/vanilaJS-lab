
const DATA = [
    {
        amount: 1,
        price: 1000
    },
    {
        amount: 2,
        price: 2000
    },
    {
        amount: 3,
        price: 3000
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
    DATA.splice(index, 1)
}


export {
    DATA,
    addItem,
    updateItem,
    deleteItem
} 
