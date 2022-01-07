module.exports = {
  // Automatically clear mock calls, instances and results before every test
  clearMocks: true,

  // The test environment that will be used for testing
  testEnvironment: "jsdom",

  // Add setup for every file.
  "setupFilesAfterEnv": [ "<rootDir>/test/jest.setup.jsx" ]
};
