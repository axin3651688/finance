import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './styles.css';
import * as wjGrid from '@grapecity/wijmo.grid';
import * as wjCore from '@grapecity/wijmo';
import * as wjInput from '@grapecity/wijmo.input';
//
document.readyState === 'complete' ? init() : window.onload = init;
//
function init() {
    //
    // create some random data
    var countries = 'US,Germany,UK,Japan,Italy,Greece'.split(','), data = [];
    for (var i = 0; i < countries.length; i++) {
        data.push({
            country: countries[i],
            downloads: Math.round(Math.random() * 20000),
            sales: Math.random() * 10000,
            expenses: Math.random() * 5000
        });
    }
    //
    // show data in a grid
    var currSel = document.getElementById('currSel');
    var theGrid = new wjGrid.FlexGrid('#theGrid', {
        alternatingRowStep: 0,
        itemsSource: data,
        selectionChanged: function (s, e) {
            currSel.textContent = wjCore.format('({row},{col})-({row2},{col2})', theGrid.selection);
        }
    });
    theGrid.onSelectionChanged(null); // initialize selection display
    //
    // pick selectionMode
    var selectionMode = new wjInput.ComboBox('#selectionMode', {
        itemsSource: 'None,Cell,CellRange,Row,RowRange,ListBox'.split(','),
        text: 'CellRange',
        textChanged: function () {
            theGrid.selectionMode = wjCore.asEnum(selectionMode.selectedIndex, wjGrid.SelectionMode);
        }
    });
    //
    // select first four cells in the grid
    document.getElementById('btnSelect').addEventListener('click', function () {
        selectionMode.text = 'CellRange';
        theGrid.selection = new wjGrid.CellRange(0, 0, 1, 1);
    });
    //
    // select rows 0, 2, and 4
    document.getElementById('btnListSelect').addEventListener('click', function () {
        selectionMode.text = 'ListBox';
        theGrid.select(0, 0); // regular selection still works in listbox mode
        [0, 2, 4].forEach(function (index) {
            theGrid.rows[index].isSelected = true;
        });
    });
    //
}
