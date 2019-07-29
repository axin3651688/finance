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
    let view = new wijmo.CollectionView(getData(), {
        // update detail when current item changes
        currentChanged: (sender) => {
            let html = wijmo.format(detailTemplate, sender.currentItem, (data, name, fmt, val) => {
                if (wijmo.isString(data[name])) {
                    val = wijmo.escapeHtml(data[name]);
                }
                return val;
            });
            //
            document.getElementById('detail').innerHTML = html;
        },
        //
        // 20 million people or more
        filter: (item) => item.popk > 20000,
        //
        // sort and filter the collectionView
        sortDescriptions: [
            new wijmo.SortDescription('country', true)
        ]
    });
    //
    // combo and CollectionView
    let theCombo = new input.ComboBox('#theCombo', {
        displayMemberPath: 'country',
        itemsSource: view
    });
}
