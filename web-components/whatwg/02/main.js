class MyCheckbox extends HTMLElement {
    static formAssociated = true
    static observedAttributes = ['checked']

    constructor() {
        super()
        this._internals = this.attachInternals()
        // attachInternals : ! [safari]

        console.log('_internals', this._internals)
        this.addEventListener('click', this._onClick.bind(this))
    }

    get form() { return this._internals.form }
    get name() { return this.getAttribute('name') }
    get type() { return this.localName }

    get checked() { return this.hasAttribute('checked') }
    set checked(flag) { this.toggleAttribute('checked', Boolean(flag)) }

    attributeChangedCallback(name, oldValue, newValue) {
        this._internals.setFormValue(this.checked ? 'on' : null )
        // setFormValue : ! [firfox, ie, safari]

        console.log('this.checked', this.checked)
        console.log('this.form', this.form)
        console.log('this.name', this.name)
        console.log('this.type', this.type)
    }

    _onClick(event) {
        this.checked = !this.checked
        
    }
}

customElements.define('my-checkbox', MyCheckbox)

