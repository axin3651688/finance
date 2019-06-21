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
        rowFields: ['Buyer', 'Type'] // by Buyer and Type
    });
    var amountField = ngPanel.fields.getField('Amount');
    amountField.format = 'c0';
    var dateField = ngPanel.fields.getField('Date');
    dateField.format = 'yyyy'; // show dates as years
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
