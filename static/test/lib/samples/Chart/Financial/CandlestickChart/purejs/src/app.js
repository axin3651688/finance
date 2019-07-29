import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './styles.css';
import * as chart from '@grapecity/wijmo.chart';
import { getData } from './data';
//
document.readyState === 'complete' ? init() : window.onload = init;
//
function init() {
    // create the chart
    let theChart = new chart.FlexChart('#theChart', {
        itemsSource: getData(),
        bindingX: 'date',
        chartType: 'Candlestick',
        series: [
            { binding: 'high,low,open,close', name: 'Box Inc' }
        ],
        legend: {
            position: 'None'
        },
        tooltip: {
            content: '<b>{date:MMM dd}</b><br/>' +
                '<table>' +
                '<tr><td>high</td><td>{high:c}</td><tr/>' +
                '<tr><td>low</td><td>{low:c}</td><tr/>' +
                '<tr><td>open</td><td>{open:c}</td><tr/>' +
                '<tr><td>close</td><td>{close:c}</td><tr/>' +
                '</table>'
        }
    });
    theChart.palette = ['rgba(70,107,176,1)', 'rgba(200,180,34,1)', 'rgba(20,136,110,1)', 'rgba(181,72,54,1)',
        'rgba(110,89,68,1)', 'rgba(139,56,114,1)', 'rgba(115,178,43,1)', 'rgba(184,115,32,1)', 'rgba(20,20,20,1)'];
}
