// run: webpack

var webpack = require('webpack'),
       path = require('path');

module.exports = {
  context: __dirname + '/src/ng-app',
  entry: {
    app: './app.js',
    vendor: ['angular']
  },
  output: {
    path: __dirname + '/public/static/js',
    filename: 'portfolio.bundle.js'
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({name:'vendor', filename:'vendor.bundle.js'}) 
  ]
};
