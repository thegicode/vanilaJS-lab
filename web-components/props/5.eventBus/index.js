
import modelModules from './model/model.js'
import eventBusModuels from './model/eventBus.js'
import actions from './control/actions.js'

import Main from './view/Main.js'
import Other from './view/Other.js'
import Other2 from './view/Other2.js'

customElements.define('main-app', Main)
customElements.define('other-app', Other)
customElements.define('other2-app', Other2)

const model = modelModules()
const eventBus = eventBusModuels(model)

actions(model, eventBus)


   


    