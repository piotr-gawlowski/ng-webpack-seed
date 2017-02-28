const webpack = require('webpack');
const path = require('path');
const config = require('./webpack.config');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const {findIndex} = require('lodash');

config.output = {
  filename: '[name].bundle.js',
  publicPath: '',
  path: path.resolve(__dirname, 'dist')
};

const extractCssPropIndex = findIndex(config.module.rules, {test: /\.scss$/});
if(extractCssPropIndex !== -1) {
  config.module.rules[extractCssPropIndex] = {
    test: /\.scss/,
    use: ExtractTextPlugin.extract({
      fallback: 'style-loader',
      use: [
        {loader: 'css-loader'},
        {loader: 'sass-loader'},
      ]
    })
  };
}

config.plugins = config.plugins.concat([

  //Reduces bundles total size
  // new webpack.optimize.UglifyJsPlugin({
  //   mangle: {
  //     except: ['$super', '$', 'exports', 'require', 'angular']
  //   }
  // }),
  new webpack.LoaderOptionsPlugin({
    minimize: true,
    debug: false
  }),
  new ExtractTextPlugin('app.css')
]);

module.exports = config;
