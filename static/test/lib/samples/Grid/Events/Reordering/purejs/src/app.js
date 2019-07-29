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
            id: i,
            country: countries[i],
            downloads: Math.round(Math.random() * 20000),
            sales: Math.random() * 10000,
            expenses: Math.random() * 5000
        });
    }
    //
    // create the grid
    var theGrid = new wjGrid.FlexGrid('#theGrid', {
        itemsSource: data,
        //
        // prevent 'country' column from being dragged to index 0
        draggingColumn: function (s, e) {
            theColumn = s.columns[e.col].binding;
        },
        draggingColumnOver: function (s, e) {
            if (theColumn == 'country') {
                if (e.col == 0 || e.col == s.columns.length - 1) {
                    e.cancel = true;
                }
            }
        }
    });
    var theColumn = null;
}
