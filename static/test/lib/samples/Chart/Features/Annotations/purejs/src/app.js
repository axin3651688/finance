import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './styles.css';
import * as wjChart from '@grapecity/wijmo.chart';
import * as wjAnnotation from '@grapecity/wijmo.chart.annotation';
import { getData, getAnnotation } from './data';
//
document.readyState === 'complete' ? init() : window.onload = init;
//
function init() {
    // create the chart
    let theChart = new wjChart.FlexChart('#theChart', {
        bindingX: 'date',
        chartType: 'Line',
        itemsSource: getData(),
        series: [
            {
                name: 'Sale',
                binding: 'sale'
            }
        ]
    });
    var basicAL = new wjAnnotation.AnnotationLayer(theChart, getAnnotation());
}
