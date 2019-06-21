import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './styles.css';
//
import * as chart from '@grapecity/wijmo.chart';
import * as analytics from '@grapecity/wijmo.chart.analytics';
import { getData } from './data';
//
document.readyState === 'complete' ? init() : window.onload = init;
//
function init() {
    // create the chart
    let theChart = new chart.FlexChart('#theChart', {
        itemsSource: getData(),
        chartType: 'Scatter',
        bindingX: 'x',
        series: [
            { name: 'Raw Data', binding: 'y' }
        ]
    });
    //
    // create a TrendLine and add it to the chart
    theChart.series.push(new analytics.TrendLine({
        name: 'TrendLine',
        binding: 'y',
        fitType: analytics.TrendLineFitType.Polynomial,
        order: 2,
        style: { stroke: 'darkred', strokeWidth: 3 }
    }));
    //
    // create a MovingAverage and add it to the chart
    theChart.series.push(new analytics.MovingAverage({
        name: 'MovingAverage',
        binding: 'y',
        period: 6,
        style: { stroke: 'orange', strokeWidth: 3 }
    }));
}
