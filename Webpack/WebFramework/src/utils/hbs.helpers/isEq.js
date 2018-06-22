module.exports = function isEq(v1, v2, options) {
    // 计划总结
    if (v1 == v2) {
        return options.fn(this)
    } else {
        return options.inverse(this)
    }
}