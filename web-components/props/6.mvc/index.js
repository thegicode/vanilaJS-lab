
import AppModel from './Model.js'
import AppView from './View.js'


//CONTROLLER
class Controller extends HTMLElement {
    connectedCallback() {             
        let controller = this 
        let model = new AppModel(controller)
        let view = new AppView(controller, model)

        //Controller API
        this.init = id => model.load( id )               
        this.updateView = () => view.update() 

        //Init with some data 
        this.init( 4 )
    }
}

customElements.define('app-mvc', Controller)