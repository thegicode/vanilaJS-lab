const INITIAL_STATE = {
    items: [ '깻잎', '상추', '케일'],
    others: null
}

export default (initialState = INITIAL_STATE) => {
    
    const state = initialState

    const listeners = []

    const addInvokes = (fn) => {
        if( listeners.includes(fn) ) {
            return
        }

        listeners.push(fn)
    }

    const invokes = (param) => {
        listeners.forEach( fn => fn(state, param) )
    }

    const getState = () => {
        return state
    }

    const addItem = text => {
        if(!text){
            return
        }

        if( state.items.includes(text) ) {
            return
        }

        state.items.push(text)

        invokes()
    }

    const updateItem = (index, text) => {
        if (index < 0) {
            return
        }
        if (!text) {
            return
        }

        if (!state.items[index]) {
            return
        }

        state.items[index] = text

        const param = {
            type: 'update', 
            index, 
            text}

        invokes(param)

    }

    const deleteItem = (index) => {
        if (index < 0) {
            return
        }

        if (!state.items[index]) {
            return
        }

        state.items.splice(index, 1)

        invokes()

    }

    return {
        addInvokes,
        invokes,
        getState,
        addItem,
        updateItem,
        deleteItem
    }
}