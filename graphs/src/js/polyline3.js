
// 임시 데이터
const DATA = [50, null, null, 40, 80, 70, 90]

const rootEl = document.querySelector('.root'),
    svgEl = rootEl.querySelector('svg'),
    polylineEl = rootEl.querySelector('polyline'),
    pointsEl = rootEl.querySelectorAll('.points span')

const svgVal = svgEl.viewBox.baseVal
const { width, height } = svgVal
const xLen = DATA.length, 
    yLen = 5,
    xUnit = width / xLen

const pointsArr = DATA.map( (point, index) => {
    
    const pointEl = pointsEl[index]

    if (point === null) {
        pointEl.style.display = 'none'
        return ''
    }
    
    const x = Math.round(xUnit * index + xUnit/2)
    const y = height - point/100 * height
    pointEl.style.top = `${y}px`
    pointEl.style.left = `${x}px`
    return `${x} ${y}`
})

polylineEl.setAttribute('points', pointsArr.join(' '))

document.querySelector('.log span')
    .textContent = DATA.join(', ')