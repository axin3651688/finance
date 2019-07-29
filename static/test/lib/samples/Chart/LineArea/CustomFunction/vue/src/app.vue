<template>
    <div class="container-fluid">
        <wj-flex-chart>
            <wj-flex-chart-y-function-series name="y = f(x)" :min=-10 :max=10 :sampleCount=300 :func="yFunc">
            </wj-flex-chart-y-function-series>
            <wj-flex-chart-parametric-function-series name="x = f(t); y = g(t)" :min=0 :max="max" :sampleCount=1000
                :xFunc="paramXFunc" :yFunc="paramYFunc">
            </wj-flex-chart-parametric-function-series>
        </wj-flex-chart>
    </div>
</template>

<script>
    import '@grapecity/wijmo.styles/wijmo.css';
    import 'bootstrap.css';
    import Vue from 'vue';
    import '@grapecity/wijmo.vue2.chart';
    import '@grapecity/wijmo.vue2.chart.analytics';
    //
    new Vue({
        el: '#app',
        data: {
            max: 2 * Math.PI
        },
        methods: {
            yFunc(x) {
                return Math.sin(4 * x) * Math.cos(3 * x);
            },
            paramXFunc(t) {
                return 10 * Math.cos(5 * t);
            },
            paramYFunc(t) {
                return Math.sin(6 * t);
            }
        }
    });
</script>

<style>
    .container-fluid .wj-flexchart {
        height: 250px;
        margin: 10px 0;
    }

    body {
        margin-bottom: 24pt;
    }
</style>