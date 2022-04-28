console.log('Run markup')

const fs = require('fs')
const path = require('path')
const prettier = require("prettier")

const utfCode = 'utf8'

// 마크업 html file PATH
const PATH = {
    COMPONENT: './htmls/component/',    // 공통 컴포넌트
    TEMPLATE: './htmls/template/',      // template element
    CONTENT: './htmls/content/',        // 페이지별 컨텐츠(페이지당 하나)
    FRAME: './htmls/frame/',            // 페이지별 document 
    PAGE: './htmls/page/',              // 최종 html 파일
}

// { component, template } 타입에 따라 경로/파일 읽은 후 html 코드 삽입
const insertHtml = (type, name, contentHtml) => {
    const url = path.join(PATH[type.toUpperCase()], `${name}.html`)
    const str = fs.readFileSync(url, utfCode)
    contentHtml = contentHtml.replace(`{${name}}`, str)
    return contentHtml
}

// content/*.html 코드 가져오는 걸로 시작하여 
// component, template 코드 넣은 후 
// frame안에 집어 넣고 page 폴더안에 최종 파일을 생성
const writePage = (pageName) => {
    try {
        const fileName = `${pageName}.html`

        // 카테고리별 경로
        const contentUrl = path.join(PATH.CONTENT, fileName)
        const frameUrl = path.join(PATH.FRAME, fileName)
        const pageUrl = path.join(PATH.PAGE, fileName)
        
        // contentHtml을 추적하면 이해가 빠르다.
        let contentHtml = fs.readFileSync(contentUrl, utfCode)

        // 정규표현식으로 삽입할 문자열 찾는다.
        const regex = /\{(\S+)\}/gm                 // {}
        const matches = contentHtml.match(regex)
        matches.map(item => {
            // 문자열 타입에 따라 html 코드 삽입
            const regex1 = /\{(\S+)\}/              // template이 아닌 것 : component
            const regex2 = /\{(template\S+)\}/      // template~~
            let name, type
            if (!regex2.test(item)) {
                name = item.match(regex1)[1]
                type = 'component'
            } else {
                name = item.match(regex2)[1]
                type = 'template'
            }
            contentHtml = insertHtml(type, name, contentHtml)
        })
       
        // frame/*.html 파일 안에 {component, template} 삽입한 contentHtml 코드를 넣는다.
        const frameHtml = fs.readFileSync(frameUrl, utfCode)
        let htmlStr = frameHtml.replace('{content}', contentHtml)
        htmlStr = prettier.format(htmlStr, { tabWidth: 4, parser: "html" })
       
        // page/*.html 안에 최종 삽입
        fs.writeFileSync(pageUrl, htmlStr)

       
    
    } catch (err) {
        console.error(err)
    }
}

// Pages
const pages = ['main', 'list']  // 페이지명
pages.forEach( page => {
    writePage(page)
})






// const getTemplates = (names) => {
//     const obj = {}
//     names.forEach( name => {
//         const url = `${PATH.template}${name}.html`
//         const str = fs.readFileSync(url, utfCode)
//         obj[name] = str
//     })
//     return obj
// }


        // for (const [key, value] of Object.entries(componentObj)) {
        //     contentHtml = contentHtml.replace(`{${key}}`, value)
        // }


         // const templateObj = getTemplates(templateNames)
        // for (const [key, value] of Object.entries(templateObj)) {
        //     contentHtml = contentHtml.replace(`{${key}}`, value)
        // }
