import { clonedNode } from './helpers.js'
import modelFactory from './model.js'
import sum from './sum.js'
import itemFactory from './item.js'
import dragAndDropFactory from './dragAndDrop.js'

const App = () => {

    const app = document.querySelector('#root')
    const tbodyEl = app.querySelector('tbody')
    const addButton = app.querySelector('button[name="add"]')

    const { store, ...events } = modelFactory()
    const { exchangeItem } = events
    const dragAndDrop = dragAndDropFactory(tbodyEl)

    let state = {
        el : null,
        get activeNode() {
            return this.el
        },
        set activeNode(v) {
            this.el = v
        }
    }

    const renderIndex = () => {
        tbodyEl.querySelectorAll('tr')
            .forEach( (el, index) => {
                el.dataset.index = index
            })
    }

    const renderSum = () => {
        sum(store.data, app)
    }

    const item = itemFactory(app, store, events, state, renderSum, renderTable, dragAndDrop)

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

        app.addEventListener('click', () => {
            const activeNode = state.activeNode
            if (activeNode && document.activeElement.tagName !== 'INPUT') {
                activeNode.dataset.focus = false
                state.activeNode = null
            }
        })

        dragAndDrop.addDomEvents(renderIndex, exchangeItem)
        
    }

    renderTable()
    addEvents()

    // document.querySelector('#test')
    //     .addEventListener('click', () => {
    //         exchangeItem('bottom', 2, 0)
    //     })

}

export default App
