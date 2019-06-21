<template>
    <div class="container-fluid">
        <div class="row">
            <div class="col-xs-6">
                <div class="form-group">
                    <label for="value">value:</label>
                    <wj-input-number id="value" :min="theGauge.min" :max="theGauge.max" :step="theGauge.step"
                        :value="theGauge.value" :value-changed="onInputValueChanged"></wj-input-number>
                </div>

                <div class="form-group">
                    <label for="startAngle">startAngle:</label>
                    <wj-input-number id="startAngle" :step=10 :min=-360 :max=360 :value="theGauge.startAngle" :value-changed="onInputValueChanged">
                    </wj-input-number>
                </div>

                <div class="form-group">
                    <label for="sweepAngle">sweepAngle:</label>
                    <wj-input-number id="sweepAngle" :step=10 :min=-360 :max=360 :value="theGauge.sweepAngle" :value-changed="onInputValueChanged">
                    </wj-input-number>
                </div>

                <div class="form-check">
                    <label for="autoScale" class="form-check-label">autoScale:</label>
                    <input id="autoScale" type="checkbox" class="form-check-input" v-model="theGauge.autoScale">
                </div>
            </div>
            <div class="col-xs-6">
                <div class="gauge-holder">
                    <wj-radial-gauge :isReadOnly=false :min=0 :max=100 :step=5 :value="theGauge.value"
                        :showRanges=false :startAngle="theGauge.startAngle" :sweepAngle="theGauge.sweepAngle"
                        :autoScale="theGauge.autoScale" :value-changed="onGaugeValueChanged">
                        <wj-range :min=0 :max=33 color="red"></wj-range>
                        <wj-range :min=33 :max=66 color="yellow"></wj-range>
                        <wj-range :min=66 :max=100 color="green"></wj-range>
                    </wj-radial-gauge>
                </div>
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

    let App = Vue.extend({
        name: 'app',
        data: function(){
            return {
                theGauge: {
                    value: 75,
                    startAngle: 0,
                    sweepAngle: 180,
                    autoScale: true
                }
            }
        },
        methods: {
            onInputValueChanged: function(s, e){
                this.theGauge[s.hostElement.id] = s.value;
            },
            onGaugeValueChanged: function(s, e){
                this.theGauge.value = s.value;
            }
        }
    })

    new Vue({ render: h => h(App) }).$mount('#app');
</script>

<style>
    .gauge-holder {
        width: 80%;
        padding: 12px;
        background: rgba(0, 0, 0, .02);
        box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);
    }

    .container-fluid .wj-gauge {
        width: 100%;
        height: 100%;
    }

    .container-fluid .wj-radialgauge {
        height: 200px;
    }

    .wj-inputnumber {
        width: 120px;
    }

    label {
        width: 100px;
        text-align: right;
    }

    body {
        margin-bottom: 24pt;
    }
</style>