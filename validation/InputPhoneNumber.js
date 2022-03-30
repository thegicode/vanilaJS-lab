
export default class InputPhoneNumber extends HTMLElement {

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
        this.input.value = this.format(this.input.value);
        this.valid = this.validate(this.input.value);
    }

    format(value) {
        const numberStr = value.replace(/\D/g,''); 
        let result = numberStr;  
        if (numberStr.length >= 10) {
            result = numberStr.replace(/(^02|^0[0-9]{2})([0-9]+)?([0-9]{4})$/, `$1-$2-$3`);
        } 
        return result;
        // value.replace(/[^0-9]/g, "").replace(/(^02|^0505|^1[0-9]{3}|^0[0-9]{2})([0-9]+)?([0-9]{4})$/,"$1-$2-$3").replace("--", "-") );
    }

    validate(value) {
        if ( value.length === 0 ) {
            return false; 
        }
        return new RegExp(/(^02|^0[0-9]{2})-\d{3,4}-\d{4}/).test(value);
    }

    disconnectedCallback() {
        this.input.removeEventListener('input', this.onInput)
    }
}






