
const _getRandomArbitrary = (min, max) => {
    return Math.random() * (max - min) + min;
}
const _getData = () => {
    const arr = []
    for (let i = 0 ; i < 30 ; i++){
        const number = (Math.random() * 4).toFixed(1)
        // const number = _getRandomArbitrary(2.5, 3)
        arr.push(Number(number))
    }
    return arr
}

const unit = () => {
    
    const template = document.querySelector('[data-template="circle"]')

    const 
        cpnt = document.querySelector('.orderAmount-unit'),
        chartEl = cpnt.querySelector('.chart'),
        graphsEl = cpnt.querySelector('.graphs'),
        polylineEl = cpnt.querySelector('polyline'),
        circlesEl = cpnt.querySelector('.circles'),
        infoEl = cpnt.querySelector('.chart-info'),
        arrowEl = cpnt.querySelector('.__arrow')

    const onMouseOver = e => {
        const el = e.target
    
        const elLeftPercent = Math.round(el.offsetLeft / chartEl.offsetWidth * 100)

        infoEl.ariaHidden = false
    
        let direction = 'center'
        if (elLeftPercent < 25) {
            direction = 'left'
        }
        if (elLeftPercent > 75) {
            direction = 'right'
        }
        infoEl.dataset.direction = direction

        const bottom = chartEl.offsetHeight 
            - parseFloat(el.style.top)
            + arrowEl.offsetHeight
            + 10

        const left = el.offsetLeft - arrowEl.offsetLeft + 5

        infoEl.style.cssText = `
            left: ${left}px;
            bottom: ${bottom}px;
        `
    }

    const onMouseOut = e => {
        infoEl.ariaHidden = true
    }
    
    const setGraphs = () => {
        const DATA = _getData()
        const graphsWidth = graphsEl.offsetWidth,
            graphsHeight = graphsEl.offsetHeight,
            cellW = graphsWidth / DATA.length,
            cellH = graphsHeight / 4

        circlesEl.innerHTML = ''
        
        const pointsArr = DATA.map((point, index) => {
            let x = (cellW * index + cellW / 2).toFixed(1),
                y = (graphsHeight - cellH * point).toFixed(1)
            
            const el = template
                    .content
                    .firstElementChild
                    .cloneNode(true)
            el.style.cssText = `
                top: ${y}px;
                left: ${x}px;
            `
            el.addEventListener('mouseover', onMouseOver)
            el.addEventListener('mouseout', onMouseOut)
            circlesEl.appendChild(el)

            return `${x} ${y}`
        });

        polylineEl.setAttribute('points', pointsArr.join(" "))
    }

    setGraphs()
    
}

export default unit
