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
        header: 'Climate of New York',
        legend: {
            position: chart.Position.None
        },
        bindingX: 'month',
        series: [{
                binding: 'low,high',
                name: 'Temperature'
            }],
        axisY: {
            title: 'Temperature °C'
        },
        tooltip: {
            content: (hti) => {
                let item = hti.item;
                return `Average Temperature</br>Month:${item.month} </br> High: ${item.high}°C, Low: ${item.low}°C`;
            }
        },
        itemsSource: getData(),
        palette: ['rgba(136,189,230,1)', 'rgba(251,178,88,1)', 'rgba(144,205,151,1)', 'rgba(246,170,201,1)',
            'rgba(191,165,84,1)', 'rgba(188,153,199,1)', 'rgba(237,221,70,1)', 'rgba(240,126,110,1)', 'rgba(140,140,140,1)']
    });
    //
    let ani = new animation.ChartAnimation(barchart);
}
