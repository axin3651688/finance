import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './styles.css';
import * as wjGrid from '@grapecity/wijmo.grid';
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
    // create the grid with custom editing behavior
    var theGrid = new wjGrid.FlexGrid('#theGrid', {
        itemsSource: data,
        columns: [
            { binding: 'id', header: 'ID', width: 50 },
            { binding: 'country', header: 'Country', isRequired: true, dataMap: countries },
            { binding: 'sales', header: 'Sales' },
            { binding: 'expenses', header: 'Expenses' },
            { binding: 'overdue', header: 'Overdue' }
        ],
        gotFocus: function (s, e) {
            s.startEditing(false); // quick mode
        },
        selectionChanged: function (s, e) {
            setTimeout(function () {
                s.startEditing(false); // quick mode
            }, 50); // let the grid update first
        },
    });
}
