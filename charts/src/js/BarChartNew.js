export default class BarChartNew extends HTMLElement {
	set data(value) {
		this.render(value)

	}

	constructor() {
		super()
	}

	connectedCallback() {

	}

	render(data) {
		const chartCellTp = document.querySelector('#tp-chart-cell')
        const chartDateTp = document.querySelector('#tp-chart-date')

	    const chartFragment = new DocumentFragment()
	    const dateFragment = new DocumentFragment()

	    const dateIdxs = [2, 9, 16, 23, data.length-1]

	    const amounts = data.map( ({amount}, index) => {
	        // if (amount) {
	        //     this.chartLastIndex = index
	        // }
	        return amount 
	    })
	    const maxAmount = Math.max(...amounts)
	    const fullAmount = maxAmount / 80

	    const thisDate = new Date()
	    const thisYear = thisDate.getFullYear()
	    const thisMonth = thisDate.getMonth() + 1
	    const thisYearMonth = `${thisYear}-${thisMonth.toString().padStart(2, '0')}`

	    data.forEach( ({amount, date}, index) => {
	        const cellNode = chartCellTp.content.firstElementChild.cloneNode(true)
	        const dateNode = chartDateTp.content.firstElementChild.cloneNode(true)
	        const barNode = cellNode.querySelector('.__bar')
	        barNode.style.height = `${amount/fullAmount}%`

	        if (dateIdxs.includes(index)) {
                dateNode.textContent = date.slice(5).replace('-', '.')
            }

	        barNode.addEventListener('click', () => {
	            this.showInfo(barNode, cellNode, date, amount)
	        })

	        chartFragment.appendChild(cellNode)
	        dateFragment.appendChild(dateNode)

	    })
	    this.querySelector('.chart-graphs').appendChild(chartFragment)
	    this.querySelector('.chart-dates').appendChild(dateFragment)
	    
	    this.hidden = false
	}

	showInfo(barNode, cellNode, date, amount) {
		const chartEl = this.querySelector('.chart-container')
        const infoEl = this.querySelector('.chart-info')
        const{ offsetTop, offsetLeft, offsetWidth } = barNode

        const topValue = offsetTop - 15

        const cellNodeLeftRate = cellNode.offsetLeft / chartEl.offsetWidth
        let direction = 'center'
        if (cellNodeLeftRate < 0.3) {
            direction = 'left'
        }
        if (cellNodeLeftRate > 0.7) {
            direction = 'right'
        }
        
        infoEl.querySelector('.__date').textContent = date
        infoEl.querySelector('.__price').textContent = `${Number(amount).toLocaleString()}원`

        infoEl.hidden = false
        infoEl.dataset.direction = direction

        switch(direction) {
            case 'left':
                const left = offsetLeft + offsetWidth/2
                infoEl.style.cssText = `
                    right: initial;
                    left: ${left}px`
                break;
            case 'right':
                const right = chartEl.offsetWidth - offsetLeft - offsetWidth/2
                infoEl.style.cssText = `
                    left: initial;
                    right: ${right}px`
                break;
            case 'center':
                const center = offsetLeft + (offsetWidth - infoEl.offsetWidth)/2
                infoEl.style.cssText = `
                    right: initial;
                    left: ${center}px`
                break;
        }
        infoEl.style.top = `${topValue}px`
	}
}