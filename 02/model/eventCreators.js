// const EVENT_TYPES = Object.freeze({
//     ITEM_ADDED: 'ITEM_ADDED',
//     ITEM_UPDATED: 'ITEM_UPDATED',
//     ITEM_DELETED: 'ITEM_DELETED'
// })

export default {
    addItem: text => ({
        type: 'ITEM_ADDED',
        payload: text
    }),
    updateItem: (index, text) => ({
        type: 'ITEM_UPDATED',
        payload: {
            text,
            index
        },
        isSubscribe: false
    }),
    deleteItem: index => ({
        type: 'ITEM_DELETED',
        payload: index,
    })
  }