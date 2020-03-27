const base = require("../../jest.config");
module.exports = {
  ...base,
  setupFiles: ["<rootDir>/../../tests-setup/setup.js"],
};
