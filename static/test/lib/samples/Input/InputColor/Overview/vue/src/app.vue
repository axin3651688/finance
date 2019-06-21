<template>
    <div class="container-fluid">
        <div id="output" :style="{background:background}">
            Select a background for me!
        </div>

        <div class="form-group">
            <label for="theInputColor">Default:</label>
            <wj-input-color id="theInputColor" placeholder="'Select the color'" :value="background"></wj-input-color>
        </div>

        <p>
            You can customize the InputColor using the <b>colorPicker</b> property, which exposes the color picker
            drop-down:
        </p>

        <div class="form-check">
            <label for="showAlphaChannel">showAlphaChannel:</label>
            <input id="showAlphaChannel" type="checkbox" v-model="theInputColor.showAlphaChannel">
        </div>
        <br>
        <div class="form-group">
            <label for="thePalette">palette:</label>
            <wj-combo-box id="thePalette" :itemsSource="palettes" :displayMemberPath="'name'"
                :selectedIndexChanged="changePalette"></wj-combo-box>
        </div>

        <div class="form-group">
            <label for="theInputColorCst">Custom:</label>
            <wj-input-color id="theInputColorCst" :value="background" :initialized="initColor" :valueChanged="onValueChanged"></wj-input-color>
        </div>
    </div>
</template>

<script>
    import 'bootstrap.css';
    import '@grapecity/wijmo.styles/wijmo.css';
    import Vue from 'vue';
    import '@grapecity/wijmo.vue2.core';
    import '@grapecity/wijmo.vue2.input';
    import { getPalettes } from './data';

    let App = Vue.extend({
        name: 'app',
        data: function () {
            return {
                palettes: getPalettes(),
                background: '',
                theInputColor: {}
            }
        },
        methods: {
            initColor: function(color){
                this.theInputColor = color;
            },
            changePalette: function(palette) {
                this.theInputColor.colorPicker.palette = palette.selectedValue.colors;
            },
            onValueChanged: function(s){
                this.background = s.value;
            }
        }
    })

    let vm = new Vue({ render: h => h(App) }).$mount('#app');
</script>

<style>
    #output {
        float: right;
        font-size: 12px;
        border: 1px solid grey;
        padding: 12px;
    }

    label {
        width: 200px;
        text-align: right;
        margin-right: 3px;
    }

    body {
        margin-bottom: 24pt;
    }
</style>
