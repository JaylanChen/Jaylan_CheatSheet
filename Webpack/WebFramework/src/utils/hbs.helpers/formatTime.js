var moment = require('moment')

/**
 * 格式化日期模板中
 * @param {*} value 值
 * @param {*} format 格式化
 */
module.exports = function(value, format) {
    if (value === undefined || value === '')
        return '';
    if (!format)
        format = 'YYYY-MM-DD'
    return moment(value).format(format);
}