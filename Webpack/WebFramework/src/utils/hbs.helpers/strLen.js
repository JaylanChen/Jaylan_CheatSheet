/**
 * 格式化文本
 * @param {*} value 字符串
 * @param {*} maxLen 最大长度
 */
module.exports = function (value, maxLen) {
    if (value === undefined || value === '')
        return '';
    if (maxLen === undefined || maxLen <= 0)
        return value;
    if (value.length < maxLen)
        return value;
    return value.substring(0, maxLen).concat('...');
}