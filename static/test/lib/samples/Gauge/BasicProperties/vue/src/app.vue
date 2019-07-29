<template>
    <div class="container-fluid">
        <div class="row">
            <div class="col-xs-6">
                <div class="form-group">
                    <label for="min">min:</label>
                    <wj-input-number id="min" :step=10 :value="gauge.min" :value-changed="onInputValueChanged"></wj-input-number>
                </div>

                <div class="form-group">
                    <label for="max">max:</label>
                    <wj-input-number id="max" :step=10 :value="gauge.max" :value-changed="onInputValueChanged"></wj-input-number>
                </div>

                <div class="form-group">
                    <label for="value">value:</label>
                    <wj-input-number id="value" :step=10 :value="gauge.value" :value-changed="onInputValueChanged"></wj-input-number>
                </div>

                <div class="form-group">
                    <label for="showText">showText:</label>
                    <wj-combo-box id="showText" :text="gauge.showText"
                        :items-source="gauge.comboSource"
                        :selectedIndexChanged="onComboValueChanged">
                    </wj-combo-box>
                </div>

                <div class="form-check">
                    <label for="isReadOnly">isReadOnly:</label>
                    <input id="isReadOnly" type="checkbox" class="form-check-input" v-model="gauge.isReadOnly">
                </div>

                <div class="form-group">
                    <label for="step">step:</label>
                    <wj-input-number id="step" :min=1 :step=1 :value="gauge.step" :value-changed="onInputValueChanged"></wj-input-number>
                </div>

                <div class="form-check">
                    <label for="isAnimated">isAnimated:</label>
                    <input id="isAnimated" type="checkbox" class="form-check-input" v-model="gauge.isAnimated">
                </div>
            </div>
            <div class="col-xs-6">
                <wj-radial-gauge :min="gauge.min" :max="gauge.max" :value="gauge.value" :showText="gauge.showText"
                    :step="gauge.step" :isReadOnly="gauge.isReadOnly" :isAnimated="gauge.isAnimated" :value-changed="onGaugeValueChanged"></wj-radial-gauge>
                <wj-linear-gauge :min="gauge.min" :max="gauge.max" :value="gauge.value" :showText="gauge.showText"
                    :step="gauge.step" :isReadOnly="gauge.isReadOnly" :isAnimated="gauge.isAnimated" :value-changed="onGaugeValueChanged"></wj-linear-gauge>
                <wj-bullet-graph :min="gauge.min" :max="gauge.max" :value="gauge.value" :showText="gauge.showText"
                    :step="gauge.step" :isReadOnly="gauge.isReadOnly" :isAnimated="gauge.isAnimated" :target=60
                    :bad=50 :good=70 :value-changed="onGaugeValueChanged"></wj-bullet-graph>
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
                gauge: {
                    min: 0,
                    max: 100,
                    value: 75,
                    step: 1,
                    showText: 'None',
                    isReadOnly: true,
                    isAnimated: true,
                    comboSource: ['None','Value','MinMax','All']
                }
            }
        },
        methods: {
            onInputValueChanged: function(s, e){
                this.gauge[s.hostElement.id] = s.value;
            },
            onComboValueChanged: function(s,e){
                this.gauge.showText = s.selectedValue;
            },
            onGaugeValueChanged: function(s, e){
                this.gauge.value = s.value;
            }
        }
    })

    new Vue({ render: h => h(App) }).$mount('#app');
</script>

<style>
    label {
        width: 150px;
        text-align: right;
    }

    .container-fluid .wj-inputnumber,
    .container-fluid .wj-combobox {
        width: 140px;
    }

    .container-fluid .wj-gauge {
        margin: 20px auto;
    }

    .container-fluid .wj-radialgauge {
        height: 100px;
    }

    body {
        margin-bottom: 24pt;
    }
</style>
