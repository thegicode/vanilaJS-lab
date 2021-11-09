import amount from './js/amount.js'
import unit from './js/unit.js'

const app = document.querySelector('.orderAmount')
    
amount()

const handleTabs = {
    navEl : app.querySelector(`.orderAmount-nav`),
    oldIndex: 0,
    showPanel: function(el, index) {

        this.hidePanel(this.oldIndex)

        const buttonEl = this.navEl.querySelector(`[data-index="${index}"]`)
        const panelEl = app.querySelector(`[data-panel="${index}"]`)

        buttonEl.ariaPressed = true
        panelEl.ariaHidden = false

        unit()

        this.oldIndex = index
    },
    hidePanel: function(el, index) {
        const oldButtonEl = this.navEl.querySelector(`[data-index="${this.oldIndex}"]`)
        const oldPanelEl = app.querySelector(`[data-panel="${this.oldIndex}"]`)

        oldButtonEl.ariaPressed = false
        oldPanelEl.ariaHidden = true
    }
}

handleTabs.navEl
    .querySelectorAll('button')
    .forEach( (el, index) => {
        el.addEventListener('click', function() {
            handleTabs.showPanel(this, this.dataset.index)
        })
    })
