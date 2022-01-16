
const cloneDeep = x => {
    return JSON.parse(JSON.stringify(x))
}

const INITIAL_STATE = {
    a: 0,
    b: 0
}

const methods = {
    updateItem: (state, data) => {
        const { a, b } = state
        const { number } = data
        return {
            a: a + number,
            b: b + number + 1
        }
    }
}

export default (initialState = INITIAL_STATE) => {
    return (state, event) => {
        if (!state) {
            return cloneDeep(initialState)
        }

        const { type, data } = event
        const method = methods[type]
        if (!method) {
            return pravState
        }

        return method(state, data)
    }
}