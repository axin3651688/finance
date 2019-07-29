<template>
    <div class="container-fluid">
        <div class="row">
            <div class="col-xs-6">
                <div class="form-group">
                    <label for="color">Color:</label>
                    <wj-input-color id="color" :value="theGauge.face.color" :value-changed="onInputValueChanged"></wj-input-color>
                </div>

                <div class="form-group">
                    <label for="tickness">Thickness:</label>
                    <wj-input-number id="thickness" :min=0 :max=1 :step=0.1 format="n2"
                        :value="theGauge.face.thickness" :value-changed="onInputValueChanged"></wj-input-number>
                </div>
            </div>
            <div class="col-xs-6">
                <wj-radial-gauge :isReadOnly=false :hasShadow=false showText="All" :startAngle=-30
                    :sweepAngle=240 :value=50 :thumbSize=20>
                    <wj-range wjProperty="face" :thickness="theGauge.face.thickness" :color="theGauge.face.color"></wj-range>
                    <wj-range wjProperty="pointer" :thickness=0.15></wj-range>
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
                    face: {
                        color: '#f5f5f5',
                        thickness: 1
                    }
                }
            }
        },
        methods: {
            onInputValueChanged: function(s,e) {
                this.theGauge.face[s.hostElement.id] = s.value;
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

    .container-fluid .wj-gauge .wj-pointer {
        fill: black;
    }

    label {
        width: 120px;
        text-align: right;
    }

    .wj-dropdown,
    .wj-inputnumber {
        width: 120px;
    }
</style>
