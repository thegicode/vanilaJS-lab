const app = document.querySelector('#market')

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

const updateElement = (param) => {
    const {index, text} = param
    app
        .querySelector(`[data-index="${index}"] [data-text="item"]`)
        .textContent = text
}

export default (state, param) => {
    const { items } = state
    const fragment = new DocumentFragment()
    const cpnt = app.querySelector('[data-component=market-list]')
    if (param && param.type === 'update') {
        updateElement(param)
        return
    }
    cpnt.innerHTML = ''
    items
        .map( (item, index) => getElement(item, index) )
        .forEach( element => {
            fragment.appendChild( element )
        })
    cpnt.appendChild(fragment)

}