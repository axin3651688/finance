<template>
    <div class="container-fluid">
        <wj-flex-grid
            :initialized="initializeGrid"
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
                data: getData(200)
            }
        },
        methods: {
            initializeGrid(flex) {
                // listen for clicks on column headers
                flex.sortingColumn.addHandler((s, e) => {
                    let view = s.collectionView,
                        sds = view.sortDescriptions;
                    // prevent default behavior
                    e.cancel = true;
                    // if the control key is pressed, clear all sorts
                    if (e.data.ctrlKey) {
                        sds.clear();
                        return;
                    }
                    // flip direction or add new sort
                    let prop = s.columns[e.col].binding,
                        index = -1;
                    for (let i = 0; i < sds.length && index < 0; i++) {
                        if (sds[i].property == prop) {
                            index = i;
                        }
                    }
                    let sd;
                    if (index < 0) { // not found, add now
                        sd = new wjcCore.SortDescription(prop, true);
                        sds.push(sd);
                    } else { // found, flip its direction
                        sd = new wjcCore.SortDescription(prop, !sds[index].ascending);
                        sds.splice(index, 1, sd);
                    }
                });
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
