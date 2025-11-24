import agentConfig from 'eslint-config-agent'
import publishablePackageJson from 'eslint-config-publishable-package-json'

export default [
  ...agentConfig,
  publishablePackageJson,
  {
    ignores: ['dist/**', 'node_modules/**', '*.config.js', '*.config.mjs', 'examples/**'],
  },
  {
    files: ['src/__tests__/**/*.ts', 'src/__tests__/**/*.test.ts'],
    rules: {
      'max-lines': 'off',
      'max-lines-per-function': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
    },
  },
  {
    files: ['src/**/*.ts'],
    rules: {
      // Allow 'any' in type utilities where it's necessary for advanced type manipulation
      '@typescript-eslint/no-explicit-any': [
        'warn',
        {
          ignoreRestArgs: true,
        },
      ],
      'max-lines': ['error', { max: 600, skipBlankLines: true, skipComments: true }],
    },
  },
]
