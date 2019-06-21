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
        legend: {
            position: chart.Position.None
        },
        chartType: chart.ChartType.Area,
        bindingX: 'Date',
        series: [{
                binding: 'MeanTemp',
                name: 'Mean Temperature'
            }],
        axisY: {
            title: 'Temperature(°C)'
        },
        axisX: {
            labelAngle: -45
        },
        itemsSource: getData(),
        palette: chart.Palettes.cyborg
    });
    //
    let ani = new animation.ChartAnimation(linechart);
    ani.animationMode = animation.AnimationMode.Point;
}
