
export const clonedNode = (node) => {
    return node.content.firstElementChild.cloneNode(true)
}