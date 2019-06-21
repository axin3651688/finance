import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './styles.css';
//
import * as wjChart from '@grapecity/wijmo.chart';
import * as wjAnnotation from '@grapecity/wijmo.chart.annotation';
//
import { getData } from './data';
//
document.readyState === 'complete' ? init() : window.onload = init;
//
function init() {
    let theChart = new wjChart.FlexChart('#theChart', {
        chartType: 'Scatter',
        axisY: {
            axisLine: true,
            majorGrid: false,
            origin: 400000,
            majorUnit: 1.5,
            max: 9,
            min: 6,
            labels: false
        },
        axisX: {
            origin: 7.5,
            min: 0,
            max: 800000,
            majorUnit: 200000,
            labels: false
        },
        dataLabel: {
            content: (ht) => ht.item.movie,
            connectingLine: true,
            offset: 10
        },
        legend: {
            position: 'None'
        },
        tooltip: {
            content: (ht) => {
                let item = ht.item;
                return `<b>Movie:</b> ${item.movie} </br><b>Grossing:</b> ${item.gross}</br><b>rating:</b> ${item.rating}`;
            }
        },
        series: [{
                name: 'data',
                itemsSource: getData(),
                bindingX: 'gross',
                binding: 'rating'
            }]
    });
    //
    let annoLayer = new wjAnnotation.AnnotationLayer(theChart, [
        {
            type: 'Text',
            attachment: 'DataCoordinate',
            point: { x: 200000, y: 9 },
            position: wjAnnotation.AnnotationPosition.Bottom,
            text: 'Lower Grossing, Higher Rating'
        }, {
            type: 'Text',
            attachment: 'DataCoordinate',
            point: { x: 600000, y: 9 },
            position: wjAnnotation.AnnotationPosition.Bottom,
            text: 'Higher Grossing, Higher Rating'
        }, {
            type: 'Text',
            attachment: 'DataCoordinate',
            point: { x: 200000, y: 6 },
            text: 'Lower Grossing, Lower Rating'
        }, {
            type: 'Text',
            attachment: 'DataCoordinate',
            point: { x: 600000, y: 6 },
            text: 'Higher Grossing, Lower Rating'
        }
    ]);
}
