import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './styles.css';
//
import * as chart from '@grapecity/wijmo.chart';
import { getData } from './data';
import { Point } from '@grapecity/wijmo';
//
document.readyState === 'complete' ? init() : window.onload = init;
//
function init() {
    let theChart = new chart.FlexChart('#chart', {
        chartType: 'LineSymbols',
        itemsSource: getData(),
        bindingX: 'hour',
        legend: {
            position: 'Bottom'
        },
        series: [
            {
                binding: 't',
                name: 'temperature',
                tooltipContent: '{y} °C'
            },
            {
                chartType: "Scatter",
                binding: 'wspeed',
                name: 'wind speed',
                tooltipContent: '{wdir}<br/>{y} km/h',
                style: { strokeWidth: 1 },
                symbolSize: 3,
                itemFormatter: (engine, ht, render) => {
                    render();
                    var dir = ht.item.wdir;
                    drawArrow(engine, ht.point, dir);
                }
            },
        ],
        axisX: {
            title: 'hour'
        },
        axisY: {
            title: '°C',
            majorGrid: false,
            min: 0,
            max: 20
        },
    });
    //
    var p = new chart.PlotArea();
    p.row = theChart.plotAreas.length;
    p.name = 'amounts';
    p.height = '*';
    p.style = { stroke: 'lightgray' };
    theChart.plotAreas.push(p);
    // create a spacer plot area
    p = new chart.PlotArea();
    p.row = theChart.plotAreas.length;
    p.name = 'spacer';
    p.height = 25;
    theChart.plotAreas.push(p);
    // create a plot area for quantities
    p = new chart.PlotArea();
    p.row = theChart.plotAreas.length;
    p.name = 'quantities';
    p.height = '*';
    p.style = { stroke: 'lightgray' };
    var axy2 = new chart.Axis(chart.Position.Left);
    axy2.labels = true;
    axy2.title = 'km/h';
    axy2.min = 0;
    axy2.max = 20;
    axy2.plotArea = p;
    theChart.series[1].axisY = axy2;
    theChart.plotAreas.push(p);
}
function drawArrow(engine, pt, dir) {
    let a = directioToAngle(dir);
    a *= Math.PI / 180;
    let sz = 12;
    let szar = 8;
    let x = sz * Math.cos(a);
    let y = sz * Math.sin(a);
    engine.strokeWidth = 1;
    engine.drawLine(pt.x - x, pt.y - y, pt.x + x, pt.y + y);
    let edge = new Point(pt.x + x, pt.y + y);
    let x1 = szar * Math.cos(a - 100);
    let y1 = szar * Math.sin(a - 100);
    let x2 = szar * Math.cos(a + 100);
    let y2 = szar * Math.sin(a + 100);
    engine.drawLine(edge.x, edge.y, edge.x - x1, edge.y - y1);
    engine.drawLine(edge.x, edge.y, edge.x - x2, edge.y - y2);
}
function directioToAngle(dir) {
    switch (dir) {
        case 'E':
            return 0;
        case 'ESE':
            return 22.5;
        case 'SE':
            return 45;
        case 'SSE':
            return 67.5;
        case 'S':
            return 90;
        case 'SSW':
            return 112.5;
        case 'SW':
            return 135;
        case 'WSW':
            return 157.5;
        case "W":
            return 180;
        case "WNW":
            return 202.5;
        case "NW":
            return 225;
        case "NNW":
            return 247.5;
        case "N":
            return 270;
        case "NNE":
            return 292.5;
        case "NE":
            return 315;
        case "ENE":
            return 337.5;
    }
    return 0;
}
