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
    let theTree = new wjNav.TreeView('#theTree', {
        itemsSource: getData(),
        displayMemberPath: 'header',
        childItemsPath: 'items'
    });
    //
    // scan visible nodes now and when the user clicks the button
    scanNodes(true);
    document.getElementById('scan').addEventListener('click', () => scanNodes(true));
    //
    // scan nodes and show their information
    function scanNodes(visible) {
        let result = '';
        //
        for (let node = theTree.nodes[0]; node; node = node.next(visible)) {
            result +=
                wjCore.format('{header}', node.dataItem) +
                    wjCore.format(' <span class="node-info">(level: {level}, index: {index}, isCollapsed: {isCollapsed})</span><br/>', node);
        }
        //
        document.getElementById('result').innerHTML = result;
    }
}
