import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './styles.css';
//
import * as input from '@grapecity/wijmo.input';
import * as nav from '@grapecity/wijmo.nav';
import { getData } from './data';
// 
document.readyState === 'complete' ? init() : window.onload = init;
//
function init() {
    // create the context menu
    let ctxMenu = new input.Menu('#theMenu', {
        itemClicked: (sender) => alert('thanks for selecting ' + sender.selectedValue)
    });
    //
    // create the tree
    let theTree = new nav.TreeView('#theTree', {
        itemsSource: getData(),
        displayMemberPath: 'header',
        childItemsPath: 'items'
    });
    //
    // attach context menu to tree
    theTree.hostElement.addEventListener('contextmenu', e => {
        e.preventDefault();
        ctxMenu.show(e);
    });
}
