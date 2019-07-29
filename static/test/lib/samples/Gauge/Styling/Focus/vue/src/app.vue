<template>
    <div class="container-fluid">
        <wj-linear-gauge :isReadOnly=false :hasShadow=false :thumbSize=12 :value=50>
            <wj-range wjProperty="face" :thickness=0.25></wj-range>
            <wj-range wjProperty="pointer" :thickness=0.25></wj-range>
        </wj-linear-gauge>

        <wj-radial-gauge :isReadOnly=false :hasShadow=false showText="Value" :thumbSize=6 :value=50>
            <wj-range wjProperty="face" :thickness=0.05></wj-range>
            <wj-range wjProperty="pointer" :thickness=0.05></wj-range>
        </wj-radial-gauge>
    </div>
</template>

<script>
    import 'bootstrap.css';
    import '@grapecity/wijmo.styles/wijmo.css';
    import Vue from 'vue';
    import '@grapecity/wijmo.vue2.gauge';

    let App = Vue.extend({
        name: 'app'
    })

    new Vue({ render: h => h(App) }).$mount('#app');
</script>

<style>
    .container-fluid .wj-gauge {
        width: 50%;
        margin: 20px auto;
    }

    .container-fluid .wj-gauge .wj-face path {
        fill: #fefefe;
        stroke: #e0e0e0;
    }

    .container-fluid .wj-gauge.wj-state-focused .wj-pointer {
        fill: red;
    }

    .container-fluid .wj-gauge.wj-state-focused circle.wj-pointer {
        stroke-width: 4px;
        stroke: red;
    }

    .container-fluid .wj-radialgauge {
        height: 120px;
    }
</style>
