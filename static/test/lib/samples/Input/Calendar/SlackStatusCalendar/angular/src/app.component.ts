import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './styles.css';
//
import * as wijmo from '@grapecity/wijmo';
import * as input from '@grapecity/wijmo.input';
//
import { Component, Inject, enableProdMode, NgModule, OnInit } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { BrowserModule } from '@angular/platform-browser';
import { WjInputModule } from '@grapecity/wijmo.angular2.input';
import { DataService, TCalendarEvent } from './app.data';
//
@Component({
    selector: 'app-component',
    templateUrl: 'src/app.component.html'
})
export class AppComponent implements OnInit {
    private _events: TCalendarEvent[];
    private _tooltip: wijmo.Tooltip;
    //
    constructor(@Inject(DataService) private dataService: DataService) {
        // create the events to show on our calendar
        this._events = dataService.getEvents();
        this._tooltip = new wijmo.Tooltip();
    }
    //
    ngOnInit() {
        // create the calendar
        let calendar = document.querySelector('#calendar');
        //
        for (let i = 0, start = new Date(); i < 12; i++) {
            let month = this._createMonthControl(wijmo.DateTime.addMonths(start, -i));
            calendar.appendChild(month);
        }
    }
    //
    // create a month
    private _createMonthControl(date: Date) {
        // create the calendar
        let month = wijmo.createElement('<div class="month"></div>'),
            cal = new input.Calendar(month, {
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
        //
        return month;
    }
    //
    // format the calendar cells to show events
    private _formatDayCell(sender: input.Calendar, e: input.FormatItemEventArgs) {
        let event = this._getEvent(e.data),
            html = `<div>${e.data.getDate()}</div>`;
        //
        html += event
            ? `<img src="https://status.slack.com/img/v2/Table${event.type}.png"/>`
            : '<img/>'
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
        this._tooltip.setTooltip(e.item, tip)
    }
    //
    private _getUptime() {
        let tm = [100, 99.75, 99.998, 99.98, 99.996, 99.93];
        return tm[Math.floor(Math.random() * tm.length)];
    }
    //
    private _getEvent(date: Date): TCalendarEvent {
        for (let i = 0; i < this._events.length; i++) {
            if (wijmo.DateTime.sameDate(this._events[i].date, date)) {
                return this._events[i];
            }
        }
        //
        return null;
    }
}
//
@NgModule({
    imports: [WjInputModule, BrowserModule],
    declarations: [AppComponent],
    providers: [DataService],
    bootstrap: [AppComponent]
})
export class AppModule {
}
//
enableProdMode();
// Bootstrap application with hash style navigation and global services.
platformBrowserDynamic().bootstrapModule(AppModule);

