const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const webpack = require("webpack");
const entry = require("./entry");
const config = require('../config')
const webPackRootPath = config.build.webPackRootPath;
const htmlWebPlugins = require('./webpack.htmlplugin')
const es3ifyPlugin = require("es3ify-webpack-plugin");
const ExtractTextWebpackPlugin = require("extract-text-webpack-plugin");
const CopyWebpackPlugin = require('copy-webpack-plugin')
const handleBarsPlugin = require("../src/utils/handlebars");

module.exports = {
    //入口命名规则按views视图的路径名命名
    entry: {
        index: entry("./src/client/entrys/index.js"),
        "500": entry('./src/client/entrys/500.js'),
        "404": entry('./src/client/entrys/404.js')
    },
    output: {
        filename: "src/entrys/[name].js",
        path: path.resolve(__dirname, "../assets"),
        publicPath: webPackRootPath
    },
    plugins: [
        new webpack.DllReferencePlugin({
            manifest: require('../src/client/lib/manifest.json')
        }),
        ...htmlWebPlugins,
        new handleBarsPlugin(),
        new webpack.ProgressPlugin(),
        new ExtractTextWebpackPlugin("css/[name].css"),
        new CopyWebpackPlugin([{
            from: path.resolve(__dirname, '..', 'src', 'client', 'images'),
            to: path.resolve(__dirname, '..', 'assets', 'images')
        }]),
        new CopyWebpackPlugin([{
            from: path.resolve(__dirname, '..', 'src', 'client', 'entrys'),
            to: path.resolve(__dirname, '..', 'assets', 'entrys')
        }]),
        new CopyWebpackPlugin([{
            from: path.resolve(__dirname, '..', 'src', 'client', 'js'),
            to: path.resolve(__dirname, '..', 'assets', 'js')
        }]),
        new CopyWebpackPlugin([{
            from: path.resolve(__dirname, '..', 'src', 'client', 'lib'),
            to: path.resolve(__dirname, '..', 'assets', 'lib')
        }]),
        new CopyWebpackPlugin([{
            from: path.resolve(__dirname, '..', 'src', 'client', 'css'),
            to: path.resolve(__dirname, '..', 'assets', 'css')
        }]),
        new CopyWebpackPlugin([{
            from: path.resolve(__dirname, '..', 'src', 'client', 'font'),
            to: path.resolve(__dirname, '..', 'assets', 'font')
        }])
    ],
    externals: {
        jquery: 'jQuery',
        moment: 'moment'
    },
    module: {
        rules: [{
                test: /\.js$/,
                use: [{
                    loader: "babel-loader"
                }],
                exclude: /node_modules/
            },
            {
                test: /\.css$/,
                exclude: /node_modules/,
                use: ExtractTextWebpackPlugin.extract({
                    fallback: "style-loader",
                    use: "css-loader"
                })
            },
            {
                test: /\.hbs$/,
                oneOf: [{
                    resourceQuery: /client/,
                    loader: 'handlebars-loader',
                    query: {
                        helperDirs: [
                            path.join(__dirname, '..', 'utils', 'hbs.helpers')
                        ],
                        partialDirs: [
                            path.join(__dirname, '..', 'src', 'client', 'views', 'layout')
                        ]
                    }
                }],
                exclude: /node_modules/,
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: {
                    loader: 'file-loader',
                    options: {
                        limit: 1000,
                        name: "/images/[name].[ext]",
                        publicPath: webPackRootPath
                    }
                },
                exclude: /node_modules/,
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                use: {
                    loader: 'file-loader',
                    options: {
                        limit: 1000,
                        name: "/css/font/[name].[ext]",
                        publicPath: webPackRootPath
                    }
                },
                exclude: /node_modules/,
            }
        ]
    },
    // optimization: {
    //     runtimeChunk: false,
    //     splitChunks: {
    //       chunks: 'initial',
    //       minSize: 30000,
    //       minChunks: 3,
    //       maxAsyncRequests: 5,
    //       maxInitialRequests: 3,
    //       name: true,
    //       cacheGroups: {
    //         commons: {
    //         name: 'commons',
    //         chunks: 'all',
    //         minChunks: 3,
    //         enforce: true
    //       },
    //       vendors: {
    //         test: /[\\/]node_modules[\\/]/,
    //         priority: -10
    //       }
    //     }
    //   }
    // }
};