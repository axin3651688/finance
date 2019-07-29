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
    for (var i = 0; i < 20000; i++) {
        data.push({
            id: i,
            country: countries[i % countries.length],
            rating: Math.round(Math.random() * 5),
            sales: Math.random() * 10000,
            expenses: Math.random() * 5000,
        });
    }
    //
    // FlexGridFilter client-side filtering
    var theGrid = new wjGrid.FlexGrid('#theGrid', {
        itemsSource: data
    });
    var filter = new wjGridFilter.FlexGridFilter(theGrid);
    //
    // ratings are values from 0 to 5
    var filterRating = filter.getColumnFilter('rating');
    filterRating.valueFilter.uniqueValues = [0, 1, 2, 3, 4, 5];
    //
    // limit number of values shown in sales filter
    var filterSales = filter.getColumnFilter('sales');
    filterSales.valueFilter.maxValues = 20;
    //
    // filter expenses only by condition
    var filterExpenses = filter.getColumnFilter('expenses');
    filterExpenses.filterType = wjGridFilter.FilterType.Condition;
}
