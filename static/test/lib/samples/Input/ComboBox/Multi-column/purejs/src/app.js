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
    // default style
    let theCombo = new input.ComboBox('#theCombo', {
        displayMemberPath: 'country',
        itemsSource: getData()
    });
    //
    // multi-column CSS
    let theComboCSS = new input.ComboBox('#theComboCSS', {
        dropDownCssClass: 'cb-flex',
        displayMemberPath: 'country',
        itemsSource: getData()
    });
    //
    // multi-column table-style
    let template = '<table><tr>' +
        '<td>{country}</td>' +
        '<td class="number" title="GDP (million US$/year)">{gdpm:c0}</td>' +
        '<td class="number" title="Population (thousands)">{popk:n0}</td>' +
        '<td class="number" title="GDP/cap (US$/person/year)">{gdpcap:c0}</td>' +
        '</tr></table>';
    //
    let theComboTable = new input.ComboBox('#theComboTable', {
        headerPath: 'country',
        displayMemberPath: 'country',
        formatItem: (sender, e) => {
            e.item.innerHTML = wijmo.format(template, e.data);
        },
        itemsSource: getData()
    });
}
