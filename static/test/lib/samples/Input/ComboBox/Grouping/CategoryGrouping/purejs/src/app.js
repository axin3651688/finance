import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './styles.css';
import * as input from '@grapecity/wijmo.input';
import { getOptions } from './data';
//
document.readyState === 'complete' ? init() : window.onload = init;
//
function init() {
    // create the combo
    let theCombo = new input.ComboBox('#theCombo', {
        displayMemberPath: 'header',
        formatItem: formatListItem,
        itemsSource: getOptions(),
        selectedIndex: 1 // after setting itemsSource
    });
    //
    // create the AutoComplete
    let theAutoComplete = new input.AutoComplete('#theAutoComplete', {
        displayMemberPath: 'header',
        formatItem: formatListItem,
        itemsSource: getOptions(),
        selectedIndex: 1 // after setting itemsSource
    });
    //
    // format list items to format and disable category names
    function formatListItem(sender, e) {
        let dataItem = e.data;
        if (dataItem.category) {
            e.item.classList.add('category');
            e.item.classList.add('wj-state-disabled');
        }
    }
}
