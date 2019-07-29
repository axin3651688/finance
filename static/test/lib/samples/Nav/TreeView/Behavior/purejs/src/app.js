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
    var theTree = new wjNav.TreeView('#theTree', {
        itemsSource: getData(),
        displayMemberPath: 'header',
        childItemsPath: 'items'
    });
    theTree.selectedItem = theTree.itemsSource[0];
    // create checkboxes for the main properties
    var props = 'allowDragging,autoCollapse,expandOnClick,isAnimated,isReadOnly,showCheckboxes'.split(','), host = document.getElementById('properties'), tpl = '<label><input id="{prop}" type="checkbox"> {prop}</label>';
    props.forEach(function (prop) {
        var el = wjCore.createElement(tpl.replace(/\{prop\}/g, prop), host);
        el.querySelector('input').checked = theTree[prop];
    });
    host.addEventListener('click', function (e) {
        if (e.target instanceof HTMLInputElement) {
            theTree[e.target.id] = e.target.checked;
        }
    });
    // handle buttons
    document.getElementById('btnCollapse').addEventListener('click', function () {
        theTree.collapseToLevel(0);
    });
    document.getElementById('btnExpand').addEventListener('click', function () {
        theTree.collapseToLevel(100000);
    });
}
