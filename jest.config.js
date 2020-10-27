module.exports = {
  coveragePathIgnorePatterns: ['/node_modules/', '<rootDir>/src/routes.js'],
  setupFilesAfterEnv: ['./jestSetup.js'],
  transformIgnorePatterns: [
    '/node_modules/(?!antd|@ant-design|rc-.+?|@babel/runtime).+(js|jsx)$',
  ],
};
