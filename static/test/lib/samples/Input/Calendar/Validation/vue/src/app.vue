<template>
    <div class="container-fluid">
        <wj-calendar :initialized="initCalendar" :formatItem="formatItem" :itemValidator="validator">
        </wj-calendar>
        <div>
            The current date is <b>{{ theCalendar.value | formatDate }}</b>.
        </div>
    </div>
</template>

<script>
    import 'bootstrap.css';
    import '@grapecity/wijmo.styles/wijmo.css';
    import Vue from 'vue';
    import '@grapecity/wijmo.vue2.core';
    import '@grapecity/wijmo.vue2.input';
    import { getHolidays } from './data'

    let App = Vue.extend({
        name: 'app',
        data: function () {
            return {
                theCalendar: {},
                holidays: getHolidays()
            }
        },
        methods: {
            initCalendar: function(calendar){
                this.theCalendar = calendar;
            },
            formatItem: function(s,e) {
                // apply styles to weekends and holidays
                let weekday = e.data.getDay(),
                    holiday = this._getHoliday(e.data);

                wijmo.toggleClass(e.item, 'date-weekend', weekday == 0 || weekday == 6);
                wijmo.toggleClass(e.item, 'date-holiday', holiday != null);
                e.item.title = holiday || '';
            },
            validator: function(date) {
                return (date.getDay() % 6 != 0) && !this._getHoliday(date);
            },
            // gets the holiday for a given date
            _getHoliday: function(date) {
                let day = date.getDate(),
                    month = date.getMonth() + 1,
                    holiday = this.holidays[month + '/' + day];
                //
                if (!holiday) {
                    let weekDay = date.getDay(),
                        weekNum = Math.floor((day - 1) / 7) + 1;
                    holiday = this.holidays[month + '/' + weekNum + '/' + weekDay];
                }
                //
                return holiday;
            }
        },
        filters: {
            formatDate: function(time) {
                return wijmo.Globalize.format(time, 'D');
            }
        }
    })

    let vm = new Vue({ render: h => h(App) }).$mount('#app');
</script>

<style>
    .container-fluid .wj-calendar {
        max-width: 21em;
    }

    .container-fluid .wj-calendar .wj-header {
        color: white;
        background: #808080;
    }

    .container-fluid .wj-calendar .date-holiday:not(.wj-state-selected) {
        font-weight: bold;
        color: #008f22;
        background: #f0fff0;
        outline: 2pt solid #008f22;
    }

    .container-fluid .wj-calendar .date-weekend:not(.wj-state-selected) {
        background-color: #d8ffa6;
    }

    body {
        margin-bottom: 36px;
    }
</style>
