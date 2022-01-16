
export default (model, eventBus) => {

    const mainEl = document.querySelector('main-app')
    const otehrEl = document.querySelector('other-app')
    const otehr2El = document.querySelector('other2-app')

    sync()

    mainEl
        .querySelector('button')
        .addEventListener('click', () => {
            const event = {
                type: 'updateItem',
                data: {
                    number: 20
                } 
            }
            eventBus.dispatch(event)
            sync()
        })
    

    function sync() {
        const state = eventBus.getState()
        otehrEl.data = state.a
        otehr2El.data = state.b
    }

}