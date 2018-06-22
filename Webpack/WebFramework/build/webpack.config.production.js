const merge = require("webpack-merge");
const common = require("./webpack.config.base");
const UglifyJSPlugin = require("uglifyjs-webpack-plugin");
const CleanWebpackPlugin = require('clean-webpack-plugin');
const path = require('path');
const es3ifyPlugin = require("es3ify-webpack-plugin");

module.exports = merge(common, {
  mode: "production",
  plugins: [
    //清理开发发布的目录
    new CleanWebpackPlugin(["assets", "views"], {
      root: path.resolve(__dirname, "../")
    }),
    new es3ifyPlugin()
  ],
  optimization: {
    //自定义压缩工具
    minimizer: [
      //真正生产构建的时候需要设置压缩兼容ie8的
      new UglifyJSPlugin({
        cache: true,
        parallel: true,
        sourceMap: false,
        uglifyOptions: {
          // compress:false,
          // mangle:false,
          // compress: {
          //   properties: false,
          //   warnings: false,
          // },
          // output: {
          //   beautify: true,
          //   quote_keys: true,
          // },
          // mangle: {
          //   properties: {
          //     keep_quoted: true
          //   }
          // },
          ecma: 5,
          ie8: true
        }
      }),
    ],
  },
});