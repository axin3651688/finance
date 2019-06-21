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
            { binding: 'date', header: 'Period', format: '"Q"q' },
            { binding: 'buyer', header: 'Person' },
            { binding: 'type', header: 'Category' },
            { binding: 'amount', header: 'Total', format: 'c0', aggregate: 'Sum' },
            { binding: 'amount', header: 'Average', format: 'c0', aggregate: 'Avg' },
        ],
        itemsSource: getData(1000),
        showRowTotals: 'Subtotals',
        valueFields: ['Total', 'Average'],
        rowFields: ['Year', 'Period'] // by Year and Quarter
    });
    //
    // show summary
    var pivotGrid = new wjOlap.PivotGrid('#pivotGrid', {
        itemsSource: ng
    });
    //
    // customize the "Period" field
    var fld = ng.fields.getField('Period');
    var formats = [
        { name: 'Quarter ("Q"q)', value: '"Q"q' },
        { name: 'Fiscal Quarter ("FQ"u)', value: '"FQ"u' },
        { name: 'Long Month (MMMM)', value: 'MMMM' },
        { name: 'Short Month (MMM)', value: 'MMM' },
        { name: 'Month Number (M )', value: 'M ' },
    ];
    var format = new wjInput.ComboBox('#format', {
        itemsSource: formats,
        displayMemberPath: 'name',
        selectedValuePath: 'value',
        textChanged: function (s, e) {
            fld.format = s.selectedValue;
        }
    });
    //
}
