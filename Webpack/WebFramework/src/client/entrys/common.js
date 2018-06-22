import "../css/style.css";

$.ajaxSetup({
    complete: function (XMLHttpRequest, textStatus) {
        var res = XMLHttpRequest.responseText;
        try {
            var data = JSON.parse(res);
            if (res.errorCode == 1012 || res.errorCode == 1013) {
                layer.open({
                    title: '登录信息过期',
                    content: "登录信息过期,请重新登录",
                    yes: function () {
                        logout();
                        window.location.href = "/#login";
                    }
                });
                setTimeout(function () {
                    logout();
                    window.location.href = "/#login";
                }, 3000)
            }

        } catch (e) {

        }
    }
});
// $(function () {
//     var currentPath = window.location.pathname;
//     $("#userspacenav").find("a").each(function () {
//         var $this = $(this);
//         if ($this.attr('href') === currentPath) {
//             $this.parent().addClass('active');
//         }
//     });
//     $("#headerNav").find("a").each(function () {
//         var $this = $(this);
//         if ($this.attr('href') === currentPath) {
//             $this.addClass('active');
//         }
//     });
// });

export function logout() {
    $.removeCookie("cxds-token");
    $.removeCookie("username");
    window.location.href = "/";
}