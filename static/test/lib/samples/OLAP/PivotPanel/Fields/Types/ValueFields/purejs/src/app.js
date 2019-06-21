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
        itemsSource: getData(),
        valueFields: ['Amount'],
        rowFields: ['Buyer', 'Type'] // summarize amounts
    });
    var amountField = ngPanel.fields.getField('Amount');
    amountField.format = 'c0'; // customize field
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
