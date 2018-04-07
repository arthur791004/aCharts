module.exports = {
  parser: 'babel-eslint',
  extends: '@17media/eslint-config-17media/browser',
  globals: {
  },
  settings: {
    'import/resolver': {
      'babel-module': {},
    },
  },
  rules: {
    'arrow-body-style': 'off',
    'eol-last': 'off',
    'react/prop-types': 'off',
  },
};