const {override, addLessLoader, fixBabelImports, addBabelPlugins, addBabelPreset} = require("customize-cra");

module.exports = override(
  addLessLoader(),
  addBabelPlugins("lodash", "babel-plugin-transform-class-properties"),
  addBabelPreset("@babel/env"),
  fixBabelImports("import", {
    libraryName: "antd",
    libraryDirectory: "es",
    style: "css"
  })
);
