import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './styles.css';
import * as wjOlap from '@grapecity/wijmo.olap';
import { getData } from './data';
import '@grapecity/wijmo.chart.render';
//
document.readyState === 'complete' ? init() : window.onload = init;
//
function init() {
    //
    // initialize pivot engine
    var ngChart = new wjOlap.PivotEngine({
        itemsSource: getData(),
        valueFields: ['Amount'],
        rowFields: ['Buyer', 'Type'],
    });
    ngChart.fields.getField('Amount').format = 'c0'; // customize field
    //
    // show the chart
    var pivotChart = new wjOlap.PivotChart('#pivotChart', {
        itemsSource: ngChart,
        showTitle: true,
        showLegend: 'Auto'
    });
    //
    // toggle chart title
    document.getElementById('chartTitle').addEventListener('click', function (e) {
        pivotChart.showTitle = e.target.checked;
    });
    //
    // export the chart to an image
    document.getElementById('export').addEventListener('click', function (e) {
        if (e.target instanceof HTMLButtonElement) {
            var ext = e.target.textContent.trim();
            pivotChart.saveImageToFile('FlexChart.' + ext);
        }
    });
    //
}
