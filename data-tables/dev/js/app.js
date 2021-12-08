import modelFactory from './model.js'
import itemFactory from './item.js'
import dragAndDropFactory from './dragAndDrop.js'
// import sum from './sum.js'
import rednerFactory from './render.js'

const app = () => {

    const rootEl = document.querySelector('#root')
    const tbodyEl = rootEl.querySelector('tbody')
    const addButton = rootEl.querySelector('button[name="add"]')

    let state = {
        el : null,
        get activeNode() {
            return this.el
        },
        set activeNode(v) {
            this.el = v
        }
    }

    const { store, ...events } = modelFactory()
    const render = rednerFactory(store, rootEl)
    const dragAndDrop = dragAndDropFactory(rootEl, state, events, render)
    const item = itemFactory(rootEl, store, state, events, renderTable, dragAndDrop, render)

    function renderTable() {
        const el = tbodyEl
        el.innerHTML = ''

        store.data.forEach( (data, index) => {
            const node = item.getNode(data, index)
            el.appendChild(node)
        })

        render.sum()
    }
    
    const addEvents = () => {
        addButton.addEventListener('click', (e) => {
            const node = item.getEmptyNode()
            tbodyEl.appendChild(node)
            node.querySelector('input').focus()
        })
        
        addButton.addEventListener('focus', () => {
            const activeNode = state.activeNode
            if (activeNode) {
                activeNode.dataset.focus = false
                state.activeNode = null
            }
        })

        dragAndDrop.addDomEvents()
    }

    renderTable()
    addEvents()

}

export default app
