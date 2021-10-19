
const getElement = (item) => {
    const newNode = 
        document.querySelector('[data-template=item]')
        .content
        .firstElementChild
        .cloneNode(true)
    newNode.dataset.id = item
    newNode
        .querySelector('[data-text=item]')
        .textContent = item
    return newNode
}

export default (state) => {
    const { items } = state
    const fragment = new DocumentFragment()
    const newApp = document.querySelector('[data-component=list]')
    newApp.innerHTML = ''
    items
        .map( item => getElement(item) )
        .forEach( element => {
            fragment.appendChild( element )
        })
    newApp.appendChild(fragment)
}