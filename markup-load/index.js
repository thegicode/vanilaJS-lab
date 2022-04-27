const fs = require('fs');

const templateUrl = './htmls/template/template.html'
const contentUrl = './htmls/content/content.html'
const layoutUrl = './htmls/layout/main.html'
const viewUrl = './htmls/view/main.html'

let str = ''

// Get string : template html, content html, layout html
try {
    const templateStr = fs.readFileSync(templateUrl, 'utf8')
    const contentStr = fs.readFileSync(contentUrl, 'utf8')
    const layoutStr = fs.readFileSync(layoutUrl, 'utf8')
    str = `${contentStr}\n${templateStr}`
    str = layoutStr.replace('{content}', str)
} catch (err) {
    console.error(err)
}   

// write 
try {
    fs.writeFileSync(viewUrl, str)
} catch (err) {
    console.error(err)
}
