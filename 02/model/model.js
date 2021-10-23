import vegesModifier from './veges.js'

const cloneDeep = x => {
	return JSON.parse(JSON.stringify(x))
}

const INITIAL_STATE = {
	veges: ['깻잎', '상추', '케일'],
	others: false
}

export default (initalState = INITIAL_STATE) => {
	return (prevState, event) => {
		if (!event) {
			return cloneDeep(initalState)
		}

		const {
			veges,
			others
		} = prevState

		const newVeges = vegesModifier(veges, event)
		// const newOthers = filterModifers(newOthers, event)

		// if (newVeges === veges && newOthers === newOthers) {
		if (newVeges === veges) {
			return prevState
		}

		return {
			veges: newVeges,
			others: false
		}
	}
}
