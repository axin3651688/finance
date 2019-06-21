import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './styles.css';
import * as wjGrid from '@grapecity/wijmo.grid';
import * as wjCore from '@grapecity/wijmo';
import '@grapecity/wijmo.input';
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
    // show the data in a grid
    var theGrid = new wjGrid.FlexGrid('#theGrid', {
        itemsSource: data,
        columns: [
            { binding: 'id', header: 'ID', width: 50, isReadOnly: true },
            { binding: 'country', header: 'Country', isRequired: true, dataMap: countries },
            { binding: 'sales', header: 'Sales', format: 'n2' },
            { binding: 'expenses', header: 'Expenses', format: 'n2' },
            { binding: 'overdue', header: 'Overdue' }
        ],
        beginningEdit: function (s, e) {
            showMessage('&nbsp;');
            var col = s.columns[e.col];
            if (col.binding != 'overdue') {
                var item = s.rows[e.row].dataItem;
                if (item.overdue) { // prevent editing overdue items
                    e.cancel = true;
                    showMessage('Overdue items cannot be edited');
                }
            }
        },
        cellEditEnding: function (s, e) {
            showMessage('&nbsp;');
            var col = s.columns[e.col];
            if (col.binding == 'sales' || col.binding == 'expenses') {
                var value = wjCore.changeType(s.activeEditor.value, wjCore.DataType.Number, col.format);
                if (!wjCore.isNumber(value) || value < 0) { // prevent negative sales/expenses
                    e.cancel = true;
                    showMessage('Please enter a positive amount');
                }
            }
        }
    });
    //
    // show log message
    var elLog = document.getElementById('log');
    function showMessage(msg) {
        elLog.innerHTML = msg;
    }
}
