process.env.VUE_APP_IPV4 = require('address').ip();

module.exports = {
  configureWebpack: require('./webpack.config'),
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
      });

    config.module
      .rule('vue')
      .test(/\.vue$/)
      .use('v-bind-loader')
      .loader('v-bind-loader');

    config.module
      .rule('compile')
      .test(/@dcloudio.+\.js$/)
      .use('uni-loader')
      .loader('uni-loader');
  }
};
