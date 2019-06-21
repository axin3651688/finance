import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './styles.css';
//
import * as chart from '@grapecity/wijmo.chart';
import * as animation from '@grapecity/wijmo.chart.animation';
import { getData } from './data';
//
document.readyState === 'complete' ? init() : window.onload = init;
//
function init() {
    let lineChart = new chart.FlexChart('#chart', {
        header: '24 Hours CPU Utilization and Temperature',
        legend: {
            position: chart.Position.None
        },
        chartType: chart.ChartType.Line,
        bindingX: 'time',
        interpolateNulls: false,
        series: [
            {
                binding: 'utilization',
                name: 'Utilization(%)'
            },
            {
                binding: 'temperature',
                name: 'Temperature(°C)'
            }
        ],
        itemsSource: getData(),
        palette: getRandomPalette()
    });
    let ani = new animation.ChartAnimation(lineChart);
    ani.animationMode = animation.AnimationMode.Point;
    //
    let chkbox = document.querySelector('#interpolateNulls');
    chkbox.addEventListener('change', () => {
        lineChart.interpolateNulls = chkbox.checked;
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
