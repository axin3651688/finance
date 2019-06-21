<template>
    <div class="container-fluid">
        <p>
            The <b>text</b> property gets or sets the user's input:
        </p>
        <div class="form-group">
            <label for="theComboNoSrc">Any string:</label>
            <wj-combo-box id="theComboNoSrc" :initialized="initComboNoSrc" :textChanged="onTextChanged"></wj-combo-box>
        </div>
        <p>
            You have typed this: <b>{{ text }}</b>.
        </p>

        <h4>
            Choosing from Lists
        </h4>
        <p>
            If you want to provide a list of strings for users to choose from, set the <b>itemsSource</b> property to an
            array containing those items and users will be able to select one of them:
        </p>
        <div class="form-group">
            <label for="theCombo">Select a Country:</label>
            <wj-combo-box id="theCombo" :itemsSource="countries" :initialized="initCombo" :selectedIndexChanged="onComboSelectedIndexChanged"></wj-combo-box>
        </div>
        <p>
            You have selected this country: <b>{{ selectedValue }}</b>.
        </p>

        <h4>
            Simple Customizations
        </h4>
        <p>
            By default, the ComboBox will force users to select one of the items on the list. Users will not be able to
            leave the combo empty or to enter values that are not on the list.
        </p>
        <p>
            You can change these behaviors by setting the <b>isRequired</b> and <b>isEditable</b> properties:</p>
        <p>
            <label>
                <input id="isRequired" type="checkbox" v-model="isRequired">
                isRequired
            </label>
        </p>
        <p>
            <label>
                <input id="isEditable" type="checkbox" v-model="isEditable">
                isEditable
            </label>
        </p>
        <div class="form-group">
            <label for="theComboCustom">Select a Country:</label>
            <wj-combo-box id="theComboCustom" :isRequired="isRequired" :isEditable="isEditable" :initialized="initComboCustom"
                :placeholder="'No Country Selected'" :itemsSource="countries" :selectedIndexChanged="onCustomCmboSelectedIndexChanged"></wj-combo-box>
        </div>
        <p>
            You have selected this country: <b>{{ customText }}</b>.
        </p>
    </div>
</template>

<script>
    import 'bootstrap.css';
    import '@grapecity/wijmo.styles/wijmo.css';
    import Vue from 'vue';
    import '@grapecity/wijmo.vue2.core';
    import '@grapecity/wijmo.vue2.input';
    import { getCountries } from './data'

    let App = Vue.extend({
        name: 'app',
        data: function () {
            return {
                countries: getCountries(),
                text: '',
                selectedValue: '',
                isRequired: false,
                isEditable: true,
                customText: '',
            }
        },
        methods: {
            initComboNoSrc: function(combo){  
                this.text = combo.text;
            },
            initCombo: function(combo){            
                this.selectedValue = combo.selectedValue;
            },
            initComboCustom: function(combo){
                this.isRequired = combo.isRequired;
                this.isEditable = combo.isEditable;
                this.customText = combo.text;
            },
            onTextChanged: function(s){
                this.text = s.text;
            },
            onComboSelectedIndexChanged: function(s){
                this.selectedValue = s.selectedValue;
            },
            onCustomCmboSelectedIndexChanged: function(s){
                this.isRequired = s.isRequired;
                this.isEditable = s.isEditable;
                this.customText = s.text;
            }
        }
    })

    let vm = new Vue({ render: h => h(App) }).$mount('#app');
</script>

<style>
    h4 {
        margin-top: 24px;
    }

    body {
        margin-bottom: 24px;
    }

    label {
        margin-right: 3px;
    }
</style>
