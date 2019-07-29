import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './styles.css';
import * as wjChart from '@grapecity/wijmo.chart';
import { getData } from './data';
//
document.readyState === 'complete' ? init() : window.onload = init;
//
function init() {
    // create a chart
    let theChart = new wjChart.FlexChart('#theChart', {
        legendToggle: true,
        itemsSource: getData(),
        bindingX: 'country',
        series: [
            { binding: '2014', name: '2014' },
            { binding: '2015', name: '2015' },
            { binding: '2016', name: '2016' }
        ]
    });
    theChart.palette = getRandomPalette();
    //
    // change legendToggle
    document.querySelector('#legendToggle').addEventListener('click', e => {
        theChart.legendToggle = e.target.checked;
    });
}
//
function getRandomPalette() {
    let palettes = Object.getOwnPropertyNames(wjChart.Palettes)
        .filter(prop => typeof wjChart.Palettes[prop] === "object" && prop !== 'prototype');
    let rand = Math.floor(Math.random() * palettes.length);
    //
    return wjChart.Palettes[palettes[rand]];
}
