<template>
    <div class="container-fluid">
        <div class="form-group">
            <label for="iptConnectorLines">Show Connector Lines: </label>
            <input id="iptConnectorLines" type="checkbox" v-model="connectorLines" />
        </div>

        <div class="form-group">
            <label for="iptShowTotal">Show Total Bar: </label>
            <input id="iptShowTotal" type="checkbox" v-model="showTotal" />
        </div>

        <div class="form-group">
            <label for="btnRandomize">Randomize Data</label>
            <button id="btnRandomize" class="btn btn-default" @click="randomizeData">
                Go
            </button>
        </div>

        <wj-flex-chart :itemsSource="data" bindingX="date">
            <wj-flex-chart-waterfall name="Increase,Decrease,Total" binding="sales" :connectorLines="connectorLines"
                :showTotal="showTotal" :initialized="onWaterfallInitialized">
            </wj-flex-chart-waterfall>
        </wj-flex-chart>
    </div>
</template>

<script>
    import '@grapecity/wijmo.styles/wijmo.css';
    import 'bootstrap.css';
    import Vue from 'vue';
    import * as chart from '@grapecity/wijmo.chart';
    import '@grapecity/wijmo.vue2.chart';
    import '@grapecity/wijmo.vue2.chart.analytics';
    import { getData } from './data';
    //
    new Vue({
        el: '#app',
        data: {
            data: getData(),
            connectorLines: false,
            showTotal: false
        },
        methods: {
            onWaterfallInitialized(sender) {
                sender.styles = {
                    start: { fill: 'blue', stroke: 'blue' },
                    total: { fill: 'yellow', stroke: 'yellow' },
                    falling: { fill: 'red', stroke: 'red' },
                    rising: { fill: 'green', stroke: 'green' },
                    connectorLines: { stroke: 'blue', 'stroke-dasharray': '3, 1' }
                };
            },
            randomizeData() {
                this.data = getData();
            }
        }
    });
</script>

<style>
    .container-fluid .wj-flexchart {
       height: 300px;
    }

    label {
        width: 200px;
        text-align: right;
    }

    body {
        margin-bottom: 24pt;
    }
</style>