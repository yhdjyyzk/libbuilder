#! /usr/bin/env node

const webpack = require('webpack');
const getConfig = require('./default-webpack.config');
const libbuilerConfig = require(process.cwd() + '/libbuilder.config.js');
const defalutLibbuilderConfig = require('./default-libbuilder.config');

const mergedLibbuilerConfig = Object.assign({}, defalutLibbuilderConfig, libbuilerConfig);

const webpackConfig = getConfig(libbuilerConfig);

const compiler = webpack(webpackConfig, (err, stats) => {
  if (err) {
    console.error(err.stack || err);

    if (err.details) {
      console.error(err.details);
    }

    return;
  }

  const info = stats.toJson();

  if (stats.hasErrors()) {
    console.error(info.errors);
  }

  if (stats.hasWarnings()) {
    console.warn(info.warnings);
  }

  console.log(mergedLibbuilerConfig.libName + '构建成功 !!');
});
