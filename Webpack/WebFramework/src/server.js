#!/usr/bin/env node

/**
 * 模块依赖
 */
const config = require('../config')
const serverWebpack = require("./server.webpack");
var debug = require("debug")("server:server");
var reload = require("reload");
var http = require("http");
var express = require("express");
//添加async error的支持
require('express-async-errors')
var path = require("path");
const serverExpress = require("./server.express");

var app = express();
/**
 * 获取监听端口
 */
var port = normalizePort(process.env.PORT || config.build.mainPort);
app.set("port", port);

serverWebpack.addWebpackDevMiddleware(app);

/**
 * 创建http server
 */
var server = http.createServer(app);
reload(app, {
    port: config.build.reloadPort
});
serverWebpack.addHotMiddlewareLayoutGen(app, ['layout', 'header', 'footer', "components/partial"]);
serverExpress.addExpressMidlleware(app);

/**
 * 监听端口
 */

server.listen(port);
server.on("error", onError);
server.on("listening", onListening);

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
    var port = parseInt(val, 10);

    if (isNaN(port)) {
        // named pipe
        return val;
    }

    if (port >= 0) {
        // port number
        return port;
    }

    return false;
}

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
    if (error.syscall !== "listen") {
        throw error;
    }

    var bind = typeof port === "string" ? "Pipe " + port : "Port " + port;

    // handle specific listen errors with friendly messages
    switch (error.code) {
        case "EACCES":
            console.error(bind + " requires elevated privileges");
            process.exit(1);
            break;
        case "EADDRINUSE":
            console.error(bind + " is already in use");
            process.exit(1);
            break;
        default:
            throw error;
    }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
    var addr = server.address();
    var bind = typeof addr === "string" ? "pipe " + addr : "port " + addr.port;
    debug("Listening on " + bind);
}