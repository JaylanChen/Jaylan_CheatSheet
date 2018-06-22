/**
 * 判断是否为开发版本
 * @param {*} options 
 */
module.exports = function (options) {
    if (process.env.NODE_ENV === 'dev') {
        return options.fn(this);
    } else {
        return null;
    }
}