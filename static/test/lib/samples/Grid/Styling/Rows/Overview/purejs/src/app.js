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
    var countries = 'US,Germany,UK,Japan,Italy,Greece'.split(','), products = 'Phones,Computers,Cameras,Stereos'.split(','), data = [];
    for (var i = 0; i < 200; i++) {
        data.push({
            id: i,
            country: countries[i % countries.length],
            product: products[i % products.length],
            sales: Math.random() * 10000,
            expenses: Math.random() * 5000,
        });
    }
    //
    // column properties
    var theGrid = new wjGrid.FlexGrid('#theGrid', {
        autoGenerateColumns: false,
        alternatingRowStep: 0,
        columns: [
            { binding: 'id', header: 'ID', width: 50 },
            { binding: 'country', header: 'Country', },
            { binding: 'product', header: 'Product', },
            { binding: 'sales', header: 'Sales', format: 'c0' },
            { binding: 'expenses', header: 'Expenses', format: 'c0' },
        ],
        loadedRows: function (s, e) {
            for (var i = 0; i < s.rows.length; i++) {
                var row = s.rows[i];
                var item = row.dataItem;
                if (item.sales > 6000) {
                    row.cssClass = 'high-value';
                }
                else if (item.sales < 1000) {
                    row.cssClass = 'low-value';
                }
            }
        },
        itemsSource: data
    });
    //
    // toggle alternatingRowStep
    document.getElementById('alternatingRowStep').addEventListener('click', function (e) {
        theGrid.alternatingRowStep = e.target.checked ? 1 : 0;
    });
    //
}
