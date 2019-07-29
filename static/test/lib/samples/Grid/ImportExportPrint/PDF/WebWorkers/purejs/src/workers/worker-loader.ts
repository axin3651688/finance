// ES5 only!
declare var System: any;
declare function importScripts(...scripts: string[]): void;
declare function postMessage(message: any, transfer?: Transferable[]): void;
//
importScripts('../../node_modules/systemjs/dist/system.src.js', './systemjs.config.js');
//
addEventListener('message', function(e) {
    if (e.data.url) {
        System.import(e.data.url).then(function () {
            postMessage('#ready#');
        });
    }
});