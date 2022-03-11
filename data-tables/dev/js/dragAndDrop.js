

const isMove = (el, event) => {
    let spaceVal = el.offsetTop - event.clientY
    if(spaceVal < 0) spaceVal = -spaceVal
    if (spaceVal > el.offsetHeight/4) {
        return true
    }
    return false
}



const dragAndDrop = (rootEl, events, render) => {
    const tbodyEl = rootEl.querySelector('tbody')

    let originEl, draggedEl, targetedEl

    const addEvents = (node, addItemEvents) => {
        const { exchangeItem } = events
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
        node.addEventListener("dragend", () => {
            if (!targetedEl) return

            tbodyEl.dataset.drop = true
            const draggedIndex = draggedEl.dataset.index
            const pos = targetedEl.dataset.pos || 'top'
            window.requestAnimationFrame( () => {
                if (pos === 'bottom') {
                    targetedEl.after(draggedEl)
                } else {
                    targetedEl.before(draggedEl)
                }
                exchangeItem(pos, targetedEl.dataset.index, draggedIndex)

                delete targetedEl.dataset.pos
                originEl.remove()
                draggedEl.removeAttribute('draggable')

                render.index()

                setTimeout( () => {
                    delete tbodyEl.dataset.drop
                }, 100)
            })
        })
    
        node.addEventListener("dragenter", (event) => {
            window.requestAnimationFrame( () => {
                if(isMove(originEl, event)) {
                    // css 간편화를 위해, 중간에 originEl이 있으면 css가 복잡
                    tbodyEl.appendChild(originEl)
                } 

                if( node === originEl || node === targetedEl ) {
                    return
                }
        
                // 이전 targetedEl의 data 속성 제거
                if ( targetedEl ) {
                    delete targetedEl.dataset.pos
                }
                targetedEl = node

            })
            
        })
    }

    const addDomEvents = () => {
        document.addEventListener("dragover", event => {
            event.preventDefault()
            
            if (!targetedEl) {
                originEl.removeAttribute('draggable')
                delete originEl.dataset.origin
                return
            }

            window.requestAnimationFrame( () => {
                let el = targetedEl
                const mouseY = event.clientY
                const elHalfVal = el.offsetTop + el.offsetHeight/2

                let spaceVal = el.offsetTop - mouseY
                if(spaceVal < 0) spaceVal = -spaceVal

                if(mouseY > elHalfVal) { 
                    // 마우스 위치가 el의 절반 위치보다 크면
                    el.dataset.pos = 'bottom'
                } else if(spaceVal > el.offsetHeight/4) { 
                    el.dataset.pos = 'top'
                } 
            })
            
        })
    }


    return {
        addEvents,
        addDomEvents
    }
    
}

export default dragAndDrop
