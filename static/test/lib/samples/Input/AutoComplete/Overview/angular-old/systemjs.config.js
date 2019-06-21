(function (global) {
    System.config({
        transpiler: 'ts',
        typescriptOptions: {
            tsconfig: true
            // "target": "es5",
            // "module": "commonjs",
            // "moduleResolution": "node",
            // "sourceMap": true,
            // "emitDecoratorMetadata": true,
            // "experimentalDecorators": true,
            // "removeComments": true,
            // "noImplicitAny": true,
            // "suppressImplicitAnyIndexErrors": true
        },
        meta: {
            'typescript': {
              "exports": "ts"
            },
            '*.css': { loader: 'css' }
        },
        paths: {
            // paths serve as alias
            'npm:': 'node_modules/'
        },
        // map tells the System loader where to look for things
        map: {
            'core-js': 'npm:core-js/client/shim.min.js',
            'zone': 'npm:zone.js/dist/zone.min.js',
            'reflect-metadata': 'npm:reflect-metadata/Reflect.js',
            //'rxjs': 'npm:rxjs/bundles/rxjs.umd.min.js',
            'rxjs': 'npm:rxjs',
            '@angular/core': 'npm:@angular/core/bundles/core.umd.js',
            '@angular/common': 'npm:@angular/common/bundles/common.umd.js',
            '@angular/compiler': 'npm:@angular/compiler/bundles/compiler.umd.js',
            '@angular/platform-browser': 'npm:@angular/platform-browser/bundles/platform-browser.umd.js',
            '@angular/platform-browser-dynamic': 'npm:@angular/platform-browser-dynamic/bundles/platform-browser-dynamic.umd.js',
            '@angular/http': 'npm:@angular/http/bundles/http.umd.js',
            '@angular/common/http': 'npm:@angular/common/bundles/common-http.umd.js',
            '@angular/router': 'npm:@angular/router/bundles/router.umd.js',
            '@angular/forms': 'npm:@angular/forms/bundles/forms.umd.js',
            'wijmo': 'npm:wijmo',
            'bootstrap.css': 'npm:bootstrap/dist/css/bootstrap.min.css',
            'jszip': 'npm:jszip/dist/jszip.js',
            'typescript': 'npm:typescript/lib/typescript.js',
            'ts': 'npm:plugin-typescript/lib/plugin.js',
            'css': 'npm:systemjs-plugin-css/css.js'
        },
        // packages tells the System loader how to load when no filename and/or no extension
        packages: {
            src: {
                defaultExtension: 'ts'
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
