import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './styles.css';
import * as wjChart from '@grapecity/wijmo.chart';
import * as wjInput from '@grapecity/wijmo.input';
import { getData } from './data';
//
document.readyState === 'complete' ? init() : window.onload = init;
//
function init() {
    // create a chart
    let downloadsOnly = false, theChart = new wjChart.FlexChart('#theChart', {
        itemsSource: getData(),
        bindingX: 'country',
        tooltip: {
            content: ''
        },
        header: 'Country GDP',
        series: [{
                binding: '2014',
                name: '2014'
            }, {
                binding: '2015',
                name: '2015'
            }, {
                binding: '2016',
                name: '2016'
            }],
        dataLabel: {
            content: '{value:n0,,}T',
            position: 'Top',
            rendering: (_, e) => {
                if (downloadsOnly && e.hitTestInfo.series.binding != '2016') {
                    e.cancel = true; // labels only for the "downloads" series
                }
            }
        },
        options: {
            groupWidth: '90%'
        }
    });
    theChart.palette = getRandomPalette();
    //
    // customize the data labels
    let labelPosition = new wjInput.ComboBox('#labelPosition', {
        itemsSource: 'None,Left,Top,Right,Bottom,Center'.split(','),
        textChanged: (s) => {
            theChart.dataLabel.position = s.text;
        },
        text: 'Top'
    });
    //
    document.querySelector('#linesAndBorders').addEventListener('click', e => {
        let dl = theChart.dataLabel;
        dl.connectingLine = dl.border = e.target.checked;
    });
    //
    document.querySelector('#downloadsOnly').addEventListener('click', e => {
        downloadsOnly = e.target.checked;
        theChart.invalidate();
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
