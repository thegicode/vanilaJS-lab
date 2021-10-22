import vegesModifier from './veges.js'

const cloneDeep = x => {
  return JSON.parse(JSON.stringify(x))
}

const INITIAL_STATE = {
  items: ['깻잎', '상추', '케일'],
  others: false
}

export default (initalState = INITIAL_STATE) => {
  return (prevState, event) => {
    if (!event) {
        return cloneDeep(initalState)
    }

    const {
        items,
        others
    } = prevState

    const newItems = vegesModifier(items, event)
    // const newOthers = filterModifers(newOthers, event)

    // if (newItems === items && newOthers === newOthers) {
    if (newItems === items) {
      return prevState
    }

    return {
      items: newItems,
      others: false
    }
  }
}
