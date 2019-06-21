import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './styles.css';
//
import * as wijmo from '@grapecity/wijmo';
import * as input from '@grapecity/wijmo.input';
import { getCountries, getData } from './data';
//
document.readyState === 'complete' ? init() : window.onload = init;
//
function init() {
    // select a country (string)
    var theComboString = new input.ComboBox('#theComboString', {
        selectedIndexChanged: (sender) => {
            setText('theComboStringCurrent', sender.text);
        },
        itemsSource: getCountries()
    });
    //
    // select an item (object)
    var theComboObject = new input.ComboBox('#theComboObject', {
        selectedIndexChanged: (sender) => {
            var text = wijmo.format('{country} (sales: {sales:c0}, expenses {expenses:c0})', sender.selectedValue);
            setText('theComboObjectCurrent', text);
        },
        displayMemberPath: 'country',
        itemsSource: getData()
    });
    //
    // show text in an element on the page
    function setText(id, value) {
        document.getElementById(id).textContent = value;
    }
}
