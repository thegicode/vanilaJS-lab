

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





/*
export default (controller) => {
	let state

	// Model API
    const load = async id => {
        let res = await fetch( `https://reqres.in/api/users/${id}` )
        let json = await res.json()
        // Object.assign( this, json.data )
        state = json.data
        controller.updateView()
    }

    const getState = () => {
    	return state
    }

    return {
    	load,
    	getState
    }
}
*/

/*export default function Model(controller) {

	// Model API
    this.load = async id => {
        let res = await fetch( `https://reqres.in/api/users/${id}` )
        let json = await res.json()
        Object.assign( this, json.data )
        controller.updateView()
    }
}*/


