const webpack = require('webpack')
const path = require('path')
const isDebug = process.env.NODE_ENV === 'local';
const outputPath = path.join(__dirname, '../client/lib');
const fileName = '[name].js';
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')


const lib = ['babel-polyfill', 'axios']


const plugin = [
  new webpack.DllPlugin({
    path: path.join(outputPath, 'manifest.json'),
    name: '[name]',
  }),
  new webpack.optimize.OccurrenceOrderPlugin()
]


module.exports = {
  mode: 'production',
  entry: {
    lib: lib
  },
  output: {
    path: outputPath,
    filename: fileName,
    library: '[name]'
  },
  plugins: plugin,
  optimization: {
    //自定义压缩工具
    minimizer: [
      //真正生产构建的时候需要设置压缩兼容ie8的
      new UglifyJsPlugin({
        cache: true,
        parallel: true,
        uglifyOptions: {
          ecma: 7,
          ie8: true
        }
      }),
    ]
  },
};