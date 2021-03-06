import models from './model.js'
import renders from './render.js'
import dragAndDrops from './dragAndDrop.js'
import items from './item.js'

const rootEl = document.querySelector('#root')
const tbodyEl = rootEl.querySelector('tbody')
const addButton = rootEl.querySelector('button[name="add"]')

const { store, ...events } = models()
const render = renders(rootEl, store)
const dragAndDrop = dragAndDrops(rootEl, events, render)
const item = items(rootEl, store, events, dragAndDrop, render)

const addEvents = () => {
    addButton.addEventListener('click', (e) => {
        const node = item.getEmptyNode()
        tbodyEl.appendChild(node)
        node.querySelector('input').focus()
    })

    dragAndDrop.addDomEvents()
}

if (render.table(item.getNode)) {
    document.querySelector('.loading').hidden = true
}

addEvents()


