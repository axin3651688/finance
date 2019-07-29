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
        series: [
            {
                binding: 'temperature',
                name: 'Mean Temperature'
            },
            {
                binding: 'precipitation',
                name: 'Average Precipitation',
                chartType: chart.ChartType.Line
            }
        ],
        axisY: {
            axisLine: true,
            origin: -10,
            title: 'Mean Temperature (°C)'
        },
        itemsSource: getData(),
        palette: ['rgba(136,189,230,1)', 'rgba(251,178,88,1)', 'rgba(144,205,151,1)', 'rgba(246,170,201,1)',
            'rgba(191,165,84,1)', 'rgba(188,153,199,1)', 'rgba(237,221,70,1)', 'rgba(240,126,110,1)', 'rgba(140,140,140,1)']
    });
    //
    let ani = new animation.ChartAnimation(barchart);
    //
    // create and apply extra Y axis for 'Precipitation' series
    let axisY2 = new chart.Axis();
    axisY2.position = chart.Position.Right;
    axisY2.title = 'Average Precipitation (mm)';
    axisY2.axisLine = true;
    axisY2.min = 0;
    barchart.series[1].axisY = axisY2;
}
