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
    var countries = 'US,Germany,UK,Japan,Italy,Greece'.split(',');
    var data = [];
    for (var i = 0; i < 50; i++) {
        data.push({
            id: i,
            country: countries[i % countries.length],
            sales: Math.random() * 10000,
            expenses: Math.random() * 5000
        });
    }
    //
    // show the data in a grid with fixed height
    var theGrid = new wjGrid.FlexGrid('#theGrid', {
        itemsSource: data
    });
    //
    // show the data in a grid with auto height
    var theGridNoHeaders = new wjGrid.FlexGrid('#theGridNoHeaders', {
        itemsSource: data,
        headersVisibility: 'None',
        allowResizing: 'ColumnsAllCells'
    });
}
