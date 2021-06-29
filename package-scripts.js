module.exports = {
  scripts: {
    convert: {
      description: "convert some files",
      script: "nps convert.pdf",
      pdf: "electron-pdf resume.md resume.pdf -c resume.css",
      // png: "svgexport logo.svg logo.png 232:128",
    },
  },
};
