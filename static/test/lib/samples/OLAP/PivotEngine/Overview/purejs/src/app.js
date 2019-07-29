import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './styles.css';
import * as wjOlap from '@grapecity/wijmo.olap';
import * as wjGrid from '@grapecity/wijmo.grid';
import { getData } from './data';
//
document.readyState === 'complete' ? init() : window.onload = init;
//
function init() {
    //
    // initialize pivot engine
    var ng = new wjOlap.PivotEngine({
        itemsSource: getData(10000),
        showRowTotals: 'Subtotals',
        valueFields: ['Amount'],
        rowFields: ['Buyer', 'Type'] // by buyer and by type
    });
    ng.fields.getField('Amount').format = 'c0'; // customize field
    //
    // show raw data
    var rawData = new wjGrid.FlexGrid('#rawData', {
        itemsSource: ng.collectionView
    });
    //
    // show summary
    var pivotGrid = new wjOlap.PivotGrid('#pivotGrid', {
        itemsSource: ng
    });
}
