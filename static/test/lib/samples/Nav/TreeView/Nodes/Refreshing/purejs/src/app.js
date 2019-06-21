import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './styles.css';
//
import * as wjNav from '@grapecity/wijmo.nav';
import { getData } from './data';
//
document.readyState === 'complete' ? init() : window.onload = init;
//
function init() {
    // create the tree
    let theTree = new wjNav.TreeView('#theTree', {
        itemsSource: getData(),
        displayMemberPath: 'header',
        childItemsPath: 'items'
    });
    theTree.selectedItem = theTree.itemsSource[0];
    //
    // refresh the node with new data
    document.getElementById('btnItemData').addEventListener('click', () => {
        theTree.selectedNode.refresh({
            header: 'given itemData ' + Date.now(),
            items: [
                { header: 'first child' },
                { header: 'second child' }
            ]
        });
    });
    //
    // update the data, refresh the node
    document.getElementById('btnItemsSource').addEventListener('click', () => {
        let node = theTree.selectedNode, arr = node.itemsSource;
        //
        arr[node.index] = {
            header: 'updated itemData ' + Date.now(),
            items: [
                { header: 'first child' },
                { header: 'second child' }
            ]
        };
        //
        node.refresh();
    });
    //
    // re-load the whole tree
    document.getElementById('btnReload').addEventListener('click', () => {
        theTree.loadTree(true);
        theTree.selectedItem = theTree.itemsSource[0];
    });
}
