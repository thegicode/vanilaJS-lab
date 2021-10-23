import eventCreators from '../model/eventCreators.js'
import eventBusFactory from '../model/eventBus.js'
import modelFactory from '../model/model.js'

import vegesView from './veges.js'

const modifiers = modelFactory()
const eventBus = eventBusFactory(modifiers)

const addFormEvents = (app, dispatch) => {
    app.querySelector('form')
        .addEventListener('submit', function(e) {
            e.preventDefault()
            const inputEl = this.elements.name
            const event = eventCreators.addItem(inputEl.value)
            dispatch(event)
            inputEl.value = ''
        })
}

const itemUpdate = (app, index, text) => {
    app
        .querySelector(`[data-index="${index}"] [data-text="item"]`)
        .textContent = text
}

export default () => {
    const { 
        subscribe,
        dispatch, 
        getState } = eventBus

    const app = document.querySelector('#market')

    const vegesRender = (state) => {
        vegesView(app, state, dispatch)
    }
    subscribe(vegesRender)
    
    vegesRender(getState())

    addFormEvents(app, dispatch)

}
