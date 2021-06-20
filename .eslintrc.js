module.exports = {
  env: {
    browser: true,
    es2021: true,
    'cypress/globals': true,
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: ['react', '@typescript-eslint', 'cypress'],
  rules: {
    '@typescript-eslint/no-explicit-any': 0,
    'react/display-name': 0,
  },
  overrides: [
    {
      files: ['.eslintrc.js', 'cypress/plugins/index.js'],
      env: {
        node: true,
      },
      rules: {
        '@typescript-eslint/no-var-requires': 0,
      },
    },
  ],
};
