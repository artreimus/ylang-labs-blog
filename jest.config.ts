import type { Config } from 'jest'
import nextJest from 'next/jest.js'

const createJestConfig = nextJest({
  dir: './',
})

const config: Config = {
  clearMocks: true,
  coverageProvider: 'v8',
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/$1',
  },
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  testEnvironment: 'jsdom',
  testPathIgnorePatterns: [
    '<rootDir>/.next/',
    '<rootDir>/.contentlayer/',
    '<rootDir>/node_modules/',
  ],
  transformIgnorePatterns: [
    '<rootDir>/node_modules/.pnpm/(?!(github-slugger)@)',
    'node_modules/(?!.pnpm|github-slugger)',
  ],
}

export default createJestConfig(config)
