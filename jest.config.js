module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  rootDir: ".",
  roots: ["<rootDir>"],
  modulePaths: ["<rootDir>"],
  moduleFileExtensions: ["js", "json", "ts"],
  testMatch: ["**/*.(test|spec).ts"],
  transform: {
    "^.+\\.(t|j)s$": "ts-jest",
  },
  collectCoverageFrom: ["src/**/*.ts"],
  resetMocks: true,
  verbose: true,
  setupFiles: ["<rootDir>/src/init.ts"],
  coverageDirectory: "<rootDir>/coverage",
  coverageReporters: ["json"],
};
