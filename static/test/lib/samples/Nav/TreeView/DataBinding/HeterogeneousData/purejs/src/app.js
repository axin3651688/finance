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
        displayMemberPath: 'continent,country,city'.split(','),
        childItemsPath: 'countries,cities'.split(',')
    });
    //
}
