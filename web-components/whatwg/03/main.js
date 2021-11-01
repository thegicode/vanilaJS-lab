class MyCheckbox extends HTMLElement {
    static formAssociated = true
    static observedAttributes = ['checked']

    constructor() {
        super()
        this._internals = this.attachInternals()
        // attachInternals : ! [safari]

        // console.log('_internals', this._internals)
        this.addEventListener('click', this._onClick.bind(this))

        this._internals.role = 'checkbox'
        this._internals.ariaChecked = false
    }

    get form() { return this._internals.form }
    get name() { return this.getAttribute('name') }
    get type() { return this.localName }

    get checked() { return this.hasAttribute('checked') }
    set checked(flag) { this.toggleAttribute('checked', Boolean(flag)) }

    attributeChangedCallback(name, oldValue, newValue) {
        this._internals.setFormValue(this.checked ? 'on' : null )
        // setFormValue : ! [firfox, ie, safari]
        this._internals.ariaChecked = this.checked

        console.log('this.checked', this.checked)
        console.log('this._internals.ariaChecked', this._internals.ariaChecked)
    }

    _onClick(event) {
        this.checked = !this.checked
        
    }
}

customElements.define('my-checkbox', MyCheckbox)


// Custom element authors are encouraged to state 
// what aspects of their accessibility semantics are strong native semantics, i.e., 
// should not be overridden by users of the custom element. 
// In our example, the author of the my-checkbox element would state that 
// its role and aria-checked values are strong native semantics, thus discouraging code such as the above.