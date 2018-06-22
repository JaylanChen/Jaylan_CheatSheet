const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const exphbs = require("express-handlebars");
const express = require("express");
const util = require('./utils')
const routes = require('./routes/routes');
const config = require('../config')
const base = require('./routes/base');

function addExpressMidlleware(app) {
  // view engine setup
  var hbs = exphbs.create({
    extname: ".hbs",
    defaultLayout: "layout",
    layoutsDir: "./assets/views/layout/",
    partialsDir: "./assets/views/layout/",
    helpers: util.handlebarsHelpers
  });

  app.set("views", util.path.join(__dirname, "../assets/views"));
  app.engine("hbs", hbs.engine);
  app.set("view engine", "hbs");

  //uncomment after placing your favicon in /public
  // app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
  util.log.useLogger(app);
  // app.use(logger("dev"));
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({
    extended: false
  }));
  app.use(cookieParser());

  //TODO::这个地方的开发时候的静态目录还是不对
  if (process.env.NODE_ENV !== 'local') {
    app.use(express.static(util.path.join(__dirname, "../assets")));
  } else {
    app.use(express.static(util.path.join(__dirname, "client")));
    app.use(express.static(util.path.join(__dirname, "../assets")));
  }

  routes(app);

  //catch 404 and forward to error handler
  app.use(function (req, res, next) {
    var err = new Error("Not Found");
    err.status = 404;
    next(err);
  });

  // error handler
  app.use(function (err, req, res, next) {
    if (err.status == 401) {
      util.log.getLogger().error('401 url:' + req.url + ' ErrorMsg:' + err.message);
      res.redirect('/user/logout');
    } else if (err.status == 404) {
      util.log.getLogger().error('404 url:' + req.url);
      if (req.xhr) {
        return res.json({
          "errorCode": 404,
          "errorMsg": "Not Found",
          "httpStatusCode": 404,
          "instance": null,
          "success": false
        })
      }
      var vm = {};
      base.seoInfo(vm, {
        title: 'Not Found'
      });
      res.status(404);
      util.render(res, "404", vm);
    } else {
      util.log.getLogger().error('url:' + req.url + ' error:' + err.message, err);
      // render the error page
      if (req.xhr) {
        return res.json({
          "errorCode": 500,
          "errorMsg": "服务器错误",
          "httpStatusCode": 500,
          "instance": null,
          "success": false
        });
      }
      var vm = {};
      base.seoInfo(vm, {
        title: '错误'
      });
      res.status(500);
      util.render(res, "500", vm);
    }
  });
}

module.exports = {
  addExpressMidlleware: addExpressMidlleware
};