const path = require('path');

process.env.VUE_APP_IPV4 = require('address').ip()

module.exports = {
  configureWebpack: require('./webpack.config'),
  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'less',
      patterns: [
        path.resolve('src/styles/color.less'),
        path.resolve('src/styles/mixin.less')
      ]
    },
  },
  chainWebpack: (config) => {
    config.module
      .rule('vue')
      .test(/\.vue$/)
      .use('style-px-loader')
      .loader('style-px-loader')
      .options({
        baseDpr: 1,
        precision: 2,
        viewportUnit: 'rpx',
      })

    config.module
      .rule('compile')
      .test(/@dcloudio.+\.js$/)
      .use('uni-loader')
      .loader('uni-loader')
  }
}
