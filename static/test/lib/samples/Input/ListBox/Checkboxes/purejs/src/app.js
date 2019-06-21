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
    new input.ListBox('#theListBox', {
        displayMemberPath: 'country',
        checkedMemberPath: 'selected',
        itemsSource: getData(),
        checkedItemsChanged: (sender) => {
            let html = '';
            //
            sender.checkedItems.forEach((item) => {
                html += `<li>${item.country}</li>`;
            });
            //
            document.querySelector('#checkedItems').innerHTML = html;
        }
    });
}
