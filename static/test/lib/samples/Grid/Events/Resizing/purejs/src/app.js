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
    // create some random data
    var countries = 'US,Germany,UK,Japan,Sweden,Norway,Denmark'.split(',');
    var data = [];
    for (var i = 0; i < countries.length; i++) {
        data.push({
            id: i,
            country: countries[i],
            sales: Math.random() * 10000,
            expenses: Math.random() * 5000,
            overdue: (i + 1) % 4 == 0
        });
    }
    //
    var tt = new wjCore.Tooltip();
    //
    // show the data in a grid
    var theGrid = new wjGrid.FlexGrid('#theGrid', {
        itemsSource: data,
        columns: [
            { binding: 'id', header: 'ID', width: 50, isReadOnly: true },
            { binding: 'country', header: 'Country', isRequired: true, dataMap: countries },
            { binding: 'sales', header: 'Sales', format: 'n2' },
            { binding: 'expenses', header: 'Expenses', format: 'n2' },
            { binding: 'overdue', header: 'Overdue' }
        ],
        resizingColumn: function (s, e) {
            var tip = wjCore.format('Column <b>{col}</b>, width <b>{wid:n0}px</b>', {
                col: s.columns[e.col].header,
                wid: s.columns[e.col].width
            });
            tt.show(theGrid.hostElement, tip);
        },
        resizedColumn: function (s, e) {
            tt.hide();
        }
    });
}
