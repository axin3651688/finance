<template>
    <div class="container-fluid">
        <div class="row">
            <div class="col-xs-6">
                <div class="form-group">
                    <label for="showText">Show Text:</label>
                    <wj-combo-box id="showText" :itemsSource="theGauge.textSource" :text="theGauge.showText" :selectedIndexChanged="onInputValueChanged">
                    </wj-combo-box>
                </div>

                <div class="form-group">
                    <label for="format">Format:</label>
                    <wj-combo-box id="format" :itemsSource="theGauge.formatSource" :text="theGauge.format" :selectedIndexChanged="onInputValueChanged">
                    </wj-combo-box>
                </div>
                <div class="form-check">
                    <label for="customText" class="form-check-label">Custom Text:</label>
                    <input id="customText" type="checkbox" class="form-check-input" v-model="theGauge.customText" @change="onCustomTextChanged">
                </div>
            </div>
            <div class="col-xs-6">
                <wj-radial-gauge :isReadOnly=false :hasShadow=false :showText="theGauge.showText" :startAngle=-30 :getText="theGauge.getText"
                    :sweepAngle=240 :value=80 :showRanges=false :format="theGauge.format">
                    <wj-range :min=0 :max=25 color="red"></wj-range>
                    <wj-range :min=25 :max=50 color="orange"></wj-range>
                    <wj-range :min=50 :max=100 color="green"></wj-range>
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

    let App = Vue.extend({
        name: 'app',
        data: function(){
            return {
                theGauge: {
                    textSource: ['None', 'Value', 'MinMax', 'All'],
                    formatSource: ['n0', 'n2', 'c0', 'c2'],
                    customText: false,
                    showText: 'All',
                    format: 'n0',
                    getText: null
                }
            }
        },
        methods: {
            onInputValueChanged: function(s,e) {
                this.theGauge[s.hostElement.id] = s.text;
            },
            onCustomTextChanged: function(s,e){
                this.theGauge.getText = s.target.checked ? this.getTextCallback : null;
            },
            getTextCallback: function(gauge, part, value, text){
                switch (part) {
                    case 'value':
                        if (value <= 10) return 'Empty!';
                        if (value <= 25) return 'Low...';
                        if (value <= 95) return 'Good';
                        return 'Full';
                    case 'min':
                        return 'empty';
                    case 'max':
                        return 'full';
                }
                return text;
            }
        }
    })

    new Vue({ render: h => h(App) }).$mount('#app');
</script>

<style>
    .container-fluid .wj-gauge {
        height: 150px;
        margin: 20px auto;
        padding: 12px;
        background: rgba(0, 0, 0, .02);
        box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);
    }

    .container-fluid .wj-gauge .wj-ticks {
        stroke: white;
        stroke-width: 2px;
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