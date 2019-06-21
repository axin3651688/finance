import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './styles.css';
//
import * as core from '@grapecity/wijmo';
import * as chart from '@grapecity/wijmo.chart';
import { getData } from './data';
//
document.readyState === 'complete' ? init() : window.onload = init;
//
function init() {
    let data = getData();
    let sum = data.map(c => c.sales).reduce((sum, cur) => sum + cur);
    let pie = new chart.FlexPie('#chart', {
        header: 'Best-selling Mobile Phones Brands of 2017',
        bindingName: 'brand',
        binding: 'sales',
        dataLabel: {
            content: (ht) => {
                return `${ht.name} ${core.Globalize.format(ht.value / sum, 'p2')}`;
            }
        },
        itemsSource: data,
        palette: ['rgba(42,159,214,1)', 'rgba(119,179,0,1)', 'rgba(153,51,204,1)', 'rgba(255,136,0,1)',
            'rgba(204,0,0,1)', 'rgba(0,204,163,1)', 'rgba(61,109,204,1)', 'rgba(82,82,82,1)', 'rgba(0,0,0,1)']
    });
}
