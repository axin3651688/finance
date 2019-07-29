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
        header: 'Temperature of New York',
        legend: {
            position: chart.Position.Right
        },
        chartType: chart.ChartType.SplineSymbols,
        dataLabel: {
            content: '{y}'
        },
        tooltip: {
            content: ''
        },
        bindingX: 'month',
        series: [
            {
                binding: 'low',
                name: 'Average Low'
            },
            {
                binding: 'high',
                name: 'Average High'
            },
            {
                binding: 'mean',
                name: 'Daily Mean'
            }
        ],
        axisY: {
            title: 'Temperature(°C)'
        },
        itemsSource: getData(),
        palette: getRandomPalette()
    });
    //
    let ani = new animation.ChartAnimation(linechart);
    ani.animationMode = animation.AnimationMode.Series;
}
//
function getRandomPalette() {
    let palettes = Object.getOwnPropertyNames(chart.Palettes)
        .filter(prop => typeof chart.Palettes[prop] === "object" && prop !== 'prototype');
    let rand = Math.floor(Math.random() * palettes.length);
    //
    return chart.Palettes[palettes[rand]];
}
