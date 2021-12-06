
// Helper function
const logEl = document.querySelector('.log')
const getRandomIntInclusive = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min 
}
const clonedNode = (node) => {
    return node.content.firstElementChild.cloneNode(true)
}

//  임시 데이터 만들기
const getData = () => {
    // 임의 데이터의 갯수 1이상 20이하 
    const len = getRandomIntInclusive(1, 20)
    logEl.querySelector('.length').textContent = `DATA Length : ${len}`
    const arr = []
    for(let i=0 ; i < len ; i++) {
        let point = Math.round(Math.random() * 100)
        if ( i > 5 && i === Math.round(len/2)) {
            point = null
            logEl.querySelector('.null').textContent = `null index: ${Math.round(len/2)}`
        }
        const isPrev = i < len/3 ? true : false
        arr.push({
            point,
            isPrev
        })
    }
    return arr
}


const DATA = getData()
console.log(DATA)

const rootEl = document.querySelector('.root'),
    graphsEl = rootEl.querySelector('.graphs')
    svgEl = rootEl.querySelector('svg'),
    polylineEls = rootEl.querySelectorAll('polyline'),
    pointsEl = rootEl.querySelector('.points'),
    xTextsEl = rootEl.querySelector('.xTexts'),
    templateEl = rootEl.querySelector('#tp-info')


const svgVal = svgEl.viewBox.baseVal
const { width, height } = svgVal    // SVG 사이즈
const xLen = DATA.length,           // x 개수는 데이터 개수
    yLen = 5,                       // y 개수는 지정
    xUnit = width / xLen            // x 단위 너비
const pointsPrev = [],              // 이전달 그래프 위치값 넣을 배열
    pointsCurrent = []              // 현재달 그래프 위치값 넣을 배열
let is                              // isPrev 바뀐 시점 확인용

// 그래프 그리기
DATA.forEach( (data, index) => {
    const { point, isPrev } = data

    // polyline에 지정할 값을 위한 array
    let arr = pointsCurrent

    // 이전달
    if (isPrev === true) { 
        arr = pointsPrev
    }

    // 데이터가 없는 경우
    if (point === null) {
        arr.push('')
        is = isPrev
        return
    }


    const x = Math.round(xUnit * index + xUnit/2),  // 위치가 가운데 오게 하기 위해 단위 절반 사이즈 더함
        y = height - point/100 * height             // polyline 위치 0 기준은 상단

    // 접근성을 위한 데이터 정보 표시
    const node = clonedNode(templateEl)
    if (isPrev) {
        node.dataset.prev = true
    }
    node.querySelector('.__date').textContent = index
    node.querySelector('.__value').textContent = point

    // 동그라미 아이콘 위치 값
    node.style.top = `${y}px`
    node.style.left = `${x}px`

    pointsEl.appendChild(node)
    
    // isPrev가 바뀐 시점 prev 그래프에 추가로 그려서 다음 그래프와  연결
    if( is !== isPrev ) {
        pointsPrev.push(`${x} ${y}`)
    }
    
    arr.push(`${x} ${y}`)
    is = isPrev
})
polylineEls[0].setAttribute('points', pointsPrev.join(' '))
polylineEls[1].setAttribute('points', pointsCurrent.join(' '))

// X좌표 범례 : 값과 너비
xTextsEl.dataset.length = xLen
for (let i = 0 ; i < xLen ; i++) {
    const node = document.createElement('span')
    node.textContent = i
    xTextsEl.appendChild(node)
}
