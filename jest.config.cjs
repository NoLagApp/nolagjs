module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: ['**/?(*.)+(spec|test|jestest).[tj]s?(x)'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  collectCoverage: true,
  collectCoverageFrom: [
    './e2e/node/**/*.jestest.{ts,tsx}',
    '**/*.test.{ts,tsx}'
  ],
  testSequencer: "./testSequencer.cjs",
  maxWorkers: 1,
  setupFilesAfterEnv: ["./jest.setup.ts"]
};