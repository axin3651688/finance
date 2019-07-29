<template>
    <div class="container-fluid">
        <div class="row">
            <div class="col-xs-6">
                <div class="form-group">
                    <label for="value">value:</label>
                    <wj-input-number id="value" :min=0 :max=100 :step=5
                        :value="theGauge.value" :value-changed="onValueChanged"></wj-input-number>
                </div>

                <div class="form-group">
                    <label for="direction">direction:</label>
                    <wj-combo-box id="direction" :itemsSource="theGauge.directionSource" text="Right"
                        :selectedIndexChanged="setDirection">
                    </wj-combo-box>
                </div>
            </div>
            <div class="col-xs-6">
                <div class="gauge-holder">
                    <wj-linear-gauge :isReadOnly=false :min=0 :max=100 :step=5 :value="theGauge.value"
                        :showRanges=false :direction="theGauge.direction" :value-changed="onValueChanged"
                        :initialized="initGauge">
                        <wj-range :min=0 :max=33 color="red"></wj-range>
                        <wj-range :min=33 :max=66 color="yellow"></wj-range>
                        <wj-range :min=66 :max=100 color="green"></wj-range>
                    </wj-linear-gauge>
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
                    direction: 0,
                    directionSource: ['Left', 'Right', 'Up', 'Down'],
                    instance: null
                }
            }
        },
        methods:{
            initGauge: function(_gauge){
                this.theGauge.instance = _gauge;
            },
            onValueChanged: function(s,e){
                this.theGauge.value = s.value;
            },
            setDirection: function(s,e){
                let g = this.theGauge.instance, el = g.hostElement.style;
                //
                g.direction = s.text;
                //
                switch (s.text) {
                    case 'Left':
                    case 'Right':
                        el.height = '2em';
                        el.width = '100%';
                        break;
                    case 'Up':
                    case 'Down':
                        el.height = '100%';
                        el.width = '2em';
                        break;
                }
            }
        }
    })

    new Vue({ render: h => h(App) }).$mount('#app');
</script>

<style>
    .container-fluid .gauge-holder {
        width: 80%;
        height: 200px;
        box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);
        padding: 12px;
    }

    .container-fluid .gauge-holder .wj-lineargauge{
        height: 2em;
        width: 100%;
    }

    .container-fluid .wj-gauge {
        width: 100%;
        height: 100%;
        margin: auto auto;
    }

    .wj-combobox, .wj-inputnumber {
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
