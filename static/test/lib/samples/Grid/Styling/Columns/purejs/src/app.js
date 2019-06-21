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
            comment: i % 5 == 0 ? 'This item has a long comment so it will wrap in the cell.' : '',
            sales: Math.random() * 10000,
            expenses: Math.random() * 5000,
        });
    }
    //
    // column properties
    var theGrid = new wjGrid.FlexGrid('#theGrid', {
        alternatingRowStep: 0,
        autoGenerateColumns: false,
        columns: [
            { binding: 'id', header: 'ID', align: 'center', width: 50 },
            { binding: 'country', header: 'Country', cssClass: 'cell-country' },
            { binding: 'product', header: 'Product', cssClass: 'cell-product' },
            { binding: 'comment', header: 'Comment', wordWrap: true, width: 200 },
            { binding: 'sales', header: 'Sales', format: 'c0', align: 'center' },
            { binding: 'expenses', header: 'Expenses', format: 'c0', align: 'center' },
        ],
        itemsSource: data
    });
    //
    // call autosizerows to show word-wrapping
    theGrid.autoSizeRows();
    //
    // formatItem event
    var theGridFormatItem = new wjGrid.FlexGrid('#theGridFormatItem', {
        alternatingRowStep: 0,
        autoGenerateColumns: false,
        columns: [
            { binding: 'country', header: 'Country' },
            { binding: 'product', header: 'Product' },
            { binding: 'sales', header: 'Sales', format: 'c0' },
            { binding: 'expenses', header: 'Expenses', format: 'c0' },
        ],
        itemsSource: data,
        formatItem: function (s, e) {
            if (e.panel == s.cells) {
                var value = e.panel.getCellData(e.row, e.col);
                wjCore.toggleClass(e.cell, 'high-value', wjCore.isNumber(value) && value > 6000);
                wjCore.toggleClass(e.cell, 'low-value', wjCore.isNumber(value) && value < 2000);
            }
        }
    });
}
