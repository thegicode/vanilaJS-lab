import vegesModifier from './veges.js'

const cloneDeep = x => {
	return JSON.parse(JSON.stringify(x))
}

console.log('INITIAL_STATE')
const INITIAL_STATE = {
	veges: ['깻잎', '상추', '케일'],
	others: false
}

// const arr = []
// for(let i = 0 ; i< 1000; i++){
// 	arr.push(`${i}abcegd`)
// }
// INITIAL_STATE.veges = arr

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
