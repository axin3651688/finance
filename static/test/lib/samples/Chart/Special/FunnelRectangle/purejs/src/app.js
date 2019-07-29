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
    // create the chart
    let theChart = new chart.FlexChart('#theChart', {
        itemsSource: getData(),
        bindingX: 'stage',
        chartType: 'Funnel',
        options: {
            funnel: {
                type: 'rectangle'
            }
        },
        series: [
            { binding: 'count', name: 'Sales Pipeline' }
        ],
        dataLabel: {
            content: '{item.count}'
        },
        palette: getRandomPalette()
    });
}
//
function getRandomPalette() {
    let palettes = Object.getOwnPropertyNames(chart.Palettes)
        .filter(prop => typeof chart.Palettes[prop] === "object" && prop !== 'prototype');
    let rand = Math.floor(Math.random() * palettes.length);
    //
    return chart.Palettes[palettes[rand]];
}
