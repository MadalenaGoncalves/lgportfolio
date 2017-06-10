const webpack           = require('webpack'),
      path              = require('path'),
      ExtractTextPlugin = require('extract-text-webpack-plugin'),
      nodeExternals     = require('webpack-node-externals');


module.exports = {
  entry: {
    app: './src/server.js',
    vendor: ['angular','angular-animate', 'angular-aria', 'angular-material', 'angular-messages', 'angular-route'],
    ngapp: './src/ng-app/app.js',
    data: './src/data',
  },
  output: {
    path: path.join(__dirname, '/dist'),
    filename: '[name].bundle.js',
    sourceMapFilename: '[file].map',
    publicPath: path.join(__dirname, '/dist'),
  },
  devtool: 'source-map',
  target: 'node', // ignore built-in modules like path, fs, etc. 
  externals: [nodeExternals({ // ignore all modules in node_modules folder 
      // whitelist: ['angular','angular-animate', 'angular-aria', 'angular-material', 'angular-messages', 'angular-route'],
      modulesFromFile: true
  })],
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
      },
      {
        test: /\.json$/, 
        use: 'file-loader'
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin('styles.css'),
    new webpack.optimize.CommonsChunkPlugin({ name: 'data' }),
    new webpack.optimize.CommonsChunkPlugin({ name: 'vendor' }),
    new webpack.optimize.CommonsChunkPlugin({ name: 'ngapp' }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: function (module) { // this assumes your vendor imports exist in the node_modules directory
        return module.context && module.context.indexOf('node_modules') !== -1;
      }
    }),
    //CommonChunksPlugin will now extract all the common modules from vendor and app bundles
    new webpack.optimize.CommonsChunkPlugin({
      name: 'manifest' //But since there are no more common modules between them we end up with just the runtime code included in the manifest file
    })
  ],
  devServer: {
    contentBase: path.resolve(__dirname, './src'),
  }
};
