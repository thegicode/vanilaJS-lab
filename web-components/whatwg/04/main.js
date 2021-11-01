class PlasticButton extends HTMLButtonElement {
    constructor() {
        super()

        this.addEventListener('click', (e) => {
            console.log('click', e.target)
        })
    }
}

customElements.define('plastic-button', PlasticButton, {extends: 'button'})


const plasticButton = document.createElement("button", { is: "plastic-button" });
plasticButton.textContent = "button2 [append]";
document.body.appendChild(plasticButton)
// is attribute will not be present in the DOM,
console.assert(!plasticButton.hasAttribute('is'))
console.log(plasticButton.outerHTML) // <button is="plastic-button">button2 [append]</button>

const plasticButton2 = new PlasticButton()
console.log(plasticButton2.localName)
console.log(plasticButton2 instanceof PlasticButton)
console.log(plasticButton2 instanceof HTMLButtonElement)
