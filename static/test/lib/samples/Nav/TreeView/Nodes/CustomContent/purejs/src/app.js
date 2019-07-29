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
        formatItem: function (s, e) {
            if (e.dataItem.newItem) {
                var imgUrl = 'https://demos.wijmo.com/5/PureJS/TreeViewIntro/TreeViewIntro/resources/new.png';
                e.element.innerHTML +=
                    '<img class="new-icon" src="' + imgUrl + '">';
            }
        }
    });
}
