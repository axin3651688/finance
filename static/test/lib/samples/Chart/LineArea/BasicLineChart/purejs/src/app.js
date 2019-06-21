import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './styles.css';
import * as chart from '@grapecity/wijmo.chart';
import * as animation from '@grapecity/wijmo.chart.animation';
import { getData } from './data';
//
document.readyState === 'complete' ? init() : window.onload = init;
//
function init() {
    let linechart = new chart.FlexChart('#chart', {
        header: 'Temperature of New York',
        legend: {
            position: chart.Position.Bottom
        },
        chartType: chart.ChartType.Line,
        bindingX: 'month',
        series: [{
                binding: 'low',
                name: 'Average Low'
            }, {
                binding: 'high',
                name: 'Average High'
            }, {
                binding: 'mean',
                name: 'Daily Mean'
            }],
        axisY: {
            title: 'Temperature(°C)'
        },
        itemsSource: getData(),
        palette: ['rgba(42,159,214,1)', 'rgba(119,179,0,1)', 'rgba(153,51,204,1)', 'rgba(255,136,0,1)', 'rgba(204,0,0,1)', 'rgba(0,204,163,1)', 'rgba(61,109,204,1)', 'rgba(82,82,82,1)', 'rgba(0,0,0,1)']
    });
    //
    let ani = new animation.ChartAnimation(linechart);
    ani.animationMode = animation.AnimationMode.Point;
}
