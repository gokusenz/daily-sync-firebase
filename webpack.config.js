const path = require('path')
require('dotenv').config()
const webpack = require('webpack')

const task = process.env.NODE_ENV || 'development'
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
        use: 'babel-loader',
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader?modules',
        ],
        exclude: /(node_modules)/,
      },
      {
        test: /\.scss$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader?modules',
            options: {
              sourceMap: true,
              localIdentName: '[local]___[hash:base64:5]',
            },
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true,
            },
          },
        ],
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
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
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
