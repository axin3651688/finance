import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './styles.css';
import * as wjOlap from '@grapecity/wijmo.olap';
import * as wjInput from '@grapecity/wijmo.input';
import { getData } from './data';
//
document.readyState === 'complete' ? init() : window.onload = init;
//
function init() {
    //
    // initialize pivot engine
    var ng = new wjOlap.PivotEngine({
        autoGenerateFields: false,
        fields: [
            { binding: 'date', header: 'Year', format: 'yyyy' },
            { binding: 'date', header: 'Period', format: 'MMM' },
            { binding: 'buyer', header: 'Person' },
            { binding: 'type', header: 'Category' },
            { binding: 'amount', header: 'Amount', format: 'c0', aggregate: 'Sum' },
            { binding: 'amount', header: 'Show As', format: 'c0', aggregate: 'Sum' },
        ],
        itemsSource: getData(1000),
        showRowTotals: 'Subtotals',
        valueFields: ['Amount', 'Show As'],
        rowFields: ['Year', 'Period'] // by Year and Quarter
    });
    //
    // show summary
    var pivotGrid = new wjOlap.PivotGrid('#pivotGrid', {
        itemsSource: ng
    });
    //
    // change the setting of the ShowAs property
    var fld = ng.fields.getField('Show As');
    var showAs = new wjInput.ComboBox('#showAs', {
        itemsSource: 'NoCalculation,DiffRow,DiffRowPct,DiffCol,DiffColPct,PctGrand,PctRow,PctCol,RunTot,RunTotPct'.split(','),
        text: wjOlap.ShowAs[fld.showAs],
        textChanged: function (s, e) {
            fld.showAs = s.text;
            fld.format = s.text.indexOf('Pct') > -1 ? 'p0' : 'c0';
        }
    });
    //
    // show period in columns or in rows
    document.getElementById('periodInColumns').addEventListener('click', function (e) {
        var list = e.target.checked ? ng.columnFields : ng.rowFields;
        list.push('Period');
    });
    //
}
