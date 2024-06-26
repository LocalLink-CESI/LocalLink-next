import type {Config} from 'jest';

const config: Config = {
  collectCoverage: true,
  coverageDirectory: 'coverage',
  verbose: true,
  preset: 'ts-jest',
  transform: {
    '^.+\\.(ts|tsx)?$': 'ts-jest',
    '^.+\\.(js|jsx)$': 'babel-jest',
  },
  moduleDirectories: ['node_modules', 'src'],
  modulePaths: ["<rootDir>/src"],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
    '^@/components/(.*)$': '<rootDir>/components/$1',
    '^@/app/component/(.*)$': '<rootDir>/app/component/$1',
    '^@/functions/(.*)$': '<rootDir>/functions/$1',
    '^@/styles/(.*)$': '<rootDir>/styles/$1',
    '^@/pages/(.*)$': '<rootDir>/pages/$1',
    '^@/app/(.*)$': '<rootDir>/app/$1',
    '^@/helpers/(.*)$': '<rootDir>/helpers/$1',
  },
  testEnvironment: 'node',
  roots: ['<rootDir>','<rootDir>/src', '<rootDir>/__tests__'],
};

export default config;