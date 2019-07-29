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
    // create a chart
    let theChart = new wjChart.FlexChart('#theChart', {
        itemsSource: getData(),
        bindingX: 'country',
        chartType: 'LineSymbols',
        header: 'Header',
        footer: 'Footer',
        dataLabel: {
            content: '{value:n0}',
            position: 'Top',
            offset: 5
        },
        tooltip: {
            content: ''
        },
        series: [
            { binding: 'sales', name: 'Sales' },
            { binding: 'expenses', name: 'Expenses' }
        ]
    });
    theChart.palette = getRandomPalette();
    //
    // use tooltip to show hit-test information
    let tt = new wjCore.Tooltip(), tip = '';
    //
    theChart.hostElement.addEventListener('mousemove', e => {
        // build tooltip text
        let ht = theChart.hitTest(e), elem = ht.chartElement, series = (ht.series && [1, 2, 3].indexOf(elem) < 0) ? ht.series : null, index = (ht.pointIndex != null && series) ? ht.pointIndex : null, newTip = wjCore.format('chartElement: <b>{elem}</b><br/>series: <b>{series}</b><br/>pointIndex: <b>{index}</b>', {
            elem: wjChart.ChartElement[elem],
            series: series ? series.name : 'none',
            index: index != null ? index : 'none'
        });
        //
        // update tooltip
        if (newTip != tip) {
            tip = newTip;
            tt.show(e.target, tip, new wjCore.Rect(e.clientX, e.clientY, 0, 0));
        }
    });
    //
    theChart.hostElement.addEventListener('mouseleave', e => {
        tt.hide();
        tip = '';
    });
}
//
function getRandomPalette() {
    let palettes = Object.getOwnPropertyNames(wjChart.Palettes)
        .filter(prop => typeof wjChart.Palettes[prop] === "object" && prop !== 'prototype');
    let rand = Math.floor(Math.random() * palettes.length);
    //
    return wjChart.Palettes[palettes[rand]];
}
