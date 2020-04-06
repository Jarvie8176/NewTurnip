const base = require("./jest.config");
module.exports = {
  ...base,
  roots: ["<rootDir>/src"],
  modulePaths: ["<rootDir>/src"],
  moduleDirectories: ["node_modules", "src", "test"],
  testMatch: ["**/*.e2e.(test|spec).ts"],
};
