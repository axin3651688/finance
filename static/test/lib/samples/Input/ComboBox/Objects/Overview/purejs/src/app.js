import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './styles.css';
//
import * as input from '@grapecity/wijmo.input';
import * as wijmo from '@grapecity/wijmo';
import { getData } from './data';
//
document.readyState === 'complete' ? init() : window.onload = init;
//
function init() {
    // select an item
    let theCombo = new input.ComboBox('#theCombo', {
        selectedIndexChanged: (sender) => {
            setText('theComboText', sender.text);
            setText('theComboIndex', sender.selectedIndex);
            setText('theComboValue', wijmo.Globalize.format(sender.selectedValue, 'c'));
        },
        displayMemberPath: 'country',
        selectedValuePath: 'sales',
        itemsSource: getData()
    });
    //
    // show text in an element on the page
    function setText(id, value) {
        document.getElementById(id).textContent = value;
    }
}
