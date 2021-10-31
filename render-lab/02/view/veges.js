import eventCreators from '../model/eventCreators.js'

// const nodeUpdate = (app, index, text) => {
//     const inputEl = app.querySelector(`[data-index="${index}"] input[type="text"]`)
//     inputEl.value = text
//     inputEl.title = text
//     inputEl.blur()
// }

const addEvents = (newNode, app, index, dispatch) => {
    newNode.addEventListener('keydown', (e) => {
        if (e.keyCode === 13) {
            const value = e.target.value
            const event = eventCreators.updateItem(index, value)
            dispatch(event)
            // nodeUpdate(app, index, value)
        }
    })
    newNode
        .querySelector('[data-button="delete"]')
        .addEventListener('click', (e) => {
            const event = eventCreators.deleteItem(index)
            dispatch(event)
        })
}

const getElement = (app, vege, index, dispatch) => {
    const newNode = 
        document.querySelector('[data-template=market-item]')
        .content
        .firstElementChild
        .cloneNode(true)
    newNode.dataset.index = index
    const inputEl = newNode.querySelector('input[type="text"]')
    inputEl.value = vege
    inputEl.title = vege

    addEvents(newNode, app, index, dispatch)

    return newNode
}


export default (app, state, dispatch) => {
    const { veges } = state
    const newApp = app.cloneNode(true)
    newApp.innerHTML = ''
    veges
        .map( (vege, index) => getElement(app, vege, index, dispatch) )
        .forEach( element => {
            newApp.appendChild( element )
        })
    return newApp
}

// const { veges } = state
    // const fragment = new DocumentFragment()
    // veges
    //     .map( (vege, index) => getElement(app, vege, index, dispatch) )
    //     .forEach( element => {
    //         fragment.appendChild( element )
    //     })
        
    // window.requestAnimationFrame( () => {
    //     const cpnt = app.querySelector('[data-component=market-list]')
    //     cpnt.innerHTML = ''
    //     cpnt.appendChild(fragment)
    // })