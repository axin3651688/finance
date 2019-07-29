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
    var theMultiAutoComplete = new input.MultiAutoComplete('#theMultiAutoComplete', {
        placeholder: 'Select some countries',
        displayMemberPath: 'country',
        itemsSource: getData(),
        selectedIndex: -1,
        selectedItemsChanged: (sender) => {
            let html = '';
            sender.selectedItems.forEach((item) => {
                html += `<li>${item.country}</li>`;
            });
            document.querySelector('#selectedItems').innerHTML = html;
        }
    });
}
