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
    let linechart = new chart.FlexChart('#chart', {
        header: 'Device Temperature Monitor',
        legend: {
            position: chart.Position.None
        },
        chartType: chart.ChartType.Line,
        bindingX: 'x',
        series: [{
                binding: 'y',
                name: 'Temperature'
            }],
        axisY: {
            min: 0,
            max: 100,
            majorGrid: false,
            title: 'Temperature(°C)'
        },
        rendering: function (s, e) {
            var xMin = s.axisX.actualMin.valueOf(), xMax = s.axisX.actualMax.valueOf(), yMin = s.axisY.actualMin, yMax = s.axisY.actualMax;
            if (isNaN(xMin) && isNaN(xMax)) {
                return;
            }
            drawAlarmZone(s, e.engine, xMin, 80, xMax, yMax, 'alarm-zone');
            drawAlarmZone(s, e.engine, xMin, 50, xMax, 80, 'warning-zone');
            drawAlarmZone(s, e.engine, xMin, yMin, xMax, 50, 'safe-zone');
        }
    });
    //
    setInterval(() => {
        let data = getData();
        linechart.itemsSource = data;
    }, 1000);
}
// draw an alarm zone into the chart
function drawAlarmZone(chart, engine, xMin, yMin, xMax, yMax, className) {
    var pt1 = chart.dataToPoint(xMin, yMin);
    var pt2 = chart.dataToPoint(xMax, yMax);
    engine.drawRect(Math.min(pt1.x, pt2.x), Math.min(pt1.y, pt2.y), Math.abs(pt2.x - pt1.x), Math.abs(pt2.y - pt1.y), className);
}
