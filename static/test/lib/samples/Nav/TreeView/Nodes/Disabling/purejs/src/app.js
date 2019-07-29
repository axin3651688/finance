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
    document.getElementById('btnDisableNode').addEventListener('click', function (e) {
        var nd = tree.selectedNode;
        if (nd) {
            nd.isDisabled = true;
        }
    });
    document.getElementById('btnEnableAllNodes').addEventListener('click', function (e) {
        for (var nd = tree.getFirstNode(); nd; nd = nd.next()) {
            nd.isDisabled = false;
        }
    });
}
