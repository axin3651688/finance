import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './styles.css';
import * as wjCore from '@grapecity/wijmo';
import * as wjNav from '@grapecity/wijmo.nav';
import { getData } from './data';
// 
document.readyState === 'complete' ? init() : window.onload = init;
//
function init() {
    // create the tree
    var tree = new wjNav.TreeView('#theTree', {
        itemsSource: getData(),
        displayMemberPath: 'header',
        childItemsPath: 'items',
        itemClicked: function (s, e) {
            var msg = document.getElementById('msg');
            msg.innerHTML = wjCore.format('Navigating to <b>** {header} **</b>', s.selectedItem);
        }
    });
}
