<template>
    <div class="container-fluid">
        <p>
            You can use ComboBoxes to select from lists of numbers:</p>
        <div class="form-group">
            <label>
                Select a number:
                <wj-combo-box
                    :itemsSource="numbers"
                    :selectedIndexChanged="numberChanged">
                </wj-combo-box>
            </label>
        </div>
        <p>
            You have selected this value: <b>{{ number }}</b>.
        </p>

        <hr />

        <p>
            You can use ComboBoxes to select from lists of dates.
            In this case, we use the <b>formatItem</b> event to
            format the date objects using Wijmo's <b>Globalize</b> class:</p>
        <div class="form-group">
            <label>
                Select a date:
                <wj-combo-box
                    :itemsSource="dates"
                    :formatItem="formatDateItem"
                    :selectedIndexChanged="dateChanged">
                </wj-combo-box>
            </label>
        </div>
        <p>
            You have selected this date: <b>{{ date | wj-format('d') }}</b>.
        </p>
    </div>
</template>

<script>
    import 'bootstrap.css';
    import '@grapecity/wijmo.styles/wijmo.css';
    import Vue from 'vue';
    import '@grapecity/wijmo.vue2.core';
    import '@grapecity/wijmo.vue2.input';
    import * as wijmo from '@grapecity/wijmo';

    let App = Vue.extend({
        name: 'app',
        data: function () {
            const numbers = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71];
            const dates = [new Date(2019, 0, 1), new Date(2019, 1, 12), new Date(2019, 1, 22), new Date(2019, 4, 13), new Date(2019, 4, 24), new Date(2019, 8, 19)];
            return {
                numbers: numbers,
                dates: dates,
                number: numbers[0],
                date: dates[0]
            }
        },
        methods: {
            formatDateItem(sender, e) {
                e.item.textContent = wijmo.Globalize.format(e.data, 'd');
            },
            numberChanged(sender) {
                this.number = sender.selectedValue;
            },
            dateChanged(sender) {
                this.date = sender.selectedValue;
            }
        }
    });

    let vm = new Vue({ render: h => h(App) }).$mount('#app');
</script>

<style>
    body {
        margin-bottom: 24px;
    }

    label {
        margin-right: 3px;
    }
</style>