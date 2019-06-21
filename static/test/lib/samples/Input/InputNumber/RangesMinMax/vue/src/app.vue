<template>
    <div class="container-fluid">
        <div class="form-group">
            <label for="theInputNumber">Guests</label>
            <wj-input-number id="theInputNumber" :format="'n0'" :value="1" :min="1" :max="5" :step="1">
            </wj-input-number>
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
