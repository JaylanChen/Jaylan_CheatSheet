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

+ HMR    热模块替换，提升开发体验
  + 静态文件
  ```
  devServer: {
      contentBase: './dist', // 将dist目录下的文件(index.html)作为可访问文件, 如果不写则默认与webpack.cofig.js的同级目录
      host: '0.0.0.0', // 服务器外部可访问，默认localhost
      port: 8080, // 端口号设为8080, 默认也是8080
      hot: true // 模块热替换
  }
  ```

  + Node
  webpack-hot-middleware && webpack-dev-middleware
  <br>
  1. plugins: 添加插件 new webpack.HotModuleReplacementPlugin()
  2. entry 加上 `webpack-hot-middleware/client?noInfo=true&reload=true` // 还可以添加其他参数
  3. node server 添加中间件
  ```
  var webpack = require('webpack');
  var webpackConfig = require('./webpack.config');
  var compiler = webpack(webpackConfig);
  
  app.use(require("webpack-dev-middleware")(compiler, {
      noInfo: true, publicPath: webpackConfig.output.publicPath
  }));

  app.use(require("webpack-hot-middleware")(compiler));
  ```

## Babel
  + 语法转换，如ES6 转 ES5
  + 通过 Polyfill 方式在目标环境中添加缺失的特性
  + 源码转换，如TypeScript 转 JS
  + ...
  <br>
  [Babel配置](https://babeljs.io/docs/en/config-files#project-wide-configuration)
  babel.config.js
      ```
      module.exports = function (api) {
          api.cache(true);
          return {
              'presets': [],
              'plugins': [ ]
          };
      };
      ```
  常用预配置 presets
  * @babel/preset-env
  * @babel/preset-typescript
  * @babel/preset-react
  ---
  常用配置简介
  - [@babel/preset-env](https://babeljs.io/docs/en/babel-preset-env)  默认转换所有ECMAScript 2015+代码,建议根据项目适当配置
    <details>
    <summary>@babel/preset-env</summary>
    @babel/preset-env 会根据 browserlist 配置进行转换，如果需要兼容比较旧的浏览器，需要手动引入 @babel/polyfill
    
    **option**
    * targets.esmodules:boolean = false
    请注意：在指定 esmodules 目标时，将忽略 browserlists, 即 useBuiltIn 会失效，不转化 es6 语法也不 polyfill
    如果 想用 esmodules 又需要 polyfill ，请组合使用 modules = false , useBuiltIn

    * useBuiltIns = false
    根据 browserlist 是否转换新语法与 polyfill 新 API
        false : 不启用polyfill, 如果 import '@babel/polyfill', 会无视 browserlist 将所有的 polyfill 加载进来
        entry : 启用，需要手动 import '@babel/polyfill', 这样会根据 browserlist 过滤出 需要的 polyfill
        usage : 不需要手动import '@babel/polyfill'(加上也无妨，构造时会去掉), 且会根据 browserlist + 业务代码使用到的新 API 按需进行 polyfill
    * modules = 'commonjs'
    "amd" | "umd" | "systemjs" | "commonjs" | "cjs" | false, defaults to "commonjs".
    转换 es6 模块语法到其他 模块规范， false不会转换
    * include:Array<string|RegExp> = []
    如果你 使用了某个新特性（如es6.array.from），无论browserslist 如何你都想 转化它， 则 include: ['es6.array.from']
    * exclude:Array<string|RegExp> = []
    同理
    * loose = false(推荐)
    loose mode
    优势：代码更加简洁，更容易看懂，可能被老浏览器引擎执行得更快，兼容性更好。
    缺点：当从 编译后的 es6 代码转换成 原生 es6 代码，有可能出现问题。这不值得冒险启用 loose
    多数的 babel plugin 有两种模式，普通模式会将代码编译成尽可能接近 es6 语义，loose 模式则会将代码编译成 es5 风格。
    forceAllTransforms = false
    默认情况下， preset-env 会把根据 browserslist 进行有必要的 transform, 但是你可以强制所有 es6 语法都转换，通常用于 应用只支持 es5 的情况下。 此属性不影响 polyfill。
    * configPath = process.cwd()
    .browserslist(或 package.json->browserslist) 配置所在文件夹，根据此文件夹一直向父文件夹查找，直到找到配置文件
    * ignoreBrowserslistConfig = false
    忽略 .browserslist 配置
    * shippedProposals = false
    是否启用 还在提案中但已经被浏览器正式使用的新特性。如果你要支持的浏览器很新，已经支持了某些提案，可以启用这个选项，避免语法转换。 这个属性和 @babel/preset-stage-3 有所区别，stage-3 新特性在还未正式上线浏览器仍然有可能被修改变更的哦
    </details>
  - @babel/polyfill babel 7.4.0 开始已废弃，等同以下
  ```
  import "core-js/stable";
  import "regenerator-runtime/runtime";
  ```
  - [@babel/plugin-transform-runtime](https://babeljs.io/docs/en/babel-plugin-transform-runtime)  分离辅助函数，提高代码复用性，减少文件体积；避免污染全局作用域（相比@babel/polyfill babel）
    <details>
    <summary>@babel/plugin-transform-runtime</summary>
    <br>
    *@babel/plugin-transform-runtime 不能单独使用，它需要指定 preset 为 es2015，env, typescript 还是 其他，才知道要转换的特性有哪些*
    babel 在每个需要的文件的顶部都会插入一些 helpers 代码，这可能会导致多个文件都会有重复的 helpers 代码。
    @babel/plugin-transform-runtime + @babel/runtime 可以避免编译构建时重复的 helper 代码
  
    此转换器的另一个目的是为您的代码创建沙盒环境。如果您使用@ babel / polyfill及其提供的内置函数（例如Promise，Set和Map），那些将污染全局范围。虽然这可能适用于应用程序或命令行工具，但如果您的代码是您打算发布供其他人使用的库，或者如果您无法准确控制代码运行的环境，则会出现问题。

    适用于不需要修改 全局变量的工具/库，同时，适用这种方法也不会转换实例的方法（如：Array.prototype.includes）

    PS: 为什么 transform-runtime 不会转换实例的方法呢？这是因为，前面讲到的transform-runtime是为代码创建沙盒环境，并不会污染全局，假如要转换'abc'.includes(xxx)，势必会重写 includes，和 transform-runtime 的初衷相悖。

    有人又说了，通过自定义函数transformedIncludes('abc', xxx)不就行咯？要知道，js 是门动态语言，如果存在foo.includes('a')，你根本无法知道这里的 includes 到底是 String.prototype.includes , 还是 Array.prototype.includes，亦或是 自定义对象上的 includes 方法，自然无法 转换

    那么，同样的限制，为啥子 @babel/preset-env 就能 polyfill includes 实例方法的呢？其实很简单粗暴，只要有变量出现 includes 方法, @babel/preset-env 会有杀错没放过，把 es6.string.include 和 es7.array.includes 都加载进来。

    **option**

    * corejs:boolean|number = false | 2
    是否转化 内置函数(如：Promise, Set, Symbol) 或者 静态方法(如：Object.assign, Array.from)
    * regenerator:boolean = true (推荐 true)
    默认情况下回根据 browserslist 来确认是否转化 generator 函数 或 async 函数，如果 @babel/preset-env -> ignoreBrowserslistConfig = true 则都转换 generator 和 async 语法。
    * helpers:boolean = true (推荐true)
    是否将内联的 babel helpers 代码抽离到单独的 module 文件，避免内联的 helper 代码在多个文件重复出现。
    * useESModules:boolean = false (推荐 true)
    启用时将会加载 esModules 规范的 helpers 函数代码，这样webpack构建出来的代码会更小，因为这无需保留commonjs语义。
    </details>

  **PS**:
  `useBuiltIns`和`transform-runtime`[不能同时使用，只能选其一](https://github.com/babel/babel/issues/9882)。
  babel/polyfil一般用于前端项目，@babel/runtime一般用来写插件




