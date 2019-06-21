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
    // create a CollectionView
    let view = new wijmo.CollectionView(getData(), {
        currentChanged: updateDetails,
        sortDescriptions: ['country']
    });
    //
    // create country combo
    let cmbCountry = new input.ComboBox('#cmbCountry', {
        itemsSource: view,
        displayMemberPath: 'country'
    });
    //
    // update details
    updateDetails();
    function updateDetails() {
        updateDetail('downloads', 'n0');
        updateDetail('sales', 'c');
        updateDetail('expenses', 'c');
    }
    //
    function updateDetail(prop, fmt) {
        let text = '';
        if (view.currentItem) {
            text = wijmo.Globalize.format(view.currentItem[prop], fmt);
        }
        document.getElementById(prop).textContent = text;
    }
}
