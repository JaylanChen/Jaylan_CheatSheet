import common from './common'
// var partial = require("../views/layout/components/partial.hbs?client");
// data.forEach(r => {
//     str += partial(r);
// })
// 客户端使用partial模板

$(function () {
    // $(document).keydown(function (e) {
    //     if ((e.keyCode || e.which) == 13) {
    //         $(".login-btn input").click();
    //     }
    // });


    $("#loginout").click(function () {
        common.logout();
    })
});