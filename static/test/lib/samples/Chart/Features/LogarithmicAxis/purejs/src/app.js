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
        chartType: 'Bubble',
        bindingX: 'pop',
        series: [
            {
                name: 'GDP',
                binding: 'gdp,pci',
            }
        ],
        tooltip: {
            content: '<b>{country}</b>:<br/>{pci:n0} US$/year/capita'
        },
        axisX: {
            title: 'Population (millions)',
            format: 'g4,,',
            logBase: 10
        },
        axisY: {
            title: 'GDP (US$ billions)',
            format: 'g4,',
            logBase: 10
        },
        legend: {
            position: 'None'
        }
    });
    //
    // toggle log scale
    document.querySelector('#logScale').addEventListener('click', e => {
        var logBase = e.target.checked ? 10 : null;
        theChart.axisX.logBase = logBase;
        theChart.axisY.logBase = logBase;
    });
}
