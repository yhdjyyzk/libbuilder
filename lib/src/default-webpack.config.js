const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const webpackMerge = require('webpack-merge');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const defalutLibbuilderConfig = require('./default-libbuilder.config');

function getConfig (libbuilerConfig) {
  libbuilerConfig = Object.assign({}, defalutLibbuilderConfig, libbuilerConfig);

  const config = {
    mode: 'production',
    devtool: false,
    entry: './test/index.js',
    output: {
      filename: libbuilerConfig.libName + (libbuilerConfig.mini ? '.mini' : '') + '.js',
      path: path.resolve(__dirname, '../../dist'),
      library: {
        type: 'umd',
        name: libbuilerConfig.libName,
        export: 'default'
      }
    },
    externals: {},
    module: {
      rules: [
        { test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader' },
        {
          test: /\.jsx$/,
          exclude: /node_modules/,
          use: [
            { loader: 'babel-loader' }
          ]
        },
        { test: /\.tsx?$/, use: 'ts-loader', exclude: /node_modules/ },
        // { test: /\.ts?$/, use: 'ts-loader', exclude: /node_modules/ },
        // { enforce: 'pre', test: /\.js$/, loader: 'source-map-loader' },
        {
          test: /\.css$/,
          use: [
            MiniCssExtractPlugin.loader,
            'css-loader',
            'postcss-loader'
          ]
        },
        {
          test: /\.(less)$/,
          use: [
            MiniCssExtractPlugin.loader,
            'css-loader',
            'postcss-loader',
            'less-loader'
          ]
        },
        {
          test: /\.(png|jpg|jpeg|gif)$/i,
          use: {
            loader: 'url-loader',
            options: {
              name: '[name].[hash:8].[ext]',
              outputPath: 'images/',
              publicPath: 'images/',
              limit: 1024 * 1024
            }
          }
        },
        {
          test: /\.(eot|woff2?|ttf|svg)$/,
          use: {
            loader: 'url-loader',
            options: {
              name: '[name].[hash:8].[ext]',
              limit: 5000,
              publicPath: 'fonts/',
              outputPath: 'fonts/'
            }
          }
        },
        {
          test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/, // 媒体文件
          use: [
            {
              loader: 'url-loader',
              options: {
                name: '[name].[hash:8].[ext]',
                limit: 10240,
                outputPath: 'media/',
                publicPath: 'media/'
              }
            }
          ]
        }
      ]
    },
    plugins: [
      new ProgressBarPlugin(),
      new CleanWebpackPlugin(),
      new MiniCssExtractPlugin({
        filename: libbuilerConfig.libName + (libbuilerConfig.mini ? '.mini' : '') + '.css',
        chunkFilename: libbuilerConfig.libName + (libbuilerConfig.mini ? '.mini' : '') + '.css'
      }),
      new webpack.BannerPlugin({
        banner: `
            ${libbuilerConfig.banner}
  
            Author: ${libbuilerConfig.author}
            Date: ${new Date()}
          `
      }),
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify('production')
      }),
      new webpack.ProgressPlugin(function (percentage, message, ...args) {
        // console.info(message + (percentage * 100).toFixed(2) + '%' + '. ' + args.join(','));
      }),
    ],
    resolve: {
      extensions: ['.js', '.jsx', '.ts', '.tsx'],
      alias: {
        '@': path.resolve(__dirname, '../src')
      }
    },
    optimization: {
      minimize: libbuilerConfig.mini || false, // webpack5 默认使用TerserWebpackPlugin压缩代码
      minimizer: [
        '...', // 扩展语法，继承默认配置
        new OptimizeCssAssetsPlugin({}),
      ]
    }
  }

  const mergedConfig = webpackMerge.merge(config, libbuilerConfig.webpackConfig)

  return mergedConfig
}

module.exports = getConfig