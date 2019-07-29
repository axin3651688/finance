import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './styles.css';
//
import * as wijmo from '@grapecity/wijmo';
import * as input from '@grapecity/wijmo.input';
import { getData } from './data';
//
document.readyState === 'complete' ? init() : window.onload = init;
//
function init() {
    // define template for the details
    var template = '<div class="item">' +
        '<h1>{name}</h1>' +
        '<b>{city}</b> ({state})<br/>' +
        '{address}<br/>' +
        'Phone: <b>{phone}</b><br/>' +
        'Fax: <b>{fax}</b><br/>' +
        'Website: <a href="{site}" target="_blank">{site}</a><br/>' +
        '</div>';
    //
    // show items in a ComboBox
    let theCombo = new input.ComboBox('#theCombo', {
        displayMemberPath: 'name',
        headerPath: 'name',
        itemsSource: getData(),
        formatItem: (sender, e) => {
            let html = wijmo.format(template, e.data, (data, name, fmt, val) => {
                return wijmo.isString(data[name]) ? wijmo.escapeHtml(data[name]) : val;
            });
            e.item.innerHTML = html;
        }
    });
}
