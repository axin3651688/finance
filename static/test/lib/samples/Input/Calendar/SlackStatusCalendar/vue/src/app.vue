<template>
    <div class="container-fluid">
        <div class="legend">
            <div><img src="https://status.slack.com/img/v2/TableMaintenance.png"> Maintenance</div>
            <div><img src="https://status.slack.com/img/v2/TableIncident.png"> Incident</div>
            <div><img src="https://status.slack.com/img/v2/TableNotice.png"> Notice</div>
            <div><img src="https://status.slack.com/img/v2/TableOutage.png"> Outage</div>
        </div>
        <div id="calendar" class="calendar">
        </div>
    </div>
</template>

<script>
    import 'bootstrap.css';
    import '@grapecity/wijmo.styles/wijmo.css';
    import Vue from 'vue';
    import '@grapecity/wijmo.vue2.core';
    import '@grapecity/wijmo.vue2.input';
    import * as input from '@grapecity/wijmo.input';
    import { getEvents } from './data'

    let App = Vue.extend({
        name: 'app',
        data: function () {
            return {
                _events: null,
                _tooltip: null
            }
        },
        methods: {
            _createMonthControl: function(date) {
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

                return month;
            },
            // format the calendar cells to show events
            _formatDayCell: function(sender, e) {
                let event = this._getEvent(e.data),
                    html = `<div>${e.data.getDate()}</div>`;

                html += event
                    ? `<img src="https://status.slack.com/img/v2/Table${event.type}.png"/>`
                    : '<img/>'

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

                this._tooltip.setTooltip(e.item, tip)
            },
            _getUptime: function() {
                let tm = [100, 99.75, 99.998, 99.98, 99.996, 99.93];
                return tm[Math.floor(Math.random() * tm.length)];
            },
            //
            _getEvent: function(date){
                for (let i = 0; i < this._events.length; i++) {
                    if (wijmo.DateTime.sameDate(this._events[i].date, date)) {
                        return this._events[i];
                    }
                }
                //
                return null;
            }
        },
        mounted: function(){
            this._tooltip = new wijmo.Tooltip();
            this._events = getEvents();
            // create the calendar
            let calendar = document.querySelector('#calendar');
            //
            for (let i = 0, start = new Date(); i < 12; i++) {
                let month = this._createMonthControl(wijmo.DateTime.addMonths(start, -i));
                calendar.appendChild(month);
            }
        }
    })

    let vm = new Vue({ render: h => h(App) }).$mount('#app');
</script>

<style>
    @media (min-width: 1200px) {
        .container-fluid {
            width: 1250px;
        }
    }

    body.body {
        background-color: #f5f5f5;
        font-size: 16px;
        font-family: -apple-system-font, 'Segoe UI', 'Roboto', sans-serif;
        padding: 0 0 10px;
    }

    .legend {
        display: flex;
        justify-content: flex-end;
    }

    .legend div {
        margin-left: 24px;
    }

    .calendar {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        margin-top: 32px;
        padding-bottom: 90px;
    }

    .calendar .wj-calendar {
        width: 390px;
        padding: 12px 12px 36px;
        background-color: white;
        margin: 8px;
    }

    .calendar .wj-calendar .wj-content {
        border: none;
    }

    .calendar .wj-calendar .wj-day-today {
        font-weight: normal;
    }

    .calendar .wj-calendar .wj-state-selected {
        background: inherit;
        color: inherit;
    }

    .calendar .wj-calendar tr:not(.wj-header) td:hover {
        background: #eee;
    }

    .calendar .wj-calendar .month-header {
        display: flex;
        justify-content: space-between;
        align-items: baseline;
        font-weight: bold;
        margin-bottom: 20px;
    }

    .calendar .wj-calendar .month-header .month-title{
        font-size: 150%;
    }

    .calendar .wj-calendar img {
        height: 12px;
        margin-top: -12px;
    }

    .calendar .wj-calendar-month .wj-header {
        font-size: 100%;
        background-color: inherit;
        font-weight: normal;
    }

    .calendar .wj-calendar .wj-day-othermonth {
        visibility: hidden;
    }

    .container-fluid .wj-tooltip {
        background-color: #fff;
        padding: 0;
        border: 1px solid rgba(0,0,0,0.1);
        border-radius: 0;
        box-shadow: 0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22);
        box-sizing: border-box;
        width: 450px;
    }

    .container-fluid .wj-tooltip .event {
        margin-top: 12px;
        font-weight: bold;
    }

    .container-fluid .wj-tooltip .event-tip {
        border-top: 4px solid green;
        padding: 24px;
    }

    .container-fluid .wj-tooltip .event-tip.event-type-maintenance {
        border-top-color: #3f46ad;
    }

    .container-fluid .wj-tooltip .event-tip.event-type-incident {
        border-top-color: #eeb522;
    }

    .container-fluid .wj-tooltip .event-tip.event-type-notice {
        border-top-color: #ff944b;
    }

    .container-fluid .wj-tooltip .event-tip.event-type-outage {
        border-top-color: #eb4d5c;
    }
</style>
