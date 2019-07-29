import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './styles.css';
import * as core from '@grapecity/wijmo';
import * as chart from '@grapecity/wijmo.chart';
import { getData } from './data';
//
document.readyState === 'complete' ? init() : window.onload = init;
//
function init() {
    // create the chart
    let theChart = new chart.FlexChart('#theChart', {
        itemsSource: getData(),
        bindingX: 'date',
        chartType: 'HighLowOpenClose',
        series: [
            { binding: 'high,low,open,close', name: 'Box Inc' }
        ],
        legend: {
            position: 'None'
        }
    });
    theChart.palette = getRandomPalette();
    //
    var lm = new chart.LineMarker(theChart, {
        isVisible: false,
        lines: 'Both',
        interaction: 'Move',
        content: function (ht) {
            if (ht.item) {
                let s = `<b>Date</b>: ${core.Globalize.formatDate(ht.item.date, 'yyyy-MM-dd')}`;
                for (let key in ht.item) {
                    if (key !== 'date') {
                        s += `</br> ${key}: ${ht.item[key]}`;
                    }
                }
                return s;
            }
            else {
                return 'No items here...';
            }
        }
    });
    // show the marker when the mouse is over the chart
    theChart.addEventListener(theChart.hostElement, 'mouseenter', function () {
        lm.isVisible = true;
    });
    theChart.addEventListener(theChart.hostElement, 'mouseleave', function () {
        lm.isVisible = false;
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
