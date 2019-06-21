import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './styles.css';
import * as wjCore from '@grapecity/wijmo';
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
    // CollectionView with validation
    var view = new wjCore.CollectionView(data, {
        getError: function (item, prop) {
            if (prop == 'sales' && item.sales < 0) {
                return 'Sales cannot be negative!';
            }
            if (prop == 'expenses' && item.expenses < 0) {
                return 'Expenses cannot be negative!';
            }
        }
    });
    //
    // show the data in a grid
    var theGrid = new wjGrid.FlexGrid('#theGrid', {
        itemsSource: view,
        columns: [
            { binding: 'id', header: 'ID', width: 50, isReadOnly: true },
            { binding: 'country', header: 'Country', isRequired: true, dataMap: countries },
            { binding: 'sales', header: 'Sales' },
            { binding: 'expenses', header: 'Expenses' },
            { binding: 'overdue', header: 'Overdue' }
        ]
    });
}
