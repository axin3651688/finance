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
        header: 'Country GDP(B$)',
        legend: {
            position: chart.Position.Bottom
        },
        bindingX: 'country',
        series: [{
                binding: '2016',
                name: '2016'
            }],
        tooltip: {
            content: ''
        },
        dataLabel: {
            content: '{y}'
        },
        itemsSource: getData(),
        palette: ['rgba(24,188,156,1)', 'rgba(52,152,219,1)', 'rgba(243,156,18,1)', 'rgba(108,193,190,1)', 'rgba(153,165,73,1)',
            'rgba(143,84,181,1)', 'rgba(231,76,60,1)', 'rgba(138,152,153,1)', 'rgba(44,62,80,1)']
    });
    //
    let ani = new animation.ChartAnimation(barchart);
}
