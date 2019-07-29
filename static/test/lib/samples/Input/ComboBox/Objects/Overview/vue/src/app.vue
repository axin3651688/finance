<template>
    <div class="container-fluid">
        <div class="form-group">
            <label for="theCombo">Select an item:</label>
            <wj-combo-box id="theCombo" :displayMemberPath="'country'" :selectedValuePath="'sales'" :itemsSource="data" :initialized="initCombo"></wj-combo-box>
        </div>
        <p>
            The current text is: <b>{{ theCombo.text }}</b>.
        </p>
        <p>
            The selectedIndex is: <b>{{ theCombo.selectedIndex }}</b>.
        </p>
        <p>
            The selectedValue is: <b>{{ theCombo.selectedValue | formatCurrency }}</b>.
        </p>
    </div>
</template>

<script>
    import 'bootstrap.css';
    import '@grapecity/wijmo.styles/wijmo.css';
    import Vue from 'vue';
    import '@grapecity/wijmo.vue2.core';
    import '@grapecity/wijmo.vue2.input';
    import { getData } from './data';

    let App = Vue.extend({
        name: 'app',
        data: function () {
            return {
                theCombo: {},
                data: getData()
            }
        },
        methods: {
            initCombo: function(combo) {
                this.theCombo = combo;
            }
        },
        filters: {
            formatCurrency: function(number){
                return wijmo.Globalize.format(number, 'c');
            }
        }
    })

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
