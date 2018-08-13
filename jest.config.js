module.exports = {
  setupFiles: ["<rootDir>/jest.setup.js"],
  testPathIgnorePatterns: [
    "<rootDir>/.next/",
    "<rootDir>/node_modules/",
    "<rootDir>/__tests__/fixtures/",
    "<rootDir>/testcafe"
  ],
  collectCoverageFrom: [
    "pages/*.js",
    "components/*.js",
    "components/stats/*.js",
    "selectors/*"
  ],
  coveragePathIgnorePatterns: ["pages/_app.js", "pages/_document.js"],
  coverageThreshold: {
    global: {
      branches: 75,
      functions: 75,
      lines: 75,
      statements: 75
    }
  },
  testEnvironmentOptions: {
    beforeParse(window) {
      window.scrollTo = () => {};
    }
  }
};
