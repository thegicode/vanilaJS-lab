// 임시 데이터
const getRandomIntInclusive = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min 
}
const getData = () => {
    // 임의 데이터의 갯수 5이상 20이하 
    const len = getRandomIntInclusive(5, 20)
    const arr = []
    for(let i=0 ; i < len ; i++) {
        const point = Math.round(Math.random() * 100)
        arr.push(point)
    }
    return arr
}

const DATA = getData()
const rootEl = document.querySelector('.root'),
    graphsEl = rootEl.querySelector('.graphs')
    svgEl = rootEl.querySelector('svg'),
    polylineEl = rootEl.querySelector('polyline'),
    pointsEl = rootEl.querySelector('.points'),
    xTextsEl = rootEl.querySelector('.xTexts')

const svgVal = svgEl.viewBox.baseVal
const { width, height } = svgVal
const xLen = DATA.length, 
    yLen = 5,
    xUnit = width / xLen

const pointsArr = DATA.map( (point, index) => {
    const x = Math.round(xUnit * index + xUnit/2),
        y = height - point/100 * height
    const node = document.createElement('span')
    node.style.top = `${y}px`
    node.style.left = `${x}px`
    pointsEl.appendChild(node)
    return `${x} ${y}`
})
polylineEl.setAttribute('points', pointsArr.join(' '))

// X좌표 범례
xTextsEl.dataset.length = xLen
for (let i = 0 ; i < xLen ; i++) {
    const node = document.createElement('span')
    node.textContent = i
    xTextsEl.appendChild(node)
}

document.querySelector('.log span')
    .textContent = DATA.join(' ')
