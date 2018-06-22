// 生成环境配置
var base = require('./config.base')

if (process.env.NODE_ENV === 'production') {
    const webHost = 'http://web.production.com';

    base.build.webHost = webHost
    base.build.mainPort = 80
    base.url = {
        api: "http://api.production.com"
    }
    base.cookies.domain = ".production.com"
}

module.exports = base