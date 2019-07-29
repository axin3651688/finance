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
    let groupMultirow = new wjMultiRow.MultiRow('#groupMultirow', {
        itemsSource: appData.groupedOrders,
        layoutDefinition: appData.ldThreeLines,
        showGroups: true,
        groupHeaderFormat: '{name}: <b>{value} </b>({count:n0} items)'
    });
    // toggle show groups
    document.getElementById('cbShowGroup').addEventListener('click', function (e) {
        groupMultirow.showGroups = e.target.checked;
    });
    // collapse/expand all
    document.getElementById('btnCollapse').addEventListener('click', function (e) {
        groupMultirow.collapseGroupsToLevel(0);
    });
    document.getElementById('btnExpand').addEventListener('click', function (e) {
        groupMultirow.collapseGroupsToLevel(10);
    });
}
