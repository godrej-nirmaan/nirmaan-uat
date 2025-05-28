module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ['eslint:recommended'],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  rules: {
    indent: ['error', 4], // Enforce 4-space indentation
    'eol-last': ['error', 'always'], // Require newline at end of file
  },
};
