import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './styles.css';
import { FlexGrid } from '@grapecity/wijmo.grid';
document.readyState === 'complete' ? init() : window.onload = init;
function init() {
    // generate some random data
    var countries = 'US,Germany,UK,Japan,Italy,Greece'.split(','), data = [];
    for (var i = 0; i < countries.length; i++) {
        data.push({
            id: i,
            country: countries[i],
            downloads: Math.round(Math.random() * 20000),
            sales: Math.random() * 10000,
            expenses: Math.random() * 5000
        });
    }
    // the grid
    var theGrid = new FlexGrid('#theGrid', {
        itemsSource: data,
        allowAddNew: true,
        allowDelete: true
    });
    // toggle new row position
    document.getElementById('newRowAtTop').addEventListener('click', function (e) {
        theGrid.newRowAtTop = e.target.checked;
    });
}
