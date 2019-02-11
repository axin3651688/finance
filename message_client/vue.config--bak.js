const path = require('path');
const debug = process.env.NODE_ENV !== 'production';

function resolve(dir) {
  return path.join(__dirname, dir);
}

let proxyObj = { // 配置跨域
  '/api': {
    // target: 'http://192.168.2.224:8005', // 接口 API 地址,
    target: 'http://192.168.1.118:8005', // 接口 API 地址,
    ws: true,
    changOrigin: true,
    pathRewrite: {
      '^/api': '/'
    }
  },
  '/file': {
    // target: 'http://192.168.1.118:8002/api',
    target: 'http://192.168.2.224:8002/api',
    ws: true,
    changOrigin: true,
    pathRewrite: {
      '^/file': '/'
    }
  },
  '/auth': {
    // target: 'http://192.168.2.224:8005/auth',
    target: 'http://192.168.1.118:8005/auth',
    ws: true,
    changOrigin: true,
    pathRewrite: {
      '^/auth': '/'
    }
  },
  '/cnbi': {
    // target: 'http://192.168.1.118:8081', //gjx
    target: 'http://192.168.2.34:8080',
    // target: 'http://192.168.1.138:8000',
    // target: 'http://192.168.2.34:8081',
    // target: 'http://192.168.1.149:8000',

    ws: true,
    changOrigin: true,
    pathRewrite: {
      '^/cnbi': '/'
    }
  },

  '/get': {
    // target: 'http://192.168.2.2:8010',
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
  publicPath: debug ? '/' : './',
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
      entry: 'src/main.js',
      // entry: 'src/views/layout/main.js',
      // 页面的模板文件
      template: 'public/index.html',
      // build 生成的文件名称  例： dist/index.html
      filename: 'index.html'
    }

    // message: {
    //   // 访问路径 localhost:port/message.html
    //   entry: 'src/views/message_page/main.js', // 消息页面的入口文件
    //   template: 'public/message.html', // 页面的模板文件
    //   filename: 'message.html' // build 生成的文件名称  例： dist/message.html
    // }

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
      config.devtool = 'cheap-module-eval-source-map';
      // 生产环境配置
      proxyObj; // string | Object
    } else {
    }
    config.resolve = {
      extensions: ['.js', '.vue', '.json', '.css'],
      alias: {
        'vue$': 'vue/dist/vue.esm.js',
        '@': resolve('src'),
        '@m_api': resolve('src/api'),      // 消息页面的 样式
        '@ms': resolve('src/styles'),      // 消息页面的 样式
        '@ma': resolve('src/assets'),      // 消息页面的 静态资源
        '@mc': resolve('src/components'),  // 消息页面的 公用组件
        '@mp': resolve('src/pages'),       // 消息页面的 页面文件夹
        '@mu': resolve('src/utils')        // 消息页面的 utils
      }
    };
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
  }
};
