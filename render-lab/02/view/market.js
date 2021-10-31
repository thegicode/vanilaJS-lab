import eventCreators from '../model/eventCreators.js'
import eventBusFactory from '../model/eventBus.js'
import modelFactory from '../model/model.js'

import vegesView from './veges.js'

import applyDiff from '../applyDiff.js'

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
    const app = document.querySelector('#market')

    const { 
        subscribe,
        dispatch, 
        getState } = eventBus

    const vegesRender = (state) => {
        window.requestAnimationFrame( () => {
            console.time('diff')
            const vegesApp = app.querySelector('[data-component=market-list]')
            const newApp = vegesView(vegesApp, state, dispatch)
            applyDiff(app, vegesApp, newApp)
            console.timeEnd('diff')
        })
    }

    subscribe(vegesRender)
    
    vegesRender(getState())

    addFormEvents(app, dispatch)

}
