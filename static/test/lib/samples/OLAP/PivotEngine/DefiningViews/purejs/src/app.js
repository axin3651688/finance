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
        autoGenerateFields: false,
        fields: [
            { binding: 'date', header: 'Date', format: 'yyyy' },
            { binding: 'date', header: 'Quarter', format: '"Q"q' },
            { binding: 'buyer', header: 'Person' },
            { binding: 'type', header: 'Category' },
            { binding: 'amount', header: 'Amount', format: 'c0', aggregate: 'Sum' }
        ],
        itemsSource: getData(10000),
        showRowTotals: 'Subtotals',
        valueFields: ['Amount'],
        rowFields: ['Person']
    });
    //
    // allow users to edit the view
    var pivotPanel = new wjOlap.PivotPanel('#pivotPanel', {
        itemsSource: ng
    });
    //
    // show summary
    var pivotGrid = new wjOlap.PivotGrid('#pivotGrid', {
        itemsSource: ng
    });
    //
    // save/load views
    document.getElementById('save').addEventListener('click', function () {
        localStorage.viewDefinition = ng.viewDefinition;
    });
    document.getElementById('load').addEventListener('click', function () {
        if (localStorage.viewDefinition) {
            ng.viewDefinition = localStorage.viewDefinition;
        }
    });
    //
    // handle click events to build the views
    document.getElementById('buttons').addEventListener('click', function (e) {
        switch (e.target.id) {
            //
            case 'who':
                ng.rowFields.clear();
                ng.rowFields.push('Person');
                break;
            //
            case 'what':
                ng.rowFields.clear();
                ng.rowFields.push('Category');
                break;
            //
            case 'who-what':
                ng.rowFields.clear();
                ng.rowFields.push('Person', 'Category');
                break;
            //
            case 'when':
                ng.rowFields.clear();
                ng.rowFields.push('Date');
                ng.rowFields.push('Quarter');
                break;
        }
    });
}
