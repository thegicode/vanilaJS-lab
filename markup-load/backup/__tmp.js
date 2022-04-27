const fs = require('fs');
const node_env = process.env.NODE_ENV;
const files = {
    '/': '/index.html', 
    '/404': '/404.html', 
    '/test': '/test.html', 
    '/external': '/external.html', 
    '/test-scheme': '/scheme.html',
    '/test-design': '/test-design.html'
};

let __html = {};
let __viewname; 
let __dir; 

function loader(dir, folder) {
    __dir = dir; 
    __viewname = `${dir}${folder}`; 

    console.time('templates');

    for ( const key in files ) {
        const v = files[key];
        const path = `${__viewname}${v}`;

        __html[key] = fs.readFileSync(path, 'utf-8');
    }

    console.timeEnd('templates');
}

function get(key) {
    return __html[key];
}