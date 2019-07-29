<template>
    <div class="container-fluid">
        <div v-for="(fmt,index) of ['n0', 'n2', 'c0', 'c2', 'p0', 'p2']" :key="index" class="form-group">
            <label for="theInputNumberF{{index}}">{{fmt}}:</label>
            <wj-input-number id="theInputNumberF{{index}}" :format="fmt"></wj-input-number>
        </div>
    </div>
</template>

<script>
    import 'bootstrap.css';
    import '@grapecity/wijmo.styles/wijmo.css';
    import Vue from 'vue';
    import '@grapecity/wijmo.vue2.input';

    let App = Vue.extend({
        name: 'app'
    })

    let vm = new Vue({ render: h => h(App) }).$mount('#app');
</script>

<style>
    label {
        width: 80px;
        text-align: right;
        margin-right: 3px;
    }

    body {
        margin-bottom: 24px;
    }
</style>
