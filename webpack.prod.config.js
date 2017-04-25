const path = require('path')
require('dotenv').config()
const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const PurifyCSSPlugin = require('purifycss-webpack-plugin')

const task = 'production'
const nodePort = process.env.NODE_PORT || '3000'
const lineUrl = process.env.LINE_URL || ''
const lineToken = process.env.LINE_TOKEN || ''
const database = {
  apiKey: process.env.apiKey,
  authDomain: process.env.authDomain,
  databaseURL: process.env.databaseURL,
  storageBucket: process.env.storageBucket,
  messagingSenderId: process.env.messagingSenderId,
}

module.exports = {
  devtool: 'eval-source-map',
  entry: [
    'react-hot-loader/patch',
    path.resolve('src/client/index.js'),
  ],
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'public/dist'),
    publicPath: 'public/dist/',
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loaders: [
          {
            loader: 'babel-loader',
            query: {
              babelrc: false,
              presets: ['es2015', 'stage-0', 'react'],
            },
          },
        ],
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'postcss-loader'],
        }),
        exclude: /(node_modules)/,
      },
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'sass-loader'],
        }),
        exclude: /(node_modules)/,
      },
      {
        test: /\.(jpe?g|png|gif|svg|eot|svg|otf|ttf|woff|woff2)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 100000,
            },
          },
        ],
        exclude: /(node_modules)/,
      },
    ],
  },
  devServer: {
    host: '0.0.0.0',
    hot: true,
    inline: true,
    port: nodePort,
    historyApiFallback: true,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': 'true',
    },
  },
  plugins: [
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.NamedModulesPlugin(),
    new ExtractTextPlugin('styles.css'),
    new webpack.optimize.UglifyJsPlugin({
      mangle: { except: ['$super', '$', 'exports', 'require', 'window', 'global', 'self', '__webpack_require__'] },
    }),
    new PurifyCSSPlugin({
      basePath: process.cwd(),
      purifyOptions: { minify: true },
    }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(task),
        DATABASE: JSON.stringify(database),
        LINE_URL: JSON.stringify(lineUrl),
        LINE_TOKEN: JSON.stringify(lineToken),
      },
    }),
  ],
}
