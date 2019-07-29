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
    var ng = new wjOlap.PivotEngine({
        itemsSource: getData(),
        valueFields: ['Amount'],
        rowFields: ['Buyer', 'Type'] // summarize amounts
    });
    ng.fields.getField('Amount').format = 'c0'; // customize field
    ng.fields.getField('Buyer').isContentHtml = true;
    ng.fields.getField('Type').isContentHtml = true;
    //
    // show pivot panel
    var pivotPanel = new wjOlap.PivotPanel('#pivotPanel', {
        itemsSource: ng
    });
    //
    // show summary
    var pivotGrid = new wjOlap.PivotGrid('#pivotGrid', {
        itemsSource: ng
    });
}
