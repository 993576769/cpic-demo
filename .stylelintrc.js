module.exports = {
  processors: [],
  plugins: ['stylelint-order'],
  rules: {
    'color-no-invalid-hex': true,
    'font-family-no-duplicate-names': true,
    'function-linear-gradient-no-nonstandard-direction': true,
    'function-calc-no-unspaced-operator': true,
    'string-no-newline': true,
    'selector-type-no-unknown': [true, {
      ignoreTypes: [ 'page' ]
    }],
    'declaration-block-no-duplicate-properties': true,
    'comment-no-empty': true,
    // 'no-descending-specificity': true,
    'block-closing-brace-empty-line-before': 'never',
    'no-duplicate-at-import-rules': true,
    'no-duplicate-selectors': true,
    'no-extra-semicolons': true,
    'shorthand-property-no-redundant-values': true,
    'value-no-vendor-prefix': true,
    'function-comma-newline-after': 'never-multi-line',
    'function-max-empty-lines': 0,
    'function-whitespace-after': 'always',
    'at-rule-name-space-after': 'always',
    'at-rule-empty-line-before': ['always', {
      ignore: ['after-comment'],
      except: ['first-nested'],
      ignoreAtRules: ['import']
    }],
    'selector-list-comma-space-after': 'always-single-line',
    'selector-list-comma-space-before': 'never',
    'selector-combinator-space-after': 'always',
    'block-opening-brace-space-before': 'always',
    'rule-empty-line-before': ['always', {
      except: ['first-nested', 'after-single-line-comment']
    }],
    'declaration-colon-space-after': 'always',
    'declaration-colon-space-before': 'never',
    'declaration-block-semicolon-newline-after': 'always-multi-line',
    'declaration-block-semicolon-newline-before': 'never-multi-line',
    'at-rule-name-case': 'lower',
    'color-hex-case': 'lower',
    'block-no-empty': true,
    'order/order': [
      'custom-properties',
      'declarations'
    ],
    'order/properties-order': [
      'width',
      'height'
    ]
  }
};
