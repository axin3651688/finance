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
        itemsSource: getData(),
        palette: ['l(0,0,1,0)#89f7fe-#66a6ff', 'l(0,0,0,1)#13547a-#80d0c7', 'l(0,0,1,1)#ff0844-#ffb199',
            'l(0,0,1,0)#b224ef-#7579ff-#b224ef', 'l(0,0,0,1)#e27f00-#ae1a73', 'r(0.5,0.5,0.7)#cc208e-#6713d2']
    });
}
