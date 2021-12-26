#! /usr/bin/env node

const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const innerConfig = require('../config/webpack.config.prod');
const libbuilerConfig = require(process.cwd() + '/libbuilder.config.js');

const config = webpackMerge.merge(innerConfig, libbuilerConfig.webpackConfig || {})

const compiler = webpack(config, (err, stats) => {
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

  console.log('libbuilerConfig.libName 构建成功 !!');
});
