import eventCreators from '../model/eventCreators.js'

const getElement = (vege, index) => {
    const newNode = 
        document.querySelector('[data-template=market-item]')
        .content
        .firstElementChild
        .cloneNode(true)
    newNode.dataset.index = index
    newNode
        .querySelector('[data-text=item]')
        .textContent = vege
    return newNode
}

// const itemUpdate = (app, index, text) => {
//     app
//         .querySelector(`[data-index="${index}"] [data-text="item"]`)
//         .textContent = text
// }

export default (app, state, dispatch) => {
    const { veges } = state
    const fragment = new DocumentFragment()
    const cpnt = app.querySelector('[data-component=market-list]')
    cpnt.innerHTML = ''
    veges
        .map( (vege, index) => getElement(vege, index) )
        .forEach( element => {
            fragment.appendChild( element )
        })
    cpnt.appendChild(fragment)
   
}