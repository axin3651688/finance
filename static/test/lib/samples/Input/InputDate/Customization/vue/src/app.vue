<template>
    <div class="container-fluid">
        <wj-input-date :initialized="customizeCalendar"></wj-input-date>
        <div>
            The current date is <b>{{ theInputDate.value | formatDateTime }}</b>.
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
    import { getHoliday } from './data';

    let App = Vue.extend({
        name: 'app',
        data: function () {
            return {
                theInputDate: {}
            }
        },
        methods: {
            customizeCalendar: function(date){
                this.theInputDate = date;
                date.calendar.formatItem.addHandler((sender, e) => {
                    let weekday = e.data.getDay(),
                        holiday = getHoliday(e.data);

                    wijmo.toggleClass(e.item, 'date-weekend', weekday == 0 || weekday == 6);
                    wijmo.toggleClass(e.item, 'date-holiday', holiday != null);
                    e.item.title = holiday || '';
                });
            }
        },
        filters: {
            formatDateTime: function(value){
                return wijmo.Globalize.format(value, 'D');
            }
        },
        created: function(){
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
        }
    })

    let vm = new Vue({ render: h => h(App) }).$mount('#app');
</script>

<style>
    .wj-calendar {
        max-width: 21em;
    }

    .wj-calendar .wj-header {
        color: white;
        background: #808080;
    }

    .wj-calendar .date-holiday:not(.wj-state-selected) {
        font-weight: bold;
        color: #008f22;
        background: #f0fff0;
        outline: 2pt solid #008f22;
    }

    .wj-calendar .date-weekend:not(.wj-state-selected) {
        background-color: #d8ffa6;
    }

    body {
        margin-bottom: 36px;
    }
</style>
