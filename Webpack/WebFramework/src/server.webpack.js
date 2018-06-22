/**
 * 模块依赖
 */
const config = require('../config')

//webpack相关的只有在调试的时候会插入热加载这个东西
var webpack = require("webpack");
var webpackDevMiddleware = require("webpack-dev-middleware");
var webpackHotMiddleware = require("webpack-hot-middleware");
var webpackDevConfig = require("../build/webpack.config.dev");
var reload = require("reload");
const path = require("path");
const fs = require("fs");
const mkdirp = require("mkdirp");
const compiler = webpack(webpackDevConfig);

function getCompiler() {
    return compiler;
}

function addWebpackDevMiddleware(app) {
    if (process.env.NODE_ENV === 'local') {
        app.use(
            webpackDevMiddleware(compiler, {
                publicPath: webpackDevConfig.output.publicPath,
                stats: {
                    colors: true,
                    modules: false,
                    children: false,
                    chunks: false,
                    chunkModules: false
                }
            })
        );
        app.use(webpackHotMiddleware(compiler));
    }
    return app;
}

function addHotMiddlewareLayoutGen(app, template) {
    if (process.env.NODE_ENV === 'local') {
        app.use((req, res, next) => {
            template.forEach(data => {
                //输出的地址
                let layoutPath = path.resolve(
                    config.build.viewsOutputPath,
                    'layout',
                    data + ".hbs"
                );

                //缓存里的文件地址
                let filename = path.join(
                    compiler.outputPath,
                    "views/layout/" + data + ".hbs"
                );

                compiler.outputFileSystem.readFile(filename, function (err, result) {
                    let fileInfoLayout = path.parse(layoutPath);
                    mkdirp(fileInfoLayout.dir, () => {
                        fs.writeFileSync(layoutPath, result);
                    });
                });
            })
            next();
        });
    }
    return app;
}

module.exports = {
    addWebpackDevMiddleware: addWebpackDevMiddleware,
    addHotMiddlewareLayoutGen: addHotMiddlewareLayoutGen,
    getCompiler: getCompiler
};