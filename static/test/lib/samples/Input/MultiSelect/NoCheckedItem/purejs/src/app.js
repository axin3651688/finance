import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './styles.css';
//
import * as input from '@grapecity/wijmo.input';
import { getData } from './data';
//
document.readyState === 'complete' ? init() : window.onload = init;
//
function init() {
    var theMultiSelect = new input.MultiSelect('#theMultiSelect', {
        placeholder: 'Devices',
        displayMemberPath: 'item.name',
        checkedMemberPath: 'checked',
        itemsSource: getCheckableData(),
        checkedItemsChanged: (sender) => {
            let checkedItems = sender.checkedItems.map(checkableItem => checkableItem.item);
            document.querySelector('#checkedItems').textContent = checkedItems.length ? JSON.stringify(checkedItems) : '';
        }
    });
    //
    // create a data source with items and an extra checkable member
    function getCheckableData() {
        return getData().map(item => ({ item: item, checked: false }));
    }
}
