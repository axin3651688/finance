import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './styles.css';
import * as input from '@grapecity/wijmo.input';
import * as chart from '@grapecity/wijmo.chart';
import * as fChart from '@grapecity/wijmo.chart.finance';
import * as fChartAnalytics from '@grapecity/wijmo.chart.finance.analytics';
import { getData, getOverlays } from './data';
//
document.readyState === 'complete' ? init() : window.onload = init;
//
function init() {
    let data = getData();
    // create the chart
    let theChart = new fChart.FinancialChart('#theChart', {
        itemsSource: data,
        bindingX: 'date',
        series: [{
                binding: 'high,low,open,close',
                chartType: fChart.FinancialChartType.Candlestick,
                name: 'Box Inc'
            }],
        legend: {
            position: 'Bottom'
        },
        tooltip: {
            content: '<b>Date:{date:MMM dd}</b><br/>' +
                '<table>' +
                '<tr><td>high</td><td>{high:c}</td><tr/>' +
                '<tr><td>low</td><td>{low:c}</td><tr/>' +
                '<tr><td>open</td><td>{open:c}</td><tr/>' +
                '<tr><td>close</td><td>{close:c}</td><tr/>' +
                '</table>'
        }
    });
    theChart.palette = getRandomPalette();
    theChart.beginUpdate();
    let s = theChart.series;
    //bollinger bands
    let bollingerBands = new fChartAnalytics.BollingerBands({
        binding: 'close',
        name: 'Bollinger Bands',
        period: 20,
        multiplier: 2
    });
    s.push(bollingerBands);
    //envelope
    let envelopes = new fChartAnalytics.Envelopes({
        binding: 'close',
        name: 'Envelopes',
        period: 20,
        type: 'Simple',
        size: 0.03,
        visibility: 'Hidden'
    });
    s.push(envelopes);
    theChart.endUpdate();
    //indicators selector
    let overlays = getOverlays();
    let overlay = new input.ComboBox('#overlay', {
        itemsSource: overlays,
        selectedValuePath: 'abbreviation',
        displayMemberPath: 'name',
        selectedIndexChanged: reset
    });
    reset(overlay);
    function reset(combo) {
        let idx = combo.selectedIndex;
        if (idx === 0) {
            s[1].visibility = chart.SeriesVisibility.Visible;
            s[2].visibility = chart.SeriesVisibility.Hidden;
            document.querySelector('.ul-bollinger').style.display = '';
            document.querySelector('.ul-envelope').style.display = 'none';
        }
        else {
            s[1].visibility = chart.SeriesVisibility.Hidden;
            s[2].visibility = chart.SeriesVisibility.Visible;
            document.querySelector('.ul-bollinger').style.display = 'none';
            document.querySelector('.ul-envelope').style.display = '';
        }
    }
    //bollinger bands properties
    let inputBollingerPeriod = new input.InputNumber('#bollingerPeriod', {
        value: 20,
        min: 2,
        max: data.length > 0 ? data.length - 1 : 20,
        step: 1,
        format: 'n0',
        valueChanged: s => {
            if (s == null || s.value < s.min || s.value > s.max) {
                return;
            }
            bollingerBands.period = s.value;
        }
    });
    let inputBollingerMultiplier = new input.InputNumber('#bollingerMultiplier', {
        value: 2,
        min: 1,
        max: 100,
        step: 1,
        format: 'n0',
        valueChanged: s => {
            if (s == null || s.value < s.min || s.value > s.max) {
                return;
            }
            bollingerBands.multiplier = s.value;
        }
    });
    //envelope properties
    let inputEnvelopePeriod = new input.InputNumber('#envelopePeriod', {
        value: 20,
        min: 2,
        max: data.length > 0 ? data.length - 1 : 20,
        step: 1,
        format: 'n0',
        valueChanged: s => {
            if (s == null || s.value < s.min || s.value > s.max) {
                return;
            }
            envelopes.period = s.value;
        }
    });
    let inputEnvelopeSize = new input.InputNumber('#envelopeSize', {
        value: 0.03,
        min: 0,
        max: 1,
        step: 0.01,
        format: 'p0',
        valueChanged: s => {
            if (s == null || s.value < s.min || s.value > s.max) {
                return;
            }
            envelopes.size = s.value;
        }
    });
    let menuEnvelopeType = new input.Menu('#envelopeType', {
        selectedValue: 'Simple',
        itemClicked: function (sender) {
            envelopes.type = sender.selectedValue;
            updateMenuHeader(menuEnvelopeType, 'Type');
        }
    });
    updateMenuHeader(menuEnvelopeType, 'Type');
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
