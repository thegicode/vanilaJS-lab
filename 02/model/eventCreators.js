const EVENT_TYPES = Object.freeze({
    ITEM_ADDED: 'ITEM_ADDED',
    ITEM_UPDATED: 'ITEM_UPDATED',
    ITEM_DELETED: 'ITEM_DELETED'
})

export default {
    addItem: text => ({
        type: EVENT_TYPES.ITEM_ADDED,
        payload: text
    }),
    updateItem: (index, text) => ({
        type: EVENT_TYPES.ITEM_UPDATED,
        payload: {
            text,
            index
        },
        isSubscribe: false
    }),
    deleteItem: index => ({
        type: EVENT_TYPES.ITEM_DELETED,
        payload: index,
    })
  }