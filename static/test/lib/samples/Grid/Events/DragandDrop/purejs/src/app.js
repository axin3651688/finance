import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './styles.css';
import * as wjGrid from '@grapecity/wijmo.grid';
import { getData } from './data';
//
document.readyState === 'complete' ? init() : window.onload = init;
//
function init() {
    //
    // create the grid
    var theGrid = new wjGrid.FlexGrid('#theGrid', {
        itemsSource: getData()
    });
    //
    // allow dragging from the grid
    makeDragSource(theGrid);
    //
    // allow dropping into target
    var theTarget = document.getElementById('theTarget');
    makeDropTarget(theTarget);
    //
    // make grid rows draggable
    function makeDragSource(s) {
        //
        // make rows draggable
        s.itemFormatter = function (panel, r, c, cell) {
            if (panel.cellType == wjGrid.CellType.RowHeader) {
                cell.textContent = (r + 1).toString();
                cell.draggable = true;
            }
        };
        //
        // disable built-in row drag/drop
        s.hostElement.addEventListener('mousedown', function (e) {
            if (s.hitTest(e).cellType == wjGrid.CellType.RowHeader) {
                e.stopPropagation();
            }
            ;
        }, true);
        //
        // handle drag start
        s.hostElement.addEventListener('dragstart', function (e) {
            var ht = s.hitTest(e);
            if (ht.cellType == wjGrid.CellType.RowHeader) {
                s.select(new wjGrid.CellRange(ht.row, 0, ht.row, s.columns.length - 1));
                e.dataTransfer.effectAllowed = 'copy';
                e.dataTransfer.setData('text', ht.row.toString());
            }
            ;
        }, true);
    }
    //
    // enable drop operations on an element
    function makeDropTarget(s) {
        s.addEventListener('dragover', function (e) {
            var dragRow = e.dataTransfer.getData('text');
            if (dragRow != null) {
                e.dataTransfer.dropEffect = 'copy';
                e.preventDefault();
            }
        });
        s.addEventListener('drop', function (e) {
            var dragRow = e.dataTransfer.getData('text');
            if (dragRow != null) {
                var item = theGrid.rows[parseInt(dragRow)].dataItem;
                alert('thanks for dropping row ' + JSON.stringify(item) + ' here.');
                e.preventDefault();
            }
        });
    }
}
