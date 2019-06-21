<template>
    <div class="container-fluid">
        <label>
            newRowAtTop
            <input v-model="grid.newRowAtTop" @change="onValueChanged" type="checkbox">
        </label>
        <wj-flex-grid :initialized="initData"
            :allowAddNew="true"
            :allowDelete="true"
            :itemsSource="grid.data"
            :newRowAtTo="grid.newRowAtTop">
        </wj-flex-grid>
    </div>
</template>

<script>
    import "@grapecity/wijmo.styles/wijmo.css";
    import 'bootstrap.css';
    import Vue from 'vue';
    import '@grapecity/wijmo.vue2.core';
    import '@grapecity/wijmo.vue2.grid';

    let App = Vue.extend({
        name: 'app',
        data: function(){
            return {
                grid: {
                    data: null,
                    newRowAtTop: false,
                    instance: null
                }
            }
        },
        methods: {
            getData: function(s, e){
                let countries = 'US,Germany,UK,Japan,Italy,Greece'.split(','),
                    data = [];
                for (let i = 0; i < countries.length; i++) {
                    data.push({
                        id: i,
                        country: countries[i],
                        downloads: Math.round(Math.random() * 20000),
                        sales: Math.random() * 10000,
                        expenses: Math.random() * 5000
                    });
                }
                return data;
            },
            initData: function(grid){
                this.grid.instance = grid;
                this.grid.data = this.getData();
            },
            onValueChanged: function(){
                this.grid.instance.newRowAtTop = this.grid.newRowAtTop;
            }
        }
    })

    new Vue({ render: h => h(App) }).$mount('#app');
</script>

<style>
.wj-flexgrid {
    height: 200px;
    margin: 10px 0;
}
body {
    margin-bottom: 20pt;
}
</style>
