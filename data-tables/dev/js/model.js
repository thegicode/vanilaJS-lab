
const DATA = [
    {
        amount: 1,
        price: 1000
    },
    {
        amount: 2,
        price: 2000
    }
]

const update = (index, value) => {
    DATA[index].amount = Number(value)
    DATA[index].price = DATA[index].amount * 1000
}

export {
    DATA,
    update
} 