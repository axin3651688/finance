import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './styles.css';
//
import * as input from '@grapecity/wijmo.input';
import { getCountries } from './data';
//
document.readyState === 'complete' ? init() : window.onload = init;
//
function init() {
    //
    // combo as a regular HTML input element (no itemsSource)
    let theComboNoSrc = new input.ComboBox('#theComboNoSrc', {
        textChanged: (sender) => {
            setText('theComboText', sender.text);
        }
    });
    //
    // default combo
    let theCombo = new input.ComboBox('#theCombo', {
        textChanged: (sender) => {
            setText('theComboValue', sender.selectedValue);
        },
        itemsSource: getCountries()
    });
    //
    // customizable combo
    let theComboCustom = new input.ComboBox('#theComboCustom', {
        isRequired: false,
        isEditable: true,
        placeholder: 'No Country Selected',
        textChanged: (sender) => {
            setText('theComboCustomValue', sender.text);
        },
        itemsSource: getCountries()
    });
    //
    // handle checkboxes
    document.querySelector('#isRequired').addEventListener('click', e => {
        theComboCustom.isRequired = e.target.checked;
    });
    document.querySelector('#isEditable').addEventListener('click', e => {
        theComboCustom.isEditable = e.target.checked;
    });
    //
    // show text in an element on the page
    function setText(id, value) {
        document.getElementById(id).textContent = value;
    }
}
