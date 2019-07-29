import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './styles.css';
import * as wjGrid from '@grapecity/wijmo.grid';
import { getCountries } from './data';
//
document.readyState === 'complete' ? init() : window.onload = init;
//
function init() {
    //
    // create some random data
    var data = [];
    for (var i = 0; i < 10000; i++) {
        data.push({
            id: i,
            countries: getCountries(),
            sales: Math.random() * 10000,
            expenses: Math.random() * 5000
        });
    }
    //
    // show the data in a grid with fixed height
    var theGrid = new wjGrid.FlexGrid('#theGrid', {
        autoGenerateColumns: false,
        columns: [
            { binding: 'id', header: 'ID', isReadOnly: true },
            { binding: 'countries', header: 'Countries', width: 150, wordWrap: true },
            { binding: 'sales', header: 'Sales' },
            { binding: 'expenses', header: 'Expenses' }
        ],
        //
        // auto-size all rows when they are loaded
        loadedRows: function (s, e) {
            autoSizeRowsAsync(s);
        },
        //
        // auto-size all rows when a wrapping column is resized
        resizedColumn: function (s, e) {
            if (s.columns[e.col].wordWrap) {
                autoSizeRowsAsync(s);
            }
        },
        //
        // auto-size a single row when a wrapping cell is edited
        cellEditEnded: function (s, e) {
            if (s.columns[e.col].wordWrap) {
                autoSizeRowsAsync(s, e.row);
            }
        },
        //
        // autosize rows within view that haven't been autosized yet
        scrollPositionChanged: function (s, e) {
            var vr = s.viewRange;
            for (var r = vr.topRow; r <= vr.bottomRow; r++) {
                if (s.rows[r].height == null) {
                    s.autoSizeRows(r, r);
                    //console.log('autosized row ' + r)
                }
            }
        },
        //
        // load some data
        itemsSource: data
    });
    //
    // reset row heights to null and raise scrollPositionChanged event
    // to auto-size the rows that are in view and haven't been auto-sized
    function autoSizeRowsAsync(grid, rowIndex) {
        if (rowIndex != null) {
            grid.rows[rowIndex].height = null;
        }
        else {
            grid.rows.forEach(function (row) {
                row.height = null;
            });
        }
        setTimeout(function () {
            grid.onScrollPositionChanged();
        });
    }
    //
    // synchronouse auto-size (to show how long it would take)
    document.getElementById('asSync').addEventListener('click', function () {
        var start = Date.now();
        theGrid.autoSizeRows();
        alert('AutoSized all rows in ' + (Date.now() - start) + 'ms');
    });
    //
}
