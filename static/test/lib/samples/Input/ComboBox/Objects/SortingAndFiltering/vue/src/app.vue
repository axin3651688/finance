<template>
    <div class="container-fluid">
        <div class="form-group">
            <label for="theCombo">Select an item:</label>
            <wj-combo-box id="theCombo" :displayMemberPath="'country'" :itemsSource="data" :initialized="initCombo"></wj-combo-box>
        </div>
        <div v-if="theCombo.collectionView.currentItem">
            <div>Country: <b>{{ theCombo.collectionView.currentItem.country }}</b></div>
            <div>GDP (M$/yr): <b>{{ theCombo.collectionView.currentItem.gdpm | formatCurrency }}</b></div>
            <div>Population (thousands): <b>{{ theCombo.collectionView.currentItem.popk | formatNumber }}</b></div>
            <div>GRP/Capita: <b>{{ theCombo.collectionView.currentItem.gdpcap | formatCurrency }}</b></div>
            <div>Rank: <b>{{ theCombo.collectionView.currentItem.id }}</b></div>
        </div>
    </div>
</template>

<script>
    import 'bootstrap.css';
    import '@grapecity/wijmo.styles/wijmo.css';
    import Vue from 'vue';
    import '@grapecity/wijmo.vue2.core';
    import '@grapecity/wijmo.vue2.input';
    import { getData } from './data';

    let App = Vue.extend({
        name: 'app',
        data: function () {
            return {
                theCombo: {
                    collectionView: {
                        currentItem: null
                    }
                },
                data: new wijmo.CollectionView(getData(), {
                    // 20 million people or more
                    filter: (item) => item.popk > 20000,
                    // sort and filter the collectionView
                    sortDescriptions: [
                        new wijmo.SortDescription('country', true)
                    ]
                })
            }
        },
        methods: {
            initCombo: function(combo) {
                this.theCombo = combo;
            }
        },
        filters: {
            formatCurrency: function(number){
                return wijmo.Globalize.format(number, 'c0');
            },
            formatNumber: function(number){
                return wijmo.Globalize.format(number, 'n');
            }
        }
    })

    let vm = new Vue({ render: h => h(App) }).$mount('#app');
</script>

<style>
    body {
        margin-bottom: 24px;
    }

    label {
        margin-right: 3px;
    }
</style>
