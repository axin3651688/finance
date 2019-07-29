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
        bindingX: 'longitude',
        series: [
            { binding: 'latitude1' },
            { binding: 'latitude2' }
        ],
        axisX: {
            min: 0,
            max: 360,
            majorUnit: 60
        },
        axisY: {
            min: 0,
            max: 100,
            majorUnit: 25
        }
    });
    let ani = new animation.ChartAnimation(r, {
        animationMode: animation.AnimationMode.Series,
        easing: animation.Easing.EaseInOutBounce,
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
