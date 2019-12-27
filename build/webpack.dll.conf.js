'use strict'

const path = require('path')
const utils = require('./utils')
const AssetsPlugin = require('assets-webpack-plugin')
const webpack = require('webpack')
const config = require('../config')
const vueLoaderConfig = require('./vue-loader.conf')

function resolve(dir) {
  return path.join(__dirname, '..', dir)
}


const vendors = [

  'babel-polyfill',
  "bootstrap",
  "popper.js",
  "sweetalert2",
  "vue-sweetalert2",

  resolve("src/components/quill/quill.js"),
  resolve("src/components/quill-image-resize-module/ImageResize.js"),
  resolve("src/components/quill-editor/index.js"),
  "quill-image-drop-module",

  // ...其它库
];

module.exports = {
  output: {
    path: config.build.assetsRoot,
    filename: 'dll.[name].js', // 生成的文件名字(默认为dll.vendor.[hash].js)
    library: '[name]_[chunkhash]' // 生成文件的映射关系，与下面DllPlugin中配置对应
  },
  entry: {
    "dll": vendors,
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: vueLoaderConfig
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: [ resolve('src'), resolve('test'), 
          resolve('node_modules/webpack-dev-server/client'),
          resolve('node_modules/parchment'),
          resolve('node_modules/quill-image-drop-module'),
          resolve('node_modules/bootstrap'),
          resolve('node_modules/sweetalert2"'),
          resolve('node_modules/vue-sweetalert2'),
        ]
      },
      {
        test: /\.svg$/,
        loader: 'svg-inline-loader',
        include: resolve('src/components/quill/assets/icons/'),
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        exclude: resolve('src/components/quill/assets/icons/'),
        options: {
          limit: 10000,
          name: utils.assetsPath('img/[name].[ext]')
        }
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('media/[name].[ext]')
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('fonts/[name].[ext]')
        }
      },
    ]
  },
  plugins: [
    new webpack.DllPlugin({
      // 会生成一个json文件，里面是关于dll.js的一些配置信息
      path: path.join(__dirname, '[name]-manifest.json'),
      name: '[name]_[chunkhash]', // 与上面output中配置对应
      context: __dirname // 上下文环境路径（必填，为了与DllReferencePlugin存在与同一上下文中）
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production')
    }),
    new AssetsPlugin({  //
      filename: 'bundle-conf.json',
      path: __dirname
    }),
    new webpack.optimize.UglifyJsPlugin({
      output: {
        comments: false
      },
      compressor: {
        warnings: false
      }
    }),
  ],
};
