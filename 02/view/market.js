import eventCreators from '../model/eventCreators.js'

import eventBusFactory from '../model/eventBus.js'
import modelFactory from '../model/model.js'

import vegesView from './veges.js'

const modifiers = modelFactory()
const eventBus = eventBusFactory(modifiers)

const addEvents = (app, dispatch) => {
    app
        .querySelector('[data-button=add]')
        .addEventListener('click', (e) => {
            dispatch(eventCreators.addItem('배추'))
        })  
    app
        .querySelector('[data-button=edit]')
        .addEventListener('click', (e) => {
            dispatch(eventCreators.updateItem(2, '무'))
            itemUpdate(app, 2, '무')
        }) 
    app
        .querySelector('[data-button=delete]')
        .addEventListener('click', (e) => {
            dispatch(eventCreators.deleteItem(1))
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

    const render = (state) => {
        vegesView(app, state, dispatch)
    }
    subscribe(render)
    
    render(getState())

    addEvents(app, dispatch)
}
