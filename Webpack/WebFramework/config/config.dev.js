// 开发测试配置
var base = require('./config.base')


if (process.env.NODE_ENV === 'dev') {
    const webHost = 'http://web.dev.com';

    base.build.webHost = webHost
    base.build.mainPort = 80
    base.url = {
        api: "http://api.dev.com/"
    }
    base.cookies.domain = ".dev.com"
}


module.exports = base