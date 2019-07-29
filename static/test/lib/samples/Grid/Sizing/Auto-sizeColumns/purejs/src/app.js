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
    for (var i = 0; i < 10; i++) {
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
            { binding: 'id', header: 'ID', minWidth: 60, isReadOnly: true },
            { binding: 'countries', header: 'Countries' },
            { binding: 'sales', header: 'Sales', minWidth: 80 },
            { binding: 'expenses', header: 'Expenses', minWidth: 80 }
        ],
        loadedRows: function (s, e) {
            s.autoSizeColumns();
        },
        cellEditEnded: function (s, e) {
            s.autoSizeColumn(e.col);
        },
        rowEditEnded: function (s, e) {
            s.autoSizeColumns();
        },
        itemsSource: data,
        allowResizing: 'None'
    });
}
