/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution');

module.exports = {
  root: true,
  extends: [
    'prettier',
    'plugin:vue/vue3-essential',
    'eslint:recommended',
    '@vue/eslint-config-airbnb-with-typescript',
    'plugin:prettier/recommended',
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    parser: '@typescript-eslint/parser',
  },
  plugins: ['prettier'],
  rules: {
    camelcase: 'off',
    'no-plusplus': 'off',
    'vue/max-len': 'off',
    'linebreak-style': 'off',
    'no-param-reassign': 'off',
    'class-methods-use-this': 'off',
    'prettier/prettier': ['error', { endOfLine: 'auto', objectCurlyNewline: false }],
    'no-unused-vars': ['error', { argsIgnorePattern: 'next' }],
    'vue/object-curly-newline': ['error', { multiline: true, consistent: true }],
    'vue/html-self-closing': ['error', { html: { normal: 'never', void: 'always' } }],
  },
};
