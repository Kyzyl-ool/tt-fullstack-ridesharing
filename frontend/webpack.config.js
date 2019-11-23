const webpack = require('webpack');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const path = require('path');
const dotenv = require('dotenv');

const env = dotenv.config().parsed;

// reduce it to a nice object, the same as before
const envKeys = Object.keys(env).reduce((prev, next) => {
  prev[`process.env.${next}`] = JSON.stringify(env[next]);
  return prev;
}, {});

module.exports = {
  mode: process.env.NODE_ENV === 'production' ? 'production' : 'development',
  devtool: 'inline-source-map',
  entry: {
    main: './src/index.tsx',
    mainPage: './src/lib/pages/MainPage/index.tsx',
    authPage: './src/lib/pages/auth-page/index.tsx',
    registrationPage: './src/lib/pages/registration-page/index.tsx',
    createTripPage: './src/lib/pages/create-trip/index.tsx',
    searchTrip: './src/lib/pages/search-trip/index.tsx'
  },
  output: {
    path: __dirname + '/dist',
    filename: '[name].[hash].js'
  },
  devServer: {
    historyApiFallback: true,
    inline: true,
    hot: true,
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    port: 3000
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.svg', '.ico', '.png']
  },
  module: {
    rules: [
      { test: /\.(tsx|ts)$/, exclude: /node_modules/, loader: ['cache-loader', 'babel-loader'] },
      { test: /\.js$/, exclude: /node_modules/, use: ['cache-loader', 'babel-loader'] },
      { test: /\.css$/, use: ['style-loader', 'cache-loader', 'css-loader'] },
      { test: /\.scss$/, exclude: /node_modules/, use: ['style-loader', 'cache-loader', 'css-loader', 'sass-loader'] },
      { test: /\.(svg|png|jpg|ico)$/, exclude: [/node_modules/, /-import-icon.svg$/], use: ['file-loader'] },
      {
        test: /-import-icon.svg$/,
        use: [
          'babel-loader',
          {
            loader: 'react-svg-loader',
            options: {
              svgo: {
                plugins: [{ removeTitle: false }],
                floatPrecision: 2
              }
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: './public/index.html',
      filename: 'index.html',
      favicon: './public/favicon.ico'
    }),
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({ filename: 'app.css' }),
    new webpack.DefinePlugin(envKeys),
    new webpack.HashedModuleIdsPlugin()
  ],
  optimization: {
    minimizer: [new UglifyJsPlugin({ parallel: true })],
    runtimeChunk: 'single',
    splitChunks: {
      chunks: 'all',
      maxInitialRequests: Infinity,
      minSize: 0,
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name(module) {
            const packageName = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)[1];
            return `npm.${packageName.replace('@', '')}`;
          }
        }
      }
    }
  }
};
