<template>
    <div class="container-fluid">
        <h3>
            GIF Spinners</h3>
        <p>
            This example shows an animated GIF while the grid is loading:</p>
        <button class="btn btn-primary" v-on:click="loadDataGif">
            Load Grid Using GIF Spinner
        </button>

        <div>
            <div v-if="gifCtx.loading" class="spinner">
                <img src="resources/Rounded%20blocks.gif">
            </div>
            <wj-flex-grid v-if="!gifCtx.loading" :items-source="gifCtx.data">
            </wj-flex-grid>
        </div>

        <h3>
            Gauge Spinners
        </h3>
        <p>
            This example shows an animated RadialGauge while the grid is loading:</p>
        <button class="btn btn-primary" v-on:click="loadDataGauge">
            Load Grid Using Gauge Spinner
        </button>
        <div>
            <wj-radial-gauge v-if="gaugeCtx.loading" class="spinner" :is-animated=false show-text="None" :sweep-angle=360 :step=5
                :show-ticks=true :value="gaugeCtx.progress">
                <wj-range wjProperty="face" color="transparent"></wj-range>
            </wj-radial-gauge>

            <wj-flex-grid v-if="!gaugeCtx.loading" :items-source="gaugeCtx.data">
            </wj-flex-grid>
        </div>
    </div>
</template>

<script>
    import "bootstrap.css";
    import "@grapecity/wijmo.styles/wijmo.css";
    import Vue from 'vue';
    import * as wijmo from '@grapecity/wijmo.vue2.grid';
    import '@grapecity/wijmo.vue2.gauge';
    import { getData } from './data';
    
    new Vue({
        el: '#app',
        data: function () {
            return { 
                gifCtx : {
                    loading: false,
                    data: null,
                },
                gaugeCtx : {
                    loading: false,
                    data: null,
                    progress: 0,
                    interval: null
                }
            }
        }, 
        methods:{
            loadDataGif() {
                this.gifCtx.loading = true;
                getData((data) => {
                    this.gifCtx.data = data;
                    this.gifCtx.loading = false;
                }, 3000);
            },

            loadDataGauge() {
                clearInterval(this.gaugeCtx.interval);
                //
                this.gaugeCtx.loading = true;
                this.gaugeCtx.progress = 0;
                this.gaugeCtx.interval = setInterval(() => {
                    this.gaugeCtx.progress = (this.gaugeCtx.progress + 1) % 100;
                }, 50);
                //
                getData((data) => {
                    clearInterval(this.gaugeCtx.interval);
                    this.gaugeCtx.data = data;
                    this.gaugeCtx.loading = false;
                }, 3000);
            }
        }
    })
</script>

<style>
    .container-fluid .wj-flexgrid {
        max-height: 250px;
    }

    .wj-radialgauge.spinner {
        margin: auto auto;
        padding-bottom: 32px;
        max-width: 200px;
    }

    .spinner img,
    .spinner.wj-gauge {
        display: block;
        margin: auto;
    }

    .btn {
        margin-bottom: 6px;
    }

    body {
        margin-bottom: 24pt;
    }
</style>
