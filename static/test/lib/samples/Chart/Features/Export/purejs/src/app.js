import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './styles.css';
import * as wjChart from '@grapecity/wijmo.chart';
import '@grapecity/wijmo.chart.render';
import { getData } from './data';
//
document.readyState === 'complete' ? init() : window.onload = init;
//
function init() {
    // create the chart
    let theChart = new wjChart.FlexChart('#theChart', {
        header: 'Phase II Test Results',
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
    // save chart image to file
    document.querySelector('#saveButtons').addEventListener('click', e => {
        if (e.target instanceof HTMLButtonElement) {
            theChart.saveImageToFile('FlexChart.' + e.target.textContent);
        }
    });
}
