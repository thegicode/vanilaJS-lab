
const amount = () => {

    const template = document.querySelector('[data-template="amount-cell"')

    const
        cpnt = document.querySelector('.orderAmount-amount'),
        chartEl = cpnt.querySelector('.chart'),
        graphsEl = cpnt.querySelector('.graphs'),
        datesEl = cpnt.querySelector('.chart-dates'),
        infoEl = cpnt.querySelector('.chart-info'),
        arrowEl = cpnt.querySelector('.__arrow')

    const onMouseOver = e => {
        const barEl = e.target,
            cellEl = barEl.parentElement
    
        const cellElLeftPercent = Math.round(cellEl.offsetLeft / chartEl.offsetWidth * 100)
    
        infoEl.ariaHidden = false
    
        let direction = 'center'
        if (cellElLeftPercent < 25) {
            direction = 'left'
        }
        if (cellElLeftPercent > 75) {
            direction = 'right'
        }
        infoEl.dataset.direction = direction

        const bottom = datesEl.offsetHeight  // 범례 height
            + arrowEl.offsetHeight // infoEl 화살표 height
            + barEl.offsetHeight // 막대 그래프  height
            + 5 // 여백

        const left = cellEl.offsetLeft - arrowEl.offsetLeft + 5

        infoEl.style.cssText = `
            bottom: ${bottom}px;
            left: ${left}px;
        `
    }
    
    const onMouseOut = e => {
        infoEl.ariaHidden = true
    }

    const setGraphs = () => {
        for (let index = 0 ; index < 30 ; index++) {
            const el = template
                .content
                .firstElementChild
                .cloneNode(true)
            const barEl = el.querySelector('.__bar')
            const percent = Math.round(Math.random() * 100)
            if ( index < 5 ) {
                el.dataset.prev = true
            }
            barEl.style.height = `${percent}%`
            barEl.addEventListener('mouseover', onMouseOver)
            barEl.addEventListener('mouseout', onMouseOut)
            graphsEl.appendChild(el)
        }
    }
    setGraphs()
}

export default amount
