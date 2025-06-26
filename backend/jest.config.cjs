module.exports = {
    testEnvironment: 'jsdom',
    setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
    moduleNameMapper: {
      '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
      '\\.(png|jpg|jpeg|gif|svg)$': '<rootDir>/__mocks__/fileMock.js',
      '^@src/(.*)$': '<rootDir>/src/$1',
      '^@helper/(.*)$': '<rootDir>/__helper__/$1',
    },
    transform: {
      '^.+\\.[jt]sx?$': 'babel-jest',
    },
    collectCoverage: true,
    collectCoverageFrom: [
      'src/**/*.{js,jsx,ts,tsx}', // Adjust this to your actual source folder
      '!src/**/*.test.{js,jsx,ts,tsx}', // exclude test files
      '!src/**/__tests__/**', // exclude __tests__ folders
      '!src/**/index.{js,jsx,ts,tsx}', // optional: ignore barrel files
      '!**/jest.config.js', // exclude config
      '!**/vite.config.js', // exclude Vite config
      '!**/babel.config.js', // exclude Babel config
    ],
  }