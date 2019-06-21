import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './styles.css';
import * as core from '@grapecity/wijmo';
import * as input from '@grapecity/wijmo.input';
import * as chart from '@grapecity/wijmo.chart';
import * as finance from '@grapecity/wijmo.chart.finance';
import * as interaction from '@grapecity/wijmo.chart.interaction';
import { getSymbols, getData } from './data';
//
document.readyState === 'complete' ? init() : window.onload = init;
//
function init() {
    // create the chart
    let data = getData('box');
    let theChart = new finance.FinancialChart('#theChart', {
        itemsSource: data,
        bindingX: 'date',
        chartType: 'HeikinAshi',
        series: [
            { binding: 'high,low,open,close', name: 'Box Inc' }
        ],
        legend: {
            position: 'None'
        },
        tooltip: {
            content: function (ht) {
                var date = ht.item && ht.item.date ? ht.item.date : null, content = '';
                if (core.isDate(date)) {
                    date = core.Globalize.formatDate(date, 'MM/dd/yy');
                }
                if (ht && ht.item) {
                    content =
                        '<b>' + ht.name + '</b><br/>' +
                            'Date: ' + date + '<br/>' +
                            'Open: ' + core.Globalize.format(ht.item.open, 'n2') + '<br/>' +
                            'High: ' + core.Globalize.format(ht.item.high, 'n2') + '<br/>' +
                            'Low: ' + core.Globalize.format(ht.item.low, 'n2') + '<br/>' +
                            'Close: ' + core.Globalize.format(ht.item.close, 'n2') + '<br/>' +
                            'Volume: ' + core.Globalize.format(ht.item.volume, 'n0');
                }
                return content;
            }
        }
    });
    theChart.palette = getRandomPalette();
    let rsChart = new finance.FinancialChart('#rsChart', {
        itemsSource: data,
        bindingX: 'date',
        chartType: 'HeikinAshi',
        series: [
            { binding: 'high,low,open,close', name: 'Box Inc' }
        ],
        axisY: {
            labels: false
        },
        tooltip: {
            content: ''
        },
        legend: {
            position: 'None'
        },
        rendered: function () {
            // set range
            if (rs) {
                var range = findRange(rsChart.axisX.actualMin, rsChart.axisX.actualMax);
                rs.min = range.min;
                rs.max = range.max;
            }
        }
    });
    let rs = new interaction.RangeSelector(rsChart, {
        seamless: true,
        rangeChanged: function () {
            // find visible y-range
            var yRange = findYRange(data, rs.min, rs.max);
            // update main chart's x & y range
            theChart.axisX.min = rs.min;
            theChart.axisX.max = rs.max;
            theChart.axisY.min = yRange.min;
            theChart.axisY.max = yRange.max;
            theChart.invalidate();
        }
    });
    let symbols = new input.ComboBox('#comboSymbols', {
        itemsSource: getSymbols(),
        displayMemberPath: 'name',
        selectedValuePath: 'symbol',
        selectedValue: 'box',
        selectedIndexChanged: function (sender) {
            data = getData(sender.selectedValue);
            theChart.itemsSource = data;
            rsChart.itemsSource = data;
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
// helper method to calculate (upper) percentage of total range
// the default will show the top 20% of the available range
function findRange(min, max, percent) {
    var pctToShow = core.isNumber(percent) && 0 < percent && percent < 1 ? percent : 0.2, range = {
        min: NaN,
        max: NaN
    };
    if (core.isDate(min) && core.isDate(max)) {
        range.max = max.valueOf();
        range.min = (max.valueOf() - min.valueOf()) * (1 - pctToShow) + min.valueOf();
    }
    else if (core.isNumber(min) && core.isNumber(max)) {
        range.max = max;
        range.min = (max - min) * (1 - pctToShow) + min;
    }
    return range;
}
// assumes High, Low, Open, Close, and Volume data
// also assumes category axis
function findYRange(data, xmin, xmax) {
    var item, i, ymin = null, ymax = null;
    for (i = 0; i < data.length; i++) {
        item = data[i];
        if (xmin > i || i > xmax) {
            continue;
        }
        if (ymax === null || item.high > ymax) {
            ymax = item.high;
        }
        if (ymin === null || item.low < ymin) {
            ymin = item.low;
        }
    }
    return {
        min: ymin,
        max: ymax
    };
}
