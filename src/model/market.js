const INITIAL_STATE = {
    items: [ '깻잎', '상추', '케일'],
    others: null
}

export default (initialState = INITIAL_STATE) => {
    const state = initialState

    const listeners = []

    const addInvokes = fn => {
        if( listeners.includes(fn) ) {
            return
        }

        listeners.push(fn)
    }

    const invokes = () => {
        listeners.forEach( fn => fn(state) )
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

    return {
        addInvokes,
        invokes,
        getState,
        addItem
    }
}