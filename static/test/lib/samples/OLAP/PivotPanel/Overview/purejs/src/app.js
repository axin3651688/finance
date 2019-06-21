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
    ngPanel.fields.getField('Amount').format = 'c0'; // customize field
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
    var pivotPanelChart = new wjOlap.PivotChart('#pivotPanelChart', {
        itemsSource: ngPanel,
        showTitle: false,
        showLegend: 'Auto'
    });
    //
    // save/restore views
    document.getElementById('saveView').addEventListener('click', function () {
        if (ngPanel.isViewDefined) {
            localStorage.viewDefinition = ngPanel.viewDefinition;
        }
    });
    document.getElementById('restoreView').addEventListener('click', function () {
        if (localStorage.viewDefinition) {
            ngPanel.viewDefinition = localStorage.viewDefinition;
        }
    });
}
