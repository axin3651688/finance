import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './styles.css';
import * as chart from '@grapecity/wijmo.chart';
import { getData } from './data';
//
document.readyState === 'complete' ? init() : window.onload = init;
//
function init() {
    let barchart = new chart.FlexChart('#chart', {
        header: 'Country GDP',
        legend: {
            position: chart.Position.Bottom
        },
        bindingX: 'country',
        series: [{
                binding: 'sales',
                name: 'Sales'
            }, {
                binding: 'downloads',
                name: 'Downloads'
            }],
        tooltip: {
            content: (hti) => {
                let item = hti.item;
                return `<b>Country: </b>${item.country} <img src="resources/${item.country}.png" /></br>downloads: ${item.downloads}</br>sales: ${item.sales}`;
            }
        },
        itemsSource: getData()
    });
    barchart.palette = getRandomPalette();
}
//
function getRandomPalette() {
    let palettes = Object.getOwnPropertyNames(chart.Palettes)
        .filter(prop => typeof chart.Palettes[prop] === "object" && prop !== 'prototype');
    let rand = Math.floor(Math.random() * palettes.length);
    //
    return chart.Palettes[palettes[rand]];
}
