import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './styles.css';
import * as wjOlap from '@grapecity/wijmo.olap';
import * as wjInput from '@grapecity/wijmo.input';
import { getData } from './data';
//
document.readyState === 'complete' ? init() : window.onload = init;
//
function init() {
    //
    // initialize pivot engine
    let ngChart = new wjOlap.PivotEngine({
        itemsSource: getData(),
        valueFields: ['Amount'],
        rowFields: ['Buyer', 'Type'],
    });
    ngChart.fields.getField('Amount').format = 'c0'; // customize field
    //
    // show the chart
    let pivotChart = new wjOlap.PivotChart('#pivotChart', {
        itemsSource: ngChart,
        showTitle: true,
        showLegend: 'Auto'
    });
    // allow users to customize the chart type
    new wjInput.ComboBox('#chartType', {
        textChanged: function (s) {
            pivotChart.chartType = wjOlap.PivotChartType[s.text];
        },
        itemsSource: 'Column,Bar,Line,Scatter,Area,Pie'.split(',')
    });
    //
}
