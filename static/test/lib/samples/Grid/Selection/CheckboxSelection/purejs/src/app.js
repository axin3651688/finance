import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './styles.css';
import * as wjGrid from '@grapecity/wijmo.grid';
import * as wjCore from '@grapecity/wijmo';
import { getData } from './data';
//
document.readyState === 'complete' ? init() : window.onload = init;
//
function init() {
    //
    var theGrid = new wjGrid.FlexGrid('#theGrid', {
        deferResizing: true,
        alternatingRowStep: 0,
        headersVisibility: 'Column',
        selectionMode: 'Cell',
        itemsSource: getData(100),
        //
        // create select all button on the column header
        formatItem: function (s, e) {
            if (e.panel == s.columnHeaders) {
                if (s.columns[e.col].binding == 'sel') {
                    e.cell.innerHTML = '<input class="select-all" tabindex="-1" type="checkbox">';
                    updateSelectAllBox(s);
                }
            }
            else if (e.panel == s.cells) {
                wjCore.setAttribute(e.cell.parentElement, 'aria-selected', s.rows[e.row].dataItem.sel);
            }
        }
    });
    //
    // initialize column widths
    theGrid.autoSizeColumns(null, null, null, 18);
    //
    // select/de-select all items when user clicks the check box on the header
    theGrid.hostElement.addEventListener('click', function (e) {
        if (wjCore.hasClass(e.target, 'select-all') &&
            e.target instanceof HTMLInputElement) {
            theGrid.deferUpdate(function () {
                theGrid.collectionView.items.forEach(function (item) {
                    item.sel = e.target.checked;
                });
            });
        }
    });
    //
    // update the select all checkbox state
    function updateSelectAllBox(grid) {
        var cb = grid.hostElement.querySelector('.select-all');
        if (cb instanceof HTMLInputElement) {
            var items = grid.collectionView.items, last = null, indeterminate = false;
            for (var i = 0; i < items.length; i++) {
                if (last != null && items[i].sel != last) {
                    indeterminate = true;
                    break;
                }
                last = items[i].sel;
            }
            cb.checked = last;
            if (indeterminate) {
                cb.indeterminate = true;
            }
        }
    }
}
