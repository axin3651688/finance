import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './styles.css';
import * as wjChart from '@grapecity/wijmo.chart';
import { getData } from './data';
//
document.readyState === 'complete' ? init() : window.onload = init;
//
function init() {
    // create the chart
    let theChart = new wjChart.FlexChart('#theChart', {
        chartType: 'Scatter',
        axisY: {
            axisLine: true,
            majorGrid: false,
            origin: 0,
            majorUnit: 1,
            max: 1,
            min: -1,
            labels: false
        },
        axisX: {
            origin: 0,
            min: -1,
            max: 1,
            majorUnit: 1,
            labels: false
        },
        legend: {
            position: 'None'
        },
        tooltip: {
            content: ''
        },
        bindingX: 'x',
        itemsSource: getData(750),
        series: [
            {
                name: 'data1',
                binding: 'y1'
            },
            {
                name: 'data2',
                binding: 'y2'
            }
        ]
    });
    theChart.palette = getRandomPalette();
}
//
function getRandomPalette() {
    let palettes = Object.getOwnPropertyNames(wjChart.Palettes)
        .filter(prop => typeof wjChart.Palettes[prop] === "object" && prop !== 'prototype');
    let rand = Math.floor(Math.random() * palettes.length);
    //
    return wjChart.Palettes[palettes[rand]];
}
