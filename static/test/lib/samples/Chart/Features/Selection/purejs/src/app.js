import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './styles.css';
import * as chart from '@grapecity/wijmo.chart';
import * as input from '@grapecity/wijmo.input';
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
                binding: '2014',
                name: '2014'
            }, {
                binding: '2015',
                name: '2015'
            }, {
                binding: '2016',
                name: '2016'
            }],
        selectionMode: chart.SelectionMode.Point,
        itemsSource: getData()
    });
    barchart.palette = getRandomPalette();
    //
    let selection = new input.Menu('#selection');
    selection.itemClicked.addHandler(function (sender) {
        if (!sender.selectedValue)
            return;
        barchart.selectionMode = sender.selectedValue;
        updateMenuHeader(selection, 'Selection');
    });
    updateMenuHeader(selection, 'Selection');
}
//
function getRandomPalette() {
    let palettes = Object.getOwnPropertyNames(chart.Palettes)
        .filter(prop => typeof chart.Palettes[prop] === "object" && prop !== 'prototype');
    let rand = Math.floor(Math.random() * palettes.length);
    //
    return chart.Palettes[palettes[rand]];
}
function updateMenuHeader(menu, prefix) {
    menu.header = `<b>${prefix}</b>: ${menu.selectedValue}`;
}
