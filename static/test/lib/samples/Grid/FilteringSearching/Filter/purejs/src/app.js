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
    for (var i = 0; i < 200; i++) {
        data.push({
            id: i,
            country: countries[i % countries.length],
            downloads: Math.round(Math.random() * 20000),
            sales: Math.random() * 10000,
            expenses: Math.random() * 5000,
        });
    }
    //
    // basic filtering
    var theGrid = new wjGrid.FlexGrid('#theGrid', {
        itemsSource: data,
    });
    document.getElementById('filter').addEventListener('input', function (e) {
        var filter = e.target.value.toLowerCase();
        theGrid.collectionView.filter = function (item) {
            return filter.length == 0 || item.country.toLowerCase().indexOf(filter) > -1;
        };
    });
    //
}
