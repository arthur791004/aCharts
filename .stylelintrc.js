module.exports = {
  processors: ['stylelint-processor-styled-components'],
  syntax: 'scss',
  rules: {
    'color-hex-case': 'upper',
    'color-hex-length': 'long',
    'color-no-invalid-hex': true,

    'at-rule-no-vendor-prefix': true,
    'media-feature-name-no-vendor-prefix': true,
    'property-no-vendor-prefix': true,
    'selector-no-vendor-prefix': true,
    'value-no-vendor-prefix': true,
    'property-no-unknown': true,

    'max-nesting-depth': 2,
    'selector-max-compound-selectors': 3,
    'max-line-length': 120,
    'max-empty-lines': [1, {
      'ignore': ['comments'],
    }],
    'value-list-comma-newline-after': 'always-multi-line',
    'no-extra-semicolons': true,

    'number-max-precision': 3,
    'number-no-trailing-zeros': true,
  },
};