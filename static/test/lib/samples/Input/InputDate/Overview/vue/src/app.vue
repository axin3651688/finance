<template>
    <div class="container-fluid">
        <p>
            For example, here is an InputDate with default settings:
        </p>
        <div class="form-group">
            <label for="theDate">InputDate</label>
            <wj-input-date id="theDate" :initialized="initDate"></wj-input-date>
        </div>
        <div>
            The current date is <b>{{ theDate.value | formatDateTime }}</b>.
        </div>

        <hr />

        <p>
            By default, InputDate values are required, so you can't delete the entire content of the control. If you
            want to enter dates that are optional, set the <b>isRequired</b> property to false:
        </p>
        <div class="form-group">
            <label for="theDateNotRequired">Not Required</label>
            <wj-input-date id="theDateNotRequired" :isRequired="false" :value="null"
                placeholder="Your birth date (optional)"></wj-input-date>
        </div>
    </div>
</template>

<script>
    import 'bootstrap.css';
    import '@grapecity/wijmo.styles/wijmo.css';
    import Vue from 'vue';
    import '@grapecity/wijmo.vue2.core';
    import '@grapecity/wijmo.vue2.input';

    let App = Vue.extend({
        name: 'app',
        data: function () {
            return {
                theDate: {}
            }
        },
        methods: {
            initDate: function(date){
                this.theDate = date;
            }
        },
        filters: {
            formatDateTime: function(value){
                return wijmo.Globalize.format(value, 'D');
            }
        }
    })

    let vm = new Vue({ render: h => h(App) }).$mount('#app');
</script>

<style>
    label {
        width: 100px;
        text-align: right;
        margin-right: 3px;
    }

    body {
        margin-bottom: 36px;
    }
</style>
