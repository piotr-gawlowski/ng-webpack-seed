const path = require('path');
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  devtool: 'sourcemap',
  entry: {},
  module: {
    loaders: [
       {test: /\.js$/, exclude: [/app\/lib/, /node_modules/], loader: 'ng-annotate!babel'},
       {test: /\.html$/, loader: 'raw'},
       {test: /\.scss/, loader: 'style!css!sass'},
       {test: /\.css$/, loader: 'style!css'},
       {test: /\.(png|jpg)$/, loader: 'url-loader?limit=8192'},
      {
        test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url?limit=10000&mimetype=application/font-woff'
      }, {
        test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url?limit=10000&mimetype=application/font-woff'
      }, {
        test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url?limit=10000&mimetype=application/octet-stream'
      }, {
        test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'file'
      }, {
        test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url?limit=10000&mimetype=image/svg+xml'
      }, {
        test: /\.json$/,
        loader: 'file'
      }
    ]
  },
  plugins: [
    // Injects bundles in your index.html instead of wiring all manually.
    // It also adds hash to all injected assets so we don't have problems
    // with cache purging during deployment.
    new HtmlWebpackPlugin({
      template: 'client/index.html',
      inject: 'body',
      hash: false
    }),

    //copy static assets
    new CopyWebpackPlugin([
      {
        context: 'client/fonts',
        from: '**/*',
        to: 'fonts'
      },
      {
        context: 'client/img',
        from: '**/*',
        to: 'img'
      },
      {
        context: 'client',
        from: 'app.appcache',
        to: ''
      },
      {
        context: 'client',
        from: 'manifest.json',
        to: ''
      },
      {
        context: 'node_modules/font-awesome/fonts',
        from: '**/*',
        to: 'fonts'
      },
    ]),

    // Automatically move all modules defined outside of application directory to vendor bundle.
    // If you are using more complicated project structure, consider to specify common chunks manually.
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: function (module) {
        return module.resource && module.resource.indexOf(path.resolve(__dirname, 'client')) === -1;
      }
    })
  ]
};
