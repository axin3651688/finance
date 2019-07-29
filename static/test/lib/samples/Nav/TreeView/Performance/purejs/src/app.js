import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './styles.css';
import * as wjCore from '@grapecity/wijmo';
import * as wjInput from '@grapecity/wijmo.input';
import * as wjNav from '@grapecity/wijmo.nav';
// 
document.readyState === 'complete' ? init() : window.onload = init;
//
function init() {
    // select the number levels and nodes at each level
    var cmbLevels = new wjInput.ComboBox('#cmbLevels', {
        itemsSource: [1, 2, 3],
        selectedValue: 2
    });
    var cmbNodesPerLevel = new wjInput.ComboBox('#cmbNodesPerLevel', {
        itemsSource: [5, 10, 20, 40],
        selectedValue: 5
    });
    // create the tree
    var theTree = new wjNav.TreeView('#theTree', {
        itemsSource: getData(),
        displayMemberPath: 'header',
        childItemsPath: 'items',
    });
    // re-bind tree
    document.getElementById('bind').addEventListener('click', function (e) {
        var start = Date.now();
        theTree.itemsSource = getData();
        theTree.loadTree(); // force immediate refresh
        var msg = wjCore.format('Bound to <b>{cnt:no}</b> nodes in <b>{ms:n0}</b> ms.', {
            cnt: theTree.totalItemCount,
            ms: Date.now() - start
        });
        document.getElementById('bindingMsg').innerHTML = msg;
    });
    // get the data
    function getData() {
        var cnt = cmbNodesPerLevel.selectedValue, levels = cmbLevels.selectedValue;
        var nodes = [];
        for (var i = 0; i < cnt; i++) {
            nodes.push(getNode(0, i, cnt, levels));
        }
        return nodes;
    }
    function getNode(level, id, cnt, levels) {
        // create node
        var node = {
            header: 'Node ' + (level + 1) + '.' + (id + 1),
        };
        // create child nodes
        if (level < levels - 1) {
            node.items = [];
            for (var i = 0; i < cnt; i++) {
                node.items.push(getNode(level + 1, i, cnt, levels));
            }
        }
        // done
        return node;
    }
}
