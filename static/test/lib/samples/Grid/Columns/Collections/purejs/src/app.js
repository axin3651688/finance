import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './styles.css';
import { FlexGrid, Column } from '@grapecity/wijmo.grid';
document.readyState === 'complete' ? init() : window.onload = init;
function init() {
    // generate some random data
    var countries = 'US,Germany,UK,Japan,Italy,Greece'.split(','), data = [];
    for (var i = 0; i < countries.length; i++) {
        data.push({
            country: countries[i],
            downloads: Math.round(Math.random() * 20000),
            sales: Math.random() * 10000,
            expenses: Math.random() * 5000
        });
    }
    // grid with extra fixed column and auto-generated scrollable columns
    var theFirstGrid = new FlexGrid('#theFirstGrid');
    theFirstGrid.rowHeaders.columns.push(new Column()); // extra fixed column
    theFirstGrid.itemsSource = data; // auto-generate scrollable columns
    // grid with no fixed columns and custom scrollable columns
    var theSecondGrid = new FlexGrid('#theSecondGrid');
    theSecondGrid.rowHeaders.columns.splice(0, 1); // no extra columns
    theSecondGrid.autoGenerateColumns = false; // custom scrollable columns
    theSecondGrid.itemsSource = data;
    var cols = theSecondGrid.columns;
    cols.push(new Column({ binding: 'country', header: 'Country' }));
    cols.push(new Column({ binding: 'sales', header: 'Sales' }));
    cols.push(new Column({ binding: 'expenses', header: 'Expenses' }));
}
