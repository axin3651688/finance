import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './styles.css';
import * as wjGrid from '@grapecity/wijmo.grid';
import * as wjCore from '@grapecity/wijmo';
//
document.readyState === 'complete' ? init() : window.onload = init;
//
function init() {
    //
    // generate some random data
    var countries = 'US,Germany,UK,Japan,Italy,Greece'.split(','), products = 'Phones,Computers,Cameras,Stereos'.split(','), data = [];
    for (var i = 0; i < 200; i++) {
        data.push({
            id: i,
            country: countries[i % countries.length],
            product: products[i % products.length],
            downloads: Math.round(100 + Math.random() * 10000),
            sales: Math.random() * 10000,
            expenses: Math.random() * 5000,
        });
    }
    //
    // basic grouping
    var theGrid = new wjGrid.FlexGrid('#theGrid', {
        itemsSource: new wjCore.CollectionView(data, {
            sortDescriptions: ['country', 'product'],
            groupDescriptions: ['country', 'product']
        })
    });
    //
    // select first item (after sorting/grouping)
    theGrid.select(new wjGrid.CellRange(0, 0), true);
    //
    // hide columns being grouped on
    var theGridHideCols = new wjGrid.FlexGrid('#theGridHideCols', {
        autoGenerateColumns: false,
        columns: [
            { binding: 'country', header: 'Country', visible: false },
            { binding: 'product', header: 'Product', visible: false },
            { binding: 'downloads', header: 'Downloads', width: '*' },
            { binding: 'sales', header: 'Sales', width: '*' },
            { binding: 'expenses', header: 'Expenses', width: '*' },
        ],
        itemsSource: new wjCore.CollectionView(data, {
            sortDescriptions: ['country', 'product'],
            groupDescriptions: ['country', 'product']
        })
    });
    //
    // select first item (after sorting/grouping)
    theGridHideCols.select(new wjGrid.CellRange(0, 2), true);
}
