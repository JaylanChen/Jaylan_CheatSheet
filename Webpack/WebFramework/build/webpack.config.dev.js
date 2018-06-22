const merge = require("webpack-merge");
const common = require("./webpack.config.base");
const webpack = require("webpack");
const path = require("path");
const CleanWebpackPlugin = require('clean-webpack-plugin')
const es3ifyPlugin = require("es3ify-webpack-plugin");

module.exports = merge(common, {
    mode: 'development',
    devServer: {
        colors: true,
        modules: false,
        children: false,
        chunks: false,
        chunkModules: false
    },
    plugins: [
        new es3ifyPlugin(),
        new webpack.HotModuleReplacementPlugin(), //清理开发发布的目录
        new CleanWebpackPlugin(["views"], {
            root: path.resolve(__dirname, "../")
        })
    ]
});