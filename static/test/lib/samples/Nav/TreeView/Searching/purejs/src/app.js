import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './styles.css';
import * as wjInput from '@grapecity/wijmo.input';
import * as wjNav from '@grapecity/wijmo.nav';
import { getData } from './data';
// 
document.readyState === 'complete' ? init() : window.onload = init;
//
class searchItem {
}
function getSearchList(items, searchList, path) {
    // set defaults
    if (searchList == null)
        searchList = [];
    if (path == null)
        path = '';
    // add items and sub-items
    for (var i = 0; i < items.length; i++) {
        var item = items[i];
        searchList.push({
            item: item,
            path: path + item.header,
            keywords: item.keywords
        });
        if (item.items) {
            getSearchList(item.items, searchList, path + item.header + ' / ');
        }
    }
    return searchList;
}
//
function init() {
    // create the tree
    var tree = new wjNav.TreeView('#theTree', {
        itemsSource: getData(),
        displayMemberPath: 'header',
        childItemsPath: 'items',
    });
    // create the search AutoComplete
    var search = new wjInput.AutoComplete('#search', {
        itemsSource: getSearchList(tree.itemsSource),
        selectedIndex: -1,
        displayMemberPath: 'path',
        searchMemberPath: 'keywords',
        selectedIndexChanged: function (s) {
            if (s.selectedItem) {
                tree.selectedItem = s.selectedItem.item;
            }
        }
    });
}
