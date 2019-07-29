import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './styles.css';
import * as wjGrid from '@grapecity/wijmo.grid';
import * as wjGridFilter from '@grapecity/wijmo.grid.filter';
//
document.readyState === 'complete' ? init() : window.onload = init;
//
function init() {
    //
    // generate some random data
    var countries = 'US,Germany,UK,Japan,Italy,Greece'.split(','), data = [];
    for (var i = 0; i < 2000; i++) {
        data.push({
            id: i,
            country: countries[i % countries.length],
            downloads: Math.round(Math.random() * 20000),
            sales: Math.random() * 10000,
            expenses: Math.random() * 5000,
        });
    }
    //
    // FlexGridFilter client-side filtering
    var theGrid = new wjGrid.FlexGrid('#theGrid', {
        itemsSource: data,
        allowSorting: false
    });
    var filter = new wjGridFilter.FlexGridFilter(theGrid);
    //
    // filter only by condition (not by value)
    filter.defaultFilterType = wjGridFilter.FilterType.Condition;
    //
    // remove sort buttons
    filter.showSortButtons = false;
}
