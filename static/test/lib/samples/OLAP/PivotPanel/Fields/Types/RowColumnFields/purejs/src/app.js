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
    // initialize pivot engine
    var ngPanel = new wjOlap.PivotEngine({
        itemsSource: getData(1000),
        valueFields: ['Amount'],
        rowFields: ['Buyer', 'Type'] // summarize amounts
    });
    var amountField = ngPanel.fields.getField('Amount');
    amountField.format = 'c0'; // customize field
    //
    // clone the date fields to show quarters
    var yearField = ngPanel.fields.getField('Date');
    yearField.header = 'Year';
    yearField.format = 'yyyy';
    //
    var quarterField = new wjOlap.PivotField(ngPanel, 'date', 'Quarter');
    quarterField.format = '"Q"q';
    ngPanel.fields.splice(1, 0, quarterField);
    //
    // show pivot panel
    var pivotPanel = new wjOlap.PivotPanel('#pivotPanel', {
        itemsSource: ngPanel
    });
    //
    // show summary
    var pivotPanelGrid = new wjOlap.PivotGrid('#pivotPanelGrid', {
        itemsSource: ngPanel
    });
}
