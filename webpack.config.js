// run: webpack

var webpack = require('webpack'),
       path = require('path');

module.exports = {
  context: __dirname + '/src/ng-app',
  entry: {
    app: './app.js',
    vendor: ['angular','angular-animate', 'angular-aria', 'angular-material', 'angular-messages', 'angular-route']
  },
  output: {
    path: __dirname + '/public/static/js',
    filename: 'portfolio.bundle.js'
  },
  module: {
    loaders: [
      {
        loader: ['style-loader', 'css-loader', 'sass-loader'],
        test: /\.scss$/
      },
      {
        loader: ['url', 'img'],
        test: /\.png$/
      }
    ]
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({name:'vendor', filename:'vendor.bundle.js'}) 
  ]
};
