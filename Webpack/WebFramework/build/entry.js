
var hotMiddlewareScript =
process.env.NODE_ENV === "local" ?
"webpack-hot-middleware/client?reload=true" :
null;

module.exports = function (path) {
if (!hotMiddlewareScript) {
  return [path];
} else {
  return [path, hotMiddlewareScript];
}
};