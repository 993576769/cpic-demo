const fs = require('node:fs');
const path = require('node:path');
const dayjs = require('dayjs');

const ci = require(
  path.join(
    process.execPath.replace(/bin\/node$/, ''),
    '.npm/lib/node_modules/miniprogram-ci',
  ),
);

function getAppId() {
  const manifestPath = path.resolve(__dirname, '../../src/manifest.json');
  const reg = /(\/{2,}.*?(\r|\n))|(\/\*(\n|.)*?\*\/)/g; // 删除注释
  const manifest = fs.readFileSync(manifestPath, 'utf8').replace(reg, '');
  return JSON.parse(manifest)['mp-weixin'].appid;
}

async function deployMpWeixin(env) {
  const projectPath = path.resolve('dist/build/mp-weixin');
  const privateKeyPath = path.resolve('script/deploy/wx.key');
  const appid = getAppId();
  const version = dayjs().format('YYMMDDTHH');
  const desc = env.VITE_APP_ENV;
  const projectOpts = {
    appid,
    type: 'miniProgram',
    projectPath,
    privateKeyPath,
    ignores: ['node_modules/**/*'],
  };
  const project = new ci.Project(projectOpts);

  const uploadOpts = {
    project,
    version,
    desc,
    robot: Number(env.WX_CI_ROBOT),
    onProgressUpdate: console.log,
  };

  try {
    await ci.upload(uploadOpts);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

module.exports = { deployMpWeixin };
