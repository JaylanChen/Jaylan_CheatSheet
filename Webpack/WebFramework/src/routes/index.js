var express = require('express');
var router = express.Router();
var base = require('./base');
var util = require('../utils');


/* GET home page. */
router.get('/', function (req, res, next) {
    var vm = {};
    base.seoInfo(vm, {
        title: '首页'
    });
    util.render(res, 'index', vm);
});
router.get('/index', function (req, res, next) {
    res.redirect('/');
});

module.exports = router;