var index = require('./index')
var users = require('./users')

module.exports = function(app) {
    app.use("/users", users);
    app.use("/", index);
}