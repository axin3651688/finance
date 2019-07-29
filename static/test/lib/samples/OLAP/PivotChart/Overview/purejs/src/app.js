import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './styles.css';
import * as wjOlap from '@grapecity/wijmo.olap';
import * as wjInput from '@grapecity/wijmo.input';
import '@grapecity/wijmo.chart.render';
import { getData } from './data';
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
    // allow users to customize the chart type
    var cmbChartType = new wjInput.ComboBox('#chartType', {
        textChanged: function (s, e) {
            pivotChart.chartType = s.text;
        },
        itemsSource: 'Column,Bar,Line,Area,Pie'.split(',')
    });
    //
    // allow users to customize the chart legend
    var cmbShowLegend = new wjInput.ComboBox('#showLegend', {
        textChanged: function (s, e) {
            pivotChart.showLegend = s.text;
        },
        itemsSource: 'Auto,Always,Never'.split(',')
    });
    //
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
