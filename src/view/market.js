import marketModel from '/src/model/market.js'
import vegesView from '/src/view/veges.js'

export default () => {
    const cpnt = document.querySelector('#market')
    const events = marketModel()

    events.addInvokes( vegesView )

    // 야채 목록 
    events.invokes()
    
    // 버튼 
    cpnt
        .querySelector('[data-button=add]')
        .addEventListener('click', (e) => {
            events.addItem('배추')
        })  
    cpnt
        .querySelector('[data-button=edit]')
        .addEventListener('click', (e) => {
            events.updateItem(2, '무')
        }) 
    cpnt
        .querySelector('[data-button=delete]')
        .addEventListener('click', (e) => {
            events.deleteItem(1)
        }) 
}