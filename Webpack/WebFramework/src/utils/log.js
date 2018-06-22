const log4js = require('log4js')

log4js.configure({
    appenders: {
        info: {
            type: 'dateFile',
            filename: 'logs/',
            pattern: 'log-yyyy-MM-dd.log',
            alwaysIncludePattern: true
        },
        console: {
            type: 'console'
        }
    },
    categories: {
        default: {
            appenders: ['info', 'console'],
            level: 'debug'
        }
    }
})

exports.getLogger = function (name) { //name取categories项
    return log4js.getLogger(name || 'default')
}

exports.useLogger = function (app, logger) { //用来与express结合
    app.use(log4js.connectLogger(logger || log4js.getLogger('default'), {
        format: '[:remote-addr :method :url :status :response-timems][:referrer HTTP/:http-version :user-agent]' //自定义输出格式
    }))
}