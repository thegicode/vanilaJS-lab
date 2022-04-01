
const __cloneDeep = x => {
    return JSON.parse(JSON.stringify(x))
}
  
const __freeze = x => Object.freeze(__cloneDeep(x))


// INITIAL_DATA가 화면에 그려져 있지 않음, Drag and drop 으로 change data 확인하는 용도
const INITIAL_DATA = [ 
    {
        amount: 0
    },
    {
        amount: 1
    },
    {
        amount: 2
    },
    {
        amount: 3
    },
    {
        amount: 4
    }
]

export default () => {
    let state = __cloneDeep(INITIAL_DATA)

    /** 
     * Drag and Drop 이벤트 데이터 업데이트
     * @param {string} type          드랍되는 위치, 타겟 엘리먼트의 상단이냐 하단이냐, (top, bottom)
     * @param {string} draggedIdx    드레그된 엘리먼트 index
     * @param {string} targetIdx     드랍 대상이 되는 엘리먼트 index
     */
    const exchangeItem = (type, draggedIdx, targetIdx) => {

        // console.log(type, targetIdx, draggedIdx)

        let arr, item

        const targetIndex = Number(targetIdx)
        const draggedIndex = Number(draggedIdx)

        const _splice1 = index => {
            arr = state.splice(0, index)
            item = arr.splice(draggedIndex, 1)
        }
        const _splice2 = index => {
            item = state.splice(draggedIndex, 1)
            arr = state.splice(0, index)
        }

        switch(type) {
            case 'top':
                if (targetIndex > draggedIndex) {
                    _splice1(targetIndex)
                } else {
                    _splice2(targetIndex)
                }
                break
            case 'bottom':
                if (targetIndex > draggedIndex) {
                    _splice1(targetIndex + 1)
                } else {
                    _splice2(targetIndex + 1)
                }
                break
            default :
                console.log('exchangeItem')
        }
        state = [...arr, ...item, ...state]
        console.log('exchange: ', Array.from(state, item => item.amount))
    }
    return {
        exchangeItem
    }
}