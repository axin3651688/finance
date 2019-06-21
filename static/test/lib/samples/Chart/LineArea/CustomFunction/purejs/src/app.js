import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './styles.css';
import * as wjChart from '@grapecity/wijmo.chart';
import * as wjChartAnalytics from '@grapecity/wijmo.chart.analytics';
//
document.readyState === 'complete' ? init() : window.onload = init;
//
function init() {
    // create the chart
    let theChart = new wjChart.FlexChart('#theChart');
    //
    // create a YFunctionSeries and add it to the chart
    let yFun = new wjChartAnalytics.YFunctionSeries();
    yFun.name = 'y = f(x)';
    yFun.min = -10;
    yFun.max = 10;
    yFun.sampleCount = 300;
    yFun.func = (x) => Math.sin(4 * x) * Math.cos(3 * x);
    theChart.series.push(yFun);
    //
    // create a ParametricFunctionSeries and add it to the chart
    let pFun = new wjChartAnalytics.ParametricFunctionSeries();
    pFun.name = 'x = f(t); y = g(t)';
    pFun.min = 0;
    pFun.max = 2 * Math.PI;
    pFun.sampleCount = 1000;
    pFun.xFunc = (t) => 10 * Math.cos(5 * t);
    pFun.yFunc = (t) => Math.sin(6 * t);
    theChart.series.push(pFun);
}
