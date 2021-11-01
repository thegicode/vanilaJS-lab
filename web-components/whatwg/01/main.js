class FlagIcon extends HTMLElement {
    constructor() {
        super()
        this._countryCode = null
    }

    static observedAttributes = ["country"]

    // static get observedAttributes () {
    //     return ['color']
    //   }
    //  --- get이 아니다.

    attributeChangedCallback(name, oldValue, newValue) {
        this._countryCodde = newValue
        this._updateRendering()
    }
    connectedCallback() {
        this._updateRendering()
    }

    get country() {
        return this._countryCode
    }

    set country(v) {
        this.setAttribute("country", v)
    }

    _updateRendering() {
        // Left as an exercise for the reader. But, you'll probably want to
        // check this.ownerDocument.defaultView to see if we've been
        // inserted into a document with a browsing context, and avoid
        // doing any work if not.  
        // --- 무슨 의미일까?

        console.log('Update rendering')
    }
}

customElements.define("flag-icon", FlagIcon)


// const flagIcon = document.createElement("flag-icon")
const flagIcon = new FlagIcon() // 위의 코드와 동일
flagIcon.country = 'vietnam'
document.body.appendChild(flagIcon)

