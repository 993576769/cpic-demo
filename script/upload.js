const dayjs = require('dayjs');
const path = require('path');
const fs = require('fs');
const ci = require(
  path.join(
    process.execPath.replace(/bin\/node$/, ''),
    'lib/node_modules/miniprogram-ci',
  )
);

const robots = ['', 'staging', 'production'];

const config = {
  version: dayjs().format('YYMMDDTHH'),
  env: process.env.NODE_ENV,
};

function getAppId() {
  const manifestPath = path.resolve(__dirname, '../src/manifest.json');
  const reg = /(\/{2,}.*?(\r|\n))|(\/\*(\n|.)*?\*\/)/g; // 删除注释
  const manifest = fs.readFileSync(manifestPath, 'utf8').replace(reg, '');
  const appid = JSON.parse(manifest)['mp-weixin'].appid;
  return appid;
}

async function upload(env = config.env, desc, version = config.version) {
  const desc_str = desc || env;
  const projectPath = path.resolve('dist/build/mp-weixin');
  const privateKeyPath = path.resolve('script/upload.key');
  const appid = getAppId();
  const robot = robots.indexOf(env);

  const project = new ci.Project({
    appid, type: 'miniProgram',
    projectPath, privateKeyPath,
    ignores: ['node_modules/**/*'],
  });

  await ci.upload({
    project, version,
    desc: desc_str,
    robot, onProgressUpdate: console.log,
  });
}

upload().catch(err => {
  console.error(err);
  process.exit(1);
});
