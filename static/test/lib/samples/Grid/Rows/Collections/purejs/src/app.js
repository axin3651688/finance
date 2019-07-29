import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './styles.css';
import * as wjGrid from '@grapecity/wijmo.grid';
//
document.readyState === 'complete' ? init() : window.onload = init;
//
function init() {
    //
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
    //
    // grid with extra fixed row and a footer row
    var theGrid = new wjGrid.FlexGrid('#theGrid');
    theGrid.columnHeaders.rows.push(new wjGrid.Row()); // add a header row
    theGrid.columnFooters.rows.push(new wjGrid.Row()); // add a footer row
    theGrid.bottomLeftCells.setCellData(0, 0, 'x'); // show some data on the first cell
    theGrid.itemsSource = data; // bind the grid
}
