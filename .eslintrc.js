module.exports = {
  parser: '@typescript-eslint/parser',
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier/@typescript-eslint',
    'plugin:prettier/recommended'
  ],
  plugins: ['react', '@typescript-eslint', 'prettier'],
  parserOptions: {
    project: 'tsconfig.json',
    ecmaVersion: 2018,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true
    }
  },
  rules: {
    'prettier/prettier': ['error', { singleQuote: true }],
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/interface-name-prefix': [1, { prefixWithI: 'always', allowUnderscorePrefix: true }],
    '@typescript-eslint/no-empty-function': 1,
    'react/prop-types': 'off',
    'react/no-unescape-entities': 'off'
  },
  env: {
    browser: true,
    node: true,
    jasmine: true,
    jest: true,
    es6: true
  },
  settings: {
    react: {
      version: 'detect'
    }
  }
};
