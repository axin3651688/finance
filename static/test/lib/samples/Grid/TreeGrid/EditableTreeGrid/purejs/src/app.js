import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './styles.css';
import * as wjGrid from '@grapecity/wijmo.grid';
//
document.readyState === 'complete' ? init() : window.onload = init;
//
function init() {
    //
    // workers tree data (heterogeneous collection)
    var workers = [{
            name: 'Jack Smith',
            checks: [{
                    name: 'check1',
                    earnings: [
                        { name: 'hourly', hours: 30.0, rate: 15.0 },
                        { name: 'overtime', hours: 10.0, rate: 20.0 },
                        { name: 'bonus', hours: 5.0, rate: 30.0 }
                    ]
                }, {
                    name: 'check2',
                    earnings: [
                        { name: 'hourly', hours: 20.0, rate: 18.0 },
                        { name: 'overtime', hours: 20.0, rate: 24.0 }
                    ]
                }]
        }, {
            name: 'Jack Smith',
            checks: [{
                    name: 'check1',
                    earnings: [
                        { name: 'hourly', hours: 30.0, rate: 15.0 },
                        { name: 'overtime', hours: 10.0, rate: 20.0 },
                        { name: 'bonus', hours: 5.0, rate: 30.0 }
                    ]
                }, {
                    name: 'check2',
                    earnings: [
                        { name: 'hourly', hours: 20.0, rate: 18.0 },
                        { name: 'overtime', hours: 20.0, rate: 24.0 }
                    ]
                }]
        }, {
            name: 'Jane Smith',
            checks: [{
                    name: 'check1',
                    earnings: [
                        { name: 'hourly', hours: 30.0, rate: 15.0 },
                        { name: 'overtime', hours: 10.0, rate: 20.0 },
                        { name: 'bonus', hours: 5.0, rate: 30.0 }
                    ]
                }, {
                    name: 'check2',
                    earnings: [
                        { name: 'hourly', hours: 20.0, rate: 18.0 },
                        { name: 'overtime', hours: 20.0, rate: 24.0 }
                    ]
                }]
        }];
    //
    // workers tree
    var workersGrid = new wjGrid.FlexGrid('#workersGrid', {
        headersVisibility: 'Column',
        selectionMode: 'Row',
        childItemsPath: ['checks', 'earnings'],
        autoGenerateColumns: false,
        columns: [
            { binding: 'name', isReadOnly: true },
            { binding: 'hours', dataType: 'Number', format: 'n2' },
            { binding: 'rate', dataType: 'Number', format: 'n2' }
        ],
        loadedRows: function (s, e) {
            s.rows.forEach(function (row) {
                row.isReadOnly = false;
            });
        },
        beginningEdit: function (s, e) {
            var item = s.rows[e.row].dataItem, binding = s.columns[e.col].binding;
            if (!(binding in item)) { // property not on this item?
                e.cancel = true; // can't edit!
            }
        },
        itemsSource: workers
    });
}
