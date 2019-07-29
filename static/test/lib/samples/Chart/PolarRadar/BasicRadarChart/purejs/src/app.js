import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './styles.css';
import * as chart from '@grapecity/wijmo.chart';
import * as radar from '@grapecity/wijmo.chart.radar';
import * as animation from '@grapecity/wijmo.chart.animation';
import { getData } from './data';
//
document.readyState === 'complete' ? init() : window.onload = init;
//
function init() {
    var r = new radar.FlexRadar('#chart', {
        itemsSource: getData(),
        bindingX: 'country',
        series: [
            { name: 'Sales', binding: 'sales' },
            { name: 'Downloads', binding: 'downloads' }
        ],
        axisY: {
            min: 0,
            max: 100
        }
    });
    let ani = new animation.ChartAnimation(r, {
        animationMode: animation.AnimationMode.Point,
        easing: animation.Easing.Swing,
        duration: 1000
    });
    r.palette = getRandomPalette();
}
//
function getRandomPalette() {
    let palettes = Object.getOwnPropertyNames(chart.Palettes)
        .filter(prop => typeof chart.Palettes[prop] === "object" && prop !== 'prototype');
    let rand = Math.floor(Math.random() * palettes.length);
    //
    return chart.Palettes[palettes[rand]];
}
