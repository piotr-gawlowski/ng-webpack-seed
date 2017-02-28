const webpack = require('webpack');
const path    = require('path');
const config  = require('./webpack.config');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const {find}  = require('lodash');

config.output = {
  filename: '[name].bundle.js',
  publicPath: '',
  path: path.resolve(__dirname, 'dist')
};

const extractCssPropIndex = findIndex(config.module.rules, {name: 'cssextract'});
config.module.rules[extractCssPropIndex] = {
  test: /\.scss/,
  use: ExtractTextPlugin.extract({
    fallback: 'style-loader',
    use: [
      {loader: 'style-loader'},
      {loader: 'css-loader'},
      {loader: 'sass-loader'},
    ]
  })
};

config.plugins = config.plugins.concat([

  // Reduces bundles total size
  new webpack.optimize.UglifyJsPlugin({
    mangle: {
      except: ['$super', '$', 'exports', 'require', 'angular']
    }
  })
]);

module.exports = config;
