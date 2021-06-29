module.exports = {
  scripts: {
    convert: {
      description: "convert some files",
      script: "electron-pdf resume.md resume.pdf -c resume.css",
      // png: "svgexport logo.svg logo.png 232:128",
    },
    html: "env DEBUG='runner*' node --experimental-specifier-resolution=node run.js resume.mdx",
    pdf: "env DEBUG='runner*' node --experimental-specifier-resolution=node pdf-run.js resume.mdx resume.pdf",
  },
};
