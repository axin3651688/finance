<template>
    <div class="container-fluid">
        <h3>
            Default Cell Padding: 3px</h3>
        <wj-flex-grid
            :itemsSource="grid.data">
        </wj-flex-grid>
        <h3>
            Custom Cell Padding: 8px</h3>
        <wj-flex-grid
            id="theGridTallRows"
            :itemsSource="grid.data">
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
                    data: this.getData()
                }
            }
        },
        methods: {
            getData: function(s, e){
                let countries = 'US,Germany,UK,Japan,Italy,Greece'.split(','),
                    products = 'Phones,Computers,Cameras,Stereos'.split(','),
                    data = [];
                for (let i = 0; i < 200; i++) {
                    data.push({
                        id: i,
                        country: countries[i % countries.length],
                        product: products[i % products.length],
                        sales: Math.random() * 10000,
                        expenses: Math.random() * 5000,
                    });
                }
                return data;
            }
        }
    })

    new Vue({ render: h => h(App) }).$mount('#app');
</script>

<style>
.wj-flexgrid {
    max-height: 250px;
    margin: 10px 0;
}
#theGridTallRows.wj-flexgrid .wj-cell {
    padding: 8px;
}
body {
    margin-bottom: 20px;
}
</style>
