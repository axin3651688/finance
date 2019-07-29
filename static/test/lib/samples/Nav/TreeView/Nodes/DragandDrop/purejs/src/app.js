import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './styles.css';
import * as wjNav from '@grapecity/wijmo.nav';
import { getData } from './data';
//
document.readyState === 'complete' ? init() : window.onload = init;
//
function init() {
    let cbDragParents = document.querySelector('#allowDraggingParentNodes');
    let cbDropIntoEmpty = document.querySelector('#allowDroppingIntoEmpty');
    //
    // create the tree
    let tree = new wjNav.TreeView('#theTree', {
        itemsSource: getData(),
        displayMemberPath: 'header',
        childItemsPath: 'items',
        showCheckboxes: true,
        imageMemberPath: 'img',
        allowDragging: true,
        //
        // use the dragStart event to honor the allowDraggingParentNodes setting
        // by setting the 'cancel' event parameter to true
        dragStart: (s, e) => {
            if (e && e.node && e.node.hasChildren) {
                if (!cbDragParents.checked) {
                    e.cancel = true; // prevent dragging parent nodes
                }
                else {
                    e.node.isCollapsed = true; // collapse parent nodes when dragging
                }
            }
        },
        //
        // use the dragOver event to honor the allowDroppingIntoEmpty setting
        // by changing the 'position' event parameter to 'Before'
        dragOver: (s, e) => {
            if (!cbDropIntoEmpty.checked && !e.dropTarget.hasChildren && (e.position == wjNav.DropPosition.Into)) {
                e.position = wjNav.DropPosition.Before;
            }
        }
    });
    //
    // handle options
    document.querySelector('#allowDragging').addEventListener('click', e => {
        tree.allowDragging = e.target.checked;
    });
}
