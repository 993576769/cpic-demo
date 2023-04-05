const minimist = require('minimist');
const dotenv = require('dotenv');
const { deployMpWeixin } = require('./mp-weixin');

const argv = minimist(process.argv.slice(2));
dotenv.config({ path: `.env.${argv.mode}` });

// 微信小程序
if (argv.type === 'mp-weixin') {
  deployMpWeixin(process.env);
}
