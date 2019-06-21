import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './styles.css';
import * as core from '@grapecity/wijmo';
import * as chart from '@grapecity/wijmo.chart';
import * as finance from '@grapecity/wijmo.chart.finance';
import * as interaction from '@grapecity/wijmo.chart.interaction';
import { getData } from './data';
//
document.readyState === 'complete' ? init() : window.onload = init;
//
function init() {
    // create the chart
    let data = getData();
    let theChart = new finance.FinancialChart('#theChart', {
        itemsSource: data,
        bindingX: 'date',
        chartType: 'ColumnVolume',
        series: [
            { binding: 'close,volume', name: 'Column Volume', chartType: 'ColumnVolume' },
            { binding: 'high,low,open,close,volume', name: 'Equi Volume', chartType: 'EquiVolume' },
            { binding: 'high,low,open,close,volume', name: 'Candle Volume', chartType: 'CandleVolume' },
            { binding: 'high,low,open,close,volume', name: 'Arms CandleVolume', chartType: 'ArmsCandleVolume' }
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
    //add plot areas
    let p0 = new chart.PlotArea();
    p0.row = theChart.plotAreas.length;
    p0.height = 100;
    theChart.plotAreas.push(p0);
    let p1 = new chart.PlotArea();
    p1.row = theChart.plotAreas.length;
    p1.height = 100;
    let axisY1 = new chart.Axis(chart.Position.Left);
    axisY1.plotArea = p1;
    theChart.series[1].axisY = axisY1;
    theChart.plotAreas.push(p1);
    let p2 = new chart.PlotArea();
    p2.row = theChart.plotAreas.length;
    p2.height = 100;
    let axisY2 = new chart.Axis(chart.Position.Left);
    axisY2.plotArea = p2;
    theChart.series[2].axisY = axisY2;
    theChart.plotAreas.push(p2);
    let p3 = new chart.PlotArea();
    p3.row = theChart.plotAreas.length;
    p3.height = 100;
    let axisY3 = new chart.Axis(chart.Position.Left);
    axisY3.plotArea = p3;
    theChart.series[3].axisY = axisY3;
    theChart.plotAreas.push(p3);
    //
    let rsChart = new finance.FinancialChart('#rsChart', {
        itemsSource: data,
        bindingX: 'date',
        chartType: 'ColumnVolume',
        series: [
            { binding: 'close,volume', name: 'Box Inc' }
        ],
        axisX: {
            labels: false
        },
        axisY: {
            labels: false,
            majorGrid: false
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
            [theChart.axisY, axisY1, axisY2, axisY3].forEach(axis => {
                axis.min = yRange.min;
                axis.max = yRange.max;
            });
            theChart.invalidate();
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
