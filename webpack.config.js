var webpack = require('webpack')
var path = require('path')

// const environment = process.env['NODE_ENV'] || 'development'
const target = process.env['TARGET'] || 'http://localhost:8000/'

// const HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
//   template: '!!pug-loader!' + path.join(__dirname, 'views', 'template.pug')
// })

module.exports = {
  mode: 'development',
  entry: './index-client.js',
  output: {
    path: path.join(__dirname, 'public', 'js'),
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        enforce: 'pre',
        exclude: [/node_modules/, path.join(__dirname, 'dist')],
        use: ['babel-loader']
      }
    ]
  },

  devtool: 'source-map',

  devServer: {
    disableHostCheck: true,
    host: '0.0.0.0',
    inline: true,
    hot: true,
    port: 8081,
    proxy: {
      '/api': {
        target: target,
        secure: false
      },
      '/public': {
        target: target,
        secure: false
      }
    }
  },

  plugins: [
    new webpack.ProvidePlugin({
      $: 'jquery',
      _: 'lodash',
      React: 'react'
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true,
      debug: false,
      options: {
        babel: {
          babelrc: true
        }
      }
    })
  ]
}

// if (environment === 'development') {
//   config.plugins.push(HtmlWebpackPluginConfig)
//   config.plugins.push(new webpack.NamedModulesPlugin())
//   config.plugins.push(new webpack.HotModuleReplacementPlugin())
// }
