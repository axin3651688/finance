<template>
    <div class="container-fluid">
        <div class="form-group">
            <wj-flex-chart tooltipContent="" :itemsSource="data" chartType="Line" bindingX="date" plotMargin="NaN NaN NaN 80" :initialized="initializeChart">
                <wj-flex-chart-axis wjProperty="axisX" :axisLine="false"></wj-flex-chart-axis>
                <wj-flex-chart-series name="Data" binding="yval"></wj-flex-chart-series>
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
    import { AxisScrollbar } from './AxisScrollbar';

    let App = Vue.extend({
        name: 'app',
        data: function () {
            return { 
                data: getData() 
            }
        },
        methods: {
            initializeChart: function(flex) {
                let axisXScrollbar = new AxisScrollbar(flex.axisX, {
                    minScale: 0.02
                });

                let axisYScrollbar = new AxisScrollbar(flex.axisY, {
                    buttonsVisible: false,
                    minScale: 0.05
                });
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
    .form-group .wj-flexchart {
        margin: 0px;
        padding: 0px;
        border-bottom: 0px;
        touch-action: none;
        -ms-touch-action: none;
        padding-bottom: 40px;
    }

    /****  Axis Scrollbar Css *****/
    .form-group .wj-flexchart .wj-axis-scrollbar-container {
        position: relative;
    }

    .form-group .wj-flexchart .wj-axis-scrollbar-container .wj-chart-rangeslider {
        border: 1px solid #EAEAEA;    
        background-color: #EAEAEA;
        border-bottom-left-radius: 6px;
        border-bottom-right-radius: 6px;
        border-top-left-radius: 6px;
        border-top-right-radius: 6px;
    }
    .form-group .wj-flexchart .wj-axis-scrollbar-container .wj-chart-hrangeslider {
        height: 20px;
    }

    .form-group .wj-flexchart .wj-axis-scrollbar-container .wj-chart-vrangeslider {
        width: 20px;
    }


</style>
