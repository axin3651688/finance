import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './styles.css';
import * as wjMultiRow from '@grapecity/wijmo.grid.multirow';
import { generateAppData } from './data';
//
document.readyState === 'complete' ? init() : window.onload = init;
//
function init() {
    let appData = generateAppData();
    var styleMultirow = new wjMultiRow.MultiRow('#styleMultirow', {
        itemsSource: appData.orders,
        layoutDefinition: appData.ldThreeLines
    });
}
