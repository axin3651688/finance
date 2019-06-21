import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './styles.css';
//
import * as chart from '@grapecity/wijmo.chart';
import { getData } from './data';
//
document.readyState === 'complete' ? init() : window.onload = init;
//
function init() {
    let theChart = new chart.FlexChart('#theChart', {
        itemsSource: getData(),
        chartType: 'Bubble',
        bindingX: 'sales',
        series: [
            { binding: 'expenses,downloads' }
        ],
        legend: {
            position: 'None'
        },
        tooltip: {
            content: '<b>{item.country}</b>:<table class="chart-tip">' +
                '<tr><td>Sales</td><td>{sales:c0}</td></tr>' +
                '<tr><td>Expenses</td><td>{expenses:c0}</td></tr>' +
                '<tr><td>Downloads</td><td>{downloads:n0}</td></tr>' +
                '</table>'
        },
        axisX: { title: 'Sales', min: 0 },
        axisY: { title: 'Expenses', min: 0 }
    });
}
