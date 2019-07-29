import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './styles.css';
//
import * as chart from '@grapecity/wijmo.chart';
import * as analytics from '@grapecity/wijmo.chart.analytics';
import { getData } from './data';
//
document.readyState === 'complete' ? init() : window.onload = init;
//
function init() {
    // create the chart
    let theChart = new chart.FlexChart('#theChart', {
        itemsSource: getData(),
        bindingX: 'country',
        tooltip: { content: '{seriesName}: <b>{x}</b>' },
        palette: getRandomPalette()
    });
    //
    // create BoxWhisker series for 'sales' and add it to the chart
    theChart.series.push(new analytics.BoxWhisker({
        name: 'Sales',
        binding: 'sales',
        groupWidth: 0.7,
        gapWidth: 0.2
    }));
    //
    // create BoxWhisker series for 'expenses' and add it to the chart
    theChart.series.push(new analytics.BoxWhisker({
        name: 'Expenses',
        binding: 'expenses',
        groupWidth: 0.7,
        gapWidth: 0.2
    }));
    //
    // customize the BoxWhisker series
    document.querySelector('#innerPoints').addEventListener('click', e => {
        theChart.series.forEach((series) => {
            series.showInnerPoints = e.target.checked;
        });
    });
    document.querySelector('#outliers').addEventListener('click', e => {
        theChart.series.forEach((series) => {
            series.showOutliers = e.target.checked;
        });
    });
    document.querySelector('#meanline').addEventListener('click', e => {
        theChart.series.forEach((series) => {
            series.showMeanLine = e.target.checked;
        });
    });
    document.querySelector('#meanmarker').addEventListener('click', e => {
        theChart.series.forEach((series) => {
            series.showMeanMarker = e.target.checked;
        });
    });
    document.querySelector('#rotated').addEventListener('click', e => {
        theChart.rotated = e.target.checked;
    });
    //
    // randomize the data
    document.querySelector('#btnRandomize').addEventListener('click', () => {
        theChart.itemsSource = getData();
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
