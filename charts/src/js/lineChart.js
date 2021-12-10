
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

const onMouseEnter = (event, chartEl, infoEl, arrowEl) => {
    const el = event.target

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

const onMouseOut = (infoEl) => {
    infoEl.ariaHidden = true
}


export default () => {
    
    const template = document.querySelector('[data-template="lineChart-spot"]')

    const 
        cpnt = document.querySelector('.app-lineChart'),
        chartEl = cpnt.querySelector('.chart'),
        graphsEl = cpnt.querySelector('.graphs'),
        polylineEl = cpnt.querySelector('polyline'),
        spotsEl = cpnt.querySelector('.spots'),
        infoEl = cpnt.querySelector('.chart-info'),
        arrowEl = cpnt.querySelector('.__arrow')
    
        const DATA = _getData()
        const  graphsHeight = graphsEl.offsetHeight,
            xUnit = graphsEl.offsetWidth / DATA.length,
            yUnit = graphsHeight / 4

        const fragment = new DocumentFragment()

        const pointsArr = DATA.map((point, index) => {
            let x = (xUnit * index + xUnit / 2).toFixed(1),
                y = (graphsHeight - yUnit * point).toFixed(1)
            
            const el = template
                    .content
                    .firstElementChild
                    .cloneNode(true)
            el.style.cssText = `
                top: ${y}px;
                left: ${x}px;
            `
            el.addEventListener('mouseenter', (event) => {
                onMouseEnter(event, chartEl, infoEl, arrowEl)
            })
            el.addEventListener('mouseout', () => {
                onMouseOut(infoEl)
            })
            fragment.appendChild(el)

            return `${x} ${y}`
        });

        spotsEl.innerHTML = ''
        spotsEl.appendChild(fragment)
        polylineEl.setAttribute('points', pointsArr.join(" "))
}
