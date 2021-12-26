#! /usr/bin/env node

const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const innerConfig = require('../config/webpack.config.prod');
const libbuilerConfig = require(process.cwd() + '/libbuilder.config.js');

const config = webpackMerge.merge(innerConfig, libbuilerConfig || {})

const compiler = webpack(config, (err, stats) => {
  if (err || stats.hasErrors()) {
    console.log(err)
  }

  console.log('successful !!!');
});