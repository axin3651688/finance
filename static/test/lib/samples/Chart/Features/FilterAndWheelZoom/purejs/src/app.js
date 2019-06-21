import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './styles.css';
import * as wjChart from '@grapecity/wijmo.chart';
import * as wjInput from '@grapecity/wijmo.input';
import * as wjCore from '@grapecity/wijmo';
import { getData } from './data';
//
document.readyState === 'complete' ? init() : window.onload = init;
//
const touchWjCore = wjCore;
//
function init() {
    // create the chart
    let theChart = new wjChart.FlexChart('#theChart', {
        itemsSource: getData(),
        bindingX: 'date',
        chartType: 'Candlestick',
        series: [
            { binding: 'high,low,open,close', name: 'Alphabet Inc' }
        ],
        legend: {
            position: 'None'
        }
    });
    //
    // create the month filter
    let data = theChart.itemsSource, minDate = data[data.length - 1].date, maxDate = data[0].date;
    //
    let theMonth = new wjInput.InputDate('#theMonth', {
        placeholder: 'Select Month',
        selectionMode: 'Month',
        min: new Date(minDate.getFullYear(), minDate.getMonth(), 1),
        max: new Date(maxDate.getFullYear(), maxDate.getMonth() + 1, 0),
        format: 'MMMM yyyy',
        isRequired: false,
        valueChanged: (s) => {
            // reset the chart zoom
            applyZoom(theChart, null);
            //
            // apply filter to chart data
            theChart.collectionView.filter = (item) => {
                if (theMonth.value == null) {
                    return true; // no filter
                }
                //
                return wjCore.Globalize.format(item.date, theMonth.format) == theMonth.text;
            };
        }
    });
    theMonth.value = maxDate;
    theChart.palette = getRandomPalette();
    //
    document.querySelector('#btnResetFilter').addEventListener('click', () => {
        theMonth.value = null;
    });
    //
    // zoom with the mouse wheel
    theChart.hostElement.addEventListener('wheel', e => {
        if (e.ctrlKey) {
            let center = theChart.pointToData(e.clientX, e.clientY);
            applyZoom(theChart, e.deltaY > 0 ? 1.1 : .9, center);
            e.preventDefault();
        }
    });
    //
    // zoom logic
    document.querySelector('#btnZoomIn').addEventListener('click', () => applyZoom(theChart, .9));
    document.querySelector('#btnZoomOut').addEventListener('click', () => applyZoom(theChart, 1.1));
    document.querySelector('#btnResetZoom').addEventListener('click', () => applyZoom(theChart, null));
    //
    // apply a zoom factor to the chart (keeping the center constant)
    function applyZoom(chart, factor, center) {
        applyZoomAxis(chart.axisX, factor, center ? center.x : null);
        applyZoomAxis(chart.axisY, factor, center ? center.y : null);
    }
    //
    function applyZoomAxis(axis, factor, center) {
        if (!factor) { // reset
            axis.min = axis.max = null;
        }
        else {
            let min = (axis.min != null ? axis.min : axis.actualMin).valueOf(), max = (axis.max != null ? axis.max : axis.actualMax).valueOf();
            //
            if (center == null) {
                center = (min + max) / 2;
            }
            //
            axis.min = center - (center - min) * factor;
            axis.max = center + (max - center) * factor;
        }
    }
}
//
function getRandomPalette() {
    let palettes = Object.getOwnPropertyNames(wjChart.Palettes)
        .filter(prop => typeof wjChart.Palettes[prop] === "object" && prop !== 'prototype');
    let rand = Math.floor(Math.random() * palettes.length);
    //
    return wjChart.Palettes[palettes[rand]];
}
