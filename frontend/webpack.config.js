const HtmlWebPackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const path = require("path");

module.exports = {
  mode: process.env.NODE_ENV === "production" ? "production" : "development",
  devtool: "inline-source-map",
  entry: "./src/index.tsx",
  output: {
    path: __dirname + "/dist",
    filename: "bundle.js",
    chunkFilename: '[name].bundle.js',
  },
    devServer: {
        historyApiFallback: true,
        inline: true,
        hot: true,
        contentBase: path.join(__dirname, "dist"),
        compress: true,
        port: 3000
    },
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".svg", ".ico", ".png"]
  },
  module: {
    rules: [
      { test: /\.(tsx|ts)$/, exclude: /node_modules/, loader: ['cache-loader', "babel-loader"]},
      { test: /\.js$/, exclude: /node_modules/, use: ['cache-loader', "babel-loader"] },
      { test: /\.css$/, use: ['style-loader', 'cache-loader', 'css-loader']},
      { test: /\.scss$/, exclude: /node_modules/, use: ['style-loader', 'cache-loader', 'css-loader', 'sass-loader']},
      { test: /\.(svg|png|jpg|ico)$/, exclude: /node_modules/, use: ['file-loader'] }
    ]
  },
  plugins:[
      new HtmlWebPackPlugin({
          template: "./public/index.html",
          filename: "index.html",
          favicon: "./public/favicon.ico"
      }),
      new MiniCssExtractPlugin({filename: "app.css"}),
  ],
    optimization: {
        minimizer: [new UglifyJsPlugin()],
        splitChunks: {
            chunks: 'all'
        },
        runtimeChunk: {
            name: 'runtime'
        }
    }
  };
