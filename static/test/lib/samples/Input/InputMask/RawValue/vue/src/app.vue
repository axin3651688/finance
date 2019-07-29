<template>
    <div class="container-fluid">
        <div class="form-group">
            <label for="theSSN">Social Security Number</label>
            <wj-input-mask id="theSSN" :mask="'000-00-0000'" :valueChanged="onValueChanged"></wj-input-mask>
            <span v-if="theSSNRawValue"> rawValue: {{ theSSNRawValue }}</span>
        </div>

        <div class="form-group">
            <label for="theZip">Zip Code</label>
            <wj-input-mask id="theZip" :mask="'00000'" :valueChanged="onValueChanged"></wj-input-mask>
            <span v-if="theZipRawValue"> rawValue: {{ theZipRawValue }}</span>
        </div>

        <div class="form-group">
            <label for="theZip4">Zip Code + 4</label>
            <wj-input-mask id="theZip4" :mask="'00000-0000'" :valueChanged="onValueChanged"></wj-input-mask>
            <span v-if="theZip4RawValue"> rawValue: {{ theZip4RawValue }}</span>
        </div>

        <div class="form-group">
            <label for="thePhone">Phone Number</label>
            <wj-input-mask id="thePhone" :mask="'(999) 000-0000'" :valueChanged="onValueChanged"></wj-input-mask>
            <span v-if="thePhoneRawValue"> rawValue: {{ thePhoneRawValue }}</span>
        </div>
    </div>
</template>

<script>
    import 'bootstrap.css';
    import '@grapecity/wijmo.styles/wijmo.css';
    import Vue from 'vue';
    import '@grapecity/wijmo.vue2.input';

    let App = Vue.extend({
        name: 'app',
        data: function () {
            return {
                thePhoneRawValue: '',
                theZipRawValue: '',
                theZip4RawValue: '',
                theSSNRawValue: ''
            }
        },
        methods: {
            onValueChanged: function(s){
                this[s.hostElement.id + 'RawValue'] = s.rawValue;
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
        width: 180px;
        text-align: right;
        margin-right: 3px;
    }
</style>
