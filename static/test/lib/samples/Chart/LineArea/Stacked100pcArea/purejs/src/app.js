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
        stacking: chart.Stacking.Stacked100pc,
        chartType: chart.ChartType.Area,
        bindingX: 'year',
        series: [
            { binding: 'africa', name: 'Africa' },
            { binding: 'oceania', name: 'Oceania' },
            { binding: 'asia', name: 'Asia' },
            { binding: 'europe', name: 'Europe' },
            { binding: 'southAmerica', name: 'South America' },
            { binding: 'northAmerica', name: 'North America' }
        ],
        axisY: {
            title: 'Populations'
        },
        itemsSource: getData(),
        palette: getRandomPalette()
    });
    //
    let ani = new animation.ChartAnimation(linechart);
}
//
function getRandomPalette() {
    let palettes = Object.getOwnPropertyNames(chart.Palettes)
        .filter(prop => typeof chart.Palettes[prop] === "object" && prop !== 'prototype');
    let rand = Math.floor(Math.random() * palettes.length);
    //
    return chart.Palettes[palettes[rand]];
}
