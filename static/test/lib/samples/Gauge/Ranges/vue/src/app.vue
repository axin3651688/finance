<template>
    <div class="container-fluid">
        <div class="form-check">
            <label for="showRanges" class="form-check-label">showRanges:</label>
            <input id="showRanges" type="checkbox" class="form-check-input" v-model="theGauge.showRanges" v-on:change="setThickness">
        </div>

        <wj-radial-gauge :min=0 :max=100 :value="theGauge.value" :isReadOnly=false :step=10
            :showRanges="theGauge.showRanges" :value-changed="onValueChanged">
            <wj-range wjProperty="pointer" :thickness="theGauge.radThickness" color="black"></wj-range>
            <wj-range name="low" :min=0 :max=25 color="rgba(255,0,0,0.4)"></wj-range>
            <wj-range name="med" :min=25 :max=50 color="rgba(255,255,0,0.4)"></wj-range>
            <wj-range name="high" :min=50 :max=75 color="rgba(255,125,0,0.4)"></wj-range>
            <wj-range name="top" :min=75 :max=100 color="rgba(0,255,0,0.4)"></wj-range>
        </wj-radial-gauge>

        <wj-linear-gauge :min=0 :max=100 :value="theGauge.value" :isReadOnly=false :step=10
            :showRanges="theGauge.showRanges" :value-changed="onValueChanged">
            <wj-range wjProperty="pointer" :thickness="theGauge.linThickness" color="black"></wj-range>
            <wj-range name="low" :min=0 :max=25 color="rgba(255,0,0,0.4)"></wj-range>
            <wj-range name="med" :min=25 :max=50 color="rgba(255,255,0,0.4)"></wj-range>
            <wj-range name="high" :min=50 :max=75 color="rgba(255,125,0,0.4)"></wj-range>
            <wj-range name="top" :min=75 :max=100 color="rgba(0,255,0,0.4)"></wj-range>
        </wj-linear-gauge>
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
            return {
                theGauge: {
                    value: 75,
                    showRanges: true,
                    radThickness: 0.2,
                    linThickness: 0.4
                }
            }
        },
        methods: {
            setThickness: function(s,e){
                this.theGauge.radThickness = s.target.checked ? 0.2 : 1;
                this.theGauge.linThickness = s.target.checked ? 0.4 : 1;
            },
            onValueChanged: function(s,e){
                this.theGauge.value = s.value;
            }
        }
    })

    new Vue({ render: h => h(App) }).$mount('#app');
</script>

<style>
    .container-fluid .wj-gauge {
        margin: 20px auto;
        width: 50%;
        max-width: 250px;
    }

    body {
        margin-bottom: 24pt;
    }
</style>
