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
    },
  }
}
