//
importScripts('../../node_modules/core-js/client/shim.min.js', '../../node_modules/systemjs/dist/system.js', './systemjs.config.js');
//
addEventListener('message', function (e) {
    if (e.data.url) {
        System.import(e.data.url).then(function () {
            postMessage('#ready#');
        });
    }
});
