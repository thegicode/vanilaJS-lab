
export default class InputBizNumber extends HTMLElement {

    constructor() {
        super()
        this.input = this.querySelector('input')
    }

    set valid(v) {
        this.dataset.valid = v
        console.log('isValid', v)
    }

    connectedCallback() {
        this.input.addEventListener('input', this.onInput.bind(this))
    }

    onInput() {
        let numberStr = this.input.value.replace(/\D/g,'')
        if (numberStr.length >= 10) {
            this.input.value = this.getForamt(numberStr)
            this.valid = this.validateBizNumber(numberStr)
        } else {
            this.input.value = numberStr
            this.valid = false
        }
    }

    getForamt(value) {
        return value.replace(/^(\d{3})(\d{2})(\d{5})$/, `$1-$2-$3`);
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






