
export default (model, eventBus) => {

    const mainEl = document.querySelector('main-app')
    const otehrEl = document.querySelector('other-app')
    const otehr2El = document.querySelector('other2-app')


    // init
    sync()


    // events
    mainEl
        .querySelector('button')
        .addEventListener('click', () => {
            model.updateItem(20)
            sync()
        })
    

    // functions
    function sync() {
        const state = model.getState()
        otehrEl.data = state.a
        otehr2El.data = state.b
    }

}