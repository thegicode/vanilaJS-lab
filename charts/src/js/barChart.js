
const _getData = () => {
    const data = []
    for (let index = 0 ; index < 30 ; index++) {
        let date = new Date() 
        date.setDate(
            date.getDate() 
            - 29 // 29일전
            + index // index 일 후
        ) 

        let isPrevMoth = false
        if (date.getMonth() === new Date().getMonth() - 1 ) {
            isPrevMoth = true
        }
        
        date = date.toLocaleDateString().slice(0, -1) // last . 삭제

        let price = Math.round(Math.random() * 50000)
        const percent = (price/50000 * 100).toFixed(1)
        price = price.toLocaleString()

        const quantity = Math.round(Math.random() * 100)

        data.push({
            date,
            isPrevMoth,
            price,
            percent : Number(percent),
            quantity
        })
    }
    return data
}

const barChart = () => {

    const template = document.querySelector('[data-template="barChart-cell"')

    const
        cpnt = document.querySelector('.app-barChart'),
        chartEl = cpnt.querySelector('.chart'),
        graphsEl = cpnt.querySelector('.graphs'),
        datesEl = cpnt.querySelector('.chart-dates'),
        infoEl = cpnt.querySelector('.chart-info'),
        arrowEl = cpnt.querySelector('.__arrow')

    const onClick = e => {
        const barEl = e.target,
            cellEl = barEl.parentElement
    
        infoEl.querySelector('.infos')
            .replaceWith(cellEl.querySelector('.infos').cloneNode(true))
        
        infoEl.ariaHidden = false
        const cellElLeftRate = cellEl.offsetLeft / chartEl.offsetWidth
        let direction = 'center'
        if (cellElLeftRate < 0.25) {
            direction = 'left'
        }
        if (cellElLeftRate > 0.75) {
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
        const DATAS = _getData()
        DATAS.forEach( data => {
            const { date, isPrevMoth, price, percent, quantity } = data
            const el = template
                .content
                .firstElementChild
                .cloneNode(true)
            const barEl = el.querySelector('.__bar')
            barEl.style.height = `${percent}%`

            if ( isPrevMoth ) {
                el.dataset.prev = true
            }

            const dateEl = el.querySelector('[data-info="date"]')
            const priceEl = el.querySelector('[data-info="price"]')
            const quantityEl = el.querySelector('[data-info="quantity"]')

            dateEl.textContent = date
            priceEl.textContent = `${price}원`
            quantityEl.textContent = quantity

            barEl.addEventListener('click', onClick)
            barEl.addEventListener('mouseout', onMouseOut)

            graphsEl.appendChild(el)
        })
    }
    setGraphs()
}

export default barChart
