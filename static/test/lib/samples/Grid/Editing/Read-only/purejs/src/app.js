import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './styles.css';
import * as wjGrid from '@grapecity/wijmo.grid';
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
    // default clipboard behavior
    var theGrid = new wjGrid.FlexGrid('#theGrid', {
        itemsSource: data,
        columns: [
            { binding: 'id', header: 'ID', width: 50, isReadOnly: true },
            { binding: 'country', header: 'Country', isRequired: true },
            { binding: 'sales', header: 'Sales', isRequired: false },
            { binding: 'expenses', header: 'Expenses', isRequired: false },
            { binding: 'overdue', header: 'Overdue' }
        ],
        beginningEdit: function (s, e) {
            var item = s.rows[e.row].dataItem;
            if (item.overdue) { // prevent editing overdue items
                e.cancel = true;
            }
        }
    });
}
