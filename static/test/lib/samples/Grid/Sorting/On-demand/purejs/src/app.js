import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import * as wjGrid from '@grapecity/wijmo.grid';
//
document.readyState === 'complete' ? init() : window.onload = init;
//
function init() {
    //
    // create some random data
    var countries = 'US,Germany,UK,Japan,Sweden,Norway,Denmark'.split(','), data = [];
    for (var i = 0; i < countries.length; i++) {
        data.push({
            id: i,
            country: countries[i],
            active: i % 5 != 0,
            downloads: Math.round(Math.random() * 200000),
            sales: Math.random() * 100000,
            expenses: Math.random() * 50000
        });
    }
    //
    // create the grid with on-demand sorting
    var view;
    var theGrid = new wjGrid.FlexGrid('#theGrid', {
        itemsSourceChanged: function (s, e) {
            view = s.collectionView;
            view.canSort = false; // prevent sorting
        },
        sortedColumn: function (s, e) {
            view.canSort = false; // prevent sorting
            view.sourceCollection = view.items; // copy sorted values
        },
        alternatingRowStep: 0,
        itemsSource: data
    });
    //
    // allow sorting by mouse click
    theGrid.hostElement.addEventListener('mousedown', function (e) {
        if (theGrid.hitTest(e).panel == theGrid.columnHeaders) {
            view.canSort = true;
        }
    }, true);
}
