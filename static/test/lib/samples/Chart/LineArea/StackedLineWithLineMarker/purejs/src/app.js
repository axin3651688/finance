import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './styles.css';
import * as chart from '@grapecity/wijmo.chart';
import * as animation from '@grapecity/wijmo.chart.animation';
import { getData } from './data';
//
document.readyState === 'complete' ? init() : window.onload = init;
//
function init() {
    let linechart = new chart.FlexChart('#chart', {
        legend: {
            position: chart.Position.Bottom
        },
        stacking: chart.Stacking.Stacked,
        chartType: chart.ChartType.LineSymbols,
        bindingX: 'year',
        tooltip: {
            content: ''
        },
        series: [
            { binding: 'africa', name: 'Africa' },
            { binding: 'asia', name: 'Asia' },
            { binding: 'europe', name: 'Europe' },
            { binding: 'southAmerica', name: 'South America' },
            { binding: 'northAmerica', name: 'North America' },
            { binding: 'oceania', name: 'Oceania' }
        ],
        axisY: {
            title: 'Populations(in millions)'
        },
        itemsSource: getData(),
        palette: getRandomPalette()
    });
    //
    let ani = new animation.ChartAnimation(linechart);
    //
    // add a LineMarker
    var lm = new chart.LineMarker(linechart, {
        isVisible: false,
        lines: 'Both',
        interaction: 'Move',
        content: (ht) => {
            if (ht.item) {
                let s = `<b>Poplations(in millions)</b></br>Year: ${ht.item.year}`;
                for (let key in ht.item) {
                    if (key !== 'year') {
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
    //
    // show the marker when the mouse is over the chart
    linechart.addEventListener(linechart.hostElement, 'mouseenter', function () {
        lm.isVisible = true;
    });
    //
    linechart.addEventListener(linechart.hostElement, 'mouseleave', function () {
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
