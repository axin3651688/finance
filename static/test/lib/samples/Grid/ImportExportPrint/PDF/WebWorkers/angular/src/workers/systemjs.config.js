(function (global) {
    System.config({
        transpiler: 'ts',
        typescriptOptions: {
            //tsconfig: true
            allowJs: true,
            target: 'ES5',
            module: 'system'
        },
        meta: {
            'typescript': {
              "exports": "ts"
            },
            '*.css': { loader: 'css' }
        },
        paths: {
            // paths serve as alias
            'npm:': '../../node_modules/'
        },
        // map tells the System loader where to look for things
        map: {
            'jszip': 'npm:jszip/dist/jszip.js',
            '@grapecity/wijmo': 'npm:@grapecity/wijmo/index.js',
            '@grapecity/wijmo.input': 'npm:@grapecity/wijmo.input/index.js',
            '@grapecity/wijmo.styles': 'npm:@grapecity/wijmo.styles',
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
            'bootstrap.css': 'npm:bootstrap/dist/css/bootstrap.min.css',
            'typescript': 'npm:typescript/lib/typescript.js',
            'ts': 'npm:plugin-typescript/lib/plugin.js',
            'css': 'npm:systemjs-plugin-css/css.js',
            'xmldom': 'npm:xmldom/dom-parser.js'
        },
        // packages tells the System loader how to load when no filename and/or no extension
        packages: {
            '../../node_modules': {
                defaultExtension: 'js'
            },
            './': {
                defaultExtension: 'ts'
            }
        }
    });
})(this);
