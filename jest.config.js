module.exports = {
  roots: ["<rootDir>/tests"],
  clearMocks: true,
  collectCoverage: true,
  coverageDirectory: "coverage",
  coverageProvider: "v8",
  collectCoverageFrom: [
    "<rootDir>/src/**/*.ts",
    "!**/test/**",
    "!**/config/**",
  ],
  testEnvironment: "node",
  transform: {
    ".+\\.ts$": "ts-jest",
  },
};
