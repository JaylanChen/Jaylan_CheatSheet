var util = require('../utils');

/**
 * seo优化
 * @param {*} vm 
 * @param {*} options 
 */
exports.seoInfo = function seoInfo(vm, options) {
    var defaults = {
        title: 'WebFramework',
        keywords: 'Web,Framework,WebFramework',
        description: 'WebFramework description'
    }
    var settings = Object.assign(defaults, options);
    vm.seoInfo = settings;
}
