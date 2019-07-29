import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './styles.css';
//
import * as chart from '@grapecity/wijmo.chart';
import * as analytics from '@grapecity/wijmo.chart.analytics';
import { getData } from './data';
//
document.readyState === 'complete' ? init() : window.onload = init;
//
function init() {
    // create the chart
    let theChart = new chart.FlexChart('#theChart', {
        itemsSource: getData(),
        bindingX: 'date'
    });
    //
    // create Waterfall series for 'sales' and add it to the chart
    let sales = new analytics.Waterfall({
        name: 'Increase,Decrease,Total',
        binding: 'sales',
        styles: {
            start: { fill: 'blue', stroke: 'blue' },
            total: { fill: 'yellow', stroke: 'yellow' },
            falling: { fill: 'red', stroke: 'red' },
            rising: { fill: 'green', stroke: 'green' },
            connectorLines: { stroke: 'blue', 'stroke-dasharray': '3, 1' }
        }
    });
    theChart.series.push(sales);
    //
    // customize the Waterfall series
    document.querySelector('#connectorLines').addEventListener('click', e => {
        sales.connectorLines = e.target.checked;
    });
    //
    document.querySelector('#showTotal').addEventListener('click', e => {
        sales.showTotal = e.target.checked;
    });
    //
    // randomize the data
    document.querySelector('#btnRandomize').addEventListener('click', () => {
        theChart.itemsSource = getData();
    });
}
