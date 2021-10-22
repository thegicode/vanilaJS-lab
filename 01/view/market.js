import marketModel from '../model/market.js'
import vegesView from './veges.js'

export default () => {
    const app = document.querySelector('#market')
    const events = marketModel()

    events.addInvokes( vegesView )

    // 야채 목록 
    events.invokes()
    
    // 버튼 
    app
        .querySelector('[data-button=add]')
        .addEventListener('click', (e) => {
            events.addItem('배추')
        })  
    app
        .querySelector('[data-button=edit]')
        .addEventListener('click', (e) => {
            events.updateItem(2, '무')
        }) 
    app
        .querySelector('[data-button=delete]')
        .addEventListener('click', (e) => {
            events.deleteItem(1)
        }) 
}