import barChart from './barChart.js'
import lineChart from './lineChart.js'

barChart()
lineChart()

window.addEventListener('resize', () => {
    barChart()
    lineChart()
})