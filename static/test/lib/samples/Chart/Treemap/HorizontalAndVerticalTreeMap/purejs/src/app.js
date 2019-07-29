import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './styles.css';
import * as input from '@grapecity/wijmo.input';
import * as chart from '@grapecity/wijmo.chart';
import * as hierarchical from '@grapecity/wijmo.chart.hierarchical';
import { getData } from './data';
//
document.readyState === 'complete' ? init() : window.onload = init;
//
function init() {
    // change chart type
    var typeMenu = new input.Menu('#typeMenu', {
        itemClicked: function (s, e) {
            treemap.type = parseInt(s.selectedValue);
            updateMenuHeader(s, 'Type');
        }
    });
    updateMenuHeader(typeMenu, 'Type');
    //
    var treemap = new hierarchical.TreeMap('#chart', {
        binding: 'sales',
        bindingName: ['category', 'subCategory'],
        itemsSource: getData(),
        dataLabel: {
            position: 'Center',
            content: '{name}'
        },
        type: hierarchical.TreeMapType.Horizontal
    });
    treemap.palette = getRandomPalette();
}
//
function getRandomPalette() {
    let palettes = Object.getOwnPropertyNames(chart.Palettes)
        .filter(prop => typeof chart.Palettes[prop] === "object" && prop !== 'prototype');
    let rand = Math.floor(Math.random() * palettes.length);
    //
    return chart.Palettes[palettes[rand]];
}
// show menu header and current value
function updateMenuHeader(menu, header) {
    menu.header = header
        ? header + ': <b>' + menu.text + '</b>'
        : menu.text;
}
