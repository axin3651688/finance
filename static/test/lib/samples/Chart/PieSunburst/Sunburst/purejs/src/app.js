import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './styles.css';
//
import * as hierarchical from '@grapecity/wijmo.chart.hierarchical';
import { getData } from './data';
//
document.readyState === 'complete' ? init() : window.onload = init;
//
function init() {
    var sunburst = new hierarchical.Sunburst('#chart', {
        binding: 'value',
        bindingName: 'year, quarter, month',
        childItemsPath: 'items',
        itemsSource: getData(),
        dataLabel: {
            position: 'Center',
            content: '{name}'
        },
        isAnimated: true,
        selectionMode: 'Point',
        selectedItemPosition: 'Top',
        selectedItemOffset: 0.3,
        palette: ['rgba(92,184,92,1)', 'rgba(240,173,78,1)', 'rgba(91,192,222,1)', 'rgba(217,83,79,1)',
            'rgba(159,91,222,1)', 'rgba(70,219,140,1)', 'rgba(182,184,110,1)', 'rgba(78,93,108,1)', 'rgba(43,62,75,1)']
    });
}
