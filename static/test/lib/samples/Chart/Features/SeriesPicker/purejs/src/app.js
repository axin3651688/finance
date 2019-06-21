import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './styles.css';
import * as wjChart from '@grapecity/wijmo.chart';
import * as wjCore from '@grapecity/wijmo';
import * as wjInput from '@grapecity/wijmo.input';
import { getData } from './data';
//
document.readyState === 'complete' ? init() : window.onload = init;
//
function init() {
    // create the chart
    let theChart = new wjChart.FlexChart('#theChart', {
        itemsSource: getData(),
        bindingX: 'country'
    });
    theChart.palette = getRandomPalette();
    //
    // auto-generate series
    let item = theChart.itemsSource[0];
    for (let k in item) {
        if (wjCore.isNumber(item[k])) {
            let series = new wjChart.Series();
            series.binding = k;
            series.name = wjCore.toHeaderCase(k);
            series['visible'] = true; // add 'visible' property for binding
            theChart.series.push(series);
        }
    }
    //
    // create the series picker
    let theSeriesPicker = new wjInput.ListBox('#theSeriesPicker', {
        itemsSource: theChart.series,
        checkedMemberPath: 'visible',
        displayMemberPath: 'name',
        lostFocus: () => {
            wjCore.hidePopup(theSeriesPicker.hostElement);
        },
        checkedItemsChanged: (s) => {
            // map extra 'visible' property to 'Series.visibility' values
            theChart.series.forEach((series) => {
                series.visibility = s.checkedItems.indexOf(series) > -1
                    ? wjChart.SeriesVisibility.Visible
                    : wjChart.SeriesVisibility.Hidden;
            });
        }
    });
    //
    document.querySelector('#pickerButton').addEventListener('click', e => {
        wjCore.showPopup(theSeriesPicker.hostElement, e.target, false, true, false);
        theSeriesPicker.focus();
        e.preventDefault();
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
