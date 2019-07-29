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
        childItemsPath: 'items',
        showCheckboxes: true,
        //
        // show checked items below the tree
        checkedItemsChanged: function (s, e) {
            var items = s.checkedItems, msg = '';
            if (items.length) {
                msg = '<p><b>Checked Items:</b></p><ol>\r\n';
                for (var i = 0; i < items.length; i++) {
                    msg += '<li>' + items[i].header + '</li>\r\n';
                }
                msg += '</ol>';
            }
            document.getElementById('tvChkStatus').innerHTML = msg;
        }
    });
    var checkedItems;
    //
    // handle buttons
    document.getElementById('btnCheckAll').addEventListener('click', function (e) {
        tree.checkAllItems(true);
    });
    document.getElementById('btnUncheckAll').addEventListener('click', function (e) {
        tree.checkAllItems(false);
    });
    document.getElementById('btnSaveState').addEventListener('click', function (e) {
        checkedItems = tree.checkedItems || [];
    });
    document.getElementById('btnRestoreState').addEventListener('click', function (e) {
        tree.checkedItems = checkedItems;
    });
}
