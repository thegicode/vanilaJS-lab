
import BarChartNew from './BarChartNew.js'
customElements.define('app-barchart', BarChartNew)

const _getData = () => {
    const data = []

    for (let index = 0 ; index < 30 ; index++) {
        let date = new Date() 
        date.setDate( date.getDate() - 30 + index ) 
        date = date.toLocaleDateString().slice(0, -1) // last . 삭제

        const amount = Math.round(Math.random() * 50000)

        data.push({
            date,
            amount
        })
    }
    return data
}

document.querySelector('app-barchart').data = _getData()


