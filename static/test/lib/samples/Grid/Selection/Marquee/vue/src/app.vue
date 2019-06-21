<template>
    <div class="container-fluid">
        <label>
            Show Marquee
            <input v-model="showMarquee" @click="gridGetFocus" type="checkbox">
        </label>
        <br/>
        <label>
            Custom Marquee
            <input @click="showCustomMarquee($event)" type="checkbox">
        </label>
        <br/>
            <label>
            Highlight Active Cell
            <input @click="highlightActive($event)" type="checkbox">
        </label>
        <!-- the grid -->
        <wj-flex-grid
            :initialized="initGrid"
            :alternatingRowStep="0"
            :showMarquee="showMarquee"
            :itemsSource="data">
        </wj-flex-grid>
    </div>
</template>

<script>
    import "@grapecity/wijmo.styles/wijmo.css";
    import 'bootstrap.css';
    import Vue from 'vue';
    import '@grapecity/wijmo.vue2.core';
    import '@grapecity/wijmo.vue2.grid';
    import * as wjcCore from '@grapecity/wijmo';
    import { getData } from './data';

    let App = Vue.extend({
        name: 'app',
        data: function(){
            return {
                data: getData(),
                flex: null,
                showMarquee: true
            }
        },
        methods: {
            initGrid: function(flex){
                this.flex=flex;
            },
            gridGetFocus: function() {
                this.flex.focus();
            },
            showCustomMarquee: function(e) {
                wjcCore.toggleClass(this.flex.hostElement, 'customMarquee', e.target.checked);
                this.flex.invalidate();
                this.flex.focus();
            },
            highlightActive: function(e) {
                wjcCore.toggleClass(this.flex.hostElement, 'highlightActive', e.target.checked);
                this.flex.focus();
            }
        }
    });

    new Vue({ render: h => h(App) }).$mount('#app');
</script>

<style>
.highlightActive .wj-cells .wj-cell:focus {
  background: rgba(255,150,30,.75) !important;
}
.customMarquee .wj-marquee {
  border: 8px solid rgba(255,150,30,.75);
  border-radius: 8px;
}

body {
  margin-bottom: 12px;
}
</style>
