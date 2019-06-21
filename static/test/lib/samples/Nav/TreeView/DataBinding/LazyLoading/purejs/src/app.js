import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './styles.css';
import * as wjNav from '@grapecity/wijmo.nav';
import { getData } from './data';
//
document.readyState === 'complete' ? init() : window.onload = init;
//
function init() {
    //
    // create the tree
    var tree = new wjNav.TreeView('#theTree', {
        itemsSource: getData(),
        displayMemberPath: 'header',
        childItemsPath: 'items',
        lazyLoadFunction: lazyLoadFunction
    });
    //
    // function used to lazy-load node content
    function lazyLoadFunction(node, callback) {
        setTimeout(function () {
            var result = [
                { header: 'Another lazy node...', items: [] },
                { header: 'A non-lazy node without children' },
                { header: 'A non-lazy node with child nodes', items: [
                        { header: 'hello' },
                        { header: 'world' }
                    ]
                }
            ];
            callback(result); // return result to control
        }, 2500); // 2.5sec http delay
    }
}
