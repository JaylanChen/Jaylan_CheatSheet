const render = require('./render')
const handlebars = require('./handlebars')
const aes = require('./aes')
const axios = require('axios')
const path = require('path')
const fs = require('fs')
const handlebarsHelpers = require('./hbs.helpers')
const express = require("express");
const log = require('./log');
const authentication = require('./authentication');

module.exports = {
    render,
    handlebars,
    aes,
    axios,
    path,
    fs,
    handlebarsHelpers,
    express,
    log,
    authentication,
    Router: function () {
        return express.Router();
    }
}