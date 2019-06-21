import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './styles.css';
import * as wjCore from '@grapecity/wijmo';
import * as wjChart from '@grapecity/wijmo.chart';
import * as wjInput from '@grapecity/wijmo.input';
import { getData, getComboData } from './data';
//
document.readyState === 'complete' ? init() : window.onload = init;
//
function init() {
    // create a chart
    let theChart = new wjChart.FlexChart('#theChart', {
        itemsSource: getData(),
        bindingX: 'country',
        legend: { position: 'Right' },
        series: [
            { binding: 'sales', name: 'Sales' },
            { binding: 'expenses', name: 'Expenses' },
            { binding: 'downloads', name: 'Downloads' }
        ]
    });
    theChart.palette = getRandomPalette();
    // toggle custom styles
    document.getElementById('customTitles').addEventListener('click', function (e) {
        wjCore.toggleClass(theChart.hostElement, 'custom-titles', e.target.checked);
    });
    // toggle custom legend styles
    document.getElementById('customLegend').addEventListener('click', function (e) {
        wjCore.toggleClass(theChart.hostElement, 'custom-legend', e.target.checked);
    });
    // change legend position
    var legendPosition = new wjInput.ComboBox('#legendPosition', {
        itemsSource: getComboData(),
        textChanged: function (s, e) {
            theChart.legend.position = s.text;
        },
        text: 'Left'
    });
    //
    // customize chart titles
    let header = new wjInput.ComboBox('#header', {
        textChanged: (s) => theChart.header = s.text
    });
    let footer = new wjInput.ComboBox('#footer', {
        textChanged: (s) => theChart.footer = s.text
    });
    let xTitle = new wjInput.ComboBox('#xTitle', {
        textChanged: (s) => theChart.axisX.title = s.text
    });
    let yTitle = new wjInput.ComboBox('#yTitle', {
        textChanged: (s) => theChart.axisY.title = s.text
    });
    //
    // initialize titles
    header.text = 'My Great Chart';
    footer.text = 'powered by Wijmo\'s FlexChart';
    xTitle.text = 'country';
    yTitle.text = 'values/units';
}
//
function getRandomPalette() {
    let palettes = Object.getOwnPropertyNames(wjChart.Palettes)
        .filter(prop => typeof wjChart.Palettes[prop] === "object" && prop !== 'prototype');
    let rand = Math.floor(Math.random() * palettes.length);
    //
    return wjChart.Palettes[palettes[rand]];
}
