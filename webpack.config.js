const webpack           = require('webpack'),
      path              = require('path'),
      ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  context: path.join(__dirname, '/src/ng-app'),
  entry: {
    ngapp: './app.js',
    vendor: ['angular','angular-animate','angular-aria','angular-material','angular-messages','angular-route','angular-ui-router']
  },
  output: {
    // path: path.join(__dirname, '/dist'),
    path: path.join(__dirname, '/public/static/js'),
    filename: '[name].bundle.js',
    sourceMapFilename: '[file].map',
  },
  module: {
    rules: [
      {
        test: /\.js$/, 
        use: [{
          loader: 'babel-loader',
          options: {
            presets: ['es2015']
          }
        }]
      },
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader', 
          use: ['css-loader', 'sass-loader']
        })
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin('styles.css'),
    new webpack.optimize.CommonsChunkPlugin({ name: 'vendor' }),
  ],
  devServer: {
    contentBase: '../public/templates'
  }
};
