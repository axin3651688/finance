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
        childItemsPath: 'items'
    });
    //
    // find a node to show
    var theItem = findItem(tree.itemsSource, 'Work Table');
    var theNode = tree.getNode(theItem);
    //
    // show or select the node when the user clicks the button
    document.getElementById('btnShow').addEventListener('click', function () {
        theNode.ensureVisible();
    });
    document.getElementById('btnSelect').addEventListener('click', function () {
        theNode.select();
    });
    //
    // utilities
    function findItem(items, text) {
        var node = null;
        for (var i = 0; i < items.length; i++) {
            var item = items[i];
            if (item.header == text) {
                return item;
            }
            if (item.items) {
                item = findItem(item.items, text);
                if (item) {
                    return item;
                }
            }
        }
        return null; //  not found
    }
}
