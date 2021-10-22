import eventCreators from '../model/eventCreators.js'

const getElement = (item, index) => {
    const newNode = 
        document.querySelector('[data-template=market-item]')
        .content
        .firstElementChild
        .cloneNode(true)
    newNode.dataset.index = index
    newNode
        .querySelector('[data-text=item]')
        .textContent = item
    return newNode
}


export default (app, state, dispatch) => {
    const { items } = state
    const fragment = new DocumentFragment()
    const cpnt = app.querySelector('[data-component=market-list]')
    cpnt.innerHTML = ''
    items
        .map( (item, index) => getElement(item, index) )
        .forEach( element => {
            fragment.appendChild( element )
        })
    cpnt.appendChild(fragment)
   
}