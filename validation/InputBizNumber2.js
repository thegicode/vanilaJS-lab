
export default class InputBizNumber2 extends HTMLElement {

    constructor() {
        super()
        this.value = ''
        this.input = this.querySelector('input')
    }

    set valid(v) {
        this.dataset.valid = v
    }

    connectedCallback() {
        this.input.addEventListener('input', this.onInput.bind(this))
    }

    onInput() {
        this.valid = false
        let numberStr = this.input.value.replace(/\D/g,'')
        this.getForamt(numberStr)
        console.log(this.input.value)

        // if (numberStr.length >= 10) {
        //     const isValid = this.validateBizNumber(numberStr)
        //     this.dataset.valid = isValid
        //     console.log('isValid', isValid)
        //     return
        // } 
        // this.input.value = numberStr
    }

    getForamt(numberStr) {
        let result = numberStr
        if (numberStr.length === 3 || numberStr.length === 5) {
            result = numberStr + '-'
            this.value = result
            this.input.value = result
        }
        // const _index = value.length - 5; 
        // const result = [
        //     value.slice(0, 3), 
        //     value.slice(3, _index), 
        //     value.slice(_index)
        // ].join('-');
        return result
    }

    validateBizNumber(value) {
        const bizNumbers = [...value].map( n => parseInt(n, 10) )
        const keys = [1, 3, 7, 1, 3, 7, 1, 3, 5];
        let sum = 0
        // 0 ~ 8 까지 9개의 숫자를 체크키와 곱하여 합에 더합니다.
        for (let i = 0 ; i < 9 ; i++) { 
            // console.log(keys[i], bizNumbers[i])
            sum += keys[i] * bizNumbers[i];
        }
        // 각 8번배열의 값을 곱한 후 10으로 나누고 내림하여 기존 합에 더합니다.
        // sum += parseInt((keys[8] * bizNumbers[8]) / 10, 10);
        sum += Math.floor((keys[8] * bizNumbers[8]) / 10);

        // 다시 10의 나머지를 구한후 그 값을 10에서 빼면 이것이 검증번호 이며 기존 검증번호와 비교하면됩니다.
        return Math.floor(bizNumbers[9]) === ((10 - (sum % 10)) % 10);
    }

    disconnectedCallback() {
        this.input.removeEventListener('input', this.onInput)
    }
}






