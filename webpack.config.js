var path = require("path");

module.exports = {
  devtool: 'source-map',
  entry: './src/app.js',
  output: {
    path: path.resolve(__dirname, "dist"),
    publicPath: "/build/",
    filename: "bundle.js"
  },
  module: {
    rules: [{
      test: /\.js$/,
      exclude: /(node_modules|bower_components)/,
      use: {
        loader: 'babel-loader'
      }
    }, {
      test: /\.scss$/,
      use: [{
        loader: 'style-loader'
      }, {
        loader: 'css-loader'
      }, {
        loader: 'sass-loader'
      }]
    }]
  }
};
