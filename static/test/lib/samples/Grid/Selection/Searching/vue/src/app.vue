<template>
    <div class="container-fluid">
        <!-- the grid -->
        <wj-flex-grid
            :autoSearch="true"
            :isReadOnly="true"
            :selectionMode="'ListBox'"
            :itemsSource="data">
        <wj-flex-grid-column :binding="'name'" :header="'Country'" :width="'2*'"></wj-flex-grid-column>
        <wj-flex-grid-column :binding="'pop'" :header="'Population (mi)'" :format="'n0'" :width="'*'"></wj-flex-grid-column>
        <wj-flex-grid-column :binding="'gdp'" :header="'GDP (US$mi/yr)'" :format="'n0'" :width="'*'"></wj-flex-grid-column>
        <wj-flex-grid-column :binding="'pci'" :header="'Income (US$/yr/cap)'" :format="'n0'" :width="'*'"></wj-flex-grid-column>
    </wj-flex-grid>
    </div>
</template>

<script>
    import "@grapecity/wijmo.styles/wijmo.css";
    import 'bootstrap.css';
    import Vue from 'vue';
    import '@grapecity/wijmo.vue2.core';
    import '@grapecity/wijmo.vue2.grid';
    import { getData } from './data';

    let App = Vue.extend({
        name: 'app',
        data: function(){
            return {
                data: getData()
            }
        }
    });

    new Vue({ render: h => h(App) }).$mount('#app');
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
