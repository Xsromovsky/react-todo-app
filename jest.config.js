module.exports = {
  testEnvironment: "jsdom",
  transform: {
    "^.+\\.(ts|tsx|mjs)$": "ts-jest",  // Use ts-jest for TypeScript files
    "^.+\\.(js|jsx|mjs)$": "babel-jest" // Use babel-jest for JavaScript files
  },
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
  transformIgnorePatterns: [
    "/node_modules/", // Transform ES modules in axios if needed
    // "/node_modules/(?!(node-fetch)/)"
  ],
  setupFiles: ['./jest.polyfills.js'],
  // moduleDirectories: ["node_modules", "src"],
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
  moduleNameMapper: {
    "\\.(css|less|sass|scss)$": "identity-obj-proxy", // Mock CSS imports
    "\\.(jpg|jpeg|png|gif|webp|svg)$": "<rootDir>/__mocks__/fileMock.js",
    // 'use-resize-observer': 'use-resize-observer/polyfilled',
  },
  testEnvironmentOptions: {
    customExportConditions: [''],
  },
};