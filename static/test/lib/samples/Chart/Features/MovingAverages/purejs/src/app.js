import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './styles.css';
import * as wjChart from '@grapecity/wijmo.chart';
import * as wjChartAnalytics from '@grapecity/wijmo.chart.analytics';
import * as wjInput from '@grapecity/wijmo.input';
import { getData } from './data';
//
document.readyState === 'complete' ? init() : window.onload = init;
//
function init() {
    // create the chart
    let theChart = new wjChart.FlexChart('#theChart', {
        itemsSource: getData(),
        bindingX: 'date',
        chartType: 'Line',
        axisY: {
            min: 0
        },
        series: [
            { name: 'Sales', binding: 'sales' }
        ]
    });
    //
    // create a MovingAverage and add it to the Chart series collection
    let movingAvg = new wjChartAnalytics.MovingAverage();
    movingAvg.name = 'Moving Average';
    movingAvg.itemsSource = theChart.itemsSource;
    movingAvg.binding = 'sales';
    movingAvg.period = 6;
    movingAvg.style = { stroke: 'darkred', strokeWidth: 3 };
    theChart.series.push(movingAvg);
    //
    // select moving average period
    let period = new wjInput.InputNumber('#period', {
        value: movingAvg.period,
        step: 1,
        min: 2,
        max: 20,
        valueChanged: (s) => {
            if (s.value >= s.min && s.value <= s.max) {
                movingAvg.period = s.value;
            }
        }
    });
    //
    // select moving average type
    let type = new wjInput.ComboBox('#type', {
        itemsSource: 'Simple,Weighted,Exponential,Triangular'.split(','),
        textChanged: (s) => movingAvg.type = s.text
    });
}
