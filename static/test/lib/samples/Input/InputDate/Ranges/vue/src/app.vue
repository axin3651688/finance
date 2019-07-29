<template>
    <div class="container-fluid">
        <div class="form-group">
            <label for="theInputDate">InputDate</label>
            <wj-input-date id="theInputDate" :format="'MMM dd, yyyy'" :min="firstDay" :max="lastDay">
            </wj-input-date>
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
            let curr = new Date();
            return {
                firstDay: new Date(curr.setDate(curr.getDate() - curr.getDay())),
                lastDay: new Date(curr.setDate(curr.getDate() - curr.getDay() + 6))
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
        margin-bottom: 24px;
    }
</style>
