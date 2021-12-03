import modelFactory from './model.js'
import itemFactory from './item.js'
import dragAndDropFactory from './dragAndDrop.js'
import sum from './sum.js'

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
    const dragAndDrop = dragAndDropFactory(tbodyEl, state, events, renderIndex)

    const item = itemFactory(rootEl, store, state, events, renderSum, renderTable, dragAndDrop)

    function renderIndex() {
        tbodyEl.querySelectorAll('tr')
            .forEach( (el, index) => {
                el.dataset.index = index
            })
    }

    function renderSum() {
        sum(store.data, rootEl)
    }

    function renderTable() {
        const el = tbodyEl
        el.innerHTML = ''

        store.data.forEach( (data, index) => {
            const node = item.getNode(data, index)
            el.appendChild(node)
        })

        renderSum()
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

        // rootEl.addEventListener('click', () => {
        //     const activeNode = state.activeNode
        //     if (activeNode && document.activeElement.tagName !== 'INPUT') {
        //         activeNode.dataset.focus = false
        //         state.activeNode = null
        //     }
        // })

        dragAndDrop.addDomEvents(renderIndex)
        
    }

    renderTable()
    addEvents()

}

export default app
