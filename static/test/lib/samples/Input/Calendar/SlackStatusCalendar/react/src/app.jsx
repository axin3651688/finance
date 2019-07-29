import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './app.css';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as wijmo from '@grapecity/wijmo';
import * as wjInput from '@grapecity/wijmo.input';
import { getEvents } from './data';
class App extends React.Component {
    constructor(props) {
        super(props);
        this._createMonthControl = (date) => {
            // create the calendar
            let month = wijmo.createElement('<div class="month"></div>'), cal = new wjInput.Calendar(month, {
                showHeader: false,
                selectionMode: 'None',
                value: date,
                formatItem: this._formatDayCell.bind(this)
            });
            cal.refresh();
            //
            // add a custom header element
            let fmt = wijmo.format('<div class="month-header">' +
                '<div class="month-title">{header}</div>' +
                '<div class="month-status">{uptime}% uptime</div>' +
                '</div>', {
                header: wijmo.Globalize.format(date, 'MMMM yyyy'),
                uptime: this._getUptime()
            });
            let newHeader = wijmo.createElement(fmt);
            let hdr = cal.hostElement.querySelector('.wj-calendar-header');
            hdr.parentElement.insertBefore(newHeader, hdr);
            // show only first letter of week day
            let cells = cal.hostElement.querySelectorAll('table tr.wj-header td');
            for (let i = 0; i < 7; i++) {
                cells[i].textContent = cells[i].textContent.substr(0, 1);
            }
            return month;
        };
        // format the calendar cells to show events
        this._formatDayCell = (sender, e) => {
            let event = this._getEvent(e.data), html = `<div>${e.data.getDate()}</div>`;
            html += event
                ? `<img src="https://status.slack.com/img/v2/Table${event.type}.png"/>`
                : '<img/>';
            // format cell content
            e.item.innerHTML = html;
            // add tooltip to cell
            let tip = wijmo.format('<div class="event-tip event-type-{eventType}">' +
                '<div>{date:MMM d, yyyy}</div>' +
                '<div class="event">{eventMessage}</div>' +
                '</div>', {
                date: e.data,
                eventMessage: event ? event.msg : 'No incidents, outages, or maintenance.',
                eventType: event ? event.type.toLocaleLowerCase() : 'none'
            });
            this.state.tooltip.setTooltip(e.item, tip);
        };
        this._getUptime = () => {
            let tm = [100, 99.75, 99.998, 99.98, 99.996, 99.93];
            return tm[Math.floor(Math.random() * tm.length)];
        };
        this._getEvent = (date) => {
            for (let i = 0; i < this.state.events.length; i++) {
                if (wijmo.DateTime.sameDate(this.state.events[i].date, date)) {
                    return this.state.events[i];
                }
            }
            return null;
        };
        this.state = {
            events: getEvents(),
            tooltip: new wijmo.Tooltip()
        };
    }
    ;
    componentDidMount() {
        // create the calendar
        let calendar = document.querySelector('#calendar');
        //
        for (let i = 0, start = new Date(); i < 12; i++) {
            let month = this._createMonthControl(wijmo.DateTime.addMonths(start, -i));
            calendar.appendChild(month);
        }
    }
    render() {
        return <div className="container-fluid">
            <div className="legend">
                <div><img src="https://status.slack.com/img/v2/TableMaintenance.png"/>> Maintenance</div>
                <div><img src="https://status.slack.com/img/v2/TableIncident.png"/>> Incident</div>
                <div><img src="https://status.slack.com/img/v2/TableNotice.png"/>> Notice</div>
                <div><img src="https://status.slack.com/img/v2/TableOutage.png"/>> Outage</div>
            </div>
            <div id="calendar" className="calendar"></div>
        </div>;
    }
}
ReactDOM.render(<App />, document.getElementById('app'));
