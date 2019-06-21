import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './styles.css';
import * as wjNav from '@grapecity/wijmo.nav';
//
document.readyState === 'complete' ? init() : window.onload = init;
//
function init() {
    //
    // create the trees
    var firstTree = new wjNav.TreeView('#firstTree', {
        itemsSource: [
            { header: 'root 1', items: [
                    { header: 'Item 1.1' },
                    { header: 'Item 1.2' },
                    { header: 'Item 1.3' }
                ]
            }
        ],
        displayMemberPath: 'header',
        childItemsPath: 'items',
        allowDragging: true,
        dragOver: dragOverBetweenTrees
    });
    var secondTree = new wjNav.TreeView('#secondTree', {
        itemsSource: [
            { header: 'root 2', items: [
                    { header: 'Item 2.1' },
                    { header: 'Item 2.2' },
                    { header: 'Item 2.3' }
                ]
            }
        ],
        displayMemberPath: 'header',
        childItemsPath: 'items',
        allowDragging: true,
        dragOver: dragOverBetweenTrees
    });
    //
    // handle drag-drop within or between trees
    function dragOverBetweenTrees(s, e) {
        var t1 = e.dragSource.treeView;
        var t2 = e.dropTarget.treeView;
        //
        // prevent dragging within trees
        if (t1 == t2 && !document.getElementById('dragWithin').checked) {
            e.cancel = true;
        }
        //
        // allow dragging between trees
        if (t1 != t2 && document.getElementById('dragBetween').checked) {
            e.cancel = false;
        }
    }
}
