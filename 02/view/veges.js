import eventCreators from '../model/eventCreators.js'

const itemUpdate = (app, text) => {
    const inputEl = app.querySelector('input[type="text"]')
    inputEl.value = text
    inputEl.title = text
}

const addEvents = (newNode, index, dispatch) => {
    newNode.addEventListener('keydown', (e) => {
        if (e.keyCode === 13) {
            const value = e.target.value
            const event = eventCreators.updateItem(index, value)
            dispatch(event)
            itemUpdate(newNode, value)
        }
    })
    newNode
        .querySelector('[data-button="delete"]')
        .addEventListener('click', (e) => {
            const event = eventCreators.deleteItem(index)
            dispatch(event)
        })
}

const getElement = (vege, index, dispatch) => {
    const newNode = 
        document.querySelector('[data-template=market-item]')
        .content
        .firstElementChild
        .cloneNode(true)
    newNode.dataset.index = index
    itemUpdate(newNode, vege)

    addEvents(newNode, index, dispatch)

    return newNode
}



export default (app, state, dispatch) => {
    const { veges } = state
    const fragment = new DocumentFragment()
    const cpnt = app.querySelector('[data-component=market-list]')
    cpnt.innerHTML = ''
    veges
        .map( (vege, index) => getElement(vege, index, dispatch) )
        .forEach( element => {
            fragment.appendChild( element )
        })
    cpnt.appendChild(fragment)
   
}