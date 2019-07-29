import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './styles.css';
import * as wjChart from '@grapecity/wijmo.chart';
import * as wjChartAnalytics from '@grapecity/wijmo.chart.analytics';
import * as wjInput from '@grapecity/wijmo.input';
import { getData } from './data';
//
document.readyState === 'complete' ? init() : window.onload = init;
//
function init() {
    // create the chart
    let theChart = new wjChart.FlexChart('#theChart', {
        itemsSource: getData(),
        chartType: 'Scatter',
        axisY: {
            axisLine: true
        },
        bindingX: 'x',
        series: [
            { name: 'Raw Data', binding: 'y' }
        ]
    });
    //
    // show the equation on the chart
    let equation = document.getElementById('equation');
    //
    // create a TrendLine and add it to the Chart series collection
    let trendLine = new wjChartAnalytics.TrendLine();
    trendLine.binding = 'y';
    trendLine.style = { stroke: 'darkred', strokeWidth: 3 };
    trendLine.visibility = wjChart.SeriesVisibility.Hidden;
    theChart.series.push(trendLine);
    //
    // select trendline order
    let order = new wjInput.InputNumber('#order', {
        value: trendLine.order,
        step: 1,
        min: 1,
        max: 6,
        valueChanged: (s) => {
            if (s.value >= s.min && s.value <= s.max) {
                trendLine.order = s.value;
                showEquation();
            }
        }
    });
    //
    // select fit type
    let fitType = new wjInput.ComboBox('#fitType', {
        isRequired: false,
        placeholder: 'None',
        textChanged: (s) => {
            trendLine.name = s.text;
            if (s.text) { // show trendline
                trendLine.fitType = s.text;
                trendLine.visibility = wjChart.SeriesVisibility.Visible;
            }
            else { // hide trendline
                trendLine.visibility = wjChart.SeriesVisibility.Hidden;
            }
            switch (s.text) { // enable/disable order input
                case 'Polynomial':
                case 'Fourier':
                    order.isDisabled = false;
                    break;
                default:
                    order.isDisabled = true;
                    break;
            }
            showEquation();
        },
        itemsSource: 'Linear,Exponential,Logarithmic,Power,Fourier,Polynomial,MinX,MinY,MaxX,MaxY,AverageX,AverageY'.split(',')
    });
    //
    // show updated equation on a timeOut since the TrendLine update is async
    function showEquation() {
        equation.innerHTML = '';
        setTimeout(() => equation.innerHTML = trendLine.getEquation(), 100);
    }
    //
    // randomize the data
    document.querySelector('#btnRandomize').addEventListener('click', () => {
        theChart.itemsSource = getData();
        showEquation();
    });
}
