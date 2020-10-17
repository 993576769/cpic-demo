const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');

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
  },
  optimization: {
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          output: {
            comments: false,
          },
        },
        extractComments: false,
      })
    ]
  }
};
