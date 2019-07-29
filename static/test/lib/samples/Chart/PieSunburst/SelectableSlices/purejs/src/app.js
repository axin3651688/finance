import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './styles.css';
//
import * as chart from '@grapecity/wijmo.chart';
import { getData } from './data';
//
document.readyState === 'complete' ? init() : window.onload = init;
//
function init() {
    let pie = new chart.FlexPie('#chart', {
        header: 'Best-selling Mobile Phones Brands of 2017',
        bindingName: 'brand',
        binding: 'sales',
        selectionMode: chart.SelectionMode.Point,
        selectedItemPosition: chart.Position.Top,
        selectedItemOffset: 0.2,
        isAnimated: true,
        dataLabel: {
            content: '{value}M'
        },
        tooltip: {
            content: ''
        },
        itemsSource: getData(),
        palette: ['rgba(156,136,217,1)', 'rgba(163,215,103,1)', 'rgba(142,195,192,1)', 'rgba(233,195,169,1)',
            'rgba(145,171,54,1)', 'rgba(212,204,192,1)', 'rgba(97,187,216,1)', 'rgba(226,215,111,1)', 'rgba(128,113,90,1)']
    });
}
