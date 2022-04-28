const fs = require('fs')
const path = require('path')

const utfCode = 'utf8'

const PATH = {
    TEMPLATE: './src/template/',         
    SCRIPT: './src/script/'             
}

try {
    const directory = PATH.TEMPLATE
    const files = fs.readdirSync(directory)
    const templateArr = files.map( fileName => {
        const url = path.join(directory, fileName)
        const htmlStr = fs.readFileSync(url, utfCode)
        const name = fileName.replace('.html', '')
        return `export const ${name} = ${"getDomContent(`" + htmlStr + "`)"}`
    })

    let result = `const getDomContent = (htmlStr) => {
    const parser = new DOMParser()
    const doc = parser.parseFromString(htmlStr, "text/html")
    return doc.querySelector('template').content.firstElementChild.cloneNode(true)
} \n\n`
    result += templateArr.join('\n\n')

    const jsUrl = `${PATH.SCRIPT}template.js`
    fs.writeFileSync(jsUrl, result)
    // console.log(result)

} catch(err) {
    console.error(err)
}






