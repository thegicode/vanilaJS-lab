const getDomContent = (htmlStr) => {
    const parser = new DOMParser()
    const doc = parser.parseFromString(htmlStr, "text/html")
    return doc.querySelector('template').content.firstElementChild.cloneNode(true)
}
export const template1 = getDomContent('<template><div><h1>title</h1><p>template1 content</p><button>click</button>{ eigiege }<p></p></div></template>')
export const template2 = getDomContent('<template><li><h3>title</h3><a href="">template2 content</a><p>222</p><span>card</span></li></template>')
export const template3 = getDomContent('<template><div><p>template3 content</p></div></template>')