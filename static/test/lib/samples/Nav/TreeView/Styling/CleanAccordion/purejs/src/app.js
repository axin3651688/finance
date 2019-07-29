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
    // create a list of items with header and detail properties
    var treeData = [];
    var data = getData();
    for (var i = 0; i < data.length; i++) {
        treeData.push({
            header: data[i].name,
            detail: [data[i]]
        });
    }
    //
    // define template for the details
    var itemTemplate = '<div class="item">' +
        '<b>{city}</b> ({state})<br/>' +
        '{address}<br/>' +
        'Phone: <b>{phone}</b><br/>' +
        'Fax: <b>{fax}</b><br/>' +
        'Website: <a href="{site}">{site}</a><br/>' +
        '</div>';
    //
    // generate an Accordion-like TreeView
    var theTree = new wjNav.TreeView('#treeview', {
        displayMemberPath: 'header',
        childItemsPath: 'detail',
        itemsSource: treeData,
        formatItem: function (s, e) {
            switch (e.level) {
                //
                // level 0: wrap header in an H1 tag
                case 0:
                    e.element.innerHTML = '<h1>' + e.dataItem.header + '<h1>';
                    break;
                //
                // level 1: use template to create details
                case 1:
                    var html = wjCore.format(itemTemplate, e.dataItem, function (data, name, fmt, val) {
                        if (wjCore.isString(data[name])) {
                            val = wjCore.escapeHtml(data[name]);
                        }
                        return val;
                    });
                    e.element.innerHTML = html;
                    break;
            }
        }
    });
    //
    // expand selected items, show selection
    theTree.selectedItemChanged.addHandler(function (s, e) {
        var node = theTree.selectedNode;
        if (node && node.parentNode) {
            node = theTree.selectedNode = node.parentNode;
        }
        node.isCollapsed = false;
        document.getElementById('selected').textContent = node.dataItem.header;
    });
    theTree.selectedItem = theTree.itemsSource[0];
    //
    // handle up-arrow key to skip details
    theTree.hostElement.addEventListener('keydown', function (e) {
        var node = null;
        switch (e.keyCode) {
            case wjCore.Key.Up:
                node = theTree.selectedNode.previousSibling();
                break;
            case wjCore.Key.Down:
                node = theTree.selectedNode.nextSibling();
                break;
        }
        if (node) {
            theTree.selectedNode = node;
            e.preventDefault();
        }
    });
}
