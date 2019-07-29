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
    var tree = new wjNav.TreeView('#theTree', {
        itemsSource: getData(),
        displayMemberPath: 'header',
        childItemsPath: 'items',
        selectedItemChanged: function (s, e) {
            var msg = wjCore.format('You selected item <b>{header}</b>.', s.selectedItem);
            document.getElementById('selection').innerHTML = msg;
        },
        itemClicked: function (s, e) {
            var msg = wjCore.format('You clicked item <b>{header}</b>.', s.selectedItem);
            document.getElementById('click').innerHTML = msg;
        }
    });
}
