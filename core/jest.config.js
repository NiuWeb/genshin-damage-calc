/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  
  testEnvironment: "jsdom",
  transform: {
    "\\.[jt]sx?$": "esbuild-jest",
  },
  transformIgnorePatterns: [
    "node_modules/(?!(@bygdle.*)/)"
  ],

  moduleNameMapper: {
    "^@src/(.*)": "<rootDir>/src/$1",
    "^@core/(.*)": "<rootDir>/src/core/$1",
  },
};