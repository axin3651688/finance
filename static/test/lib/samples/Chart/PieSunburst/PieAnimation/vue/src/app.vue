<template>
    <div class="container-fluid">
        <div class="row">
            <div class="col-sm-12 col-xs-12">
                <wj-menu :value="animationMode" :itemsSource="Animations" :header="'Animation Mode: ' + animationMode"
                     :selectedIndexChanged="animationModeChanged" displayMemberPath="text" selectedValuePath="value">
                </wj-menu>
                <wj-menu :value="easing" :itemsSource="Easings" :header="'Easing: ' + easing"
                     :selectedIndexChanged="easingChanged" displayMemberPath="text" selectedValuePath="value">
                </wj-menu>
                <label for="pieDuration">Duration:</label>
                <wj-input-number id="pieDuration" :value="duration" :min=200 :max=5000 :step=200 format="n0"
                    :valueChanged="durationChanged">
                </wj-input-number>
            </div>
        </div>
        <div class="row">
            <div class="col-sm-12 col-xs-12">
                <label for="pieInnerRadius">innerRadius:</label>
                <wj-input-number id="pieInnerRadius" :value="innerRadius" :min=0 :max=1 :step=0.1 format="n1"
                    :valueChanged="innerRadiusChanged">
                </wj-input-number>
                <button type="button" class="btn btn-default" @click="resetData">reset data</button>
                <button type="button" class="btn btn-default" @click="addSlice">add slice</button>
                <button type="button" class="btn btn-default" @click="removeSlice">remove slice</button>
            </div>
        </div>
        <wj-flex-pie bindingName="id" binding="y0" :innerRadius="innerRadius" :palette="palette" :itemsSource="data">
            <wj-flex-chart-animation :animationMode="animationMode" :easing="easing" :duration="duration" :initialized="animationInitialized">
            </wj-flex-chart-animation>
        </wj-flex-pie>
    </div>
</template>

<script>
    import '@grapecity/wijmo.styles/wijmo.css';
    import 'bootstrap.css';
    import * as chart from '@grapecity/wijmo.chart';
    import Vue from 'vue';
    import '@grapecity/wijmo.vue2.input';
    import '@grapecity/wijmo.vue2.chart';
    import '@grapecity/wijmo.vue2.chart.animation';
    import { getData, getRandomData } from './data';
    //
    new Vue({
        el: '#app',
        data: {
            Animations: [
                { value: 'Point', text: 'Point' },
                { value: 'Series', text: 'Series' },
                { value: 'All', text: 'All' }
            ],
            Easings: [
                { value: 'Linear', text: 'Linear' },
                { value: 'Swing', text: 'Swing' },
                { value: 'EaseOutQuad', text: 'EaseOutQuad' },
                { value: 'EaseInOutQuad', text: 'EaseInOutQuad' },
                { value: 'EaseInCubic', text: 'EaseInCubic' },
                { value: 'EaseOutCubic', text: 'EaseOutCubic' },
                { value: 'EaseInOutCubic', text: 'EaseInOutCubic' },
                { value: 'EaseInQuart', text: 'EaseInQuart' },
                { value: 'EaseOutQuart', text: 'EaseOutQuart' },
                { value: 'EaseInOutQuart', text: 'EaseInOutQuart' },
                { value: 'EaseInQuint', text: 'EaseInQuint' },
                { value: 'EaseOutQuint', text: 'EaseOutQuint' },
                { value: 'EaseInOutQuint', text: 'EaseInOutQuint' },
                { value: 'EaseInSine', text: 'EaseInSine' },
                { value: 'EaseOutSine', text: 'EaseOutSine' },
                { value: 'EaseInOutSine', text: 'EaseInOutSine' },
                { value: 'EaseInExpo', text: 'EaseInExpo' },
                { value: 'EaseOutExpo', text: 'EaseOutExpo' },
                { value: 'EaseInOutExpo', text: 'EaseInOutExpo' },
                { value: 'EaseInCirc', text: 'EaseInCirc' },
                { value: 'EaseOutCirc', text: 'EaseOutCirc' },
                { value: 'EaseInOutCirc', text: 'EaseInOutCirc' },
                { value: 'EaseInBack', text: 'EaseInBack' },
                { value: 'EaseOutBack', text: 'EaseOutBack' },
                { value: 'EaseInOutBack', text: 'EaseInOutBack' },
                { value: 'EaseInBounce', text: 'EaseInBounce' },
                { value: 'EaseOutBounce', text: 'EaseOutBounce' },
                { value: 'EaseInOutBounce', text: 'EaseInOutBounce' },
                { value: 'EaseInElastic', text: 'EaseInElastic' },
                { value: 'EaseOutElastic', text: 'EaseOutElastic' },
                { value: 'EaseInOutElastic', text: 'EaseInOutElastic' }
            ],
            data: getData(),
            palette: null,
            animationMode: 'All',
            easing: 'Swing',
            duration: 400,
            innerRadius: 0
        },
        methods: {
            animationInitialized(ctrl) {
                this.animation = ctrl;
            },
            animationModeChanged(e) {
                if (e.selectedValue) {
                    this.animationMode = e.selectedValue;
                    this.animation.animate();
                }
            },
            easingChanged(e) {
                if (e.selectedValue) {
                    this.easing = e.selectedValue;
                    this.animation.animate();
                }
            },
            durationChanged(e) {
               this.duration = e.value;
               this.animation.animate();
            },
            innerRadiusChanged(e) {
               this.innerRadius = e.value;
            },
            //
            resetData() {
                this.data = getData();
                this._insertPieIdx = 1;
            },
            addSlice() {
                this.data.push(getRandomData('added' + this._insertPieIdx));
                this._insertPieIdx++;
            },
            removeSlice() {
                if (this.data.length) {
                    this.data.pop();
                    this._insertPieIdx = this._insertPieIdx <= 1 ? 1 : this._insertPieIdx--;
                }
            },
            //
            $_getRandomPalette() {
                let palettes = Object.getOwnPropertyNames(chart.Palettes)
                    .filter(prop => typeof chart.Palettes[prop] === 'object' && prop !== 'prototype');
                let rand = Math.floor(Math.random() * palettes.length);
                //
                return chart.Palettes[palettes[rand]];
            }
        },
        created() {
            this.palette = this.$_getRandomPalette();
            this._insertPieIdx = 1;
        }
    });
</script>

<style>
    body {
        margin-bottom: 24px;
    }

    .row {
        margin: 10px -15px;
    }

    #pieAnimationMode {
        width: 220px;
    }

    #pieEasing {
        width: 220px;
    }

    #pieDuration, #pieInnerRadius {
        width: 180px;
    }
</style>
