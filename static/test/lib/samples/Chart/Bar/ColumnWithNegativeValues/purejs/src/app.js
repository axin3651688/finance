import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './styles.css';
//
import * as chart from '@grapecity/wijmo.chart';
import * as animation from '@grapecity/wijmo.chart.animation';
import { getData } from './data';
//
document.readyState === 'complete' ? init() : window.onload = init;
//
function init() {
    let barchart = new chart.FlexChart('#chart', {
        header: 'Balance of trade in 2015 ($Billions) of the United States',
        legend: {
            position: chart.Position.Bottom
        },
        bindingX: 'product',
        series: [
            {
                binding: 'exports',
                name: 'Exports'
            },
            {
                binding: 'imports',
                name: 'Imports'
            },
            {
                binding: 'difference',
                name: 'Difference'
            }
        ],
        itemsSource: getData()
    });
    //
    let ani = new animation.ChartAnimation(barchart);
}
