(function (global) {
    System.config({
        transpiler: 'plugin-babel',
        babelOptions: {
            es2015: true
        },
        meta: {
            '*.css': { loader: 'css' },
            '*.vue': { loader: 'vue-loader' }
            //'*.vue': { loader: 'systemjs-plugin-vue' }
        },
        paths: {
            // paths serve as alias
            'npm:': 'node_modules/'
        },
        // map tells the System loader where to look for things
        map: {
            'wijmo': 'npm:wijmo',
            'bootstrap.css': 'npm:bootstrap/dist/css/bootstrap.min.css',
            'jszip': 'npm:jszip/dist/jszip.js',
            'css': 'npm:systemjs-plugin-css/css.js',
            'vue': 'npm:vue/dist/vue.min.js',
            'vue-loader': 'npm:systemjs-vue-browser/index.js',
            //'systemjs-plugin-vue': 'npm:systemjs-plugin-vue/index.js',
            'plugin-babel': 'npm:systemjs-plugin-babel/plugin-babel.js',
            'systemjs-babel-build': 'npm:systemjs-plugin-babel/systemjs-babel-browser.js'
        },
        // packages tells the System loader how to load when no filename and/or no extension
        packages: {
            src: {
                defaultExtension: 'js'
            },
            rxjs: {
                defaultExtension: 'js'
              },
            // "node_modules": {
            //     defaultExtension: 'js'
            // },
            wijmo: {
                defaultExtension: 'js',
            }
        }
    });
})(this);
