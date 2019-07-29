import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './styles.css';
import { FlexGrid } from '@grapecity/wijmo.grid';
document.readyState === 'complete' ? init() : window.onload = init;
function init() {
    // generate some random data
    var countries = 'US,Germany,UK,Japan,Italy,Greece'.split(','), data = [];
    for (var i = 0; i < 200; i++) {
        data.push({
            id: i,
            country: countries[i % countries.length],
            downloads: Math.round(Math.random() * 20000),
            sales: Math.random() * 10000,
            expenses: Math.random() * 5000,
            num1: Math.random() * 5000,
            num2: Math.random() * 5000,
            num3: Math.random() * 5000,
            num4: Math.random() * 5000,
            num5: Math.random() * 5000,
        });
    }
    // default behavior: allow column reordering
    var theGrid = new FlexGrid('#theGrid', {
        itemsSource: data,
        frozenRows: 2,
        frozenColumns: 1
    });
    // toggle frozen rows
    document.getElementById('btnFreezeRows').addEventListener('click', function () {
        theGrid.frozenRows = theGrid.frozenRows > 0 ? 0 : 2;
    });
    document.getElementById('btnFreezeCols').addEventListener('click', function () {
        theGrid.frozenColumns = theGrid.frozenColumns > 0 ? 0 : 1;
    });
}
