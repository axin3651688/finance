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
        chartType: 'Scatter',
        axisY: {
            axisLine: true
        },
        series: [
            {
                name: 'Series',
                itemsSource: getData(120, -100, 24),
                bindingX: 'x',
                binding: 'y'
            }
        ],
        itemFormatter: (engine, hitTestInfo, defaultRenderer) => {
            var ht = hitTestInfo;
            if (ht.x < 0) {
                engine.stroke = 'red';
                engine.fill = 'rgba(255,0,0,0.7)';
            }
            defaultRenderer();
        }
    });
}
