const { override, addBabelPlugins, fixBabelImports } = require('customize-cra');

module.exports = override(
  ...addBabelPlugins('babel-plugin-root-import'),
  fixBabelImports('babel-plugin-root-import', {
    rootPathPrefix: '~',
    rootPathSuffix: 'src',
  }),
);
