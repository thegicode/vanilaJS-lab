
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

const addItem = (value) => {
    const v = Number(value)
    DATA.push({
        amount: v,
        price: v * 1000
    })
}

const updateItem = (index, value) => {
    const v = Number(value)
    DATA[index] = {
        amount: v,
        price: v * 1000
    }
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
