<template>
    <div class="container-fluid">
        <div class="form-group">
            <label>Radial Gauge:</label>
            <wj-radial-gauge :min=0 :max=100 :value=75 :isReadOnly=false :step=10></wj-radial-gauge>
        </div>
        <div class="form-group">
            <label>Linear Gauge:</label>
            <wj-linear-gauge :min=0 :max=100 :value=75 :isReadOnly=false :step=10 showText="MinMax"></wj-linear-gauge>
        </div>
        <div class="form-group">
            <label>Bullet Graph:</label>
            <wj-bullet-graph :min=0 :max=100 :value=75 :target=60 :bad=50 :good=70 showText="MinMax"></wj-bullet-graph>
        </div>
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
        padding: 4px;
        width: 80%;
        margin: 6px auto 36px auto;
    }

    .container-fluid .wj-radialgauge {
        height: 200px;
    }

    label {
        width: 120px;
        text-align: right;
}   

    body {
        margin-bottom: 24pt;
    }
</style>
