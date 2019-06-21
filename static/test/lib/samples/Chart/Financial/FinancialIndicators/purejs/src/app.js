import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './styles.css';
import * as input from '@grapecity/wijmo.input';
import * as chart from '@grapecity/wijmo.chart';
import * as fChart from '@grapecity/wijmo.chart.finance';
import * as fChartAnalytics from '@grapecity/wijmo.chart.finance.analytics';
import { getData, getIndicatorList } from './data';
//
document.readyState === 'complete' ? init() : window.onload = init;
//
function init() {
    let data = getData();
    // create the chart
    let theChart = new fChart.FinancialChart('#theChart', {
        itemsSource: data,
        bindingX: 'date',
        series: [
            { binding: 'close', name: 'Box Inc' }
        ],
        legend: {
            position: 'Top'
        },
        tooltip: {
            content: '<b>Date:{date:MMM dd}</b><br/>' +
                '<table>' +
                '<tr><td>high</td><td>{high:c}</td><tr/>' +
                '<tr><td>low</td><td>{low:c}</td><tr/>' +
                '<tr><td>open</td><td>{open:c}</td><tr/>' +
                '<tr><td>close</td><td>{close:c}</td><tr/>' +
                '</table>'
        },
        axisX: {
            labelAngle: 0
        }
    });
    theChart.palette = getRandomPalette();
    //
    let iChart = new fChart.FinancialChart('#iChart', {
        itemsSource: data,
        bindingX: 'date',
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
        },
        rendered: () => {
            iChart.axisX.min = theChart.axisX.actualMin;
            iChart.axisX.max = theChart.axisX.actualMax;
        },
        axisX: {
            labelAngle: 0
        }
    });
    iChart.beginUpdate();
    iChart.palette = getRandomPalette();
    let s = iChart.series;
    //ATR
    let atr = new fChartAnalytics.ATR({
        binding: 'high,low,open,close',
        name: 'ATR',
        period: 14,
    });
    s.push(atr);
    //RSI
    let rsi = new fChartAnalytics.RSI({
        binding: 'close',
        name: 'RSI',
        period: 14,
        visibility: 'Hidden'
    });
    s.push(rsi);
    //cci
    let cci = new fChartAnalytics.CCI({
        binding: 'high,low,open,close',
        name: 'CCI',
        period: 20,
        visibility: 'Hidden'
    });
    s.push(cci);
    //william r
    let williamsR = new fChartAnalytics.WilliamsR({
        binding: 'high,low,open,close',
        name: 'Williams %R',
        period: 14,
        visibility: 'Hidden'
    });
    s.push(williamsR);
    //macd
    let macd = new fChartAnalytics.Macd({
        binding: 'close',
        name: 'MACD,Signal',
        styles: {
            macdLine: {
                stroke: '#bfa554'
            },
            signalLine: {
                stroke: '#bf8c54'
            }
        },
        fastPeriod: 12,
        slowPeriod: 26,
        smoothingPeriod: 9,
        visibility: 'Hidden'
    });
    s.push(macd);
    //macd histogram
    let histogram = new fChartAnalytics.MacdHistogram({
        binding: 'close',
        name: 'MACD Histogram',
        fastPeriod: 12,
        slowPeriod: 26,
        smoothingPeriod: 9,
        visibility: 'Hidden'
    });
    s.push(histogram);
    let stochastic = new fChartAnalytics.Stochastic({
        binding: 'high,low,open,close',
        name: '%K,%D',
        kPeriod: 14,
        dPeriod: 3,
        smoothingPeriod: 1,
        styles: {
            kLine: {
                stroke: '#eddd46'
            },
            dLine: {
                stroke: '#edb747'
            }
        },
        visibility: 'Hidden'
    });
    s.push(stochastic);
    iChart.endUpdate();
    //indicators selector
    let arr = [atr, rsi, cci, williamsR, [macd, histogram], stochastic];
    let selectorArr = ['.ul-atr', '.ul-rsi', '.ul-cci', '.ul-williams-r', '.ul-macd', '.ul-stochastic'];
    let indicatorsList = getIndicatorList();
    let indicators = new input.ComboBox('#indicators', {
        itemsSource: indicatorsList,
        selectedValuePath: 'abbreviation',
        displayMemberPath: 'name',
        selectedIndexChanged: reset
    });
    reset(indicators);
    function reset(combo) {
        let idx = combo.selectedIndex;
        //
        arr.forEach(s => {
            if (s instanceof chart.SeriesBase) {
                s.visibility = chart.SeriesVisibility.Hidden;
            }
            else {
                s[0].visibility = chart.SeriesVisibility.Hidden;
                s[1].visibility = chart.SeriesVisibility.Hidden;
            }
        });
        let series = arr[idx];
        if (series instanceof chart.SeriesBase) {
            series.visibility = chart.SeriesVisibility.Visible;
        }
        else {
            series[0].visibility = chart.SeriesVisibility.Visible;
            series[1].visibility = chart.SeriesVisibility.Visible;
        }
        let props = document.querySelectorAll('.ul-properties');
        for (let i = 0, len = props.length; i < len; i++) {
            let ele = props[i];
            ele.style.display = 'none';
        }
        let showEle = document.querySelector(selectorArr[idx]);
        showEle.style.display = '';
    }
    //ATR properties
    let inputATRPeriod = new input.InputNumber('#atrPeriod', {
        value: 14,
        min: 2,
        max: data.length > 0 ? data.length - 1 : 14,
        step: 1,
        format: 'n0',
        valueChanged: s => {
            if (s == null || s.value < s.min || s.value > s.max) {
                return;
            }
            atr.period = s.value;
        }
    });
    //RSI properties
    let inputRSIPeriod = new input.InputNumber('#rsiPeriod', {
        value: 14,
        min: 2,
        max: data.length > 0 ? data.length - 1 : 14,
        step: 1,
        format: 'n0',
        valueChanged: s => {
            if (s == null || s.value < s.min || s.value > s.max) {
                return;
            }
            rsi.period = s.value;
        }
    });
    //CCI properties
    let inputCCIPeriod = new input.InputNumber('#cciPeriod', {
        value: 20,
        min: 2,
        max: data.length > 0 ? data.length - 1 : 20,
        step: 1,
        format: 'n0',
        valueChanged: s => {
            if (s == null || s.value < s.min || s.value > s.max) {
                return;
            }
            cci.period = s.value;
        }
    });
    //Williams %R properties
    let inputWilliamsRPeriod = new input.InputNumber('#williamsRPeriod', {
        value: 14,
        min: 2,
        max: data.length > 0 ? data.length - 1 : 14,
        step: 1,
        format: 'n0',
        valueChanged: s => {
            if (s == null || s.value < s.min || s.value > s.max) {
                return;
            }
            williamsR.period = s.value;
        }
    });
    //MACD & MACD Histogram properties
    let inputMacdFastPeriod = new input.InputNumber('#macdFastPeriod', {
        value: 12,
        min: 2,
        max: data.length > 0 ? data.length - 1 : 12,
        step: 1,
        format: 'n0',
        valueChanged: s => {
            if (s == null || s.value < s.min || s.value > s.max) {
                return;
            }
            macd.fastPeriod = s.value;
            histogram.fastPeriod = s.value;
        }
    });
    let inputMacdSlowPeriod = new input.InputNumber('#macdSlowPeriod', {
        value: 26,
        min: 2,
        max: data.length > 0 ? data.length - 1 : 26,
        step: 1,
        format: 'n0',
        valueChanged: s => {
            if (s == null || s.value < s.min || s.value > s.max) {
                return;
            }
            macd.slowPeriod = s.value;
            histogram.slowPeriod = s.value;
        }
    });
    let inputMacdSmoothingPeriod = new input.InputNumber('#macdSmoothingPeriod', {
        value: 9,
        min: 2,
        max: data.length > 0 ? data.length - 1 : 9,
        step: 1,
        format: 'n0',
        valueChanged: s => {
            if (s == null || s.value < s.min || s.value > s.max) {
                return;
            }
            macd.smoothingPeriod = s.value;
            histogram.smoothingPeriod = s.value;
        }
    });
    //Stochastic properties
    let inputStochasticKPeriod = new input.InputNumber('#stochasticKPeriod', {
        value: 14,
        min: 2,
        max: data.length > 0 ? data.length - 1 : 14,
        step: 1,
        format: 'n0',
        valueChanged: s => {
            if (s == null || s.value < s.min || s.value > s.max) {
                return;
            }
            stochastic.kPeriod = s.value;
        }
    });
    let inputStochasticDPeriod = new input.InputNumber('#stochasticDPeriod', {
        value: 3,
        min: 2,
        max: data.length > 0 ? data.length - 1 : 3,
        step: 1,
        format: 'n0',
        valueChanged: s => {
            if (s == null || s.value < s.min || s.value > s.max) {
                return;
            }
            stochastic.dPeriod = s.value;
        }
    });
    let inputStochasticSmoothingPeriod = new input.InputNumber('#stochasticSmoothingPeriod', {
        value: 1,
        min: 2,
        max: data.length > 0 ? data.length - 1 : 1,
        step: 1,
        format: 'n0',
        valueChanged: s => {
            if (s == null || s.value < s.min || s.value > s.max) {
                return;
            }
            stochastic.smoothingPeriod = s.value;
        }
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
