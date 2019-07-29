import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './styles.css';
//
import * as input from '@grapecity/wijmo.input';
import * as wijmo from '@grapecity/wijmo';
import { getCountryCode, getData } from './data';
//
document.readyState === 'complete' ? init() : window.onload = init;
//
function init() {
    // get grouped CollectionView
    let data = getData();
    //
    // toggle showGroups
    let showGroups = true;
    document.getElementById('showGroups').addEventListener('click', e => {
        showGroups = e.target.checked;
        theComboBox.showGroups = showGroups;
        theListBox.showGroups = showGroups;
    });
    //
    // toggle formatItem
    let formatGroupHeaders = true;
    document.getElementById('formatGroupHeaders').addEventListener('click', e => {
        formatGroupHeaders = e.target.checked;
        data.refresh();
    });
    //
    // toggle checkboxes
    document.getElementById('showCheckboxes').addEventListener('click', e => {
        theListBox.checkedMemberPath = e.target.checked ? 'checked' : '';
    });
    //
    // show in ComboBox
    let theComboBox = new input.ComboBox('#theComboBox', {
        showGroups: true,
        formatItem: formatGroupHeader,
        displayMemberPath: 'city',
        itemsSource: data
    });
    //
    // show in ListBox
    let theListBox = new input.ListBox('#theListBox', {
        showGroups: true,
        formatItem: formatGroupHeader,
        displayMemberPath: 'city',
        itemsSource: data
    });
    //
    // show a flag in the group headers
    function formatGroupHeader(sender, e) {
        if (formatGroupHeaders && e.index < 0 && e.data instanceof wijmo.CollectionViewGroup) {
            let group = e.data, code = getCountryCode(group.name);
            //
            if (code) {
                e.item.innerHTML = `<span class="flag-icon flag-icon-${code}"></span> ${group.name}`;
            }
        }
    }
}
