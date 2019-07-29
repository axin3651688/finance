<template>
    <div class="container-fluid">
        <div class="form-group">
            <label for="theSSN">Social Security Number</label>
            <wj-input-mask id="theSSN" :mask="'000-00-0000'" :promptChar="'*'"></wj-input-mask>
        </div>

        <div class="form-group">
            <label for="theZip">Zip Code</label>
            <wj-input-mask id="theZip" :mask="'00000'" :promptChar="'^'"></wj-input-mask>
        </div>

        <div class="form-group">
            <label for="theZip4">Zip Code + 4</label>
            <wj-input-mask id="theZip4" :mask="'00000-0000'" :promptChar="'#'"></wj-input-mask>
        </div>

        <div class="form-group">
            <label for="thePhone">Phone Number</label>
            <wj-input-mask id="thePhone" :mask="'(999) 000-0000'" :promptChar="' '"></wj-input-mask>
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
    body {
        margin-bottom: 24px;
    }

    label {
        width: 180px;
        text-align: right;
        margin-right: 3px;
    }
</style>
