import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './styles.css';
//
import * as chart from '@grapecity/wijmo.chart';
import * as analytics from '@grapecity/wijmo.chart.analytics';
import * as animation from '@grapecity/wijmo.chart.animation';
import { getData } from './data';
//
document.readyState === 'complete' ? init() : window.onload = init;
//
function init() {
    let linechart = new chart.FlexChart('#chart', {
        header: 'Logarithmic Axis',
        legend: {
            position: chart.Position.None
        },
        chartType: chart.ChartType.Scatter,
        bindingX: 'x',
        series: [{
                binding: 'y'
            }],
        axisX: {
            logBase: 10
        },
        itemsSource: getData(),
        palette: getRandomPalette()
    });
    //
    let ani = new animation.ChartAnimation(linechart);
    //
    linechart.series.push(new analytics.TrendLine({
        name: 'Trendline',
        binding: 'y',
        sampleCount: 100
    }));
}
//
function getRandomPalette() {
    let palettes = Object.getOwnPropertyNames(chart.Palettes)
        .filter(prop => typeof chart.Palettes[prop] === "object" && prop !== 'prototype');
    let rand = Math.floor(Math.random() * palettes.length);
    //
    return chart.Palettes[palettes[rand]];
}
