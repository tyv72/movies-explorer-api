module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'airbnb-base',
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  rules: {
    'no-underscore-dangle': 'off',
    'no-unused-vars': ['error', { args: 'none' }],
    'quote-props': 'off',
    'no-console': 'off',
    'func-names': ['error', 'never'],
  },
};
