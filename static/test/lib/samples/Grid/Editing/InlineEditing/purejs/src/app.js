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
    // create some random data
    var countries = 'US,Germany,UK,Japan,Sweden,Norway,Denmark'.split(',');
    var data = [];
    for (var i = 0; i < countries.length; i++) {
        data.push({
            id: i,
            country: countries[i],
            sales: Math.random() * 10000,
            expenses: Math.random() * 5000,
            overdue: (i + 1) % 4 == 0
        });
    }
    //
    // create the grid with custom editing behavior
    var theGrid = new wjGrid.FlexGrid('#theGrid', {
        isReadOnly: true,
        selectionMode: 'None',
        headersVisibility: 'Column',
        itemsSource: data,
        columns: [
            { binding: 'id', header: 'ID', width: 50 },
            { binding: 'country', header: 'Country', isRequired: true, dataMap: countries },
            { binding: 'sales', header: 'Sales', format: 'n2' },
            { binding: 'expenses', header: 'Expenses', format: 'n2' },
            { binding: 'buttons', header: 'Edit', width: 160 }
        ]
    });
    //
    // make rows taller to accommodate edit buttons and input controls
    theGrid.rows.defaultSize = 40;
    //
    // custom formatter to paint buttons and editors
    theGrid.formatItem.addHandler(function (s, e) {
        if (e.panel == s.cells) {
            var col = s.columns[e.col], item = s.rows[e.row].dataItem;
            //
            if (item == currentEditItem) {
                //
                // create editors and buttons for the item being edited
                switch (col.binding) {
                    case 'buttons':
                        e.cell.innerHTML = document.getElementById('tplBtnEditMode').innerHTML;
                        e.cell['dataItem'] = item;
                        break;
                    case 'country':
                    case 'sales':
                    case 'expenses':
                        e.cell.innerHTML = '<input class="form-control" ' +
                            'id="' + col.binding + '" ' +
                            'value="' + s.getCellData(e.row, e.col, true) + '"/>';
                        break;
                }
            }
            else {
                //
                // create buttons for items not being edited
                switch (col.binding) {
                    case 'buttons':
                        e.cell.innerHTML = document.getElementById('tplBtnViewMode').innerHTML;
                        e.cell['dataItem'] = item;
                        break;
                }
            }
        }
    });
    //
    // handle button clicks
    theGrid.addEventListener(theGrid.hostElement, 'click', function (e) {
        let targetBtn;
        if (e.target instanceof HTMLButtonElement) {
            targetBtn = e.target;
        }
        else if (e.target instanceof HTMLSpanElement && e.target.classList.contains('glyphicon')) {
            targetBtn = e.target.parentElement;
        }
        if (targetBtn) {
            //
            // get button's data item
            var item = wjCore.closest(targetBtn, '.wj-cell')['dataItem'];
            //
            // handle buttons
            switch (targetBtn.id) {
                //
                // start editing this item
                case 'btnEdit':
                    editItem(item);
                    break;
                //
                // remove this item from the collection
                case 'btnDelete':
                    theGrid.collectionView.remove(item);
                    break;
                //
                // commit edits
                case 'btnOK':
                    commitEdit();
                    break;
                //
                // cancel edits
                case 'btnCancel':
                    cancelEdit();
                    break;
            }
        }
    });
    //
    // exit edit mode when scrolling the grid or losing focus
    theGrid.scrollPositionChanged.addHandler(cancelEdit);
    theGrid.lostFocus.addHandler(cancelEdit);
    //
    // editing commands
    var currentEditItem = null;
    //
    function editItem(item) {
        cancelEdit();
        currentEditItem = item;
        theGrid.invalidate();
    }
    //
    function commitEdit() {
        if (currentEditItem) {
            theGrid.columns.forEach(function (col) {
                var input = theGrid.hostElement.querySelector('#' + col.binding);
                if (input) {
                    var value = wjCore.changeType(input.value, col.dataType, col.format);
                    if (wjCore.getType(value) == col.dataType) {
                        currentEditItem[col.binding] = value;
                    }
                }
            });
        }
        currentEditItem = null;
        theGrid.invalidate();
    }
    //
    function cancelEdit() {
        if (currentEditItem) {
            currentEditItem = null;
            theGrid.invalidate();
        }
    }
}
