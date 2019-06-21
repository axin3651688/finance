<template>
    <div class="container-fluid">
        <div class="form-group">
            <div class="container-fluid well">
                <div class="row">
                    <div class="col-sm-12 col-xs-12">
                        <wj-menu :value="chartType" :header="'<b>Chart type: </b>'+ displayMenu(this.chartTypeSource, this.chartType)" :itemsSource="chartTypeSource" :selected-index-changed="selectedTypeIndexChanged">
                        </wj-menu>
                        <wj-menu :value="animationMode" :header="'<b>Animation mode: </b>'+ displayMenu(this.animationModeSource, this.animationMode)" :itemsSource="animationModeSource"  :selected-index-changed="selectedanimationModeIndexChanged"
                                    :itemClicked="animationModeChanged">
                        </wj-menu>
                        <wj-menu :value="easing" :header="'<b>Easing: </b>'+ displayMenu(this.easingSource, this.easing)" :itemsSource="easingSource"  :selected-index-changed="selectedEasingIndexChanged">
                        </wj-menu>
                        <label>Duration</label>
                        <wj-input-number :valueChanged="valueChanged" :value=400 :min=200 :max=5000 :step=200 format="n0">
                        </wj-input-number>
                    </div>
                </div>
                <div class="row">
                    <div class="col-sm-12 col-xs-12 flexchart">
                        <button id="chartResetData" type="button" class="btn btn-default" v-on:click="resetChartData">reset data</button>
                        <wj-menu header="Add" :itemClicked="itemAdd" :itemsSource='itemAddSource'>
                        </wj-menu>
                        <wj-menu header="Remove" :itemClicked="itemRemove" :itemsSource='itemRemoveSource'>
                        </wj-menu>
                    </div>
                </div>
            </div>
            <wj-flex-chart
                    :itemsSource="data"
                    :legendToggle="true"
                    :chartType="chartType"
                    bindingX="x"
                    :initialized="initializeChart">
                <wj-flex-chart-series binding="y0" name="Y1"></wj-flex-chart-series>
                <wj-flex-chart-series binding="y1" name="Y2"></wj-flex-chart-series>
                <wj-flex-chart-series binding="y2" name="Y3"></wj-flex-chart-series>
                <wj-flex-chart-animation :initialized="initializeAnimation" :easing="easing" :duration="duration"></wj-flex-chart-animation>
            </wj-flex-chart>
        </div>
    </div>
</template>

<script>
import "@grapecity/wijmo.styles/wijmo.css";
import "bootstrap.css";
import Vue from "vue";
import '@grapecity/wijmo.vue2.input';
import '@grapecity/wijmo.vue2.chart';
import  '@grapecity/wijmo.vue2.chart.animation';
import { getData, getRandomData, getRandomValue } from './data';
import * as wjInput from '@grapecity/wijmo.input';
import * as wjChart from '@grapecity/wijmo.chart';
import * as wjChartAnimation from '@grapecity/wijmo.chart.animation';

var chartAnimation= null;
new Vue({
      el: "#app",
      data: {
        data: null,
        flexChartPoints: 10,
        duration: 400,
        chartType: 'Line',
        easing: 'Swing',
        animationMode: 'All',
        itemAddSource:['Add Series', 'Add First Point', 'Add Last Point'],
        itemRemoveSource: ['Remove Series','Remove First Point','Remove Last Point'],
        chartTypeSource:['Bar', 'Column', 'Area', 'Line', 'LineSymbols', 'Spline', 'SplineSymbols', 'SplineArea', 'Scatter'],
        animationModeSource:  ['Point','Series','All'],
        easingSource: [
            'Linear',
            'Swing',
            'EaseInQuad',
            'EaseOutQuad',
            'EaseInOutQuad',
            'EaseInCubic',
            'EaseOutCubic',
            'EaseInOutCubic',
            'EaseInQuart',
            'EaseOutQuart',
            'EaseInOutQuart',
            'EaseInQuint',
            'EaseOutQuint',
            'EaseInOutQuint',
            'EaseInSine',
            'EaseOutSine',
            'EaseInOutSine',
            'EaseInExpo',
            'EaseOutExpo',
            'EaseInOutExpo',
            'EaseInCirc',
            'EaseOutCirc',
            'EaseInOutCirc',
            'EaseInBack',
            'EaseOutBack',
            'EaseInOutBack',
            'EaseInBounce',
            'EaseOutBounce',
            'EaseInOutBounce',
            'EaseInElastic',
            'EaseOutElastic',
            'EaseInOutElastic']
    },
    methods:{
        initializeChart(chart){
            this.flexChart = chart;
            this._setDataSource();
        },
        initializeAnimation(animation){
            chartAnimation = animation;
        },
        _setDataSource() {
            this.data = getData(this.flexChartPoints);
        },
        resetChartData() {
            this._setDataSource();
        },
        displayMenu(itemsSource, selecteditem){
            var obj = itemsSource.filter(
                s => s === selecteditem
            )[0];
            if (obj) {
                return obj;
            } else {
                return "";
            }
        },
        selectedTypeIndexChanged(e){
            if (e.selectedValue) {
                this.chartType = e.selectedValue;
            }
        },
        selectedanimationModeIndexChanged(e){
            if (e.selectedValue) {
                this.animationMode = e.selectedValue;
            }
        },
        selectedEasingIndexChanged(e){
            if (e.selectedValue) {
                this.easing = e.selectedValue;
            }
        },
        itemAdd(args) {
            var idx = args.selectedIndex;
            if (idx > -1) {
                this.func('add', idx);
            }
        },
        itemRemove(args) {
            var idx = args.selectedIndex;
            if (idx > -1) {
                this.func('remove', idx);
            }
        },
        func(oper, idx) {
            var str = '', funcName;
            if (idx === 1) {
                str = 'FirstPoint';
            } else if (idx === 2) {
                str = 'LastPoint';
            }
            funcName = oper + 'ChartSeries' + str;
            this[funcName]();
        },
        addChartSeriesFirstPoint: function () {
            this.data.insert(0, getRandomData('added' + getRandomValue(1000)));
        },
        addChartSeriesLastPoint: function () {
            this.data.push(getRandomData('added' + getRandomValue(1000)));
        },
        removeChartSeriesFirstPoint: function () {
            if (this.data.length) {
                this.data.removeAt(0);
            }
        },
        removeChartSeriesLastPoint: function () {
            if (this.data.length) {
                this.data.pop();
            }
        },
        valueChanged: (sender) => {
            if (sender.value < sender.min || sender.value > sender.max) {
                return;
            }
            //this.duration = sender.value;
            chartAnimation.duration = sender.value;
        },
        addChartSeries: function () {
            var chart = this.flexChart,
                len = chart.series.length;

            if (len >= 5) {
                return;
            }
            var series = new wjChart.Series();
            series.binding = len ? 'y' + len : 'y';
            series.name = 'Y' + (chart.series.length + 1);
            chart.series.push(series);
        
        },
        removeChartSeries: function () {
            var chart = this.flexChart;

            if (chart.series.length <= 0) {
                return;
            }
            chart.series.pop();
        },
        animationModeChanged() {
            chartAnimation.animationMode = this.animationMode;
            this.flexChart.refresh(true);
        }

    }
});
</script>

<style>
    .wj-flexchart {
        height: 300px;
    }

    .wj-data-label {
        font-size: 75%;
        opacity: .9;
    }

    label {
        width: 150px;
        text-align: right;
    }

    .wj-control {
        margin-bottom: 3px;
    }
</style>
