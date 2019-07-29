<template>
    <div class="container-fluid">
        <div class="form-group">
            <label for="delay">delay:</label>
            <wj-input-number id="delay" :value="theAutoComplete.delay" :min="0" :max="1500" :step="100" :valueChanged="onValueChanged">
            </wj-input-number>
        </div>
        <div class="form-group">
            <label for="minLength">minLength:</label>
            <wj-input-number id="minLength" :value="theAutoComplete.minLength" :min="1" :max="100" :step="1" :valueChanged="onValueChanged">
            </wj-input-number>
        </div>
        <div class="form-group">
            <label for="maxItems">maxItems:</label>
            <wj-input-number id="maxItems" :value="theAutoComplete.maxItems" :min="1" :max="12" :step="1" :valueChanged="onValueChanged">
            </wj-input-number>
        </div>
        <div class="form-group">
            <label for="theAutoComplete">AutoComplete:</label>
            <wj-auto-complete id="theAutoComplete" :displayMemberPath="'country'" :initialized="initAutoComplete"
                :searchMemberPath="'country,continent'" :itemsSource="data">
            </wj-auto-complete>
        </div>
    </div>
</template>

<script>
    import 'bootstrap.css';
    import '@grapecity/wijmo.styles/wijmo.css';
    import Vue from 'vue';
    import '@grapecity/wijmo.vue2.core';
    import '@grapecity/wijmo.vue2.input';
    import { getData } from './data';

    let App = Vue.extend({
        name: 'app',
        data: function () {
            return {
                theAutoComplete : {
                    delay: 500,
                    minLength: 2,
                    maxItems: 6
                },
                data: getData()
            }
        },
        methods: {
            initAutoComplete: function(complete){
                this.theAutoComplete = complete;
            },
            onValueChanged: function(s){
                this.theAutoComplete[s.hostElement.id] = s.value;
            }
        }
    })

    new Vue({ render: h => h(App) }).$mount('#app');
</script>

<style>
    label {
        width: 150px;
        text-align: right;
        margin-right: 3px;
    }

    body {
        margin-bottom: 24px;
    }
</style>
