import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './styles.css';
//
import * as chart from '@grapecity/wijmo.chart';
import * as analytics from '@grapecity/wijmo.chart.analytics';
import * as animation from '@grapecity/wijmo.chart.animation';
import { getData } from './data';
//
document.readyState === 'complete' ? init() : window.onload = init;
//
function init() {
    let barchart = new chart.FlexChart('#chart', {
        header: 'Average Temperature of Tokyo',
        legend: {
            position: chart.Position.None
        },
        bindingX: 'month',
        itemsSource: getData(),
        palette: chart.Palettes.zen
    });
    //
    barchart.series.push(new analytics.ErrorBar({
        errorBarStyle: {
            stroke: 'darkred',
            strokeWidth: 3
        },
        binding: 'temperature',
        value: 1,
        errorAmount: analytics.ErrorAmount.StandardError
    }));
    //
    let ani = new animation.ChartAnimation(barchart);
}
