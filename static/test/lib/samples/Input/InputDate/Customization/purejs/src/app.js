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
    // change InpuDate icon to a calendar instead of a down arrow (applies to all InputDate controls)
    input.InputDate.controlTemplate = '<div style="position:relative" class="wj-template">' +
        '<div class="wj-input">' +
        '<div class="wj-input-group wj-input-btn-visible">' +
        '<input wj-part="input" type="text" class="wj-form-control" />' +
        '<span wj-part="btn" class="wj-input-group-btn" tabindex="-1">' +
        '<button class="wj-btn wj-btn-default" type="button" tabindex="-1">' +
        '<span class="wj-glyph-calendar"></span>' +
        '</button>' +
        '</span>' +
        '</div>' +
        '</div>' +
        '<div wj-part="dropdown" class="wj-content wj-dropdown-panel" ' +
        'style="display:none;position:absolute;z-index:100">' +
        '</div>' +
        '</div>';
    //
    // change the format used to show current month/year (affects all InputDate and Calendar controls)
    wijmo.culture.Globalize.calendar.patterns['y'] = 'MMMM yyyy';
    //
    // the InputDate
    let theInputDate = new input.InputDate('#theInputDate', {
        valueChanged: () => showCurrentDate(theInputDate)
    });
    showCurrentDate(theInputDate);
    //
    // format items in the InputDate's calendar (apply styles to weekends and holidays)
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
        var el = document.querySelector('#theInputDateOutput');
        el.textContent = wijmo.Globalize.format(ctrl.value, 'D');
    }
}
