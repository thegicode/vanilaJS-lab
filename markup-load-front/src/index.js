import { template1, template2, template3 } from './script/template.js'

template1.querySelector('button')
    .addEventListener('click', () => {
        template1.querySelector('p:last-child').textContent = 'hoho~'
    })

template2.querySelector('a').href = 'https://www.google.com/'

template3.querySelector('p').textContent ='풍성한 숲으로 들어갑니다.'

document.querySelector('#log1').appendChild(template1)
document.querySelector('#log2').appendChild(template2)
document.querySelector('#log3').appendChild(template3)