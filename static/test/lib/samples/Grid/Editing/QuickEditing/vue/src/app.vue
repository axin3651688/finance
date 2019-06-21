<template>
    <div class="container-fluid">
        <label>
            Allow Quick-Editing
            <input v-model="quickEdit" type="checkbox" checked="true">
        </label>
        <!-- the grid -->
        <wj-flex-grid
            :itemsSource="data"
            :initialized="initializeGrid">
        </wj-flex-grid>
    </div>
</template>

<script>
import "@grapecity/wijmo.styles/wijmo.css";
import "bootstrap.css";
import Vue from "vue";
import { WjGridModule } from '@grapecity/wijmo.vue2.grid';
import * as wjcGrid from '@grapecity/wijmo.grid';
import { getData } from './data';


new Vue({
  	el: "#app",
  	data: {
        data: getData(),
        quickEdit : true
    },
    methods:{
        initializeGrid(flex){
            flex.beginningEdit.addHandler((s, e) => {
                if (e.data.type == 'keypress' && !this.quickEdit) {
                    e.cancel = true;
                }
            }) 
        }
    }
});
</script>

<style>
    .wj-flexgrid {
        max-height: 250px;
        margin-bottom: 12px;
    }
    .header {
        display: inline-block;
        width: 150px;
        text-align: right;
        font-weight: normal;
    }
</style>

