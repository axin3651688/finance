import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './styles.css';
//
import * as wijmo from '@grapecity/wijmo';
import * as input from '@grapecity/wijmo.input';
import { getHoliday } from './data';
//
document.readyState === 'complete' ? init() : window.onload = init;
//
function init() {
    // the InputDate
    let theInputDate = new input.InputDate('#theInputDate', {
        valueChanged: () => showCurrentDate(theInputDate),
        itemValidator: (date) => (date.getDay() % 6 != 0) && !getHoliday(date)
    });
    showCurrentDate(theInputDate);
    //
    // format items in the InputDate's calendar (apply styles to weekends and holidays):
    theInputDate.calendar.formatItem.addHandler((sender, e) => {
        let weekday = e.data.getDay(), holiday = getHoliday(e.data);
        //
        wijmo.toggleClass(e.item, 'date-weekend', weekday == 0 || weekday == 6);
        wijmo.toggleClass(e.item, 'date-holiday', holiday != null);
        e.item.title = holiday || '';
    });
    //
    // show the currently selected date
    function showCurrentDate(ctrl) {
        let el = document.querySelector('#theInputDateOutput');
        el.textContent = wijmo.Globalize.format(ctrl.value, 'D');
    }
}
