
import models from './model.js'
const { exchangeItem } = models()

export default class DataTables extends HTMLElement {
    constructor() {
        super()
        this.tbody = this.querySelector('tbody')
        this.dragOriginEl
        this.dragDraggedEl
        this.dragTargetedEl
    }

    connectedCallback() {
        this.tbody.querySelectorAll('tr')
            .forEach( tr => {
                this.addDraggerEvents(tr)
            })
        document.addEventListener("dragover", this.onDragover.bind(this))
    }

    disconnectedCallback() {
        document.removeEventListener("dragover", this.onDragover.bind(this))
    }

    addDraggerEvents(node) {
        const draggerButton = node.querySelector('button[name="dragger"]')
        draggerButton.addEventListener('mousedown', () => {
            node.draggable = true
        })
        draggerButton.addEventListener('mouseup', () => {
            node.removeAttribute('draggable')
        })

        node.addEventListener("dragstart", (event) => {
            this.dragDraggedEl = node.cloneNode(true)
            this.addDraggerEvents(this.dragDraggedEl)
            this.dragOriginEl = node
            setTimeout( () => {
                this.dragOriginEl.dataset.origin = true
            }, 1)
        })
        node.addEventListener("dragend", () => {
            if (!this.dragTargetedEl) return

            this.tbody.dataset.drop = true
            const draggedIndex = this.dragDraggedEl.dataset.index
            const pos = this.dragTargetedEl.dataset.pos || 'top'
            window.requestAnimationFrame( () => {
                if (pos === 'bottom') {
                    this.dragTargetedEl.after(this.dragDraggedEl)
                } else {
                    this.dragTargetedEl.before(this.dragDraggedEl)
                }

                exchangeItem(pos, draggedIndex, this.dragTargetedEl.dataset.index)

                delete this.dragTargetedEl.dataset.pos
                this.dragOriginEl.remove()
                this.dragDraggedEl.removeAttribute('draggable')

                this.renderIndex()

                setTimeout( () => {
                    delete this.tbody.dataset.drop
                }, 100)
            })
        })
        node.addEventListener("dragenter", (event) => {
            window.requestAnimationFrame( () => {
                if(this.isMove(this.dragOriginEl, event)) {
                    // css 간편화를 위해 끝으로, 중간에 dragOriginEl이 있으면 css가 복잡
                    this.tbody.appendChild(this.dragOriginEl)
                } 

                if( node === this.dragOriginEl || node === this.dragTargetedEl ) {
                    return
                }
        
                // 이전 dragTargetedEl의 data 속성 제거
                if ( this.dragTargetedEl ) {
                    delete this.dragTargetedEl.dataset.pos
                }
                this.dragTargetedEl = node
            })
            
        })

    }

    onDragover(event) {
        event.preventDefault()
            
        if (!this.dragTargetedEl) {
            this.dragOriginEl.removeAttribute('draggable')
            delete this.dragOriginEl.dataset.origin
            return
        }

        window.requestAnimationFrame( () => {
            let el = this.dragTargetedEl
            const mouseY = event.clientY
            const elHalfVal = el.offsetTop + el.offsetHeight/2

            if(mouseY > elHalfVal) { 
                // 마우스 위치가 el의 절반 위치보다 크면
                el.dataset.pos = 'bottom'
            } else if(this.isMove(el, event)) { 
                el.dataset.pos = 'top'
            } 
        })
    }

    renderIndex() {
        this.tbody.querySelectorAll('tr')
            .forEach( (el, index) => {
                el.dataset.index = index
            })
    }

    isMove(el, event) {
        let val = el.offsetTop - event.clientY
        if (val < 0) val = -val
        if (val > el.offsetHeight/4) {
            return true
        }
        return false
    }
}


