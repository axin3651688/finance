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
            '@grapecity/wijmo': 'npm:@grapecity/wijmo/index.js',
            '@grapecity/wijmo.input': 'npm:@grapecity/wijmo.input/index.js',
            '@grapecity/wijmo.styles': 'npm:@grapecity/wijmo.styles',
            '@grapecity/wijmo.cultures': 'npm:@grapecity/wijmo.cultures',
            '@grapecity/wijmo.chart': 'npm:@grapecity/wijmo.chart/index.js',
            '@grapecity/wijmo.chart.analytics': 'npm:@grapecity/wijmo.chart.analytics/index.js',
            '@grapecity/wijmo.chart.animation': 'npm:@grapecity/wijmo.chart.animation/index.js',
            '@grapecity/wijmo.chart.annotation': 'npm:@grapecity/wijmo.chart.annotation/index.js',
            '@grapecity/wijmo.chart.finance': 'npm:@grapecity/wijmo.chart.finance/index.js',
            '@grapecity/wijmo.chart.finance.analytics': 'npm:@grapecity/wijmo.chart.finance.analytics/index.js',
            '@grapecity/wijmo.chart.hierarchical': 'npm:@grapecity/wijmo.chart.hierarchical/index.js',
            '@grapecity/wijmo.chart.interaction': 'npm:@grapecity/wijmo.chart.interaction/index.js',
            '@grapecity/wijmo.chart.radar': 'npm:@grapecity/wijmo.chart.radar/index.js',
            '@grapecity/wijmo.chart.render': 'npm:@grapecity/wijmo.chart.render/index.js',
            '@grapecity/wijmo.gauge': 'npm:@grapecity/wijmo.gauge/index.js',
            '@grapecity/wijmo.grid': 'npm:@grapecity/wijmo.grid/index.js',
            '@grapecity/wijmo.grid.detail': 'npm:@grapecity/wijmo.grid.detail/index.js',
            '@grapecity/wijmo.grid.filter': 'npm:@grapecity/wijmo.grid.filter/index.js',
            '@grapecity/wijmo.grid.grouppanel': 'npm:@grapecity/wijmo.grid.grouppanel/index.js',
            '@grapecity/wijmo.grid.multirow': 'npm:@grapecity/wijmo.grid.multirow/index.js',
            '@grapecity/wijmo.grid.pdf': 'npm:@grapecity/wijmo.grid.pdf/index.js',
            '@grapecity/wijmo.grid.sheet': 'npm:@grapecity/wijmo.grid.sheet/index.js',
            '@grapecity/wijmo.grid.xlsx': 'npm:@grapecity/wijmo.grid.xlsx/index.js',
            '@grapecity/wijmo.nav': 'npm:@grapecity/wijmo.nav/index.js',
            '@grapecity/wijmo.odata': 'npm:@grapecity/wijmo.odata/index.js',
            '@grapecity/wijmo.olap': 'npm:@grapecity/wijmo.olap/index.js',
            '@grapecity/wijmo.pdf': 'npm:@grapecity/wijmo.pdf/index.js',
            '@grapecity/wijmo.viewer': 'npm:@grapecity/wijmo.viewer/index.js',
            '@grapecity/wijmo.xlsx': 'npm:@grapecity/wijmo.xlsx/index.js',
            "@grapecity/wijmo.vue2.chart.analytics": "npm:@grapecity/wijmo.vue2.chart.analytics/index.js",
            "@grapecity/wijmo.vue2.chart.animation": "npm:@grapecity/wijmo.vue2.chart.animation/index.js",
            "@grapecity/wijmo.vue2.chart.annotation": "npm:@grapecity/wijmo.vue2.chart.annotation/index.js",
            "@grapecity/wijmo.vue2.chart.finance.analytics": "npm:@grapecity/wijmo.vue2.chart.finance.analytics/index.js",
            "@grapecity/wijmo.vue2.chart.finance": "npm:@grapecity/wijmo.vue2.chart.finance/index.js",
            "@grapecity/wijmo.vue2.chart.hierarchical": "npm:@grapecity/wijmo.vue2.chart.hierarchical/index.js",
            "@grapecity/wijmo.vue2.chart.interaction": "npm:@grapecity/wijmo.vue2.chart.interaction/index.js",
            "@grapecity/wijmo.vue2.chart.radar": "npm:@grapecity/wijmo.vue2.chart.radar/index.js",
            "@grapecity/wijmo.vue2.chart": "npm:@grapecity/wijmo.vue2.chart/index.js",
            "@grapecity/wijmo.vue2.core": "npm:@grapecity/wijmo.vue2.core/index.js",
            "@grapecity/wijmo.vue2.gauge": "npm:@grapecity/wijmo.vue2.gauge/index.js",
            "@grapecity/wijmo.vue2.grid.detail": "npm:@grapecity/wijmo.vue2.grid.detail/index.js",
            "@grapecity/wijmo.vue2.grid.filter": "npm:@grapecity/wijmo.vue2.grid.filter/index.js",
            "@grapecity/wijmo.vue2.grid.grouppanel": "npm:@grapecity/wijmo.vue2.grid.grouppanel/index.js",
            "@grapecity/wijmo.vue2.grid.multirow": "npm:@grapecity/wijmo.vue2.grid.multirow/index.js",
            "@grapecity/wijmo.vue2.grid.sheet": "npm:@grapecity/wijmo.vue2.grid.sheet/index.js",
            "@grapecity/wijmo.vue2.grid": "npm:@grapecity/wijmo.vue2.grid/index.js",
            "@grapecity/wijmo.vue2.input": "npm:@grapecity/wijmo.vue2.input/index.js",
            "@grapecity/wijmo.vue2.olap": "npm:@grapecity/wijmo.vue2.olap/index.js",
            "@grapecity/wijmo.vue2.viewer": "npm:@grapecity/wijmo.vue2.viewer/index.js",
            "@grapecity/wijmo.vue2.nav": "npm:@grapecity/wijmo.vue2.nav/index.js",
            "@grapecity/wijmo.vue2.base": "npm:@grapecity/wijmo.vue2.base/index.js",
                    
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
