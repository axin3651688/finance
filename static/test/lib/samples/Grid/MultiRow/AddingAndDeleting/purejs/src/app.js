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
    let adMultirow = new wjMultiRow.MultiRow('#adMultirow', {
        itemsSource: appData.addNewOrders,
        layoutDefinition: appData.ldThreeLines,
        showGroups: false,
        allowAddNew: true,
        allowDelete: true
    });
    // handle buttons
    document.getElementById('ckbAllNew').addEventListener('click', function (e) {
        adMultirow.allowAddNew = e.target.checked;
    });
    document.getElementById('ckbAllDelete').addEventListener('click', function (e) {
        adMultirow.allowDelete = e.target.checked;
    });
}
