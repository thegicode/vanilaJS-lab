const fs = require('fs');


/* step 1 : read template, append content html  */

let htmlStr = ''

// read template
try {
    htmlStr = fs.readFileSync('./template/template.html', 'utf8')
    // console.log('read', htmlStr)
} catch (err) {
    console.error(err)
}   

// write content
// try {
//     fs.writeFileSync('./html/write.html', htmlStr)
//     console.log('written')
// } catch (err) {
//     console.error(err)
// }

// fs.writeFile('./html/content.html', `\n${htmlStr}`, { flag: 'a+' }, err => {
//     console.log(err)
// })


// Append file
const contentUrl = './html/content.html'
fs.appendFile(contentUrl, `\n${htmlStr}`, err => {
    if (err) {
        console.error(err)
        return
    }

    /* step 2 : read content html, append view html */
    try {
        const viewUrl = './view/main.html'
        const contentStr = fs.readFileSync(contentUrl, 'utf8')
        const mainStr = fs.readFileSync(viewUrl, 'utf8')
        const replacer = mainStr.replace('{content}', contentStr)
        try {
            fs.writeFileSync(viewUrl, replacer)
        } catch (err) {
            console.error(err)
        }
    } catch (err) {
        console.error(err)
    }   
})





// try {
//     fs.writeFileSync('./html/write.html', htmlStr)
//     console.log('written')
// } catch (err) {
//     console.error(err)
// }