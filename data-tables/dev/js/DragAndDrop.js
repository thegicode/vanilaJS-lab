
const dragAndDrop = (tbodyEl) => {

    let originEl, draggedEl, targetedEl

    const addEvents = (node, addItemEvents) => {
        const draggerButton = node.querySelector('button[name="dragger"]')
        
        draggerButton.addEventListener('mousedown', () => {
            node.draggable = true
        })
        draggerButton.addEventListener('mouseup', () => {
            node.removeAttribute('draggable')
        })
    
        node.addEventListener("dragstart", (event) => {
            draggedEl = node.cloneNode(true)
            addItemEvents(draggedEl)
            originEl = node
            setTimeout( () => {
                originEl.dataset.origin = true
            }, 1)
        })
    
        node.addEventListener("dragenter", () => {
            // css 간편화를 위해, 중간에 originEl이 있으면 css가 복잡
            tbodyEl.appendChild(originEl)
    
            if( node === originEl || node === targetedEl ) {
                return
            }
    
            // 이전 targetedEl의 data 속성 제거
            if ( targetedEl ) {
                delete targetedEl.dataset.pos
            }
            targetedEl = node
            console.log('dragenter targetedEl: ', targetedEl)
        })
    }

    const addDomEvents = (renderIndex, exchangeItem) => {

        document.addEventListener("dragover", event => {
            event.preventDefault()
            
            if (!targetedEl) {
                originEl.removeAttribute('draggable')
                delete originEl.dataset.origin
                return
            }

            let el = targetedEl
            // if( el === originEl ) {
            //     return
            // }

            const mouseY = event.clientY
            const elHalfVal = el.offsetTop + el.offsetHeight/2
            if( mouseY > elHalfVal) { 
                // 마우스 위치가 el의 절반 위치보다 크면
                el.dataset.pos = 'bottom'
            } else { 
                // 마우스 위치가 el의 절반 위치보다 작으면
                el.dataset.pos = 'top'
            }
        })

        document.addEventListener("drop", event => {
            event.preventDefault()
            if (!targetedEl) {
                console.log('!targetedEl')
                return
            }

            let el = targetedEl
            
            tbodyEl.dataset.drop = true
            const draggedIndex = draggedEl.dataset.index
            const pos = el.dataset.pos || 'top'
            if (pos === 'bottom') {
                el.after(draggedEl)
            } else {
                el.before(draggedEl)
            }
            exchangeItem(pos, el.dataset.index, draggedIndex)

            delete el.dataset.pos
            originEl.remove()
            draggedEl.removeAttribute('draggable')

            renderIndex()

            setTimeout( () => {
                delete tbodyEl.dataset.drop
            }, 100)

        })

    }

    return {
        addEvents,
        addDomEvents
    }
    
}

export default dragAndDrop