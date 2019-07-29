import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './styles.css';
//
import * as wjNav from '@grapecity/wijmo.nav';
import * as wjCore from '@grapecity/wijmo';
import { getData } from './data';
//
document.readyState === 'complete' ? init() : window.onload = init;
//
function init() {
    // create the tree
    var theTree = new wjNav.TreeView('#theTree', {
        displayMemberPath: 'header',
        childItemsPath: 'items',
        isContentHtml: true,
        itemsSource: getData(),
        allowDragging: true,
        expandOnClick: false,
        autoCollapse: false,
        //
        // load elements with a simulated http delay
        lazyLoadFunction: (node, callback) => {
            setTimeout(() => {
                let result = getLazyData();
                callback(result);
            }, 1000);
        },
        //
        // when collapsing a node with 'reload' set to true, 
        // clear its contents to reload later
        isCollapsedChanging: (s, e) => {
            let node = e.node, tree = node.treeView;
            //
            if (!node.isCollapsed && node.dataItem.reload) {
                // remove previous lazy-loaded items from data source
                node.dataItem.items = [];
                //
                // re-bind the tree to remove the old nodes
                tree.loadTree();
            }
        }
    });
    //
    // lazy data (re-loaded when opening nodes)
    function getLazyData() {
        let creationTime = wjCore.Globalize.format(new Date(), 'hh:mm:ss');
        //
        return [
            { header: 'Empty Node at: ' + creationTime },
            {
                header: 'Node with child nodes at: ' + creationTime,
                items: [
                    { header: 'hello' },
                    { header: 'world' }
                ]
            },
            { header: 'Lazy node <i>(reload when opening)</i>', items: [], reload: true },
        ];
    }
}
