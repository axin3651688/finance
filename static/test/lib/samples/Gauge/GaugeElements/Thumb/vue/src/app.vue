<template>
    <div class="container-fluid">
        <div class="row">
            <div class="col-xs-6">
                <div class="form-group">
                    <label for="color">Color:</label>
                    <wj-input-color id="color" :value="theGauge.thumb.color" :valueChanged="onInputValueChanged"></wj-input-color>
                </div>
                <div class="form-group">
                    <label for="thumbSize">Thumb Size:</label>
                    <wj-input-number id="thumbSize" :min=0 :max=50 :step=5 format="n0"
                        :value="theGauge.thumb.thumbSize" :valueChanged="onInputValueChanged">
                    </wj-input-number>
                </div>
            </div>
            <div class="col-xs-6">
                <wj-radial-gauge :isReadOnly=false :hasShadow=false showText="All" :startAngle=-30
                    :sweepAngle=240 :value=50 :thumbSize="theGauge.thumb.thumbSize">
                    <wj-range wjProperty="pointer" :thickness=0.15 :color="theGauge.thumb.color"></wj-range>
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
                    thumb: {
                        color: '#0085c7',
                        thumbSize: 20
                    }
                }
            }
        },
        methods: {
            onInputValueChanged: function(s,e) {
                this.theGauge.thumb[s.hostElement.id] = s.value;
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
