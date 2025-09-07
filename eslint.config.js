export default {
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  extends: [
    'eslint-config-agent',
  ],
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
    project: './tsconfig.json',
  },
  rules: {
    '@typescript-eslint/no-unused-vars': 'error',
    '@typescript-eslint/no-explicit-any': 'warn',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-inferrable-types': 'off',
    '@typescript-eslint/prefer-readonly': 'error',
    '@typescript-eslint/ban-types': 'off',
  },
  env: {
    node: true,
    es2022: true,
  },
  globals: {
    describe: true,
    it: true,
    expect: true,
    beforeEach: true,
    afterEach: true,
    vi: true,
  },
};