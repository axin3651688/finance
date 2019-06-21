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
        isContentHtml: true,
    });
    //
    // toggle accordion style
    document.getElementById('customCss').addEventListener('click', function (e) {
        wjCore.toggleClass(tree.hostElement, 'accordion', e.target.checked);
    });
    //
    // handle clicks on accordion items
    tree.hostElement.addEventListener('click', function (e) {
        if (e.target.tagName == 'A') {
            var msg = document.getElementById('msg');
            msg.innerHTML = wjCore.format('Navigating to <b>** {href} **</b>', e.target);
            e.preventDefault();
        }
    });
}
