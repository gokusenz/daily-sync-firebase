require('babel-polyfill')
const path = require('path')
require('dotenv').config()
const webpack = require('webpack')
let BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin


const task = process.env.NODE_ENV || 'development'
const nodePort = process.env.NODE_PORT || '3000'
const lineUrl = process.env.LINE_URL || ''
const lineToken = process.env.LINE_TOKEN || ''

module.exports = {
  devtool: 'eval-source-map',
  entry: [
    'react-hot-loader/patch',
    'babel-polyfill',
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
        exclude: /(node_modules)/,
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
    new webpack.NamedModulesPlugin(
      {
        // Can be `server`, `static` or `disabled`.
  // In `server` mode analyzer will start HTTP server to show bundle report.
  // In `static` mode single HTML file with bundle report will be generated.
  // In `disabled` mode you can use this plugin to just generate Webpack Stats JSON file by setting `generateStatsFile` to `true`.
        analyzerMode: 'server',
  // Host that will be used in `server` mode to start HTTP server.
        analyzerHost: '127.0.0.1',
  // Port that will be used in `server` mode to start HTTP server.
        analyzerPort: 8888,
  // Path to bundle report file that will be generated in `static` mode.
  // Relative to bundles output directory.
        reportFilename: 'report.html',
  // Module sizes to show in report by default.
  // Should be one of `stat`, `parsed` or `gzip`.
  // See "Definitions" section for more information.
        defaultSizes: 'parsed',
  // Automatically open report in default browser
        openAnalyzer: true,
  // If `true`, Webpack Stats JSON file will be generated in bundles output directory
        generateStatsFile: false,
  // Name of Webpack Stats JSON file that will be generated if `generateStatsFile` is `true`.
  // Relative to bundles output directory.
        statsFilename: 'stats.json',
  // Options for `stats.toJson()` method.
  // For example you can exclude sources of your modules from stats file with `source: false` option.
  // See more options here: https://github.com/webpack/webpack/blob/webpack-1/lib/Stats.js#L21
        statsOptions: null,
  // Log level. Can be 'info', 'warn', 'error' or 'silent'.
        logLevel: 'info',
      }
    ),
    new BundleAnalyzerPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(task),
        LINE_URL: JSON.stringify(lineUrl),
        LINE_TOKEN: JSON.stringify(lineToken),
        apiKey: JSON.stringify(process.env.apiKey),
        authDomain: JSON.stringify(process.env.authDomain),
        databaseURL: JSON.stringify(process.env.databaseURL),
        storageBucket: JSON.stringify(process.env.storageBucket),
        messagingSenderId: JSON.stringify(process.env.messagingSenderId),
      },
    }),
  ],
}
