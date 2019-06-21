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
    // define a template for showing the current item's details
    let detailTemplate = '<div>' +
        '<div>Country: <b>{country}</b></div>' +
        '<div>GDP (M$/yr): <b>{gdpm:c0}</b></div>' +
        '<div>Population (thousands): <b>{popk:n0}</b></div>' +
        '<div>GRP/Capita: <b>{gdpcap:c0}</b></div>' +
        '<div>Rank: <b>{id}</b></div>' +
        '</div>';
    //
    // combo and selectedItem
    let theCombo = new input.ComboBox('#theCombo', {
        selectedIndexChanged: (sender) => {
            var html = wijmo.format(detailTemplate, sender.selectedItem, (data, name, fmt, val) => {
                if (wijmo.isString(data[name])) {
                    val = wijmo.escapeHtml(data[name]);
                }
                return val;
            });
            document.querySelector('#detail').innerHTML = html;
        },
        displayMemberPath: 'country',
        itemsSource: getData()
    });
}
