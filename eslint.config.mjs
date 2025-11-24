import agentConfig from 'eslint-config-agent'
import publishablePackageJson from 'eslint-config-publishable-package-json'

export default [
  ...agentConfig,
  publishablePackageJson,
  {
    ignores: [
      'dist/**',
      'node_modules/**',
      '*.config.js',
      '*.config.mjs',
      'examples/**',
    ],
  },
  {
    // Disable problematic rules for package.json
    files: ['package.json'],
    rules: {
      '@typescript-eslint/no-unused-expressions': 'off',
      'default/no-hardcoded-urls': 'off',
    },
  },
  {
    // Configure test file rules
    files: ['src/__tests__/**/*.ts', 'src/__tests__/**/*.test.ts'],
    rules: {
      'max-lines': 'off',
      'max-lines-per-function': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      // Test files don't need corresponding implementation files in same directory
      'ddd/require-spec-file': 'off',
    },
  },
  {
    // Main source files (excluding tests)
    files: ['src/**/*.ts'],
    ignores: ['src/__tests__/**'],
    rules: {
      // Allow 'any' in type utilities where it's necessary for advanced type manipulation
      '@typescript-eslint/no-explicit-any': [
        'warn',
        {
          ignoreRestArgs: true,
        },
      ],
      // Disable single-export for types-only library where related types are grouped
      'single-export/single-export': 'off',
      // This is a types-only library, so max-lines can be more lenient for complex type files
      'max-lines': ['error', { max: 600, skipBlankLines: true, skipComments: true }],
    },
  },
  {
    // Disable import/order resolver errors - eslint-config-agent handles this
    rules: {
      'import/order': 'off',
    },
  },
]
