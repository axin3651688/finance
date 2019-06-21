import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './styles.css';
import * as chart from '@grapecity/wijmo.chart';
import { getData } from './data';
import { AxisScrollbar } from './AxisScrollbar';
//
document.readyState === 'complete' ? init() : window.onload = init;
//
function init() {
    // create the chart
    let theChart = new chart.FlexChart('#theChart', {
        plotMargin: 'NaN NaN NaN 80',
        bindingX: 'date',
        chartType: 'Line',
        itemsSource: getData(),
        tooltip: {
            content: ''
        },
        axisX: {
            axisLine: false
        },
        series: [
            {
                name: 'Data',
                binding: 'yval'
            }
        ],
    });
    // create Scrollbar
    let axisXScrollbar = new AxisScrollbar(theChart.axes[0], {
        minScale: 0.02
    });
    let axisYScrollbar = new AxisScrollbar(theChart.axes[1], {
        buttonsVisible: false,
        minScale: 0.05
    });
}
