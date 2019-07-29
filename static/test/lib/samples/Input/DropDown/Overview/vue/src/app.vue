<template>
    <div class="container-fluid">
        <div class="row">
            <div class="col-xs-6">
                <div class="form-check">
                    <label for="isAnimated" class="form-check-label">isAnimated:</label>
                    <input id="isAnimated" type="checkbox" v-model="isAnimated">
                </div>
                <div class="form-check">
                    <label for="isDroppedDown" class="form-check-label">isDroppedDown:</label>
                    <input id="isDroppedDown" type="checkbox" v-model="isDroppedDown">
                </div>
                <div class="form-check">
                    <label for="dropDownCssClass" class="form-check-label">dropDownCssClass:</label>
                    <input id="dropDownCssClass" type="checkbox" v-model="dropDownCssClass">
                </div>
            </div>
            <div class="col-xs-6">
                <wj-combo-box :itemsSource="data" :isAnimated="isAnimated" :isDroppedDown="isDroppedDown"
                    :dropDownCssClass="dropDownCssClass ? 'custom-dd' : ''"></wj-combo-box>
                <br />
                <wj-input-date :isAnimated="isAnimated" :dropDownCssClass="dropDownCssClass ? 'custom-dd' : ''">
                </wj-input-date>
            </div>
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
        data: function () {
            return {
                isAnimated: false,
                isDroppedDown: false,
                dropDownCssClass: false,
                data: ['Ringo', 'George', 'John', 'Paul']
            }
        }
    })

    let vm = new Vue({ render: h => h(App) }).$mount('#app');
</script>

<style>
    .custom-dd {
        padding: 12px;
        font-size: 75% !important;
        font-style: italic !important;
        background: #FFF6D6 !important;
    }

    .container-fluid .wj-dropdown {
        margin-bottom: 6px;
    }

    label {
        width: 200px;
        text-align: right;
        margin-right: 3px;
    }

    body {
        margin-bottom: 36pt;
    }
</style>
