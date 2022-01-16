
const cloneDeep = x => {
    return JSON.parse(JSON.stringify(x))
}
  
const freeze = state => Object.freeze(cloneDeep(state))

export default (model) => {

    let state = model()
    console.log('initial state', state)

    const getState = () => {
        return freeze(state)
    }

    const dispatch = (event) => {
        const newState = model(state, event)

        if (!newState) {
            return
        }
        if (newState === state) {
            return
        }

        state = newState
        console.log('state', state)
    }
    
    return {
        getState,
        dispatch
    }
}