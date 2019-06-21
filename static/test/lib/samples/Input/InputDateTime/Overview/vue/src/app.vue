<template>
    <div class="container-fluid">
        <div class="form-group">
            <label for="theInputDateTime">InputDateTime:</label>
            <wj-input-date-time id="theInputDateTime" :value="date" :initialized="initDateTime">
            </wj-input-date-time>
        </div>
        <p>
            The current date/time is:<b>{{ theInputDateTime.value | formatDateTime }}</b>.
        </p>
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
            let date = new Date();
            date.setHours(17, 30, 0);
            return {
                date: date,
                theInputDateTime: {}
            }
        },
        methods: {
            initDateTime: function(dateTime){
                this.theInputDateTime = dateTime;
            }
        },
        filters: {
            formatDateTime: function(value){
                return wijmo.Globalize.format(value, 'F');
            }
        }
    })

    let vm = new Vue({ render: h => h(App) }).$mount('#app');
</script>

<style>
    label {
        width: 120px;
        text-align: right;
        margin-right: 3px;
    }

    body {
        margin-bottom: 36px;
    }
</style>
