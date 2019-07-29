import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './styles.css';
import * as wjGrid from '@grapecity/wijmo.grid';
import * as wjCore from '@grapecity/wijmo';
//
document.readyState === 'complete' ? init() : window.onload = init;
//
function init() {
    //
    // create the grid
    var theGrid = new wjGrid.FlexGrid('#theGrid', {
        childItemsPath: 'children',
        headersVisibility: 'Column',
        groupCollapsedChanged: groupCollapsedChanged,
        autoGenerateColumns: false,
        columns: [
            { binding: 'name', header: 'Customer Name', width: '*' },
            { binding: 'id', header: 'ID', align: 'center', cssClass: 'id-column' }
        ],
        itemsSource: getData(),
    });
    //
    // start collapsed
    theGrid.collapseGroupsToLevel(0);
    //
    // update row when items are loaded
    function updateRowCount(grid) {
        document.getElementById('rowCount').textContent = wjCore.Globalize.format(grid.rows.length, 'n0');
    }
    updateRowCount(theGrid);
    //
    // load data when collapse node is expanded
    function groupCollapsedChanged(s, e) {
        var row = s.rows[e.row], item = row.dataItem;
        //
        // did we just expand a node with a dummy child?
        if (!row.isCollapsed &&
            item.children.length == 1 &&
            item.children[0].name == '') {
            //
            // can't lazy load while updating rows
            if (s.rows.isUpdating) {
                row.isCollapsed = true;
                return;
            }
            //
            // replace the dummy child with actual nodes
            item.children.length = 0;
            var cnt = Math.round(Math.random() * 5) + 1;
            for (var i = 0; i < cnt; i++) {
                var node = createNode();
                item.children.push(node);
            }
            //
            // refresh the view
            s.collectionView.refresh();
            //
            // collapse the new item's child items
            for (var i = row.index + 1; i < s.rows.length; i++) {
                var childRow = s.rows[i];
                if (childRow.level <= row.level) {
                    break;
                }
                childRow.isCollapsed = true;
            }
            //
            // update row count
            updateRowCount(s);
        }
    }
    var nodeId;
    function createNode(dummy) {
        var first = 'Al,Bob,Cal,Dan,Ed,Fred,Greg,Hal,Ian,Jack,Karl,Lou,Moe,Nate,Oleg,Paul,Quincy,Rod,Sue,Uwe,Vic,Walt,Xiu,Yuri,Zack'.split(','), last = 'Adams,Baum,Cole,Dell,Evans,Fell,Green,Hill,Isman,Jones,Krup,Lee,Monk,Nye,Opus,Pitt,Quaid,Riems,Stark,Trell,Unger,Voss,Wang,Xie,Zalm'.split(','), name = dummy ? '' : getOneOf(first) + ' ' + getOneOf(last), children = [];
        if (!dummy) {
            children.push(createNode(true));
        }
        if (nodeId == null)
            nodeId = 0;
        return { id: nodeId++, name: name, children: children };
    }
    function getOneOf(arr) {
        return arr[Math.floor(Math.random() * arr.length)];
    }
    // create/retrieve data
    function getData() {
        var tree = [];
        tree.push(createNode());
        tree.push(createNode());
        return tree;
    }
}
