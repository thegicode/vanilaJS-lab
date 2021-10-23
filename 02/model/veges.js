

const addItem = (state, event) => {
    const text = event.payload
    if (!text) {
        return state
    }
    return [...state, 
        text
    ]

}

const updateItem = (state, event) => {
    const { text, index } = event.payload
    if (!text) {
      return state
    }
  
    if (index < 0) {
      return state
    }
  
    if (!state[index]) {
      return state
    }
  
    return state.map((vege, i) => {
      if (i === index) {
        vege = text
      }
      return vege
    })
}


const deleteItem = (state, event) => {
    const index = event.payload
    if (index < 0) {
        return state
    }
  
    if (!state[index]) {
        return state
    }
  
    return state.filter((item, i) => i !== index)
}

const modifiers = {
	ITEM_ADDED: addItem,
	ITEM_UPDATED: updateItem,
	ITEM_DELETED: deleteItem
}

export default (prevState, event) => {
	if (!event) {
		return []
	}

	const currentModifier = modifiers[event.type]

	if (!currentModifier) {
		return prevState
	}

    console.log(currentModifier(prevState, event))

	return currentModifier(prevState, event)
}
  