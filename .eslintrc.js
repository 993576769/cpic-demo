module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: [
    'beansmile/vue',
    'plugin:vue/essential',
  ],
  rules: {
    "require-atomic-updates": 0,
    'vue/no-parsing-error': [2, {
      "invalid-first-character-of-tag-name": false
    }]
  },
  parserOptions: {
    parser: 'babel-eslint',
    ecmaFeatures: {
      legacyDecorators: true
    },
  },
  globals: {
    getCurrentPages: true,
    uni: true,
  }
}
