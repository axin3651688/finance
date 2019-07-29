<template>
    <div class="container-fluid">
        <wj-linear-gauge :isReadOnly=false :hasShadow=false :value=50 :showRanges=true>
            <wj-range wjProperty="pointer" :thickness=0.5></wj-range>
            <wj-range :min=0 :max=33 color="red"></wj-range>
            <wj-range :min=33 :max=66 color="yellow"></wj-range>
            <wj-range :min=66 :max=100 color="green"></wj-range>
        </wj-linear-gauge>

        <wj-radial-gauge :isReadOnly=false :hasShadow=false :value=50 :showRanges=true showText="Value">
            <wj-range wjProperty="pointer" :thickness=0.5></wj-range>
            <wj-range :min=0 :max=33 color="red"></wj-range>
            <wj-range :min=33 :max=66 color="yellow"></wj-range>
            <wj-range :min=66 :max=100 color="green"></wj-range>
        </wj-radial-gauge>
    </div>
</template>

<script>
    import "@grapecity/wijmo.styles/wijmo.css";
    import 'bootstrap.css';
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

    .container-fluid .wj-radialgauge {
        height: 120px;
    }

    .container-fluid  .wj-gauge .wj-pointer {
        fill: black;
    }

    .container-fluid .wj-gauge .wj-ranges {
        opacity: .25;
    }

    .container-fluid .wj-gauge:hover .wj-ranges {
        opacity: 1;
        transition: opacity 600ms;
    }
</style>
