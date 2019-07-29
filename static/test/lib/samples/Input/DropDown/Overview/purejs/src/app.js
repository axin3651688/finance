import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './styles.css';
//
import * as input from '@grapecity/wijmo.input';
//
document.readyState === 'complete' ? init() : window.onload = init;
//
function init() {
    // create two DropDowns
    let theComboBox = new input.ComboBox('#theComboBox', {
        itemsSource: ['Ringo', 'George', 'John', 'Paul']
    });
    let theInputDate = new input.InputDate('#theInputDate');
    //
    // customize the DropDowns
    document.querySelector('#isAnimated').addEventListener('click', e => {
        let checked = e.target.checked;
        theComboBox.isAnimated = checked;
        theInputDate.isAnimated = checked;
    });
    //
    document.querySelector('#isDroppedDown').addEventListener('click', e => {
        let checked = e.target.checked;
        theComboBox.isDroppedDown = checked;
    });
    //
    document.querySelector('#dropDownCssClass').addEventListener('click', e => {
        let checked = e.target.checked;
        theComboBox.dropDownCssClass = checked ? 'custom-dd' : '';
        theInputDate.dropDownCssClass = checked ? 'custom-dd' : '';
    });
}
