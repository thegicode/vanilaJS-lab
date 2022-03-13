
import SearchInput from './SearchInput.js'
import SearchList from './SearchList.js'

customElements.define('search-input', SearchInput, {extends: 'form'})
customElements.define('search-list', SearchList, {extends: 'div'})



/*const listEl = document.querySelector('.search-list')
document.querySelector('h1')
    .addEventListener('click', event => {
        listEl.hidden = true
})*/