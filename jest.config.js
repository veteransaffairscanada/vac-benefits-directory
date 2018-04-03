module.exports = {
  moduleNameMapper: {
    "\\.(scss)$": "<rootDir>/node_modules/jest-css-modules"
  },
  setupFiles: ["<rootDir>/jest.setup.js"],
  testPathIgnorePatterns: ["<rootDir>/.next/", "<rootDir>/node_modules/"]
};
