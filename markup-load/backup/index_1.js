const fs = require('fs');

const utfCode = 'utf8'

const path = {
    template: './htmls/template/',
    components: './htmls/components/',
    content: './htmls/content/',
    layout: './htmls/layout/',
    page: './htmls/page/',
}


// Get template string
const getTemplateString = (names) => {
    const templateArr = names.map( name => {
        const url = `${path.template}${name}.html`
        return fs.readFileSync(url, utfCode)
    })
    return templateArr.join('\n')
}

// Get components string
const getComponents = (names) => {
    const obj = {}
    names.forEach( name => {
        const url = `${path.components}${name}.html`
        const str = fs.readFileSync(url, utfCode)
        obj[name] = str
    })
    return obj
}

// Make page file func
const writePage = (pageName, templateNames, componentNames) => {
    try {
        const fileName = `${pageName}.html`
        const contentUrl = `${path.content}${fileName}`
        const layoutUrl = `${path.layout}${fileName}`
        const pageUrl = `${path.page}${fileName}`
        
        const templateStr = getTemplateString(templateNames)
        let contentStr = fs.readFileSync(contentUrl, utfCode)

        const componentObj = getComponents(componentNames)
        for (const [key, value] of Object.entries(componentObj)) {
            contentStr = contentStr.replace(`{${key}}`, value)
        }

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
        templateNames: ['template', 'template2'],
        componentNames: ['component1', 'component2'],
    },
    list: {
        templateNames: ['template', 'template3'],
        componentNames: ['component1', 'component2'],
    }
}
for (const [key, value] of Object.entries(pages)) {
    writePage(key, value.templateNames, value.componentNames)
}

