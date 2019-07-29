import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './styles.css';
//
import * as wijmo from '@grapecity/wijmo';
import * as input from '@grapecity/wijmo.input';
import { getHolidays } from './data';
//
document.readyState === 'complete' ? init() : window.onload = init;
//
function init() {
    let holidays = getHolidays();
    //
    // the calendar
    let theCalendar = new input.Calendar('#theCalendar', {
        valueChanged: () => showCurrentDate(),
        formatItem: (sender, e) => {
            // apply styles to weekends and holidays
            let weekday = e.data.getDay(), holiday = getHoliday(e.data);
            //
            wijmo.toggleClass(e.item, 'date-weekend', weekday == 0 || weekday == 6);
            wijmo.toggleClass(e.item, 'date-holiday', holiday != null);
            e.item.title = holiday;
        }
    });
    theCalendar.invalidate();
    //
    // show the currently selected date
    function showCurrentDate() {
        let el = document.querySelector('#theCalendarOutput');
        el.textContent = wijmo.Globalize.format(theCalendar.value, 'D');
    }
    showCurrentDate();
    //
    // gets the holiday for a given date
    function getHoliday(date) {
        let day = date.getDate(), month = date.getMonth() + 1, holiday = holidays[month + '/' + day];
        //
        if (!holiday) {
            let weekDay = date.getDay(), weekNum = Math.floor((day - 1) / 7) + 1;
            holiday = holidays[month + '/' + weekNum + '/' + weekDay];
        }
        //
        return holiday;
    }
}
