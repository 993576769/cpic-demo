const path = require('path')

module.exports = {
  watchOptions: {
    ignored: /node_modules/
  },
  resolveLoader: {
    modules: ['node_modules', path.resolve(__dirname, 'loader')]
  },
  resolve: {
    alias: {
      '@': path.resolve('src'),
      '@vuex-orm$': '@vuex-orm/core/lib',
      'core-js/fn': 'core-js/es',
    },
  }
}
