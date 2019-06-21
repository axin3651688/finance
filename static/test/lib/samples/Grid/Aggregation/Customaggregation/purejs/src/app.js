import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './styles.css';
import * as wjCore from '@grapecity/wijmo';
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
    // create a group to show the grand totals
    var grandTotalsGroup = new wjCore.PropertyGroupDescription('Grand Total', function (item, propName) {
        return '';
    });
    //
    // grid with custom aggregates
    var theGrid = new wjGrid.FlexGrid('#theGrid', {
        autoGenerateColumns: false,
        columns: [
            { binding: 'id', header: 'ID', width: 60, isReadOnly: true },
            { binding: 'country', header: 'Country' },
            { binding: 'product', header: 'Product' },
            { binding: 'sales', header: 'Sales', aggregate: 'Sum' },
            { binding: 'expenses', header: 'Expenses', aggregate: 'Sum' },
            { binding: 'profit', header: 'Profit', dataType: 'Number', isReadOnly: true }
        ],
        itemsSource: new wjCore.CollectionView(data, {
            groupDescriptions: [
                grandTotalsGroup,
                'country'
            ]
        })
    });
    //
    // start collapsed
    theGrid.collapseGroupsToLevel(1);
    //
    // custom cell calculation
    theGrid.formatItem.addHandler(function (s, e) {
        //
        // cells and column footer panels only
        if (e.panel == s.cells) {
            //
            // get row, column, and data item (or group description)
            var r = s.rows[e.row];
            var c = s.columns[e.col];
            var item = s.rows[e.row].dataItem;
            var group = r instanceof wjGrid.GroupRow ? item : null;
            //
            // assume value is not negative
            var negative = false;
            //
            // calculate profit
            if (c.binding == 'profit') {
                var profit = group
                    ? group.getAggregate('Sum', 'sales') - group.getAggregate('Sum', 'expenses')
                    : item.sales - item.expenses;
                e.cell.textContent = wjCore.Globalize.format(profit, c.format);
                negative = profit < 0;
            }
            //
            // update 'negative' class on cell
            wjCore.toggleClass(e.cell, 'negative', negative);
        }
        //
    });
}
