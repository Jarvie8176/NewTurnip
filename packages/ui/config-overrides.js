const { override, addLessLoader, fixBabelImports, addBabelPlugins, addBabelPreset } = require("customize-cra");

module.exports = override(
  addLessLoader(),
  addBabelPlugins(
    ["@babel/plugin-proposal-decorators", { legacy: true }],
    ["@babel/plugin-proposal-class-properties", { loose: true }],
    "lodash"
  ),
  addBabelPreset("@babel/env"),
  fixBabelImports("import", {
    libraryName: "antd",
    libraryDirectory: "es",
    style: "css",
  })
);
