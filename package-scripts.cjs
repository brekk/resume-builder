const path = require('path')
const here = x => path.resolve(process.cwd(), x)
const nps = z => `nps -c ${here(__filename)} ${z}`

module.exports = {
  scripts: {
    build: nps('png html pdf'),
    png: "svgexport logo.svg logo.png 232:128",
    html: "env DEBUG='runner*' node --experimental-specifier-resolution=node run.js resume.mdx > resume.html",
    pdf: "electron-pdf --input resume.md --output resume.pdf --css resume.css --pageSize Letter --disableCache --marginsType 0",
    mdxpdf: "env DEBUG='runner*' node --experimental-specifier-resolution=node pdf-run.js resume.mdx resume.pdf",
  },
};
