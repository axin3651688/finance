<template>
    <div class="container-fluid">
        <div v-for="(fmt,index) of ['d', 'D', 'M', 'd/M/yy', 'MMMM dd, yyyy']" :key="index" class="form-group">
            <label for="theInputDateF{{index}}">{{fmt}}:</label>
            <wj-input-date id="theInputDateF{{index}}" :format="fmt"></wj-input-date>
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
        name: 'app'
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
