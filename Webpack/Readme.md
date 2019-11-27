---
tags: [Import-c13b]
title: Webpack
created: '2019-10-29T03:00:39.557Z'
modified: '2019-11-27T07:53:11.062Z'
---

# Webpack

## 概述

1. Webpack是什么？
+ 开源前端打包工具

2. 为什么要用webpack？
+ 模块化开发(import,require)
+ 预处理（TS,ES6,scss,less...）
+ 减少页面的http请求次数，提升页面速度
+ 主流框架支持（Angular,React,Vue...）
+ 文档丰富，插件丰富...

3. 简单使用
`webpack <entry> <output>`
```
const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'bundle.js'
  }
}
```

## 核心概念
+ Entry     入口
+ Output    输出
+ Loader    模块转换器
+ Plugins   插件
+ Mode      模式

1. [entry](https://www.webpackjs.com/concepts/entry-points/)
    模块化打包，就有指定对应的入口文件，从入口文件寻找树形依赖关系。
    默认值： `src/index.js`
    entry参数类型：
    + 单个文件 string
    会把所有具有依赖关系的模块打包生成一个文件;
    ```
    module.exports = {
        entry: 'src/index.js'
    }
    ```
    + 多个文件 array
    还是打包生成一个文件，webpack 会把这些文件合并在一起，会按照数组内文件的顺序依次执行;
    ```
    module.exports = {
        entry: ['src/index.js', 'src/account.js']
    }
    ```
    + 对象 object
    根据对象key的个数，打包出对应数量的文件，**适合多页面应用**;
    ```
    module.exports = {
        entry: {
            login: 'src/index.js',
            logout: 'src/account.js',
        }
    }
    ```

2. [output](https://www.webpackjs.com/concepts/output/)
    用来指定打包后输出文件存放位置
    默认值：`dist/main.js`
    ```
    output: {
        filename: '[name].bundle.js',
        path: __dirname + '/dist',
        publicPath: '/'
    },
    ```
    + filename: 打包后的文件名称，5个可选配置参数：
    [name]模块名称，对应 entry 中的 key 值，如果 entry 传入的是 string 或 array 默认为 main；
    [id]模块id，由 webpack 生成；
    [hash]模块的 hash 值，当有文件修改时，这个值就会重新计算并改变；
    [chunkhash]webpack中每打包生成一个文件，就叫一个chunk ，它是 chunk 本身的 hash 
    [contenthash]生成文件内容的hash，**通常用它来做文件缓存**
    + path：文件存放位置，**绝对路径**
    + publicPath：资源路径前缀，如：CDN地址，或者静态文件夹
3. [mode](https://www.webpackjs.com/concepts/mode/)
    模式，配置webpack 使用相应模式的内置优化。`production`、`development`、`none`
    
    选项|描述
    |:--:|:--|
    development|会将 process.env.NODE_ENV 的值设为 development。<br>启用 NamedChunksPlugin 和 NamedModulesPlugin。
    production|会将 process.env.NODE_ENV 的值设为 production。<br>启用 FlagDependencyUsagePlugin, FlagIncludedChunksPlugin, ModuleConcatenationPlugin, NoEmitOnErrorsPlugin, OccurrenceOrderPlugin, SideEffectsFlagPlugin 和 UglifyJsPlugin.

4. [loader](https://www.webpackjs.com/concepts/loaders/)
    把其他类型的代码转换成JavaScript模块
    + style-loader
    + css-loader
    + postcss-loader
    + less-loader
    + sass-loader     sass-loader / less-loader → postcss-loader → css-loader →style-loader
    + file-loader			解析引用的资源文件，并拷贝至输出目录
    + url-loader 			对file-loader的封装，可以base64处理图片等
    + html-loader		  处理html模板
    + babel-loader		处理js
    + ts-loader		  	处理typescript

    [更多loader](https://www.webpackjs.com/loaders/)

    <br>
    <details>
    <summary>loader示例代码：</summary>
    <code>
    module.exports = {
        entry,
        output,
        module: {
            rules: [{
                test: /\.js$/,
                use: [{
                    loader: 'babel-loader?cacheDirectory=true',
                }],
                // include: [ ],
                // exclude: []
            },
            {
                test: /\.css$/,
                use: [{
                    loader: MiniCssExtractPlugin.loader,
                    options: {
                        hmr: isLocal,
                    }
                }, {
                    loader: "css-loader"
                }]
            },
            {
                test: /\.s[ac]ss$/i,
                use: [{
                    loader: MiniCssExtractPlugin.loader,
                    options: {
                        hmr: isLocal,
                    }
                }, {
                    loader: "css-loader"
                }, {
                    loader: "sass-loader"
                }]
            },
            {
                test: /\.(png|svg|jpg|gif|jpeg)$/,
                use: {
                    loader: 'url-loader',
                    options: {
                        limit: 8192,
                        name: "images/[name]-[hash:8].[ext]",
                        publicPath: '',
                        content: projectRootPath
                    }
                }
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf|svg)$/,
                use: {
                    loader: 'url-loader',
                    options: {
                        limit: 8192,
                        name: "css/font/[name]-[hash:8].[ext]",
                        content: projectRootPath
                    }
                }
            }]
        },
    }
    </code>
    </details>
    <br>

    - test: 正则表达式，用来匹配文件的扩展名。可以是字符串、数组、甚至被 loader 这个选项代替，其实这都是简写。
            rules.loader 和loader.options 是 rules.use: [ {loader, options} ] 的简写。
    - use: 对匹配出的文件使用的 loader 配置，如上面所说，该选项配置灵活，可以简写
    - loader: loader 名称
    - options: loader 的额外配置选项
    - include / exclude: 包括 或 排除 的文件夹，两个选项只能同时出现一个

5. [plugins](https://www.webpackjs.com/concepts/plugins/)
    在打包过程中对所有模块进行特定的操作，解决 loader 无法实现的其他事。
    + html-webpack-plugin						        把打包后的js和css插入到页面中
    + mini-css-extract-plugin						    从打包的js中分离css
    + optimize-css-assets-webpack-plugin		压缩css
    + uglifyjs-webpack-plugin					      压缩js
    + copy-webpack-plugin						        拷贝静态资源
    + clean-webpack-plugin						      清理输出目录
    + DefinePlugin								          定义全局变量
    + DllPlugin									            分离打包，加快构建
    + progress-bar-webpack-plugin           展示构建进度

    [更多插件](https://www.webpackjs.com/plugins/)

    <details>
    <summary>plugins示例代码：</summary>
    <code>
    module.exports = {
        entry,
        output,
        module,
        plugins: [
            new webpack.ProgressPlugin(),
            new CleanWebpackPlugin({
                root: __dirname
            }),
            new HtmlWebpackPlugin({
                inject: false,
                cache: true,
                filename: 'index.html',
                template: 'src/index.html',
                chunks: ['index']
            }),
            new MiniCssExtractPlugin({
                filename: isLocal ? 'css/[name].css' : 'css/[name]-[contenthash:8].css',
                chunkFilename: isLocal ? 'css/[id].css' : 'css/[name]-[contenthash:8].css'
            }),
            new CopyWebpackPlugin([{
                from: path.resolve(projectRootPath, 'client', 'views', 'layout'),
                to: path.resolve(projectRootPath, 'dist', 'views', 'layout'),
                force: true
            }, {
                from: path.resolve(projectRootPath, 'client', 'images'),
                to: path.resolve(projectRootPath, 'dist', 'images'),
                force: true
            }
            ])
        ],
    }
    </code>
    </details>

## webpack优化
+ tree shaking    使用es6的import/export语法，去除多余代码
    package.json
    `"sideEffects": false,`

+ splitChunk      分离代码
    ```
    module.exports = {
        entry,
        output,
        optimization: {
            splitChunks: {
                cacheGroups: {
                    vendors: {
                        name: `chunk-vendors`,
                        test: /[\\/]node_modules[\\/]/,
                        priority: -10,
                        chunks: 'initial'
                    },
                    vue: {
                        name: 'chuank-vue',
                        test: /[\\/]node_modules[\\/]vue[\\/]/,
                        priority: 10,
                        chunks: 'initial'
                    },
                    common: {
                        name: `chunk-common`,
                        minChunks: 2, // 依赖超过两次
                        priority: -20,
                        chunks: 'initial',
                        reuseExistingChunk: true
                    }
                }
            }
        }
    }
    ```
    * name：分离后打包出的文件名称。我们设置为 chunk-vendors ，那么分离打包出来的文件就叫 chunk-vendors.js 。
    * test：用于匹配的文件位置，test: /[\\/]node_modules[\\/]/ 表示所有来自 node_modules 下面的代码，可以填写具体的路径
    * **priority：权重，这个值还是很重要的，webpack 会优先分离权重高的 cacheGroups 。**
    * chunks：作用范围，可以设置为 async 表示对异步模块起作用， initial 表示对初始模块起作用， all 则表示对所有模块起作用。

    webpack 打包后，也会生成一些在运行时所必须的代码，这些代码默认会打包进主文件中，也可以将它分离单独打，这需要在optimization.runtimeChunk 中配置：
    ```
    module.exports = {
        entry,
        output,
        optimization: {
            runtimeChunk: {
                name: 'manifest'
            }
        }
    }
    ```
    可借助 `webpack-bundle-analyzer` 来分析打包后的chunk大小，然后再进行拆分

+ UglifyJsPlugin 压缩js 、 optimize-css-assets-webpack-plugin 压缩css

+ externals    「从输出的 bundle 中排除依赖」，指定第三方库不参与打包，需要单独引用

+ devtool    配置合适的source-map，加快构建速度
    建议：
    development： cheap-module-eval-source-map
    production： none


+ resolve       配置webpack怎么去查找文件
    * resolve.modules：告诉webpack去哪些目录下寻找第三方模块，默认值为['node_modules']，配置好node_modules路径避免层层查找，如：[path.resolve(__dirname, 'node_modules')]
    * resolve.mainFields：设置尽量少的值可以减少入口文件的搜索步骤
    * resolve.alias：建议对庞大的第三方模块设置，使webpack直接使用库的min文件，避免库内解析
    * resolve.extensions：默认值：`extensions:['.js', '.json']`, 合理设置，减少文件查找；1.尽可能少 2.高频文件后缀靠前 3.导入语句尽可能写上文件后缀

+ module.noParse
    告诉Webpack不必解析哪些文件，可以用来排除对非模块化库文件的解析, 如jQuery，已经构建好，非模块的文件；
    module:{ noParse:[/jquery|chartjs/, /react\.min\.js$/] }
    
+ 配置loader时，通过test、exclude、include缩小搜索范围

+ DllPlugin && DllReferencePlugin
    减少基础模块编译次数；一些基础的第三方包，这些包升级，只需要打包编译一次，而不用次次参与打包，加快构建速度
    单独创建一个webpack_dll.config.js来构建dll文件：
    ```
    // webpack_dll.config.js
    const path = require('path');
    const DllPlugin = require('webpack/lib/DllPlugin');
    module.exports = {
        entry: {
            polyfill: ['core-js/fn/promise']
        },
        output: {
            filename: '[name].dll.js',
            path: path.resolve(__dirname, 'dist'),
            library: '_dll_[name]',  //dll的全局变量名
        },
        plugins: [
            new DllPlugin({
                name: '_dll_[name]',  //dll的全局变量名
                path: path.join(__dirname, 'dist', '[name].manifest.json'),//描述生成的manifest文件
            })
        ]
    }
    ```
    生成的文件
    |-- polyfill.dll.js
    |-- polyfill.manifest.json

    需要注意DllPlugin的参数中name值必须和output.library值保持一致，并且生成的manifest文件中会引用output.library值。
    其中xx.dll.js包含打包的n多模块，这些模块存在一个数组里，并以数组索引作为ID，通过一个变量假设为_xx_dll暴露在全局中，可以通过window._xx_dll访问这些模块。xx.manifest.json文件描述dll文件包含哪些模块、每个模块的路径和ID。

    在主config文件里使用DllReferencePlugin插件引入xx.manifest.json文件：
    ```
    //webpack.config.json
    const DllReferencePlugin = require('webpack/lib/DllReferencePlugin');
    module.exports = {
        entry,
        //... 省略output、loader等的配置
        plugins:[
            new DllReferenctPlugin({
                manifest:require('./dist/polyfill.manifest.json')
            })
        ]
    }
    ```

    *AutoDllPlugin*： 自动将DLL包添加到自己的HTML中，依赖HtmlWebpackPlugin插件

  

