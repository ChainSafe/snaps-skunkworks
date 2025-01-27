module.exports = {
  collectCoverage: true,
  collectCoverageFrom: [
    '<rootDir>/**/src/**/*.ts',
    '!<rootDir>/**/src/**/*.test.ts',
  ],
  coverageReporters: ['text', 'html'],
  coveragePathIgnorePatterns: ['/node_modules/', '/mocks/', '/test/'],
  coverageThreshold: {
    global: {
      branches: 57,
      functions: 77,
      lines: 72,
      statements: 72,
    },
    './src/permissions': {
      branches: 100,
      functions: 100,
      lines: 100,
      statements: 100,
    },
  },
  silent: true,
  testTimeout: 5000,
  projects: [
    {
      displayName: 'runner: electron',
      preset: 'ts-jest',
      runner: '@jest-runner/electron',
      // Note that this environment does not support fake timers.
      testEnvironment: '@jest-runner/electron/environment',
      testMatch: [
        '<rootDir>/src/snaps/**/*.test.ts',
        '<rootDir>/src/services/**/*.test.ts',
      ],
    },
    {
      displayName: 'runner: default',
      preset: 'ts-jest',
      testPathIgnorePatterns: [
        '<rootDir>/src/snaps/*',
        '<rootDir>/src/services/*',
      ],
      testRegex: ['\\.test\\.(ts|js)$'],
    },
  ],
};
