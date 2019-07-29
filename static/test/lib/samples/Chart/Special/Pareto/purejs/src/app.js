import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './styles.css';
import * as wjChart from '@grapecity/wijmo.chart';
import { getData } from './data';
//
document.readyState === 'complete' ? init() : window.onload = init;
//
function init() {
    // create secondary Y axis for cumulative sales values
    let axisY2 = new wjChart.Axis();
    axisY2.position = wjChart.Position.Right;
    axisY2.title = 'Cumulative Sales';
    axisY2.format = 'p0';
    axisY2.min = 0;
    axisY2.axisLine = true;
    //
    // create the Pareto chart
    let theChart = new wjChart.FlexChart('#theChart', {
        itemsSource: getData(),
        chartType: 'Column',
        bindingX: 'make',
        axisY: {
            format: 'n0,',
            title: 'Sales (thousands)',
            axisLine: true
        },
        axisX: {
            labelAngle: -90
        },
        legend: {
            position: 'None'
        },
        series: [
            {
                binding: 'sales',
                name: 'Sales (thousands)'
            },
            {
                binding: 'cumSales',
                name: 'Cumulative Sales',
                chartType: 'Line',
                axisY: axisY2,
                style: {
                    stroke: 'orange',
                    strokeWidth: 4
                }
            }
        ],
        palette: getRandomPalette()
    });
    //
    // change the data to update the chart
    document.querySelector('#btnUpdate').addEventListener('click', () => {
        let view = theChart.collectionView;
        //
        view.deferUpdate(() => {
            view.items.forEach((item) => {
                item.sales += (Math.random() - .5) * .5 * item.sales;
            });
        });
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
