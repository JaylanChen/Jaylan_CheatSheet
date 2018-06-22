//自动添加html-web-plugin
const fs = require('fs');
const mkdirp = require("mkdirp");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const config = require('../config')
const path = require('path');

var htmlWebpackPlugins = [];

var walk = function (dir) {
    var files = [];
    var list = fs.readdirSync(dir);
    list.forEach(function (file) {
        file = dir + '/' + file;
        var stat = fs.statSync(file);
        if (stat && stat.isDirectory()) {
            results = files.concat(walk(file));
        } else {
            //如果是文件 那么添加到htmlwebplugin
            //如果是layout下的 那么不船舰默认的chunks
            var option = {
                inject: false,
                template: file,
                filename: file.substr(file.indexOf('views'), file.length),
                chunks: []
            }

            if (file.indexOf('layout') === -1) {
                //这个地方坐下chunks的植入
                //chunks命名规则就是 views下的目录名+文件名
                const chunk = file.replace(config.build.viewsSourcePath, '').replace(path.extname(file), '').replace('/', '').replace(/\//g, '.');

                option.chunks = [chunk]
                // option.chunks = ['commons', chunk]
            }
            htmlWebpackPlugins.push(new HtmlWebpackPlugin(option))
        }
    });
    return htmlWebpackPlugins;
}
walk(config.build.viewsSourcePath)
module.exports = htmlWebpackPlugins;