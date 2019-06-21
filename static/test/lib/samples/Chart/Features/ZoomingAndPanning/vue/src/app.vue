<template>
    <div class="container-fluid">
        <div class="form-group">
            <button id="btnReset" class="btn btn-default" v-on:click="reset">Reset Zoom</button>
            <wj-flex-chart :itemsSource="data" bindingX="date" chartType="Candlestick" :initialized="initializeChart">
                <wj-flex-chart-series binding="high,low,open,close" name="Alphabet Inc"></wj-flex-chart-series>
                <wj-flex-chart-legend position="None"></wj-flex-chart-legend>
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
    import * as wjCore from '@grapecity/wijmo';

    let App = Vue.extend({
        name: 'app',
        data: function () {
            return { 
                data: getData(),
                zoom: {
                    ptStart: null,
                    ptEnd: null,
                    box: null
                }
            }
        },
        methods: {
            initializeChart: function(flex) {
                this.theChart = flex;
                let host = flex.hostElement,
                    zoom = this.zoom;
                host.addEventListener('mousedown', e => zoom.ptStart = e);
                host.addEventListener('mousemove', e => {
                    if (zoom.ptStart) {
                        zoom.ptEnd = e;
                        this.updateZoomBox();
                    }
                });
                host.addEventListener('mouseup', e => {
                    this.applyZoom();
                    zoom.ptStart = zoom.ptEnd = null;
                    this.updateZoomBox();
                });
            },
            updateZoomBox: function() {
                let zoom = this.zoom;
                if (!zoom.box) {
                    zoom.box = wjCore.createElement('<div class="zoom-box"></div>', document.body);
                }
                if (!zoom.ptStart) {
                    wjCore.setCss(zoom.box, {
                        display: 'none'
                    });
                } else {
                    let x = Math.min(zoom.ptStart.pageX, zoom.ptEnd.pageX),
                        y = Math.min(zoom.ptStart.pageY, zoom.ptEnd.pageY),
                        w = Math.max(zoom.ptStart.pageX, zoom.ptEnd.pageX) - x,
                        h = Math.max(zoom.ptStart.pageY, zoom.ptEnd.pageY) - y;
                    //
                    wjCore.setCss(zoom.box, {
                        display: 'block',
                        left: x,
                        top: y,
                        width: w,
                        height: h
                    });
                }
            },
            applyZoom: function() {
                let zoom = this.zoom,
                    xmin = null,
                    ymin = null,
                    xmax = null,
                    ymax = null,
                    chart = this.theChart;
                //
                // calculate custom zoom
                if (zoom.ptStart && zoom.ptEnd) {
                    // get mouse position in control coordinates
                    let rc = chart.hostElement.getBoundingClientRect();
                    xmin = Math.min(zoom.ptStart.pageX, zoom.ptEnd.pageX) - rc.left,
                        ymin = Math.min(zoom.ptStart.pageY, zoom.ptEnd.pageY) - rc.top,
                        xmax = Math.max(zoom.ptStart.pageX, zoom.ptEnd.pageX) - rc.left,
                        ymax = Math.max(zoom.ptStart.pageY, zoom.ptEnd.pageY) - rc.top;
                    //
                    // convert to chart coordinates
                    let pMin = chart.pointToData(xmin, ymin),
                        pMax = chart.pointToData(xmax, ymax);
                    //
                    xmin = Math.min(pMin.x, pMax.x);
                    ymin = Math.min(pMin.y, pMax.y);
                    xmax = Math.max(pMin.x, pMax.x);
                    ymax = Math.max(pMin.y, pMax.y);
                }
                //
                // apply new ranges to the chart axes
                chart.deferUpdate(() => {
                    chart.axisX.min = xmin;
                    chart.axisY.min = ymin;
                    chart.axisX.max = xmax;
                    chart.axisY.max = ymax;
                });
            },
            reset: function() {
                this.zoom.ptStart = this.zoom.ptEnd = null;
                this.updateZoomBox();
                this.applyZoom();
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
    
    .zoom-box {
        position: absolute;
        display: none;
        background-color: rgba(85, 85, 85, 0.05);
        border: 2px dashed #808080;
        pointer-events: none;
    }
</style>
