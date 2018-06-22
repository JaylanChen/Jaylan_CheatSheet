var express = require('express');
var router = express.Router();
var api = require("../api");

router.post("/login", async function (req, res, next) {
    var username = req.body.username;
    var password = req.body.password;
    let result = await api.login(username, password);

    res.send(result.data)
});

router.post("/register", async function (req, res, next) {
    let result = await api.register(req.body);

    if (result.data.success) {
        // 注册成功后自动登录
        let username = req.body.username;
        let password = req.body.password;
        let loginResult = await api.login(username, password);
        res.send(loginResult.data);

    } else {
        res.send(result.data);
    }
});

router.get('/logout', function (req, res, next) {
    res.cookie(config.cookies.key, '', {
        expires: new Date(0)
    })
    res.redirect('/');
});

module.exports = router;