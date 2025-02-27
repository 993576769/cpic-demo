const postcss = require('postcss');

const pxUnitReg = /"[^"]+"|'[^']+'|url\([^)]+\)|(\d+(?:\.\d+)?|\.\d+)px/g;

function toFixed(number, precision) {
  const multiplier = 10 ** (precision + 1);
  const wholeNumber = Math.floor(number * multiplier);
  return Math.round(wholeNumber / 10) * 10 / multiplier;
}

function isExcludeFile(path, excludeFiles) {
  return excludeFiles.some(rule => path.match(rule));
}

function isExcludeSelector(selector, excludeSelectors) {
  return excludeSelectors.some((rule) => {
    if (typeof rule === 'string') {
      return selector.includes(rule);
    }
    return selector.match(rule);
  });
}

function isExcludeProperty(property, excludeProperties) {
  return excludeProperties.some((rule) => {
    if (typeof rule === 'string') {
      return property.includes(rule);
    }
    return property.match(rule);
  });
}

module.exports = postcss.plugin('postcss-px-to-relative-unit', (options) => {
  options = options || {};
  options = Object.assign({
    baseDpr: 1,
    targetUnit: 'rpx',
    ignoreThreshold: 1,
    viewportWidth: 375,
    viewportHeight: 667,
    htmlFontSize: 37.5,
    unitPrecision: 2,
    excludeFiles: [],
    excludeSelectors: [],
    excludeProperties: [],
  }, options);
  return function (root) {
    if (isExcludeFile(root.source.input.file, options.excludeFiles)) {
      return;
    }
    root.walkRules((rule) => {
      if (isExcludeSelector(rule.selector, options.excludeSelectors)) {
        return;
      }
      rule.walkDecls((decl) => {
        if (isExcludeProperty(decl.prop, options.excludeProperties)) {
          return;
        }
        const remValue = decl.value;
        const vwValue = decl.value;
        const rpxValue = decl.value;

        if (options.targetUnit === 'vw') {
          decl.value = vwValue.replace(pxUnitReg, (match, pxValue) => {
            if (!pxValue) {
              return match;
            }
            const pixelValue = Number.parseFloat(pxValue);
            if (pixelValue <= options.ignoreThreshold) {
              return match;
            }
            const vwTargetValue = toFixed(pixelValue / options.viewportWidth * 100, options.unitPrecision);
            return `${vwTargetValue}vw`;
          });
        } else if (options.targetUnit === 'rem') {
          decl.value = remValue.replace(pxUnitReg, (match, pxValue) => {
            if (!pxValue) {
              return match;
            }
            const pixelValue = Number.parseFloat(pxValue);
            if (pixelValue <= options.ignoreThreshold) {
              return match;
            }
            const remTargetValue = toFixed(pixelValue / options.htmlFontSize, options.unitPrecision);
            return `${remTargetValue}rem`;
          });
        } else if (options.targetUnit === 'rpx') {
          decl.value = rpxValue.replace(pxUnitReg, (match, pxValue) => {
            if (!pxValue) {
              return match;
            }
            const pixelValue = Number.parseFloat(pxValue);
            if (pixelValue <= options.ignoreThreshold) {
              return match;
            }
            const rpxTargetValue = toFixed(pixelValue / options.baseDpr * 2, options.unitPrecision);
            return `${rpxTargetValue}rpx`;
          });
        }
      });
    });
  };
});
