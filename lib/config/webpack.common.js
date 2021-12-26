const { name } = require('../../package.json');
const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const webpack = require('webpack');

const debug = process.env.NODE_ENV === 'development';
const styleLoader = debug ? 'style-loader' : MiniCssExtractPlugin.loader;

const banner = `
__      __.__            .___
/  \    /  \__| ____    __| _/
\   \/\/   /  |/    \  / __ | 
 \        /|  |   |  \/ /_/ | 
  \__/\  / |__|___|  /\____ | 
       \/          \/      \/ 
`;

module.exports = {
  entry: './test/index.js',
  output: {
    filename: `${name}.js`,// debug ? '[name].js' : '[name].js',
    path: path.resolve(__dirname, '../../dist'),
    publicPath: debug ? '/' : '/' + name + '/', // 必须配置
    chunkFormat: 'commonjs'
  },
  target: 'web',
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
      { enforce: 'pre', test: /\.js$/, loader: 'source-map-loader' },
      {
        test: /\.css$/,
        use: [
          styleLoader,
          'css-loader',
          'postcss-loader'
        ]
      },
      {
        test: /\.(less)$/,
        use: [
          styleLoader,
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
            name: debug ? '[name].[ext]' : '[name].[hash:8].[ext]',
            outputPath: 'images/',
            publicPath: 'images/',
            limit: 10 * 1024
          }
        }
      },
      {
        test: /\.(eot|woff2?|ttf|svg)$/,
        use: {
          loader: 'url-loader',
          options: {
            name: debug ? '[name].[ext]' : '[name].[hash:8].[ext]',
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
              name: debug ? '[name].[ext]' : '[name].[hash:8].[ext]',
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
    // eslint-disable-next-line new-cap
    // new htmlWebpackPlugin({
    //   filename: 'index.html',
    //   template: path.resolve(__dirname, '../src/index.html'),
    //   title: debug ? '本地调试' : 'wind',
    //   cdnConfig: [] // cdn 配置
    // }),
    new MiniCssExtractPlugin({
      filename: debug ? '[name].css' : '[name].[hash].css',
      chunkFilename: '[id].css'
    }),
    new webpack.BannerPlugin({
      banner: `
          ${banner}

          Author: yhdjyyzk
          Date: ${new Date()}
        `
    })
  ],
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
    alias: {
      '@': path.resolve(__dirname, '../src')
    }
  }
};
