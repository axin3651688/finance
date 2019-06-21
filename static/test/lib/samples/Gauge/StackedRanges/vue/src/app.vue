<template>
    <div class="container-fluid">
        <div class="form-check">
            <label for="stackRanges" class="form-check-label">stackRanges:</label>
            <input id="stackRanges" type="checkbox" class="form-check-input" v-model="stackRanges">
        </div>

        <div class="gauges">
            <wj-radial-gauge :value="theRadialGauge.value" :stackRanges="stackRanges">
                <wj-range :max="radialRange.max" :color="radialRange.color" v-for="radialRange in theRadialGauge.ranges" :key="radialRange.max"></wj-range>
            </wj-radial-gauge>

            <wj-linear-gauge :value="theLinearGauge.value" :stackRanges="stackRanges">
                <wj-range :max="linearRange.max" :color="linearRange.color" v-for="linearRange in theLinearGauge.ranges" :key="linearRange.max"></wj-range>
            </wj-linear-gauge>

            <wj-linear-gauge class="vertical" :value="theVerticalGauge.value" :stackRanges="stackRanges" direction="Up">
                <wj-range :max="verticalRange.max" :color="verticalRange.color" v-for="verticalRange in theVerticalGauge.ranges" :key="verticalRange.max"></wj-range>
            </wj-linear-gauge>
        </div>
    </div>
</template>

<script>
    import 'bootstrap.css';
    import '@grapecity/wijmo.styles/wijmo.css';
    import Vue from 'vue';
    import '@grapecity/wijmo.vue2.gauge';

    let App = Vue.extend({
        name: 'app',
        data: function(){
            let ranges = [
                { max: 25, color: 'red' },
                { max: 50, color: 'purple' },
                { max: 75, color: 'orange' }
            ];
            return {
                stackRanges: true,
                theRadialGauge: {
                    value: 0,
                    ranges: ranges
                },
                theLinearGauge: {
                    value: 0,
                    ranges: ranges
                },
                theVerticalGauge: {
                    value: 0,
                    ranges: ranges
                }
            }
        },
        methods: {
            setDynamic: function(){
                var _this = this;
                setInterval(function(){
                    let i = Math.floor(Math.random() *  _this.theRadialGauge.ranges.length),
                        value = _this.theRadialGauge.ranges[i].max + (4 * Math.random() - 2);
                    //
                    value = Math.min(100, Math.max(0, value));
                    _this.theRadialGauge.ranges[i].max = value;
                    _this.theLinearGauge.ranges[i].max = value;
                    _this.theVerticalGauge.ranges[i].max = value;
                    //
                    _this.theRadialGauge.value = value;
                    _this.theLinearGauge.value = value;
                    _this.theVerticalGauge.value = value;
                }, 100);
            }
        },
        mounted: function(){
            this.setDynamic();
        }
    })

    new Vue({ render: h => h(App) }).$mount('#app');
</script>

<style>
    .container-fluid .gauges {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-around;
        align-items: center;
        align-content: center;
    }

    .container-fluid .wj-gauge {
        width: 200px;
        height: 200px;
    }

    .container-fluid .wj-gauge .wj-pointer {
        display: none;
    }

    .container-fluid .wj-gauge .wj-ranges path {
        stroke: #f5f5f5;
        stroke-width: 2px;
        stroke-linecap: round;
        opacity: .75;
    }

    .container-fluid .gauges .wj-lineargauge {
        height: 60px;
    }

    .container-fluid .gauges .vertical {
        height: 120px;
        width: 60px;
    }

    body {
        margin-bottom: 24pt;
    }
</style>
