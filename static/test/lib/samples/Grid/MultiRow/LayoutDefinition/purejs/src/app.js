import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './styles.css';
import * as wjCore from '@grapecity/wijmo';
import * as wjInput from '@grapecity/wijmo.input';
import * as wjMultiRow from '@grapecity/wijmo.grid.multirow';
import { generateAppData } from './data';
//
document.readyState === 'complete' ? init() : window.onload = init;
//
function init() {
    let appData = generateAppData();
    let multirow = new wjMultiRow.MultiRow('#multirow', {
        itemsSource: appData.orders,
        layoutDefinition: appData.layoutDefs.currentItem.def
    });
    let ldComboBox = new wjInput.ComboBox('#ldComboBox', {
        itemsSource: appData.layoutDefs,
        displayMemberPath: 'name',
        selectedIndexChanged: function (s, e) {
            let layoutDef = appData.layoutDefs.currentItem;
            if (layoutDef) {
                multirow.layoutDefinition = layoutDef.def;
                wjCore.setText(document.querySelector('#desc'), layoutDef.description);
            }
        }
    });
    wjCore.setText(document.querySelector('#desc'), appData.layoutDefs.currentItem.description);
}
