import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './styles.css';
import * as chart from '@grapecity/wijmo.chart';
import * as interaction from '@grapecity/wijmo.chart.interaction';
import { getData } from './data';
//
document.readyState === 'complete' ? init() : window.onload = init;
//
function init() {
    let palette = ['rgba(3,62,118,1)', 'rgba(135,192,72,1)', 'rgba(89,130,44,1)', 'rgba(83,179,235,1)',
        'rgba(252,101,6,1)', 'rgba(212,35,35,1)', 'rgba(227,187,0,1)', 'rgba(204,204,204,1)', 'rgba(34,34,34,1)'];
    //
    // create the chart
    let theChart = new chart.FlexChart('#theChart', {
        itemsSource: getData(),
        bindingX: 'date',
        chartType: 'Area',
        legend: { position: 'None' },
        series: [
            { binding: 'low,high,open,close', name: 'Alphabet Inc' }
        ],
        plotMargin: 'NaN 60 NaN 60',
        palette: palette
    });
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
            { binding: 'close', name: 'Alphabet Inc' }
        ],
        plotMargin: 'NaN 60 NaN 60',
        palette: palette
    });
    //
    var rangeSelector = new interaction.RangeSelector(theChartSelector, {
        minScale: 0.05,
        maxScale: 0.75,
        rangeChanged: (sender) => {
            theChart.axisX.min = sender.min;
            theChart.axisX.max = sender.max;
        }
    });
}
