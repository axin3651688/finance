import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './styles.css';
//
import * as wijmo from '@grapecity/wijmo';
import * as input from '@grapecity/wijmo.input';
//
document.readyState === 'complete' ? init() : window.onload = init;
//
function init() {
    // a regular input date
    let theDate = new input.InputDate('#theDate', {
        valueChanged: () => showCurrentDate(theDate)
    });
    showCurrentDate(theDate);
    //
    // you can clear this one
    let theDateNotRequired = new input.InputDate('#theDateNotRequired', {
        isRequired: false,
        value: null,
        placeholder: 'Your birth date (optional)'
    });
    //
    // show the currently selected date
    function showCurrentDate(ctrl) {
        let el = document.querySelector('#theDateOutput');
        el.textContent = wijmo.Globalize.format(ctrl.value, 'D');
    }
}
