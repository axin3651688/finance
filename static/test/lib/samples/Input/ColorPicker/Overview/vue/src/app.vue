<template>
    <div class="container-fluid">
        <div id="output" :style="{ background: theColorPicker.value }">
            Select a background for me!
        </div>

        <div class="form-check">
            <label for="showAlphaChannel" class="form-check-label">showAlphaChannel:</label>
            <input id="showAlphaChannel" class="form-check-input" type="checkbox"
                v-model="theColorPicker.showAlphaChannel">
        </div>
        <div class="form-check">
            <label for="showColorString" class="form-check-label">showColorString:</label>
            <input id="showColorString" class="form-check-input" type="checkbox"
                v-model="theColorPicker.showColorString">
        </div>
        <div class="form-check">
            <label for="thePalette">palette: </label>
            <wj-combo-box :initialized="initPalette" id="thePalette" :itemsSource="palettes" :displayMemberPath="'name'">
            </wj-combo-box>
        </div>

        <wj-color-picker :initialized="initColorPicker" :palette="thePalette.selectedValue.colors" :showAlphaChannel="theColorPicker.showAlphaChannel"
            :showColorString="theColorPicker.showColorString"></wj-color-picker>
    </div>
</template>

<script>
    import 'bootstrap.css';
    import '@grapecity/wijmo.styles/wijmo.css';
    import Vue from 'vue';
    import '@grapecity/wijmo.vue2.core';
    import '@grapecity/wijmo.vue2.input';
    import { getPalettes } from './data'

    let App = Vue.extend({
        name: 'app',
        data: function () {
            return {
                theColorPicker: {
                    showColorString: true,
                    showAlphaChannel: true,
                    value: ''
                },
                thePalette: {
                    selectedValue: {
                        colors: []
                    }
                },
                palettes: getPalettes()
            }
        },
        methods: {
            initColorPicker: function(colorPicker){
                this.theColorPicker = colorPicker;
            },
            initPalette: function(palette){
                this.thePalette = palette;
            }
        }
    })

    let vm = new Vue({ render: h => h(App) }).$mount('#app');
</script>

<style>
    .container-fluid .wj-colorpicker {
        margin-bottom: 18px;
    }

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
