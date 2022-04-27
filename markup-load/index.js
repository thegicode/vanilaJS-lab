const fs = require('fs');

const utfCode = utfCode

const path = {
    content: './htmls/content/',
    template: './htmls/template/',
    layout: './htmls/layout/',
    page: './htmls/page/',
}

// Get template string
const getTemplateString = (templateNames) => {
    const templateArr = templateNames.map( name => {
        const url = `${path.template}${name}.html`
        return fs.readFileSync(url, utfCode)
    })
    return templateArr.join('\n')
}

// Make page file func
const writePage = (pageName, templateNames) => {
    try {
        const fileName = `${pageName}.html`
        const contentUrl = `${path.content}${fileName}`
        const layoutUrl = `${path.layout}${fileName}`
        const pageUrl = `${path.page}${fileName}`
        
        const templateStr = getTemplateString(templateNames)
        const contentStr = fs.readFileSync(contentUrl, utfCode)
        const layoutStr = fs.readFileSync(layoutUrl, utfCode)
    
        let str = `${contentStr}\n${templateStr}`
        str = layoutStr.replace('{content}', str)
        fs.writeFileSync(pageUrl, str)
    
    } catch (err) {
        console.error(err)
    }
}

// Page names, template names
const pages = {
    main: {
        templateNames: ['template', 'template2']
    },
    list: {
        templateNames: ['template', 'template3']
    }
}
for (const [key, value] of Object.entries(pages)) {
    writePage(key, value.templateNames)
}