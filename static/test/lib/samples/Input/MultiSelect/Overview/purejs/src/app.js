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
    let theMultiSelect = new input.MultiSelect('#theMultiSelect', {
        placeholder: 'Countries',
        headerFormat: '{count:n0} countries',
        displayMemberPath: 'country',
        itemsSource: getData(),
        checkedItemsChanged: (sender) => {
            let html = '';
            sender.checkedItems.forEach((item) => {
                html += `<li>${item.country}</li>`;
            });
            document.querySelector('#checkedItems').innerHTML = html;
        }
    });
    //
    // toggle 'select all' checkbox
    document.querySelector('#selectAll').addEventListener('click', e => {
        theMultiSelect.showSelectAllCheckbox = e.target.checked;
    });
}
