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
    for (var i = 0; i < 100; i++) {
        data.push({
            id: i,
            country: countries[i % countries.length],
            sales: Math.random() * 10000,
            expenses: Math.random() * 5000
        });
    }
    //
    // show the data in a grid with sticky headers
    var theGrid = new wjGrid.FlexGrid('#theGrid', {
        itemsSource: data,
        deferResizing: true
    });
    //
    // toggle the deferResizing property
    document.getElementById('deferResizing').addEventListener('click', function (e) {
        theGrid.deferResizing = e.target.checked;
    });
}
