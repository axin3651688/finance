import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './styles.css';
import * as wjOlap from '@grapecity/wijmo.olap';
import { getData } from './data';
//
document.readyState === 'complete' ? init() : window.onload = init;
//
function init() {
    //
    // create a PivotEngine with a custom view
    var ng = new wjOlap.PivotEngine({
        autoGenerateFields: false,
        itemsSource: getData(10000),
        showColumnTotals: 'GrandTotals',
        showRowTotals: 'Subtotals',
        fields: [
            { binding: 'product', header: 'Product' },
            { binding: 'date', header: 'Date', format: 'yyyy \"Q\"q' },
            {
                header: 'Range',
                dataType: 'String',
                aggregate: 'Cnt',
                getValue: function (item, formatted) {
                    var sales = item.sales;
                    return sales <= 13 ? 'Low' : sales >= 17 ? 'High' : 'Medium';
                }
            },
            { binding: 'sales', header: 'Sales', format: 'n0' },
            { binding: 'downloads', header: 'Downloads', format: 'n0' },
            {
                header: 'Conversion',
                dataType: 'Number',
                aggregate: 'Avg',
                format: 'p0',
                getValue: function (item) {
                    return item.downloads ? item.sales / item.downloads : 0;
                }
            }
        ],
        rowFields: ['Date', 'Range'],
        valueFields: ['Sales', 'Conversion']
    });
    //
    // show panel
    var pivotPanel = new wjOlap.PivotPanel('#pivotPanel', {
        itemsSource: ng
    });
    //
    // show summary
    var pivotGrid = new wjOlap.PivotGrid('#pivotGrid', {
        isReadOnly: true,
        itemsSource: ng
    });
}
