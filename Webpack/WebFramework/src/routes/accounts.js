var express = require('express');
var router = express.Router();
var api = require("../api");
var util = require('../utils');
var base = require('./base');

router.all('*', function (req, res, next) {
    if (!util.authentication(req, res)) {
        return;
    }
    next();
});

router.get("/userinfo", async function (req, res, next) {
    let result = await api.userinfo({}, req.token);
    var vm = result.data.instance.user;
    base.seoInfo(vm, {
        title: ' 修改个人信息'
    });
    util.render(res, 'userinfo', vm)
});

router.post("/userinfo", async function (req, res, next) {
    let result = await api.edituserinfo(req.body, req.token);
    res.send(result.data);
});

router.get("/editpassword", function (req, res, next) {
    if (!util.authentication(req, res)) {
        return;
    }
    var vm = {};
    base.seoInfo(vm, {
        title: ' 修改密码'
    });
    util.render(res, 'editpassword', vm)
});

router.post("/editpassword", async function (req, res, next) {
    let result = await api.editpassword(req.body, req.token);
    if (result.data.errorCode === 1003) {
        result.data.errorMsg = "原密码错误";
    }
    res.send(result.data);
});

module.exports = router;