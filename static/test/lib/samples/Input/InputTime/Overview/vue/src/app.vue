<template>
    <div class="container-fluid">
        <div class="form-group">
            <label for="theInputDate">InputDate:</label>
            <wj-input-date id="theInputDate" :value="value" :valueChanged='onValueChanged'></wj-input-date>
        </div>
        <div class="form-group">
            <label for="theInputTime">InputTime:</label>
            <wj-input-time id="theInputTime" :value="value" :format="'h:mm tt'" :min="'9:00'" :max="'17:00'"
                :step="30" :isEditable="true" :valueChanged='onValueChanged'></wj-input-time>
        </div>
        <p>
            The current date/time is: <b>{{ value | formatDateTime }}</b>.
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
            let value = new Date();
            value.setHours(17, 30, 0);
            return {
                value: value
            }
        },
        methods: {
            onValueChanged: function(s){
                this.value = s.value;
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
