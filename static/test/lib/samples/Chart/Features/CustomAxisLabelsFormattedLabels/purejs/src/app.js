import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './styles.css';
import * as wjChart from '@grapecity/wijmo.chart';
import { getData } from './data';
//
document.readyState === 'complete' ? init() : window.onload = init;
//
function init() {
    // create the chart
    let theChart = new wjChart.FlexChart('#theChart', {
        header: 'Country GDP',
        bindingX: 'country',
        itemsSource: getData(),
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
        axisY: {
            itemFormatter: (_, label) => {
                if (label.val >= 10000000) {
                    label.cls = 'high-value';
                }
                else if (label.val < 5000000) {
                    label.cls = 'low-value';
                }
                return label;
            }
        },
    });
    theChart.palette = getRandomPalette();
}
//
function getRandomPalette() {
    let palettes = Object.getOwnPropertyNames(wjChart.Palettes)
        .filter(prop => typeof wjChart.Palettes[prop] === "object" && prop !== 'prototype');
    let rand = Math.floor(Math.random() * palettes.length);
    //
    return wjChart.Palettes[palettes[rand]];
}
