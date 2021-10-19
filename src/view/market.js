import marketModelFactory from '/src/model/market.js'
import vegesView from '/src/view/veges.js'

export default () => {
    const cpnt = document.querySelector('#market')
    const events = marketModelFactory()

    events.addInvokes( vegesView )

    // 야채 목록 
    vegesView(events.getState())
    
    // 버튼 
    cpnt
        .querySelector('[data-button=add]')
        .addEventListener('click', (e) => {
            events.addItem('배추')
        })  
    // cpnt
    //     .querySelector('[data-button=edit]')
    //     .addEventListener('click', (e) => {
    //         // events.editItem('배추')
    //     }) 
}