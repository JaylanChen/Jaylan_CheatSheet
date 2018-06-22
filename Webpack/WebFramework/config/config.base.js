// 基础配置
const path = require('path')

const mainPort = 9168; // Server监听端口
const reloadPort = 9063; // 热更新端口
const webHost = `http://localhost:${mainPort}/`; // 项目Url
const webPackRootPath = "/"; // Webpack打包js、css根路径
const projectRoot = path.resolve(__dirname, ".."); // 项目根目录
const viewsOutputPath = path.resolve(projectRoot, "assets/views"); // 视图模板输出路径
const viewsSourcePath = path.resolve(projectRoot, "src/client/views"); // 视图模板源路径

module.exports = {
    build: {
        mainPort: mainPort,
        reloadPort: reloadPort,
        webHost: webHost,
        webPackRootPath: webPackRootPath,
        projectRoot: projectRoot,
        viewsOutputPath: viewsOutputPath,
        viewsSourcePath: viewsSourcePath
    },
    url: {
        api: "http://api.xxx.com"
    },
    cookies: {
        key: 'token',
        domain: "localhost"
    },
};