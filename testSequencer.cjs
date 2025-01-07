const TestSequencer = require('@jest/test-sequencer').default;

class CustomSequencer extends TestSequencer {
  // Sort tests by file name or any custom logic
  sort(tests) {
    // Example: Run tests in alphabetical order
    return tests.sort((a, b) => (a.path > b.path ? 1 : -1));
  }
}

module.exports = CustomSequencer;
