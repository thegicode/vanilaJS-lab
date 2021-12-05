
// 임시 데이터
const DATA = [50, 20, 60, 40, 80, 70, 90]

const rootEl = document.querySelector('.root'),
    svgEl = rootEl.querySelector('svg'),
    polylineEl = rootEl.querySelector('polyline'),
    pointsEl = rootEl.querySelectorAll('.points span')

const svgVal = svgEl.viewBox.baseVal
const { width, height } = svgVal
const xLen = DATA.length, 
    yLen = 5,
    xUnit = width / xLen,
    yUnit = height / yLen

const pointsArr = DATA.map( (point, index) => {
    const x = Math.round(xUnit * index + xUnit/2),
        y = height - point/100 * height
    const pointEl = pointsEl[index]
    pointEl.style.top = `${y}px`
    pointEl.style.left = `${x}px`
    return `${x} ${y}`
})

polylineEl.setAttribute('points', pointsArr.join(' '))


document.querySelector('.log span')
    .textContent = DATA.join(' ')