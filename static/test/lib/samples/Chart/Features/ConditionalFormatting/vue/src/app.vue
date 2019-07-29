<template>
    <div class="container-fluid">
        <div class="form-group">
            <wj-flex-chart chartType="Scatter" :itemFormatter="itemFormatter">
                <wj-flex-chart-axis wjProperty="axisY" :axisLine="true"></wj-flex-chart-axis>
                <wj-flex-chart-series name="Series" :itemsSource="data" bindingX="x" binding="y"></wj-flex-chart-series>
            </wj-flex-chart>
        </div>
    </div>
</template>

<script>
    import "@grapecity/wijmo.styles/wijmo.css";
    import 'bootstrap.css';
    import Vue from 'vue';
    import '@grapecity/wijmo.vue2.core';
    import '@grapecity/wijmo.vue2.chart';
    import { getData } from './data';

    let App = Vue.extend({
        name: 'app',
        data: function () {
            return { 
                data: getData(120, -100, 24) 
            }
        },
        methods: {
            itemFormatter: function(engine, hitTestInfo, defaultRenderer) {
                var ht = hitTestInfo;
                if(ht.x < 0) {
                    engine.stroke = 'red';
                    engine.fill = 'rgba(255,0,0,0.7)';
                }
                defaultRenderer();
            }
        }
    })

    new Vue({ render: h => h(App) }).$mount('#app');
</script>

<style>
    body {
        margin-bottom: 24px;
    }

    label {
        margin-right: 3px;
    }
</style>
