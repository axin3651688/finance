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
    // edit date and time using an InputDateTime
    let theInputDateTime = new input.InputDateTime('#theInputDateTime', {
        valueChanged: (sender) => showDateTime(sender.value)
    });
    //
    // initialize the date/time value
    let dt = new Date();
    dt.setHours(17, 30, 0);
    theInputDateTime.value = dt;
    //
    // show changes
    function showDateTime(value) {
        let el = document.querySelector('#dateTime');
        el.textContent = wijmo.Globalize.format(value, 'F');
    }
}
