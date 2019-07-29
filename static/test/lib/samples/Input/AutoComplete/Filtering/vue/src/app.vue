<template>
    <div class="container-fluid">
        <div class="form-group">
            <wj-auto-complete :displayMemberPath="'country'" :itemsSource="view.items">
            </wj-auto-complete>
        </div>
        <div class="form-check">
            <label class="form-check-label" for="filter">Apply Filter</label>
            <input id="filter" type="checkbox" v-model="filter" @click="filterItem">
        </div>
        <div>Source list contains <b>{{view.items.length | formatNumber}}</b> countries.</div>
    </div>
</template>

<script>
    import 'bootstrap.css';
    import '@grapecity/wijmo.styles/wijmo.css';
    import Vue from 'vue';
    import '@grapecity/wijmo.vue2.core';
    import '@grapecity/wijmo.vue2.input';
    import * as wijmo from '@grapecity/wijmo';
    import { getData } from './data';

    let App = Vue.extend({
        name: 'app',
        data: function () {
            return {
                view: new wijmo.CollectionView(getData(), {
                    filter: this.theFilterFunction
                }),
                filter: true
            }
        },
        methods: {
            // our filter function
            theFilterFunction: function(item) {
                return item.popk > 50000;
            },
            filterItem: function(e) {
                this.view.filter = e.target.checked ? this.theFilterFunction : null;
            }
        },
        filters: {
            formatNumber: function(value){
                return wijmo.Globalize.format(value, 'n0');
            }
        }
    })

    new Vue({ render: h => h(App) }).$mount('#app');
</script>

<style>
    body {
        margin-bottom: 24px;
    }

    label {
        margin-right: 3px;
    }
</style>
