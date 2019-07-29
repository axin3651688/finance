import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './styles.css';
import * as wjMultiRow from '@grapecity/wijmo.grid.multirow';
import * as wjGridFilter from '@grapecity/wijmo.grid.filter';
import { generateAppData } from './data';
//
document.readyState === 'complete' ? init() : window.onload = init;
//
function init() {
    let appData = generateAppData();
    let filterMultirow = new wjMultiRow.MultiRow('#filterMultirow', {
        itemsSource: appData.orders,
        layoutDefinition: appData.ldThreeLines
    });
    let filter = new wjGridFilter.FlexGridFilter(filterMultirow);
}
