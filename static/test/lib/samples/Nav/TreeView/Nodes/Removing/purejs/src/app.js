import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './styles.css';
import * as wjNav from '@grapecity/wijmo.nav';
import * as wjCore from '@grapecity/wijmo';
import { getData } from './data';
//
document.readyState === 'complete' ? init() : window.onload = init;
//
function init() {
    //
    // create the tree
    var theTree = new wjNav.TreeView('#theTree', {
        itemsSource: getData(),
        displayMemberPath: 'header',
        childItemsPath: 'items',
        //
        // update button state
        selectedItemChanged: function (s, e) {
            var btn = document.getElementById('btnRemove');
            wjCore.setAttribute(btn, 'disabled', theTree.selectedItem ? null : 'disabled');
        }
    });
    theTree.selectedItem = theTree.itemsSource[0];
    //
    // handle buttons
    document.getElementById('btnRemove').addEventListener('click', function () {
        if (theTree.selectedItem) {
            //
            // find the array that contains the item to be removed
            var parent = theTree.selectedNode.parentNode;
            var arr = parent
                ? parent.dataItem[theTree.childItemsPath]
                : theTree.itemsSource;
            //
            // remove the item from the parent collection
            var index = arr.indexOf(theTree.selectedItem);
            arr.splice(index, 1);
            //
            // refresh the tree
            theTree.loadTree();
        }
    });
}
