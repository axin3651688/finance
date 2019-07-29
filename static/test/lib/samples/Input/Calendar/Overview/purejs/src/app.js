import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './styles.css';
import * as wijmo from '@grapecity/wijmo';
import * as input from '@grapecity/wijmo.input';
//
document.readyState === 'complete' ? init() : window.onload = init;
//
function init() {
    // the calendar
    let theCalendar = new input.Calendar('#theCalendar', {
        valueChanged: () => showCurrentDate()
    });
    //
    // show the currently selected date
    function showCurrentDate() {
        let el = document.querySelector('#theCalendarOutput');
        el.textContent = wijmo.Globalize.format(theCalendar.value, 'D');
    }
    showCurrentDate();
}
