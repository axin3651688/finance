<template>
    <div class="container-fluid">
        <div class="row container">
            <div class="col-xs-6">
                <div class="form-check">
                    <label for="showRanges" class="form-check-label">Show Ranges:</label>
                    <input id="showRanges" type="checkbox" class="form-check-input" v-model="theGauge.showRanges">
                </div>

                <div class="form-group">
                    <label for="ranges">Ranges:</label>
                    <wj-combo-box  id="ranges" :items-source="theGauge.itemsSource" :selectedItem="theGauge.defaultSelectedItem"
                        :selectedIndexChanged="createRanges">
                    </wj-combo-box>
                </div>
            </div>
            <div class="col-xs-6">
                <wj-radial-gauge :isReadOnly=false :hasShadow=false showText="All" :startAngle=-30
                    :sweepAngle=240 :value=50 :showRanges="theGauge.showRanges" :thumbSize=20 :min=0 :max=100 :initialized="initGauge">
                    <wj-range wjProperty="pointer" :thickness=0.25>
                    </wj-range>
                </wj-radial-gauge>
            </div>
        </div>
    </div>
</template>

<script>
    import 'bootstrap.css';
    import '@grapecity/wijmo.styles/wijmo.css';
    import Vue from 'vue';
    import '@grapecity/wijmo.vue2.gauge';
    import '@grapecity/wijmo.vue2.input';
    import * as wijmo from '@grapecity/wijmo';
    import * as gauge from '@grapecity/wijmo.gauge';

    new Vue({
        el: '#app',
        data: {
            theGauge: {
                showRanges: true,
                itemsSource: [0, 3, 4, 20, 50],
                defaultSelectedItem: 3,
                initialized: false
            }
        },
        methods: {
            initGauge(g){
                this.gauge = g;
                this.createRanges();
            },
            createRanges(s) {
                let g = this.gauge;
                let cnt = s ? s.selectedItem : this.theGauge.defaultSelectedItem;
                if (!isNaN(cnt)) {
                    g && g.ranges.clear();
                    let colorMin = new wijmo.Color('red'),
                        colorMax = new wijmo.Color('green'),
                        span = (g.max - g.min) / cnt;

                    for (let i = 0; i < cnt; i++) {
                        let rng = new gauge.Range(), color = wijmo.Color.interpolate(colorMin, colorMax, cnt > 1 ? i / (cnt - 1) : 0);
                        rng.min = g.min + i * span;
                        rng.max = rng.min + span;
                        rng.color = color.toString();
                        g && g.ranges.push(rng);
                    }
                }
            }
        }
    });
</script>

<style>
    .container-fluid .wj-gauge {
        height: 150px;
        margin: 20px auto;
        padding: 12px;
        background: rgba(0, 0, 0, .02);
        box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);
    }

    .container-fluid .wj-gauge .wj-pointer {
        fill: black;
    }

    label {
        width: 120px;
        text-align: right;
        margin-right: 3px;
    }

    .wj-dropdown,
    .wj-inputnumber {
        width: 120px;
    }
</style>
