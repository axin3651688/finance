import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './styles.css';
//
import * as wijmo from '@grapecity/wijmo';
import * as input from '@grapecity/wijmo.input';
//
import { getData } from './data';
// 
document.readyState === 'complete' ? init() : window.onload = init;
//
function init() {
    // create GroupDescription to group by initial
    let gdInitial = new wijmo.GroupDescription();
    gdInitial.groupNameFromItem = item => item[0];
    //
    // get grouped CollectionView
    let view = new wijmo.CollectionView(getData(), {
        sortDescriptions: [''],
        groupDescriptions: [gdInitial],
        currentItem: null
    });
    //
    // toggle showGroups
    document.getElementById('showGroups').addEventListener('click', e => {
        let showGroups = e.target.checked;
        theComboBox.showGroups = showGroups;
        theListBox.showGroups = showGroups;
    });
    //
    // show in ComboBox
    let theComboBox = new input.ComboBox('#theComboBox', {
        showGroups: true,
        itemsSource: view,
    });
    //
    // show in ListBox
    let theListBox = new input.ListBox('#theListBox', {
        showGroups: true,
        itemsSource: view
    });
}
