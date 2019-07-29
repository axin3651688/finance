import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './styles.css';
//
import * as chart from '@grapecity/wijmo.chart';
import { getRawData } from './data';
//
document.readyState === 'complete' ? init() : window.onload = init;
//
function init() {
    let rawData = getRawData();
    let pct25_75 = calcRanges(rawData, 25, 75);
    let pct5_95 = calcRanges(rawData, 5, 95);
    let chartCtr = new chart.FlexChart('#chart', {
        chartType: 'Area',
        series: [
            {
                itemsSource: pct5_95,
                bindingX: 'day',
                binding: 'min,max',
                name: '5% - 95%',
                style: { fill: 'rgba(136, 189, 230, 0.2)', stroke: 'transparent' },
            },
            {
                itemsSource: pct25_75,
                bindingX: 'day',
                binding: 'min,max',
                name: '25% - 75%',
                style: { fill: 'rgba(136, 189, 230, 0.4)', stroke: 'transparent' }
            },
            {
                itemsSource: rawData,
                bindingX: 'day',
                binding: 'time',
                name: 'raw data',
                chartType: 'Scatter',
                style: { fill: 'black', stroke: 'transparent' },
                symbolSize: 4
            },
        ],
        axisX: {
            title: 'day'
        },
        axisY: {
            title: 'time'
        },
    });
    //
}
function calcRanges(rawData, minPct, maxPct) {
    let dict = {};
    let data = [];
    for (let i = 0; i < rawData.length; i++) {
        let day = rawData[i].day;
        if (!dict[day]) {
            dict[day] = [];
        }
        dict[day].push(rawData[i].time);
    }
    for (let d in dict) {
        let vals = dict[d];
        vals.sort((a, b) => a - b);
        let min = calcPecentile(vals, minPct); // vals[Math.ceil(minPct / 100 * vals.length)];
        let max = calcPecentile(vals, maxPct); //vals[Math.ceil(maxPct / 100 * vals.length)];
        data.push({ day: parseInt(d), min: min, max: max });
    }
    return data;
}
function calcPecentile(vals, pct) {
    let i = Math.ceil(pct / 100 * vals.length);
    if (i < 0) {
        i = 0;
    }
    else if (i >= vals.length) {
        i = vals.length - 1;
    }
    return vals[i];
}
