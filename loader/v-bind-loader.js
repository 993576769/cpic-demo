const _ = require('lodash');
const cheerio = require('cheerio');

module.exports = function (source) {
  let html = source;
  const $ = cheerio.load(html, { xmlMode: true });
  $('*').each((i, item) => {
    _.forEach(item.attribs, (v, k) => {
      if (/\.reference$/.test(k)) {
        if (['mp-weixin', 'app-plus'].includes(process.env.UNI_PLATFORM)) {
          html = html.replace(`${k}="${v}"`, `${k.replace(/\.reference$/, 'Id')}="$getReferenceId(${v})"`);
        } else {
          html = html.replace(`${k}="${v}"`, `${k.replace(/\.reference$/, '')}="${v}"`);
        }
      }
    });
  });
  return html;
};
