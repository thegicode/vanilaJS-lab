
class ExandingList extends HTMLUListElement {
    constructor() {
        // 왜 this를 사용하지 않고 self를 썼을까?
        // self 변수로 선언하지 않았다. 예약어?

        self = super();

        const uls = Array.from(self.querySelectorAll('ul'));
        const lis = Array.from(self.querySelectorAll('li'));

        uls.forEach( ul => {
            ul.style.display = 'none';
        })

        lis.forEach( li => {
            if(li.querySelectorAll('ul').length > 0) {
                li.setAttribute('class', 'closed');

                const childText = li.childNodes[0];
                // li.childNodes : NodeList(3) [text, ul, text]
                const newSpan = document.createElement('span');

                newSpan.textContent = childText.textContent;
                newSpan.style.cursor = 'pointer'

                newSpan.onclick = self.showul;

                childText.parentNode.insertBefore(newSpan, childText);
                childText.parentNode.removeChild(childText);

            }
        })
    }

    showul = function(e) {
        const nextul = e.target.nextElementSibling;

        if (nextul.style.display == 'block') {
            nextul.style.display = 'none';
            nextul.parentNode.setAttribute('class', 'closed');
        } else {
            nextul.style.display = 'block';
            nextul.parentNode.setAttribute('class', 'open')
        }

    };
}

customElements.define('expanding-list', ExandingList, {extends: 'ul'});