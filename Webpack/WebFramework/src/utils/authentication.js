
const config = require("../../config");

//登陆检查
module.exports = function (req, res) {
    var cookie = req.cookies[config.cookies.key];
    if (cookie !== undefined && cookie !== '') {
        req.token = cookie;
        return true;
    }
    res.cookie(config.cookies.key, '', {
        expires: new Date(0),
        domain: config.cookies.domain,
        path: '/'
      })
    if (req.xhr) {
        return res.json({
            success: false,
            errorCode: 1012,
            errorMsg: '抱歉，需要登录',
            data: {
                refer: loginAPI
            }
        });
    } else {
        res.redirect("/");
    }
    return false;
};