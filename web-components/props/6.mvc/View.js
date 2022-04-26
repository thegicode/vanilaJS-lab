export default class View {

	constructor(controller, model) {
		this.controller = controller
		this.model = model
		this.personInput = this.controller.querySelector('person-input')
		this.personCard = this.controller.querySelector('person-card')
		this.render()
	}

	render() {
		this.personInput.controller = this.controller
	}

	update() {
		const { model, personInput, personCard } = this
		personInput.value = model.id  
		personCard.data = model 
	}
}
                        
