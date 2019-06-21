<template>
    <div class="container-fluid">
        <div class="row">
            <div class="col-xs-6">
                <div class="form-check">
                    <label for="showTicks" class="form-check-label">Tickmarks:</label>
                    <input id="showTicks" type="checkbox" v-model="theGauge.showTicks" class="form-check-input">
                </div>

                <div class="form-group">
                    <label for="tickSpacing">Spacing</label>
                    <wj-input-number id="tickSpacing" :min=0 :max=100 :step=5 format="n0"
                        :value="theGauge.tickSpacing" :valueChanged="changeTickSpacing">
                    </wj-input-number>
                </div>

                <div class="form-group">
                    <label for="tickWidth">Width:</label>
                    <wj-input-number id="tickWidth" :min=0 :max=5 :step=0.25 format="n1" :value="theGauge.tickWidth"
                        :valueChanged="changeTickWidth"></wj-input-number>
                </div>

                <div class="form-group">
                    <label for="tickColor">Color:</label>
                    <wj-input-color id="tickColor" :value="theGauge.tickColor" :valueChanged="changeTickColor"></wj-input-color>
                </div>
            </div>
            <div class="col-xs-6">
                <wj-radial-gauge :isReadOnly=false :hasShadow=false showText="All" :tickColor="theGauge.tickColor"
                    :showTicks="theGauge.showTicks" :tickSpacing="theGauge.tickSpacing" :startAngle=-30 :sweepAngle=240 :value=50>
                    <wj-range wjProperty="pointer" :thickness=0.5 ></wj-range>
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
                    tickWidth: 2,
                    tickSpacing: 10,
                    showTicks: true,
                    tickColor: 'white'
                }
            }
        },
        methods: {
            changeTickSpacing: function(s,e) {
                this.theGauge[s.hostElement.id] = s.value;
            },
            changeTickWidth: function(s,e) {
                document.querySelector('.wj-ticks').style.strokeWidth = s.value.toString();
            },
            changeTickColor: function(s,e) {
                document.querySelector('.wj-ticks').style.stroke = s.value;
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
