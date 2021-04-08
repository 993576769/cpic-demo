const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');

const { NODE_ENV, UNI_PLATFORM } = process.env;

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
  },
  optimization: {
    minimizer: [
      new TerserPlugin({
        sourceMap: true,
        terserOptions: {
          output: {
            comments: false,  // 删除注释
            beautify: UNI_PLATFORM === 'mp-weixin' && NODE_ENV === 'development',  // 微信使用开发者工具的压缩，这里不压缩，方便调试
            indent_level: 2,  // 缩进 2
          },
        },
        extractComments: false,
      })
    ]
  }
};
