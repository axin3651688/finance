<template>
    <div class="container-fluid">
        <wj-flex-grid
            :alternatingRowStep="0"
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

    let App = Vue.extend({
        name: 'app',
        data: function(){
            return {
                data: this._getData()
            }
        },
        methods: {
            initializeGrid(flex) {
                flex.itemsSourceChanged.addHandler(() => {
                    flex.collectionView.canSort = false; // prevent sorting
                });
                flex.sortedColumn.addHandler(() => {
                    flex.collectionView.canSort = false; // prevent sorting
                    flex.collectionView.sourceCollection = flex.collectionView.items; // copy sorted values
                });
                flex.hostElement.addEventListener('mousedown', function(e) {
                    if (flex.hitTest(e).panel == flex.columnHeaders) {
                        flex.collectionView.canSort = true;
                    }
                }, true);
            },
            _getData: function() {
                let countries = 'US,Germany,UK,Japan,Italy,Greece'.split(','),
                    data = [];
                for (let i = 0; i < countries.length; i++) {
                    data.push({
                        id: i,
                        country: countries[i],
                        active: i % 5 != 0,
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
