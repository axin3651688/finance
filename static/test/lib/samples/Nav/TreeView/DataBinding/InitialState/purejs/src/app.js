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
    // create the default tree
    let theTree = new wjNav.TreeView('#theTree', {
        itemsSource: getData()
    });
    //
    // create a tree and select an item when it loads
    let theTreeSelected = new wjNav.TreeView('#theTreeSelected', {
        itemsSource: getData(),
        loadedItems: (s) => {
            s.selectedItem = findItem(s.itemsSource, 'Solar Panel');
        }
    });
    //
    // create a tree and collapse it to a given level when it loads
    let theTreeCollapsed = new wjNav.TreeView('#theTreeCollapsed', {
        itemsSource: getData(),
        loadedItems: (s) => {
            s.collapseToLevel(0);
        }
    });
    let theTreeExpanded = new wjNav.TreeView('#theTreeExpanded', {
        itemsSource: getData(),
        loadedItems: (s) => {
            s.collapseToLevel(10);
        }
    });
    //
    // finds an item in a hierarchical array
    function findItem(arr, text) {
        for (let i = 0; arr && i < arr.length; i++) {
            if (arr[i].header.indexOf(text) > -1) {
                return arr[i];
            }
            //
            let item = findItem(arr[i].items, text);
            if (item) {
                return item;
            }
        }
        return null;
    }
}
