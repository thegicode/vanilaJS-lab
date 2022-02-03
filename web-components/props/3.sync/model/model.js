
const cloneDeep = x => {
    return JSON.parse(JSON.stringify(x))
}

const freeze = state => Object.freeze(cloneDeep(state))


const INITIAL_STATE = {
    a: 0,
    b: 0
}

export default (initalState = INITIAL_STATE) => {

    const state = cloneDeep(initalState)

    const getState = () => {
        return Object.freeze(cloneDeep(state))
    }

    const updateItem = (number) => {
        const { a, b } = state
        state.a = a + number
        state.b = b + number + 1
    }

    return {
        getState,
        updateItem
    }
}