import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './styles.css';
import * as chart from '@grapecity/wijmo.chart';
import * as animation from '@grapecity/wijmo.chart.animation';
import * as annotation from '@grapecity/wijmo.chart.annotation';
import { getData } from './data';
//
document.readyState === 'complete' ? init() : window.onload = init;
//
function init() {
    let linechart = new chart.FlexChart('#chart', {
        legend: {
            position: chart.Position.None
        },
        chartType: chart.ChartType.SplineArea,
        bindingX: 'date',
        series: [{
                binding: 'close',
                name: 'Alphabet Inc'
            }],
        axisY: {
            min: 797
        },
        itemsSource: getData(),
        palette: ['rgba(0,95,173,1)', 'rgba(240,100,0,1)', 'rgba(0,147,48,1)', 'rgba(228,0,177,1)', 'rgba(182,88,0,1)', 'rgba(106,39,156,1)', 'rgba(213,162,17,1)', 'rgba(220,1,39,1)', 'rgba(0,0,0,1)']
    });
    //
    let ani = new animation.ChartAnimation(linechart);
    //
    // add annotation layer
    let annotations = new annotation.AnnotationLayer(linechart, [
        {
            type: 'Rectangle',
            attachment: 'DataIndex',
            pointIndex: 33,
            position: 'Top',
            tooltip: 'Something <b>negative</b><br/>happened today...',
            content: 'N',
            width: 20, height: 20,
            style: { fill: '#01DFD7', stroke: '#000000' }
        },
        {
            type: 'Rectangle',
            attachment: 'DataIndex',
            pointIndex: 27,
            position: 'Top',
            tooltip: 'Something <b>positive</b><br/>happened today...',
            content: 'P',
            width: 20, height: 20,
            style: { fill: '#01DFD7', stroke: '#000000' }
        },
        {
            type: 'Image',
            href: 'https://maps.google.com/mapfiles/marker_green.png',
            width: 15, height: 30,
            attachment: 'DataCoordinate',
            point: { x: new Date(2017, 1, 7), y: 800 },
            tooltip: 'Time to buy!'
        },
        {
            type: 'Image',
            href: 'https://maps.google.com/mapfiles/marker_yellow.png',
            width: 15, height: 30,
            attachment: 'DataCoordinate',
            point: { x: new Date(2017, 1, 24), y: 800 },
            tooltip: 'Turbulence ahead...'
        },
        {
            type: 'Image',
            href: 'https://maps.google.com/mapfiles/marker_green.png',
            width: 15, height: 30,
            attachment: 'DataCoordinate',
            point: { x: new Date(2017, 2, 5), y: 800 },
            tooltip: 'All is fine again...'
        }
    ]);
}
