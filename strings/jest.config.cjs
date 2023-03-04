/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  preset: "ts-jest",
  transform: {
    "node_modules/((@bygdle.*)/)": "esbuild-jest",
  },
  transformIgnorePatterns: [
    "node_modules/(?!(@bygdle.*)/)"
  ],
  moduleNameMapper: {
    "^@src/(.*)": "<rootDir>/src/$1",
    "^@core/(.*)": "<rootDir>/src/core/$1",
  }
}