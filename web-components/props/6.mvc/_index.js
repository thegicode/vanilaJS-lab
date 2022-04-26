//CONTROLLER
class PersonController extends HTMLElement {
    connectedCallback() {             
        let controller = this 
        let elem = this

        //MODEL
        function PersonModel () {
            //Model API
            this.load = async id => {
                let res = await fetch( `https://reqres.in/api/users/${id}` )
                let json = await res.json()
                Object.assign( this, json.data )
                controller.updateView()
            }
        }                

        let model = new PersonModel

        //VIEW
        function PersonView () {
            elem.innerHTML = `
                Id : <input id=index type=number>
                <div id=card>Loading data
                </div>` 

            let card = elem.querySelector( 'div#card' )
            let index = elem.querySelector( 'input#index' )

            index.onchange = () => controller.init( index.value)               
            
            //View API
            this.update = () => {
                card.innerHTML = `
                    <div>Name : ${model.first_name} ${model.last_name}</div>
                    <div><img src=${model.avatar}></div>`
                index.value = model.id    
            }              
        }

        let view = new PersonView

        //Controller API
        this.init = id => model.load( id )               
        this.updateView = () => view.update() 

        //Init with some data 
        this.init( 4 )
    }
}

customElements.define( 'person-card', PersonController )