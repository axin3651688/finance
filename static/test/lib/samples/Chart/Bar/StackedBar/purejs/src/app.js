import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './styles.css';
//
import * as chart from '@grapecity/wijmo.chart';
import * as animation from '@grapecity/wijmo.chart.animation';
import { getData } from './data';
//
document.readyState === 'complete' ? init() : window.onload = init;
//
function init() {
    let barchart = new chart.FlexChart('#chart', {
        header: 'Country GDP',
        chartType: chart.ChartType.Bar,
        legend: {
            position: chart.Position.Bottom
        },
        bindingX: 'year',
        series: [{
                binding: 'US',
                name: 'US'
            }, {
                binding: 'China',
                name: 'China'
            }, {
                binding: 'Japan',
                name: 'Japan'
            }, {
                binding: 'Germany',
                name: 'Germany'
            }, {
                binding: 'UK',
                name: 'UK'
            }, {
                binding: 'France',
                name: 'France'
            }, {
                binding: 'India',
                name: 'India'
            }, {
                binding: 'Italy',
                name: 'Italy'
            }],
        stacking: chart.Stacking.Stacked,
        axisY: {
            reversed: true
        },
        itemsSource: getData(),
        palette: [
            'rgba(70,107,176,1)', 'rgba(200,180,34,1)', 'rgba(20,136,110,1)', 'rgba(181,72,54,1)',
            'rgba(110,89,68,1)', 'rgba(139,56,114,1)', 'rgba(115,178,43,1)', 'rgba(184,115,32,1)',
            'rgba(20,20,20,1)'
        ]
    });
    //
    let ani = new animation.ChartAnimation(barchart);
}
