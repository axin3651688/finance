import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './styles.css';
import * as core from '@grapecity/wijmo';
import * as chart from '@grapecity/wijmo.chart';
import * as annotation from '@grapecity/wijmo.chart.annotation';
import * as finance from '@grapecity/wijmo.chart.finance';
import * as interaction from '@grapecity/wijmo.chart.interaction';
import { getData, getAnnotations } from './data';
//
document.readyState === 'complete' ? init() : window.onload = init;
//
function init() {
    let volYAxis;
    let data = getData();
    // create the chart
    let theChart = new finance.FinancialChart('#theChart', {
        itemsSource: data,
        bindingX: 'date',
        chartType: 'Candlestick',
        series: [
            { binding: 'high,low,open,close', name: 'HLOC' },
            { binding: 'volume', name: 'Volume', chartType: 'Column' }
        ],
        legend: {
            position: 'None'
        },
        axisX: {
            axisLine: false,
            format: 'MM/dd/yy'
        },
        axisY: {
            position: chart.Position.Right
        },
        tooltip: {
            content: '<b>{date:MMM dd}</b><br/>' +
                '<table>' +
                '<tr><td>high</td><td>{high:c}</td><tr/>' +
                '<tr><td>low</td><td>{low:c}</td><tr/>' +
                '<tr><td>open</td><td>{open:c}</td><tr/>' +
                '<tr><td>close</td><td>{close:c}</td><tr/>' +
                '<tr><td>volume</td><td>{volume:c}</td><tr/>' +
                '</table>'
        },
        rendered: () => {
            if (!volYAxis) {
                var volSeries = theChart.series[1];
                volYAxis = new chart.Axis(0);
                volSeries.axisY = volYAxis;
                if (volSeries.getValues(0)) {
                    volYAxis.max = Math.max.apply(null, volSeries.getValues(0)) * 8;
                }
            }
        }
    });
    //
    let al = new annotation.AnnotationLayer(theChart, getAnnotations());
    //
    let rsChart = new finance.FinancialChart('#rsChart', {
        itemsSource: data,
        bindingX: 'date',
        chartType: 'Area',
        series: [
            { binding: 'close', name: 'Box Inc' }
        ],
        axisX: {
            labels: false
        },
        axisY: {
            majorGrid: false,
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
            // update main chart's x & y range
            theChart.axisX.min = rs.min;
            theChart.axisX.max = rs.max;
            let yRange = findYRange(data, rs.min, rs.max);
            theChart.axisY.min = yRange.min;
            theChart.axisY.max = yRange.max;
            theChart.invalidate();
        }
    });
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
//
// assumes High, Low, Open, Close, and Volume data
// also assumes category axis
function findYRange(data, xmin, xmax) {
    var item, i, ymin = null, ymax = null;
    for (i = 0; i < data.length; i++) {
        item = data[i];
        let v = item.date.valueOf();
        if (xmin > v || v > xmax) {
            continue;
        }
        if (ymax === null || item.close > ymax) {
            ymax = item.close;
        }
        if (ymin === null || item.close < ymin) {
            ymin = item.close;
        }
    }
    return {
        min: ymin,
        max: ymax
    };
}
