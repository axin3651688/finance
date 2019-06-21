import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './styles.css';
//
import * as wijmo from '@grapecity/wijmo';
import * as input from '@grapecity/wijmo.input';
//
import { getEvents } from './data';
//
document.readyState === 'complete' ? init() : window.onload = init;
//
function init() {
    // create the events to show on our calendar
    let events = getEvents();
    //
    // create the calendar
    let calendar = document.getElementById('calendar'), tooltip = new wijmo.Tooltip();
    //
    for (let i = 0, start = new Date(); i < 12; i++) {
        let month = createMonthControl(wijmo.DateTime.addMonths(start, -i));
        calendar.appendChild(month);
    }
    //
    // create a month
    function createMonthControl(date) {
        // create the calendar
        let month = wijmo.createElement('<div class="month"></div>'), cal = new input.Calendar(month, {
            showHeader: false,
            selectionMode: 'None',
            value: date,
            formatItem: formatDayCell
        });
        cal.refresh();
        //
        // add a custom header element
        let fmt = wijmo.format('<div class="month-header">' +
            '<div class="month-title">{header}</div>' +
            '<div class="month-status">{uptime}% uptime</div>' +
            '</div>', {
            header: wijmo.Globalize.format(date, 'MMMM yyyy'),
            uptime: getUptime()
        });
        let newHeader = wijmo.createElement(fmt);
        let hdr = cal.hostElement.querySelector('.wj-calendar-header');
        hdr.parentElement.insertBefore(newHeader, hdr);
        // show only first letter of week day
        let cells = cal.hostElement.querySelectorAll('table tr.wj-header td');
        for (let i = 0; i < 7; i++) {
            cells[i].textContent = cells[i].textContent.substr(0, 1);
        }
        //
        return month;
    }
    //
    // format the calendar cells to show events
    function formatDayCell(sender, e) {
        let event = getEvent(e.data), html = `<div>${e.data.getDate()}</div>`;
        //
        html += event
            ? `<img src="https://status.slack.com/img/v2/Table${event.type}.png"/>`
            : '<img/>';
        //
        // format cell content 
        e.item.innerHTML = html;
        //
        // add tooltip to cell
        let tip = wijmo.format('<div class="event-tip event-type-{eventType}">' +
            '<div>{date:MMM d, yyyy}</div>' +
            '<div class="event">{eventMessage}</div>' +
            '</div>', {
            date: e.data,
            eventMessage: event ? event.msg : 'No incidents, outages, or maintenance.',
            eventType: event ? event.type.toLocaleLowerCase() : 'none'
        });
        //
        tooltip.setTooltip(e.item, tip);
    }
    //
    function getUptime() {
        let tm = [100, 99.75, 99.998, 99.98, 99.996, 99.93];
        return tm[Math.floor(Math.random() * tm.length)];
    }
    //
    function getEvent(date) {
        for (let i = 0; i < events.length; i++) {
            if (wijmo.DateTime.sameDate(events[i].date, date)) {
                return events[i];
            }
        }
        //
        return null;
    }
}
