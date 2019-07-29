import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './styles.css';
//
import * as chart from '@grapecity/wijmo.chart';
import * as analytics from '@grapecity/wijmo.chart.analytics';
import * as input from '@grapecity/wijmo.input';
import { getData, getComboData } from './data';
//
document.readyState === 'complete' ? init() : window.onload = init;
//
function init() {
    // create the chart
    let theChart = new chart.FlexChart('#theChart', {
        itemsSource: getData(),
        bindingX: 'date',
        axisX: { format: 'MMM yy' },
        palette: getRandomPalette()
    });
    //
    // create an ErrorBar series and add it to the Chart
    let errorBar = new analytics.ErrorBar({
        errorBarStyle: {
            stroke: 'darkred',
            strokeWidth: 3
        }
    });
    theChart.series.push(errorBar);
    //
    // select chart type
    let chartType = new input.ComboBox('#chartType', {
        itemsSource: ['Column', 'Bar', 'Scatter', 'Line', 'LineSymbols', 'Area', 'Spline', 'SplineSymbols', 'SplineArea'],
        textChanged: (s) => {
            theChart.chartType = s.text;
        }
    });
    //
    // select error mode/amount
    let errorAmount = new input.ComboBox('#errorAmount', {
        displayMemberPath: 'hdr',
        textChanged: (sender) => {
            let value = sender.selectedItem.value;
            errorBar.value = value;
            errorBar.binding = value != null ? 'amount' : 'amount,errorPlus,errorMinus';
            errorBar.errorAmount = sender.selectedItem.mode;
        },
        itemsSource: getComboData()
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
