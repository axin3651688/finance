import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './styles.css';
//
import * as chart from '@grapecity/wijmo.chart';
import * as annotation from '@grapecity/wijmo.chart.annotation';
import { getData } from './data';
//
document.readyState === 'complete' ? init() : window.onload = init;
//
function init() {
    // create the chart
    let data = getData();
    let theChart = new chart.FlexChart('#theChart', {
        chartType: 'Scatter',
        axisY: {
            axisLine: true,
            majorGrid: false,
            min: 40,
            max: 120,
            majorUnit: 10,
            title: 'weight(kg)'
        },
        axisX: {
            title: 'height(cm)',
            min: 140,
            max: 200,
            majorUnit: 10
        },
        series: [
            {
                name: 'Male',
                itemsSource: data[0],
                bindingX: 'height',
                binding: 'weight'
            },
            {
                name: 'Female',
                itemsSource: data[1],
                bindingX: 'height',
                binding: 'weight'
            }
        ],
        palette: chart.Palettes.light
    });
    //
    // add annotation layer
    let annotations = new annotation.AnnotationLayer(theChart, [
        {
            type: 'Polygon',
            attachment: 'DataCoordinate',
            points: [{ x: 147, y: 105 }, { x: 183, y: 105 }, { x: 183, y: 42 }, { x: 147, y: 42 }],
            width: 100, height: 100,
            style: { fill: 'red', opacity: .1 }
        },
        {
            type: 'Polygon',
            attachment: 'DataCoordinate',
            points: [{ x: 157, y: 117 }, { x: 199, y: 117 }, { x: 199, y: 54 }, { x: 157, y: 54 }],
            width: 200, height: 200,
            style: { fill: 'green', opacity: .1 }
        }
    ]);
}
