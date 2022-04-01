export default class DataTables extends HTMLElement {
    constructor() {
        super()
        this.tbody = this.querySelector('tbody')
        this.originEl
        this.draggedEl
        this.targetedEl
    }

    connectedCallback() {
        this.tbody.querySelectorAll('tr')
            .forEach( tr => {
                this.addDragger(tr)
            })
        document.addEventListener("dragover", this.onDragover.bind(this))
    }

    disconnectedCallback() {
        console.log('disconnectedCallback')
    }

    addDragger(node) {
        const draggerButton = node.querySelector('button[name="dragger"]')
        
        draggerButton.addEventListener('mousedown', () => {
            node.draggable = true
        })
        draggerButton.addEventListener('mouseup', () => {
            node.removeAttribute('draggable')
        })

        node.addEventListener("dragstart", (event) => {
            // this.draggedEl = node.cloneNode(true)
            // this.addDragger(this.draggedEl)
            this.draggedEl = document.importNode(node, true)

            this.addDragger(this.draggedEl)
            this.originEl = node
            setTimeout( () => {
                this.originEl.dataset.origin = true
            }, 1)
        })
        node.addEventListener("dragend", () => {
            if (!this.targetedEl) return

            this.tbody.dataset.drop = true
            const draggedIndex = this.draggedEl.dataset.index
            const pos = this.targetedEl.dataset.pos || 'top'
            window.requestAnimationFrame( () => {
                if (pos === 'bottom') {
                    this.targetedEl.after(this.draggedEl)
                } else {
                    this.targetedEl.before(this.draggedEl)
                }
                // exchangeItem(pos, this.targetedEl.dataset.index, draggedIndex)

                delete this.targetedEl.dataset.pos
                this.originEl.remove()
                this.draggedEl.removeAttribute('draggable')

                this.renderIndex()

                setTimeout( () => {
                    delete this.tbody.dataset.drop
                }, 100)
            })
        })
        node.addEventListener("dragenter", (event) => {
            window.requestAnimationFrame( () => {
                if(this.isMove(this.originEl, event)) {
                    // css 간편화를 위해 끝으로, 중간에 originEl이 있으면 css가 복잡
                    this.tbody.appendChild(this.originEl)
                    console.log('dragenter', 'isMove true')
                } 

                if( node === this.originEl || node === this.targetedEl ) {
                    return
                }
        
                // 이전 targetedEl의 data 속성 제거
                if ( this.targetedEl ) {
                    delete this.targetedEl.dataset.pos
                }
                this.targetedEl = node
            })
            
        })

    }

    onDragover(event) {
        event.preventDefault()
            
        if (!this.targetedEl) {
            this.originEl.removeAttribute('draggable')
            delete this.originEl.dataset.origin
            return
        }

        window.requestAnimationFrame( () => {
            let el = this.targetedEl
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
        if(val < 0) val = -val
        if (val > el.offsetHeight/4) {
            return true
        }
        return false
    }

}