const webpack = require('webpack');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
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
  devtool: process.env.NODE_ENV === 'development' ? 'inline-source-map' : '',
  entry: {
    main: './lib/index.tsx'
  },
  output: {
    publicPath: '/',
    path: __dirname + '/dist',
    filename: '[name].[hash].js'
  },
  devServer: {
    historyApiFallback: true,
    inline: true,
    hot: true,
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    port: 3000,
    proxy: {
      '/api': {
        target: 'http://tt-ridesharing-backend.herokuapp.com',
        pathRewrite: { '^/api': '' },
        changeOrigin: true
      }
    }
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.svg', '.ico', '.png', '.scss'],
    alias: {
      components: path.resolve(__dirname, 'lib/components/'),
      pages: path.resolve(__dirname, 'lib/pages/'),
      styles: path.resolve(__dirname, 'lib/styles/'),
      samples: path.resolve(__dirname, 'lib/samples/'),
      hoc: path.resolve(__dirname, 'lib/hoc/'),
      hooks: path.resolve(__dirname, 'lib/hooks/'),
      models: path.resolve(__dirname, 'lib/models/'),
      domain: path.resolve(__dirname, 'lib/domain/'),
      store: path.resolve(__dirname, 'lib/store/'),
      helpers: path.resolve(__dirname, 'lib/helpers/')
    }
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
    new CopyWebpackPlugin([{ from: './public/icons', to: 'public/icons' }]),
    new CopyWebpackPlugin([{ from: './public/manifest.json', to: 'public/manifest.json' }]),
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({ filename: 'app.css' }),
    new webpack.DefinePlugin(envKeys),
    new webpack.HashedModuleIdsPlugin()
  ],
  optimization: {
    minimizer: [
      new TerserPlugin({
        parallel: true,
        terserOptions: {
          ecma: 6
        }
      })
    ],
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
