const path = require('path')
const debug = process.env.NODE_ENV !== 'production'
const configView = require("./static/mock/zbfx.json")
const configtest = require("./static/mock/test.json")
const PrefaceData = require("./static/mock/PrefaceData.json")
const Preface = require("./static/mock/Preface.json")
const tableData = require("./static/mock/tableData.json")
// const configtest = require("./static/mock/test.json")
const Risk = require("./static/profit/t.json") // 风险分析
const company1 = require("./static/mock/company.1.json") // 风险分析
const Configtest1 = require("./static/profit/test1.json") // 利润表
const Configtest2 = require("./static/profit/test2.json") // 利润表
const list = require("./static/profit/list.json") // 风险分析列表
// const Report_view = require("./static/profit/Report_view.json")
const operating = require("./static/profit/operating.json") // 操作按钮

function resolve(dir) {
    return path.join(__dirname, dir)
}
let proxyObj = { // 配置跨域
    '/api': {
        target: 'http://192.168.2.2:8005',
        // target: 'http://192.168.1.139:8005',
        ws: true,
        changOrigin: true,
        pathRewrite: {
            '^/api': '/'
        }
    },
    '/cnbi': {
        // target: 'http://192.168.1.118:8081',
        // target: 'https://192.168.1.138:8001/',
        target: 'https://192.168.1.149:8001/',
        ws: true,
        changOrigin: true,
        pathRewrite: {
            '^/cnbi': '/'
        }
    },
    '/get': {
        target: 'http://192.168.1.118:8009',
        ws: true,
        changOrigin: true,
        pathRewrite: {
            '^/get': '/'
        }
    },
    '/echart': {
        target: 'http://www.echartsjs.com',
        ws: true,
        changOrigin: true,
        pathRewrite: {
            '^/echart': '/'
        }
    }
};
module.exports = {
    // baseUrl: debug ? '/' : '/production-sub-path/',
    baseUrl: debug ? '/' : './',
    outputDir: 'dist', // 构建输出目录
    assetsDir: 'assets', // 静态资源目录 (js, css, img, fonts)
    lintOnSave: false, // 是否开启eslint保存检测，有效值：ture | false | 'error'
    runtimeCompiler: true, // 运行时版本是否需要编译
    transpileDependencies: [/\/node_modules\/resize-detector\//], // 默认babel-loader忽略mode_modules，这里可增加例外的依赖包名
    productionSourceMap: false, // 是否在构建生产包时生成 sourceMap 文件，false将提高构建速度
    // css相关配置
    css: {
        // 是否使用css分离插件 ExtractTextPlugin
        extract: false,
        // 开启 CSS source maps?
        sourceMap: true,
        // css预设器配置项
        loaderOptions: {},
        // 启用 CSS modules for all css / pre-processor files.
        modules: false
    },

    // mode: 'production',
    pages: {
        index: {
            // 页面的入口文件
            entry: 'src/views/layout/main.js',
            // entry: 'src/views/green/main.js',
            // 页面的模板文件
            template: 'public/index.html',
            // build 生成的文件名称  例： dist/index.html
            filename: 'index.html'
        },
        // template 默认会去找 public/subpage.html 页面，如果找不到会使用 public/index.html 文件
        // 输出文件会默认的推断为 subpage.html
        // black: 'src/views/layout/main.js',
        // green: 'src/views/green/main.js',
        // white: 'src/views/white/main.js',
    },
    configureWebpack: config => {
        // webpack配置，值位对象时会合并配置，为方法时会改写配置
        if (debug) {
            // 开发环境配置
            config.devtool = 'cheap-module-eval-source-map'
            // 生产环境配置
            proxy: proxyObj; // string | Object
        } else {}
        config.resolve = {
            extensions: ['.js', '.vue', '.json', ".css"],
            alias: {
                'vue$': 'vue/dist/vue.esm.js',
                '@': resolve('src'),
                '@c': resolve('src/components'),
                '@a': resolve('src/assets'), // 配置静态图片引入别名，引用图片时前面加～,在css中引入则加～
                '@s': resolve('src/styles'),
                '~api': resolve('src/api'),
                '@v': resolve('src/views'),
                "utils": resolve('src/utils')
            }
        }
    },

    chainWebpack: config => { // webpack链接API，用于生成和修改webapck配置，https://github.com/vuejs/vue-cli/blob/dev/docs/webpack.md
        if (debug) {
            // 本地开发配置
        } else {
            // 生产开发配置
        }
    },
    parallel: require('os').cpus().length > 1, // 构建时开启多进程处理babel编译
    pluginOptions: { // 第三方插件配置
    },
    pwa: { // 单页插件相关配置 https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-pwa
    },
    devServer: {
        // index: 'black.html', //绿色启动页面
        // index: 'green.html', //绿色启动页面
        // index: 'white.html', //白色启动页面
        open: false,
        host: '0.0.0.0',
        port: 8089,
        https: false,
        hotOnly: false,
        // proxy: 'http://localhost:8081/api/', // 配置跨域处理,只有一个代理
        proxy: proxyObj, // string | Object
        // 自定义加载数据
        before: app => {
            app.get('/api/qwe', (req, res) => {
                    res.json(configView)
                }),
                app.get('/apis/PrefaceData', (req, res) => {
                    res.json(PrefaceData)
                }),
                app.get('/apis/Preface', (req, res) => {
                    res.json(Preface)
                }),
                app.get('/apis/tableData', (req, res) => {
                    res.json(tableData)
                }),
                app.get('/apis/test', (req, res) => {
                    res.json(configtest)
                }),
                app.get('/api/Risk', (req, res) => {
                    res.json(Risk)
                }),
                app.get('/api/company1', (req, res) => {
                    res.json(company1)
                }),
                app.get('/apis/Configtest1', (req, res) => {
                    res.json(Configtest1)
                }),
                app.get('/apis/Configtest2', (req, res) => {
                    res.json(Configtest2)
                }),

                app.get('/api/list', (req, res) => {
                    res.json(list)
                }),
                // app.get('/api/Report_view', (req, res) => {
                //     res.json(Report_view)
                // }),
                app.get('/api/operating', (req, res) => {
                    res.json(operating)
                })
        },
        // vue-cli 解决Invalid Host header,
        // compress: true,
        disableHostCheck: true, // That solved it
    }
}