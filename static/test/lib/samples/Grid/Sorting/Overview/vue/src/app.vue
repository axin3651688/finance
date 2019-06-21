<template>
    <div class="container-fluid">
        <wj-flex-grid
            :deferResizing="true"
            :itemsSource="data">
            <wj-flex-grid-column :binding="'id'" :header="'ID'" :width="60" :allowSorting="false"></wj-flex-grid-column>
            <wj-flex-grid-column :binding="'country'" :header="'Country'"></wj-flex-grid-column>
            <wj-flex-grid-column :binding="'sales'" :header="'Sales'"></wj-flex-grid-column>
            <wj-flex-grid-column :binding="'expenses'" :header="'Expenses'"></wj-flex-grid-column>
        </wj-flex-grid>
        <div class="panel panel-warning">
            <div class="panel-heading">
                Although the <b>CollectionView</b> class supports sorting
                on multiple properties, the grid does not provide a UI
                for that. You can build your own Excel-style sort dialogs
                if you need that functionality. See for example the
                <a href="https://demos.wijmo.com/5/SampleExplorer/SampleExplorer/Sample/SortingGroupingUI" target="_blank">SortingGroupingUI</a> demo.
            </div>
        </div>
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
                data: this._getData()
            }
        },
        methods: {
            _getData: function() {
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
            }
        }
    });

    new Vue({ render: h => h(App) }).$mount('#app');
</script>

<style>
.wj-flexgrid {
  height: 150px;
  margin:10px 0;
}

</style>
