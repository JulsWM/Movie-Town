var path = require("path");
var webpack = require("webpack");
module.exports = {
  entry: "./src/app.js",
  output: {
    path: path.resolve(__dirname, "dir"),
    filename: "app.bundle.js"
  },
  devServer: {
    contentBase: "./dist"
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: "babel-loader",
        query: {
          presets: ["es2015"]
        }
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
      },
      {
        test: /\.woff2?$|\.ttf$|\.eot$|\.svg$/,
        loader: "file-loader"
      },
      {
        test: /\.scss$/,
        use: [
          {
            loader: "style-loader" // creates style nodes from JS strings
          },
          {
            loader: "css-loader" // translates CSS into CommonJS
          },
          {
            loader: "sass-loader" // compiles Sass to CSS
          }
        ]
      },
      { test: /bootstrap\/dist\/js\/umd\//, loader: "imports?jQuery=jquery" }
    ]
  },
  plugins: [
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery"
    })
  ],
  stats: {
    colors: true
  },
  devtool: "source-map"
};
