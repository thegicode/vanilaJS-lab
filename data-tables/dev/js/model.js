
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

const updateItem = (index, value) => {
    DATA[index].amount = Number(value)
    DATA[index].price = DATA[index].amount * 1000
}

const deleteItem = (index) => {
    DATA.splice(index, 1)
}

export {
    DATA,
    updateItem,
    deleteItem
} 