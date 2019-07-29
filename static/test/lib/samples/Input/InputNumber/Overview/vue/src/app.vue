<template>
    <div class="container-fluid">
        <p>
            For example, here is an InputNumber with default settings:
        </p>
        <div class="form-group">
            <label for="theNumber">InputNumber</label>
            <wj-input-number id="theNumber" :initialized="initNumber"></wj-input-number>
        </div>
        <div>
            The current value is <b>{{ theNumber.value }}</b>.
        </div>

        <hr />

        <p>
            By default, InputNumber values are required, so you can't delete the entire content of the control. If you
            want to enter a number that is optional, set the <b>isRequired</b> property to false:
        </p>
        <div class="form-group">
            <label for="theNumberNotRequired">Not Required</label>
            <wj-input-number id="theNumberNotRequired" :isRequired=false :value=null :min=0 :max=100
                placeholder="Your age (optional)"></wj-input-number>
        </div>
    </div>
</template>

<script>
    import 'bootstrap.css';
    import '@grapecity/wijmo.styles/wijmo.css';
    import Vue from 'vue';
    import '@grapecity/wijmo.vue2.core';
    import '@grapecity/wijmo.vue2.input';

    let App = Vue.extend({
        name: 'app',
        data: function(){
            return {
                theNumber: {}
            }
        },
        methods:{
            initNumber: function(number){
                this.theNumber = number;
            }
        }
    })

    let vm = new Vue({ render: h => h(App) }).$mount('#app');
</script>

<style>
    label {
        width: 100px;
        text-align: right;
        margin-right: 3px;
    }

    body {
        margin-bottom: 36px;
    }
</style>
