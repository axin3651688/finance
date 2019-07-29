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
    var theTree = new wjNav.TreeView('#theTree', {
        itemsSource: getData(),
        displayMemberPath: 'header',
        childItemsPath: 'items'
    });
    theTree.selectedItem = theTree.itemsSource[0];
    //
    // handle buttons
    document.getElementById('btnFirst').addEventListener('click', function () {
        var newItem = { header: document.getElementById('theInput').value }, node = theTree.selectedNode;
        if (node) {
            theTree.selectedNode = node.addChildNode(0, newItem);
        }
        else {
            theTree.selectedNode = theTree.addChildNode(0, newItem);
        }
    });
    document.getElementById('btnLast').addEventListener('click', function () {
        var newItem = { header: document.getElementById('theInput').value }, node = theTree.selectedNode;
        if (node) {
            var index = node.nodes ? node.nodes.length : 0;
            theTree.selectedNode = node.addChildNode(index, newItem);
        }
        else {
            var index = theTree.nodes ? theTree.nodes.length : 0;
            theTree.selectedNode = theTree.addChildNode(index, newItem);
        }
    });
    document.getElementById('btnNoSel').addEventListener('click', function () {
        theTree.selectedNode = null;
    });
}
