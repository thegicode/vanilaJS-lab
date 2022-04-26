
export default class View {

	constructor(controller, model) {
		this.controller = controller
		this.model = model
		this.render()
	}

	render() {
		const input = this.controller.querySelector('input')
        input.addEventListener('change', () => {
			this.controller.init(input.value) 
		})
	}

	update() {
		const { model, controller } = this
		let card = controller.querySelector( 'div#card' )
        let input = controller.querySelector( 'input' )
		card.innerHTML = `
			<p>Name : ${model.first_name} ${model.last_name}</p>
			<div class="thumb"><img src=${model.avatar}></div>`
		input.value = model.id   
	}
}
                        
