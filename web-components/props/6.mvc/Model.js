

export default class Model {
	constructor(controller) {
		this.controller = controller
	}

	async load(id) {
		let res = await fetch( `https://reqres.in/api/users/${id}` )
        let json = await res.json()
        Object.assign( this, json.data )
        this.controller.updateView()
	}

}


