/** @type {import('jest').Config} */
module.exports = {
  preset: "ts-jest",
  testEnvironment: "jest-environment-jsdom",
  transform: {
    "^.+\\.(ts|tsx)$": "ts-jest",
  },
  moduleNameMapper: {
    "\\.(css|scss|sass)$": "identity-obj-proxy",
    "\\.(jpg|jpeg|png|svg)$": "<rootDir>/__mocks__/fileMock.js",
  },
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
};
