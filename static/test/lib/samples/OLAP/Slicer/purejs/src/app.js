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
        itemsSource: getData(1000),
        valueFields: ['Amount'],
        rowFields: ['Buyer'],
        filterFields: ['Date'] // filter
    });
    //
    // customize fiels
    var fldAmount = ng.fields.getField('Amount'), fldDate = ng.fields.getField('Date');
    fldAmount.format = 'c0';
    fldDate.format = 'MMMM yyyy';
    //
    // show slicer
    var slicer = new wjOlap.Slicer('#slicer', {
        field: fldDate
    });
    //
    // show summary
    var pivotGrid = new wjOlap.PivotGrid('#pivotGrid', {
        itemsSource: ng
    });
    //
    // configure slicer
    document.getElementById('showHeader').addEventListener('click', function (e) {
        slicer.showHeader = e.target.checked;
    });
    document.getElementById('showCheckboxes').addEventListener('click', function (e) {
        slicer.showCheckboxes = e.target.checked;
    });
    //
    // configure field
    document.getElementById('editfield').addEventListener('click', function (e) {
        ng.editField(slicer.field);
    });
}
