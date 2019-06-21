import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './styles.css';
import * as wjChart from '@grapecity/wijmo.chart';
import * as wjCore from '@grapecity/wijmo';
import { getData } from './data';
//
document.readyState === 'complete' ? init() : window.onload = init;
//
function init() {
    // create the chart
    let theChart = new wjChart.FlexChart('#theChart', {
        axisX: {
            format: 'MMM dd',
            majorGrid: true,
            majorTickMarks: 'Cross',
            majorUnit: 7,
            minorGrid: true,
            minorTickMarks: 'None',
            minorUnit: 1,
        },
        axisY: {
            min: 790,
            max: 860,
            format: 'c0',
            axisLine: true,
            majorGrid: true,
            majorTickMarks: 'Cross',
            majorUnit: 20,
            minorGrid: true,
            minorTickMarks: 'None',
            minorUnit: 5,
        },
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
    theChart.palette = getRandomPalette();
    //
    // toggle custom CSS, grid visibility
    onCheck('customGridlines', (checked) => wjCore.toggleClass(theChart.hostElement, 'custom-gridlines', checked));
    onCheck('x-major', (checked) => theChart.axisX.majorGrid = checked);
    onCheck('x-minor', (checked) => theChart.axisX.minorGrid = checked);
    onCheck('y-major', (checked) => theChart.axisY.majorGrid = checked);
    onCheck('y-minor', (checked) => theChart.axisY.minorGrid = checked);
    //
    onCheck('customUnits', (checked) => {
        if (checked) {
            theChart.axisX.majorUnit = 7;
            theChart.axisX.minorUnit = 1;
            theChart.axisY.majorUnit = 20;
            theChart.axisY.minorUnit = 5;
        }
        else {
            theChart.axisX.majorUnit = null;
            theChart.axisX.minorUnit = null;
            theChart.axisY.majorUnit = null;
            theChart.axisY.minorUnit = null;
        }
    });
    //
    function onCheck(id, fn) {
        document.getElementById(id).addEventListener('click', e => {
            fn(e.target.checked);
        });
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
