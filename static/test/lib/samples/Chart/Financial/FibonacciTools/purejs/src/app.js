import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './styles.css';
import * as input from '@grapecity/wijmo.input';
import * as chart from '@grapecity/wijmo.chart';
import * as fChart from '@grapecity/wijmo.chart.finance';
import * as fChartAnalytics from '@grapecity/wijmo.chart.finance.analytics';
import { getData } from './data';
//
document.readyState === 'complete' ? init() : window.onload = init;
//
function init() {
    let data = getData();
    // create the chart
    let theChart = new fChart.FinancialChart('#theChart', {
        itemsSource: data,
        bindingX: 'date',
        symbolSize: 6,
        chartType: 'Candlestick',
        series: [{
                binding: 'high,low,open,close',
                name: 'Box Inc'
            }],
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
    //retracements
    let retracements = new fChartAnalytics.Fibonacci({
        binding: 'close',
        symbolSize: 1,
        style: {
            fill: 'red',
            stroke: 'red',
            strokeWidth: 0.5,
            fontSize: 10
        },
        name: 'Retracements',
        labelPosition: 'Left',
        uptrend: true
    });
    s.push(retracements);
    //arcs
    let arcs = new fChartAnalytics.FibonacciArcs({
        binding: 'close',
        name: 'Arcs',
        start: new chart.DataPoint(46, 19.75),
        end: new chart.DataPoint(54, 17.1),
        labelPosition: 'Top',
        visibility: 'Hidden'
    });
    s.push(arcs);
    //fans
    let fans = new fChartAnalytics.FibonacciFans({
        binding: 'close',
        name: 'Fans',
        start: new chart.DataPoint(10, 18.12),
        end: new chart.DataPoint(32, 20.53),
        labelPosition: 'Top',
        visibility: 'Hidden'
    });
    s.push(fans);
    //timeZones
    let timeZones = new fChartAnalytics.FibonacciTimeZones({
        binding: 'close',
        name: 'TimeZones',
        startX: 0,
        endX: 3,
        labelPosition: 'Right',
        visibility: 'Hidden'
    });
    s.push(timeZones);
    theChart.endUpdate();
    //type selector
    let type = new input.Menu('#type', {
        header: 'Type',
        itemClicked: reset
    });
    reset(type);
    function reset(menu) {
        let idx = menu.selectedIndex;
        idx = idx === -1 ? 0 : idx;
        let selectors = ['.ul-retracements', '.ul-arcs', '.ul-fans', '.ul-timezones'];
        let series = [retracements, arcs, fans, timeZones];
        let props = document.querySelectorAll('.ul-properties');
        for (let i = 0, len = props.length; i < len; i++) {
            let v = props[i];
            v.style.display = 'none';
        }
        let sels = document.querySelectorAll(selectors[idx]);
        for (let i = 0, len = sels.length; i < len; i++) {
            let v = sels[i];
            v.style.display = '';
        }
        series.forEach(s => s.visibility = chart.SeriesVisibility.Hidden);
        series[idx].visibility = chart.SeriesVisibility.Visible;
        updateMenuHeader(type, 'Type');
    }
    //retracements properties
    let menuRetracementsUptrend = new input.Menu('#uptrend', {
        header: 'Uptrend',
        itemClicked: (s) => {
            retracements.uptrend = !!s.selectedIndex;
            updateMenuHeader(menuRetracementsUptrend, 'Uptrend');
        }
    });
    updateMenuHeader(menuRetracementsUptrend, 'Uptrend');
    let menuRetracementsLabelPosition = new input.Menu('#retracementsLabelPosition', {
        header: 'Label Position',
        itemClicked: (s) => {
            retracements.labelPosition = s.selectedValue;
            updateMenuHeader(menuRetracementsLabelPosition, 'Label Position');
        }
    });
    updateMenuHeader(menuRetracementsLabelPosition, 'Label Position');
    //arcs properties
    let menuArcsLabelPosition = new input.Menu('#arcsLabelPosition', {
        header: 'Label Position',
        itemClicked: (s) => {
            arcs.labelPosition = s.selectedValue;
            updateMenuHeader(menuArcsLabelPosition, 'Label Position');
        }
    });
    updateMenuHeader(menuArcsLabelPosition, 'Label Position');
    let inputArcsStartX = new input.InputNumber('#arcsStartX', {
        value: 46,
        step: 1,
        valueChanged: s => {
            arcs.start.x = s.value;
            theChart.invalidate();
        }
    });
    let inputArcsStartY = new input.InputNumber('#arcsStartY', {
        value: 19.75,
        step: 1,
        valueChanged: s => {
            arcs.start.y = s.value;
            theChart.invalidate();
        }
    });
    let inputArcsEndX = new input.InputNumber('#arcsEndX', {
        value: 54,
        step: 1,
        valueChanged: s => {
            arcs.end.x = s.value;
            theChart.invalidate();
        }
    });
    let inputArcsEndY = new input.InputNumber('#arcsEndY', {
        value: 17.1,
        step: 1,
        valueChanged: s => {
            arcs.end.y = s.value;
            theChart.invalidate();
        }
    });
    //fans properties
    let menuFansLabelPosition = new input.Menu('#fansLabelPosition', {
        header: 'Label Position',
        itemClicked: (s) => {
            fans.labelPosition = s.selectedValue;
            updateMenuHeader(menuFansLabelPosition, 'Label Position');
        }
    });
    updateMenuHeader(menuFansLabelPosition, 'Label Position');
    let inputFansStartX = new input.InputNumber('#fansStartX', {
        value: 10,
        step: 1,
        valueChanged: s => {
            fans.start.x = s.value;
            theChart.invalidate();
        }
    });
    let inputFansStartY = new input.InputNumber('#fansStartY', {
        value: 18.12,
        step: 1,
        valueChanged: s => {
            fans.start.y = s.value;
            theChart.invalidate();
        }
    });
    let inputFansEndX = new input.InputNumber('#fansEndX', {
        value: 32,
        step: 1,
        valueChanged: s => {
            fans.end.x = s.value;
            theChart.invalidate();
        }
    });
    let inputFansEndY = new input.InputNumber('#fansEndY', {
        value: 20.53,
        step: 1,
        valueChanged: s => {
            fans.end.y = s.value;
            theChart.invalidate();
        }
    });
    //timeZones properties
    let menuTimeZonesLabelPosition = new input.Menu('#timeZonesLabelPosition', {
        header: 'Label Position',
        itemClicked: (s) => {
            timeZones.labelPosition = s.selectedValue;
            updateMenuHeader(menuTimeZonesLabelPosition, 'Label Position');
        }
    });
    updateMenuHeader(menuTimeZonesLabelPosition, 'Label Position');
    let inputTimeZonesStartX = new input.InputNumber('#timezonesStartX', {
        value: 0,
        step: 1,
        valueChanged: s => {
            timeZones.startX = s.value;
            theChart.invalidate();
        }
    });
    let inputTimeZonesEndX = new input.InputNumber('#timezonesEndX', {
        value: 3,
        step: 1,
        valueChanged: s => {
            timeZones.endX = s.value;
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
// show menu header and current value
function updateMenuHeader(menu, header) {
    menu.header = header
        ? header + ': <b>' + menu.text + '</b>'
        : menu.text;
}
