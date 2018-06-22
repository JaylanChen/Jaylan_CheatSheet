/**
 *
 * (1)这个函数是因为在开发时候的热加载模板文件没有写入文件系统,都在内存中，导致express没法找到试图
 * (2) 还有一些公共数据例如header里面的数据信息和areacode等等都在这个地方做下统一处理
 */
const path = require("path");
const fs = require("fs");
const mkdirp = require("mkdirp");
const compiler = require("../server.webpack").getCompiler();

/**
 * 
 * @param {*} res 响应对象
 * @param {*} template 模板名称
 * @param {*} options 数据
 */
module.exports = function (res, template, options, callback) {

    if (process.env.NODE_ENV === 'local') {
        //缓存文件的全路径
        let filename = path.resolve(compiler.outputPath, `/views/${template}.hbs`);

        compiler.outputFileSystem.readFile(filename, function (err, result) {
            //需要写入的express views的路径
            let fileInfo = path.parse(filename);
            //创建目录
            mkdirp(fileInfo.dir, () => {
                //写入文件
                fs.writeFileSync(filename, result);
                //渲染模板
                res.render(template, options, callback);
            });
        });
    } else {
        //生产环境提前构建了，不用热加载，可以按express视图查找规则来做
        res.render(template, options, callback);
    }
};