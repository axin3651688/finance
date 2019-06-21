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
    let freezeMultirow = new wjMultiRow.MultiRow('#freezeMultirow', {
        itemsSource: appData.orders,
        layoutDefinition: appData.ldTwoLines
    });
    document.getElementById('btnFreeze').addEventListener('click', function (e) {
        freezeMultirow.frozenColumns = freezeMultirow.frozenColumns ? 0 : 2;
        freezeMultirow.frozenRows = freezeMultirow.frozenRows ? 0 : 2;
        e.target.textContent = freezeMultirow.frozenRows == 0 ? 'Freeze' : 'Unfreeze';
    });
}
