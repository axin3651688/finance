import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './styles.css';
//
import * as wijmo from '@grapecity/wijmo';
import * as chart from '@grapecity/wijmo.chart';
import * as input from '@grapecity/wijmo.input';
import * as interaction from '@grapecity/wijmo.chart.interaction';
import { getData } from './data';
import { AggregateSeries } from './aggregate-series';
//
document.readyState === 'complete' ? init() : window.onload = init;
//
function init() {
    let palette = ['rgba(55,90,127,1)', 'rgba(0,188,140,1)', 'rgba(52,152,219,1)', 'rgba(243,156,18,1)', 'rgba(231,76,60,1)', 'rgba(143,97,179,1)', 'rgba(176,135,37,1)', 'rgba(74,73,73,1)', 'rgba(0,0,0,1)'], groupAggregate = 'Sum';
    //
    // create the chart
    let theChart = new chart.FlexChart('#theChart', {
        itemsSource: getData(),
        bindingX: 'date',
        chartType: chart.ChartType.LineSymbols,
        legend: { position: chart.Position.None },
        tooltip: {
            content: (ht) => {
                return (ht && ht.x && ht.y)
                    ? `<b>Date:</b> ${wijmo.Globalize.formatDate(ht.x, 'MM-dd-yyyy')}<br><b>Value:</b> ${ht.y.toFixed(2)}`
                    : '';
            }
        },
        plotMargin: 'NaN 60 NaN 60',
        palette: palette
    });
    //
    let series = new AggregateSeries();
    theChart.beginUpdate();
    series.itemsSource = getData();
    series.chartType = chart.ChartType.LineSymbols;
    series.binding = 'close';
    series.bindingX = 'date';
    series.groupAggregate = groupAggregate;
    series.autoGroupIntervals = ['DD', 'WW', 'MM', 'YYYY'];
    series.autoInterval = true;
    theChart.series.push(series);
    theChart.endUpdate();
    //
    //create aggregate menu
    let aggMenu = new input.Menu('#aggType', {
        header: 'Aggregate',
        selectedValue: groupAggregate,
        itemClicked: (sender) => {
            series.groupAggregate = sender.selectedValue;
            updateMenuHeader();
        }
    });
    updateMenuHeader();
    // update menu header to show a title and the value
    function updateMenuHeader() {
        aggMenu.header = 'Aggregate' + ': <b>' + aggMenu.text + '</b>';
    }
    //
    // create the chart with range selector
    let theChartSelector = new chart.FlexChart('#theChartSelector', {
        itemsSource: getData(),
        bindingX: 'date',
        chartType: chart.ChartType.Area,
        legend: {
            position: chart.Position.None
        },
        axisX: {
            position: chart.Position.None
        },
        axisY: {
            position: chart.Position.None
        },
        tooltip: { content: '' },
        series: [
            { binding: 'close' }
        ],
        palette: palette
    });
    //
    let rangeSelector = new interaction.RangeSelector(theChartSelector, {
        seamless: true,
        rangeChanged: (sender) => {
            theChart.beginUpdate();
            theChart.axisX.min = sender.min;
            theChart.axisX.max = sender.max;
            theChart.endUpdate();
        }
    });
}
