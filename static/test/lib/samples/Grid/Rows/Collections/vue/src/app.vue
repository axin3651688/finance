<template>
    <div class="container-fluid">
        <wj-flex-grid
            :initialized="initializeGrid"
            :itemsSource="grid.data">
        </wj-flex-grid>
    </div>
</template>

<script>
    import "@grapecity/wijmo.styles/wijmo.css";
    import 'bootstrap.css';
    import Vue from 'vue';
    import * as wjcGrid from '@grapecity/wijmo.grid';
    import '@grapecity/wijmo.vue2.grid';

    let App = Vue.extend({
        name: 'app',
        data: function(){
            let url = 'https://services.odata.org/Northwind/Northwind.svc';
            return {
                grid: {
                    data: null
                }
            }
        },
        methods: {
            initializeGrid: function(flex) {
                this.grid.data = this.getData();
                flex.columnHeaders.rows.push(new wjcGrid.Row()); // add a header row
                flex.columnFooters.rows.push(new wjcGrid.Row()); // add a footer row
                flex.bottomLeftCells.setCellData(0, 0, 'x'); // show some data on the first cell
            },
            getData: function() {
                // generate some random data
               let countries = 'US,Germany,UK,Japan,Italy,Greece'.split(','),
                    data = [];
                for (let i = 0; i < 200; i++) {
                    data.push({
                        country: countries[i % countries.length],
                        downloads: Math.round(Math.random() * 20000),
                        sales: Math.random() * 10000,
                        expenses: Math.random() * 5000
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
    height: 200px; 
    margin: 10px 0;
  }
  body {
    margin-bottom: 20pt;
  }
  
</style>
