import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './styles.css';
//
import * as wjChart from '@grapecity/wijmo.chart';
import { getData } from './data';
//
document.readyState === 'complete' ? init() : window.onload = init;
//
function init() {
    // create the chart
    let theChart = new wjChart.FlexChart('#theChart', {
        chartType: 'Scatter',
        axisY: {
            axisLine: true
        },
        series: [
            {
                name: 'Experiment 1',
                itemsSource: getData(50, 0, 3),
                bindingX: 'x',
                binding: 'y'
            },
            {
                name: 'Experiment 2',
                itemsSource: getData(40, 100, 12),
                bindingX: 'x',
                binding: 'y'
            },
            {
                name: 'Experiment 3',
                itemsSource: getData(30, -100, 24),
                bindingX: 'x',
                binding: 'y'
            }
        ]
    });
    //
    // toggle axis origin
    document.querySelector('#axisOrigin').addEventListener('click', e => {
        let origin = e.target.checked ? 0 : null;
        theChart.axisX.origin = origin;
        theChart.axisY.origin = origin;
    });
}
