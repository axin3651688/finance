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
        header: 'Country GDP',
        itemsSource: getData(),
        bindingX: 'country',
        series: [
            {
                binding: '2014',
                name: '2014',
                style: {
                    fill: 'green',
                    stroke: 'darkgreen',
                    strokeWidth: 1
                }
            },
            {
                binding: '2015',
                name: '2015',
                style: {
                    fill: 'red',
                    stroke: 'darkred',
                    strokeWidth: 1
                }
            },
            {
                binding: '2016',
                name: '2016',
                chartType: 'LineSymbols',
                style: {
                    stroke: 'orange',
                    strokeWidth: 5
                },
                symbolStyle: {
                    fill: 'gold',
                    stroke: 'gold'
                }
            }
        ]
    });
}
