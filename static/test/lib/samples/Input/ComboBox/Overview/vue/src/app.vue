<template>
    <div class="container-fluid">
        <div class="form-group">
            <label for="theComboString">Strings:</label>
            <wj-combo-box id="theComboString" :itemsSource="strings"  :initialized="initComboString" ></wj-combo-box>
        </div>
        <p>
            The current value is:
            <b>{{ theComboString.selectedValue }}</b>.
        </p>

        <hr />

        <div class="form-group">
            <label for="theComboObject">Objects:</label>
            <wj-combo-box id="theComboObject" :displayMemberPath="'country'" :itemsSource="objects" :initialized="initComboObject" ></wj-combo-box>
        </div>
        <p>
            The current value is:
            <b v-if="theComboObject.selectedValue">
                {{ theComboObject.selectedValue.country }} (sales: {{ theComboObject.selectedValue.sales | formatCurrency }}, expenses {{ theComboObject.selectedValue.expenses | formatCurrency }})
            </b>
        </p>
    </div>
</template>

<script>
    import 'bootstrap.css';
    import '@grapecity/wijmo.styles/wijmo.css';
    import Vue from 'vue';
    import '@grapecity/wijmo.vue2.core';
    import '@grapecity/wijmo.vue2.input';
    import { getCountries, getData } from './data'

    let App = Vue.extend({
        name: 'app',
        data: function(){
            return {
                strings: getCountries(),
                objects: getData(),
                theComboString: {},
                theComboObject: {
                    selectedValue: {}
                },
            }
        },
        methods: {
            initComboString: function(combo){
                this.theComboString = combo;
            },
            initComboObject: function(combo){
                this.theComboObject = combo;
            },
        },
        filters: {
            formatCurrency: function(number){
                return wijmo.Globalize.format(number, 'c0');
            }
        }
    })

    let vm = new Vue({ render: h => h(App) }).$mount('#app');
</script>

<style>
    body {
        margin-bottom: 24px;
    }

    label {
        margin-right: 3px;
    }
</style>
