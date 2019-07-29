import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './styles.css';
import * as wjChart from '@grapecity/wijmo.chart';
import { getData } from './data';
//
document.readyState === 'complete' ? init() : window.onload = init;
//
function init() {
    // create the chart
    let theChart = new wjChart.FlexChart('#theChart', {
        itemsSource: getData(),
        chartType: 'Area',
        stacking: 'Stacked',
        bindingX: 'country',
        series: [
            {
                binding: 'expenses',
                name: 'Expenses',
                style: {
                    fill: 'l(0, 0, 0, 1)#ff0000-#ff0000:1:0.5',
                    stroke: 'darkred',
                    strokeWidth: 1
                }
            },
            {
                binding: 'sales',
                name: 'Sales',
                style: {
                    fill: 'l(0, 0, 0, 1)#00b050-#00b050:1:0.5',
                    stroke: 'darkgreen',
                    strokeWidth: 1
                }
            }
        ]
    });
}
